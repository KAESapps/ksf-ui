define([], function() {
	return {
		onAction: function(listener) {
			var domNode = this.domNode,
				domEventName = 'click';
			domNode.addEventListener(domEventName, listener);
			return function() {
				domNode.removeEventListener(domEventName, listener);
			};
		}
	};
});