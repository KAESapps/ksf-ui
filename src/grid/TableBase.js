define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/base/_Destroyable',
	'../base/HtmlContainer',
	'ksf/utils/destroy',
	'../list/ListBase',
], function(
	compose,
	_Composite,
	_Destroyable,
	HtmlContainer,
	destroy,
	ListBase
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

	var Row = compose(_Composite, function () {
		this._components = this.own([]);
	}, {
		_rootFactory: function() {
			return new TrContainer();
		},
		value: function(value) {
			if (arguments.length === 0) {
				return this._value;
			}
			this._value = value;
			this._components.forEach(function(cmp) {
				cmp.value(value);
			});
		},
		add: function(factory, index) {
			index === undefined && (index = this._components.length);
			var cmp = factory();
			cmp.value(this.value());
			var td = new TdContainer();
			td.add(cmp);
			this._root.add(td, index);
			this._components.splice(index, 0, cmp);
		},
		remove: function(index) {
			this._root.remove(index);
			var cmp = this._components.splice(index, 1);
			destroy(cmp[0]);
		},
		move: function(from, to) {
			this._root.move(from, to);
			var cmp = this._components.splice(from, 1);
			this._components.splice(to, 0, cmp[0]);
		},
		clear: function() {
			this._root.clear();
			destroy(this._components);
		},
	});

	var Body = compose(ListBase, {
		_rootFactory: function() {
			return new BodyContainer();
		},
		_itemFactory: function(item) {
			var row = new Row();
			row.value(item);
			return row;
		},
	});

	var HeadRow = compose(ListBase, {
		_rootFactory: function() {
			return new TrContainer();
		},
		_itemFactory: function(headCmp) {
			var th = new ThContainer();
			if (headCmp.domNode) {
				th.add(th.own(headCmp)); // headCmp is destroyed when the column is removed
			} else {
				th.domNode.textContent = headCmp;
			}
			return th;
		},
	});


	var Grid = compose(_Composite, function() {
		this._columns = [];
		this._headRow = this.own(new HeadRow());
		this._body = this.own(new Body());
		// layout
		var thead = new TheadContainer();
		thead.add(this._headRow);
		this._root.add(thead);
		this._root.add(this._body);
	}, {
		_rootFactory: function() {
			return new TableContainer();
		},
		addRow: function(value, index) {
			var row = this._body.add(value, index);
			this._columns.forEach(function(column, index) {
				row.add(column.body, index);
			});
		},
		removeRow: function(index) {
			this._body.remove(index);
		},
		moveRow: function(from, to) {
			this._body.move(from, to);
		},
		addColumn: function(col, index) {
			index === undefined && (index = this._columns.length);
			this._columns.splice(index, 0, col);
			this._headRow.add(col.head, index);
			this._body._components.forEach(function(row) {
				row.add(col.body, index);
			});
		},
		removeColumn: function(index) {
			this._columns.splice(index, 1);
			this._headRow.remove(index);
			this._body._components.forEach(function(row) {
				row.remove(index);
			});
		},
		moveColumn: function(from, to) {
			var col = this._columns.splice(from, 1);
			this._columns.splice(to, 0, col[0]);
			this._headRow.move(from, to);
			this._body._components.forEach(function(row) {
				row.move(from, to);
			});
		},
		// permet de manipuler la grille de façon non incrémentale
		// cela optimise, le rendu en réutilisant les composants existants
		value: function(value) {
			// met à jour la valeur de chaque ligne, en crée si besoin
			var rows = this._body._components;
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
	});

	return Grid;
});