define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'./base/Toggle',
	'./base/_WithAccessor',
], function(
	compose,
	_Composite,
	Toggle,
	_WithAccessor
){
	return compose(function(observable, trueLabel, falseLabel) {
		trueLabel && (this._trueLabel = trueLabel);
		falseLabel && (this._falseLabel = falseLabel);
	}, _Composite, _WithAccessor, {
		_rootFactory: function() {
			return new Toggle(null, this._trueLabel, this._falseLabel);
		},
		style: function(style) {
			this._root.style(style);
		},

	});
});