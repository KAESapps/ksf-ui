define([
	'ksf/utils/compose',
	'../../base/Button',
	'ksf/dom/style/JSS',
	'../styles/button'
], function(
	compose,
	Button,
	JSS,
	styleProps
){
	var style = new JSS(styleProps);
	return compose(Button, function() {
		this.style(style);
	});
});