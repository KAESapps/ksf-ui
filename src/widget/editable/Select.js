define([
	'compose',
	'./base/Select',
	'./base/_WithAccessor'
], function(
	compose,
	Select,
	_WithAccessor
){
	return compose(Select, function(options, value) {
		this.options(options.value());
		_WithAccessor.call(this, value);
	});
});