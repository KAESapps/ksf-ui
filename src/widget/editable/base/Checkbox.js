define([
	'compose',
	'ksf/base/_Evented'
], function(
	compose,
	_Evented
){
	return compose(_Evented, function() {
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