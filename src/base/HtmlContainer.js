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
		this._children = [];
		content && this._appendContent(content);
	}, {
		_tag: 'div', // div par défaut
		_appendContent: function(content) {
			// TODO: comparer avec une implémentation basée sur documentFragment
			content.forEach(function(child) {
				this.domNode.appendChild(child.domNode);
				this._children.push(child);
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
			this._children.forEach(function(child) {
				child.inDom && child.inDom(false);
			}, this);
			this._children = [];
		},
		add: function(child, beforeChild) {
			this.domNode.insertBefore(child.domNode, beforeChild && beforeChild.domNode);
			this._children.push(child);
			child.inDom && child.inDom(this._inDom);
		},
		remove: function(child) {
			this.domNode.removeChild(child.domNode);
			var index = this._children.indexOf(child);
			if (index > -1) {
				this._children.splice(index, 1);
			}
			child.inDom && child.inDom(false);
		},
		move: function(child, beforeChild) {
			this.domNode.insertBefore(child.domNode, beforeChild && beforeChild.domNode);
		},
		inDom: function(inDom) {
			this._children.forEach(function(child) {
				child.inDom && child.inDom(inDom);
			}, this);
			this._inDom = inDom;
		}
	});
});