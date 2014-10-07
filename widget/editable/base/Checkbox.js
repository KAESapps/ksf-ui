define([
	'ksf/utils/compose',
	'ksf/base/_Evented',
	'ksf/dom/style/_Stylable',
	'ksf/dom/_Positionable',
	'ksf/dom/_WithSize',
], function(
	compose,
	_Evented,
	_Stylable,
	_Positionable,
	_WithSize
){
	return compose(_Evented, _Stylable, _Positionable, _WithSize, function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'checkbox';
		var self = this;
		this.domNode.addEventListener('click', function() {
			var inputValue = self.domNode.checked;
			self.domNode.checked = self._value;
			self._emit('input', inputValue);
		});
	}, {
		value: function(checked) {
			this._value = checked;
			this.domNode.checked = checked;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});