define(['ksf/utils/compose'], function(compose){
	return compose(function(observable) {
		var self = this;

		observable && this.value(observable);

		this._root.onInput(function(inputValue) {
			self._observable && self._observable.value(inputValue);
		});
	}, {
		value: function(observable) {
			var root = this._root;
			this._observable = observable;
			root.value(observable.value());
			this._own(observable.onChange(function(value) {
				root.value(value);
			}), 'observingChanges');
		},
	});
});