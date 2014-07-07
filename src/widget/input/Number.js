define([
	'compose',
	'./_DomInput'
], function(
	compose,
	_DomInput
){
	return compose(_DomInput, function() {
		this.domNode.type = 'number';
	}, {
		_getValue: function() {
			return this.domNode.valueAsNumber;
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