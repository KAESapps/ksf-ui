define([
	'compose',
	'./_DomInput',
	'../base/_Focusable',
], function(
	compose,
	_DomInput,
	_Focusable
){
	return compose(_DomInput, _Focusable, function(options) {
		this.domNode.type = 'text';
		if (options && options.placeholder) { this.domNode.placeholder = options.placeholder; }
		if (options && options.value !== undefined) { this.value(options.value); }
	}, {
		_getValue: function() {
			return this.domNode.value;
		},
		_setValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		},
	});
});