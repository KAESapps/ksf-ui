define([
	'compose',
	'./base/Date',
	'./base/_WithAccessor'
], function(
	compose,
	Date,
	_WithAccessor
){
	return compose(Date, _WithAccessor);
});