define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/_Clickable',
	'../../layout/Flow',
	'./Label',
	'ksf/base/_Chainable'
], function(
	compose,
	_Composite,
	_Clickable,
	Flow,
	Label,
	_Chainable
){
	return compose(_Composite, _Clickable, _Chainable, {
		_rootFactory: function(iconChar, label) {
			return new Flow({
				display: 'inline-block',
				verticalAlign: 'middle'
			}).content([
				this._own(new Label(iconChar), 'icon'),
				this._own(new Label(label), 'text'),
			]);
		}
	}, {
		style: function(style) {
			this._root.style(style.root);
			this._owned.icon.style(style.icon);
			this._owned.text.style(style.text);
		}
	});
});