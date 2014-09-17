define([
	'compose',
	'./_DomInput'
], function(
	compose,
	_DomInput
){
	// allow for null value. It can only be set programmatically and not by user interaction.
	return compose(_DomInput, function() {
		this.domNode.type = 'checkbox';
		this.domNode.indeterminate = true;
	}, {
		_getValue: function() {
			if (this.domNode.indeterminate) {
				return null;
			}
			return this.domNode.checked;
		},
		_setValue: function(value) {
			if (value === null) {
				this.domNode.indeterminate = true; // display null value
			} else {
				this.domNode.indeterminate = false; // display null value
				this.domNode.checked = !!value;
			}
		},
	});
});