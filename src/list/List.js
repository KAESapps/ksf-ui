define([
	'compose',
	'ksf/dom/composite/CompositeBase',
	'../layout/Flow'
], function(
	compose,
	CompositeBase,
	FlowContainer
){
	return compose(CompositeBase, {
		_rootFactory: function() {
			return new FlowContainer();
		},
		content: function(sortedAccessor) {
			var self = this;
			this._root.content(sortedAccessor.items().map(function(itemAccessor) {
				return self._itemFactory(itemAccessor);
			}));
			sortedAccessor.on('itemChanges', function(changes) {
				changes.forEach(function(change) {
					if (change.type === 'remove') {
						self.remove(change.index);
					}
					if (change.type === 'add') {
						self.add(change.item, change.index);
					}
					if (change.type === 'move') {
						self.move(change.from, change.to);
					}
				});
			});
		},
		add: function(itemData, index) {
			this._root.add(this._itemFactory(itemData), index);
		},
		remove: function(index) {
			this._root.remove(index);
		},
		move: function(from, to) {
			this._root.move(from, to);
		}
	});
});