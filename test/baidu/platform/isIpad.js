module("baidu.platform.isIpad");

test("isIpad", function() {
	baidu.platform.isIpad ? ok(baidu.platform.isIpad, 'should be Ipad platform') : ok(
			!baidu.platform.isIpad, 'should not be Ipad platform');
});