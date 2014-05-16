define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/Select',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	Select,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new Select();
		}
	}, function(value, options) {
		this._root.options(options.value());
	});
});