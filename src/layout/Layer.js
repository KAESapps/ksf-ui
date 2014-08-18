define([
	'compose',
	'../base/HtmlContainer',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable'
], function(
	compose,
	HtmlContainer,
	_WithSize,
	_Boundable,
	_Positionable,
	_Stylable
){
	return compose(_WithSize, _Stylable, function(content) {
		this._container = new HtmlContainer();
		this.domNode = this._container.domNode;
		this.domNode.style.position = 'relative';
		content && this.content(content);
	}, {
		_layout: function() {
			var inDom = this._inDom;
			if (!inDom) { return; }
			var innerSize = this.size();

			this._content && this._content.forEach(function(childAndOptions, index) {
				var child = childAndOptions[0] || childAndOptions,
					options = childAndOptions[1] || {};

				var childPosition = {},
					childWBound, childHBound;

				childPosition.position = 'absolute';
				childPosition.zIndex = index;

				switch (options.verticalAlign) {
					case 'top':
						childPosition.top = 0; break;
					case 'bottom':
						childPosition.bottom = 0; break;
					case 'middle':
						child.position(childPosition);	// set position=absolute before measuring size
						var childHeight = child.size().height,
							heightMargin = innerSize.height - childHeight;
						childPosition.top = heightMargin / 2 + 'px'; break;
					default:	// fit
						childHBound = innerSize.height;
				}

				switch (options.horizontalAlign) {
					case 'right':
						childPosition.right = 0; break;
					case 'left':
						childPosition.left = 0; break;
					case 'middle':
						child.position(childPosition);	// set position=absolute before measuring size
						var childWidth = child.size().width,
							widthMargin = innerSize.width - childWidth;
						childPosition.left = widthMargin / 2 + 'px'; break;
					default:
						childWBound = innerSize.width;
				}

				child.position(childPosition);
				child.bounds && child.bounds({
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
			return this;
		},
		_applyInDom: function() {
			var inDom = this._inDom;
			this._content && this._content.forEach(function(childAndOptions) {
				var child = childAndOptions[0] || childAndOptions;
				child.inDom && child.inDom(inDom);
			});
			this._layout();
		},
		inDom: function(inDom) {
			this._inDom = inDom;
			this._applyInDom();
		},
		position: function(position) {
			if (position !== undefined) {
				position.position = position.position || 'relative';
			}
			_Positionable.position.call(this, position);
		}
	}, _Boundable, {
		bounds: function() {
			_Boundable.prototype.bounds.apply(this, arguments);
			this._layout();
		},
	});
});