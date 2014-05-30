define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/Number',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	NumberWidget,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new NumberWidget();
		},
		style: function(style) {
			this._root.style(style);
		}
	});
});