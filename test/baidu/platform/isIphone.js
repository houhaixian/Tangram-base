module("baidu.platform.isIphone");

test("isIphone", function() {
	baidu.platform.isIphone ? ok(baidu.platform.isIphone, 'should be Iphone platform') : ok(
			!baidu.platform.isIphone, 'should not be Iphone platform');
});