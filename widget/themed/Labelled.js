define([
	'ksf/utils/compose',
	'../Labelled',
	'ksf/dom/style/_WithStyle',
	'ksf/dom/style/JSS'
], function(
	compose,
	Labelled,
	_WithStyle,
	JSS
){
	var labelStyle = new JSS({
		fontSize: 'smaller',
		color: 'gray',
	});

	return compose(Labelled, function() {
		this.style({label: labelStyle});
		// en théorie, il faudrait que le composant 'field' ait une API 'display' mais vu que cela n'aurait pas de valeur ajoutée, on se contente de dire que l'API est directement 'domNode.style.display', ce qui permet d'être compatible avec plus de composants
		this._field.domNode.style.display = 'block';
	});
});