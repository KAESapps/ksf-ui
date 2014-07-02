define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/Date',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	Date,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new Date();
		},
		style: function(style) {
			this._root.style(style);
		},
		focus: function() {
			this._root.focus();
		},
		onBlur: function(cb) {
			return this._root.onBlur(cb);
		}
	});
});