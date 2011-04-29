module("baidu.platform.isWindows");

test("isWindows", function() {
	baidu.platform.isWindows ? ok(baidu.platform.isWindows, 'should be Windows platform') : ok(
			!baidu.platform.isWindows, 'should not be Windows platform');
});