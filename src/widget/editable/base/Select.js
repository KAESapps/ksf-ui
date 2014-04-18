define([
	'compose',
	'ksf/base/_Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function() {
		this.domNode = document.createElement('select');
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.value);
			self._setNodeValue(self._value);
		});
	}, {
		_value: undefined,
		value: function(value) {
			if (arguments.length > 0) {
				this._value = value;
				this._setNodeValue(value);
			} else {
				return this._value;
			}
		},
		_setNodeValue: function(value) {
			this.domNode.value = value;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		options: function(options) {
			var domNode = this.domNode;
			options.forEach(function(valueLabel, i) {
				var childrenLength = domNode.children.length;
				var el = (i >= childrenLength) ? document.createElement('option') : domNode.children[i];
				el.value = valueLabel[0];
				el.label = valueLabel[1];
				if (i >= childrenLength) {
					domNode.appendChild(el);
				}
			});
			var optionsLength;
			while (domNode.children.length > optionsLength) {
				domNode.removeChild(domNode.lastChild);
			}
			this._setNodeValue(this._value);
		},
		inDom: function() {
			this._setNodeValue(this._value);
		},
	});
});