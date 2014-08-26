define([
	'compose',
	'../base/HtmlContainer',
], function(
	compose,
	HtmlContainer
){
	return compose(HtmlContainer.prototype, function(defaultOptions) {
		HtmlContainer.call(this);
		this._defaultOptions = defaultOptions || {};
	}, {
		_tag: 'div',
		content: function(content) {
			if (content !== undefined) {
				var children = [];
				content.forEach(function(childAndOptions) {
					var child = childAndOptions[0] || childAndOptions,
						options = childAndOptions[1] || this._defaultOptions;
					children.push(child);
					child.position && child.position(options);
				}, this);
				HtmlContainer.prototype.content.call(this, children);
				return this;
			} else {
				return HtmlContainer.prototype.content.call(this);
			}
		},
		add: function(child, beforeChild, options) {
			HtmlContainer.prototype.add.call(this, child, beforeChild);
			child.position && child.position(options);
		},
		scrollable: function(scrollable) {
			this.domNode.style.overflow = scrollable ? 'auto' : null;
			return this;
		}
	});
});