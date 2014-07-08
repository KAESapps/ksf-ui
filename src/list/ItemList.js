define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./ItemListBase'
], function(
	compose,
	_Composite,
	_RootStylable,
	ItemListBase
){
	/**
		List permettant d'afficher une liste ordonnée d'éléments uniques et identifiés d'un store observable (accessible via store.filter(...).sort(...))
		A la différence d'une liste destinée à afficher le contenu d'un array, on passe à la factory un itemAcessor et non pas la valeur du array directement
	*/

	return compose(_Composite, _RootStylable, {
		_rootFactory: function() {
			// TODO: permettre d'injecter plus facilement le "root", c'est à dire un MapContainer, c'est à dire un objet avec une factory et des méthodes content, add, remove, move et clear
			// en fait, il faudrait peut-être plutôt faire un mixin "list/_WithSortedAccessorContent"
			return compose.create(ItemListBase, {
				_itemFactory: this._itemFactory,
			});
		},
		content: function(sortedStore) {
			var root = this._root;
			this._sortedStore = sortedStore;
			var storeValue = sortedStore.value();
			root.content(storeValue.map(function(key) {
				return {
					key: key,
					value: sortedStore.item(key)
				};
			}));
			this._own(sortedStore.onChange(function(changes) {
				var newStoreValue = sortedStore.value();
				changes.forEach(function(change) {
					if (change.type === 'remove') {
						root.remove(storeValue[change.index]);
						storeValue.splice(change.index, 1);
					}
					if (change.type === 'add') {
						root.add(sortedStore.item(change.value), change.value, storeValue[change.index]);
						storeValue.splice(change.index, 0, change.value);
					}
					if (change.type === 'move') {
						root.move(storeValue[change.from], storeValue[change.to]);
					}
				});
				storeValue = newStoreValue;
			}), 'contentObserver');
		},
		active: function(key) {
			if (arguments.length) {
				this._root.active(key);
			} else {
				return this._root.active();
			}
		},
		onActiveRequest: function(cb) {
			return this._root.onActiveRequest(cb);
		},
	});
});