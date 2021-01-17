/**
 * @popperjs/core v2.6.0 - MIT License
 */

"use strict";
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports)
        : "function" == typeof define && define.amd
            ? define(["exports"], t)
            : t(((e = e || self).Popper = {}));
})(this, function (e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top,
        };
    }
    function n(e) {
        return "[object Window]" !== e.toString()
            ? ((e = e.ownerDocument) && e.defaultView) || window
            : e;
    }
    function r(e) {
        return { scrollLeft: (e = n(e)).pageXOffset, scrollTop: e.pageYOffset };
    }
    function o(e) {
        return e instanceof n(e).Element || e instanceof Element;
    }
    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement;
    }
    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function s(e) {
        return (
            (o(e) ? e.ownerDocument : e.document) || window.document
        ).documentElement;
    }
    function f(e) {
        return t(s(e)).left + r(e).scrollLeft;
    }
    function c(e) {
        return n(e).getComputedStyle(e);
    }
    function p(e) {
        return (
            (e = c(e)),
            /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
        );
    }
    function l(e, o, c) {
        void 0 === c && (c = !1);
        var l = s(o);
        e = t(e);
        var u = i(o),
            d = { scrollLeft: 0, scrollTop: 0 },
            m = { x: 0, y: 0 };
        return (
            (u || (!u && !c)) &&
            (("body" !== a(o) || p(l)) &&
                (d =
                    o !== n(o) && i(o)
                        ? { scrollLeft: o.scrollLeft, scrollTop: o.scrollTop }
                        : r(o)),
                i(o)
                    ? (((m = t(o)).x += o.clientLeft), (m.y += o.clientTop))
                    : l && (m.x = f(l))),
            {
                x: e.left + d.scrollLeft - m.x,
                y: e.top + d.scrollTop - m.y,
                width: e.width,
                height: e.height,
            }
        );
    }
    function u(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight,
        };
    }
    function d(e) {
        return "html" === a(e)
            ? e
            : e.assignedSlot || e.parentNode || e.host || s(e);
    }
    function m(e, t) {
        void 0 === t && (t = []);
        var r = (function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t))
                ? t.ownerDocument.body
                : i(t) && p(t)
                    ? t
                    : e(d(t));
        })(e);
        e = "body" === a(r);
        var o = n(r);
        return (
            (r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r),
            (t = t.concat(r)),
            e ? t : t.concat(m(d(r)))
        );
    }
    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null;
        if ((e = e.offsetParent)) {
            var t = s(e);
            if (
                "body" === a(e) &&
                "static" === c(e).position &&
                "static" !== c(t).position
            )
                return t;
        }
        return e;
    }
    function g(e) {
        for (
            var t = n(e), r = h(e);
            r &&
            0 <= ["table", "td", "th"].indexOf(a(r)) &&
            "static" === c(r).position;

        )
            r = h(r);
        if (r && "body" === a(r) && "static" === c(r).position) return t;
        if (!r)
            e: {
                for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
                    if (
                        "none" !== (r = c(e)).transform ||
                        "none" !== r.perspective ||
                        (r.willChange && "auto" !== r.willChange)
                    ) {
                        r = e;
                        break e;
                    }
                    e = e.parentNode;
                }
                r = null;
            }
        return r || t;
    }
    function v(e) {
        var t = new Map(),
            n = new Set(),
            r = [];
        return (
            e.forEach(function (e) {
                t.set(e.name, e);
            }),
            e.forEach(function (e) {
                n.has(e.name) ||
                    (function e(o) {
                        n.add(o.name),
                            []
                                .concat(o.requires || [], o.requiresIfExists || [])
                                .forEach(function (r) {
                                    n.has(r) || ((r = t.get(r)) && e(r));
                                }),
                            r.push(o);
                    })(e);
            }),
            r
        );
    }
    function b(e) {
        var t;
        return function () {
            return (
                t ||
                (t = new Promise(function (n) {
                    Promise.resolve().then(function () {
                        (t = void 0), n(e());
                    });
                })),
                t
            );
        };
    }
    function y(e) {
        return e.split("-")[0];
    }
    function O(e, t) {
        var r,
            o = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (
            ((r = o) &&
                (r = o instanceof (r = n(o).ShadowRoot) || o instanceof ShadowRoot),
                r)
        )
            do {
                if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host;
            } while (t);
        return !1;
    }
    function w(e) {
        return Object.assign(
            Object.assign({}, e),
            {},
            { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }
        );
    }
    function x(e, o) {
        if ("viewport" === o) {
            o = n(e);
            var a = s(e);
            o = o.visualViewport;
            var p = a.clientWidth;
            a = a.clientHeight;
            var l = 0,
                u = 0;
            o &&
                ((p = o.width),
                    (a = o.height),
                    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                    ((l = o.offsetLeft), (u = o.offsetTop))),
                (e = w((e = { width: p, height: a, x: l + f(e), y: u })));
        } else i(o) ? (((e = t(o)).top += o.clientTop), (e.left += o.clientLeft), (e.bottom = e.top + o.clientHeight), (e.right = e.left + o.clientWidth), (e.width = o.clientWidth), (e.height = o.clientHeight), (e.x = e.left), (e.y = e.top)) : ((u = s(e)), (e = s(u)), (l = r(u)), (o = u.ownerDocument.body), (p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0)), (a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0)), (u = -l.scrollLeft + f(u)), (l = -l.scrollTop), "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), (e = w({ width: p, height: a, x: u, y: l })));
        return e;
    }
    function j(e, t, n) {
        return (
            (t =
                "clippingParents" === t
                    ? (function (e) {
                        var t = m(d(e)),
                            n =
                                0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e)
                                    ? g(e)
                                    : e;
                        return o(n)
                            ? t.filter(function (e) {
                                return o(e) && O(e, n) && "body" !== a(e);
                            })
                            : [];
                    })(e)
                    : [].concat(t)),
            ((n = (n = [].concat(t, [n])).reduce(function (t, n) {
                return (
                    (n = x(e, n)),
                    (t.top = Math.max(n.top, t.top)),
                    (t.right = Math.min(n.right, t.right)),
                    (t.bottom = Math.min(n.bottom, t.bottom)),
                    (t.left = Math.max(n.left, t.left)),
                    t
                );
            }, x(e, n[0]))).width = n.right - n.left),
            (n.height = n.bottom - n.top),
            (n.x = n.left),
            (n.y = n.top),
            n
        );
    }
    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y";
    }
    function E(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case "top":
                o = { x: o, y: t.y - n.height };
                break;
            case "bottom":
                o = { x: o, y: t.y + t.height };
                break;
            case "right":
                o = { x: t.x + t.width, y: i };
                break;
            case "left":
                o = { x: t.x - n.width, y: i };
                break;
            default:
                o = { x: t.x, y: t.y };
        }
        if (null != (r = r ? M(r) : null))
            switch (((i = "y" === r ? "height" : "width"), e)) {
                case "start":
                    o[r] -= t[i] / 2 - n[i] / 2;
                    break;
                case "end":
                    o[r] += t[i] / 2 - n[i] / 2;
            }
        return o;
    }
    function D(e) {
        return Object.assign(
            Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }),
            e
        );
    }
    function P(e, t) {
        return t.reduce(function (t, n) {
            return (t[n] = e), t;
        }, {});
    }
    function L(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var c = r.altBoundary,
            p = void 0 !== c && c;
        r = D(
            "number" != typeof (r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, T)
        );
        var l = e.elements.reference;
        (c = e.rects.popper),
            (a = j(
                o((p = e.elements[p ? ("popper" === i ? "reference" : "popper") : i]))
                    ? p
                    : p.contextElement || s(e.elements.popper),
                a,
                f
            )),
            (p = E({
                reference: (f = t(l)),
                element: c,
                strategy: "absolute",
                placement: n,
            })),
            (c = w(Object.assign(Object.assign({}, c), p))),
            (f = "popper" === i ? c : f);
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right,
        };
        if (((e = e.modifiersData.offset), "popper" === i && e)) {
            var d = e[n];
            Object.keys(u).forEach(function (e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t;
            });
        }
        return u;
    }
    function k() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return !t.some(function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        });
    }
    function B(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e;
        return function (e, t, i) {
            function a() {
                f.forEach(function (e) {
                    return e();
                }),
                    (f = []);
            }
            void 0 === i && (i = r);
            var s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign(Object.assign({}, V), r),
                modifiersData: {},
                elements: { reference: e, popper: t },
                attributes: {},
                styles: {},
            },
                f = [],
                c = !1,
                p = {
                    state: s,
                    setOptions: function (i) {
                        return (
                            a(),
                            (s.options = Object.assign(
                                Object.assign(Object.assign({}, r), s.options),
                                i
                            )),
                            (s.scrollParents = {
                                reference: o(e)
                                    ? m(e)
                                    : e.contextElement
                                        ? m(e.contextElement)
                                        : [],
                                popper: m(t),
                            }),
                            (i = (function (e) {
                                var t = v(e);
                                return N.reduce(function (e, n) {
                                    return e.concat(
                                        t.filter(function (e) {
                                            return e.phase === n;
                                        })
                                    );
                                }, []);
                            })(
                                (function (e) {
                                    var t = e.reduce(function (e, t) {
                                        var n = e[t.name];
                                        return (
                                            (e[t.name] = n
                                                ? Object.assign(
                                                    Object.assign(Object.assign({}, n), t),
                                                    {},
                                                    {
                                                        options: Object.assign(
                                                            Object.assign({}, n.options),
                                                            t.options
                                                        ),
                                                        data: Object.assign(
                                                            Object.assign({}, n.data),
                                                            t.data
                                                        ),
                                                    }
                                                )
                                                : t),
                                            e
                                        );
                                    }, {});
                                    return Object.keys(t).map(function (e) {
                                        return t[e];
                                    });
                                })([].concat(n, s.options.modifiers))
                            )),
                            (s.orderedModifiers = i.filter(function (e) {
                                return e.enabled;
                            })),
                            s.orderedModifiers.forEach(function (e) {
                                var t = e.name,
                                    n = e.options;
                                (n = void 0 === n ? {} : n),
                                    "function" == typeof (e = e.effect) &&
                                    ((t = e({ state: s, name: t, instance: p, options: n })),
                                        f.push(t || function () { }));
                            }),
                            p.update()
                        );
                    },
                    forceUpdate: function () {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference;
                            if (k(t, (e = e.popper)))
                                for (
                                    s.rects = {
                                        reference: l(t, g(e), "fixed" === s.options.strategy),
                                        popper: u(e),
                                    },
                                    s.reset = !1,
                                    s.placement = s.options.placement,
                                    s.orderedModifiers.forEach(function (e) {
                                        return (s.modifiersData[e.name] = Object.assign(
                                            {},
                                            e.data
                                        ));
                                    }),
                                    t = 0;
                                    t < s.orderedModifiers.length;
                                    t++
                                )
                                    if (!0 === s.reset) (s.reset = !1), (t = -1);
                                    else {
                                        var n = s.orderedModifiers[t];
                                        e = n.fn;
                                        var r = n.options;
                                        (r = void 0 === r ? {} : r),
                                            (n = n.name),
                                            "function" == typeof e &&
                                            (s =
                                                e({ state: s, options: r, name: n, instance: p }) ||
                                                s);
                                    }
                        }
                    },
                    update: b(function () {
                        return new Promise(function (e) {
                            p.forceUpdate(), e(s);
                        });
                    }),
                    destroy: function () {
                        a(), (c = !0);
                    },
                };
            return k(e, t)
                ? (p.setOptions(i).then(function (e) {
                    !c && i.onFirstUpdate && i.onFirstUpdate(e);
                }),
                    p)
                : p;
        };
    }
    function W(e) {
        var t,
            r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive;
        e.roundOffsets
            ? ((e = window.devicePixelRatio || 1),
                (e = {
                    x: Math.round(a.x * e) / e || 0,
                    y: Math.round(a.y * e) / e || 0,
                }))
            : (e = a);
        var l = e;
        (e = void 0 === (e = l.x) ? 0 : e), (l = void 0 === (l = l.y) ? 0 : l);
        var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var d,
            m = "left",
            h = "top",
            v = window;
        if (p) {
            var b = g(r);
            b === n(r) && (b = s(r)),
                "top" === i &&
                ((h = "bottom"), (l -= b.clientHeight - o.height), (l *= c ? 1 : -1)),
                "left" === i &&
                ((m = "right"), (e -= b.clientWidth - o.width), (e *= c ? 1 : -1));
        }
        return (
            (r = Object.assign({ position: f }, p && z)),
            c
                ? Object.assign(
                    Object.assign({}, r),
                    {},
                    (((d = {})[h] = a ? "0" : ""),
                        (d[m] = u ? "0" : ""),
                        (d.transform =
                            2 > (v.devicePixelRatio || 1)
                                ? "translate(" + e + "px, " + l + "px)"
                                : "translate3d(" + e + "px, " + l + "px, 0)"),
                        d)
                )
                : Object.assign(
                    Object.assign({}, r),
                    {},
                    (((t = {})[h] = a ? l + "px" : ""),
                        (t[m] = u ? e + "px" : ""),
                        (t.transform = ""),
                        t)
                )
        );
    }
    function A(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
            return G[e];
        });
    }
    function H(e) {
        return e.replace(/start|end/g, function (e) {
            return J[e];
        });
    }
    function R(e, t, n) {
        return (
            void 0 === n && (n = { x: 0, y: 0 }),
            {
                top: e.top - t.height - n.y,
                right: e.right - t.width + n.x,
                bottom: e.bottom - t.height + n.y,
                left: e.left - t.width - n.x,
            }
        );
    }
    function S(e) {
        return ["top", "right", "bottom", "left"].some(function (t) {
            return 0 <= e[t];
        });
    }
    var T = ["top", "bottom", "right", "left"],
        q = T.reduce(function (e, t) {
            return e.concat([t + "-start", t + "-end"]);
        }, []),
        C = [].concat(T, ["auto"]).reduce(function (e, t) {
            return e.concat([t, t + "-start", t + "-end"]);
        }, []),
        N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(
            " "
        ),
        V = { placement: "bottom", modifiers: [], strategy: "absolute" },
        I = { passive: !0 },
        _ = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () { },
            effect: function (e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return (
                    i &&
                    f.forEach(function (e) {
                        e.addEventListener("scroll", r.update, I);
                    }),
                    a && s.addEventListener("resize", r.update, I),
                    function () {
                        i &&
                            f.forEach(function (e) {
                                e.removeEventListener("scroll", r.update, I);
                            }),
                            a && s.removeEventListener("resize", r.update, I);
                    }
                );
            },
            data: {},
        },
        U = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function (e) {
                var t = e.state;
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement,
                });
            },
            data: {},
        },
        z = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
        F = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (e) {
                var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e;
                var r = n.adaptive;
                (r = void 0 === r || r),
                    (n = void 0 === (n = n.roundOffsets) || n),
                    (e = {
                        placement: y(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: e,
                    }),
                    null != t.modifiersData.popperOffsets &&
                    (t.styles.popper = Object.assign(
                        Object.assign({}, t.styles.popper),
                        W(
                            Object.assign(
                                Object.assign({}, e),
                                {},
                                {
                                    offsets: t.modifiersData.popperOffsets,
                                    position: t.options.strategy,
                                    adaptive: r,
                                    roundOffsets: n,
                                }
                            )
                        )
                    )),
                    null != t.modifiersData.arrow &&
                    (t.styles.arrow = Object.assign(
                        Object.assign({}, t.styles.arrow),
                        W(
                            Object.assign(
                                Object.assign({}, e),
                                {},
                                {
                                    offsets: t.modifiersData.arrow,
                                    position: "absolute",
                                    adaptive: !1,
                                    roundOffsets: n,
                                }
                            )
                        )
                    )),
                    (t.attributes.popper = Object.assign(
                        Object.assign({}, t.attributes.popper),
                        {},
                        { "data-popper-placement": t.placement }
                    ));
            },
            data: {},
        },
        X = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function (e) {
                var t = e.state;
                Object.keys(t.elements).forEach(function (e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) &&
                        a(o) &&
                        (Object.assign(o.style, n),
                            Object.keys(r).forEach(function (e) {
                                var t = r[e];
                                !1 === t
                                    ? o.removeAttribute(e)
                                    : o.setAttribute(e, !0 === t ? "" : t);
                            }));
                });
            },
            effect: function (e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0",
                        },
                        arrow: { position: "absolute" },
                        reference: {},
                    };
                return (
                    Object.assign(t.elements.popper.style, n.popper),
                    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function () {
                        Object.keys(t.elements).forEach(function (e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {};
                            (e = Object.keys(
                                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                            ).reduce(function (e, t) {
                                return (e[t] = ""), e;
                            }, {})),
                                i(r) &&
                                a(r) &&
                                (Object.assign(r.style, e),
                                    Object.keys(o).forEach(function (e) {
                                        r.removeAttribute(e);
                                    }));
                        });
                    }
                );
            },
            requires: ["computeStyles"],
        },
        Y = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function (e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = C.reduce(function (e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s =
                                "function" == typeof r
                                    ? r(Object.assign(Object.assign({}, o), {}, { placement: n }))
                                    : r;
                        return (
                            (o = (o = s[0]) || 0),
                            (s = ((s = s[1]) || 0) * a),
                            (i =
                                0 <= ["left", "right"].indexOf(i)
                                    ? { x: s, y: o }
                                    : { x: o, y: s }),
                            (e[n] = i),
                            e
                        );
                    }, {}))[t.placement],
                    i = o.x;
                (o = o.y),
                    null != t.modifiersData.popperOffsets &&
                    ((t.modifiersData.popperOffsets.x += i),
                        (t.modifiersData.popperOffsets.y += o)),
                    (t.modifiersData[n] = e);
            },
        },
        G = { left: "right", right: "left", bottom: "top", top: "bottom" },
        J = { start: "end", end: "start" },
        K = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t = e.state,
                    n = e.options;
                if (((e = e.name), !t.modifiersData[e]._skip)) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements;
                    (p = y((n = t.options.placement))),
                        (i =
                            i ||
                            (p !== n && l
                                ? (function (e) {
                                    if ("auto" === y(e)) return [];
                                    var t = A(e);
                                    return [H(e), t, H(t)];
                                })(n)
                                : [A(n)]));
                    var d = [n].concat(i).reduce(function (e, n) {
                        return e.concat(
                            "auto" === y(n)
                                ? (function (e, t) {
                                    void 0 === t && (t = {});
                                    var n = t.boundary,
                                        r = t.rootBoundary,
                                        o = t.padding,
                                        i = t.flipVariations,
                                        a = t.allowedAutoPlacements,
                                        s = void 0 === a ? C : a,
                                        f = t.placement.split("-")[1];
                                    0 ===
                                        (i = (t = f
                                            ? i
                                                ? q
                                                : q.filter(function (e) {
                                                    return e.split("-")[1] === f;
                                                })
                                            : T).filter(function (e) {
                                                return 0 <= s.indexOf(e);
                                            })).length && (i = t);
                                    var c = i.reduce(function (t, i) {
                                        return (
                                            (t[i] = L(e, {
                                                placement: i,
                                                boundary: n,
                                                rootBoundary: r,
                                                padding: o,
                                            })[y(i)]),
                                            t
                                        );
                                    }, {});
                                    return Object.keys(c).sort(function (e, t) {
                                        return c[e] - c[t];
                                    });
                                })(t, {
                                    placement: n,
                                    boundary: s,
                                    rootBoundary: f,
                                    padding: a,
                                    flipVariations: l,
                                    allowedAutoPlacements: u,
                                })
                                : n
                        );
                    }, []);
                    (n = t.rects.reference), (i = t.rects.popper);
                    var m = new Map();
                    p = !0;
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var v = d[g],
                            b = y(v),
                            O = "start" === v.split("-")[1],
                            w = 0 <= ["top", "bottom"].indexOf(b),
                            x = w ? "width" : "height",
                            j = L(t, {
                                placement: v,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: c,
                                padding: a,
                            });
                        if (
                            ((O = w ? (O ? "right" : "left") : O ? "bottom" : "top"),
                                n[x] > i[x] && (O = A(O)),
                                (x = A(O)),
                                (w = []),
                                r && w.push(0 >= j[b]),
                                o && w.push(0 >= j[O], 0 >= j[x]),
                                w.every(function (e) {
                                    return e;
                                }))
                        ) {
                            (h = v), (p = !1);
                            break;
                        }
                        m.set(v, w);
                    }
                    if (p)
                        for (
                            r = function (e) {
                                var t = d.find(function (t) {
                                    if ((t = m.get(t)))
                                        return t.slice(0, e).every(function (e) {
                                            return e;
                                        });
                                });
                                if (t) return (h = t), "break";
                            },
                            o = l ? 3 : 1;
                            0 < o && "break" !== r(o);
                            o--
                        );
                    t.placement !== h &&
                        ((t.modifiersData[e]._skip = !0),
                            (t.placement = h),
                            (t.reset = !0));
                }
            },
            requiresIfExists: ["offset"],
            data: { _skip: !1 },
        },
        Q = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                (n = L(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary,
                })),
                    (a = y(t.placement));
                var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a);
                a = "x" === p ? "y" : "x";
                var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h =
                        "function" == typeof s
                            ? s(
                                Object.assign(
                                    Object.assign({}, t.rects),
                                    {},
                                    { placement: t.placement }
                                )
                            )
                            : s;
                if (((s = { x: 0, y: 0 }), l)) {
                    if (o) {
                        var v = "y" === p ? "top" : "left",
                            b = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p];
                        var w = l[p] + n[v],
                            x = l[p] - n[b],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O];
                        (f = "start" === f ? -m[O] : -d[O]),
                            (m = t.elements.arrow),
                            (m = i && m ? u(m) : { width: 0, height: 0 });
                        var D = t.modifiersData["arrow#persistent"]
                            ? t.modifiersData["arrow#persistent"].padding
                            : { top: 0, right: 0, bottom: 0, left: 0 };
                        (v = D[v]),
                            (b = D[b]),
                            (m = Math.max(0, Math.min(d[O], m[O]))),
                            (E = c ? d[O] / 2 - j - m - v - h : E - m - v - h),
                            (c = c ? -d[O] / 2 + j + m + b + h : f + m + b + h),
                            (h = t.elements.arrow && g(t.elements.arrow)),
                            (d = t.modifiersData.offset
                                ? t.modifiersData.offset[t.placement][p]
                                : 0),
                            (h =
                                l[p] +
                                E -
                                d -
                                (h ? ("y" === p ? h.clientTop || 0 : h.clientLeft || 0) : 0)),
                            (c = l[p] + c - d),
                            (i = Math.max(
                                i ? Math.min(w, h) : w,
                                Math.min(o, i ? Math.max(x, c) : x)
                            )),
                            (l[p] = i),
                            (s[p] = i - o);
                    }
                    r &&
                        ((r = l[a]),
                            (i = Math.max(
                                r + n["x" === p ? "top" : "left"],
                                Math.min(r, r - n["x" === p ? "bottom" : "right"])
                            )),
                            (l[a] = i),
                            (s[a] = i - r)),
                        (t.modifiersData[e] = s);
                }
            },
            requiresIfExists: ["offset"],
        },
        Z = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t,
                    n = e.state;
                e = e.name;
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i);
                if (
                    ((i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width"), r && o)
                ) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l =
                            n.rects.reference[i] +
                            n.rects.reference[a] -
                            o[a] -
                            n.rects.popper[i];
                    (o = o[a] - n.rects.reference[a]),
                        (l =
                            (r = (r = g(r))
                                ? "y" === a
                                    ? r.clientHeight || 0
                                    : r.clientWidth || 0
                                : 0) /
                            2 -
                            f[i] / 2 +
                            (l / 2 - o / 2)),
                        (i = Math.max(s[c], Math.min(l, r - f[i] - s[p]))),
                        (n.modifiersData[e] =
                            (((t = {})[a] = i), (t.centerOffset = i - l), t));
                }
            },
            effect: function (e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.element;
                if (
                    ((r = void 0 === r ? "[data-popper-arrow]" : r),
                        (n = void 0 === (n = n.padding) ? 0 : n),
                        null != r)
                ) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r)))
                        return;
                    O(t.elements.popper, r) &&
                        ((t.elements.arrow = r),
                            (t.modifiersData[e + "#persistent"] = {
                                padding: D("number" != typeof n ? n : P(n, T)),
                            }));
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
        },
        $ = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function (e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = L(t, { elementContext: "reference" }),
                    a = L(t, { altBoundary: !0 });
                (n = R(i, n)),
                    (r = R(a, r, o)),
                    (o = S(n)),
                    (a = S(r)),
                    (t.modifiersData[e] = {
                        referenceClippingOffsets: n,
                        popperEscapeOffsets: r,
                        isReferenceHidden: o,
                        hasPopperEscaped: a,
                    }),
                    (t.attributes.popper = Object.assign(
                        Object.assign({}, t.attributes.popper),
                        {},
                        { "data-popper-reference-hidden": o, "data-popper-escaped": a }
                    ));
            },
        },
        ee = B({ defaultModifiers: [_, U, F, X] }),
        te = [_, U, F, X, Y, K, Q, Z, $],
        ne = B({ defaultModifiers: te });
    (e.applyStyles = X),
        (e.arrow = Z),
        (e.computeStyles = F),
        (e.createPopper = ne),
        (e.createPopperLite = ee),
        (e.defaultModifiers = te),
        (e.detectOverflow = L),
        (e.eventListeners = _),
        (e.flip = K),
        (e.hide = $),
        (e.offset = Y),
        (e.popperGenerator = B),
        (e.popperOffsets = U),
        (e.preventOverflow = Q),
        Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=popper.min.js.map

!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e(require("@popperjs/core")))
        : "function" == typeof define && define.amd
            ? define(["@popperjs/core"], e)
            : ((t = t || self).tippy = e(t.Popper));
})(this, function (t) {
    "use strict";
    var e = "undefined" != typeof window && "undefined" != typeof document,
        n = e ? navigator.userAgent : "",
        r = /MSIE |Trident\//.test(n),
        i = { passive: !0, capture: !0 };
    function o(t, e, n) {
        if (Array.isArray(t)) {
            var r = t[e];
            return null == r ? (Array.isArray(n) ? n[e] : n) : r;
        }
        return t;
    }
    function a(t, e) {
        var n = {}.toString.call(t);
        return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1;
    }
    function s(t, e) {
        return "function" == typeof t ? t.apply(void 0, e) : t;
    }
    function u(t, e) {
        return 0 === e
            ? t
            : function (r) {
                clearTimeout(n),
                    (n = setTimeout(function () {
                        t(r);
                    }, e));
            };
        var n;
    }
    function c(t, e) {
        var n = Object.assign({}, t);
        return (
            e.forEach(function (t) {
                delete n[t];
            }),
            n
        );
    }
    function p(t) {
        return [].concat(t);
    }
    function f(t, e) {
        -1 === t.indexOf(e) && t.push(e);
    }
    function l(t) {
        return t.split("-")[0];
    }
    function d(t) {
        return [].slice.call(t);
    }
    function v() {
        return document.createElement("div");
    }
    function m(t) {
        return ["Element", "Fragment"].some(function (e) {
            return a(t, e);
        });
    }
    function g(t) {
        return a(t, "MouseEvent");
    }
    function h(t) {
        return !(!t || !t._tippy || t._tippy.reference !== t);
    }
    function b(t) {
        return m(t)
            ? [t]
            : (function (t) {
                return a(t, "NodeList");
            })(t)
                ? d(t)
                : Array.isArray(t)
                    ? t
                    : d(document.querySelectorAll(t));
    }
    function y(t, e) {
        t.forEach(function (t) {
            t && (t.style.transitionDuration = e + "ms");
        });
    }
    function x(t, e) {
        t.forEach(function (t) {
            t && t.setAttribute("data-state", e);
        });
    }
    function w(t) {
        var e = p(t)[0];
        return (e && e.ownerDocument) || document;
    }
    function E(t, e, n) {
        var r = e + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach(function (e) {
            t[r](e, n);
        });
    }
    var T = { isTouch: !1 },
        C = 0;
    function A() {
        T.isTouch ||
            ((T.isTouch = !0),
                window.performance && document.addEventListener("mousemove", O));
    }
    function O() {
        var t = performance.now();
        t - C < 20 &&
            ((T.isTouch = !1), document.removeEventListener("mousemove", O)),
            (C = t);
    }
    function L() {
        var t = document.activeElement;
        if (h(t)) {
            var e = t._tippy;
            t.blur && !e.state.isVisible && t.blur();
        }
    }
    var D = Object.assign(
        {
            appendTo: function () {
                return document.body;
            },
            aria: { content: "auto", expanded: "auto" },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () { },
            onBeforeUpdate: function () { },
            onCreate: function () { },
            onDestroy: function () { },
            onHidden: function () { },
            onHide: function () { },
            onMount: function () { },
            onShow: function () { },
            onShown: function () { },
            onTrigger: function () { },
            onUntrigger: function () { },
            onClickOutside: function () { },
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null,
        },
        { animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1 },
        {},
        {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999,
        }
    ),
        k = Object.keys(D);
    function R(t) {
        var e = (t.plugins || []).reduce(function (e, n) {
            var r = n.name,
                i = n.defaultValue;
            return r && (e[r] = void 0 !== t[r] ? t[r] : i), e;
        }, {});
        return Object.assign({}, t, {}, e);
    }
    function M(t, e) {
        var n = Object.assign(
            {},
            e,
            { content: s(e.content, [t]) },
            e.ignoreAttributes
                ? {}
                : (function (t, e) {
                    return (e
                        ? Object.keys(R(Object.assign({}, D, { plugins: e })))
                        : k
                    ).reduce(function (e, n) {
                        var r = (t.getAttribute("data-tippy-" + n) || "").trim();
                        if (!r) return e;
                        if ("content" === n) e[n] = r;
                        else
                            try {
                                e[n] = JSON.parse(r);
                            } catch (t) {
                                e[n] = r;
                            }
                        return e;
                    }, {});
                })(t, e.plugins)
        );
        return (
            (n.aria = Object.assign({}, D.aria, {}, n.aria)),
            (n.aria = {
                expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
                content:
                    "auto" === n.aria.content
                        ? e.interactive
                            ? null
                            : "describedby"
                        : n.aria.content,
            }),
            n
        );
    }
    function P(t, e) {
        t.innerHTML = e;
    }
    function V(t) {
        var e = v();
        return (
            !0 === t
                ? (e.className = "tippy-arrow")
                : ((e.className = "tippy-svg-arrow"),
                    m(t) ? e.appendChild(t) : P(e, t)),
            e
        );
    }
    function j(t, e) {
        m(e.content)
            ? (P(t, ""), t.appendChild(e.content))
            : "function" != typeof e.content &&
            (e.allowHTML ? P(t, e.content) : (t.textContent = e.content));
    }
    function I(t) {
        var e = t.firstElementChild,
            n = d(e.children);
        return {
            box: e,
            content: n.find(function (t) {
                return t.classList.contains("tippy-content");
            }),
            arrow: n.find(function (t) {
                return (
                    t.classList.contains("tippy-arrow") ||
                    t.classList.contains("tippy-svg-arrow")
                );
            }),
            backdrop: n.find(function (t) {
                return t.classList.contains("tippy-backdrop");
            }),
        };
    }
    function S(t) {
        var e = v(),
            n = v();
        (n.className = "tippy-box"),
            n.setAttribute("data-state", "hidden"),
            n.setAttribute("tabindex", "-1");
        var r = v();
        function i(n, r) {
            var i = I(e),
                o = i.box,
                a = i.content,
                s = i.arrow;
            r.theme
                ? o.setAttribute("data-theme", r.theme)
                : o.removeAttribute("data-theme"),
                "string" == typeof r.animation
                    ? o.setAttribute("data-animation", r.animation)
                    : o.removeAttribute("data-animation"),
                r.inertia
                    ? o.setAttribute("data-inertia", "")
                    : o.removeAttribute("data-inertia"),
                (o.style.maxWidth =
                    "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth),
                r.role ? o.setAttribute("role", r.role) : o.removeAttribute("role"),
                (n.content === r.content && n.allowHTML === r.allowHTML) ||
                j(a, t.props),
                r.arrow
                    ? s
                        ? n.arrow !== r.arrow &&
                        (o.removeChild(s), o.appendChild(V(r.arrow)))
                        : o.appendChild(V(r.arrow))
                    : s && o.removeChild(s);
        }
        return (
            (r.className = "tippy-content"),
            r.setAttribute("data-state", "hidden"),
            j(r, t.props),
            e.appendChild(n),
            n.appendChild(r),
            i(t.props, t.props),
            { popper: e, onUpdate: i }
        );
    }
    S.$$tippy = !0;
    var B = 1,
        H = [],
        N = [];
    function U(e, n) {
        var a,
            c,
            m,
            h,
            b,
            C,
            A,
            O,
            L,
            k = M(
                e,
                Object.assign(
                    {},
                    D,
                    {},
                    R(
                        ((a = n),
                            Object.keys(a).reduce(function (t, e) {
                                return void 0 !== a[e] && (t[e] = a[e]), t;
                            }, {}))
                    )
                )
            ),
            P = !1,
            V = !1,
            j = !1,
            S = !1,
            U = [],
            _ = u(bt, k.interactiveDebounce),
            z = B++,
            F = (L = k.plugins).filter(function (t, e) {
                return L.indexOf(t) === e;
            }),
            W = {
                id: z,
                reference: e,
                popper: v(),
                popperInstance: null,
                props: k,
                state: {
                    isEnabled: !0,
                    isVisible: !1,
                    isDestroyed: !1,
                    isMounted: !1,
                    isShown: !1,
                },
                plugins: F,
                clearDelayTimeouts: function () {
                    clearTimeout(c), clearTimeout(m), cancelAnimationFrame(h);
                },
                setProps: function (t) {
                    if (W.state.isDestroyed) return;
                    it("onBeforeUpdate", [W, t]), gt();
                    var n = W.props,
                        r = M(
                            e,
                            Object.assign({}, W.props, {}, t, { ignoreAttributes: !0 })
                        );
                    (W.props = r),
                        mt(),
                        n.interactiveDebounce !== r.interactiveDebounce &&
                        (st(), (_ = u(bt, r.interactiveDebounce)));
                    n.triggerTarget && !r.triggerTarget
                        ? p(n.triggerTarget).forEach(function (t) {
                            t.removeAttribute("aria-expanded");
                        })
                        : r.triggerTarget && e.removeAttribute("aria-expanded");
                    at(), rt(), q && q(n, r);
                    W.popperInstance &&
                        (Et(),
                            Ct().forEach(function (t) {
                                requestAnimationFrame(t._tippy.popperInstance.forceUpdate);
                            }));
                    it("onAfterUpdate", [W, t]);
                },
                setContent: function (t) {
                    W.setProps({ content: t });
                },
                show: function () {
                    var t = W.state.isVisible,
                        e = W.state.isDestroyed,
                        n = !W.state.isEnabled,
                        r = T.isTouch && !W.props.touch,
                        i = o(W.props.duration, 0, D.duration);
                    if (t || e || n || r) return;
                    if (Z().hasAttribute("disabled")) return;
                    if ((it("onShow", [W], !1), !1 === W.props.onShow(W))) return;
                    (W.state.isVisible = !0), Q() && (Y.style.visibility = "visible");
                    rt(), ft(), W.state.isMounted || (Y.style.transition = "none");
                    if (Q()) {
                        var a = et(),
                            u = a.box,
                            c = a.content;
                        y([u, c], 0);
                    }
                    (A = function () {
                        if (W.state.isVisible && !S) {
                            if (
                                ((S = !0),
                                    Y.offsetHeight,
                                    (Y.style.transition = W.props.moveTransition),
                                    Q() && W.props.animation)
                            ) {
                                var t = et(),
                                    e = t.box,
                                    n = t.content;
                                y([e, n], i), x([e, n], "visible");
                            }
                            ot(),
                                at(),
                                f(N, W),
                                (W.state.isMounted = !0),
                                it("onMount", [W]),
                                W.props.animation &&
                                Q() &&
                                (function (t, e) {
                                    dt(t, e);
                                })(i, function () {
                                    (W.state.isShown = !0), it("onShown", [W]);
                                });
                        }
                    }),
                        (function () {
                            var t,
                                e = W.props.appendTo,
                                n = Z();
                            t =
                                (W.props.interactive && e === D.appendTo) || "parent" === e
                                    ? n.parentNode
                                    : s(e, [n]);
                            t.contains(Y) || t.appendChild(Y);
                            Et();
                        })();
                },
                hide: function () {
                    var t = !W.state.isVisible,
                        e = W.state.isDestroyed,
                        n = !W.state.isEnabled,
                        r = o(W.props.duration, 1, D.duration);
                    if (t || e || n) return;
                    if ((it("onHide", [W], !1), !1 === W.props.onHide(W))) return;
                    (W.state.isVisible = !1),
                        (W.state.isShown = !1),
                        (S = !1),
                        (P = !1),
                        Q() && (Y.style.visibility = "hidden");
                    if ((st(), lt(), rt(), Q())) {
                        var i = et(),
                            a = i.box,
                            s = i.content;
                        W.props.animation && (y([a, s], r), x([a, s], "hidden"));
                    }
                    ot(),
                        at(),
                        W.props.animation
                            ? Q() &&
                            (function (t, e) {
                                dt(t, function () {
                                    !W.state.isVisible &&
                                        Y.parentNode &&
                                        Y.parentNode.contains(Y) &&
                                        e();
                                });
                            })(r, W.unmount)
                            : W.unmount();
                },
                hideWithInteractivity: function (t) {
                    tt().addEventListener("mousemove", _), f(H, _), _(t);
                },
                enable: function () {
                    W.state.isEnabled = !0;
                },
                disable: function () {
                    W.hide(), (W.state.isEnabled = !1);
                },
                unmount: function () {
                    W.state.isVisible && W.hide();
                    if (!W.state.isMounted) return;
                    Tt(),
                        Ct().forEach(function (t) {
                            t._tippy.unmount();
                        }),
                        Y.parentNode && Y.parentNode.removeChild(Y);
                    (N = N.filter(function (t) {
                        return t !== W;
                    })),
                        (W.state.isMounted = !1),
                        it("onHidden", [W]);
                },
                destroy: function () {
                    if (W.state.isDestroyed) return;
                    W.clearDelayTimeouts(),
                        W.unmount(),
                        gt(),
                        delete e._tippy,
                        (W.state.isDestroyed = !0),
                        it("onDestroy", [W]);
                },
            };
        if (!k.render) return W;
        var X = k.render(W),
            Y = X.popper,
            q = X.onUpdate;
        Y.setAttribute("data-tippy-root", ""),
            (Y.id = "tippy-" + W.id),
            (W.popper = Y),
            (e._tippy = W),
            (Y._tippy = W);
        var $ = F.map(function (t) {
            return t.fn(W);
        }),
            J = e.hasAttribute("aria-expanded");
        return (
            mt(),
            at(),
            rt(),
            it("onCreate", [W]),
            k.showOnCreate && At(),
            Y.addEventListener("mouseenter", function () {
                W.props.interactive && W.state.isVisible && W.clearDelayTimeouts();
            }),
            Y.addEventListener("mouseleave", function (t) {
                W.props.interactive &&
                    W.props.trigger.indexOf("mouseenter") >= 0 &&
                    (tt().addEventListener("mousemove", _), _(t));
            }),
            W
        );
        function G() {
            var t = W.props.touch;
            return Array.isArray(t) ? t : [t, 0];
        }
        function K() {
            return "hold" === G()[0];
        }
        function Q() {
            var t;
            return !!(null == (t = W.props.render) ? void 0 : t.$$tippy);
        }
        function Z() {
            return O || e;
        }
        function tt() {
            var t = Z().parentNode;
            return t ? w(t) : document;
        }
        function et() {
            return I(Y);
        }
        function nt(t) {
            return (W.state.isMounted && !W.state.isVisible) ||
                T.isTouch ||
                (b && "focus" === b.type)
                ? 0
                : o(W.props.delay, t ? 0 : 1, D.delay);
        }
        function rt() {
            (Y.style.pointerEvents =
                W.props.interactive && W.state.isVisible ? "" : "none"),
                (Y.style.zIndex = "" + W.props.zIndex);
        }
        function it(t, e, n) {
            var r;
            (void 0 === n && (n = !0),
                $.forEach(function (n) {
                    n[t] && n[t].apply(void 0, e);
                }),
                n) && (r = W.props)[t].apply(r, e);
        }
        function ot() {
            var t = W.props.aria;
            if (t.content) {
                var n = "aria-" + t.content,
                    r = Y.id;
                p(W.props.triggerTarget || e).forEach(function (t) {
                    var e = t.getAttribute(n);
                    if (W.state.isVisible) t.setAttribute(n, e ? e + " " + r : r);
                    else {
                        var i = e && e.replace(r, "").trim();
                        i ? t.setAttribute(n, i) : t.removeAttribute(n);
                    }
                });
            }
        }
        function at() {
            !J &&
                W.props.aria.expanded &&
                p(W.props.triggerTarget || e).forEach(function (t) {
                    W.props.interactive
                        ? t.setAttribute(
                            "aria-expanded",
                            W.state.isVisible && t === Z() ? "true" : "false"
                        )
                        : t.removeAttribute("aria-expanded");
                });
        }
        function st() {
            tt().removeEventListener("mousemove", _),
                (H = H.filter(function (t) {
                    return t !== _;
                }));
        }
        function ut(t) {
            if (
                !(
                    (T.isTouch && (j || "mousedown" === t.type)) ||
                    (W.props.interactive && Y.contains(t.target))
                )
            ) {
                if (Z().contains(t.target)) {
                    if (T.isTouch) return;
                    if (W.state.isVisible && W.props.trigger.indexOf("click") >= 0)
                        return;
                } else it("onClickOutside", [W, t]);
                !0 === W.props.hideOnClick &&
                    (W.clearDelayTimeouts(),
                        W.hide(),
                        (V = !0),
                        setTimeout(function () {
                            V = !1;
                        }),
                        W.state.isMounted || lt());
            }
        }
        function ct() {
            j = !0;
        }
        function pt() {
            j = !1;
        }
        function ft() {
            var t = tt();
            t.addEventListener("mousedown", ut, !0),
                t.addEventListener("touchend", ut, i),
                t.addEventListener("touchstart", pt, i),
                t.addEventListener("touchmove", ct, i);
        }
        function lt() {
            var t = tt();
            t.removeEventListener("mousedown", ut, !0),
                t.removeEventListener("touchend", ut, i),
                t.removeEventListener("touchstart", pt, i),
                t.removeEventListener("touchmove", ct, i);
        }
        function dt(t, e) {
            var n = et().box;
            function r(t) {
                t.target === n && (E(n, "remove", r), e());
            }
            if (0 === t) return e();
            E(n, "remove", C), E(n, "add", r), (C = r);
        }
        function vt(t, n, r) {
            void 0 === r && (r = !1),
                p(W.props.triggerTarget || e).forEach(function (e) {
                    e.addEventListener(t, n, r),
                        U.push({ node: e, eventType: t, handler: n, options: r });
                });
        }
        function mt() {
            var t;
            K() &&
                (vt("touchstart", ht, { passive: !0 }),
                    vt("touchend", yt, { passive: !0 })),
                ((t = W.props.trigger), t.split(/\s+/).filter(Boolean)).forEach(
                    function (t) {
                        if ("manual" !== t)
                            switch ((vt(t, ht), t)) {
                                case "mouseenter":
                                    vt("mouseleave", yt);
                                    break;
                                case "focus":
                                    vt(r ? "focusout" : "blur", xt);
                                    break;
                                case "focusin":
                                    vt("focusout", xt);
                            }
                    }
                );
        }
        function gt() {
            U.forEach(function (t) {
                var e = t.node,
                    n = t.eventType,
                    r = t.handler,
                    i = t.options;
                e.removeEventListener(n, r, i);
            }),
                (U = []);
        }
        function ht(t) {
            var e,
                n = !1;
            if (W.state.isEnabled && !wt(t) && !V) {
                var r = "focus" === (null == (e = b) ? void 0 : e.type);
                (b = t),
                    (O = t.currentTarget),
                    at(),
                    !W.state.isVisible &&
                    g(t) &&
                    H.forEach(function (e) {
                        return e(t);
                    }),
                    "click" === t.type &&
                        (W.props.trigger.indexOf("mouseenter") < 0 || P) &&
                        !1 !== W.props.hideOnClick &&
                        W.state.isVisible
                        ? (n = !0)
                        : At(t),
                    "click" === t.type && (P = !n),
                    n && !r && Ot(t);
            }
        }
        function bt(t) {
            var e = t.target,
                n = Z().contains(e) || Y.contains(e);
            ("mousemove" === t.type && n) ||
                ((function (t, e) {
                    var n = e.clientX,
                        r = e.clientY;
                    return t.every(function (t) {
                        var e = t.popperRect,
                            i = t.popperState,
                            o = t.props.interactiveBorder,
                            a = l(i.placement),
                            s = i.modifiersData.offset;
                        if (!s) return !0;
                        var u = "bottom" === a ? s.top.y : 0,
                            c = "top" === a ? s.bottom.y : 0,
                            p = "right" === a ? s.left.x : 0,
                            f = "left" === a ? s.right.x : 0,
                            d = e.top - r + u > o,
                            v = r - e.bottom - c > o,
                            m = e.left - n + p > o,
                            g = n - e.right - f > o;
                        return d || v || m || g;
                    });
                })(
                    Ct()
                        .concat(Y)
                        .map(function (t) {
                            var e,
                                n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
                            return n
                                ? {
                                    popperRect: t.getBoundingClientRect(),
                                    popperState: n,
                                    props: k,
                                }
                                : null;
                        })
                        .filter(Boolean),
                    t
                ) &&
                    (st(), Ot(t)));
        }
        function yt(t) {
            wt(t) ||
                (W.props.trigger.indexOf("click") >= 0 && P) ||
                (W.props.interactive ? W.hideWithInteractivity(t) : Ot(t));
        }
        function xt(t) {
            (W.props.trigger.indexOf("focusin") < 0 && t.target !== Z()) ||
                (W.props.interactive &&
                    t.relatedTarget &&
                    Y.contains(t.relatedTarget)) ||
                Ot(t);
        }
        function wt(t) {
            return !!T.isTouch && K() !== t.type.indexOf("touch") >= 0;
        }
        function Et() {
            Tt();
            var n = W.props,
                r = n.popperOptions,
                i = n.placement,
                o = n.offset,
                a = n.getReferenceClientRect,
                s = n.moveTransition,
                u = Q() ? I(Y).arrow : null,
                c = a
                    ? {
                        getBoundingClientRect: a,
                        contextElement: a.contextElement || Z(),
                    }
                    : e,
                p = [
                    { name: "offset", options: { offset: o } },
                    {
                        name: "preventOverflow",
                        options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
                    },
                    { name: "flip", options: { padding: 5 } },
                    { name: "computeStyles", options: { adaptive: !s } },
                    {
                        name: "$$tippy",
                        enabled: !0,
                        phase: "beforeWrite",
                        requires: ["computeStyles"],
                        fn: function (t) {
                            var e = t.state;
                            if (Q()) {
                                var n = et().box;
                                ["placement", "reference-hidden", "escaped"].forEach(function (
                                    t
                                ) {
                                    "placement" === t
                                        ? n.setAttribute("data-placement", e.placement)
                                        : e.attributes.popper["data-popper-" + t]
                                            ? n.setAttribute("data-" + t, "")
                                            : n.removeAttribute("data-" + t);
                                }),
                                    (e.attributes.popper = {});
                            }
                        },
                    },
                ];
            Q() &&
                u &&
                p.push({ name: "arrow", options: { element: u, padding: 3 } }),
                p.push.apply(p, (null == r ? void 0 : r.modifiers) || []),
                (W.popperInstance = t.createPopper(
                    c,
                    Y,
                    Object.assign({}, r, { placement: i, onFirstUpdate: A, modifiers: p })
                ));
        }
        function Tt() {
            W.popperInstance &&
                (W.popperInstance.destroy(), (W.popperInstance = null));
        }
        function Ct() {
            return d(Y.querySelectorAll("[data-tippy-root]"));
        }
        function At(t) {
            W.clearDelayTimeouts(), t && it("onTrigger", [W, t]), ft();
            var e = nt(!0),
                n = G(),
                r = n[0],
                i = n[1];
            T.isTouch && "hold" === r && i && (e = i),
                e
                    ? (c = setTimeout(function () {
                        W.show();
                    }, e))
                    : W.show();
        }
        function Ot(t) {
            if (
                (W.clearDelayTimeouts(), it("onUntrigger", [W, t]), W.state.isVisible)
            ) {
                if (
                    !(
                        W.props.trigger.indexOf("mouseenter") >= 0 &&
                        W.props.trigger.indexOf("click") >= 0 &&
                        ["mouseleave", "mousemove"].indexOf(t.type) >= 0 &&
                        P
                    )
                ) {
                    var e = nt(!1);
                    e
                        ? (m = setTimeout(function () {
                            W.state.isVisible && W.hide();
                        }, e))
                        : (h = requestAnimationFrame(function () {
                            W.hide();
                        }));
                }
            } else lt();
        }
    }
    function _(t, e) {
        void 0 === e && (e = {});
        var n = D.plugins.concat(e.plugins || []);
        document.addEventListener("touchstart", A, i),
            window.addEventListener("blur", L);
        var r = Object.assign({}, e, { plugins: n }),
            o = b(t).reduce(function (t, e) {
                var n = e && U(e, r);
                return n && t.push(n), t;
            }, []);
        return m(t) ? o[0] : o;
    }
    (_.defaultProps = D),
        (_.setDefaultProps = function (t) {
            Object.keys(t).forEach(function (e) {
                D[e] = t[e];
            });
        }),
        (_.currentInput = T);
    var z = { mouseover: "mouseenter", focusin: "focus", click: "click" };
    var F = {
        name: "animateFill",
        defaultValue: !1,
        fn: function (t) {
            var e;
            if (!(null == (e = t.props.render) ? void 0 : e.$$tippy)) return {};
            var n = I(t.popper),
                r = n.box,
                i = n.content,
                o = t.props.animateFill
                    ? (function () {
                        var t = v();
                        return (t.className = "tippy-backdrop"), x([t], "hidden"), t;
                    })()
                    : null;
            return {
                onCreate: function () {
                    o &&
                        (r.insertBefore(o, r.firstElementChild),
                            r.setAttribute("data-animatefill", ""),
                            (r.style.overflow = "hidden"),
                            t.setProps({ arrow: !1, animation: "shift-away" }));
                },
                onMount: function () {
                    if (o) {
                        var t = r.style.transitionDuration,
                            e = Number(t.replace("ms", ""));
                        (i.style.transitionDelay = Math.round(e / 10) + "ms"),
                            (o.style.transitionDuration = t),
                            x([o], "visible");
                    }
                },
                onShow: function () {
                    o && (o.style.transitionDuration = "0ms");
                },
                onHide: function () {
                    o && x([o], "hidden");
                },
            };
        },
    };
    var W = { clientX: 0, clientY: 0 },
        X = [];
    function Y(t) {
        var e = t.clientX,
            n = t.clientY;
        W = { clientX: e, clientY: n };
    }
    var q = {
        name: "followCursor",
        defaultValue: !1,
        fn: function (t) {
            var e = t.reference,
                n = w(t.props.triggerTarget || e),
                r = !1,
                i = !1,
                o = !0,
                a = t.props;
            function s() {
                return "initial" === t.props.followCursor && t.state.isVisible;
            }
            function u() {
                n.addEventListener("mousemove", f);
            }
            function c() {
                n.removeEventListener("mousemove", f);
            }
            function p() {
                (r = !0), t.setProps({ getReferenceClientRect: null }), (r = !1);
            }
            function f(n) {
                var r = !n.target || e.contains(n.target),
                    i = t.props.followCursor,
                    o = n.clientX,
                    a = n.clientY,
                    s = e.getBoundingClientRect(),
                    u = o - s.left,
                    c = a - s.top;
                (!r && t.props.interactive) ||
                    t.setProps({
                        getReferenceClientRect: function () {
                            var t = e.getBoundingClientRect(),
                                n = o,
                                r = a;
                            "initial" === i && ((n = t.left + u), (r = t.top + c));
                            var s = "horizontal" === i ? t.top : r,
                                p = "vertical" === i ? t.right : n,
                                f = "horizontal" === i ? t.bottom : r,
                                l = "vertical" === i ? t.left : n;
                            return {
                                width: p - l,
                                height: f - s,
                                top: s,
                                right: p,
                                bottom: f,
                                left: l,
                            };
                        },
                    });
            }
            function l() {
                t.props.followCursor &&
                    (X.push({ instance: t, doc: n }),
                        (function (t) {
                            t.addEventListener("mousemove", Y);
                        })(n));
            }
            function d() {
                0 ===
                    (X = X.filter(function (e) {
                        return e.instance !== t;
                    })).filter(function (t) {
                        return t.doc === n;
                    }).length &&
                    (function (t) {
                        t.removeEventListener("mousemove", Y);
                    })(n);
            }
            return {
                onCreate: l,
                onDestroy: d,
                onBeforeUpdate: function () {
                    a = t.props;
                },
                onAfterUpdate: function (e, n) {
                    var o = n.followCursor;
                    r ||
                        (void 0 !== o &&
                            a.followCursor !== o &&
                            (d(),
                                o ? (l(), !t.state.isMounted || i || s() || u()) : (c(), p())));
                },
                onMount: function () {
                    t.props.followCursor && !i && (o && (f(W), (o = !1)), s() || u());
                },
                onTrigger: function (t, e) {
                    g(e) && (W = { clientX: e.clientX, clientY: e.clientY }),
                        (i = "focus" === e.type);
                },
                onHidden: function () {
                    t.props.followCursor && (p(), c(), (o = !0));
                },
            };
        },
    };
    var $ = {
        name: "inlinePositioning",
        defaultValue: !1,
        fn: function (t) {
            var e,
                n = t.reference;
            var r = -1,
                i = !1,
                o = {
                    name: "tippyInlinePositioning",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: function (i) {
                        var o = i.state;
                        t.props.inlinePositioning &&
                            (e !== o.placement &&
                                t.setProps({
                                    getReferenceClientRect: function () {
                                        return (function (t) {
                                            return (function (t, e, n, r) {
                                                if (n.length < 2 || null === t) return e;
                                                if (2 === n.length && r >= 0 && n[0].left > n[1].right)
                                                    return n[r] || e;
                                                switch (t) {
                                                    case "top":
                                                    case "bottom":
                                                        var i = n[0],
                                                            o = n[n.length - 1],
                                                            a = "top" === t,
                                                            s = i.top,
                                                            u = o.bottom,
                                                            c = a ? i.left : o.left,
                                                            p = a ? i.right : o.right;
                                                        return {
                                                            top: s,
                                                            bottom: u,
                                                            left: c,
                                                            right: p,
                                                            width: p - c,
                                                            height: u - s,
                                                        };
                                                    case "left":
                                                    case "right":
                                                        var f = Math.min.apply(
                                                            Math,
                                                            n.map(function (t) {
                                                                return t.left;
                                                            })
                                                        ),
                                                            l = Math.max.apply(
                                                                Math,
                                                                n.map(function (t) {
                                                                    return t.right;
                                                                })
                                                            ),
                                                            d = n.filter(function (e) {
                                                                return "left" === t
                                                                    ? e.left === f
                                                                    : e.right === l;
                                                            }),
                                                            v = d[0].top,
                                                            m = d[d.length - 1].bottom;
                                                        return {
                                                            top: v,
                                                            bottom: m,
                                                            left: f,
                                                            right: l,
                                                            width: l - f,
                                                            height: m - v,
                                                        };
                                                    default:
                                                        return e;
                                                }
                                            })(
                                                l(t),
                                                n.getBoundingClientRect(),
                                                d(n.getClientRects()),
                                                r
                                            );
                                        })(o.placement);
                                    },
                                }),
                                (e = o.placement));
                    },
                };
            function a() {
                var e;
                i ||
                    ((e = (function (t, e) {
                        var n;
                        return {
                            popperOptions: Object.assign({}, t.popperOptions, {
                                modifiers: [].concat(
                                    (
                                        (null == (n = t.popperOptions) ? void 0 : n.modifiers) || []
                                    ).filter(function (t) {
                                        return t.name !== e.name;
                                    }),
                                    [e]
                                ),
                            }),
                        };
                    })(t.props, o)),
                        (i = !0),
                        t.setProps(e),
                        (i = !1));
            }
            return {
                onCreate: a,
                onAfterUpdate: a,
                onTrigger: function (e, n) {
                    if (g(n)) {
                        var i = d(t.reference.getClientRects()),
                            o = i.find(function (t) {
                                return (
                                    t.left - 2 <= n.clientX &&
                                    t.right + 2 >= n.clientX &&
                                    t.top - 2 <= n.clientY &&
                                    t.bottom + 2 >= n.clientY
                                );
                            });
                        r = i.indexOf(o);
                    }
                },
                onUntrigger: function () {
                    r = -1;
                },
            };
        },
    };
    var J = {
        name: "sticky",
        defaultValue: !1,
        fn: function (t) {
            var e = t.reference,
                n = t.popper;
            function r(e) {
                return !0 === t.props.sticky || t.props.sticky === e;
            }
            var i = null,
                o = null;
            function a() {
                var s = r("reference")
                    ? (t.popperInstance
                        ? t.popperInstance.state.elements.reference
                        : e
                    ).getBoundingClientRect()
                    : null,
                    u = r("popper") ? n.getBoundingClientRect() : null;
                ((s && G(i, s)) || (u && G(o, u))) &&
                    t.popperInstance &&
                    t.popperInstance.update(),
                    (i = s),
                    (o = u),
                    t.state.isMounted && requestAnimationFrame(a);
            }
            return {
                onMount: function () {
                    t.props.sticky && a();
                },
            };
        },
    };
    function G(t, e) {
        return (
            !t ||
            !e ||
            t.top !== e.top ||
            t.right !== e.right ||
            t.bottom !== e.bottom ||
            t.left !== e.left
        );
    }
    return (
        e &&
        (function (t) {
            var e = document.createElement("style");
            (e.textContent = t), e.setAttribute("data-tippy-stylesheet", "");
            var n = document.head,
                r = document.querySelector("head>style,head>link");
            r ? n.insertBefore(e, r) : n.appendChild(e);
        })(
            '.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'
        ),
        _.setDefaultProps({ plugins: [F, q, $, J], render: S }),
        (_.createSingleton = function (t, e) {
            void 0 === e && (e = {});
            var n,
                r = t,
                i = [],
                o = e.overrides,
                a = [];
            function s() {
                i = r.map(function (t) {
                    return t.reference;
                });
            }
            function u(t) {
                r.forEach(function (e) {
                    t ? e.enable() : e.disable();
                });
            }
            function p(t) {
                return r.map(function (e) {
                    var r = e.setProps;
                    return (
                        (e.setProps = function (i) {
                            r(i), e.reference === n && t.setProps(i);
                        }),
                        function () {
                            e.setProps = r;
                        }
                    );
                });
            }
            u(!1), s();
            var f = {
                fn: function () {
                    return {
                        onDestroy: function () {
                            u(!0);
                        },
                        onTrigger: function (t, e) {
                            var a = e.currentTarget,
                                s = i.indexOf(a);
                            if (a !== n) {
                                n = a;
                                var u = (o || []).concat("content").reduce(function (t, e) {
                                    return (t[e] = r[s].props[e]), t;
                                }, {});
                                t.setProps(
                                    Object.assign({}, u, {
                                        getReferenceClientRect:
                                            "function" == typeof u.getReferenceClientRect
                                                ? u.getReferenceClientRect
                                                : function () {
                                                    return a.getBoundingClientRect();
                                                },
                                    })
                                );
                            }
                        },
                    };
                },
            },
                l = _(
                    v(),
                    Object.assign({}, c(e, ["overrides"]), {
                        plugins: [f].concat(e.plugins || []),
                        triggerTarget: i,
                    })
                ),
                d = l.setProps;
            return (
                (l.setProps = function (t) {
                    (o = t.overrides || o), d(t);
                }),
                (l.setInstances = function (t) {
                    u(!0),
                        a.forEach(function (t) {
                            return t();
                        }),
                        (r = t),
                        u(!1),
                        s(),
                        p(l),
                        l.setProps({ triggerTarget: i });
                }),
                (a = p(l)),
                l
            );
        }),
        (_.delegate = function (t, e) {
            var n = [],
                r = [],
                i = !1,
                o = e.target,
                a = c(e, ["target"]),
                s = Object.assign({}, a, { trigger: "manual", touch: !1 }),
                u = Object.assign({}, a, { showOnCreate: !0 }),
                f = _(t, s);
            function l(t) {
                if (t.target && !i) {
                    var n = t.target.closest(o);
                    if (n) {
                        var a =
                            n.getAttribute("data-tippy-trigger") || e.trigger || D.trigger;
                        if (
                            !n._tippy &&
                            !(
                                ("touchstart" === t.type && "boolean" == typeof u.touch) ||
                                ("touchstart" !== t.type && a.indexOf(z[t.type]) < 0)
                            )
                        ) {
                            var s = _(n, u);
                            s && (r = r.concat(s));
                        }
                    }
                }
            }
            function d(t, e, r, i) {
                void 0 === i && (i = !1),
                    t.addEventListener(e, r, i),
                    n.push({ node: t, eventType: e, handler: r, options: i });
            }
            return (
                p(f).forEach(function (t) {
                    var e = t.destroy,
                        o = t.enable,
                        a = t.disable;
                    (t.destroy = function (t) {
                        void 0 === t && (t = !0),
                            t &&
                            r.forEach(function (t) {
                                t.destroy();
                            }),
                            (r = []),
                            n.forEach(function (t) {
                                var e = t.node,
                                    n = t.eventType,
                                    r = t.handler,
                                    i = t.options;
                                e.removeEventListener(n, r, i);
                            }),
                            (n = []),
                            e();
                    }),
                        (t.enable = function () {
                            o(),
                                r.forEach(function (t) {
                                    return t.enable();
                                }),
                                (i = !1);
                        }),
                        (t.disable = function () {
                            a(),
                                r.forEach(function (t) {
                                    return t.disable();
                                }),
                                (i = !0);
                        }),
                        (function (t) {
                            var e = t.reference;
                            d(e, "touchstart", l),
                                d(e, "mouseover", l),
                                d(e, "focusin", l),
                                d(e, "click", l);
                        })(t);
                }),
                f
            );
        }),
        (_.hideAll = function (t) {
            var e = void 0 === t ? {} : t,
                n = e.exclude,
                r = e.duration;
            N.forEach(function (t) {
                var e = !1;
                if ((n && (e = h(n) ? t.reference === n : t.popper === n.popper), !e)) {
                    var i = t.props.duration;
                    t.setProps({ duration: r }),
                        t.hide(),
                        t.state.isDestroyed || t.setProps({ duration: i });
                }
            });
        }),
        (_.roundArrow =
            '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'),
        _
    );
});
//# sourceMappingURL=tippy-bundle.umd.min.js.map

[...document.querySelectorAll(".popover")].forEach(function (element) {
    const enableHTML = element.getAttribute("enablehtml");

    tippy(element, {
        animation: "scale",
        animateFill: false,
        maxWidth: 240,
        duration: 0,
        arrow: false,
        content: (reference) => reference.getAttribute("popovercontent"),
        allowHTML: enableHTML === "true" ? true : false,
    });
});