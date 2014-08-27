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
		_layout: function(options) {
			options = options || this._options;
			
			var children = [];
			if (this._popup) {
				children.push([this._popup, {
					display: 'block',
					position: 'absolute',
					left: options.left ? 0 : null,
					right: options.right ? 0 : null,
					bottom: options.top ? '100%' : null
				}]);
			}
			if (this._content) {
				if (options.top) {
					children.push([this._content]);
				} else {
					children.unshift(this._content);
				}
			}
			this._root.content(children);
		},
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
				this._root.remove(this._popup);
			}
			if (opened && popup) {
				options = options || this._defaultOptions;
				this._root.add(popup, options.top ? this._main : null, {
					display: 'block',
					position: 'absolute',
					left: options.left ? 0 : null,
					right: options.right ? 0 : null,
					bottom: options.top ? '100%' : null
				});
			}
		},
		content: function(content) {
			this.main(content.main);
			this.popup(content.popup);
			return this;
		}
	});
});