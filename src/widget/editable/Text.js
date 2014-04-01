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
			self.domNode.value = self._value;
		});
	}, {
		value: function(value) {
			this._value = value;
			this.domNode.value = value;
		}
	});
});