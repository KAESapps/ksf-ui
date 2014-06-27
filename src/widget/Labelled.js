define([
	'compose',
	'ksf/dom/_WithSize',
], function(
	compose,
	_WithSize
) {
	return compose(_WithSize, function(field, label) {
		this.domNode = document.createElement('label');
		this._label = document.createElement('span');
		this._label.textContent = label;
		this._field = field;
		this.domNode.appendChild(this._label);
		this.domNode.appendChild(field.domNode);
	}, {
		inDom: function(inDom) {
			this._field.inDom && this._field.inDom(inDom);
		},
		style: function(style) {
			style.root && style.root.apply(this.domNode);
			style.label && style.label.apply(this._label);
		},
	});
});