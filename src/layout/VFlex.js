define([
	'compose',
	'./_Flex',
], function(
	compose,
	_Flex
){
	return compose(_Flex, {
		_setChildPosition: function(child) {
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
				var options = childAndOptions[1];
				totalFixedHeight += child.size().height;
				if (options.align === 'fit') {
					self._setChildBounds(child, {
						width: innerSize.width
					});
				}
			});
			var flexHeight = (innerSize.height - totalFixedHeight) / this._flexChildren.length;
			this._flexChildren.forEach(function(childAndOptions) {
				var child = childAndOptions[0];
				var options = childAndOptions[1];
				var childBounds = {
					height: flexHeight,
				};
				if (options.align === 'fit') {
					childBounds.width = innerSize.width;
				}
				self._setChildBounds(child, childBounds);
			});
		},
	});
});