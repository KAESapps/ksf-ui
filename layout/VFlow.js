define([
	'ksf/utils/compose',
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
		this._posOptions = mixin({}, options, { mode: 'relative', orientation: 'vertical' });
	}, {
		add: function(child, beforeChild) {
			this._setChildPosition(child);
			this._root.add(child, beforeChild);
		},
		remove: function(child) {
			this._root.remove(child);
		},
		content: function(content) {
			var self = this;
			content.forEach(function(child) {
				self._setChildPosition(child);
			});
			this._root.content(content);

			return this;
		},
		_setChildPosition: function(child) {
			child.position(this._posOptions);
		},
	});
});