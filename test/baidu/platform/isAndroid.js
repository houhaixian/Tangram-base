module("baidu.platform.isAndroid");

test("isAndroid", function() {
	baidu.platform.isAndroid ? ok(baidu.platform.isAndroid, 'should be Android platform') : ok(
			!baidu.platform.isAndroid, 'should not be Android platform');
});