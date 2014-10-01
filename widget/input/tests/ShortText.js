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
		"input": function(){
			var inputValues = [];
			cmp.on('input', function(inputValue) {
				inputValues.push(inputValue);
			});

			cmp.input("toto");
			cmp.input("titi");
			assert.deepEqual(inputValues, ["toto", "titi"]);
		}
	});
});