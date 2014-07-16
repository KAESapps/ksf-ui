define(['./onDomEventAsync'], function(onDomEventAsync){
	return {
		focus: function() {
			this.domNode.focus();
		},
		blur: function() {
			this.domNode.blur();
		},
		onBlur: onDomEventAsync('blur'),
		onFocus: onDomEventAsync('focus'),
		focused: function() {
			return document.activeElement === this.domNode;
		},
	};
});