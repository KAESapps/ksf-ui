define([
	'ksf/utils/compose',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/style/_Stylable',
	'ksf/base/_Chainable',
	'ksf/dom/_Positionable',
	'ksf/dom/_Boundable',
], function(
	compose,
	_Evented,
	_WithSize,
	_Stylable,
	_Chainable,
	_Positionable,
	_Boundable
){
	var click = function(node) {
		var event = document.createEvent("MouseEvents");
		event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		node.dispatchEvent(event);
	};

	return compose(_Evented, _WithSize, _Stylable, _Positionable, _Chainable, function(label) {
		this.domNode = document.createElement('span');
		this.domNode.textContent = label || 'Ouvrir';
		var fileInput = this._fileInput = document.createElement('input');
		this._fileInput.type = 'file';
		var self = this;
		this.domNode.addEventListener('click', function() {
			click(fileInput);
		});
		this._fileInput.addEventListener('change', function() {
			var file = self.value();
			self._emit('input', file ? file : null);
		});
	}, _Boundable, {
		value: function() {
			if (arguments.length > 0) {
				// on ne peut pas spécifier un fichier, seulement le remettre à zéro
				this._fileInput.value = '';
			} else {
				return this._fileInput.files[0];
			}
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
		tip: function(tipText) {
			this.domNode.title = tipText;
			return this;
		},
	});
});