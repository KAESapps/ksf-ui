define([
	'compose',
	'ksf/dom/WithSize',
	'ksf/dom/Boundable',
], function(
	compose,
	WithSize,
	Boundable
){
	return compose(WithSize, Boundable, function(content) {
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