define([
	'compose',
	'ksf/dom/composite/CompositeBase',
	'./ListBase'
], function(
	compose,
	CompositeBase,
	ListBase
){
	/**
		List permettant d'afficher une liste ordonnée d'éléments uniques et identifiés d'un store observable (accessible via store.filter(...).sort(...))
		A la différence d'une liste destinée à afficher le contenu d'un array, on passe à la factory un itemAcessor et non pas la valeur du array directement
	*/
	return compose(CompositeBase, {
		_rootFactory: function() {
			// TODO: permettre d'injecter plus facilement le "root", c'est à dire un MapContainer, c'est à dire un objet avec une factory et des méthodes content, add, remove, move et clear
			// en fait, il faudrait peut-être plutôt faire un mixin "list/_WithSortedAccessorContent"
			return compose.create(ListBase, {
				_itemFactory: this._itemFactory,
			});
		},
		content: function(sortedAccessor) {
			var self = this;
			var root = this._root;
			root.content(sortedAccessor.items());
			this._contentCanceler && this._contentCanceler();
			this._contentCanceler = sortedAccessor.onItemChanges(function(changes) {
				changes.forEach(function(change) {
					if (change.type === 'remove') {
						root.remove(change.index);
					}
					if (change.type === 'add') {
						root.add(change.item, change.index);
					}
					if (change.type === 'move') {
						root.move(change.from, change.to);
					}
				});
			});
		},
	});
});