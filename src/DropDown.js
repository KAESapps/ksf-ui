define([
	'compose',
	'ksf/base/_Destroyable',
	'ksf/dom/_WithSize',
	'ksf/dom/_Boundable',
], function(
	compose,
	_Destroyable,
	_WithSize,
	_Boundable
){

	return compose(_Destroyable, _WithSize, _Boundable, function(toggle, dropDown) {
		this.domNode = document.createElement('div');
		this._own(toggle, 'toggle');
		this._own(dropDown, 'dropDown');

		dropDown.domNode.style.position = 'absolute';

		this.close();

		this.domNode.appendChild(toggle.domNode);
		this.domNode.appendChild(dropDown.domNode);

		toggle.onAction(this.toggle.bind(this));

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
			// this._owned.toggle.focus();
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
		onBlur: function(clientCb) {
			var domNode = this.domNode;
			var toggle = this._owned.toggle;
			var dropDown = this._owned.dropDown;

			var callClientCb = function(activeElement) {
				if (activeElement !== toggle.domNode && activeElement !== dropDown.domNode) {
					clientCb();
				}
			};
			var cb = function(ev) {
				var activeElement = ev.relatedTarget;
				if (!activeElement) {
					setTimeout(function() {
						activeElement = document.activeElement;
						callClientCb(activeElement);
					});
				} else {
					callClientCb(activeElement);
				}
			};

			domNode.addEventListener('blur', cb, true);
			return function() {
				domNode.removeEventListener('blur', cb, true);
			};
		},
		onFocus: function() {},
	});
});