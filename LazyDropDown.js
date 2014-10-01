define([
	'ksf/utils/compose',
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
		_open: function() {
			// create popup component
			var popup = this._popupFactory.call(this._popupFactoryScope || null);
			this.popup(popup);
			DropDown.prototype._open.apply(this, arguments);
		},
		_close: function() {
			this._root.open(false);
			this._popup.destroy && this._popup.destroy();
			this.popup(null);
			delete this._popup;
		},
	});

});