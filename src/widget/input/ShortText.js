define([
	'compose',
	'ksf/base/Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function(options) {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
		if (options && options.placeholder) { this.domNode.placeholder = options.placeholder; }
		var self = this;
		this.domNode.addEventListener('input', function() {
			self._emit('input', self.domNode.value);
		});
	}, {
		input: function(value) {
			if (arguments.length > 0) {
				this._setNodeValue(value);
				this._emit('input', this.domNode.value);
			} else {
				return this.domNode.value;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		}
	});
});