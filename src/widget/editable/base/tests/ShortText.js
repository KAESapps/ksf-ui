define([
	'intern!object',
	'intern/chai!assert',
	'../ShortText'
], function(
	registerSuite,
	assert,
	ShortText
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
			cmp.on('input', function() {
				cbCalled = true;
			});

			cmp.value("toto");
			assert.equal(cmp.value(), "toto");
			assert.equal(cbCalled, false, "No input event when setting value");
		},
		"input": function(){
			var inputValues = [];
			cmp.on('input', function(inputValue) {
				inputValues.push(inputValue);
			});

			cmp.input("toto");

			assert.equal(cmp.value(), undefined);

			cmp.input("titi");
			assert.deepEqual(inputValues, ["toto", "titi"]);
		}
	});
});