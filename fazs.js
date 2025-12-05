var tidyurl;
(() => {
    var e = {
        525: e => {
            e.exports = [{
                name: "youtube.com",
                match: /.*.youtube.com/i,
                rules: ["gclid", "feature", "app", "src", "lId", "cId", "embeds_referring_euri"],
                redirect: "q"
            }]
        },
        28: (e, r) => {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.TidyConfig = void 0;
            var a = function() {
                function e() {
                    this.allowAMP = !1, this.allowCustomHandlers = !0, this.allowRedirects = !0, this.silent = !0
                }
                return e.prototype.copy = function() {
                    return {
                        allowAMP: this.allowAMP,
                        allowCustomHandlers: this.allowCustomHandlers,
                        allowRedirects: this.allowRedirects,
                        silent: this.silent
                    }
                }, e.prototype.get = function(e) {
                    return this[e]
                }, e.prototype.set = function(e, r) {
                    this[e] = r
                }, e.prototype.setMany = function(e) {
                    var r = this;
                    Object.keys(e).forEach((function(a) {
                        var t, c = a,
                            i = null !== (t = e[c]) && void 0 !== t ? t : r[c];
                        if (void 0 === r[c]) throw new Error("'" + c + "' is not a valid config key");
                        r.set(c, i)
                    }))
                }, e
            }();
            r.TidyConfig = a
        },
        463: (e, r, a) => {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.handlers = void 0;
            var t = a(185);
            r.handlers = {}
        },
        156: function(e, r, a) {
            "use strict";
            var t = this && this.__spreadArray || function(e, r) {
                for (var a = 0, t = r.length, c = e.length; a < t; a++, c++) e[c] = r[a];
                return e
            };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.clean = r.TidyURL = r.TidyCleaner = void 0;
            var c = a(185),
                i = a(407),
                o = a(463),
                m = a(28),
                n = function() {
                    function e() {
                        this.rules = [], this.config = new m.TidyConfig, this.loglines = [];
                        try {
                            this.syncDeprecatedToConfig(), this.rules = a(525)
                        } catch (e) {
                            this.log("" + e, "error"), this.rules = []
                        }
                    }
                    return Object.defineProperty(e.prototype, "expandedRules", {
                        get: function() {
                            return this.rules.map((function(e) {
                                return Object.assign({
                                    rules: [],
                                    replace: [],
                                    exclude: [],
                                    redirect: "",
                                    amp: null,
                                    decode: null
                                }, e)
                            }))
                        },
                        enumerable: !1,
                        configurable: !0
                    }), e.prototype.log = function(e, r) {
                        this.loglines.push({
                            type: r,
                            message: e
                        }), !1 !== this.config.silent && console.log("[" + r + "] " + e)
                    }, e.prototype.rebuild = function(e) {
                        var r = new URL(e);
                        return r.protocol + "//" + r.host + r.pathname + r.search + r.hash
                    }, e.prototype.syncDeprecatedToConfig = function() {}, e.prototype.validate = function(e) {
                        return c.validateURL(e)
                    }, e.prototype.clean = function(e, r) {
                        var a;
                        void 0 === r && (r = !0), r || (this.loglines = []), this.syncDeprecatedToConfig();
                        var m = {
                            url: e,
                            info: {
                                original: e,
                                reduction: 0,
                                difference: 0,
                                replace: [],
                                removed: [],
                                handler: null,
                                match: [],
                                decoded: null,
                                is_new_host: !1,
                                isNewHost: !1,
                                full_clean: !1,
                                fullClean: !1
                            }
                        };
                        if (!c.validateURL(e)) return "undefined" !== e && e.length > 0 && this.log("Invalid URL: " + e, "error"), m;
                        if (this.config.allowAMP && !1 === c.urlHasParams(e)) return m.url = m.info.original, m;
                        var n = this.rebuild(e);
                        m.url = n;
                        var s = [],
                            l = new URL(n),
                            u = l.searchParams,
                            d = new URLSearchParams,
                            h = l.pathname;
                        u.forEach((function(e, r) {
                            return d.append(r.toLowerCase(), e)
                        }));
                        for (var p = 0, w = this.expandedRules; p < w.length; p++) {
                            var g = w[p],
                                _ = l.host;
                            !0 === g.match_href && (_ = l.href), g.match.lastIndex = 0, null !== g.match.exec(_) && (s = t(t([], s), g.rules || []), m.info.replace = t(t([], m.info.replace), g.replace || []), m.info.match.push(g))
                        }
                        for (var f = !0, k = 0, v = m.info.match; k < v.length; k++)
                            for (var b = 0, y = (g = v[k]).exclude; b < y.length; b++) {
                                var x = y[b];
                                x.lastIndex = 0, null !== x.exec(n) && (f = !1)
                            }
                        if (!f) return m.url = m.info.original, m;
                        var R = m.info.match.find((function(e) {
                            return e.amp
                        }));
                        if (!0 === this.config.allowAMP && void 0 === R && !c.urlHasParams(n)) return m.url = m.info.original, m;
                        for (var U = 0, z = s; U < z.length; U++) {
                            var E = z[U];
                            u.has(E) && (m.info.removed.push({
                                key: E,
                                value: u.get(E)
                            }), u.delete(E))
                        }
                        for (var j = 0, L = m.info.replace; j < L.length; j++) {
                            E = L[j];
                            var I = h.replace(E, "");
                            I !== h && (h = I)
                        }
                        if (m.url = l.protocol + "//" + l.host + h + l.search + l.hash, this.config.allowRedirects)
                            for (var P = 0, T = m.info.match; P < T.length; P++)
                                if ((g = T[P]).redirect) {
                                    var q = g.redirect,
                                        C = d.get(q),
                                        D = c.decodeURL(C, i.EEncoding.urlc);
                                    D !== C && c.validateURL(D) && (C = D), q.length && d.has(q) && (c.validateURL(C) ? (m.url = "" + C + l.hash, r && (m.url = this.clean(m.url, !1).url)) : this.log("Failed to redirect: " + C, "error"))
                                }
                        if (!1 === this.config.allowAMP)
                            for (var S = 0, M = m.info.match; S < M.length; S++) {
                                g = M[S];
                                try {
                                    if (g.amp && (g.amp.regex || g.amp.replace || g.amp.sliceTrailing)) {
                                        if (g.amp.replace) {
                                            m.info.handler = g.name, this.log("AMP Replace: " + g.amp.replace.text, "info");
                                            var O = g.amp.replace.text,
                                                A = null !== (a = g.amp.replace.with) && void 0 !== a ? a : "";
                                            m.url = m.url.replace(O, A)
                                        }
                                        g.amp.regex && m.url.match(g.amp.regex) && (m.info.handler = g.name, this.log("AMP RegEx: " + g.amp.regex, "info"), g.amp.regex.lastIndex = 0, (G = g.amp.regex.exec(m.url)) && G[1] ? ((q = decodeURIComponent(G[1])).startsWith("https") || (q = "https://" + q), c.validateURL(q) && (m.url = r ? this.clean(q, !1).url : q)) : this.log("AMP RegEx failed to get a result for " + g.name, "error")), g.amp.sliceTrailing && m.url.endsWith(g.amp.sliceTrailing) && (m.url = m.url.slice(0, -g.amp.sliceTrailing.length)), m.url.endsWith("%3Famp") && (m.url = m.url.slice(0, -6)), m.url.endsWith("amp/") && (m.url = m.url.slice(0, -4))
                                    }
                                } catch (e) {
                                    this.log("" + e, "error")
                                }
                            }
                        for (var H = 0, N = m.info.match; H < N.length; H++) {
                            g = N[H];
                            try {
                                if (this.log("Processing decode rule (" + g.name + ")", "debug"), !g.decode) continue;
                                if (!u.has(g.decode.param) && !0 !== g.decode.targetPath) continue;
                                if (!this.config.allowRedirects) continue;
                                if (!1 === this.config.allowCustomHandlers && g.decode.handler) continue;
                                var $ = g.decode.encoding || "base64",
                                    B = h.split("/").pop(),
                                    F = u.get(g.decode.param),
                                    J = "";
                                if (void 0 === B && (B = ""), null === F) J = B;
                                else {
                                    if (!F) continue;
                                    J = F
                                }
                                if ("string" != typeof J) {
                                    this.log("Expected " + J + " to be a string", "error");
                                    continue
                                }
                                var W = c.decodeURL(J, $),
                                    Z = (q = "", null);
                                if (c.isJSON(W)) {
                                    var V = JSON.parse(W);
                                    q = V[g.decode.lookFor], m.info.decoded = V
                                } else if (!0 === this.config.allowCustomHandlers && g.decode.handler) {
                                    var G, K = o.handlers[g.decode.handler];
                                    void 0 === K && this.log("Handler was not found for " + g.decode.handler, "error"), g.decode.handler && K && (m.info.handler = g.decode.handler, ((G = K.exec(m.url, {
                                        decoded: W,
                                        lastPath: B,
                                        urlParams: new URL(m.url).searchParams,
                                        fullPath: h,
                                        originalURL: m.url
                                    })).error || !1 === c.validateURL(G.url) || "" === G.url.trim()) && (G.error ? this.log(G.error, "error") : this.log("Unknown error with decode handler, empty response returned", "error")), Z = G.url)
                                } else q = W;
                                (q = r ? this.clean(null != Z ? Z : q, !1).url : null != Z ? Z : q) && "" !== q && c.validateURL(q) && (m.url = "" + q + l.hash)
                            } catch (e) {
                                this.log("" + e, "error")
                            }
                        }
                        e.endsWith("#") && (m.url += "#", n += "#");
                        for (var Q = 0, X = m.info.match; Q < X.length; Q++)(g = X[Q]).rev && (m.url = m.url.replace(/=(?=&|$)/gm, ""));
                        var Y = c.getLinkDiff(m.url, n);
                        return m.info = Object.assign(m.info, Y), m.info.reduction < 0 && (this.log("Reduction is " + m.info.reduction + ". Please report this link on GitHub: https://github.com/DrKain/tidy-url/issues\n" + m.info.original, "error"), m.url = m.info.original), m.info.fullClean = !0, m.info.full_clean = !0, 0 === m.info.difference && 0 === m.info.reduction && (m.url = m.info.original), m
                    }, e
                }();
            r.TidyCleaner = n, r.TidyURL = new n, r.clean = function(e) {
                return r.TidyURL.clean(e)
            }
        },
        407: (e, r) => {
            "use strict";
            var a;
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.EEncoding = void 0, (a = r.EEncoding || (r.EEncoding = {})).base64 = "base64", a.base32 = "base32", a.base45 = "base45", a.url = "url", a.urlc = "urlc", a.binary = "binary", a.hex = "hex"
        },
        185: (e, r, a) => {
            "use strict";
            var t;
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.decodeURL = r.regexExtract = r.getLinkDiff = r.guessEncoding = r.isB64 = r.validateURL = r.urlHasParams = r.isJSON = r.decodeBase64 = void 0;
            var c = a(407);
            r.decodeBase64 = function(e) {
                try {
                    return "undefined" == typeof atob ? Buffer.from(e, "base64").toString("binary") : atob(e)
                } catch (r) {
                    return e
                }
            }, r.isJSON = function(e) {
                try {
                    return "object" == typeof JSON.parse(e)
                } catch (e) {
                    return !1
                }
            }, r.urlHasParams = function(e) {
                return new URL(e).searchParams.toString().length > 0
            }, r.validateURL = function(e) {
                try {
                    var r = new URL(e).protocol.toLowerCase();
                    if (!["http:", "https:"].includes(r)) throw new Error("Not acceptable protocol: " + r);
                    return !0
                } catch (r) {
                    if ("undefined" !== e && "null" !== e && e.length > 0) throw new Error("Invalid URL: " + e);
                    return !1
                }
            }, r.isB64 = function(e) {
                try {
                    return /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(e)
                } catch (e) {
                    return !1
                }
            }, r.guessEncoding = function(e) {
                return {
                    base64: r.isB64(e),
                    isJSON: r.isJSON(e)
                }
            }, r.getLinkDiff = function(e, r) {
                var a = new URL(e),
                    t = new URL(r);
                return {
                    is_new_host: a.host !== t.host,
                    isNewHost: a.host !== t.host,
                    difference: r.length - e.length,
                    reduction: +(100 - e.length / r.length * 100).toFixed(2)
                }
            }, r.regexExtract = function(e, r) {
                var a = null,
                    t = [],
                    c = 0;
                return null !== (a = e.exec(r)) && 10 !== c && (c++, a.index === e.lastIndex && e.lastIndex++, a.forEach((function(e) {
                    return t.push(e)
                }))), t
            };
            var i = function(e) {
                    return e
                },
                o = ((t = {})[c.EEncoding.url] = function(e) {
                    return decodeURI(e)
                }, t[c.EEncoding.urlc] = function(e) {
                    return decodeURIComponent(e)
                }, t[c.EEncoding.base32] = i, t[c.EEncoding.base45] = i, t[c.EEncoding.base64] = function(e) {
                    return r.decodeBase64(e)
                }, t[c.EEncoding.binary] = i, t[c.EEncoding.hex] = function(e) {
                    for (var r = e.toString(), a = "", t = 0; t < r.length; t += 2) a += String.fromCharCode(parseInt(r.substr(t, 2), 16));
                    return a
                }, t);
            r.decodeURL = function(e, r) {
                void 0 === r && (r = c.EEncoding.base64);
                try {
                    return o[r](e)
                } catch (r) {
                    return e
                }
            }
        }
    },
        r = {},
        a = function a(t) {
            var c = r[t];
            if (void 0 !== c) return c.exports;
            var i = r[t] = {
                exports: {}
            };
            return e[t].call(i.exports, i, i.exports, a), i.exports
        }(156);
    tidyurl = a
})();
