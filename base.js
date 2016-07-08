(function(e) {
    function h(e) {
        if (!(this instanceof h)) return new h(e);
        e || (e = {});
        "number" == typeof e && (e = {
            s: e
        });
        null != e.u || (e.u = !0);
        this.options = e;
        this.s = e.s || h.G;
        this.L = 1E3 / this.s;
        this.M = this.s !== h.G;
        this.w = null;
        this.m = {};
        this.p = this.v = 0
    }
    var v = Date.now,
        Q = e.setTimeout,
        p, B, E = !1;
    (function() {
        var h, s = ["ms", "moz", "webkit", "o"];
        p = e.requestAnimationFrame;
        B = e.cancelAnimationFrame;
        for (h = 0; h < s.length && !p; h++) p = p || e[s[h] + "RequestAnimationFrame"], B = B || e[s[h] + "CancelAnimationFrame"] || e[s[h] + "CancelRequestAnimationFrame"];
        p && p(function() {
            E = !0
        })
    })();
    h.G = 60;
    h.Y = function(p) {
        var s = new h(p);
        e.requestAnimationFrame = function(e) {
            return s.X(e)
        };
        e.cancelAnimationFrame = function(e) {
            return s.cancel(e)
        };
        return s
    };
    h.prototype.request = function(e) {
        var h = this,
            y;
        ++this.p;
        if (E && h.options.u && !this.M) return p(e);
        if (!e) throw new TypeError("Not enough arguments");
        null == this.w && (y = this.L + this.v - (v ? v() : (new Date).getTime()), 0 > y && (y = 0), this.w = Q(function() {
            var e;
            h.v = v ? v() : (new Date).getTime();
            h.w = null;
            ++h.p;
            for (e in h.m)
                if (h.m[e]) {
                    if (E && h.options.u) p(h.m[e]);
                    else h.m[e](h.v);
                    delete h.m[e]
                }
        }, y));
        this.m[this.p] = e;
        return this.p
    };
    h.prototype.cancel = function(e) {
        E && this.options.u && B(e);
        delete this.m[e]
    };
    "object" == typeof exports && "object" == typeof module ? module.W = h : "function" == typeof define && define.V ? define(function() {
        return h
    }) : e.AnimationFrame = h
})(window);
window.TagulDisplayCloud = function(e, h, v, Q) {
    function p(b) {
        return !isNaN(parseFloat(b)) && isFinite(b)
    }

    function B() {
        var b = l.offsetWidth,
            d = l.offsetHeight;
        I = 36E4 < b * d ? 1 : 1.5;
        l.width = I * b + 1;
        l.height = I * d + 1
    }

    function E() {
        if (z) {
            attribution.g = F;
            var b = J();
            attribution.e = b - Math.max(attribution.l - (b - attribution.e), 0);
            attribution.q = !0
        }
    }

    function M(b) {
        b = parseInt(b.replace("#", ""), 16);
        return {
            k: b >> 16 & 255,
            j: b >> 8 & 255,
            h: b & 255
        }
    }

    function s(b, d) {
        b = b.substring(1, b.length);
        b = M(b);
        return "rgba(" + b.k + "," + b.j + "," + b.h + "," + d.toFixed(4) +
            ")"
    }

    function y(b) {
        b = b.toString(16);
        return 1 == b.length ? "0" + b : b
    }

    function T(b, d, a) {
        c1 = M(b.substring(1, b.length));
        c2 = M(d.substring(1, d.length));
        return "#" + y(Math.round(c1.k * (1 - a) + c2.k * a)) + y(Math.round(c1.j * (1 - a) + c2.j * a)) + y(Math.round(c1.h * (1 - a) + c2.h * a))
    }

    function J() {
        return Date.now ? Date.now() : (new Date).getTime()
    }

    function N(b, d) {
        b.setTransform(d[0][0], d[1][0], d[0][1], d[1][1], d[0][2], d[1][2])
    }

    function w(b, d) {
        return [
            [1, 0, b],
            [0, 1, d]
        ]
    }

    function r(b, d) {
        return [
            [b[0][0] * d[0][0] + b[0][1] * d[1][0], b[0][0] * d[0][1] +
                b[0][1] * d[1][1], b[0][0] * d[0][2] + b[0][1] * d[1][2] + b[0][2]
            ],
            [b[1][0] * d[0][0] + b[1][1] * d[1][0], b[1][0] * d[0][1] + b[1][1] * d[1][1], b[1][0] * d[0][2] + b[1][1] * d[1][2] + b[1][2]]
        ]
    }

    function U(b) {
        var d = b[0][0] * b[1][1] - b[0][1] * b[1][0];
        return [
            [b[1][1] / d, -b[0][1] / d, (b[0][1] * b[1][2] - b[0][2] * b[1][1]) / d],
            [-b[1][0] / d, b[0][0] / d, (b[0][2] * b[1][0] - b[0][0] * b[1][2]) / d]
        ]
    }

    function G(b, d) {
        return {
            x: d[0][0] * b.x + d[0][1] * b.y + d[0][2],
            y: d[1][0] * b.x + d[1][1] * b.y + d[1][2]
        }
    }

    function H(b, d) {
        var a = G({
                x: b.x,
                y: b.y
            }, d),
            f = G({
                    x: b.x + b.width,
                    y: b.y + b.height
                },
                d),
            e = G({
                x: b.x,
                y: b.y + b.height
            }, d),
            c = G({
                x: b.x + b.width,
                y: b.y
            }, d),
            g = Math.min(a.x, f.x, e.x, c.x),
            h = Math.min(a.y, f.y, e.y, c.y),
            k = Math.max(a.x, f.x, e.x, c.x),
            a = Math.max(a.y, f.y, e.y, c.y);
        return {
            x: g,
            y: h,
            width: k - g,
            height: a - h
        }
    }

    function V(b, d) {
        var a = w(-b.a.H, -b.a.I),
            f = Math.pow(b.T / b.D, d),
            e = Math.pow(b.U / b.F, d),
            c = (b.S - b.K) * d,
            a = r([
                [Math.cos(c), Math.sin(c), 0],
                [-Math.sin(c), Math.cos(c), 0]
            ], a),
            a = r([
                [f, 0, 0],
                [0, e, 0]
            ], a);
        return r(w(b.a.H, b.a.I), a)
    }

    function W(b, d, a, f, e) {
        radius = 0.1 * Math.min(f, e);
        b.beginPath();
        b.moveTo(d + radius,
            a);
        b.lineTo(d + f - radius, a);
        b.quadraticCurveTo(d + f, a, d + f, a + radius);
        b.lineTo(d + f, a + e - radius);
        b.quadraticCurveTo(d + f, a + e, d + f - radius, a + e);
        b.lineTo(d + radius, a + e);
        b.quadraticCurveTo(d, a + e, d, a + e - radius);
        b.lineTo(d, a + radius);
        b.quadraticCurveTo(d, a, d + radius, a);
        b.closePath();
        b.fill()
    }

    function O(b, d) {
        for (var a = 0, f = 0, e = 0; e < d.B.length; e++) {
            var c = d.B[e],
                a = w(c.x - a, c.y - f);
            b.transform(a[0][0], a[1][0], a[0][1], a[1][1], a[0][2], a[1][2]);
            a = b;
            f = c.path;
            a.beginPath();
            for (var g = void 0, h = void 0, k = 0; k < f.length; k++) "M" == f[k] ?
                a.moveTo(g = parseFloat(f[++k]), h = parseFloat(f[++k])) : "q" == f[k] ? a.quadraticCurveTo(g + parseFloat(f[++k]), g + parseFloat(f[++k]), g += parseFloat(f[++k]), h = g + parseFloat(f[++k])) : "Q" == f[k] ? a.quadraticCurveTo(parseFloat(f[++k]), parseFloat(f[++k]), g = parseFloat(f[++k]), h = parseFloat(f[++k])) : "c" == f[k] ? a.bezierCurveTo(g + parseFloat(f[++k]), h + parseFloat(f[++k]), g + parseFloat(f[++k]), h + parseFloat(f[++k]), g += parseFloat(f[++k]), h += parseFloat(f[++k])) : "C" == f[k] ? a.bezierCurveTo(f[++k], f[++k], f[++k], f[++k], g = parseFloat(f[++k]),
                    h = parseFloat(f[++k])) : "l" == f[k] ? a.lineTo(g += parseFloat(f[++k]), h += parseFloat(f[++k])) : "h" == f[k] ? a.lineTo(g += parseFloat(f[++k]), h) : "H" == f[k] ? a.lineTo(g = parseFloat(f[++k]), h) : "v" == f[k] ? a.lineTo(g, h += parseFloat(f[++k])) : "V" == f[k] ? a.lineTo(g, h = parseFloat(f[++k])) : "L" == f[k] ? a.lineTo(g = parseFloat(f[++k]), h = parseFloat(f[++k])) : "Z" != f[k] && "z" != f[k] || a.closePath();
            a.closePath();
            a.fill();
            a = c.x;
            f = c.y
        }
    }

    function X() {
        var b, d, a;
        for (a in e.outlines) R[a] = e.outlines[a].split(" ");
        void 0 != m.backgroundColor && (n.fillStyle =
            s(m.backgroundColor, m.N), n.fillRect(0, 0, l.width, l.height));
        for (var f = Math.min(0.95 * l.width / u.width, 0.95 * l.height / u.height), f = r([
                [f, 0, 0],
                [0, f, 0]
            ], w(-u.x + (l.width / f - u.width) / 2, -u.y + (l.height / f - u.height) / 2)), g = 0, c; g < e.tags.length; g++) {
            b = e.tags[g];
            void 0 !== b.textId ? (c = e.texts[b.textId], d = c.bbox, a = 0.33 * Math.min(d.width, d.height) / 2, a = {
                x: d.x - a,
                y: d.y - a,
                width: d.width + 2 * a,
                height: d.height + 2 * a
            }, d = c.glyphs) : (a = b.bbox, d = b.glyphs);
            c = {};
            A.push(c);
            c.a = {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            };
            c.fill = b.fill;
            c.J =
                b.matrix;
            c.url = b.url;
            c.B = [];
            for (b = 0; b < d.length; ++b) a = d[b], a = {
                x: a.x,
                y: a.y,
                P: a.glyph
            }, c.B.push(a), a.path = R[a.P];
            n.fillStyle = c.fill;
            c.i = r(f, c.J);
            N(n, c.i);
            O(n, c);
            c.a.c = c.a.x + c.a.width;
            c.a.d = c.a.y + c.a.height;
            c.a.H = c.a.x + c.a.width / 2;
            c.a.I = c.a.y + c.a.height / 2;
            c.C = U(c.i);
            c.e = 0;
            a = c.J;
            b = Math.sqrt(a[0][0] * a[0][0] + a[1][0] * a[1][0]);
            d = Math.sqrt(a[0][1] * a[0][1] + a[1][1] * a[1][1]);
            a = 180 * Math.atan2(a[1][0], a[0][0]) / Math.PI;
            c.D = b;
            c.F = d;
            c.T = m.zoom ? Math.max(1.1 * c.D, 0.15 * Math.sqrt(u.width * u.height / (c.a.width * c.a.height))) :
                c.D;
            c.U = m.zoom ? Math.max(1.1 * c.F, 0.15 * Math.sqrt(u.width * u.height / (c.a.width * c.a.height))) : c.F;
            c.K = -a * Math.PI / 180;
            c.S = m.rotate ? 0 : c.K;
            c.n = 0;
            c.o = 0;
            c.f = H(c.a, r(c.i, V(c, 1)));
            0 > c.f.x && (c.n = -c.f.x);
            c.f.x + c.f.width > l.width && (c.n = -(c.f.x + c.f.width) + l.width);
            0 > c.f.y && (c.o = -c.f.y);
            c.f.y + c.f.height > l.height && (c.o = -(c.f.y + c.f.height) + l.height);
            c.Q = T(m.backgroundColor, c.fill, 0.2);
            z && c.fill && (attribution.backgroundColor = attribution.backgroundColor || {
                    k: 0,
                    j: 0,
                    h: 0
                }, c = M(c.fill), attribution.backgroundColor.k += c.k, attribution.backgroundColor.j +=
                c.j, attribution.backgroundColor.h += c.h)
        }
        m.A && (m.r = s(m.A, 1), m.r = m.r.substring(0, m.r.length - 7));
        S = n.getImageData(0, 0, l.width, l.height);
        if (z) {
            attribution.backgroundColor.k /= A.length;
            attribution.backgroundColor.j /= A.length;
            attribution.backgroundColor.h /= A.length;
            attribution.backgroundColor = "#" + (65536 * attribution.backgroundColor.k + 256 * attribution.backgroundColor.j + attribution.backgroundColor.h).toString(16);
            attribution.backgroundColor = s(attribution.backgroundColor, 0.8);
            attribution.t = m.backgroundColor;
            for (g = 0; g < attribution.data.tags.length; g++) c = attribution.data.tags[g], a = H(c.bbox, c.matrix), attribution.b = attribution.b ? {
                x: Math.min(a.x, attribution.b.x),
                y: Math.min(a.y, attribution.b.y),
                c: Math.max(a.x + a.width, attribution.b.c),
                d: Math.max(a.y + a.height, attribution.b.d)
            } : {
                x: a.x,
                y: a.y,
                c: a.x + a.width,
                d: a.y + a.height
            };
            attribution.b.width = attribution.b.c - attribution.b.x;
            attribution.b.height = attribution.b.d - attribution.b.y;
            f = Math.min(l.width / attribution.b.width, l.height / attribution.b.height);
            f = Math.min(f, Math.sqrt(0.02 *
                l.width * l.height / (attribution.b.width * attribution.b.height)));
            c = attribution.data.tags[0];
            c.bbox.c = c.bbox.x + c.bbox.width;
            c.bbox.d = c.bbox.y + c.bbox.height;
            c.i = r(r([
                [f, 0, 0],
                [0, f, 0]
            ], w(-attribution.b.x + (l.width / f - 1 * attribution.b.width), -attribution.b.y + (l.height / f - 0 * attribution.b.height))), c.matrix);
            c.n = 0;
            c.o = -attribution.b.height * f;
            c.C = U(r(w(1 * c.n, 1 * c.o), c.i));
            for (b = 0; b < c.glyphs.length; ++b) c.glyphs[b].path = attribution.data.outlines[c.glyphs[b].glyph].split(" ")
        }
    }

    function Y() {
        if (q && 0 < q.length || z && attribution.q) {
            for (var b =
                    q.slice(), d = 0; d < t.length; d++) - 1 == b.indexOf(t[d]) && b.push(t[d]);
            g && n.putImageData(S, 0, 0, g.x - 2, g.y - 2, g.width + 4, g.height + 4);
            g = void 0;
            for (d = 0; d < b.length; d++) {
                var a = b[d];
                n.fillStyle = a.Q;
                N(n, a.i);
                O(n, a)
            }
            for (var f = J(), d = 0; d < b.length; d++) {
                var a = b[d],
                    e = (f - a.e) / (1E3 * m.l),
                    e = 1 < e ? 1 : e;
                if (0.5 < e && a != C && a.g == F) {
                    var c = t.indexOf(a); - 1 != c && (t.splice(c, 1), -1 == q.indexOf(a) && q.push(a), -1 == b.indexOf(a) && b.push(a));
                    a.g = K;
                    e = 1 - e;
                    a.e = f - 1E3 * e * m.l
                }
                a.g == K && (e = 1 - e);
                0 < e ? (c = r(a.i, V(a, e)), c = r(w(e * a.n, e * a.o), c)) : c = a.i;
                N(n, c);
                g ? (c = H(a.a,
                    c), g = {
                    x: Math.min(g.x, c.x),
                    y: Math.min(g.y, c.y),
                    c: Math.max(g.c, c.x + c.width),
                    d: Math.max(g.d, c.y + c.height)
                }, g.width = g.c - g.x, g.height = g.d - g.y) : (g = H(a.a, c), g.c = g.x + g.width, g.d = g.y + g.height);
                m.A && (n.fillStyle = m.r + (e * m.O).toFixed(4) + ")", W(n, a.a.x, a.a.y, a.a.width, a.a.height));
                n.fillStyle = m.t ? T(a.fill, m.t, e) : a.fill;
                O(n, a);
                f > a.e + 1E3 * m.l && (b.splice(d, 1), d < q.length && q.splice(d, 1), d--, a.g == F && -1 == t.indexOf(a) && t.push(a))
            }
            z && (attribution.q || g) && (a = attribution.data.tags[0], e = (f - attribution.e) / attribution.l, e = 1 < e ?
                1 : e, 1 <= e && (attribution.q = !1), attribution.g == K && (e = 1 - e), c = r(w(e * a.n, e * a.o), a.i), g ? (c = H(a.bbox, c), g = {
                    x: Math.min(g.x, c.x),
                    y: Math.min(g.y, c.y),
                    c: Math.max(g.c, c.x + c.width),
                    d: Math.max(g.d, c.y + c.height)
                }, g.width = g.c - g.x, g.height = g.d - g.y) : (g = H(a.bbox, c), g.c = g.x + g.width, g.d = g.y + g.height), n.fillStyle = attribution.backgroundColor, N(n, r(w(e * a.n, e * a.o), a.i)), W(n, a.bbox.x, a.bbox.y, a.bbox.width, a.bbox.height), n.fillStyle = attribution.t, O(n, a))
        }
        P && P.request(Y)
    }
    if (!h)
        if (e)
            if (h = document.createElement("canvas"), h.getContext &&
                h.getContext("2d")) {
                for (var D = 0; document.getElementById(h = "tagul_embed_cloud_" + D);) D++;
                document.writeln('<a id="' + h + '" style="width: 100%; height: 100%">');
                document.writeln('<canvas style="width: 100%; height: 100%"></canvas>');
                document.writeln("</a>");
                var D = document.getElementsByTagName("head")[0],
                    L = document.createElement("style"),
                    Z = document.createTextNode("#" + h + " {outline: 0; border: 0; background: none; margin: 0; padding: 0;}\n#" + h + ":hover {border: 0;}\n");
                L.type = "text/css";
                L.styleSheet ? L.styleSheet.cssText =
                    Z.nodeValue : L.appendChild(Z);
                D.appendChild(L)
            } else {
                document.writeln('<a href="http://tagul.com/unsupported-browser" style="width: 100%; height: 100%">');
                document.writeln('<img src="http://tagul.com/static/please_update_browser.png" style="width: 100%; height: auto"/>');
                document.writeln("</a>");
                return
            } else {
        document.writeln("<div>Sorry! Cloud does not exist!</div>");
        return
    }
    var z = !1,
        u = {
            x: e.viewBox.x,
            y: e.viewBox.y,
            width: e.viewBox.width,
            height: e.viewBox.height
        },
        A = [],
        R = {},
        D = {};
    v = "boolean" == typeof v ? v : !0;
    var I, g, S, C = null,
        q = [],
        t = [],
        F = 0,
        K = 1;
    D.cleanUp = function() {
        n = x = null;
        l.onmousemove = null;
        l.onmouseout = null;
        R = A = u = m = P = t = q = C = S = g = l = window.onresize = null
    };
    var x = document.getElementById(h),
        l = x.getElementsByTagName("canvas")[0];
    window.onresize = function() {
        B();
        X()
    };
    B();
    var n = l.getContext("2d");
    n.clearRect(0, 0, l.width, l.height);
    z && (l.onmouseover = E);
    l.onmousemove = function(b) {
        var d = l,
            a = 0,
            e = 0;
        if (void 0 !== d.offsetParent) {
            do a += d.offsetLeft, e += d.offsetTop; while (d = d.offsetParent)
        }
        a += $ + aa + ba;
        e += ca + da + ea;
        b = {
            x: (b.pageX -
                a) * I,
            y: (b.pageY - e) * I
        };
        if (z && (d = attribution.data.tags[0], a = G(b, d.C), d = d.a, !(a.x < d.x || a.x > d.c || a.y < d.y || a.y > d.d))) {
            l.style.cursor = "pointer";
            x.href = attribution.url;
            x.target = "_blank";
            C = null;
            return
        }
        for (d = A.length - 1; 0 <= d && (e = A[d], a = G(b, e.C), e = e.a, a.x < e.x || a.x > e.c || a.y < e.y || a.y > e.d); d--);
        d = 0 <= d ? A[d] : null;
        null != d ? l.style.cursor = "pointer" : (l.style.cursor = "auto", x.removeAttribute("href"));
        if (d != C) {
            for (b = 0; b < t.length; b++) - 1 == q.indexOf(t[b]) && q.push(t[b]);
            t = []
        }
        d != C && null != d && (d.url ? (x.href = d.url, x.target = m.R ||
            Q ? "_blank" : "_self") : (x.target = "_self", x.href = "javascript:void(0);"), null != d && d.g != F && (d.g = F, b = J(), d.e = b - Math.max(1E3 * m.l - (b - d.e), 0), -1 == q.indexOf(d) && q.push(d)));
        C = d
    };
    l.onmouseout = function() {
        for (var b = 0; b < q.length; b++) {
            var d = q[b];
            if (d.g == F) {
                d.g = K;
                var a = J();
                d.e = a - Math.max(1E3 * m.l - (a - d.e), 0);
                C = null
            }
        }
        z && (attribution.g = K, a = J(), attribution.e = a - Math.max(attribution.l - (a - attribution.e), 0), attribution.q = !0)
    };
    var P = P || new window.AnimationFrame(60),
        $ = parseInt(document.defaultView.getComputedStyle(l, void 0).paddingLeft,
            10) || 0,
        ca = parseInt(document.defaultView.getComputedStyle(l, void 0).paddingTop, 10) || 0,
        aa = parseInt(document.defaultView.getComputedStyle(l, void 0).borderLeftWidth, 10) || 0,
        da = parseInt(document.defaultView.getComputedStyle(l, void 0).borderTopWidth, 10) || 0;
    h = document.body.parentNode;
    ea = h.offsetTop;
    ba = h.offsetLeft;
    void 0 === e.styleOptions && (e.styleOptions = {});
    var m = {
            backgroundColor: e.styleOptions.backgroundColor ? "#" + e.styleOptions.backgroundColor : "#FFFFFF",
            N: p(e.styleOptions.backgroundColorAlpha) ? e.styleOptions.backgroundColorAlpha : 1,
            l: p(e.styleOptions.animationSpeed) ? e.styleOptions.animationSpeed : 0.3,
            t: e.styleOptions.textColor ? "#" + e.styleOptions.textColor : void 0,
            Z: p(e.styleOptions.textAlpha) ? e.styleOptions.textAlpha : 1,
            A: e.styleOptions.boxColor ? "#" + e.styleOptions.boxColor : void 0,
            O: p(e.styleOptions.boxAlpha) ? e.styleOptions.boxAlpha : 0.8,
            zoom: !0 == e.styleOptions.zoom,
            rotate: !0 == e.styleOptions.rotate,
            R: !0 == e.styleOptions.openLinksInNewWindow
        },
        $, ca, aa, da, ea, ba;
    X();
    v && Y();
    return D
};
TagulDisplayCloud(
    {
    "tags": [{
        "shapeColor": "f24f44",
        "fc": 1,
        "fill": "#e4393c",
        "textId": 0,
        "matrix": [
            [0.07468619, 0, 81.61129707],
            [0, 0.07468619, 70.18441423]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 26,
        "fill": "#e4393c",
        "textId": 1,
        "matrix": [
            [0.06721757, 0, 172.77734104],
            [0, 0.06721757, 43.621004]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 21,
        "fill": "#e4393c",
        "textId": 2,
        "matrix": [
            [0.04623431, 0, 92.47330121],
            [0, 0.04623431, 99.68420502]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 22,
        "fill": "#e4393c",
        "textId": 3,
        "matrix": [
            [0.06020833, 0, 110.68893363],
            [0, 0.06020833, 31.97895833]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 23,
        "fill": "#e4393c",
        "textId": 4,
        "matrix": [
            [0.05290456, 0, 20.42655968],
            [0, 0.05290456, 61.28786307]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 24,
        "fill": "#e4393c",
        "textId": 5,
        "matrix": [
            [0.0425, 0, 107.11591006],
            [0, 0.0425, 110.825]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 15,
        "fill": "#d25a5c",
        "textId": 6,
        "matrix": [
            [0.03895833, 0, 5.62170044],
            [0, 0.03895833, 76.00625]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 16,
        "fill": "#d25a5c",
        "textId": 7,
        "matrix": [
            [0.04623431, 0, 193.39277056],
            [0, 0.04623431, 26.63797071]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 17,
        "fill": "#d25a5c",
        "textId": 8,
        "matrix": [
            [0.025, 0, 92.69995394],
            [0, 0.025, 78.775]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 18,
        "fill": "#d25a5c",
        "textId": 9,
        "matrix": [
            [0.0425, 0, 208.54086678],
            [0, 0.0425, 55.825]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 19,
        "fill": "#d25a5c",
        "textId": 10,
        "matrix": [
            [0.03928571, 0, 3.1281382],
            [0, 0.03928571, 86.075]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 20,
        "fill": "#d25a5c",
        "textId": 11,
        "matrix": [
            [0.03556485, 0, 19.48068493],
            [0, 0.03556485, 48.2541841]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 9,
        "fill": "#ff761a",
        "textId": 12,
        "matrix": [
            [0.03200837, 0, 161.3200363],
            [0, 0.03200837, 53.39675732]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 10,
        "fill": "#ff761a",
        "textId": 13,
        "matrix": [
            [0.04623431, 0, 74.59778502],
            [0, 0.04623431, 41.63797071]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 11,
        "fill": "#e8a1a1",
        "textId": 14,
        "matrix": [
            [0.03507905, 0, 71.46936759],
            [0, 0.03507905, 51.1242946]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 12,
        "fill": "#ff761a",
        "textId": 15,
        "matrix": [
            [0.031875, 0, 125.30595125],
            [0, 0.031875, 151.36875]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 13,
        "fill": "#ff761a",
        "textId": 16,
        "matrix": [
            [0.02833333, 0, 143.59679327],
            [0, 0.02833333, 17.55]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 14,
        "fill": "#ff761a",
        "textId": 17,
        "matrix": [
            [0.02821577, 0, 124.78938987],
            [0, 0.02821577, 118.55352697]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 4,
        "fill": "#f97497",
        "textId": 18,
        "matrix": [
            [0.02857143, 0, 157.66866086],
            [0, 0.02857143, 88.57142857]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 5,
        "fill": "#f97497",
        "textId": 19,
        "matrix": [
            [0.02845188, 0, 81.53748257],
            [0, 0.02845188, 30.54644351]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 6,
        "fill": "#f97497",
        "textId": 20,
        "matrix": [
            [0.025, 0, 158.35191712],
            [0, 0.025, 60.725]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 7,
        "fill": "#f97497",
        "textId": 21,
        "matrix": [
            [0.0246888, 0, 218.76586036],
            [0, 0.0246888, 62.7343361]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 8,
        "fill": "#f97497",
        "textId": 22,
        "matrix": [
            [0.02133891, 0, 14.29797715],
            [0, 0.02133891, 92.95251046]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 27,
        "fill": "#e8a1a1",
        "textId": 23,
        "matrix": [
            [0.02133891, 0, 216.095829],
            [0, 0.02133891, 15.90983264]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 28,
        "fill": "#e8a1a1",
        "textId": 24,
        "matrix": [
            [0.0248954, 0, 133.30902099],
            [0, 0.0248954, 132.72813808]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 29,
        "fill": "#e8a1a1",
        "textId": 25,
        "matrix": [
            [0.01770833, 0, 16.60838229],
            [0, 0.01770833, 67.09375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 30,
        "fill": "#e8a1a1",
        "textId": 26,
        "matrix": [
            [0.01743028, 0, 117.21812749],
            [0, 0.01743028, 18.09108961]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 31,
        "fill": "#e8a1a1",
        "textId": 27,
        "matrix": [
            [0.01661184, 0, 67.25871711],
            [0, 0.01661184, 90.86892094]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 3,
        "fill": "#e2bdbd",
        "textId": 28,
        "matrix": [
            [0.01402299, 0, 157.1737931],
            [0, 0.01402299, 65.24039734]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 1,
        "fill": "#e2bdbd",
        "textId": 29,
        "matrix": [
            [0.01785714, 0, 174.73096978],
            [0, 0.01785714, 81.10714286]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 2,
        "fill": "#e2bdbd",
        "textId": 30,
        "matrix": [
            [0.02845188, 0, 124.56864134],
            [0, 0.02845188, 71.54644351]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "fill": "#e4393c",
        "textId": 0,
        "matrix": [
            [0.01778243, 0, 13.90581536],
            [0, 0.01778243, 40.0915272]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 26,
        "fill": "#e4393c",
        "textId": 1,
        "matrix": [
            [0.01807654, 0, 133.38038771],
            [0, 0.01807654, 124.93451486]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 21,
        "fill": "#e4393c",
        "textId": 2,
        "matrix": [
            [0.01066946, 0, 177.95699393],
            [0, 0.01066946, 15.46558577]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 22,
        "fill": "#e4393c",
        "textId": 3,
        "matrix": [
            [0.01610505, 0, 144.24615956],
            [0, 0.01610505, 53.80207104]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 23,
        "fill": "#e4393c",
        "textId": 4,
        "matrix": [
            [0.01597837, 0, 90.26315143],
            [0, 0.01597837, 105.09325347]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 24,
        "fill": "#e4393c",
        "textId": 5,
        "matrix": [
            [0.01416667, 0, 73.59393435],
            [0, 0.01416667, 95.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 15,
        "fill": "#d25a5c",
        "textId": 6,
        "matrix": [
            [0.01416667, 0, 61.29721628],
            [0, 0.01416667, 86.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 16,
        "fill": "#d25a5c",
        "textId": 7,
        "matrix": [
            [0.01626627, 0, 65.26113614],
            [0, 0.01626627, 66.99183614]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 17,
        "fill": "#d25a5c",
        "textId": 8,
        "matrix": [
            [0.01071429, 0, 151.52954148],
            [0, 0.01071429, 35.475]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 18,
        "fill": "#d25a5c",
        "textId": 9,
        "matrix": [
            [0.01416667, 0, 220.76833896],
            [0, 0.01416667, 10.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 19,
        "fill": "#d25a5c",
        "textId": 10,
        "matrix": [
            [0.01428571, 0, 182.26414403],
            [0, 0.01428571, 76.3]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 20,
        "fill": "#d25a5c",
        "textId": 11,
        "matrix": [
            [0.01422594, 0, 158.38432951],
            [0, 0.01422594, 69.30167364]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 9,
        "fill": "#ff761a",
        "textId": 12,
        "matrix": [
            [0.01422594, 0, 141.45759642],
            [0, 0.01422594, 89.2874477]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 10,
        "fill": "#ff761a",
        "textId": 13,
        "matrix": [
            [0.01778243, 0, 240.21760542],
            [0, 0.01778243, 46.0915272]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 11,
        "fill": "#e8a1a1",
        "textId": 14,
        "matrix": [
            [0.01416667, 0, 138.19635789],
            [0, 0.01416667, 76.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 12,
        "fill": "#ff761a",
        "textId": 15,
        "matrix": [
            [0.01416667, 0, 110.9415559],
            [0, 0.01416667, 37.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 13,
        "fill": "#ff761a",
        "textId": 16,
        "matrix": [
            [0.01416667, 0, 94.90469282],
            [0, 0.01416667, 23.275]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 14,
        "fill": "#ff761a",
        "textId": 17,
        "matrix": [
            [0.01410788, 0, 161.05743069],
            [0, 0.01410788, 41.27676349]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 4,
        "fill": "#f97497",
        "textId": 18,
        "matrix": [
            [0.01428571, 0, 68.67007546],
            [0, 0.01428571, 71.28571429]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 5,
        "fill": "#f97497",
        "textId": 19,
        "matrix": [
            [0.01422594, 0, 6.24770861],
            [0, 0.01422594, 60.27322176]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 6,
        "fill": "#f97497",
        "textId": 20,
        "matrix": [
            [0.01359026, 0, 111.0010142],
            [0, 0.01359026, 115.15795526]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 7,
        "fill": "#f97497",
        "textId": 21,
        "matrix": [
            [0.0132542, 0, 70.18071217],
            [0, 0.0132542, 31.12275007]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 8,
        "fill": "#f97497",
        "textId": 22,
        "matrix": [
            [0.01324111, 0, 56.23379447],
            [0, 0.01324111, 82.26132943]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 27,
        "fill": "#e8a1a1",
        "textId": 23,
        "matrix": [
            [0.01344032, 0, 7.2327984],
            [0, 0.01344032, 56.21832671]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 28,
        "fill": "#e8a1a1",
        "textId": 24,
        "matrix": [
            [0.01626826, 0, 240.24485392],
            [0, 0.01626826, 41.02261071]
        ]
    }, {
        "shapeColor": "f25146",
        "fc": 1,
        "parentId": 29,
        "fill": "#e8a1a1",
        "textId": 25,
        "matrix": [
            [0.00854847, 0, 201.15661227],
            [0, 0.00854847, 59.11998167]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 30,
        "fill": "#e8a1a1",
        "textId": 26,
        "matrix": [
            [0.00966135, 0, 186.13804781],
            [0, 0.00966135, 72.4429551]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 31,
        "fill": "#e8a1a1",
        "textId": 27,
        "matrix": [
            [0.00957237, 0, 159.15799342],
            [0, 0.00957237, 45.48335431]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 3,
        "fill": "#e2bdbd",
        "textId": 28,
        "matrix": [
            [0.00836207, 0, 77.14974138],
            [0, 0.00836207, 75.19249069]
        ]
    }, {
        "shapeColor": "f25045",
        "fc": 1,
        "parentId": 1,
        "fill": "#e2bdbd",
        "textId": 29,
        "matrix": [
            [0.0122894, 0, 51.20168484],
            [0, 0.0122894, 39.26766221]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 2,
        "fill": "#e2bdbd",
        "textId": 30,
        "matrix": [
            [0.02133891, 0, 5.51272203],
            [0, 0.02133891, 65.90983264]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "fill": "#e4393c",
        "textId": 0,
        "matrix": [
            [0.01225296, 0, 8.20197628],
            [0, 0.01225296, 52.2093769]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 26,
        "fill": "#e4393c",
        "textId": 1,
        "matrix": [
            [0.010625, 0, 223.75082437],
            [0, 0.010625, 6.466875]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 21,
        "fill": "#e4393c",
        "textId": 2,
        "matrix": [
            [0.00818335, 0, 13.16771654],
            [0, 0.00818335, 35.02174155]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 22,
        "fill": "#e4393c",
        "textId": 3,
        "matrix": [
            [0.010625, 0, 172.48819084],
            [0, 0.010625, 28.466875]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 23,
        "fill": "#e4393c",
        "textId": 4,
        "matrix": [
            [0.01058091, 0, 162.42466004],
            [0, 0.01058091, 103.45757261]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 24,
        "fill": "#e4393c",
        "textId": 5,
        "matrix": [
            [0.010625, 0, 102.16646548],
            [0, 0.010625, 54.45625]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 15,
        "fill": "#d25a5c",
        "textId": 6,
        "matrix": [
            [0.010625, 0, 78.22641035],
            [0, 0.010625, 98.45625]
        ]
    }, {
        "shapeColor": "f25247",
        "fc": 1,
        "parentId": 16,
        "fill": "#d25a5c",
        "textId": 7,
        "matrix": [
            [0.01066946, 0, 193.96135674],
            [0, 0.01066946, 67.45491632]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 17,
        "fill": "#d25a5c",
        "textId": 8,
        "matrix": [
            [0.00714286, 0, 202.18732387],
            [0, 0.00714286, 29.65]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 18,
        "fill": "#d25a5c",
        "textId": 9,
        "matrix": [
            [0.010625, 0, 9.70811252],
            [0, 0.010625, 47.45625]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 19,
        "fill": "#d25a5c",
        "textId": 10,
        "matrix": [
            [0.01031746, 0, 131.20714286],
            [0, 0.01031746, 55.10718847]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 20,
        "fill": "#d25a5c",
        "textId": 11,
        "matrix": [
            [0.01046627, 0, 240.13080357],
            [0, 0.01046627, 36.43894273]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 9,
        "fill": "#ff761a",
        "textId": 12,
        "matrix": [
            [0.01061368, 0, 96.15070423],
            [0, 0.01061368, 108.45858395]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 10,
        "fill": "#ff761a",
        "textId": 13,
        "matrix": [
            [0.01245033, 0, 10.18794702],
            [0, 0.01245033, 43.98904673]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 11,
        "fill": "#e8a1a1",
        "textId": 14,
        "matrix": [
            [0.0104249, 0, 37.14160079],
            [0, 0.0104249, 42.42516305]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 12,
        "fill": "#ff761a",
        "textId": 15,
        "matrix": [
            [0.00958835, 0, 197.14829317],
            [0, 0.00958835, 63.273661]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 13,
        "fill": "#ff761a",
        "textId": 16,
        "matrix": [
            [0.00959799, 0, 196.11942211],
            [0, 0.00959799, 16.36997712]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 14,
        "fill": "#ff761a",
        "textId": 17,
        "matrix": [
            [0.00955956, 0, 175.15808308],
            [0, 0.00955956, 92.44489686]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 4,
        "fill": "#f97497",
        "textId": 18,
        "matrix": [
            [0.00954046, 0, 170.15821678],
            [0, 0.00954046, 31.3808113]
        ]
    }, {
        "shapeColor": "f25045",
        "fc": 1,
        "parentId": 5,
        "fill": "#f97497",
        "textId": 19,
        "matrix": [
            [0.00955956, 0, 161.13896396],
            [0, 0.00955956, 106.31735999]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 6,
        "fill": "#f97497",
        "textId": 20,
        "matrix": [
            [0.0096856, 0, 152.01191684],
            [0, 0.0096856, 49.27661936]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 7,
        "fill": "#f97497",
        "textId": 21,
        "matrix": [
            [0.00944609, 0, 136.13998516],
            [0, 0.00944609, 136.42887764]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 8,
        "fill": "#f97497",
        "textId": 22,
        "matrix": [
            [0.00943676, 0, 134.17781621],
            [0, 0.00943676, 13.29340253]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 27,
        "fill": "#e8a1a1",
        "textId": 23,
        "matrix": [
            [0.00957874, 0, 104.17710632],
            [0, 0.00957874, 19.37836653]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 28,
        "fill": "#e8a1a1",
        "textId": 24,
        "matrix": [
            [0.01066946, 0, 83.95910349],
            [0, 0.01066946, 101.45491632]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 29,
        "fill": "#e8a1a1",
        "textId": 25,
        "matrix": [
            [0.00708333, 0, 184.81989531],
            [0, 0.00708333, 29.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 30,
        "fill": "#e8a1a1",
        "textId": 26,
        "matrix": [
            [0.00708333, 0, 225.34072805],
            [0, 0.00708333, 65.64458333]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 31,
        "fill": "#e8a1a1",
        "textId": 27,
        "matrix": [
            [0.00711297, 0, 111.66467586],
            [0, 0.00711297, 81.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 3,
        "fill": "#e2bdbd",
        "textId": 28,
        "matrix": [
            [0.00705394, 0, 171.72892369],
            [0, 0.00705394, 12.62427386]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 1,
        "fill": "#e2bdbd",
        "textId": 29,
        "matrix": [
            [0.00946482, 0, 74.14928147],
            [0, 0.00946482, 57.23571154]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 2,
        "fill": "#e2bdbd",
        "textId": 30,
        "matrix": [
            [0.01422594, 0, 219.21566594],
            [0, 0.01422594, 40.27322176]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "fill": "#e4393c",
        "textId": 0,
        "matrix": [
            [0.00943676, 0, 74.14950593],
            [0, 0.00943676, 62.2321031]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 26,
        "fill": "#e4393c",
        "textId": 1,
        "matrix": [
            [0.00845921, 0, 38.23232628],
            [0, 0.00845921, 48.60313571]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 21,
        "fill": "#e4393c",
        "textId": 2,
        "matrix": [
            [0.00711297, 0, 129.21984198],
            [0, 0.00711297, 144.64372385]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 22,
        "fill": "#e4393c",
        "textId": 3,
        "matrix": [
            [0.00847374, 0, 240.15721011],
            [0, 0.00847374, 33.29106375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 23,
        "fill": "#e4393c",
        "textId": 4,
        "matrix": [
            [0.00840708, 0, 172.16615044],
            [0, 0.00840708, 25.25273928]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 24,
        "fill": "#e4393c",
        "textId": 5,
        "matrix": [
            [0.00708333, 0, 221.54509723],
            [0, 0.00708333, 46.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 15,
        "fill": "#d25a5c",
        "textId": 6,
        "matrix": [
            [0.00708333, 0, 192.95936193],
            [0, 0.00708333, 69.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 16,
        "fill": "#d25a5c",
        "textId": 7,
        "matrix": [
            [0.00855856, 0, 169.16509009],
            [0, 0.00855856, 22.4756705]
        ]
    }, {
        "shapeColor": "f3584d",
        "fc": 1,
        "parentId": 17,
        "fill": "#d25a5c",
        "textId": 8,
        "matrix": [
            [0.00714286, 0, 127.82671017],
            [0, 0.00714286, 35.65]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 18,
        "fill": "#d25a5c",
        "textId": 9,
        "matrix": [
            [0.00848214, 0, 164.14866071],
            [0, 0.00848214, 82.42080952]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 19,
        "fill": "#d25a5c",
        "textId": 10,
        "matrix": [
            [0.00848214, 0, 158.14866071],
            [0, 0.00848214, 72.18489785]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 20,
        "fill": "#d25a5c",
        "textId": 11,
        "matrix": [
            [0.00848214, 0, 150.14866071],
            [0, 0.00848214, 144.0789214]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 9,
        "fill": "#ff761a",
        "textId": 12,
        "matrix": [
            [0.00860161, 0, 132.16478873],
            [0, 0.00860161, 89.26699366]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 10,
        "fill": "#ff761a",
        "textId": 13,
        "matrix": [
            [0.01066946, 0, 119.34751331],
            [0, 0.01066946, 55.45491632]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 11,
        "fill": "#e8a1a1",
        "textId": 14,
        "matrix": [
            [0.00844862, 0, 84.15741107],
            [0, 0.00844862, 78.51190586]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 12,
        "fill": "#ff761a",
        "textId": 15,
        "matrix": [
            [0.00858434, 0, 75.1563253],
            [0, 0.00858434, 54.25078405]
        ]
    }, {
        "shapeColor": "f25146",
        "fc": 1,
        "parentId": 13,
        "fill": "#ff761a",
        "textId": 16,
        "matrix": [
            [0.00859296, 0, 54.13047739],
            [0, 0.00859296, 42.35495689]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 14,
        "fill": "#ff761a",
        "textId": 17,
        "matrix": [
            [0.00840841, 0, 5.24114114],
            [0, 0.00840841, 90.09925309]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 4,
        "fill": "#f97497",
        "textId": 18,
        "matrix": [
            [0.00714286, 0, 244.12550327],
            [0, 0.00714286, 58.64285714]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 5,
        "fill": "#f97497",
        "textId": 19,
        "matrix": [
            [0.00711297, 0, 230.13076118],
            [0, 0.00711297, 29.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 6,
        "fill": "#f97497",
        "textId": 20,
        "matrix": [
            [0.00714286, 0, 207.16115516],
            [0, 0.00714286, 16.63571429]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 7,
        "fill": "#f97497",
        "textId": 21,
        "matrix": [
            [0.00705394, 0, 205.27938494],
            [0, 0.00705394, 56.63838174]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 8,
        "fill": "#f97497",
        "textId": 22,
        "matrix": [
            [0.00711297, 0, 164.38925288],
            [0, 0.00711297, 37.65083682]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 27,
        "fill": "#e8a1a1",
        "textId": 23,
        "matrix": [
            [0.00711297, 0, 187.31628152],
            [0, 0.00711297, 17.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 28,
        "fill": "#e8a1a1",
        "textId": 24,
        "matrix": [
            [0.00942895, 0, 219.37456839],
            [0, 0.00942895, 31.47135264]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 29,
        "fill": "#e8a1a1",
        "textId": 25,
        "matrix": [
            [0.00708333, 0, 52.11472316],
            [0, 0.00708333, 78.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 30,
        "fill": "#e8a1a1",
        "textId": 26,
        "matrix": [
            [0.00708333, 0, 96.32859013],
            [0, 0.00708333, 81.64458333]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 31,
        "fill": "#e8a1a1",
        "textId": 27,
        "matrix": [
            [0.00711297, 0, 123.21265846],
            [0, 0.00711297, 120.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 3,
        "fill": "#e2bdbd",
        "textId": 28,
        "matrix": [
            [0.00705394, 0, 88.71025595],
            [0, 0.00705394, 54.62427386]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 1,
        "fill": "#e2bdbd",
        "textId": 29,
        "matrix": [
            [0.00714286, 0, 184.30149946],
            [0, 0.00714286, 56.64285714]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 2,
        "fill": "#e2bdbd",
        "textId": 30,
        "matrix": [
            [0.01300813, 0, 158.19593496],
            [0, 0.01300813, 92.12928219]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "fill": "#e4393c",
        "textId": 0,
        "matrix": [
            [0.00711297, 0, 155.36771544],
            [0, 0.00711297, 113.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 26,
        "fill": "#e4393c",
        "textId": 1,
        "matrix": [
            [0.00708333, 0, 184.5717899],
            [0, 0.00708333, 31.64458333]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 21,
        "fill": "#e4393c",
        "textId": 2,
        "matrix": [
            [0.00711297, 0, 93.12427934],
            [0, 0.00711297, 89.64372385]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 22,
        "fill": "#e4393c",
        "textId": 3,
        "matrix": [
            [0.00708333, 0, 20.09764659],
            [0, 0.00708333, 95.64458333]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 23,
        "fill": "#e4393c",
        "textId": 4,
        "matrix": [
            [0.00705394, 0, 173.31023838],
            [0, 0.00705394, 96.63838174]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 24,
        "fill": "#e4393c",
        "textId": 5,
        "matrix": [
            [0.00708333, 0, 115.39308258],
            [0, 0.00708333, 117.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 15,
        "fill": "#d25a5c",
        "textId": 6,
        "matrix": [
            [0.00708333, 0, 110.61274882],
            [0, 0.00708333, 90.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 16,
        "fill": "#d25a5c",
        "textId": 7,
        "matrix": [
            [0.00711297, 0, 154.17151604],
            [0, 0.00711297, 74.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 17,
        "fill": "#d25a5c",
        "textId": 8,
        "matrix": [
            [0.00546171, 0, 141.11176802],
            [0, 0.00546171, 34.3462071]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 18,
        "fill": "#d25a5c",
        "textId": 9,
        "matrix": [
            [0.00708333, 0, 138.81023001],
            [0, 0.00708333, 78.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 19,
        "fill": "#d25a5c",
        "textId": 10,
        "matrix": [
            [0.00714286, 0, 123.84618884],
            [0, 0.00714286, 89.65]
        ]
    }, {
        "shapeColor": "f25146",
        "fc": 1,
        "parentId": 20,
        "fill": "#d25a5c",
        "textId": 11,
        "matrix": [
            [0.00711297, 0, 111.49101195],
            [0, 0.00711297, 39.65083682]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 9,
        "fill": "#ff761a",
        "textId": 12,
        "matrix": [
            [0.00711297, 0, 58.33090858],
            [0, 0.00711297, 35.64372385]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 10,
        "fill": "#ff761a",
        "textId": 13,
        "matrix": [
            [0.01, 0, 87.135],
            [0, 0.01, 24.40626014]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 11,
        "fill": "#e8a1a1",
        "textId": 14,
        "matrix": [
            [0.00708333, 0, 108.95937342],
            [0, 0.00708333, 101.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 12,
        "fill": "#ff761a",
        "textId": 15,
        "matrix": [
            [0.00708333, 0, 73.19954553],
            [0, 0.00708333, 59.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 13,
        "fill": "#ff761a",
        "textId": 16,
        "matrix": [
            [0.00708333, 0, 60.25586397],
            [0, 0.00708333, 33.6375]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 14,
        "fill": "#ff761a",
        "textId": 17,
        "matrix": [
            [0.00705394, 0, 36.17810497],
            [0, 0.00705394, 88.63838174]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 4,
        "fill": "#f97497",
        "textId": 18,
        "matrix": [
            [0.00714286, 0, 59.48296529],
            [0, 0.00714286, 50.64285714]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 5,
        "fill": "#f97497",
        "textId": 19,
        "matrix": [
            [0.00711297, 0, 42.09894986],
            [0, 0.00711297, 50.63661088]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 6,
        "fill": "#f97497",
        "textId": 20,
        "matrix": [
            [0.00714286, 0, 41.02666209],
            [0, 0.00714286, 78.63571429]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 7,
        "fill": "#f97497",
        "textId": 21,
        "matrix": [
            [0.00705394, 0, 16.58989501],
            [0, 0.00705394, 32.63838174]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 8,
        "fill": "#f97497",
        "textId": 22,
        "matrix": [
            [0.00711297, 0, 219.22600997],
            [0, 0.00711297, 33.65083682]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 27,
        "fill": "#e8a1a1",
        "textId": 23,
        "matrix": [
            [0.00711297, 0, 213.23763688],
            [0, 0.00711297, 47.63661088]
        ]
    }, {
        "shapeColor": "f2544a",
        "fc": 1,
        "parentId": 28,
        "fill": "#e8a1a1",
        "textId": 24,
        "matrix": [
            [0.01002656, 0, 55.14478752],
            [0, 0.01002656, 47.45696968]
        ]
    }, {
        "shapeColor": "f24f44",
        "fc": 1,
        "parentId": 29,
        "fill": "#e8a1a1",
        "textId": 25,
        "matrix": [
            [0.00354167, 0, 239.38385681],
            [0, 0.00354167, 28.81875]
        ]
    }, {
        "shapeColor": "f25045",
        "fc": 1,
        "parentId": 30,
        "fill": "#e8a1a1",
        "textId": 26,
        "matrix": [
            [0.00511288, 0, 175.10398406],
            [0, 0.00511288, 94.34894385]
        ]
    }],
    "outlines": {
        "31.1690": "M 100 -208 L 121 -205 Q 120 -201 116 -192 Q 113 -183 111 -178 L 247 -178 L 247 -161 L 103 -161 Q 86 -126 65 -96 L 65 27 L 47 27 L 47 -72 Q 33 -56 19 -42 Q 15 -51 7 -60 Q 53 -100 82 -161 L 19 -161 L 19 -178 L 90 -178 Q 97 -193 100 -208 M 150 -145 L 169 -145 L 169 -96 L 233 -96 L 233 -79 L 169 -79 L 169 -6 L 247 -6 L 247 9 L 74 9 L 74 -6 L 150 -6 L 150 -79 L 87 -79 L 87 -96 L 150 -96 L 150 -145 Z ",
        "31.884": "M 58 -26 Q 108 -70 131 -140 L 75 -140 L 75 -158 L 145 -158 L 145 -207 L 164 -207 L 164 -158 L 239 -158 L 239 -140 L 178 -140 Q 202 -65 250 -32 Q 245 -28 236 -14 Q 183 -64 164 -140 L 164 -38 L 202 -38 L 202 -21 L 164 -21 L 164 28 L 145 28 L 145 -21 L 107 -21 L 107 -38 L 145 -38 L 145 -140 Q 129 -69 72 -10 Q 63 -22 58 -26 M 6 -91 Q 42 -139 62 -208 L 80 -202 Q 70 -169 56 -140 L 56 28 L 38 28 L 38 -105 Q 36 -101 31 -94 Q 27 -87 15 -71 Q 14 -72 12 -78 Q 7 -90 6 -91 Z ",
        "31.1848": "M 8 10 Q 109 -34 115 -122 L 12 -122 L 12 -141 L 116 -141 Q 116 -177 116 -207 L 138 -207 Q 138 -197 137 -171 Q 137 -149 137 -141 L 244 -141 L 244 -122 L 137 -122 Q 152 -26 249 4 Q 247 6 244 11 Q 237 19 234 25 Q 150 -8 128 -89 Q 112 -15 23 28 Q 20 25 15 19 Q 10 12 8 10 Z ",
        "31.22": "M 42 -109 L 48 -170 L 134 -170 L 134 -190 L 31 -190 L 19 -85 L 34 -82 Q 47 -103 78 -104 Q 120 -102 122 -56 Q 120 -7 77 -5 Q 39 -6 33 -48 L 11 -42 Q 22 12 79 12 Q 142 10 144 -58 Q 140 -121 82 -124 Q 60 -124 42 -109 Z ",
        "31.2996": "M 143 -188 Q 190 -188 236 -198 L 242 -179 Q 208 -174 161 -171 L 161 -114 L 249 -114 L 249 -98 L 214 -98 L 214 27 L 196 27 L 196 -98 L 161 -98 L 161 -90 Q 163 -14 125 28 Q 119 21 112 13 Q 144 -20 143 -92 L 143 -188 M 64 -102 L 81 -102 L 81 -79 L 129 -79 L 129 -63 L 81 -63 L 81 -1 Q 82 24 52 24 Q 40 24 33 24 Q 32 16 30 6 Q 35 7 52 7 Q 64 7 64 -5 L 64 -63 L 14 -63 L 14 -79 L 64 -79 L 64 -102 M 8 -123 L 78 -123 Q 94 -146 102 -162 L 120 -152 Q 108 -137 97 -123 L 135 -123 L 135 -108 L 8 -108 L 8 -123 M 57 -202 L 72 -209 Q 82 -193 87 -183 L 80 -180 L 129 -180 L 129 -164 L 15 -164 L 15 -180 L 69 -180 Q 67 -185 60 -197 Q 58 -200 57 -202 M 33 -53 L 49 -45 Q 47 -41 43 -33 Q 30 -7 24 3 Q 10 -3 8 -4 Q 21 -26 33 -53 M 102 -52 Q 113 -39 126 -18 L 111 -7 Q 100 -26 88 -42 L 102 -52 M 28 -153 L 41 -162 Q 44 -158 51 -148 Q 58 -139 62 -134 L 47 -124 Q 45 -127 42 -131 Q 37 -141 28 -153 Z ",
        "31.1051": "M 125 -211 L 145 -206 Q 144 -205 143 -202 Q 141 -200 140 -198 Q 187 -143 249 -120 Q 242 -109 236 -100 Q 223 -106 208 -115 L 208 -98 L 138 -98 L 138 -61 L 217 -61 L 217 -43 L 138 -43 L 138 0 L 238 0 L 238 16 L 18 16 L 18 0 L 118 0 L 118 -43 L 40 -43 L 40 -61 L 118 -61 L 118 -98 L 49 -98 L 49 -114 Q 47 -113 43 -110 Q 28 -101 19 -97 Q 14 -105 7 -115 Q 85 -154 125 -211 M 129 -184 Q 99 -147 51 -115 L 208 -115 Q 160 -146 129 -184 Z ",
        "31.2984": "M 8 -24 Q 34 -56 47 -98 L 10 -98 L 10 -115 L 51 -115 L 51 -208 L 68 -208 L 68 -115 L 108 -115 L 108 -98 L 68 -98 L 68 28 L 51 28 L 51 -69 Q 37 -30 15 -4 Q 12 -14 8 -24 M 192 -208 L 210 -208 L 210 -67 L 247 -72 L 249 -54 L 210 -50 L 210 28 L 192 28 L 192 -47 L 117 -38 L 114 -55 L 192 -65 L 192 -208 M 120 -111 L 130 -124 Q 145 -114 173 -93 L 161 -78 Q 155 -83 141 -95 Q 126 -106 120 -111 M 74 -133 Q 86 -160 93 -183 L 110 -178 Q 101 -154 89 -126 L 74 -133 M 125 -172 L 136 -185 Q 159 -168 177 -153 L 165 -138 Q 149 -154 125 -172 M 9 -178 L 24 -184 Q 33 -163 44 -135 L 27 -128 Q 16 -160 9 -178 M 69 -73 L 81 -83 Q 93 -70 109 -50 L 95 -39 Q 94 -40 86 -51 Q 74 -66 69 -73 Z ",
        "31.2233": "M 14 -45 L 119 -45 L 119 -63 L 36 -63 L 36 -145 L 220 -145 L 220 -63 L 136 -63 L 136 -45 L 242 -45 L 242 -30 L 154 -30 Q 190 -3 249 8 Q 243 17 239 26 Q 175 8 136 -26 L 136 29 L 119 29 L 119 -26 Q 80 7 17 27 Q 15 23 10 14 Q 8 11 7 10 Q 65 -3 102 -30 L 14 -30 L 14 -45 M 211 -210 L 226 -200 Q 222 -197 210 -189 Q 199 -181 194 -178 Q 213 -169 231 -158 L 217 -146 Q 211 -150 197 -159 Q 177 -172 168 -177 Q 192 -193 211 -210 M 69 -209 L 84 -199 Q 79 -196 68 -188 Q 56 -181 51 -177 Q 73 -166 84 -159 L 69 -147 Q 52 -160 24 -177 Q 51 -193 69 -209 M 135 -209 L 150 -198 Q 130 -184 118 -176 Q 135 -169 153 -158 L 141 -146 Q 131 -152 112 -164 Q 99 -172 92 -176 Q 117 -193 135 -209 M 136 -97 L 136 -78 L 203 -78 L 203 -97 L 136 -97 M 203 -131 L 136 -131 L 136 -112 L 203 -112 L 203 -131 M 53 -131 L 53 -112 L 119 -112 L 119 -131 L 53 -131 M 53 -97 L 53 -78 L 119 -78 L 119 -97 L 53 -97 Z ",
        "31.4599": "M 104 -194 L 232 -194 L 232 -80 L 196 -80 L 196 -7 Q 196 5 208 5 L 218 5 Q 227 6 229 -5 Q 232 -22 232 -36 Q 236 -35 241 -32 Q 247 -30 250 -29 Q 249 -24 248 -12 Q 246 -3 246 0 Q 241 22 222 22 L 205 22 Q 178 22 178 -6 L 178 -80 L 154 -80 Q 155 0 92 29 Q 90 27 86 21 Q 81 15 79 13 Q 137 -8 136 -80 L 104 -80 L 104 -194 M 122 -177 L 122 -97 L 214 -97 L 214 -177 L 122 -177 M 9 -144 L 9 -162 L 88 -162 L 88 -144 Q 75 -119 59 -99 L 59 29 L 41 29 L 41 -77 Q 29 -64 14 -50 Q 12 -58 9 -68 Q 8 -70 8 -71 Q 47 -103 67 -144 L 9 -144 M 36 -201 L 54 -209 Q 61 -198 73 -176 L 55 -167 Q 44 -188 36 -201 M 60 -84 L 72 -95 Q 78 -90 90 -79 Q 97 -72 99 -70 L 85 -57 Q 81 -61 68 -75 Q 63 -81 60 -84 Z ",
        "31.7117": "M 176 -143 Q 176 -137 175 -125 Q 175 -115 175 -110 Q 188 -28 250 7 Q 241 16 234 26 Q 182 -13 168 -69 Q 155 -10 91 29 Q 86 22 78 13 Q 125 -17 141 -49 Q 157 -79 156 -143 L 176 -143 M 93 -109 Q 119 -155 134 -209 L 154 -203 Q 148 -188 143 -172 L 244 -172 L 244 -155 Q 232 -130 218 -104 Q 213 -108 200 -112 Q 211 -130 223 -155 L 136 -155 Q 124 -125 110 -100 Q 103 -105 93 -109 M 4 -109 Q 29 -157 40 -209 L 59 -205 Q 55 -189 50 -172 L 97 -172 L 97 -155 L 80 -115 Q 66 -120 64 -121 L 79 -155 L 44 -155 Q 33 -125 21 -101 Q 14 -105 4 -109 M 94 -41 Q 95 -29 96 -20 Q 88 -16 68 -4 Q 59 0 54 3 Q 48 8 44 12 L 31 -3 Q 40 -12 39 -22 L 39 -123 L 57 -123 L 57 -18 Q 58 -19 60 -20 Q 84 -33 94 -41 Z ",
        "31.1347": "M 35 -101 L 162 -101 L 162 -16 L 54 -16 L 54 0 L 35 0 L 35 -101 M 25 -177 L 25 -195 L 234 -195 L 234 -9 Q 236 26 202 26 Q 181 26 156 26 Q 155 18 151 5 Q 166 6 197 6 Q 215 7 215 -10 L 215 -177 L 25 -177 M 54 -84 L 54 -33 L 143 -33 L 143 -84 L 54 -84 M 11 -148 L 195 -148 L 195 -130 L 11 -130 L 11 -148 Z ",
        "31.4141": "M 153 -102 L 186 -102 L 186 -172 L 152 -172 L 152 -189 L 239 -189 L 239 -172 L 204 -172 L 204 -102 L 238 -102 L 238 -85 L 204 -85 L 204 0 L 247 0 L 247 15 L 144 15 L 144 0 L 186 0 L 186 -85 L 153 -85 L 153 -102 M 8 -19 Q 10 -19 15 -20 Q 31 -21 41 -23 L 41 -98 L 10 -98 L 10 -115 L 41 -115 L 41 -171 L 8 -171 L 8 -188 L 92 -188 L 92 -171 L 59 -171 L 59 -115 L 88 -115 L 88 -98 L 59 -98 L 59 -25 Q 77 -28 94 -31 Q 93 -22 93 -13 Q 83 -12 52 -7 Q 21 -2 10 0 L 8 -19 M 126 -202 L 144 -202 Q 144 -167 144 -149 Q 144 -128 143 -111 Q 143 -55 134 -27 Q 126 2 101 30 Q 95 24 86 17 Q 109 -5 117 -31 Q 125 -57 126 -111 Q 126 -163 126 -202 M 95 -160 L 112 -160 Q 112 -107 109 -62 Q 100 -62 92 -62 Q 95 -105 95 -160 Z ",
        "31.701": "M 106 -204 L 127 -204 L 127 -131 L 227 -131 L 227 -112 L 127 -112 L 127 -3 L 246 -3 L 246 14 L 10 14 L 10 -3 L 106 -3 L 106 -204 Z ",
        "31.2319": "M 64 -51 L 64 -68 L 216 -68 L 216 -51 Q 188 -23 165 -9 Q 191 0 247 8 Q 241 17 237 27 Q 181 18 144 0 Q 105 19 52 30 Q 47 17 42 12 Q 99 1 124 -9 Q 100 -27 81 -51 L 64 -51 M 127 -206 L 146 -210 Q 147 -204 150 -194 Q 152 -186 153 -182 L 245 -182 L 245 -165 L 51 -165 L 51 -109 Q 51 -51 45 -25 Q 40 2 22 30 Q 20 28 15 24 Q 9 18 7 16 Q 24 -10 28 -33 Q 33 -55 33 -105 L 33 -182 L 133 -182 Q 130 -194 127 -206 M 179 -158 L 197 -158 L 197 -139 L 242 -139 L 242 -123 L 197 -123 L 197 -85 L 92 -85 L 92 -123 L 57 -123 L 57 -139 L 92 -139 L 92 -158 L 111 -158 L 111 -139 L 179 -139 L 179 -158 M 189 -51 L 104 -51 Q 122 -31 144 -19 Q 169 -32 189 -51 M 111 -123 L 111 -101 L 179 -101 L 179 -123 L 111 -123 Z ",
        "31.2039": "M 50 -51 Q 57 -61 73 -87 L 8 -87 L 8 -105 L 84 -105 Q 96 -126 107 -149 L 126 -141 Q 121 -134 112 -117 Q 107 -109 105 -105 L 248 -105 L 248 -87 L 196 -87 Q 183 -48 154 -24 Q 162 -21 177 -14 Q 195 -6 231 9 L 221 27 Q 211 23 194 14 Q 157 -3 137 -11 Q 99 13 27 29 Q 26 27 24 23 Q 22 20 17 9 Q 82 0 118 -20 Q 102 -27 68 -43 Q 56 -48 50 -51 M 110 -201 L 127 -211 Q 129 -207 134 -200 Q 144 -186 148 -178 L 138 -172 L 237 -172 L 237 -126 L 218 -126 L 218 -155 L 39 -155 L 39 -126 L 20 -126 L 20 -172 L 128 -172 Q 118 -192 110 -201 M 76 -57 Q 84 -53 103 -46 Q 124 -37 135 -32 Q 165 -55 176 -87 L 94 -87 Q 85 -72 76 -57 Z ",
        "31.5356": "M 21 -115 L 221 -115 Q 221 -110 220 -98 Q 219 -65 217 -49 Q 217 -3 171 -4 Q 157 -4 137 -4 Q 136 -8 135 -17 Q 133 -23 133 -24 Q 135 -24 142 -24 Q 159 -23 169 -23 Q 197 -20 198 -48 Q 199 -56 200 -78 Q 201 -92 201 -98 L 103 -98 L 103 29 L 83 29 L 83 -98 L 21 -98 L 21 -115 M 160 -207 L 179 -207 L 179 -175 L 247 -175 L 247 -157 L 179 -157 L 179 -131 L 160 -131 L 160 -157 L 95 -157 L 95 -131 L 76 -131 L 76 -157 L 9 -157 L 9 -175 L 76 -175 L 76 -207 L 95 -207 L 95 -175 L 160 -175 L 160 -207 Z ",
        "31.1566": "M 70 -74 L 79 -81 L 44 -81 L 44 -127 L 212 -127 L 212 -81 L 179 -81 L 189 -74 Q 187 -71 182 -66 Q 176 -60 174 -57 L 247 -57 L 247 -42 L 10 -42 L 10 -57 L 85 -57 Q 78 -64 70 -74 M 42 -28 L 214 -28 L 214 28 L 197 28 L 197 19 L 59 19 L 59 28 L 42 28 L 42 -28 M 31 -156 L 119 -156 L 119 -171 L 16 -171 L 16 -186 L 119 -186 L 119 -207 L 137 -207 L 137 -186 L 241 -186 L 241 -171 L 137 -171 L 137 -156 L 225 -156 L 225 -141 L 31 -141 L 31 -156 M 59 -13 L 59 5 L 197 5 L 197 -13 L 59 -13 M 61 -112 L 61 -95 L 195 -95 L 195 -112 L 61 -112 M 85 -81 Q 97 -69 106 -57 L 152 -57 Q 163 -69 172 -81 L 85 -81 Z ",
        "31.1150": "M 8 -132 L 67 -132 L 67 -173 Q 29 -169 17 -169 Q 15 -177 12 -186 Q 75 -191 131 -198 L 135 -181 Q 132 -181 118 -179 Q 97 -177 84 -175 L 84 -132 L 139 -132 L 139 -115 L 84 -115 L 84 28 L 67 28 L 67 -93 Q 46 -45 17 -10 Q 15 -14 12 -21 Q 9 -27 7 -32 Q 39 -66 60 -115 L 8 -115 L 8 -132 M 215 -204 L 234 -204 L 234 -4 Q 236 27 202 26 Q 179 26 171 26 Q 168 7 167 4 Q 186 6 196 6 Q 216 7 215 -11 L 215 -204 M 156 -180 L 174 -180 L 174 -27 L 156 -27 L 156 -180 M 86 -82 L 99 -94 Q 117 -79 141 -55 L 126 -40 Q 115 -54 86 -82 Z ",
        "31.2139": "M 90 -11 Q 98 -12 116 -12 Q 133 -13 142 -13 L 142 -35 L 81 -35 L 81 28 L 65 28 L 65 -48 L 142 -48 L 142 -64 L 77 -64 L 77 -108 L 142 -108 L 142 -123 Q 129 -123 103 -122 Q 76 -122 65 -121 Q 65 -123 63 -129 Q 62 -134 61 -136 Q 130 -136 231 -140 L 234 -126 Q 215 -125 157 -123 L 157 -108 L 223 -108 L 223 -64 L 157 -64 L 157 -48 L 239 -48 L 239 0 Q 241 27 212 27 Q 200 27 184 27 Q 184 21 180 11 Q 183 11 190 11 Q 201 12 209 12 Q 223 13 222 0 L 222 -35 L 157 -35 L 157 -14 Q 162 -14 172 -15 Q 181 -15 185 -15 Q 182 -21 179 -27 L 193 -32 Q 196 -27 201 -17 Q 208 -4 210 0 L 196 6 Q 195 5 194 2 Q 192 -1 191 -2 Q 180 -1 156 0 Q 111 1 93 3 L 90 -11 M 36 -198 L 234 -198 L 234 -151 L 53 -151 L 53 -110 Q 53 -56 47 -27 Q 41 0 22 29 Q 14 23 8 18 Q 25 -7 31 -32 Q 36 -56 36 -108 L 36 -198 M 53 -184 L 53 -165 L 219 -165 L 219 -184 L 53 -184 M 208 -95 L 157 -95 L 157 -77 L 208 -77 L 208 -95 M 92 -95 L 92 -77 L 142 -77 L 142 -95 L 92 -95 Z ",
        "31.711": "M 10 -145 L 42 -145 L 42 -194 L 62 -194 L 62 -145 L 108 -145 L 108 -205 L 127 -205 L 127 -145 L 191 -145 L 191 -205 L 210 -205 L 210 -145 L 245 -145 L 245 -127 L 210 -127 L 210 -40 L 108 -40 L 108 -127 L 62 -127 L 62 0 L 239 0 L 239 18 L 42 18 L 42 -127 L 10 -127 L 10 -145 M 127 -127 L 127 -58 L 191 -58 L 191 -127 L 127 -127 Z ",
        "31.3003": "M 233 -95 L 244 -81 Q 221 -67 198 -55 Q 210 -23 250 2 Q 249 3 248 5 Q 244 10 237 19 Q 174 -20 167 -115 Q 158 -113 143 -111 Q 141 -111 140 -111 L 140 -1 Q 144 -3 157 -8 Q 174 -16 183 -20 Q 183 -12 184 -1 Q 149 11 138 17 Q 128 22 125 25 L 114 10 Q 123 3 122 -9 L 122 -127 Q 167 -130 227 -144 L 237 -126 Q 222 -123 184 -117 Q 187 -90 193 -70 Q 219 -85 233 -95 M 48 -204 L 64 -209 Q 72 -190 77 -176 L 62 -171 L 109 -171 L 109 -154 L 53 -154 Q 52 -134 52 -119 L 99 -119 Q 99 -100 97 -47 Q 96 -25 96 -15 Q 96 22 64 20 Q 59 21 42 21 Q 41 17 39 9 Q 38 4 38 2 Q 44 3 61 3 Q 79 4 79 -16 Q 81 -66 81 -102 L 52 -102 Q 51 -15 19 28 Q 10 16 6 12 Q 25 -14 30 -44 Q 35 -74 35 -154 L 13 -154 L 13 -171 L 59 -171 Q 58 -176 54 -186 Q 50 -197 48 -204 M 97 -131 Q 127 -164 144 -210 L 162 -204 Q 157 -193 151 -182 L 243 -182 L 243 -165 L 142 -165 Q 133 -146 112 -120 Q 106 -126 97 -131 Z ",
        "31.16": "M 0 12 L 19 12 L 77 -194 L 58 -194 L 0 12 Z ",
        "31.6619": "M 124 -211 L 146 -206 Q 145 -205 143 -203 Q 141 -200 140 -199 Q 183 -149 249 -125 Q 240 -113 236 -107 Q 225 -111 205 -122 Q 202 -124 200 -125 L 200 -111 L 137 -111 L 137 -77 L 224 -77 L 224 -60 L 137 -60 L 137 1 L 241 1 L 241 19 L 16 19 L 16 1 L 119 1 L 119 -60 L 32 -60 L 32 -77 L 119 -77 L 119 -111 L 55 -111 L 55 -124 Q 47 -119 28 -109 Q 22 -106 19 -104 Q 17 -110 7 -122 Q 90 -160 124 -211 M 129 -186 Q 100 -153 61 -129 L 196 -129 Q 155 -154 129 -186 M 161 -16 Q 173 -26 198 -53 L 213 -42 Q 191 -18 176 -3 L 161 -16 M 45 -42 L 59 -53 Q 65 -47 77 -35 Q 88 -23 94 -16 L 78 -3 Q 59 -27 45 -42 Z ",
        "31.1779": "M 10 -86 L 59 -86 L 59 -167 L 18 -167 L 18 -182 L 59 -182 L 59 -209 L 77 -209 L 77 -182 L 180 -182 L 180 -209 L 198 -209 L 198 -182 L 239 -182 L 239 -167 L 198 -167 L 198 -86 L 246 -86 L 246 -70 L 175 -70 Q 198 -48 249 -29 Q 241 -19 236 -12 Q 212 -23 193 -35 L 193 -24 L 137 -24 L 137 0 L 232 0 L 232 16 L 24 16 L 24 0 L 119 0 L 119 -24 L 62 -24 L 62 -35 Q 43 -21 20 -9 Q 15 -16 8 -24 Q 53 -45 80 -70 L 10 -70 L 10 -86 M 119 -62 L 137 -62 L 137 -39 L 188 -39 Q 169 -52 153 -70 L 102 -70 Q 85 -52 67 -39 L 119 -39 L 119 -62 M 77 -103 L 77 -86 L 180 -86 L 180 -103 L 77 -103 M 77 -135 L 77 -118 L 180 -118 L 180 -135 L 77 -135 M 77 -167 L 77 -150 L 180 -150 L 180 -167 L 77 -167 Z ",
        "31.1528": "M 68 -153 L 82 -164 Q 86 -160 94 -152 Q 101 -144 105 -140 L 93 -130 L 145 -130 Q 151 -137 161 -152 Q 166 -159 169 -163 L 186 -153 Q 183 -150 178 -143 Q 171 -134 167 -130 L 227 -130 L 227 -2 Q 229 26 199 26 Q 183 26 166 26 Q 166 25 165 22 Q 164 11 162 6 Q 174 7 194 7 Q 210 8 209 -4 L 209 -114 L 45 -114 L 45 28 L 27 28 L 27 -130 L 89 -130 Q 88 -131 87 -132 Q 76 -146 68 -153 M 176 -7 L 80 -7 L 80 -72 L 176 -72 L 176 -7 M 113 -204 L 131 -209 Q 137 -196 142 -182 L 247 -182 L 247 -165 L 9 -165 L 9 -182 L 121 -182 Q 120 -187 115 -197 Q 114 -202 113 -204 M 97 -56 L 97 -22 L 159 -22 L 159 -56 L 97 -56 M 141 -98 L 152 -111 Q 174 -97 206 -76 L 195 -61 Q 194 -62 191 -64 Q 162 -85 141 -98 M 98 -111 L 111 -99 Q 82 -75 58 -58 Q 53 -64 47 -72 Q 80 -92 98 -111 Z ",
        "31.2600": "M 146 -150 L 45 -150 L 45 -145 Q 45 -96 18 -54 Q 13 -60 7 -65 Q 30 -99 29 -145 L 29 -198 L 146 -198 L 146 -150 M 153 -168 L 205 -168 L 205 -207 L 222 -207 L 222 -168 L 246 -168 L 246 -152 L 222 -152 L 222 -80 Q 223 -50 194 -50 Q 183 -50 170 -50 Q 170 -59 167 -67 Q 169 -67 174 -67 Q 182 -66 187 -66 Q 207 -64 205 -86 L 205 -152 L 153 -152 L 153 -168 M 70 -36 L 89 -36 L 89 -9 Q 87 7 108 6 L 149 6 Q 167 6 170 -5 Q 174 -19 175 -31 Q 183 -27 194 -24 Q 192 -12 187 1 Q 181 23 152 22 L 103 22 Q 68 24 70 -8 L 70 -36 M 42 -109 L 153 -109 L 153 -97 L 108 -97 L 108 -71 Q 110 -48 86 -48 Q 81 -47 68 -47 Q 68 -52 67 -59 Q 66 -61 66 -62 Q 66 -62 69 -62 Q 78 -61 82 -61 Q 92 -60 92 -73 L 92 -97 L 42 -97 L 42 -109 M 131 -185 L 45 -185 L 45 -164 L 131 -164 L 131 -185 M 32 -42 L 50 -36 Q 40 -9 25 15 Q 19 12 8 6 Q 23 -15 32 -42 M 56 -137 L 136 -137 L 136 -124 L 56 -124 L 56 -137 M 201 -33 L 215 -43 Q 224 -33 241 -9 Q 246 -3 248 0 L 231 9 Q 217 -12 201 -33 M 156 -135 L 171 -142 Q 173 -137 178 -128 Q 188 -110 192 -100 L 176 -93 Q 174 -97 171 -105 Q 162 -125 156 -135 M 112 -40 L 125 -49 Q 137 -38 154 -19 L 138 -8 Q 131 -18 116 -35 Q 113 -38 112 -40 M 127 -94 Q 142 -82 157 -65 L 145 -54 Q 134 -69 116 -85 L 127 -94 M 65 -95 L 77 -86 Q 65 -71 47 -55 Q 40 -64 36 -66 Q 50 -76 65 -95 Z ",
        "31.2234": "M 11 -6 L 117 -6 L 117 -167 L 25 -167 L 25 -186 L 231 -186 L 231 -167 L 138 -167 L 138 -6 L 245 -6 L 245 12 L 11 12 L 11 -6 Z ",
        "31.4215": "M 61 -197 L 81 -191 Q 74 -173 66 -157 L 122 -157 L 122 -209 L 142 -209 L 142 -157 L 234 -157 L 234 -139 L 142 -139 L 142 -83 L 228 -83 L 228 -64 L 142 -64 L 142 -3 L 248 -3 L 248 14 L 9 14 L 9 -3 L 122 -3 L 122 -64 L 36 -64 L 36 -83 L 122 -83 L 122 -139 L 56 -139 Q 42 -113 22 -88 Q 15 -96 7 -103 Q 43 -143 61 -197 Z ",
        "31.2423": "M 71 -162 L 90 -162 L 90 -20 Q 89 2 112 1 L 159 1 Q 184 3 186 -16 Q 186 -20 187 -27 Q 189 -42 190 -52 Q 202 -48 210 -45 Q 207 -23 204 -7 Q 199 21 161 20 L 108 20 Q 70 21 71 -16 L 71 -162 M 207 -143 Q 209 -139 213 -132 Q 237 -83 249 -55 L 229 -45 Q 211 -93 188 -135 L 207 -143 M 35 -135 L 54 -130 Q 42 -73 27 -30 L 8 -38 Q 26 -91 35 -135 M 123 -210 Q 137 -189 159 -149 Q 162 -144 163 -141 L 143 -131 Q 127 -168 106 -201 L 123 -210 Z ",
        "31.12": "M 153 -100 L 153 -81 L 94 -81 L 94 -22 L 74 -22 L 74 -81 L 15 -81 L 15 -100 L 74 -100 L 74 -159 L 94 -159 L 94 -100 L 153 -100 Z ",
        "31.1": "Z ",
        "31.6332": "M 61 -96 L 128 -96 L 128 -143 L 147 -143 L 147 -96 L 217 -96 L 217 -79 L 147 -79 L 147 -38 L 244 -38 L 244 -20 L 147 -20 L 147 29 L 128 29 L 128 -20 L 10 -20 L 10 -38 L 128 -38 L 128 -79 L 39 -79 L 39 -97 Q 59 -124 75 -153 L 20 -153 L 20 -171 L 85 -171 Q 89 -178 96 -190 Q 103 -203 106 -209 L 125 -204 Q 116 -188 106 -171 L 234 -171 L 234 -153 L 96 -153 Q 78 -125 61 -96 Z ",
        "31.1874": "M 248 8 Q 242 18 238 27 Q 156 12 129 -34 Q 108 12 17 29 Q 17 28 16 26 Q 11 17 8 12 Q 94 -2 112 -41 L 13 -41 L 13 -58 L 119 -58 Q 121 -66 122 -73 L 141 -73 Q 140 -66 137 -58 L 244 -58 L 244 -41 L 143 -41 Q 172 0 248 8 M 97 -140 Q 132 -171 147 -209 L 166 -205 Q 160 -193 154 -183 L 235 -183 L 235 -168 Q 207 -101 111 -78 Q 107 -86 102 -95 Q 185 -113 215 -166 L 144 -166 Q 141 -162 137 -158 Q 154 -146 169 -131 L 156 -119 Q 142 -133 127 -145 Q 119 -136 110 -127 Q 107 -130 101 -136 Q 98 -139 97 -140 M 71 -207 L 90 -207 L 90 -69 L 71 -69 L 71 -119 Q 60 -113 35 -101 Q 22 -94 15 -91 L 8 -110 Q 43 -124 71 -138 L 71 -207 M 16 -181 L 28 -192 Q 46 -176 63 -156 L 49 -144 Q 35 -160 16 -181 Z ",
        "31.791": "M 33 -111 L 147 -111 Q 162 -130 177 -159 L 195 -147 Q 179 -125 168 -111 L 240 -111 L 240 -94 L 52 -94 L 52 -77 Q 54 -8 20 29 Q 14 22 7 13 Q 35 -12 33 -77 L 33 -111 M 114 -203 L 133 -209 Q 134 -207 136 -201 Q 141 -187 143 -180 L 247 -180 L 247 -163 L 13 -163 L 13 -180 L 123 -180 Q 119 -191 114 -203 M 63 -149 L 80 -160 Q 82 -157 86 -151 Q 102 -131 106 -124 L 89 -112 Q 75 -135 63 -149 Z ",
        "31.1668": "M 22 -195 L 234 -195 L 234 28 L 216 28 L 216 17 L 40 17 L 40 29 L 22 29 L 22 -195 M 40 -179 L 40 0 L 216 0 L 216 -179 L 40 -179 M 52 -136 L 143 -136 L 143 -171 L 161 -171 L 161 -136 L 207 -136 L 207 -119 L 161 -119 L 161 -47 Q 163 -10 126 -11 Q 109 -11 100 -11 Q 97 -24 95 -30 Q 100 -29 123 -29 Q 145 -27 143 -50 L 143 -107 Q 117 -65 56 -26 Q 52 -35 44 -42 Q 98 -72 131 -119 L 52 -119 L 52 -136 Z ",
        "31.5866": "M 16 -143 L 16 -161 L 105 -161 L 105 -142 Q 88 -118 70 -99 L 70 -84 Q 75 -81 79 -78 Q 96 -95 111 -113 L 127 -101 Q 119 -93 100 -76 Q 94 -71 92 -69 Q 99 -64 113 -55 Q 121 -50 125 -47 L 113 -31 Q 102 -40 82 -55 Q 74 -61 70 -64 L 70 28 L 50 28 L 50 -80 Q 29 -60 14 -50 Q 13 -55 9 -65 Q 8 -69 7 -71 Q 59 -107 82 -143 L 16 -143 M 150 -207 L 170 -207 L 170 -126 L 183 -135 Q 220 -100 249 -71 L 232 -56 Q 211 -80 170 -121 L 170 28 L 150 28 L 150 -207 M 48 -199 L 65 -207 Q 66 -206 68 -202 Q 82 -179 83 -174 L 66 -165 Q 63 -170 56 -183 Q 51 -193 48 -199 Z ",
        "31.1778": "M 104 -69 L 227 -69 L 227 28 L 209 28 L 209 12 L 122 12 L 122 28 L 104 28 L 104 -69 M 7 -21 Q 22 -24 42 -30 L 42 -128 L 10 -128 L 10 -145 L 42 -145 L 42 -207 L 60 -207 L 60 -145 L 92 -145 L 92 -128 L 60 -128 L 60 -35 Q 73 -38 93 -45 Q 93 -39 94 -25 Q 66 -18 14 -1 L 7 -21 M 122 -52 L 122 -3 L 209 -3 L 209 -52 L 122 -52 M 87 -109 L 176 -109 Q 177 -111 179 -114 Q 197 -142 205 -156 L 223 -145 Q 211 -126 197 -109 L 247 -109 L 247 -93 L 87 -93 L 87 -109 M 149 -202 L 165 -210 Q 169 -203 177 -190 Q 180 -184 181 -183 L 167 -177 L 239 -177 L 239 -161 L 96 -161 L 96 -177 L 163 -177 Q 156 -188 149 -202 M 110 -146 L 126 -155 Q 144 -133 151 -122 L 135 -111 Q 122 -131 110 -146 Z ",
        "31.988": "M 150 -194 L 150 -118 L 94 -118 L 94 -89 L 144 -89 L 144 -72 L 94 -72 L 94 -43 L 147 -43 L 147 -27 L 94 -27 L 94 29 L 76 29 L 76 -194 L 150 -194 M 150 -83 L 150 -99 L 234 -99 L 234 -84 Q 224 -45 206 -20 Q 220 -5 252 11 Q 244 20 240 26 Q 213 10 195 -7 Q 171 14 138 30 Q 133 23 127 15 Q 165 0 184 -20 Q 165 -46 157 -83 L 150 -83 M 7 -89 Q 37 -144 50 -208 L 68 -205 Q 62 -179 53 -152 L 53 29 L 36 29 L 36 -109 Q 26 -87 14 -70 Q 11 -79 7 -89 M 159 -194 L 233 -194 L 233 -118 L 158 -118 L 158 -134 L 216 -134 L 216 -178 L 159 -178 L 159 -194 M 94 -178 L 94 -134 L 133 -134 L 133 -178 L 94 -178 M 216 -83 L 174 -83 Q 183 -52 195 -33 Q 210 -54 216 -83 Z ",
        "31.6171": "M 168 -209 L 186 -209 L 186 -157 L 248 -157 L 248 -141 L 186 -141 L 186 -85 L 235 -85 L 235 29 L 217 29 L 217 15 L 148 15 L 148 29 L 130 29 L 130 -85 L 168 -85 L 168 -209 M 21 -196 L 114 -196 L 114 -45 L 96 -45 L 96 -179 L 38 -179 L 38 -43 L 21 -43 L 21 -196 M 148 -68 L 148 0 L 217 0 L 217 -68 L 148 -68 M 80 -39 Q 107 -10 123 4 L 108 17 Q 94 0 68 -25 Q 59 0 22 27 Q 16 19 9 12 Q 42 -9 50 -27 Q 59 -45 59 -88 L 59 -158 L 76 -158 L 76 -89 Q 76 -51 69 -29 L 80 -39 Z ",
        "31.7444": "M 26 -191 L 42 -191 L 42 -132 L 65 -132 L 65 -208 L 82 -208 L 82 -177 L 120 -177 L 120 -162 L 82 -162 L 82 -132 L 123 -132 L 123 -121 Q 156 -156 173 -210 L 192 -208 Q 191 -206 190 -202 Q 188 -199 188 -198 Q 207 -149 249 -115 Q 243 -107 238 -99 Q 197 -133 180 -177 Q 158 -130 126 -98 Q 120 -107 115 -112 L 119 -116 L 8 -116 L 8 -132 L 26 -132 L 26 -191 M 118 -99 L 118 27 L 102 27 L 102 11 L 17 13 L 17 -99 L 34 -99 L 34 -1 L 102 -2 L 102 -31 L 89 -21 Q 80 -41 70 -58 Q 63 -37 45 -17 Q 43 -20 40 -25 Q 36 -30 34 -32 Q 62 -55 60 -109 L 76 -109 Q 76 -93 74 -79 Q 83 -66 99 -38 Q 101 -34 102 -32 L 102 -99 L 118 -99 M 144 -40 Q 147 -38 154 -33 Q 158 -30 175 -16 L 213 -66 L 126 -66 L 126 -82 L 234 -82 L 234 -66 L 189 -5 Q 203 5 215 14 L 202 29 Q 171 2 132 -26 L 144 -40 M 161 -129 L 175 -136 Q 185 -120 196 -98 L 180 -90 Q 169 -115 161 -129 Z ",
        "31.2290": "M 11 -123 Q 48 -158 68 -210 L 88 -205 Q 86 -201 83 -193 Q 79 -185 77 -181 L 238 -181 L 238 -163 L 152 -163 L 152 -121 L 234 -121 L 234 -103 L 152 -103 L 152 -52 L 249 -52 L 249 -34 L 152 -34 L 152 29 L 133 29 L 133 -34 L 9 -34 L 9 -52 L 48 -52 L 48 -121 L 133 -121 L 133 -163 L 66 -163 Q 49 -134 26 -110 Q 25 -111 18 -117 Q 12 -122 11 -123 M 67 -103 L 67 -52 L 133 -52 L 133 -103 L 67 -103 Z ",
        "31.714": "M 149 -204 L 169 -204 L 169 -4 L 248 -4 L 248 13 L 9 13 L 9 -4 L 87 -4 L 87 -204 L 107 -204 L 107 -4 L 149 -4 L 149 -204 M 37 -156 Q 58 -106 75 -57 L 56 -49 Q 39 -100 19 -150 L 37 -156 M 178 -57 Q 197 -94 219 -156 L 238 -148 Q 211 -78 195 -49 L 178 -57 Z ",
        "31.2341": "M 96 -184 L 147 -184 L 147 -208 L 164 -208 L 164 -184 L 220 -184 L 220 -148 L 246 -148 L 246 -133 L 220 -133 L 220 -98 L 164 -98 L 164 -77 L 225 -77 L 225 -62 L 164 -62 L 164 -41 L 237 -41 L 237 -27 L 164 -27 L 164 -2 L 147 -2 L 147 -27 L 84 -27 L 84 -41 L 147 -41 L 147 -62 L 93 -62 L 93 -77 L 147 -77 L 147 -98 L 96 -98 L 96 -112 L 147 -112 L 147 -133 L 83 -133 L 83 -148 L 147 -148 L 147 -169 L 96 -169 L 96 -184 M 27 -82 Q 37 -49 49 -35 Q 59 -55 64 -95 L 15 -95 L 15 -113 L 61 -169 L 13 -169 L 13 -186 L 82 -186 L 82 -170 L 36 -111 L 82 -111 L 82 -97 Q 76 -49 62 -21 Q 88 2 147 3 Q 216 3 249 2 Q 244 12 241 20 Q 201 20 145 20 Q 85 20 53 -6 Q 41 9 18 29 Q 15 24 9 17 Q 8 15 7 14 Q 8 13 10 12 Q 33 -6 40 -19 Q 22 -40 11 -76 L 27 -82 M 164 -133 L 164 -112 L 203 -112 L 203 -133 L 164 -133 M 203 -169 L 164 -169 L 164 -148 L 203 -148 L 203 -169 Z ",
        "31.1058": "M 9 11 Q 101 -19 114 -76 L 14 -76 L 14 -94 L 117 -94 Q 117 -96 118 -99 Q 118 -103 118 -104 L 118 -140 L 28 -140 L 28 -158 L 84 -158 Q 68 -180 53 -198 L 68 -209 Q 86 -190 102 -169 L 88 -158 L 146 -158 Q 152 -167 163 -183 Q 174 -200 179 -208 L 198 -198 Q 183 -179 167 -158 L 229 -158 L 229 -140 L 137 -140 L 137 -104 Q 137 -100 136 -94 L 243 -94 L 243 -76 L 141 -76 Q 165 -14 247 7 Q 245 10 241 17 Q 236 24 234 27 Q 152 -3 128 -62 Q 110 -4 22 29 Q 15 19 9 11 Z ",
        "31.3635": "M 90 -73 L 150 -73 L 150 -114 L 74 -114 L 74 -132 L 150 -132 L 150 -173 Q 118 -172 85 -170 Q 84 -176 81 -188 Q 140 -189 235 -197 L 238 -178 Q 230 -178 212 -176 Q 184 -175 169 -174 L 169 -132 L 248 -132 L 248 -114 L 169 -114 L 169 -73 L 230 -73 L 230 29 L 211 29 L 211 15 L 109 15 L 109 29 L 90 29 L 90 -73 M 109 -56 L 109 -1 L 211 -1 L 211 -56 L 109 -56 M 45 -69 Q 56 -65 65 -60 Q 43 0 34 26 L 14 17 Q 32 -25 45 -69 M 17 -142 Q 31 -134 60 -113 Q 58 -114 63 -111 L 51 -95 Q 48 -97 42 -102 Q 24 -115 6 -127 L 17 -142 M 29 -205 Q 32 -203 37 -199 Q 61 -181 72 -172 L 59 -157 Q 48 -166 29 -181 Q 21 -188 17 -191 L 29 -205 Z ",
        "31.4617": "M 94 -86 L 236 -86 L 236 27 L 218 27 L 218 14 L 112 14 L 112 27 L 94 27 L 94 -86 M 106 -163 L 224 -163 L 224 -104 L 106 -104 L 106 -163 M 11 -143 L 11 -161 L 88 -161 L 88 -143 Q 76 -118 59 -97 L 59 -86 L 71 -95 Q 79 -86 91 -69 L 77 -58 Q 67 -74 59 -85 L 59 27 L 41 27 L 41 -76 Q 29 -62 14 -50 Q 14 -52 13 -56 Q 10 -69 8 -71 Q 48 -103 67 -143 L 11 -143 M 123 -148 L 123 -119 L 207 -119 L 207 -148 L 123 -148 M 93 -196 L 240 -196 L 240 -181 L 93 -181 L 93 -196 M 173 -28 L 173 0 L 218 0 L 218 -28 L 173 -28 M 112 -28 L 112 0 L 156 0 L 156 -28 L 112 -28 M 218 -71 L 173 -71 L 173 -42 L 218 -42 L 218 -71 M 112 -71 L 112 -42 L 156 -42 L 156 -71 L 112 -71 M 32 -201 L 50 -209 Q 57 -198 69 -176 L 51 -167 Q 40 -188 32 -201 Z ",
        "31.1205": "M 171 -207 L 189 -207 Q 188 -181 188 -157 L 238 -157 Q 235 -49 234 -18 Q 233 25 200 22 Q 192 23 176 23 Q 175 11 173 2 Q 178 3 198 3 Q 216 6 216 -18 Q 218 -50 219 -139 L 188 -139 Q 187 -119 187 -108 Q 187 -15 144 30 Q 142 27 138 23 Q 133 17 131 15 Q 169 -24 170 -104 Q 170 -116 170 -139 L 150 -139 L 150 -157 L 171 -157 Q 171 -202 171 -207 M 51 -146 L 142 -146 L 142 -130 L 89 -130 Q 89 -109 88 -94 L 135 -94 Q 134 -81 133 -49 Q 132 -26 132 -15 Q 133 22 101 21 Q 93 21 83 21 Q 82 8 80 3 Q 84 4 99 4 Q 115 6 115 -15 Q 116 -37 118 -78 L 88 -78 Q 86 -3 55 28 Q 49 22 42 14 Q 61 -8 66 -33 Q 71 -54 72 -130 L 51 -130 L 51 -146 M 45 -175 L 45 -101 Q 46 -7 23 28 Q 17 22 8 15 Q 29 -14 27 -102 L 27 -192 L 146 -192 L 146 -175 L 45 -175 Z ",
        "31.4935": "M 106 -68 L 233 -68 L 233 28 L 216 28 L 216 14 L 124 14 L 124 28 L 106 28 L 106 -68 M 93 -169 L 160 -169 L 160 -208 L 179 -208 L 179 -169 L 247 -169 L 247 -152 L 179 -152 L 179 -114 L 239 -114 L 239 -97 L 101 -97 L 101 -114 L 160 -114 L 160 -152 L 93 -152 L 93 -169 M 38 -62 Q 60 -64 92 -67 Q 89 -58 88 -49 Q 52 -47 18 -42 L 12 -60 Q 12 -60 13 -61 Q 21 -67 28 -76 Q 40 -90 54 -110 Q 28 -109 13 -107 L 7 -125 Q 13 -130 22 -142 Q 23 -144 26 -149 Q 50 -187 58 -207 L 77 -199 Q 75 -196 72 -191 Q 41 -141 28 -124 Q 33 -124 45 -124 Q 58 -125 64 -125 Q 73 -139 81 -153 L 99 -144 Q 66 -96 38 -62 M 124 -51 L 124 -1 L 216 -1 L 216 -51 L 124 -51 M 7 -9 Q 53 -14 95 -20 Q 95 -19 95 -17 Q 93 -10 93 -2 Q 50 2 11 8 L 7 -9 Z ",
        "31.948": "M 92 -197 L 227 -197 L 227 -114 L 92 -114 L 92 -197 M 63 0 Q 110 -25 134 -66 L 70 -66 L 70 -82 L 150 -82 L 150 -108 L 168 -108 L 168 -82 L 248 -82 L 248 -66 L 182 -66 Q 207 -25 249 -5 Q 243 1 238 9 Q 190 -16 168 -64 L 168 28 L 150 28 L 150 -64 Q 122 -14 76 14 Q 70 7 63 0 M 7 -90 Q 41 -141 57 -207 L 75 -202 Q 66 -172 54 -143 L 54 28 L 36 28 L 36 -105 Q 26 -85 14 -70 Q 10 -80 7 -90 M 110 -180 L 110 -131 L 208 -131 L 208 -180 L 110 -180 Z ",
        "31.2240": "M 47 3 L 136 3 L 136 -37 L 74 -37 L 74 -42 Q 47 -13 17 4 Q 12 -2 5 -11 Q 53 -42 79 -79 L 12 -79 L 12 -95 L 89 -95 Q 95 -107 101 -119 L 29 -119 L 29 -135 L 107 -135 Q 111 -147 114 -158 L 23 -158 L 23 -175 L 84 -175 Q 75 -188 62 -200 L 77 -211 Q 92 -196 103 -183 L 92 -175 L 167 -175 L 158 -184 Q 172 -198 184 -211 L 200 -200 Q 195 -194 184 -184 Q 178 -178 175 -175 L 238 -175 L 238 -158 L 134 -158 Q 131 -147 127 -135 L 229 -135 L 229 -119 L 121 -119 Q 119 -115 116 -107 Q 112 -99 110 -95 L 248 -95 L 248 -79 L 101 -79 Q 91 -62 83 -53 L 221 -53 L 221 -37 L 156 -37 L 156 3 L 245 3 L 245 20 L 47 20 L 47 3 Z ",
        "31.6399": "M 184 -207 L 204 -207 L 204 -161 L 245 -161 L 245 -143 L 204 -143 L 204 -46 Q 206 -12 169 -12 Q 146 -12 137 -12 Q 135 -22 132 -32 Q 147 -31 166 -31 Q 185 -30 184 -49 L 184 -143 L 85 -143 L 85 -161 L 184 -161 L 184 -207 M 120 2 Q 145 3 186 3 Q 224 2 248 1 Q 248 2 247 4 Q 242 16 241 20 Q 189 20 117 20 Q 71 20 47 -7 Q 28 8 16 23 L 6 2 Q 9 0 19 -7 Q 32 -18 38 -23 L 38 -106 L 10 -106 L 10 -123 L 57 -123 L 57 -23 Q 78 2 120 2 M 90 -112 L 104 -123 Q 121 -106 149 -74 L 133 -61 Q 105 -97 90 -112 M 38 -206 Q 51 -192 73 -161 L 56 -150 Q 47 -165 24 -196 L 38 -206 Z ",
        "31.1309": "M 118 -209 L 138 -209 L 138 -167 L 228 -167 L 228 -149 L 138 -149 L 138 -94 L 247 -94 L 247 -76 L 130 -76 Q 104 -41 68 -2 Q 86 -2 120 -3 Q 165 -4 190 -5 Q 172 -26 153 -46 L 169 -58 Q 185 -41 211 -14 Q 228 3 238 13 L 220 28 Q 217 24 211 16 Q 208 13 206 11 Q 195 11 174 12 Q 109 12 65 15 Q 59 15 45 17 Q 40 18 38 18 L 29 0 Q 44 -6 52 -15 Q 85 -48 104 -76 L 10 -76 L 10 -94 L 118 -94 L 118 -149 L 30 -149 L 30 -167 L 118 -167 L 118 -209 Z ",
        "31.4289": "M 71 -139 L 243 -139 L 243 -122 L 168 -122 Q 168 -109 167 -95 L 236 -95 L 236 -8 Q 236 23 203 23 Q 188 23 165 23 Q 165 21 163 10 Q 162 6 162 4 Q 177 5 199 5 Q 218 6 217 -9 L 217 -79 L 165 -79 Q 165 -78 165 -75 Q 164 -72 164 -70 Q 201 -34 213 -19 L 198 -6 Q 181 -27 158 -52 Q 149 -26 113 -1 Q 112 -2 109 -6 Q 102 -14 100 -16 Q 144 -42 147 -79 L 97 -79 L 97 26 L 78 26 L 78 -95 L 149 -95 Q 150 -103 150 -122 L 71 -122 L 71 -139 M 64 -106 Q 64 -52 57 -26 Q 49 0 26 27 Q 20 20 11 13 Q 43 -18 45 -67 Q 41 -65 34 -60 Q 18 -50 12 -47 L 8 -67 Q 22 -73 46 -87 L 46 -94 L 46 -179 L 145 -179 Q 141 -191 135 -206 L 153 -211 Q 156 -202 161 -188 Q 162 -185 163 -184 L 149 -179 L 248 -179 L 248 -163 L 64 -163 L 64 -106 M 11 -150 L 27 -155 Q 28 -149 34 -130 Q 40 -106 42 -98 L 25 -93 Q 22 -111 11 -150 Z ",
        "31.5995": "M 104 -202 L 122 -202 L 122 -113 Q 123 -50 114 -21 Q 106 8 81 30 Q 78 27 64 17 Q 88 0 96 -26 Q 104 -53 104 -114 L 104 -202 M 217 -202 L 236 -202 L 236 27 L 217 27 L 217 -202 M 161 -194 L 179 -194 L 179 12 L 161 12 L 161 -194 M 82 -55 Q 82 -44 84 -32 Q 73 -23 48 0 Q 42 5 39 7 L 28 -6 Q 38 -14 37 -29 L 37 -110 L 7 -110 L 7 -128 L 55 -128 L 55 -29 Q 59 -33 69 -42 Q 79 -52 82 -55 M 38 -202 Q 66 -174 76 -163 L 59 -149 Q 45 -169 24 -191 L 38 -202 Z ",
        "31.6856": "M 76 -135 L 179 -135 L 179 -38 L 76 -38 L 76 -135 M 97 -175 L 97 -194 L 235 -194 L 235 -11 Q 237 28 198 27 Q 178 27 164 27 Q 163 23 162 14 Q 160 9 160 6 Q 178 8 195 8 Q 218 10 216 -12 L 216 -175 L 97 -175 M 93 -117 L 93 -56 L 162 -56 L 162 -117 L 93 -117 M 21 -161 L 39 -161 L 39 27 L 21 27 L 21 -161 M 33 -197 L 47 -209 Q 75 -181 82 -174 L 66 -160 Q 45 -184 33 -197 Z ",
        "31.985": "M 149 -207 L 167 -207 L 167 -183 L 243 -183 L 243 -166 L 167 -166 L 167 -144 L 225 -144 L 225 4 L 248 4 L 248 20 L 67 20 L 67 4 L 91 4 L 91 -144 L 149 -144 L 149 -166 L 78 -166 L 78 -183 L 149 -183 L 149 -207 M 6 -88 Q 42 -140 60 -206 L 77 -202 Q 66 -169 54 -141 L 54 27 L 36 27 L 36 -106 Q 27 -88 15 -71 Q 11 -80 6 -88 M 109 -16 L 109 4 L 207 4 L 207 -16 L 109 -16 M 109 -129 L 109 -106 L 207 -106 L 207 -129 L 109 -129 M 109 -91 L 109 -69 L 207 -69 L 207 -91 L 109 -91 M 109 -54 L 109 -32 L 207 -32 L 207 -54 L 109 -54 Z ",
        "31.6177": "M 142 -188 L 231 -188 L 231 -112 L 142 -112 L 142 -188 M 50 -208 L 68 -208 Q 68 -203 67 -193 Q 67 -185 67 -182 L 122 -182 Q 122 -176 122 -163 Q 121 -147 121 -138 Q 120 -104 89 -105 Q 74 -105 64 -105 Q 62 -114 60 -123 Q 64 -123 75 -122 Q 84 -122 86 -122 Q 103 -120 103 -138 Q 104 -142 104 -152 Q 105 -162 105 -166 L 65 -166 Q 63 -120 20 -94 Q 15 -102 7 -109 Q 46 -130 48 -166 L 16 -166 L 16 -182 L 49 -182 Q 50 -189 50 -208 M 45 -89 L 211 -89 L 211 -15 L 193 -15 L 193 -72 L 63 -72 L 63 -15 L 45 -15 L 45 -89 M 138 -62 Q 138 -44 133 -31 Q 149 -24 187 -9 Q 228 6 240 11 L 230 28 Q 216 21 164 0 Q 137 -10 126 -15 Q 109 13 27 30 Q 26 27 21 19 Q 17 14 16 11 Q 78 2 99 -12 Q 120 -26 120 -62 L 138 -62 M 159 -173 L 159 -128 L 214 -128 L 214 -173 L 159 -173 Z ",
        "31.2454": "M 77 -41 Q 134 -102 160 -174 L 92 -174 L 92 -192 L 245 -192 L 245 -174 L 181 -174 Q 172 -150 161 -127 L 175 -127 L 175 28 L 155 28 L 155 -116 Q 131 -70 91 -25 Q 83 -35 77 -41 M 47 -207 L 66 -207 L 66 28 L 47 28 L 47 -207 M 178 -111 L 194 -122 Q 233 -70 249 -44 L 232 -31 Q 209 -70 178 -111 M 21 -154 L 38 -151 Q 33 -122 24 -83 Q 17 -85 7 -87 Q 16 -117 21 -154 M 67 -153 L 80 -161 Q 91 -147 109 -119 L 93 -109 Q 89 -117 76 -139 Q 69 -149 67 -153 Z ",
        "31.3509": "M 118 -207 L 137 -207 L 137 -168 Q 151 -132 161 -115 Q 187 -138 214 -168 L 230 -154 Q 202 -126 170 -99 Q 200 -51 249 -17 Q 247 -15 241 -8 Q 235 -2 232 0 Q 164 -56 137 -123 L 137 -10 Q 139 26 102 25 Q 86 25 71 25 Q 71 23 70 17 Q 68 7 67 4 Q 74 5 99 5 Q 119 6 118 -11 L 118 -207 M 14 -130 L 14 -148 L 98 -148 L 98 -130 Q 77 -51 23 4 Q 17 0 8 -9 Q 63 -66 78 -130 L 14 -130 Z ",
        "31.798": "M 121 -101 L 9 -101 L 9 -118 L 84 -118 Q 81 -123 73 -135 Q 65 -146 61 -151 L 77 -160 Q 79 -157 84 -151 Q 98 -133 103 -125 L 90 -118 L 147 -118 Q 165 -141 177 -162 L 195 -152 Q 184 -137 169 -118 L 247 -118 L 247 -101 L 140 -101 L 140 -69 L 233 -69 L 233 -52 L 140 -52 L 140 -7 Q 142 26 105 26 Q 86 26 74 26 Q 74 24 73 20 Q 71 10 70 6 Q 75 6 86 6 Q 97 7 103 7 Q 122 8 121 -9 L 121 -52 L 22 -52 L 22 -69 L 121 -69 L 121 -101 M 113 -205 L 132 -211 Q 138 -199 143 -186 L 130 -180 L 234 -180 L 234 -163 L 22 -163 L 22 -180 L 124 -180 Q 119 -193 113 -205 M 167 -27 L 179 -41 Q 205 -23 239 0 L 226 16 Q 210 3 177 -20 Q 170 -25 167 -27 M 67 -42 L 82 -29 Q 54 -4 26 16 Q 20 7 12 0 Q 40 -16 67 -42 Z ",
        "31.2961": "M 120 -86 Q 148 -137 164 -205 L 182 -201 Q 181 -197 179 -190 Q 174 -171 170 -161 L 245 -161 L 245 -144 L 226 -144 Q 222 -76 193 -35 Q 214 -11 249 6 Q 243 14 236 25 Q 200 0 182 -19 Q 158 7 118 29 Q 116 27 112 21 Q 108 16 106 13 Q 148 -7 171 -35 Q 153 -61 146 -98 Q 144 -95 140 -86 Q 137 -80 135 -77 Q 130 -82 120 -86 M 62 -205 L 80 -205 L 80 -164 L 131 -164 L 131 -147 L 80 -147 L 80 -81 Q 112 -51 131 -32 L 117 -18 Q 100 -37 80 -58 L 80 -5 Q 82 26 45 25 Q 31 26 20 26 Q 20 14 17 6 Q 20 6 28 6 Q 39 7 43 7 Q 63 8 62 -9 L 62 -57 Q 55 -51 41 -37 Q 27 -24 20 -17 L 8 -32 Q 25 -44 59 -76 Q 61 -78 62 -79 L 62 -147 L 13 -147 L 13 -164 L 62 -164 L 62 -205 M 165 -144 Q 161 -135 158 -126 Q 164 -77 182 -50 Q 205 -86 208 -144 L 165 -144 M 16 -123 L 31 -132 Q 33 -129 37 -122 Q 49 -105 56 -92 L 40 -82 Q 29 -103 16 -123 M 110 -132 L 126 -124 Q 116 -105 100 -82 L 85 -92 Q 102 -115 110 -132 M 90 -192 L 100 -203 Q 110 -197 127 -184 L 115 -170 Q 102 -183 90 -192 Z ",
        "31.7050": "M 104 -147 L 149 -147 L 157 -177 L 99 -177 L 99 -194 L 245 -194 L 245 -177 L 178 -177 L 169 -147 L 233 -147 L 233 -23 L 214 -23 L 214 -130 L 123 -130 L 123 -22 L 104 -22 L 104 -147 M 6 -29 Q 14 -31 33 -35 Q 39 -36 42 -37 L 42 -166 L 9 -166 L 9 -183 L 92 -183 L 92 -166 L 61 -166 L 61 -41 Q 81 -47 95 -50 Q 96 -38 97 -31 Q 93 -30 81 -27 Q 30 -15 11 -9 L 6 -29 M 159 -114 L 178 -114 L 178 -77 Q 178 -56 174 -40 Q 190 -29 216 -9 Q 236 4 247 12 L 234 29 Q 212 10 175 -17 Q 170 -21 167 -23 Q 151 10 90 32 Q 89 30 86 26 Q 81 19 79 15 Q 127 0 143 -19 Q 160 -38 159 -78 L 159 -114 Z ",
        "31.5984": "M 156 -207 L 176 -207 L 176 -124 L 248 -124 L 248 -106 L 176 -106 L 176 28 L 156 28 L 156 -106 L 86 -106 L 86 -124 L 156 -124 L 156 -207 M 108 -37 Q 109 -24 109 -16 Q 106 -14 98 -9 Q 55 18 46 25 L 34 8 Q 43 0 42 -12 L 42 -108 L 8 -108 L 8 -125 L 62 -125 L 62 -8 Q 91 -27 108 -37 M 43 -204 Q 71 -178 85 -164 L 68 -150 Q 47 -173 28 -191 L 43 -204 Z ",
        "31.2632": "M 7 -65 Q 14 -66 32 -69 Q 50 -72 60 -73 L 60 -118 L 7 -118 L 7 -135 L 60 -135 L 60 -173 Q 40 -169 18 -167 Q 16 -176 13 -186 Q 69 -191 115 -200 L 121 -182 Q 120 -182 118 -181 Q 93 -177 79 -175 L 79 -135 L 141 -135 Q 139 -174 138 -207 L 157 -207 Q 157 -180 160 -135 L 249 -135 L 249 -118 L 161 -118 Q 165 -78 171 -52 Q 203 -79 218 -105 L 235 -94 Q 212 -62 177 -33 Q 189 -5 202 3 Q 219 15 223 0 Q 227 -14 230 -39 Q 241 -35 249 -32 Q 246 -15 241 3 Q 235 27 215 28 Q 194 28 176 3 Q 168 -5 162 -20 Q 135 0 105 14 Q 99 4 93 -2 Q 128 -18 156 -39 Q 145 -72 142 -118 L 79 -118 L 79 -77 Q 106 -82 129 -86 Q 129 -76 130 -68 Q 119 -65 79 -58 L 79 -5 Q 80 24 46 26 Q 31 26 20 26 Q 19 15 16 6 Q 19 6 27 6 Q 39 7 45 7 Q 61 8 60 -6 L 60 -54 Q 45 -51 20 -47 Q 14 -45 12 -45 L 7 -65 M 177 -186 L 190 -198 Q 216 -178 233 -162 L 219 -148 Q 209 -158 177 -186 Z ",
        "31.6936": "M 106 -68 L 228 -68 L 228 28 L 210 28 L 210 12 L 124 12 L 124 28 L 106 28 L 106 -68 M 87 -55 Q 87 -17 56 -16 Q 46 -16 40 -16 Q 39 -25 36 -34 Q 38 -34 44 -34 Q 50 -33 53 -33 Q 70 -33 70 -56 Q 69 -83 47 -109 Q 58 -141 67 -178 L 35 -178 L 35 28 L 18 28 L 18 -194 L 86 -194 L 86 -178 Q 84 -170 74 -141 Q 68 -120 65 -112 Q 87 -88 87 -55 M 124 -52 L 124 -2 L 210 -2 L 210 -52 L 124 -52 M 89 -109 L 178 -109 Q 179 -110 180 -112 Q 198 -141 206 -156 L 225 -146 Q 218 -136 203 -115 Q 199 -111 198 -109 L 248 -109 L 248 -93 L 89 -93 L 89 -109 M 150 -202 L 166 -210 Q 170 -203 178 -190 Q 181 -184 182 -183 L 167 -177 L 241 -177 L 241 -160 L 98 -160 L 98 -177 L 164 -177 Q 163 -178 159 -185 Q 153 -196 150 -202 M 112 -145 L 126 -155 Q 134 -147 148 -128 Q 152 -124 153 -122 L 137 -111 Q 128 -124 112 -145 Z ",
        "31.2022": "M 123 -68 L 169 -94 L 55 -94 L 55 -112 L 197 -112 L 197 -92 L 142 -60 L 142 -55 L 247 -55 L 247 -37 L 142 -37 L 142 -3 Q 144 27 111 27 Q 93 27 77 27 Q 77 24 75 19 Q 74 10 73 6 Q 88 7 108 7 Q 124 8 123 -6 L 123 -37 L 9 -37 L 9 -55 L 123 -55 L 123 -68 M 18 -155 L 239 -155 L 239 -104 L 219 -104 L 219 -137 L 37 -137 L 37 -104 L 18 -104 L 18 -155 M 170 -168 Q 189 -187 202 -205 L 218 -194 Q 203 -174 186 -156 L 170 -168 M 102 -200 L 118 -209 Q 130 -194 145 -170 L 128 -160 Q 119 -177 102 -200 M 37 -193 L 51 -203 Q 60 -193 77 -172 Q 79 -169 80 -168 L 64 -156 Q 51 -175 37 -193 Z ",
        "31.1408": "M 47 -198 L 209 -198 L 209 -131 L 47 -131 L 47 -198 M 33 -109 L 223 -109 L 223 -21 L 204 -21 L 204 -92 L 52 -92 L 52 -19 L 33 -19 L 33 -109 M 118 -85 L 137 -85 Q 137 -65 136 -58 Q 135 -48 133 -39 Q 142 -35 161 -27 Q 229 0 247 8 L 236 26 Q 198 6 126 -23 Q 110 8 18 30 Q 15 22 8 12 Q 122 -6 117 -61 Q 118 -66 118 -85 M 66 -182 L 66 -147 L 190 -147 L 190 -182 L 66 -182 Z ",
        "31.841": "M 7 -87 Q 40 -138 58 -207 L 77 -201 Q 68 -174 58 -149 L 58 28 L 40 28 L 40 -108 Q 28 -84 15 -66 Q 9 -82 7 -87 M 174 -207 Q 171 -202 169 -199 Q 198 -151 250 -123 Q 244 -115 238 -106 Q 184 -141 159 -183 Q 129 -136 81 -103 Q 80 -105 73 -113 Q 70 -117 68 -119 Q 124 -154 152 -210 L 174 -207 M 132 -113 L 132 -81 Q 136 -2 92 30 Q 86 24 76 17 Q 99 -1 106 -20 Q 113 -38 113 -80 L 113 -113 L 132 -113 M 184 -113 L 202 -113 L 202 28 L 184 28 L 184 -113 Z ",
        "31.1963": "M 110 -77 L 232 -77 L 232 27 L 214 27 L 214 13 L 127 13 L 127 28 L 110 28 L 110 -77 M 11 -138 L 11 -155 L 33 -155 Q 37 -183 40 -208 L 59 -205 Q 58 -197 55 -181 Q 53 -164 51 -155 L 89 -155 L 89 -140 Q 86 -72 70 -35 Q 85 -21 102 -6 L 87 7 Q 73 -6 61 -18 Q 49 3 18 28 Q 13 20 7 12 Q 34 -8 47 -31 Q 38 -40 19 -58 Q 32 -46 16 -60 Q 24 -90 31 -138 L 11 -138 M 104 -193 Q 176 -194 230 -202 L 236 -186 Q 231 -185 221 -184 Q 207 -183 183 -181 Q 185 -164 188 -152 L 246 -152 L 246 -137 L 192 -137 Q 203 -106 222 -103 Q 228 -101 231 -111 Q 233 -121 233 -130 Q 236 -129 241 -128 Q 247 -126 249 -125 Q 248 -112 246 -103 Q 242 -86 225 -86 Q 190 -88 175 -137 L 121 -137 L 121 -106 Q 144 -111 171 -118 Q 170 -109 171 -100 Q 117 -88 106 -82 L 98 -98 Q 105 -102 104 -117 L 104 -193 M 127 -24 L 127 0 L 214 0 L 214 -24 L 127 -24 M 35 -65 Q 44 -57 55 -48 Q 70 -79 71 -138 L 49 -138 Q 48 -134 47 -126 Q 42 -94 35 -65 M 127 -62 L 127 -38 L 214 -38 L 214 -62 L 127 -62 M 121 -178 L 121 -152 L 171 -152 Q 168 -165 166 -180 Q 165 -180 163 -180 Q 142 -178 121 -178 Z ",
        "31.1139": "M 7 -1 Q 40 -19 64 -40 Q 54 -70 51 -120 L 14 -114 L 11 -131 L 50 -138 Q 48 -169 47 -206 L 67 -206 Q 67 -172 69 -141 L 147 -155 L 149 -138 L 69 -124 Q 71 -80 79 -54 Q 104 -80 126 -114 L 142 -104 Q 121 -71 86 -34 Q 98 -3 115 4 Q 129 12 132 -1 Q 135 -20 137 -38 Q 149 -34 156 -32 Q 151 -5 148 6 Q 142 27 125 26 Q 111 26 99 17 Q 80 2 71 -21 Q 48 -2 21 13 Q 16 7 7 -1 M 214 -206 L 233 -206 L 233 -7 Q 234 25 202 25 Q 186 25 169 25 Q 169 22 167 15 Q 166 8 165 5 Q 175 6 197 6 Q 215 7 214 -10 L 214 -206 M 182 -35 L 163 -35 L 163 -183 L 182 -183 L 182 -35 M 82 -188 L 93 -200 Q 113 -186 125 -174 L 113 -160 Q 110 -163 103 -170 Q 89 -182 82 -188 Z ",
        "31.20": "M 101 -97 Q 134 -109 135 -142 Q 133 -192 76 -194 Q 26 -193 14 -144 L 36 -137 Q 43 -174 77 -175 Q 109 -174 111 -142 Q 109 -105 66 -104 Q 60 -104 56 -104 L 56 -86 Q 60 -86 74 -86 Q 117 -84 120 -48 Q 120 -6 75 -6 Q 38 -6 32 -47 L 9 -41 Q 21 12 77 12 Q 140 9 143 -46 Q 141 -85 101 -97 Z ",
        "31.716": "M 12 -176 L 70 -176 L 86 -209 L 106 -205 L 93 -176 L 244 -176 L 244 -158 L 84 -158 L 54 -93 L 126 -93 L 126 -146 L 146 -146 L 146 -93 L 233 -93 L 233 -75 L 146 -75 L 146 -5 Q 147 24 114 25 Q 95 25 79 25 Q 79 23 78 18 Q 76 8 75 3 Q 88 5 108 5 Q 127 6 126 -12 L 126 -75 L 31 -75 L 31 -93 L 62 -158 L 12 -158 L 12 -176 M 67 -61 L 83 -48 Q 53 -14 20 17 Q 18 15 15 12 Q 9 5 6 4 Q 39 -27 67 -61 M 170 -44 L 184 -58 Q 220 -27 250 0 L 236 14 Q 208 -12 170 -44 Z ",
        "31.1219": "M 138 -19 L 88 -19 L 88 -1 Q 115 -3 141 -4 Q 140 0 140 6 Q 168 -30 171 -104 Q 171 -109 171 -120 Q 172 -132 172 -139 L 146 -139 L 146 -155 L 173 -155 Q 173 -177 173 -207 L 190 -207 Q 190 -177 190 -155 L 239 -155 Q 238 -137 238 -105 Q 236 -33 234 -13 Q 235 24 202 22 Q 193 23 177 23 Q 176 14 173 4 Q 179 4 190 5 Q 197 5 200 5 Q 218 7 217 -16 Q 219 -47 221 -139 L 189 -139 Q 189 -132 188 -120 Q 188 -109 188 -104 Q 185 -18 147 30 Q 144 27 138 21 Q 135 18 133 16 Q 134 15 137 11 Q 136 13 138 9 Q 117 11 74 14 Q 30 17 9 18 L 7 1 Q 40 0 72 0 L 72 -19 L 19 -19 L 19 -33 L 72 -33 L 72 -49 L 14 -49 L 14 -62 L 72 -62 L 72 -79 L 19 -79 L 19 -126 L 72 -126 L 72 -143 L 35 -143 L 35 -175 L 8 -175 L 8 -189 L 35 -189 L 35 -207 L 51 -207 L 51 -189 L 109 -189 L 109 -207 L 125 -207 L 125 -189 L 151 -189 L 151 -175 L 125 -175 L 125 -143 L 88 -143 L 88 -126 L 141 -126 L 141 -79 L 88 -79 L 88 -62 L 145 -62 L 145 -49 L 88 -49 L 88 -33 L 138 -33 L 138 -19 M 51 -175 L 51 -157 L 109 -157 L 109 -175 L 51 -175 M 125 -112 L 88 -112 L 88 -93 L 125 -93 L 125 -112 M 35 -112 L 35 -93 L 72 -93 L 72 -112 L 35 -112 Z ",
        "31.1195": "M 146 -176 L 238 -176 L 238 22 L 219 22 L 219 -1 L 165 -1 L 165 22 L 146 22 L 146 -176 M 48 -207 L 67 -207 Q 67 -199 66 -184 Q 66 -170 66 -164 L 122 -164 Q 122 -101 119 -15 Q 118 23 83 22 Q 72 22 58 22 Q 58 13 55 1 Q 70 2 81 2 Q 100 3 100 -16 Q 103 -76 103 -145 L 66 -145 Q 67 -25 20 29 Q 19 27 11 21 Q 7 17 5 15 Q 30 -18 37 -48 Q 45 -76 46 -145 L 13 -145 L 13 -164 L 47 -164 Q 47 -170 47 -184 Q 48 -199 48 -207 M 165 -158 L 165 -18 L 219 -18 L 219 -158 L 165 -158 Z ",
        "31.2268": "M 62 8 L 44 8 L 44 -78 L 119 -78 L 119 -101 L 137 -101 L 137 -78 L 213 -78 L 213 -22 Q 214 4 184 5 Q 168 6 157 6 Q 157 -2 154 -11 Q 162 -10 182 -10 Q 196 -9 195 -23 L 195 -61 L 137 -61 L 137 29 L 119 29 L 119 -61 L 62 -61 L 62 8 M 179 -207 L 197 -207 L 197 -177 L 247 -177 L 247 -161 L 197 -161 L 197 -134 L 179 -134 L 179 -161 L 137 -161 L 137 -134 L 119 -134 L 119 -161 L 77 -161 L 77 -134 L 59 -134 L 59 -161 L 9 -161 L 9 -177 L 59 -177 L 59 -207 L 77 -207 L 77 -177 L 119 -177 L 119 -207 L 137 -207 L 137 -177 L 179 -177 L 179 -207 M 17 -124 L 239 -124 L 239 -80 L 222 -80 L 222 -108 L 34 -108 L 34 -80 L 17 -80 L 17 -124 Z ",
        "31.5456": "M 10 -182 L 74 -182 L 74 -208 L 92 -208 L 92 -182 L 164 -182 L 164 -208 L 182 -208 L 182 -182 L 246 -182 L 246 -165 L 182 -165 L 182 -144 L 164 -144 L 164 -165 L 92 -165 L 92 -144 L 74 -144 L 74 -165 L 10 -165 L 10 -182 M 42 -72 L 120 -72 L 120 -103 L 138 -103 L 138 -72 L 214 -72 L 214 -55 L 138 -55 L 138 -5 Q 140 26 109 25 Q 90 25 79 25 Q 78 16 76 5 Q 93 7 104 7 Q 121 8 120 -10 L 120 -55 L 42 -55 L 42 -72 M 125 -159 L 142 -154 Q 141 -152 138 -149 Q 179 -107 248 -87 Q 247 -86 246 -85 Q 239 -75 236 -69 Q 169 -94 127 -135 Q 94 -98 18 -64 Q 14 -73 8 -82 Q 91 -114 125 -159 M 75 -48 L 91 -37 Q 57 -1 26 20 Q 23 16 16 10 Q 13 7 12 6 Q 47 -15 75 -48 M 175 -47 Q 206 -24 239 5 L 225 18 Q 192 -10 163 -35 L 175 -47 Z ",
        "31.1050": "M 75 -194 L 91 -205 Q 117 -189 151 -119 Q 195 -21 249 0 L 232 21 Q 177 -10 134 -110 Q 133 -113 130 -118 Q 128 -123 126 -125 Q 100 -31 22 23 Q 16 13 8 5 Q 85 -43 113 -150 Q 96 -180 75 -194 Z ",
        "31.3293": "M 5 -53 Q 31 -92 43 -142 L 9 -142 L 9 -158 L 44 -158 L 44 -207 L 62 -207 L 62 -158 L 93 -158 L 93 -142 L 62 -142 L 62 -105 L 71 -112 Q 81 -102 97 -84 L 83 -72 Q 81 -75 76 -81 Q 67 -94 62 -99 L 62 28 L 44 28 L 44 -100 Q 33 -64 15 -35 Q 11 -43 5 -53 M 90 1 L 180 1 Q 192 -30 207 -88 L 227 -83 Q 214 -40 198 1 L 242 1 L 242 18 L 90 18 L 90 1 M 182 -206 Q 179 -200 176 -196 Q 207 -146 249 -127 Q 242 -119 237 -110 Q 194 -136 166 -180 Q 143 -143 98 -106 Q 92 -116 85 -122 Q 136 -155 162 -210 L 182 -206 M 116 -119 L 216 -119 L 216 -102 L 116 -102 L 116 -119 M 146 -88 L 163 -92 Q 164 -88 166 -81 Q 176 -44 178 -25 L 160 -21 Q 154 -58 146 -88 M 100 -78 L 116 -83 Q 125 -58 135 -17 L 117 -12 Q 112 -39 100 -78 Z ",
        "31.695": "M 8 -107 L 248 -107 L 248 -86 L 8 -86 L 8 -107 Z ",
        "31.1113": "M 49 -176 L 49 -108 Q 49 -48 44 -23 Q 39 3 22 29 Q 16 22 7 13 Q 20 -8 25 -32 Q 29 -55 29 -104 L 29 -193 L 210 -193 L 210 -80 Q 209 -7 217 0 Q 219 4 223 3 Q 226 2 227 -2 Q 230 -19 231 -43 Q 240 -40 248 -38 Q 248 -23 244 2 Q 240 27 222 26 Q 210 26 200 10 Q 190 -4 191 -80 L 191 -176 L 49 -176 M 83 -117 Q 85 -115 91 -108 Q 111 -86 124 -71 Q 142 -98 149 -132 L 63 -132 L 63 -148 L 168 -148 L 168 -133 Q 161 -91 137 -57 Q 153 -40 179 -12 Q 180 -10 181 -9 L 164 3 Q 163 1 160 -1 Q 140 -26 126 -42 Q 101 -13 59 9 Q 54 2 48 -5 Q 90 -27 114 -57 Q 101 -72 78 -97 Q 72 -103 70 -106 L 83 -117 Z ",
        "31.1199": "M 157 -208 L 177 -208 Q 177 -198 176 -180 Q 176 -165 176 -157 L 240 -157 Q 240 -154 240 -148 Q 238 -46 236 -19 Q 235 22 199 22 Q 185 22 171 22 Q 169 12 167 1 Q 187 3 197 3 Q 216 3 217 -19 Q 221 -89 221 -140 L 175 -140 Q 175 -130 175 -119 Q 174 -24 119 30 Q 113 22 104 14 Q 154 -27 156 -119 Q 156 -128 156 -140 L 119 -140 L 119 -157 L 157 -157 Q 157 -182 157 -208 M 94 -74 Q 105 -51 121 -15 Q 119 -18 123 -9 Q 119 -8 110 -4 Q 106 -2 104 -1 Q 103 -6 101 -10 Q 58 -6 18 0 L 9 -20 Q 20 -27 26 -41 Q 39 -69 51 -101 L 9 -101 L 9 -119 L 126 -119 L 126 -101 L 71 -101 Q 53 -53 35 -21 Q 50 -22 83 -25 Q 91 -26 95 -26 Q 92 -33 86 -47 Q 81 -60 78 -67 L 94 -74 M 20 -187 L 117 -187 L 117 -169 L 20 -169 L 20 -187 Z ",
        "31.3990": "M 89 -121 L 108 -118 Q 105 -109 102 -100 L 246 -100 L 246 -83 L 95 -83 Q 91 -72 86 -63 L 217 -63 L 217 -46 Q 194 -22 164 -5 Q 200 3 248 9 Q 247 10 244 15 Q 239 25 237 27 Q 179 20 142 3 Q 104 21 44 30 Q 40 23 34 13 Q 85 5 120 -6 Q 96 -20 75 -44 Q 55 -12 17 15 Q 11 4 7 0 Q 55 -34 76 -83 L 13 -83 L 13 -100 L 82 -100 Q 83 -102 84 -106 Q 86 -109 89 -121 M 45 -171 L 59 -178 Q 53 -178 40 -177 Q 30 -177 25 -177 Q 24 -182 23 -189 Q 22 -194 22 -195 Q 138 -195 231 -201 L 236 -185 Q 221 -184 174 -182 Q 144 -181 129 -180 Q 138 -165 146 -151 L 129 -144 Q 120 -162 112 -174 L 125 -180 Q 114 -180 93 -179 Q 71 -179 61 -178 Q 63 -175 67 -169 Q 71 -163 80 -151 L 65 -143 L 170 -143 Q 190 -171 197 -182 L 215 -173 Q 210 -167 202 -157 Q 195 -147 191 -143 L 238 -143 L 238 -107 L 220 -107 L 220 -126 L 37 -126 L 37 -107 L 19 -107 L 19 -143 L 63 -143 Q 62 -145 59 -149 Q 50 -165 45 -171 M 191 -47 L 96 -47 Q 117 -27 142 -15 Q 172 -29 191 -47 Z ",
        "31.1145": "M 102 -205 Q 99 -201 96 -196 Q 122 -174 154 -142 L 141 -127 Q 122 -149 87 -180 Q 65 -147 37 -123 L 136 -123 Q 136 -103 134 -71 Q 133 -38 97 -39 Q 75 -39 69 -39 Q 68 -50 66 -58 Q 84 -57 96 -57 Q 116 -56 115 -74 Q 116 -79 116 -90 Q 117 -100 117 -106 L 53 -106 L 53 -13 Q 51 5 71 3 L 104 3 Q 125 3 129 -7 Q 131 -14 133 -37 Q 140 -34 152 -30 Q 149 -8 146 0 Q 140 22 109 21 L 67 21 Q 32 23 34 -11 L 34 -120 Q 32 -119 29 -116 Q 27 -114 18 -107 Q 17 -110 12 -117 Q 8 -123 7 -124 Q 58 -162 82 -209 L 102 -205 M 214 -207 L 233 -207 L 233 -6 Q 234 25 203 25 Q 190 25 166 25 Q 165 15 162 4 Q 168 4 180 5 Q 191 5 196 5 Q 215 6 214 -10 L 214 -207 M 182 -34 L 164 -34 L 164 -183 L 182 -183 L 182 -34 Z ",
        "31.6935": "M 87 -47 Q 87 -14 63 -12 Q 56 -11 41 -11 Q 41 -12 40 -14 Q 39 -24 37 -28 L 37 28 L 20 28 L 20 -195 L 88 -195 L 88 -178 L 66 -111 Q 87 -82 87 -47 M 82 2 L 180 2 Q 197 -38 212 -88 L 232 -82 Q 228 -71 217 -43 Q 206 -13 200 2 L 242 2 L 242 18 L 82 18 L 82 2 M 179 -206 Q 178 -205 177 -203 Q 175 -199 174 -198 Q 207 -148 249 -127 Q 246 -123 239 -112 Q 238 -111 238 -110 Q 191 -138 165 -182 Q 141 -144 90 -108 Q 84 -115 77 -124 Q 133 -157 160 -210 L 179 -206 M 37 -179 L 37 -30 Q 47 -29 56 -29 Q 71 -29 70 -48 Q 70 -78 47 -109 L 69 -179 L 37 -179 M 109 -120 L 218 -120 L 218 -103 L 109 -103 L 109 -120 M 95 -79 L 112 -85 Q 124 -55 136 -16 L 118 -10 Q 107 -48 95 -79 M 144 -87 L 162 -91 Q 173 -57 179 -29 L 162 -24 Q 161 -29 158 -38 Q 150 -70 144 -87 Z ",
        "31.795": "M 41 -134 L 214 -134 L 214 -62 L 140 -62 L 140 -2 Q 141 25 113 25 Q 98 25 81 25 Q 81 24 81 23 Q 80 16 77 6 Q 81 6 91 6 Q 101 7 106 7 Q 122 7 121 -5 L 121 -62 L 41 -62 L 41 -134 M 60 -117 L 60 -79 L 196 -79 L 196 -117 L 60 -117 M 109 -204 L 127 -210 Q 136 -193 142 -178 L 128 -173 L 247 -173 L 247 -156 L 10 -156 L 10 -173 L 122 -173 Q 117 -187 109 -204 M 73 -44 L 86 -29 Q 57 -7 20 14 Q 20 14 19 13 Q 13 2 9 0 Q 46 -21 73 -44 M 166 -27 L 177 -42 Q 204 -27 241 -2 L 228 13 Q 199 -7 166 -27 Z ",
        "31.1200": "M 8 -13 Q 17 -15 28 -15 L 28 -191 L 113 -191 L 113 -26 Q 122 -28 129 -29 Q 129 -27 129 -21 Q 128 -15 128 -12 Q 114 -10 70 -4 Q 26 2 11 4 L 8 -13 M 157 -206 L 176 -206 Q 176 -204 176 -197 Q 175 -171 175 -155 L 235 -155 Q 233 -69 230 -16 Q 231 25 195 24 Q 180 24 164 24 Q 164 19 162 11 Q 161 4 161 2 Q 179 4 191 4 Q 212 5 212 -19 Q 216 -81 216 -138 L 174 -138 Q 174 -127 173 -118 Q 174 -14 120 29 Q 115 24 105 16 Q 155 -19 155 -118 Q 155 -121 155 -127 Q 156 -134 156 -138 L 126 -138 L 126 -155 L 156 -155 Q 157 -177 157 -206 M 46 -18 Q 54 -19 71 -21 Q 88 -23 96 -24 L 96 -63 L 46 -63 L 46 -18 M 46 -175 L 46 -135 L 96 -135 L 96 -175 L 46 -175 M 46 -119 L 46 -79 L 96 -79 L 96 -119 L 46 -119 Z ",
        "31.2005": "M 122 -125 L 191 -176 L 34 -176 L 34 -194 L 223 -194 L 223 -175 L 142 -116 L 142 -99 L 248 -99 L 248 -81 L 142 -81 L 142 -6 Q 143 24 108 25 Q 93 25 71 25 Q 71 22 69 14 Q 68 7 67 3 Q 86 5 104 5 Q 122 5 122 -11 L 122 -81 L 9 -81 L 9 -99 L 122 -99 L 122 -125 Z ",
        "31.5946": "M 35 -144 Q 38 -138 44 -126 Q 48 -117 61 -92 Q 70 -123 74 -167 L 14 -167 L 14 -185 L 93 -185 L 93 -168 Q 87 -109 73 -70 Q 76 -63 83 -50 Q 88 -40 102 -12 L 85 -2 Q 75 -23 64 -47 Q 46 -9 19 18 Q 14 11 7 1 Q 37 -31 53 -69 Q 40 -93 19 -136 L 35 -144 M 160 -162 L 178 -162 L 178 -118 Q 178 -90 174 -67 L 189 -67 L 189 -10 Q 189 5 204 5 L 213 5 Q 225 5 227 -6 Q 229 -18 229 -39 Q 239 -36 248 -32 Q 247 -11 244 1 Q 241 22 217 22 L 199 22 Q 172 22 171 -8 L 171 -52 Q 158 -6 96 28 Q 91 22 83 13 Q 129 -10 144 -37 Q 161 -63 160 -117 L 160 -162 M 110 -197 L 228 -197 L 228 -52 L 210 -52 L 210 -179 L 129 -179 L 129 -48 L 110 -48 L 110 -197 Z ",
        "31.5665": "M 241 -135 Q 218 -131 159 -126 L 159 -90 L 247 -90 L 247 -74 L 212 -74 L 212 28 L 195 28 L 195 -74 L 159 -74 Q 161 -10 126 28 Q 121 24 110 16 Q 146 -16 143 -80 L 143 -141 Q 197 -143 231 -152 L 241 -135 M 31 -116 L 42 -124 L 16 -124 L 16 -139 L 70 -139 Q 69 -140 67 -144 Q 60 -155 57 -160 L 71 -167 Q 83 -149 85 -145 L 73 -139 L 128 -139 L 128 -124 L 97 -124 L 112 -118 Q 102 -104 95 -95 L 134 -95 L 134 -80 L 9 -80 L 9 -95 L 48 -95 Q 48 -95 47 -96 Q 36 -112 31 -116 M 158 -208 L 175 -208 L 175 -189 L 247 -189 L 247 -173 L 175 -173 L 175 -155 L 158 -155 L 158 -173 L 106 -173 L 106 -155 L 89 -155 L 89 -173 L 9 -173 L 9 -189 L 89 -189 L 89 -208 L 106 -208 L 106 -189 L 158 -189 L 158 -208 M 63 -75 L 80 -75 L 80 -58 L 127 -58 L 127 -43 L 80 -43 L 80 -2 Q 82 25 53 25 Q 41 25 34 25 Q 34 16 31 7 Q 35 8 52 8 Q 64 9 63 -3 L 63 -43 L 15 -43 L 15 -58 L 63 -58 L 63 -75 M 63 -102 L 53 -95 L 79 -95 Q 90 -112 96 -124 L 44 -124 Q 54 -114 63 -102 M 34 -34 L 48 -27 Q 33 0 20 14 Q 14 8 8 4 Q 22 -11 34 -34 M 87 -27 L 98 -37 Q 104 -32 116 -19 Q 121 -14 123 -12 L 111 -1 Q 107 -5 97 -16 Q 89 -25 87 -27 Z ",
        "31.1158": "M 167 -168 Q 184 -185 197 -203 L 213 -193 Q 197 -173 183 -157 L 233 -157 L 233 -141 L 125 -141 Q 119 -126 112 -114 L 246 -114 L 246 -97 L 177 -97 Q 204 -70 249 -61 Q 245 -56 239 -46 Q 238 -43 237 -42 Q 215 -49 198 -59 Q 197 -46 193 -10 Q 191 25 146 24 Q 128 24 115 24 Q 113 14 110 4 Q 119 5 145 5 Q 174 6 174 -12 Q 174 -16 175 -25 Q 177 -42 177 -48 L 105 -48 Q 101 11 24 30 Q 23 29 22 26 Q 17 19 13 13 Q 84 -2 86 -48 L 52 -48 L 52 -57 Q 38 -48 20 -39 Q 11 -51 7 -56 Q 50 -74 75 -97 L 11 -97 L 11 -114 L 90 -114 Q 99 -126 105 -141 L 21 -141 L 21 -157 L 111 -157 Q 120 -186 122 -209 L 141 -208 Q 138 -185 130 -157 L 181 -157 L 167 -168 M 189 -65 Q 170 -77 155 -97 L 100 -97 Q 80 -74 64 -65 L 189 -65 M 42 -192 L 56 -203 Q 60 -199 67 -192 Q 80 -180 87 -172 L 72 -159 Q 65 -167 52 -181 Q 45 -188 42 -192 Z ",
        "31.779": "M 18 -192 L 237 -192 L 237 -174 L 112 -174 L 103 -115 L 208 -115 L 208 -2 L 248 -2 L 248 15 L 9 15 L 9 -2 L 66 -2 L 80 -97 L 24 -97 L 24 -115 L 83 -115 L 91 -174 L 18 -174 L 18 -192 M 188 -97 L 100 -97 L 86 -2 L 188 -2 L 188 -97 Z ",
        "31.17": "M 77 -176 Q 36 -173 35 -90 Q 35 -4 78 -5 Q 121 -4 121 -90 Q 121 -177 77 -176 M 79 12 Q 12 11 12 -90 Q 13 -191 78 -194 Q 143 -192 144 -90 Q 143 10 79 12 Z ",
        "31.2128": "M 70 -57 L 135 -57 L 135 -86 L 52 -86 Q 53 -13 22 28 Q 16 20 7 11 Q 36 -22 34 -104 L 34 -197 L 225 -197 L 225 -132 L 53 -132 L 53 -109 L 53 -103 L 135 -103 L 135 -127 L 153 -127 L 153 -103 L 243 -103 L 243 -86 L 153 -86 L 153 -57 L 220 -57 L 220 29 L 201 29 L 201 16 L 88 16 L 88 29 L 70 29 L 70 -57 M 53 -180 L 53 -149 L 206 -149 L 206 -180 L 53 -180 M 88 -40 L 88 0 L 201 0 L 201 -40 L 88 -40 Z ",
        "31.18": "M 84 9 L 105 9 L 105 -194 L 90 -194 Q 77 -162 31 -141 L 31 -120 Q 62 -132 84 -152 L 84 9 Z ",
        "31.3014": "M 42 -192 L 215 -192 L 215 26 L 194 26 L 194 9 L 62 9 L 62 26 L 42 26 L 42 -192 M 62 -83 L 62 -7 L 194 -7 L 194 -83 L 62 -83 M 62 -174 L 62 -101 L 194 -101 L 194 -174 L 62 -174 Z ",
        "31.2704": "M 148 -199 L 165 -209 Q 176 -195 185 -180 L 170 -171 L 236 -171 L 236 -62 L 217 -62 L 217 -74 L 123 -74 Q 122 -14 89 29 Q 88 28 86 27 Q 80 22 73 15 Q 94 -12 100 -36 Q 106 -60 106 -109 L 106 -171 L 167 -171 Q 165 -174 162 -179 Q 158 -185 148 -199 M 7 -79 Q 11 -80 22 -83 Q 36 -87 43 -89 L 43 -145 L 12 -145 L 12 -162 L 43 -162 L 43 -207 L 62 -207 L 62 -162 L 93 -162 L 93 -145 L 62 -145 L 62 -94 Q 77 -99 92 -103 Q 93 -91 93 -84 Q 78 -81 62 -75 L 62 -2 Q 64 25 35 24 Q 28 25 14 25 Q 14 21 12 12 Q 11 7 11 5 Q 17 5 33 5 Q 44 6 43 -4 L 43 -70 Q 25 -64 9 -59 L 7 -79 M 124 -153 L 124 -108 Q 124 -99 124 -92 L 217 -92 L 217 -153 L 124 -153 Z "
    },
    "texts": [{
        "bbox": {
            "height": 239,
            "x": 8,
            "width": 1012,
            "y": -209
        },
        "text": "\u798f\u5229\u4ea7\u5047",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1150",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.791",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.988",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 993,
            "y": -211
        },
        "text": "\u5b89\u5c45\u8ba1\u5212",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2039",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2128",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.5984",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1139",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 7,
            "width": 1778,
            "y": -210
        },
        "text": "\u6211\u5728\u4eac\u4e1c\u8fc7\u5927\u5e74",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2632",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1690",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.795",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.716",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.6399",
            "y": 0
        }, {
            "x": 1280,
            "glyph": "31.1848",
            "y": 0
        }, {
            "x": 1536,
            "glyph": "31.2290",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 1009,
            "y": -211
        },
        "text": "\u6551\u52a9\u57fa\u91d1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2961",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1200",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1779",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6619",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 241,
            "x": 7,
            "width": 1017,
            "y": -211
        },
        "text": "\u7231\u5fc3\u57fa\u91d1 ",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.3990",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2423",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1779",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6619",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.1",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 1268,
            "y": -210
        },
        "text": "\u798f\u5229\u966a\u62a4\u5047",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1150",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.6936",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.2704",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.988",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 7,
            "width": 1255,
            "y": -210
        },
        "text": "\u4ef7\u503c\u89c2\u5956\u52b1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.841",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.985",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.5946",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1874",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.1205",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 7,
            "width": 999,
            "y": -209
        },
        "text": "\u521b\u65b0\u5956\u52b1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1145",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2996",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1874",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1205",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 238,
            "x": 7,
            "width": 1776,
            "y": -210
        },
        "text": "\u6211\u5728\u4eac\u4e1c\u4e0a\u5927\u5b66",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2632",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1690",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.795",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.716",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.701",
            "y": 0
        }, {
            "x": 1280,
            "glyph": "31.1848",
            "y": 0
        }, {
            "x": 1536,
            "glyph": "31.2022",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 9,
            "width": 1008,
            "y": -210
        },
        "text": "\u5e74\u5ea6\u4f53\u68c0",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2290",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2319",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.884",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.3293",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 238,
            "x": 9,
            "width": 1008,
            "y": -210
        },
        "text": "\u5546\u4e1a\u4fdd\u9669",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1528",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.714",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.948",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6935",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 9,
            "width": 1008,
            "y": -211
        },
        "text": "\u4e94\u9669\u4e00\u91d1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.779",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.6935",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.695",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6619",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 7,
            "width": 994,
            "y": -210
        },
        "text": "\u51e4\u5de2\u8ba1\u5212",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1113",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2233",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.5984",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1139",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 9,
            "width": 755,
            "y": -209
        },
        "text": "\u5173\u6000\u5047",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1058",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2454",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.988",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 1012,
            "y": -210
        },
        "text": "\u798f\u5229\u5e74\u5047",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1150",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.2290",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.988",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 996,
            "y": -210
        },
        "text": "\u5458\u5de5\u57f9\u8bad",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1408",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2234",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1778",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.5995",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 11,
            "width": 995,
            "y": -210
        },
        "text": "\u53f8\u9f84\u5956\u52b1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1347",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.7444",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1874",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1205",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 241,
            "x": 7,
            "width": 999,
            "y": -211
        },
        "text": "\u5168\u52e4\u5956\u52b1",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1051",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1219",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1874",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1205",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 238,
            "x": 7,
            "width": 1001,
            "y": -209
        },
        "text": "\u751f\u65e5\u795d\u798f",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4215",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.3014",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.4599",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.4617",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 9,
            "width": 999,
            "y": -209
        },
        "text": "\u8282\u65e5\u795d\u8d3a",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.5356",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.3014",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.4599",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6177",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 238,
            "x": 22,
            "width": 986,
            "y": -208
        },
        "text": "\u56e2\u5efa\u6d3b\u52a8",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1668",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2341",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.3635",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1199",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 241,
            "x": 9,
            "width": 1011,
            "y": -211
        },
        "text": "\u5e26\u85aa\u75c5\u5047",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2268",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.5665",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.4289",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.988",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 5,
            "width": 1012,
            "y": -211
        },
        "text": "\u5dee\u65c5\u4fdd\u9669",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.2240",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.3003",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.948",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.6935",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 5,
            "width": 997,
            "y": -209
        },
        "text": "\u52a0\u73ed\u798f\u5229",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1195",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.4141",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.1150",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 8,
            "width": 753,
            "y": -209
        },
        "text": "\u798f\u5229\u5238",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1150",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1158",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 8,
            "width": 2053,
            "y": -210
        },
        "text": "\u5165\u53f85\u5e74/10\u5e74\u795d\u8d3a",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.1050",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1347",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.22",
            "y": 0
        }, {
            "x": 666,
            "glyph": "31.2290",
            "y": 0
        }, {
            "x": 922,
            "glyph": "31.16",
            "y": 0
        }, {
            "x": 997,
            "glyph": "31.18",
            "y": 0
        }, {
            "x": 1153,
            "glyph": "31.17",
            "y": 0
        }, {
            "x": 1309,
            "glyph": "31.2290",
            "y": 0
        }, {
            "x": 1565,
            "glyph": "31.4599",
            "y": 0
        }, {
            "x": 1821,
            "glyph": "31.6177",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 240,
            "x": 9,
            "width": 1506,
            "y": -211
        },
        "text": "\u4eb2\u5c5e\u53bb\u4e16\u6170\u95ee",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.798",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.2139",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.1309",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.711",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.2600",
            "y": 0
        }, {
            "x": 1280,
            "glyph": "31.6856",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 7,
            "width": 1520,
            "y": -209
        },
        "text": "\u7ed3\u5a5a\u751f\u5b50\u8d3a\u559c",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4935",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.1963",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.4215",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.2005",
            "y": 0
        }, {
            "x": 1024,
            "glyph": "31.6177",
            "y": 0
        }, {
            "x": 1280,
            "glyph": "31.1566",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 241,
            "x": 9,
            "width": 1740,
            "y": -209
        },
        "text": "30+\u9879\u798f\u5229\u8865\u8d34",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.20",
            "y": 0
        }, {
            "x": 154,
            "glyph": "31.17",
            "y": 0
        }, {
            "x": 310,
            "glyph": "31.12",
            "y": 0
        }, {
            "x": 477,
            "glyph": "31.7050",
            "y": 0
        }, {
            "x": 733,
            "glyph": "31.4617",
            "y": 0
        }, {
            "x": 989,
            "glyph": "31.1150",
            "y": 0
        }, {
            "x": 1245,
            "glyph": "31.5866",
            "y": 0
        }, {
            "x": 1501,
            "glyph": "31.6171",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 238,
            "x": 8,
            "width": 1009,
            "y": -209
        },
        "text": "\u8336\u6c34\u996e\u6599",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.5456",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.3509",
            "y": 0
        }, {
            "x": 512,
            "glyph": "31.7117",
            "y": 0
        }, {
            "x": 768,
            "glyph": "31.2984",
            "y": 0
        }]
    }, {
        "bbox": {
            "height": 239,
            "x": 8,
            "width": 492,
            "y": -209
        },
        "text": "\u73ed\u8f66",
        "xheight": 145,
        "glyphs": [{
            "x": 0,
            "glyph": "31.4141",
            "y": 0
        }, {
            "x": 256,
            "glyph": "31.6332",
            "y": 0
        }]
    }],
    "viewBox": {
        "height": 148.1,
        "x": 3.4817,
        "width": 250.3217,
        "y": 4.225
    },
    "styleOptions": {
        "zoom": true,
        "boxAlpha": 1,
        "backgroundColor": "ffffff",
        "rotate": true,
        "textAlpha": 1,
        "boxColor": "ffffff",
        "animationSpeed": 0.2,
        "openLinksInNewWindow": false,
        "backgroundColorAlpha": 1,
        "textColor": "f24f44"
    },
    "meta": {
        "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36",
        "version": 2.79
    }
});