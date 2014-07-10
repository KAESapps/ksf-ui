define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'ksf/base/Chainable',
	'./_Clickable',
	'./_Focusable'
], function(
	compose,
	_WithSize,
	_Stylable,
	Chainable,
	_Clickable,
	_Focusable
) {
	return compose(function(label) {
		this.domNode = document.createElement('button');
		label !== undefined && this.value(label);
	},
	_WithSize, _Stylable, Chainable, _Clickable, _Focusable, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});