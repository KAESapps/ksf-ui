define([
	'compose',
	'../base/HtmlContainer',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
], function(
	compose,
	HtmlContainer,
	_WithSize,
	_Boundable
){
	return compose(_WithSize, _Boundable, function(content) {
		this._container = new HtmlContainer();
		this.domNode = this._container.domNode;
		this.domNode.style.position = 'relative';
		content && this.content(content);
	}, {
		_layout: function() {
			var innerSize = this.size();

			this._content && this._content.forEach(function(childAndOptions, index) {
				var child = childAndOptions[0] || childAndOptions,
					options = childAndOptions[1] || {};

				var childStyle = child.domNode.style,
					childWBound, childHBound;

				childStyle.position = 'absolute';
				childStyle.zIndex = index;

				switch (options.verticalAlign) {
					case 'top':
						childStyle.top = 0; break;
					case 'bottom':
						childStyle.bottom = 0; break;
					case 'middle':
						var childHeight = child.size().height,
							heightMargin = innerSize.height - childHeight;
						childStyle.top = heightMargin / 2 + 'px'; break;
					default:	// fit
						childHBound = innerSize.height;
				}

				switch (options.horizontalAlign) {
					case 'right':
						childStyle.right = 0; break;
					case 'left':
						childStyle.left = 0; break;
					case 'middle':
						var childWidth = child.size().width,
							widthMargin = innerSize.width - childWidth;
						childStyle.left = widthMargin / 2 + 'px'; break;
					default:
						childWBound = innerSize.width;
				}
				
				child.bounds({
					height: childHBound,
					width: childWBound,
					heightMax: innerSize.height,
					widthMax: innerSize.width
				});
			});
		},
		content: function(content) {
			this._container.content(content.map(function(childAndOptions) {
				return childAndOptions[0] || childAndOptions;
			}));
			this._content = content;
			this._applyInDom();
			this._layout();
		},
		_applyInDom: function() {
			var inDom = this._inDom;
			this._content && this._content.forEach(function(childAndOptions) {
				var child = childAndOptions[0] || childAndOptions;
				child.inDom && child.inDom(inDom);
			});
		},
		inDom: function(inDom) {
			this._inDom = inDom;
			this._applyInDom();
		},
		bounds: function() {
			_Boundable.bounds.apply(this, arguments);
			this._layout();
		}
	});
});