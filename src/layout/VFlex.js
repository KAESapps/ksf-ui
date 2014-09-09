define([
	'compose',
	'./_Flex',
], function(
	compose,
	_Flex
){
	return compose(_Flex, {
		_setChildPosition: function(child, childOptions) {
			child.position({
				mode: 'relative',
				orientation: 'vertical'
			});
		},
		_layout: function() {
			this._resetChildrenBounds();
			
			var self = this,
				totalFixedHeight = 0,
				innerSize = this._innerSize();
			this._fixedChildren.forEach(function(childAndOptions) {
				var child = childAndOptions[0];
				totalFixedHeight += child.size().height;
				self._setChildBounds(child, {
					width: innerSize.width
				});
			});
			var flexHeight = (innerSize.height - totalFixedHeight) / this._flexChildren.length;
			this._flexChildren.forEach(function(childAndOptions) {
				var child = childAndOptions[0];
				self._setChildBounds(child, {
					height: flexHeight,
					width: innerSize.width
				});
			});
		},
	});
});