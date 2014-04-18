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
		}
	});
});