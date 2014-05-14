define([
	'compose',
	'ksf/dom/_WithSize'
], function(
	compose,
	_WithSize
) {
	return compose(_WithSize, function(field, label) {
		this.domNode = document.createElement('label');
		this.domNode.textContent = label;
		this._field = field;
		this.domNode.appendChild(field.domNode);
	}, {
		inDom: function(inDom) {
			this._field.inDom && this._field.inDom(inDom);
		}
	});
});