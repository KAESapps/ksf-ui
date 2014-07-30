define([
	'compose',
	'./_Flex',
], function(
	compose,
	_Flex
){
	return compose(_Flex, {
		_childPosition: {
			display: 'inline-block',
			overflow: 'auto',
			verticalAlign: 'top'
		},
		_layout: function() {
			if (this._inDom) {
				var totalFixedWidth = 0,
					innerSize = this.size();
				this._fixedChildren.forEach(function(child) {
					totalFixedWidth += child.size().width;
					child.bounds && child.bounds({
						height: innerSize.height
					});
				});
				var flexWidth = (innerSize.width - totalFixedWidth) / this._flexChildren.length;
				this._flexChildren.forEach(function(child) {
					child.bounds({
						width: flexWidth,
						height: innerSize.height
					});
				});
			}
		},
	});
});