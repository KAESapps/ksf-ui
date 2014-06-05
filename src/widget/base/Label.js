define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable'
], function(
	compose,
	_WithSize,
	_Stylable
) {
	return compose(_WithSize, _Stylable, function(label) {
		this.domNode = document.createElement('span');
		label && this.value(label);
	}, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});