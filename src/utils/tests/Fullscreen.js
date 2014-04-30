define([
	'../Fullscreen',
	'../../base/HtmlContainer'
], function(
	Fullscreen,
	HtmlContainer
){
	var cmp = new HtmlContainer();
	cmp.domNode.style.backgroundColor = 'gray';
	new Fullscreen(cmp);
});