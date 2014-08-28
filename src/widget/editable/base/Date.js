define([
	'compose',
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
		this.domNode.type = 'date';
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.valueAsDate);
			self.domNode.valueAsDate = self._value;
		});
	}, {
		value: function(value) {
			this._value = value;
			this.domNode.valueAsDate = value;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});