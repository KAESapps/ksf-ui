define([
	'compose',
	'ksf/dom/composite/CompositeBase',
	'../layout/Flow',
	'ksf/utils/destroy',
], function(
	compose,
	CompositeBase,
	FlowContainer,
	destroy
){
	return compose(CompositeBase, function () {
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
			this._root.add(cmp, index);
			this._components.splice(index, 0, cmp);
			return cmp;
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
});