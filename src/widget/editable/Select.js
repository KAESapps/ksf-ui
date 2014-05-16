define([
	'compose',
	'ksf/dom/composite/_Composite',
	'./base/Select',
	'./base/_WithAccessor'
], function(
	compose,
	_Composite,
	Select,
	_WithAccessor
){
	return compose(_Composite, _WithAccessor, {
		_rootFactory: function() {
			return new Select();
		},
		options: function(options) {
			// TODO: prendre comme 'options' un observable
			this._root.options(options);
		}
	}, function(value, options) {
		options && this.options(options);
	});
});