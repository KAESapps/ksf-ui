define([
	'compose',
	'./base/Number',
	'./base/_WithAccessor'
], function(
	compose,
	Number,
	_WithAccessor
){
	return compose(Number, _WithAccessor);
});