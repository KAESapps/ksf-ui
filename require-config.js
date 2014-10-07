require({
	packages: [
		{ name: 'ksf', location: 'ksf' },
		{ name: 'domready', location: 'domready', main: 'ready' },
	],
});

if (typeof document !== "undefined") {
	define(['ksf/require-config'], function() {});
}