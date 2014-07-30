define([
	'compose',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
], function(
	compose,
	_Boundable,
	_Positionable,
	_WithSize,
	_Stylable
){
	return compose(_WithSize, _Positionable, _Stylable, function(content) {
		this.domNode = document.createElement('div');
		this._fixedChildren = [];
		this._flexChildren = [];

		content && this.content(content);
	}, {
		content: function(content) {
			var fixedChildren = this._fixedChildren = [],
			flexChildren = this._flexChildren = [];
			var self = this;

			// TODO: use HTMLContainer for appending children
			this.domNode.innerHTML = "";
			content.forEach(function(childAndOptions) {
				var child = childAndOptions[0] || childAndOptions,
					options = childAndOptions[1] || {};
				if (options.flex) {
					flexChildren.push(child);
				} else {
					fixedChildren.push(child);
				}
				child.position(self._childPosition);
				this.domNode.appendChild(child.domNode);
			}, this);

			this._applyInDom();
		},
		_applyInDom: function() {
			var inDom = this._inDom;
			this._fixedChildren.forEach(function(child) {
				child.inDom && child.inDom(inDom);
			});
			this._layout();
			this._flexChildren.forEach(function(child) {
				child.inDom && child.inDom(inDom);
			});
		},
		inDom: function(inDom) {
			this._inDom = inDom;
			this._applyInDom();
		},

		_layout: function() {
			if (this._inDom) {
				var totalFixedHeight = 0,
					innerSize = this.size();
				this._fixedChildren.forEach(function(child) {
					totalFixedHeight += child.size().height;
					child.bounds && child.bounds({
						width: innerSize.width
					});
				});
				var flexHeight = (innerSize.height - totalFixedHeight) / this._flexChildren.length;
				this._flexChildren.forEach(function(child) {
					child.bounds({
						height: flexHeight
					});
				});
			}
		},

		bounds: function() {
			_Boundable.prototype.bounds.apply(this, arguments);

			this._layout();
		}
	});
});