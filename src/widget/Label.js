define([
	'compose',
	'./base/Label',
	'./_ReactiveValue'
], function(
	compose,
	Label,
	_ReactiveValue
){
	return compose(Label, _ReactiveValue);
});