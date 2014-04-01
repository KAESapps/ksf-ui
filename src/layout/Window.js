define([
	'compose'
], function(
	compose
){
	return compose(function(arg) {
		this._content = arg.content;
		this._parentNode = arg.parentNode;
		this._parentNode.appendChild(this._content.domNode);

		this._layout();
		this._content.inDom && this._content.inDom(true);

		var self = this;
		window.addEventListener('resize', function() {
			self._layout();
		});
	}, {
		_layout: function() {
			this._content.bounds({
				height: this._parentNode.offsetHeight,
				width: this._parentNode.offsetWidth
			});
		}
	});
});