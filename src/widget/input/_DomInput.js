define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'../base/_Focusable'
], function(
	compose,
	_Evented,
	_WithSize,
	_Stylable,
	_Focusable
){
	return compose(_Evented, _WithSize, _Stylable, _Focusable, function() {
		this.domNode = document.createElement('input');
		
		var self = this;
		var changing = false;
		this.domNode.addEventListener('change', function() {
			if (!changing) {
				changing = true;
				self._emit('input', self._getValue());
				changing = false;
			}
		});
	}, {
		value: function(value) {
			if (arguments.length > 0) {
				// value est settable programmatiquement pour initialiser la valeur mais ne déclenche pas un événement 'input'
				this._setValue(value);
				return this;
			} else {
				return this._getValue();
			}
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});