define([
	'compose',
	'../../editable/ShortText',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	ShortText,
	_WithStyle,
	JSS
){
	return compose(ShortText, _WithStyle, {
		_style: new JSS({
			padding: '0.5em',
			borderRadius: '4px',
			border: '1px solid #ccc',
		})
	});
});