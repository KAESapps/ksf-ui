define(['./onDomEvent'], function(onDomEvent){
	return {
		focus: function() {
			this.domNode.focus();
		},
		onBlur: onDomEvent('blur'),
		onFocus: onDomEvent('focus'),
	};
});