define([], function(){
	return {
		value: function(observable) {
			var root = this._root;
			this._observable = observable;
			root.value(observable.value());
			this._own(observable.onChange(function(value) {
				root.value(value);
			}), 'observingChanges');
		},
	};
});