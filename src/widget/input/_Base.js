define([
	'compose',
	'ksf/base/_Evented',
	'ksf/base/_Chainable',
	'ksf/dom/_WithSize',
	'ksf/dom/_Positionable',
	'ksf/dom/_Boundable',
	'ksf/dom/style/_Stylable',
	'ksf/dom/_Focusable'
], function(
	compose,
	_Evented,
	_Chainable,
	_WithSize,
	_Positionable,
	_Boundable,
	_Stylable,
	_Focusable
){
	return compose(_Boundable, _Evented, _Chainable, _WithSize, _Stylable, _Positionable, _Focusable, {
		value: function(value) {
			if (value !== undefined) {
				// value est settable programmatiquement pour initialiser la valeur mais ne déclenche pas un événement 'input'
				this._setValue(value);
				return this;
			} else {
				return this._getValue();
			}
		},
		onInput: function(cb) {
			return this._on('input', cb);
		},
	});
});