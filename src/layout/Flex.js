define([
	'compose',
	'ksf/dom/Boundable',
	'ksf/dom/WithSize',
], function(
	compose,
	Boundable,
	WithSize
){
	return compose(WithSize, function(config) {
		this.domNode = document.createElement('div');
		this._fixedChildren = [];
		this._flexChildren = [];

		if (config) {
			config.content && this.content(config.content);
			config.bounds && this.bounds(config.bounds);
		}
	}, {
		content: function(content) {
			var fixedChildren = this._fixedChildren = [],
			flexChildren = this._flexChildren = [];

			content.forEach(function(childAndOptions) {
				var child = childAndOptions[0],
					options = childAndOptions[1];
				child = child || childAndOptions;
				if (options && options.flex) {
					flexChildren.push(child);
				} else {
					fixedChildren.push(child);
				}
				this.domNode.appendChild(child.domNode);
			}, this);
		},
		inDom: function(inDom) {
			this._inDom = inDom;
			this._fixedChildren.forEach(function(child) {
				child.inDom && child.inDom(inDom);
			});
			this._layout();
			this._flexChildren.forEach(function(child) {
				child.inDom && child.inDom(inDom);
			});
		},

		_layout: function() {
			if (this._inDom) {
				var totalFixedHeight = 0;
				this._fixedChildren.forEach(function(child) {
					totalFixedHeight += child.size().height;
				});
				var flexHeight = (this.size().height - totalFixedHeight) / this._flexChildren.length;
				this._flexChildren.forEach(function(child) {
					child.bounds({
						height: flexHeight
					});
				});
			}
		},

		bounds: function(bounds) {
			Boundable.bounds.apply(this, arguments);

			this._layout();
		}
	});
});