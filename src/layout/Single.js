define([
	'compose',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable',
], function(
	compose,
	_WithSize,
	_Boundable,
	_Positionable,
	_Stylable
){
	return compose(_WithSize, _Positionable, _Stylable, function(content) {
		this.domNode = document.createElement('div');
		this.content(content);
	}, {
		content: function(content) {
			// remove previous content
			this._child && this.domNode.removeChild(this._child.domNode);
			this._childInDom(false);
			// set new content
			this._child = content;
			if (content && content.domNode) {
				this.domNode.appendChild(content.domNode);
				this._childInDom(this._inDom);
				this._layout();
			}
		},
		_childInDom: function(inDom) {
			this._child && this._child.inDom && this._child.inDom(inDom);
		},
		inDom: function(inDom) {
			this._childInDom(inDom);
			this._inDom = inDom;
		}
	},_Boundable, {
		_layout: function() {
			this._child && this._child.bounds(this._bounds);
		},
		bounds: function(bounds) {
			_Boundable.prototype.bounds.apply(this, arguments);
			this._bounds = bounds;
			this._layout();
		}
	});
});