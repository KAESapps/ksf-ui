define([
	'compose',
	'ksf/base/Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.value);
			self._setNodeValue(self._value);
		});
	}, {
		input: function(value) {
			this._emit('input', value);
		},
		value: function(value) {
			if (arguments.length > 0) {
				this._value = value;
				this._setNodeValue(value);
			} else {
				return this._value;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		}
	});
});