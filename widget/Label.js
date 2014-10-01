define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'ksf/dom/composite/_RootStylable',
	'./base/Label',
	'./_ReactiveValue',
], function(
	compose,
	_Composite,
	_RootStylable,
	Label,
	_ReactiveValue
){
	return compose(_Composite, _RootStylable, _ReactiveValue, {
		_rootFactory: function() {
			return new Label();
		}
	}, function(observable) {
		if (observable !== undefined) {
			this.value(observable);
		}
	});
});