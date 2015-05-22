define([
	'compose',
	'../../editable/Select',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	Select,
	_WithStyle,
	JSS
){
	return compose(Select, _WithStyle, {
		_style: new JSS({
			padding: '0.5ex',
			margin: 0
		})
	});
});