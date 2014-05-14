define([
	'compose',
	'../Labelled',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	Labelled,
	_WithStyle,
	JSS
){
	return compose(Labelled, _WithStyle, {
		_style: new JSS({
			fontSize: 'smaller',
			color: 'gray',
			'> *': {
				fontSize: 'larger',
				display: 'block',
			},
		})
	});
});