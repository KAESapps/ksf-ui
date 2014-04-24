define([
	'intern!object',
	'intern/chai!assert',
	'../MultiSelect',
	'dojo/on',
], function(
	registerSuite,
	assert,
	Select,
	on
) {
	var cmp, observedInputs;
	registerSuite({
		beforeEach : function() {
			cmp = new Select();
			observedInputs = [];
			cmp.onInput(function(value) {
				observedInputs.push(value);
			});
			cmp.options([
				['syv', "Sylvain"],
				['ket', "Quentin"],
				['toto', "Toto"],
			]);
			document.body.appendChild(cmp.domNode);
			cmp.inDom();
		},
		"no init value": function() {
			assert.deepEqual(cmp.value(), []);
			assert.equal(cmp.domNode.value, "");
		},
		"changing value programmatically": function() {
			cmp.value(["toto", 'syv']);
			assert.deepEqual(cmp.value(), ['syv', "toto"]);
			assert.deepEqual(observedInputs, [], "No input event when setting value");
		},
		"simulating user selection": function() {
			cmp.domNode.value = "toto";
			on.emit(cmp.domNode, 'change', {});

			assert.deepEqual(cmp.value(), []);
			assert.deepEqual(observedInputs, [
				['toto']
			]);
		},
	});
});