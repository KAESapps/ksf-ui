define([], function(){
	return function(accessor) {
		var self = this;

		this.value(accessor.value());
		accessor.onChange(function(value) {
			self.value(value);
		});

		this.onInput(function(inputValue) {
			accessor.value(inputValue);
		});
	};
});