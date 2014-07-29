define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./Layer',
	'ksf/dom/_Boundable',
	'ksf/dom/_Positionable',
	'ksf/dom/style/Style'
], function(
	compose,
	_Composite,
	Layer,
	_Boundable,
	_Positionable,
	Style
){
	var maskStyle = new Style("#this { background: black; opacity: 0.5; }");

	var Mask = compose(_Positionable, function() {
		this.domNode = document.createElement('div');
		maskStyle.apply(this.domNode);
	},_Boundable);

	return compose(_Composite, {
		_rootFactory: function() {
			return new Layer();
		}
	}, function() {
		this._mask = new Mask();
	}, {
		_layout: function() {
			var layers = [];
			if (this._content) {
				layers.push(this._content);
			}
			if (this._popup) {
				layers.push(this._mask);
				layers.push([this._popup, { horizontalAlign: 'middle', verticalAlign: 'middle' }]);
			}
			this._root.content(layers);
		},
		popup: function(popup) {
			this._popup = popup;
			this._layout();
		},
		content: function(content) {
			this._content = content;
			this._layout();
		}
	});
});