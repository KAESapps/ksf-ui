define([
	'compose',
	'./base/LongText',
	'./base/_WithAccessor'
], function(
	compose,
	LongText,
	_WithAccessor
){
	return compose(LongText, _WithAccessor);
});