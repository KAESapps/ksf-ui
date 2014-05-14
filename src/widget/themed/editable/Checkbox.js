define([
	'compose',
	'../../editable/Checkbox',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	Checkbox,
	_WithStyle,
	JSS
){
	return compose(Checkbox, _WithStyle, {
		_style: new JSS({
			padding: '0.5em',
			height: '1em',
			width: '1em',
		})
	});
});