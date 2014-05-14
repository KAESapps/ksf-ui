define([
	'ksf/dom/style/JSS'
], function(
	JSS
){
	return new JSS([{
		border: 'none',
		background: 'none',
		color: 'gray',
		padding: '1ex',
		margin: '0 1ex',
		fontSize: 'inherit',
		fontFamily: 'inherit',
		cursor: 'pointer',

		'::after': {
			content: '"/"',
			position: 'absolute',
			marginLeft: '2ex',
			color: 'gray',
		},
		':last-child::after': {
			content: '""'
		}
	}, {
		'&.active': {
			color: 'black',
			cursor: 'default',
			background: '#EEE',
			borderRadius: '0.5ex',
		}
	}]);
});