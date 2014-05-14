define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
], function(
	compose,
	_Evented,
	_WithSize
){
	return compose(_Evented, _WithSize, function() {
		this.domNode = document.createElement('textarea');
		var self = this;
		var changing = false;
		this.domNode.addEventListener('change', function() {
			if (!changing) {
				changing = true;
				self._emit('input', self.domNode.value);
				self._setNodeValue(self._value);
				changing = false;
			}
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