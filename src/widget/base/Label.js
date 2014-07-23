define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable',
	'ksf/base/_Chainable',
], function(
	compose,
	_WithSize,
	_Positionable,
	_Stylable,
	_Chainable
) {
	return compose(function(label) {
		this.domNode = document.createElement('span');
		label !== undefined && this.value(label);
	}, _WithSize, _Positionable, _Stylable, _Chainable, {
		value: function(label) {
			if (arguments.length) {
				this.domNode.textContent = (label === undefined ? null : label);
			} else {
				return this.domNode.textContent;
			}
		}
	});
});