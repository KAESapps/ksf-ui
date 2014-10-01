define([
	'compose',
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
		this._setRoot(new VFlex());
	}, {
		content: function(content) {
			this._content = content;
			this._root.content([
				this._own(new HFlex().content(content.map(function(cmp) {
					return new Button(cmp.header).chain('onAction', this.active.bind(this, cmp.key));
				}, this)), 'headerBar'),
				[this._own(new Single(), 'body'), {flex: true}],
			]);
			this.active(content[0].key);
			return this;
		},
		active: function(tabKey) {
			if (this._activeTab && this._style) {
				this._activeTab.style(this._style.header.tabs);
			}
			var bodyContent;
			this._content.some(function(contentElement, i) {
				if (contentElement.key === tabKey) {
					bodyContent = contentElement.body;
					this._activeTab = this._owned.headerBar.content()[i];
					return true;
				}
			}, this);
			if (this._style) {
				this._activeTab.style(this._style.header.activeTab);
			}
			this._owned.body.content(bodyContent);
			return this;
		},
		style: function(style) {
			this._style = style;
			style.root && this._root.style(style.root);
			style.body && this._owned.body.style(style.body);
			if (style.header) {
				style.header.root && this._owned.headerBar.style(style.header.root);
				style.header.tabs && this._owned.headerBar.content().forEach(function(cmp) {
					cmp.style(style.header.tabs);
				});
				style.header.activeTab && this._activeTab && this._activeTab.style(style.header.activeTab);
			}
			return this;
		},
	});
});