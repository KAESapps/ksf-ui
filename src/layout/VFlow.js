define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/base/_Destroyable',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/_WithSize',
	'ksf/dom/_WithInnerSize',
	'ksf/dom/composite/_RootStylable',
	'../base/HtmlContainer',
	'lodash/objects/assign'
], function(
	compose,
	_Composite,
	_Destroyable,
	_Boundable,
	_Positionable,
	_WithSize,
	_WithInnerSize,
	_RootStylable,
	HtmlContainer,
	mixin
){
	return compose(_Composite, {
		_rootFactory: function() {
			return new HtmlContainer();
		}
	}, _WithInnerSize, _RootStylable, function(options) {
		this._posOptions = mixin({}, options, { display: 'block' });

		this._own([], 'childrenBoundsCancelers');
	}, {
		add: function(child, beforeChild) {
			this._setChildPosition(child);
			this._root.add(child, beforeChild);
			if (this.inDom()) {
				var innerSize = this._innerSize();
				this._setChildBounds(child, {
					width: innerSize.width
				});
			}
		},
		remove: function(child) {
			this._root.remove(child);
		},
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
			var self = this;
			content.forEach(function(child) {
				self._setChildPosition(child);
			});
			this._root.content(content);
			this._layoutIfInDom();

			return this;
		},
		inDom: function(inDom) {
			var ret = _Composite.prototype.inDom.apply(this, arguments);
			if (inDom) {
				this._layout();
			}
			return ret;
		},

		_layoutIfInDom: function() {
			if (this.inDom()) {
				this._layout();
			}
		},

		bounds: function() {
			_Composite.prototype.bounds.apply(this, arguments);
			this._layoutIfInDom();
		},
		_setChildPosition: function(child) {
			child.position(this._posOptions);
		},
		_layout: function() {
			this._resetChildrenBounds();

			var self = this,
				innerSize = this._innerSize();
			this._root.content().forEach(function(child) {
				self._setChildBounds(child, {
					width: innerSize.width
				});
			});
		},

	});
});