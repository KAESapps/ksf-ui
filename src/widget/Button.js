define([
	'compose',
	'ksf/dom/_WithSize'
], function(
	compose,
	_WithSize
) {
	return compose(_WithSize, function(label) {
		this.domNode = document.createElement('button');
		this.label(label);
	}, {
		label: function(label) {
			this.domNode.innerHTML = '<span>' + label + '</span>';
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
	});
});