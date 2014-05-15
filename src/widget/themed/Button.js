define([
	'compose',
	'../Button',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS',
	'./styles/button'
], function(
	compose,
	Button,
	_WithStyle,
	JSS,
	style
){
	return compose(Button, _WithStyle, {
		_style: new JSS(style)
	});
});