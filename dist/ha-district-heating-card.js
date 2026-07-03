/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, K = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (s) => new ft(typeof s == "string" ? s : s + "", void 0, X), vt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new ft(e, s, X);
}, St = (s, t) => {
  if (K) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = V.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, st = K ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Et(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: Pt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Ut, getOwnPropertySymbols: Ot, getPrototypeOf: Ht } = Object, $ = globalThis, nt = $.trustedTypes, Dt = nt ? nt.emptyScript : "", G = $.reactiveElementPolyfillSupport, T = (s, t) => s, Z = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Dt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Q = (s, t) => !Mt(s, t), at = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: Q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = Tt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const o = r == null ? void 0 : r.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Ht(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, i = [...Ut(e), ...Ot(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(st(r));
    } else t !== void 0 && e.push(st(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return St(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : Z).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : Z;
      this._$Em = r;
      const c = l.fromAttribute(e, o.type);
      this[r] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, n) {
    var a;
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? Q)(n, e) || i.useDefault && i.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, a] of r) {
        const { wrapped: o } = a, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[T("elementProperties")] = /* @__PURE__ */ new Map(), k[T("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: k }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, ot = (s) => s, F = U.trustedTypes, lt = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, yt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, _t = "?" + _, Nt = `<${_t}>`, C = document, H = () => C.createComment(""), D = (s) => s === null || typeof s != "object" && typeof s != "function", Y = Array.isArray, Rt = (s) => Y(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", W = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ct = />/g, x = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, pt = /"/g, $t = /^(?:script|style|textarea|title)$/i, xt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = xt(1), m = xt(2), S = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), b = C.createTreeWalker(C, 129);
function bt(s, t) {
  if (!Y(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = P;
  for (let o = 0; o < e; o++) {
    const l = s[o];
    let c, u, d = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, u = a.exec(l), u !== null); ) f = a.lastIndex, a === P ? u[1] === "!--" ? a = dt : u[1] !== void 0 ? a = ct : u[2] !== void 0 ? ($t.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = x) : u[3] !== void 0 && (a = x) : a === x ? u[0] === ">" ? (a = r ?? P, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? x : u[3] === '"' ? pt : ht) : a === pt || a === ht ? a = x : a === dt || a === ct ? a = P : (a = x, r = void 0);
    const v = a === x && s[o + 1].startsWith("/>") ? " " : "";
    n += a === P ? l + Nt : d >= 0 ? (i.push(c), l.slice(0, d) + yt + l.slice(d) + _ + v) : l + _ + (d === -2 ? o : v);
  }
  return [bt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const o = t.length - 1, l = this.parts, [c, u] = jt(t, e);
    if (this.el = N.createElement(c, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = b.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(yt)) {
          const f = u[a++], v = r.getAttribute(d).split(_), z = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: n, name: z[2], strings: v, ctor: z[1] === "." ? zt : z[1] === "?" ? Bt : z[1] === "@" ? Vt : I }), r.removeAttribute(d);
        } else d.startsWith(_) && (l.push({ type: 6, index: n }), r.removeAttribute(d));
        if ($t.test(r.tagName)) {
          const d = r.textContent.split(_), f = d.length - 1;
          if (f > 0) {
            r.textContent = F ? F.emptyScript : "";
            for (let v = 0; v < f; v++) r.append(d[v], H()), b.nextNode(), l.push({ type: 2, index: ++n });
            r.append(d[f], H());
          }
        }
      } else if (r.nodeType === 8) if (r.data === _t) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(_, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function M(s, t, e = s, i) {
  var a, o;
  if (t === S) return t;
  let r = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const n = D(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((o = r == null ? void 0 : r._$AO) == null || o.call(r, !1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = M(s, r._$AS(s, t.values), r, i)), t;
}
class Lt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? C).importNode(e, !0);
    b.currentNode = r;
    let n = b.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new L(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new Zt(n, this, t)), this._$AV.push(c), l = i[++o];
      }
      a !== (l == null ? void 0 : l.index) && (n = b.nextNode(), a++);
    }
    return b.currentNode = C, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = M(this, t, e), D(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Rt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && D(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(bt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(e);
    else {
      const a = new Lt(r, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t) r === e.length ? e.push(i = new L(this.O(H()), this.O(H()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = ot(t).nextSibling;
      ot(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = M(this, t, e, 0), a = !D(t) || t !== this._$AH && t !== S, a && (this._$AH = t);
    else {
      const o = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = M(this, o[i + l], e, l), c === S && (c = this._$AH[l]), a || (a = !D(c) || c !== this._$AH[l]), c === h ? t = h : t !== h && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Bt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Vt extends I {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? h) === S) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const q = U.litHtmlPolyfillSupport;
q == null || q(N, L), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.3");
const Ft = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new L(t.insertBefore(H(), n), n, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class E extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var mt;
E._$litElement$ = !0, E.finalized = !0, (mt = A.litElementHydrateSupport) == null || mt.call(A, { LitElement: E });
const J = A.litElementPolyfillSupport;
J == null || J({ LitElement: E });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: Q }, Gt = (s = It, t, e) => {
  const { kind: i, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, s, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, s, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, s, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function tt(s) {
  return (t, e) => typeof e == "object" ? Gt(s, t, e) : ((i, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function At(s) {
  return tt({ ...s, state: !0, attribute: !1 });
}
const Wt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), Ct = {
  min_delta_t: 20,
  good_delta_t: 30,
  max_return_temp: 45,
  good_return_temp: 35,
  show_status: !0,
  show_secondary: !0,
  show_diagnostics: !0
};
function kt(s) {
  return {
    ...Ct,
    ...s
  };
}
function O(s, t) {
  if (!(!s || !t))
    return s.states[t];
}
function w(s, t) {
  var r, n;
  const e = (n = (r = O(s, t)) == null ? void 0 : r.state) == null ? void 0 : n.trim().toLowerCase();
  if (!e || Wt.has(e))
    return;
  const i = Number.parseFloat(e.replace(",", "."));
  return Number.isFinite(i) ? i : void 0;
}
function B(s, t, e) {
  var r;
  const i = (r = O(s, t)) == null ? void 0 : r.attributes.unit_of_measurement;
  return typeof i == "string" && i.length > 0 ? i : e;
}
function y(s, t, e = 1) {
  return s === void 0 ? "--" : `${s.toFixed(e)} ${t}`;
}
function qt(s, t) {
  const e = w(s, t.delta_t_entity);
  if (e !== void 0)
    return e;
  const i = w(s, t.supply_temp_entity), r = w(s, t.return_temp_entity);
  if (!(i === void 0 || r === void 0))
    return i - r;
}
function gt(s, t = 0, e = 100) {
  return Math.min(Math.max(s, t), e);
}
function Jt(s, t, e) {
  const i = kt(s);
  if (t === void 0 || e === void 0)
    return {
      severity: "unknown",
      title: "Mangler data",
      message: "Tilføj fremløb, returløb og eventuelt Delta T for at vurdere driften.",
      deltaLabel: "Ukendt",
      returnLabel: "Ukendt",
      deltaScore: 0,
      returnScore: 0
    };
  const r = gt((t - i.min_delta_t) / (i.good_delta_t - i.min_delta_t || 1) * 100), n = gt((i.max_return_temp - e) / (i.max_return_temp - i.good_return_temp || 1) * 100), a = r * 0.55 + n * 0.45, o = Kt(a, t, e, i.min_delta_t, i.max_return_temp);
  return {
    severity: o,
    ...{
      excellent: {
        title: "Meget effektiv udnyttelse",
        message: "Lav returtemperatur og god afkøling. Dit anlæg kører optimalt."
      },
      good: {
        title: "God udnyttelse",
        message: "Anlægget har en sund balance mellem afkøling og returtemperatur."
      },
      warning: {
        title: "Kan optimeres",
        message: "Hold øje med returtemperatur og afkøling. Justering kan forbedre udnyttelsen."
      },
      critical: {
        title: "Lav effektivitet",
        message: "Høj returtemperatur eller lav afkøling tyder på, at anlægget bør gennemgås."
      },
      unknown: {
        title: "Mangler data",
        message: "Tilføj flere sensorer for at vurdere driften."
      }
    }[o],
    deltaLabel: t >= i.good_delta_t ? "Meget god" : t >= i.min_delta_t ? "God" : "Lav",
    returnLabel: e <= i.good_return_temp ? "Meget god" : e <= i.max_return_temp ? "God" : "Høj",
    deltaScore: r,
    returnScore: n
  };
}
function Kt(s, t, e, i, r) {
  return t < i * 0.75 || e > r * 1.2 ? "critical" : s >= 86 ? "excellent" : s >= 62 ? "good" : s >= 38 ? "warning" : "critical";
}
function Xt(s, t) {
  var r, n, a;
  const i = [
    (r = O(s, t.supply_temp_entity)) == null ? void 0 : r.last_updated,
    (n = O(s, t.return_temp_entity)) == null ? void 0 : n.last_updated,
    (a = O(s, t.delta_t_entity)) == null ? void 0 : a.last_updated
  ].filter(Boolean).map((o) => new Date(o)).filter((o) => Number.isFinite(o.getTime())).sort((o, l) => l.getTime() - o.getTime())[0];
  if (i)
    return i.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
const Qt = vt`
  :host {
    display: block;
    color: var(--primary-text-color, #f4f7fb);
    --dhc-card-bg: color-mix(in srgb, var(--card-background-color, #101827) 82%, transparent);
    --dhc-panel-bg: color-mix(in srgb, var(--card-background-color, #101827) 74%, transparent);
    --dhc-border: color-mix(in srgb, var(--divider-color, #738099) 40%, transparent);
    --dhc-muted: var(--secondary-text-color, #aeb7c8);
    --dhc-red: var(--error-color, #ff665c);
    --dhc-red-soft: #ff8d6f;
    --dhc-blue: var(--info-color, #4f91ff);
    --dhc-green: var(--success-color, #54c76d);
    --dhc-yellow: var(--warning-color, #f4bf45);
    --dhc-shadow: 0 18px 48px rgba(0, 0, 0, 0.26);
    --dhc-radius: var(--ha-card-border-radius, 28px);
    font-family: var(--primary-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    padding: clamp(18px, 2.8vw, 32px);
    border-radius: var(--dhc-radius);
    border: 1px solid var(--dhc-border);
    background:
      radial-gradient(circle at 16% 14%, rgba(255, 103, 91, 0.16), transparent 30%),
      radial-gradient(circle at 86% 24%, rgba(61, 135, 255, 0.2), transparent 32%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 32%),
      var(--dhc-card-bg);
    box-shadow: var(--dhc-shadow);
    backdrop-filter: blur(22px) saturate(1.2);
  }

  .header,
  .metrics,
  .secondary,
  .diagnostics {
    position: relative;
    z-index: 1;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: start;
  }

  .title {
    display: flex;
    gap: 13px;
    align-items: center;
    min-width: 0;
  }

  .title-icon,
  .status-icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    color: var(--dhc-red-soft);
  }

  .title-icon svg,
  .status-icon svg,
  .metric-icon svg,
  .mini-icon svg,
  .diagnostic-icon svg,
  .updated svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  h2 {
    margin: 0;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1;
    font-weight: 720;
    letter-spacing: 0;
  }

  .mode {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 10px;
    color: var(--dhc-muted);
    font-size: clamp(15px, 2vw, 20px);
  }

  .mode::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--dhc-green);
    box-shadow: 0 0 14px color-mix(in srgb, var(--dhc-green) 70%, transparent);
  }

  .updated {
    display: flex;
    gap: 9px;
    align-items: center;
    color: var(--dhc-muted);
    font-size: 15px;
    white-space: nowrap;
  }

  .updated svg {
    width: 23px;
    height: 23px;
    opacity: 0.8;
  }

  .flow {
    display: grid;
    grid-template-columns: minmax(135px, 0.72fr) minmax(250px, 1.8fr) minmax(135px, 0.72fr);
    gap: clamp(12px, 2vw, 24px);
    align-items: center;
    margin: clamp(22px, 4vw, 34px) 0 clamp(22px, 3vw, 28px);
  }

  .reading {
    min-width: 0;
  }

  .reading.return {
    text-align: right;
  }

  .label {
    color: var(--dhc-red);
    text-transform: uppercase;
    font-size: clamp(14px, 1.9vw, 19px);
    font-weight: 780;
    letter-spacing: 0.04em;
  }

  .return .label {
    color: var(--dhc-blue);
  }

  .value {
    margin-top: 10px;
    color: var(--dhc-red);
    font-size: clamp(36px, 6vw, 58px);
    line-height: 0.96;
    font-weight: 780;
  }

  .return .value {
    color: var(--dhc-blue);
  }

  .caption {
    margin-top: 12px;
    color: var(--dhc-muted);
    font-size: clamp(14px, 1.8vw, 19px);
  }

  .plant {
    min-width: 0;
  }

  .plant svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .pipe-base {
    stroke-linecap: round;
    stroke-width: 31;
    opacity: 0.98;
  }

  .pipe-hot {
    stroke: url(#hotGradient);
    filter: drop-shadow(0 0 13px rgba(255, 86, 70, 0.72));
  }

  .pipe-cold {
    stroke: url(#coldGradient);
    filter: drop-shadow(0 0 13px rgba(50, 129, 255, 0.72));
  }

  .house {
    fill: color-mix(in srgb, var(--dhc-panel-bg) 78%, transparent);
    stroke: color-mix(in srgb, var(--dhc-muted) 42%, transparent);
    stroke-width: 3;
  }

  .radiator,
  .heat-wave {
    color: color-mix(in srgb, var(--dhc-muted) 82%, white);
  }

  .pipe-line,
  .spark {
    stroke: rgba(255, 255, 255, 0.74);
    stroke-linecap: round;
    animation: drift 3.8s linear infinite;
  }

  .pipe-line {
    stroke-width: 2;
  }

  .spark {
    stroke-width: 4;
    stroke-dasharray: 0.1 28;
  }

  .arrow {
    fill: rgba(255, 255, 255, 0.9);
    filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.42));
    animation: pulse 2.8s ease-in-out infinite;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
    gap: clamp(12px, 1.8vw, 20px);
  }

  .panel {
    min-width: 0;
    border: 1px solid var(--dhc-border);
    border-radius: 18px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025)), var(--dhc-panel-bg);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .metric {
    min-height: 135px;
    padding: clamp(18px, 2vw, 24px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .metric.delta {
    align-items: flex-start;
    text-align: left;
    padding-left: clamp(22px, 4vw, 42px);
    border-color: color-mix(in srgb, var(--dhc-green) 24%, var(--dhc-border));
  }

  .metric-label,
  .mini-label,
  .diagnostic-label {
    color: var(--dhc-muted);
    text-transform: uppercase;
    font-size: clamp(13px, 1.6vw, 17px);
    font-weight: 720;
    letter-spacing: 0.045em;
  }

  .delta-value {
    margin-top: 12px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(44px, 7.2vw, 70px);
    line-height: 0.98;
    font-weight: 820;
  }

  .delta-status {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 18px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 700;
  }

  .delta-status svg {
    width: 29px;
    height: 29px;
    fill: currentColor;
  }

  .metric-value {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-top: 20px;
    font-size: clamp(30px, 4vw, 44px);
    line-height: 1;
    font-weight: 720;
  }

  .metric-icon {
    width: 38px;
    height: 38px;
    color: color-mix(in srgb, var(--dhc-muted) 90%, white);
  }

  .sparkline,
  .bars {
    width: min(100%, 210px);
    height: 44px;
    margin-top: 20px;
    color: var(--dhc-blue);
    opacity: 0.8;
  }

  .secondary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 175px), 1fr));
    gap: 0;
    margin-top: clamp(14px, 2vw, 22px);
    padding: 18px 22px;
  }

  .mini {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    align-items: center;
    min-width: 0;
    padding: 0 16px;
    border-left: 1px solid color-mix(in srgb, var(--dhc-border) 70%, transparent);
  }

  .mini:first-child {
    border-left: 0;
  }

  .mini-icon {
    width: 36px;
    height: 36px;
    color: color-mix(in srgb, var(--dhc-muted) 86%, white);
  }

  .mini-value {
    margin-top: 7px;
    font-size: clamp(21px, 3vw, 32px);
    line-height: 1;
    font-weight: 700;
  }

  .diagnostics {
    display: grid;
    grid-template-columns: minmax(240px, 1.45fr) repeat(2, minmax(170px, 1fr));
    gap: 0;
    margin-top: clamp(14px, 2vw, 22px);
    padding: 22px;
    align-items: center;
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-good {
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-excellent {
    --severity-color: var(--dhc-green);
  }

  .diagnostics.severity-warning {
    --severity-color: var(--dhc-yellow);
  }

  .diagnostics.severity-critical {
    --severity-color: var(--dhc-red);
  }

  .diagnostics.severity-unknown {
    --severity-color: var(--dhc-muted);
  }

  .summary {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: center;
    min-width: 0;
    padding-right: 24px;
  }

  .status-icon {
    width: 70px;
    height: 70px;
    color: var(--severity-color);
    border: 4px solid color-mix(in srgb, var(--severity-color) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--severity-color) 16%, transparent);
  }

  .summary-title {
    color: var(--severity-color);
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 780;
    line-height: 1.08;
  }

  .summary-text {
    margin-top: 8px;
    color: var(--dhc-muted);
    font-size: clamp(15px, 1.9vw, 18px);
    line-height: 1.35;
  }

  .diagnostic {
    min-width: 0;
    padding: 0 26px;
    border-left: 1px solid color-mix(in srgb, var(--dhc-border) 70%, transparent);
  }

  .diagnostic-head {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
    align-items: center;
  }

  .diagnostic-icon {
    width: 37px;
    height: 37px;
    color: color-mix(in srgb, var(--dhc-muted) 84%, white);
  }

  .diagnostic-value {
    margin-top: 10px;
    color: var(--severity-color);
    font-size: clamp(27px, 4vw, 38px);
    line-height: 1;
    font-weight: 780;
  }

  .diagnostic-sub {
    margin-top: 5px;
    color: var(--severity-color);
    font-size: clamp(15px, 2vw, 20px);
  }

  .bar {
    position: relative;
    height: 9px;
    margin-top: 18px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dhc-muted) 18%, transparent);
  }

  .bar::before {
    content: "";
    display: block;
    width: var(--score);
    height: 100%;
    border-radius: inherit;
    background: var(--severity-color);
    box-shadow: 0 0 14px color-mix(in srgb, var(--severity-color) 65%, transparent);
  }

  .bar::after {
    content: "";
    position: absolute;
    top: 1px;
    left: calc(var(--score) - 4px);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.65);
  }

  @keyframes drift {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -96;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.72;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(4px);
    }
  }

  @media (max-width: 760px) {
    ha-card {
      padding: 18px;
      border-radius: 22px;
    }

    .header {
      grid-template-columns: 1fr;
    }

    .updated {
      justify-content: flex-start;
    }

    .flow {
      grid-template-columns: 1fr;
    }

    .reading.return {
      text-align: left;
    }

    .plant {
      order: -1;
    }

    .metrics,
    .diagnostics {
      grid-template-columns: 1fr;
    }

    .metric.delta {
      align-items: center;
      text-align: center;
      padding-left: clamp(18px, 2vw, 24px);
    }

    .mini {
      border-left: 0;
      padding: 0 8px;
    }

    .summary,
    .diagnostic {
      padding: 0;
      border-left: 0;
    }

    .diagnostic {
      margin-top: 22px;
    }
  }

`, Yt = vt`
  :host {
    display: block;
    padding: 12px 0;
  }

  .section {
    margin: 18px 0 8px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .field {
    display: block;
    margin: 10px 0;
  }

  ha-textfield,
  ha-entity-picker {
    display: block;
    width: 100%;
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: 12px 0;
  }
`;
var te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, et = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ee(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && te(t, e, r), r;
};
let R = class extends E {
  setConfig(s) {
    this.config = {
      ...Ct,
      ...s
    };
  }
  render() {
    return this.config ? p`
      ${this.textField("Titel", "name")}

      <div class="section">Temperaturer</div>
      ${this.entityPicker("Fremløbstemperatur", "supply_temp_entity", !0)}
      ${this.entityPicker("Returtemperatur", "return_temp_entity", !0)}
      ${this.entityPicker("Delta T", "delta_t_entity")}

      <div class="section">Valgfrie målinger</div>
      ${this.entityPicker("Effekt", "power_entity")}
      ${this.entityPicker("Energi i dag", "energy_today_entity")}
      ${this.entityPicker("Forbrug i år", "yearly_energy_entity")}
      ${this.entityPicker("Udetemperatur", "outdoor_temp_entity")}
      ${this.entityPicker("Indetemperatur", "indoor_temp_entity")}
      ${this.entityPicker("Gennemsnitlig Delta T", "average_delta_t_entity")}

      <div class="section">Effektivitet</div>
      ${this.numberField("Minimum Delta T", "min_delta_t")}
      ${this.numberField("God Delta T", "good_delta_t")}
      ${this.numberField("Maks returtemperatur", "max_return_temp")}
      ${this.numberField("God returtemperatur", "good_return_temp")}

      <div class="section">Visning</div>
      ${this.toggle("Vis driftsstatus", "show_status")}
      ${this.toggle("Vis ekstra målinger", "show_secondary")}
      ${this.toggle("Vis effektivitetspanel", "show_diagnostics")}
    ` : p``;
  }
  entityPicker(s, t, e = !1) {
    var i;
    return p`
      <ha-entity-picker
        class="field"
        .hass=${this.hass}
        .label=${s}
        .value=${((i = this.config) == null ? void 0 : i[t]) ?? ""}
        .required=${e}
        allow-custom-entity
        @value-changed=${(r) => this.updateConfig(t, r.detail.value)}
      ></ha-entity-picker>
    `;
  }
  textField(s, t) {
    var e;
    return p`
      <ha-textfield
        class="field"
        .label=${s}
        .value=${((e = this.config) == null ? void 0 : e[t]) ?? ""}
        @input=${(i) => this.updateConfig(t, i.currentTarget.value)}
      ></ha-textfield>
    `;
  }
  numberField(s, t) {
    var e;
    return p`
      <ha-textfield
        class="field"
        type="number"
        .label=${s}
        .value=${String(((e = this.config) == null ? void 0 : e[t]) ?? "")}
        @input=${(i) => {
      const r = Number.parseFloat(i.currentTarget.value);
      this.updateConfig(t, Number.isFinite(r) ? r : void 0);
    }}
      ></ha-textfield>
    `;
  }
  toggle(s, t) {
    var e;
    return p`
      <div class="toggle">
        <span>${s}</span>
        <ha-switch
          .checked=${((e = this.config) == null ? void 0 : e[t]) !== !1}
          @change=${(i) => this.updateConfig(t, i.currentTarget.checked)}
        ></ha-switch>
      </div>
    `;
  }
  updateConfig(s, t) {
    if (!this.config)
      return;
    const e = {
      ...this.config,
      [s]: t === "" ? void 0 : t
    };
    Object.keys(e).forEach((i) => {
      e[i] === void 0 && delete e[i];
    }), this.config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
R.styles = Yt;
et([
  tt({ attribute: !1 })
], R.prototype, "hass", 2);
et([
  At()
], R.prototype, "config", 2);
R = et([
  wt("district-heating-card-editor")
], R);
const g = {
  flame: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2.2c.3 2.8-.7 4.2-2.1 5.8-1.2 1.4-2.6 3-2.3 5.6-1.3-.7-2.2-2.1-2.3-3.6-1.7 1.8-2.8 4-2.8 6.2C4 20 7.4 23 12 23s8-3 8-6.8c0-4.2-3.2-7-4.9-9.2-.9-1.2-1.3-2.4-1.6-4.8Z"/><path d="M12.2 20c-1.8 0-3.3-1.2-3.3-2.9 0-1.5.8-2.5 1.7-3.4.8-.8 1.6-1.7 1.5-3.3 1.7 2.1 3.8 3.6 3.8 6.3 0 1.9-1.5 3.3-3.7 3.3Z"/></svg>`,
  drop: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.3 6.4 9.9A8.1 8.1 0 0 0 5 14.4C5 18.7 8.1 22 12 22s7-3.3 7-7.6c0-1.6-.5-3.2-1.4-4.5L12 2.3Z"/><path d="M8.4 15.3c.4 2 1.8 3.2 3.8 3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  leaf: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3.2C12.9 3 6 7.7 6 14.2c0 1.1.2 2.1.7 3C4.9 18.8 4 20.7 3.4 22l2.1.2c.7-1.5 1.7-3.1 3.1-4.4 1.1.7 2.4 1.1 3.8 1.1C18.7 18.9 22.1 12 21 3.2Zm-4.6 5.3c-2 1.1-4.7 3.2-7.3 6.4-.1-.2-.1-.5-.1-.8 0-4 3.9-7.3 9.3-8-.3.9-.9 1.7-1.9 2.4Z"/></svg>`,
  home: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11Z"/></svg>`,
  gauge: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a10 10 0 0 0-9.8 12.2 1.2 1.2 0 0 0 1.2.9h17.2a1.2 1.2 0 0 0 1.2-.9A10 10 0 0 0 12 4Zm0 3a1 1 0 0 1 1 1v1.3a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1Zm-6.1 6.1H4.6a1 1 0 0 1 0-2h1.3a1 1 0 0 1 0 2Zm3.6 1.8 5.2-4.3a1 1 0 0 1 1.4 1.4l-4.3 5.2a2 2 0 0 1-2.3-2.3Zm9.9-1.8h-1.3a1 1 0 0 1 0-2h1.3a1 1 0 0 1 0 2Z"/></svg>`,
  chart: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16a1 1 0 1 0 0-2H5V4a1 1 0 1 0-2 0v15a1 1 0 0 0 1 1Z"/><path d="M7 16h2.5v-5H7v5Zm4.4 0h2.5V7h-2.5v9Zm4.4 0h2.5v-7h-2.5v7Z"/></svg>`,
  check: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 16.8 4.8 12.2l-2 2 6.6 6.5L21.7 8.4l-2-2z"/></svg>`,
  alert: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1.8 20h20.4L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V8h2v5Z"/></svg>`,
  clock: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.2 3.4 2-.9 1.6-4.5-2.6V6h2v6.2Z"/></svg>`,
  sun: m`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 4.8 5.4 3.4 4 4.8l1.4 1.4 1.4-1.4ZM13 1h-2v3h2V1Zm7 3.8-1.4-1.4-1.4 1.4 1.4 1.4L20 4.8ZM12 6a6 6 0 0 0-5.8 7.5A5.5 5.5 0 0 0 7.5 24h10a5.5 5.5 0 0 0 1.1-10.9A6 6 0 0 0 12 6Z"/></svg>`
};
var ie = Object.defineProperty, re = Object.getOwnPropertyDescriptor, it = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? re(t, e) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && ie(t, e, r), r;
};
const se = "0.1.0";
let j = class extends E {
  static getConfigElement() {
    return document.createElement("district-heating-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:ha-district-heating-card",
      name: "Fjernvarme",
      min_delta_t: 20,
      good_delta_t: 30,
      max_return_temp: 45,
      good_return_temp: 35
    };
  }
  setConfig(s) {
    this.config = kt(s);
  }
  getCardSize() {
    return 6;
  }
  render() {
    if (!this.config)
      return p``;
    const s = w(this.hass, this.config.supply_temp_entity), t = w(this.hass, this.config.return_temp_entity), e = qt(this.hass, this.config), i = Jt(this.config, e, t), r = `severity-${i.severity}`, n = Xt(this.hass, this.config);
    return p`
      <ha-card>
        <div class="header">
          <div class="title">
            <span class="title-icon">${g.flame}</span>
            <div>
              <h2>${this.config.name ?? "Fjernvarme"}</h2>
              ${this.config.show_status !== !1 ? p`<div class="mode">Aktuel drift</div>` : null}
            </div>
          </div>
          ${n ? p`<div class="updated">${g.clock}<span>Opdateret ${n}</span></div>` : null}
        </div>

        <section class="flow" aria-label="Fjernvarme flow">
          ${this.renderReading("Fremløb", y(s, B(this.hass, this.config.supply_temp_entity, "°C")), "Fra fjernvarmen")}
          ${this.renderPlant()}
          ${this.renderReading("Returløb", y(t, B(this.hass, this.config.return_temp_entity, "°C")), "Til fjernvarmen", !0)}
        </section>

        <section class="metrics">
          <div class="panel metric delta" style=${`--severity-color: ${this.severityColor(i.severity)}`}>
            <div class="metric-label">Temperaturforskel (&Delta;T)</div>
            <div class="delta-value">${y(e, "°C")}</div>
            <div class="delta-status">${g.leaf}<span>${i.deltaLabel === "Ukendt" ? "Mangler data" : "God udnyttelse"}</span></div>
          </div>

          ${this.config.power_entity ? this.renderMetric("Effekt", "power_entity", "kW", g.flame, this.renderSparkline()) : null}
          ${this.config.energy_today_entity ? this.renderMetric("Energi i dag", "energy_today_entity", "kWh", g.drop, this.renderBars()) : null}
        </section>

        ${this.config.show_secondary === !1 ? null : this.renderSecondary(e)}
        ${this.config.show_diagnostics === !1 ? null : this.renderDiagnostics(i, t, e, r)}
      </ha-card>
    `;
  }
  renderReading(s, t, e, i = !1) {
    return p`
      <div class=${`reading ${i ? "return" : ""}`}>
        <div class="label">${s}</div>
        <div class="value">${t}</div>
        <div class="caption">${e}</div>
      </div>
    `;
  }
  renderPlant() {
    return p`
      <div class="plant">
        <svg viewBox="0 0 760 250" role="img" aria-label="Fjernvarmerør gennem huset">
          <defs>
            <linearGradient id="hotGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b53129" />
              <stop offset="44%" stop-color="#ff725f" />
              <stop offset="100%" stop-color="#8f2c2c" />
            </linearGradient>
            <linearGradient id="coldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#143d84" />
              <stop offset="50%" stop-color="#55a5ff" />
              <stop offset="100%" stop-color="#1a55b7" />
            </linearGradient>
          </defs>

          <line class="pipe-base pipe-hot" x1="22" y1="108" x2="276" y2="108" />
          <line class="pipe-base pipe-cold" x1="484" y1="108" x2="738" y2="108" />

          <path class="house" d="M334 92V54l-35 1c-10 0-14-13-6-19L380 7a20 20 0 0 1 24 0l87 29c8 6 4 19-6 19h-35v118c0 11-9 20-20 20h-76c-11 0-20-9-20-20V92Z" />

          <g class="radiator" fill="currentColor" opacity="0.84">
            <rect x="351" y="118" width="16" height="66" rx="8" />
            <rect x="381" y="118" width="16" height="66" rx="8" />
            <rect x="411" y="118" width="16" height="66" rx="8" />
            <rect x="441" y="122" width="9" height="58" rx="5" />
            <rect x="345" y="136" width="112" height="10" rx="5" />
          </g>

          <g class="heat-wave" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.86">
            <path d="M371 87c-14-17 14-22 0-39" />
            <path d="M399 87c-14-17 14-22 0-39" />
            <path d="M427 87c-14-17 14-22 0-39" />
          </g>

          <g opacity="0.9">
            <line class="pipe-line" x1="36" y1="88" x2="106" y2="88" stroke-dasharray="46 44" />
            <line class="pipe-line" x1="124" y1="113" x2="228" y2="113" stroke-dasharray="72 55" />
            <line class="spark" x1="52" y1="131" x2="264" y2="131" />
            <polygon class="arrow" points="221,91 259,108 221,125" />

            <line class="pipe-line" x1="504" y1="88" x2="586" y2="88" stroke-dasharray="46 44" />
            <line class="pipe-line" x1="604" y1="113" x2="714" y2="113" stroke-dasharray="72 55" />
            <line class="spark" x1="500" y1="131" x2="724" y2="131" />
            <polygon class="arrow" points="674,91 712,108 674,125" />
          </g>
        </svg>
      </div>
    `;
  }
  renderMetric(s, t, e, i, r) {
    var l;
    const n = (l = this.config) == null ? void 0 : l[t], a = typeof n == "string" ? w(this.hass, n) : void 0, o = typeof n == "string" ? B(this.hass, n, e) : e;
    return p`
      <div class="panel metric">
        <div class="metric-label">${s}</div>
        <div class="metric-value">
          <span class="metric-icon">${i}</span>
          <span>${y(a, o)}</span>
        </div>
        ${r}
      </div>
    `;
  }
  renderSecondary(s) {
    var t, e, i, r;
    return p`
      <section class="panel secondary">
        ${(t = this.config) != null && t.outdoor_temp_entity ? this.renderMini("Udetemperatur", "outdoor_temp_entity", "°C", g.sun) : null}
        ${(e = this.config) != null && e.indoor_temp_entity ? this.renderMini("Indetemperatur", "indoor_temp_entity", "°C", g.home) : null}
        ${(i = this.config) != null && i.yearly_energy_entity ? this.renderMini("Forbrug i år", "yearly_energy_entity", "MWh", g.chart) : null}
        ${(r = this.config) != null && r.average_delta_t_entity ? this.renderMini("Gennemsnitlig ΔT", "average_delta_t_entity", "°C", g.gauge) : this.renderMiniValue("Aktuel ΔT", y(s, "°C"), g.gauge)}
      </section>
    `;
  }
  renderMini(s, t, e, i) {
    var o;
    const r = (o = this.config) == null ? void 0 : o[t], n = typeof r == "string" ? w(this.hass, r) : void 0, a = typeof r == "string" ? B(this.hass, r, e) : e;
    return this.renderMiniValue(s, y(n, a), i);
  }
  renderMiniValue(s, t, e) {
    return p`
      <div class="mini">
        <span class="mini-icon">${e}</span>
        <div>
          <div class="mini-label">${s}</div>
          <div class="mini-value">${t}</div>
        </div>
      </div>
    `;
  }
  renderDiagnostics(s, t, e, i) {
    const r = s.severity === "critical" || s.severity === "warning" ? g.alert : g.check;
    return p`
      <section class=${`panel diagnostics ${i}`}>
        <div class="summary">
          <span class="status-icon">${r}</span>
          <div>
            <div class="summary-title">${s.title}</div>
            <div class="summary-text">${s.message}</div>
          </div>
        </div>

        ${this.renderDiagnostic("Returtemperatur", y(t, "°C"), s.returnLabel, s.returnScore, g.drop)}
        ${this.renderDiagnostic("Afkøling (&Delta;T)", y(e, "°C"), s.deltaLabel, s.deltaScore, g.flame)}
      </section>
    `;
  }
  renderDiagnostic(s, t, e, i, r) {
    return p`
      <div class="diagnostic">
        <div class="diagnostic-head">
          <span class="diagnostic-icon">${r}</span>
          <span class="diagnostic-label">${s}</span>
        </div>
        <div class="diagnostic-value">${t}</div>
        <div class="diagnostic-sub">${e}</div>
        <div class="bar" style=${`--score: ${Math.round(i)}%`}></div>
      </div>
    `;
  }
  renderSparkline() {
    return m`
      <svg class="sparkline" viewBox="0 0 220 54" aria-hidden="true">
        <path d="M4 44 22 34 39 39 57 27 75 25 93 36 110 29 128 31 146 18 164 24 182 30 200 21 216 15" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 44 22 34 39 39 57 27 75 25 93 36 110 29 128 31 146 18 164 24 182 30 200 21 216 15V54H4Z" fill="currentColor" opacity="0.18" />
      </svg>
    `;
  }
  renderBars() {
    return m`
      <svg class="bars" viewBox="0 0 220 54" aria-hidden="true">
        ${[14, 31, 47, 25, 40, 17, 21, 35, 18, 29, 42, 24].map((s, t) => {
      const e = 8 + t * 17;
      return m`<rect x=${e} y=${52 - s} width="9" height=${s} rx="3" fill="currentColor" opacity=${t % 3 === 0 ? "0.55" : "0.9"} />`;
    })}
      </svg>
    `;
  }
  severityColor(s) {
    switch (s) {
      case "excellent":
      case "good":
        return "var(--dhc-green)";
      case "warning":
        return "var(--dhc-yellow)";
      case "critical":
        return "var(--dhc-red)";
      default:
        return "var(--dhc-muted)";
    }
  }
};
j.styles = Qt;
it([
  tt({ attribute: !1 })
], j.prototype, "hass", 2);
it([
  At()
], j.prototype, "config", 2);
j = it([
  wt("ha-district-heating-card")
], j);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "ha-district-heating-card",
  name: "District Heating Card",
  description: "Modern district heating visualization with Delta T and efficiency diagnostics.",
  preview: !0
});
console.info(
  `%c HA District Heating Card %c ${se} `,
  "color: white; background: #1f6feb; font-weight: 700;",
  "color: #1f6feb; background: transparent; font-weight: 700;"
);
export {
  j as HaDistrictHeatingCard
};
