define([
	'compose',
	'../../editable/ShortText',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS',
	'../styles/shortText'
], function(
	compose,
	ShortText,
	_WithStyle,
	JSS,
	style
){
	return compose(ShortText, _WithStyle, {
		_style: new JSS(style)
	});
});