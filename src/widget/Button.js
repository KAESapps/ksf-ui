define([], function() {
	var Cls = function(label) {
		this.domNode = document.createElement('button');
		this.label(label);
	};
	Cls.prototype = {
		label: function(label) {
			this.domNode.textContent = label;
		},
		on: function(event /* = 'pushed' */, listener) {
			if (event !== 'pushed') { throw "Unknown event name: " + event; }
			var domNode = this.domNode,
				domEventName = 'click';
			domNode.addEventListener(domEventName, listener);
			return function() {
				domNode.removeEventListener(domEventName, listener);
			};
		}
	};
	return Cls;
});