define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'./layout/VFlex',
	'./layout/HFlex',
	'./layout/Single',
	'./widget/base/Button',
], function(
	compose,
	_Composite,
	VFlex,
	HFlex,
	Single,
	Button
) {
	return compose(_Composite, function() {
		this._setRoot(new VFlex().content([
			this._own(new HFlex(), 'headerBar'),
			[this._own(new Single(), 'body'), {flex: true}],
		]));
	}, {
		_render: function() {
			var content = this._content;
			var style = this._style;
			if (this._content && this._style) {
				var activeTab = this._activeTab || content[0].key;
				var bodyContent;
				this._owned.headerBar.content(content.map(function(cmp) {
					if (cmp.key === activeTab) {
						bodyContent = cmp.body;
					}
					return new Button(cmp.header).chain('onAction', this.active.bind(this, cmp.key))
						.style(activeTab === cmp.key ? style.header.activeTab : style.header.tabs);
				}, this));
				this._owned.body.content(bodyContent);
			} else {
				this._owned.headerBar.content([]);
				this._owned.body.content(null);
			}
		},
		content: function(content) {
			this._content = content;
			this._render();
			return this;
		},
		active: function(tabKey) {
			this._activeTab = tabKey;
			this._render();
			return this;
		},
		style: function(style) {
			this._style = style;
			style.root && this._root.style(style.root);
			style.body && this._owned.body.style(style.body);
			style.header && style.header.root && this._owned.headerBar.style(style.header.root);
			this._render();
			return this;
		},
	});
});