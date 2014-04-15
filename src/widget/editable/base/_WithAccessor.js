define([], function(){
	return function(accessor) {
		var self = this;

		this.value(accessor.value());
		accessor.onValue(function(value) {
			self.value(value);
		});

		this.onInput(function(inputValue) {
			accessor.value(inputValue);
		});
	};
});