define([
	'compose',
	'../../editable/LongText',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	LongText,
	_WithStyle,
	JSS
){
	return compose(LongText, _WithStyle, {
		_style: new JSS({
			padding: '0.5em',
			borderRadius: '4px',
			border: '1px solid #ccc'
		})
	});
});