module("baidu.lang.instance");


test("test baidu.lang.instance", function() {
	stop();
	ua.importsrc("baidu.lang.guid",function(){
		var v=baidu.lang.guid();
		var w=baidu.lang.guid();
		var ov=baidu.lang.instance(v);
		var ow=baidu.lang.instance(w);
		equal(ow, null, "return null successfully");
		window[baidu.guid]._instances[v] = this;
		var ov=baidu.lang.instance(v);
		ok(ov&&(typeof ov=='object'),"return Object successfully");
		start();
},'baidu.lang.guid','baidu.lang.instance');});

