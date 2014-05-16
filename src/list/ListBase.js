define([
	'compose',
	'ksf/dom/composite/_Composite',
	'../layout/Flow',
	'ksf/utils/destroy',
], function(
	compose,
	_Composite,
	FlowContainer,
	destroy
){
	return compose(_Composite, function () {
		this._components = this.own([]);
	}, {
		_rootFactory: function() {
			return new FlowContainer(); // default container
		},
		content: function(items) {
			var self = this;
			this.clear();
			this.unown(this._components);
			this._components = this.own(items.map(function(item) {
				return self._itemFactory(item);
			}));
			this._root.content(this._components);
		},
		add: function(item, index) {
			index === undefined && (index = this._components.length);
			var cmp = this._itemFactory(item);
			var beforeCmp = this._components[index];
			this._root.add(cmp, beforeCmp);
			this._components.splice(index, 0, cmp);
			return cmp;
		},
		remove: function(index) {
			var cmp = this._components.splice(index, 1)[0];
			this._root.remove(cmp);
			destroy(cmp);
		},
		move: function(from, to) {
			var fromCmp = this._components.splice(from, 1)[0];
			var toCmp = this._components.splice(to, 0, fromCmp)[0];
			this._root.move(fromCmp, toCmp);
		},
		clear: function() {
			this._root.clear();
			destroy(this._components);
		},
	});
});