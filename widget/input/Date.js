define([
	'ksf/utils/compose',
	'./_DomInput'
], function(
	compose,
	_DomInput
){
	return compose(_DomInput, function() {
		this.domNode.type = 'date';
	}, {
		_getValue: function() {
			return this.domNode.valueAsDate;
		},
		_setValue: function(value) {
			this.domNode.valueAsDate = value;
		},
	});
});