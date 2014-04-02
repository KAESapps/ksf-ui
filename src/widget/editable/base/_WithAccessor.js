define([], function(){
	return function(accessor) {
		var self = this;

		this.value(accessor.value());
		accessor.on('value', function(value) {
			self.value(value);
		});

		this.on('input', function(inputValue) {
			accessor.value(inputValue);
		});
	};
});