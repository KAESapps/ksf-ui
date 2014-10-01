define([
	'ksf/utils/compose',
	'./_DomInput'
], function(
	compose,
	_DomInput
){
	return compose(_DomInput, function() {
		this.domNode.type = 'number';
	}, {
		_getValue: function() {
			var input = this.domNode.valueAsNumber;
			if (isNaN(input)) {
				return null;
			} else {
				return input;
			}
		},
		_setValue: function(value) {
			if (value === null) {
				this.domNode.value = null;
			} else {
				this.domNode.valueAsNumber = value;
			}
		},
	});
});