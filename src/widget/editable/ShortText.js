define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/style/_Stylable',
	'./base/ShortText',
	'./base/_WithAccessor',
], function(
	compose,
	_Composite,
	_Stylable,
	ShortText,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, _Stylable, {
		_rootFactory: function() {
			return new ShortText();
		}
	}, {
		style: function(style) {
			this._root.style(style);
		},
		focus: function() {
			this._root.focus();
		}
	});
});