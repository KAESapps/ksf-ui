define([
	'compose',
	'ksf/base/_Destroyable',
	'ksf/base/_Evented',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/style/_Stylable',
], function(
	compose,
	_Destroyable,
	_Evented,
	_WithSize,
	_Boundable,
	_Positionable,
	_Stylable
){

	return compose(_Destroyable, _Evented, _WithSize, _Boundable, _Stylable, _Positionable, function(toggle, dropDown) {
		var self = this;
		this.domNode = document.createElement('div');
		this._own(toggle, 'toggle');
		this._own(dropDown, 'dropDown');

		toggle.position({
			display: 'block'
		});
		dropDown.position({
			position: 'absolute'
		});

		this.close();

		this.domNode.appendChild(toggle.domNode);
		this.domNode.appendChild(dropDown.domNode);

		toggle.onAction(this.toggle.bind(this));

		// blur event
		toggle.onBlur(function() {
			if (!dropDown.focused()) {
				self._emit('blur');
			}
		});
		dropDown.onBlur(function() {
			if (!toggle.focused()) {
				self._emit('blur');
			}
		});

		// auto close on blur
		this.onBlur(this.close.bind(this));
	}, {
		open: function() {
			this._owned.dropDown.domNode.style.display = 'block';
			this._owned.dropDown.focus();
			this._opened = true;
		},
		close: function() {
			this._owned.dropDown.domNode.style.display = 'none';
			this._opened = false;
		},
		toggle: function() {
			if (this._opened) {
				this.close();
			} else {
				this.open();
			}
		},
		focus: function() {
			if (this._opened) {
				this._owned.dropDown.focus();
			} else {
				this._owned.toggle.focus();
			}
		},
		inDom: function(inDom) {
			this._owned.toggle.inDom && this._owned.toggle.inDom(inDom);
			this._owned.dropDown.inDom && this._owned.dropDown.inDom(inDom);
			this._inDom = inDom;
		},
		/* la gestion du focus est bien compliquée
		Firefox n'implémente pas focusin et focusout, donc on utilise l'événement 'blur' en mode 'capturing'
		Firefox n'alimente pas la propriété 'relatedTarget' de l'événement donc on utilise un setTimeout pour savoir quel est l'élément effectivement activé via document.activeElement
		*/
		onBlur: function(cb) {
			return this._on('blur', cb);
		},
		onFocus: function() {},
	});
});