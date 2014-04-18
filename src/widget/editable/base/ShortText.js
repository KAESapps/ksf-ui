define([
	'compose',
	'ksf/base/_Evented'
], function(
	compose,
	_Evented
){
	return compose(_Evented, function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.value);
			self._setNodeValue(self._value);
		});
	}, {
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
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});