define([
	'intern!object',
	'intern/chai!assert',
	'../ShortText',
	'dojo/on',
], function(
	registerSuite,
	assert,
	ShortText,
	on
) {
	var cmp;
	registerSuite({
		name: "",
		beforeEach : function() {
			cmp = new ShortText();
			document.body.appendChild(cmp.domNode);
		},
		"value": function() {
			assert.equal(cmp.value(), undefined);
			var cbCalled = false;
			cmp.onInput(function() {
				cbCalled = true;
			});

			cmp.value("toto");
			assert.equal(cmp.value(), "toto");
			assert.equal(cbCalled, false, "No input event when setting value");
		},
		"user code change focus on input": function() {
			cmp.value('toto');

			var inputValues = [];
			cmp.onInput(function(value) {
				inputValues.push(value);
				document.body.removeChild(cmp.domNode);
			});

			//TODO: trouver une façon de simuler une saisie utilisateur qui mette le focus sur l'élément (pour que sa suppression du dom déclenche un 'change' imbriqué)

			// en attendant, on peut faire le test manuellement :
			// entrer du texte à la main et faire "Entrée"
			// puis vérifier que l'événement input n'est déclenché qu'une fois

			assert.deepEqual(inputValues, [
				'titi',
			]);
		},
	});

});