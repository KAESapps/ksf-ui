define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/ShortText',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	ShortText,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new ShortText();
		}
	});
});