require.config({
	paths: {
		ksf: 'ksf/src'
	}
});

if (typeof document !== "undefined") {
	define(['ksf/require-config'], function() {});
}