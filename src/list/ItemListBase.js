define([
	'compose',
	'ksf/dom/composite/_Composite',
	'../base/HtmlContainer',
	'ksf/utils/destroy',
], function(
	compose,
	_Composite,
	HtmlContainer,
	destroy
){
	/*
	 *	List displaying components created by a given factory from entry values.
	 *	Entry values are identified by keys (strings).
	 *	Components are destroyed when matching entries are removed.
	 */
	return compose(_Composite, function () {
		this._components = {};
	}, {
		_rootFactory: function() {
			return new HtmlContainer(); // default container
		},
		// items: array of key/value pairs, { key: ..., value: ... }
		content: function(items) {
			var self = this;
			this.clear();
			this._destroyAllComponents();
			this._components = {};	
			var cmps = items.map(function(item) {
				return self._components[item.key] = self._createComponent(item.value);
			});
			this._root.content(cmps);
		},
		_createComponent: function(value) {
			var self = this;
			var cmp = this._itemFactory(value);
			cmp.onActiveRequest && cmp.own(cmp.onActiveRequest(function() {
				self._emit('activeRequest', value);
			}));
			return cmp;
		},
		add: function(value, key, beforeKey) {
			if (key in this._components) {
				throw "Key already added: " + key;
			}
			var beforeCmp = (beforeKey !== undefined) ? this._components[beforeKey] : undefined;
			var cmp = this._createComponent(value);
			this._root.add(cmp, beforeCmp);
			this._style && this._style.items && cmp.style(this._style.items);

			this._components[key] = cmp;
			return cmp;
		},
		remove: function(key) {
			var cmp = this._components[key];
			this._root.remove(cmp);
			destroy(cmp);
			
			delete this._components[key];
		},
		move: function(key, beforeKey) {
			var cmp = this._components[key];
			var beforeCmp = this._components[beforeKey];
			
			this._root.move(cmp, beforeCmp);
		},
		clear: function() {
			this._root.clear();
			this._destroyAllComponents();
			this._components = {};
		},
		active: function(key) {
			if (arguments.length) {
				// deactivate previously active component
				var activeCmp = this._components[this._activeKey];
				activeCmp && activeCmp.active(false);
				// activate newly active
				activeCmp = this._components[key];
				activeCmp && activeCmp.active(true);
				this._activeKey = key;
			} else {
				return this._activeKey;
			}
		},
		onActiveRequest: function(cb) {
			return this._on('activeRequest', cb);
		},
		_destroyAllComponents: function() {
			for (var i in this._components) {
				destroy(this._components[i]);
			}
		},
		destroy: function() {
			this._destroyAllComponents();
			_Composite.prototype.destroy.apply(this, arguments);
		},
		style: function(style) {
			this._style = style;
			style.root && this._root.style(style.root);
			if (style.items) {
				for (var i in this._components) {
					this._components[i].style(style.items);
				}
			}
		},
	});
});