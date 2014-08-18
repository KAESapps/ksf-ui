define([
	'compose',
	'./_DomChange'
], function(
	compose,
	_DomChange
){
	return compose(function() {
		this.domNode = document.createElement('input');
	}, _DomChange);
});