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
			this._childInDom(false);
			this.domNode.appendChild(content.domNode);
			this._child = content;
			this._childInDom(this._inDom);
		},
		_childInDom: function(inDom) {
			this._child && this._child.inDom && this._child.inDom(inDom);
		},
		inDom: function(inDom) {
			this._childInDom(inDom);
			this._inDom = inDom;
		}
	});
});