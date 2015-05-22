define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable'
], function(
	compose,
	_Evented,
	_WithSize,
	_Stylable
){
	return compose(_Evented, _WithSize, _Stylable, function(options) {
		this.domNode = document.createElement('input');
		this.domNode.type = 'text';
		if (options && options.placeholder) { this.domNode.placeholder = options.placeholder; }
		if (options && options.value !== undefined) { this.value(options.value); }
		var self = this;

		var changing = false;
		this.domNode.addEventListener('change', function() {
			if (!changing) {
				changing = true;
				self._emit('input', self.domNode.value);
				changing = false;
			}
		});
	}, {
		value: function(value) {
			// value est settable programmatiquement pour initialiser la valeur mais ne déclenche pas un événement 'input'
			if (arguments.length > 0) {
				this._setNodeValue(value);
			} else {
				return this.domNode.value;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		focus: function() {
			this.domNode.focus();
		},
		onBlur: function(cb) {
			var domNode = this.domNode,
				domEventName = 'blur';
			domNode.addEventListener(domEventName, cb);
			return function() {
				domNode.removeEventListener(domEventName, cb);
			};
		}
	});
});