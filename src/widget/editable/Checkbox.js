define([
	'compose',
	'./base/Checkbox',
	'./base/_WithAccessor'
], function(
	compose,
	Checkbox,
	_WithAccessor
){
	return compose(Checkbox, _WithAccessor);
});