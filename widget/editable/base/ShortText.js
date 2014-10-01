define([
	'ksf/utils/compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/_Focusable'
], function(
	compose,
	_Evented,
	_WithSize,
	_Stylable,
	_Boundable,
	_Positionable,
	_Focusable
){
	return compose(_Evented, _WithSize, _Stylable, function(value) {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
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
		if (value !== undefined ) { this.value(value); }
	}, _Boundable, _Positionable, _Focusable, {
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