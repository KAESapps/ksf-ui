define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/base/_Destroyable',
	'../base/HtmlContainer',
	'../layout/VFlex',
	'ksf/utils/destroy',
	'../list/ItemListBase',
], function(
	compose,
	_Composite,
	_Destroyable,
	HtmlContainer,
	VFlexContainer,
	destroy,
	ItemListBase
){
	/**
		Grille non réactive qui permet d'ajouter ou d'enlever des lignes ainsi que des colonnes
		Les colonnes factories doivent renvoyer un composant avec .domNode et .value()
	*/
	// var TableContainer = compose(HtmlContainer, {_tag: 'table'});
	// var TheadContainer = compose(HtmlContainer, {_tag: 'thead'});
	// var ThContainer = compose(_Destroyable, HtmlContainer, {_tag: 'th'});
	// var TrContainer = compose(HtmlContainer, {_tag: 'tr'});
	// var TdContainer = compose(HtmlContainer, {_tag: 'td'});
	// var BodyContainer = compose(HtmlContainer, {_tag: 'tbody'});

	var TableRow = compose(HtmlContainer, function() {
		this.domNode.style.display = 'table-row';
	});

	var TableCell = compose(HtmlContainer, function() {
		this.domNode.style.display = 'table-cell';
	});

	var DestroyableTableCell = compose(TableCell, _Destroyable);

	var RowContainer = compose(ItemListBase, {
		_rootFactory: function() {
			return new TableRow();
		},
		_itemFactory: function(cmpAndWidth) {
			var cmp = cmpAndWidth[0];
			var width = cmpAndWidth[1];
			return new TableCell().content([cmp]).bounds({width: width});
		}
	});

	var Row = compose(_Composite, function () {
		this._components = this._own({});
	}, {
		_rootFactory: function() {
			return new RowContainer();
		},
		value: function(value) {
			if (arguments.length === 0) {
				return this._value;
			}
			this._value = value;
			for (var k in this._components) {
				var cell = this._components[k];
				cell.value(value);
			}
		},
		add: function(column, key, beforeKey) {
			var factory = column.body;
			var cmp = factory();
			cmp.value(this.value());

			this._components[key] = cmp;
			this._root.add([cmp, column.width], key, beforeKey);
		},
		remove: function(key) {
			this._root.remove(key);
			destroy(this._components[key]);
			delete this._components[key];
		},
		move: function(key, beforeKey) {
			this._root.move(key, beforeKey);
		},
		clear: function() {
			this._root.clear();
			destroy(this._components);
		},
		active: function(active) {
			// this.domNode.classList[active ? 'add' : 'remove']('active');
			if (active) {
				this.activeStyle && this.activeStyle.apply(this.domNode);
			} else {
				this.activeStyle && this.activeStyle.unapply(this.domNode);
			}
		},
		style: function(style) {
			this._root.style(style);
		},
	});

	var FixedTable = compose(HtmlContainer, function() {
		this.domNode.style.display = 'table';
		this.domNode.style.tableLayout = 'fixed';
		this.domNode.style.width = 0;
	});

	var Body = compose(ItemListBase, function() {
		this._columns = {};
		this._columnsOrder = [];
	}, {
		_rootFactory: function() {
			return new FixedTable();
		},
		_itemFactory: function(item) {
			var row = new Row();
			row.value(item);
			return row;
		},
		onActiveRequest: function(cb) {
			var bodyNode = this.domNode;
			var components = this._components;
			this.domNode.addEventListener('click', function(ev) {
				var node = ev.target;
				while(node.parentNode !== bodyNode) {
					node = node.parentNode;
				}
				var rowKey;
				for (var key in components) {
					if (components[key].domNode === node) {
						rowKey = key;
						break;
					}
				}
				cb(rowKey);
			});
		},
		addRow: function(value, key, beforeKey) {
			var row = this.add(value, key, beforeKey);
			row.activeStyle = this._activeRowStyle;
			var columns = this._columns;
			this._columnsOrder.forEach(function(key) {
				var column = columns[key];
				row.add(column, key);
			});
		},
		getRow: function(key) {
			return this.get(key);
		},
		addColumn: function(col, key, beforeKey) {
			this._columns[key] = col;
			if (beforeKey) {
				this._columnsOrder.splice(this._columnsOrder.indexOf(beforeKey), 0, key);
			} else {
				this._columnsOrder.push(key);
			}
			for (var rowKey in this._components) {
				var row = this._components[rowKey];
				row.add(col, key, beforeKey);
			}
		},
		removeColumn: function(key) {
			delete this._columns[key];
			this._columnsOrder.splice(this._columnsOrder.indexOf(key), 1);
			for (var rowKey in this._components) {
				var row = this._components[rowKey];
				row.remove(key);
			}
		},
		moveColumn: function(key, beforeKey) {
			this._columnsOrder.splice(this._columnsOrder.indexOf(key), 1);
			this._columnsOrder.splice(this._columnsOrder.indexOf(beforeKey), 0, key);
			for (var rowKey in this._components) {
				var row = this._components[rowKey];
				row.move(key, beforeKey);
			}
		},
		activeRowStyle: function(style) {
			this._activeRowStyle = style;
		},
	});

	var HeadRow = compose(ItemListBase, {
		_rootFactory: function() {
			return new TableRow();
		},
		_itemFactory: function(column) {
			var headCmp = column.head;
			var th = new DestroyableTableCell();
			if (headCmp.domNode) {
				th.add(th._own(headCmp)); // headCmp is destroyed when the column is removed
			} else {
				th.domNode.textContent = headCmp;
			}
			th.bounds({width: column.width});
			return th;
		},

	});


	var Grid = compose(_Composite, function() {
		this._headRow = this._own(new HeadRow());
		this._body = this._own(new Body());
		// layout
		var thead = this._head = new FixedTable();
		thead.add(this._headRow);
		var bodyWrapper = new HtmlContainer([this._body]);
		this._root.content([
			[thead, { align: 'left' }],
			[bodyWrapper, { flex: true, align: 'left' }],
		]);
		bodyWrapper.domNode.style.overflowY = 'auto'; // vertical scroll
		bodyWrapper.domNode.style.display = 'inline-block';
		bodyWrapper.domNode.style.overflowX = 'hidden';
		this._root.domNode.style.overflowX = 'scroll'; // horizontal scroll
		this._root.domNode.style.overflowY = 'hidden';
	}, {
		_rootFactory: function() {
			return new VFlexContainer();
		},
		addRow: function(value, key, beforeKey) {
			this._body.addRow(value, key, beforeKey);
		},
		removeRow: function(key) {
			this._body.remove(key);
		},
		removeAllRows: function() {
			this._body.clear();
		},
		moveRow: function(key, beforeKey) {
			this._body.move(key, beforeKey);
		},
		getRow: function(key) {
			return this._body.getRow(key);
		},
		addColumn: function(col, key, beforeKey) {
			this._body.addColumn(col, key, beforeKey);
			this._headRow.add(col, key, beforeKey);
		},
		removeColumn: function(key) {
			this._headRow.remove(key);
			this._body.removeColumn(key);
		},
		moveColumn: function(key, beforeKey) {
			this._headRow.move(key, beforeKey);
			this._body.moveColumn(key, beforeKey);
		},
		// permet de manipuler la grille de façon non incrémentale
		// cela optimise, le rendu en réutilisant les composants existants
		value: function(value) {
			this._body.value(value);
		},
		active: function(key) {
			return arguments.length ? this._body.active(key) : this._body.active();
		},
		onActiveRequest: function(cb) {
			return this._body.onActiveRequest(cb);
		},
		style: function(style) {
			this._style = style;
			style.table && this._root.style(style.table);
			style.headCells && this._headRow.style({
				items: style.headCells,
			});
			style.body && this._body.style({
				items: {
					root: style.body.rows,
					items: style.body.cells,
				}
			});
			style.activeRow && this._body.activeRowStyle(style.activeRow);
			return this;
		},
	});

	return Grid;
});
