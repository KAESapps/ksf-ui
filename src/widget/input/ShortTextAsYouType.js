define([
	'compose',
	'./_Base'
], function(
	compose,
	_Base
){
	return compose(function(options) {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
		if (options && options.placeholder) { this.domNode.placeholder = options.placeholder; }
		var self = this;
		var changing = false;
		this.domNode.addEventListener('input', function() {
			if (!changing) {
				changing = true;
				self._emit('input', self._getValue());
				changing = false;
			}
		});
	}, _Base, {
		_getValue: function() {
			return this.domNode.value;
		},
		_setValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		}
	});
});