define([
	'ksf/utils/compose',
	'ksf/base/_Evented',
	'ksf/dom/style/_Stylable',
	'ksf/dom/_Focusable'
], function(
	compose,
	_Evented,
	_Stylable,
	_Focusable
){
	return compose(_Evented, _Stylable, _Focusable, function() {
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