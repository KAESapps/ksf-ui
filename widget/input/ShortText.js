define([
	'ksf/utils/compose',
	'./_DomInput',
], function(
	compose,
	_DomInput
){
	return compose(_DomInput, function(options) {
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