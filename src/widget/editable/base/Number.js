define([
	'compose',
	'ksf/base/_Evented'
], function(
	compose,
	_Evented
){
	return compose(_Evented, function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'number';
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.valueAsNumber);
			self._displayValue(self._value);
		});
	}, {
		_displayValue: function(value) {
			if (isNaN(value)) {
				this.domNode.value = null;
			} else {
				this.domNode.valueAsNumber = value;
			}
		},
		value: function(value) {
			this._value = value;
			this._displayValue(value);
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});