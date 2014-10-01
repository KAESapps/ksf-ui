define([
	'ksf/utils/compose',
	'../../editable/Number',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS',
	'../styles/shortText'
], function(
	compose,
	Number,
	_WithStyle,
	JSS,
	style
){
	return compose(Number, _WithStyle, {
		_style: new JSS(style)
	});
});