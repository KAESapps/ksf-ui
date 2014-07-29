define([
	'compose',
	'dojo/domReady',
], function(
	compose,
	domReady
){
	return compose(function(content, options) {
		var self = this;
		this._content = content;
		options = options || {};

		this._content.domNode.style.position = 'absolute';
		this._content.domNode.style.top = 0;
		this._content.domNode.style.left = 0;

		domReady(function() {
			self._parentNode = options.parentNode || document.body;
			self._parentNode.appendChild(self._content.domNode);

			self._size();
			self._content.inDom && self._content.inDom(true);

			if (options.autoWindowResize !== false) {
				self._resize = self._size.bind(self);
				window.addEventListener('resize', self._resize);
			}
		});
	}, {
		_size: function() {
			this._content.bounds({
				height: window.innerHeight,
				width: window.innerWidth
			});
		},
		destroy: function() {
			this._resize && window.removeEventListener('resize', this._resize);
			this._parentNode.removeChild(this._content.domNode);
		}
	});
});