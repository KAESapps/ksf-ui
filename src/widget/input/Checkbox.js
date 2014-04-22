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
		this.domNode.type = 'checkbox';
		var self = this;
		this.domNode.addEventListener('input', function() {
			self._emit('value', self.domNode.checked);
		});
		this.value(value);
	}, {
		value: function(value) {
			if (arguments.length > 0) {
				this._setNodeValue(value);
				this._emit('input', this.domNode.checked);
			} else {
				return this.domNode.checked;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.checked = !!value;
		}
	});
});