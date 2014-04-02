define([
	'compose',
	'./base/ShortText',
	'./base/_WithAccessor'
], function(
	compose,
	ShortText,
	_WithAccessor
){
	return compose(ShortText, _WithAccessor);
});