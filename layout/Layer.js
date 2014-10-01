define([
	'ksf/utils/compose',
	'../base/HtmlContainer',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
], function(
	compose,
	HtmlContainer,
	_Composite,
	_RootStylable
){
	return compose(_Composite, _RootStylable, function() {
		this._setRoot(new HtmlContainer());
		this.domNode.style.position = 'relative';
	}, {
		_layout: function() {
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
				if (childWBound || childHBound) {
					child.bounds({
						height: childHBound,
						width: childWBound,
					});
				}
			});
		},
		_checkForLayout: function() {
			if (this.inDom() && this.bounds()) {
				this._layout();
			}
		},
		content: function(content) {
			this._root.content(content.map(function(childAndOptions) {
				return childAndOptions[0] || childAndOptions;
			}));
			this._content = content;
			this._checkForLayout();
			return this;
		},
		inDom: function(inDom) {
			var ret = _Composite.prototype.inDom.apply(this, arguments);
			if (inDom) {
				this._checkForLayout();
			}
			return ret;
		},
		bounds: function(bounds) {
			if  (bounds !== undefined) {
				this._bounds = bounds;
				_Composite.prototype.bounds.apply(this, arguments);
				this._checkForLayout();
				return this;
			} else {
				return this._bounds;
			}
		},
	});
});
