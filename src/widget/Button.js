define([
	'compose',
	'./base/Button',
	'./_ReactiveValue'
], function(
	compose,
	Button,
	_ReactiveValue
){
	return compose(Button, _ReactiveValue);
});