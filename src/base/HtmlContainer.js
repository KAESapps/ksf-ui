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
		add: function(child, index) {
			index === undefined && (index = this.domNode.children.length);
			this.domNode.insertBefore(child.domNode, this.domNode.children[index]);
		},
		remove: function(index) {
			this.domNode.removeChild(this.domNode.children[index]);
		},
		move: function(from, to) {
			var toNode = this.domNode.children[to],
				fromNode = this.domNode.children[from];
			this.domNode.insertBefore(fromNode, toNode);
		}
	});
});