define(['compose'], function(compose){
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
			if (this._stopObserving) {
				this.unown(this._stopObserving);
				this._stopObserving();
			}
			root.value(observable.value());
			this._stopObserving = this.own(observable.onChange(function(value) {
				root.value(value);
			}));
		},
	});
});