define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable',
	'ksf/base/_Chainable',
	'./_Clickable',
	'./_Focusable'
], function(
	compose,
	_WithSize,
	_Positionable,
	_Stylable,
	_Chainable,
	_Clickable,
	_Focusable
) {
	return compose(function(label) {
		this.domNode = document.createElement('button');
		label !== undefined && this.value(label);
	},
	_WithSize, _Positionable, _Stylable, _Chainable, _Clickable, _Focusable, {
		value: function(label) {
			this.domNode.textContent = (label === undefined ? null : label);
		}
	});
});