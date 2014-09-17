/*global Drop*/
define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./Flow',
], function(
	compose,
	_Composite,
	_RootStylable,
	Flow
){
	return compose(_Composite, _RootStylable, {
		_rootFactory: function() {
			return new Flow({
				display: 'block'
			});
		}
	}, function(options) {
		this.domNode.style.position = 'relative';

		this._defaultOptions = options || {};
	}, {
		main: function(main) {
			if (this._main) {
				this._root.remove(this._main);
			}
			this._root.add(main);
			this._main = main;
			return this;
		},
		popup: function(popup) {
			this._displayPopup(popup, this._opened, this._options);
			this._popup = popup;
			return this;
		},
		open: function(opened, options) {
			if (opened === undefined) {
				return this._opened;
			} else {
				this._displayPopup(this._popup, opened, options);
				this._opened = opened;
				this._options = options;
				return this;
			}
		},
		_displayPopup: function(popup, opened, options) {
			if (this._opened && this._popup) {
				this._drop.destroy();
			}
			if (opened && popup) {
				options = options || this._defaultOptions;
				this._drop = new Drop({
					target: this._main.domNode,
					position: options.position || 'bottom left',
					openOn: null,
					content: popup.domNode,
					constrainToWindow: true,
					constrainToScrollParent: false,
					tetherOptions: {
						optimizations: {
						    gpu: false,
						}
					}
				});
				this._drop.open();
			}
		},
		content: function(content) {
			this.main(content.main);
			this.popup(content.popup);
			return this;
		}
	});
});