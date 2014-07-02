define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./base/ShortText',
	'./base/_WithAccessor',
], function(
	compose,
	_Composite,
	_RootStylable,
	ShortText,
	_WithAccessor
){
	return compose(_Composite, _RootStylable, _WithAccessor, {
		_rootFactory: function() {
			return new ShortText();
		}
	}, {
		focus: function() {
			this._root.focus();
		},
		onBlur: function(cb) {
			return this._root.onBlur(cb);
		}
	});
});