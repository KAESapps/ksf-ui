define([
	'compose',
	'../../editable/Number',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	Number,
	_WithStyle,
	JSS
){
	return compose(Number, _WithStyle, {
		_style: new JSS({
			padding: '0.5em',
			borderRadius: '4px',
			border: '1px solid #ccc',
		})
	});
});