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
	return compose(_Evented, _WithSize, _Stylable, function(options, value) {
		this.domNode = document.createElement('select');
		options && this.options(options);
		this.value(value ? value : ''); // on force une valeur nulle car sinon, c'est automatiquement la première option qui est sélectionnée par le navigateur
		var self = this;
		this.domNode.addEventListener('change', function() {
			self._emit('input', self.domNode.value);
		});
	}, {
		options: function(options) {
			this.domNode.innerHTML = "";
			for (var i = 0 ;  i < options.length ; i = i+2) {
				var optionNode = document.createElement('option');
				optionNode.value = options[i];
				optionNode.textContent = options[i+1];
				this.domNode.appendChild(optionNode);
			}
		},
		value: function(value) {
			// value est settable programmatiquement pour initialiser la valeur mais ne déclenche pas un événement 'input'
			if (arguments.length > 0) {
				this.domNode.value = value;
				this._value = this.domNode.value;
			} else {
				return this.domNode.value;
			}
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		inDom: function() {
			this.domNode.value = this._value;
		},
	});
});