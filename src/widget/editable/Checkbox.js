define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/Checkbox',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	Checkbox,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new Checkbox();
		}
	});
});