define([
	'compose',
	'ksf/dom/_WithSize'
], function(
	compose,
	_WithSize
) {
	return compose(_WithSize, function(label) {
		this.domNode = document.createElement('div');
		label && this.value(label);
	}, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});