define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'ksf/base/Chainable',
], function(
	compose,
	_WithSize,
	_Stylable,
	Chainable
) {
	return compose(function(label) {
		this.domNode = document.createElement('span');
		label !== undefined && this.value(label);
	}, _WithSize, _Stylable, Chainable, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});