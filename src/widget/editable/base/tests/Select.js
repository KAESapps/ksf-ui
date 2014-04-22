define([
	'intern!object',
	'intern/chai!assert',
	'../Select',
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
			assert.equal(cmp.value(), undefined);
			assert.equal(cmp.domNode.value, "");
		},
		"changing value programmatically": function() {
			cmp.value("toto");
			assert.equal(cmp.value(), "toto");
			assert.equal(cmp.domNode.value, 'toto');
			assert.deepEqual(observedInputs, [], "No input event when setting value");
		},
		"simulating user selection": function() {
			cmp.domNode.value = "toto";
			on.emit(cmp.domNode, 'change', {});

			assert.equal(cmp.value(), undefined);
			assert.deepEqual(observedInputs, ['toto']);
		},
	});
});