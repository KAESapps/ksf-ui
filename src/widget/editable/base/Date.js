define([
	'compose',
	'ksf/base/Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function() {
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
		}
	});
});