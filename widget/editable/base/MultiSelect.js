define([
	'ksf/utils/compose',
	'ksf/base/_Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function() {
		this.domNode = document.createElement('select');
		this.domNode.multiple = true;
		this._value = [];
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self._getNodeValue());
			self._setNodeValue(self._value);
		});
	}, {
		value: function(value) {
			if (arguments.length > 0) {
				this._setNodeValue(value);
				this._value = this._getNodeValue(); // permet de trier les options dans le même ordre que le dom
			} else {
				return this._value;
			}
		},
		_setNodeValue: function(value) {
			Array.prototype.forEach.call(this.domNode.children, function(option) {
				option.selected = (value.indexOf(option.value) >= 0);
			});
		},
		_getNodeValue: function() {
			return Array.prototype.map.call(this.domNode.selectedOptions, function(option){
				return option.value;
			});
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
			this.value(this._value);
		},
		inDom: function() {
			this.value(this._value);
		},
	});
});