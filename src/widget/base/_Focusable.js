define([], function(){
	return {
		focus: function() {
			this.domNode.focus();
		},
		onBlur: function(cb) {
			var domNode = this.domNode,
				domEventName = 'blur';
			domNode.addEventListener(domEventName, cb);
			return function() {
				domNode.removeEventListener(domEventName, cb);
			};
		},
	};
});