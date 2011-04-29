module('baidu.dom._styleFixer.textOverflow');

$(document).ready(function() {
	var func = baidu.dom._styleFixer.textOverflow;
	var div = document.body.appendChild(document.createElement('div'));
	div.style.left = '20';
	div.style.top = '20';
	div.style.overflow = "visible";
	var tab = document.createElement('table');
	var rh = document.createElement('tr');
	var r1 = document.createElement('tr');
	var r2 = document.createElement('tr');
	var c1 = document.createElement('td');
	var c2 = document.createElement('td');
	var c3 = document.createElement('td');
	var c4 = document.createElement('td');
	var h1 = document.createElement('th');
	var h2 = document.createElement('th');
	h1.appendChild(document.createTextNode("第一列"));
	h2.appendChild(document.createTextNode("第二列"));
	rh.appendChild(h1);
	rh.appendChild(h2);
	tab.appendChild(rh);
	var textnode = "";
	for ( var i = 0; i < 500; i++) {
		textnode += "正";
	}
	c1.appendChild(document.createTextNode(textnode));
	c2.appendChild(document.createTextNode("1,2"));
	c3.appendChild(document.createTextNode("2,1"));
	c4.appendChild(document.createTextNode("2,2"));
	r1.appendChild(c1);
	r1.appendChild(c2);
	r2.appendChild(c3);
	r2.appendChild(c4);
	tab.appendChild(r1);
	tab.appendChild(r2);
	div.appendChild(tab);

	test('test textOverflow normally', function() {
		stop();
		equal(func.get(c1), "clip", "test 1 successfully");// By default,textOverflow==clip
		func.set(c1, 'ellipsis');// element.tagName=="TD"&&value=="ellipsis"
		equal(func.get(c1), "ellipsis", "test 2 successfully");
		func.set(h1, 'clip');
		equal(func.get(h1), "clip", "test 3 successfully");
		func.set(tab, 'ellipsis');
		equal(func.get(tab), "ellipsis", "test 4 successfully");
		setTimeout(function() {
			document.body.removeChild(div);
		}, 5000);
		start();
	});
});
