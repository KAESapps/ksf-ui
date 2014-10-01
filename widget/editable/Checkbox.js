define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./base/Checkbox',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	_RootStylable,
	Checkbox,
	_WithAccessor
){
	return compose(_Composite, _RootStylable, _WithAccessor, {
		_rootFactory: function() {
			return new Checkbox();
		},
	});
});