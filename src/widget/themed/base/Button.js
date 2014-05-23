define([
	'compose',
	'../../base/Button',
	'ksf/dom/style/JSS',
	'../styles/button'
], function(
	compose,
	Button,
	JSS,
	style
){
	return compose(Button, {
		_style: new JSS(style)
	});
});