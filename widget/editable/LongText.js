define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'./base/LongText',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	LongText,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new LongText();
		}
	});
});