define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize'
], function(
	compose,
	_Evented,
	_WithSize
){
	return compose(_Evented, _WithSize, function(options, value) {
		this.domNode = document.createElement('select');
		this._options(options);
		value && this.value(value);
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.value);
		});
	}, {
		_options: function(options) {
			var root = this.domNode;
			for (var i = 0 ;  i < options.length ; i = i+2) {
				var optionNode = document.createElement('option');
				optionNode.value = options[i];
				optionNode.textContent = options[i+1];
				root.appendChild(optionNode);
			}
		},
		value: function(value) {
			// value est settable programmatiquement pour initialiser la valeur mais ne déclenche pas un événement 'input'
			if (arguments.length > 0) {
				this._setNodeValue(value);
			} else {
				return this.domNode.value;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.value = value;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		}
	});
});