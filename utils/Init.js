define([
	'ksf/utils/compose',
	'domready',
], function(
	compose,
	domReady
){
	return compose(function(content, options) {
		options = options || {};

		domReady(function() {
			var parentNode = options.parentNode || document.body;
			if (options.marginReset !== false) {
				document.body.style.margin = 0;
			}
			parentNode.appendChild(content.domNode);

			content.inDom && content.inDom(true);
		});
	});
});