define([
	'compose',
	'./_Flex',
], function(
	compose,
	_Flex
){
	return compose(_Flex, {
		_setChildPosition: function(child, childOptions) {
			var posArgs = {
				display: 'inline-block'
			};
			var vertAlign = childOptions.verticalAlign || this._options.verticalAlign || 'fit';
			childOptions.verticalAlign = vertAlign;

			if (vertAlign !== 'fit') {
				posArgs.verticalAlign = vertAlign;
			} else {
				posArgs.verticalAlign = 'top';
			}

			child.position(posArgs);
		},
		_layout: function() {
			this._resetChildrenBounds();
			
			var self = this,
				totalFixedWidth = 0,
				innerSize = this._innerSize();

			this._fixedChildren.forEach(function(childAndOptions) {
				var child = childAndOptions[0],
					options = childAndOptions[1];
				totalFixedWidth += child.size().width;
				if (options.verticalAlign === 'fit') {
					self._setChildBounds(child, {
						height: innerSize.height
					});
				}
			});
			var flexWidth = (innerSize.width - totalFixedWidth) / this._flexChildren.length;
			this._flexChildren.forEach(function(childAndOptions) {
				var child = childAndOptions[0],
					options = childAndOptions[1],
					childBounds = {
						width: flexWidth
					};
				if (options.verticalAlign === 'fit') {
					childBounds.height = innerSize.height;
				}
				self._setChildBounds(child, childBounds);
			});
		},
	});
});