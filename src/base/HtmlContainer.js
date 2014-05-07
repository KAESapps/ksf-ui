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
		this.domNode = document.createElement(this._tag);
		content && this._appendContent(content);
	}, {
		_tag: 'div', // div par défaut
		_appendContent: function(content) {
			// TODO: comparer avec une implémentation basée sur documentFragment
			content.forEach(function(child) {
				this.domNode.appendChild(child.domNode);
			}, this);
		},
		content: function(content) {
			this.clear();
			this._appendContent(content);
		},
		clear: function() {
			while(this.domNode.lastChild) {
				this.domNode.removeChild(this.domNode.lastChild);
			}
		},
		add: function(child, beforeChild) {
			this.domNode.insertBefore(child.domNode, beforeChild && beforeChild.domNode);
		},
		remove: function(child) {
			this.domNode.removeChild(child.domNode);
		},
		move: function(child, beforeChild) {
			this.domNode.insertBefore(child.domNode, beforeChild && beforeChild.domNode);
		}
	});
});