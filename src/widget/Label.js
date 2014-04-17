define([
	'compose',
	'ksf/dom/WithSize'
], function(
	compose,
	WithSize
) {
	return compose(WithSize, function(label) {
		this.domNode = document.createElement('span');
		this.value(label);
	}, {
		value: function(label) {
			this.domNode.textContent = label === undefined ? null : label;
		}
	});
});