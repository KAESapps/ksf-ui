define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/style/_Stylable',
	'../../base/_Focusable'
], function(
	compose,
	Evented,
	_Stylable,
	_Focusable
){
	return compose(Evented, _Stylable, _Focusable, function() {
		this.domNode = document.createElement('select');
		this._optionValues = [];

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
			if (this._extraOption) {
				this.domNode.removeChild(this._extraOption);
			}
			delete this._extraOption;
			if (this._optionValues.indexOf(value) === -1) {
				var opt = document.createElement('option');
				if (value === undefined || value === null) {
					value = "";
				}
				opt.value = value;
				opt.textContent = value;
				this.domNode.insertBefore(opt, this.domNode.firstChild);
				this._extraOption = opt;
			}
			this.domNode.value = value;
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		options: function(options) {
			var self = this,
				domNode = this.domNode;
			this._optionValues = [];
			var extraOptionOffset = this._extraOption ? 1 : 0;
			options.forEach(function(valueLabel, i) {
				var childrenLength = domNode.children.length;
				var el = (i >= childrenLength - extraOptionOffset) ? document.createElement('option') : domNode.children[i];

				if (typeof(valueLabel) !== 'object') {
					valueLabel = [valueLabel, valueLabel];
				}

				el.value = valueLabel[0];
				el.textContent = valueLabel[1];
				if (i >= childrenLength - extraOptionOffset) {
					domNode.appendChild(el);
				}
				self._optionValues.push(el.value);
			});
			var optionsLength;
			while (domNode.children.length - extraOptionOffset > optionsLength) {
				domNode.removeChild(domNode.lastChild);
			}
			this._setNodeValue(this._value);
		},
		inDom: function() {
			this._setNodeValue(this._value);
		},
	});
});