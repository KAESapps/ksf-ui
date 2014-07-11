define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/base/_Destroyable',
	'../base/HtmlContainer',
	'ksf/utils/destroy',
	'../list/ItemListBase',
], function(
	compose,
	_Composite,
	_Destroyable,
	HtmlContainer,
	destroy,
	ItemListBase
){
	/**
		Grille non réactive qui permet d'ajouter ou d'enlever des lignes ainsi que des colonnes
		Les colonnes factories doivent renvoyer un composant avec .domNode et .value()
	*/
	var TableContainer = compose(HtmlContainer, {_tag: 'table'});
	var TheadContainer = compose(HtmlContainer, {_tag: 'thead'});
	var ThContainer = compose(_Destroyable, HtmlContainer, {_tag: 'th'});
	var TrContainer = compose(HtmlContainer, {_tag: 'tr'});
	var TdContainer = compose(HtmlContainer, {_tag: 'td'});
	var BodyContainer = compose(HtmlContainer, {_tag: 'tbody'});

	var RowContainer = compose(ItemListBase, {
		_rootFactory: function() {
			return new TrContainer();
		},
		_itemFactory: function(cmp) {
			return new TdContainer([cmp]);
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
		add: function(factory, key, beforeKey) {
			var cmp = factory();
			cmp.value(this.value());

			this._components[key] = cmp;
			this._root.add(cmp, key, beforeKey);
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
			this.domNode.classList[active ? 'add' : 'remove']('active');
		},
		style: function(style) {
			this._root.style(style);
		},
	});

	var Body = compose(ItemListBase, function() {
		this._columns = {};
		this._columnsOrder = [];
	}, {
		_rootFactory: function() {
			return new BodyContainer();
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
			var columns = this._columns;
			this._columnsOrder.forEach(function(key) {
				var column = columns[key];
				row.add(column.body, key);
			});
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
				row.add(col.body, key, beforeKey);
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
		// deprecated
/*		value: function(value) {
			// met à jour la valeur de chaque ligne, en crée si besoin
			var rows = this._components;
			value.forEach(function(v, i) {
				var row = rows[i];
				if (! row) {
					row = this.addRow(v, i);
				} else {
					rows[i].value(v);
				}
			}, this);
			// et supprime les lignes en trop
			var valueLength = value.length;
			while (rows.length > valueLength) {
				this.removeRow(valueLength);
			}
		},
*/	});

	var HeadRow = compose(ItemListBase, {
		_rootFactory: function() {
			return new TrContainer();
		},
		_itemFactory: function(headCmp) {
			var th = new ThContainer();
			if (headCmp.domNode) {
				th.add(th._own(headCmp)); // headCmp is destroyed when the column is removed
			} else {
				th.domNode.textContent = headCmp;
			}
			return th;
		},

	});


	var Grid = compose(_Composite, function() {
		this._headRow = this._own(new HeadRow());
		this._body = this._own(new Body());
		// layout
		var thead = this._head = new TheadContainer();
		thead.add(this._headRow);
		this._root.add(thead);
		this._root.add(this._body);
	}, {
		_rootFactory: function() {
			return new TableContainer();
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
		addColumn: function(col, key, beforeKey) {
			this._body.addColumn(col, key, beforeKey);
			this._headRow.add(col.head, key, beforeKey);
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
			style.bodyCells && this._body.style({
				items: {
					root: style.rows,
					items: style.bodyCells,
				}
			});
		},
	});

	return Grid;
});