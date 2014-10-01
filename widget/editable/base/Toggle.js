define([
	'ksf/utils/compose',
	'ksf/dom/composite/_Composite',
	'../../base/Button',
], function(
	compose,
	_Composite,
	Button
){
	return compose(function(value, trueLabel, falseLabel) {
		this._trueLabel = trueLabel;
		this._falseLabel = falseLabel;
	}, _Composite, function(value) {
		this.value(value);
	}, {
		_rootFactory: function() {
			return new Button();
		},
		value: function(value) {
			if (arguments.length > 0) {
				value = this._value = !!value;
				this._root.value(value ? this._trueLabel : this._falseLabel);
			} else {
				return this._value;
			}
		},
		onInput: function(cb) {
			var self = this;
			return this._root.onAction(function() {
				cb(!self.value());
			});
		},
		style: function(style) {
			this._root.style(style);
		}
	});
});