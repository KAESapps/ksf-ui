define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize'
], function(
	compose,
	_Evented,
	_WithSize
){
	return compose(_Evented, _WithSize, function(value) {
		this.domNode = document.createElement('input');
		this.domNode.type = 'number';
		var self = this;
		this.domNode.addEventListener('input', function() {
			self._emit('value', self.value());
		});
		this.value(value);
	}, {
		value: function(value) {
			if (arguments.length > 0) {
				this.domNode.valueAsNumber = value;
				this._emit('input', this.domNode.valueAsNumber);
			} else {
				return this.domNode.valueAsNumber;
			}
		},
	});
});