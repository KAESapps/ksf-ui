define([
	'compose',
	'./DropDown',
], function(
	compose,
	DropDown
){

	return compose(DropDown, {
		popupFactory: function(popupFactory, scope) {
			this._popupFactory = popupFactory;
			this._popupFactoryScope = scope;
			return this;
		},
		_open: function(options) {
			// create popup component
			var popup = this._popupFactory.call(this._popupFactoryScope || null);
			this.popup(popup);
			this._root.open(true, options);
		},
		_close: function() {
			this._root.open(false);
			this._popup.destroy && this._popup.destroy();
			this.popup(null);
			delete this._popup;
		},
	});

});