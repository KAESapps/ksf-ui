define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable'
], function(
	compose,
	_WithSize,
	_Stylable
) {
	return compose(function(label) {
		this.domNode = document.createElement('span');
		this.value(label);
	}, _WithSize, _Stylable, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});