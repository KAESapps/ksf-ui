define([
	'compose',
	'./_DomChange',
	'ksf/dom/_Boundable'
], function(
	compose,
	_DomChange,
	_Boundable
){
	return compose(function() {
		this.domNode = document.createElement('textarea');
	}, _DomChange, _Boundable, {
		_getValue: function() {
			return this.domNode.value;
		},
		_setValue: function(value) {
			this.domNode.value = value === undefined ? null : value;
		},
	});
});