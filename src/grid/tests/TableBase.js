define([
	'compose',
	'../TableBase',
	'../../widget/Label',
], function(
	compose,
	TableBase,
	Label
){
	var PropRenderer = compose(Label, {
		value: function(item) {
			return Label.prototype.value.call(this, item && item[this._prop]);
		}
	});

	console.time('grid by add');
	var grid = new TableBase();
	grid.addColumn({
		head: "Nom",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'name'});
		}
	});
	grid.addColumn({
		head: "Age",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'age'});
		},
	});
	grid.addRow({name: "Sylvain", age: 32});
	grid.addRow({name: "Aurélie", age: 31});

	document.body.appendChild(grid.domNode);

	grid.addColumn({
		head: "Job",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'job'});
		},
	}, 1);

	grid.addRow({name: 'Antonin', age: 3}, 1);
	console.timeEnd('grid by add');

	console.time('grid by value');
	var grid2 = new TableBase();
	document.body.appendChild(grid2.domNode);
	grid2.addColumn({
		head: "Nom",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'name'});
		}
	});
	grid2.addColumn({
		head: "Age",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'age'});
		},
	});
	grid2.addColumn({
		head: "Job",
		body: function() {
			return compose.create(PropRenderer, {_prop: 'job'});
		},
	}, 1);

	var value = window.value = [];
	for (var i=0; i<1000; i++) {
		value.push({name: 'toto', age: 30, job: "dev"});
	}
	grid2.value(value);

	console.timeEnd('grid by value');

	console.time('change value');
	grid2.value(value);
	console.timeEnd('change value');

});