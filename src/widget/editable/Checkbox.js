define([
	'compose',
	'ksf/base/Evented'
], function(
	compose,
	Evented
){
	return compose(Evented, function() {
		this.domNode = document.createElement('input');
		this.domNode.type = 'checkbox';
		var self = this;
		this.domNode.addEventListener('click', function(ev) {
			self._emit('input', self.domNode.checked);
			ev.preventDefault();
		});
	}, {
		value: function(checked) {
			this.domNode.checked = checked;
		}
	});
});