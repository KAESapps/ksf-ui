define([], function() {
	var Cls = function(label) {
		this.domNode = document.createElement('span');
		this.value(label);
	};
	Cls.prototype = {
		value: function(label) {
			this.domNode.textContent = label;
		}
	};
	return Cls;
});