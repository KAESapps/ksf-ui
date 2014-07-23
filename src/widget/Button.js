define([
	'compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./base/Button',
	'./_ReactiveValue',
], function(
	compose,
	_Composite,
	_RootStylable,
	Button,
	_ReactiveValue
){
	return compose(_Composite, _RootStylable, _ReactiveValue, {
		_rootFactory: function() {
			return new Button();
		}
	}, function(observable) {
		if (observable !== undefined) {
			this.value(observable);
		}
	}, {
		onAction: function(cb) {
			return this._root.onAction(cb);
		}
	});
});