define([
	'compose',
	'dojo/domReady!',
], function(
	compose
){
	return compose(function(content, options) {
		this._content = content;
		options = options || {};

		this._parentNode = options.parentNode || document.body;
		this._parentNode.appendChild(this._content.domNode);

		this._content.domNode.style.position = 'absolute';
		this._content.domNode.style.top = 0;
		this._content.domNode.style.left = 0;

		this._size();
		this._content.inDom && this._content.inDom(true);

		if (options.autoWindowResize !== false) {
			this._resize = this._size.bind(this);
			window.addEventListener('resize', this._resize);
		}
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