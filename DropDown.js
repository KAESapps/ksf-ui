define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'ksf/dom/composite/_Focusable',
	'ksf/dom/_Boundable',
	'ksf/dom/_Focusable',
	'./layout/DropDown',
	'./layout/GlobalDropDown',
], function(
	compose,
	_Composite,
	_RootStylable,
	_Focusable,
	_Boundable,
	_DomFocusable,
	DropDownContainer,
	GlobalDropDownContainer
){
	var FocusableDropDownContainer = compose(DropDownContainer, _DomFocusable);

	// @param focusable 	if true, the dropDown component will be itself focusable and its content must not be focusable (have a tabIndex). If falsy, the dropDown content (main and popup) must be focusable and the dropDown component will delegate them the focus management
	return compose(_Composite, _Focusable, function(params) {
		this._params = params = params || {};
		if (params.focusable) {
			this._setRoot(new FocusableDropDownContainer(params));
			this._addFocusable(this._root);
		} else {
			if (params.global) {
				this._setRoot(new GlobalDropDownContainer(params));
			} else {
				this._setRoot(new DropDownContainer(params));
			}
		}
		// auto close on blur
		this.onBlur(this.open.bind(this, false));
	}, _Boundable, {
		main: function(cmp) {
			// unbind previous main if any
			if (this._main) {
				this._root.remove(this._main);
				this._mainActionListener();
				if (!this._params.focusable) {
					this._removeFocusable(this._main);
				}
			}
			// register new main
			this._main = cmp;
			// bind new mains
			this._root.main(cmp);
			if (!this._params.focusable) {
				this._addFocusable(cmp);
			}
			this._mainActionListener = cmp.onAction(this.toggle.bind(this));
			return this;
		},
		popup: function(cmp) {
			// unbind previous popup if any
			if (this._popup) {
				this._root.popup(null);
				if (!this._params.focusable) {
					this._removeFocusable(this._popup);
				}
			}
			if (cmp !== null) {
				// register new popup
				this._popup = cmp;
				// bind new popup
				this._root.popup(cmp);
				if (!this._params.focusable) {
					this._addFocusable(cmp);
				}
			}
			return this;
		},
		open: function(open, options) {
			if (arguments.length) {
				if (open !== this.open()) { // don't open if already open and same for close
					if (open) {
						this._open(options);
					} else {
						this._close();
					}
				}
			} else {
				return this._root.open();
			}
		},
		_open: function(options) {
			this._root.open(true, options);
			this._popup.focus && this._popup.focus();
		},
		_close: function() {
			this._root.open(false);
		},
		toggle: function() {
			this.open(!this.open());
		},
		focus: function() {
			if (this._params.focusable) {
				this._root.focus();
			} else {
				this._main.focus();
			}
		},
	});
});