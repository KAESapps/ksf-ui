define([
	'compose',
	'./Label',
	'./_Clickable'
], function(
	compose,
	Label,
	_Clickable
) {
	return compose(Label, _Clickable);
});