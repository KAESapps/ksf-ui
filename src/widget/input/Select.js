define([
	'compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable',
	'ksf/base/_Chainable',
	'../base/_Focusable',
], function(
	compose,
	_Evented,
	_WithSize,
	_Positionable,
	_Stylable,
	_Chainable,
	_Focusable
){
	return compose(_Chainable, _Evented, _WithSize, _Stylable, _Focusable, _Positionable, function(args) {
		this.domNode = document.createElement('select');
		if (args === undefined) {
			args = {};
		}
		this.options(args.options || []);

		// extra option when value is not in list
		var notInListLabel = args.notInListLabel || "";
		this._extraOption = document.createElement('option');
		this._extraOption.textContent = notInListLabel;
		
		// valeur initiale
		this._value = (args.value !== undefined) ? args.value : null;

		var self = this;
		this.domNode.addEventListener('change', function() {
			self._setValue(self.domNode.value);
			self._emit('input', self._value);
		});
	}, {
		_setValue: function(value) {
			if (value === undefined) { return; }
			this._value = value;
			var extraOptionNeeded = false;
			
			if (value === null) {
				this.domNode.selectedIndex = -1;
			} else if (this._optionValues.indexOf(value) === -1) {
				this._extraOption.value = value;
				this.domNode.value = value;
				extraOptionNeeded = true;
			} else {
				this.domNode.value = value;
			}

			if (extraOptionNeeded) {
				this.domNode.insertBefore(this._extraOption, this.domNode.firstChild);
			} else {
				if (this.domNode.firstChild === this._extraOption) {
					this.domNode.removeChild(this._extraOption);
				}
			}
		},
		_getValue: function() {
			return this._value;
		},
		options: function(options) {
			var domNode = this.domNode;
			// clear options
			var optionValues = this._optionValues = [];
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
		inDom: function(inDom) {
			// on force le rafraîchissement de la valeur,
			// sinon c'est la première option qui est sélectionnée par le navigateur
			inDom && this._setValue(this._getValue());
		},
	});
});