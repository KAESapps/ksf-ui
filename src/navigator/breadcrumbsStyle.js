define(['ksf/dom/style/JSS'], function(JSS) {
	return new JSS({
		borderBottom: '1px solid #EEE',
		padding: '1ex 0',
		backgroundColor: 'white',
		'> *': {
			display: 'inline-block'
		}
	});
});