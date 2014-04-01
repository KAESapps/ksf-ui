define([
	'compose'
], function(
	compose
){
	return compose(function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'checkbox';
	}, {
		value: function(checked) {
			this.domNode.checked = checked;
		},
		on: function(event /* = 'toggle' */, listener) {
			if (event !== 'toggle') { throw "Unknown event name: " + event; }
			var domNode = this.domNode,
				domEventName = 'click';
			var cb = function(ev) {
				listener(ev.target.checked);
				ev.preventDefault();
			};
			domNode.addEventListener(domEventName, cb);
			return function() {
				domNode.removeEventListener(domEventName, cb);
			};
		}
	});
});