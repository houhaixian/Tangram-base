(function() {

	var T, baidu = T = baidu || {
		version : "1.3.0"
	};
	baidu.guid = "$BAIDU$";
	window[baidu.guid] = window[baidu.guid] || {};
	baidu.browser = baidu.browser || {};
	baidu.browser.isGecko = /gecko/i.test(navigator.userAgent)
			&& !/like gecko/i.test(navigator.userAgent);
	baidu.browser.isStrict = document.compatMode == "CSS1Compat";
	(function() {
		var a = navigator.userAgent;
		if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a)
				&& !/chrome/i.test(a)) {
			baidu.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
		}
	})();
	if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
		baidu.browser.opera = +RegExp["\x241"]
	}
	if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
		baidu.browser.chrome = +RegExp["\x241"]
	}
	if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
		baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
	}
	try {
		if (/(\d+\.\d)/.test(external.max_version)) {
			baidu.browser.maxthon = +RegExp["\x241"]
		}
	} catch (e) {
	}
	baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
	if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
		baidu.browser.firefox = +RegExp["\x241"]
	}
	baidu.number = baidu.number || {};
	baidu.number.pad = function(d, c) {
		var f = "", b = (d < 0), a = String(Math.abs(d));
		if (a.length < c) {
			f = (new Array(c - a.length + 1)).join("0")
		}
		return (b ? "-" : "") + f + a
	};
	baidu.number.comma = function(b, a) {
		if (!a || a < 1) {
			a = 3
		}
		b = String(b).split(".");
		b[0] = b[0].replace(new RegExp("(\\d)(?=(\\d{" + a + "})+$)", "ig"),
				"$1,");
		return b.join(".")
	};
	baidu.url = baidu.url || {};
	baidu.url.escapeSymbol = function(a) {
		return String(a).replace(/\%/g, "%25").replace(/&/g, "%26").replace(
				/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F")
				.replace(/\#/g, "%23").replace(/\=/g, "%3D")
	};
	baidu.string = baidu.string || {};
	baidu.string.escapeReg = function(a) {
		return String(a).replace(
				new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
	};
	baidu.url.getQueryValue = function(b, c) {
		var d = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(c)
				+ "=([^&]*)(&|\x24)", "");
		var a = b.match(d);
		if (a) {
			return a[2]
		}
		return null
	};
	baidu.object = baidu.object || {};
	baidu.object.each = function(f, c) {
		var b, a, d;
		if ("function" == typeof c) {
			for (a in f) {
				if (f.hasOwnProperty(a)) {
					d = f[a];
					b = c.call(f, d, a);
					if (b === false) {
						break
					}
				}
			}
		}
		return f
	};
	baidu.lang = baidu.lang || {};
	baidu.lang.isArray = function(a) {
		return "[object Array]" == Object.prototype.toString.call(a)
	};
	baidu.url.jsonToQuery = function(c, f) {
		var a = [], d, b = f || function(g) {
			return baidu.url.escapeSymbol(g)
		};
		baidu.object.each(c, function(h, g) {
			if (baidu.lang.isArray(h)) {
				d = h.length;
				while (d--) {
					a.push(g + "=" + b(h[d], g))
				}
			} else {
				a.push(g + "=" + b(h, g))
			}
		});
		return a.join("&")
	};
	baidu.url.queryToJson = function(a) {
		var g = a.substr(a.lastIndexOf("?") + 1), c = g.split("&"), f = c.length, l = {}, d = 0, j, h, k, b;
		for (; d < f; d++) {
			b = c[d].split("=");
			j = b[0];
			h = b[1];
			k = l[j];
			if ("undefined" == typeof k) {
				l[j] = h
			} else {
				if (baidu.lang.isArray(k)) {
					k.push(h)
				} else {
					l[j] = [ k, h ]
				}
			}
		}
		return l
	};
	baidu.cookie = baidu.cookie || {};
	baidu.cookie._isValidKey = function(a) {
		return (new RegExp(
				'^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
				.test(a)
	};
	baidu.cookie.setRaw = function(c, d, b) {
		if (!baidu.cookie._isValidKey(c)) {
			return
		}
		b = b || {};
		var a = b.expires;
		if ("number" == typeof b.expires) {
			a = new Date();
			a.setTime(a.getTime() + b.expires)
		}
		document.cookie = c + "=" + d + (b.path ? "; path=" + b.path : "")
				+ (a ? "; expires=" + a.toGMTString() : "")
				+ (b.domain ? "; domain=" + b.domain : "")
				+ (b.secure ? "; secure" : "")
	};
	baidu.cookie.getRaw = function(b) {
		if (baidu.cookie._isValidKey(b)) {
			var c = new RegExp("(^| )" + b + "=([^;]*)(;|\x24)"), a = c
					.exec(document.cookie);
			if (a) {
				return a[2] || null
			}
		}
		return null
	};
	baidu.cookie.get = function(a) {
		var b = baidu.cookie.getRaw(a);
		if ("string" == typeof b) {
			b = decodeURIComponent(b);
			return b
		}
		return null
	};
	baidu.cookie.set = function(b, c, a) {
		baidu.cookie.setRaw(b, encodeURIComponent(c), a)
	};
	baidu.cookie.remove = function(b, a) {
		a = a || {};
		a.expires = new Date(0);
		baidu.cookie.setRaw(b, "", a)
	};
	baidu.json = baidu.json || {};
	baidu.json.parse = function(a) {
		return (new Function("return " + a))()
	};
	baidu.json.stringify = (function() {
		var b = {
			"\b" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\f" : "\\f",
			"\r" : "\\r",
			'"' : '\\"',
			"\\" : "\\\\"
		};
		function a(g) {
			if (/["\\\x00-\x1f]/.test(g)) {
				g = g.replace(/["\\\x00-\x1f]/g, function(h) {
					var i = b[h];
					if (i) {
						return i
					}
					i = h.charCodeAt();
					return "\\u00" + Math.floor(i / 16).toString(16)
							+ (i % 16).toString(16)
				})
			}
			return '"' + g + '"'
		}
		function d(n) {
			var h = [ "[" ], j = n.length, g, k, m;
			for (k = 0; k < j; k++) {
				m = n[k];
				switch (typeof m) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (g) {
						h.push(",")
					}
					h.push(baidu.json.stringify(m));
					g = 1
				}
			}
			h.push("]");
			return h.join("")
		}
		function c(g) {
			return g < 10 ? "0" + g : g
		}
		function f(g) {
			return '"' + g.getFullYear() + "-" + c(g.getMonth() + 1) + "-"
					+ c(g.getDate()) + "T" + c(g.getHours()) + ":"
					+ c(g.getMinutes()) + ":" + c(g.getSeconds()) + '"'
		}
		return function(l) {
			switch (typeof l) {
			case "undefined":
				return "undefined";
			case "number":
				return isFinite(l) ? String(l) : "null";
			case "string":
				return a(l);
			case "boolean":
				return String(l);
			default:
				if (l === null) {
					return "null"
				} else {
					if (l instanceof Array) {
						return d(l)
					} else {
						if (l instanceof Date) {
							return f(l)
						} else {
							var h = [ "{" ], k = baidu.json.stringify, g, j;
							for ( var i in l) {
								if (Object.prototype.hasOwnProperty.call(l, i)) {
									j = l[i];
									switch (typeof j) {
									case "undefined":
									case "unknown":
									case "function":
										break;
									default:
										if (g) {
											h.push(",")
										}
										g = 1;
										h.push(k(i) + ":" + k(j))
									}
								}
							}
							h.push("}");
							return h.join("")
						}
					}
				}
			}
		}
	})();
	baidu.json.encode = baidu.json.stringify;
	baidu.json.decode = baidu.json.parse;
	baidu.date = baidu.date || {};
	baidu.date.format = function(a, g) {
		if ("string" != typeof g) {
			return a.toString()
		}
		function d(m, l) {
			g = g.replace(m, l)
		}
		var b = baidu.number.pad, h = a.getFullYear(), f = a.getMonth() + 1, k = a
				.getDate(), i = a.getHours(), c = a.getMinutes(), j = a
				.getSeconds();
		d(/yyyy/g, b(h, 4));
		d(/yy/g, b(h.toString().slice(2), 2));
		d(/MM/g, b(f, 2));
		d(/M/g, f);
		d(/dd/g, b(k, 2));
		d(/d/g, k);
		d(/HH/g, b(i, 2));
		d(/H/g, i);
		d(/hh/g, b(i % 12, 2));
		d(/h/g, i % 12);
		d(/mm/g, b(c, 2));
		d(/m/g, c);
		d(/ss/g, b(j, 2));
		d(/s/g, j);
		return g
	};
	baidu.date.parse = function(c) {
		var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
		if ("string" == typeof c) {
			if (a.test(c) || isNaN(Date.parse(c))) {
				var g = c.split(/ |T/), b = g.length > 1 ? g[1].split(/[^\d]/)
						: [ 0, 0, 0 ], f = g[0].split(/[^\d]/);
				return new Date(f[0] - 0, f[1] - 1, f[2] - 0, b[0] - 0,
						b[1] - 0, b[2] - 0)
			} else {
				return new Date(c)
			}
		}
		return new Date()
	};
	baidu.dom = baidu.dom || {};
	baidu.dom._styleFilter = baidu.dom._styleFilter || [];
	baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
		get : function(c, d) {
			if (/color/i.test(c) && d.indexOf("rgb(") != -1) {
				var f = d.split(",");
				d = "#";
				for ( var b = 0, a; a = f[b]; b++) {
					a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
					d += a.length == 1 ? "0" + a : a
				}
				d = d.toUpperCase()
			}
			return d
		}
	};
	baidu.dom._styleFilter.filter = function(b, f, g) {
		for ( var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
			if (c = c[g]) {
				f = c(b, f)
			}
		}
		return f
	};
	baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
		set : function(a, b) {
			if (b.constructor == Number
					&& !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
				b = b + "px"
			}
			return b
		}
	};
	baidu.dom._styleFixer = baidu.dom._styleFixer || {};
	baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
		set : function(a, b) {
			a = a.style;
			if (b == "inline-block") {
				a.display = "inline";
				a.zoom = 1
			} else {
				a.display = b
			}
		}
	}
			: baidu.browser.firefox && baidu.browser.firefox < 3 ? {
				set : function(a, b) {
					a.style.display = b == "inline-block" ? "-moz-inline-box"
							: b
				}
			} : null;
	baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat"
			: "cssFloat";
	baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
		get : function(a) {
			var b = a.style.filter;
			return b && b.indexOf("opacity=") >= 0 ? (parseFloat(b
					.match(/opacity=([^)]*)/)[1]) / 100)
					+ "" : "1"
		},
		set : function(a, c) {
			var b = a.style;
			b.filter = (b.filter || "").replace(/alpha\([^\)]*\)/gi, "")
					+ (c == 1 ? "" : "alpha(opacity=" + c * 100 + ")");
			b.zoom = 1
		}
	} : null;
	baidu.dom._styleFixer.textOverflow = (function() {
		var b = {};
		function a(f) {
			var g = f.length;
			if (g > 0) {
				g = f[g - 1];
				f.length--
			} else {
				g = null
			}
			return g
		}
		function c(f, g) {
			f[baidu.browser.firefox ? "textContent" : "innerText"] = g
		}
		function d(n, j, t) {
			var l = baidu.browser.ie ? n.currentStyle || n.style
					: getComputedStyle(n, null), s = l.fontWeight, r = "font-family:"
					+ l.fontFamily
					+ ";font-size:"
					+ l.fontSize
					+ ";word-spacing:"
					+ l.wordSpacing
					+ ";font-weight:"
					+ ((parseInt(s) || 0) == 401 ? 700 : s)
					+ ";font-style:"
					+ l.fontStyle + ";font-variant:" + l.fontVariant, f = b[r];
			if (!f) {
				l = n.appendChild(document.createElement("div"));
				l.style.cssText = "float:left;" + r;
				f = b[r] = [];
				for ( var p = 0; p < 256; p++) {
					p == 32 ? (l.innerHTML = "&nbsp;") : c(l, String
							.fromCharCode(p));
					f[p] = l.offsetWidth
				}
				c(l, "\u4e00");
				f[256] = l.offsetWidth;
				c(l, "\u4e00\u4e00");
				f[257] = l.offsetWidth - f[256] * 2;
				f[258] = f[".".charCodeAt(0)] * 3 + f[257] * 3;
				n.removeChild(l)
			}
			for ( var m = n.firstChild, q = f[256], h = f[257], g = f[258], v = [], t = t ? g
					: 0; m; m = m.nextSibling) {
				if (j < t) {
					n.removeChild(m)
				} else {
					if (m.nodeType == 3) {
						for ( var p = 0, u = m.nodeValue, k = u.length; p < k; p++) {
							l = u.charCodeAt(p);
							v[v.length] = [ j, m, p ];
							j -= (p ? h : 0) + (l < 256 ? f[l] : q);
							if (j < t) {
								break
							}
						}
					} else {
						l = m.tagName;
						if (l == "IMG" || l == "TABLE") {
							l = m;
							m = m.previousSibling;
							n.removeChild(l)
						} else {
							v[v.length] = [ j, m ];
							j -= m.offsetWidth
						}
					}
				}
			}
			if (j < t) {
				while (l = a(v)) {
					j = l[0];
					m = l[1];
					l = l[2];
					if (m.nodeType == 3) {
						if (j >= g) {
							m.nodeValue = m.nodeValue.substring(0, l) + "...";
							return true
						} else {
							if (!l) {
								n.removeChild(m)
							}
						}
					} else {
						if (d(m, j, true)) {
							return true
						} else {
							n.removeChild(m)
						}
					}
				}
				n.innerHTML = ""
			}
		}
		return {
			get : function(g, h) {
				var f = baidu.browser;
				return (f.opera ? h.OTextOverflow
						: f.firefox ? g._baiduOverflow : h.textOverflow)
						|| "clip"
			},
			set : function(g, i) {
				var f = baidu.browser;
				if (g.tagName == "TD" || g.tagName == "TH" || f.firefox) {
					g._baiduHTML && (g.innerHTML = g._baiduHTML);
					if (i == "ellipsis") {
						g._baiduHTML = g.innerHTML;
						var j = document.createElement("div"), h = g
								.appendChild(j).offsetWidth;
						g.removeChild(j);
						d(g, h)
					} else {
						g._baiduHTML = ""
					}
				}
				j = g.style;
				f.opera ? (j.OTextOverflow = i)
						: f.firefox ? (g._baiduOverflow = i)
								: (j.textOverflow = i)
			}
		}
	})();
	baidu.dom.g = function(a) {
		if ("string" == typeof a || a instanceof String) {
			return document.getElementById(a)
		} else {
			if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
				return a
			}
		}
		return null
	};
	baidu.g = baidu.G = baidu.dom.g;
	baidu.dom._NAME_ATTRS = (function() {
		var a = {
			cellpadding : "cellPadding",
			cellspacing : "cellSpacing",
			colspan : "colSpan",
			rowspan : "rowSpan",
			valign : "vAlign",
			usemap : "useMap",
			frameborder : "frameBorder"
		};
		if (baidu.browser.ie < 8) {
			a["for"] = "htmlFor";
			a["class"] = "className"
		} else {
			a.htmlFor = "for";
			a.className = "class"
		}
		return a
	})();
	baidu.dom.setAttr = function(b, a, c) {
		b = baidu.dom.g(b);
		if ("style" == a) {
			b.style.cssText = c
		} else {
			a = baidu.dom._NAME_ATTRS[a] || a;
			b.setAttribute(a, c)
		}
		return b
	};
	baidu.setAttr = baidu.dom.setAttr;
	baidu.dom.setAttrs = function(c, a) {
		c = baidu.dom.g(c);
		for ( var b in a) {
			baidu.dom.setAttr(c, b, a[b])
		}
		return c
	};
	baidu.setAttrs = baidu.dom.setAttrs;
	baidu.dom.getAttr = function(b, a) {
		b = baidu.dom.g(b);
		if ("style" == a) {
			return b.style.cssText
		}
		a = baidu.dom._NAME_ATTRS[a] || a;
		return b.getAttribute(a)
	};
	baidu.getAttr = baidu.dom.getAttr;
	baidu.dom._matchNode = function(a, c, d) {
		a = baidu.dom.g(a);
		for ( var b = a[d]; b; b = b[c]) {
			if (b.nodeType == 1) {
				return b
			}
		}
		return null
	};
	baidu.dom.prev = function(a) {
		return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
	};
	(function() {
		var a = new RegExp(
				"(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
		baidu.string.trim = function(b) {
			return String(b).replace(a, "")
		}
	})();
	baidu.trim = baidu.string.trim;
	baidu.dom.addClass = function(g, h) {
		g = baidu.dom.g(g);
		var b = h.split(/\s+/), a = g.className, f = " " + a + " ", d = 0, c = b.length;
		for (; d < c; d++) {
			if (f.indexOf(" " + b[d] + " ") < 0) {
				a += " " + b[d]
			}
		}
		g.className = a;
		return g
	};
	baidu.addClass = baidu.dom.addClass;
	baidu.dom.hasClass = function(c, d) {
		c = baidu.dom.g(c);
		var b = baidu.string.trim(d).split(/\s+/), a = b.length;
		d = c.className.split(/\s+/).join(" ");
		while (a--) {
			if (!(new RegExp("(^| )" + b[a] + "( |\x24)")).test(d)) {
				return false
			}
		}
		return true
	};
	baidu.lang.isString = function(a) {
		return "[object String]" == Object.prototype.toString.call(a)
	};
	baidu.isString = baidu.lang.isString;
	baidu.dom._g = function(a) {
		if (baidu.lang.isString(a)) {
			return document.getElementById(a)
		}
		return a
	};
	baidu._g = baidu.dom._g;
	baidu.dom.contains = function(a, b) {
		var c = baidu.dom._g;
		a = c(a);
		b = c(b);
		return a.contains ? a != b && a.contains(b) : !!(a
				.compareDocumentPosition(b) & 16)
	};
	baidu.dom.getDocument = function(a) {
		a = baidu.dom.g(a);
		return a.nodeType == 9 ? a : a.ownerDocument || a.document
	};
	baidu.dom.removeClass = function(g, h) {
		g = baidu.dom.g(g);
		var d = g.className.split(/\s+/), k = h.split(/\s+/), b, a = k.length, c, f = 0;
		for (; f < a; ++f) {
			for (c = 0, b = d.length; c < b; ++c) {
				if (d[c] == k[f]) {
					d.splice(c, 1);
					break
				}
			}
		}
		g.className = d.join(" ");
		return g
	};
	baidu.removeClass = baidu.dom.removeClass;
	baidu.dom.children = function(b) {
		b = baidu.dom.g(b);
		for ( var a = [], c = b.firstChild; c; c = c.nextSibling) {
			if (c.nodeType == 1) {
				a.push(c)
			}
		}
		return a
	};
	baidu.string.toCamelCase = function(a) {
		if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
			return a
		}
		return a.replace(/[-_][^-_]/g, function(b) {
			return b.charAt(1).toUpperCase()
		})
	};
	baidu.dom.setStyle = function(c, b, d) {
		var f = baidu.dom, a;
		c = f.g(c);
		b = baidu.string.toCamelCase(b);
		if (a = f._styleFilter) {
			d = a.filter(b, d, "set")
		}
		a = f._styleFixer[b];
		(a && a.set) ? a.set(c, d) : (c.style[a || b] = d);
		return c
	};
	baidu.setStyle = baidu.dom.setStyle;
	baidu.dom.setStyles = function(b, c) {
		b = baidu.dom.g(b);
		for ( var a in c) {
			baidu.dom.setStyle(b, a, c[a])
		}
		return b
	};
	baidu.setStyles = baidu.dom.setStyles;
	baidu.dom.q = function(j, f, b) {
		var k = [], d = baidu.string.trim, h, g, a, c;
		if (!(j = d(j))) {
			return k
		}
		if ("undefined" == typeof f) {
			f = document
		} else {
			f = baidu.dom.g(f);
			if (!f) {
				return k
			}
		}
		b && (b = d(b).toUpperCase());
		if (f.getElementsByClassName) {
			a = f.getElementsByClassName(j);
			h = a.length;
			for (g = 0; g < h; g++) {
				c = a[g];
				if (b && c.tagName != b) {
					continue
				}
				k[k.length] = c
			}
		} else {
			j = new RegExp("(^|\\s)" + baidu.string.escapeReg(j) + "(\\s|\x24)");
			a = b ? f.getElementsByTagName(b) : (f.all || f
					.getElementsByTagName("*"));
			h = a.length;
			for (g = 0; g < h; g++) {
				c = a[g];
				j.test(c.className) && (k[k.length] = c)
			}
		}
		return k
	};
	baidu.q = baidu.Q = baidu.dom.q;
	baidu.dom.getStyle = function(c, b) {
		var g = baidu.dom;
		c = g.g(c);
		b = baidu.string.toCamelCase(b);
		var f = c.style[b];
		if (!f) {
			var a = g._styleFixer[b], d = c.currentStyle
					|| (baidu.browser.ie ? c.style : getComputedStyle(c, null));
			f = a && a.get ? a.get(c, d) : d[a || b]
		}
		if (a = g._styleFilter) {
			f = a.filter(b, f, "get")
		}
		return f
	};
	baidu.getStyle = baidu.dom.getStyle;
	baidu.dom.getPosition = function(a) {
		a = baidu.dom.g(a);
		var k = baidu.dom.getDocument(a), d = baidu.browser, h = baidu.dom.getStyle, c = d.isGecko > 0
				&& k.getBoxObjectFor
				&& h(a, "position") == "absolute"
				&& (a.style.top === "" || a.style.left === ""), i = {
			left : 0,
			top : 0
		}, g = (d.ie && !d.isStrict) ? k.body : k.documentElement, l, b;
		if (a == g) {
			return i
		}
		if (a.getBoundingClientRect) {
			b = a.getBoundingClientRect();
			i.left = Math.floor(b.left)
					+ Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
			i.top = Math.floor(b.top)
					+ Math.max(k.documentElement.scrollTop, k.body.scrollTop);
			i.left -= k.documentElement.clientLeft;
			i.top -= k.documentElement.clientTop;
			var j = k.body, m = parseInt(h(j, "borderLeftWidth")), f = parseInt(h(
					j, "borderTopWidth"));
			if (d.ie && !d.isStrict) {
				i.left -= isNaN(m) ? 2 : m;
				i.top -= isNaN(f) ? 2 : f
			}
		} else {
			l = a;
			do {
				i.left += l.offsetLeft;
				i.top += l.offsetTop;
				if (d.isWebkit > 0 && h(l, "position") == "fixed") {
					i.left += k.body.scrollLeft;
					i.top += k.body.scrollTop;
					break
				}
				l = l.offsetParent
			} while (l && l != a);
			if (d.opera > 0
					|| (d.isWebkit > 0 && h(a, "position") == "absolute")) {
				i.top -= k.body.offsetTop
			}
			l = a.offsetParent;
			while (l && l != k.body) {
				i.left -= l.scrollLeft;
				if (!d.opera || l.tagName != "TR") {
					i.top -= l.scrollTop
				}
				l = l.offsetParent
			}
		}
		return i
	};
	baidu.dom.intersect = function(j, i) {
		var h = baidu.dom.g, f = baidu.dom.getPosition, a = Math.max, c = Math.min;
		j = h(j);
		i = h(i);
		var d = f(j), b = f(i);
		return a(d.left, b.left) <= c(d.left + j.offsetWidth, b.left
				+ i.offsetWidth)
				&& a(d.top, b.top) <= c(d.top + j.offsetHeight, b.top
						+ i.offsetHeight)
	};
	baidu.dom.last = function(a) {
		return baidu.dom._matchNode(a, "previousSibling", "lastChild")
	};
	baidu.dom.ready = function() {
		var c = false, f = false, d = [];
		function a() {
			if (!c) {
				c = true;
				for ( var h = 0, g = d.length; h < g; h++) {
					d[h]()
				}
			}
		}
		function b() {
			if (f) {
				return
			}
			f = true;
			var j = document, h = window, g = baidu.browser.opera;
			if (j.addEventListener) {
				j.addEventListener("DOMContentLoaded", g ? function() {
					if (c) {
						return
					}
					for ( var k = 0; k < j.styleSheets.length; k++) {
						if (j.styleSheets[k].disabled) {
							setTimeout(arguments.callee, 0);
							return
						}
					}
					a()
				} : a, false)
			} else {
				if (baidu.browser.ie && h == top) {
					(function() {
						if (c) {
							return
						}
						try {
							j.documentElement.doScroll("left")
						} catch (k) {
							setTimeout(arguments.callee, 0);
							return
						}
						a()
					})()
				} else {
					if (baidu.browser.safari) {
						var i;
						(function() {
							if (c) {
								return
							}
							if (j.readyState != "loaded"
									&& j.readyState != "complete") {
								setTimeout(arguments.callee, 0);
								return
							}
							if (i === undefined) {
								i = 0;
								var n = j.getElementsByTagName("style"), l = j
										.getElementsByTagName("link");
								if (n) {
									i += n.length
								}
								if (l) {
									for ( var m = 0, k = l.length; m < k; m++) {
										if (l[m].getAttribute("rel") == "stylesheet") {
											i++
										}
									}
								}
							}
							if (j.styleSheets.length != i) {
								setTimeout(arguments.callee, 0);
								return
							}
							a()
						})()
					}
				}
			}
			h.attachEvent ? h.attachEvent("onload", a) : h.addEventListener(
					"load", a, false)
		}
		return function(g) {
			b();
			c ? g() : (d[d.length] = g)
		}
	}();
	baidu.dom.getAncestorByTag = function(b, a) {
		b = baidu.dom.g(b);
		a = a.toUpperCase();
		while ((b = b.parentNode) && b.nodeType == 1) {
			if (b.tagName == a) {
				return b
			}
		}
		return null
	};
	baidu.dom.getWindow = function(a) {
		a = baidu.dom.g(a);
		var b = baidu.dom.getDocument(a);
		return b.parentWindow || b.defaultView || null
	};
	baidu.dom.getAncestorBy = function(a, b) {
		a = baidu.dom.g(a);
		while ((a = a.parentNode) && a.nodeType == 1) {
			if (b(a)) {
				return a
			}
		}
		return null
	};
	baidu.dom.hide = function(a) {
		a = baidu.dom.g(a);
		a.style.display = "none";
		return a
	};
	baidu.hide = baidu.dom.hide;
	baidu.dom.next = function(a) {
		return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
	};
	baidu.dom.show = function(a) {
		a = baidu.dom.g(a);
		a.style.display = "";
		return a
	};
	baidu.show = baidu.dom.show;
	baidu.dom.toggle = function(a) {
		a = baidu.dom.g(a);
		a.style.display = a.style.display == "none" ? "" : "none";
		return a
	};
	baidu.dom.insertAfter = function(d, c) {
		var b, a;
		b = baidu.dom._g;
		d = b(d);
		c = b(c);
		a = c.parentNode;
		if (a) {
			a.insertBefore(d, c.nextSibling)
		}
		return d
	};
	baidu.dom.first = function(a) {
		return baidu.dom._matchNode(a, "nextSibling", "firstChild")
	};
	baidu.dom.insertBefore = function(d, c) {
		var b, a;
		b = baidu.dom._g;
		d = b(d);
		c = b(c);
		a = c.parentNode;
		if (a) {
			a.insertBefore(d, c)
		}
		return d
	};
	baidu.dom.insertHTML = function(d, a, c) {
		d = baidu.dom.g(d);
		var b, f;
		if (d.insertAdjacentHTML) {
			d.insertAdjacentHTML(a, c)
		} else {
			b = d.ownerDocument.createRange();
			a = a.toUpperCase();
			if (a == "AFTERBEGIN" || a == "BEFOREEND") {
				b.selectNodeContents(d);
				b.collapse(a == "AFTERBEGIN")
			} else {
				f = a == "BEFOREBEGIN";
				b[f ? "setStartBefore" : "setEndAfter"](d);
				b.collapse(f)
			}
			b.insertNode(b.createContextualFragment(c))
		}
		return d
	};
	baidu.insertHTML = baidu.dom.insertHTML;
	baidu.dom.remove = function(a) {
		a = baidu.dom._g(a);
		var b = a.parentNode;
		b && b.removeChild(a)
	};
	baidu.dom.getAncestorByClass = function(a, b) {
		a = baidu.dom.g(a);
		b = new RegExp("(^|\\s)" + baidu.string.trim(b) + "(\\s|\x24)");
		while ((a = a.parentNode) && a.nodeType == 1) {
			if (b.test(a.className)) {
				return a
			}
		}
		return null
	};
	window[baidu.guid]._instances = window[baidu.guid]._instances || {};
	baidu.lang.instance = function(a) {
		return window[baidu.guid]._instances[a] || null
	};
	baidu.lang.isNumber = function(a) {
		return "[object Number]" == Object.prototype.toString.call(a)
	};
	baidu.lang.guid = function() {
		return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36)
	};
	window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
	baidu.lang.isFunction = function(a) {
		return "[object Function]" == Object.prototype.toString.call(a)
	};
	baidu.lang.Class = function(a) {
		this.guid = a || baidu.lang.guid();
		window[baidu.guid]._instances[this.guid] = this
	};
	window[baidu.guid]._instances = window[baidu.guid]._instances || {};
	baidu.lang.Class.prototype.dispose = function() {
		delete window[baidu.guid]._instances[this.guid];
		for ( var a in this) {
			if (!baidu.lang.isFunction(this[a])) {
				delete this[a]
			}
		}
		this.disposed = true
	};
	baidu.lang.Class.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	};
	baidu.lang.inherits = function(h, f, d) {
		var c, g, a = h.prototype, b = new Function();
		b.prototype = f.prototype;
		g = h.prototype = new b();
		for (c in a) {
			g[c] = a[c]
		}
		h.prototype.constructor = h;
		h.superClass = f.prototype;
		if ("string" == typeof d) {
			g._className = d
		}
	};
	baidu.inherits = baidu.lang.inherits;
	baidu.lang.isElement = function(a) {
		return !!(a && a.nodeName && a.nodeType == 1)
	};
	baidu.lang.module = function(name, module, owner) {
		var packages = name.split("."), len = packages.length - 1, packageName, i = 0;
		if (!owner) {
			try {
				if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24"))
						.test(packages[0])) {
					throw ""
				}
				owner = eval(packages[0]);
				i = 1
			} catch (e) {
				owner = window
			}
		}
		for (; i < len; i++) {
			packageName = packages[i];
			if (!owner[packageName]) {
				owner[packageName] = {}
			}
			owner = owner[packageName]
		}
		if (!owner[packages[len]]) {
			owner[packages[len]] = module
		}
	};
	baidu.lang.decontrol = function(b) {
		var a = window[baidu.guid];
		a._instances && (delete a._instances[b])
	};
	baidu.lang.Event = function(a, b) {
		this.type = a;
		this.returnValue = true;
		this.target = b || null;
		this.currentTarget = null
	};
	baidu.lang.Class.prototype.addEventListener = function(d, c, b) {
		if (!baidu.lang.isFunction(c)) {
			return
		}
		!this.__listeners && (this.__listeners = {});
		var a = this.__listeners, f;
		if (typeof b == "string" && b) {
			if (/[^\w\-]/.test(b)) {
				throw ("nonstandard key:" + b)
			} else {
				c.hashCode = b;
				f = b
			}
		}
		d.indexOf("on") != 0 && (d = "on" + d);
		typeof a[d] != "object" && (a[d] = {});
		f = f || baidu.lang.guid();
		c.hashCode = f;
		a[d][f] = c
	};
	baidu.lang.Class.prototype.removeEventListener = function(c, b) {
		if (baidu.lang.isFunction(b)) {
			b = b.hashCode
		} else {
			if (!baidu.lang.isString(b)) {
				return
			}
		}
		!this.__listeners && (this.__listeners = {});
		c.indexOf("on") != 0 && (c = "on" + c);
		var a = this.__listeners;
		if (!a[c]) {
			return
		}
		a[c][b] && delete a[c][b]
	};
	baidu.lang.Class.prototype.dispatchEvent = function(d, a) {
		if (baidu.lang.isString(d)) {
			d = new baidu.lang.Event(d)
		}
		!this.__listeners && (this.__listeners = {});
		a = a || {};
		for ( var c in a) {
			d[c] = a[c]
		}
		var c, b = this.__listeners, f = d.type;
		d.target = d.target || this;
		d.currentTarget = this;
		f.indexOf("on") != 0 && (f = "on" + f);
		baidu.lang.isFunction(this[f]) && this[f].apply(this, arguments);
		if (typeof b[f] == "object") {
			for (c in b[f]) {
				b[f][c].apply(this, arguments)
			}
		}
		return d.returnValue
	};
	baidu.lang.isObject = function(a) {
		return "function" == typeof a || !!(a && "object" == typeof a)
	};
	baidu.isObject = baidu.lang.isObject;
	baidu.event = baidu.event || {};
	baidu.event.getPageX = function(b) {
		var a = b.pageX, c = document;
		if (!a && a !== 0) {
			a = (b.clientX || 0)
					+ (c.documentElement.scrollLeft || c.body.scrollLeft)
		}
		return a
	};
	baidu.event.getPageY = function(b) {
		var a = b.pageY, c = document;
		if (!a && a !== 0) {
			a = (b.clientY || 0)
					+ (c.documentElement.scrollTop || c.body.scrollTop)
		}
		return a
	};
	baidu.event.stopPropagation = function(a) {
		if (a.stopPropagation) {
			a.stopPropagation()
		} else {
			a.cancelBubble = true
		}
	};
	baidu.event.preventDefault = function(a) {
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			a.returnValue = false
		}
	};
	baidu.event.stop = function(a) {
		var b = baidu.event;
		b.stopPropagation(a);
		b.preventDefault(a)
	};
	baidu.event.getTarget = function(a) {
		return a.target || a.srcElement
	};
	baidu.event.EventArg = function(c, f) {
		f = f || window;
		c = c || f.event;
		var d = f.document;
		this.target = (c.target) || c.srcElement;
		this.keyCode = c.which || c.keyCode;
		for ( var a in c) {
			var b = c[a];
			if ("function" != typeof b) {
				this[a] = b
			}
		}
		if (!this.pageX && this.pageX !== 0) {
			this.pageX = (c.clientX || 0)
					+ (d.documentElement.scrollLeft || d.body.scrollLeft);
			this.pageY = (c.clientY || 0)
					+ (d.documentElement.scrollTop || d.body.scrollTop)
		}
		this._event = c
	};
	baidu.event.EventArg.prototype.preventDefault = function() {
		if (this._event.preventDefault) {
			this._event.preventDefault()
		} else {
			this._event.returnValue = false
		}
		return this
	};
	baidu.event.EventArg.prototype.stopPropagation = function() {
		if (this._event.stopPropagation) {
			this._event.stopPropagation()
		} else {
			this._event.cancelBubble = true
		}
		return this
	};
	baidu.event.EventArg.prototype.stop = function() {
		return this.stopPropagation().preventDefault()
	};
	baidu.event._listeners = baidu.event._listeners || [];
	baidu.event.on = function(b, f, h) {
		f = f.replace(/^on/i, "");
		b = baidu.dom._g(b);
		var g = function(j) {
			h.call(b, j)
		}, a = baidu.event._listeners, d = baidu.event._eventFilter, i, c = f;
		f = f.toLowerCase();
		if (d && d[f]) {
			i = d[f](b, f, g);
			c = i.type;
			g = i.listener
		}
		if (b.addEventListener) {
			b.addEventListener(c, g, false)
		} else {
			if (b.attachEvent) {
				b.attachEvent("on" + c, g)
			}
		}
		a[a.length] = [ b, f, h, g, c ];
		return b
	};
	baidu.on = baidu.event.on;
	baidu.event.get = function(a, b) {
		return new baidu.event.EventArg(a, b)
	};
	baidu.event.un = function(c, g, b) {
		c = baidu.dom._g(c);
		g = g.replace(/^on/i, "").toLowerCase();
		var j = baidu.event._listeners, d = j.length, f = !b, i, h, a;
		while (d--) {
			i = j[d];
			if (i[1] === g && i[0] === c && (f || i[2] === b)) {
				h = i[4];
				a = i[3];
				if (c.removeEventListener) {
					c.removeEventListener(h, a, false)
				} else {
					if (c.detachEvent) {
						c.detachEvent("on" + h, a)
					}
				}
				j.splice(d, 1)
			}
		}
		return c
	};
	baidu.un = baidu.event.un;
	baidu.event.getKeyCode = function(a) {
		return a.which || a.keyCode
	};
	baidu.ajax = baidu.ajax || {};
	baidu.fn = baidu.fn || {};
	baidu.fn.blank = function() {
	};
	baidu.ajax.request = function(d, p) {
		p = p || {};
		var j = p.data || "", h = !(p.async === false), i = p.username || "", n = p.password
				|| "", a = (p.method || "GET").toUpperCase(), g = p.headers
				|| {}, c = {}, m, o;
		function k() {
			if (o.readyState == 4) {
				try {
					var r = o.status
				} catch (q) {
					f("failure");
					return
				}
				f(r);
				if ((r >= 200 && r < 300) || r == 304 || r == 1223) {
					f("success")
				} else {
					f("failure")
				}
				window.setTimeout(function() {
					o.onreadystatechange = baidu.fn.blank;
					if (h) {
						o = null
					}
				}, 0)
			}
		}
		function b() {
			if (window.ActiveXObject) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP")
				} catch (q) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP")
					} catch (q) {
					}
				}
			}
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest()
			}
		}
		function f(r) {
			r = "on" + r;
			var q = c[r], s = baidu.ajax[r];
			if (q) {
				if (r != "onsuccess") {
					q(o)
				} else {
					q(o, o.responseText)
				}
			} else {
				if (s) {
					if (r == "onsuccess") {
						return
					}
					s(o)
				}
			}
		}
		for (m in p) {
			c[m] = p[m]
		}
		g["X-Request-With"] = "XMLHttpRequest";
		try {
			o = b();
			if (a == "GET") {
				if (j) {
					d += (d.indexOf("?") >= 0 ? "&" : "?") + j;
					j = null
				}
				if (p.noCache) {
					d += "&b" + (new Date()).getTime() + "=1"
				}
			}
			if (i) {
				o.open(a, d, h, i, n)
			} else {
				o.open(a, d, h)
			}
			if (h) {
				o.onreadystatechange = k
			}
			if (a == "POST") {
				o.setRequestHeader("Content-Type",
						"application/x-www-form-urlencoded")
			}
			for (m in g) {
				if (g.hasOwnProperty(m)) {
					o.setRequestHeader(m, g[m])
				}
			}
			f("beforerequest");
			o.send(j);
			if (!h) {
				k()
			}
		} catch (l) {
			f("failure")
		}
		return o
	};
	baidu.ajax.post = function(b, c, a) {
		return baidu.ajax.request(b, {
			onsuccess : a,
			method : "POST",
			data : c
		})
	};
	baidu.ajax.get = function(b, a) {
		return baidu.ajax.request(b, {
			onsuccess : a
		})
	};
	baidu.ajax.form = function(a, c) {
		c = c || {};
		var g = a.elements, o = g.length, b = a.getAttribute("method"), f = a
				.getAttribute("action"), u = c.replacer || function(v, i) {
			return v
		}, r = {}, t = [], m, q, s, n, d, h, j, l, k;
		function p(i, v) {
			t.push(i + "=" + v)
		}
		for (m in c) {
			if (c.hasOwnProperty(m)) {
				r[m] = c[m]
			}
		}
		for (m = 0; m < o; m++) {
			q = g[m];
			n = q.name;
			if (!q.disabled && n) {
				s = q.type;
				d = q.value;
				switch (s) {
				case "radio":
				case "checkbox":
					if (!q.checked) {
						break
					}
				case "textarea":
				case "text":
				case "password":
				case "hidden":
				case "select-one":
					p(n, u(d, n));
					break;
				case "select-multiple":
					h = q.options;
					l = h.length;
					for (j = 0; j < l; j++) {
						k = h[j];
						if (k.selected) {
							p(n, u(k.value, n))
						}
					}
					break
				}
			}
		}
		r.data = t.join("&");
		r.method = a.getAttribute("method") || "POST";
		return baidu.ajax.request(f, r)
	};
	baidu.sio = baidu.sio || {};
	baidu.sio._removeScriptTag = function(b) {
		if (b.clearAttributes) {
			b.clearAttributes()
		} else {
			for ( var a in b) {
				if (b.hasOwnProperty(a)) {
					delete b[a]
				}
			}
		}
		if (b && b.parentNode) {
			b.parentNode.removeChild(b)
		}
		b = null
	};
	baidu.sio.callByBrowser = function(d, b, f) {
		var g = document.createElement("SCRIPT"), a = 0, c = f || {}, i = c.charset, h = b
				|| function() {
				};
		g.onload = g.onreadystatechange = function() {
			if (a) {
				return
			}
			var j = g.readyState;
			if ("undefined" == typeof j || j == "loaded" || j == "complete") {
				a = 1;
				try {
					h()
				} finally {
					baidu.sio._removeScriptTag(g)
				}
			}
		};
		g.setAttribute("type", "text/javascript");
		i && g.setAttribute("charset", i);
		g.setAttribute("src", d);
		document.getElementsByTagName("head")[0].appendChild(g)
	};
	baidu.sio.callByServer = function(a, i, j) {
		var g = document.createElement("SCRIPT"), f = "bd__cbs__", h, c, k = j
				|| {}, b = k.charset, d = k.queryField || "callback";
		if (baidu.lang.isFunction(i)) {
			h = f + Math.floor(Math.random() * 2147483648).toString(36);
			window[h] = function() {
				try {
					i.apply(window, arguments);
					window[h] = null;
					delete window[h]
				} catch (l) {
				} finally {
					baidu.sio._removeScriptTag(g)
				}
			}
		} else {
			h = i
		}
		a = a.replace((new RegExp("(\\?|&)callback=[^&]*")), "\x241" + d + "="
				+ h);
		if (a.search(new RegExp("(\\?|&)" + d + "=/")) < 0) {
			a += (a.indexOf("?") < 0 ? "?" : "&") + d + "=" + h
		}
		g.setAttribute("type", "text/javascript");
		b && g.setAttribute("charset", b);
		g.setAttribute("src", a);
		document.getElementsByTagName("head")[0].appendChild(g)
	};
	baidu.swf = baidu.swf || {};
	baidu.swf.version = (function() {
		var h = navigator;
		if (h.plugins && h.mimeTypes.length) {
			var d = h.plugins["Shockwave Flash"];
			if (d && d.description) {
				return d.description.replace(/([a-zA-Z]|\s)+/, "").replace(
						/(\s)+r/, ".")
						+ ".0"
			}
		} else {
			if (window.ActiveXObject && !window.opera) {
				for ( var b = 10; b >= 2; b--) {
					try {
						var g = new ActiveXObject(
								"ShockwaveFlash.ShockwaveFlash." + b);
						if (g) {
							var a = g.GetVariable("$version");
							return a.replace(/WIN/g, "").replace(/,/g, ".")
						}
					} catch (f) {
					}
				}
			}
		}
	})();
	baidu.string.encodeHTML = function(a) {
		return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
				/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	};
	baidu.encodeHTML = baidu.string.encodeHTML;
	baidu.swf.createHTML = function(t) {
		t = t || {};
		var l = baidu.swf.version, h = t.ver || "6.0.0", g, d, f, c, j, s, a = {}, p = baidu.string.encodeHTML;
		for (c in t) {
			a[c] = t[c]
		}
		t = a;
		if (l) {
			l = l.split(".");
			h = h.split(".");
			for (f = 0; f < 3; f++) {
				g = parseInt(l[f], 10);
				d = parseInt(h[f], 10);
				if (d < g) {
					break
				} else {
					if (d > g) {
						return ""
					}
				}
			}
		} else {
			return ""
		}
		var n = t.vars, m = [ "classid", "codebase", "id", "width", "height",
				"align" ];
		t.align = t.align || "middle";
		t.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
		t.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
		t.movie = t.url || "";
		delete t.vars;
		delete t.url;
		if ("string" == typeof n) {
			t.flashvars = n
		} else {
			var q = [];
			for (c in n) {
				s = n[c];
				if (s) {
					q.push(c + "=" + encodeURIComponent(s))
				}
			}
			t.flashvars = q.join("&")
		}
		var o = [ "<object " ];
		for (f = 0, j = m.length; f < j; f++) {
			s = m[f];
			o.push(" ", s, '="', p(t[s]), '"')
		}
		o.push(">");
		var b = {
			wmode : 1,
			scale : 1,
			quality : 1,
			play : 1,
			loop : 1,
			menu : 1,
			salign : 1,
			bgcolor : 1,
			base : 1,
			allowscriptaccess : 1,
			allownetworking : 1,
			allowfullscreen : 1,
			seamlesstabbing : 1,
			devicefont : 1,
			swliveconnect : 1,
			flashvars : 1,
			movie : 1
		};
		for (c in t) {
			s = t[c];
			c = c.toLowerCase();
			if (b[c] && s) {
				o.push('<param name="' + c + '" value="' + p(s) + '" />')
			}
		}
		t.src = t.movie;
		t.name = t.id;
		delete t.id;
		delete t.movie;
		delete t.classid;
		delete t.codebase;
		t.type = "application/x-shockwave-flash";
		t.pluginspage = "http://www.macromedia.com/go/getflashplayer";
		o.push("<embed");
		var r;
		for (c in t) {
			s = t[c];
			if (s) {
				if ((new RegExp("^salign\x24", "i")).test(c)) {
					r = s;
					continue
				}
				o.push(" ", c, '="', p(s), '"')
			}
		}
		if (r) {
			o.push(' salign="', p(r), '"')
		}
		o.push("></embed></object>");
		return o.join("")
	};
	baidu.array = baidu.array || {};
	baidu.array.remove = function(c, d) {
		var a = c.length, b = d;
		if ("function" != typeof d) {
			b = function(f) {
				return d === f
			}
		}
		while (a--) {
			if (true === b.call(c, c[a], a)) {
				c.splice(a, 1)
			}
		}
		return c
	};
	baidu.lang.toArray = function(b) {
		if (b === null || b === undefined) {
			return []
		}
		if (baidu.lang.isArray(b)) {
			return b
		}
		if (typeof b.length !== "number" || typeof b === "string"
				|| baidu.lang.isFunction(b)) {
			return [ b ]
		}
		if (b.item) {
			var a = b.length, c = new Array(a);
			while (a--) {
				c[a] = b[a]
			}
			return c
		}
		return [].slice.call(b)
	};
	baidu.swf.getMovie = function(c) {
		var a = document[c], b;
		return baidu.browser.ie == 9 ? a && a.length ? (b = baidu.array.remove(
				baidu.lang.toArray(a), function(d) {
					return d.tagName.toLowerCase() != "embed"
				})).length == 1 ? b[0] : b : a : a || window[c]
	};
	baidu.swf.create = function(a, c) {
		a = a || {};
		var b = baidu.swf.createHTML(a) || a.errorMessage || "";
		if (c && "string" == typeof c) {
			c = document.getElementById(c)
		}
		if (c) {
			c.innerHTML = b
		} else {
			document.write(b)
		}
	};
	baidu.extend = baidu.object.extend = function(c, a) {
		for ( var b in a) {
			if (a.hasOwnProperty(b)) {
				c[b] = a[b]
			}
		}
		return c
	};
	baidu.object.keys = function(d) {
		var a = [], c = 0, b;
		for (b in d) {
			if (d.hasOwnProperty(b)) {
				a[c++] = b
			}
		}
		return a
	};
	baidu.object.values = function(d) {
		var a = [], c = 0, b;
		for (b in d) {
			if (d.hasOwnProperty(b)) {
				a[c++] = d[b]
			}
		}
		return a
	};
	baidu.object.clone = (function(a) {
		return function(g) {
			var c = g, d, b;
			if (!g || g instanceof Number || g instanceof String
					|| g instanceof Boolean) {
				return c
			} else {
				if (baidu.lang.isArray(g)) {
					c = [];
					var f = 0;
					for (d = 0, b = g.length; d < b; d++) {
						c[f++] = baidu.object.clone(g[d])
					}
				} else {
					if (baidu.lang.isObject(g)) {
						if (a[Object.prototype.toString.call(g)]) {
							return c
						}
						c = {};
						for (d in g) {
							if (g.hasOwnProperty(d)) {
								c[d] = baidu.object.clone(g[d])
							}
						}
					}
				}
			}
			return c
		}
	})({
		"[object Function]" : 1,
		"[object RegExp]" : 1,
		"[object Date]" : 1,
		"[object Error]" : 1
	});
	baidu.string.getByteLength = function(a) {
		return String(a).replace(/[^\x00-\xff]/g, "ci").length
	};
	baidu.string.decodeHTML = function(a) {
		var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">").replace(/&amp;/g, "&");
		return b.replace(/&#([\d]+);/g, function(d, c) {
			return String.fromCharCode(parseInt(c, 10))
		})
	};
	baidu.decodeHTML = baidu.string.decodeHTML;
	baidu.string.format = function(c, a) {
		c = String(c);
		var b = Array.prototype.slice.call(arguments, 1), d = Object.prototype.toString;
		if (b.length) {
			b = b.length == 1 ? (a !== null
					&& (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a
					: b)
					: b;
			return c.replace(/#\{(.+?)\}/g, function(f, h) {
				var g = b[h];
				if ("[object Function]" == d.call(g)) {
					g = g(h)
				}
				return ("undefined" == typeof g ? "" : g)
			})
		}
		return c
	};
	baidu.format = baidu.string.format;
	baidu.string.wbr = function(a) {
		return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi,
				"$&<wbr>").replace(/><wbr>/g, ">")
	};
	baidu.string.subByte = function(b, a) {
		b = String(b);
		if (a < 0 || baidu.string.getByteLength(b) <= a) {
			return b
		}
		b = b.substr(0, a).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, a)
				.replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g,
						"\x241");
		return b
	};
	baidu.string.toHalfWidth = function(a) {
		return String(a).replace(/[\uFF01-\uFF5E]/g, function(b) {
			return String.fromCharCode(b.charCodeAt(0) - 65248)
		}).replace(/\u3000/g, " ")
	};
	baidu.page = baidu.page || {};
	baidu.page.getHeight = function() {
		var d = document, a = d.body, c = d.documentElement, b = d.compatMode == "BackCompat" ? a
				: d.documentElement;
		return Math.max(c.scrollHeight, a.scrollHeight, b.clientHeight)
	};
	baidu.page.loadCssFile = function(b) {
		var a = document.createElement("link");
		a.setAttribute("rel", "stylesheet");
		a.setAttribute("type", "text/css");
		a.setAttribute("href", b);
		document.getElementsByTagName("head")[0].appendChild(a)
	};
	baidu.page.getScrollLeft = function() {
		var a = document;
		return window.pageXOffset || a.documentElement.scrollLeft
				|| a.body.scrollLeft
	};
	baidu.page.getViewWidth = function() {
		var b = document, a = b.compatMode == "BackCompat" ? b.body
				: b.documentElement;
		return a.clientWidth
	};
	baidu.page.loadJsFile = function(b) {
		var a = document.createElement("script");
		a.setAttribute("type", "text/javascript");
		a.setAttribute("src", b);
		a.setAttribute("defer", "defer");
		document.getElementsByTagName("head")[0].appendChild(a)
	};
	baidu.page.getWidth = function() {
		var d = document, a = d.body, c = d.documentElement, b = d.compatMode == "BackCompat" ? a
				: d.documentElement;
		return Math.max(c.scrollWidth, a.scrollWidth, b.clientWidth)
	};
	baidu.page.getScrollTop = function() {
		var a = document;
		return window.pageYOffset || a.documentElement.scrollTop
				|| a.body.scrollTop
	};
	baidu.page.getViewHeight = function() {
		var b = document, a = b.compatMode == "BackCompat" ? b.body
				: b.documentElement;
		return a.clientHeight
	};
	baidu.array.filter = function(h, f) {
		var c = [], b = 0, a = h.length, g, d;
		if ("function" == typeof f) {
			for (d = 0; d < a; d++) {
				g = h[d];
				if (true === f.call(h, g, d)) {
					c[b++] = g
				}
			}
		}
		return c
	};
	baidu.array.unique = function(f, g) {
		var b = f.length, a = f.slice(0), d, c;
		if ("function" != typeof g) {
			g = function(i, h) {
				return i === h
			}
		}
		while (--b > 0) {
			c = a[b];
			d = b;
			while (d--) {
				if (g(c, a[d])) {
					a.splice(b, 1);
					break
				}
			}
		}
		return a
	};
	baidu.array.indexOf = function(d, f, b) {
		var a = d.length, c = f;
		b = Number(b) || 0;
		b = b < 0 ? Math.ceil(b) : Math.floor(b);
		b = Math.min(Math.max(b, 0), a);
		if ("function" != typeof f) {
			c = function(g) {
				return f === g
			}
		}
		for (; b < a; b++) {
			if (true === c.call(d, d[b], b)) {
				return b
			}
		}
		return -1
	};
	baidu.array.each = function(g, d) {
		var c, f, b, a = g.length;
		if ("function" == typeof d) {
			for (b = 0; b < a; b++) {
				f = g[b];
				c = d.call(g, f, b);
				if (c === false) {
					break
				}
			}
		}
		return g
	};
	baidu.each = baidu.array.each;
	baidu.array.find = function(f, c) {
		var d, b, a = f.length;
		if ("function" == typeof c) {
			for (b = 0; b < a; b++) {
				d = f[b];
				if (true === c.call(f, d, b)) {
					return d
				}
			}
		}
		return null
	};
	baidu.array.lastIndexOf = function(c, d) {
		var a = c.length, b = d;
		if ("function" != typeof d) {
			b = function(f) {
				return d === f
			}
		}
		while (a--) {
			if (true === b.call(c, c[a], a)) {
				return a
			}
		}
		return -1
	};
	baidu.array.removeAt = function(b, a) {
		return b.splice(a, 1)[0]
	};
	baidu.lang.createClass = function(g, b) {
		b = b || {};
		var f = b.superClass || baidu.lang.Class;
		var d = function() {
			if (f != baidu.lang.Class) {
				f.apply(this, arguments)
			} else {
				f.call(this)
			}
			g.apply(this, arguments)
		};
		d.options = b.options || {};
		var j = function() {
		}, h = g.prototype;
		j.prototype = f.prototype;
		var a = d.prototype = new j();
		for ( var c in h) {
			a[c] = h[c]
		}
		typeof b.className == "string" && (a._className = b.className);
		a.constructor = h.constructor;
		d.extend = function(l) {
			for ( var k in l) {
				d.prototype[k] = l[k]
			}
			return d
		};
		return d
	};
	baidu.lang.createSingle = function(b) {
		var d = new baidu.lang.Class();
		for ( var a in b) {
			d[a] = b[a]
		}
		return d
	};
	baidu.string.filterFormat = function(c, a) {
		var b = Array.prototype.slice.call(arguments, 1), d = Object.prototype.toString;
		if (b.length) {
			b = b.length == 1 ? (a !== null
					&& (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a
					: b)
					: b;
			return c.replace(/#\{(.+?)\}/g, function(g, k) {
				var m, j, h, f, l;
				if (!b) {
					return ""
				}
				m = k.split("|");
				j = b[m[0]];
				if ("[object Function]" == d.call(j)) {
					j = j(m[0])
				}
				for (h = 1, f = m.length; h < f; ++h) {
					l = baidu.string.filterFormat[m[h]];
					if ("[object Function]" == d.call(l)) {
						j = l(j)
					}
				}
				return (("undefined" == typeof j || j === null) ? "" : j)
			})
		}
		return c
	};
	baidu.string.filterFormat.escapeJs = function(f) {
		if (!f || "string" != typeof f) {
			return f
		}
		var d, a, b, c = [];
		for (d = 0, a = f.length; d < a; ++d) {
			b = f.charCodeAt(d);
			if (b > 255) {
				c.push(f.charAt(d))
			} else {
				c.push("\\x" + b.toString(16))
			}
		}
		return c.join("")
	};
	baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;
	baidu.string.filterFormat.escapeString = function(a) {
		if (!a || "string" != typeof a) {
			return a
		}
		return a.replace(/["'<>\\\/`]/g, function(b) {
			return "&#" + b.charCodeAt(0) + ";"
		})
	};
	baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;
	baidu.string.filterFormat.toInt = function(a) {
		return parseInt(a, 10) || 0
	};
	baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;
	(function() {
		baidu.page.getMousePosition = function() {
			return {
				x : baidu.page.getScrollLeft() + a.x,
				y : baidu.page.getScrollTop() + a.y
			}
		};
		var a = {
			x : 0,
			y : 0
		};
		baidu.event.on(document, "onmousemove", function(b) {
			b = window.event || b;
			a.x = b.clientX;
			a.y = b.clientY
		})
	})();
	(function() {
		var l, k, g, d, o, h, p, a, n, f = baidu.lang.isFunction, c;
		baidu.dom.drag = function(r, q) {
			n = a = null;
			if (!(l = baidu.dom.g(r))) {
				return false
			}
			k = baidu.object.extend({
				autoStop : true,
				capture : true,
				interval : 20
			}, q);
			o = parseInt(baidu.dom.getStyle(l, "top")) || 0;
			h = parseInt(baidu.dom.getStyle(l, "left")) || 0;
			if (k.mouseEvent) {
				g = baidu.page.getScrollLeft() + k.mouseEvent.clientX;
				d = baidu.page.getScrollTop() + k.mouseEvent.clientY
			} else {
				var s = baidu.page.getMousePosition();
				g = s.x;
				d = s.y
			}
			c = setInterval(b, k.interval);
			k.autoStop && baidu.event.on(document, "mouseup", m);
			baidu.event.on(document.body, "selectstart", i);
			if (k.capture && l.setCapture) {
				l.setCapture()
			} else {
				if (k.capture && window.captureEvents) {
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
				}
			}
			p = document.body.style.MozUserSelect;
			document.body.style.MozUserSelect = "none";
			if (f(k.ondragstart)) {
				k.ondragstart(l, k)
			}
			return {
				stop : m,
				update : j
			}
		};
		function j(q) {
			baidu.extend(k, q)
		}
		function m() {
			clearTimeout(c);
			if (k.capture && l.releaseCapture) {
				l.releaseCapture()
			} else {
				if (k.capture && window.releaseEvents) {
					window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
				}
			}
			document.body.style.MozUserSelect = p;
			baidu.event.un(document.body, "selectstart", i);
			k.autoStop && baidu.event.un(document, "mouseup", m);
			if (f(k.ondragend)) {
				k.ondragend(l, k)
			}
		}
		function b(u) {
			var q = k.range, t = baidu.page.getMousePosition(), r = h + t.x - g, s = o
					+ t.y - d;
			if (typeof q == "object" && q && q.length == 4) {
				r = Math.max(q[3], r);
				r = Math.min(q[1] - l.offsetWidth, r);
				s = Math.max(q[0], s);
				s = Math.min(q[2] - l.offsetHeight, s)
			}
			l.style.top = s + "px";
			l.style.left = r + "px";
			if ((a !== r || n !== s) && (a !== null || n !== null)) {
				if (f(k.ondrag)) {
					k.ondrag(l, k)
				}
			}
			a = r;
			n = s
		}
		function i(q) {
			return baidu.event.preventDefault(q, false)
		}
	})();
	baidu.dom.draggable = function(b, l) {
		l = baidu.object.extend({
			toggle : function() {
				return true
			}
		}, l || {});
		l.autoStop = true;
		b = baidu.dom.g(b);
		l.handler = l.handler || b;
		var a, j = [ "ondragstart", "ondrag", "ondragend" ], c = j.length - 1, d, k, g = {
			dispose : function() {
				k && k.stop();
				baidu.event.un(l.handler, "onmousedown", h);
				baidu.lang.Class.prototype.dispose.call(g)
			}
		}, f = this;
		if (a = baidu.dom.ddManager) {
			for (; c >= 0; c--) {
				d = j[c];
				l[d] = (function(i) {
					var m = l[i];
					return function() {
						baidu.lang.isFunction(m) && m.apply(f, arguments);
						a.dispatchEvent(i, {
							DOM : b
						})
					}
				})(d)
			}
		}
		if (b) {
			function h(m) {
				var i = l.mouseEvent = window.event || m;
				if (i.button > 1
						|| (baidu.lang.isFunction(l.toggle) && !l.toggle())) {
					return
				}
				if (baidu.dom.getStyle(b, "position") == "static") {
					baidu.dom.setStyle(b, "position", "relative")
				}
				if (baidu.lang.isFunction(l.onbeforedragstart)) {
					l.onbeforedragstart(b)
				}
				k = baidu.dom.drag(b, l);
				g.stop = k.stop;
				g.update = k.update;
				baidu.event.preventDefault(i)
			}
			baidu.event.on(l.handler, "onmousedown", h)
		}
		return {
			cancel : function() {
				g.dispose()
			}
		}
	};
	(function() {
		var q = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, j = 0, d = Object.prototype.toString, p = false, i = true;
		[ 0, 0 ].sort(function() {
			i = false;
			return 0
		});
		var b = function(x, s, A, B) {
			A = A || [];
			s = s || document;
			var D = s;
			if (s.nodeType !== 1 && s.nodeType !== 9) {
				return []
			}
			if (!x || typeof x !== "string") {
				return A
			}
			var u, F, I, t, E, H, G, z, w = true, v = b.isXML(s), y = [], C = x;
			do {
				q.exec("");
				u = q.exec(C);
				if (u) {
					C = u[3];
					y.push(u[1]);
					if (u[2]) {
						t = u[3];
						break
					}
				}
			} while (u);
			if (y.length > 1 && k.exec(x)) {
				if (y.length === 2 && f.relative[y[0]]) {
					F = h(y[0] + y[1], s)
				} else {
					F = f.relative[y[0]] ? [ s ] : b(y.shift(), s);
					while (y.length) {
						x = y.shift();
						if (f.relative[x]) {
							x += y.shift()
						}
						F = h(x, F)
					}
				}
			} else {
				if (!B && y.length > 1 && s.nodeType === 9 && !v
						&& f.match.ID.test(y[0])
						&& !f.match.ID.test(y[y.length - 1])) {
					E = b.find(y.shift(), s, v);
					s = E.expr ? b.filter(E.expr, E.set)[0] : E.set[0]
				}
				if (s) {
					E = B ? {
						expr : y.pop(),
						set : a(B)
					} : b.find(y.pop(),
							y.length === 1 && (y[0] === "~" || y[0] === "+")
									&& s.parentNode ? s.parentNode : s, v);
					F = E.expr ? b.filter(E.expr, E.set) : E.set;
					if (y.length > 0) {
						I = a(F)
					} else {
						w = false
					}
					while (y.length) {
						H = y.pop();
						G = H;
						if (!f.relative[H]) {
							H = ""
						} else {
							G = y.pop()
						}
						if (G == null) {
							G = s
						}
						f.relative[H](I, G, v)
					}
				} else {
					I = y = []
				}
			}
			if (!I) {
				I = F
			}
			if (!I) {
				b.error(H || x)
			}
			if (d.call(I) === "[object Array]") {
				if (!w) {
					A.push.apply(A, I)
				} else {
					if (s && s.nodeType === 1) {
						for (z = 0; I[z] != null; z++) {
							if (I[z]
									&& (I[z] === true || I[z].nodeType === 1
											&& b.contains(s, I[z]))) {
								A.push(F[z])
							}
						}
					} else {
						for (z = 0; I[z] != null; z++) {
							if (I[z] && I[z].nodeType === 1) {
								A.push(F[z])
							}
						}
					}
				}
			} else {
				a(I, A)
			}
			if (t) {
				b(t, D, A, B);
				b.uniqueSort(A)
			}
			return A
		};
		b.uniqueSort = function(t) {
			if (c) {
				p = i;
				t.sort(c);
				if (p) {
					for ( var s = 1; s < t.length; s++) {
						if (t[s] === t[s - 1]) {
							t.splice(s--, 1)
						}
					}
				}
			}
			return t
		};
		b.matches = function(s, t) {
			return b(s, null, null, t)
		};
		b.matchesSelector = function(s, t) {
			return b(t, null, null, [ s ]).length > 0
		};
		b.find = function(z, s, A) {
			var y;
			if (!z) {
				return []
			}
			for ( var v = 0, u = f.order.length; v < u; v++) {
				var w, x = f.order[v];
				if ((w = f.leftMatch[x].exec(z))) {
					var t = w[1];
					w.splice(1, 1);
					if (t.substr(t.length - 1) !== "\\") {
						w[1] = (w[1] || "").replace(/\\/g, "");
						y = f.find[x](w, s, A);
						if (y != null) {
							z = z.replace(f.match[x], "");
							break
						}
					}
				}
			}
			if (!y) {
				y = s.getElementsByTagName("*")
			}
			return {
				set : y,
				expr : z
			}
		};
		b.filter = function(D, C, G, w) {
			var y, s, u = D, I = [], A = C, z = C && C[0] && b.isXML(C[0]);
			while (D && C.length) {
				for ( var B in f.filter) {
					if ((y = f.leftMatch[B].exec(D)) != null && y[2]) {
						var H, F, t = f.filter[B], v = y[1];
						s = false;
						y.splice(1, 1);
						if (v.substr(v.length - 1) === "\\") {
							continue
						}
						if (A === I) {
							I = []
						}
						if (f.preFilter[B]) {
							y = f.preFilter[B](y, A, G, I, w, z);
							if (!y) {
								s = H = true
							} else {
								if (y === true) {
									continue
								}
							}
						}
						if (y) {
							for ( var x = 0; (F = A[x]) != null; x++) {
								if (F) {
									H = t(F, y, x, A);
									var E = w ^ !!H;
									if (G && H != null) {
										if (E) {
											s = true
										} else {
											A[x] = false
										}
									} else {
										if (E) {
											I.push(F);
											s = true
										}
									}
								}
							}
						}
						if (H !== undefined) {
							if (!G) {
								A = I
							}
							D = D.replace(f.match[B], "");
							if (!s) {
								return []
							}
							break
						}
					}
				}
				if (D === u) {
					if (s == null) {
						b.error(D)
					} else {
						break
					}
				}
				u = D
			}
			return A
		};
		b.error = function(s) {
			throw "Syntax error, unrecognized expression: " + s
		};
		var f = b.selectors = {
			order : [ "ID", "NAME", "TAG" ],
			match : {
				ID : /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				CLASS : /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
				ATTR : /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG : /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
				CHILD : /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
				POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
				PSEUDO : /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch : {},
			attrMap : {
				"class" : "className",
				"for" : "htmlFor"
			},
			attrHandle : {
				href : function(s) {
					return s.getAttribute("href")
				}
			},
			relative : {
				"+" : function(y, t) {
					var v = typeof t === "string", x = v && !/\W/.test(t), z = v
							&& !x;
					if (x) {
						t = t.toLowerCase()
					}
					for ( var u = 0, s = y.length, w; u < s; u++) {
						if ((w = y[u])) {
							while ((w = w.previousSibling) && w.nodeType !== 1) {
							}
							y[u] = z || w && w.nodeName.toLowerCase() === t ? w || false
									: w === t
						}
					}
					if (z) {
						b.filter(t, y, true)
					}
				},
				">" : function(y, t) {
					var x, w = typeof t === "string", u = 0, s = y.length;
					if (w && !/\W/.test(t)) {
						t = t.toLowerCase();
						for (; u < s; u++) {
							x = y[u];
							if (x) {
								var v = x.parentNode;
								y[u] = v.nodeName.toLowerCase() === t ? v
										: false
							}
						}
					} else {
						for (; u < s; u++) {
							x = y[u];
							if (x) {
								y[u] = w ? x.parentNode : x.parentNode === t
							}
						}
						if (w) {
							b.filter(t, y, true)
						}
					}
				},
				"" : function(v, t, x) {
					var w, u = j++, s = r;
					if (typeof t === "string" && !/\W/.test(t)) {
						t = t.toLowerCase();
						w = t;
						s = o
					}
					s("parentNode", t, u, v, w, x)
				},
				"~" : function(v, t, x) {
					var w, u = j++, s = r;
					if (typeof t === "string" && !/\W/.test(t)) {
						t = t.toLowerCase();
						w = t;
						s = o
					}
					s("previousSibling", t, u, v, w, x)
				}
			},
			find : {
				ID : function(t, u, v) {
					if (typeof u.getElementById !== "undefined" && !v) {
						var s = u.getElementById(t[1]);
						return s && s.parentNode ? [ s ] : []
					}
				},
				NAME : function(u, x) {
					if (typeof x.getElementsByName !== "undefined") {
						var t = [], w = x.getElementsByName(u[1]);
						for ( var v = 0, s = w.length; v < s; v++) {
							if (w[v].getAttribute("name") === u[1]) {
								t.push(w[v])
							}
						}
						return t.length === 0 ? null : t
					}
				},
				TAG : function(s, t) {
					return t.getElementsByTagName(s[1])
				}
			},
			preFilter : {
				CLASS : function(v, t, u, s, y, z) {
					v = " " + v[1].replace(/\\/g, "") + " ";
					if (z) {
						return v
					}
					for ( var w = 0, x; (x = t[w]) != null; w++) {
						if (x) {
							if (y
									^ (x.className && (" " + x.className + " ")
											.replace(/[\t\n\r]/g, " ").indexOf(
													v) >= 0)) {
								if (!u) {
									s.push(x)
								}
							} else {
								if (u) {
									t[w] = false
								}
							}
						}
					}
					return false
				},
				ID : function(s) {
					return s[1].replace(/\\/g, "")
				},
				TAG : function(t, s) {
					return t[1].toLowerCase()
				},
				CHILD : function(s) {
					if (s[1] === "nth") {
						if (!s[2]) {
							b.error(s[0])
						}
						s[2] = s[2].replace(/^\+|\s*/g, "");
						var t = /(-?)(\d*)(?:n([+\-]?\d*))?/
								.exec(s[2] === "even" && "2n" || s[2] === "odd"
										&& "2n+1" || !/\D/.test(s[2]) && "0n+"
										+ s[2] || s[2]);
						s[2] = (t[1] + (t[2] || 1)) - 0;
						s[3] = t[3] - 0
					} else {
						if (s[2]) {
							b.error(s[0])
						}
					}
					s[0] = j++;
					return s
				},
				ATTR : function(w, t, u, s, x, y) {
					var v = w[1].replace(/\\/g, "");
					if (!y && f.attrMap[v]) {
						w[1] = f.attrMap[v]
					}
					if (w[2] === "~=") {
						w[4] = " " + w[4] + " "
					}
					return w
				},
				PSEUDO : function(w, t, u, s, x) {
					if (w[1] === "not") {
						if ((q.exec(w[3]) || "").length > 1 || /^\w/.test(w[3])) {
							w[3] = b(w[3], null, null, t)
						} else {
							var v = b.filter(w[3], t, u, true ^ x);
							if (!u) {
								s.push.apply(s, v)
							}
							return false
						}
					} else {
						if (f.match.POS.test(w[0]) || f.match.CHILD.test(w[0])) {
							return true
						}
					}
					return w
				},
				POS : function(s) {
					s.unshift(true);
					return s
				}
			},
			filters : {
				enabled : function(s) {
					return s.disabled === false && s.type !== "hidden"
				},
				disabled : function(s) {
					return s.disabled === true
				},
				checked : function(s) {
					return s.checked === true
				},
				selected : function(s) {
					s.parentNode.selectedIndex;
					return s.selected === true
				},
				parent : function(s) {
					return !!s.firstChild
				},
				empty : function(s) {
					return !s.firstChild
				},
				has : function(u, t, s) {
					return !!b(s[3], u).length
				},
				header : function(s) {
					return (/h\d/i).test(s.nodeName)
				},
				text : function(s) {
					return "text" === s.type
				},
				radio : function(s) {
					return "radio" === s.type
				},
				checkbox : function(s) {
					return "checkbox" === s.type
				},
				file : function(s) {
					return "file" === s.type
				},
				password : function(s) {
					return "password" === s.type
				},
				submit : function(s) {
					return "submit" === s.type
				},
				image : function(s) {
					return "image" === s.type
				},
				reset : function(s) {
					return "reset" === s.type
				},
				button : function(s) {
					return "button" === s.type
							|| s.nodeName.toLowerCase() === "button"
				},
				input : function(s) {
					return (/input|select|textarea|button/i).test(s.nodeName)
				}
			},
			setFilters : {
				first : function(t, s) {
					return s === 0
				},
				last : function(u, t, s, v) {
					return t === v.length - 1
				},
				even : function(t, s) {
					return s % 2 === 0
				},
				odd : function(t, s) {
					return s % 2 === 1
				},
				lt : function(u, t, s) {
					return t < s[3] - 0
				},
				gt : function(u, t, s) {
					return t > s[3] - 0
				},
				nth : function(u, t, s) {
					return s[3] - 0 === t
				},
				eq : function(u, t, s) {
					return s[3] - 0 === t
				}
			},
			filter : {
				PSEUDO : function(u, z, y, A) {
					var s = z[1], t = f.filters[s];
					if (t) {
						return t(u, y, z, A)
					} else {
						if (s === "contains") {
							return (u.textContent || u.innerText
									|| b.getText([ u ]) || "").indexOf(z[3]) >= 0
						} else {
							if (s === "not") {
								var v = z[3];
								for ( var x = 0, w = v.length; x < w; x++) {
									if (v[x] === u) {
										return false
									}
								}
								return true
							} else {
								b.error(s)
							}
						}
					}
				},
				CHILD : function(s, v) {
					var y = v[1], t = s;
					switch (y) {
					case "only":
					case "first":
						while ((t = t.previousSibling)) {
							if (t.nodeType === 1) {
								return false
							}
						}
						if (y === "first") {
							return true
						}
						t = s;
					case "last":
						while ((t = t.nextSibling)) {
							if (t.nodeType === 1) {
								return false
							}
						}
						return true;
					case "nth":
						var u = v[2], B = v[3];
						if (u === 1 && B === 0) {
							return true
						}
						var x = v[0], A = s.parentNode;
						if (A && (A.sizcache !== x || !s.nodeIndex)) {
							var w = 0;
							for (t = A.firstChild; t; t = t.nextSibling) {
								if (t.nodeType === 1) {
									t.nodeIndex = ++w
								}
							}
							A.sizcache = x
						}
						var z = s.nodeIndex - B;
						if (u === 0) {
							return z === 0
						} else {
							return (z % u === 0 && z / u >= 0)
						}
					}
				},
				ID : function(t, s) {
					return t.nodeType === 1 && t.getAttribute("id") === s
				},
				TAG : function(t, s) {
					return (s === "*" && t.nodeType === 1)
							|| t.nodeName.toLowerCase() === s
				},
				CLASS : function(t, s) {
					return (" " + (t.className || t.getAttribute("class")) + " ")
							.indexOf(s) > -1
				},
				ATTR : function(x, v) {
					var u = v[1], s = f.attrHandle[u] ? f.attrHandle[u](x)
							: x[u] != null ? x[u] : x.getAttribute(u), y = s
							+ "", w = v[2], t = v[4];
					return s == null ? w === "!="
							: w === "=" ? y === t
									: w === "*=" ? y.indexOf(t) >= 0
											: w === "~=" ? (" " + y + " ")
													.indexOf(t) >= 0
													: !t ? y && s !== false
															: w === "!=" ? y !== t
																	: w === "^=" ? y
																			.indexOf(t) === 0
																			: w === "$=" ? y
																					.substr(y.length
																							- t.length) === t
																					: w === "|=" ? y === t
																							|| y
																									.substr(
																											0,
																											t.length + 1) === t
																									+ "-"
																							: false
				},
				POS : function(w, t, u, x) {
					var s = t[2], v = f.setFilters[s];
					if (v) {
						return v(w, u, t, x)
					}
				}
			}
		};
		var k = f.match.POS, g = function(t, s) {
			return "\\" + (s - 0 + 1)
		};
		for ( var n in f.match) {
			f.match[n] = new RegExp(f.match[n].source
					+ (/(?![^\[]*\])(?![^\(]*\))/.source));
			f.leftMatch[n] = new RegExp(/(^(?:.|\r|\n)*?)/.source
					+ f.match[n].source.replace(/\\(\d+)/g, g))
		}
		var a = function(t, s) {
			t = Array.prototype.slice.call(t, 0);
			if (s) {
				s.push.apply(s, t);
				return s
			}
			return t
		};
		try {
			Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
		} catch (l) {
			a = function(w, v) {
				var u = 0, t = v || [];
				if (d.call(w) === "[object Array]") {
					Array.prototype.push.apply(t, w)
				} else {
					if (typeof w.length === "number") {
						for ( var s = w.length; u < s; u++) {
							t.push(w[u])
						}
					} else {
						for (; w[u]; u++) {
							t.push(w[u])
						}
					}
				}
				return t
			}
		}
		var c, m;
		if (document.documentElement.compareDocumentPosition) {
			c = function(t, s) {
				if (t === s) {
					p = true;
					return 0
				}
				if (!t.compareDocumentPosition || !s.compareDocumentPosition) {
					return t.compareDocumentPosition ? -1 : 1
				}
				return t.compareDocumentPosition(s) & 4 ? -1 : 1
			}
		} else {
			c = function(A, z) {
				var x, t, u = [], s = [], w = A.parentNode, y = z.parentNode, B = w;
				if (A === z) {
					p = true;
					return 0
				} else {
					if (w === y) {
						return m(A, z)
					} else {
						if (!w) {
							return -1
						} else {
							if (!y) {
								return 1
							}
						}
					}
				}
				while (B) {
					u.unshift(B);
					B = B.parentNode
				}
				B = y;
				while (B) {
					s.unshift(B);
					B = B.parentNode
				}
				x = u.length;
				t = s.length;
				for ( var v = 0; v < x && v < t; v++) {
					if (u[v] !== s[v]) {
						return m(u[v], s[v])
					}
				}
				return v === x ? m(A, s[v], -1) : m(u[v], z, 1)
			};
			m = function(t, s, u) {
				if (t === s) {
					return u
				}
				var v = t.nextSibling;
				while (v) {
					if (v === s) {
						return -1
					}
					v = v.nextSibling
				}
				return 1
			}
		}
		b.getText = function(s) {
			var t = "", v;
			for ( var u = 0; s[u]; u++) {
				v = s[u];
				if (v.nodeType === 3 || v.nodeType === 4) {
					t += v.nodeValue
				} else {
					if (v.nodeType !== 8) {
						t += b.getText(v.childNodes)
					}
				}
			}
			return t
		};
		(function() {
			var t = document.createElement("div"), u = "script"
					+ (new Date()).getTime(), s = document.documentElement;
			t.innerHTML = "<a name='" + u + "'/>";
			s.insertBefore(t, s.firstChild);
			if (document.getElementById(u)) {
				f.find.ID = function(w, x, y) {
					if (typeof x.getElementById !== "undefined" && !y) {
						var v = x.getElementById(w[1]);
						return v ? v.id === w[1]
								|| typeof v.getAttributeNode !== "undefined"
								&& v.getAttributeNode("id").nodeValue === w[1] ? [ v ]
								: undefined
								: []
					}
				};
				f.filter.ID = function(x, v) {
					var w = typeof x.getAttributeNode !== "undefined"
							&& x.getAttributeNode("id");
					return x.nodeType === 1 && w && w.nodeValue === v
				}
			}
			s.removeChild(t);
			s = t = null
		})();
		(function() {
			var t = document.createElement("div");
			try {
				t.appendChild(document.createComment(""))
			} catch (s) {
			}
			if (t.getElementsByTagName("*").length > 0) {
				f.find.TAG = function(u, y) {
					var x = y.getElementsByTagName(u[1]);
					if (u[1] === "*") {
						var w = [];
						for ( var v = 0; x[v]; v++) {
							if (x[v].nodeType === 1) {
								w.push(x[v])
							}
						}
						x = w
					}
					return x
				}
			}
			t.innerHTML = "<a href='#'></a>";
			if (t.firstChild
					&& typeof t.firstChild.getAttribute !== "undefined"
					&& t.firstChild.getAttribute("href") !== "#") {
				f.attrHandle.href = function(u) {
					return u.getAttribute("href", 2)
				}
			}
			t = null
		})();
		if (document.querySelectorAll) {
			(function() {
				var s = b, v = document.createElement("div"), u = "__sizzle__";
				v.innerHTML = "<p class='TEST'></p>";
				if (v.querySelectorAll
						&& v.querySelectorAll(".TEST").length === 0) {
					return
				}
				b = function(D, x, z, C) {
					x = x || document;
					D = D.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!C && !b.isXML(x)) {
						if (x.nodeType === 9) {
							try {
								return a(x.querySelectorAll(D), z)
							} catch (A) {
							}
						} else {
							if (x.nodeType === 1
									&& x.nodeName.toLowerCase() !== "object") {
								var y = x.getAttribute("id"), w = y || u, F = x.parentNode, E = /^\s*[+~]/
										.test(D);
								if (!y) {
									x.setAttribute("id", w)
								} else {
									w = w.replace(/'/g, "\\$&")
								}
								if (E && F) {
									x = x.parentNode
								}
								try {
									if (!E || F) {
										return a(x.querySelectorAll("[id='" + w
												+ "'] " + D), z)
									}
								} catch (B) {
								} finally {
									if (!y) {
										x.removeAttribute("id")
									}
								}
							}
						}
					}
					return s(D, x, z, C)
				};
				for ( var t in s) {
					b[t] = s[t]
				}
				v = null
			})()
		}
		(function() {
			var s = document.documentElement, u = s.matchesSelector
					|| s.mozMatchesSelector || s.webkitMatchesSelector
					|| s.msMatchesSelector, t = false;
			try {
				u.call(document.documentElement, "[test!='']:sizzle")
			} catch (v) {
				t = true
			}
			if (u) {
				b.matchesSelector = function(w, y) {
					y = y.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!b.isXML(w)) {
						try {
							if (t || !f.match.PSEUDO.test(y) && !/!=/.test(y)) {
								return u.call(w, y)
							}
						} catch (x) {
						}
					}
					return b(y, null, null, [ w ]).length > 0
				}
			}
		})();
		(function() {
			var s = document.createElement("div");
			s.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!s.getElementsByClassName
					|| s.getElementsByClassName("e").length === 0) {
				return
			}
			s.lastChild.className = "e";
			if (s.getElementsByClassName("e").length === 1) {
				return
			}
			f.order.splice(1, 0, "CLASS");
			f.find.CLASS = function(t, u, v) {
				if (typeof u.getElementsByClassName !== "undefined" && !v) {
					return u.getElementsByClassName(t[1])
				}
			};
			s = null
		})();
		function o(t, y, x, B, z, A) {
			for ( var v = 0, u = B.length; v < u; v++) {
				var s = B[v];
				if (s) {
					var w = false;
					s = s[t];
					while (s) {
						if (s.sizcache === x) {
							w = B[s.sizset];
							break
						}
						if (s.nodeType === 1 && !A) {
							s.sizcache = x;
							s.sizset = v
						}
						if (s.nodeName.toLowerCase() === y) {
							w = s;
							break
						}
						s = s[t]
					}
					B[v] = w
				}
			}
		}
		function r(t, y, x, B, z, A) {
			for ( var v = 0, u = B.length; v < u; v++) {
				var s = B[v];
				if (s) {
					var w = false;
					s = s[t];
					while (s) {
						if (s.sizcache === x) {
							w = B[s.sizset];
							break
						}
						if (s.nodeType === 1) {
							if (!A) {
								s.sizcache = x;
								s.sizset = v
							}
							if (typeof y !== "string") {
								if (s === y) {
									w = true;
									break
								}
							} else {
								if (b.filter(y, [ s ]).length > 0) {
									w = s;
									break
								}
							}
						}
						s = s[t]
					}
					B[v] = w
				}
			}
		}
		if (document.documentElement.contains) {
			b.contains = function(t, s) {
				return t !== s && (t.contains ? t.contains(s) : true)
			}
		} else {
			if (document.documentElement.compareDocumentPosition) {
				b.contains = function(t, s) {
					return !!(t.compareDocumentPosition(s) & 16)
				}
			} else {
				b.contains = function() {
					return false
				}
			}
		}
		b.isXML = function(s) {
			var t = (s ? s.ownerDocument || s : 0).documentElement;
			return t ? t.nodeName !== "HTML" : false
		};
		var h = function(s, z) {
			var x, v = [], w = "", u = z.nodeType ? [ z ] : z;
			while ((x = f.match.PSEUDO.exec(s))) {
				w += x[0];
				s = s.replace(f.match.PSEUDO, "")
			}
			s = f.relative[s] ? s + "*" : s;
			for ( var y = 0, t = u.length; y < t; y++) {
				b(s, u[y], v)
			}
			return b.filter(w, v)
		};
		baidu.dom.query = b
	})();
	baidu.page.createStyleSheet = function(a) {
		var g = a || {}, d = g.document || document, c;
		if (baidu.browser.ie) {
			if (!g.url) {
				g.url = ""
			}
			return d.createStyleSheet(g.url, g.index)
		} else {
			c = "<style type='text/css'></style>";
			g.url
					&& (c = "<link type='text/css' rel='stylesheet' href='"
							+ g.url + "'/>");
			baidu.dom.insertHTML(d.getElementsByTagName("HEAD")[0],
					"beforeEnd", c);
			if (g.url) {
				return null
			}
			var b = d.styleSheets[d.styleSheets.length - 1], f = b.rules
					|| b.cssRules;
			return {
				self : b,
				rules : b.rules || b.cssRules,
				addRule : function(h, k, j) {
					if (b.addRule) {
						return b.addRule(h, k, j)
					} else {
						if (b.insertRule) {
							isNaN(j) && (j = f.length);
							return b.insertRule(h + "{" + k + "}", j)
						}
					}
				},
				removeRule : function(h) {
					if (b.removeRule) {
						b.removeRule(h)
					} else {
						if (b.deleteRule) {
							isNaN(h) && (h = 0);
							b.deleteRule(h)
						}
					}
				}
			}
		}
	};
	baidu.dom.create = function(c, a) {
		var d = document.createElement(c), b = a || {};
		return baidu.dom.setAttrs(d, b)
	};
	baidu.dom.empty = function(a) {
		a = baidu.dom.g(a);
		while (a.firstChild) {
			a.removeChild(a.firstChild)
		}
		return a
	};
	baidu.dom.getText = function(d) {
		var b = "", f, c = 0, a;
		d = baidu._g(d);
		if (d.nodeType === 3 || d.nodeType === 4) {
			b += d.nodeValue
		} else {
			if (d.nodeType !== 8) {
				f = d.childNodes;
				for (a = f.length; c < a; c++) {
					b += baidu.dom.getText(f[c])
				}
			}
		}
		return b
	};
	baidu.dom.hasAttr = function(c, b) {
		c = baidu.g(c);
		var a = c.attributes.getNamedItem(b);
		return !!(a && a.specified)
	};
	baidu.dom.toggleClass = function(a, b) {
		if (baidu.dom.hasClass(a, b)) {
			baidu.dom.removeClass(a, b)
		} else {
			baidu.dom.addClass(a, b)
		}
	};
	baidu.e = baidu.element = function(b) {
		var a = baidu._g(b);
		if (!a && baidu.dom.query) {
			a = baidu.dom.query(b)
		}
		return new baidu.element.Element(a)
	};
	baidu.fn.methodize = function(b, a) {
		return function() {
			return b.apply(this, [ (a ? this[a] : this) ].concat([].slice
					.call(arguments)))
		}
	};
	baidu.fn.multize = function(c, a) {
		var b = function() {
			var l = arguments[0], h = a ? b : c, f = [], k = [].slice.call(
					arguments, 0), g = 0, d, j;
			if (l instanceof Array) {
				for (d = l.length; g < d; g++) {
					k[0] = l[g];
					j = h.apply(this, k);
					f.push(j)
				}
				return f
			} else {
				return c.apply(this, arguments)
			}
		};
		return b
	};
	baidu.element._wrapFunction = function(c, b) {
		return baidu.fn.methodize(a(baidu.fn.multize(c), baidu.element.Element,
				b), "_dom");
		function a(f, g, d) {
			d = d | 0;
			return function() {
				var h = f.apply(this, arguments);
				if (d > 0) {
					return new g(arguments[d - 1])
				}
				if (!d) {
					return new g(h)
				}
				return h
			}
		}
	};
	baidu.element.Element = function(a) {
		if (!baidu.element._init) {
			baidu.element._initChain();
			baidu.element._init = true
		}
		this._dom = baidu.lang.toArray(a)
	};
	baidu.element.Element.prototype.each = function(a) {
		baidu.array.each(this._dom, function(b) {
			a.call(this, new baidu.element.Element(b))
		})
	};
	baidu.element._initChain = function() {
		var c = baidu.element.Element.prototype, a = baidu.element._wrapFunction;
		baidu.each(("draggable droppable resizable").split(" "), function(d) {
			c[d] = a(baidu.dom[d], 1)
		});
		baidu
				.each(
						("remove getText contains getAttr getPosition getStyle hasClass intersect hasAttr")
								.split(" "), function(d) {
							c[d] = c[d.replace(/^get[A-Z]/g, b)] = a(
									baidu.dom[d], -1)
						});
		baidu
				.each(
						("addClass empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle children next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev g q query removeStyle setBorderBoxSize setOuterWidth setOuterHeight setBorderBoxWidth setBorderBoxHeight setPosition")
								.split(" "), function(d) {
							c[d] = c[d.replace(/^get[A-Z]/g, b)] = a(
									baidu.dom[d], 0)
						});
		baidu.each(("on un").split(" "), function(d) {
			c[d] = a(baidu.event[d], 0)
		});
		baidu
				.each(
						("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error")
								.split(" "), function(d) {
							c[d] = function(f) {
								return this.on(d, f)
							}
						});
		function b(d) {
			return d.charAt(3).toLowerCase()
		}
	};
	baidu.lang.Class.prototype.addEventListeners = function(c, d) {
		if (typeof d == "undefined") {
			for ( var b in c) {
				this.addEventListener(b, c[b])
			}
		} else {
			c = c.split(",");
			var b = 0, a = c.length, f;
			for (; b < a; b++) {
				this.addEventListener(baidu.trim(c[b]), d)
			}
		}
	};
	baidu.array.hash = function(f, b) {
		var g = {}, d = b && b.length, c = 0, a = f.length;
		for (; c < a; c++) {
			g[f[c]] = (d && d > c) ? b[c] : true
		}
		return g
	};
	baidu.dom.ddManager = baidu.lang.createSingle({
		_targetsDroppingOver : {}
	});
	baidu.dom.droppable = function(f, c) {
		c = c || {};
		var d = baidu.dom.ddManager, h = baidu.dom.g(f), b = baidu.lang.guid(), g = function(
				k) {
			var j = d._targetsDroppingOver, i = {
				trigger : k.DOM,
				reciever : h
			};
			if (baidu.dom.intersect(h, k.DOM)) {
				if (!j[b]) {
					(typeof c.ondropover == "function")
							&& c.ondropover.call(h, i);
					d.dispatchEvent("ondropover", i);
					j[b] = true
				}
			} else {
				if (j[b]) {
					(typeof c.ondropout == "function")
							&& c.ondropout.call(h, i);
					d.dispatchEvent("ondropout", i)
				}
				delete j[b]
			}
		}, a = function(j) {
			var i = {
				trigger : j.DOM,
				reciever : h
			};
			if (baidu.dom.intersect(h, j.DOM)) {
				typeof c.ondrop == "function" && c.ondrop.call(h, i);
				d.dispatchEvent("ondrop", i)
			}
			delete d._targetsDroppingOver[b]
		};
		d.addEventListener("ondrag", g);
		d.addEventListener("ondragend", a);
		return {
			cancel : function() {
				d.removeEventListener("ondrag", g);
				d.removeEventListener("ondragend", a)
			}
		}
	};
	baidu.dom.removeStyle = function() {
		var b = document.createElement("DIV"), a, c = baidu.dom._g;
		if (b.style.removeProperty) {
			a = function(f, d) {
				f = c(f);
				f.style.removeProperty(d);
				return f
			}
		} else {
			if (b.style.removeAttribute) {
				a = function(f, d) {
					f = c(f);
					f.style.removeAttribute(baidu.string.toCamelCase(d));
					return f
				}
			}
		}
		b = null;
		return a
	}();
	baidu.dom.setBorderBoxSize = function(c, b) {
		var a = {};
		function d(g, f) {
			return parseFloat(baidu.getStyle(g, f)) || 0
		}
		if (baidu.browser.isStrict) {
			if (b.width) {
				a.width = parseFloat(b.width) - d(c, "paddingLeft")
						- d(c, "paddingRight") - d(c, "borderLeftWidth")
						- d(c, "borderRightWidth");
				a.width < 0 && (a.width = 0)
			}
			if (b.height) {
				a.height = parseFloat(b.height) - d(c, "paddingTop")
						- d(c, "paddingBottom") - d(c, "borderTopWidth")
						- d(c, "borderBottomWidth");
				a.height < 0 && (a.height = 0)
			}
		}
		return baidu.dom.setStyles(c, a)
	};
	baidu.dom.setOuterHeight = baidu.dom.setBorderBoxHeight = function(b, a) {
		return baidu.dom.setBorderBoxSize(b, {
			height : a
		})
	};
	baidu.dom.setOuterWidth = baidu.dom.setBorderBoxWidth = function(a, b) {
		return baidu.dom.setBorderBoxSize(a, {
			width : b
		})
	};
	baidu.dom.resizable = function(d, h) {
		var u, l, j = {}, c, a = {}, o, s, r, b, f, m, k;
		if (!(u = baidu.dom.g(d)) && baidu.getStyle(u, "position") == "static") {
			return false
		}
		b = u.offsetParent;
		l = baidu.extend({
			direction : [ "e", "s", "se" ],
			minWidth : 16,
			minHeight : 16,
			classPrefix : "tangram",
			directionHandlePosition : {}
		}, h);
		k = baidu.extend({
			e : {
				right : "-5px",
				top : "0px",
				width : "7px",
				height : u.offsetHeight
			},
			s : {
				left : "0px",
				bottom : "-5px",
				height : "7px",
				width : u.offsetWidth
			},
			n : {
				left : "0px",
				top : "-5px",
				height : "7px",
				width : u.offsetWidth
			},
			w : {
				left : "-5px",
				top : "0px",
				height : u.offsetHeight,
				width : "7px"
			},
			se : {
				right : "1px",
				bottom : "1px",
				height : "16px",
				width : "16px"
			},
			sw : {
				left : "1px",
				bottom : "1px",
				height : "16px",
				width : "16px"
			},
			ne : {
				right : "1px",
				top : "1px",
				height : "16px",
				width : "16px"
			},
			nw : {
				left : "1px",
				top : "1px",
				height : "16px",
				width : "16px"
			}
		}, l.directionHandlePosition);
		baidu.each([ "minHeight", "minWidth", "maxHeight", "maxWidth" ],
				function(v) {
					l[v] && (l[v] = parseFloat(l[v]))
				});
		o = [ l.minWidth || 0, l.maxWidth || Number.MAX_VALUE,
				l.minHeight || 0, l.maxHeight || Number.MAX_VALUE ];
		baidu.each(l.direction, function(v) {
			var w = l.classPrefix.split(" ");
			w[0] = w[0] + "-resizable-" + v;
			var y = baidu.dom.create("div", {
				className : w.join(" ")
			}), x = k[v];
			x.cursor = v + "-resize";
			x.position = "absolute";
			baidu.setStyles(y, x);
			y.key = v;
			y.style.MozUserSelect = "none";
			u.appendChild(y);
			j[v] = y;
			baidu.on(y, "mousedown", i)
		});
		function g() {
			f && q();
			baidu.object.each(j, function(v) {
				baidu.un(v, "mousedown", i);
				baidu.dom.remove(v)
			})
		}
		function i(x) {
			var w = baidu.event.getTarget(x), v = w.key;
			f = w;
			if (w.setCapture) {
				w.setCapture()
			} else {
				if (window.captureEvents) {
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
				}
			}
			r = baidu.getStyle(document.body, "cursor");
			baidu.setStyle(document.body, "cursor", v + "-resize");
			baidu.on(document, "mouseup", q);
			baidu.on(document.body, "selectstart", n);
			s = document.body.style.MozUserSelect;
			document.body.style.MozUserSelect = "none";
			var y = baidu.page.getMousePosition();
			a = p();
			m = setInterval(function() {
				t(v, y)
			}, 20);
			baidu.lang.isFunction(l.onresizestart) && l.onresizestart();
			baidu.event.preventDefault(x)
		}
		function q() {
			if (f.releaseCapture) {
				f.releaseCapture()
			} else {
				if (window.releaseEvents) {
					window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
				}
			}
			baidu.un(document, "mouseup", q);
			baidu.un(document, "selectstart", n);
			document.body.style.MozUserSelect = s;
			baidu.un(document.body, "selectstart", n);
			clearInterval(m);
			baidu.setStyle(document.body, "cursor", r);
			f = null;
			baidu.lang.isFunction(l.onresizeend) && l.onresizeend()
		}
		function t(w, C) {
			var B = baidu.page.getMousePosition(), x = a.width, v = a.height, A = a.top, z = a.left, y;
			if (w.indexOf("e") >= 0) {
				x = Math.max(B.x - C.x + a.width, o[0]);
				x = Math.min(x, o[1])
			} else {
				if (w.indexOf("w") >= 0) {
					x = Math.max(C.x - B.x + a.width, o[0]);
					x = Math.min(x, o[1]);
					z = a.left - (x - a.width)
				}
			}
			if (w.indexOf("s") >= 0) {
				v = Math.max(B.y - C.y + a.height, o[2]);
				v = Math.min(v, o[3])
			} else {
				if (w.indexOf("n") >= 0) {
					v = Math.max(C.y - B.y + a.height, o[2]);
					v = Math.min(v, o[3]);
					A = a.top - (v - a.height)
				}
			}
			y = {
				width : x,
				height : v,
				top : A,
				left : z
			};
			baidu.dom.setOuterHeight(u, v);
			baidu.dom.setOuterWidth(u, x);
			baidu.setStyles(u, {
				top : A,
				left : z
			});
			j.n && baidu.setStyle(j.n, "width", x);
			j.s && baidu.setStyle(j.s, "width", x);
			j.e && baidu.setStyle(j.e, "height", v);
			j.w && baidu.setStyle(j.w, "height", v);
			baidu.lang.isFunction(l.onresize) && l.onresize({
				current : y,
				original : a
			})
		}
		function n(v) {
			return baidu.event.preventDefault(v, false)
		}
		function p() {
			var v = baidu.dom.getPosition(u.offsetParent), w = baidu.dom
					.getPosition(u), y, x;
			if (u.offsetParent == document.body) {
				y = w.top;
				x = w.left
			} else {
				y = w.top - v.top;
				x = w.left - v.left
			}
			baidu.setStyles(u, {
				top : y,
				left : x
			});
			return {
				width : u.offsetWidth,
				height : u.offsetHeight,
				top : y,
				left : x
			}
		}
		return {
			cancel : g
		}
	};
	baidu.fn.bind = function(b, a) {
		var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
		return function() {
			var f = baidu.lang.isString(b) ? a[b] : b, d = (c) ? c
					.concat([].slice.call(arguments, 0)) : arguments;
			return f.apply(a || f, d)
		}
	};
	baidu.lang.isBoolean = function(a) {
		return typeof a === "boolean"
	};
	baidu.lang.isDate = function(a) {
		return {}.toString.call(a) === "[object Date]"
				&& a.toString() !== "Invalid Date" && !isNaN(a)
	};
	baidu.event._eventFilter = baidu.event._eventFilter || {};
	baidu.event._eventFilter._crossElementBoundary = function(a, d) {
		var c = d.relatedTarget, b = d.currentTarget;
		if (typeof c == "undefined") {
			return a.call(b, d)
		}
		if (c === false || b == c || c.prefix == "xul"
				|| baidu.dom.contains(b, c)) {
			return
		}
		return a.call(b, d)
	};
	baidu.event._eventFilter.mouseenter = window.attachEvent ? null : function(
			a, b, c) {
		return {
			type : "mouseover",
			listener : baidu.fn.bind(
					baidu.event._eventFilter._crossElementBoundary, this, c)
		}
	};
	baidu.event._eventFilter.mouseleave = window.attachEvent ? null : function(
			a, b, c) {
		return {
			type : "mouseout",
			listener : baidu.fn.bind(
					baidu.event._eventFilter._crossElementBoundary, this, c)
		}
	};
	(function() {
		var d = baidu.browser, l = {
			keydown : 1,
			keyup : 1,
			keypress : 1
		}, a = {
			click : 1,
			dblclick : 1,
			mousedown : 1,
			mousemove : 1,
			mouseup : 1,
			mouseover : 1,
			mouseout : 1
		}, i = {
			abort : 1,
			blur : 1,
			change : 1,
			error : 1,
			focus : 1,
			load : d.ie ? 0 : 1,
			reset : 1,
			resize : 1,
			scroll : 1,
			select : 1,
			submit : 1,
			unload : d.ie ? 0 : 1
		}, g = {
			scroll : 1,
			resize : 1,
			reset : 1,
			submit : 1,
			change : 1,
			select : 1,
			error : 1,
			abort : 1
		}, k = {
			KeyEvents : [ "bubbles", "cancelable", "view", "ctrlKey", "altKey",
					"shiftKey", "metaKey", "keyCode", "charCode" ],
			MouseEvents : [ "bubbles", "cancelable", "view", "detail",
					"screenX", "screenY", "clientX", "clientY", "ctrlKey",
					"altKey", "shiftKey", "metaKey", "button", "relatedTarget" ],
			HTMLEvents : [ "bubbles", "cancelable" ],
			UIEvents : [ "bubbles", "cancelable", "view", "detail" ],
			Events : [ "bubbles", "cancelable" ]
		};
		baidu.object.extend(g, l);
		baidu.object.extend(g, a);
		function c(r, p) {
			var o = 0, n = r.length, q = {};
			for (; o < n; o++) {
				q[r[o]] = p[r[o]];
				delete p[r[o]]
			}
			return q
		}
		function f(p, o, n) {
			n = baidu.object.extend({}, n);
			var q = baidu.object.values(c(k[o], n)), r = document
					.createEvent(o);
			q.unshift(p);
			if ("KeyEvents" == o) {
				r.initKeyEvent.apply(r, q)
			} else {
				if ("MouseEvents" == o) {
					r.initMouseEvent.apply(r, q)
				} else {
					if ("UIEvents" == o) {
						r.initUIEvent.apply(r, q)
					} else {
						r.initEvent.apply(r, q)
					}
				}
			}
			baidu.object.extend(r, n);
			return r
		}
		function b(n) {
			var o;
			if (document.createEventObject) {
				o = document.createEventObject();
				baidu.object.extend(o, n)
			}
			return o
		}
		function h(q, n) {
			n = c(k.KeyEvents, n);
			var r;
			if (document.createEvent) {
				try {
					r = f(q, "KeyEvents", n)
				} catch (p) {
					try {
						r = f(q, "Events", n)
					} catch (o) {
						r = f(q, "UIEvents", n)
					}
				}
			} else {
				n.keyCode = n.charCode > 0 ? n.charCode : n.keyCode;
				r = b(n)
			}
			return r
		}
		function m(o, n) {
			n = c(k.MouseEvents, n);
			var p;
			if (document.createEvent) {
				p = f(o, "MouseEvents", n);
				if (n.relatedTarget && !p.relatedTarget) {
					if ("mouseout" == o.toLowerCase()) {
						p.toElement = n.relatedTarget
					} else {
						if ("mouseover" == o.toLowerCase()) {
							p.fromElement = n.relatedTarget
						}
					}
				}
			} else {
				n.button = n.button == 0 ? 1 : n.button == 1 ? 4 : baidu.lang
						.isNumber(n.button) ? n.button : 0;
				p = b(n)
			}
			return p
		}
		function j(p, n) {
			n.bubbles = g.hasOwnProperty(p);
			n = c(k.HTMLEvents, n);
			var r;
			if (document.createEvent) {
				try {
					r = f(p, "HTMLEvents", n)
				} catch (q) {
					try {
						r = f(p, "UIEvents", n)
					} catch (o) {
						r = f(p, "Events", n)
					}
				}
			} else {
				r = b(n)
			}
			return r
		}
		baidu.event.fire = function(o, p, n) {
			var q;
			p = p.replace(/^on/i, "");
			o = baidu.dom._g(o);
			n = baidu.object.extend({
				bubbles : true,
				cancelable : true,
				view : window,
				detail : 1,
				screenX : 0,
				screenY : 0,
				clientX : 0,
				clientY : 0,
				ctrlKey : false,
				altKey : false,
				shiftKey : false,
				metaKey : false,
				keyCode : 0,
				charCode : 0,
				button : 0,
				relatedTarget : null
			}, n);
			if (l[p]) {
				q = h(p, n)
			} else {
				if (a[p]) {
					q = m(p, n)
				} else {
					if (i[p]) {
						q = j(p, n)
					} else {
						throw (new Error(p + " is not support!"))
					}
				}
			}
			if (q) {
				if (o.dispatchEvent) {
					o.dispatchEvent(q)
				} else {
					if (o.fireEvent) {
						o.fireEvent("on" + p, q)
					}
				}
			}
		}
	})();
	baidu.event.once = function(a, b, c) {
		a = baidu.dom._g(a);
		function d(f) {
			c.call(a, f);
			baidu.event.un(a, b, d)
		}
		baidu.event.on(a, b, d);
		return a
	};
	(function() {
		var c = /^\#[\da-f]{6}$/i, b = /^rgb\((\d+), (\d+), (\d+)\)$/, a = {
			black : "#000000",
			silver : "#c0c0c0",
			gray : "#808080",
			white : "#ffffff",
			maroon : "#800000",
			red : "#ff0000",
			purple : "#800080",
			fuchsia : "#ff00ff",
			green : "#008000",
			lime : "#00ff00",
			olive : "#808000",
			yellow : "#ffff0",
			navy : "#000080",
			blue : "#0000ff",
			teal : "#008080",
			aqua : "#00ffff"
		};
		baidu.string.formatColor = function(f) {
			if (c.test(f)) {
				return f
			} else {
				if (b.test(f)) {
					for ( var k, j = 1, f = "#"; j < 4; j++) {
						k = parseInt(RegExp["\x24" + j]).toString(16);
						f += ("00" + k).substr(k.length)
					}
					return f
				} else {
					if (/^\#[\da-f]{3}$/.test(f)) {
						var h = f.charAt(1), g = f.charAt(2), d = f.charAt(3);
						return "#" + h + h + g + g + d + d
					} else {
						if (a[f]) {
							return a[f]
						}
					}
				}
			}
			return ""
		}
	})();
	baidu.array.map = function(f, d) {
		var c = [], b = 0, a = f.length;
		for (; b < a; b++) {
			c[b] = d(f[b], b)
		}
		return c
	};
	baidu.dom.getParent = function(a) {
		a = baidu.dom._g(a);
		return a.parentElement || a.parentNode || null
	};
	baidu.dom.setPosition = function(b, a) {
		return baidu.dom.setStyles(b, {
			left : a.left
					- (parseFloat(baidu.dom.getStyle(b, "margin-left")) || 0),
			top : a.top
					- (parseFloat(baidu.dom.getStyle(b, "margin-top")) || 0)
		})
	};
	baidu.element.extend = function(a) {
		var b = baidu.element;
		baidu.object.each(a, function(d, c) {
			b.Element.prototype[c] = b._wrapFunction(d, -1)
		})
	};
	baidu.number.randomInt = function(b, a) {
		return Math.floor(Math.random() * (a - b + 1) + b)
	};
	baidu.object.map = function(d, c) {
		var b = {};
		for ( var a in d) {
			if (d.hasOwnProperty(a)) {
				b[a] = c(d[a], a)
			}
		}
		return b
	};
	baidu.array.contains = function(a, b) {
		return (baidu.array.indexOf(a, b) >= 0)
	};
	baidu.array.empty = function(a) {
		a.length = 0
	};
	baidu.array.every = function(d, c) {
		var b = 0, a = d.length;
		for (; b < a; b++) {
			if (!c.call(d, d[b], b)) {
				return false
			}
		}
		return true
	};
	baidu.array.reduce = function(g, d, f) {
		var a = f, c = 0, b = g.length;
		for (; c < b; c++) {
			a = d(a, g[c])
		}
		return a
	};
	baidu.array.some = function(d, c) {
		var b = 0, a = d.length;
		for (; b < a; b++) {
			if (c.call(d, d[b], b)) {
				return true
			}
		}
		return false
	};
	baidu.page.load = function(g, d) {
		d = d || {};
		var c = baidu.page.load, b = c._cache = c._cache || {}, f = d.parallel;
		function a() {
			for ( var k = 0, j = g.length; k < j; ++k) {
				if (!b[g[k].url]) {
					return
				}
			}
			d.onload()
		}
		function h(j, l) {
			var k, i;
			switch (j.type) {
			case "css":
				k = document.createElement("link");
				k.setAttribute("rel", "stylesheet");
				k.setAttribute("type", "text/css");
				break;
			case "js":
				k = document.createElement("script");
				k.setAttribute("type", "text/javascript");
				k.charset = j.charset || "UTF8";
				break;
			case "html":
				k = document.createElement("iframe");
				k.frameBorder = "none";
				break;
			default:
				return
			}
			k.onload = k.onreadystatechange = function() {
				if (!i
						&& (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
					i = true;
					k.onload = k.onreadystatechange = null;
					l.call(window, k)
				}
			};
			if (j.type == "css") {
				(function() {
					if (i) {
						return
					}
					try {
						k.sheet.cssRule
					} catch (m) {
						setTimeout(arguments.callee, 20);
						return
					}
					i = true;
					l.call(window, k)
				})()
			}
			k.href = k.src = j.url;
			document.body.appendChild(k)
		}
		typeof g == "string" && (g = [ {
			url : g
		} ]);
		if (!(g && g.length)) {
			return
		}
		baidu.each(g,
				function(k) {
					var j = k.url, l = !!f, i, m = function(n) {
						var o;
						b[k.url] = n;
						typeof k.onload == "function"
								&& (o = k.onload.call(window, n));
						if (o === false) {
							return
						}
						!f && c(g.slice(1));
						typeof d.onload == "function" && a()
					};
					k.type = (k.type || j.substr(j.lastIndexOf(".") + 1))
							.toLowerCase();
					k.requestType = k.requestType
							|| (k.type == "html" ? "ajax" : "dom");
					if (i = b[k.url]) {
						m.call(window, i);
						return l
					}
					if (k.requestType.toLowerCase() == "dom") {
						h(k, m)
					} else {
						baidu.ajax.get(k.url, function(o, n) {
							m(n)
						})
					}
					return l
				})
	};
	baidu.page.lazyLoadImage = function(a) {
		a = a || {};
		a.preloadHeight = a.preloadHeight || 0;
		baidu.dom
				.ready(function() {
					var f = document.getElementsByTagName("IMG"), g = f, h = f.length, d = 0, l = c(), k = "data-tangram-ori-src", j;
					if (a.className) {
						g = [];
						for (; d < h; ++d) {
							if (baidu.dom.hasClass(f[d], a.className)) {
								g.push(f[d])
							}
						}
					}
					function c() {
						return baidu.page.getScrollTop()
								+ baidu.page.getViewHeight() + a.preloadHeight
					}
					for (d = 0, h = g.length; d < h; ++d) {
						j = g[d];
						if (baidu.dom.getPosition(j).top > l) {
							j.setAttribute(k, j.src);
							a.placeHolder ? j.src = a.placeHolder : j
									.removeAttribute("src")
						}
					}
					var b = function() {
						var n = c(), p, q = true, o = 0, m = g.length;
						for (; o < m; ++o) {
							j = g[o];
							p = j.getAttribute(k);
							p && (q = false);
							if (baidu.dom.getPosition(j).top < n && p) {
								j.src = p;
								j.removeAttribute(k);
								baidu.lang.isFunction(a.onlazyload)
										&& a.onlazyload(j)
							}
						}
						q && baidu.un(window, "scroll", b)
					};
					baidu.on(window, "scroll", b)
				})
	};
	(function() {
		var b = function(c) {
			return baidu.lang.isObject(c) && !baidu.lang.isFunction(c)
		};
		function a(h, g, f, d, c) {
			if (g.hasOwnProperty(f)) {
				if (c && b(h[f])) {
					baidu.object.merge(h[f], g[f], {
						overwrite : d,
						recursive : c
					})
				} else {
					if (d || !(f in h)) {
						h[f] = g[f]
					}
				}
			}
		}
		baidu.object.merge = function(j, c, l) {
			var f = 0, m = l || {}, h = m.overwrite, k = m.whiteList, d = m.recursive, g;
			if (k && k.length) {
				g = k.length;
				for (; f < g; ++f) {
					a(j, c, k[f], h, d)
				}
			} else {
				for (f in c) {
					a(j, c, f, h, d)
				}
			}
			return j
		}
	})();
	window.TT = T;
})();