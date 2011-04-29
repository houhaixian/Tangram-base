module("baidu.platform.isX11");

test("isX11", function() {
	baidu.platform.isX11 ? ok(baidu.platform.isX11, 'should be X11 platform') : ok(
			!baidu.platform.isX11, 'should not be X11 platform');
});