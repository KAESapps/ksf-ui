define([
	'compose',
	'./_Flex',
], function(
	compose,
	_Flex
){
	return compose(_Flex, {
		_childPosition: {
			display: 'block',
			overflow: 'auto'
		},
		_layout: function() {
			if (this._inDom) {
				var totalFixedHeight = 0,
					innerSize = this.size();
				this._fixedChildren.forEach(function(child) {
					totalFixedHeight += child.size().height;
					child.bounds && child.bounds({
						width: innerSize.width
					});
				});
				var flexHeight = (innerSize.height - totalFixedHeight) / this._flexChildren.length;
				this._flexChildren.forEach(function(child) {
					child.bounds({
						height: flexHeight
					});
				});
			}
		},
	});
});