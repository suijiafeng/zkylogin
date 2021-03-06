/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

var requirejs, require, define;
(function(global) {
   function isFunction(e) {
      return ostring.call(e) === "[object Function]"
   }

   function isArray(e) {
      return ostring.call(e) === "[object Array]"
   }

   function each(e, t) {
      if (e) {
         var n;
         for (n = 0; n < e.length; n += 1)
            if (e[n] && t(e[n], n, e)) break
      }
   }

   function eachReverse(e, t) {
      if (e) {
         var n;
         for (n = e.length - 1; n > -1; n -= 1)
            if (e[n] && t(e[n], n, e)) break
      }
   }

   function hasProp(e, t) {
      return hasOwn.call(e, t)
   }

   function getOwn(e, t) {
      return hasProp(e, t) && e[t]
   }

   function eachProp(e, t) {
      var n;
      for (n in e)
         if (hasProp(e, n) && t(e[n], n)) break
   }

   function mixin(e, t, n, r) {
      return t && eachProp(t, function(t, i) {
         if (n || !hasProp(e, i)) r && typeof t != "string" ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
      }), e
   }

   function bind(e, t) {
      return function() {
         return t.apply(e, arguments)
      }
   }

   function scripts() {
      return document.getElementsByTagName("script")
   }

   function getGlobal(e) {
      if (!e) return e;
      var t = global;
      return each(e.split("."), function(e) {
         t = t[e]
      }), t
   }

   function makeError(e, t, n, r) {
      var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
      return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
   }

   function newContext(e) {
      function v(e) {
         var t, n;
         for (t = 0; e[t]; t += 1) {
            n = e[t];
            if (n === ".") e.splice(t, 1), t -= 1;
            else if (n === "..") {
               if (t === 1 && (e[2] === ".." || e[0] === "..")) break;
               t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
         }
      }

      function m(e, t, n) {
         var r, i, s, u, a, f, l, c, h, p, d, m = t && t.split("/"),
            g = m,
            y = o.map,
            b = y && y["*"];
         e && e.charAt(0) === "." && (t ? (getOwn(o.pkgs, t) ? g = m = [t] : g = m.slice(0, m.length - 1), e = g.concat(e.split("/")), v(e), i = getOwn(o.pkgs, r = e[0]), e = e.join("/"), i && e === r + "/" + i.main && (e = r)) : e.indexOf("./") === 0 && (e = e.substring(2)));
         if (n && y && (m || b)) {
            u = e.split("/");
            for (a = u.length; a > 0; a -= 1) {
               l = u.slice(0, a).join("/");
               if (m)
                  for (f = m.length; f > 0; f -= 1) {
                     s = getOwn(y, m.slice(0, f).join("/"));
                     if (s) {
                        s = getOwn(s, l);
                        if (s) {
                           c = s, h = a;
                           break
                        }
                     }
                  }
               if (c) break;
               !p && b && getOwn(b, l) && (p = getOwn(b, l), d = a)
            }!c && p && (c = p, h = d), c && (u.splice(0, h, c), e = u.join("/"))
         }
         return e
      }

      function g(e) {
         isBrowser && each(scripts(), function(t) {
            if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName) return t.parentNode.removeChild(t), !0
         })
      }

      function y(e) {
         var t = getOwn(o.paths, e);
         if (t && isArray(t) && t.length > 1) return g(e), t.shift(), r.require.undef(e), r.require([e]), !0
      }

      function b(e) {
         var t, n = e ? e.indexOf("!") : -1;
         return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
      }

      function w(e, t, n, i) {
         var s, o, u, a, f = null,
            l = t ? t.name : null,
            h = e,
            v = !0,
            g = "";
         return e || (v = !1, e = "_@r" + (p += 1)), a = b(e), f = a[0], e = a[1], f && (f = m(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? g = o.normalize(e, function(e) {
            return m(e, l, i)
         }) : g = m(e, l, i) : (g = m(e, l, i), a = b(g), f = a[0], g = a[1], n = !0, s = r.nameToUrl(g))), u = f && !o && !n ? "_unnormalized" + (d += 1) : "", {
            prefix: f,
            name: g,
            parentMap: t,
            unnormalized: !!u,
            url: s,
            originalName: h,
            isDefine: v,
            id: (f ? f + "!" + g : g) + u
         }
      }

      function E(e) {
         var t = e.id,
            n = getOwn(u, t);
         return n || (n = u[t] = new r.Module(e)), n
      }

      function S(e, t, n) {
         var r = e.id,
            i = getOwn(u, r);
         hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : E(e).on(t, n)
      }

      function x(e, t) {
         var n = e.requireModules,
            r = !1;
         t ? t(e) : (each(n, function(t) {
            var n = getOwn(u, t);
            n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
         }), r || req.onError(e))
      }

      function T() {
         globalDefQueue.length && (apsp.apply(l, [l.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
      }

      function N(e) {
         delete u[e], delete a[e]
      }

      function C(e, t, n) {
         var r = e.map.id;
         e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
            var s = r.id,
               o = getOwn(u, s);
            o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : C(o, t, n))
         }), n[r] = !0)
      }

      function k() {
         var e, n, i, u, f = o.waitSeconds * 1e3,
            l = f && r.startTime + f < (new Date).getTime(),
            c = [],
            h = [],
            p = !1,
            d = !0;
         if (t) return;
         t = !0, eachProp(a, function(t) {
            e = t.map, n = e.id;
            if (!t.enabled) return;
            e.isDefine || h.push(t);
            if (!t.error)
               if (!t.inited && l) y(n) ? (u = !0, p = !0) : (c.push(n), g(n));
               else if (!t.inited && t.fetched && e.isDefine) {
               p = !0;
               if (!e.prefix) return d = !1
            }
         });
         if (l && c.length) return i = makeError("timeout", "Load timeout for modules: " + c, null, c), i.contextName = r.contextName, x(i);
         d && each(h, function(e) {
            C(e, {}, {})
         }), (!l || u) && p && (isBrowser || isWebWorker) && !s && (s = setTimeout(function() {
            s = 0, k()
         }, 50)), t = !1
      }

      function L(e) {
         hasProp(c, e[0]) || E(w(e[0], null, !0)).init(e[1], e[2])
      }

      function A(e, t, n, r) {
         e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
      }

      function O(e) {
         var t = e.currentTarget || e.srcElement;
         return A(t, r.onScriptLoad, "load", "onreadystatechange"), A(t, r.onScriptError, "error"), {
            node: t,
            id: t && t.getAttribute("data-requiremodule")
         }
      }

      function M() {
         var e;
         T();
         while (l.length) {
            e = l.shift();
            if (e[0] === null) return x(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
            L(e)
         }
      }
      var t, n, r, i, s, o = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            pkgs: {},
            shim: {},
            config: {}
         },
         u = {},
         a = {},
         f = {},
         l = [],
         c = {},
         h = {},
         p = 1,
         d = 1;
      return i = {
         require: function(e) {
            return e.require ? e.require : e.require = r.makeRequire(e.map)
         },
         exports: function(e) {
            e.usingExports = !0;
            if (e.map.isDefine) return e.exports ? e.exports : e.exports = c[e.map.id] = {}
         },
         module: function(e) {
            return e.module ? e.module : e.module = {
               id: e.map.id,
               uri: e.map.url,
               config: function() {
                  return o.config && getOwn(o.config, e.map.id) || {}
               },
               exports: c[e.map.id]
            }
         }
      }, n = function(e) {
         this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
      }, n.prototype = {
         init: function(e, t, n, r) {
            r = r || {};
            if (this.inited) return;
            this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
               this.emit("error", e)
            })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
         },
         defineDep: function(e, t) {
            this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
         },
         fetch: function() {
            if (this.fetched) return;
            this.fetched = !0, r.startTime = (new Date).getTime();
            var e = this.map;
            if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
            r.makeRequire(this.map, {
               enableBuildCallback: !0
            })(this.shim.deps || [], bind(this, function() {
               return e.prefix ? this.callPlugin() : this.load()
            }))
         },
         load: function() {
            var e = this.map.url;
            h[e] || (h[e] = !0, r.load(this.map.id, e))
         },
         check: function() {
            if (!this.enabled || this.enabling) return;
            var e, t, n = this.map.id,
               i = this.depExports,
               s = this.exports,
               o = this.factory;
            if (!this.inited) this.fetch();
            else if (this.error) this.emit("error", this.error);
            else if (!this.defining) {
               this.defining = !0;
               if (this.depCount < 1 && !this.defined) {
                  if (isFunction(o)) {
                     if (this.events.error) try {
                        s = r.execCb(n, o, i, s)
                     } catch (u) {
                        e = u
                     } else s = r.execCb(n, o, i, s);
                     this.map.isDefine && (t = this.module, t && t.exports !== undefined && t.exports !== this.exports ? s = t.exports : s === undefined && this.usingExports && (s = this.exports));
                     if (e) return e.requireMap = this.map, e.requireModules = [this.map.id], e.requireType = "define", x(this.error = e)
                  } else s = o;
                  this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), N(n), this.defined = !0
               }
               this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
            }
         },
         callPlugin: function() {
            var e = this.map,
               t = e.id,
               n = w(e.prefix);
            this.depMaps.push(n), S(n, "defined", bind(this, function(n) {
               var i, s, a, f = this.map.name,
                  l = this.map.parentMap ? this.map.parentMap.name : null,
                  c = r.makeRequire(e.parentMap, {
                     enableBuildCallback: !0
                  });
               if (this.map.unnormalized) {
                  n.normalize && (f = n.normalize(f, function(e) {
                     return m(e, l, !0)
                  }) || ""), s = w(e.prefix + "!" + f, this.map.parentMap), S(s, "defined", bind(this, function(e) {
                     this.init([], function() {
                        return e
                     }, null, {
                        enabled: !0,
                        ignore: !0
                     })
                  })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function(e) {
                     this.emit("error", e)
                  })), a.enable());
                  return
               }
               i = bind(this, function(e) {
                  this.init([], function() {
                     return e
                  }, null, {
                     enabled: !0
                  })
               }), i.error = bind(this, function(e) {
                  this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function(e) {
                     e.map.id.indexOf(t + "_unnormalized") === 0 && N(e.map.id)
                  }), x(e)
               }), i.fromText = bind(this, function(n, s) {
                  var u = e.name,
                     a = w(u),
                     f = useInteractive;
                  s && (n = s), f && (useInteractive = !1), E(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
                  try {
                     req.exec(n)
                  } catch (l) {
                     return x(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                  }
                  f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), c([u], i)
               }), n.load(e.name, c, i, o)
            })), r.enable(n, this), this.pluginMaps[n.id] = n
         },
         enable: function() {
            a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
               var n, s, o;
               if (typeof e == "string") {
                  e = w(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
                  if (o) {
                     this.depExports[t] = o(this);
                     return
                  }
                  this.depCount += 1, S(e, "defined", bind(this, function(e) {
                     this.defineDep(t, e), this.check()
                  })), this.errback && S(e, "error", this.errback)
               }
               n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
            })), eachProp(this.pluginMaps, bind(this, function(e) {
               var t = getOwn(u, e.id);
               t && !t.enabled && r.enable(e, this)
            })), this.enabling = !1, this.check()
         },
         on: function(e, t) {
            var n = this.events[e];
            n || (n = this.events[e] = []), n.push(t)
         },
         emit: function(e, t) {
            each(this.events[e], function(e) {
               e(t)
            }), e === "error" && delete this.events[e]
         }
      }, r = {
         config: o,
         contextName: e,
         registry: u,
         defined: c,
         urlFetched: h,
         defQueue: l,
         Module: n,
         makeModuleMap: w,
         nextTick: req.nextTick,
         onError: x,
         configure: function(e) {
            e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
            var t = o.pkgs,
               n = o.shim,
               i = {
                  paths: !0,
                  config: !0,
                  map: !0
               };
            eachProp(e, function(e, t) {
               i[t] ? t === "map" ? (o.map || (o.map = {}), mixin(o[t], e, !0, !0)) : mixin(o[t], e, !0) : o[t] = e
            }), e.shim && (eachProp(e.shim, function(e, t) {
               isArray(e) && (e = {
                  deps: e
               }), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), n[t] = e
            }), o.shim = n), e.packages && (each(e.packages, function(e) {
               var n;
               e = typeof e == "string" ? {
                  name: e
               } : e, n = e.location, t[e.name] = {
                  name: e.name,
                  location: n || e.name,
                  main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
               }
            }), o.pkgs = t), eachProp(u, function(e, t) {
               !e.inited && !e.map.unnormalized && (e.map = w(t))
            }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
         },
         makeShimExports: function(e) {
            function t() {
               var t;
               return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
            }
            return t
         },
         makeRequire: function(t, n) {
            function s(o, a, f) {
               var l, h, p;
               return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? x(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = w(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : x(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (M(), r.nextTick(function() {
                  M(), p = E(w(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {
                     enabled: !0
                  }), k()
               }), s)
            }
            return n = n || {}, mixin(s, {
               isBrowser: isBrowser,
               toUrl: function(e) {
                  var n, i = e.lastIndexOf("."),
                     s = e.split("/")[0],
                     o = s === "." || s === "..";
                  return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(m(e, t && t.id, !0), n, !0)
               },
               defined: function(e) {
                  return hasProp(c, w(e, t, !1, !0).id)
               },
               specified: function(e) {
                  return e = w(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
               }
            }), t || (s.undef = function(e) {
               T();
               var n = w(e, t, !0),
                  r = getOwn(u, e);
               delete c[e], delete h[n.url], delete f[e], r && (r.events.defined && (f[e] = r.events), N(e))
            }), s
         },
         enable: function(e) {
            var t = getOwn(u, e.id);
            t && E(e).enable()
         },
         completeLoad: function(e) {
            var t, n, r, i = getOwn(o.shim, e) || {},
               s = i.exports;
            T();
            while (l.length) {
               n = l.shift();
               if (n[0] === null) {
                  n[0] = e;
                  if (t) break;
                  t = !0
               } else n[0] === e && (t = !0);
               L(n)
            }
            r = getOwn(u, e);
            if (!t && !hasProp(c, e) && r && !r.inited) {
               if (o.enforceDefine && (!s || !getGlobal(s))) {
                  if (y(e)) return;
                  return x(makeError("nodefine", "No define call for " + e, null, [e]))
               }
               L([e, i.deps || [], i.exportsFn])
            }
            k()
         },
         nameToUrl: function(e, t, n) {
            var r, i, s, u, a, f, l, c, h;
            if (req.jsExtRegExp.test(e)) c = e + (t || "");
            else {
               r = o.paths, i = o.pkgs, a = e.split("/");
               for (f = a.length; f > 0; f -= 1) {
                  l = a.slice(0, f).join("/"), s = getOwn(i, l), h = getOwn(r, l);
                  if (h) {
                     isArray(h) && (h = h[0]), a.splice(0, f, h);
                     break
                  }
                  if (s) {
                     e === s.name ? u = s.location + "/" + s.main : u = s.location, a.splice(0, f, u);
                     break
                  }
               }
               c = a.join("/"), c += t || (/\?/.test(c) || n ? "" : ".js"), c = (c.charAt(0) === "/" || c.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + c
            }
            return o.urlArgs ? c + ((c.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : c
         },
         load: function(e, t) {
            req.load(r, e, t)
         },
         execCb: function(e, t, n, r) {
            return t.apply(r, n)
         },
         onScriptLoad: function(e) {
            if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
               interactiveScript = null;
               var t = O(e);
               r.completeLoad(t.id)
            }
         },
         onScriptError: function(e) {
            var t = O(e);
            if (!y(t.id)) return x(makeError("scripterror", "Script error", e, [t.id]))
         }
      }, r.require = r.makeRequire(), r
   }

   function getInteractiveScript() {
      return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function(e) {
         if (e.readyState === "interactive") return interactiveScript = e
      }), interactiveScript)
   }
   var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.5",
      commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
      cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      jsSuffixRegExp = /\.js$/,
      currDirRegExp = /^\.\//,
      op = Object.prototype,
      ostring = op.toString,
      hasOwn = op.hasOwnProperty,
      ap = Array.prototype,
      apsp = ap.splice,
      isBrowser = typeof window != "undefined" && !!navigator && !!document,
      isWebWorker = !isBrowser && typeof importScripts != "undefined",
      readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
      defContextName = "_",
      isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
      contexts = {},
      cfg = {},
      globalDefQueue = [],
      useInteractive = !1;
   if (typeof define != "undefined") return;
   if (typeof requirejs != "undefined") {
      if (isFunction(requirejs)) return;
      cfg = requirejs, requirejs = undefined
   }
   typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(e, t, n, r) {
      var i, s, o = defContextName;
      return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
   }, req.config = function(e) {
      return req(e)
   }, req.nextTick = typeof setTimeout != "undefined" ? function(e) {
      setTimeout(e, 4)
   } : function(e) {
      e()
   }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
      contexts: contexts,
      newContext: newContext
   }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
      req[e] = function() {
         var t = contexts[defContextName];
         return t.require[e].apply(t, arguments)
      }
   }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = function(e) {
      throw e
   }, req.load = function(e, t, n) {
      var r = e && e.config || {},
         i;
      if (isBrowser) return i = r.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), i.type = r.scriptType || "text/javascript", i.charset = "utf-8", i.async = !0, i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
      if (isWebWorker) try {
         importScripts(n), e.completeLoad(t)
      } catch (s) {
         e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
      }
   }, isBrowser && eachReverse(scripts(), function(e) {
      head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
      if (dataMain) return cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain], !0
   }), define = function(e, t, n) {
      var r, i;
      typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = []), !t.length && isFunction(n) && n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
         t.push(n)
      }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t)), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
   }, define.amd = {
      jQuery: !0
   }, req.exec = function(text) {
      return eval(text)
   }, req(cfg)
})(this);
var tasker;
(function(e, t) {
   var n = {},
      r = "notRun",
      i = "waiting",
      s = 0,
      o = "empty",
      u = {
         changeTaskerStatus: function(e) {
            i = e
         },
         validateLevel: function(e) {
            return e === "auto" || e === "last" || typeof e == "number" && e >= 0
         },
         finderNextTasker: function() {
            var e = "";
            return e = u.finderNextTaskerFormAuto(), e !== "" || r === "notRun" ? e : (e = u.finderNextTaskerLevel(), e)
         },
         finderOneWaitingTasker: function(e) {
            var t;
            for (var n = 0, r = e.length; n < r; n++) {
               t = e[n];
               if (t.status === "wating") return t
            }
            return ""
         },
         finderNextTaskerFormAuto: function() {
            var e = "";
            return typeof n.auto == "undefined" ? e : (e = u.finderOneWaitingTasker(n.auto), e)
         },
         finderNextTaskerLevel: function() {
            var e = "",
               t, r;
            for (r = 0; r <= s; r++) {
               t = n[r];
               if (typeof t == "undefined") continue;
               e = u.finderOneWaitingTasker(t);
               if (e !== "") return e
            }
            return typeof n.last == "undefined" ? e : u.finderOneWaitingTasker(n.last)
         }
      },
      a = function(t) {
         var n = !1,
            r = !0,
            i = e.document,
            s = i.documentElement,
            o = i.addEventListener ? "addEventListener" : "attachEvent",
            u = i.addEventListener ? "removeEventListener" : "detachEvent",
            a = i.addEventListener ? "" : "on",
            f = function(r) {
               if (r.type === "readystatechange" && i.readyState !== "complete") return;
               (r.type === "load" ? e : i)[u](a + r.type, f, !1), !n && (n = !0) && t.call(e, r.type || r)
            },
            l = function() {
               try {
                  s.doScroll("left")
               } catch (e) {
                  setTimeout(l, 50);
                  return
               }
               f("poll")
            };
         if (i.readyState === "complete") t.call(e, "lazy");
         else {
            if (i.createEventObject && s.doScroll) {
               try {
                  r = !e.frameElement
               } catch (c) {}
               r && l()
            }
            i[o](a + "DOMContentLoaded", f, !1), i[o](a + "readystatechange", f, !1), e[o](a + "load", f, !1)
         }
      };
   tasker = {
      add: function(e, t, r, o) {
         if (!u.validateLevel(e)) return;
         typeof n[e] == "undefined" && (n[e] = []), n[e].push({
            level: e,
            callback: t,
            autoNext: r || !1,
            insertTime: (new Date).valueOf(),
            status: "wating",
            intro: o || ""
         }), typeof e == "number" && (s = s > e ? s : e), e === "auto" && i === "waiting" && tasker.next()
      },
      run: function() {
         r === "notRun" && (r = "runing"), i === "waiting" && (i = "runing", tasker.next())
      },
      runAfterDomReady: function() {
         a(function() {
            tasker.run()
         })
      },
      next: function() {
         o !== "empty" && (o.status = "completed", o.completeTime = (new Date).valueOf());
         var e = u.finderNextTasker();
         if (e === "") {
            r = "notRun", o = "empty", i = "waiting";
            return
         }
         i = "runing", o = e, o.status = "runing", o.executionTime = (new Date).valueOf(), o.autoNext && /tasker\.next\(\)/.test(o.callback.toString()) && alert("您既定义了autoNext为true又在回调中调用了tasker.next()，这两个不能同时存在！");
         try {
            o.callback()
         } catch (t) {
            console.log("bug", t)
         }
         o.autoNext && tasker.next()
      },
      getTaskerList: function() {
         return n
      },
      getMaxLevel: function() {
         return s
      }
   }
})(window, document);
var taskerDebug;
(function(win, doc) {
   var utilities = {
      transToArray: function() {
         var e = tasker.getTaskerList(),
            t = tasker.getMaxLevel(),
            n = [];
         typeof e.auto != "undefined" && (n = n.concat(e.auto));
         for (var r = 0; r <= t; r++) typeof e[r] != "undefined" && (n = n.concat(e[r]));
         return typeof e.last != "undefined" && (n = n.concat(e.last)), n
      },
      drawViewList: function(e) {
         var t, n, r = document.createElement("div");
         r.setAttribute("style", "position: absolute; bottom: 5px; right: 5px;"), r.setAttribute("id", "taskerViewList");
         var i = '<table cellspacing="0" cellpadding="3" border="1">';
         i += "<thead><tr><th>描述</th><th>优先级</th><th>插入时间</th><th>执行时间</th><th>完成时间</th></tr>";
         for (var s = 0, o = e.length; s < o; s++) t = e[s], n = t.intro || utilities.escapeHTML(t.callback.toString()), i += "<tr>", i += '<td style="width: 400px;">' + n + "</td>", i += "<td>" + t.level + "</td>", i += "<td>" + utilities.formatTime(t.insertTime) + "</td>", i += "<td>" + utilities.formatTime(t.executionTime) + "</td>", i += "<td>" + utilities.formatTime(t.completeTime) + "</td>", i += "</tr>";
         i += "</table>", i += "<button onclick=\"document.body.removeChild(document.getElementById('taskerViewList'))\">关闭</button>", document.body.appendChild(r), r.innerHTML = i
      },
      drawTimeLine: function(e) {
         var t, n, r = e[0].executionTime || 0,
            i = utilities.getEndTime(e),
            s = i - r,
            o = s > 0 ? 600 / s : 0,
            u = document.createElement("div");
         u.setAttribute("style", "position: absolute; bottom: 5px; right: 5px;"), u.setAttribute("id", "taskerTimeLine");
         var a = '<table cellspacing="0" cellpadding="3" border="1">';
         a += "<thead><tr><th>描述</th><th>优先级</th><th>插入时间</th><th>时间轴</th></tr>";
         var f, l, c, h;
         for (var p = 0, d = e.length; p < d; p++) t = e[p], typeof t.executionTime != "undefined" ? (f = t.executionTime - r, l = o * f) : (l = 0, f = 0), typeof t.completeTime != "undefined" ? (c = t.completeTime - t.executionTime, h = o * c, h = h < 1 ? 1 : h) : (h = 0, c = 0), n = t.intro || utilities.escapeHTML(t.callback.toString()), a += "<tr>", a += "<td>" + n + "</td>", a += "<td>" + t.level + "</td>", a += "<td>" + utilities.formatTime(t.insertTime) + "</td>", a += "<td>", a += '<div style="display: inline-block; height: 10px; background: #CCC; width: ' + l + 'px" title="' + f + '"></div>', a += '<div style="display: inline-block; height: 10px; background: #C60; width: ' + h + 'px" title="' + c + '"></div>', a += "</td>", a += "</tr>";
         a += "</table>", a += "<button onclick=\"document.body.removeChild(document.getElementById('taskerTimeLine'))\">关闭</button>", document.body.appendChild(u), u.innerHTML = a
      },
      getEndTime: function(e) {
         var t = 0;
         for (var n = 0, r = e.length; n < r; n++) {
            if (typeof e[n].completeTime == "undefined") return t;
            t = e[n].completeTime
         }
         return t
      },
      formatTime: function(e) {
         if (typeof e == "undefined") return "---";
         var t = new Date(e);
         return t.getMinutes() + ":" + t.getSeconds() + ":" + t.getMilliseconds()
      },
      escapeHTML: function(e) {
         var t = e,
            n = [
               [/&/g, "&amp;"],
               [/</g, "&lt;"],
               [/>/g, "&gt;"]
            ];
         for (var r = 0, i = n.length; r < i; r++) t = t.replace(n[r][0], n[r][1]);
         return t
      }
   };
   taskerDebug = {
      viewList: function() {
         var e = utilities.transToArray();
         utilities.drawViewList(e)
      },
      timeLine: function() {
         var e = utilities.transToArray();
         e.sort(function(e, t) {
            var n = e.executionTime || "0",
               r = t.executionTime || "0";
            return n - r
         }), utilities.drawTimeLine(e)
      },
      mapSet: function(e) {
         if (e === "nodebug") return;
         document.cookie = "fdebug=" + encodeURIComponent(e) + ";expires=" + (new Date((new Date).valueOf() + 864e5)).toUTCString()
      },
      mapClear: function() {
         document.cookie = "fdebug=null;expires=" + (new Date((new Date).valueOf() - 6e5)).toUTCString()
      },
      mapGetString: function() {
         var e = document.cookie,
            t = e.indexOf("fdebug="),
            n, r;
         return t > -1 ? (n = e.indexOf(";", t), n === -1 ? r = e.substring(t + 7) : r = e.substring(t + 7, n), r = decodeURIComponent(r)) : r = '"noMap"', r
      },
      mapGet: function() {
         return eval("1," + this.mapGetString())
      },
      creatDebugInput: function() {
         var e = document.createElement("div");
         e.id = "fDebugBox";
         var t = '<div style="position: absolute; right: 5px; bottom: 5px; z-index:2147483647"><div id="fDebugBoxIn" style="display: none; padding: 5px; border: 1px solid #999; background: #CCC; text-align: right;"><textarea id="fDebugBoxText" style="width: 300px; height: 150px; border: 1px solid #999; background: #FFF; margin-bottom: 5px;">' + this.mapGetString() + "</textarea><br/>" + '<button id="fDebugBoxBtn1" type="button" >开启映射</button>' + '<button id="fDebugBoxBtn2" type="button" >清除映射</button>' + "</div>" + '<div id="fDebugBoxShowHide" data-toggle="hide" style = "border: 1px solid #999; background: #FFC; ' + 'padding: 5px; cursor: pointer; text-align: right; border-top: 1px solid #CCC;" onclick = "showHi">显示调试</div>' + "</div>";
         e.innerHTML = t, document.body.appendChild(e);
         var n = document.getElementById("fDebugBoxShowHide"),
            r = document.getElementById("fDebugBoxBtn1"),
            i = document.getElementById("fDebugBoxBtn2"),
            s = document.getElementById("fDebugBoxText"),
            o = document.getElementById("fDebugBoxIn");
         n.onclick = function() {
            this.getAttribute("data-toggle") === "hide" ? (o.style.display = "", this.setAttribute("data-toggle", "show"), this.innerHTML = "隐藏调试") : (o.style.display = "none", this.setAttribute("data-toggle", "hide"), this.innerHTML = "显示调试")
         }, r.onclick = function() {
            taskerDebug.mapSet(s.value)
         }, i.onclick = function() {
            taskerDebug.mapClear()
         }
      }
   };
   var addEventListener = function() {
      return win.addEventListener ? function(e, t, n) {
         e.addEventListener(t, n, !1)
      } : function(e, t, n) {
         e.attachEvent("on" + t, n)
      }
   }();
   addEventListener(win, "load", function() {
      window.location.href.indexOf("fdebug=true") > -1 && taskerDebug.creatDebugInput()
   })
})(window, document);
var creatTasker = function(e, t, n, r, i) {
   var s = !1;
   typeof t == "string" && (t = [t]), typeof n == "string" && (i = r, n === "next" && (s = !0), n = function() {}), r !== "next" ? i = r : s = !0, tasker.add(e, function() {
      try {
         require(t, n)
      } catch (e) {
         console.log(e)
      }
   }, s, i || "")
};
(function(e, t) {
   var n = requirejs.config,
      r = taskerDebug.mapGet(),
      i = r !== "noMap" || e.location.href.indexOf("fdebug=true") > -1,
      s = r.offMini === !0 || e.location.href.indexOf("offMini=true") > -1;
   requirejs.config = function(e) {
      var t = e.paths,
         o;
      if (typeof t != "undefined")
         for (var u in t) o = t[u], typeof r[o] != "undefined" ? e.paths[u] = r[o] : i && s && (e.paths[u] = o.replace(/\.min/, ""));
      n.call(requirejs, e)
   }
})(window);
var device = function(e, t, n) {
   n = {
      type: "pc"
   };
   var r = function(e) {
         var t = {},
            n = t.os = {},
            r = t.browser = {},
            i = e.match(/WebKit\/([\d.]+)/),
            s = e.match(/(Android)\s+([\d.]+)/),
            o = e.match(/(iPad).*OS\s([\d_]+)/),
            u = !o && e.match(/(iPhone\sOS)\s([\d_]+)/),
            a = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            f = a && e.match(/TouchPad/),
            l = e.match(/Kindle\/([\d.]+)/),
            c = e.match(/Silk\/([\d._]+)/),
            h = e.match(/(BlackBerry).*Version\/([\d.]+)/),
            p = e.match(/(BB10).*Version\/([\d.]+)/),
            d = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            v = e.match(/PlayBook/),
            m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
            g = e.match(/Firefox\/([\d.]+)/),
            y = e.match(/Windows Phone/);
         return r.webkit = !!i, r.webkit && (r.version = i[1]), y && (n.wphone = !0), s && (n.android = !0, n.version = s[2]), u && (n.ios = !0, n.iphone = !0, n.version = u[2].replace(/_/g, ".")), o && (n.ios = !0, n.ipad = !0, n.version = o[2].replace(/_/g, ".")), a && (n.webos = !0, n.version = a[2]), f && (n.touchpad = !0), h && (n.blackberry = !0, n.version = h[2]), p && (n.bb10 = !0, n.version = p[2]), d && (n.rimtabletos = !0, n.version = d[2]), v && (r.playbook = !0), l && (n.kindle = !0, n.version = l[1]), c && (r.silk = !0, r.version = c[1]), !c && n.android && e.match(/Kindle Fire/) && (r.silk = !0), m && (r.chrome = !0, r.version = m[1]), g && (r.firefox = !0, r.version = g[1]), n.tablet = !!(o || v || s && !e.match(/Mobile/) || g && e.match(/Tablet/)), n.phone = !!(!n.tablet && (s || u || a || h || p || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/)) || y), t
      },
      i = r(navigator.userAgent);
   n.config = i, i.os.tablet && (n.type = "pad"), i.os.phone && (n.type = "mobile");
   var s = t.screen.width,
      o = t.screen.height,
      u = t.innerWidth,
      a = t.innerHeight;
   if (i.os.ios || n.type === "pc") n.width = s, n.height = o;
   else {
      var f = s / u,
         l = o / a,
         c = f < l ? f : l;
      n.width = Math.floor(s / c), n.height = Math.floor(o / c)
   }
   return n
}(document, window);