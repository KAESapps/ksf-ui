define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
], function(
	compose,
	_WithSize,
	_Boundable
){
	return compose(_WithSize, _Boundable, function(content) {
		this.domNode = document.createElement('div');
		content && this.content(content);
	}, {
		content: function(content) {
			this._child && this.domNode.removeChild(this._child.domNode);
			this.domNode.appendChild(content.domNode);
			this._child = content;

			this._applyInDom();
			this._applyBounds();
		},
		_applyInDom: function() {
			this._child && this._child.inDom && this._child.inDom(this._inDom);
		},
		inDom: function(inDom) {
			this._inDom = inDom;
			this._applyInDom();
		},
		_applyBounds: function() {
			this._child && this._child.bounds && this._child.bounds(this._bounds);
		},
		bounds: function(bounds) {
			this._bounds = bounds;
			this._applyBounds();
		}
	});
});