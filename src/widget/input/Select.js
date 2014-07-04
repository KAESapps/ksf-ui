define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'ksf/base/Chainable',
	'../base/_Focusable',
], function(
	compose,
	_Evented,
	_WithSize,
	_Stylable,
	_Chainable,
	_Focusable
){
	return compose(_Chainable, _Evented, _WithSize, _Stylable, _Focusable, function(args) {
		this.domNode = document.createElement('select');
		if (args === undefined) {
			args = {};
		}
		this.options(args.options || []);
		// on force une valeur nulle car sinon, c'est automatiquement la première option qui est sélectionnée par le navigateur
		this._setValue((args.value !== undefined) ? args.value : null);

		var self = this;
		this.domNode.addEventListener('change', function() {
			self._value = self.domNode.value;
			self._emit('input', self._value);
		});
	}, {
		_setValue: function(value) {
			if (value === undefined) { return; }
			
			if (this._optionValues.indexOf(value) === -1) {
				this.domNode.selectedIndex = -1;
			} else {
				this.domNode.value = value;
			}
			this._value = value;
		},
		_getValue: function() {
			return this._value;
		},
		options: function(options) {
			var domNode = this.domNode;
			// clear options
			var optionValues = this._optionValues = [];
			delete this._extraOption;
			while (domNode.lastChild) {
				domNode.removeChild(domNode.lastChild);
			}
			options.forEach(function(optionItem) {
				if (typeof(optionItem) !== 'object') {
					optionItem = [optionItem, optionItem];
				}

				var el = document.createElement('option');
				el.value = optionItem[0];
				el.textContent = optionItem[1];

				domNode.appendChild(el);
				optionValues.push(el.value);
			});

			this._setValue(this._getValue());
			return this;
		},
		value: function(value) {
			if (arguments.length > 0) {
				this._setValue(value);
				return this;
			} else {
				return this._getValue();
			}
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		inDom: function() {
			this._setValue(this._getValue());
		},
	});
});