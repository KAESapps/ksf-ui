define([
	'ksf/utils/compose',
	'./_Base'
], function(
	compose,
	_Base
){
	return compose(_Base, function() {
		var self = this;
		var changing = false;
		this.domNode.addEventListener('change', function() {
			if (!changing) {
				changing = true;
				self._emit('input', self._getValue());
				changing = false;
			}
		});
	});
});