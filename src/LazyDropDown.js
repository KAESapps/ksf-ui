define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./layout/Flow',
], function(
	compose,
	_Composite,
	_RootStylable,
	FlowContainer
){

	return compose(_Composite, _RootStylable, function() {
		// auto close on blur
		// this.onBlur(this.close.bind(this));
	}, {
		_rootFactory: function() {
			return new FlowContainer().position({position: 'relative'});
		},
		toggleCmp: function(toggle) {
			var self = this;
			// unbind previous toggle if any
			if (this._toggle) {
				this._root.remove(this._toggle);
			}
			// register new toggle
			this._toggle = toggle;
			// bind new toggle
			toggle.position({display: 'block'});
			this._root.add(toggle, this._popup);
			toggle.onAction(this.toggle.bind(this));
			toggle.onBlur(function() {
				if (!self._popup || !self._popup.focused()) {
					self._emit('blur');
				}
			});
			return this;
		},
		popupFactory: function(popupFactory, scope) {
			this._popupFactory = popupFactory;
			this._popupFactoryScope = scope;
			return this;
		},
		open: function() {
			var self = this;
			// create popup component
			var popup = this._popup = this._popupFactory.call(this._popupFactoryScope || null);
			// bind popup
			popup.position({
				// display: 'block',
				position: 'absolute',
				zIndex: 1
			});
			popup.onBlur(function() {
				if (!self._toggle || !self._toggle.focused()) {
					self._emit('blur');
				}
			});
			this._root.add(popup);
			popup.focus();
			this._opened = true;
		},
		close: function() {
			this._root.remove(this._popup);
			this._popup.destroy && this._popup.destroy();
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
				this._popup.focus();
			} else {
				this._toggle && this._toggle.focus();
			}
		},
		/* la gestion du focus est bien compliquée
		Firefox n'implémente pas focusin et focusout, donc on utilise l'événement 'blur' en mode 'capturing'
		Firefox n'alimente pas la propriété 'relatedTarget' de l'événement donc on utilise un setTimeout pour savoir quel est l'élément effectivement activé via document.activeElement
		*/
		onBlur: function(cb) {
			return this._on('blur', cb);
		},
		onFocus: function() {
			throw('not implemented yet');
		},
	});

});