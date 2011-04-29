module("baidu.platform.isMacintosh");

test("isMacintosh", function() {
	baidu.platform.isMacintosh ? ok(baidu.platform.isMacintosh, 'should be Macintosh platform') : ok(
			!baidu.platform.isMacintosh, 'should not be Macintosh platform');
});