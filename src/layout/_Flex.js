define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/base/_Destroyable',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/_WithSize',
	'ksf/dom/_WithInnerSize',
	'ksf/dom/composite/_RootStylable',
	'../base/HtmlContainer'
], function(
	compose,
	_Composite,
	_Destroyable,
	_Boundable,
	_Positionable,
	_WithSize,
	_WithInnerSize,
	_RootStylable,
	HtmlContainer
){
	return compose(_Composite, {
		_rootFactory: function() {
			return new HtmlContainer();
		}
	}, _WithInnerSize, _RootStylable, function(options) {
		this._options = options || {};

		this._fixedChildren = [];
		this._flexChildren = [];

		this._own([], 'childrenBoundsCancelers');
	}, {
		_setChildBounds: function(child, bounds) {
			child.bounds(bounds);
			this._owned.childrenBoundsCancelers.push(function() {
				child.bounds(null);
			});
		},
		_resetChildrenBounds: function() {
			this._destroy('childrenBoundsCancelers');
			this._own([], 'childrenBoundsCancelers');
		},
		content: function(content) {
			if (! arguments.length) {
				return this._root.content();
			}
			var fixedChildren = this._fixedChildren = [],
			flexChildren = this._flexChildren = [];
			var self = this;

			var children = [];
			content.forEach(function(childAndOptions) {
				var child = childAndOptions[0] || childAndOptions,
					options = childAndOptions[1] || {};
				if (options.flex) {
					flexChildren.push([child, options]);
				} else {
					fixedChildren.push([child, options]);
				}
				self._setChildPosition(child, options);
				children.push(child);
			});
			this._root.content(children);
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

		_checkForLayout: function() {
			if (this.inDom() && this.bounds()) {
				this._layout();
			}
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
		}
	});
});