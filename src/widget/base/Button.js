define([
	'compose',
	'./Label',
	'./_Clickable',
	'ksf/dom/style/_Stylable'
], function(
	compose,
	Label,
	_Clickable,
	_Stylable
) {
	return compose(Label, _Clickable, _Stylable);
});