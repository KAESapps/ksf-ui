define([
	'compose',
	'./Label',
	'ksf/dom/_Clickable'
], function(
	compose,
	Label,
	_Clickable
) {
	return compose(Label, _Clickable);
});