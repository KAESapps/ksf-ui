require.config({
	packages: [{ name: 'ksf', location: 'ksf/src' }],
	map: { 'ksf-ui': { compose: 'ksf/utils/compose' } }
});

if (typeof document !== "undefined") {
	define(['ksf/require-config'], function() {});
}