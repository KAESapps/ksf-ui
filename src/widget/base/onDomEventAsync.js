define([], function() {
	return function(eventName) {
		return function(listener) {
			var domNode = this.domNode,
				cb = function(ev) {
					setTimeout(function() {
						listener(ev);
					});
				};
			domNode.addEventListener(eventName, cb);
			return function() {
				domNode.removeEventListener(eventName, cb);
			};
		};
	};
});