/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i$1 = (t2) => t2, s$1 = t$1.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), w = x(2), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_a = s.litElementHydrateSupport) == null ? void 0 : _a.call(s, { LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1 == null ? void 0 : o$1({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
const translations = {
  da: {
    supply: "Fremløb",
    return: "Returløb",
    flowAria: "Fjernvarme flow",
    plantAria: "Fjernvarmerør gennem huset",
    cooling: "afkøling",
    power: "Effekt",
    today: "I dag",
    year: "I år",
    missingData: "Mangler data",
    excellentTitle: "Meget effektiv udnyttelse",
    goodTitle: "God udnyttelse",
    warningTitle: "Kan optimeres",
    criticalTitle: "Lav effektivitet",
    missingMessage: "Tilføj fremløb, returløb og eventuelt Delta T for at vurdere driften.",
    lowDeltaHighReturn: "Afkølingen er under {minDeltaT} °C, og returtemperaturen er over {maxReturnTemp} °C.",
    lowDelta: "Afkølingen er under minimum på {minDeltaT} °C. Returtemperaturen er acceptabel.",
    highReturn: "Returtemperaturen er over maksimum på {maxReturnTemp} °C. Afkølingen er acceptabel.",
    excellentMessage: "Afkølingen er over {goodDeltaT} °C, og returtemperaturen er under {goodReturnTemp} °C.",
    goodMessage: "Afkøling og returtemperatur ligger i et sundt område.",
    notGoodBoth: "Afkøling og returtemperatur er acceptable, men ikke i det gode område endnu.",
    notGoodDelta: "Afkølingen er acceptabel, men under målet på {goodDeltaT} °C.",
    notGoodReturn: "Returtemperaturen er acceptabel, men over målet på {goodReturnTemp} °C.",
    withinLimits: "Anlægget kører inden for de valgte grænser.",
    seasonalContext: "Vurderet med 24 timers inde/ude-gennemsnit og årstid.",
    seasonalLowLoad: "Acceptabelt for årstiden og den lave varmebelastning.",
    seasonalModerateLoad: "Kravet er justeret efter årstid og udetemperatur.",
    seasonalHighLoad: "Koldt vejr giver et skærpet krav til returtemperaturen.",
    delayedMeterData: "Vurderet som døgnmåling ud fra lufttemperaturen i døgnet op til fjernvarmedataens seneste opdatering.",
    veryGood: "Meget god",
    good: "God",
    low: "Lav",
    high: "Høj",
    unknown: "Ukendt",
    editorTemperatures: "Temperaturer",
    editorSupplyTemp: "Fremløbstemperatur",
    editorReturnTemp: "Returtemperatur",
    editorDeltaT: "Delta T",
    editorOptionalMetrics: "Valgfrie driftstal",
    editorEnergyToday: "Energi i dag",
    editorYearlyEnergy: "Forbrug i år",
    editorAssessmentInput: "Input til vurdering",
    editorOutdoorTemp: "Udetemperatur",
    editorIndoorTemp: "Indetemperatur",
    editorAverageDeltaT: "Gennemsnitlig Delta T",
    editorEfficiency: "Effektivitet",
    editorMinDeltaT: "Minimum Delta T",
    editorGoodDeltaT: "God Delta T",
    editorMaxReturnTemp: "Maks returtemperatur",
    editorGoodReturnTemp: "God returtemperatur",
    editorFlowColors: "Flowfarver",
    editorSupplyLightColor: "Fremløb lys",
    editorSupplyDarkColor: "Fremløb mørk",
    editorReturnLightColor: "Returløb lys",
    editorReturnBlueColor: "Returløb blå"
  },
  en: {
    supply: "Supply",
    return: "Return",
    flowAria: "District heating flow",
    plantAria: "District heating pipes through the house",
    cooling: "cooling",
    power: "Power",
    today: "Today",
    year: "Year",
    missingData: "Missing data",
    excellentTitle: "Very efficient utilization",
    goodTitle: "Good utilization",
    warningTitle: "Can be optimized",
    criticalTitle: "Low efficiency",
    missingMessage: "Add supply, return and optionally Delta T to assess operation.",
    lowDeltaHighReturn: "Cooling is below {minDeltaT} °C, and return temperature is above {maxReturnTemp} °C.",
    lowDelta: "Cooling is below the minimum of {minDeltaT} °C. Return temperature is acceptable.",
    highReturn: "Return temperature is above the maximum of {maxReturnTemp} °C. Cooling is acceptable.",
    excellentMessage: "Cooling is above {goodDeltaT} °C, and return temperature is below {goodReturnTemp} °C.",
    goodMessage: "Cooling and return temperature are in a healthy range.",
    notGoodBoth: "Cooling and return temperature are acceptable, but not yet in the good range.",
    notGoodDelta: "Cooling is acceptable, but below the target of {goodDeltaT} °C.",
    notGoodReturn: "Return temperature is acceptable, but above the target of {goodReturnTemp} °C.",
    withinLimits: "The system is operating within the configured limits.",
    seasonalContext: "Assessed using 24-hour indoor/outdoor averages and season.",
    seasonalLowLoad: "Acceptable for the season and low heating load.",
    seasonalModerateLoad: "The target is adjusted for season and outdoor temperature.",
    seasonalHighLoad: "Cold weather makes the return temperature requirement stricter.",
    delayedMeterData: "Assessed as daily meter data using air temperatures from the 24 hours before the latest district heating update.",
    veryGood: "Very good",
    good: "Good",
    low: "Low",
    high: "High",
    unknown: "Unknown",
    editorTemperatures: "Temperatures",
    editorSupplyTemp: "Supply temperature",
    editorReturnTemp: "Return temperature",
    editorDeltaT: "Delta T",
    editorOptionalMetrics: "Optional metrics",
    editorEnergyToday: "Energy today",
    editorYearlyEnergy: "Yearly energy",
    editorAssessmentInput: "Assessment input",
    editorOutdoorTemp: "Outdoor temperature",
    editorIndoorTemp: "Indoor temperature",
    editorAverageDeltaT: "Average Delta T",
    editorEfficiency: "Efficiency",
    editorMinDeltaT: "Minimum Delta T",
    editorGoodDeltaT: "Good Delta T",
    editorMaxReturnTemp: "Max return temperature",
    editorGoodReturnTemp: "Good return temperature",
    editorFlowColors: "Flow colors",
    editorSupplyLightColor: "Supply light",
    editorSupplyDarkColor: "Supply dark",
    editorReturnLightColor: "Return light",
    editorReturnBlueColor: "Return blue"
  }
};
function languageFromHass(hass) {
  var _a2;
  const language = (((_a2 = hass == null ? void 0 : hass.locale) == null ? void 0 : _a2.language) ?? (hass == null ? void 0 : hass.language) ?? "da").toLowerCase();
  return language.startsWith("en") ? "en" : "da";
}
function translate(language, key, values = {}) {
  const template = translations[language][key] ?? translations.da[key] ?? key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}
const UNAVAILABLE_STATES = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
const DEFAULT_CONFIG = {
  min_delta_t: 20,
  good_delta_t: 30,
  max_return_temp: 45,
  good_return_temp: 35,
  supply_color_low_temp: 50,
  supply_color_high_temp: 75,
  supply_color_low: "#f28aa0",
  supply_color_high: "#8f2438",
  return_color_low_temp: 0,
  return_color_high_temp: 35,
  return_color_low: "#f4f7fb",
  return_color_high: "#3f6ed6",
  show_status: true,
  show_secondary: true,
  show_diagnostics: true
};
function mergeConfig(config) {
  return {
    ...DEFAULT_CONFIG,
    ...config
  };
}
function entity(hass, entityId) {
  if (!hass || !entityId) {
    return void 0;
  }
  return hass.states[entityId];
}
function numericState(hass, entityId) {
  var _a2, _b;
  const state = (_b = (_a2 = entity(hass, entityId)) == null ? void 0 : _a2.state) == null ? void 0 : _b.trim().toLowerCase();
  if (!state || UNAVAILABLE_STATES.has(state)) {
    return void 0;
  }
  const parsed = Number.parseFloat(state.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : void 0;
}
function unit(hass, entityId, fallback) {
  var _a2;
  const measurementUnit = (_a2 = entity(hass, entityId)) == null ? void 0 : _a2.attributes.unit_of_measurement;
  return typeof measurementUnit === "string" && measurementUnit.length > 0 ? measurementUnit : fallback;
}
function formatValue(value, unitLabel, fractionDigits = 1) {
  if (value === void 0) {
    return "--";
  }
  return `${value.toFixed(fractionDigits)} ${unitLabel}`;
}
function computeDeltaT(hass, config) {
  const explicitDelta = numericState(hass, config.delta_t_entity);
  if (explicitDelta !== void 0) {
    return explicitDelta;
  }
  const supply = numericState(hass, config.supply_temp_entity);
  const returned = numericState(hass, config.return_temp_entity);
  if (supply === void 0 || returned === void 0) {
    return void 0;
  }
  return supply - returned;
}
function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}
function efficiency(config, deltaT, returnTemp, language = "da") {
  const merged = mergeConfig(config);
  if (deltaT === void 0 || returnTemp === void 0) {
    return {
      severity: "unknown",
      title: translate(language, "missingData"),
      message: translate(language, "missingMessage"),
      deltaLabel: translate(language, "unknown"),
      returnLabel: translate(language, "unknown"),
      deltaScore: 0,
      returnScore: 0
    };
  }
  const deltaScore = clamp((deltaT - merged.min_delta_t) / (merged.good_delta_t - merged.min_delta_t || 1) * 100);
  const returnScore = clamp((merged.max_return_temp - returnTemp) / (merged.max_return_temp - merged.good_return_temp || 1) * 100);
  const score = deltaScore * 0.55 + returnScore * 0.45;
  const severity = severityFromScore(score, deltaT, returnTemp, merged.min_delta_t, merged.max_return_temp);
  const message = efficiencyMessage(language, severity, deltaT, returnTemp, merged.min_delta_t, merged.good_delta_t, merged.max_return_temp, merged.good_return_temp);
  const copy = {
    excellent: {
      title: translate(language, "excellentTitle")
    },
    good: {
      title: translate(language, "goodTitle")
    },
    warning: {
      title: translate(language, "warningTitle")
    },
    critical: {
      title: translate(language, "criticalTitle")
    },
    unknown: {
      title: translate(language, "missingData")
    }
  };
  return {
    severity,
    ...copy[severity],
    message,
    deltaLabel: deltaT >= merged.good_delta_t ? translate(language, "veryGood") : deltaT >= merged.min_delta_t ? translate(language, "good") : translate(language, "low"),
    returnLabel: returnTemp <= merged.good_return_temp ? translate(language, "veryGood") : returnTemp <= merged.max_return_temp ? translate(language, "good") : translate(language, "high"),
    deltaScore,
    returnScore
  };
}
function efficiencyMessage(language, severity, deltaT, returnTemp, minDeltaT, goodDeltaT, maxReturnTemp, goodReturnTemp) {
  const lowDelta = deltaT < minDeltaT;
  const highReturn = returnTemp > maxReturnTemp;
  const notGoodDelta = deltaT < goodDeltaT;
  const notGoodReturn = returnTemp > goodReturnTemp;
  const values = {
    minDeltaT: minDeltaT.toFixed(1),
    goodDeltaT: goodDeltaT.toFixed(1),
    maxReturnTemp: maxReturnTemp.toFixed(1),
    goodReturnTemp: goodReturnTemp.toFixed(1)
  };
  if (lowDelta && highReturn) {
    return translate(language, "lowDeltaHighReturn", values);
  }
  if (lowDelta) {
    return translate(language, "lowDelta", values);
  }
  if (highReturn) {
    return translate(language, "highReturn", values);
  }
  if (severity === "excellent") {
    return translate(language, "excellentMessage", values);
  }
  if (severity === "good") {
    return translate(language, "goodMessage", values);
  }
  if (notGoodDelta && notGoodReturn) {
    return translate(language, "notGoodBoth", values);
  }
  if (notGoodDelta) {
    return translate(language, "notGoodDelta", values);
  }
  if (notGoodReturn) {
    return translate(language, "notGoodReturn", values);
  }
  return translate(language, "withinLimits", values);
}
function flowColor(value, lowTemp, highTemp, lowColor, highColor) {
  if (value === void 0) {
    return lowColor;
  }
  const ratio = clamp((value - lowTemp) / (highTemp - lowTemp || 1), 0, 1);
  return mixHex(lowColor, highColor, ratio);
}
function alphaHex(color, alpha) {
  const rgb = parseHex(color);
  if (!rgb) {
    return color;
  }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(alpha, 0, 1)})`;
}
function mixHex(left, right, ratio) {
  const from = parseHex(left);
  const to = parseHex(right);
  if (!from || !to) {
    return ratio < 0.5 ? left : right;
  }
  const r2 = Math.round(from.r + (to.r - from.r) * ratio);
  const g2 = Math.round(from.g + (to.g - from.g) * ratio);
  const b2 = Math.round(from.b + (to.b - from.b) * ratio);
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}
function parseHex(color) {
  const normalized = color.trim().replace("#", "");
  const expanded = normalized.length === 3 ? normalized.split("").map((part) => `${part}${part}`).join("") : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return void 0;
  }
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16)
  };
}
function toHex(value) {
  return value.toString(16).padStart(2, "0");
}
function severityFromScore(score, deltaT, returnTemp, minDeltaT, maxReturnTemp) {
  if (deltaT < minDeltaT * 0.75 || returnTemp > maxReturnTemp * 1.2) {
    return "critical";
  }
  if (score >= 86) {
    return "excellent";
  }
  if (score >= 62) {
    return "good";
  }
  if (score >= 38) {
    return "warning";
  }
  return "critical";
}
const cardStyles = i$3`
  :host {
    display: block;
    color: var(--primary-text-color, #f4f7fb);
    --dhc-card-bg: color-mix(in srgb, var(--card-background-color, #171925) 82%, transparent);
    --dhc-panel-bg: color-mix(in srgb, var(--card-background-color, #171925) 68%, transparent);
    --dhc-border: color-mix(in srgb, var(--divider-color, #738099) 40%, transparent);
    --dhc-muted: var(--secondary-text-color, #aeb7c8);
    --dhc-red: #ef6f8e;
    --dhc-red-soft: #f27c98;
    --dhc-blue: #6d8ed6;
    --dhc-green: var(--success-color, #54c76d);
    --dhc-yellow: var(--warning-color, #f4bf45);
    --dhc-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
    --dhc-radius: var(--ha-card-border-radius, 24px);
    font-family: var(--primary-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    padding: clamp(14px, 2.4vw, 22px);
    border-radius: var(--dhc-radius);
    border: 1px solid var(--dhc-border);
    background:
      radial-gradient(circle at 18% 22%, rgba(239, 111, 142, 0.14), transparent 36%),
      radial-gradient(circle at 88% 28%, rgba(109, 142, 214, 0.18), transparent 38%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 32%),
      var(--dhc-card-bg);
    box-shadow: var(--dhc-shadow);
    backdrop-filter: blur(22px) saturate(1.2);
  }

  .header,
  .flow,
  .metrics,
  .secondary,
  .diagnostics {
    position: relative;
    z-index: 1;
  }

  .header {
    display: block;
  }

  .status-icon svg,
  .metric-icon svg,
  .mini-icon svg,
  .diagnostic-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  h2 {
    margin: 0;
    font-size: clamp(28px, 7vw, 42px);
    line-height: 1;
    font-weight: 760;
    letter-spacing: 0;
  }

  .flow {
    margin: 0 0 clamp(10px, 1.8vw, 14px);
  }

  .flow-readings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 6px;
  }

  .reading {
    appearance: none;
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .reading:disabled {
    cursor: default;
  }

  .reading:not(:disabled):hover,
  .stat-value:not(:disabled):hover {
    opacity: 0.86;
  }

  .reading:not(:disabled):focus-visible,
  .stat-value:not(:disabled):focus-visible {
    outline: 2px solid color-mix(in srgb, var(--primary-text-color, #fff) 42%, transparent);
    outline-offset: 4px;
    border-radius: 8px;
  }

  .reading.return {
    text-align: right;
  }

  .label {
    color: var(--dhc-red);
    text-transform: uppercase;
    font-size: clamp(9px, 2vw, 11px);
    font-weight: 780;
    letter-spacing: 0.04em;
  }

  .return .label {
    color: var(--dhc-blue);
  }

  .value {
    margin-top: 4px;
    color: var(--dhc-red);
    font-size: clamp(22px, 6.6vw, 34px);
    line-height: 1;
    font-weight: 780;
  }

  .return .value {
    color: var(--dhc-blue);
  }

  .plant {
    min-width: 0;
    position: relative;
  }

  .plant svg {
    width: 100%;
    max-height: 118px;
    height: auto;
    display: block;
    overflow: hidden;
  }

  .pipe-base {
    stroke-linecap: round;
    stroke-width: 34;
    opacity: 0.92;
  }

  .pipe-glow {
    stroke-linecap: round;
    stroke-width: 44;
    opacity: 0.26;
  }

  .pipe-hot {
    stroke: var(--supply-color, #ef6f8e);
    filter: drop-shadow(0 0 10px var(--supply-color, #ef6f8e));
  }

  .pipe-cold {
    stroke: var(--return-color, #6d8ed6);
    filter: drop-shadow(0 0 10px var(--return-color, #6d8ed6));
  }

  .house-group {
    opacity: 0.62;
    transform: scale(0.9);
    transform-origin: 392px 94px;
  }

  .house {
    fill: color-mix(in srgb, var(--dhc-card-bg) 48%, transparent);
    stroke: color-mix(in srgb, var(--dhc-muted) 42%, transparent);
    stroke-width: 2.4;
  }

  .radiator,
  .heat-wave {
    color: color-mix(in srgb, var(--dhc-muted) 82%, white);
  }

  .water-flow {
    opacity: 0.92;
  }

  .wave {
    fill: none;
    stroke: rgba(255, 255, 255, 0.86);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-dasharray: 34 24;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.22));
  }

  .wave-a {
    animation: waterWave 3.6s linear infinite;
  }

  .wave-b {
    animation: waterWave 4.8s linear infinite;
    opacity: 0.62;
  }

  .bubbles {
    fill: rgba(255, 255, 255, 0.86);
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.24));
    animation: bubbleDrift 4.4s linear infinite, bubblePulse 2.6s ease-in-out infinite;
  }

  .arrow {
    fill: rgba(255, 255, 255, 0.9);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.34));
    animation: pulse 2.8s ease-in-out infinite;
  }

  .return-arrow {
    transform-origin: 645px 94px;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr));
    gap: clamp(12px, 1.8vw, 20px);
  }

  .panel {
    min-width: 0;
    border: 1px solid var(--dhc-border);
    border-radius: 26px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.022)), var(--dhc-panel-bg);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .metric {
    min-height: 112px;
    padding: clamp(16px, 2vw, 22px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .metric.delta {
    align-items: center;
    text-align: center;
    border-color: color-mix(in srgb, var(--severity-color, var(--dhc-green)) 32%, var(--dhc-border));
  }

  .metric-label,
  .mini-label,
  .diagnostic-label {
    color: var(--dhc-muted);
    text-transform: uppercase;
    font-size: clamp(12px, 2.4vw, 15px);
    font-weight: 720;
    letter-spacing: 0.045em;
  }

  .delta-value {
    margin-top: 12px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(42px, 10vw, 64px);
    line-height: 0.98;
    font-weight: 820;
  }

  .delta-status {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 18px;
    color: var(--severity-color, var(--dhc-green));
    font-size: clamp(17px, 4vw, 23px);
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

  .flow-readings {
    align-items: start;
  }

  .reading {
    min-width: 0;
  }

  .label {
    font-size: 9px;
  }

  .value {
    font-size: clamp(22px, 6.6vw, 34px);
  }

  .diagnostics {
    display: block;
    margin-top: 10px;
    padding: 12px 14px;
    border: 1px solid color-mix(in srgb, var(--severity-color) 34%, var(--dhc-border));
    border-radius: 20px;
    background: linear-gradient(145deg, color-mix(in srgb, var(--severity-color) 10%, transparent), rgba(255, 255, 255, 0.025)), var(--dhc-panel-bg);
    cursor: pointer;
  }

  .summary {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    padding: 0;
  }

  .status-icon {
    width: 30px;
    height: 30px;
    border-width: 2px;
  }

  .summary-title {
    font-size: clamp(15px, 4.1vw, 18px);
  }

  .summary-text {
    margin-top: 4px;
    font-size: clamp(11px, 3.1vw, 13px);
    line-height: 1.26;
  }

  .summary-note {
    margin-top: 4px;
    color: color-mix(in srgb, var(--severity-color) 82%, white);
    font-size: clamp(10px, 2.8vw, 12px);
    line-height: 1.24;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }

  .stat {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 7px;
    align-items: center;
    min-width: 0;
    padding: 8px 10px;
    border: 1px solid var(--dhc-border);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.04);
  }

  .stat-icon {
    width: 18px;
    height: 18px;
    color: color-mix(in srgb, var(--dhc-muted) 86%, white);
  }

  .stat-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .stat-text {
    display: grid;
    min-width: 0;
  }

  .stat-label {
    color: var(--dhc-muted);
    font-size: 9px;
    font-weight: 760;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .stat-value {
    appearance: none;
    width: fit-content;
    min-width: 0;
    margin: 2px 0 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    margin-top: 2px;
    font-size: 13px;
    font-weight: 740;
    white-space: nowrap;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    text-decoration: none;
  }

  .stat-value:disabled {
    cursor: default;
  }

  @keyframes waterWave {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -116;
    }
  }

  @keyframes bubbleDrift {
    0% {
      transform: translateX(-12px);
    }
    100% {
      transform: translateX(28px);
    }
  }

  @keyframes bubblePulse {
    0%,
    100% {
      opacity: 0.52;
    }
    50% {
      opacity: 0.95;
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

  @keyframes pulseBack {
    0%,
    100% {
      opacity: 0.72;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(-4px);
    }
  }

  @media (max-width: 760px) {
    ha-card {
      padding: 14px;
      border-radius: 20px;
    }

    .flow-readings {
      gap: 12px;
    }

    .plant svg {
      min-height: 92px;
    }

    .diagnostics {
      grid-template-columns: 1fr;
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

`;
const editorStyles = i$3`
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

  .native-field {
    display: grid;
    gap: 6px;
    margin: 10px 0;
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 600;
  }

  .native-field input {
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 8px 12px;
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.18));
    border-radius: 8px;
    background: var(--card-background-color, rgba(255, 255, 255, 0.04));
    color: var(--primary-text-color);
    font: inherit;
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
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let DistrictHeatingCardEditor = class extends i {
  setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    };
  }
  render() {
    if (!this.config) {
      return b``;
    }
    const language = languageFromHass(this.hass);
    return b`
      <div class="section">${translate(language, "editorTemperatures")}</div>
      ${this.entityPicker(translate(language, "editorSupplyTemp"), "supply_temp_entity", true)}
      ${this.entityPicker(translate(language, "editorReturnTemp"), "return_temp_entity", true)}
      ${this.entityPicker(translate(language, "editorDeltaT"), "delta_t_entity")}

      <div class="section">${translate(language, "editorOptionalMetrics")}</div>
      ${this.entityPicker(translate(language, "power"), "power_entity")}
      ${this.entityPicker(translate(language, "editorEnergyToday"), "energy_today_entity")}
      ${this.entityPicker(translate(language, "editorYearlyEnergy"), "yearly_energy_entity")}

      <div class="section">${translate(language, "editorAssessmentInput")}</div>
      ${this.entityPicker(translate(language, "editorOutdoorTemp"), "outdoor_temp_entity")}
      ${this.entityPicker(translate(language, "editorIndoorTemp"), "indoor_temp_entity")}
      ${this.entityPicker(translate(language, "editorAverageDeltaT"), "average_delta_t_entity")}

      <div class="section">${translate(language, "editorEfficiency")}</div>
      ${this.numberField(translate(language, "editorMinDeltaT"), "min_delta_t")}
      ${this.numberField(translate(language, "editorGoodDeltaT"), "good_delta_t")}
      ${this.numberField(translate(language, "editorMaxReturnTemp"), "max_return_temp")}
      ${this.numberField(translate(language, "editorGoodReturnTemp"), "good_return_temp")}

      <div class="section">${translate(language, "editorFlowColors")}</div>
      ${this.textField(translate(language, "editorSupplyLightColor"), "supply_color_low")}
      ${this.textField(translate(language, "editorSupplyDarkColor"), "supply_color_high")}
      ${this.textField(translate(language, "editorReturnLightColor"), "return_color_low")}
      ${this.textField(translate(language, "editorReturnBlueColor"), "return_color_high")}
    `;
  }
  entityPicker(label, key, required = false) {
    var _a2;
    return b`
      <ha-entity-picker
        class="field"
        .hass=${this.hass}
        .label=${label}
        .value=${((_a2 = this.config) == null ? void 0 : _a2[key]) ?? ""}
        .required=${required}
        allow-custom-entity
        @value-changed=${(event) => this.updateConfig(key, event.detail.value)}
      ></ha-entity-picker>
    `;
  }
  textField(label, key) {
    var _a2;
    return b`
      <label class="native-field">
        <span>${label}</span>
        <input
          type="text"
          .value=${String(((_a2 = this.config) == null ? void 0 : _a2[key]) ?? "#ffffff")}
          @input=${(event) => this.updateConfig(key, this.eventValue(event))}
          @change=${(event) => this.updateConfig(key, this.eventValue(event))}
        />
      </label>
    `;
  }
  numberField(label, key) {
    var _a2;
    return b`
      <label class="native-field">
        <span>${label}</span>
        <input
        type="number"
        step="0.1"
        .value=${String(((_a2 = this.config) == null ? void 0 : _a2[key]) ?? "")}
        @input=${(event) => this.updateNumberConfig(key, this.eventValue(event))}
        @change=${(event) => this.updateNumberConfig(key, this.eventValue(event))}
        />
      </label>
    `;
  }
  eventValue(event) {
    return String(event.target.value ?? "");
  }
  updateNumberConfig(key, rawValue) {
    const value = Number.parseFloat(String(rawValue ?? "").replace(",", "."));
    this.updateConfig(key, Number.isFinite(value) ? value : void 0);
  }
  updateConfig(key, value) {
    if (!this.config) {
      return;
    }
    const nextConfig = {
      ...this.config,
      [key]: value === "" ? void 0 : value
    };
    Object.keys(nextConfig).forEach((configKey) => {
      if (nextConfig[configKey] === void 0) {
        delete nextConfig[configKey];
      }
    });
    this.config = nextConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true
      })
    );
  }
};
DistrictHeatingCardEditor.styles = editorStyles;
__decorateClass$1([
  n2({ attribute: false })
], DistrictHeatingCardEditor.prototype, "hass", 2);
__decorateClass$1([
  r()
], DistrictHeatingCardEditor.prototype, "config", 2);
DistrictHeatingCardEditor = __decorateClass$1([
  t("district-heating-card-editor")
], DistrictHeatingCardEditor);
const icons = {
  flame: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2.2c.3 2.8-.7 4.2-2.1 5.8-1.2 1.4-2.6 3-2.3 5.6-1.3-.7-2.2-2.1-2.3-3.6-1.7 1.8-2.8 4-2.8 6.2C4 20 7.4 23 12 23s8-3 8-6.8c0-4.2-3.2-7-4.9-9.2-.9-1.2-1.3-2.4-1.6-4.8Z"/><path d="M12.2 20c-1.8 0-3.3-1.2-3.3-2.9 0-1.5.8-2.5 1.7-3.4.8-.8 1.6-1.7 1.5-3.3 1.7 2.1 3.8 3.6 3.8 6.3 0 1.9-1.5 3.3-3.7 3.3Z"/></svg>`,
  drop: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.3 6.4 9.9A8.1 8.1 0 0 0 5 14.4C5 18.7 8.1 22 12 22s7-3.3 7-7.6c0-1.6-.5-3.2-1.4-4.5L12 2.3Z"/><path d="M8.4 15.3c.4 2 1.8 3.2 3.8 3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  leaf: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3.2C12.9 3 6 7.7 6 14.2c0 1.1.2 2.1.7 3C4.9 18.8 4 20.7 3.4 22l2.1.2c.7-1.5 1.7-3.1 3.1-4.4 1.1.7 2.4 1.1 3.8 1.1C18.7 18.9 22.1 12 21 3.2Zm-4.6 5.3c-2 1.1-4.7 3.2-7.3 6.4-.1-.2-.1-.5-.1-.8 0-4 3.9-7.3 9.3-8-.3.9-.9 1.7-1.9 2.4Z"/></svg>`,
  home: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11Z"/></svg>`,
  gauge: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a10 10 0 0 0-9.8 12.2 1.2 1.2 0 0 0 1.2.9h17.2a1.2 1.2 0 0 0 1.2-.9A10 10 0 0 0 12 4Zm0 3a1 1 0 0 1 1 1v1.3a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1Zm-6.1 6.1H4.6a1 1 0 0 1 0-2h1.3a1 1 0 0 1 0 2Zm3.6 1.8 5.2-4.3a1 1 0 0 1 1.4 1.4l-4.3 5.2a2 2 0 0 1-2.3-2.3Zm9.9-1.8h-1.3a1 1 0 0 1 0-2h1.3a1 1 0 0 1 0 2Z"/></svg>`,
  chart: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16a1 1 0 1 0 0-2H5V4a1 1 0 1 0-2 0v15a1 1 0 0 0 1 1Z"/><path d="M7 16h2.5v-5H7v5Zm4.4 0h2.5V7h-2.5v9Zm4.4 0h2.5v-7h-2.5v7Z"/></svg>`,
  check: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 16.8 4.8 12.2l-2 2 6.6 6.5L21.7 8.4l-2-2z"/></svg>`,
  alert: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1.8 20h20.4L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V8h2v5Z"/></svg>`,
  clock: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.2 3.4 2-.9 1.6-4.5-2.6V6h2v6.2Z"/></svg>`,
  sun: w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 4.8 5.4 3.4 4 4.8l1.4 1.4 1.4-1.4ZM13 1h-2v3h2V1Zm7 3.8-1.4-1.4-1.4 1.4 1.4 1.4L20 4.8ZM12 6a6 6 0 0 0-5.8 7.5A5.5 5.5 0 0 0 7.5 24h10a5.5 5.5 0 0 0 1.1-10.9A6 6 0 0 0 12 6Z"/></svg>`
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
const CARD_VERSION = "0.1.0";
let HaDistrictHeatingCard = class extends i {
  constructor() {
    super(...arguments);
    this.historyAverages = {};
  }
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
  setConfig(config) {
    this.config = mergeConfig(config);
  }
  getCardSize() {
    return 3;
  }
  render() {
    if (!this.config) {
      return b``;
    }
    const supply = numericState(this.hass, this.config.supply_temp_entity);
    const returned = numericState(this.hass, this.config.return_temp_entity);
    const deltaT = computeDeltaT(this.hass, this.config);
    const averageDeltaT = numericState(this.hass, this.config.average_delta_t_entity);
    const language = languageFromHass(this.hass);
    const indoorTemp = this.historyAverages.indoor ?? numericState(this.hass, this.config.indoor_temp_entity);
    const outdoorTemp = this.historyAverages.outdoor ?? numericState(this.hass, this.config.outdoor_temp_entity);
    const assessment = this.adjustAssessmentForContext(this.config, indoorTemp, outdoorTemp);
    const assessmentConfig = assessment.config;
    const result = efficiency(assessmentConfig, averageDeltaT ?? deltaT, returned, language);
    const severityClass = `severity-${result.severity}`;
    const supplyColor = flowColor(
      supply,
      this.config.supply_color_low_temp ?? 50,
      this.config.supply_color_high_temp ?? 75,
      this.config.supply_color_low ?? "#f28aa0",
      this.config.supply_color_high ?? "#8f2438"
    );
    const returnColor = flowColor(
      returned,
      this.config.return_color_low_temp ?? 0,
      this.config.return_color_high_temp ?? 35,
      this.config.return_color_low ?? "#f4f7fb",
      this.config.return_color_high ?? "#3f6ed6"
    );
    const style = [
      `--supply-color: ${supplyColor}`,
      `--supply-bg: ${alphaHex(supplyColor, 0.68)}`,
      `--return-color: ${returnColor}`,
      `--return-bg: ${alphaHex(returnColor, 0.68)}`,
      `--severity-color: ${this.severityColor(result.severity)}`
    ].join(";");
    return b`
      <ha-card style=${style}>
        <section class="flow" aria-label=${translate(language, "flowAria")}>
          <div class="flow-readings">
            ${this.renderReading(translate(language, "supply"), formatValue(supply, unit(this.hass, this.config.supply_temp_entity, "°C")), this.config.supply_temp_entity)}
            ${this.renderReading(translate(language, "return"), formatValue(returned, unit(this.hass, this.config.return_temp_entity, "°C")), this.config.return_temp_entity, true)}
          </div>
          ${this.renderPlant(language)}
        </section>

        ${this.renderDiagnostics(result, deltaT, severityClass, language, this.diagnosticNotes(assessment.noteKey))}
        ${this.renderStats(language)}
      </ha-card>
    `;
  }
  updated() {
    this.fetchHistoryAverages();
  }
  renderReading(label, value, entityId, isReturn = false) {
    return b`
      <button class=${`reading ${isReturn ? "return" : ""}`} ?disabled=${!entityId} @click=${() => this.showMoreInfo(entityId)}>
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </button>
    `;
  }
  renderPlant(language = languageFromHass(this.hass)) {
    return b`
      <div class="plant">
        <svg viewBox="0 16 760 146" role="img" aria-label=${translate(language, "plantAria")}>
          <line class="pipe-glow pipe-hot" x1="24" y1="94" x2="360" y2="94" />
          <line class="pipe-glow pipe-cold" x1="400" y1="94" x2="736" y2="94" />
          <line class="pipe-base pipe-hot" x1="24" y1="94" x2="360" y2="94" />
          <line class="pipe-base pipe-cold" x1="400" y1="94" x2="736" y2="94" />

          <g class="house-group">
            <path class="house" d="M331 78V45h-32c-9 0-13-12-6-17l88-31a20 20 0 0 1 22 0l88 31c7 5 3 17-6 17h-32v103c0 11-9 20-20 20h-82c-11 0-20-9-20-20V78Z" />

            <g class="radiator" fill="currentColor" opacity="0.84">
              <rect x="350" y="98" width="13" height="55" rx="7" />
              <rect x="375" y="98" width="13" height="55" rx="7" />
              <rect x="400" y="98" width="13" height="55" rx="7" />
              <rect x="425" y="102" width="8" height="47" rx="4" />
              <rect x="344" y="114" width="96" height="8" rx="4" />
            </g>

            <g class="heat-wave" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.86">
              <path d="M365 82c-13-16 13-21 0-37" />
              <path d="M392 82c-13-16 13-21 0-37" />
              <path d="M419 82c-13-16 13-21 0-37" />
            </g>
          </g>

          <g class="water-flow">
            <path class="wave supply-wave wave-a" d="M42 89 C64 76 84 112 106 98 S150 76 172 94 S216 111 238 93 S282 77 304 95 S330 105 352 92" />
            <path class="wave supply-wave wave-b" d="M38 101 C62 112 82 78 106 91 S150 112 174 92 S218 78 242 95 S286 111 344 92" />
            <g class="bubbles supply-bubbles">
              <circle cx="68" cy="89" r="3.2" />
              <circle cx="108" cy="102" r="2.3" />
              <circle cx="151" cy="86" r="2.7" />
              <circle cx="204" cy="101" r="3" />
              <circle cx="253" cy="88" r="2.2" />
              <circle cx="306" cy="101" r="2.8" />
            </g>
            <polygon class="arrow supply-arrow" points="214,72 252,94 214,116" />

            <path class="wave return-wave wave-a" d="M410 89 C434 76 454 112 478 98 S522 76 546 94 S590 111 614 93 S658 77 680 95 S704 105 724 92" />
            <path class="wave return-wave wave-b" d="M410 101 C434 112 454 78 478 91 S522 112 546 92 S590 78 614 95 S658 111 724 92" />
            <g class="bubbles return-bubbles">
              <circle cx="440" cy="101" r="2.8" />
              <circle cx="489" cy="87" r="2.2" />
              <circle cx="532" cy="102" r="3.1" />
              <circle cx="586" cy="88" r="2.6" />
              <circle cx="637" cy="101" r="2.4" />
              <circle cx="694" cy="88" r="3" />
            </g>
            <polygon class="arrow return-arrow" points="626,72 664,94 626,116" />
          </g>
        </svg>
      </div>
    `;
  }
  renderStat(label, key, fallbackUnit, icon) {
    var _a2;
    const entityId = (_a2 = this.config) == null ? void 0 : _a2[key];
    const value = typeof entityId === "string" ? numericState(this.hass, entityId) : void 0;
    const labelUnit = typeof entityId === "string" ? unit(this.hass, entityId, fallbackUnit) : fallbackUnit;
    return b`
      <div class="stat">
        <span class="stat-icon">${icon}</span>
        <span class="stat-text">
          <span class="stat-label">${label}</span>
          <button class="stat-value" ?disabled=${typeof entityId !== "string"} @click=${() => this.showMoreInfo(typeof entityId === "string" ? entityId : void 0)}>
            ${formatValue(value, labelUnit)}
          </button>
        </span>
      </div>
    `;
  }
  renderStats(language = languageFromHass(this.hass)) {
    var _a2, _b, _c;
    const stats = [
      ((_a2 = this.config) == null ? void 0 : _a2.power_entity) ? this.renderStat(translate(language, "power"), "power_entity", "kW", icons.flame) : null,
      ((_b = this.config) == null ? void 0 : _b.energy_today_entity) ? this.renderStat(translate(language, "today"), "energy_today_entity", "kWh", icons.drop) : null,
      ((_c = this.config) == null ? void 0 : _c.yearly_energy_entity) ? this.renderStat(translate(language, "year"), "yearly_energy_entity", "MWh", icons.chart) : null
    ].filter(Boolean);
    if (stats.length === 0) {
      return null;
    }
    return b`
      <section class="stats">${stats}</section>
    `;
  }
  renderDiagnostics(result, deltaT, severityClass, language = languageFromHass(this.hass), noteKeys = []) {
    var _a2;
    const statusIcon = result.severity === "critical" || result.severity === "warning" ? icons.alert : icons.check;
    const deltaEntity = (_a2 = this.config) == null ? void 0 : _a2.delta_t_entity;
    return b`
      <section class=${`diagnostics ${severityClass}`} @click=${() => this.showMoreInfo(deltaEntity)}>
        <div class="summary">
          <span class="status-icon">${statusIcon}</span>
          <div>
            <div class="summary-title">${result.title}</div>
            <div class="summary-text">${formatValue(deltaT, "°C")} ${translate(language, "cooling")} · ${result.message}</div>
            ${noteKeys.map((noteKey) => b`<div class="summary-note">${translate(language, noteKey)}</div>`)}
          </div>
        </div>
      </section>
    `;
  }
  adjustAssessmentForContext(config, indoorTemp, outdoorTemp) {
    if (indoorTemp === void 0 || outdoorTemp === void 0) {
      return { config };
    }
    const heatDemand = indoorTemp - outdoorTemp;
    const seasonFactor = this.seasonalDemandFactor(outdoorTemp, heatDemand);
    const baseMinDeltaT = config.min_delta_t ?? 20;
    const baseGoodDeltaT = config.good_delta_t ?? 30;
    const nextConfig = {
      ...config,
      min_delta_t: Math.max(8, baseMinDeltaT * seasonFactor),
      good_delta_t: Math.max(12, baseGoodDeltaT * seasonFactor)
    };
    if (heatDemand > 22 || seasonFactor >= 0.95) {
      return {
        config: {
          ...nextConfig,
          max_return_temp: (config.max_return_temp ?? 45) - 3,
          good_return_temp: (config.good_return_temp ?? 35) - 2
        },
        noteKey: "seasonalHighLoad"
      };
    }
    if (seasonFactor <= 0.68) {
      return { config: nextConfig, noteKey: "seasonalLowLoad" };
    }
    if (seasonFactor < 0.9) {
      return { config: nextConfig, noteKey: "seasonalModerateLoad" };
    }
    return { config: nextConfig };
  }
  seasonalDemandFactor(outdoorTemp, heatDemand) {
    const month = (/* @__PURE__ */ new Date()).getMonth();
    const isSummer = month >= 4 && month <= 8;
    const isShoulder = month === 2 || month === 3 || month === 9 || month === 10;
    let factor = isSummer ? 0.62 : isShoulder ? 0.78 : 1;
    if (outdoorTemp >= 17 || heatDemand < 6) {
      factor = Math.min(factor, 0.58);
    } else if (outdoorTemp >= 12 || heatDemand < 10) {
      factor = Math.min(factor, 0.68);
    } else if (outdoorTemp >= 7 || heatDemand < 14) {
      factor = Math.min(factor, 0.82);
    }
    if (outdoorTemp <= 0 || heatDemand > 22) {
      factor = Math.max(factor, 1);
    }
    return factor;
  }
  diagnosticNotes(seasonNote) {
    const notes = [];
    if (seasonNote) {
      notes.push(seasonNote);
    }
    if (this.historyEndTime && Date.now() - this.historyEndTime > 18 * 60 * 60 * 1e3) {
      notes.push("delayedMeterData");
    }
    return notes;
  }
  async fetchHistoryAverages() {
    var _a2;
    if (!((_a2 = this.hass) == null ? void 0 : _a2.callWS) || !this.config) {
      return;
    }
    const entityIds = [this.config.indoor_temp_entity, this.config.outdoor_temp_entity].filter(Boolean);
    if (entityIds.length === 0) {
      return;
    }
    const endTime = this.districtHeatingDataTime();
    const bucket = Math.floor(endTime.getTime() / (30 * 60 * 1e3));
    const nextKey = `${entityIds.join("|")}:${bucket}`;
    if (this.historyKey === nextKey) {
      return;
    }
    this.historyKey = nextKey;
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1e3);
    try {
      const history = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        entity_ids: entityIds,
        minimal_response: true,
        no_attributes: true
      });
      this.historyAverages = {
        indoor: this.averageHistory(history, this.config.indoor_temp_entity, startTime, endTime),
        outdoor: this.averageHistory(history, this.config.outdoor_temp_entity, startTime, endTime)
      };
      this.historyEndTime = endTime.getTime();
    } catch (_error) {
      this.historyAverages = {};
      this.historyEndTime = void 0;
    }
  }
  districtHeatingDataTime() {
    var _a2, _b, _c;
    const timestamps = [
      (_a2 = this.config) == null ? void 0 : _a2.supply_temp_entity,
      (_b = this.config) == null ? void 0 : _b.return_temp_entity,
      (_c = this.config) == null ? void 0 : _c.delta_t_entity
    ].map((entityId) => {
      var _a3, _b2;
      return entityId ? (_b2 = (_a3 = this.hass) == null ? void 0 : _a3.states[entityId]) == null ? void 0 : _b2.last_updated : void 0;
    }).filter(Boolean).map((timestamp) => new Date(timestamp).getTime()).filter((timestamp) => Number.isFinite(timestamp));
    if (timestamps.length === 0) {
      return /* @__PURE__ */ new Date();
    }
    return new Date(Math.max(...timestamps));
  }
  averageHistory(history, entityId, startTime, endTime) {
    if (!entityId) {
      return void 0;
    }
    const points = (history[entityId] ?? []).map((point) => ({
      value: Number.parseFloat(String(point.s ?? point.state ?? "").replace(",", ".")),
      time: this.historyPointTime(point)
    })).filter((point) => Number.isFinite(point.value) && point.time !== void 0).sort((left, right) => (left.time ?? 0) - (right.time ?? 0));
    if (points.length === 0) {
      return numericState(this.hass, entityId);
    }
    const sampleInterval = 30 * 60 * 1e3;
    const samples = [];
    let cursor = 0;
    for (let sampleTime = startTime.getTime(); sampleTime <= endTime.getTime(); sampleTime += sampleInterval) {
      while (cursor < points.length - 1 && points[cursor + 1].time <= sampleTime) {
        cursor += 1;
      }
      const sample = points[cursor].time <= sampleTime ? points[cursor] : points[0];
      samples.push(sample.value);
    }
    return samples.reduce((sum, value) => sum + value, 0) / samples.length;
  }
  historyPointTime(point) {
    if (typeof point.lu === "number") {
      return point.lu > 1e12 ? point.lu : point.lu * 1e3;
    }
    const timestamp = point.last_updated ?? point.last_changed;
    if (!timestamp) {
      return void 0;
    }
    const parsed = new Date(timestamp).getTime();
    return Number.isFinite(parsed) ? parsed : void 0;
  }
  severityColor(severity) {
    switch (severity) {
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
  showMoreInfo(entityId) {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true
      })
    );
  }
};
HaDistrictHeatingCard.styles = cardStyles;
__decorateClass([
  n2({ attribute: false })
], HaDistrictHeatingCard.prototype, "hass", 2);
__decorateClass([
  r()
], HaDistrictHeatingCard.prototype, "config", 2);
__decorateClass([
  r()
], HaDistrictHeatingCard.prototype, "historyAverages", 2);
__decorateClass([
  r()
], HaDistrictHeatingCard.prototype, "historyEndTime", 2);
HaDistrictHeatingCard = __decorateClass([
  t("ha-district-heating-card")
], HaDistrictHeatingCard);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "ha-district-heating-card",
  name: "District Heating Card",
  description: "Modern district heating visualization with Delta T and efficiency diagnostics.",
  preview: true
});
console.info(
  `%c HA District Heating Card %c ${CARD_VERSION} `,
  "color: white; background: #1f6feb; font-weight: 700;",
  "color: #1f6feb; background: transparent; font-weight: 700;"
);
export {
  HaDistrictHeatingCard
};
