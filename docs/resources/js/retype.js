/*! Retype v3.5.0 | retype.com | Copyright 2023. Object.NET, Inc. All rights reserved. */

/*! For license information please see retype.js.LICENSE.txt */
(() => {
    var e = {
        6184: (e, t, n) => {
            "use strict";
            n.d(t, {BL: () => Ce, Vn: () => Te, nP: () => xe, ry: () => _e}), function () {
                if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.polyfillWrapFlushCallback) return;
                const e = HTMLElement;
                window.HTMLElement = function () {
                    return Reflect.construct(e, [], this.constructor)
                }, HTMLElement.prototype = e.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, e)
            }(), function (e) {
                function t(e, t, n) {
                    throw new e("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + t + ".", n)
                }

                "function" != typeof e.requestSubmit && (e.requestSubmit = function (e) {
                    e ? (function (e, n) {
                        e instanceof HTMLElement || t(TypeError, "parameter 1 is not of type 'HTMLElement'"), "submit" == e.type || t(TypeError, "The specified element is not a submit button"), e.form == n || t(DOMException, "The specified element is not owned by this form element", "NotFoundError")
                    }(e, this), e.click()) : ((e = document.createElement("input")).type = "submit", e.hidden = !0, this.appendChild(e), e.click(), this.removeChild(e))
                })
            }(HTMLFormElement.prototype);
            const r = new WeakMap;

            function o(e) {
                const t = function (e) {
                    const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null, n = t ? t.closest("input, button") : null;
                    return "submit" == (null == n ? void 0 : n.type) ? n : null
                }(e.target);
                t && t.form && r.set(t.form, t)
            }

            var i, s, a, l, c, u;
            !function () {
                if ("submitter" in Event.prototype) return;
                let e = window.Event.prototype;
                if ("SubmitEvent" in window && /Apple Computer/.test(navigator.vendor)) e = window.SubmitEvent.prototype; else if ("SubmitEvent" in window) return;
                addEventListener("click", o, !0), Object.defineProperty(e, "submitter", {
                    get() {
                        if ("submit" == this.type && this.target instanceof HTMLFormElement) return r.get(this.target)
                    }
                })
            }(), function (e) {
                e.eager = "eager", e.lazy = "lazy"
            }(i || (i = {}));

            class d extends HTMLElement {
                static get observedAttributes() {
                    return ["disabled", "complete", "loading", "src"]
                }

                constructor() {
                    super(), this.loaded = Promise.resolve(), this.delegate = new d.delegateConstructor(this)
                }

                connectedCallback() {
                    this.delegate.connect()
                }

                disconnectedCallback() {
                    this.delegate.disconnect()
                }

                reload() {
                    return this.delegate.sourceURLReloaded()
                }

                attributeChangedCallback(e) {
                    "loading" == e ? this.delegate.loadingStyleChanged() : "complete" == e ? this.delegate.completeChanged() : "src" == e ? this.delegate.sourceURLChanged() : this.delegate.disabledChanged()
                }

                get src() {
                    return this.getAttribute("src")
                }

                set src(e) {
                    e ? this.setAttribute("src", e) : this.removeAttribute("src")
                }

                get loading() {
                    return "lazy" === (this.getAttribute("loading") || "").toLowerCase() ? i.lazy : i.eager
                }

                set loading(e) {
                    e ? this.setAttribute("loading", e) : this.removeAttribute("loading")
                }

                get disabled() {
                    return this.hasAttribute("disabled")
                }

                set disabled(e) {
                    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                }

                get autoscroll() {
                    return this.hasAttribute("autoscroll")
                }

                set autoscroll(e) {
                    e ? this.setAttribute("autoscroll", "") : this.removeAttribute("autoscroll")
                }

                get complete() {
                    return !this.delegate.isLoading
                }

                get isActive() {
                    return this.ownerDocument === document && !this.isPreview
                }

                get isPreview() {
                    var e, t;
                    return null === (t = null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.documentElement) || void 0 === t ? void 0 : t.hasAttribute("data-turbo-preview")
                }
            }

            function h(e) {
                return new URL(e.toString(), document.baseURI)
            }

            function p(e) {
                let t;
                return e.hash ? e.hash.slice(1) : (t = e.href.match(/#(.*)$/)) ? t[1] : void 0
            }

            function f(e, t) {
                return h((null == t ? void 0 : t.getAttribute("formaction")) || e.getAttribute("action") || e.action)
            }

            function m(e, t) {
                return function (e, t) {
                    const n = function (e) {
                        return (t = e.origin + e.pathname).endsWith("/") ? t : t + "/";
                        var t
                    }(t);
                    return e.href === h(n).href || e.href.startsWith(n)
                }(e, t) && !!(n = e, (function (e) {
                    return function (e) {
                        return e.pathname.split("/").slice(1)
                    }(e).slice(-1)[0]
                }(n).match(/\.[^.]*$/) || [])[0] || "").match(/^(?:|\.(?:htm|html|xhtml|php))$/);
                var n
            }

            function v(e) {
                const t = p(e);
                return null != t ? e.href.slice(0, -(t.length + 1)) : e.href
            }

            function g(e) {
                return v(e)
            }

            class b {
                constructor(e) {
                    this.response = e
                }

                get succeeded() {
                    return this.response.ok
                }

                get failed() {
                    return !this.succeeded
                }

                get clientError() {
                    return this.statusCode >= 400 && this.statusCode <= 499
                }

                get serverError() {
                    return this.statusCode >= 500 && this.statusCode <= 599
                }

                get redirected() {
                    return this.response.redirected
                }

                get location() {
                    return h(this.response.url)
                }

                get isHTML() {
                    return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)
                }

                get statusCode() {
                    return this.response.status
                }

                get contentType() {
                    return this.header("Content-Type")
                }

                get responseText() {
                    return this.response.clone().text()
                }

                get responseHTML() {
                    return this.isHTML ? this.response.clone().text() : Promise.resolve(void 0)
                }

                header(e) {
                    return this.response.headers.get(e)
                }
            }

            function y(e) {
                if ("false" == e.getAttribute("data-turbo-eval")) return e;
                {
                    const t = document.createElement("script"), n = O("csp-nonce");
                    return n && (t.nonce = n), t.textContent = e.textContent, t.async = !1, function (e, t) {
                        for (const {name: n, value: r} of t.attributes) e.setAttribute(n, r)
                    }(t, e), t
                }
            }

            function w(e, {target: t, cancelable: n, detail: r} = {}) {
                const o = new CustomEvent(e, {cancelable: n, bubbles: !0, composed: !0, detail: r});
                return t && t.isConnected ? t.dispatchEvent(o) : document.documentElement.dispatchEvent(o), o
            }

            function S() {
                return new Promise((e => requestAnimationFrame((() => e()))))
            }

            function k(e = "") {
                return (new DOMParser).parseFromString(e, "text/html")
            }

            function x(e, ...t) {
                const n = function (e, t) {
                    return e.reduce(((e, n, r) => e + n + (null == t[r] ? "" : t[r])), "")
                }(e, t).replace(/^\n/, "").split("\n"), r = n[0].match(/^\s+/), o = r ? r[0].length : 0;
                return n.map((e => e.slice(o))).join("\n")
            }

            function E() {
                return Array.from({length: 36}).map(((e, t) => 8 == t || 13 == t || 18 == t || 23 == t ? "-" : 14 == t ? "4" : 19 == t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16))).join("")
            }

            function _(e, ...t) {
                for (const n of t.map((t => null == t ? void 0 : t.getAttribute(e)))) if ("string" == typeof n) return n;
                return null
            }

            function C(...e) {
                for (const t of e) "turbo-frame" == t.localName && t.setAttribute("busy", ""), t.setAttribute("aria-busy", "true")
            }

            function T(...e) {
                for (const t of e) "turbo-frame" == t.localName && t.removeAttribute("busy"), t.removeAttribute("aria-busy")
            }

            function L(e, t = 2e3) {
                return new Promise((n => {
                    const r = () => {
                        e.removeEventListener("error", r), e.removeEventListener("load", r), n()
                    };
                    e.addEventListener("load", r, {once: !0}), e.addEventListener("error", r, {once: !0}), setTimeout(n, t)
                }))
            }

            function A(e) {
                switch (e) {
                    case"replace":
                        return history.replaceState;
                    case"advance":
                    case"restore":
                        return history.pushState
                }
            }

            function R(...e) {
                const t = _("data-turbo-action", ...e);
                return function (e) {
                    return "advance" == e || "replace" == e || "restore" == e
                }(t) ? t : null
            }

            function D(e) {
                return document.querySelector(`meta[name="${e}"]`)
            }

            function O(e) {
                const t = D(e);
                return t && t.content
            }

            function M(e, t) {
                var n;
                if (e instanceof Element) return e.closest(t) || M(e.assignedSlot || (null === (n = e.getRootNode()) || void 0 === n ? void 0 : n.host), t)
            }

            !function (e) {
                e[e.get = 0] = "get", e[e.post = 1] = "post", e[e.put = 2] = "put", e[e.patch = 3] = "patch", e[e.delete = 4] = "delete"
            }(s || (s = {}));

            class I {
                constructor(e, t, n, r = new URLSearchParams, o = null) {
                    this.abortController = new AbortController, this.resolveRequestPromise = e => {
                    }, this.delegate = e, this.method = t, this.headers = this.defaultHeaders, this.body = r, this.url = n, this.target = o
                }

                get location() {
                    return this.url
                }

                get params() {
                    return this.url.searchParams
                }

                get entries() {
                    return this.body ? Array.from(this.body.entries()) : []
                }

                cancel() {
                    this.abortController.abort()
                }

                async perform() {
                    const {fetchOptions: e} = this;
                    this.delegate.prepareRequest(this), await this.allowRequestToBeIntercepted(e);
                    try {
                        this.delegate.requestStarted(this);
                        const t = await fetch(this.url.href, e);
                        return await this.receive(t)
                    } catch (e) {
                        if ("AbortError" !== e.name) throw this.willDelegateErrorHandling(e) && this.delegate.requestErrored(this, e), e
                    } finally {
                        this.delegate.requestFinished(this)
                    }
                }

                async receive(e) {
                    const t = new b(e);
                    return w("turbo:before-fetch-response", {
                        cancelable: !0,
                        detail: {fetchResponse: t},
                        target: this.target
                    }).defaultPrevented ? this.delegate.requestPreventedHandlingResponse(this, t) : t.succeeded ? this.delegate.requestSucceededWithResponse(this, t) : this.delegate.requestFailedWithResponse(this, t), t
                }

                get fetchOptions() {
                    var e;
                    return {
                        method: s[this.method].toUpperCase(),
                        credentials: "same-origin",
                        headers: this.headers,
                        redirect: "follow",
                        body: this.isSafe ? null : this.body,
                        signal: this.abortSignal,
                        referrer: null === (e = this.delegate.referrer) || void 0 === e ? void 0 : e.href
                    }
                }

                get defaultHeaders() {
                    return {Accept: "text/html, application/xhtml+xml"}
                }

                get isSafe() {
                    return this.method === s.get
                }

                get abortSignal() {
                    return this.abortController.signal
                }

                acceptResponseType(e) {
                    this.headers.Accept = [e, this.headers.Accept].join(", ")
                }

                async allowRequestToBeIntercepted(e) {
                    const t = new Promise((e => this.resolveRequestPromise = e));
                    w("turbo:before-fetch-request", {
                        cancelable: !0,
                        detail: {fetchOptions: e, url: this.url, resume: this.resolveRequestPromise},
                        target: this.target
                    }).defaultPrevented && await t
                }

                willDelegateErrorHandling(e) {
                    return !w("turbo:fetch-request-error", {target: this.target, cancelable: !0, detail: {request: this, error: e}}).defaultPrevented
                }
            }

            class F {
                constructor(e, t) {
                    this.started = !1, this.intersect = e => {
                        const t = e.slice(-1)[0];
                        (null == t ? void 0 : t.isIntersecting) && this.delegate.elementAppearedInViewport(this.element)
                    }, this.delegate = e, this.element = t, this.intersectionObserver = new IntersectionObserver(this.intersect)
                }

                start() {
                    this.started || (this.started = !0, this.intersectionObserver.observe(this.element))
                }

                stop() {
                    this.started && (this.started = !1, this.intersectionObserver.unobserve(this.element))
                }
            }

            class P {
                static wrap(e) {
                    return "string" == typeof e ? new this(function (e) {
                        const t = document.createElement("template");
                        return t.innerHTML = e, t.content
                    }(e)) : e
                }

                constructor(e) {
                    this.fragment = function (e) {
                        for (const t of e.querySelectorAll("turbo-stream")) {
                            const e = document.importNode(t, !0);
                            for (const t of e.templateElement.content.querySelectorAll("script")) t.replaceWith(y(t));
                            t.replaceWith(e)
                        }
                        return e
                    }(e)
                }
            }

            P.contentType = "text/vnd.turbo-stream.html", function (e) {
                e[e.initialized = 0] = "initialized", e[e.requesting = 1] = "requesting", e[e.waiting = 2] = "waiting", e[e.receiving = 3] = "receiving", e[e.stopping = 4] = "stopping", e[e.stopped = 5] = "stopped"
            }(a || (a = {})), function (e) {
                e.urlEncoded = "application/x-www-form-urlencoded", e.multipart = "multipart/form-data", e.plain = "text/plain"
            }(l || (l = {}));

            class H {
                static confirmMethod(e, t, n) {
                    return Promise.resolve(confirm(e))
                }

                constructor(e, t, n, r = !1) {
                    this.state = a.initialized, this.delegate = e, this.formElement = t, this.submitter = n, this.formData = function (e, t) {
                        const n = new FormData(e), r = null == t ? void 0 : t.getAttribute("name"), o = null == t ? void 0 : t.getAttribute("value");
                        return r && n.append(r, o || ""), n
                    }(t, n), this.location = h(this.action), this.method == s.get && function (e, t) {
                        const n = new URLSearchParams;
                        for (const [e, r] of t) r instanceof File || n.append(e, r);
                        e.search = n.toString()
                    }(this.location, [...this.body.entries()]), this.fetchRequest = new I(this, this.method, this.location, this.body, this.formElement), this.mustRedirect = r
                }

                get method() {
                    var e;
                    return function (e) {
                        switch (e.toLowerCase()) {
                            case"get":
                                return s.get;
                            case"post":
                                return s.post;
                            case"put":
                                return s.put;
                            case"patch":
                                return s.patch;
                            case"delete":
                                return s.delete
                        }
                    }(((null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("formmethod")) || this.formElement.getAttribute("method") || "").toLowerCase()) || s.get
                }

                get action() {
                    var e;
                    const t = "string" == typeof this.formElement.action ? this.formElement.action : null;
                    return (null === (e = this.submitter) || void 0 === e ? void 0 : e.hasAttribute("formaction")) ? this.submitter.getAttribute("formaction") || "" : this.formElement.getAttribute("action") || t || ""
                }

                get body() {
                    return this.enctype == l.urlEncoded || this.method == s.get ? new URLSearchParams(this.stringFormData) : this.formData
                }

                get enctype() {
                    var e;
                    return function (e) {
                        switch (e.toLowerCase()) {
                            case l.multipart:
                                return l.multipart;
                            case l.plain:
                                return l.plain;
                            default:
                                return l.urlEncoded
                        }
                    }((null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("formenctype")) || this.formElement.enctype)
                }

                get isSafe() {
                    return this.fetchRequest.isSafe
                }

                get stringFormData() {
                    return [...this.formData].reduce(((e, [t, n]) => e.concat("string" == typeof n ? [[t, n]] : [])), [])
                }

                async start() {
                    const {initialized: e, requesting: t} = a, n = _("data-turbo-confirm", this.submitter, this.formElement);
                    if ("string" != typeof n || await H.confirmMethod(n, this.formElement, this.submitter)) return this.state == e ? (this.state = t, this.fetchRequest.perform()) : void 0
                }

                stop() {
                    const {stopping: e, stopped: t} = a;
                    if (this.state != e && this.state != t) return this.state = e, this.fetchRequest.cancel(), !0
                }

                prepareRequest(e) {
                    if (!e.isSafe) {
                        const t = function (e) {
                            if (null != e) {
                                const t = (document.cookie ? document.cookie.split("; ") : []).find((t => t.startsWith(e)));
                                if (t) {
                                    const e = t.split("=").slice(1).join("=");
                                    return e ? decodeURIComponent(e) : void 0
                                }
                            }
                        }(O("csrf-param")) || O("csrf-token");
                        t && (e.headers["X-CSRF-Token"] = t)
                    }
                    this.requestAcceptsTurboStreamResponse(e) && e.acceptResponseType(P.contentType)
                }

                requestStarted(e) {
                    var t;
                    this.state = a.waiting, null === (t = this.submitter) || void 0 === t || t.setAttribute("disabled", ""), this.setSubmitsWith(), w("turbo:submit-start", {
                        target: this.formElement,
                        detail: {formSubmission: this}
                    }), this.delegate.formSubmissionStarted(this)
                }

                requestPreventedHandlingResponse(e, t) {
                    this.result = {success: t.succeeded, fetchResponse: t}
                }

                requestSucceededWithResponse(e, t) {
                    if (t.clientError || t.serverError) this.delegate.formSubmissionFailedWithResponse(this, t); else if (this.requestMustRedirect(e) && function (e) {
                        return 200 == e.statusCode && !e.redirected
                    }(t)) {
                        const e = new Error("Form responses must redirect to another location");
                        this.delegate.formSubmissionErrored(this, e)
                    } else this.state = a.receiving, this.result = {success: !0, fetchResponse: t}, this.delegate.formSubmissionSucceededWithResponse(this, t)
                }

                requestFailedWithResponse(e, t) {
                    this.result = {success: !1, fetchResponse: t}, this.delegate.formSubmissionFailedWithResponse(this, t)
                }

                requestErrored(e, t) {
                    this.result = {success: !1, error: t}, this.delegate.formSubmissionErrored(this, t)
                }

                requestFinished(e) {
                    var t;
                    this.state = a.stopped, null === (t = this.submitter) || void 0 === t || t.removeAttribute("disabled"), this.resetSubmitterText(), w("turbo:submit-end", {
                        target: this.formElement,
                        detail: Object.assign({formSubmission: this}, this.result)
                    }), this.delegate.formSubmissionFinished(this)
                }

                setSubmitsWith() {
                    if (this.submitter && this.submitsWith) if (this.submitter.matches("button")) this.originalSubmitText = this.submitter.innerHTML, this.submitter.innerHTML = this.submitsWith; else if (this.submitter.matches("input")) {
                        const e = this.submitter;
                        this.originalSubmitText = e.value, e.value = this.submitsWith
                    }
                }

                resetSubmitterText() {
                    this.submitter && this.originalSubmitText && (this.submitter.matches("button") ? this.submitter.innerHTML = this.originalSubmitText : this.submitter.matches("input") && (this.submitter.value = this.originalSubmitText))
                }

                requestMustRedirect(e) {
                    return !e.isSafe && this.mustRedirect
                }

                requestAcceptsTurboStreamResponse(e) {
                    return !e.isSafe || function (e, ...t) {
                        return t.some((t => t && t.hasAttribute(e)))
                    }("data-turbo-stream", this.submitter, this.formElement)
                }

                get submitsWith() {
                    var e;
                    return null === (e = this.submitter) || void 0 === e ? void 0 : e.getAttribute("data-turbo-submits-with")
                }
            }

            class N {
                constructor(e) {
                    this.element = e
                }

                get activeElement() {
                    return this.element.ownerDocument.activeElement
                }

                get children() {
                    return [...this.element.children]
                }

                hasAnchor(e) {
                    return null != this.getElementForAnchor(e)
                }

                getElementForAnchor(e) {
                    return e ? this.element.querySelector(`[id='${e}'], a[name='${e}']`) : null
                }

                get isConnected() {
                    return this.element.isConnected
                }

                get firstAutofocusableElement() {
                    for (const e of this.element.querySelectorAll("[autofocus]")) if (null == e.closest("[inert], :disabled, [hidden], details:not([open]), dialog:not([open])")) return e;
                    return null
                }

                get permanentElements() {
                    return B(this.element)
                }

                getPermanentElementById(e) {
                    return W(this.element, e)
                }

                getPermanentElementMapForSnapshot(e) {
                    const t = {};
                    for (const n of this.permanentElements) {
                        const {id: r} = n, o = e.getPermanentElementById(r);
                        o && (t[r] = [n, o])
                    }
                    return t
                }
            }

            function W(e, t) {
                return e.querySelector(`#${t}[data-turbo-permanent]`)
            }

            function B(e) {
                return e.querySelectorAll("[id][data-turbo-permanent]")
            }

            class V {
                constructor(e, t) {
                    this.started = !1, this.submitCaptured = () => {
                        this.eventTarget.removeEventListener("submit", this.submitBubbled, !1), this.eventTarget.addEventListener("submit", this.submitBubbled, !1)
                    }, this.submitBubbled = e => {
                        if (!e.defaultPrevented) {
                            const t = e.target instanceof HTMLFormElement ? e.target : void 0, n = e.submitter || void 0;
                            t && function (e, t) {
                                return "dialog" != ((null == t ? void 0 : t.getAttribute("formmethod")) || e.getAttribute("method"))
                            }(t, n) && function (e, t) {
                                if ((null == t ? void 0 : t.hasAttribute("formtarget")) || e.hasAttribute("target")) {
                                    const n = (null == t ? void 0 : t.getAttribute("formtarget")) || e.target;
                                    for (const e of document.getElementsByName(n)) if (e instanceof HTMLIFrameElement) return !1;
                                    return !0
                                }
                                return !0
                            }(t, n) && this.delegate.willSubmitForm(t, n) && (e.preventDefault(), e.stopImmediatePropagation(), this.delegate.formSubmitted(t, n))
                        }
                    }, this.delegate = e, this.eventTarget = t
                }

                start() {
                    this.started || (this.eventTarget.addEventListener("submit", this.submitCaptured, !0), this.started = !0)
                }

                stop() {
                    this.started && (this.eventTarget.removeEventListener("submit", this.submitCaptured, !0), this.started = !1)
                }
            }

            class j {
                constructor(e, t) {
                    this.resolveRenderPromise = e => {
                    }, this.resolveInterceptionPromise = e => {
                    }, this.delegate = e, this.element = t
                }

                scrollToAnchor(e) {
                    const t = this.snapshot.getElementForAnchor(e);
                    t ? (this.scrollToElement(t), this.focusElement(t)) : this.scrollToPosition({x: 0, y: 0})
                }

                scrollToAnchorFromLocation(e) {
                    this.scrollToAnchor(p(e))
                }

                scrollToElement(e) {
                    e.scrollIntoView()
                }

                focusElement(e) {
                    e instanceof HTMLElement && (e.hasAttribute("tabindex") ? e.focus() : (e.setAttribute("tabindex", "-1"), e.focus(), e.removeAttribute("tabindex")))
                }

                scrollToPosition({x: e, y: t}) {
                    this.scrollRoot.scrollTo(e, t)
                }

                scrollToTop() {
                    this.scrollToPosition({x: 0, y: 0})
                }

                get scrollRoot() {
                    return window
                }

                async render(e) {
                    const {isPreview: t, shouldRender: n, newSnapshot: r} = e;
                    if (n) try {
                        this.renderPromise = new Promise((e => this.resolveRenderPromise = e)), this.renderer = e, await this.prepareToRenderSnapshot(e);
                        const n = new Promise((e => this.resolveInterceptionPromise = e)), o = {resume: this.resolveInterceptionPromise, render: this.renderer.renderElement};
                        this.delegate.allowsImmediateRender(r, o) || await n, await this.renderSnapshot(e), this.delegate.viewRenderedSnapshot(r, t), this.delegate.preloadOnLoadLinksForView(this.element), this.finishRenderingSnapshot(e)
                    } finally {
                        delete this.renderer, this.resolveRenderPromise(void 0), delete this.renderPromise
                    } else this.invalidate(e.reloadReason)
                }

                invalidate(e) {
                    this.delegate.viewInvalidated(e)
                }

                async prepareToRenderSnapshot(e) {
                    this.markAsPreview(e.isPreview), await e.prepareToRender()
                }

                markAsPreview(e) {
                    e ? this.element.setAttribute("data-turbo-preview", "") : this.element.removeAttribute("data-turbo-preview")
                }

                async renderSnapshot(e) {
                    await e.render()
                }

                finishRenderingSnapshot(e) {
                    e.finishRendering()
                }
            }

            class z extends j {
                missing() {
                    this.element.innerHTML = '<strong class="turbo-frame-error">Content missing</strong>'
                }

                get snapshot() {
                    return new N(this.element)
                }
            }

            class q {
                constructor(e, t) {
                    this.clickBubbled = e => {
                        this.respondsToEventTarget(e.target) ? this.clickEvent = e : delete this.clickEvent
                    }, this.linkClicked = e => {
                        this.clickEvent && this.respondsToEventTarget(e.target) && e.target instanceof Element && this.delegate.shouldInterceptLinkClick(e.target, e.detail.url, e.detail.originalEvent) && (this.clickEvent.preventDefault(), e.preventDefault(), this.delegate.linkClickIntercepted(e.target, e.detail.url, e.detail.originalEvent)), delete this.clickEvent
                    }, this.willVisit = e => {
                        delete this.clickEvent
                    }, this.delegate = e, this.element = t
                }

                start() {
                    this.element.addEventListener("click", this.clickBubbled), document.addEventListener("turbo:click", this.linkClicked), document.addEventListener("turbo:before-visit", this.willVisit)
                }

                stop() {
                    this.element.removeEventListener("click", this.clickBubbled), document.removeEventListener("turbo:click", this.linkClicked), document.removeEventListener("turbo:before-visit", this.willVisit)
                }

                respondsToEventTarget(e) {
                    const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
                    return t && t.closest("turbo-frame, html") == this.element
                }
            }

            class ${constructor(e,t){this.started=!1,this.clickCaptured=()=>{this.eventTarget.removeEventListener("click",this.clickBubbled,!1),this.eventTarget.addEventListener("click",this.clickBubbled,!1)}
        ,
            this.clickBubbled = e => {
                if (e instanceof MouseEvent && this.clickEventIsSignificant(e)) {
                    const t = e.composedPath && e.composedPath()[0] || e.target, n = this.findLinkFromClickTarget(t);
                    if (n && function (e) {
                        if (e.hasAttribute("target")) {
                            for (const t of document.getElementsByName(e.target)) if (t instanceof HTMLIFrameElement) return !1;
                            return !0
                        }
                        return !0
                    }(n)) {
                        const t = this.getLocationForLink(n);
                        this.delegate.willFollowLinkToLocation(n, t, e) && (e.preventDefault(), this.delegate.followedLinkToLocation(n, t))
                    }
                }
            }, this.delegate = e, this.eventTarget = t
        }start() {
            this.started || (this.eventTarget.addEventListener("click", this.clickCaptured, !0), this.started = !0)
        }stop() {
            this.started && (this.eventTarget.removeEventListener("click", this.clickCaptured, !0), this.started = !1)
        }clickEventIsSignificant(e) {
            return !(e.target && e.target.isContentEditable || e.defaultPrevented || e.which > 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
        }findLinkFromClickTarget(e) {
            return M(e, "a[href]:not([target^=_]):not([download])")
        }getLocationForLink(e) {
            return h(e.getAttribute("href") || "")
        }
    }

    class Z {
        constructor(e, t) {
            this.delegate = e, this.linkInterceptor = new $(this, t)
        }

        start() {
            this.linkInterceptor.start()
        }

        stop() {
            this.linkInterceptor.stop()
        }

        willFollowLinkToLocation(e, t, n) {
            return this.delegate.willSubmitFormLinkToLocation(e, t, n) && e.hasAttribute("data-turbo-method")
        }

        followedLinkToLocation(e, t) {
            const n = document.createElement("form");
            for (const [e, r] of t.searchParams) n.append(Object.assign(document.createElement("input"), {type: "hidden", name: e, value: r}));
            const r = Object.assign(t, {search: ""});
            n.setAttribute("data-turbo", "true"), n.setAttribute("action", r.href), n.setAttribute("hidden", "");
            const o = e.getAttribute("data-turbo-method");
            o && n.setAttribute("method", o);
            const i = e.getAttribute("data-turbo-frame");
            i && n.setAttribute("data-turbo-frame", i);
            const s = R(e);
            s && n.setAttribute("data-turbo-action", s);
            const a = e.getAttribute("data-turbo-confirm");
            a && n.setAttribute("data-turbo-confirm", a), e.hasAttribute("data-turbo-stream") && n.setAttribute("data-turbo-stream", ""), this.delegate.submittedFormLinkToLocation(e, t, n), document.body.appendChild(n), n.addEventListener("turbo:submit-end", (() => n.remove()), {once: !0}), requestAnimationFrame((() => n.requestSubmit()))
        }
    }

    class U {
        static async preservingPermanentElements(e, t, n) {
            const r = new this(e, t);
            r.enter(), await n(), r.leave()
        }

        constructor(e, t) {
            this.delegate = e, this.permanentElementMap = t
        }

        enter() {
            for (const e in this.permanentElementMap) {
                const [t, n] = this.permanentElementMap[e];
                this.delegate.enteringBardo(t, n), this.replaceNewPermanentElementWithPlaceholder(n)
            }
        }

        leave() {
            for (const e in this.permanentElementMap) {
                const [t] = this.permanentElementMap[e];
                this.replaceCurrentPermanentElementWithClone(t), this.replacePlaceholderWithPermanentElement(t), this.delegate.leavingBardo(t)
            }
        }

        replaceNewPermanentElementWithPlaceholder(e) {
            const t = function (e) {
                const t = document.createElement("meta");
                return t.setAttribute("name", "turbo-permanent-placeholder"), t.setAttribute("content", e.id), t
            }(e);
            e.replaceWith(t)
        }

        replaceCurrentPermanentElementWithClone(e) {
            const t = e.cloneNode(!0);
            e.replaceWith(t)
        }

        replacePlaceholderWithPermanentElement(e) {
            const t = this.getPlaceholderById(e.id);
            null == t || t.replaceWith(e)
        }

        getPlaceholderById(e) {
            return this.placeholders.find((t => t.content == e))
        }

        get placeholders() {
            return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")]
        }
    }

    class K {
        constructor(e, t, n, r, o = !0) {
            this.activeElement = null, this.currentSnapshot = e, this.newSnapshot = t, this.isPreview = r, this.willRender = o, this.renderElement = n, this.promise = new Promise(((e, t) => this.resolvingFunctions = {
                resolve: e,
                reject: t
            }))
        }

        get shouldRender() {
            return !0
        }

        get reloadReason() {
        }

        prepareToRender() {
        }

        finishRendering() {
            this.resolvingFunctions && (this.resolvingFunctions.resolve(), delete this.resolvingFunctions)
        }

        async preservingPermanentElements(e) {
            await U.preservingPermanentElements(this, this.permanentElementMap, e)
        }

        focusFirstAutofocusableElement() {
            const e = this.connectedSnapshot.firstAutofocusableElement;
            (function (e) {
                return e && "function" == typeof e.focus
            })(e) && e.focus()
        }

        enteringBardo(e) {
            this.activeElement || e.contains(this.currentSnapshot.activeElement) && (this.activeElement = this.currentSnapshot.activeElement)
        }

        leavingBardo(e) {
            e.contains(this.activeElement) && this.activeElement instanceof HTMLElement && (this.activeElement.focus(), this.activeElement = null)
        }

        get connectedSnapshot() {
            return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot
        }

        get currentElement() {
            return this.currentSnapshot.element
        }

        get newElement() {
            return this.newSnapshot.element
        }

        get permanentElementMap() {
            return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot)
        }
    }

    class Y extends K {
        static renderElement(e, t) {
            var n;
            const r = document.createRange();
            r.selectNodeContents(e), r.deleteContents();
            const o = t, i = null === (n = o.ownerDocument) || void 0 === n ? void 0 : n.createRange();
            i && (i.selectNodeContents(o), e.appendChild(i.extractContents()))
        }

        constructor(e, t, n, r, o, i = !0) {
            super(t, n, r, o, i), this.delegate = e
        }

        get shouldRender() {
            return !0
        }

        async render() {
            await S(), this.preservingPermanentElements((() => {
                this.loadFrameElement()
            })), this.scrollFrameIntoView(), await S(), this.focusFirstAutofocusableElement(), await S(), this.activateScriptElements()
        }

        loadFrameElement() {
            this.delegate.willRenderFrame(this.currentElement, this.newElement), this.renderElement(this.currentElement, this.newElement)
        }

        scrollFrameIntoView() {
            if (this.currentElement.autoscroll || this.newElement.autoscroll) {
                const t = this.currentElement.firstElementChild,
                    n = ("end", "end" == (e = this.currentElement.getAttribute("data-autoscroll-block")) || "start" == e || "center" == e || "nearest" == e ? e : "end"),
                    r = function (e, t) {
                        return "auto" == e || "smooth" == e ? e : "auto"
                    }(this.currentElement.getAttribute("data-autoscroll-behavior"));
                if (t) return t.scrollIntoView({block: n, behavior: r}), !0
            }
            var e;
            return !1
        }

        activateScriptElements() {
            for (const e of this.newScriptElements) {
                const t = y(e);
                e.replaceWith(t)
            }
        }

        get newScriptElements() {
            return this.currentElement.querySelectorAll("script")
        }
    }

    class G {
        static get defaultCSS() {
            return x`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${G.animationDuration}ms ease-out,
          opacity ${G.animationDuration / 2}ms ${G.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `
        }

        constructor() {
            this.hiding = !1, this.value = 0, this.visible = !1, this.trickle = () => {
                this.setValue(this.value + Math.random() / 100)
            }, this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement(), this.installStylesheetElement(), this.setValue(0)
        }

        show() {
            this.visible || (this.visible = !0, this.installProgressElement(), this.startTrickling())
        }

        hide() {
            this.visible && !this.hiding && (this.hiding = !0, this.fadeProgressElement((() => {
                this.uninstallProgressElement(), this.stopTrickling(), this.visible = !1, this.hiding = !1
            })))
        }

        setValue(e) {
            this.value = e, this.refresh()
        }

        installStylesheetElement() {
            document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
        }

        installProgressElement() {
            this.progressElement.style.width = "0", this.progressElement.style.opacity = "1", document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
        }

        fadeProgressElement(e) {
            this.progressElement.style.opacity = "0", setTimeout(e, 1.5 * G.animationDuration)
        }

        uninstallProgressElement() {
            this.progressElement.parentNode && document.documentElement.removeChild(this.progressElement)
        }

        startTrickling() {
            this.trickleInterval || (this.trickleInterval = window.setInterval(this.trickle, G.animationDuration))
        }

        stopTrickling() {
            window.clearInterval(this.trickleInterval), delete this.trickleInterval
        }

        refresh() {
            requestAnimationFrame((() => {
                this.progressElement.style.width = 10 + 90 * this.value + "%"
            }))
        }

        createStylesheetElement() {
            const e = document.createElement("style");
            return e.type = "text/css", e.textContent = G.defaultCSS, this.cspNonce && (e.nonce = this.cspNonce), e
        }

        createProgressElement() {
            const e = document.createElement("div");
            return e.className = "turbo-progress-bar", e
        }

        get cspNonce() {
            return O("csp-nonce")
        }
    }

    G.animationDuration = 300;

    class X extends N {
        constructor() {
            super(...arguments), this.detailsByOuterHTML = this.children.filter((e => !function (e) {
                return "noscript" == e.localName
            }(e))).map((e => function (e) {
                return e.hasAttribute("nonce") && e.setAttribute("nonce", ""), e
            }(e))).reduce(((e, t) => {
                const {outerHTML: n} = t, r = n in e ? e[n] : {type: J(t), tracked: Q(t), elements: []};
                return Object.assign(Object.assign({}, e), {[n]: Object.assign(Object.assign({}, r), {elements: [...r.elements, t]})})
            }), {})
        }

        get trackedElementSignature() {
            return Object.keys(this.detailsByOuterHTML).filter((e => this.detailsByOuterHTML[e].tracked)).join("")
        }

        getScriptElementsNotInSnapshot(e) {
            return this.getElementsMatchingTypeNotInSnapshot("script", e)
        }

        getStylesheetElementsNotInSnapshot(e) {
            return this.getElementsMatchingTypeNotInSnapshot("stylesheet", e)
        }

        getElementsMatchingTypeNotInSnapshot(e, t) {
            return Object.keys(this.detailsByOuterHTML).filter((e => !(e in t.detailsByOuterHTML))).map((e => this.detailsByOuterHTML[e])).filter((({type: t}) => t == e)).map((({elements: [e]}) => e))
        }

        get provisionalElements() {
            return Object.keys(this.detailsByOuterHTML).reduce(((e, t) => {
                const {type: n, tracked: r, elements: o} = this.detailsByOuterHTML[t];
                return null != n || r ? o.length > 1 ? [...e, ...o.slice(1)] : e : [...e, ...o]
            }), [])
        }

        getMetaValue(e) {
            const t = this.findMetaElementByName(e);
            return t ? t.getAttribute("content") : null
        }

        findMetaElementByName(e) {
            return Object.keys(this.detailsByOuterHTML).reduce(((t, n) => {
                const {elements: [r]} = this.detailsByOuterHTML[n];
                return function (e, t) {
                    return "meta" == e.localName && e.getAttribute("name") == t
                }(r, e) ? r : t
            }), void 0)
        }
    }

    function J(e) {
        return function (e) {
            return "script" == e.localName
        }(e) ? "script" : function (e) {
            const t = e.localName;
            return "style" == t || "link" == t && "stylesheet" == e.getAttribute("rel")
        }(e) ? "stylesheet" : void 0
    }

    function Q(e) {
        return "reload" == e.getAttribute("data-turbo-track")
    }

    class ee extends N {
        static fromHTMLString(e = "") {
            return this.fromDocument(k(e))
        }

        static fromElement(e) {
            return this.fromDocument(e.ownerDocument)
        }

        static fromDocument({head: e, body: t}) {
            return new this(t, new X(e))
        }

        constructor(e, t) {
            super(e), this.headSnapshot = t
        }

        clone() {
            const e = this.element.cloneNode(!0), t = this.element.querySelectorAll("select"), n = e.querySelectorAll("select");
            for (const [e, r] of t.entries()) {
                const t = n[e];
                for (const e of t.selectedOptions) e.selected = !1;
                for (const e of r.selectedOptions) t.options[e.index].selected = !0
            }
            for (const t of e.querySelectorAll('input[type="password"]')) t.value = "";
            return new ee(e, this.headSnapshot)
        }

        get headElement() {
            return this.headSnapshot.element
        }

        get rootLocation() {
            var e;
            return h(null !== (e = this.getSetting("root")) && void 0 !== e ? e : "/")
        }

        get cacheControlValue() {
            return this.getSetting("cache-control")
        }

        get isPreviewable() {
            return "no-preview" != this.cacheControlValue
        }

        get isCacheable() {
            return "no-cache" != this.cacheControlValue
        }

        get isVisitable() {
            return "reload" != this.getSetting("visit-control")
        }

        getSetting(e) {
            return this.headSnapshot.getMetaValue(`turbo-${e}`)
        }
    }

    !function (e) {
        e.visitStart = "visitStart", e.requestStart = "requestStart", e.requestEnd = "requestEnd", e.visitEnd = "visitEnd"
    }(c || (c = {})), function (e) {
        e.initialized = "initialized", e.started = "started", e.canceled = "canceled", e.failed = "failed", e.completed = "completed"
    }(u || (u = {}));
    const te = {
        action: "advance", historyChanged: !1, visitCachedSnapshot: () => {
        }, willRender: !0, updateHistory: !0, shouldCacheSnapshot: !0, acceptsStreamResponse: !1
    };
    var ne, re;
    !function (e) {
        e[e.networkFailure = 0] = "networkFailure", e[e.timeoutFailure = -1] = "timeoutFailure", e[e.contentTypeMismatch = -2] = "contentTypeMismatch"
    }(ne || (ne = {}));

    class oe {
        constructor(e, t, n, r = {}) {
            this.identifier = E(), this.timingMetrics = {}, this.followedRedirect = !1, this.historyChanged = !1, this.scrolled = !1, this.shouldCacheSnapshot = !0, this.acceptsStreamResponse = !1, this.snapshotCached = !1, this.state = u.initialized, this.delegate = e, this.location = t, this.restorationIdentifier = n || E();
            const {
                action: o,
                historyChanged: i,
                referrer: s,
                snapshot: a,
                snapshotHTML: l,
                response: c,
                visitCachedSnapshot: d,
                willRender: h,
                updateHistory: p,
                shouldCacheSnapshot: f,
                acceptsStreamResponse: m
            } = Object.assign(Object.assign({}, te), r);
            this.action = o, this.historyChanged = i, this.referrer = s, this.snapshot = a, this.snapshotHTML = l, this.response = c, this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action), this.visitCachedSnapshot = d, this.willRender = h, this.updateHistory = p, this.scrolled = !h, this.shouldCacheSnapshot = f, this.acceptsStreamResponse = m
        }

        get adapter() {
            return this.delegate.adapter
        }

        get view() {
            return this.delegate.view
        }

        get history() {
            return this.delegate.history
        }

        get restorationData() {
            return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)
        }

        get silent() {
            return this.isSamePage
        }

        start() {
            this.state == u.initialized && (this.recordTimingMetric(c.visitStart), this.state = u.started, this.adapter.visitStarted(this), this.delegate.visitStarted(this))
        }

        cancel() {
            this.state == u.started && (this.request && this.request.cancel(), this.cancelRender(), this.state = u.canceled)
        }

        complete() {
            this.state == u.started && (this.recordTimingMetric(c.visitEnd), this.state = u.completed, this.followRedirect(), this.followedRedirect || (this.adapter.visitCompleted(this), this.delegate.visitCompleted(this)))
        }

        fail() {
            this.state == u.started && (this.state = u.failed, this.adapter.visitFailed(this))
        }

        changeHistory() {
            var e;
            if (!this.historyChanged && this.updateHistory) {
                const t = A(this.location.href === (null === (e = this.referrer) || void 0 === e ? void 0 : e.href) ? "replace" : this.action);
                this.history.update(t, this.location, this.restorationIdentifier), this.historyChanged = !0
            }
        }

        issueRequest() {
            this.hasPreloadedResponse() ? this.simulateRequest() : this.shouldIssueRequest() && !this.request && (this.request = new I(this, s.get, this.location), this.request.perform())
        }

        simulateRequest() {
            this.response && (this.startRequest(), this.recordResponse(), this.finishRequest())
        }

        startRequest() {
            this.recordTimingMetric(c.requestStart), this.adapter.visitRequestStarted(this)
        }

        recordResponse(e = this.response) {
            if (this.response = e, e) {
                const {statusCode: t} = e;
                ie(t) ? this.adapter.visitRequestCompleted(this) : this.adapter.visitRequestFailedWithStatusCode(this, t)
            }
        }

        finishRequest() {
            this.recordTimingMetric(c.requestEnd), this.adapter.visitRequestFinished(this)
        }

        loadResponse() {
            if (this.response) {
                const {statusCode: e, responseHTML: t} = this.response;
                this.render((async () => {
                    this.shouldCacheSnapshot && this.cacheSnapshot(), this.view.renderPromise && await this.view.renderPromise, ie(e) && null != t ? (await this.view.renderPage(ee.fromHTMLString(t), !1, this.willRender, this), this.performScroll(), this.adapter.visitRendered(this), this.complete()) : (await this.view.renderError(ee.fromHTMLString(t), this), this.adapter.visitRendered(this), this.fail())
                }))
            }
        }

        getCachedSnapshot() {
            const e = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
            if (e && (!p(this.location) || e.hasAnchor(p(this.location))) && ("restore" == this.action || e.isPreviewable)) return e
        }

        getPreloadedSnapshot() {
            if (this.snapshotHTML) return ee.fromHTMLString(this.snapshotHTML)
        }

        hasCachedSnapshot() {
            return null != this.getCachedSnapshot()
        }

        loadCachedSnapshot() {
            const e = this.getCachedSnapshot();
            if (e) {
                const t = this.shouldIssueRequest();
                this.render((async () => {
                    this.cacheSnapshot(), this.isSamePage ? this.adapter.visitRendered(this) : (this.view.renderPromise && await this.view.renderPromise, await this.view.renderPage(e, t, this.willRender, this), this.performScroll(), this.adapter.visitRendered(this), t || this.complete())
                }))
            }
        }

        followRedirect() {
            var e;
            this.redirectedToLocation && !this.followedRedirect && (null === (e = this.response) || void 0 === e ? void 0 : e.redirected) && (this.adapter.visitProposedToLocation(this.redirectedToLocation, {
                action: "replace",
                response: this.response,
                shouldCacheSnapshot: !1,
                willRender: !1
            }), this.followedRedirect = !0)
        }

        goToSamePageAnchor() {
            this.isSamePage && this.render((async () => {
                this.cacheSnapshot(), this.performScroll(), this.changeHistory(), this.adapter.visitRendered(this)
            }))
        }

        prepareRequest(e) {
            this.acceptsStreamResponse && e.acceptResponseType(P.contentType)
        }

        requestStarted() {
            this.startRequest()
        }

        requestPreventedHandlingResponse(e, t) {
        }

        async requestSucceededWithResponse(e, t) {
            const n = await t.responseHTML, {redirected: r, statusCode: o} = t;
            null == n ? this.recordResponse({
                statusCode: ne.contentTypeMismatch,
                redirected: r
            }) : (this.redirectedToLocation = t.redirected ? t.location : void 0, this.recordResponse({statusCode: o, responseHTML: n, redirected: r}))
        }

        async requestFailedWithResponse(e, t) {
            const n = await t.responseHTML, {redirected: r, statusCode: o} = t;
            null == n ? this.recordResponse({statusCode: ne.contentTypeMismatch, redirected: r}) : this.recordResponse({statusCode: o, responseHTML: n, redirected: r})
        }

        requestErrored(e, t) {
            this.recordResponse({statusCode: ne.networkFailure, redirected: !1})
        }

        requestFinished() {
            this.finishRequest()
        }

        performScroll() {
            this.scrolled || this.view.forceReloaded || ("restore" == this.action ? this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop() : this.scrollToAnchor() || this.view.scrollToTop(), this.isSamePage && this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location), this.scrolled = !0)
        }

        scrollToRestoredPosition() {
            const {scrollPosition: e} = this.restorationData;
            if (e) return this.view.scrollToPosition(e), !0
        }

        scrollToAnchor() {
            const e = p(this.location);
            if (null != e) return this.view.scrollToAnchor(e), !0
        }

        recordTimingMetric(e) {
            this.timingMetrics[e] = (new Date).getTime()
        }

        getTimingMetrics() {
            return Object.assign({}, this.timingMetrics)
        }

        getHistoryMethodForAction(e) {
            switch (e) {
                case"replace":
                    return history.replaceState;
                case"advance":
                case"restore":
                    return history.pushState
            }
        }

        hasPreloadedResponse() {
            return "object" == typeof this.response
        }

        shouldIssueRequest() {
            return !this.isSamePage && ("restore" == this.action ? !this.hasCachedSnapshot() : this.willRender)
        }

        cacheSnapshot() {
            this.snapshotCached || (this.view.cacheSnapshot(this.snapshot).then((e => e && this.visitCachedSnapshot(e))), this.snapshotCached = !0)
        }

        async render(e) {
            this.cancelRender(), await new Promise((e => {
                this.frame = requestAnimationFrame((() => e()))
            })), await e(), delete this.frame
        }

        cancelRender() {
            this.frame && (cancelAnimationFrame(this.frame), delete this.frame)
        }
    }

    function ie(e) {
        return e >= 200 && e < 300
    }

    class se {
        constructor(e) {
            this.progressBar = new G, this.showProgressBar = () => {
                this.progressBar.show()
            }, this.session = e
        }

        visitProposedToLocation(e, t) {
            this.navigator.startVisit(e, (null == t ? void 0 : t.restorationIdentifier) || E(), t)
        }

        visitStarted(e) {
            this.location = e.location, e.loadCachedSnapshot(), e.issueRequest(), e.goToSamePageAnchor()
        }

        visitRequestStarted(e) {
            this.progressBar.setValue(0), e.hasCachedSnapshot() || "restore" != e.action ? this.showVisitProgressBarAfterDelay() : this.showProgressBar()
        }

        visitRequestCompleted(e) {
            e.loadResponse()
        }

        visitRequestFailedWithStatusCode(e, t) {
            switch (t) {
                case ne.networkFailure:
                case ne.timeoutFailure:
                case ne.contentTypeMismatch:
                    return this.reload({reason: "request_failed", context: {statusCode: t}});
                default:
                    return e.loadResponse()
            }
        }

        visitRequestFinished(e) {
            this.progressBar.setValue(1), this.hideVisitProgressBar()
        }

        visitCompleted(e) {
        }

        pageInvalidated(e) {
            this.reload(e)
        }

        visitFailed(e) {
        }

        visitRendered(e) {
        }

        formSubmissionStarted(e) {
            this.progressBar.setValue(0), this.showFormProgressBarAfterDelay()
        }

        formSubmissionFinished(e) {
            this.progressBar.setValue(1), this.hideFormProgressBar()
        }

        showVisitProgressBarAfterDelay() {
            this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay)
        }

        hideVisitProgressBar() {
            this.progressBar.hide(), null != this.visitProgressBarTimeout && (window.clearTimeout(this.visitProgressBarTimeout), delete this.visitProgressBarTimeout)
        }

        showFormProgressBarAfterDelay() {
            null == this.formProgressBarTimeout && (this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay))
        }

        hideFormProgressBar() {
            this.progressBar.hide(), null != this.formProgressBarTimeout && (window.clearTimeout(this.formProgressBarTimeout), delete this.formProgressBarTimeout)
        }

        reload(e) {
            var t;
            w("turbo:reload", {detail: e}), window.location.href = (null === (t = this.location) || void 0 === t ? void 0 : t.toString()) || window.location.href
        }

        get navigator() {
            return this.session.navigator
        }
    }

    class ae {
        constructor() {
            this.selector = "[data-turbo-temporary]", this.deprecatedSelector = "[data-turbo-cache=false]", this.started = !1, this.removeTemporaryElements = e => {
                for (const e of this.temporaryElements) e.remove()
            }
        }

        start() {
            this.started || (this.started = !0, addEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
        }

        stop() {
            this.started && (this.started = !1, removeEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
        }

        get temporaryElements() {
            return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation]
        }

        get temporaryElementsWithDeprecation() {
            const e = document.querySelectorAll(this.deprecatedSelector);
            return e.length && console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`), [...e]
        }
    }

    class le {
        constructor(e, t) {
            this.session = e, this.element = t, this.linkInterceptor = new q(this, t), this.formSubmitObserver = new V(this, t)
        }

        start() {
            this.linkInterceptor.start(), this.formSubmitObserver.start()
        }

        stop() {
            this.linkInterceptor.stop(), this.formSubmitObserver.stop()
        }

        shouldInterceptLinkClick(e, t, n) {
            return this.shouldRedirect(e)
        }

        linkClickIntercepted(e, t, n) {
            const r = this.findFrameElement(e);
            r && r.delegate.linkClickIntercepted(e, t, n)
        }

        willSubmitForm(e, t) {
            return null == e.closest("turbo-frame") && this.shouldSubmit(e, t) && this.shouldRedirect(e, t)
        }

        formSubmitted(e, t) {
            const n = this.findFrameElement(e, t);
            n && n.delegate.formSubmitted(e, t)
        }

        shouldSubmit(e, t) {
            var n;
            const r = f(e, t), o = this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),
                i = h(null !== (n = null == o ? void 0 : o.content) && void 0 !== n ? n : "/");
            return this.shouldRedirect(e, t) && m(r, i)
        }

        shouldRedirect(e, t) {
            if (e instanceof HTMLFormElement ? this.session.submissionIsNavigatable(e, t) : this.session.elementIsNavigatable(e)) {
                const n = this.findFrameElement(e, t);
                return !!n && n != e.closest("turbo-frame")
            }
            return !1
        }

        findFrameElement(e, t) {
            const n = (null == t ? void 0 : t.getAttribute("data-turbo-frame")) || e.getAttribute("data-turbo-frame");
            if (n && "_top" != n) {
                const e = this.element.querySelector(`#${n}:not([disabled])`);
                if (e instanceof d) return e
            }
        }
    }

    class ce {
        constructor(e) {
            this.restorationIdentifier = E(), this.restorationData = {}, this.started = !1, this.pageLoaded = !1, this.onPopState = e => {
                if (this.shouldHandlePopState()) {
                    const {turbo: t} = e.state || {};
                    if (t) {
                        this.location = new URL(window.location.href);
                        const {restorationIdentifier: e} = t;
                        this.restorationIdentifier = e, this.delegate.historyPoppedToLocationWithRestorationIdentifier(this.location, e)
                    }
                }
            }, this.onPageLoad = async e => {
                await Promise.resolve(), this.pageLoaded = !0
            }, this.delegate = e
        }

        start() {
            this.started || (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0, this.replace(new URL(window.location.href)))
        }

        stop() {
            this.started && (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1)
        }

        push(e, t) {
            this.update(history.pushState, e, t)
        }

        replace(e, t) {
            this.update(history.replaceState, e, t)
        }

        update(e, t, n = E()) {
            const r = {turbo: {restorationIdentifier: n}};
            e.call(history, r, "", t.href), this.location = t, this.restorationIdentifier = n
        }

        getRestorationDataForIdentifier(e) {
            return this.restorationData[e] || {}
        }

        updateRestorationData(e) {
            const {restorationIdentifier: t} = this, n = this.restorationData[t];
            this.restorationData[t] = Object.assign(Object.assign({}, n), e)
        }

        assumeControlOfScrollRestoration() {
            var e;
            this.previousScrollRestoration || (this.previousScrollRestoration = null !== (e = history.scrollRestoration) && void 0 !== e ? e : "auto", history.scrollRestoration = "manual")
        }

        relinquishControlOfScrollRestoration() {
            this.previousScrollRestoration && (history.scrollRestoration = this.previousScrollRestoration, delete this.previousScrollRestoration)
        }

        shouldHandlePopState() {
            return this.pageIsLoaded()
        }

        pageIsLoaded() {
            return this.pageLoaded || "complete" == document.readyState
        }
    }

    class ue {
        constructor(e) {
            this.delegate = e
        }

        proposeVisit(e, t = {}) {
            this.delegate.allowsVisitingLocationWithAction(e, t.action) && (m(e, this.view.snapshot.rootLocation) ? this.delegate.visitProposedToLocation(e, t) : window.location.href = e.toString())
        }

        startVisit(e, t, n = {}) {
            this.stop(), this.currentVisit = new oe(this, h(e), t, Object.assign({referrer: this.location}, n)), this.currentVisit.start()
        }

        submitForm(e, t) {
            this.stop(), this.formSubmission = new H(this, e, t, !0), this.formSubmission.start()
        }

        stop() {
            this.formSubmission && (this.formSubmission.stop(), delete this.formSubmission), this.currentVisit && (this.currentVisit.cancel(), delete this.currentVisit)
        }

        get adapter() {
            return this.delegate.adapter
        }

        get view() {
            return this.delegate.view
        }

        get history() {
            return this.delegate.history
        }

        formSubmissionStarted(e) {
            "function" == typeof this.adapter.formSubmissionStarted && this.adapter.formSubmissionStarted(e)
        }

        async formSubmissionSucceededWithResponse(e, t) {
            if (e == this.formSubmission) {
                const n = await t.responseHTML;
                if (n) {
                    const r = e.isSafe;
                    r || this.view.clearSnapshotCache();
                    const {statusCode: o, redirected: i} = t,
                        s = {action: this.getActionForFormSubmission(e), shouldCacheSnapshot: r, response: {statusCode: o, responseHTML: n, redirected: i}};
                    this.proposeVisit(t.location, s)
                }
            }
        }

        async formSubmissionFailedWithResponse(e, t) {
            const n = await t.responseHTML;
            if (n) {
                const e = ee.fromHTMLString(n);
                t.serverError ? await this.view.renderError(e, this.currentVisit) : await this.view.renderPage(e, !1, !0, this.currentVisit), this.view.scrollToTop(), this.view.clearSnapshotCache()
            }
        }

        formSubmissionErrored(e, t) {
            console.error(t)
        }

        formSubmissionFinished(e) {
            "function" == typeof this.adapter.formSubmissionFinished && this.adapter.formSubmissionFinished(e)
        }

        visitStarted(e) {
            this.delegate.visitStarted(e)
        }

        visitCompleted(e) {
            this.delegate.visitCompleted(e)
        }

        locationWithActionIsSamePage(e, t) {
            const n = p(e), r = p(this.view.lastRenderedLocation), o = "restore" === t && void 0 === n;
            return "replace" !== t && v(e) === v(this.view.lastRenderedLocation) && (o || null != n && n !== r)
        }

        visitScrolledToSamePageLocation(e, t) {
            this.delegate.visitScrolledToSamePageLocation(e, t)
        }

        get location() {
            return this.history.location
        }

        get restorationIdentifier() {
            return this.history.restorationIdentifier
        }

        getActionForFormSubmission({submitter: e, formElement: t}) {
            return R(e, t) || "advance"
        }
    }

    !function (e) {
        e[e.initial = 0] = "initial", e[e.loading = 1] = "loading", e[e.interactive = 2] = "interactive", e[e.complete = 3] = "complete"
    }(re || (re = {}));

    class de {
        constructor(e) {
            this.stage = re.initial, this.started = !1, this.interpretReadyState = () => {
                const {readyState: e} = this;
                "interactive" == e ? this.pageIsInteractive() : "complete" == e && this.pageIsComplete()
            }, this.pageWillUnload = () => {
                this.delegate.pageWillUnload()
            }, this.delegate = e
        }

        start() {
            this.started || (this.stage == re.initial && (this.stage = re.loading), document.addEventListener("readystatechange", this.interpretReadyState, !1), addEventListener("pagehide", this.pageWillUnload, !1), this.started = !0)
        }

        stop() {
            this.started && (document.removeEventListener("readystatechange", this.interpretReadyState, !1), removeEventListener("pagehide", this.pageWillUnload, !1), this.started = !1)
        }

        pageIsInteractive() {
            this.stage == re.loading && (this.stage = re.interactive, this.delegate.pageBecameInteractive())
        }

        pageIsComplete() {
            this.pageIsInteractive(), this.stage == re.interactive && (this.stage = re.complete, this.delegate.pageLoaded())
        }

        get readyState() {
            return document.readyState
        }
    }

    class he {
        constructor(e) {
            this.started = !1, this.onScroll = () => {
                this.updatePosition({x: window.pageXOffset, y: window.pageYOffset})
            }, this.delegate = e
        }

        start() {
            this.started || (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
        }

        stop() {
            this.started && (removeEventListener("scroll", this.onScroll, !1), this.started = !1)
        }

        updatePosition(e) {
            this.delegate.scrollPositionChanged(e)
        }
    }

    class pe {
        render({fragment: e}) {
            U.preservingPermanentElements(this, function (e) {
                const t = B(document.documentElement), n = {};
                for (const r of t) {
                    const {id: t} = r;
                    for (const o of e.querySelectorAll("turbo-stream")) {
                        const e = W(o.templateElement.content, t);
                        e && (n[t] = [r, e])
                    }
                }
                return n
            }(e), (() => document.documentElement.appendChild(e)))
        }

        enteringBardo(e, t) {
            t.replaceWith(e.cloneNode(!0))
        }

        leavingBardo() {
        }
    }

    class fe {
        constructor(e) {
            this.sources = new Set, this.started = !1, this.inspectFetchResponse = e => {
                const t = function (e) {
                    var t;
                    const n = null === (t = e.detail) || void 0 === t ? void 0 : t.fetchResponse;
                    if (n instanceof b) return n
                }(e);
                t && function (e) {
                    var t;
                    return (null !== (t = e.contentType) && void 0 !== t ? t : "").startsWith(P.contentType)
                }(t) && (e.preventDefault(), this.receiveMessageResponse(t))
            }, this.receiveMessageEvent = e => {
                this.started && "string" == typeof e.data && this.receiveMessageHTML(e.data)
            }, this.delegate = e
        }

        start() {
            this.started || (this.started = !0, addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
        }

        stop() {
            this.started && (this.started = !1, removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
        }

        connectStreamSource(e) {
            this.streamSourceIsConnected(e) || (this.sources.add(e), e.addEventListener("message", this.receiveMessageEvent, !1))
        }

        disconnectStreamSource(e) {
            this.streamSourceIsConnected(e) && (this.sources.delete(e), e.removeEventListener("message", this.receiveMessageEvent, !1))
        }

        streamSourceIsConnected(e) {
            return this.sources.has(e)
        }

        async receiveMessageResponse(e) {
            const t = await e.responseHTML;
            t && this.receiveMessageHTML(t)
        }

        receiveMessageHTML(e) {
            this.delegate.receivedMessageFromStream(P.wrap(e))
        }
    }

    class me extends K {
        static renderElement(e, t) {
            const {documentElement: n, body: r} = document;
            n.replaceChild(t, r)
        }

        async render() {
            this.replaceHeadAndBody(), this.activateScriptElements()
        }

        replaceHeadAndBody() {
            const {documentElement: e, head: t} = document;
            e.replaceChild(this.newHead, t), this.renderElement(this.currentElement, this.newElement)
        }

        activateScriptElements() {
            for (const e of this.scriptElements) {
                const t = e.parentNode;
                if (t) {
                    const n = y(e);
                    t.replaceChild(n, e)
                }
            }
        }

        get newHead() {
            return this.newSnapshot.headSnapshot.element
        }

        get scriptElements() {
            return document.documentElement.querySelectorAll("script")
        }
    }

    class ve extends K {
        static renderElement(e, t) {
            document.body && t instanceof HTMLBodyElement ? document.body.replaceWith(t) : document.documentElement.appendChild(t)
        }

        get shouldRender() {
            return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical
        }

        get reloadReason() {
            return this.newSnapshot.isVisitable ? this.trackedElementsAreIdentical ? void 0 : {reason: "tracked_element_mismatch"} : {reason: "turbo_visit_control_is_reload"}
        }

        async prepareToRender() {
            await this.mergeHead()
        }

        async render() {
            this.willRender && await this.replaceBody()
        }

        finishRendering() {
            super.finishRendering(), this.isPreview || this.focusFirstAutofocusableElement()
        }

        get currentHeadSnapshot() {
            return this.currentSnapshot.headSnapshot
        }

        get newHeadSnapshot() {
            return this.newSnapshot.headSnapshot
        }

        get newElement() {
            return this.newSnapshot.element
        }

        async mergeHead() {
            const e = this.mergeProvisionalElements(), t = this.copyNewHeadStylesheetElements();
            this.copyNewHeadScriptElements(), await e, await t
        }

        async replaceBody() {
            await this.preservingPermanentElements((async () => {
                this.activateNewBody(), await this.assignNewBody()
            }))
        }

        get trackedElementsAreIdentical() {
            return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature
        }

        async copyNewHeadStylesheetElements() {
            const e = [];
            for (const t of this.newHeadStylesheetElements) e.push(L(t)), document.head.appendChild(t);
            await Promise.all(e)
        }

        copyNewHeadScriptElements() {
            for (const e of this.newHeadScriptElements) document.head.appendChild(y(e))
        }

        async mergeProvisionalElements() {
            const e = [...this.newHeadProvisionalElements];
            for (const t of this.currentHeadProvisionalElements) this.isCurrentElementInElementList(t, e) || document.head.removeChild(t);
            for (const t of e) document.head.appendChild(t)
        }

        isCurrentElementInElementList(e, t) {
            for (const [n, r] of t.entries()) {
                if ("TITLE" == e.tagName) {
                    if ("TITLE" != r.tagName) continue;
                    if (e.innerHTML == r.innerHTML) return t.splice(n, 1), !0
                }
                if (r.isEqualNode(e)) return t.splice(n, 1), !0
            }
            return !1
        }

        removeCurrentHeadProvisionalElements() {
            for (const e of this.currentHeadProvisionalElements) document.head.removeChild(e)
        }

        copyNewHeadProvisionalElements() {
            for (const e of this.newHeadProvisionalElements) document.head.appendChild(e)
        }

        activateNewBody() {
            document.adoptNode(this.newElement), this.activateNewBodyScriptElements()
        }

        activateNewBodyScriptElements() {
            for (const e of this.newBodyScriptElements) {
                const t = y(e);
                e.replaceWith(t)
            }
        }

        async assignNewBody() {
            await this.renderElement(this.currentElement, this.newElement)
        }

        get newHeadStylesheetElements() {
            return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)
        }

        get newHeadScriptElements() {
            return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)
        }

        get currentHeadProvisionalElements() {
            return this.currentHeadSnapshot.provisionalElements
        }

        get newHeadProvisionalElements() {
            return this.newHeadSnapshot.provisionalElements
        }

        get newBodyScriptElements() {
            return this.newElement.querySelectorAll("script")
        }
    }

    class ge {
        constructor(e) {
            this.keys = [], this.snapshots = {}, this.size = e
        }

        has(e) {
            return g(e) in this.snapshots
        }

        get(e) {
            if (this.has(e)) {
                const t = this.read(e);
                return this.touch(e), t
            }
        }

        put(e, t) {
            return this.write(e, t), this.touch(e), t
        }

        clear() {
            this.snapshots = {}
        }

        read(e) {
            return this.snapshots[g(e)]
        }

        write(e, t) {
            this.snapshots[g(e)] = t
        }

        touch(e) {
            const t = g(e), n = this.keys.indexOf(t);
            n > -1 && this.keys.splice(n, 1), this.keys.unshift(t), this.trim()
        }

        trim() {
            for (const e of this.keys.splice(this.size)) delete this.snapshots[e]
        }
    }

    class be extends j {
        constructor() {
            super(...arguments), this.snapshotCache = new ge(10), this.lastRenderedLocation = new URL(location.href), this.forceReloaded = !1
        }

        renderPage(e, t = !1, n = !0, r) {
            const o = new ve(this.snapshot, e, ve.renderElement, t, n);
            return o.shouldRender ? null == r || r.changeHistory() : this.forceReloaded = !0, this.render(o)
        }

        renderError(e, t) {
            null == t || t.changeHistory();
            const n = new me(this.snapshot, e, me.renderElement, !1);
            return this.render(n)
        }

        clearSnapshotCache() {
            this.snapshotCache.clear()
        }

        async cacheSnapshot(e = this.snapshot) {
            if (e.isCacheable) {
                this.delegate.viewWillCacheSnapshot();
                const {lastRenderedLocation: t} = this;
                await new Promise((e => setTimeout((() => e()), 0)));
                const n = e.clone();
                return this.snapshotCache.put(t, n), n
            }
        }

        getCachedSnapshotForLocation(e) {
            return this.snapshotCache.get(e)
        }

        get snapshot() {
            return ee.fromElement(this.element)
        }
    }

    class ye {
        constructor(e) {
            this.selector = "a[data-turbo-preload]", this.delegate = e
        }

        get snapshotCache() {
            return this.delegate.navigator.view.snapshotCache
        }

        start() {
            if ("loading" === document.readyState) return document.addEventListener("DOMContentLoaded", (() => {
                this.preloadOnLoadLinksForView(document.body)
            }));
            this.preloadOnLoadLinksForView(document.body)
        }

        preloadOnLoadLinksForView(e) {
            for (const t of e.querySelectorAll(this.selector)) this.preloadURL(t)
        }

        async preloadURL(e) {
            const t = new URL(e.href);
            if (!this.snapshotCache.has(t)) try {
                const e = await fetch(t.toString(), {headers: {"VND.PREFETCH": "true", Accept: "text/html"}}), n = await e.text(), r = ee.fromHTMLString(n);
                this.snapshotCache.put(t, r)
            } catch (e) {
            }
        }
    }

    function we(e) {
        Object.defineProperties(e, Se)
    }

    const Se = {
        absoluteURL: {
            get() {
                return this.toString()
            }
        }
    }, ke = {
        after() {
            this.targetElements.forEach((e => {
                var t;
                return null === (t = e.parentElement) || void 0 === t ? void 0 : t.insertBefore(this.templateContent, e.nextSibling)
            }))
        }, append() {
            this.removeDuplicateTargetChildren(), this.targetElements.forEach((e => e.append(this.templateContent)))
        }, before() {
            this.targetElements.forEach((e => {
                var t;
                return null === (t = e.parentElement) || void 0 === t ? void 0 : t.insertBefore(this.templateContent, e)
            }))
        }, prepend() {
            this.removeDuplicateTargetChildren(), this.targetElements.forEach((e => e.prepend(this.templateContent)))
        }, remove() {
            this.targetElements.forEach((e => e.remove()))
        }, replace() {
            this.targetElements.forEach((e => e.replaceWith(this.templateContent)))
        }, update() {
            this.targetElements.forEach((e => {
                e.innerHTML = "", e.append(this.templateContent)
            }))
        }
    }, xe = new class {
        constructor() {
            this.navigator = new ue(this), this.history = new ce(this), this.preloader = new ye(this), this.view = new be(this, document.documentElement), this.adapter = new se(this), this.pageObserver = new de(this), this.cacheObserver = new ae, this.linkClickObserver = new $(this, window), this.formSubmitObserver = new V(this, document), this.scrollObserver = new he(this), this.streamObserver = new fe(this), this.formLinkClickObserver = new Z(this, document.documentElement), this.frameRedirector = new le(this, document.documentElement), this.streamMessageRenderer = new pe, this.drive = !0, this.enabled = !0, this.progressBarDelay = 500, this.started = !1, this.formMode = "on"
        }

        start() {
            this.started || (this.pageObserver.start(), this.cacheObserver.start(), this.formLinkClickObserver.start(), this.linkClickObserver.start(), this.formSubmitObserver.start(), this.scrollObserver.start(), this.streamObserver.start(), this.frameRedirector.start(), this.history.start(), this.preloader.start(), this.started = !0, this.enabled = !0)
        }

        disable() {
            this.enabled = !1
        }

        stop() {
            this.started && (this.pageObserver.stop(), this.cacheObserver.stop(), this.formLinkClickObserver.stop(), this.linkClickObserver.stop(), this.formSubmitObserver.stop(), this.scrollObserver.stop(), this.streamObserver.stop(), this.frameRedirector.stop(), this.history.stop(), this.started = !1)
        }

        registerAdapter(e) {
            this.adapter = e
        }

        visit(e, t = {}) {
            const n = t.frame ? document.getElementById(t.frame) : null;
            n instanceof d ? (n.src = e.toString(), n.loaded) : this.navigator.proposeVisit(h(e), t)
        }

        connectStreamSource(e) {
            this.streamObserver.connectStreamSource(e)
        }

        disconnectStreamSource(e) {
            this.streamObserver.disconnectStreamSource(e)
        }

        renderStreamMessage(e) {
            this.streamMessageRenderer.render(P.wrap(e))
        }

        clearCache() {
            this.view.clearSnapshotCache()
        }

        setProgressBarDelay(e) {
            this.progressBarDelay = e
        }

        setFormMode(e) {
            this.formMode = e
        }

        get location() {
            return this.history.location
        }

        get restorationIdentifier() {
            return this.history.restorationIdentifier
        }

        historyPoppedToLocationWithRestorationIdentifier(e, t) {
            this.enabled ? this.navigator.startVisit(e, t, {action: "restore", historyChanged: !0}) : this.adapter.pageInvalidated({reason: "turbo_disabled"})
        }

        scrollPositionChanged(e) {
            this.history.updateRestorationData({scrollPosition: e})
        }

        willSubmitFormLinkToLocation(e, t) {
            return this.elementIsNavigatable(e) && m(t, this.snapshot.rootLocation)
        }

        submittedFormLinkToLocation() {
        }

        willFollowLinkToLocation(e, t, n) {
            return this.elementIsNavigatable(e) && m(t, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(e, t, n)
        }

        followedLinkToLocation(e, t) {
            const n = this.getActionForLink(e), r = e.hasAttribute("data-turbo-stream");
            this.visit(t.href, {action: n, acceptsStreamResponse: r})
        }

        allowsVisitingLocationWithAction(e, t) {
            return this.locationWithActionIsSamePage(e, t) || this.applicationAllowsVisitingLocation(e)
        }

        visitProposedToLocation(e, t) {
            we(e), this.adapter.visitProposedToLocation(e, t)
        }

        visitStarted(e) {
            e.acceptsStreamResponse || C(document.documentElement), we(e.location), e.silent || this.notifyApplicationAfterVisitingLocation(e.location, e.action)
        }

        visitCompleted(e) {
            T(document.documentElement), this.notifyApplicationAfterPageLoad(e.getTimingMetrics())
        }

        locationWithActionIsSamePage(e, t) {
            return this.navigator.locationWithActionIsSamePage(e, t)
        }

        visitScrolledToSamePageLocation(e, t) {
            this.notifyApplicationAfterVisitingSamePageLocation(e, t)
        }

        willSubmitForm(e, t) {
            const n = f(e, t);
            return this.submissionIsNavigatable(e, t) && m(h(n), this.snapshot.rootLocation)
        }

        formSubmitted(e, t) {
            this.navigator.submitForm(e, t)
        }

        pageBecameInteractive() {
            this.view.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
        }

        pageLoaded() {
            this.history.assumeControlOfScrollRestoration()
        }

        pageWillUnload() {
            this.history.relinquishControlOfScrollRestoration()
        }

        receivedMessageFromStream(e) {
            this.renderStreamMessage(e)
        }

        viewWillCacheSnapshot() {
            var e;
            (null === (e = this.navigator.currentVisit) || void 0 === e ? void 0 : e.silent) || this.notifyApplicationBeforeCachingSnapshot()
        }

        allowsImmediateRender({element: e}, t) {
            const n = this.notifyApplicationBeforeRender(e, t), {defaultPrevented: r, detail: {render: o}} = n;
            return this.view.renderer && o && (this.view.renderer.renderElement = o), !r
        }

        viewRenderedSnapshot(e, t) {
            this.view.lastRenderedLocation = this.history.location, this.notifyApplicationAfterRender()
        }

        preloadOnLoadLinksForView(e) {
            this.preloader.preloadOnLoadLinksForView(e)
        }

        viewInvalidated(e) {
            this.adapter.pageInvalidated(e)
        }

        frameLoaded(e) {
            this.notifyApplicationAfterFrameLoad(e)
        }

        frameRendered(e, t) {
            this.notifyApplicationAfterFrameRender(e, t)
        }

        applicationAllowsFollowingLinkToLocation(e, t, n) {
            return !this.notifyApplicationAfterClickingLinkToLocation(e, t, n).defaultPrevented
        }

        applicationAllowsVisitingLocation(e) {
            return !this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented
        }

        notifyApplicationAfterClickingLinkToLocation(e, t, n) {
            return w("turbo:click", {target: e, detail: {url: t.href, originalEvent: n}, cancelable: !0})
        }

        notifyApplicationBeforeVisitingLocation(e) {
            return w("turbo:before-visit", {detail: {url: e.href}, cancelable: !0})
        }

        notifyApplicationAfterVisitingLocation(e, t) {
            return w("turbo:visit", {detail: {url: e.href, action: t}})
        }

        notifyApplicationBeforeCachingSnapshot() {
            return w("turbo:before-cache")
        }

        notifyApplicationBeforeRender(e, t) {
            return w("turbo:before-render", {detail: Object.assign({newBody: e}, t), cancelable: !0})
        }

        notifyApplicationAfterRender() {
            return w("turbo:render")
        }

        notifyApplicationAfterPageLoad(e = {}) {
            return w("turbo:load", {detail: {url: this.location.href, timing: e}})
        }

        notifyApplicationAfterVisitingSamePageLocation(e, t) {
            dispatchEvent(new HashChangeEvent("hashchange", {oldURL: e.toString(), newURL: t.toString()}))
        }

        notifyApplicationAfterFrameLoad(e) {
            return w("turbo:frame-load", {target: e})
        }

        notifyApplicationAfterFrameRender(e, t) {
            return w("turbo:frame-render", {detail: {fetchResponse: e}, target: t, cancelable: !0})
        }

        submissionIsNavigatable(e, t) {
            if ("off" == this.formMode) return !1;
            {
                const n = !t || this.elementIsNavigatable(t);
                return "optin" == this.formMode ? n && null != e.closest('[data-turbo="true"]') : n && this.elementIsNavigatable(e)
            }
        }

        elementIsNavigatable(e) {
            const t = M(e, "[data-turbo]"), n = M(e, "turbo-frame");
            return this.drive || n ? !t || "false" != t.getAttribute("data-turbo") : !!t && "true" == t.getAttribute("data-turbo")
        }

        getActionForLink(e) {
            return R(e) || "advance"
        }

        get snapshot() {
            return this.view.snapshot
        }
    }, Ee = new class {
        constructor(e) {
            this.session = e
        }

        clear() {
            this.session.clearCache()
        }

        resetCacheControl() {
            this.setCacheControl("")
        }

        exemptPageFromCache() {
            this.setCacheControl("no-cache")
        }

        exemptPageFromPreview() {
            this.setCacheControl("no-preview")
        }

        setCacheControl(e) {
            !function (e, t) {
                let n = D(e);
                n || (n = document.createElement("meta"), n.setAttribute("name", e), document.head.appendChild(n)), n.setAttribute("content", t)
            }("turbo-cache-control", e)
        }
    }(xe), {navigator: _e} = xe;

    function Ce() {
        xe.start()
    }

    function Te(e, t) {
        xe.visit(e, t)
    }

    function Le(e) {
        xe.connectStreamSource(e)
    }

    function Ae(e) {
        xe.disconnectStreamSource(e)
    }

    var Re = Object.freeze({
        __proto__: null, navigator: _e, session: xe, cache: Ee, PageRenderer: ve, PageSnapshot: ee, FrameRenderer: Y, start: Ce, registerAdapter: function (e) {
            xe.registerAdapter(e)
        }, visit: Te, connectStreamSource: Le, disconnectStreamSource: Ae, renderStreamMessage: function (e) {
            xe.renderStreamMessage(e)
        }, clearCache: function () {
            console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"), xe.clearCache()
        }, setProgressBarDelay: function (e) {
            xe.setProgressBarDelay(e)
        }, setConfirmMethod: function (e) {
            H.confirmMethod = e
        }, setFormMode: function (e) {
            xe.setFormMode(e)
        }, StreamActions: ke
    });

    class De extends Error {
    }

    function Oe(e) {
        if (null != e) {
            const t = document.getElementById(e);
            if (t instanceof d) return t
        }
    }

    function Me(e, t) {
        if (e) {
            const r = e.getAttribute("src");
            if (null != r && null != t && (n = t, h(r).href == h(n).href)) throw new Error(`Matching <turbo-frame id="${e.id}"> element has a source URL which references itself`);
            if (e.ownerDocument !== document && (e = document.importNode(e, !0)), e instanceof d) return e.connectedCallback(), e.disconnectedCallback(), e
        }
        var n
    }

    class Ie extends HTMLElement {
        static async renderElement(e) {
            await e.performAction()
        }

        async connectedCallback() {
            try {
                await this.render()
            } catch (e) {
                console.error(e)
            } finally {
                this.disconnect()
            }
        }

        async render() {
            var e;
            return null !== (e = this.renderPromise) && void 0 !== e ? e : this.renderPromise = (async () => {
                const e = this.beforeRenderEvent;
                this.dispatchEvent(e) && (await S(), await e.detail.render(this))
            })()
        }

        disconnect() {
            try {
                this.remove()
            } catch (e) {
            }
        }

        removeDuplicateTargetChildren() {
            this.duplicateChildren.forEach((e => e.remove()))
        }

        get duplicateChildren() {
            var e;
            const t = this.targetElements.flatMap((e => [...e.children])).filter((e => !!e.id)),
                n = [...(null === (e = this.templateContent) || void 0 === e ? void 0 : e.children) || []].filter((e => !!e.id)).map((e => e.id));
            return t.filter((e => n.includes(e.id)))
        }

        get performAction() {
            if (this.action) {
                const e = ke[this.action];
                if (e) return e;
                this.raise("unknown action")
            }
            this.raise("action attribute is missing")
        }

        get targetElements() {
            return this.target ? this.targetElementsById : this.targets ? this.targetElementsByQuery : void this.raise("target or targets attribute is missing")
        }

        get templateContent() {
            return this.templateElement.content.cloneNode(!0)
        }

        get templateElement() {
            if (null === this.firstElementChild) {
                const e = this.ownerDocument.createElement("template");
                return this.appendChild(e), e
            }
            if (this.firstElementChild instanceof HTMLTemplateElement) return this.firstElementChild;
            this.raise("first child element must be a <template> element")
        }

        get action() {
            return this.getAttribute("action")
        }

        get target() {
            return this.getAttribute("target")
        }

        get targets() {
            return this.getAttribute("targets")
        }

        raise(e) {
            throw new Error(`${this.description}: ${e}`)
        }

        get description() {
            var e, t;
            return null !== (t = (null !== (e = this.outerHTML.match(/<[^>]+>/)) && void 0 !== e ? e : [])[0]) && void 0 !== t ? t : "<turbo-stream>"
        }

        get beforeRenderEvent() {
            return new CustomEvent("turbo:before-stream-render", {bubbles: !0, cancelable: !0, detail: {newStream: this, render: Ie.renderElement}})
        }

        get targetElementsById() {
            var e;
            const t = null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.getElementById(this.target);
            return null !== t ? [t] : []
        }

        get targetElementsByQuery() {
            var e;
            const t = null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.querySelectorAll(this.targets);
            return 0 !== t.length ? Array.prototype.slice.call(t) : []
        }
    }

    class Fe extends HTMLElement {
        constructor() {
            super(...arguments), this.streamSource = null
        }

        connectedCallback() {
            this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src), Le(this.streamSource)
        }

        disconnectedCallback() {
            this.streamSource && Ae(this.streamSource)
        }

        get src() {
            return this.getAttribute("src") || ""
        }
    }

    d.delegateConstructor = class {
        constructor(e) {
            this.fetchResponseLoaded = e => {
            }, this.currentFetchRequest = null, this.resolveVisitPromise = () => {
            }, this.connected = !1, this.hasBeenLoaded = !1, this.ignoredAttributes = new Set, this.action = null, this.visitCachedSnapshot = ({element: e}) => {
                const t = e.querySelector("#" + this.element.id);
                t && this.previousFrameElement && t.replaceChildren(...this.previousFrameElement.children), delete this.previousFrameElement
            }, this.element = e, this.view = new z(this, this.element), this.appearanceObserver = new F(this, this.element), this.formLinkClickObserver = new Z(this, this.element), this.linkInterceptor = new q(this, this.element), this.restorationIdentifier = E(), this.formSubmitObserver = new V(this, this.element)
        }

        connect() {
            this.connected || (this.connected = !0, this.loadingStyle == i.lazy ? this.appearanceObserver.start() : this.loadSourceURL(), this.formLinkClickObserver.start(), this.linkInterceptor.start(), this.formSubmitObserver.start())
        }

        disconnect() {
            this.connected && (this.connected = !1, this.appearanceObserver.stop(), this.formLinkClickObserver.stop(), this.linkInterceptor.stop(), this.formSubmitObserver.stop())
        }

        disabledChanged() {
            this.loadingStyle == i.eager && this.loadSourceURL()
        }

        sourceURLChanged() {
            this.isIgnoringChangesTo("src") || (this.element.isConnected && (this.complete = !1), (this.loadingStyle == i.eager || this.hasBeenLoaded) && this.loadSourceURL())
        }

        sourceURLReloaded() {
            const {src: e} = this.element;
            return this.ignoringChangesToAttribute("complete", (() => {
                this.element.removeAttribute("complete")
            })), this.element.src = null, this.element.src = e, this.element.loaded
        }

        completeChanged() {
            this.isIgnoringChangesTo("complete") || this.loadSourceURL()
        }

        loadingStyleChanged() {
            this.loadingStyle == i.lazy ? this.appearanceObserver.start() : (this.appearanceObserver.stop(), this.loadSourceURL())
        }

        async loadSourceURL() {
            this.enabled && this.isActive && !this.complete && this.sourceURL && (this.element.loaded = this.visit(h(this.sourceURL)), this.appearanceObserver.stop(), await this.element.loaded, this.hasBeenLoaded = !0)
        }

        async loadResponse(e) {
            (e.redirected || e.succeeded && e.isHTML) && (this.sourceURL = e.response.url);
            try {
                const t = await e.responseHTML;
                if (t) {
                    const n = k(t);
                    ee.fromDocument(n).isVisitable ? await this.loadFrameResponse(e, n) : await this.handleUnvisitableFrameResponse(e)
                }
            } finally {
                this.fetchResponseLoaded = () => {
                }
            }
        }

        elementAppearedInViewport(e) {
            this.proposeVisitIfNavigatedWithAction(e, e), this.loadSourceURL()
        }

        willSubmitFormLinkToLocation(e) {
            return this.shouldInterceptNavigation(e)
        }

        submittedFormLinkToLocation(e, t, n) {
            const r = this.findFrameElement(e);
            r && n.setAttribute("data-turbo-frame", r.id)
        }

        shouldInterceptLinkClick(e, t, n) {
            return this.shouldInterceptNavigation(e)
        }

        linkClickIntercepted(e, t) {
            this.navigateFrame(e, t)
        }

        willSubmitForm(e, t) {
            return e.closest("turbo-frame") == this.element && this.shouldInterceptNavigation(e, t)
        }

        formSubmitted(e, t) {
            this.formSubmission && this.formSubmission.stop(), this.formSubmission = new H(this, e, t);
            const {fetchRequest: n} = this.formSubmission;
            this.prepareRequest(n), this.formSubmission.start()
        }

        prepareRequest(e) {
            var t;
            e.headers["Turbo-Frame"] = this.id, (null === (t = this.currentNavigationElement) || void 0 === t ? void 0 : t.hasAttribute("data-turbo-stream")) && e.acceptResponseType(P.contentType)
        }

        requestStarted(e) {
            C(this.element)
        }

        requestPreventedHandlingResponse(e, t) {
            this.resolveVisitPromise()
        }

        async requestSucceededWithResponse(e, t) {
            await this.loadResponse(t), this.resolveVisitPromise()
        }

        async requestFailedWithResponse(e, t) {
            await this.loadResponse(t), this.resolveVisitPromise()
        }

        requestErrored(e, t) {
            console.error(t), this.resolveVisitPromise()
        }

        requestFinished(e) {
            T(this.element)
        }

        formSubmissionStarted({formElement: e}) {
            C(e, this.findFrameElement(e))
        }

        formSubmissionSucceededWithResponse(e, t) {
            const n = this.findFrameElement(e.formElement, e.submitter);
            n.delegate.proposeVisitIfNavigatedWithAction(n, e.formElement, e.submitter), n.delegate.loadResponse(t), e.isSafe || xe.clearCache()
        }

        formSubmissionFailedWithResponse(e, t) {
            this.element.delegate.loadResponse(t), xe.clearCache()
        }

        formSubmissionErrored(e, t) {
            console.error(t)
        }

        formSubmissionFinished({formElement: e}) {
            T(e, this.findFrameElement(e))
        }

        allowsImmediateRender({element: e}, t) {
            const n = w("turbo:before-frame-render", {target: this.element, detail: Object.assign({newFrame: e}, t), cancelable: !0}), {
                defaultPrevented: r,
                detail: {render: o}
            } = n;
            return this.view.renderer && o && (this.view.renderer.renderElement = o), !r
        }

        viewRenderedSnapshot(e, t) {
        }

        preloadOnLoadLinksForView(e) {
            xe.preloadOnLoadLinksForView(e)
        }

        viewInvalidated() {
        }

        willRenderFrame(e, t) {
            this.previousFrameElement = e.cloneNode(!0)
        }

        async loadFrameResponse(e, t) {
            const n = await this.extractForeignFrameElement(t.body);
            if (n) {
                const t = new N(n), r = new Y(this, this.view.snapshot, t, Y.renderElement, !1, !1);
                this.view.renderPromise && await this.view.renderPromise, this.changeHistory(), await this.view.render(r), this.complete = !0, xe.frameRendered(e, this.element), xe.frameLoaded(this.element), this.fetchResponseLoaded(e)
            } else this.willHandleFrameMissingFromResponse(e) && this.handleFrameMissingFromResponse(e)
        }

        async visit(e) {
            var t;
            const n = new I(this, s.get, e, new URLSearchParams, this.element);
            return null === (t = this.currentFetchRequest) || void 0 === t || t.cancel(), this.currentFetchRequest = n, new Promise((e => {
                this.resolveVisitPromise = () => {
                    this.resolveVisitPromise = () => {
                    }, this.currentFetchRequest = null, e()
                }, n.perform()
            }))
        }

        navigateFrame(e, t, n) {
            const r = this.findFrameElement(e, n);
            r.delegate.proposeVisitIfNavigatedWithAction(r, e, n), this.withCurrentNavigationElement(e, (() => {
                r.src = t
            }))
        }

        proposeVisitIfNavigatedWithAction(e, t, n) {
            if (this.action = R(n, t, e), this.action) {
                const t = ee.fromElement(e).clone(), {visitCachedSnapshot: n} = e.delegate;
                e.delegate.fetchResponseLoaded = r => {
                    if (e.src) {
                        const {statusCode: o, redirected: i} = r, s = {
                            response: {statusCode: o, redirected: i, responseHTML: e.ownerDocument.documentElement.outerHTML},
                            visitCachedSnapshot: n,
                            willRender: !1,
                            updateHistory: !1,
                            restorationIdentifier: this.restorationIdentifier,
                            snapshot: t
                        };
                        this.action && (s.action = this.action), xe.visit(e.src, s)
                    }
                }
            }
        }

        changeHistory() {
            if (this.action) {
                const e = A(this.action);
                xe.history.update(e, h(this.element.src || ""), this.restorationIdentifier)
            }
        }

        async handleUnvisitableFrameResponse(e) {
            console.warn(`The response (${e.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`), await this.visitResponse(e.response)
        }

        willHandleFrameMissingFromResponse(e) {
            this.element.setAttribute("complete", "");
            const t = e.response;
            return !w("turbo:frame-missing", {
                target: this.element, detail: {
                    response: t, visit: async (e, t = {}) => {
                        e instanceof Response ? this.visitResponse(e) : xe.visit(e, t)
                    }
                }, cancelable: !0
            }).defaultPrevented
        }

        handleFrameMissingFromResponse(e) {
            this.view.missing(), this.throwFrameMissingError(e)
        }

        throwFrameMissingError(e) {
            const t = `The response (${e.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
            throw new De(t)
        }

        async visitResponse(e) {
            const t = new b(e), n = await t.responseHTML, {location: r, redirected: o, statusCode: i} = t;
            return xe.visit(r, {response: {redirected: o, statusCode: i, responseHTML: n}})
        }

        findFrameElement(e, t) {
            var n;
            return null !== (n = Oe(_("data-turbo-frame", t, e) || this.element.getAttribute("target"))) && void 0 !== n ? n : this.element
        }

        async extractForeignFrameElement(e) {
            let t;
            const n = CSS.escape(this.id);
            try {
                if (t = Me(e.querySelector(`turbo-frame#${n}`), this.sourceURL), t) return t;
                if (t = Me(e.querySelector(`turbo-frame[src][recurse~=${n}]`), this.sourceURL), t) return await t.loaded, await this.extractForeignFrameElement(t)
            } catch (e) {
                return console.error(e), new d
            }
            return null
        }

        formActionIsVisitable(e, t) {
            return m(h(f(e, t)), this.rootLocation)
        }

        shouldInterceptNavigation(e, t) {
            const n = _("data-turbo-frame", t, e) || this.element.getAttribute("target");
            if (e instanceof HTMLFormElement && !this.formActionIsVisitable(e, t)) return !1;
            if (!this.enabled || "_top" == n) return !1;
            if (n) {
                const e = Oe(n);
                if (e) return !e.disabled
            }
            return !(!xe.elementIsNavigatable(e) || t && !xe.elementIsNavigatable(t))
        }

        get id() {
            return this.element.id
        }

        get enabled() {
            return !this.element.disabled
        }

        get sourceURL() {
            if (this.element.src) return this.element.src
        }

        set sourceURL(e) {
            this.ignoringChangesToAttribute("src", (() => {
                this.element.src = null != e ? e : null
            }))
        }

        get loadingStyle() {
            return this.element.loading
        }

        get isLoading() {
            return void 0 !== this.formSubmission || void 0 !== this.resolveVisitPromise()
        }

        get complete() {
            return this.element.hasAttribute("complete")
        }

        set complete(e) {
            this.ignoringChangesToAttribute("complete", (() => {
                e ? this.element.setAttribute("complete", "") : this.element.removeAttribute("complete")
            }))
        }

        get isActive() {
            return this.element.isActive && this.connected
        }

        get rootLocation() {
            var e;
            const t = this.element.ownerDocument.querySelector('meta[name="turbo-root"]');
            return h(null !== (e = null == t ? void 0 : t.content) && void 0 !== e ? e : "/")
        }

        isIgnoringChangesTo(e) {
            return this.ignoredAttributes.has(e)
        }

        ignoringChangesToAttribute(e, t) {
            this.ignoredAttributes.add(e), t(), this.ignoredAttributes.delete(e)
        }

        withCurrentNavigationElement(e, t) {
            this.currentNavigationElement = e, t(), delete this.currentNavigationElement
        }
    }, void 0 === customElements.get("turbo-frame") && customElements.define("turbo-frame", d), void 0 === customElements.get("turbo-stream") && customElements.define("turbo-stream", Ie), void 0 === customElements.get("turbo-stream-source") && customElements.define("turbo-stream-source", Fe), (() => {
        let e = document.currentScript;
        if (e && !e.hasAttribute("data-turbo-suppress-warning")) for (e = e.parentElement; e;) {
            if (e == document.body) return console.warn(x`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, e.outerHTML);
            e = e.parentElement
        }
    })(), window.Turbo = Re, Ce()
}, 8826:

function (e) {
    !function (t) {
        "use strict";

        function n(e) {
            return parseInt(e) === e
        }

        function r(e) {
            if (!n(e.length)) return !1;
            for (var t = 0; t < e.length; t++) if (!n(e[t]) || e[t] < 0 || e[t] > 255) return !1;
            return !0
        }

        function o(e, t) {
            if (e.buffer && "Uint8Array" === e.name) return t && (e = e.slice ? e.slice() : Array.prototype.slice.call(e)), e;
            if (Array.isArray(e)) {
                if (!r(e)) throw new Error("Array contains invalid value: " + e);
                return new Uint8Array(e)
            }
            if (n(e.length) && r(e)) return new Uint8Array(e);
            throw new Error("unsupported array-like object")
        }

        function i(e) {
            return new Uint8Array(e)
        }

        function s(e, t, n, r, o) {
            null == r && null == o || (e = e.slice ? e.slice(r, o) : Array.prototype.slice.call(e, r, o)), t.set(e, n)
        }

        var a, l = {
                toBytes: function (e) {
                    var t = [], n = 0;
                    for (e = encodeURI(e); n < e.length;) {
                        var r = e.charCodeAt(n++);
                        37 === r ? (t.push(parseInt(e.substr(n, 2), 16)), n += 2) : t.push(r)
                    }
                    return o(t)
                }, fromBytes: function (e) {
                    for (var t = [], n = 0; n < e.length;) {
                        var r = e[n];
                        r < 128 ? (t.push(String.fromCharCode(r)), n++) : r > 191 && r < 224 ? (t.push(String.fromCharCode((31 & r) << 6 | 63 & e[n + 1])), n += 2) : (t.push(String.fromCharCode((15 & r) << 12 | (63 & e[n + 1]) << 6 | 63 & e[n + 2])), n += 3)
                    }
                    return t.join("")
                }
            }, c = (a = "0123456789abcdef", {
                toBytes: function (e) {
                    for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                    return t
                }, fromBytes: function (e) {
                    for (var t = [], n = 0; n < e.length; n++) {
                        var r = e[n];
                        t.push(a[(240 & r) >> 4] + a[15 & r])
                    }
                    return t.join("")
                }
            }), u = {16: 10, 24: 12, 32: 14}, d = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
            h = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
            p = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125],
            f = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986],
            m = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766],
            v = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126],
            g = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436],
            b = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890],
            y = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935],
            w = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600],
            S = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480],
            k = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795],
            x = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855],
            E = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150],
            _ = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];

        function C(e) {
            for (var t = [], n = 0; n < e.length; n += 4) t.push(e[n] << 24 | e[n + 1] << 16 | e[n + 2] << 8 | e[n + 3]);
            return t
        }

        var T = function (e) {
            if (!(this instanceof T)) throw Error("AES must be instanitated with `new`");
            Object.defineProperty(this, "key", {value: o(e, !0)}), this._prepare()
        };
        T.prototype._prepare = function () {
            var e = u[this.key.length];
            if (null == e) throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
            this._Ke = [], this._Kd = [];
            for (var t = 0; t <= e; t++) this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]);
            var n, r = 4 * (e + 1), o = this.key.length / 4, i = C(this.key);
            for (t = 0; t < o; t++) n = t >> 2, this._Ke[n][t % 4] = i[t], this._Kd[e - n][t % 4] = i[t];
            for (var s, a = 0, l = o; l < r;) {
                if (s = i[o - 1], i[0] ^= h[s >> 16 & 255] << 24 ^ h[s >> 8 & 255] << 16 ^ h[255 & s] << 8 ^ h[s >> 24 & 255] ^ d[a] << 24, a += 1, 8 != o) for (t = 1; t < o; t++) i[t] ^= i[t - 1]; else {
                    for (t = 1; t < o / 2; t++) i[t] ^= i[t - 1];
                    for (s = i[o / 2 - 1], i[o / 2] ^= h[255 & s] ^ h[s >> 8 & 255] << 8 ^ h[s >> 16 & 255] << 16 ^ h[s >> 24 & 255] << 24, t = o / 2 + 1; t < o; t++) i[t] ^= i[t - 1]
                }
                for (t = 0; t < o && l < r;) c = l >> 2, p = l % 4, this._Ke[c][p] = i[t], this._Kd[e - c][p] = i[t++], l++
            }
            for (var c = 1; c < e; c++) for (var p = 0; p < 4; p++) s = this._Kd[c][p], this._Kd[c][p] = k[s >> 24 & 255] ^ x[s >> 16 & 255] ^ E[s >> 8 & 255] ^ _[255 & s]
        }, T.prototype.encrypt = function (e) {
            if (16 != e.length) throw new Error("invalid plaintext size (must be 16 bytes)");
            for (var t = this._Ke.length - 1, n = [0, 0, 0, 0], r = C(e), o = 0; o < 4; o++) r[o] ^= this._Ke[0][o];
            for (var s = 1; s < t; s++) {
                for (o = 0; o < 4; o++) n[o] = f[r[o] >> 24 & 255] ^ m[r[(o + 1) % 4] >> 16 & 255] ^ v[r[(o + 2) % 4] >> 8 & 255] ^ g[255 & r[(o + 3) % 4]] ^ this._Ke[s][o];
                r = n.slice()
            }
            var a, l = i(16);
            for (o = 0; o < 4; o++) a = this._Ke[t][o], l[4 * o] = 255 & (h[r[o] >> 24 & 255] ^ a >> 24), l[4 * o + 1] = 255 & (h[r[(o + 1) % 4] >> 16 & 255] ^ a >> 16), l[4 * o + 2] = 255 & (h[r[(o + 2) % 4] >> 8 & 255] ^ a >> 8), l[4 * o + 3] = 255 & (h[255 & r[(o + 3) % 4]] ^ a);
            return l
        }, T.prototype.decrypt = function (e) {
            if (16 != e.length) throw new Error("invalid ciphertext size (must be 16 bytes)");
            for (var t = this._Kd.length - 1, n = [0, 0, 0, 0], r = C(e), o = 0; o < 4; o++) r[o] ^= this._Kd[0][o];
            for (var s = 1; s < t; s++) {
                for (o = 0; o < 4; o++) n[o] = b[r[o] >> 24 & 255] ^ y[r[(o + 3) % 4] >> 16 & 255] ^ w[r[(o + 2) % 4] >> 8 & 255] ^ S[255 & r[(o + 1) % 4]] ^ this._Kd[s][o];
                r = n.slice()
            }
            var a, l = i(16);
            for (o = 0; o < 4; o++) a = this._Kd[t][o], l[4 * o] = 255 & (p[r[o] >> 24 & 255] ^ a >> 24), l[4 * o + 1] = 255 & (p[r[(o + 3) % 4] >> 16 & 255] ^ a >> 16), l[4 * o + 2] = 255 & (p[r[(o + 2) % 4] >> 8 & 255] ^ a >> 8), l[4 * o + 3] = 255 & (p[255 & r[(o + 1) % 4]] ^ a);
            return l
        };
        var L = function (e) {
            if (!(this instanceof L)) throw Error("AES must be instanitated with `new`");
            this.description = "Electronic Code Block", this.name = "ecb", this._aes = new T(e)
        };
        L.prototype.encrypt = function (e) {
            if ((e = o(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
            for (var t = i(e.length), n = i(16), r = 0; r < e.length; r += 16) s(e, n, 0, r, r + 16), s(n = this._aes.encrypt(n), t, r);
            return t
        }, L.prototype.decrypt = function (e) {
            if ((e = o(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
            for (var t = i(e.length), n = i(16), r = 0; r < e.length; r += 16) s(e, n, 0, r, r + 16), s(n = this._aes.decrypt(n), t, r);
            return t
        };
        var A = function (e, t) {
            if (!(this instanceof A)) throw Error("AES must be instanitated with `new`");
            if (this.description = "Cipher Block Chaining", this.name = "cbc", t) {
                if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)")
            } else t = i(16);
            this._lastCipherblock = o(t, !0), this._aes = new T(e)
        };
        A.prototype.encrypt = function (e) {
            if ((e = o(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
            for (var t = i(e.length), n = i(16), r = 0; r < e.length; r += 16) {
                s(e, n, 0, r, r + 16);
                for (var a = 0; a < 16; a++) n[a] ^= this._lastCipherblock[a];
                this._lastCipherblock = this._aes.encrypt(n), s(this._lastCipherblock, t, r)
            }
            return t
        }, A.prototype.decrypt = function (e) {
            if ((e = o(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
            for (var t = i(e.length), n = i(16), r = 0; r < e.length; r += 16) {
                s(e, n, 0, r, r + 16), n = this._aes.decrypt(n);
                for (var a = 0; a < 16; a++) t[r + a] = n[a] ^ this._lastCipherblock[a];
                s(e, this._lastCipherblock, 0, r, r + 16)
            }
            return t
        };
        var R = function (e, t, n) {
            if (!(this instanceof R)) throw Error("AES must be instanitated with `new`");
            if (this.description = "Cipher Feedback", this.name = "cfb", t) {
                if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 size)")
            } else t = i(16);
            n || (n = 1), this.segmentSize = n, this._shiftRegister = o(t, !0), this._aes = new T(e)
        };
        R.prototype.encrypt = function (e) {
            if (e.length % this.segmentSize != 0) throw new Error("invalid plaintext size (must be segmentSize bytes)");
            for (var t, n = o(e, !0), r = 0; r < n.length; r += this.segmentSize) {
                t = this._aes.encrypt(this._shiftRegister);
                for (var i = 0; i < this.segmentSize; i++) n[r + i] ^= t[i];
                s(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), s(n, this._shiftRegister, 16 - this.segmentSize, r, r + this.segmentSize)
            }
            return n
        }, R.prototype.decrypt = function (e) {
            if (e.length % this.segmentSize != 0) throw new Error("invalid ciphertext size (must be segmentSize bytes)");
            for (var t, n = o(e, !0), r = 0; r < n.length; r += this.segmentSize) {
                t = this._aes.encrypt(this._shiftRegister);
                for (var i = 0; i < this.segmentSize; i++) n[r + i] ^= t[i];
                s(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), s(e, this._shiftRegister, 16 - this.segmentSize, r, r + this.segmentSize)
            }
            return n
        };
        var D = function (e, t) {
            if (!(this instanceof D)) throw Error("AES must be instanitated with `new`");
            if (this.description = "Output Feedback", this.name = "ofb", t) {
                if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)")
            } else t = i(16);
            this._lastPrecipher = o(t, !0), this._lastPrecipherIndex = 16, this._aes = new T(e)
        };
        D.prototype.encrypt = function (e) {
            for (var t = o(e, !0), n = 0; n < t.length; n++) 16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0), t[n] ^= this._lastPrecipher[this._lastPrecipherIndex++];
            return t
        }, D.prototype.decrypt = D.prototype.encrypt;
        var O = function (e) {
            if (!(this instanceof O)) throw Error("Counter must be instanitated with `new`");
            0 === e || e || (e = 1), "number" == typeof e ? (this._counter = i(16), this.setValue(e)) : this.setBytes(e)
        };
        O.prototype.setValue = function (e) {
            if ("number" != typeof e || parseInt(e) != e) throw new Error("invalid counter value (must be an integer)");
            if (e > Number.MAX_SAFE_INTEGER) throw new Error("integer value out of safe range");
            for (var t = 15; t >= 0; --t) this._counter[t] = e % 256, e = parseInt(e / 256)
        }, O.prototype.setBytes = function (e) {
            if (16 != (e = o(e, !0)).length) throw new Error("invalid counter bytes size (must be 16 bytes)");
            this._counter = e
        }, O.prototype.increment = function () {
            for (var e = 15; e >= 0; e--) {
                if (255 !== this._counter[e]) {
                    this._counter[e]++;
                    break
                }
                this._counter[e] = 0
            }
        };
        var M = function (e, t) {
            if (!(this instanceof M)) throw Error("AES must be instanitated with `new`");
            this.description = "Counter", this.name = "ctr", t instanceof O || (t = new O(t)), this._counter = t, this._remainingCounter = null, this._remainingCounterIndex = 16, this._aes = new T(e)
        };
        M.prototype.encrypt = function (e) {
            for (var t = o(e, !0), n = 0; n < t.length; n++) 16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()), t[n] ^= this._remainingCounter[this._remainingCounterIndex++];
            return t
        }, M.prototype.decrypt = M.prototype.encrypt;
        var I = {
            AES: T, Counter: O, ModeOfOperation: {ecb: L, cbc: A, cfb: R, ofb: D, ctr: M}, utils: {hex: c, utf8: l}, padding: {
                pkcs7: {
                    pad: function (e) {
                        var t = 16 - (e = o(e, !0)).length % 16, n = i(e.length + t);
                        s(e, n);
                        for (var r = e.length; r < n.length; r++) n[r] = t;
                        return n
                    }, strip: function (e) {
                        if ((e = o(e, !0)).length < 16) throw new Error("PKCS#7 invalid length");
                        var t = e[e.length - 1];
                        if (t > 16) throw new Error("PKCS#7 padding byte out of range");
                        for (var n = e.length - t, r = 0; r < t; r++) if (e[n + r] !== t) throw new Error("PKCS#7 invalid padding byte");
                        var a = i(n);
                        return s(e, a, 0, 0, n), a
                    }
                }
            }, _arrayTest: {coerceArray: o, createArray: i, copyArray: s}
        };
        e.exports = I
    }()
}

,
1807
:
e => {
    var t = !("undefined" == typeof window || !window.document || !window.document.createElement);
    e.exports = t
}, 2152
:

function (e) {
    var t;
    t = function () {
        return function () {
            var e = {
                686: function (e, t, n) {
                    "use strict";
                    n.d(t, {
                        default: function () {
                            return w
                        }
                    });
                    var r = n(279), o = n.n(r), i = n(370), s = n.n(i), a = n(817), l = n.n(a);

                    function c(e) {
                        try {
                            return document.execCommand(e)
                        } catch (e) {
                            return !1
                        }
                    }

                    var u = function (e) {
                        var t = l()(e);
                        return c("cut"), t
                    }, d = function (e, t) {
                        var n = function (e) {
                            var t = "rtl" === document.documentElement.getAttribute("dir"), n = document.createElement("textarea");
                            n.style.fontSize = "12pt", n.style.border = "0", n.style.padding = "0", n.style.margin = "0", n.style.position = "absolute", n.style[t ? "right" : "left"] = "-9999px";
                            var r = window.pageYOffset || document.documentElement.scrollTop;
                            return n.style.top = "".concat(r, "px"), n.setAttribute("readonly", ""), n.value = e, n
                        }(e);
                        t.container.appendChild(n);
                        var r = l()(n);
                        return c("copy"), n.remove(), r
                    }, h = function (e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {container: document.body}, n = "";
                        return "string" == typeof e ? n = d(e, t) : e instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(null == e ? void 0 : e.type) ? n = d(e.value, t) : (n = l()(e), c("copy")), n
                    };

                    function p(e) {
                        return p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }, p(e)
                    }

                    function f(e) {
                        return f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }, f(e)
                    }

                    function m(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }

                    function v(e, t) {
                        return v = Object.setPrototypeOf || function (e, t) {
                            return e.__proto__ = t, e
                        }, v(e, t)
                    }

                    function g(e) {
                        return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                            return e.__proto__ || Object.getPrototypeOf(e)
                        }, g(e)
                    }

                    function b(e, t) {
                        var n = "data-clipboard-".concat(e);
                        if (t.hasAttribute(n)) return t.getAttribute(n)
                    }

                    var y = function (e) {
                        !function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                            e.prototype = Object.create(t && t.prototype, {constructor: {value: e, writable: !0, configurable: !0}}), t && v(e, t)
                        }(l, e);
                        var t, n, r, o, i, a = (o = l, i = function () {
                            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                            if (Reflect.construct.sham) return !1;
                            if ("function" == typeof Proxy) return !0;
                            try {
                                return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {
                                }))), !0
                            } catch (e) {
                                return !1
                            }
                        }(), function () {
                            var e, t = g(o);
                            if (i) {
                                var n = g(this).constructor;
                                e = Reflect.construct(t, arguments, n)
                            } else e = t.apply(this, arguments);
                            return function (e, t) {
                                return !t || "object" !== f(t) && "function" != typeof t ? function (e) {
                                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return e
                                }(e) : t
                            }(this, e)
                        });

                        function l(e, t) {
                            var n;
                            return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, l), (n = a.call(this)).resolveOptions(t), n.listenClick(e), n
                        }

                        return t = l, n = [{
                            key: "resolveOptions", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === f(e.container) ? e.container : document.body
                            }
                        }, {
                            key: "listenClick", value: function (e) {
                                var t = this;
                                this.listener = s()(e, "click", (function (e) {
                                    return t.onClick(e)
                                }))
                            }
                        }, {
                            key: "onClick", value: function (e) {
                                var t = e.delegateTarget || e.currentTarget, n = this.action(t) || "copy", r = function () {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.action, n = void 0 === t ? "copy" : t, r = e.container,
                                        o = e.target, i = e.text;
                                    if ("copy" !== n && "cut" !== n) throw new Error('Invalid "action" value, use either "copy" or "cut"');
                                    if (void 0 !== o) {
                                        if (!o || "object" !== p(o) || 1 !== o.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                        if ("copy" === n && o.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                        if ("cut" === n && (o.hasAttribute("readonly") || o.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                                    }
                                    return i ? h(i, {container: r}) : o ? "cut" === n ? u(o) : h(o, {container: r}) : void 0
                                }({action: n, container: this.container, target: this.target(t), text: this.text(t)});
                                this.emit(r ? "success" : "error", {
                                    action: n, text: r, trigger: t, clearSelection: function () {
                                        t && t.focus(), window.getSelection().removeAllRanges()
                                    }
                                })
                            }
                        }, {
                            key: "defaultAction", value: function (e) {
                                return b("action", e)
                            }
                        }, {
                            key: "defaultTarget", value: function (e) {
                                var t = b("target", e);
                                if (t) return document.querySelector(t)
                            }
                        }, {
                            key: "defaultText", value: function (e) {
                                return b("text", e)
                            }
                        }, {
                            key: "destroy", value: function () {
                                this.listener.destroy()
                            }
                        }], r = [{
                            key: "copy", value: function (e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {container: document.body};
                                return h(e, t)
                            }
                        }, {
                            key: "cut", value: function (e) {
                                return u(e)
                            }
                        }, {
                            key: "isSupported", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"], t = "string" == typeof e ? [e] : e,
                                    n = !!document.queryCommandSupported;
                                return t.forEach((function (e) {
                                    n = n && !!document.queryCommandSupported(e)
                                })), n
                            }
                        }], n && m(t.prototype, n), r && m(t, r), l
                    }(o()), w = y
                }, 828: function (e) {
                    if ("undefined" != typeof Element && !Element.prototype.matches) {
                        var t = Element.prototype;
                        t.matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector
                    }
                    e.exports = function (e, t) {
                        for (; e && 9 !== e.nodeType;) {
                            if ("function" == typeof e.matches && e.matches(t)) return e;
                            e = e.parentNode
                        }
                    }
                }, 438: function (e, t, n) {
                    var r = n(828);

                    function o(e, t, n, r, o) {
                        var s = i.apply(this, arguments);
                        return e.addEventListener(n, s, o), {
                            destroy: function () {
                                e.removeEventListener(n, s, o)
                            }
                        }
                    }

                    function i(e, t, n, o) {
                        return function (n) {
                            n.delegateTarget = r(n.target, t), n.delegateTarget && o.call(e, n)
                        }
                    }

                    e.exports = function (e, t, n, r, i) {
                        return "function" == typeof e.addEventListener ? o.apply(null, arguments) : "function" == typeof n ? o.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, (function (e) {
                            return o(e, t, n, r, i)
                        })))
                    }
                }, 879: function (e, t) {
                    t.node = function (e) {
                        return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
                    }, t.nodeList = function (e) {
                        var n = Object.prototype.toString.call(e);
                        return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0]))
                    }, t.string = function (e) {
                        return "string" == typeof e || e instanceof String
                    }, t.fn = function (e) {
                        return "[object Function]" === Object.prototype.toString.call(e)
                    }
                }, 370: function (e, t, n) {
                    var r = n(879), o = n(438);
                    e.exports = function (e, t, n) {
                        if (!e && !t && !n) throw new Error("Missing required arguments");
                        if (!r.string(t)) throw new TypeError("Second argument must be a String");
                        if (!r.fn(n)) throw new TypeError("Third argument must be a Function");
                        if (r.node(e)) return function (e, t, n) {
                            return e.addEventListener(t, n), {
                                destroy: function () {
                                    e.removeEventListener(t, n)
                                }
                            }
                        }(e, t, n);
                        if (r.nodeList(e)) return function (e, t, n) {
                            return Array.prototype.forEach.call(e, (function (e) {
                                e.addEventListener(t, n)
                            })), {
                                destroy: function () {
                                    Array.prototype.forEach.call(e, (function (e) {
                                        e.removeEventListener(t, n)
                                    }))
                                }
                            }
                        }(e, t, n);
                        if (r.string(e)) return function (e, t, n) {
                            return o(document.body, e, t, n)
                        }(e, t, n);
                        throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                    }
                }, 817: function (e) {
                    e.exports = function (e) {
                        var t;
                        if ("SELECT" === e.nodeName) e.focus(), t = e.value; else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                            var n = e.hasAttribute("readonly");
                            n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
                        } else {
                            e.hasAttribute("contenteditable") && e.focus();
                            var r = window.getSelection(), o = document.createRange();
                            o.selectNodeContents(e), r.removeAllRanges(), r.addRange(o), t = r.toString()
                        }
                        return t
                    }
                }, 279: function (e) {
                    function t() {
                    }

                    t.prototype = {
                        on: function (e, t, n) {
                            var r = this.e || (this.e = {});
                            return (r[e] || (r[e] = [])).push({fn: t, ctx: n}), this
                        }, once: function (e, t, n) {
                            var r = this;

                            function o() {
                                r.off(e, o), t.apply(n, arguments)
                            }

                            return o._ = t, this.on(e, o, n)
                        }, emit: function (e) {
                            for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, o = n.length; r < o; r++) n[r].fn.apply(n[r].ctx, t);
                            return this
                        }, off: function (e, t) {
                            var n = this.e || (this.e = {}), r = n[e], o = [];
                            if (r && t) for (var i = 0, s = r.length; i < s; i++) r[i].fn !== t && r[i].fn._ !== t && o.push(r[i]);
                            return o.length ? n[e] = o : delete n[e], this
                        }
                    }, e.exports = t, e.exports.TinyEmitter = t
                }
            }, t = {};

            function n(r) {
                if (t[r]) return t[r].exports;
                var o = t[r] = {exports: {}};
                return e[r](o, o.exports, n), o.exports
            }

            return n.n = function (e) {
                var t = e && e.__esModule ? function () {
                    return e.default
                } : function () {
                    return e
                };
                return n.d(t, {a: t}), t
            }, n.d = function (e, t) {
                for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
            }, n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, n(686)
        }().default
    }, e.exports = t()
}

,
9843
:
(e, t, n) => {
    e.exports = {ResizeSensor: n(6087), ElementQueries: n(6456)}
}, 6456
:

function (e, t, n) {
    "use strict";
    var r, o, i;
    "undefined" != typeof window && window, o = [n(6087)], void 0 === (i = "function" == typeof (r = function (e) {
        var t = function () {
            var t, n = {}, r = [];

            function o(e) {
                e || (e = document.documentElement);
                var t = window.getComputedStyle(e, null).fontSize;
                return parseFloat(t) || 16
            }

            function i(e, t) {
                var n = t.split(/\d/), r = n[n.length - 1];
                switch (t = parseFloat(t), r) {
                    case"px":
                    default:
                        return t;
                    case"em":
                        return t * o(e);
                    case"rem":
                        return t * o();
                    case"vw":
                        return t * document.documentElement.clientWidth / 100;
                    case"vh":
                        return t * document.documentElement.clientHeight / 100;
                    case"vmin":
                    case"vmax":
                        var i = document.documentElement.clientWidth / 100, s = document.documentElement.clientHeight / 100;
                        return t * (0, Math["vmin" === r ? "min" : "max"])(i, s)
                }
            }

            function s(e, t) {
                var r, o, s, a, l, c, u, d;
                this.element = e;
                var h = ["min-width", "min-height", "max-width", "max-height"];
                this.call = function () {
                    for (r in s = function (e) {
                        if (!e.getBoundingClientRect) return {width: e.offsetWidth, height: e.offsetHeight};
                        var t = e.getBoundingClientRect();
                        return {width: Math.round(t.width), height: Math.round(t.height)}
                    }(this.element), c = {}, n[t]) n[t].hasOwnProperty(r) && (o = n[t][r], a = i(this.element, o.value), l = "width" === o.property ? s.width : s.height, d = o.mode + "-" + o.property, u = "", "min" === o.mode && l >= a && (u += o.value), "max" === o.mode && l <= a && (u += o.value), c[d] || (c[d] = ""), u && -1 === (" " + c[d] + " ").indexOf(" " + u + " ") && (c[d] += " " + u));
                    for (var e in h) h.hasOwnProperty(e) && (c[h[e]] ? this.element.setAttribute(h[e], c[h[e]].substr(1)) : this.element.removeAttribute(h[e]))
                }
            }

            function a(t, n) {
                t.elementQueriesSetupInformation || (t.elementQueriesSetupInformation = new s(t, n)), t.elementQueriesSensor || (t.elementQueriesSensor = new e(t, (function () {
                    t.elementQueriesSetupInformation.call()
                })))
            }

            function l(e, o, i, s) {
                if (void 0 === n[e]) {
                    n[e] = [];
                    var a = r.length;
                    t.innerHTML += "\n" + e + " {animation: 0.1s element-queries;}", t.innerHTML += "\n" + e + " > .resize-sensor {min-width: " + a + "px;}", r.push(e)
                }
                n[e].push({mode: o, property: i, value: s})
            }

            function c(e) {
                var t;
                if (document.querySelectorAll && (t = e ? e.querySelectorAll.bind(e) : document.querySelectorAll.bind(document)), t || "undefined" == typeof $$ || (t = $$), t || "undefined" == typeof jQuery || (t = jQuery), !t) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
                return t
            }

            function u(t) {
                var n = [], r = [], o = [], i = 0, s = -1, a = [];
                for (var l in t.children) if (t.children.hasOwnProperty(l) && t.children[l].tagName && "img" === t.children[l].tagName.toLowerCase()) {
                    n.push(t.children[l]);
                    var c = t.children[l].getAttribute("min-width") || t.children[l].getAttribute("data-min-width"),
                        u = t.children[l].getAttribute("data-src") || t.children[l].getAttribute("url");
                    o.push(u);
                    var d = {minWidth: c};
                    r.push(d), c ? t.children[l].style.display = "none" : (i = n.length - 1, t.children[l].style.display = "block")
                }

                function h() {
                    var e, l = !1;
                    for (e in n) n.hasOwnProperty(e) && r[e].minWidth && t.offsetWidth > r[e].minWidth && (l = e);
                    if (l || (l = i), s !== l) if (a[l]) n[s].style.display = "none", n[l].style.display = "block", s = l; else {
                        var c = new Image;
                        c.onload = function () {
                            n[l].src = o[l], n[s].style.display = "none", n[l].style.display = "block", a[l] = !0, s = l
                        }, c.src = o[l]
                    } else n[l].src = o[l]
                }

                s = i, t.resizeSensorInstance = new e(t, h), h()
            }

            var d = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/gim,
                h = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/gim;

            function p(e) {
                var t, n, r, o;
                for (e = e.replace(/'/g, '"'); null !== (t = d.exec(e));) for (n = t[1] + t[3], r = t[2]; null !== (o = h.exec(r));) l(n, o[1], o[2], o[3])
            }

            function f(e) {
                var t = "";
                if (e) if ("string" == typeof e) -1 === (e = e.toLowerCase()).indexOf("min-width") && -1 === e.indexOf("max-width") || p(e); else for (var n = 0, r = e.length; n < r; n++) 1 === e[n].type ? -1 !== (t = e[n].selectorText || e[n].cssText).indexOf("min-height") || -1 !== t.indexOf("max-height") ? p(t) : -1 === t.indexOf("min-width") && -1 === t.indexOf("max-width") || p(t) : 4 === e[n].type ? f(e[n].cssRules || e[n].rules) : 3 === e[n].type && e[n].styleSheet.hasOwnProperty("cssRules") && f(e[n].styleSheet.cssRules)
            }

            var m = !1;
            this.init = function () {
                var n = "animationstart";
                void 0 !== document.documentElement.style.webkitAnimationName ? n = "webkitAnimationStart" : void 0 !== document.documentElement.style.MozAnimationName ? n = "mozanimationstart" : void 0 !== document.documentElement.style.OAnimationName && (n = "oanimationstart"), document.body.addEventListener(n, (function (t) {
                    var n = t.target, o = n && window.getComputedStyle(n, null), i = o && o.getPropertyValue("animation-name");
                    if (i && -1 !== i.indexOf("element-queries")) {
                        n.elementQueriesSensor = new e(n, (function () {
                            n.elementQueriesSetupInformation && n.elementQueriesSetupInformation.call()
                        }));
                        var s = window.getComputedStyle(n.resizeSensor, null).getPropertyValue("min-width");
                        s = parseInt(s.replace("px", "")), a(t.target, r[s])
                    }
                })), m || ((t = document.createElement("style")).type = "text/css", t.innerHTML = "[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}", t.innerHTML += "\n@keyframes element-queries { 0% { visibility: inherit; } }", document.getElementsByTagName("head")[0].appendChild(t), m = !0);
                for (var o = 0, i = document.styleSheets.length; o < i; o++) try {
                    document.styleSheets[o].href && 0 === document.styleSheets[o].href.indexOf("file://") && console.warn("CssElementQueries: unable to parse local css files, " + document.styleSheets[o].href), f(document.styleSheets[o].cssRules || document.styleSheets[o].rules || document.styleSheets[o].cssText)
                } catch (e) {
                }
                !function () {
                    for (var e = c()("[data-responsive-image],[responsive-image]"), t = 0, n = e.length; t < n; t++) u(e[t])
                }()
            }, this.findElementQueriesElements = function (e) {
                !function (e) {
                    var t = c(e);
                    for (var r in n) if (n.hasOwnProperty(r)) for (var o = t(r, e), i = 0, s = o.length; i < s; i++) a(o[i], r)
                }(e)
            }, this.update = function () {
                this.init()
            }
        };
        t.update = function () {
            t.instance.update()
        }, t.detach = function (e) {
            e.elementQueriesSetupInformation ? (e.elementQueriesSensor.detach(), delete e.elementQueriesSetupInformation, delete e.elementQueriesSensor) : e.resizeSensorInstance && (e.resizeSensorInstance.detach(), delete e.resizeSensorInstance)
        }, t.init = function () {
            t.instance || (t.instance = new t), t.instance.init()
        };
        return t.findElementQueriesElements = function (e) {
            t.instance.findElementQueriesElements(e)
        }, t.listen = function () {
            !function (e) {
                if (document.addEventListener) document.addEventListener("DOMContentLoaded", e, !1); else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) var t = setInterval((function () {
                    /loaded|complete/i.test(document.readyState) && (e(), clearInterval(t))
                }), 10); else window.onload = e
            }(t.init)
        }, t
    }) ? r.apply(t, o) : r) || (e.exports = i)
}

,
6087
:

function (e, t, n) {
    "use strict";
    var r, o;
    "undefined" != typeof window && window, void 0 === (o = "function" == typeof (r = function () {
        if ("undefined" == typeof window) return null;
        var e = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(),
            t = e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || function (t) {
                return e.setTimeout(t, 20)
            }, n = e.cancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelAnimationFrame || function (t) {
                e.clearTimeout(t)
            };

        function r(e, t) {
            var n = Object.prototype.toString.call(e),
                r = "[object Array]" === n || "[object NodeList]" === n || "[object HTMLCollection]" === n || "[object Object]" === n || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements,
                o = 0, i = e.length;
            if (r) for (; o < i; o++) t(e[o]); else t(e)
        }

        function o(e) {
            if (!e.getBoundingClientRect) return {width: e.offsetWidth, height: e.offsetHeight};
            var t = e.getBoundingClientRect();
            return {width: Math.round(t.width), height: Math.round(t.height)}
        }

        function i(e, t) {
            Object.keys(t).forEach((function (n) {
                e.style[n] = t[n]
            }))
        }

        var s = function (e, a) {
            var l = 0;

            function c() {
                var e, t, n = [];
                this.add = function (e) {
                    n.push(e)
                }, this.call = function (r) {
                    for (e = 0, t = n.length; e < t; e++) n[e].call(this, r)
                }, this.remove = function (r) {
                    var o = [];
                    for (e = 0, t = n.length; e < t; e++) n[e] !== r && o.push(n[e]);
                    n = o
                }, this.length = function () {
                    return n.length
                }
            }

            function u(e, n) {
                if (e) if (e.resizedAttached) e.resizedAttached.add(n); else {
                    e.resizedAttached = new c, e.resizedAttached.add(n), e.resizeSensor = document.createElement("div"), e.resizeSensor.dir = "ltr", e.resizeSensor.className = "resize-sensor";
                    var r = {
                        pointerEvents: "none",
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        overflow: "hidden",
                        zIndex: "-1",
                        visibility: "hidden",
                        maxWidth: "100%"
                    }, s = {position: "absolute", left: "0px", top: "0px", transition: "0s"};
                    i(e.resizeSensor, r);
                    var a = document.createElement("div");
                    a.className = "resize-sensor-expand", i(a, r);
                    var u = document.createElement("div");
                    i(u, s), a.appendChild(u);
                    var d = document.createElement("div");
                    d.className = "resize-sensor-shrink", i(d, r);
                    var h = document.createElement("div");
                    i(h, s), i(h, {width: "200%", height: "200%"}), d.appendChild(h), e.resizeSensor.appendChild(a), e.resizeSensor.appendChild(d), e.appendChild(e.resizeSensor);
                    var p = window.getComputedStyle(e), f = p ? p.getPropertyValue("position") : null;
                    "absolute" !== f && "relative" !== f && "fixed" !== f && "sticky" !== f && (e.style.position = "relative");
                    var m = !1, v = 0, g = o(e), b = 0, y = 0, w = !0;
                    l = 0;
                    var S = function () {
                        if (w) {
                            if (0 === e.offsetWidth && 0 === e.offsetHeight) return void (l || (l = t((function () {
                                l = 0, S()
                            }))));
                            w = !1
                        }
                        var n, r;
                        n = e.offsetWidth, r = e.offsetHeight, u.style.width = n + 10 + "px", u.style.height = r + 10 + "px", a.scrollLeft = n + 10, a.scrollTop = r + 10, d.scrollLeft = n + 10, d.scrollTop = r + 10
                    };
                    e.resizeSensor.resetSensor = S;
                    var k = function () {
                        v = 0, m && (b = g.width, y = g.height, e.resizedAttached && e.resizedAttached.call(g))
                    }, x = function () {
                        g = o(e), (m = g.width !== b || g.height !== y) && !v && (v = t(k)), S()
                    }, E = function (e, t, n) {
                        e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n)
                    };
                    E(a, "scroll", x), E(d, "scroll", x), l = t((function () {
                        l = 0, S()
                    }))
                }
            }

            r(e, (function (e) {
                u(e, a)
            })), this.detach = function (t) {
                l || (n(l), l = 0), s.detach(e, t)
            }, this.reset = function () {
                e.resizeSensor.resetSensor()
            }
        };
        if (s.reset = function (e) {
            r(e, (function (e) {
                e.resizeSensor.resetSensor()
            }))
        }, s.detach = function (e, t) {
            r(e, (function (e) {
                e && (e.resizedAttached && "function" == typeof t && (e.resizedAttached.remove(t), e.resizedAttached.length()) || e.resizeSensor && (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached))
            }))
        }, "undefined" != typeof MutationObserver) {
            var a = new MutationObserver((function (e) {
                for (var t in e) if (e.hasOwnProperty(t)) for (var n = e[t].addedNodes, r = 0; r < n.length; r++) n[r].resizeSensor && s.reset(n[r])
            }));
            document.addEventListener("DOMContentLoaded", (function (e) {
                a.observe(document.body, {childList: !0, subtree: !0})
            }))
        }
        return s
    }) ? r.call(t, n, t, e) : r) || (e.exports = o)
}

,
1296
:
(e, t, n) => {
    var r = /^\s+|\s+$/g, o = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, s = /^0o[0-7]+$/i, a = parseInt, l = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
        c = "object" == typeof self && self && self.Object === Object && self, u = l || c || Function("return this")(), d = Object.prototype.toString, h = Math.max, p = Math.min,
        f = function () {
            return u.Date.now()
        };

    function m(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }

    function v(e) {
        if ("number" == typeof e) return e;
        if (function (e) {
            return "symbol" == typeof e || function (e) {
                return !!e && "object" == typeof e
            }(e) && "[object Symbol]" == d.call(e)
        }(e)) return NaN;
        if (m(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = m(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(r, "");
        var n = i.test(e);
        return n || s.test(e) ? a(e.slice(2), n ? 2 : 8) : o.test(e) ? NaN : +e
    }

    e.exports = function (e, t, n) {
        var r, o, i, s, a, l, c = 0, u = !1, d = !1, g = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");

        function b(t) {
            var n = r, i = o;
            return r = o = void 0, c = t, s = e.apply(i, n)
        }

        function y(e) {
            var n = e - l;
            return void 0 === l || n >= t || n < 0 || d && e - c >= i
        }

        function w() {
            var e = f();
            if (y(e)) return S(e);
            a = setTimeout(w, function (e) {
                var n = t - (e - l);
                return d ? p(n, i - (e - c)) : n
            }(e))
        }

        function S(e) {
            return a = void 0, g && r ? b(e) : (r = o = void 0, s)
        }

        function k() {
            var e = f(), n = y(e);
            if (r = arguments, o = this, l = e, n) {
                if (void 0 === a) return function (e) {
                    return c = e, a = setTimeout(w, t), u ? b(e) : s
                }(l);
                if (d) return a = setTimeout(w, t), b(l)
            }
            return void 0 === a && (a = setTimeout(w, t)), s
        }

        return t = v(t) || 0, m(n) && (u = !!n.leading, i = (d = "maxWait" in n) ? h(v(n.maxWait) || 0, t) : i, g = "trailing" in n ? !!n.trailing : g), k.cancel = function () {
            void 0 !== a && clearTimeout(a), c = 0, r = l = o = a = void 0
        }, k.flush = function () {
            return void 0 === a ? s : S(f())
        }, k
    }
}, 7221
:
(e, t, n) => {
    "use strict";
    n.r(t), n.d(t, {
        DocAnchorTarget: () => u,
        DocAnchorTrigger: () => f,
        DocBackToTop: () => g,
        DocBadge: () => y,
        DocCheckbox: () => E,
        DocCodeblock: () => Qe,
        DocCollapse: () => tt,
        DocDrawer: () => lt,
        DocDropdown: () => ht,
        DocEmoji: () => mt,
        DocHistory: () => Ft,
        DocIcon: () => Wt,
        DocIconAlignRight: () => Ni,
        DocIconArrowLeft: () => Vi,
        DocIconArrowRight: () => qi,
        DocIconArrowTop: () => Ui,
        DocIconBox: () => Gi,
        DocIconButton: () => Vt,
        DocIconCheck: () => Qi,
        DocIconCheckCircle: () => ns,
        DocIconChevronDown: () => is,
        DocIconChevronRight: () => ls,
        DocIconCopy: () => Xe,
        DocIconFile: () => ds,
        DocIconFilter: () => fs,
        DocIconFolder: () => bs,
        DocIconHistory: () => Ss,
        DocIconHome: () => Es,
        DocIconInfo: () => Ts,
        DocIconLayers: () => Rs,
        DocIconLink: () => Ms,
        DocIconMenu: () => Ps,
        DocIconMinus: () => Ws,
        DocIconMoon: () => js,
        DocIconMoreHorizontal: () => $s,
        DocIconPlus: () => Ks,
        DocIconSearch: () => Xs,
        DocIconShield: () => ea,
        DocIconSun: () => ra,
        DocIconX: () => sa,
        DocLoadingSpinner: () => zt,
        DocMember: () => Mn,
        DocMemberGroup: () => Nn,
        DocOverloadGroup: () => Bn,
        DocPanel: () => qn,
        DocPanels: () => $n,
        DocParameter: () => rr,
        DocParameters: () => ar,
        DocSearchDesktop: () => xr,
        DocSearchMobile: () => Lr,
        DocSidebar: () => uo,
        DocSidebarRight: () => Io,
        DocSwitch: () => Wo,
        DocTab: () => Bo,
        DocTabs: () => jo,
        DocThemeSwitch: () => qo,
        DocToolbar: () => Oi,
        DocToolbarMemberFilterNoResults: () => Fi
    });
    var r = n(5166), o = ["id"], i = n(5184), s = n(5543), a = n(9341);
    const l = (0, r.aZ)({
        name: "DocAnchorTarget", props: {id: {type: String, required: !0}}, setup: function (e) {
            var t = (0, a.oR)().store, n = (0, i.B)().scrollTo, o = (0, r.iH)("#".concat(e.id));

            function l() {
                n(o.value, {
                    offset: s.vE, onStart: function () {
                        t.actions.updateScrolledElementId(e.id)
                    }
                })
            }

            (0, r.bv)((function () {
                window.location.hash && decodeURIComponent(window.location.hash) === o.value && setTimeout((function () {
                    t.state.isScrollPositionRestored || (window.scrollTo(0, 0), setTimeout(l, 200))
                }), 1)
            }))
        }
    });
    var c = n(3744);
    const u = (0, c.Z)(l, [["render", function (e, t, n, i, s, a) {
        return (0, r.wg)(), (0, r.iD)("div", {id: e.id}, [(0, r.WI)(e.$slots, "default")], 8, o)
    }]]);
    var d = ["href", "tabindex", "aria-disabled"], h = n(6184);
    const p = (0, r.aZ)({
        name: "DocAnchorTrigger", props: {disabled: Boolean, to: {type: String, required: !0}}, emits: ["click"], setup: function (e, t) {
            var n = t.emit, o = (0, a.oR)().store, l = (0, i.B)().scrollTo;
            return {
                onClick: function (t) {
                    (0, s.pI)(t) || (t.preventDefault(), (0, h.Vn)(e.to), n("click"), l(e.to, {
                        offset: (0, s.vE)(), onStart: function () {
                            var t = "#" === e.to.charAt(0) ? e.to.substr(1) : e.to;
                            o.actions.updateScrolledElementId(t)
                        }
                    }))
                }, tabindex: (0, r.Fl)((function () {
                    return e.disabled ? "-1" : null
                }))
            }
        }
    }), f = (0, c.Z)(p, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("a", {
            href: e.to, tabindex: e.tabindex, "aria-disabled": e.disabled, onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onClick && e.onClick.apply(e, t)
            })
        }, [(0, r.WI)(e.$slots, "default")], 8, d)
    }]]);
    var m = n(7023);
    const v = (0, r.aZ)({
        name: "DocBackToTop", setup: function () {
            var e = (0, r.iH)(!1), t = (0, i.B)().scrollTo;
            return (0, m.zX)(window, "scroll", (function () {
                document.documentElement.scrollTop > 350 ? e.value = !0 : e.value = !1
            })), {
                onClick: function () {
                    t("body")
                }, show: e
            }
        }
    }), g = (0, c.Z)(v, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-arrow-top"), l = (0, r.up)("doc-icon");
        return (0, r.wg)(), (0, r.j4)(r.uT, {
            "enter-from-class": "translate-y-4 opacity-0",
            "enter-to-class": "translate-y-0 opacity-100",
            "leave-from-class": "translate-y-0 opacity-100",
            "leave-to-class": "translate-y-4 opacity-0"
        }, {
            default: (0, r.w5)((function () {
                return [e.show ? ((0, r.wg)(), (0, r.iD)("button", {
                    key: 0,
                    class: "fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-70 hover:bg-gray-200 dark:bg-dark-850 dark:hover:bg-dark-450 z-40 focus:outline-none transition duration-300 linear border border-gray-400 border-opacity-50 hover:border-opacity-10 dark:border-dark-450 dark:bg-opacity-70",
                    onClick: t[0] || (t[0] = function () {
                        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        return e.onClick && e.onClick.apply(e, t)
                    })
                }, [(0, r.Wm)(l, {class: "w-7 h-7 text-blue-500 dark:text-blue-400"}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(a)]
                    })), _: 1
                })])) : (0, r.kq)("", !0)]
            })), _: 1
        })
    }]]), b = (0, r.aZ)({
        name: "DocBadge", props: {type: {type: String, default: ""}}, setup: function (e) {
            var t = (0, r.Fl)((function () {
                return e.type.trim()
            }));
            return {
                badgeClasses: (0, r.Fl)((function () {
                    switch (t.value) {
                        case"bindable":
                            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500 dark:text-white";
                        case"required":
                            return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500 dark:text-white";
                        case"internal":
                            return "bg-gray-700 text-white";
                        case"private":
                        case"primary":
                        case"static":
                            return "bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white";
                        case"warning":
                        case"readonly":
                            return "bg-orange-100 text-orange-700 dark:bg-orange-500 dark:text-white";
                        case"chainable":
                        case"public":
                        case"success":
                            return "bg-green-100 text-green-700 dark:bg-green-500 dark:text-white";
                        case"template":
                        case"info":
                            return "bg-teal-100 text-teal-700 dark:bg-teal-500 dark:text-white";
                        case"deprecated":
                        case"removed":
                        case"danger":
                            return "bg-red-100 text-red-700 dark:bg-red-500 dark:text-white";
                        default:
                            return "bg-gray-200 text-gray-900 dark:bg-dark-550 dark:text-dark-250"
                    }
                }))
            }
        }
    }), y = (0, c.Z)(b, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("span", {class: (0, r.C_)(["inline-flex items-center justify-center h-6 px-2 text-xs font-medium leading-none whitespace-nowrap rounded", e.badgeClasses])}, [(0, r.WI)(e.$slots, "default")], 2)
    }]]);
    var w = {class: "inline-flex py-1.5 cursor-pointer select-none"}, S = ["value"], k = {class: "inline-block ml-2"};
    const x = (0, r.aZ)({
        name: "DocCheckbox", props: {value: [Boolean, String], modelValue: [Boolean, Array]}, emits: ["update:modelValue"], setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(e.modelValue), i = (0, r.iH)(!1), s = (0, r.Fl)({
                get: function () {
                    return o.value
                }, set: function (e) {
                    o.value = e, n("update:modelValue", o.value)
                }
            }), a = (0, r.Fl)((function () {
                return Array.isArray(e.modelValue) ? e.modelValue.includes(e.value) : e.modelValue
            })), l = (0, r.Fl)((function () {
                return [{"border-blue-500 bg-blue-500": a.value}, {"border-gray-400 bg-gray-100": !a.value}, {"shadow-outline": i.value}]
            }));
            return (0, r.YP)((function () {
                return e.modelValue
            }), (function (e) {
                return o.value = e
            })), {localValue: o, computedValue: s, isChecked: a, isFocused: i, checkboxClasses: l}
        }
    }), E = (0, c.Z)(x, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-check"), l = (0, r.up)("doc-icon");
        return (0, r.wg)(), (0, r.iD)("label", w, [(0, r._)("div", {class: (0, r.C_)(["w-4 h-4 mt-px border rounded-sm", e.checkboxClasses])}, [(0, r.wy)((0, r.Wm)(l, {
            width: "14",
            height: "14",
            class: "text-white"
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }, 512), [[r.F8, e.isChecked]])], 2), (0, r.wy)((0, r._)("input", {
            "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                return e.computedValue = t
            }), class: "absolute opacity-0 hidden", style: {"z-index": "-1"}, type: "checkbox", value: e.value, onFocus: t[1] || (t[1] = function (t) {
                return e.isFocused = !0
            }), onBlur: t[2] || (t[2] = function (t) {
                return e.isFocused = !1
            })
        }, null, 40, S), [[r.e8, e.computedValue]]), (0, r._)("span", k, [(0, r.WI)(e.$slots, "default")])])
    }]]);
    var _ = {class: "absolute top-0 right-0 z-5"}, C = ["innerHTML"], T = n(4430), L = {class: "whitespace-nowrap"}, A = n(9984), R = n.n(A), D = n(2152), O = n.n(D),
        M = function (e) {
            return (0, r.dD)("data-v-325bee49"), e = e(), (0, r.Cn)(), e
        }, I = {key: 0, ref: "tooltip", class: "z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded dark:bg-dark-500 tooltip"}, F = M((function () {
            return (0, r._)("div", {class: "arrow", "data-popper-arrow": ""}, null, -1)
        }));

    function P(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function H(e) {
        return e instanceof P(e).Element || e instanceof Element
    }

    function N(e) {
        return e instanceof P(e).HTMLElement || e instanceof HTMLElement
    }

    function W(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof P(e).ShadowRoot || e instanceof ShadowRoot)
    }

    var B = Math.max, V = Math.min, j = Math.round;

    function z() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function (e) {
            return e.brand + "/" + e.version
        })).join(" ") : navigator.userAgent
    }

    function q() {
        return !/^((?!chrome|android).)*safari/i.test(z())
    }

    function $(e, t, n) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        var r = e.getBoundingClientRect(), o = 1, i = 1;
        t && N(e) && (o = e.offsetWidth > 0 && j(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && j(r.height) / e.offsetHeight || 1);
        var s = (H(e) ? P(e) : window).visualViewport, a = !q() && n, l = (r.left + (a && s ? s.offsetLeft : 0)) / o, c = (r.top + (a && s ? s.offsetTop : 0)) / i, u = r.width / o,
            d = r.height / i;
        return {width: u, height: d, top: c, right: l + u, bottom: c + d, left: l, x: l, y: c}
    }

    function Z(e) {
        var t = P(e);
        return {scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset}
    }

    function U(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function K(e) {
        return ((H(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function Y(e) {
        return $(K(e)).left + Z(e).scrollLeft
    }

    function G(e) {
        return P(e).getComputedStyle(e)
    }

    function X(e) {
        var t = G(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r)
    }

    function J(e, t, n) {
        void 0 === n && (n = !1);
        var r, o, i = N(t), s = N(t) && function (e) {
            var t = e.getBoundingClientRect(), n = j(t.width) / e.offsetWidth || 1, r = j(t.height) / e.offsetHeight || 1;
            return 1 !== n || 1 !== r
        }(t), a = K(t), l = $(e, s, n), c = {scrollLeft: 0, scrollTop: 0}, u = {x: 0, y: 0};
        return (i || !i && !n) && (("body" !== U(t) || X(a)) && (c = (r = t) !== P(r) && N(r) ? {
            scrollLeft: (o = r).scrollLeft,
            scrollTop: o.scrollTop
        } : Z(r)), N(t) ? ((u = $(t, !0)).x += t.clientLeft, u.y += t.clientTop) : a && (u.x = Y(a))), {
            x: l.left + c.scrollLeft - u.x,
            y: l.top + c.scrollTop - u.y,
            width: l.width,
            height: l.height
        }
    }

    function Q(e) {
        var t = $(e), n = e.offsetWidth, r = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {x: e.offsetLeft, y: e.offsetTop, width: n, height: r}
    }

    function ee(e) {
        return "html" === U(e) ? e : e.assignedSlot || e.parentNode || (W(e) ? e.host : null) || K(e)
    }

    function te(e) {
        return ["html", "body", "#document"].indexOf(U(e)) >= 0 ? e.ownerDocument.body : N(e) && X(e) ? e : te(ee(e))
    }

    function ne(e, t) {
        var n;
        void 0 === t && (t = []);
        var r = te(e), o = r === (null == (n = e.ownerDocument) ? void 0 : n.body), i = P(r), s = o ? [i].concat(i.visualViewport || [], X(r) ? r : []) : r, a = t.concat(s);
        return o ? a : a.concat(ne(ee(s)))
    }

    function re(e) {
        return ["table", "td", "th"].indexOf(U(e)) >= 0
    }

    function oe(e) {
        return N(e) && "fixed" !== G(e).position ? e.offsetParent : null
    }

    function ie(e) {
        for (var t = P(e), n = oe(e); n && re(n) && "static" === G(n).position;) n = oe(n);
        return n && ("html" === U(n) || "body" === U(n) && "static" === G(n).position) ? t : n || function (e) {
            var t = /firefox/i.test(z());
            if (/Trident/i.test(z()) && N(e) && "fixed" === G(e).position) return null;
            var n = ee(e);
            for (W(n) && (n = n.host); N(n) && ["html", "body"].indexOf(U(n)) < 0;) {
                var r = G(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
                n = n.parentNode
            }
            return null
        }(e) || t
    }

    var se = "top", ae = "bottom", le = "right", ce = "left", ue = "auto", de = [se, ae, le, ce], he = "start", pe = "end", fe = "viewport", me = "popper",
        ve = de.reduce((function (e, t) {
            return e.concat([t + "-" + he, t + "-" + pe])
        }), []), ge = [].concat(de, [ue]).reduce((function (e, t) {
            return e.concat([t, t + "-" + he, t + "-" + pe])
        }), []), be = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function ye(e) {
        var t = new Map, n = new Set, r = [];

        function o(e) {
            n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function (e) {
                if (!n.has(e)) {
                    var r = t.get(e);
                    r && o(r)
                }
            })), r.push(e)
        }

        return e.forEach((function (e) {
            t.set(e.name, e)
        })), e.forEach((function (e) {
            n.has(e.name) || o(e)
        })), r
    }

    var we = {placement: "bottom", modifiers: [], strategy: "absolute"};

    function Se() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function ke(e) {
        void 0 === e && (e = {});
        var t = e, n = t.defaultModifiers, r = void 0 === n ? [] : n, o = t.defaultOptions, i = void 0 === o ? we : o;
        return function (e, t, n) {
            void 0 === n && (n = i);
            var o, s, a = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, we, i),
                modifiersData: {},
                elements: {reference: e, popper: t},
                attributes: {},
                styles: {}
            }, l = [], c = !1, u = {
                state: a, setOptions: function (n) {
                    var o = "function" == typeof n ? n(a.options) : n;
                    d(), a.options = Object.assign({}, i, a.options, o), a.scrollParents = {reference: H(e) ? ne(e) : e.contextElement ? ne(e.contextElement) : [], popper: ne(t)};
                    var s, c, h = function (e) {
                        var t = ye(e);
                        return be.reduce((function (e, n) {
                            return e.concat(t.filter((function (e) {
                                return e.phase === n
                            })))
                        }), [])
                    }((s = [].concat(r, a.options.modifiers), c = s.reduce((function (e, t) {
                        var n = e[t.name];
                        return e[t.name] = n ? Object.assign({}, n, t, {options: Object.assign({}, n.options, t.options), data: Object.assign({}, n.data, t.data)}) : t, e
                    }), {}), Object.keys(c).map((function (e) {
                        return c[e]
                    }))));
                    return a.orderedModifiers = h.filter((function (e) {
                        return e.enabled
                    })), a.orderedModifiers.forEach((function (e) {
                        var t = e.name, n = e.options, r = void 0 === n ? {} : n, o = e.effect;
                        if ("function" == typeof o) {
                            var i = o({state: a, name: t, instance: u, options: r});
                            l.push(i || function () {
                            })
                        }
                    })), u.update()
                }, forceUpdate: function () {
                    if (!c) {
                        var e = a.elements, t = e.reference, n = e.popper;
                        if (Se(t, n)) {
                            a.rects = {
                                reference: J(t, ie(n), "fixed" === a.options.strategy),
                                popper: Q(n)
                            }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function (e) {
                                return a.modifiersData[e.name] = Object.assign({}, e.data)
                            }));
                            for (var r = 0; r < a.orderedModifiers.length; r++) if (!0 !== a.reset) {
                                var o = a.orderedModifiers[r], i = o.fn, s = o.options, l = void 0 === s ? {} : s, d = o.name;
                                "function" == typeof i && (a = i({state: a, options: l, name: d, instance: u}) || a)
                            } else a.reset = !1, r = -1
                        }
                    }
                }, update: (o = function () {
                    return new Promise((function (e) {
                        u.forceUpdate(), e(a)
                    }))
                }, function () {
                    return s || (s = new Promise((function (e) {
                        Promise.resolve().then((function () {
                            s = void 0, e(o())
                        }))
                    }))), s
                }), destroy: function () {
                    d(), c = !0
                }
            };
            if (!Se(e, t)) return u;

            function d() {
                l.forEach((function (e) {
                    return e()
                })), l = []
            }

            return u.setOptions(n).then((function (e) {
                !c && n.onFirstUpdate && n.onFirstUpdate(e)
            })), u
        }
    }

    var xe = {passive: !0};

    function Ee(e) {
        return e.split("-")[0]
    }

    function _e(e) {
        return e.split("-")[1]
    }

    function Ce(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }

    function Te(e) {
        var t, n = e.reference, r = e.element, o = e.placement, i = o ? Ee(o) : null, s = o ? _e(o) : null, a = n.x + n.width / 2 - r.width / 2,
            l = n.y + n.height / 2 - r.height / 2;
        switch (i) {
            case se:
                t = {x: a, y: n.y - r.height};
                break;
            case ae:
                t = {x: a, y: n.y + n.height};
                break;
            case le:
                t = {x: n.x + n.width, y: l};
                break;
            case ce:
                t = {x: n.x - r.width, y: l};
                break;
            default:
                t = {x: n.x, y: n.y}
        }
        var c = i ? Ce(i) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (s) {
                case he:
                    t[c] = t[c] - (n[u] / 2 - r[u] / 2);
                    break;
                case pe:
                    t[c] = t[c] + (n[u] / 2 - r[u] / 2)
            }
        }
        return t
    }

    var Le = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

    function Ae(e) {
        var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, l = e.gpuAcceleration, c = e.adaptive, u = e.roundOffsets,
            d = e.isFixed, h = s.x, p = void 0 === h ? 0 : h, f = s.y, m = void 0 === f ? 0 : f, v = "function" == typeof u ? u({x: p, y: m}) : {x: p, y: m};
        p = v.x, m = v.y;
        var g = s.hasOwnProperty("x"), b = s.hasOwnProperty("y"), y = ce, w = se, S = window;
        if (c) {
            var k = ie(n), x = "clientHeight", E = "clientWidth";
            k === P(n) && "static" !== G(k = K(n)).position && "absolute" === a && (x = "scrollHeight", E = "scrollWidth"), (o === se || (o === ce || o === le) && i === pe) && (w = ae, m -= (d && k === S && S.visualViewport ? S.visualViewport.height : k[x]) - r.height, m *= l ? 1 : -1), o !== ce && (o !== se && o !== ae || i !== pe) || (y = le, p -= (d && k === S && S.visualViewport ? S.visualViewport.width : k[E]) - r.width, p *= l ? 1 : -1)
        }
        var _, C = Object.assign({position: a}, c && Le), T = !0 === u ? function (e, t) {
            var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
            return {x: j(n * o) / o || 0, y: j(r * o) / o || 0}
        }({x: p, y: m}, P(n)) : {x: p, y: m};
        return p = T.x, m = T.y, l ? Object.assign({}, C, ((_ = {})[w] = b ? "0" : "", _[y] = g ? "0" : "", _.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", _)) : Object.assign({}, C, ((t = {})[w] = b ? m + "px" : "", t[y] = g ? p + "px" : "", t.transform = "", t))
    }

    var Re = {left: "right", right: "left", bottom: "top", top: "bottom"};

    function De(e) {
        return e.replace(/left|right|bottom|top/g, (function (e) {
            return Re[e]
        }))
    }

    var Oe = {start: "end", end: "start"};

    function Me(e) {
        return e.replace(/start|end/g, (function (e) {
            return Oe[e]
        }))
    }

    function Ie(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && W(n)) {
            var r = t;
            do {
                if (r && e.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function Fe(e) {
        return Object.assign({}, e, {left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height})
    }

    function Pe(e, t, n) {
        return t === fe ? Fe(function (e, t) {
            var n = P(e), r = K(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
            if (o) {
                i = o.width, s = o.height;
                var c = q();
                (c || !c && "fixed" === t) && (a = o.offsetLeft, l = o.offsetTop)
            }
            return {width: i, height: s, x: a + Y(e), y: l}
        }(e, n)) : H(t) ? function (e, t) {
            var n = $(e, !1, "fixed" === t);
            return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n
        }(t, n) : Fe(function (e) {
            var t, n = K(e), r = Z(e), o = null == (t = e.ownerDocument) ? void 0 : t.body, i = B(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                s = B(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + Y(e), l = -r.scrollTop;
            return "rtl" === G(o || n).direction && (a += B(n.clientWidth, o ? o.clientWidth : 0) - i), {width: i, height: s, x: a, y: l}
        }(K(e)))
    }

    function He(e) {
        return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, e)
    }

    function Ne(e, t) {
        return t.reduce((function (t, n) {
            return t[n] = e, t
        }), {})
    }

    function We(e, t) {
        void 0 === t && (t = {});
        var n = t, r = n.placement, o = void 0 === r ? e.placement : r, i = n.strategy, s = void 0 === i ? e.strategy : i, a = n.boundary, l = void 0 === a ? "clippingParents" : a,
            c = n.rootBoundary, u = void 0 === c ? fe : c, d = n.elementContext, h = void 0 === d ? me : d, p = n.altBoundary, f = void 0 !== p && p, m = n.padding,
            v = void 0 === m ? 0 : m, g = He("number" != typeof v ? v : Ne(v, de)), b = h === me ? "reference" : me, y = e.rects.popper, w = e.elements[f ? b : h],
            S = function (e, t, n, r) {
                var o = "clippingParents" === t ? function (e) {
                    var t = ne(ee(e)), n = ["absolute", "fixed"].indexOf(G(e).position) >= 0 && N(e) ? ie(e) : e;
                    return H(n) ? t.filter((function (e) {
                        return H(e) && Ie(e, n) && "body" !== U(e)
                    })) : []
                }(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce((function (t, n) {
                    var o = Pe(e, n, r);
                    return t.top = B(o.top, t.top), t.right = V(o.right, t.right), t.bottom = V(o.bottom, t.bottom), t.left = B(o.left, t.left), t
                }), Pe(e, s, r));
                return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
            }(H(w) ? w : w.contextElement || K(e.elements.popper), l, u, s), k = $(e.elements.reference), x = Te({reference: k, element: y, strategy: "absolute", placement: o}),
            E = Fe(Object.assign({}, y, x)), _ = h === me ? E : k,
            C = {top: S.top - _.top + g.top, bottom: _.bottom - S.bottom + g.bottom, left: S.left - _.left + g.left, right: _.right - S.right + g.right},
            T = e.modifiersData.offset;
        if (h === me && T) {
            var L = T[o];
            Object.keys(C).forEach((function (e) {
                var t = [le, ae].indexOf(e) >= 0 ? 1 : -1, n = [se, ae].indexOf(e) >= 0 ? "y" : "x";
                C[e] += L[n] * t
            }))
        }
        return C
    }

    const Be = {
        name: "flip", enabled: !0, phase: "main", fn: function (e) {
            var t = e.state, n = e.options, r = e.name;
            if (!t.modifiersData[r]._skip) {
                for (var o = n.mainAxis, i = void 0 === o || o, s = n.altAxis, a = void 0 === s || s, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, h = n.altBoundary, p = n.flipVariations, f = void 0 === p || p, m = n.allowedAutoPlacements, v = t.options.placement, g = Ee(v), b = l || (g !== v && f ? function (e) {
                    if (Ee(e) === ue) return [];
                    var t = De(e);
                    return [Me(e), t, Me(t)]
                }(v) : [De(v)]), y = [v].concat(b).reduce((function (e, n) {
                    return e.concat(Ee(n) === ue ? function (e, t) {
                        void 0 === t && (t = {});
                        var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, l = n.allowedAutoPlacements, c = void 0 === l ? ge : l,
                            u = _e(r), d = u ? a ? ve : ve.filter((function (e) {
                                return _e(e) === u
                            })) : de, h = d.filter((function (e) {
                                return c.indexOf(e) >= 0
                            }));
                        0 === h.length && (h = d);
                        var p = h.reduce((function (t, n) {
                            return t[n] = We(e, {placement: n, boundary: o, rootBoundary: i, padding: s})[Ee(n)], t
                        }), {});
                        return Object.keys(p).sort((function (e, t) {
                            return p[e] - p[t]
                        }))
                    }(t, {placement: n, boundary: u, rootBoundary: d, padding: c, flipVariations: f, allowedAutoPlacements: m}) : n)
                }), []), w = t.rects.reference, S = t.rects.popper, k = new Map, x = !0, E = y[0], _ = 0; _ < y.length; _++) {
                    var C = y[_], T = Ee(C), L = _e(C) === he, A = [se, ae].indexOf(T) >= 0, R = A ? "width" : "height",
                        D = We(t, {placement: C, boundary: u, rootBoundary: d, altBoundary: h, padding: c}), O = A ? L ? le : ce : L ? ae : se;
                    w[R] > S[R] && (O = De(O));
                    var M = De(O), I = [];
                    if (i && I.push(D[T] <= 0), a && I.push(D[O] <= 0, D[M] <= 0), I.every((function (e) {
                        return e
                    }))) {
                        E = C, x = !1;
                        break
                    }
                    k.set(C, I)
                }
                if (x) for (var F = function (e) {
                    var t = y.find((function (t) {
                        var n = k.get(t);
                        if (n) return n.slice(0, e).every((function (e) {
                            return e
                        }))
                    }));
                    if (t) return E = t, "break"
                }, P = f ? 3 : 1; P > 0 && "break" !== F(P); P--) ;
                t.placement !== E && (t.modifiersData[r]._skip = !0, t.placement = E, t.reset = !0)
            }
        }, requiresIfExists: ["offset"], data: {_skip: !1}
    };

    function Ve(e, t, n) {
        return B(e, V(t, n))
    }

    function je(e, t, n) {
        return void 0 === n && (n = {x: 0, y: 0}), {top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x}
    }

    function ze(e) {
        return [se, le, ae, ce].some((function (t) {
            return e[t] >= 0
        }))
    }

    var qe = ke({
        defaultModifiers: [{
            name: "eventListeners", enabled: !0, phase: "write", fn: function () {
            }, effect: function (e) {
                var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = void 0 === o || o, s = r.resize, a = void 0 === s || s, l = P(t.elements.popper),
                    c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && c.forEach((function (e) {
                    e.addEventListener("scroll", n.update, xe)
                })), a && l.addEventListener("resize", n.update, xe), function () {
                    i && c.forEach((function (e) {
                        e.removeEventListener("scroll", n.update, xe)
                    })), a && l.removeEventListener("resize", n.update, xe)
                }
            }, data: {}
        }, {
            name: "popperOffsets", enabled: !0, phase: "read", fn: function (e) {
                var t = e.state, n = e.name;
                t.modifiersData[n] = Te({reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement})
            }, data: {}
        }, {
            name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (e) {
                var t = e.state, n = e.options, r = n.gpuAcceleration, o = void 0 === r || r, i = n.adaptive, s = void 0 === i || i, a = n.roundOffsets, l = void 0 === a || a,
                    c = {
                        placement: Ee(t.placement),
                        variation: _e(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: o,
                        isFixed: "fixed" === t.options.strategy
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Ae(Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: l
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ae(Object.assign({}, c, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {"data-popper-placement": t.placement})
            }, data: {}
        }, {
            name: "applyStyles", enabled: !0, phase: "write", fn: function (e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function (e) {
                    var n = t.styles[e] || {}, r = t.attributes[e] || {}, o = t.elements[e];
                    N(o) && U(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function (e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            }, effect: function (e) {
                var t = e.state, n = {popper: {position: t.options.strategy, left: "0", top: "0", margin: "0"}, arrow: {position: "absolute"}, reference: {}};
                return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function () {
                    Object.keys(t.elements).forEach((function (e) {
                        var r = t.elements[e], o = t.attributes[e] || {}, i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function (e, t) {
                            return e[t] = "", e
                        }), {});
                        N(r) && U(r) && (Object.assign(r.style, i), Object.keys(o).forEach((function (e) {
                            r.removeAttribute(e)
                        })))
                    }))
                }
            }, requires: ["computeStyles"]
        }, {
            name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (e) {
                var t = e.state, n = e.options, r = e.name, o = n.offset, i = void 0 === o ? [0, 0] : o, s = ge.reduce((function (e, n) {
                    return e[n] = function (e, t, n) {
                        var r = Ee(e), o = [ce, se].indexOf(r) >= 0 ? -1 : 1, i = "function" == typeof n ? n(Object.assign({}, t, {placement: e})) : n, s = i[0], a = i[1];
                        return s = s || 0, a = (a || 0) * o, [ce, le].indexOf(r) >= 0 ? {x: a, y: s} : {x: s, y: a}
                    }(n, t.rects, i), e
                }), {}), a = s[t.placement], l = a.x, c = a.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = s
            }
        }, Be, {
            name: "preventOverflow", enabled: !0, phase: "main", fn: function (e) {
                var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = void 0 === o || o, s = n.altAxis, a = void 0 !== s && s, l = n.boundary, c = n.rootBoundary,
                    u = n.altBoundary, d = n.padding, h = n.tether, p = void 0 === h || h, f = n.tetherOffset, m = void 0 === f ? 0 : f,
                    v = We(t, {boundary: l, rootBoundary: c, padding: d, altBoundary: u}), g = Ee(t.placement), b = _e(t.placement), y = !b, w = Ce(g), S = "x" === w ? "y" : "x",
                    k = t.modifiersData.popperOffsets, x = t.rects.reference, E = t.rects.popper,
                    _ = "function" == typeof m ? m(Object.assign({}, t.rects, {placement: t.placement})) : m,
                    C = "number" == typeof _ ? {mainAxis: _, altAxis: _} : Object.assign({mainAxis: 0, altAxis: 0}, _),
                    T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, L = {x: 0, y: 0};
                if (k) {
                    if (i) {
                        var A, R = "y" === w ? se : ce, D = "y" === w ? ae : le, O = "y" === w ? "height" : "width", M = k[w], I = M + v[R], F = M - v[D], P = p ? -E[O] / 2 : 0,
                            H = b === he ? x[O] : E[O], N = b === he ? -E[O] : -x[O], W = t.elements.arrow, j = p && W ? Q(W) : {width: 0, height: 0},
                            z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {top: 0, right: 0, bottom: 0, left: 0}, q = z[R], $ = z[D],
                            Z = Ve(0, x[O], j[O]), U = y ? x[O] / 2 - P - Z - q - C.mainAxis : H - Z - q - C.mainAxis,
                            K = y ? -x[O] / 2 + P + Z + $ + C.mainAxis : N + Z + $ + C.mainAxis, Y = t.elements.arrow && ie(t.elements.arrow),
                            G = Y ? "y" === w ? Y.clientTop || 0 : Y.clientLeft || 0 : 0, X = null != (A = null == T ? void 0 : T[w]) ? A : 0, J = M + K - X,
                            ee = Ve(p ? V(I, M + U - X - G) : I, M, p ? B(F, J) : F);
                        k[w] = ee, L[w] = ee - M
                    }
                    if (a) {
                        var te, ne = "x" === w ? se : ce, re = "x" === w ? ae : le, oe = k[S], ue = "y" === S ? "height" : "width", de = oe + v[ne], pe = oe - v[re],
                            fe = -1 !== [se, ce].indexOf(g), me = null != (te = null == T ? void 0 : T[S]) ? te : 0, ve = fe ? de : oe - x[ue] - E[ue] - me + C.altAxis,
                            ge = fe ? oe + x[ue] + E[ue] - me - C.altAxis : pe, be = p && fe ? function (e, t, n) {
                                var r = Ve(e, t, n);
                                return r > n ? n : r
                            }(ve, oe, ge) : Ve(p ? ve : de, oe, p ? ge : pe);
                        k[S] = be, L[S] = be - oe
                    }
                    t.modifiersData[r] = L
                }
            }, requiresIfExists: ["offset"]
        }, {
            name: "arrow", enabled: !0, phase: "main", fn: function (e) {
                var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ee(n.placement), l = Ce(a),
                    c = [ce, le].indexOf(a) >= 0 ? "height" : "width";
                if (i && s) {
                    var u = function (e, t) {
                            return He("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {placement: t.placement})) : e) ? e : Ne(e, de))
                        }(o.padding, n), d = Q(i), h = "y" === l ? se : ce, p = "y" === l ? ae : le, f = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c],
                        m = s[l] - n.rects.reference[l], v = ie(i), g = v ? "y" === l ? v.clientHeight || 0 : v.clientWidth || 0 : 0, b = f / 2 - m / 2, y = u[h],
                        w = g - d[c] - u[p], S = g / 2 - d[c] / 2 + b, k = Ve(y, S, w), x = l;
                    n.modifiersData[r] = ((t = {})[x] = k, t.centerOffset = k - S, t)
                }
            }, effect: function (e) {
                var t = e.state, n = e.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
                null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && Ie(t.elements.popper, r) && (t.elements.arrow = r)
            }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
        }, {
            name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (e) {
                var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = We(t, {elementContext: "reference"}),
                    a = We(t, {altBoundary: !0}), l = je(s, r), c = je(a, o, i), u = ze(l), d = ze(c);
                t.modifiersData[n] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: u,
                    hasPopperEscaped: d
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {"data-popper-reference-hidden": u, "data-popper-escaped": d})
            }
        }]
    });
    const $e = (0, r.aZ)({
        name: "DocTooltip", props: {
            placement: {type: String, default: "top"}, offset: {
                type: Array, default: function () {
                    return [0, 8]
                }
            }, delay: {type: Number, default: 250}
        }, emits: ["show", "hide"], setup: function (e, t) {
            var n, o = t.emit, i = (0, r.iH)(), s = (0, r.iH)(), a = (0, r.iH)(!1), l = null;
            return {
                trigger: i, tooltip: s, isOpen: a, show: function () {
                    clearTimeout(n), n = setTimeout((function () {
                        a.value = !0, (0, r.Y3)((function () {
                            !function () {
                                var t = document.querySelector("body"), n = {
                                    placement: e.placement,
                                    modifiers: [{name: "offset", options: {offset: e.offset}}, {name: "preventOverflow", options: {boundary: t}}, {
                                        name: "flip",
                                        options: {boundary: t}
                                    }]
                                };
                                if (!i.value || !s.value) throw new Error("Tooltip trigger or tooltip element not found in DOM");
                                l = qe(i.value, s.value, n)
                            }(), o("show")
                        }))
                    }), e.delay)
                }, hide: function () {
                    clearTimeout(n), o("hide"), a.value = !1, l && (l.destroy(), l = null)
                }, update: function () {
                    l && l.update()
                }
            }
        }
    }), Ze = (0, c.Z)($e, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r._)("div", {
            ref: "trigger", "aria-describedby": "tooltip", onMouseenter: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.show && e.show.apply(e, t)
            }), onMouseleave: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.hide && e.hide.apply(e, t)
            })
        }, [(0, r.WI)(e.$slots, "trigger", {}, void 0, !0)], 544), e.isOpen ? ((0, r.wg)(), (0, r.iD)("div", I, [(0, r.WI)(e.$slots, "default", {}, void 0, !0), F], 512)) : (0, r.kq)("", !0)])
    }], ["__scopeId", "data-v-325bee49"]]), Ue = (0, r.aZ)({
        name: "DocCopyButton",
        components: {DocTooltip: Ze},
        props: {
            copyText: String,
            tooltipText: {type: String, default: R().resources.API_CopyHint_Label},
            tooltipPlacement: {type: String, default: "top"},
            tooltipOffset: {
                type: Array, default: function () {
                    return [0, 8]
                }
            },
            buttonClass: {type: String, default: ""}
        },
        setup: function (e) {
            var t = (0, r.iH)(), n = (0, r.iH)(), o = (0, r.iH)(e.tooltipText), i = null;
            return (0, r.bv)((function () {
                (i = new (O())(n.value, {
                    text: function () {
                        return e.copyText
                    }
                })).on("success", (function () {
                    o.value = R().resources.API_CopiedAckHint_Label, t.value.update()
                }))
            })), (0, r.Jd)((function () {
                null !== i && i.destroy()
            })), {tooltip: t, button: n, btnLabel: o}
        }
    }), Ke = (0, c.Z)(Ue, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-tooltip");
        return (0, r.wg)(), (0, r.j4)(a, {ref: "tooltip", placement: e.tooltipPlacement, offset: e.tooltipOffset}, {
            trigger: (0, r.w5)((function () {
                return [(0, r._)("button", {
                    ref: "button",
                    class: (0, r.C_)(["flex items-center justify-center shrink-0 transition-colors duration-200 ease-in focus:outline-none", e.buttonClass]),
                    onMouseleave: t[0] || (t[0] = function (t) {
                        return e.btnLabel = e.tooltipText
                    })
                }, [(0, r.WI)(e.$slots, "default")], 34)]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("span", L, (0, r.zw)(e.btnLabel), 1)]
            })), _: 3
        }, 8, ["placement", "offset"])
    }]]);
    var Ye = [(0, r._)("path", {d: "M20 8h-9c-1.65 0-3 1.35-3 3v9c0 1.65 1.35 3 3 3h9c1.65 0 3-1.35 3-3v-9c0-1.65-1.35-3-3-3zm1 12c0 .55-.45 1-1 1h-9c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v9z"}, null, -1), (0, r._)("path", {d: "M5 14H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v1c0 .55.45 1 1 1s1-.45 1-1V4c0-1.65-1.35-3-3-3H4C2.35 1 1 2.35 1 4v9c0 1.65 1.35 3 3 3h1c.55 0 1-.45 1-1s-.45-1-1-1z"}, null, -1)];
    const Ge = (0, r.aZ)({name: "DocIconCopy"}), Xe = (0, c.Z)(Ge, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, Ye)
    }]]), Je = (0, r.aZ)({
        name: "DocCodeblock", components: {DocCopyButton: Ke, DocIconCopy: Xe}, props: {lineNumbers: {type: Boolean, default: !1}}, setup: function (e) {
            var t = (0, r.iH)(), n = (0, r.iH)(""), o = (0, r.iH)(""), i = (0, r.iH)(!1);
            return (0, r.bv)((function () {
                var r, s, a, l;
                i.value = "string" == typeof (null === (s = null === (r = t.value) || void 0 === r ? void 0 : r.querySelector(".codeblock-title")) || void 0 === s ? void 0 : s.textContent);
                var c = null === (a = t.value) || void 0 === a ? void 0 : a.querySelector("code[class*='language-']");
                n.value = (null == c ? void 0 : c.innerText.trim()) || "", e.lineNumbers && (o.value = function (e) {
                    return e.split("\n").map((function (e, t) {
                        return "<div>".concat(t + 1, "</div>")
                    })).join("")
                }(n.value)), "PRE" === (null === (l = null == c ? void 0 : c.parentElement) || void 0 === l ? void 0 : l.nodeName) && new T.Z(c.parentElement)
            })), {codeblockRef: t, hasTitle: i, code: n, lineNumbersHtml: o}
        }
    }), Qe = (0, c.Z)(Je, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-copy"), l = (0, r.up)("doc-icon"), c = (0, r.up)("doc-copy-button");
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "codeblockRef",
            class: (0, r.C_)(["codeblock relative", {"line-numbers": e.lineNumbers}])
        }, [(0, r._)("div", _, [(0, r.Wm)(c, {
            "copy-text": e.code,
            "tooltip-placement": "left",
            "tooltip-offset": [-1, 0],
            class: (0, r.C_)(["mr-1.5", e.hasTitle ? "mt-14" : "mt-1.5"]),
            "button-class": "w-10 h-10 text-dark-350 hover:text-white bg-dark-850 dark:bg-dark-800 bg-opacity-50 dark:bg-opacity-50 rounded-full"
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(l, null, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(a)]
                    })), _: 1
                })]
            })), _: 1
        }, 8, ["copy-text", "class"])]), (0, r.WI)(e.$slots, "default"), e.lineNumbers ? ((0, r.wg)(), (0, r.iD)("div", {
            key: 0,
            class: (0, r.C_)(["absolute top-0 w-14 py-4 pr-3 bg-dark-850 dark:bg-dark-800 font-mono leading-normal text-dark-350 text-xs text-right", {"mt-12": e.hasTitle}]),
            innerHTML: e.lineNumbersHtml
        }, null, 10, C)) : (0, r.kq)("", !0)], 2)
    }]]), et = (0, r.aZ)({
        name: "DocCollapse",
        props: {modelValue: Boolean, animations: {type: Boolean, default: !0}, triggerClass: {type: String, default: null}},
        emits: ["update:modelValue"],
        setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(!1), i = (0, r.iH)();

            function s() {
                n("update:modelValue", !e.modelValue)
            }

            return (0, r.YP)((function () {
                return e.modelValue
            }), (function (e) {
                e ? (0, r.Y3)((function () {
                    if (i.value) {
                        var e = i.value.scrollHeight;
                        i.value.style.height = "".concat(e, "px")
                    }
                })) : i.value && (i.value.style.height = "0px")
            }), {immediate: !0}), {
                toggleCollapse: s, onKeydown: function (e) {
                    "Enter" === e.key && s()
                }, toggleMousedown: function () {
                    o.value = !o.value
                }, onFocus: function (e) {
                    o.value && e.target.blur()
                }, content: i
            }
        }
    }), tt = (0, c.Z)(et, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r._)("div", {
            class: (0, r.C_)(["cursor-pointer focus:outline-none focus:bg-gray-200 dark:focus:bg-dark-750", e.triggerClass]),
            tabindex: "0",
            onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggleCollapse && e.toggleCollapse.apply(e, t)
            }),
            onMousedown: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggleMousedown && e.toggleMousedown.apply(e, t)
            }),
            onMouseup: t[2] || (t[2] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggleMousedown && e.toggleMousedown.apply(e, t)
            }),
            onFocus: t[3] || (t[3] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onFocus && e.onFocus.apply(e, t)
            }),
            onKeydown: t[4] || (t[4] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onKeydown && e.onKeydown.apply(e, t)
            })
        }, [(0, r.WI)(e.$slots, "trigger")], 34), (0, r._)("div", {
            ref: "content",
            class: (0, r.C_)(["collapse-content overflow-hidden", e.animations ? "transition-all duration-200 ease-out" : null]),
            style: {height: "0"}
        }, [(0, r.WI)(e.$slots, "default")], 2), (0, r.WI)(e.$slots, "footer")])
    }]]), nt = (0, r.aZ)({
        name: "DocOverlay", props: {isOpen: Boolean}, emits: ["swipe-left", "swipe-right", "click"], setup: function (e, t) {
            var n = t.emit, o = (0, r.qj)({x: 0, y: 0});
            return {
                onTouchStart: function (e) {
                    o.x = e.changedTouches[0].clientX, o.y = e.changedTouches[0].clientY
                }, onTouchEnd: function (e) {
                    var t = e.changedTouches[0].clientX - o.x, r = e.changedTouches[0].clientY - o.y;
                    Math.abs(t) > Math.abs(r) && Math.abs(t) > 40 && (t < 0 && n("swipe-left", [e, "swipe-left"]), t > 0 && n("swipe-right", [e, "swipe-right"]))
                }, onClick: function (e) {
                    n("click", [e, "click"])
                }
            }
        }
    }), rt = (0, c.Z)(nt, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", {
            class: (0, r.C_)(["fixed z-30 transition-opacity duration-300 ease-in-out bg-gray-600 dark:bg-dark-900", e.isOpen ? "inset-0 opacity-50 dark:bg-opacity-70" : "opacity-0"]),
            onTouchstart: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onTouchStart && e.onTouchStart.apply(e, t)
            }),
            onTouchend: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onTouchEnd && e.onTouchEnd.apply(e, t)
            }),
            onClick: t[2] || (t[2] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onClick && e.onClick.apply(e, t)
            })
        }, null, 34)
    }]]);

    function ot(e) {
        (0, m.zX)(window, "resize", (function (t) {
            e(t)
        }))
    }

    function it() {
        var e = document.body, t = (0, r.iH)(0), n = e.offsetWidth;
        (0, r.bv)((function () {
            return n = e.offsetWidth
        })), ot((function () {
            return n = e.offsetWidth
        }));
        var o = (0, r.iH)(!1);
        return {
            enableBodyScroll: function () {
                o.value && (e.classList.remove("overflow-hidden", "fixed"), e.style.width = "", e.style.top = "", window.scrollTo(0, t.value), o.value = !1)
            }, disableBodyScroll: function () {
                o.value || (t.value = window.scrollY, e.style.width = "".concat(n, "px"), e.style.top = "".concat(-t.value, "px"), e.classList.add("overflow-hidden", "fixed"), o.value = !0)
            }, isBodyScrollDisabled: o
        }
    }

    var st = r.lR;
    const at = (0, r.aZ)({
        name: "DocDrawer",
        components: {DocOverlay: rt, Teleport: st},
        props: {hideEvent: {type: Array, required: !0}},
        emits: ["show", "shown", "hide", "hidden"],
        setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(), i = (0, r.iH)(!1), s = it(), a = s.enableBodyScroll, l = s.disableBodyScroll;
            return {
                Teleport: st, isOpen: i, show: function () {
                    n("show"), i.value = !0, l(), (0, r.Y3)((function () {
                        n("shown")
                    }))
                }, hide: function (t) {
                    var s;
                    if (n("hide"), !t || !t[0]) return i.value = !1, a(), void (0, r.Y3)((function () {
                        n("hidden")
                    }));
                    var l = t[0].target;
                    o.value !== l && !(null === (s = o.value) || void 0 === s ? void 0 : s.contains(l)) && e.hideEvent.includes(t[1]) && (i.value = !1, a(), (0, r.Y3)((function () {
                        n("hidden")
                    })))
                }
            }
        }
    }), lt = (0, c.Z)(at, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-overlay");
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "el",
            class: (0, r.C_)(["fixed top-0 bottom-0 right-0 z-40 w-4/5 h-full transition-transform duration-300 ease-in-out bg-white focus:outline-none dark:bg-dark-850", e.isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"]),
            tabindex: "-1",
            onKeyup: t[0] || (t[0] = (0, r.D2)((function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.hide && e.hide.apply(e, t)
            }), ["esc"]))
        }, [(0, r.WI)(e.$slots, "default"), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {to: "#docs-overlay-target"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a, {
                    "is-open": e.isOpen,
                    onSwipeLeft: e.hide,
                    onSwipeRight: e.hide,
                    onClick: e.hide
                }, null, 8, ["is-open", "onSwipeLeft", "onSwipeRight", "onClick"])]
            })), _: 1
        }))], 34)
    }]]);
    var ct = ["aria-expanded"], ut = n(6850);
    const dt = (0, r.aZ)({
        name: "DocDropdown",
        props: {buttonClass: {type: String, default: ""}, align: {type: String, default: "left"}, menuWidth: {type: String, default: "12rem"}},
        setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(), i = (0, r.iH)(!1), s = (0, r.iH)(!1);
            return (0, r.YP)(i, (function () {
                var e = i.value ? "open" : "close";
                n(e)
            })), (0, ut.w)((function (e) {
                var t, n = e.target;
                o.value === n || (null === (t = o.value) || void 0 === t ? void 0 : t.contains(n)) || (i.value = !1)
            })), {
                isOpen: i, isFocused: s, onButtonClick: function () {
                    i.value = !i.value
                }, dropdown: o, hide: function () {
                    i.value = !1
                }
            }
        }
    }), ht = (0, c.Z)(dt, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "dropdown", class: "relative", onKeydown: t[4] || (t[4] = (0, r.D2)((function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.hide && e.hide.apply(e, t)
            }), ["esc"]))
        }, [(0, r._)("div", {
            class: (0, r.C_)(e.buttonClass), role: "button", "aria-haspopup": "true", "aria-expanded": e.isOpen, onFocus: t[0] || (t[0] = function (t) {
                return e.isFocused = !0
            }), onBlur: t[1] || (t[1] = function (t) {
                return e.isFocused = !1
            }), onClick: t[2] || (t[2] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onButtonClick && e.onButtonClick.apply(e, t)
            })
        }, [(0, r.WI)(e.$slots, "button-content", {isOpen: e.isOpen, isFocused: e.isFocused})], 42, ct), (0, r.Wm)(r.uT, {
            "enter-active-class": "transition duration-100 ease-out",
            "enter-from-class": "-translate-y-2 opacity-30",
            "enter-to-class": "translate-y-0 opacity-100",
            "leave-active-class": "transition duration-75 ease-linear",
            "leave-from-class": "translate-y-0 opacity-100",
            "leave-to-class": "-translate-y-2 opacity-0"
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.wy)((0, r._)("div", {
                    class: (0, r.C_)(["absolute z-30 py-2 mt-2 bg-white border border-gray-300 rounded shadow-lg dark:bg-dark-650 dark:border-dark-500", "right" === e.align ? "right-0" : "left-0"]),
                    style: (0, r.j5)({"min-width": e.menuWidth}),
                    onClick: t[3] || (t[3] = (0, r.iM)((function () {
                    }), ["stop"]))
                }, [(0, r.WI)(e.$slots, "default")], 6), [[r.F8, e.isOpen]])]
            })), _: 3
        })], 544)
    }]]);
    var pt = ["innerHTML"];
    const ft = (0, r.aZ)({
        name: "DocEmoji", props: {emoji: {type: String, required: !0}}, setup: function (e) {
            return {
                emojiHtml: (0, r.Fl)((function () {
                    return "&#x".concat(e.emoji.replace(/-/g, "&#x"))
                }))
            }
        }
    }), mt = (0, c.Z)(ft, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("span", {class: "docs-emoji", innerHTML: e.emojiHtml}, null, 8, pt)
    }]]);
    var vt = {class: "flex justify-between px-5 py-3 -mt-1 border-b border-gray-200 dark:border-dark-650"}, gt = {class: "flex text-sm text-gray-500 dark:text-dark-350"},
        bt = {key: 0, class: "flex flex-col items-center py-6"},
        yt = (0, r._)("svg", {class: "mb-2", xmlns: "http://www.w3.org/2000/svg", width: "60", height: "60"}, [(0, r._)("circle", {
            cx: "30",
            cy: "30",
            r: "30",
            fill: "#e1edff"
        }), (0, r._)("path", {
            d: "M36.5 20.5h-2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1h-6v-1c0-.55-.45-1-1-1s-1 .45-1 1v1h-2c-1.65 0-3 1.35-3 3v14c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-14c0-1.65-1.35-3-3-3zm-14 2h2v1c0 .55.45 1 1 1s1-.45 1-1v-1h6v1c0 .55.45 1 1 1s1-.45 1-1v-1h2c.55 0 1 .45 1 1v3h-16v-3c0-.55.45-1 1-1zm14 16h-14c-.55 0-1-.45-1-1v-9h16v9c0 .55-.45 1-1 1z",
            fill: "#8dbbff"
        })], -1), wt = {class: "text-sm text-gray-500"}, St = {key: 1, class: "mt-2"}, kt = ["href", "onClick"], xt = {class: "flex"}, Et = ["textContent"],
        _t = {class: "invisible ml-5 text-xs text-gray-600 group-hover:visible dark:text-dark-350"};

    function Ct() {
        var e = (0, r.iH)(null);
        return (0, r.bv)((function () {
            e.value = window.__DOCS__
        })), {pageData: e}
    }

    function Tt(e) {
        var t = {};
        return "" === e || "?" === e || (e = e.trim().replace(/^(\?|#|&)/, "")).split("&").forEach((function (e) {
            var n = e.split("="), r = n[0], o = n[1];
            r = decodeURIComponent(r);
            var i = null == o ? null : decodeURIComponent(o);
            t[r] = i
        })), t
    }

    var Lt = (0, r.iH)({path: "/"});

    function At(e, t) {
        if ("string" == typeof t) "push" === e ? window.history.pushState(null, "", t) : "replace" === e && window.history.replaceState(null, "", t); else {
            if ("object" != typeof t) throw new Error("Invalid type. Expected a string or a Route object for new route location.");
            var n = t.path ? t.path : window.location.href, r = "";
            t.query && (r = function (e) {
                if (!Object.keys(e).length) return "";
                var t = [];
                return Object.keys(e).forEach((function (n) {
                    t.push("".concat(n, "=").concat(e[n]))
                })), "?" + t.join("&")
            }(t.query));
            var o = "".concat(n).concat(r).concat(t.hash);
            "push" === e ? window.history.pushState(null, "", o) : "replace" === e && window.history.replaceState(null, "", o)
        }
        Lt.value = {
            path: window.location.pathname ? decodeURIComponent(window.location.pathname) : "",
            query: Tt(window.location.search),
            hash: window.location.hash ? decodeURIComponent(window.location.hash) : ""
        }
    }

    var Rt = {
        replace: function (e) {
            return At("replace", e)
        }, push: function (e) {
            return At("push", e)
        }
    };

    function Dt() {
        return Lt.value.path = window.location.pathname ? decodeURIComponent(window.location.pathname) : "", Lt.value.query = Tt(window.location.search), Lt.value.hash = window.location.hash ? decodeURIComponent(window.location.hash) : "", (0, m.zX)(window, "turbo:visit", (function () {
            Lt.value = {
                path: window.location.pathname ? decodeURIComponent(window.location.pathname) : "",
                query: Tt(window.location.search),
                hash: window.location.hash ? decodeURIComponent(window.location.hash) : ""
            }
        })), {route: Lt, Router: Rt}
    }

    var Ot = n(830), Mt = function () {
        return Mt = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, Mt.apply(this, arguments)
    };
    const It = (0, r.aZ)({
        name: "DocHistory", components: {DocDropdown: ht}, setup: function () {
            var e = (0, r.iH)(), t = R().maxHistoryItems, n = (0, r.iH)([]), o = R().resources.History_Title_Label, i = R().resources.History_ClearLink_Label,
                a = R().resources.History_NoHistory_Label, l = Ct().pageData, c = Dt().route, u = (0, Ot.Rs)();

            function d(e) {
                return e && "/" !== e ? u + e : (0, Ot.wE)(u)
            }

            return (0, r.bv)((function () {
                var e;
                null == (e = (0, s.qn)(R().base, localStorage, "doc_history")) || ("version" in e ? n.value = e.items : (function (e) {
                    if (e.length) {
                        var t = l.value;
                        if (t) for (var n = 0, r = e; n < r.length; n++) {
                            var o = r[n];
                            o.path = (0, Ot.cD)(o.path, t)
                        }
                    }
                }(e), n.value = e)), function () {
                    var e = l.value;
                    if (e) {
                        var r = (0, Ot.cD)(c.value.path, e), o = {title: e.title, path: r, timestamp: Date.now(), icon: "doc-icon-".concat(e.icon)};
                        !function (e) {
                            var t = n.value.findIndex((function (t) {
                                return t.path === e.path
                            }));
                            t > -1 && n.value.splice(t, 1)
                        }(o), n.value.unshift(o), n.value.length > t && n.value.pop();
                        var i = {version: 1, items: n.value};
                        (0, s.Nh)(R().base, localStorage, "doc_history", i)
                    }
                }()
            })), {
                dropdown: e, history: n, clearHistory: function () {
                    n.value = [], (0, s.Nh)(R().base, localStorage, "doc_history", [])
                }, setTimeVisited: function () {
                    n.value = n.value.map((function (e) {
                        return Mt(Mt({}, e), {timeAgo: (0, s.Sy)(e.timestamp)})
                    }))
                }, onHistoryItemClick: function (t, n) {
                    (0, s.pI)(n) || (n.preventDefault(), (0, h.Vn)(d(t)), e.value.hide())
                }, getFullPath: d, titleLabel: o, clearButtonLabel: i, noHistoryLabel: a
            }
        }
    }), Ft = (0, c.Z)(It, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-history"), l = (0, r.up)("doc-icon-button"), c = (0, r.up)("doc-icon"), u = (0, r.up)("doc-dropdown");
        return (0, r.wg)(), (0, r.j4)(u, {ref: "dropdown", style: {"margin-right": "-0.625rem"}, align: "right", "menu-width": "18rem", onOpen: e.setTimeVisited}, {
            "button-content": (0, r.w5)((function () {
                var t;
                return [(0, r.Wm)(l, {
                    class: (0, r.C_)([{"bg-gray-300 dark:bg-dark-450": null === (t = e.dropdown) || void 0 === t ? void 0 : t.isOpen}, "w-10 h-10 -mb-0.5"]),
                    "icon-size": "22"
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(a)]
                    })), _: 1
                }, 8, ["class"])]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", vt, [(0, r._)("div", gt, [(0, r.Wm)(c, {width: "15", height: "15", class: "mr-3 mt-0.75"}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(a)]
                    })), _: 1
                }), (0, r._)("span", null, (0, r.zw)(e.titleLabel), 1)]), (0, r._)("button", {
                    class: "text-xs text-blue-500 dark:text-blue-400 focus:outline-none hover:text-blue-900 dark:hover:text-blue-200",
                    onClick: t[0] || (t[0] = function () {
                        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        return e.clearHistory && e.clearHistory.apply(e, t)
                    })
                }, (0, r.zw)(e.clearButtonLabel), 1)]), e.history.length ? ((0, r.wg)(), (0, r.iD)("ul", St, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.history, (function (t) {
                    return (0, r.wg)(), (0, r.iD)("li", {key: t.timestamp}, [(0, r._)("a", {
                        class: "flex justify-between px-5 py-1.5 text-sm whitespace-nowrap group hover:bg-gray-200 dark:hover:bg-dark-500",
                        href: e.getFullPath(t.path),
                        onClick: function (n) {
                            return e.onHistoryItemClick(t.path, n)
                        }
                    }, [(0, r._)("span", xt, [(0, r.Wm)(c, {class: "mr-3 mt-0.75", width: "15", height: "15"}, {
                        default: (0, r.w5)((function () {
                            return [((0, r.wg)(), (0, r.j4)((0, r.LL)(t.icon)))]
                        })), _: 2
                    }, 1024), (0, r._)("span", {textContent: (0, r.zw)(t.title)}, null, 8, Et)]), (0, r._)("span", _t, (0, r.zw)(t.timeAgo), 1)], 8, kt)])
                })), 128))])) : ((0, r.wg)(), (0, r.iD)("div", bt, [yt, (0, r._)("div", wt, (0, r.zw)(e.noHistoryLabel), 1)]))]
            })), _: 1
        }, 8, ["onOpen"])
    }]]);
    var Pt = ["width", "height"], Ht = ["fill"];
    const Nt = (0, r.aZ)({
        name: "DocIcon",
        props: {width: {type: [Number, String], default: 16}, height: {type: [Number, String], default: 16}, iconColor: {type: String, default: "currentColor"}}
    }), Wt = (0, c.Z)(Nt, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: "mb-px",
            width: e.width,
            height: e.height,
            viewBox: "0 0 24 24",
            role: "presentation"
        }, [(0, r._)("g", {fill: e.iconColor}, [(0, r.WI)(e.$slots, "default")], 8, Ht)], 8, Pt)
    }]]), Bt = (0, r.aZ)({
        name: "DocIconButton", props: {iconSize: {type: [Number, String], default: 16}, rounded: {type: Boolean, default: !0}}, setup: function () {
            var e = (0, r.iH)();
            return {
                button: e, onClick: function () {
                    var t;
                    null === (t = e.value) || void 0 === t || t.blur()
                }
            }
        }
    }), Vt = (0, c.Z)(Bt, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon");
        return (0, r.wg)(), (0, r.iD)("button", {
            ref: "button",
            class: (0, r.C_)(["flex items-center justify-center shrink-0 overflow-hidden transition-colors duration-200 ease-in hover:bg-gray-200 focus:outline-none focus:bg-gray-300 dark:text-white dark:hover:bg-dark-500 dark:focus:bg-dark-450", e.rounded ? "rounded-full" : "rounded"]),
            onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onClick && e.onClick.apply(e, t)
            })
        }, [(0, r.Wm)(a, {class: "shrink-0", style: {"margin-bottom": "0"}, width: e.iconSize, height: e.iconSize}, {
            default: (0, r.w5)((function () {
                return [(0, r.WI)(e.$slots, "default")]
            })), _: 3
        }, 8, ["width", "height"])], 2)
    }]]), jt = (0, r.aZ)({
        name: "LoadingSpinner", props: {size: {type: Number, default: 20}}, setup: function (e) {
            return {
                styles: (0, r.Fl)((function () {
                    return {width: "".concat(e.size, "px"), height: "".concat(e.size, "px"), borderWidth: "".concat(Math.round(e.size / 8), "px")}
                }))
            }
        }
    }), zt = (0, c.Z)(jt, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", {
            class: "spinner inline-block rounded-full border-gray-400 dark:border-dark-450 border-solid animate-spin",
            style: (0, r.j5)(e.styles)
        }, null, 4)
    }], ["__scopeId", "data-v-79806448"]]);
    var qt = {ref: "memberRef", class: "relative pluggable"}, $t = {class: "relative z-10 px-5 pb-5"},
        Zt = {class: "absolute inset-0 transition-all duration-200 ease-linear z-5", style: {margin: "-1px"}},
        Ut = [(0, r._)("div", {class: "absolute inset-0 bg-blue-200 bg-opacity-25 border border-blue-300 dark:bg-dark-550 dark:border-dark-600"}, null, -1)],
        Kt = Symbol("DocsGroupId"), Yt = Symbol("DocsOverloadId");

    function Gt(e) {
        var t = (0, a.oR)().store, n = (0, r.f3)(Kt), o = (0, r.Fl)((function () {
            return Object.values(t.state.memberGroups[n]).filter((function (n) {
                return function (e, t, n) {
                    var r = e.overloadId === n, o = e.access.split(",").map((function (e) {
                        return e.trim()
                    })), i = o.every((function (e) {
                        var n;
                        return null === (n = t.state.access) || void 0 === n ? void 0 : n.includes(e)
                    })), s = !e.isInherited || e.isInherited === t.state.inherited;
                    return r && i && s
                }(n, t, e)
            }))
        }));
        return {members: o}
    }

    var Xt = {class: "flex justify-between h-16 px-5"}, Jt = {class: "flex items-center truncate"}, Qt = {ref: "memberName", class: "flex items-center group"},
        en = {class: "font-mono text-sm truncate whitespace-nowrap dark:text-dark-350"}, tn = {key: 0, class: "ml-2"},
        nn = {key: 1, class: "ml-2 text-gray-600 dark:text-dark-350"}, rn = {key: 2}, on = {key: 3, class: "ml-1"},
        sn = {key: 0, class: "flex items-center h-6 px-2 ml-3 text-xs leading-none whitespace-nowrap border border-gray-400 rounded dark:border-dark-650"}, an = {class: "flex"},
        ln = {class: "z-10 inline-flex bg-white border border-gray-300 rounded shadow-sm dark:bg-dark-650 dark:border-dark-650", style: {padding: "2px"}};
    const cn = (0, r.aZ)({
        name: "DocMemberToolbar", components: {DocCopyButton: Ke}, props: {id: String, name: String}, setup: function (e) {
            return {
                buttons: (0, r.Fl)((function () {
                    var t = window.location, n = t.origin, r = t.pathname, o = "".concat(n).concat(r, "#").concat(e.id);
                    return [{id: 1, copyText: e.name, tooltipText: R().resources.API_CopyNameHint_Label, icon: "DocIconCopy"}, {
                        id: 2,
                        copyText: o,
                        tooltipText: R().resources.API_CopyLinkHint_Label,
                        icon: "DocIconLink"
                    }]
                }))
            }
        }
    }), un = (0, c.Z)(cn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon"), l = (0, r.up)("doc-copy-button");
        return (0, r.wg)(), (0, r.iD)("div", ln, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.buttons, (function (e) {
            return (0, r.wg)(), (0, r.j4)(l, {
                key: e.id,
                "copy-text": e.copyText,
                "tooltip-text": e.tooltipText,
                "button-class": "w-7 h-7 hover:bg-gray-200 focus:bg-gray-300 dark:hover:bg-dark-500",
                onClick: t[0] || (t[0] = (0, r.iM)((function () {
                }), ["stop"]))
            }, {
                default: (0, r.w5)((function () {
                    return [(0, r.Wm)(a, null, {
                        default: (0, r.w5)((function () {
                            return [((0, r.wg)(), (0, r.j4)((0, r.LL)(e.icon)))]
                        })), _: 2
                    }, 1024)]
                })), _: 2
            }, 1032, ["copy-text", "tooltip-text"])
        })), 128))])
    }]]);
    var dn = {class: "flex items-center"};
    const hn = (0, r.aZ)({
        name: "DocMemberAccessBadges", props: {access: {type: Array}}, setup: function (e) {
            var t = (0, r.Fl)((function () {
                var t;
                return null === (t = e.access) || void 0 === t ? void 0 : t.filter((function (e) {
                    return "public" !== e
                }))
            }));
            return {badges: t}
        }
    }), pn = (0, c.Z)(hn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-badge");
        return (0, r.wg)(), (0, r.iD)("div", dn, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.badges, (function (e, t) {
            return (0, r.wg)(), (0, r.j4)(a, {key: t, class: "ml-3", type: e}, {
                default: (0, r.w5)((function () {
                    return [(0, r.Uk)((0, r.zw)(e), 1)]
                })), _: 2
            }, 1032, ["type"])
        })), 128))])
    }]]), fn = (0, r.aZ)({
        name: "DocMemberTitle",
        components: {DocMemberToolbar: un, DocMemberAccessBadges: pn},
        props: {
            isVisible: {type: Boolean, required: !0, default: !1},
            isIntersecting: Boolean,
            isWindowScrolling: Boolean,
            id: String,
            name: String,
            overloadId: String,
            type: String,
            params: String,
            returns: String,
            memberAccess: Array
        },
        setup: function (e) {
            var t, n, o = (0, r.Fl)((function () {
                return e.overloadId ? Gt(e.overloadId).members.value.length - 1 : 0
            })), i = (0, r.Fl)((function () {
                return e.type && e.type.split(",").join(" | ")
            })), s = (0, r.Fl)((function () {
                return e.params ? "(".concat(e.params.trim(), ")") : ""
            })), a = (0, r.Fl)((function () {
                return e.returns && e.returns.split(",").join(" | ")
            })), l = (t = (0, r.iH)(), n = (0, r.iH)({}), (0, r.bv)((function () {
                var e, r = null === (e = t.value) || void 0 === e ? void 0 : e.querySelector("h3");
                setTimeout((function () {
                    var e = r ? "".concat(r.clientWidth, "px") : "0";
                    n.value = {width: e, minWidth: "3.75rem", height: "2.625rem"}
                }), 1e3)
            })), {memberName: t, hoverTriggerStyles: n});
            return {
                overloadCount: o,
                memberType: i,
                memberParams: s,
                memberReturnType: a,
                memberName: l.memberName,
                hoverTriggerStyles: l.hoverTriggerStyles,
                moreLabel: R().resources.API_MoreOverloads_Label
            }
        }
    }), mn = (0, c.Z)(fn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-member-toolbar"), l = (0, r.up)("doc-member-access-badges");
        return (0, r.wg)(), (0, r.iD)("div", Xt, [(0, r._)("div", Jt, [(0, r._)("div", Qt, [(0, r.WI)(e.$slots, "default"), e.isIntersecting && !e.isWindowScrolling ? ((0, r.wg)(), (0, r.iD)("div", {
            key: 0,
            class: "absolute top-0 rounded-br-full",
            style: (0, r.j5)(e.hoverTriggerStyles)
        }, [(0, r.Wm)(a, {
            id: e.id,
            class: "absolute top-0 left-0 hidden -mt-5 group-hover:inline-flex",
            name: e.name
        }, null, 8, ["id", "name"])], 4)) : (0, r.kq)("", !0)], 512), (0, r._)("div", en, [e.memberType ? ((0, r.wg)(), (0, r.iD)("span", tn, ": " + (0, r.zw)(e.memberType), 1)) : (0, r.kq)("", !0), e.memberParams ? ((0, r.wg)(), (0, r.iD)("span", nn, (0, r.zw)(e.memberParams), 1)) : (0, r.kq)("", !0), e.memberReturnType ? ((0, r.wg)(), (0, r.iD)("span", rn, ":")) : (0, r.kq)("", !0), e.memberReturnType ? ((0, r.wg)(), (0, r.iD)("span", on, (0, r.zw)(e.memberReturnType), 1)) : (0, r.kq)("", !0)]), e.overloadCount ? ((0, r.wg)(), (0, r.iD)("div", sn, " +" + (0, r.zw)(e.overloadCount) + " " + (0, r.zw)(e.moreLabel), 1)) : (0, r.kq)("", !0)]), (0, r._)("div", an, [(0, r.Wm)(l, {access: e.memberAccess}, null, 8, ["access"])])])
    }]]);
    var vn = {class: "mb-5"},
        gn = (0, r._)("span", {class: "relative z-10 px-2 mb-2 ml-2 text-sm text-gray-600 uppercase bg-white rounded dark:bg-dark-850 dark:text-dark-350"}, " Overloads ", -1),
        bn = {class: "max-h-60 pt-4 pb-2 -mt-3.5 mb-6 overflow-x-hidden overflow-y-auto border border-gray-200 rounded dark:border-dark-650"}, yn = {class: "pl-0"},
        wn = ["onClick"], Sn = {class: "font-mono text-sm truncate whitespace-nowrap"};
    const kn = (0, r.aZ)({
        name: "DocOverloadSelect", components: {DocMemberAccessBadges: pn}, setup: function () {
            var e = Gt((0, r.f3)(Yt)).members;
            return {
                members: e, memberLabel: function (e) {
                    var t = e.name;
                    return (t += e.params ? " (".concat(e.params, ")") : " ()") + (e.returns ? ": ".concat(e.returns) : "")
                }, memberAccess: function (e) {
                    return e.access ? e.access.split(",").map((function (e) {
                        return e.trim()
                    })) : []
                }, memberClasses: function (e) {
                    var t = "boolean" == typeof e.overloadVisibility && e.overloadVisibility;
                    return {
                        "bg-blue-100 text-blue-600 font-semibold dark:bg-dark-550 dark:bg-opacity-50": t,
                        "hover:bg-gray-200 dark:hover:bg-dark-500 dark:hover:bg-opacity-50": !t
                    }
                }, onMemberClick: function (t) {
                    e.value.forEach((function (e) {
                        e.overloadVisibility = e.isOpen = e.id === t.id, function (e) {
                            e.animations = !1, setTimeout((function () {
                                e.animations = !0
                            }), 100)
                        }(e)
                    }))
                }
            }
        }
    }), xn = (0, c.Z)(kn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-member-access-badges");
        return (0, r.wy)(((0, r.wg)(), (0, r.iD)("div", vn, [gn, (0, r._)("div", bn, [(0, r._)("ul", yn, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.members, (function (t) {
            return (0, r.wg)(), (0, r.iD)("li", {
                key: t.id,
                class: (0, r.C_)(["flex px-4 py-1 list-none transition-colors duration-150 ease-linear cursor-pointer", e.memberClasses(t)]),
                onClick: function (n) {
                    return e.onMemberClick(t)
                }
            }, [(0, r._)("div", Sn, (0, r.zw)(e.memberLabel(t)), 1), (0, r.Wm)(a, {class: "ml-auto", access: e.memberAccess(t)}, null, 8, ["access"])], 10, wn)
        })), 128))])])], 512)), [[r.F8, e.members.length > 1]])
    }]]);
    var En = {class: "mb-2 text-sm text-gray-600 dark:text-dark-350 uppercase"}, _n = {class: "codeblock-wrapper"},
        Cn = {class: "member-signature language-csharp m-0 px-5 py-4 text-dark-300 text-xs"}, Tn = {class: "member-signature language-csharp"};
    const Ln = (0, r.aZ)({
        name: "DocMemberSignature", props: {signature: String}, setup: function () {
            return {signatureLabel: R().resources.API_SignatureSection_Label}
        }
    }), An = (0, c.Z)(Ln, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-codeblock");
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r._)("div", En, (0, r.zw)(e.signatureLabel), 1), (0, r._)("div", _n, [(0, r.Wm)(a, null, {
            default: (0, r.w5)((function () {
                return [(0, r._)("pre", Cn, [(0, r._)("code", Tn, (0, r.zw)(e.signature), 1)])]
            })), _: 1
        })])])
    }]]);

    function Rn(e, t) {
        var n = Object.assign({}, {root: null, rootMargin: "0px", threshold: 0}, t), o = (0, r.iH)(), i = (0, r.iH)([]), s = (0, r.Fl)((function () {
            return void 0 !== e.value && null !== e.value && i.value.length > 0 && i.value.every((function (e) {
                return e.isIntersecting
            }))
        })), a = function (e) {
            i.value = e
        };
        return (0, r.bv)((function () {
            e.value && (o.value = new IntersectionObserver(a, n), o.value.observe(e.value))
        })), (0, r.Jd)((function () {
            var e;
            null === (e = o.value) || void 0 === e || e.disconnect()
        })), {isIntersecting: s, elements: i}
    }

    function Dn(e, t, n) {
        var o = (0, r.iH)(!1), i = (0, r.Fl)((function () {
            return n.state.scrolledElementId
        })), s = (0, r.Fl)((function () {
            return n.state.isWindowScrolling
        }));
        return (0, r.YP)(s, (function (t) {
            t || e === i.value && (o.value = !0, setTimeout((function () {
                o.value = !1
            }), 1e3), n.actions.updateScrolledElementId(""))
        }), {immediate: !0}), {isHighlighted: o}
    }

    const On = (0, r.aZ)({
        name: "DocMember",
        components: {DocAnchorTarget: u, DocCollapse: tt, DocMemberTitle: mn, DocOverloadSelect: xn, DocMemberSignature: An},
        props: {
            id: {type: String, required: !0},
            name: {type: String, required: !0},
            isInherited: {type: Boolean, default: !1},
            access: {type: String, default: "public"},
            overloadId: String,
            type: String,
            params: String,
            returns: String,
            signature: String
        },
        setup: function (e) {
            var t = (0, r.iH)(), n = (0, a.oR)().store, o = (0, r.f3)(Kt), i = (0, r.Fl)((function () {
                return n.state.memberGroups[o][e.id].animations
            }));
            !function (e, t, n) {
                Object.keys(n).forEach((function (r) {
                    r && e.actions.setMemberData(t, n.id, r, n[r])
                }))
            }(n, o, e);
            var s = function (e, t, n) {
                var o = (0, r.Fl)((function () {
                    var r, o = null === (r = n.state.memberGroups[t][e.id]) || void 0 === r ? void 0 : r.isVisible;
                    return void 0 === o || o
                })), i = (0, r.Fl)((function () {
                    return e.access.split(",").map((function (e) {
                        return e.trim()
                    }))
                })), s = (0, r.Fl)((function () {
                    var r = !e.overloadId || n.state.memberGroups[t][e.id].overloadVisibility, o = i.value.every((function (e) {
                        var t;
                        return null === (t = n.state.access) || void 0 === t ? void 0 : t.includes(e)
                    })), s = !e.isInherited || e.isInherited === n.state.inherited, a = e.name.toLowerCase().includes(n.state.memberFilter.toLowerCase());
                    return r && o && s && a
                }));
                return (0, r.YP)(s, (function (r) {
                    n.actions.setMemberData(t, e.id, "isVisible", r)
                }), {immediate: !0}), {isVisible: o, memberAccess: i}
            }(e, o, n), l = s.isVisible, c = s.memberAccess, u = function (e, t, n, o) {
                var i = (0, r.Fl)({
                    get: function () {
                        var r = n.state.memberGroups[t];
                        return !(!r || !r[e]) && r[e].isOpen
                    }, set: function (r) {
                        n.actions.setMemberData(t, e, "isOpen", r)
                    }
                }), s = (0, r.Fl)((function () {
                    return n.state.scrolledElementId
                }));
                return (0, r.YP)(s, (function (r) {
                    e === r && n.actions.setMemberData(t, e, "isOpen", !0)
                })), (0, r.YP)(i, (function (e) {
                    if (e) {
                        var t = o.value;
                        t && t.classList.contains("pluggable") && (0, r.Y3)((function () {
                            t.dispatchEvent(new Event("onPluginReady"))
                        }))
                    }
                })), {isOpen: i}
            }(e.id, o, n, t).isOpen;
            return {
                isOpen: u,
                isVisible: l,
                animations: i,
                memberAccess: c,
                isHighlighted: Dn(e.id, 0, n).isHighlighted,
                memberRef: t,
                isIntersecting: Rn(t).isIntersecting,
                isWindowScrolling: (0, r.Fl)((function () {
                    return n.state.isWindowScrolling
                }))
            }
        }
    }), Mn = (0, c.Z)(On, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-anchor-target"), l = (0, r.up)("doc-member-title"), c = (0, r.up)("doc-overload-select"), u = (0, r.up)("doc-member-signature"),
            d = (0, r.up)("doc-collapse");
        return (0, r.wg)(), (0, r.iD)("div", qt, [(0, r.Wm)(a, {
            id: e.id,
            class: "absolute top-5 left-0 right-0 bottom-0",
            style: {"z-index": "-1"}
        }, null, 8, ["id"]), (0, r.wy)((0, r.Wm)(d, {
            modelValue: e.isOpen, "onUpdate:modelValue": t[1] || (t[1] = function (t) {
                return e.isOpen = t
            }), class: "relative -mt-px border dark:border-dark-650 doc-member", animations: e.animations
        }, {
            trigger: (0, r.w5)((function () {
                return [(0, r.Wm)(l, {
                    id: e.id,
                    class: "relative z-10",
                    name: e.name,
                    "overload-id": e.overloadId,
                    type: e.type,
                    params: e.params,
                    returns: e.returns,
                    "member-access": e.memberAccess,
                    "is-visible": e.isVisible,
                    "is-intersecting": e.isIntersecting,
                    "is-window-scrolling": e.isWindowScrolling
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.WI)(e.$slots, "name")]
                    })), _: 3
                }, 8, ["id", "name", "overload-id", "type", "params", "returns", "member-access", "is-visible", "is-intersecting", "is-window-scrolling"])]
            })), footer: (0, r.w5)((function () {
                return [e.isIntersecting ? ((0, r.wg)(), (0, r.j4)(r.uT, {
                    key: 0,
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0"
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.wy)((0, r._)("div", Zt, Ut, 512), [[r.F8, e.isHighlighted]])]
                    })), _: 1
                })) : (0, r.kq)("", !0)]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", $t, [e.isOpen ? ((0, r.wg)(), (0, r.iD)(r.HY, {key: 0}, [e.overloadId ? ((0, r.wg)(), (0, r.j4)(c, {key: 0})) : (0, r.kq)("", !0), (0, r.WI)(e.$slots, "default"), t[0] || ((0, r.qZ)(-1), t[0] = e.signature ? ((0, r.wg)(), (0, r.j4)(u, {
                    key: 1,
                    class: "mb-5",
                    signature: e.signature
                }, null, 8, ["signature"])) : (0, r.kq)("", !0), (0, r.qZ)(1), t[0]), (0, r.WI)(e.$slots, "parameters")], 64)) : (0, r.kq)("", !0)])]
            })), _: 3
        }, 8, ["modelValue", "animations"]), [[r.F8, e.isVisible]])], 512)
    }]]);
    var In = {class: "mb-6 doc-member-group"}, Fn = {key: 0, class: "flex items-center justify-between"}, Pn = {class: "group"};
    const Hn = (0, r.aZ)({
        name: "MemberGroup", props: {id: {type: String, required: !0}}, setup: function (e) {
            (0, r.JJ)(Kt, e.id);
            var t = (0, a.oR)().store;
            return {
                visibleMemberCount: (0, r.Fl)((function () {
                    return t.getters.getVisibleGroupMembers(e.id).length
                }))
            }
        }
    }), Nn = (0, c.Z)(Hn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-anchor-trigger"), l = (0, r.up)("doc-anchor-target");
        return (0, r.wg)(), (0, r.iD)("div", In, [e.visibleMemberCount > 0 ? ((0, r.wg)(), (0, r.iD)("div", Fn, [(0, r.Wm)(l, {id: e.id}, {
            default: (0, r.w5)((function () {
                return [(0, r._)("h2", Pn, [(0, r.Wm)(a, {
                    class: "float-left mt-2 -ml-6 text-lg font-normal text-blue-500 opacity-0 group-hover:opacity-100",
                    to: "#".concat(e.id)
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Uk)(" # ")]
                    })), _: 1
                }, 8, ["to"]), (0, r.WI)(e.$slots, "title")])]
            })), _: 3
        }, 8, ["id"])])) : (0, r.kq)("", !0), (0, r.WI)(e.$slots, "default")])
    }]]), Wn = (0, r.aZ)({
        name: "DocOverloadGroup", props: {overloadId: {type: String, required: !0}}, setup: function (e) {
            (0, r.JJ)(Yt, e.overloadId);
            var t = Dt().route, n = Gt(e.overloadId).members;
            (0, r.m0)((function () {
                n.value.forEach((function (e, r) {
                    e.overloadVisibility = 0 === r, t.value.hash === "#".concat(e.id) && 0 !== r && (n.value[0].overloadVisibility = !1, e.overloadVisibility = !0)
                }))
            }))
        }
    }), Bn = (0, c.Z)(Wn, [["render", function (e, t, n, o, i, s) {
        return (0, r.WI)(e.$slots, "default")
    }]]);
    var Vn = ["href"], jn = {class: "docs-panel-content px-5 pb-5"};
    const zn = (0, r.aZ)({
        name: "DocPanel", props: {id: {type: String, required: !0}, collapsed: {type: Boolean, default: !1}}, setup: function (e) {
            var t = (0, r.iH)(!e.collapsed), n = Dt().route;
            return (0, r.bv)((function () {
                n.value.hash && n.value.hash === "#".concat(e.id) && (t.value = !0)
            })), {
                isExpanded: t, onClick: function (e) {
                    (0, s.pI)(e) ? e.stopPropagation() : e.preventDefault()
                }
            }
        }
    }), qn = (0, c.Z)(zn, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-chevron-right"), l = (0, r.up)("doc-icon"), c = (0, r.up)("doc-anchor-target"), u = (0, r.up)("doc-collapse");
        return (0, r.wg)(), (0, r.j4)(u, {
            modelValue: e.isExpanded, "onUpdate:modelValue": t[1] || (t[1] = function (t) {
                return e.isExpanded = t
            }), "trigger-class": "relative py-4 pl-5 font-medium text-gray-900 pr-14 dark:text-white", class: "mb-6 border rounded-md dark:border-dark-650"
        }, {
            trigger: (0, r.w5)((function () {
                return [(0, r.Wm)(c, {id: e.id}, {
                    default: (0, r.w5)((function () {
                        return [(0, r._)("div", null, [(0, r.WI)(e.$slots, "title")]), (0, r._)("div", {class: (0, r.C_)(["absolute inline-flex items-center justify-center text-blue-500 transition duration-200 ease-out origin-center rounded-full w-7 h-7 right-3 top-4 hover:bg-gray-200 dark:hover:bg-dark-500 z-5", {"rotate-90": e.isExpanded}])}, [(0, r.Wm)(l, {
                            width: "22",
                            height: "22"
                        }, {
                            default: (0, r.w5)((function () {
                                return [(0, r.Wm)(a)]
                            })), _: 1
                        })], 2)]
                    })), _: 3
                }, 8, ["id"]), (0, r._)("a", {
                    href: "#".concat(e.id), class: "absolute inset-0", onClick: t[0] || (t[0] = function () {
                        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        return e.onClick && e.onClick.apply(e, t)
                    })
                }, null, 8, Vn)]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", jn, [(0, r.WI)(e.$slots, "default")])]
            })), _: 3
        }, 8, ["modelValue"])
    }]]), $n = (0, r.aZ)({
        name: "DocPanels", setup: function (e, t) {
            var n, o = t.slots, i = (null === (n = o.default) || void 0 === n ? void 0 : n.call(o)) || [], s = (0, r.Fl)((function () {
                return i.map((function (e) {
                    var t, n;
                    return (0, r.h)(qn, {
                        id: null === (t = e.props) || void 0 === t ? void 0 : t.id,
                        collapsed: null === (n = e.props) || void 0 === n ? void 0 : n.collapsed
                    }, {
                        title: function () {
                            var t;
                            return null === (t = e.children) || void 0 === t ? void 0 : t.title()
                        }, default: function () {
                            var t, n;
                            return null === (n = null === (t = e.children) || void 0 === t ? void 0 : t.default) || void 0 === n ? void 0 : n.call(t)
                        }
                    })
                }))
            }));
            return function () {
                return (0, r.h)("div", {class: "docs-panels mb-6 border rounded-md dark:border-dark-650"}, s.value)
            }
        }
    });
    var Zn = {class: "relative pl-4 mb-5"}, Un = {class: "relative mb-1"}, Kn = (0, r._)("span", {class: "absolute -ml-4"}, "⚬", -1), Yn = {class: "font-semibold"}, Gn = {key: 0},
        Xn = (0, r._)("span", {class: "font-semibold"}, ":", -1), Jn = {key: 0, class: "mx-1 text-sm"}, Qn = {key: 1, class: "text-sm text-gray-600"},
        er = {key: 0, class: "text-sm"}, tr = {class: "font-medium text-gray-900"};
    const nr = (0, r.aZ)({
        name: "DocParamater",
        props: {name: {type: String, required: !0}, type: {type: String, default: ""}, optional: {type: Boolean, default: !1}, defaultValue: {type: String, default: ""}},
        setup: function () {
            return {optionalLabel: R().resources.API_OptionalParameter_Label, defaultValueLabel: R().resources.API_DefaultParameterValue_Label}
        }
    }), rr = (0, c.Z)(nr, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-badge");
        return (0, r.wg)(), (0, r.iD)("div", Zn, [(0, r._)("div", Un, [Kn, (0, r._)("span", Yn, (0, r.zw)(e.name), 1), e.type ? ((0, r.wg)(), (0, r.iD)("span", Gn, [Xn, (0, r.Wm)(a, {class: "ml-1"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Uk)((0, r.zw)(e.type), 1)]
            })), _: 1
        }), e.optional ? ((0, r.wg)(), (0, r.iD)("span", Jn, "•")) : (0, r.kq)("", !0), e.optional ? ((0, r.wg)(), (0, r.iD)("span", Qn, (0, r.zw)(e.optionalLabel), 1)) : (0, r.kq)("", !0)])) : (0, r.kq)("", !0)]), (0, r.WI)(e.$slots, "default"), e.defaultValue ? ((0, r.wg)(), (0, r.iD)("div", er, [(0, r._)("div", null, [(0, r._)("span", tr, (0, r.zw)(e.defaultValueLabel) + ":", 1), (0, r.Wm)(a, {class: "ml-1"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Uk)((0, r.zw)(e.defaultValue), 1)]
            })), _: 1
        })])])) : (0, r.kq)("", !0)])
    }]]);
    var or = {class: "p-5 bg-gray-100 rounded parameters dark:bg-dark-800"}, ir = {class: "mb-4 text-sm text-gray-600 uppercase dark:text-dark-350"};
    const sr = (0, r.aZ)({
        name: "DocParameters", setup: function () {
            return {parametersLabel: R().resources.API_ParameterSection_Label}
        }
    }), ar = (0, c.Z)(sr, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("div", or, [(0, r._)("div", ir, (0, r.zw)(e.parametersLabel), 1), (0, r.WI)(e.$slots, "default")])
    }]]);
    var lr = n(8816), cr = {class: "relative"}, ur = {class: "absolute flex items-center justify-center h-full pl-3"}, dr = ["placeholder"];
    const hr = (0, r.aZ)({
        name: "SearchInput", emits: ["select"], setup: function (e, t) {
            var n = t.emit, o = (0, r.f3)(lr.xf), i = (0, a.oR)().store, s = (0, r.Fl)({
                get: function () {
                    return i.state.searchQuery
                }, set: function (e) {
                    return i.actions.updateSearchQuery(e)
                }
            }), l = (0, r.iH)(), c = R().resources.Search_Input_Placeholder;
            return {
                input: l, focus: function () {
                    var e;
                    null === (e = l.value) || void 0 === e || e.focus()
                }, config: R(), query: s, search: o, onKeydown: function (e) {
                    "Enter" === e.code && n("select"), null == o || o.onKeydown(e)
                }, onFocus: function () {
                    o && (o.isFocused = !0, o.results.length && (o.isOpen = !0))
                }, searchLabel: c
            }
        }
    }), pr = (0, c.Z)(hr, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-search"), l = (0, r.up)("doc-icon"), c = (0, r.up)("doc-icon-x"), u = (0, r.up)("doc-icon-button");
        return (0, r.wg)(), (0, r.iD)("div", cr, [(0, r._)("div", ur, [(0, r.Wm)(l, null, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        })]), (0, r.wy)((0, r._)("input", {
            ref: "input",
            "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                return e.query = t
            }),
            class: "w-full h-10 pl-8 leading-10 text-left text-gray-600 transition-colors duration-200 ease-in bg-gray-200 border border-transparent rounded sm:text-sm hover:bg-white hover:border-gray-300 focus:outline-none focus:border-gray-500 focus:bg-white dark:bg-dark-550 dark:border-dark-600 dark:hover:bg-dark-450 dark:focus:bg-dark-450 dark:focus:border-dark-450 dark:text-white placeholder-gray-400 dark:placeholder-dark-400",
            style: {padding: "0.625rem 0.75rem 0.625rem 2rem"},
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            "aria-label": "{{ searchLabel }}",
            placeholder: e.config.search.placeholder,
            onFocus: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onFocus && e.onFocus.apply(e, t)
            }),
            onKeydown: t[2] || (t[2] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onKeydown && e.onKeydown.apply(e, t)
            })
        }, null, 40, dr), [[r.nr, e.query]]), e.query ? ((0, r.wg)(), (0, r.j4)(u, {
            key: 0,
            ref: "closeBtn",
            class: "absolute top-0 right-0 w-6 h-6 mt-2 mr-2 hover:bg-gray-200",
            tabindex: "-1",
            onClick: (0, r.iM)(e.search.clear, ["stop"])
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(c)]
            })), _: 1
        }, 8, ["onClick"])) : (0, r.kq)("", !0)])
    }]]);
    var fr = ["href", "onClick"], mr = {class: "w-full"}, vr = ["innerHTML"], gr = ["innerHTML"], br = ["innerHTML"], yr = {key: 1, class: "text-sm px-5 py-4 mb-3"};
    const wr = (0, r.aZ)({
        name: "DocSearchResults", props: {isMobile: Boolean}, emits: ["select"], setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(), i = (0, r.f3)(lr.xf), a = (0, Ot.Rs)(), l = R().search.noResultsFoundMsg;
            return (0, r.YP)((function () {
                return o.value
            }), (function (e) {
                e && new T.Z(e)
            })), {
                rootEl: o, searchApi: i, onResultClick: function (e, t) {
                    (0, s.pI)(t) || (t.preventDefault(), i.navigateToResult(e.path, a), n("select"))
                }, getFullPath: function (e) {
                    return i.getResultFullPath(e, a)
                }, noResultsText: l
            }
        }
    }), Sr = (0, c.Z)(wr, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.j4)(r.uT, {
            "enter-active-class": "transition duration-300 ease-out overflow-hidden",
            "enter-from-class": "-translate-y-2 opacity-0",
            "enter-to-class": "translate-y-0 opacity-100",
            "leave-active-class": "transition duration-100 ease-in overflow-hidden",
            "leave-from-class": "translate-y-0 opacity-100",
            "leave-to-class": "-translate-y-2 opacity-0"
        }, {
            default: (0, r.w5)((function () {
                return [e.searchApi.isFocused && e.searchApi.isOpen ? ((0, r.wg)(), (0, r.iD)("div", {
                    key: 0,
                    ref: "rootEl",
                    class: (0, r.C_)(["z-30 w-full overflow-y-auto rounded bg-white", e.isMobile ? "dark:bg-dark-850" : "dark:bg-dark-650 dark:border-dark-500"])
                }, [(0, r._)("ul", null, [e.searchApi.results.length ? ((0, r.wg)(!0), (0, r.iD)(r.HY, {key: 0}, (0, r.Ko)(e.searchApi.results, (function (t, n) {
                    return (0, r.wg)(), (0, r.iD)("li", {key: t.id}, [(0, r._)("a", {
                        class: (0, r.C_)(["flex justify-between m-3 mt-0 py-4 px-4 rounded-md group hover:bg-gray-200 dark:hover:bg-dark-450 focus:outline-none overflow-x-clip", n === e.searchApi.focusIndex ? "bg-gray-200 dark:bg-dark-450" : "bg-gray-100 dark:bg-dark-550"]),
                        href: e.getFullPath(t.path),
                        tabindex: "-1",
                        onClick: function (n) {
                            return e.onResultClick(t, n)
                        }
                    }, [(0, r._)("div", mr, [t.heading ? ((0, r.wg)(), (0, r.iD)("div", {
                        key: 0,
                        class: "mb-2 font-semibold text-gray-900 dark:text-white",
                        innerHTML: t.heading
                    }, null, 8, vr)) : (0, r.kq)("", !0), (0, r._)("div", {
                        class: "text-sm",
                        innerHTML: t.text
                    }, null, 8, gr), (0, r._)("div", {class: "mt-2 text-xs font-medium text-gray-900 dark:text-white break-words", innerHTML: t.page}, null, 8, br)])], 10, fr)])
                })), 128)) : ((0, r.wg)(), (0, r.iD)("li", yr, (0, r.zw)(e.noResultsText), 1))])], 2)) : (0, r.kq)("", !0)]
            })), _: 1
        })
    }]]), kr = (0, r.aZ)({
        name: "DocSearchDesktop", components: {DocSearchInput: pr, DocSearchResults: Sr}, setup: function () {
            var e = (0, r.iH)(), t = (0, lr.Rx)(e);
            (0, r.JJ)(lr.xf, t);
            var n = (0, r.iH)();
            return (0, m.zX)(window, "keydown", (function (e) {
                var t, r = e;
                r.target === document.body && R().search.hotkeys.includes(r.key) && (r.preventDefault(), null === (t = n.value) || void 0 === t || t.focus())
            })), {
                rootEl: e, onRootClick: function () {
                    var e;
                    null === (e = t.input) || void 0 === e || e.focus(), t.isFocused = !0
                }, searchInput: n, searchApi: t
            }
        }
    }), xr = (0, c.Z)(kr, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-search-input"), l = (0, r.up)("doc-search-results");
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "rootEl",
            class: (0, r.C_)(["absolute hidden transition-all duration-300 ease-out right-25 lg:flex lg:flex-col lg:ml-auto", e.searchApi.isFocused ? "w-[42rem]" : "w-40"]),
            onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onRootClick && e.onRootClick.apply(e, t)
            }),
            onKeydown: t[1] || (t[1] = (0, r.D2)((function (t) {
                return e.searchApi.isFocused = !1
            }), ["tab"]))
        }, [(0, r.Wm)(a, {
            ref: "searchInput",
            class: (0, r.C_)(["self-end transition-all duration-300 ease-out", e.searchApi.isFocused ? "w-96" : "w-40"])
        }, null, 8, ["class"]), (0, r.Wm)(l, {class: "absolute max-h-[32rem] pt-3 mt-2 border flex border-gray-300 shadow-lg dark:border-dark-650"})], 34)
    }]]);
    var Er = {ref: "searchRoot", class: "flex flex-col h-full"}, _r = {class: "flex items-center justify-between shrink-0 h-16 bg-white md:h-20 dark:bg-dark-850"}, Cr = r.lR;
    const Tr = (0, r.aZ)({
        name: "DocSearchMobile", components: {Teleport: Cr, DocSearchInput: pr, DocSearchResults: Sr}, setup: function () {
            var e = (0, r.iH)(), t = (0, r.iH)(), n = (0, lr.Rx)(t);
            return (0, r.JJ)(lr.xf, n), {
                Teleport: Cr, docDrawer: e, searchRoot: t, show: function () {
                    e.value.show()
                }, onShown: function () {
                    var e;
                    null === (e = n.input) || void 0 === e || e.focus()
                }, onHidden: function () {
                    var e;
                    null === (e = n.input) || void 0 === e || e.blur()
                }, hideDrawer: function () {
                    null == e || e.value.hide()
                }, searchApi: n
            }
        }
    }), Lr = (0, c.Z)(Tr, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-search-input"), l = (0, r.up)("doc-icon-arrow-right"), c = (0, r.up)("doc-icon-button"), u = (0, r.up)("doc-search-results"),
            d = (0, r.up)("doc-icon-search"), h = (0, r.up)("doc-drawer");
        return (0, r.wg)(), (0, r.j4)(h, {
            ref: "docDrawer",
            class: "md:w-104",
            "hide-event": ["swipe-right", "click"],
            onShown: e.onShown,
            onHidden: e.onHidden
        }, {
            default: (0, r.w5)((function () {
                return [(0, r._)("div", Er, [(0, r._)("div", _r, [(0, r.Wm)(a, {
                    class: "ml-3 w-full",
                    onSelect: e.hideDrawer
                }, null, 8, ["onSelect"]), (0, r.Wm)(c, {
                    class: "w-10 h-10 ml-3",
                    style: {"margin-right": "0.875rem"},
                    "icon-size": "22",
                    onClick: e.hideDrawer
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(l)]
                    })), _: 1
                }, 8, ["onClick"])]), (0, r.Wm)(u, {
                    class: "pb-6",
                    style: {"max-height": "100%"},
                    "is-mobile": !0,
                    onSelect: e.hideDrawer
                }, null, 8, ["onSelect"])], 512), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {to: "#docs-mobile-search-button"}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(c, {class: "w-10 h-10 lg:hidden", "icon-size": "20", onClick: (0, r.iM)(e.show, ["stop"])}, {
                            default: (0, r.w5)((function () {
                                return [(0, r.Wm)(d)]
                            })), _: 1
                        }, 8, ["onClick"])]
                    })), _: 1
                }))]
            })), _: 1
        }, 8, ["onShown", "onHidden"])
    }]]);
    var Ar = {class: "flex items-center shrink-0 h-16 px-6 -ml-6 bg-white border-b border-gray-200 md:hidden dark:bg-dark-800 dark:border-dark-650"}, Rr = {ref: "sidebarFooter"},
        Dr = {key: 0, ref: "sidebarLinksEl", class: "overflow-y-auto h-full"}, Or = n(1296), Mr = n.n(Or);
    const Ir = e => "object" == typeof e && null != e && 1 === e.nodeType, Fr = (e, t) => (!t || "hidden" !== e) && "visible" !== e && "clip" !== e, Pr = (e, t) => {
            if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) {
                const n = getComputedStyle(e, null);
                return Fr(n.overflowY, t) || Fr(n.overflowX, t) || (e => {
                    const t = (e => {
                        if (!e.ownerDocument || !e.ownerDocument.defaultView) return null;
                        try {
                            return e.ownerDocument.defaultView.frameElement
                        } catch (e) {
                            return null
                        }
                    })(e);
                    return !!t && (t.clientHeight < e.scrollHeight || t.clientWidth < e.scrollWidth)
                })(e)
            }
            return !1
        }, Hr = (e, t, n, r, o, i, s, a) => i < e && s > t || i > e && s < t ? 0 : i <= e && a <= n || s >= t && a >= n ? i - e - r : s > t && a < n || i < e && a > n ? s - t + o : 0,
        Nr = e => {
            const t = e.parentElement;
            return null == t ? e.getRootNode().host || null : t
        }, Wr = (e, t) => {
            var n, r, o, i;
            if ("undefined" == typeof document) return [];
            const {scrollMode: s, block: a, inline: l, boundary: c, skipOverflowHiddenElements: u} = t, d = "function" == typeof c ? c : e => e !== c;
            if (!Ir(e)) throw new TypeError("Invalid target");
            const h = document.scrollingElement || document.documentElement, p = [];
            let f = e;
            for (; Ir(f) && d(f);) {
                if (f = Nr(f), f === h) {
                    p.push(f);
                    break
                }
                null != f && f === document.body && Pr(f) && !Pr(document.documentElement) || null != f && Pr(f, u) && p.push(f)
            }
            const m = null != (r = null == (n = window.visualViewport) ? void 0 : n.width) ? r : innerWidth,
                v = null != (i = null == (o = window.visualViewport) ? void 0 : o.height) ? i : innerHeight, {scrollX: g, scrollY: b} = window, {
                    height: y,
                    width: w,
                    top: S,
                    right: k,
                    bottom: x,
                    left: E
                } = e.getBoundingClientRect();
            let _ = "start" === a || "nearest" === a ? S : "end" === a ? x : S + y / 2, C = "center" === l ? E + w / 2 : "end" === l ? k : E;
            const T = [];
            for (let e = 0; e < p.length; e++) {
                const t = p[e], {height: n, width: r, top: o, right: i, bottom: c, left: u} = t.getBoundingClientRect();
                if ("if-needed" === s && S >= 0 && E >= 0 && x <= v && k <= m && S >= o && x <= c && E >= u && k <= i) return T;
                const d = getComputedStyle(t), f = parseInt(d.borderLeftWidth, 10), L = parseInt(d.borderTopWidth, 10), A = parseInt(d.borderRightWidth, 10),
                    R = parseInt(d.borderBottomWidth, 10);
                let D = 0, O = 0;
                const M = "offsetWidth" in t ? t.offsetWidth - t.clientWidth - f - A : 0, I = "offsetHeight" in t ? t.offsetHeight - t.clientHeight - L - R : 0,
                    F = "offsetWidth" in t ? 0 === t.offsetWidth ? 0 : r / t.offsetWidth : 0, P = "offsetHeight" in t ? 0 === t.offsetHeight ? 0 : n / t.offsetHeight : 0;
                if (h === t) D = "start" === a ? _ : "end" === a ? _ - v : "nearest" === a ? Hr(b, b + v, v, L, R, b + _, b + _ + y, y) : _ - v / 2, O = "start" === l ? C : "center" === l ? C - m / 2 : "end" === l ? C - m : Hr(g, g + m, m, f, A, g + C, g + C + w, w), D = Math.max(0, D + b), O = Math.max(0, O + g); else {
                    D = "start" === a ? _ - o - L : "end" === a ? _ - c + R + I : "nearest" === a ? Hr(o, c, n, L, R + I, _, _ + y, y) : _ - (o + n / 2) + I / 2, O = "start" === l ? C - u - f : "center" === l ? C - (u + r / 2) + M / 2 : "end" === l ? C - i + A + M : Hr(u, i, r, f, A + M, C, C + w, w);
                    const {scrollLeft: e, scrollTop: s} = t;
                    D = Math.max(0, Math.min(s + D / P, t.scrollHeight - n / P + I)), O = Math.max(0, Math.min(e + O / F, t.scrollWidth - r / F + M)), _ += s - D, C += e - O
                }
                T.push({el: t, top: D, left: O})
            }
            return T
        }, Br = e => !1 === e ? {block: "end", inline: "nearest"} : (e => e === Object(e) && 0 !== Object.keys(e).length)(e) ? e : {block: "start", inline: "nearest"};

    function Vr(e, t) {
        if (!e.isConnected || !(e => {
            let t = e;
            for (; t && t.parentNode;) {
                if (t.parentNode === document) return !0;
                t = t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode
            }
            return !1
        })(e)) return;
        if ((e => "object" == typeof e && "function" == typeof e.behavior)(t)) return t.behavior(Wr(e, t));
        const n = "boolean" == typeof t || null == t ? void 0 : t.behavior;
        for (const {el: r, top: o, left: i} of Wr(e, Br(t))) r.scroll({top: o, left: i, behavior: n})
    }

    var jr = ["href"], zr = {class: "flex shrink-0 items-center justify-center w-6 h-6 mr-2"}, qr = ["innerHTML"], $r = ["src"], Zr = ["textContent"],
        Ur = {key: 1, class: "absolute right-0 h-full bg-blue-500 dark:bg-blue-400 w-px"}, Kr = {class: "ml-4 transition-all duration-200 ease-out"}, Yr = n(2376), Gr = n(2110),
        Xr = function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, i) {
                function s(e) {
                    try {
                        l(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function a(e) {
                    try {
                        l(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function l(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(s, a)
                }

                l((r = r.apply(e, t || [])).next())
            }))
        }, Jr = function (e, t) {
            var n, r, o, i, s = {
                label: 0, sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                }, trys: [], ops: []
            };
            return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                return this
            }), i;

            function a(a) {
                return function (l) {
                    return function (a) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                            if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                            switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                                case 0:
                                case 1:
                                    o = a;
                                    break;
                                case 4:
                                    return s.label++, {value: a[1], done: !1};
                                case 5:
                                    s.label++, r = a[1], a = [0];
                                    continue;
                                case 7:
                                    a = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                        s.label = a[1];
                                        break
                                    }
                                    if (6 === a[0] && s.label < o[1]) {
                                        s.label = o[1], o = a;
                                        break
                                    }
                                    if (o && s.label < o[2]) {
                                        s.label = o[2], s.ops.push(a);
                                        break
                                    }
                                    o[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            a = t.call(e, s)
                        } catch (e) {
                            a = [6, e], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & a[0]) throw a[1];
                        return {value: a[0] ? a[1] : void 0, done: !0}
                    }([a, l])
                }
            }
        };
    const Qr = (0, r.aZ)({
        name: "DocSidebarLink",
        props: {item: {type: Object, required: !0}, depth: {type: Number, default: 0}, isFiltered: {type: Boolean, default: !1, required: !0}},
        setup: function (e) {
            var t = (0, r.iH)(), n = (0, r.Fl)((function () {
                return e.item.children && e.item.children.length > 0 || e.item.hash
            })), o = (0, r.Fl)((function () {
                return !(!e.item.icon && !e.item.emoji)
            })), i = (0, Ot.sy)(), l = (0, Ot.Rs)(), c = R().appendDocumentName ? R().documentName : "", u = (0, r.Fl)((function () {
                return e.item.clickable ? e.item.url ? e.item.url.startsWith(R().base) ? l + e.item.url.slice(R().base.length) : e.item.url : e.item.path && "/" !== e.item.path ? !R().trailingSlash && c && e.item.path ? "".concat(l).concat(e.item.path, "/").concat(c) : "".concat(l).concat(e.item.path).concat(c) : (0, Ot.wE)(l) : null
            })), d = (0, r.Fl)((function () {
                return e.item.icon && !e.item.icon.startsWith("<") && -1 == e.item.icon.indexOf("://") ? l + e.item.icon : e.item.icon
            })), h = Dt().route, p = (0, r.Fl)((function () {
                if (e.item.url) return !1;
                var t = i + (0, Ot.cD)(h.value.path), n = u.value;
                return null != n && null != t && (n.length === t.length && n === t || n.length === t.length + 1 && "/" !== t[t.length - 1] && "/" === n[n.length - 1] && n.startsWith(t) || n.length + 1 === t.length && "/" === t[t.length - 1] && "/" !== n[n.length - 1] && t.startsWith(n))
            })), f = (0, a.oR)().store, m = (0, r.Fl)((function () {
                return f.state.sidebarLookup
            })), v = m.value.get(e.item.path);
            (e.isFiltered || e.item.open) && E();
            var g = (0, Yr.i)(), b = g.result, y = g.error, w = g.loading, S = g.execute, k = "".concat(location.origin).concat(Gr.as);

            function x() {
                return Xr(this, void 0, void 0, (function () {
                    return Jr(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, S("".concat(k, "/").concat(e.item.hash, ".json"))];
                            case 1:
                                if (t.sent(), y.value) throw new Error("Error fetching sidebar navigation items. ".concat(y.value));
                                return (0, s.rw)(m.value, b.value, R().trailingSlash), [2]
                        }
                    }))
                }))
            }

            function E(t) {
                var n;
                return Xr(this, void 0, void 0, (function () {
                    var r;
                    return Jr(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return (r = t || v) ? !e.item.hash || (null === (n = e.item.children) || void 0 === n ? void 0 : n.length) ? [3, 2] : [4, x()] : [2];
                            case 1:
                                o.sent(), o.label = 2;
                            case 2:
                                return f.actions.updateSidebarLookupItem(r, "open", !0), [2]
                        }
                    }))
                }))
            }

            function _() {
                v && f.actions.updateSidebarLookupItem(v, "open", !1)
            }

            function C() {
                v && v.open ? _() : E()
            }

            function T() {
                var t;
                p.value && (n.value && E(), null === (t = e.item.parentNodes) || void 0 === t || t.forEach((function (e) {
                    E(m.value.get(e))
                })))
            }

            (0, r.YP)((function () {
                return e.isFiltered
            }), (function (e) {
                e ? E(v) : (_(), T())
            }));
            var L = (0, r.iH)(!1);
            return (0, r.bv)((function () {
                p.value && t.value && f.actions.setActiveSidebarEl(t.value), T(), (0, r.Y3)((function () {
                    L.value = !0
                }))
            })), {
                sidebarLinkRef: t, isGroup: n, hasCustomIcon: o, href: u, icon: d, isActive: p, onLinkClick: function (e) {
                    if (!(0, s.pI)(e)) {
                        if (p.value) e.preventDefault(); else if ((null == v ? void 0 : v.open) && u.value) return;
                        C()
                    }
                }, toggle: C, loading: w, transitionsEnabled: L, onEnter: function (e) {
                    L.value && (e.style.height = "0"), (0, r.Y3)((function () {
                        e.style.height = "".concat(e.scrollHeight, "px")
                    }))
                }, onAfterEnter: function (e) {
                    (0, r.Y3)((function () {
                        e.style.height = "auto"
                    }))
                }, onBeforeLeave: function (e) {
                    e.style.height = "".concat(e.scrollHeight, "px")
                }, onLeave: function (e) {
                    e.style.height = "0px"
                }
            }
        }
    }), eo = (0, c.Z)(Qr, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon"), l = (0, r.up)("doc-emoji"), c = (0, r.up)("doc-icon-folder"), u = (0, r.up)("doc-loading-spinner"), d = (0, r.up)("doc-icon-chevron-right"),
            h = (0, r.up)("doc-sidebar-link");
        return (0, r.wg)(), (0, r.iD)("li", null, [(0, r._)("div", {
            class: (0, r.C_)(["relative flex items-center justify-between break-normal pl-3 pr-4 select-none rounded-l transition-colors ease-out duration-150", {
                "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-dark-650 rounded-l": e.isActive,
                "text-gray-900 dark:text-dark-250 hover:text-blue-500 dark:hover:text-blue-400": !e.isActive
            }])
        }, [(0, r._)("a", {
            ref: "sidebarLinkRef", class: "flex flex-1 items-center cursor-pointer", href: e.href, onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onLinkClick && e.onLinkClick.apply(e, t)
            })
        }, [(0, r._)("span", zr, [e.item.icon && e.item.icon.startsWith("<") ? ((0, r.wg)(), (0, r.j4)(a, {key: 0, class: "w-4.5 h-4.5"}, {
            default: (0, r.w5)((function () {
                return [(0, r._)("g", {innerHTML: e.item.icon}, null, 8, qr)]
            })), _: 1
        })) : e.item.icon ? ((0, r.wg)(), (0, r.iD)("img", {key: 1, src: e.icon, class: "w-4.5"}, null, 8, $r)) : e.item.emoji ? ((0, r.wg)(), (0, r.j4)(l, {
            key: 2,
            emoji: e.item.emoji
        }, null, 8, ["emoji"])) : !e.item.icon && 0 === e.depth && e.isGroup ? ((0, r.wg)(), (0, r.j4)(a, {key: 3, class: "w-4.5 h-4.5"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(c)]
            })), _: 1
        })) : (0, r.kq)("", !0)]), (0, r._)("span", {
            class: "text-sm py-1.5",
            textContent: (0, r.zw)(e.item.label)
        }, null, 8, Zr)], 8, jr), e.isGroup ? ((0, r.wg)(), (0, r.iD)("div", {
            key: 0,
            class: (0, r.C_)(["flex items-center justify-center w-7 h-7 rounded-full transition-colors ease-linear duration-150 group shrink-0", {
                "hover:bg-blue-200 hover:bg-opacity-50": e.isActive && !e.loading,
                "hover:bg-gray-200 dark:hover:bg-dark-500": !e.loading
            }])
        }, [e.loading ? ((0, r.wg)(), (0, r.j4)(u, {key: 0, size: 16})) : ((0, r.wg)(), (0, r.iD)("button", {
            key: 1,
            class: (0, r.C_)(["text-gray-400 dark:text-dark-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 focus:outline-none", {
                "rotate-90": e.item.open,
                "transition-transform ease-out duration-200": e.transitionsEnabled
            }]),
            onClick: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggle && e.toggle.apply(e, t)
            })
        }, [(0, r.Wm)(a, {class: "w-5 h-5"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(d)]
            })), _: 1
        })], 2))], 2)) : (0, r.kq)("", !0), e.isActive ? ((0, r.wg)(), (0, r.iD)("span", Ur)) : (0, r.kq)("", !0)], 2), e.isGroup ? ((0, r.wg)(), (0, r.j4)(r.uT, {
            key: 0,
            "enter-active-class": "overflow-hidden",
            "leave-active-class": "overflow-hidden",
            onEnter: e.onEnter,
            onAfterEnter: e.onAfterEnter,
            onBeforeLeave: e.onBeforeLeave,
            onLeave: e.onLeave
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.wy)((0, r._)("ul", Kr, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.item.children, (function (t) {
                    return (0, r.wg)(), (0, r.j4)(h, {key: t.path, item: t, depth: e.depth + 1, "is-filtered": e.isFiltered}, null, 8, ["item", "depth", "is-filtered"])
                })), 128))], 512), [[r.F8, e.isGroup && e.item.open]])]
            })), _: 1
        }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])) : (0, r.kq)("", !0)])
    }]]), to = (0, r.aZ)({
        name: "DocSidebarLinks", components: {DocSidebarLink: eo}, props: {items: {type: Array, required: !0}, isFiltered: {type: Boolean, required: !0}}, setup: function () {
            var e = (0, r.iH)(), t = (0, r.iH)(), n = (0, r.iH)(0), o = (0, r.iH)(), i = (0, a.oR)().store, s = (0, r.Fl)((function () {
                return i.state.sidebarActiveEl
            })), l = Rn(s, {threshold: 1}).elements, c = Mr()((function () {
                var e, r, o = (null === (e = t.value) || void 0 === e ? void 0 : e.scrollTop) || 0;
                i.state.sidebarScroll !== o && (n.value = (null === (r = t.value) || void 0 === r ? void 0 : r.scrollTop) || 0, i.actions.setSidebarScroll(n.value))
            }), 200);
            return (0, r.bv)((function () {
                var n, r, a;
                o.value = e.value && new T.Z(e.value), t.value = null === (n = o.value) || void 0 === n ? void 0 : n.getScrollElement(), null === (a = null === (r = o.value) || void 0 === r ? void 0 : r.getScrollElement()) || void 0 === a || a.addEventListener("scroll", c), t.value && (t.value.scrollTop = i.state.sidebarScroll), setTimeout((function () {
                    !l.value.some((function (e) {
                        return e.isIntersecting
                    })) && s.value && Vr(s.value, {behavior: "smooth", block: "center", boundary: t.value})
                }), 200)
            })), (0, r.Jd)((function () {
                var e;
                null === (e = t.value) || void 0 === e || e.removeEventListener("scroll", c)
            })), {sidebarLinksEl: e}
        }
    }), no = (0, c.Z)(to, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-sidebar-link");
        return e.items.length ? ((0, r.wg)(), (0, r.iD)("ul", Dr, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.items, (function (t) {
            return (0, r.wg)(), (0, r.j4)(a, {key: t.path, item: t, "is-filtered": e.isFiltered}, null, 8, ["item", "is-filtered"])
        })), 128))], 512)) : (0, r.kq)("", !0)
    }]]);
    var ro = {class: "relative flex items-center w-full"}, oo = ["value", "placeholder"];
    const io = (0, r.aZ)({
        name: "DocSidebarFilter", props: {modelValue: String, isOpen: Boolean}, emits: ["update:modelValue"], setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(), i = R().sidebarFilterPlaceholder, s = Mr()((function (e) {
                n("update:modelValue", e.target.value)
            }), 200);
            return (0, r.YP)((function () {
                return e.isOpen
            }), (function () {
                var e;
                null === (e = o.value) || void 0 === e || e.blur()
            })), {
                input: o, placeholder: i, clear: function () {
                    var e;
                    n("update:modelValue", ""), null === (e = o.value) || void 0 === e || e.focus()
                }, onInput: s
            }
        }
    }), so = (0, c.Z)(io, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-x"), l = (0, r.up)("doc-icon-button");
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r._)("div", ro, [(0, r._)("input", {
            ref: "input",
            value: e.modelValue,
            class: "w-full h-8 px-3 py-2 transition-colors duration-200 ease-linear bg-white border border-gray-200 rounded shadow-none md:text-sm focus:outline-none focus:border-gray-600 dark:bg-dark-550 dark:border-dark-600 dark:hover:bg-dark-450 dark:focus:border-dark-450 dark:focus:bg-dark-450 dark:hover:border-dark-450 dark:text-white placeholder-gray-400 dark:placeholder-dark-400",
            type: "text",
            placeholder: e.placeholder,
            onInput: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.onInput && e.onInput.apply(e, t)
            })
        }, null, 40, oo), e.modelValue ? ((0, r.wg)(), (0, r.j4)(l, {
            key: 0,
            ref: "closeBtn",
            class: "absolute top-0 right-0 w-6 h-6 mt-1 mr-1 text-gray-600 hover:text-gray-900",
            onClick: e.clear
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }, 8, ["onClick"])) : (0, r.kq)("", !0)])])
    }]]);
    var ao = function () {
        return ao = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, ao.apply(this, arguments)
    }, lo = r.lR;
    const co = (0, r.aZ)({
        name: "DocSidebar", components: {Teleport: lo, DocSidebarLinks: no, DocSidebarFilter: so, DocOverlay: rt}, setup: function () {
            var e = (0, r.iH)(!1), t = (0, a.oR)().store, n = (0, r.iH)();
            !function (e) {
                var t = (0, r.Fl)((function () {
                    return e.state.sidebarLookup
                }));
                e.state.initialPageLoad && function () {
                    if (e.state.sidebar.id && e.state.sidebar.id === R().id) r = new Map, (o = function (e) {
                        e.forEach((function (e) {
                            e.children && (r.set(e.path, e), o(e.children))
                        }))
                    })(e.state.sidebar.data), e.actions.setSidebarLookupData(r); else {
                        var n = (0, s.am)(t.value, R().sidebar, R().trailingSlash);
                        e.actions.setSidebarData({id: R().id, data: n})
                    }
                    var r, o
                }()
            }(t);
            var o = function (e) {
                var t = (0, r.iH)(""), n = (0, r.iH)(!1), o = (0, r.Fl)((function () {
                    return e.state.sidebar
                })), i = (0, r.Fl)((function () {
                    var e = t.value.toLowerCase();
                    return n.value = !!e, function (e) {
                        var t = function (n, r) {
                            if (!r.visible) return n;
                            if (r.children) {
                                var o = r.children.reduce(t, []);
                                (o.length || r.clickable && (!e || r.searchLabel.includes(e))) && n.push(ao(ao({}, r), {children: o}))
                            } else e && !r.searchLabel.includes(e) || n.push(r);
                            return n
                        };
                        return o.value.data.reduce(t, [])
                    }(e)
                }));
                return {query: t, isFiltered: n, filteredItems: i}
            }(t), i = o.query, l = o.isFiltered, c = o.filteredItems, u = it(), d = u.enableBodyScroll, h = u.disableBodyScroll;
            return {
                Teleport: lo, sidebarFooter: n, isOpen: e, show: function () {
                    e.value = !0, h()
                }, hide: function () {
                    e.value = !1, d()
                }, filteredItems: c, isFiltered: l, query: i, showSidebarFilter: R().showSidebarFilter
            }
        }
    }), uo = (0, c.Z)(co, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-arrow-left"), l = (0, r.up)("doc-icon-button"), c = (0, r.up)("doc-sidebar-filter"), u = (0, r.up)("doc-sidebar-links"),
            d = (0, r.up)("doc-icon-menu"), h = (0, r.up)("doc-overlay");
        return (0, r.wg)(), (0, r.iD)("aside", {
            class: (0, r.C_)(["fixed top-0 z-40 flex flex-col shrink-0 w-4/5 duration-300 ease-in-out bg-gray-100 border-gray-200 sidebar md:top-20 sm:w-1/2 md:w-75 md:z-0 md:border-r md:h-screen md:sticky md:transition-transform dark:bg-dark-800 dark:border-dark-650", {"shadow-2xl md:shadow-none": e.isOpen}]),
            style: (0, r.j5)({transform: e.isOpen ? "translateX(0)" : ""})
        }, [(0, r._)("div", Ar, [(0, r.Wm)(l, {class: "w-10 h-10 ml-3.5 md:hidden", "icon-size": "22", onClick: e.hide}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }, 8, ["onClick"]), e.showSidebarFilter ? ((0, r.wg)(), (0, r.j4)(c, {
            key: 0, modelValue: e.query, "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                return e.query = t
            }), class: "w-full ml-0.5", "is-open": e.isOpen
        }, null, 8, ["modelValue", "is-open"])) : (0, r.kq)("", !0)]), e.showSidebarFilter ? ((0, r.wg)(), (0, r.j4)(c, {
            key: 0,
            modelValue: e.query,
            "onUpdate:modelValue": t[1] || (t[1] = function (t) {
                return e.query = t
            }),
            class: "absolute top-0 left-0 right-0 z-5 bg-gray-100 dark:bg-dark-800 h-16 px-6 hidden md:flex items-center",
            "is-open": e.isOpen
        }, null, 8, ["modelValue", "is-open"])) : (0, r.kq)("", !0), (0, r.Wm)(u, {
            class: "flex-1 pl-3 mt-4 md:mt-16 mb-4",
            items: e.filteredItems,
            "is-filtered": e.isFiltered
        }, null, 8, ["items", "is-filtered"]), (0, r._)("div", Rr, [(0, r.WI)(e.$slots, "sidebar-footer")], 512), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {to: "#docs-sidebar-toggle"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(l, {class: "w-10 h-10 ml-3.5 md:hidden", "icon-size": "24", onClick: e.show}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(d)]
                    })), _: 1
                }, 8, ["onClick"])]
            })), _: 1
        })), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {to: "#docs-overlay-target"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(h, {"is-open": e.isOpen, onSwipeLeft: e.hide, onClick: e.hide}, null, 8, ["is-open", "onSwipeLeft", "onClick"])]
            })), _: 1
        }))], 6)
    }]]);
    var ho = {id: "docs-sidebar-right", ref: "content", class: "w-full h-full overflow-auto"},
        po = {key: 0, class: "flex items-center justify-between h-16 mb-4 border-b lg:border-none lg:h-auto dark:border-dark-650"},
        fo = {class: "px-5 text-gray-500 dark:text-dark-400"};
    const mo = (0, r.aZ)({name: "DocSidebarRightToggle", emits: ["click"]}), vo = (0, c.Z)(mo, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-align-right"), l = (0, r.up)("doc-icon-button");
        return (0, r.wg)(), (0, r.j4)(l, {
            class: "w-10 h-10 bg-white dark:bg-dark-850 bg-opacity-80 dark:bg-opacity-80 text-gray-600 hover:text-gray-800 lg:hidden",
            "icon-size": "20",
            onClick: t[0] || (t[0] = function (t) {
                return e.$emit("click")
            })
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        })
    }]]);
    var go = {key: 0, class: "mb-4"}, bo = n(9843);
    const yo = (0, r.aZ)({
        name: "DocToc", emits: ["link-click"], setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)([]);
            !function (e) {
                var t, n, o = -1, i = -1, a = 0, l = document.getElementById("docs-content"), c = null !== (t = null == l ? void 0 : l.offsetTop) && void 0 !== t ? t : 24,
                    u = (0, s.vE)(), d = document.getElementById("docs-sidebar-right");

                function h() {
                    var t = e.value;
                    if (t && t.length) {
                        var n = (document.documentElement.scrollTop || document.body.scrollTop) + c, r = function (e, t, n) {
                            var r = 0, o = n.length - 1;
                            if (t >= r && t <= o) if (e >= n[t].el.offsetTop) {
                                if (r = t + 1, t === o || e < n[r].el.offsetTop) return t
                            } else if (o = t - 1, t > 0 && e >= n[o].el.offsetTop) return o;
                            for (; r <= o;) {
                                var i = o + r >> 1, s = e - n[i].el.offsetTop;
                                if (s > 0) r = i + 1; else {
                                    if (!(s < 0)) {
                                        r = i;
                                        break
                                    }
                                    o = i - 1
                                }
                            }
                            return r > o ? o : r
                        }(n, o, t), s = function (e, t, n, r) {
                            var o = Math.max(0, n), i = r.length - 1;
                            if (n === i) return i;
                            if (t >= o && t <= i) if (e >= r[t].el.offsetTop) {
                                if (o = t + 1, t === i || e < r[o].el.offsetTop) return t
                            } else if (i = t - 1, t > 0 && e >= r[i].el.offsetTop) return i;
                            if (i <= n) return n;
                            for (; o <= i;) {
                                var s = i + o >> 1, a = e - r[s].el.offsetTop;
                                if (a > 0) o = s + 1; else {
                                    if (!(a < 0)) {
                                        o = s;
                                        break
                                    }
                                    i = s - 1
                                }
                            }
                            return o > i ? i : o
                        }(n + Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) + u - 2 * c, i, r, t);
                        r < 0 ? s >= 0 && (r = 0) : s < r && (s = r), r < 0 ? o >= 0 && p(t, o, i, !1) : o < 0 ? p(t, r, s, !0) : s < o || r > i ? (p(t, r, s, !0), p(t, o, i, !1)) : r <= o ? s <= i ? (p(t, r, o - 1, !0), p(t, s + 1, i, !1)) : (p(t, r, o - 1, !0), p(t, i, s, !0)) : s <= i ? (p(t, o, r - 1, !1), p(t, s + 1, i, !1)) : (p(t, i, s, !0), p(t, o, r - 1, !1)), o = r, i = s
                    }
                }

                function p(e, t, n, r) {
                    for (var o = [], i = t; i <= n; ++i) e[i].isActive = r, r && o.push(e[i]);
                    r && o.length && function (e) {
                        if (d && e.length) {
                            var t = document.documentElement.scrollTop || document.body.scrollTop, n = t > a ? e[e.length - 1] : e[0];
                            if (n) {
                                var r = document.querySelector("#docs-sidebar-right li [href='#".concat(n.slug, "']"));
                                if (!r) return;
                                Vr(r, {behavior: "smooth", block: "center", boundary: d, scrollMode: "if-needed"}), a = t
                            }
                        }
                    }(o)
                }

                (0, m.Up)(window, "scroll", h, 3, 300), (0, m.Up)(window, "resize", h, 3, 300), l && (n = new bo.ResizeSensor(l, (0, m.BK)(h, 3, 300))), (0, r.Jd)((function () {
                    n && (n.detach(), n = void 0)
                }))
            }(o);
            var i = (0, a.oR)().store, l = Ct().pageData;
            return (0, r.bv)((function () {
                var e, t, n = null !== (t = null === (e = l.value) || void 0 === e ? void 0 : e.tocDepth) && void 0 !== t ? t : 0, r = n > 0 ? Array.from(String(n), Number) : [];
                o.value = function (e) {
                    void 0 === e && (e = [2, 3]);
                    var t = [], n = e.map((function (e) {
                        return "#docs-content h".concat(e)
                    })).join(", "), r = document.querySelectorAll(n), o = [];
                    return r.forEach((function (e) {
                        var t = parseInt(e.tagName.replace("H", ""), 10);
                        -1 === o.indexOf(t) && o.push(t)
                    })), o.sort((function (e, t) {
                        return e - t
                    })), r.forEach((function (e) {
                        var n, r, i = parseInt(e.tagName.replace("H", ""), 10), s = o.indexOf(i),
                            a = (null === (n = e.querySelector("a")) || void 0 === n ? void 0 : n.href.split("#")[1]) || "",
                            l = (null === (r = e.querySelector("span")) || void 0 === r ? void 0 : r.textContent) || "";
                        if (a.length > 0 && l.length > 0) {
                            var c = decodeURIComponent(a);
                            t.push({el: e, level: i, idx: s, slug: c, title: l, isActive: !1})
                        }
                    })), t
                }(r), i.state.sidebarRightHasContent = o.value.length > 0
            })), {
                tocData: o, getPaddingLeft: function (e) {
                    return e.idx > 0 ? "padding-left: ".concat(1.25 + 1.25 * e.idx, "rem;") : ""
                }, classList: function (e) {
                    return e.isActive ? "text-blue-500 dark:text-blue-400" : "hover:text-blue-500 dark:text-dark-300 dark:hover:text-blue-400"
                }, onClick: function () {
                    n("link-click")
                }
            }
        }
    }), wo = (0, c.Z)(yo, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-anchor-trigger");
        return e.tocData && e.tocData.length ? ((0, r.wg)(), (0, r.iD)("ul", go, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.tocData, (function (t) {
            return (0, r.wg)(), (0, r.iD)("li", {key: t.slug}, [(0, r.Wm)(a, {
                class: (0, r.C_)(["relative block px-5 py-1 toc-link", e.classList(t)]),
                style: (0, r.j5)(e.getPaddingLeft(t)),
                to: "#".concat(t.slug),
                onClick: e.onClick
            }, {
                default: (0, r.w5)((function () {
                    return [(0, r.Uk)((0, r.zw)(t.title) + " ", 1), (0, r._)("div", {
                        style: {width: "1px"},
                        class: (0, r.C_)({"absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-400": t.isActive})
                    }, null, 2)]
                })), _: 2
            }, 1032, ["class", "style", "to", "onClick"])])
        })), 128))])) : (0, r.kq)("", !0)
    }]]);
    var So = {key: 0, class: "px-5 text-sm"}, ko = {key: 0, class: "mt-3 mb-2 text-gray-600 uppercase dark:text-dark-400"}, xo = ["href"],
        Eo = {key: 2, class: "font-semibold text-gray-900 dark:text-blue-400"}, _o = {key: 1};
    const Co = (0, r.aZ)({
        name: "DocRelatedClassItem", props: {
            item: {
                type: Object, default: function () {
                    return {}
                }
            }, depth: {type: Number, default: 0}
        }, setup: function (e) {
            var t = (0, r.Fl)((function () {
                return void 0 !== e.item.children && e.item.children.length > 0
            })), n = (0, r.Fl)((function () {
                var t = e.depth > 1 ? .5 : 0;
                return "".concat((e.depth - 1) * t, "rem")
            }));
            return {
                hasChildren: t, marginLeft: n, showIcon: (0, r.Fl)((function () {
                    return !0 !== e.item.isGroup && void 0 !== e.item.children && e.item.children.length > 0
                })), onItemClick: function (e, t) {
                    (0, s.pI)(t) || (t.preventDefault(), (0, h.Vn)(e))
                }
            }
        }
    }), To = (0, c.Z)(Co, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-related-class-item");
        return (0, r.wg)(), (0, r.iD)("li", {class: (0, r.C_)(["relative", {"pl-1": e.depth > 1, "mb-4": 0 === e.depth}])}, [(0, r._)("div", {
            class: "flex items-center truncate",
            style: (0, r.j5)({marginLeft: e.marginLeft, minHeight: "1.875rem"})
        }, [e.item.isGroup ? ((0, r.wg)(), (0, r.iD)("h6", ko, (0, r.zw)(e.item.title), 1)) : e.item.href ? ((0, r.wg)(), (0, r.iD)("a", {
            key: 1,
            class: "truncate transition-colors duration-100 ease-linear cursor-pointer hover:text-blue-500 dark:text-dark-300 dark:hover:text-blue-400",
            href: e.item.href,
            onClick: t[0] || (t[0] = function (t) {
                return e.onItemClick(e.item.href, t)
            })
        }, (0, r.zw)(e.item.label), 9, xo)) : ((0, r.wg)(), (0, r.iD)("div", Eo, (0, r.zw)(e.item.label), 1))], 4), e.showIcon ? ((0, r.wg)(), (0, r.iD)("span", {
            key: 0,
            class: "absolute w-2 h-3 border-b border-l border-gray-600",
            style: (0, r.j5)({marginLeft: e.marginLeft, marginTop: "0.375rem"})
        }, null, 4)) : (0, r.kq)("", !0), e.hasChildren ? ((0, r.wg)(), (0, r.iD)("ul", _o, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.item.children, (function (t, n) {
            return (0, r.wg)(), (0, r.j4)(a, {key: n, item: t, depth: e.depth + 1}, null, 8, ["item", "depth"])
        })), 128))])) : (0, r.kq)("", !0)], 2)
    }]]), Lo = To, Ao = (0, r.aZ)({
        name: "DocRelatedClasses", components: {DocRelatedClassItem: Lo}, setup: function () {
            var e = Ct().pageData;
            return {
                relatedClasses: (0, r.Fl)((function () {
                    var t;
                    return (null === (t = e.value) || void 0 === t ? void 0 : t.relatedClasses) || []
                }))
            }
        }
    }), Ro = (0, c.Z)(Ao, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-related-class-item");
        return e.relatedClasses.length ? ((0, r.wg)(), (0, r.iD)("ul", So, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.relatedClasses, (function (e, t) {
            return (0, r.wg)(), (0, r.j4)(a, {key: t, item: e}, null, 8, ["item"])
        })), 128))])) : (0, r.kq)("", !0)
    }]]), Do = Ro;
    var Oo = r.lR;
    const Mo = (0, r.aZ)({
        name: "DocSidebarRight", components: {Teleport: Oo, DocToc: wo, DocOverlay: rt, DocSidebarRightToggle: vo, DocRelatedClasses: Do}, setup: function () {
            var e = (0, r.iH)(), t = (0, r.iH)(!1), n = (0, r.iH)(!1), o = Ct().pageData, i = (0, a.oR)().store, s = (0, r.Fl)((function () {
                return o.value ? o.value.relatedClasses ? "DocRelatedClasses" : "DocToc" : null
            })), l = (0, r.Fl)((function () {
                var e, t;
                return "DocToc" === s.value ? null !== (t = null === (e = o.value) || void 0 === e ? void 0 : e.tocLabel) && void 0 !== t ? t : R().resources.Toc_Contents_Label : "DocRelatedClasses" === s.value ? R().resources.Toc_RelatedClasses_Label : null
            })), c = (0, r.Fl)((function () {
                return {"translate-x-0 shadow-2xl": t.value, "translate-x-full": !t.value, "lg:top-40": "DocRelatedClasses" === s.value, "lg:top-20": "DocToc" === s.value}
            })), u = (0, r.Fl)((function () {
                return {height: "DocRelatedClasses" === s.value ? "calc(100vh - 10rem)" : "calc(100vh - 5rem"}
            }));
            return (0, r.bv)((function () {
                n.value = !0, e.value && new T.Z(e.value)
            })), {
                Teleport: Oo, content: e, isOpen: t, isMounted: n, store: i, show: function () {
                    t.value = !0
                }, hide: function () {
                    t.value = !1
                }, currentComponent: s, title: l, classes: c, styles: u
            }
        }
    }), Io = (0, c.Z)(Mo, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-arrow-right"), l = (0, r.up)("doc-icon-button"), c = (0, r.up)("doc-sidebar-right-toggle"), u = (0, r.up)("doc-overlay");
        return (0, r.wg)(), (0, r.iD)("div", {
            class: (0, r.C_)(["fixed top-0 bottom-0 right-0 z-40 w-4/5 text-sm transition-transform duration-300 ease-in-out bg-white border-gray-200 sidebar-right sm:w-1/2 md:w-104 lg:z-0 lg:sticky lg:w-64 lg:shrink-0 lg:transform-none lg:border-l lg:shadow-none lg:pt-6 focus:outline-none dark:bg-dark-800 lg:dark:bg-dark-850 dark:border-dark-650", e.classes]),
            style: (0, r.j5)(e.styles),
            onKeyup: t[0] || (t[0] = (0, r.D2)((function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.hide && e.hide.apply(e, t)
            }), ["esc"]))
        }, [(0, r._)("div", ho, [e.store.state.sidebarRightHasContent ? ((0, r.wg)(), (0, r.iD)("div", po, [(0, r._)("div", fo, (0, r.zw)(e.title), 1), (0, r.Wm)(l, {
            class: "w-10 h-10 ml-3 lg:hidden",
            style: {"margin-right": "0.875rem"},
            "icon-size": "22",
            onClick: e.hide
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }, 8, ["onClick"])])) : (0, r.kq)("", !0), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.currentComponent), {onLinkClick: e.hide}, null, 40, ["onLinkClick"]))], 512), e.isMounted && e.store.state.sidebarRightHasContent ? ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {
            key: 0,
            to: "#docs-sidebar-right-toggle"
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(c, {class: "fixed right-3 z-40", onClick: e.show}, null, 8, ["onClick"])]
            })), _: 1
        })) : (0, r.kq)("", !0), ((0, r.wg)(), (0, r.j4)((0, r.LL)(e.Teleport), {to: "#docs-overlay-target"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(u, {"is-open": e.isOpen, onSwipeRight: e.hide, onClick: e.hide}, null, 8, ["is-open", "onSwipeRight", "onClick"])]
            })), _: 1
        }))], 38)
    }], ["__scopeId", "data-v-b3211732"]]);
    var Fo = ["aria-checked"], Po = ["checked"], Ho = {class: "inline-flex items-center"};
    const No = (0, r.aZ)({
        name: "DocSwitch", props: {modelValue: Boolean}, emits: ["update:modelValue"], setup: function (e, t) {
            var n = t.emit;
            return {
                isFocused: (0, r.iH)(!1), toggle: function () {
                    n("update:modelValue", !e.modelValue)
                }
            }
        }
    }), Wo = (0, c.Z)(No, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("label", {
            class: "relative inline-block cursor-pointer whitespace-nowrap",
            role: "switch",
            "aria-checked": e.modelValue
        }, [(0, r._)("input", {
            type: "checkbox", class: "absolute opacity-0", style: {"z-index": "-1"}, checked: e.modelValue, onChange: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggle && e.toggle.apply(e, t)
            }), onFocus: t[1] || (t[1] = function (t) {
                return e.isFocused = !0
            }), onBlur: t[2] || (t[2] = function (t) {
                return e.isFocused = !1
            })
        }, null, 40, Po), (0, r._)("div", Ho, [(0, r._)("div", {class: (0, r.C_)(["w-6 h-2 transition-colors duration-100 ease-linear rounded-full", e.modelValue ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-400 dark:bg-dark-400"])}, null, 2), (0, r._)("div", {
            class: (0, r.C_)(["absolute w-4 h-4 transition-transform duration-100 ease-linear bg-white border border-gray-500 rounded-full", {"shadow-outline": e.isFocused}]),
            style: (0, r.j5)({transform: e.modelValue ? "translateX(8px)" : null})
        }, null, 6)]), (0, r.WI)(e.$slots, "default")], 8, Fo)
    }]]), Bo = (0, r.aZ)({
        name: "DocTab", props: {id: {type: String, required: !0}, active: Boolean}, setup: function (e, t) {
            var n = t.slots;
            return function () {
                return (0, r.h)((function () {
                    var e;
                    return null === (e = n.default) || void 0 === e ? void 0 : e.call(n)
                }))
            }
        }
    }), Vo = (0, r.aZ)({
        name: "DocTabs", components: {DocAnchorTarget: u}, setup: function (e, t) {
            var n, o, i, a, l = t.slots, c = (0, r.iH)(), d = (0, r.iH)(""), h = (null === (n = l.default) || void 0 === n ? void 0 : n.call(l)) || [], p = {};
            d.value = (null === (i = null === (o = h.find((function (e) {
                var t, n;
                return "" === (null === (t = e.props) || void 0 === t ? void 0 : t.active) || (null === (n = e.props) || void 0 === n ? void 0 : n.active)
            }))) || void 0 === o ? void 0 : o.props) || void 0 === i ? void 0 : i.id) || (null === (a = h[0].props) || void 0 === a ? void 0 : a.id);
            var f = h.map((function (e) {
                var t, n = null === (t = e.props) || void 0 === t ? void 0 : t.id;
                return "#".concat(n)
            })), m = Dt().route;

            function v() {
                if (m.value.hash && f.includes(m.value.hash)) {
                    var e = m.value.hash.substr(1);
                    if (d.value !== e) return d.value = e, !0
                }
                return !1
            }

            function g() {
                var e = d.value;
                p[e], p[e] = !0;
                var t = (0, r.m0)((function () {
                    var e;
                    null === (e = c.value) || void 0 === e || e.dispatchEvent(new Event("onPluginReady")), t()
                }), {flush: "post"})
            }

            v(), p[d.value] = !0, (0, r.YP)(m, (function () {
                v() && g()
            }));
            var b = (0, r.Fl)((function () {
                return h.map((function (e) {
                    var t, n = null === (t = e.props) || void 0 === t ? void 0 : t.id, o = d.value === n;
                    return (0, r.h)(u, {id: n}, (function () {
                        var t, i;
                        return (0, r.h)("a", {
                            href: "#".concat(n),
                            class: {
                                "no-link block px-5 py-4 cursor-pointer border-b-2 font-medium": !0,
                                "text-gray-500 dark:text-dark-350 hover:text-blue-500 dark:hover:text-blue-400 border-transparent hover:border-gray-300 dark:hover:border-dark-450": !o,
                                "text-blue-500 dark:text-blue-400 border-blue-500": o
                            },
                            onClick: function (e) {
                                (0, s.pI)(e) || (e.preventDefault(), d.value !== n && (d.value = n, g()))
                            }
                        }, null === (i = (t = e.children).title) || void 0 === i ? void 0 : i.call(t))
                    }))
                }))
            })), y = (0, r.Fl)((function () {
                return h.map((function (e) {
                    var t;
                    if (d.value === (null === (t = e.props) || void 0 === t ? void 0 : t.id)) return (0, r.h)((function () {
                        return (0, r.h)("div", {class: "tab-content"}, e)
                    }))
                }))
            }));
            return function () {
                return (0, r.h)("div", {
                    ref: c,
                    class: "mb-6 pluggable"
                }, [(0, r.h)("div", {class: "flex border dark:border-dark-650 -mb-px rounded-t"}, b.value), (0, r.h)("div", {class: "p-5 border dark:border-dark-650 rounded-b-md"}, y.value)])
            }
        }
    }), jo = Vo, zo = (0, r.aZ)({
        name: "DocThemeSwitch", setup: function () {
            var e = (0, r.iH)(null), t = (0, r.Fl)((function () {
                return "dark" === e.value
            }));

            function n(t) {
                document.documentElement.classList.add("no-transitions"), setTimeout((function () {
                    document.documentElement.classList.remove("no-transitions")
                }), 50), t ? (document.documentElement.classList.add("dark"), e.value = "dark") : (document.documentElement.classList.remove("dark"), e.value = "light")
            }

            e.value = (0, s.qn)(R().base, localStorage, "doc_theme"), e.value || (e.value = document.documentElement.classList.contains("dark") ? "dark" : "light");
            var o, i = (0, r.iH)();
            return (0, r.bv)((function () {
                i.value = window.matchMedia("(prefers-color-scheme: dark)"), o = function (e) {
                    (0, s.qn)(R().base, localStorage, "doc_theme") || n(e.matches)
                }, i.value.addEventListener("change", o)
            })), (0, r.Jd)((function () {
                var e;
                null === (e = i.value) || void 0 === e || e.removeEventListener("change", o)
            })), {
                isDark: t, toggleColorMode: n, onSwitchClick: function () {
                    n("light" === e.value), (0, s.Nh)(R().base, localStorage, "doc_theme", e.value)
                }
            }
        }
    }), qo = (0, c.Z)(zo, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-sun"), l = (0, r.up)("doc-icon-moon"), c = (0, r.up)("doc-icon-button");
        return (0, r.wg)(), (0, r.j4)(c, {class: (0, r.C_)(["w-10 h-10", {"-mb-0.5": !e.isDark}]), "icon-size": "20", onClick: e.onSwitchClick}, {
            default: (0, r.w5)((function () {
                return [e.isDark ? ((0, r.wg)(), (0, r.j4)(a, {key: 0})) : ((0, r.wg)(), (0, r.j4)(l, {key: 1}))]
            })), _: 1
        }, 8, ["class", "onClick"])
    }]]);
    var $o = {
            id: "docs-toolbar",
            class: "sticky z-20 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 md:h-20 md:pl-16 md:top-20 top-16 dark:bg-dark-850 dark:border-dark-650"
        }, Zo = {class: "relative"}, Uo = {ref: "visibleLinksDiv", class: "flex whitespace-nowrap"}, Ko = {class: "block"}, Yo = ["innerHTML"],
        Go = {ref: "more", class: "mr-3 more-dropdown"}, Xo = {class: "flex flex-col"},
        Jo = {class: "flex items-center h-5 px-2 text-xs font-semibold text-white bg-blue-500 dark:bg-blue-400 rounded-full md:text-2xs"};
    const Qo = (0, r.aZ)({name: "DocToolbarMemberCount"}), ei = (0, c.Z)(Qo, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("span", Jo, [(0, r.WI)(e.$slots, "default")])
    }]]);
    var ti = ["aria-expanded", "aria-disabled", "disabled"], ni = {class: "absolute left-0 z-20"}, ri = {ref: "dropdownBottom", class: "h-2"}, oi = {
        key: 0,
        class: "absolute bottom-0 right-0 z-50 flex items-center h-6 px-2 mb-4 mr-8 text-xs leading-none text-center text-gray-500 bg-white rounded-full shadow-md dark:bg-dark-550 dark:text-dark-200"
    }, ii = function () {
        return ii = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, ii.apply(this, arguments)
    };
    const si = (0, r.aZ)({
        name: "ToolbarLinkDropdownContent",
        components: {DocAnchorTrigger: f},
        props: {
            groupId: {type: String, required: !0},
            members: {type: Array, required: !0},
            isSingleColumn: {type: Boolean, required: !0},
            linkWidth: {type: Number, required: !0}
        },
        emits: ["click"],
        setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(3), i = (0, r.iH)(0), s = (0, r.Fl)((function () {
                return ii({maxHeight: "calc(100vh - 11rem)", minWidth: "".concat(e.linkWidth, "px")}, !e.isSingleColumn && {width: "".concat(i.value, "px")})
            })), a = (0, r.Fl)((function () {
                var t = Math.ceil(e.members.length / o.value);
                return {gridTemplateColumns: "repeat(".concat(o.value, ", 1fr)"), gridTemplateRows: "repeat(".concat(t, ", 1fr)")}
            })), l = it(), c = l.enableBodyScroll, u = l.disableBodyScroll;

            function d() {
                var e = document.querySelector("#docs-content");
                i.value = e ? e.clientWidth : 0
            }

            ot((function () {
                !function () {
                    var e = window.innerWidth;
                    o.value = e < 1124 && e > 1024 || e < 900 ? 2 : 3
                }(), d()
            })), (0, r.bv)(d);
            var h = function () {
                var e = (0, r.iH)();
                return {dropdownBottom: e, isIntersecting: Rn(e).isIntersecting}
            }(), p = h.dropdownBottom, f = h.isIntersecting, m = R().resources.API_MoreDropdownItems_Label;
            return {
                memberGridStyles: a, mmemberGridWrapperStyles: s, enableBodyScroll: c, disableBodyScroll: u, onClick: function () {
                    c(), n("click")
                }, dropdownBottom: p, isIntersecting: f, moreLabel: m
            }
        }
    }), ai = (0, c.Z)(si, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-anchor-trigger");
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r._)("div", {
            ref: "gridWrapper",
            class: "px-2 pt-2 mt-2 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg member-links-dropdown dark:bg-dark-650 dark:border-dark-500",
            style: (0, r.j5)(e.mmemberGridWrapperStyles),
            onMouseenter: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.disableBodyScroll && e.disableBodyScroll.apply(e, t)
            }),
            onMouseleave: t[2] || (t[2] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.enableBodyScroll && e.enableBodyScroll.apply(e, t)
            })
        }, [(0, r._)("div", {
            class: (0, r.C_)({"sm:grid grid-flow-col": !e.isSingleColumn}),
            style: (0, r.j5)(e.memberGridStyles)
        }, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.members, (function (n) {
            return (0, r.wg)(), (0, r.j4)(a, {
                key: n.id, to: "#".concat(n.id), onClick: t[0] || (t[0] = function (t) {
                    return e.onClick()
                })
            }, {
                default: (0, r.w5)((function () {
                    return [(0, r.Uk)((0, r.zw)(n.name), 1)]
                })), _: 2
            }, 1032, ["to"])
        })), 128))], 6), (0, r._)("div", ri, null, 512)], 36), e.isIntersecting ? (0, r.kq)("", !0) : ((0, r.wg)(), (0, r.iD)("span", oi, (0, r.zw)(e.moreLabel) + "... ", 1))])
    }], ["__scopeId", "data-v-13960e2c"]]), li = (0, r.aZ)({
        name: "DocToolbarLinkDropdown",
        components: {DocToolbarMemberCount: ei, DocToolbarLinkDropdownContent: ai},
        props: {value: Boolean, inDropdown: Boolean, isSingleColumn: Boolean, disabled: Boolean, groupId: String, count: Number, members: Array, linkWidth: Number},
        emits: ["update:modelValue"],
        setup: function (e, t) {
            var n = t.emit, o = (0, r.iH)(), i = (0, r.iH)(!1);
            return (0, ut.w)((function (e) {
                var t, n = e.target;
                o.value === n || (null === (t = o.value) || void 0 === t ? void 0 : t.contains(n)) || (i.value = !1)
            })), (0, r.YP)(i, (function (e) {
                n("update:modelValue", e)
            })), {
                dropdown: o, toggleDropdown: function () {
                    i.value = !i.value
                }, onBodyClick: ut.w, isOpen: i
            }
        }
    }), ci = (0, c.Z)(li, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-chevron-down"), l = (0, r.up)("doc-icon"), c = (0, r.up)("doc-toolbar-member-count"), u = (0, r.up)("doc-toolbar-link-dropdown-content");
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "dropdown",
            class: (0, r.C_)({hidden: e.inDropdown})
        }, [(0, r._)("button", {
            class: (0, r.C_)(["relative z-20 flex items-center justify-center w-6 h-full px-0 transition-colors duration-200 ease-out border-l border-white rounded-r focus:outline-none focus:bg-gray-400 hover:bg-gray-300 dark:border-dark-850 dark:hover:bg-dark-450 dark:focus:bg-dark-450", {
                "opacity-30 cursor-default pointer-events-none": e.disabled,
                "bg-gray-400 dark:bg-dark-450": e.isOpen,
                "bg-gray-200 dark:bg-dark-550": !e.isOpen
            }]), role: "button", "aria-haspopup": "true", "aria-expanded": e.isOpen, "aria-disabled": e.disabled, disabled: e.disabled, onClick: t[0] || (t[0] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.toggleDropdown && e.toggleDropdown.apply(e, t)
            })
        }, [(0, r.Wm)(l, {class: "dark:text-white", width: "13", height: "13"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }), (0, r.Wm)(c, {class: "absolute top-0 right-0 -mt-3 -mr-2"}, {
            default: (0, r.w5)((function () {
                return [(0, r.Uk)((0, r.zw)(e.count), 1)]
            })), _: 1
        })], 10, ti), (0, r.Wm)(r.uT, {
            "enter-active-class": "transition duration-100 ease-out",
            "enter-from-class": "-translate-y-2 opacity-30",
            "enter-to-class": "translate-y-0 opacity-100",
            "leave-active-class": "transition duration-75 ease-linear",
            "leave-from-class": "translate-y-0 opacity-100",
            "leave-to-class": "-translate-y-2 opacity-0"
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.wy)((0, r._)("div", ni, [(0, r.Wm)(u, {
                    members: e.members,
                    "is-single-column": e.isSingleColumn,
                    "group-id": e.groupId,
                    "link-width": e.linkWidth,
                    onClick: t[1] || (t[1] = function (t) {
                        return e.isOpen = !1
                    })
                }, null, 8, ["members", "is-single-column", "group-id", "link-width"])], 512), [[r.F8, e.isOpen]])]
            })), _: 1
        })], 2)
    }]]), ui = (0, r.aZ)({
        name: "DocToolbarLink",
        components: {DocToolbarLinkDropdown: ci, DocToolbarMemberCount: ei, DocAnchorTrigger: f},
        props: {link: {type: Object, required: !0}, inDropdown: {type: Boolean, default: !1}},
        setup: function (e) {
            var t = (0, r.iH)(), n = (0, r.iH)(!1), o = (0, a.oR)().store, i = (0, r.Fl)((function () {
                return o.getters.getVisibleGroupMembers(e.link.id)
            })), s = (0, r.Fl)((function () {
                return i.value.length
            })), l = (0, r.Fl)((function () {
                return s.value <= 12
            })), c = (0, r.Fl)((function () {
                return 0 === s.value
            })), u = (0, r.Fl)((function () {
                return 0 === s.value ? "" : "#".concat(e.link.id)
            })), d = (0, r.Fl)((function () {
                return t.value ? t.value.clientWidth : 0
            }));
            return {linkEl: t, linkWidth: d, isSingleColumn: l, isDropdownOpen: n, disabled: c, href: u, count: s, members: i}
        }
    }), di = (0, c.Z)(ui, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-toolbar-member-count"), l = (0, r.up)("doc-anchor-trigger"), c = (0, r.up)("doc-toolbar-link-dropdown");
        return (0, r.wg)(), (0, r.iD)("div", {
            ref: "linkEl",
            class: (0, r.C_)(["inline-flex h-8 text-sm leading-none", {"mr-3": !e.inDropdown, relative: e.isSingleColumn}]),
            onKeydown: t[1] || (t[1] = (0, r.D2)((function (t) {
                return e.isDropdownOpen = !1
            }), ["esc"]))
        }, [(0, r.Wm)(l, {
            class: (0, r.C_)(["flex items-center justify-between grow px-3 font-medium text-gray-900 focus:bg-gray-400 focus:outline-none dark:text-white dark:focus:bg-dark-450 transition-colors duration-200 ease-out", {
                "px-5 hover:bg-gray-200 dark:hover:bg-dark-500": e.inDropdown,
                "rounded-l hover:bg-gray-300 dark:hover:bg-dark-450": !e.inDropdown,
                "opacity-30 cursor-default pointer-events-none": e.disabled,
                "bg-gray-400 dark:bg-dark-450": e.isDropdownOpen,
                "bg-gray-200 dark:bg-dark-550": !e.isDropdownOpen && !e.inDropdown
            }]), to: e.href, disabled: e.disabled
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.WI)(e.$slots, "default"), (0, r.Wm)(a, {class: (0, r.C_)({hidden: !e.inDropdown})}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Uk)((0, r.zw)(e.count), 1)]
                    })), _: 1
                }, 8, ["class"])]
            })), _: 3
        }, 8, ["class", "to", "disabled"]), (0, r.Wm)(c, {
            modelValue: e.isDropdownOpen,
            "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                return e.isDropdownOpen = t
            }),
            "in-dropdown": e.inDropdown,
            "is-single-column": e.isSingleColumn,
            disabled: e.disabled,
            count: e.count,
            members: e.members,
            "group-id": e.link.id,
            "link-width": e.linkWidth
        }, null, 8, ["modelValue", "in-dropdown", "is-single-column", "disabled", "count", "members", "group-id", "link-width"])], 34)
    }]]);
    const hi = (0, r.aZ)({
        name: "DocToolbarLinks", components: {DocToolbarLink: di}, setup: function () {
            var e = (0, r.iH)(), t = (0, r.iH)(0), n = function () {
                var e = (0, r.iH)(), t = (0, r.iH)(), n = R().toolbarLinks, o = (0, r.iH)([]), i = (0, r.iH)([]), s = (0, r.iH)([]);
                (0, r.bv)((function () {
                    o.value = n.slice()
                }));
                var a = function () {
                    var e;
                    return null === (e = t.value) || void 0 === e ? void 0 : e.clientWidth
                }, l = function () {
                    var e, t, n,
                        c = (t = document.querySelector("#docs-toolbar"), n = window.innerWidth < 960 ? 48 : 88, (t ? t.clientWidth - n : 0) - ((null === (e = document.querySelector("#docs-filters")) || void 0 === e ? void 0 : e.clientWidth) || 0));
                    if (a() > c && o.value.length) {
                        s.value.push(a());
                        var u = o.value.pop();
                        u && i.value.unshift(u)
                    } else if (c > s.value[s.value.length - 1]) {
                        var d = i.value[0];
                        i.value.splice(0, 1), o.value.push(d), s.value.pop()
                    }
                    (0, r.Y3)((function () {
                        a() > c && o.value.length && l()
                    }))
                };
                return {more: e, visibleLinksDiv: t, visibleLinks: o, invisibleLinks: i, updateNavLinks: l}
            }(), o = n.more, i = n.visibleLinksDiv, s = n.visibleLinks, a = n.invisibleLinks, l = n.updateNavLinks, c = (0, r.Fl)((function () {
                return s.value.length <= 1 && t.value < 960 ? "left" : "right"
            }));

            function u() {
                t.value = window.innerWidth
            }

            return (0, r.bv)((function () {
                u(), l()
            })), ot((function () {
                u(), l()
            })), {
                dropdown: e, more: o, visibleLinksDiv: i, visibleLinks: s, invisibleLinks: a, dropdownAlignment: c, onClick: function () {
                    e.value.hide()
                }
            }
        }
    }), pi = (0, c.Z)(hi, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-toolbar-link"), l = (0, r.up)("doc-icon-more-horizontal"), c = (0, r.up)("doc-icon-button"), u = (0, r.up)("doc-dropdown");
        return (0, r.wg)(), (0, r.iD)("div", Zo, [(0, r._)("div", Uo, [(0, r._)("div", Ko, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.visibleLinks, (function (e) {
            return (0, r.wg)(), (0, r.j4)(a, {key: e.id, link: e, "in-dropdown": !1}, {
                default: (0, r.w5)((function () {
                    return [(0, r._)("span", {innerHTML: e.shortLabel ? e.shortLabel : e.label}, null, 8, Yo)]
                })), _: 2
            }, 1032, ["link"])
        })), 128))]), (0, r.wy)((0, r._)("div", Go, [(0, r.Wm)(u, {ref: "dropdown", class: "inline-block", align: e.dropdownAlignment}, {
            "button-content": (0, r.w5)((function () {
                return [(0, r.Wm)(c, {class: "w-8 h-8 bg-gray-200 hover:bg-gray-300 dark:bg-dark-550 dark:hover:bg-dark-450", rounded: !1}, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(l)]
                    })), _: 1
                })]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", Xo, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.invisibleLinks, (function (t) {
                    return (0, r.wg)(), (0, r.j4)(a, {key: t.id, link: t, "in-dropdown": !0, onClick: e.onClick}, {
                        default: (0, r.w5)((function () {
                            return [(0, r._)("span", null, (0, r.zw)(t.label), 1)]
                        })), _: 2
                    }, 1032, ["link", "onClick"])
                })), 128))])]
            })), _: 1
        }, 8, ["align"])], 512), [[r.F8, e.invisibleLinks.length]])], 512)])
    }]]);
    var fi = {id: "docs-filters"}, mi = {class: "items-center hidden lg:flex"},
        vi = {key: 0, class: "absolute top-0 right-0 w-4 h-4 -mt-2 -mr-2 bg-orange-500 border-4 border-white rounded-full dark:border-dark-850"},
        gi = (0, r._)("span", {class: "hidden sm:inline"}, "Filters", -1), bi = {class: "pt-2 pb-3"}, yi = {class: "px-5 pb-4 border-b dark:border-dark-500"},
        wi = {class: "px-5 pt-4"}, Si = {key: 0, class: "absolute top-0 right-0 w-4 h-4 -mt-2 -mr-2 bg-orange-500 border-4 border-white rounded-full dark:border-dark-850"},
        ki = {class: "pt-1"};
    const xi = (0, r.aZ)({
        name: "DocToolbarAccess", setup: function () {
            var e = (0, a.oR)().store;
            return {
                access: R().access, accessLabel: R().resources.API_AccessFilter_Label, selected: (0, r.Fl)({
                    get: function () {
                        return e.state.access
                    }, set: function (t) {
                        return e.actions.updateAccess(t)
                    }
                }), isDirty: (0, r.Fl)((function () {
                    return e.getters.isAccessDirty()
                }))
            }
        }
    }), Ei = (0, c.Z)(xi, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-shield"), l = (0, r.up)("doc-icon"), c = (0, r.up)("doc-checkbox"), u = (0, r.up)("doc-dropdown");
        return (0, r.wg)(), (0, r.iD)("div", null, [(0, r.Wm)(u, {class: "hidden lg:block", align: "right", "menu-width": "9rem"}, {
            "button-content": (0, r.w5)((function (t) {
                var n = t.isOpen, o = t.isFocused;
                return [(0, r._)("button", {class: (0, r.C_)(["relative text-gray-900 bg-white border btn focus:border-gray-600 dark:border-dark-650 dark:text-white dark:hover:bg-dark-450 dark:hover:border-dark-450 dark:focus:bg-dark-450 dark:focus:border-dark-450", n || o ? "border-gray-600 dark:bg-dark-450" : "border-gray-400 dark:bg-dark-550"])}, [e.isDirty ? ((0, r.wg)(), (0, r.iD)("span", Si)) : (0, r.kq)("", !0), (0, r.Wm)(l, {
                    class: "mr-1 -ml-1",
                    width: "14",
                    height: "14",
                    style: {"margin-bottom": "0"}
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(a)]
                    })), _: 1
                }), (0, r._)("span", null, (0, r.zw)(e.accessLabel), 1)], 2)]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", ki, [((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.access, (function (n) {
                    return (0, r.wg)(), (0, r.iD)("div", {key: n.value, class: "flex px-5 hover:bg-gray-200 dark:hover:bg-dark-500"}, [(0, r.Wm)(c, {
                        modelValue: e.selected,
                        "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                            return e.selected = t
                        }),
                        class: "text-xs",
                        value: n.value
                    }, {
                        default: (0, r.w5)((function () {
                            return [(0, r.Uk)((0, r.zw)(n.label), 1)]
                        })), _: 2
                    }, 1032, ["modelValue", "value"])])
                })), 128))])]
            })), _: 1
        }), ((0, r.wg)(!0), (0, r.iD)(r.HY, null, (0, r.Ko)(e.access, (function (n) {
            return (0, r.wg)(), (0, r.iD)("div", {key: n.value, class: "py-0.5 lg:hidden"}, [(0, r.Wm)(c, {
                modelValue: e.selected,
                "onUpdate:modelValue": t[1] || (t[1] = function (t) {
                    return e.selected = t
                }),
                class: "text-xs",
                value: n.value
            }, {
                default: (0, r.w5)((function () {
                    return [(0, r.Uk)((0, r.zw)(n.label), 1)]
                })), _: 2
            }, 1032, ["modelValue", "value"])])
        })), 128))])
    }]]);
    var _i = {class: "relative", style: {width: "12.4375rem"}}, Ci = ["placeholder"];
    const Ti = (0, r.aZ)({
        name: "DocToolbarMemberFilter", setup: function () {
            var e = (0, a.oR)().store, t = (0, r.iH)(), n = R().toolbarFilterPlaceholder, o = (0, r.Fl)({
                get: function () {
                    return e.state.memberFilter
                }, set: Mr()((function (t) {
                    e.actions.updateMemberFilter(t)
                }), 400)
            });

            function i() {
                var e;
                null === (e = t.value) || void 0 === e || e.select()
            }

            return (0, r.bv)((function () {
                var e;
                window.innerWidth > 960 && (null === (e = t.value) || void 0 === e || e.focus(), i())
            })), function (e) {
                var t = Dt(), n = t.route, o = t.Router;
                n.value.query && n.value.query.q && (e.value = n.value.query.q), (0, r.YP)(e, (function (e) {
                    var t = e ? {q: e} : {};
                    n.value.query = t, o.replace(n.value)
                }))
            }(o), {
                input: t, query: o, placeholder: n, select: i, clear: function () {
                    var e;
                    o.value = "", null === (e = t.value) || void 0 === e || e.focus()
                }
            }
        }
    }), Li = (0, c.Z)(Ti, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-icon-x"), l = (0, r.up)("doc-icon-button");
        return (0, r.wg)(), (0, r.iD)("div", _i, [(0, r.wy)((0, r._)("input", {
            ref: "input",
            "onUpdate:modelValue": t[0] || (t[0] = function (t) {
                return e.query = t
            }),
            class: "w-full h-8 px-3 leading-8 transition-colors duration-200 ease-linear bg-white border border-gray-200 rounded shadow-none md:text-sm focus:outline-none focus:border-gray-600 dark:bg-dark-550 dark:border-dark-600 dark:hover:bg-dark-450 dark:hover:border-dark-450 dark:focus:bg-dark-450 dark:focus:border-dark-450 dark:text-white placeholder-gray-400 dark:placeholder-dark-400",
            type: "text",
            placeholder: e.placeholder,
            onFocus: t[1] || (t[1] = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.select && e.select.apply(e, t)
            })
        }, null, 40, Ci), [[r.nr, e.query, void 0, {trim: !0}]]), e.query ? ((0, r.wg)(), (0, r.j4)(l, {
            key: 0,
            ref: "closeBtn",
            class: "absolute top-0 right-0 w-6 h-6 mt-1 mr-1",
            onClick: e.clear
        }, {
            default: (0, r.w5)((function () {
                return [(0, r.Wm)(a)]
            })), _: 1
        }, 8, ["onClick"])) : (0, r.kq)("", !0)])
    }]]), Ai = (0, r.aZ)({
        name: "DocToolbarFilters", components: {DocToolbarAccess: Ei, DocToolbarMemberFilter: Li}, setup: function () {
            var e = (0, a.oR)().store;
            return {
                isFiltersDirty: (0, r.Fl)((function () {
                    return e.getters.isFiltersDirty()
                }))
            }
        }
    }), Ri = (0, c.Z)(Ai, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-toolbar-access"), l = (0, r.up)("doc-toolbar-member-filter"), c = (0, r.up)("doc-icon-filter"), u = (0, r.up)("doc-icon"),
            d = (0, r.up)("doc-dropdown");
        return (0, r.wg)(), (0, r.iD)("div", fi, [(0, r._)("div", mi, [(0, r.Wm)(a, {class: "ml-3"}), (0, r.Wm)(l, {class: "ml-3"})]), (0, r.Wm)(d, {
            class: "lg:hidden",
            align: "right",
            "menu-width": "13rem"
        }, {
            "button-content": (0, r.w5)((function (t) {
                var n = t.isOpen, o = t.isFocused;
                return [(0, r._)("button", {class: (0, r.C_)(["relative inline-flex items-center justify-center w-8 h-8 p-0 text-sm font-medium leading-none text-gray-900 whitespace-nowrap bg-white border rounded cursor-pointer select-none sm:w-auto sm:px-3 focus:outline-none focus:border-gray-600 dark:border-dark-650 dark:text-white dark:hover:bg-dark-450 transition-colors duration-200 ease-out", n || o ? "border-gray-600 dark:bg-dark-450" : "border-gray-400 dark:bg-dark-550"])}, [e.isFiltersDirty ? ((0, r.wg)(), (0, r.iD)("span", vi)) : (0, r.kq)("", !0), (0, r.Wm)(u, {
                    class: "mb-0 sm:mr-1",
                    width: "14",
                    height: "14"
                }, {
                    default: (0, r.w5)((function () {
                        return [(0, r.Wm)(c)]
                    })), _: 1
                }), gi], 2)]
            })), default: (0, r.w5)((function () {
                return [(0, r._)("div", bi, [(0, r._)("div", yi, [(0, r.Wm)(l)]), (0, r._)("div", wi, [(0, r.Wm)(a)])])]
            })), _: 1
        })])
    }]]), Di = (0, r.aZ)({
        name: "DocToolbar", components: {DocToolbarLinks: pi, DocToolbarFilters: Ri}, setup: function () {
            return {checkState: (0, r.iH)(!0), selected: (0, r.iH)([])}
        }
    }), Oi = (0, c.Z)(Di, [["render", function (e, t, n, o, i, s) {
        var a = (0, r.up)("doc-toolbar-links"), l = (0, r.up)("doc-toolbar-filters");
        return (0, r.wg)(), (0, r.iD)("div", $o, [(0, r.Wm)(a, {class: "grow-0"}), (0, r.Wm)(l)])
    }]]);
    var Mi = {key: 0, class: "w-full px-4 py-3 text-center text-red-800 bg-red-100 rounded dark:bg-red-400 dark:text-white"};
    const Ii = (0, r.aZ)({
        name: "DocToolbarMemberFilterNoResults", setup: function () {
            var e = (0, a.oR)().store, t = (0, r.Fl)((function () {
                return e.state.memberFilter
            })), n = (0, r.Fl)((function () {
                var t = 0;
                return R().toolbarLinks.forEach((function (n) {
                    t += e.getters.getVisibleGroupMembers(n.id).length
                })), t
            })), o = (0, r.Fl)((function () {
                return 0 === n.value
            })), i = (0, r.Fl)((function () {
                return R().filterNotFoundMsg.replace("{query}", t.value)
            }));
            return {query: t, noResults: o, notFoundMsg: i}
        }
    }), Fi = (0, c.Z)(Ii, [["render", function (e, t, n, o, i, s) {
        return e.query && e.noResults ? ((0, r.wg)(), (0, r.iD)("div", Mi, (0, r.zw)(e.notFoundMsg), 1)) : (0, r.kq)("", !0)
    }]]);
    var Pi = {d: "M21 9H7c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM3 7h18c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1zM21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1zM21 17H7c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z"};
    const Hi = (0, r.aZ)({name: "DocIconAlignRight"}), Ni = (0, c.Z)(Hi, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Pi)
    }]]);
    var Wi = {d: "M19 11H7.41l5.29-5.29a.996.996 0 10-1.41-1.41l-7 7a1 1 0 000 1.42l7 7a1.024 1.024 0 001.42-.01.996.996 0 000-1.41L7.41 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"};
    const Bi = (0, r.aZ)({name: "DocIconArrowLeft"}), Vi = (0, c.Z)(Bi, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Wi)
    }]]);
    var ji = {d: "M19.92 12.38a1 1 0 00-.22-1.09l-7-7a.996.996 0 10-1.41 1.41l5.3 5.3H5c-.55 0-1 .45-1 1s.45 1 1 1h11.59l-5.29 5.29a.996.996 0 000 1.41c.19.2.44.3.7.3s.51-.1.71-.29l7-7c.09-.09.16-.21.21-.33z"};
    const zi = (0, r.aZ)({name: "DocIconArrowRight"}), qi = (0, c.Z)(zi, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", ji)
    }]]);
    var $i = {d: "M19.71 11.29l-7-7a1 1 0 00-1.42 0l-7 7A.996.996 0 105.7 12.7L11 7.41V19c0 .55.45 1 1 1s1-.45 1-1V7.41l5.29 5.29c.2.2.45.3.71.3s.51-.1.71-.29c.39-.39.39-1.03 0-1.42z"};
    const Zi = (0, r.aZ)({name: "DocIconArrowTop"}), Ui = (0, c.Z)(Zi, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", $i)
    }]]);
    var Ki = {d: "M21.67 6.68c-.02-.07-.03-.15-.07-.22a.967.967 0 00-.25-.28c-.24-.3-.51-.58-.85-.78l-7-4c-.93-.53-2.08-.54-3 0l-7 4c-.35.2-.62.48-.86.79-.09.08-.17.16-.24.27-.03.07-.05.14-.07.21C2.13 7.08 2 7.53 2 8v8c0 1.07.58 2.06 1.5 2.6l7 4c.32.18.66.28 1.01.34.15.09.31.15.49.15s.34-.06.49-.15c.35-.06.69-.15 1.01-.34l7-4c.92-.54 1.5-1.53 1.5-2.6V8c0-.47-.13-.91-.33-1.32zM11.5 3.14c.15-.09.33-.14.5-.14.17 0 .35.05.5.14l6.46 3.69L12 10.85 5.04 6.83l6.46-3.69zm-7 13.73c-.31-.18-.5-.52-.5-.87V8.54l7 4.05v7.99l-6.5-3.71zm15-.01L13 20.58v-7.99l7-4.05V16c0 .35-.19.69-.5.86z"};
    const Yi = (0, r.aZ)({name: "DocIconBox"}), Gi = (0, c.Z)(Yi, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Ki)
    }]]);
    var Xi = {d: "M9 18.5c-.38 0-.77-.15-1.06-.44l-5-5a1.49 1.49 0 010-2.12 1.49 1.49 0 012.12 0L9 14.88l9.94-9.94a1.49 1.49 0 012.12 0c.59.59.59 1.54 0 2.12l-11 11c-.29.29-.68.44-1.06.44z"};
    const Ji = (0, r.aZ)({name: "DocIconCheck"}), Qi = (0, c.Z)(Ji, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Xi)
    }]]);
    var es = [(0, r._)("path", {d: "M21 9.09c-.55 0-1 .45-1 1v.92c0 4.96-4.04 8.99-9 8.99-4.97 0-9-4.04-9-9s4.04-9 9-9c1.27 0 2.5.26 3.66.78.51.22 1.1 0 1.32-.51.23-.5 0-1.1-.51-1.32C14.06.32 12.56 0 11.01 0H11C4.94 0 0 4.93 0 10.99 0 17.06 4.93 22 10.99 22H11c6.06 0 11-4.93 11-10.99v-.92c0-.56-.45-1-1-1z"}, null, -1), (0, r._)("path", {d: "M8.71 9.31a.996.996 0 10-1.41 1.41l3 3c.19.19.44.29.71.29.27 0 .52-.11.71-.29l10-10.01a.996.996 0 10-1.41-1.41L11 11.6 8.71 9.31z"}, null, -1)];
    const ts = (0, r.aZ)({name: "DocIconCheckCircle"}), ns = (0, c.Z)(ts, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, es)
    }]]);
    var rs = {d: "M12 16c-.26 0-.51-.1-.71-.29l-6-6A.996.996 0 116.7 8.3l5.3 5.29 5.29-5.29a.996.996 0 111.41 1.41l-6 6c-.19.19-.44.29-.7.29z"};
    const os = (0, r.aZ)({name: "DocIconChevronDown"}), is = (0, c.Z)(os, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", rs)
    }]]);
    var ss = {d: "M15.71 11.29l-6-6A.996.996 0 108.3 6.7l5.29 5.3-5.29 5.29a.996.996 0 000 1.41c.19.2.44.3.7.3s.51-.1.71-.29l6-6c.39-.39.39-1.03 0-1.42z"};
    const as = (0, r.aZ)({name: "DocIconChevronRight"}), ls = (0, c.Z)(as, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", ss)
    }]]);
    var cs = {d: "M20.92 8.62a.875.875 0 00-.22-.32l-7-7A.995.995 0 0013 1H6C4.35 1 3 2.35 3 4v16c0 1.65 1.35 3 3 3h12c1.65 0 3-1.35 3-3V9c0-.13-.03-.26-.08-.38zM14 4.41L17.59 8H14V4.41zM18 21H6c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h6v6c0 .55.45 1 1 1h6v10c0 .55-.45 1-1 1z"};
    const us = (0, r.aZ)({name: "DocIconFile"}), ds = (0, c.Z)(us, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", cs)
    }]]);
    var hs = {d: "M14 22c-.15 0-.31-.04-.45-.11l-4-2A.988.988 0 019 19v-6.17L1.24 3.65a.995.995 0 01-.14-1.07c.16-.35.51-.58.9-.58h20c.39 0 .74.23.91.58s.11.77-.14 1.07L15 12.83V21a.999.999 0 01-1 1zm-3-3.62l2 1v-6.92c0-.24.08-.47.24-.65L19.84 4H4.16l6.61 7.81c.15.18.24.41.24.65v5.92z"};
    const ps = (0, r.aZ)({name: "DocIconFilter"}), fs = (0, c.Z)(ps, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", hs)
    }]]);
    var ms = (0, r._)("path", {d: "M20 22H4c-1.65 0-3-1.35-3-3V5c0-1.65 1.35-3 3-3h5c.33 0 .65.17.83.45L11.54 5H20c1.65 0 3 1.35 3 3v11c0 1.65-1.35 3-3 3zM4 4c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-9c-.33 0-.65-.17-.83-.45L8.46 4H4z"}, null, -1),
        vs = (0, r._)("path", {fill: "none", d: "M0 0h24v24H0z"}, null, -1);
    const gs = (0, r.aZ)({name: "DocIconFolder"}), bs = (0, c.Z)(gs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)(r.HY, null, [ms, vs], 64)
    }]]);
    var ys = [(0, r._)("path", {d: "M12.01 6.01c-.55 0-1 .45-1 1V12a1 1 0 00.4.8l3 2.22a.985.985 0 001.39-.2.996.996 0 00-.21-1.4l-2.6-1.92V7.01c.02-.55-.43-1-.98-1z"}, null, -1), (0, r._)("path", {d: "M12.01 1.91c-5.33 0-9.69 4.16-10.05 9.4l-.29-.26a.997.997 0 10-1.34 1.48l1.97 1.79c.19.17.43.26.67.26s.48-.09.67-.26l1.97-1.79a.997.997 0 10-1.34-1.48l-.31.28c.34-4.14 3.82-7.41 8.05-7.41 4.46 0 8.08 3.63 8.08 8.09s-3.63 8.08-8.08 8.08c-2.18 0-4.22-.85-5.75-2.4a.996.996 0 10-1.42 1.4 10.02 10.02 0 007.17 2.99c5.56 0 10.08-4.52 10.08-10.08.01-5.56-4.52-10.09-10.08-10.09z"}, null, -1)];
    const ws = (0, r.aZ)({name: "DocIconHistory"}), Ss = (0, c.Z)(ws, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, ys)
    }]]);
    var ks = {d: "M21.61 8.21l-9-7c-.36-.28-.87-.28-1.23 0l-9 7C2.14 8.4 2 8.69 2 9v11c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3V9c0-.31-.14-.6-.39-.79zM14 21h-4v-8h4v8zm6-1c0 .55-.45 1-1 1h-3v-9c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v9H5c-.55 0-1-.45-1-1V9.49l8-6.22 8 6.22V20z"};
    const xs = (0, r.aZ)({name: "DocIconHome"}), Es = (0, c.Z)(xs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", ks)
    }]]);
    var _s = [(0, r._)("path", {d: "M12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9z"}, null, -1), (0, r._)("path", {d: "M12 11c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zM12.01 7c-.56 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"}, null, -1), (0, r._)("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
    }, null, -1)];
    const Cs = (0, r.aZ)({name: "DocIconInfo"}), Ts = (0, c.Z)(Cs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, _s)
    }]]);
    var Ls = [(0, r._)("path", {d: "M.55 6.89l10 5c.14.07.3.11.45.11s.31-.04.45-.11l10-5c.34-.16.55-.51.55-.89s-.21-.73-.55-.89l-10-5a.995.995 0 00-.89 0l-10 5C.21 5.27 0 5.62 0 6s.21.73.55.89zM11 2.12L18.76 6 11 9.88 3.24 6 11 2.12zM20.55 15.11L11 19.88 1.45 15.1c-.49-.25-1.09-.05-1.34.45s-.05 1.09.45 1.34l10 5a.956.956 0 00.89 0l10-5c.49-.25.69-.85.45-1.34-.25-.49-.85-.69-1.35-.44z"}, null, -1), (0, r._)("path", {d: "M20.55 10.11L11 14.88 1.45 10.1a.993.993 0 00-1.34.45.993.993 0 00.45 1.34l10 5a.956.956 0 00.89 0l10-5c.49-.25.69-.85.45-1.34-.25-.49-.85-.69-1.35-.44z"}, null, -1)];
    const As = (0, r.aZ)({name: "DocIconLayers"}), Rs = (0, c.Z)(As, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, Ls)
    }]]);
    var Ds = [(0, r._)("path", {d: "M21.11 2.75a5.98 5.98 0 00-8.35.01l-1.72 1.71a.996.996 0 101.41 1.41l1.71-1.7c1.56-1.5 4-1.5 5.56 0 1.59 1.53 1.63 4.07.11 5.64l-3 3c-.13.13-.28.26-.43.38a4.003 4.003 0 01-5.6-.81c-.33-.44-.96-.53-1.4-.2-.44.33-.53.96-.2 1.4a5.999 5.999 0 004.81 2.4c1.25 0 2.51-.39 3.58-1.19.23-.17.45-.36.65-.56l3.01-3.01a5.991 5.991 0 00-.14-8.48z"}, null, -1), (0, r._)("path", {d: "M11.53 18.11l-1.7 1.7c-1.56 1.5-4 1.5-5.56 0-1.59-1.53-1.63-4.07-.11-5.64l3-3c.14-.14.28-.26.43-.38a3.997 3.997 0 015.6.8c.33.44.96.53 1.4.2.44-.33.53-.96.2-1.4a5.93 5.93 0 00-3.95-2.34c-1.58-.22-3.15.18-4.44 1.14-.23.17-.44.36-.65.56l-3.01 3.01c-2.3 2.38-2.23 6.19.15 8.48a5.956 5.956 0 004.16 1.69c1.5 0 3.01-.57 4.19-1.7l1.71-1.71c.39-.39.39-1.02 0-1.41s-1.03-.39-1.42 0z"}, null, -1)];
    const Os = (0, r.aZ)({name: "DocIconLink"}), Ms = (0, c.Z)(Os, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, Ds)
    }]]);
    var Is = {d: "M2 4h20v2H2zM2 11h20v2H2zM2 18h20v2H2z"};
    const Fs = (0, r.aZ)({name: "DocIconMenu"}), Ps = (0, c.Z)(Fs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Is)
    }]]);
    var Hs = {d: "M19 13H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z"};
    const Ns = (0, r.aZ)({name: "DocIconMinus"}), Ws = (0, c.Z)(Ns, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Hs)
    }]]);
    var Bs = [(0, r._)("path", {d: "M11 22C4.93 22 0 17.07 0 11S4.93 0 11 0s11 4.93 11 11-4.93 11-11 11zm0-20c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9z"}, null, -1), (0, r._)("path", {d: "M16.5 11c0 3.05-2.46 5.51-5.49 5.51-2.16 0-4.02-1.25-4.92-3.05-.11-.22.08-.49.32-.43 1.15.28 2.43.2 3.71-.42 1.88-.9 3.07-2.89 3.06-4.97 0-.42-.05-.83-.15-1.22-.06-.24.21-.43.43-.32 1.79.88 3.04 2.74 3.04 4.9z"}, null, -1)];
    const Vs = (0, r.aZ)({name: "DocIconMoon"}), js = (0, c.Z)(Vs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, Bs)
    }]]);
    var zs = [(0, r._)("circle", {cx: "12", cy: "12", r: "2"}, null, -1), (0, r._)("circle", {cx: "19", cy: "12", r: "2"}, null, -1), (0, r._)("circle", {
        cx: "5",
        cy: "12",
        r: "2"
    }, null, -1)];
    const qs = (0, r.aZ)({name: "DocIconMoreHorizontal"}), $s = (0, c.Z)(qs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("g", null, zs)
    }]]);
    var Zs = {d: "M19 11h-6V5c0-.55-.45-1-1-1s-1 .45-1 1v6H5c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1v-6h6c.55 0 1-.45 1-1s-.45-1-1-1z"};
    const Us = (0, r.aZ)({name: "DocIconPlus"}), Ks = (0, c.Z)(Us, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Zs)
    }]]);
    var Ys = {d: "M21.71 20.29l-3.68-3.68A8.963 8.963 0 0020 11c0-4.96-4.04-9-9-9s-9 4.04-9 9 4.04 9 9 9c2.12 0 4.07-.74 5.61-1.97l3.68 3.68c.2.19.45.29.71.29s.51-.1.71-.29c.39-.39.39-1.03 0-1.42zM4 11c0-3.86 3.14-7 7-7s7 3.14 7 7c0 1.92-.78 3.66-2.04 4.93-.01.01-.02.01-.02.01-.01.01-.01.01-.01.02A6.98 6.98 0 0111 18c-3.86 0-7-3.14-7-7z"};
    const Gs = (0, r.aZ)({name: "DocIconSearch"}), Xs = (0, c.Z)(Gs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Ys)
    }]]);
    var Js = {d: "M12 23c-.15 0-.31-.04-.45-.11C11.2 22.72 3 18.54 3 12V5c0-.42.26-.79.65-.94l8-3c.23-.08.48-.08.7 0l8 3c.39.15.65.52.65.94v7c0 6.54-8.2 10.72-8.55 10.89-.14.07-.3.11-.45.11zM5 5.69V12c0 4.55 5.39 7.95 7 8.86 1.61-.92 7-4.33 7-8.86V5.69l-7-2.63-7 2.63z"};
    const Qs = (0, r.aZ)({name: "DocIconShield"}), ea = (0, c.Z)(Qs, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", Js)
    }]]);
    var ta = {d: "M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM12 4c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zM12 20c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1zM4.93 6.35c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 000-1.41L4.93 3.51a.996.996 0 10-1.41 1.41l1.41 1.43zM19.07 17.65a.996.996 0 10-1.41 1.41l1.42 1.42c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 000-1.41l-1.43-1.42zM4 12c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zM23 11h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zM4.93 17.65l-1.42 1.42a.996.996 0 00.71 1.7c.26 0 .51-.1.71-.29l1.42-1.42c.39-.39.39-1.02 0-1.41s-1.03-.39-1.42 0zM18.36 6.64c.26 0 .51-.1.71-.29l1.42-1.42a.996.996 0 10-1.41-1.41l-1.42 1.42a.996.996 0 00.7 1.7z"};
    const na = (0, r.aZ)({name: "DocIconSun"}), ra = (0, c.Z)(na, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", ta)
    }]]);
    var oa = {d: "M13.41 12l5.29-5.29a.996.996 0 10-1.41-1.41L12 10.59l-5.29-5.3A.996.996 0 105.3 6.7l5.29 5.3-5.29 5.29a.996.996 0 000 1.41c.19.2.44.3.7.3s.51-.1.71-.29l5.29-5.3 5.29 5.29c.2.2.45.3.71.3s.51-.1.71-.29a.996.996 0 000-1.41l-5.3-5.3z"};
    const ia = (0, r.aZ)({name: "DocIconX"}), sa = (0, c.Z)(ia, [["render", function (e, t, n, o, i, s) {
        return (0, r.wg)(), (0, r.iD)("path", oa)
    }]])
}, 6850
:
(e, t, n) => {
    "use strict";
    n.d(t, {w: () => o});
    var r = n(7023);

    function o(e) {
        (0, r.zX)(document.body, "click", (function (t) {
            e(t)
        }))
    }
}, 7023
:
(e, t, n) => {
    "use strict";
    n.d(t, {BK: () => s, Up: () => i, zX: () => o});
    var r = n(5166);

    function o(e, t, n) {
        var o = function () {
            return e.removeEventListener(t, n)
        };
        return (0, r.bv)((function () {
            e && e.addEventListener(t, n)
        })), (0, r.Jd)(o), o
    }

    function i(e, t, n, r, i) {
        return o(e, t, s(n, r, i))
    }

    function s(e, t, n) {
        var r, o = 0, i = -1;
        return function () {
            ++o % t == 0 ? e() : (i = o, r || (r = setTimeout((function () {
                var t = i >= o;
                o = 0, i = -1, r = void 0, t && e()
            }), n, null)))
        }
    }
}, 2376
:
(e, t, n) => {
    "use strict";
    n.d(t, {i: () => s});
    var r = n(5166), o = function (e, t, n, r) {
        return new (n || (n = Promise))((function (o, i) {
            function s(e) {
                try {
                    l(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    l(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(s, a)
            }

            l((r = r.apply(e, t || [])).next())
        }))
    }, i = function (e, t) {
        var n, r, o, i, s = {
            label: 0, sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            }, trys: [], ops: []
        };
        return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function a(a) {
            return function (l) {
                return function (a) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                        if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                        switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return s.label++, {value: a[1], done: !1};
                            case 5:
                                s.label++, r = a[1], a = [0];
                                continue;
                            case 7:
                                a = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                    s.label = a[1];
                                    break
                                }
                                if (6 === a[0] && s.label < o[1]) {
                                    s.label = o[1], o = a;
                                    break
                                }
                                if (o && s.label < o[2]) {
                                    s.label = o[2], s.ops.push(a);
                                    break
                                }
                                o[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        a = t.call(e, s)
                    } catch (e) {
                        a = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & a[0]) throw a[1];
                    return {value: a[0] ? a[1] : void 0, done: !0}
                }([a, l])
            }
        }
    };

    function s(e) {
        var t = (0, r.iH)(), n = (0, r.iH)(!1), s = (0, r.iH)(null);
        return {
            result: t, loading: n, error: s, execute: function (r, a) {
                return o(this, void 0, void 0, (function () {
                    var o, l, c, u;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return i.trys.push([0, 6, 7, 8]), n.value = !0, [4, fetch(r, a)];
                            case 1:
                                if (!(o = i.sent()).ok) throw new Error(o.statusText);
                                return e ? [4, e(o)] : [3, 3];
                            case 2:
                                return c = i.sent(), [3, 5];
                            case 3:
                                return [4, o.json()];
                            case 4:
                                c = i.sent(), i.label = 5;
                            case 5:
                                return l = c, t.value = l, [3, 8];
                            case 6:
                                return u = i.sent(), s.value = u, [3, 8];
                            case 7:
                                return n.value = !1, [7];
                            case 8:
                                return [2]
                        }
                    }))
                }))
            }
        }
    }
}, 5701
:
(e, t, n) => {
    "use strict";
    n.d(t, {Ke: () => i, Mu: () => s, ft: () => a});
    var r = n(4678), o = n(5166), i = (0, r.MT)("retype", "store"), s = Symbol("DocsIdbStore");

    function a() {
        return {idbStore: (0, o.f3)(s)}
    }
}, 8816
:
(e, t, n) => {
    "use strict";
    n.d(t, {xf: () => x, v2: () => L, Rx: () => A});
    var r = n(5166), o = n(4678), i = n(1296), s = n.n(i), a = n(6184), l = n(9984), c = n.n(l);
    const u = () => window.__DOCS_LUNR__;
    var d = n.n(u), h = n(5701), p = n(6850), f = n(5184), m = n(9341), v = n(5543), g = n(830), b = n(2376), y = n(2110), w = n(7755), S = function (e, t, n, r) {
        return new (n || (n = Promise))((function (o, i) {
            function s(e) {
                try {
                    l(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    l(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(s, a)
            }

            l((r = r.apply(e, t || [])).next())
        }))
    }, k = function (e, t) {
        var n, r, o, i, s = {
            label: 0, sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            }, trys: [], ops: []
        };
        return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function a(a) {
            return function (l) {
                return function (a) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                        if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                        switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return s.label++, {value: a[1], done: !1};
                            case 5:
                                s.label++, r = a[1], a = [0];
                                continue;
                            case 7:
                                a = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                    s.label = a[1];
                                    break
                                }
                                if (6 === a[0] && s.label < o[1]) {
                                    s.label = o[1], o = a;
                                    break
                                }
                                if (o && s.label < o[2]) {
                                    s.label = o[2], s.ops.push(a);
                                    break
                                }
                                o[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        a = t.call(e, s)
                    } catch (e) {
                        a = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & a[0]) throw a[1];
                    return {value: a[0] ? a[1] : void 0, done: !0}
                }([a, l])
            }
        }
    }, x = Symbol("DocsSearch"), E = (0, h.ft)().idbStore, _ = !1;

    function C(e, t) {
        var n;
        return S(this, void 0, void 0, (function () {
            var r, o, i;
            return k(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return r = {map: null, index: null}, e.length && t ? (r.map = function (e, t) {
                            var n = 0, r = 0, o = new Map, i = c().appendDocumentName ? c().documentName : "";
                            return function e(t, s, a) {
                                t.forEach((function (t) {
                                    var l = a ? a + " > " + t.label : t.label;
                                    t.clickable && (s[r].forEach((function (e) {
                                        var r, s, a, u = e.i || (null === (r = e.l) || void 0 === r ? void 0 : r.toLowerCase().replace(/[\s\-.]+/g, "-"));
                                        if (u && (e.l || (null === (s = e.p) || void 0 === s ? void 0 : s.length))) {
                                            var d = u && "#" !== u ? "#" + u : "",
                                                h = "/" === t.path ? "".concat(i).concat(d) : !c().trailingSlash && i && t.path ? "".concat(t.path, "/").concat(i).concat(d) : "".concat(t.path).concat(i).concat(d);
                                            e.l && o.set((++n).toString(), {
                                                path: h,
                                                text: e.l,
                                                page: l
                                            }), (null === (a = e.p) || void 0 === a ? void 0 : a.length) && e.p.forEach((function (t) {
                                                o.set((++n).toString(), {path: h, text: t, heading: e.l, page: l})
                                            }))
                                        }
                                    })), r++), t.children && e(t.children, s, l)
                                }))
                            }(e, t, ""), o
                        }(e, t), null == r.map ? [3, 2] : [4, (0, w.T)("lunr-js", d())]) : [2, r];
                    case 1:
                        (o = s.sent()) && (i = [], null === (n = r.map) || void 0 === n || n.forEach((function (e, t) {
                            return i.push([t, e])
                        })), r.index = o.createIndex(i)), s.label = 2;
                    case 2:
                        return [2, r]
                }
            }))
        }))
    }

    function T() {
        return "/" === c().base ? "search" : c().base + "search"
    }

    function L() {
        return S(this, void 0, void 0, (function () {
            var e;
            return k(this, (function (t) {
                switch (t.label) {
                    case 0:
                        return e = T(), [4, (0, o.IV)(e, E)];
                    case 1:
                        return t.sent(), _ = !0, [2]
                }
            }))
        }))
    }

    function A(e) {
        var t = this, n = (0, m.oR)().store, i = (0, r.iH)(null), l = (0, r.iH)(null), u = (0, r.Fl)((function () {
            return n.state.searchQuery
        })), h = (0, r.iH)([]), x = (0, r.iH)(!1), L = (0, r.iH)(!1), A = (0, r.iH)(0), R = (0, r.Fl)((function () {
            var t;
            return null === (t = e.value) || void 0 === t ? void 0 : t.querySelector("input")
        }));

        function D(e) {
            var t, n, r, o, s;
            return S(this, void 0, void 0, (function () {
                var a, u, p, f, m, v, g, b;
                return k(this, (function (y) {
                    switch (y.label) {
                        case 0:
                            return l.value && i.value ? e ? e.length >= c().search.minChars ? (a = [], [4, (0, w.T)("lunr-js", d())]) : [3, 2] : (h.value = [], [2]) : [2];
                        case 1:
                            for ((u = y.sent()) && (p = e.toLowerCase().trim(), a = u.query(l.value, p)), f = [], m = 0; m < c().search.maxResults && a[m]; m++) (v = i.value.get(a[m].ref)) && (g = O(null === (t = a[m].matchData) || void 0 === t ? void 0 : t.metadata), b = M(null !== (n = v.text) && void 0 !== n ? n : "", g), f.push({
                                id: a[m].ref,
                                path: null !== (r = v.path) && void 0 !== r ? r : "",
                                heading: null !== (o = v.heading) && void 0 !== o ? o : "",
                                page: null !== (s = v.page) && void 0 !== s ? s : "",
                                text: b
                            }));
                            h.value = f, y.label = 2;
                        case 2:
                            return [2]
                    }
                }))
            }))
        }

        function O(e) {
            var t, n, r, o = [], i = e;
            if (i) for (var s in i) {
                var a = null === (n = null === (t = i[s]) || void 0 === t ? void 0 : t.text) || void 0 === n ? void 0 : n.position;
                if (null == a ? void 0 : a.length) for (var l = 0; l < a.length; ++l) 2 === (null === (r = a[l]) || void 0 === r ? void 0 : r.length) && a[l][1] > 0 && o.push([a[l][0], a[l][0] + a[l][1]])
            }
            return o
        }

        function M(e, t, n) {
            if (void 0 === n && (n = 24), !t.length) {
                var r = e.trim().split(/\s+/).filter((function (e) {
                    return e
                }));
                return r.length > n && (r = r.slice(0, n)).push("..."), r.join(" ")
            }
            t.sort((function (e, t) {
                return e[0] - t[0]
            }));
            for (var o = t.length - 2; o >= 0; --o) t[o][1] >= t[o + 1][0] && (t[o][1] = Math.max(t[o][1], t[o + 1][1]), t.splice(o + 1, 1));
            var i = [], s = 0, a = -1, l = -1;
            for (o = 0; o < t.length; ++o) {
                var c = t[o][0], u = t[o][1], d = e.slice(s, c);
                if (d) {
                    var h = d.trim().split(/\s+/).filter((function (e) {
                        return e
                    })).map((function (e) {
                        return [e, !1]
                    }));
                    i.push.apply(i, h)
                }
                -1 === a ? (a = i.length, l = i.length) : l = i.length, i.push(['<span class="text-blue-500 dark:text-blue-400 font-semibold">'.concat(e.slice(c, u), "</span>"), !0]), s = u
            }
            if (s < e.length) {
                var p = e.slice(s);
                if (p) {
                    var f = p.trim().split(/\s+/).filter((function (e) {
                        return e
                    })).map((function (e) {
                        return [e, !1]
                    }));
                    i.push.apply(i, f)
                }
            }
            for (var m = 0, v = 1 + l - a, g = i.length - 1; v < n;) {
                if (a > 0 && (m % 2 == 0 || l >= g)) --a; else {
                    if (!(l < g)) break;
                    ++l
                }
                ++m, ++v
            }
            v > n && (l -= v - n);
            var b = i.slice(a, l + 1).map((function (e) {
                return e[0]
            }));
            return a > 0 && b.splice(0, 0, "..."), l < i.length - 1 && b.push("..."), b.join(" ")
        }

        (0, r.YP)(u, s()((function (e) {
            return S(this, void 0, void 0, (function () {
                return k(this, (function (t) {
                    switch (t.label) {
                        case 0:
                            return [4, D(e)];
                        case 1:
                            return t.sent(), e.length >= c().search.minChars || h.value.length > 0 ? x.value = !0 : (x.value = !1, A.value = 0), [2]
                    }
                }))
            }))
        }), 50)), (0, p.w)((function (t) {
            var n, r = t.target;
            e.value === r || (null === (n = e.value) || void 0 === n ? void 0 : n.contains(r)) || (L.value = !1)
        }));
        var I = (0, f.B)().scrollTo;

        function F(e, t) {
            var o;
            if (x.value = !1, L.value = !1, A.value = 0, setTimeout((function () {
                var e;
                null === (e = R.value) || void 0 === e || e.blur()
            }), 100), e) {
                var i = P(e, t);
                (0, a.Vn)(i);
                var s = null === (o = i.split("/").pop()) || void 0 === o ? void 0 : o.substring(1);
                if (s && document.getElementById(s)) {
                    if (s.split("-").length > 1) {
                        var l = !1;
                        for (var c in n.state.memberGroups) {
                            if (l) break;
                            for (var u in n.state.memberGroups[c]) if (s === u) {
                                n.state.memberGroups[c][u].isOpen = !0, l = !0;
                                break
                            }
                        }
                    }
                    (0, r.Y3)((function () {
                        I("#".concat(s), {
                            offset: v.vE, onDone: function () {
                                n.actions.updateScrolledElementId(s)
                            }
                        })
                    }))
                }
            }
        }

        function P(e, t) {
            return t = null != t ? t : (0, g.Rs)(), e.startsWith("#") ? (0, g.wE)(t) + e : t + e
        }

        function H() {
            var t, n = null === (t = e.value) || void 0 === t ? void 0 : t.querySelector("ul"), r = null == n ? void 0 : n.children.item(A.value);
            null == r || r.scrollIntoView({block: "nearest"})
        }

        var N = c().preloadSearch ? (0, b.i)((function (e) {
                return S(t, void 0, void 0, (function () {
                    var t, n, r;
                    return k(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return "file:" === location.protocol.toLowerCase() ? [2, void 0] : [4, e.text()];
                            case 1:
                                return t = o.sent(), n = t.indexOf("="), r = t.slice(n + 1).trim().slice(0, -1), [2, JSON.parse(r)]
                        }
                    }))
                }))
            })) : (0, b.i)(), W = N.execute, B = N.error, V = N.result, j = c().preloadSearch ? "js" : "json",
            z = c().cacheBustingToken && "none" != c().cacheBustingStrategy ? "path" == c().cacheBustingStrategy ? "".concat(location.origin).concat(y.uj, ".").concat(c().cacheBustingToken, ".").concat(j) : "".concat(location.origin).concat(y.uj, ".").concat(j, "?v=").concat(c().cacheBustingToken) : "".concat(location.origin).concat(y.uj, ".").concat(j),
            q = (0, r.Fl)((function () {
                return n.state.sidebar
            })), $ = T();
        (0, r.YP)(L, (function (e) {
            e && (function () {
                S(this, void 0, void 0, (function () {
                    var e, t, n, r, s, a, u;
                    return k(this, (function (h) {
                        switch (h.label) {
                            case 0:
                                return [4, (0, o.U2)($, E)];
                            case 1:
                                return (e = h.sent()) && e.id === c().id ? (i.value || (i.value = e.map), l.value ? [3, 3] : [4, (0, w.T)("lunr-js", d())]) : [3, 4];
                            case 2:
                                (t = h.sent()) && (n = JSON.parse(e.index), l.value = t.loadIndex(n)), h.label = 3;
                            case 3:
                                return [3, 10];
                            case 4:
                                return [4, (0, o.IV)($, E)];
                            case 5:
                                return h.sent(), r = void 0, !_ && c().preloadSearch ? [3, 7] : [4, W(z)];
                            case 6:
                                if (h.sent(), B.value) throw new Error("Error fetching search data. ".concat(B.value));
                                r = V.value, h.label = 7;
                            case 7:
                                return r || (r = window.__DOCS_SEARCH__), _ = !1, [4, C(q.value.data, r)];
                            case 8:
                                return s = h.sent(), a = s.index, u = s.map, i.value = u, l.value = a, [4, (0, o.t8)($, {index: JSON.stringify(a), map: u, id: c().id}, E)];
                            case 9:
                                h.sent(), h.label = 10;
                            case 10:
                                return [2]
                        }
                    }))
                }))
            }(), H())
        }));
        var Z = (0, r.qj)({
            input: R, isOpen: x, isFocused: L, results: h, focusIndex: A, clear: function () {
                var e;
                n.actions.updateSearchQuery(""), null === (e = R.value) || void 0 === e || e.focus()
            }, onKeydown: function (e) {
                if (h.value.length) switch (e.code) {
                    case"ArrowDown":
                        e.preventDefault(), A.value < h.value.length - 1 && (A.value++, H());
                        break;
                    case"ArrowUp":
                        e.preventDefault(), A.value > 0 && (A.value--, H());
                        break;
                    case"Enter":
                        e.preventDefault(), F(h.value[A.value].path);
                        break;
                    case"Escape":
                        x.value = !1, n.actions.updateSearchQuery("")
                }
            }, navigateToResult: F, getResultFullPath: P
        });
        return Z
    }
}, 5184
:
(e, t, n) => {
    "use strict";

    function r() {
        var e = {duration: 500, offset: 0}, t = null;
        return {
            scrollTo: function (n, r) {
                var o, i = Object.assign({}, e, r), s = decodeURI(n),
                    a = null !== (o = document.getElementById(n.startsWith("#") ? s.slice(1) : n)) && void 0 !== o ? o : document.querySelector(s);
                if (!a) throw new Error("Invalid target");
                var l = "function" == typeof i.offset ? i.offset() : i.offset, c = a.getBoundingClientRect().top, u = window.scrollY || window.pageYOffset, d = c + u - u + l;
                i.onStart && "function" == typeof i.onStart && i.onStart(), window.requestAnimationFrame((function e(n) {
                    t || (t = n);
                    var r = n - t, o = function (e, t, n, r) {
                        return -n * (e /= r) * (e - 2) + t
                    }(r, u, d, i.duration);
                    window.scrollTo(0, o), r < i.duration ? window.requestAnimationFrame(e) : (i.onDone && "function" == typeof i.onDone && i.onDone(), t = null)
                }))
            }
        }
    }

    n.d(t, {B: () => r})
}, 2110
:
(e, t, n) => {
    "use strict";
    n.d(t, {as: () => s, bT: () => l, u: () => c, uj: () => a});
    var r = n(9984), o = n.n(r), i = "resources", s = "".concat(o().base).concat(i, "/nav"), a = "".concat(o().base).concat(i, "/js/search"),
        l = new Uint8Array([83, 72, 65, 45, 50, 53, 54]), c = new Uint8Array([82, 83, 65, 83, 83, 65, 45, 80, 75, 67, 83, 49, 45, 118, 49, 95, 53])
}, 7755
:
(e, t, n) => {
    "use strict";

    function r(e, t, n) {
        var o = t();
        if (o && o.default) n(o.default); else if (e) {
            var i = document.getElementById(e);
            i && i.addEventListener("load", (function () {
                return r(null, t, n)
            }))
        }
    }

    function o(e, t) {
        return new Promise((function (n, o) {
            try {
                r(e, t, (function (e) {
                    n(e)
                }))
            } catch (e) {
                o(e)
            }
        }))
    }

    n.d(t, {T: () => o, b: () => r})
}, 9341
:
(e, t, n) => {
    "use strict";
    n.d(t, {$Q: () => c, h: () => d, oR: () => h});
    var r = n(9984), o = n.n(r), i = n(5166), s = n(5543), a = n(872);
    (0, i.aZ)({
        name: "DocStoreDebug", setup: function () {
            var e = (0, i.iH)(!1), t = (0, i.Fl)((function () {
                return d.state
            })), n = (0, i.Fl)((function () {
                return {"top-0 max-w-md p-5 text-sm": e.value, "px-3 flex items-center text-xs mr-0 mb-0": !e.value}
            }));
            return {
                state: t, isOpen: e, classes: n, toggle: function () {
                    e.value = !e.value
                }
            }
        }
    });
    var l = function () {
        return l = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, l.apply(this, arguments)
    }, c = Symbol("DocsStore"), u = {
        inherited: !0, access: o().access.map((function (e) {
            return e.value
        }))
    }, d = {
        state: (0, i.qj)({
            initialPageLoad: !0,
            unloading: !1,
            inherited: u.inherited,
            isWindowScrolling: !1,
            isScrollPositionRestored: !1,
            memberFilter: "",
            scrolledElementId: "",
            searchQuery: "",
            sidebarRightHasContent: !1,
            sidebarScroll: 0,
            sidebarActiveEl: void 0,
            sidebar: {id: "", data: []},
            sidebarLookup: new Map,
            memberGroups: (0, a.s)(),
            access: u.access
        }), actions: {
            setMemberData: function (e, t, n, r) {
                d.state.memberGroups[e][t] || (d.state.memberGroups[e][t] = {
                    isOpen: !1,
                    isVisible: !0,
                    animations: !0,
                    access: "public",
                    name: "UnknownMember"
                }), d.state.memberGroups[e][t][n] = r
            }, resetMemberData: function () {
                Object.keys(d.state.memberGroups).forEach((function (e) {
                    d.state.memberGroups[e] = {}
                }))
            }, updateAccess: function (e) {
                d.state.access = e, (0, s.Nh)(o().base, localStorage, "doc_access", e)
            }, setInherited: function (e) {
                d.state.inherited = e
            }, toggleInherited: function () {
                d.state.inherited = !d.state.inherited, (0, s.Nh)(o().base, localStorage, "doc_inherited", d.state.inherited)
            }, updateMemberFilter: function (e) {
                d.state.memberFilter = e
            }, updateScrolledElementId: function (e) {
                d.state.scrolledElementId = e
            }, updateSearchQuery: function (e) {
                d.state.searchQuery = e
            }, setSidebarData: function (e) {
                d.state.sidebar = e, (0, s.Nh)(o().base, sessionStorage, "doc_sidebar", e)
            }, setSidebarLookupData: function (e) {
                d.state.sidebarLookup = e
            }, setSidebarScroll: function (e) {
                d.state.sidebarScroll = e, (0, s.Nh)(o().base, sessionStorage, "doc_sidebar_scroll", e)
            }, setActiveSidebarEl: function (e) {
                d.state.sidebarActiveEl = e
            }, setWindowScrollingState: function (e) {
                d.state.isWindowScrolling = e
            }, updateSidebarLookupItem: function (e, t, n) {
                e[t] = n;
                var r = (0, s.qn)(o().base, sessionStorage, "doc_sidebar");
                r && (0, s.Nh)(o().base, sessionStorage, "doc_sidebar", l(l({}, r), d.state.sidebar))
            }
        }, getters: {
            isAccessDirty: function () {
                return u.access.length !== d.state.access.length
            }, isFiltersDirty: function () {
                return u.access.length !== d.state.access.length || u.inherited !== d.state.inherited || "" !== d.state.memberFilter
            }, getVisibleGroupMembers: function (e) {
                return Object.values(d.state.memberGroups[e]).filter((function (e) {
                    return !0 === e.isVisible
                }))
            }
        }
    };

    function h() {
        return {store: (0, i.f3)(c)}
    }
}, 872
:
(e, t, n) => {
    "use strict";
    n.d(t, {g: () => a, s: () => s});
    var r = n(9984), o = n.n(r), i = n(5543);

    function s() {
        var e = {};
        return o().toolbarLinks.forEach((function (t) {
            e[t.id] = {}
        })), e
    }

    function a(e) {
        if (e.state.initialPageLoad) {
            var t = (0, i.qn)(o().base, sessionStorage, "doc_sidebar_scroll");
            null !== t && e.actions.setSidebarScroll(t);
            var n = (0, i.qn)(o().base, sessionStorage, "doc_sidebar");
            null !== n && e.actions.setSidebarData(n);
            var r = (0, i.qn)(o().base, localStorage, "doc_inherited");
            null !== r && e.actions.setInherited(r);
            var s = (0, i.qn)(o().base, localStorage, "doc_access");
            null !== s && e.actions.updateAccess(s)
        }
    }
}, 5543
:
(e, t, n) => {
    "use strict";
    n.d(t, {Nh: () => a, Sy: () => c, am: () => u, pI: () => v, qn: () => s, rw: () => f, vE: () => l});
    var r = n(9984), o = n.n(r), i = function (e, t, n) {
        if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    };

    function s(e, t, n) {
        var r = h(n) ? d(e, n) : n, o = t.getItem(r);
        return o && "null" !== o ? "{" === o[0] || "[" === o[0] || '"' === o[0] || "true" === o || "false" === o ? JSON.parse(o) : o : null
    }

    function a(e, t, n, r) {
        var o = h(n) ? d(e, n) : n, i = "string" != typeof r ? JSON.stringify(r) : r;
        t.setItem(o, i)
    }

    function l() {
        var e = document.getElementById("docs-site-header"), t = document.getElementById("docs-toolbar"), n = 20;
        return n += e ? e.offsetHeight : 0, -(n += t ? t.offsetHeight : 0)
    }

    function c(e) {
        var t, n, r,
            i = ((t = {})[o().resources.History_YearTime_Label] = 31536e3, t[o().resources.History_MonthTime_Label] = 2592e3, t[o().resources.History_DayTime_Label] = 86400, t[o().resources.History_HourTime_Label] = 3600, t[o().resources.History_MinuteTime_Label] = 60, t[o().resources.History_SecondTime_Label] = 1, t),
            s = Math.floor((Date.now() - e) / 1e3);
        return Object.keys(i).some((function (e) {
            return n = Math.floor(s / i[e]), r = e, n >= 1
        })), 0 === n ? o().resources.History_JustNowTime_Label : "".concat(n).concat(r, " ").concat(o().resources.History_AgoTime_Label)
    }

    function u(e, t, n, r, o) {
        if (void 0 === r && (r = ""), void 0 === o && (o = []), !t || !t.length) return [];
        var i = [];
        return t.forEach((function (t) {
            var s, a = p(e, t, n, r, o);
            (null === (s = a.parentNodes) || void 0 === s ? void 0 : s.length) && a.parentNodes.splice(-1, 1), i.push(a)
        })), i
    }

    function d(e, t) {
        return e && "/" !== e ? e + t : t
    }

    function h(e) {
        switch (e) {
            case"doc_theme":
                return !1;
            case"doc_access":
            case"doc_history":
            case"doc_inherited":
            case"doc_sidebar":
            case"doc_sidebar_scroll":
                return !0;
            default:
                throw new Error("Unexpected storage key.")
        }
    }

    function p(e, t, n, r, o) {
        void 0 === r && (r = ""), void 0 === o && (o = []);
        var s = {};
        s.path = n ? t.n.startsWith("/") ? "".concat(t.n.slice(1), "/") : "".concat(r).concat(t.n, "/") : t.n.startsWith("/") ? "".concat(t.n.slice(1)) : !r || r.endsWith("/") ? "".concat(r).concat(t.n) : "".concat(r, "/").concat(t.n), s.parentNodes = o.length ? i(i([], o, !0), [s.path], !1) : [s.path];
        var a = t.i || t.h;
        return a && e.set(s.path, s), s.clickable = !1 !== t.c, s.visible = !1 !== t.v, t.s && (s.icon = t.s), t.e && (s.emoji = t.e), t.h && (s.hash = t.h), s.label = t.l || t.n, t.u && (s.url = t.u), s.searchLabel = s.label.toLowerCase(), t.o && (s.open = t.o), a && (s.children = u(e, t.i, n, s.path, s.parentNodes)), s
    }

    function f(e, t, n, r) {
        void 0 === r && (r = ""), t && t.length && t.forEach((function (t) {
            var o = n ? "".concat(r).concat(t.n, "/") : !r || r.endsWith("/") ? "".concat(r).concat(t.n) : "".concat(r, "/").concat(t.n);
            if (e.get(o)) f(e, t.i, n, o); else {
                var i = e.get(r);
                if (!i) throw new Error("Unexpected state. The parent node must exist at this point.");
                var s = p(e, t, n, r);
                if (i.children) {
                    var a = function (e, t) {
                        var n = 0, r = e.length - 1;
                        if (r < n) return 0;
                        for (; ;) {
                            var o = Math.floor((n + r) / 2), i = m(e[o].label, t.label);
                            if (i < 0) {
                                if ((n = o + 1) > r) return n
                            } else {
                                if (!(i > 0)) return o;
                                if ((r = o - 1) < n) return o
                            }
                        }
                    }(i.children, s);
                    i.children.splice(a, 0, s)
                }
            }
        }))
    }

    function m(e, t) {
        if (null == t) return 1;
        if (null == e) return -1;
        var n = e.toUpperCase(), r = t.toUpperCase();
        return n > r ? 1 : n < r ? -1 : 0
    }

    function v(e) {
        return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
    }
}, 830
:
(e, t, n) => {
    "use strict";
    n.d(t, {Rs: () => c, cD: () => l, sy: () => u, wE: () => a});
    var r = n(9984), o = n.n(r), i = n(4884), s = n.n(i);

    function a(e) {
        var t = o().appendDocumentName ? o().documentName : "";
        if (o().trailingSlash || t) return "".concat(e).concat(t);
        var n = e.slice(0, -1);
        return o().base.length > 1 && n.endsWith(".") && (n = n.length > 1 ? "../" + n + o().base.slice(0, -1) : ".." + o().base.slice(0, -1)), n
    }

    function l(e, t) {
        var n = "/" + o().documentName, r = e;
        if (o().appendDocumentName ? r.endsWith(n) || (r = r.endsWith("/") ? r + o().documentName : r + n) : r.endsWith(n) && (r = r.slice(0, -n.length)), o().useRelativePaths && "file:" === location.protocol.toLowerCase()) {
            var i = null != t ? t : s()();
            if (i) {
                var a = r.split("/");
                r = a.slice(-i.level - 1).join("/")
            }
        } else r.startsWith(o().base) ? r = r.slice(o().base.length) : o().trailingSlash || o().appendDocumentName || r !== o().base.slice(0, -1) || (r = "");
        return r
    }

    function c() {
        if (!o().useRelativePaths) return o().base;
        var e = s()();
        if (!e) return o().base;
        var t = e.level;
        return o().appendDocumentName || e.isRoot || (o().trailingSlash ? location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/") || --t : (location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/")) && ++t), e.relativeBaseCache || (e.relativeBaseCache = t <= 0 ? !e.isRoot || o().trailingSlash || location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/") ? "./" : "." + o().base : "../".repeat(t)), e.relativeBaseCache
    }

    function u() {
        if (!o().useRelativePaths) return "/";
        var e = s()();
        if (!e) return "/";
        var t = e.level;
        return o().appendDocumentName || e.isRoot || (o().trailingSlash ? location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/") || --t : (location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/")) && ++t), e.relativeRootCache || (e.relativeRootCache = t <= 0 ? !e.isRoot || o().trailingSlash || location.pathname.endsWith("/" + o().documentName) || location.pathname.endsWith("/") ? "./" : "." + o().base : "../".repeat(t)), e.relativeRootCache
    }
}, 3744
:
(e, t) => {
    "use strict";
    t.Z = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [e, r] of t) n[e] = r;
        return n
    }
}, 5166
:
(e, t, n) => {
    "use strict";
    n.d(t, {
        HY: () => xi,
        lR: () => Si,
        uT: () => oa,
        Fl: () => xs,
        ri: () => el,
        j4: () => Pi,
        kq: () => Yi,
        iD: () => Fi,
        _: () => zi,
        Uk: () => Ui,
        Wm: () => qi,
        aZ: () => kr,
        h: () => Es,
        f3: () => qo,
        Y3: () => wn,
        C_: () => Q,
        j5: () => K,
        Jd: () => Vr,
        bv: () => Nr,
        wg: () => Ai,
        Cn: () => Bn,
        JJ: () => zo,
        dD: () => Wn,
        qj: () => Ct,
        iH: () => jt,
        Ko: () => to,
        WI: () => ro,
        up: () => Yr,
        LL: () => Xr,
        qZ: () => Mi,
        zw: () => le,
        e8: () => Ra,
        nr: () => Aa,
        F8: () => $a,
        YP: () => ir,
        m0: () => tr,
        w5: () => jn,
        wy: () => ur,
        D2: () => qa,
        iM: () => ja
    });
    var r = {};

    function o(e, t) {
        const n = Object.create(null), r = e.split(",");
        for (let e = 0; e < r.length; e++) n[r[e]] = !0;
        return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
    }

    n.r(r), n.d(r, {
        BaseTransition: () => mr,
        BaseTransitionPropsValidators: () => fr,
        Comment: () => _i,
        EffectScope: () => de,
        Fragment: () => xi,
        KeepAlive: () => Tr,
        ReactiveEffect: () => Ce,
        Static: () => Ci,
        Suspense: () => Yn,
        Teleport: () => Si,
        Text: () => Ei,
        Transition: () => oa,
        TransitionGroup: () => ka,
        VueElement: () => Xs,
        assertNumber: () => an,
        callWithAsyncErrorHandling: () => cn,
        callWithErrorHandling: () => ln,
        camelize: () => I,
        capitalize: () => H,
        cloneVNode: () => Zi,
        compatUtils: () => Ms,
        computed: () => xs,
        createApp: () => el,
        createBlock: () => Pi,
        createCommentVNode: () => Yi,
        createElementBlock: () => Fi,
        createElementVNode: () => zi,
        createHydrationRenderer: () => pi,
        createPropsRestProxy: () => Co,
        createRenderer: () => hi,
        createSSRApp: () => tl,
        createSlots: () => no,
        createStaticVNode: () => Ki,
        createTextVNode: () => Ui,
        createVNode: () => qi,
        customRef: () => Jt,
        defineAsyncComponent: () => Er,
        defineComponent: () => kr,
        defineCustomElement: () => Ks,
        defineEmits: () => po,
        defineExpose: () => fo,
        defineModel: () => go,
        defineOptions: () => mo,
        defineProps: () => ho,
        defineSSRCustomElement: () => Ys,
        defineSlots: () => vo,
        devtools: () => An,
        effect: () => Le,
        effectScope: () => he,
        getCurrentInstance: () => is,
        getCurrentScope: () => fe,
        getTransitionRawChildren: () => Sr,
        guardReactiveProps: () => $i,
        h: () => Es,
        handleError: () => un,
        hasInjectionContext: () => $o,
        hydrate: () => Qa,
        initCustomFormatter: () => Ts,
        initDirectivesForSSR: () => ol,
        inject: () => qo,
        isMemoSame: () => As,
        isProxy: () => It,
        isReactive: () => Dt,
        isReadonly: () => Ot,
        isRef: () => Vt,
        isRuntimeOnly: () => bs,
        isShallow: () => Mt,
        isVNode: () => Hi,
        markRaw: () => Pt,
        mergeDefaults: () => Eo,
        mergeModels: () => _o,
        mergeProps: () => Qi,
        nextTick: () => wn,
        normalizeClass: () => Q,
        normalizeProps: () => ee,
        normalizeStyle: () => K,
        onActivated: () => Ar,
        onBeforeMount: () => Hr,
        onBeforeUnmount: () => Vr,
        onBeforeUpdate: () => Wr,
        onDeactivated: () => Rr,
        onErrorCaptured: () => Zr,
        onMounted: () => Nr,
        onRenderTracked: () => $r,
        onRenderTriggered: () => qr,
        onScopeDispose: () => me,
        onServerPrefetch: () => zr,
        onUnmounted: () => jr,
        onUpdated: () => Br,
        openBlock: () => Ai,
        popScopeId: () => Bn,
        provide: () => zo,
        proxyRefs: () => Gt,
        pushScopeId: () => Wn,
        queuePostFlushCb: () => xn,
        reactive: () => Ct,
        readonly: () => Lt,
        ref: () => jt,
        registerRuntimeCompiler: () => gs,
        render: () => Ja,
        renderList: () => to,
        renderSlot: () => ro,
        resolveComponent: () => Yr,
        resolveDirective: () => Jr,
        resolveDynamicComponent: () => Xr,
        resolveFilter: () => Os,
        resolveTransitionHooks: () => gr,
        setBlockTracking: () => Mi,
        setDevtoolsHook: () => On,
        setTransitionHooks: () => wr,
        shallowReactive: () => Tt,
        shallowReadonly: () => At,
        shallowRef: () => zt,
        ssrContextKey: () => _s,
        ssrUtils: () => Ds,
        stop: () => Ae,
        toDisplayString: () => le,
        toHandlerKey: () => N,
        toHandlers: () => io,
        toRaw: () => Ft,
        toRef: () => nn,
        toRefs: () => Qt,
        toValue: () => Kt,
        transformVNodeArgs: () => Wi,
        triggerRef: () => Zt,
        unref: () => Ut,
        useAttrs: () => wo,
        useCssModule: () => Js,
        useCssVars: () => Qs,
        useModel: () => So,
        useSSRContext: () => Cs,
        useSlots: () => yo,
        useTransitionState: () => hr,
        vModelCheckbox: () => Ra,
        vModelDynamic: () => Ha,
        vModelRadio: () => Oa,
        vModelSelect: () => Ma,
        vModelText: () => Aa,
        vShow: () => $a,
        version: () => Rs,
        warn: () => sn,
        watch: () => ir,
        watchEffect: () => tr,
        watchPostEffect: () => nr,
        watchSyncEffect: () => rr,
        withAsyncContext: () => To,
        withCtx: () => jn,
        withDefaults: () => bo,
        withDirectives: () => ur,
        withKeys: () => qa,
        withMemo: () => Ls,
        withModifiers: () => ja,
        withScopeId: () => Vn
    });
    const i = {}, s = [], a = () => {
        }, l = () => !1, c = /^on[^a-z]/, u = e => c.test(e), d = e => e.startsWith("onUpdate:"), h = Object.assign, p = (e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }, f = Object.prototype.hasOwnProperty, m = (e, t) => f.call(e, t), v = Array.isArray, g = e => "[object Map]" === C(e), b = e => "[object Set]" === C(e),
        y = e => "[object Date]" === C(e), w = e => "function" == typeof e, S = e => "string" == typeof e, k = e => "symbol" == typeof e,
        x = e => null !== e && "object" == typeof e, E = e => x(e) && w(e.then) && w(e.catch), _ = Object.prototype.toString, C = e => _.call(e), T = e => C(e).slice(8, -1),
        L = e => "[object Object]" === C(e), A = e => S(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        R = o(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
        D = o("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), O = e => {
            const t = Object.create(null);
            return n => t[n] || (t[n] = e(n))
        }, M = /-(\w)/g, I = O((e => e.replace(M, ((e, t) => t ? t.toUpperCase() : "")))), F = /\B([A-Z])/g, P = O((e => e.replace(F, "-$1").toLowerCase())),
        H = O((e => e.charAt(0).toUpperCase() + e.slice(1))), N = O((e => e ? `on${H(e)}` : "")), W = (e, t) => !Object.is(e, t), B = (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t)
        }, V = (e, t, n) => {
            Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
        }, j = e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t
        }, z = e => {
            const t = S(e) ? Number(e) : NaN;
            return isNaN(t) ? e : t
        };
    let q;
    const $ = () => q || (q = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : {}),
        Z = {
            1: "TEXT",
            2: "CLASS",
            4: "STYLE",
            8: "PROPS",
            16: "FULL_PROPS",
            32: "HYDRATE_EVENTS",
            64: "STABLE_FRAGMENT",
            128: "KEYED_FRAGMENT",
            256: "UNKEYED_FRAGMENT",
            512: "NEED_PATCH",
            1024: "DYNAMIC_SLOTS",
            2048: "DEV_ROOT_FRAGMENT",
            [-1]: "HOISTED",
            [-2]: "BAIL"
        },
        U = o("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console");

    function K(e) {
        if (v(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) {
                const r = e[n], o = S(r) ? J(r) : K(r);
                if (o) for (const e in o) t[e] = o[e]
            }
            return t
        }
        return S(e) || x(e) ? e : void 0
    }

    const Y = /;(?![^(]*\))/g, G = /:([^]+)/, X = /\/\*[^]*?\*\//g;

    function J(e) {
        const t = {};
        return e.replace(X, "").split(Y).forEach((e => {
            if (e) {
                const n = e.split(G);
                n.length > 1 && (t[n[0].trim()] = n[1].trim())
            }
        })), t
    }

    function Q(e) {
        let t = "";
        if (S(e)) t = e; else if (v(e)) for (let n = 0; n < e.length; n++) {
            const r = Q(e[n]);
            r && (t += r + " ")
        } else if (x(e)) for (const n in e) e[n] && (t += n + " ");
        return t.trim()
    }

    function ee(e) {
        if (!e) return null;
        let {class: t, style: n} = e;
        return t && !S(t) && (e.class = Q(t)), n && (e.style = K(n)), e
    }

    const te = o("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),
        ne = o("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),
        re = o("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"), oe = o("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

    function ie(e) {
        return !!e || "" === e
    }

    function se(e, t) {
        if (e === t) return !0;
        let n = y(e), r = y(t);
        if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
        if (n = k(e), r = k(t), n || r) return e === t;
        if (n = v(e), r = v(t), n || r) return !(!n || !r) && function (e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let r = 0; n && r < e.length; r++) n = se(e[r], t[r]);
            return n
        }(e, t);
        if (n = x(e), r = x(t), n || r) {
            if (!n || !r) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const r = e.hasOwnProperty(n), o = t.hasOwnProperty(n);
                if (r && !o || !r && o || !se(e[n], t[n])) return !1
            }
        }
        return String(e) === String(t)
    }

    function ae(e, t) {
        return e.findIndex((e => se(e, t)))
    }

    const le = e => S(e) ? e : null == e ? "" : v(e) || x(e) && (e.toString === _ || !w(e.toString)) ? JSON.stringify(e, ce, 2) : String(e),
        ce = (e, t) => t && t.__v_isRef ? ce(e, t.value) : g(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})} : b(t) ? {[`Set(${t.size})`]: [...t.values()]} : !x(t) || v(t) || L(t) ? t : String(t);
    let ue;

    class de {
        constructor(e = !1) {
            this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ue, !e && ue && (this.index = (ue.scopes || (ue.scopes = [])).push(this) - 1)
        }

        get active() {
            return this._active
        }

        run(e) {
            if (this._active) {
                const t = ue;
                try {
                    return ue = this, e()
                } finally {
                    ue = t
                }
            }
        }

        on() {
            ue = this
        }

        off() {
            ue = this.parent
        }

        stop(e) {
            if (this._active) {
                let t, n;
                for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
                for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
                if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
                if (!this.detached && this.parent && !e) {
                    const e = this.parent.scopes.pop();
                    e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
                }
                this.parent = void 0, this._active = !1
            }
        }
    }

    function he(e) {
        return new de(e)
    }

    function pe(e, t = ue) {
        t && t.active && t.effects.push(e)
    }

    function fe() {
        return ue
    }

    function me(e) {
        ue && ue.cleanups.push(e)
    }

    const ve = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    }, ge = e => (e.w & Se) > 0, be = e => (e.n & Se) > 0, ye = new WeakMap;
    let we = 0, Se = 1;
    const ke = 30;
    let xe;
    const Ee = Symbol(""), _e = Symbol("");

    class Ce {
        constructor(e, t = null, n) {
            this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, pe(this, n)
        }

        run() {
            if (!this.active) return this.fn();
            let e = xe, t = Re;
            for (; e;) {
                if (e === this) return;
                e = e.parent
            }
            try {
                return this.parent = xe, xe = this, Re = !0, Se = 1 << ++we, we <= ke ? (({deps: e}) => {
                    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Se
                })(this) : Te(this), this.fn()
            } finally {
                we <= ke && (e => {
                    const {deps: t} = e;
                    if (t.length) {
                        let n = 0;
                        for (let r = 0; r < t.length; r++) {
                            const o = t[r];
                            ge(o) && !be(o) ? o.delete(e) : t[n++] = o, o.w &= ~Se, o.n &= ~Se
                        }
                        t.length = n
                    }
                })(this), Se = 1 << --we, xe = this.parent, Re = t, this.parent = void 0, this.deferStop && this.stop()
            }
        }

        stop() {
            xe === this ? this.deferStop = !0 : this.active && (Te(this), this.onStop && this.onStop(), this.active = !1)
        }
    }

    function Te(e) {
        const {deps: t} = e;
        if (t.length) {
            for (let n = 0; n < t.length; n++) t[n].delete(e);
            t.length = 0
        }
    }

    function Le(e, t) {
        e.effect && (e = e.effect.fn);
        const n = new Ce(e);
        t && (h(n, t), t.scope && pe(n, t.scope)), t && t.lazy || n.run();
        const r = n.run.bind(n);
        return r.effect = n, r
    }

    function Ae(e) {
        e.effect.stop()
    }

    let Re = !0;
    const De = [];

    function Oe() {
        De.push(Re), Re = !1
    }

    function Me() {
        const e = De.pop();
        Re = void 0 === e || e
    }

    function Ie(e, t, n) {
        if (Re && xe) {
            let t = ye.get(e);
            t || ye.set(e, t = new Map);
            let r = t.get(n);
            r || t.set(n, r = ve()), Fe(r)
        }
    }

    function Fe(e, t) {
        let n = !1;
        we <= ke ? be(e) || (e.n |= Se, n = !ge(e)) : n = !e.has(xe), n && (e.add(xe), xe.deps.push(e))
    }

    function Pe(e, t, n, r, o, i) {
        const s = ye.get(e);
        if (!s) return;
        let a = [];
        if ("clear" === t) a = [...s.values()]; else if ("length" === n && v(e)) {
            const e = Number(r);
            s.forEach(((t, n) => {
                ("length" === n || n >= e) && a.push(t)
            }))
        } else switch (void 0 !== n && a.push(s.get(n)), t) {
            case"add":
                v(e) ? A(n) && a.push(s.get("length")) : (a.push(s.get(Ee)), g(e) && a.push(s.get(_e)));
                break;
            case"delete":
                v(e) || (a.push(s.get(Ee)), g(e) && a.push(s.get(_e)));
                break;
            case"set":
                g(e) && a.push(s.get(Ee))
        }
        if (1 === a.length) a[0] && He(a[0]); else {
            const e = [];
            for (const t of a) t && e.push(...t);
            He(ve(e))
        }
    }

    function He(e, t) {
        const n = v(e) ? e : [...e];
        for (const e of n) e.computed && Ne(e);
        for (const e of n) e.computed || Ne(e)
    }

    function Ne(e, t) {
        (e !== xe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
    }

    const We = o("__proto__,__v_isRef,__isVue"),
        Be = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(k)), Ve = Ke(), je = Ke(!1, !0),
        ze = Ke(!0), qe = Ke(!0, !0), $e = Ze();

    function Ze() {
        const e = {};
        return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
            e[t] = function (...e) {
                const n = Ft(this);
                for (let e = 0, t = this.length; e < t; e++) Ie(n, 0, e + "");
                const r = n[t](...e);
                return -1 === r || !1 === r ? n[t](...e.map(Ft)) : r
            }
        })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
            e[t] = function (...e) {
                Oe();
                const n = Ft(this)[t].apply(this, e);
                return Me(), n
            }
        })), e
    }

    function Ue(e) {
        const t = Ft(this);
        return Ie(t, 0, e), t.hasOwnProperty(e)
    }

    function Ke(e = !1, t = !1) {
        return function (n, r, o) {
            if ("__v_isReactive" === r) return !e;
            if ("__v_isReadonly" === r) return e;
            if ("__v_isShallow" === r) return t;
            if ("__v_raw" === r && o === (e ? t ? _t : Et : t ? xt : kt).get(n)) return n;
            const i = v(n);
            if (!e) {
                if (i && m($e, r)) return Reflect.get($e, r, o);
                if ("hasOwnProperty" === r) return Ue
            }
            const s = Reflect.get(n, r, o);
            return (k(r) ? Be.has(r) : We(r)) ? s : (e || Ie(n, 0, r), t ? s : Vt(s) ? i && A(r) ? s : s.value : x(s) ? e ? Lt(s) : Ct(s) : s)
        }
    }

    function Ye(e = !1) {
        return function (t, n, r, o) {
            let i = t[n];
            if (Ot(i) && Vt(i) && !Vt(r)) return !1;
            if (!e && (Mt(r) || Ot(r) || (i = Ft(i), r = Ft(r)), !v(t) && Vt(i) && !Vt(r))) return i.value = r, !0;
            const s = v(t) && A(n) ? Number(n) < t.length : m(t, n), a = Reflect.set(t, n, r, o);
            return t === Ft(o) && (s ? W(r, i) && Pe(t, "set", n, r) : Pe(t, "add", n, r)), a
        }
    }

    const Ge = {
            get: Ve, set: Ye(), deleteProperty: function (e, t) {
                const n = m(e, t), r = (e[t], Reflect.deleteProperty(e, t));
                return r && n && Pe(e, "delete", t, void 0), r
            }, has: function (e, t) {
                const n = Reflect.has(e, t);
                return k(t) && Be.has(t) || Ie(e, 0, t), n
            }, ownKeys: function (e) {
                return Ie(e, 0, v(e) ? "length" : Ee), Reflect.ownKeys(e)
            }
        }, Xe = {get: ze, set: (e, t) => !0, deleteProperty: (e, t) => !0}, Je = h({}, Ge, {get: je, set: Ye(!0)}), Qe = h({}, Xe, {get: qe}), et = e => e,
        tt = e => Reflect.getPrototypeOf(e);

    function nt(e, t, n = !1, r = !1) {
        const o = Ft(e = e.__v_raw), i = Ft(t);
        n || (t !== i && Ie(o, 0, t), Ie(o, 0, i));
        const {has: s} = tt(o), a = r ? et : n ? Nt : Ht;
        return s.call(o, t) ? a(e.get(t)) : s.call(o, i) ? a(e.get(i)) : void (e !== o && e.get(t))
    }

    function rt(e, t = !1) {
        const n = this.__v_raw, r = Ft(n), o = Ft(e);
        return t || (e !== o && Ie(r, 0, e), Ie(r, 0, o)), e === o ? n.has(e) : n.has(e) || n.has(o)
    }

    function ot(e, t = !1) {
        return e = e.__v_raw, !t && Ie(Ft(e), 0, Ee), Reflect.get(e, "size", e)
    }

    function it(e) {
        e = Ft(e);
        const t = Ft(this);
        return tt(t).has.call(t, e) || (t.add(e), Pe(t, "add", e, e)), this
    }

    function st(e, t) {
        t = Ft(t);
        const n = Ft(this), {has: r, get: o} = tt(n);
        let i = r.call(n, e);
        i || (e = Ft(e), i = r.call(n, e));
        const s = o.call(n, e);
        return n.set(e, t), i ? W(t, s) && Pe(n, "set", e, t) : Pe(n, "add", e, t), this
    }

    function at(e) {
        const t = Ft(this), {has: n, get: r} = tt(t);
        let o = n.call(t, e);
        o || (e = Ft(e), o = n.call(t, e)), r && r.call(t, e);
        const i = t.delete(e);
        return o && Pe(t, "delete", e, void 0), i
    }

    function lt() {
        const e = Ft(this), t = 0 !== e.size, n = e.clear();
        return t && Pe(e, "clear", void 0, void 0), n
    }

    function ct(e, t) {
        return function (n, r) {
            const o = this, i = o.__v_raw, s = Ft(i), a = t ? et : e ? Nt : Ht;
            return !e && Ie(s, 0, Ee), i.forEach(((e, t) => n.call(r, a(e), a(t), o)))
        }
    }

    function ut(e, t, n) {
        return function (...r) {
            const o = this.__v_raw, i = Ft(o), s = g(i), a = "entries" === e || e === Symbol.iterator && s, l = "keys" === e && s, c = o[e](...r), u = n ? et : t ? Nt : Ht;
            return !t && Ie(i, 0, l ? _e : Ee), {
                next() {
                    const {value: e, done: t} = c.next();
                    return t ? {value: e, done: t} : {value: a ? [u(e[0]), u(e[1])] : u(e), done: t}
                }, [Symbol.iterator]() {
                    return this
                }
            }
        }
    }

    function dt(e) {
        return function (...t) {
            return "delete" !== e && this
        }
    }

    function ht() {
        const e = {
            get(e) {
                return nt(this, e)
            }, get size() {
                return ot(this)
            }, has: rt, add: it, set: st, delete: at, clear: lt, forEach: ct(!1, !1)
        }, t = {
            get(e) {
                return nt(this, e, !1, !0)
            }, get size() {
                return ot(this)
            }, has: rt, add: it, set: st, delete: at, clear: lt, forEach: ct(!1, !0)
        }, n = {
            get(e) {
                return nt(this, e, !0)
            }, get size() {
                return ot(this, !0)
            }, has(e) {
                return rt.call(this, e, !0)
            }, add: dt("add"), set: dt("set"), delete: dt("delete"), clear: dt("clear"), forEach: ct(!0, !1)
        }, r = {
            get(e) {
                return nt(this, e, !0, !0)
            }, get size() {
                return ot(this, !0)
            }, has(e) {
                return rt.call(this, e, !0)
            }, add: dt("add"), set: dt("set"), delete: dt("delete"), clear: dt("clear"), forEach: ct(!0, !0)
        };
        return ["keys", "values", "entries", Symbol.iterator].forEach((o => {
            e[o] = ut(o, !1, !1), n[o] = ut(o, !0, !1), t[o] = ut(o, !1, !0), r[o] = ut(o, !0, !0)
        })), [e, n, t, r]
    }

    const [pt, ft, mt, vt] = ht();

    function gt(e, t) {
        const n = t ? e ? vt : mt : e ? ft : pt;
        return (t, r, o) => "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(m(n, r) && r in t ? n : t, r, o)
    }

    const bt = {get: gt(!1, !1)}, yt = {get: gt(!1, !0)}, wt = {get: gt(!0, !1)}, St = {get: gt(!0, !0)}, kt = new WeakMap, xt = new WeakMap, Et = new WeakMap, _t = new WeakMap;

    function Ct(e) {
        return Ot(e) ? e : Rt(e, !1, Ge, bt, kt)
    }

    function Tt(e) {
        return Rt(e, !1, Je, yt, xt)
    }

    function Lt(e) {
        return Rt(e, !0, Xe, wt, Et)
    }

    function At(e) {
        return Rt(e, !0, Qe, St, _t)
    }

    function Rt(e, t, n, r, o) {
        if (!x(e)) return e;
        if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
        const i = o.get(e);
        if (i) return i;
        const s = (a = e).__v_skip || !Object.isExtensible(a) ? 0 : function (e) {
            switch (e) {
                case"Object":
                case"Array":
                    return 1;
                case"Map":
                case"Set":
                case"WeakMap":
                case"WeakSet":
                    return 2;
                default:
                    return 0
            }
        }(T(a));
        var a;
        if (0 === s) return e;
        const l = new Proxy(e, 2 === s ? r : n);
        return o.set(e, l), l
    }

    function Dt(e) {
        return Ot(e) ? Dt(e.__v_raw) : !(!e || !e.__v_isReactive)
    }

    function Ot(e) {
        return !(!e || !e.__v_isReadonly)
    }

    function Mt(e) {
        return !(!e || !e.__v_isShallow)
    }

    function It(e) {
        return Dt(e) || Ot(e)
    }

    function Ft(e) {
        const t = e && e.__v_raw;
        return t ? Ft(t) : e
    }

    function Pt(e) {
        return V(e, "__v_skip", !0), e
    }

    const Ht = e => x(e) ? Ct(e) : e, Nt = e => x(e) ? Lt(e) : e;

    function Wt(e) {
        Re && xe && Fe((e = Ft(e)).dep || (e.dep = ve()))
    }

    function Bt(e, t) {
        const n = (e = Ft(e)).dep;
        n && He(n)
    }

    function Vt(e) {
        return !(!e || !0 !== e.__v_isRef)
    }

    function jt(e) {
        return qt(e, !1)
    }

    function zt(e) {
        return qt(e, !0)
    }

    function qt(e, t) {
        return Vt(e) ? e : new $t(e, t)
    }

    class $t {
        constructor(e, t) {
            this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Ft(e), this._value = t ? e : Ht(e)
        }

        get value() {
            return Wt(this), this._value
        }

        set value(e) {
            const t = this.__v_isShallow || Mt(e) || Ot(e);
            e = t ? e : Ft(e), W(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : Ht(e), Bt(this))
        }
    }

    function Zt(e) {
        Bt(e)
    }

    function Ut(e) {
        return Vt(e) ? e.value : e
    }

    function Kt(e) {
        return w(e) ? e() : Ut(e)
    }

    const Yt = {
        get: (e, t, n) => Ut(Reflect.get(e, t, n)), set: (e, t, n, r) => {
            const o = e[t];
            return Vt(o) && !Vt(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r)
        }
    };

    function Gt(e) {
        return Dt(e) ? e : new Proxy(e, Yt)
    }

    class Xt {
        constructor(e) {
            this.dep = void 0, this.__v_isRef = !0;
            const {get: t, set: n} = e((() => Wt(this)), (() => Bt(this)));
            this._get = t, this._set = n
        }

        get value() {
            return this._get()
        }

        set value(e) {
            this._set(e)
        }
    }

    function Jt(e) {
        return new Xt(e)
    }

    function Qt(e) {
        const t = v(e) ? new Array(e.length) : {};
        for (const n in e) t[n] = rn(e, n);
        return t
    }

    class en {
        constructor(e, t, n) {
            this._object = e, this._key = t, this._defaultValue = n, this.__v_isRef = !0
        }

        get value() {
            const e = this._object[this._key];
            return void 0 === e ? this._defaultValue : e
        }

        set value(e) {
            this._object[this._key] = e
        }

        get dep() {
            return e = Ft(this._object), t = this._key, null == (n = ye.get(e)) ? void 0 : n.get(t);
            var e, t, n
        }
    }

    class tn {
        constructor(e) {
            this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0
        }

        get value() {
            return this._getter()
        }
    }

    function nn(e, t, n) {
        return Vt(e) ? e : w(e) ? new tn(e) : x(e) && arguments.length > 1 ? rn(e, t, n) : jt(e)
    }

    function rn(e, t, n) {
        const r = e[t];
        return Vt(r) ? r : new en(e, t, n)
    }

    class on {
        constructor(e, t, n, r) {
            this._setter = t, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Ce(e, (() => {
                this._dirty || (this._dirty = !0, Bt(this))
            })), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n
        }

        get value() {
            const e = Ft(this);
            return Wt(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
        }

        set value(e) {
            this._setter(e)
        }
    }

    function sn(e, ...t) {
    }

    function an(e, t) {
    }

    function ln(e, t, n, r) {
        let o;
        try {
            o = r ? e(...r) : e()
        } catch (e) {
            un(e, t, n)
        }
        return o
    }

    function cn(e, t, n, r) {
        if (w(e)) {
            const o = ln(e, t, n, r);
            return o && E(o) && o.catch((e => {
                un(e, t, n)
            })), o
        }
        const o = [];
        for (let i = 0; i < e.length; i++) o.push(cn(e[i], t, n, r));
        return o
    }

    function un(e, t, n, r = !0) {
        if (t && t.vnode, t) {
            let r = t.parent;
            const o = t.proxy, i = n;
            for (; r;) {
                const t = r.ec;
                if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, o, i)) return;
                r = r.parent
            }
            const s = t.appContext.config.errorHandler;
            if (s) return void ln(s, null, 10, [e, o, i])
        }
        !function (e, t, n, r = !0) {
            console.error(e)
        }(e, 0, 0, r)
    }

    let dn = !1, hn = !1;
    const pn = [];
    let fn = 0;
    const mn = [];
    let vn = null, gn = 0;
    const bn = Promise.resolve();
    let yn = null;

    function wn(e) {
        const t = yn || bn;
        return e ? t.then(this ? e.bind(this) : e) : t
    }

    function Sn(e) {
        pn.length && pn.includes(e, dn && e.allowRecurse ? fn + 1 : fn) || (null == e.id ? pn.push(e) : pn.splice(function (e) {
            let t = fn + 1, n = pn.length;
            for (; t < n;) {
                const r = t + n >>> 1;
                Cn(pn[r]) < e ? t = r + 1 : n = r
            }
            return t
        }(e.id), 0, e), kn())
    }

    function kn() {
        dn || hn || (hn = !0, yn = bn.then(Ln))
    }

    function xn(e) {
        v(e) ? mn.push(...e) : vn && vn.includes(e, e.allowRecurse ? gn + 1 : gn) || mn.push(e), kn()
    }

    function En(e, t = (dn ? fn + 1 : 0)) {
        for (; t < pn.length; t++) {
            const e = pn[t];
            e && e.pre && (pn.splice(t, 1), t--, e())
        }
    }

    function _n(e) {
        if (mn.length) {
            const e = [...new Set(mn)];
            if (mn.length = 0, vn) return void vn.push(...e);
            for (vn = e, vn.sort(((e, t) => Cn(e) - Cn(t))), gn = 0; gn < vn.length; gn++) vn[gn]();
            vn = null, gn = 0
        }
    }

    const Cn = e => null == e.id ? 1 / 0 : e.id, Tn = (e, t) => {
        const n = Cn(e) - Cn(t);
        if (0 === n) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

    function Ln(e) {
        hn = !1, dn = !0, pn.sort(Tn);
        try {
            for (fn = 0; fn < pn.length; fn++) {
                const e = pn[fn];
                e && !1 !== e.active && ln(e, null, 14)
            }
        } finally {
            fn = 0, pn.length = 0, _n(), dn = !1, yn = null, (pn.length || mn.length) && Ln(e)
        }
    }

    let An, Rn = [], Dn = !1;

    function On(e, t) {
        var n, r;
        An = e, An ? (An.enabled = !0, Rn.forEach((({
                                                        event: e,
                                                        args: t
                                                    }) => An.emit(e, ...t))), Rn = []) : "undefined" != typeof window && window.HTMLElement && !(null == (r = null == (n = window.navigator) ? void 0 : n.userAgent) ? void 0 : r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e => {
            On(e, t)
        })), setTimeout((() => {
            An || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Dn = !0, Rn = [])
        }), 3e3)) : (Dn = !0, Rn = [])
    }

    function Mn(e, t, ...n) {
        if (e.isUnmounted) return;
        const r = e.vnode.props || i;
        let o = n;
        const s = t.startsWith("update:"), a = s && t.slice(7);
        if (a && a in r) {
            const e = `${"modelValue" === a ? "model" : a}Modifiers`, {number: t, trim: s} = r[e] || i;
            s && (o = n.map((e => S(e) ? e.trim() : e))), t && (o = n.map(j))
        }
        let l, c = r[l = N(t)] || r[l = N(I(t))];
        !c && s && (c = r[l = N(P(t))]), c && cn(c, e, 6, o);
        const u = r[l + "Once"];
        if (u) {
            if (e.emitted) {
                if (e.emitted[l]) return
            } else e.emitted = {};
            e.emitted[l] = !0, cn(u, e, 6, o)
        }
    }

    function In(e, t, n = !1) {
        const r = t.emitsCache, o = r.get(e);
        if (void 0 !== o) return o;
        const i = e.emits;
        let s = {}, a = !1;
        if (!w(e)) {
            const r = e => {
                const n = In(e, t, !0);
                n && (a = !0, h(s, n))
            };
            !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r)
        }
        return i || a ? (v(i) ? i.forEach((e => s[e] = null)) : h(s, i), x(e) && r.set(e, s), s) : (x(e) && r.set(e, null), null)
    }

    function Fn(e, t) {
        return !(!e || !u(t)) && (t = t.slice(2).replace(/Once$/, ""), m(e, t[0].toLowerCase() + t.slice(1)) || m(e, P(t)) || m(e, t))
    }

    let Pn = null, Hn = null;

    function Nn(e) {
        const t = Pn;
        return Pn = e, Hn = e && e.type.__scopeId || null, t
    }

    function Wn(e) {
        Hn = e
    }

    function Bn() {
        Hn = null
    }

    const Vn = e => jn;

    function jn(e, t = Pn, n) {
        if (!t) return e;
        if (e._n) return e;
        const r = (...n) => {
            r._d && Mi(-1);
            const o = Nn(t);
            let i;
            try {
                i = e(...n)
            } finally {
                Nn(o), r._d && Mi(1)
            }
            return i
        };
        return r._n = !0, r._c = !0, r._d = !0, r
    }

    function zn(e) {
        const {
            type: t,
            vnode: n,
            proxy: r,
            withProxy: o,
            props: i,
            propsOptions: [s],
            slots: a,
            attrs: l,
            emit: c,
            render: u,
            renderCache: h,
            data: p,
            setupState: f,
            ctx: m,
            inheritAttrs: v
        } = e;
        let g, b;
        const y = Nn(e);
        try {
            if (4 & n.shapeFlag) {
                const e = o || r;
                g = Gi(u.call(e, e, h, i, f, p, m)), b = l
            } else {
                const e = t;
                g = Gi(e.length > 1 ? e(i, {attrs: l, slots: a, emit: c}) : e(i, null)), b = t.props ? l : qn(l)
            }
        } catch (t) {
            Ti.length = 0, un(t, e, 1), g = qi(_i)
        }
        let w = g;
        if (b && !1 !== v) {
            const e = Object.keys(b), {shapeFlag: t} = w;
            e.length && 7 & t && (s && e.some(d) && (b = $n(b, s)), w = Zi(w, b))
        }
        return n.dirs && (w = Zi(w), w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs), n.transition && (w.transition = n.transition), g = w, Nn(y), g
    }

    const qn = e => {
        let t;
        for (const n in e) ("class" === n || "style" === n || u(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    }, $n = (e, t) => {
        const n = {};
        for (const r in e) d(r) && r.slice(9) in t || (n[r] = e[r]);
        return n
    };

    function Zn(e, t, n) {
        const r = Object.keys(t);
        if (r.length !== Object.keys(e).length) return !0;
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            if (t[i] !== e[i] && !Fn(n, i)) return !0
        }
        return !1
    }

    function Un({vnode: e, parent: t}, n) {
        for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
    }

    const Kn = e => e.__isSuspense, Yn = {
        name: "Suspense", __isSuspense: !0, process(e, t, n, r, o, i, s, a, l, c) {
            null == e ? function (e, t, n, r, o, i, s, a, l) {
                const {p: c, o: {createElement: u}} = l, d = u("div"), h = e.suspense = Xn(e, o, r, t, d, n, i, s, a, l);
                c(null, h.pendingBranch = e.ssContent, d, null, r, h, i, s), h.deps > 0 ? (Gn(e, "onPending"), Gn(e, "onFallback"), c(null, e.ssFallback, t, n, r, null, i, s), er(h, e.ssFallback)) : h.resolve(!1, !0)
            }(t, n, r, o, i, s, a, l, c) : function (e, t, n, r, o, i, s, a, {p: l, um: c, o: {createElement: u}}) {
                const d = t.suspense = e.suspense;
                d.vnode = t, t.el = e.el;
                const h = t.ssContent, p = t.ssFallback, {activeBranch: f, pendingBranch: m, isInFallback: v, isHydrating: g} = d;
                if (m) d.pendingBranch = h, Ni(h, m) ? (l(m, h, d.hiddenContainer, null, o, d, i, s, a), d.deps <= 0 ? d.resolve() : v && (l(f, p, n, r, o, null, i, s, a), er(d, p))) : (d.pendingId++, g ? (d.isHydrating = !1, d.activeBranch = m) : c(m, o, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), v ? (l(null, h, d.hiddenContainer, null, o, d, i, s, a), d.deps <= 0 ? d.resolve() : (l(f, p, n, r, o, null, i, s, a), er(d, p))) : f && Ni(h, f) ? (l(f, h, n, r, o, d, i, s, a), d.resolve(!0)) : (l(null, h, d.hiddenContainer, null, o, d, i, s, a), d.deps <= 0 && d.resolve())); else if (f && Ni(h, f)) l(f, h, n, r, o, d, i, s, a), er(d, h); else if (Gn(t, "onPending"), d.pendingBranch = h, d.pendingId++, l(null, h, d.hiddenContainer, null, o, d, i, s, a), d.deps <= 0) d.resolve(); else {
                    const {timeout: e, pendingId: t} = d;
                    e > 0 ? setTimeout((() => {
                        d.pendingId === t && d.fallback(p)
                    }), e) : 0 === e && d.fallback(p)
                }
            }(e, t, n, r, o, s, a, l, c)
        }, hydrate: function (e, t, n, r, o, i, s, a, l) {
            const c = t.suspense = Xn(t, r, n, e.parentNode, document.createElement("div"), null, o, i, s, a, !0), u = l(e, c.pendingBranch = t.ssContent, n, c, i, s);
            return 0 === c.deps && c.resolve(!1, !0), u
        }, create: Xn, normalize: function (e) {
            const {shapeFlag: t, children: n} = e, r = 32 & t;
            e.ssContent = Jn(r ? n.default : n), e.ssFallback = r ? Jn(n.fallback) : qi(_i)
        }
    };

    function Gn(e, t) {
        const n = e.props && e.props[t];
        w(n) && n()
    }

    function Xn(e, t, n, r, o, i, s, a, l, c, u = !1) {
        const {p: d, m: h, um: p, n: f, o: {parentNode: m, remove: v}} = c;
        let g;
        const b = function (e) {
            var t;
            return null != (null == (t = e.props) ? void 0 : t.suspensible) && !1 !== e.props.suspensible
        }(e);
        b && (null == t ? void 0 : t.pendingBranch) && (g = t.pendingId, t.deps++);
        const y = e.props ? z(e.props.timeout) : void 0, w = {
            vnode: e,
            parent: t,
            parentComponent: n,
            isSVG: s,
            container: r,
            hiddenContainer: o,
            anchor: i,
            deps: 0,
            pendingId: 0,
            timeout: "number" == typeof y ? y : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !0,
            isHydrating: u,
            isUnmounted: !1,
            effects: [],
            resolve(e = !1, n = !1) {
                const {vnode: r, activeBranch: o, pendingBranch: i, pendingId: s, effects: a, parentComponent: l, container: c} = w;
                if (w.isHydrating) w.isHydrating = !1; else if (!e) {
                    const e = o && i.transition && "out-in" === i.transition.mode;
                    e && (o.transition.afterLeave = () => {
                        s === w.pendingId && h(i, c, t, 0)
                    });
                    let {anchor: t} = w;
                    o && (t = f(o), p(o, l, w, !0)), e || h(i, c, t, 0)
                }
                er(w, i), w.pendingBranch = null, w.isInFallback = !1;
                let u = w.parent, d = !1;
                for (; u;) {
                    if (u.pendingBranch) {
                        u.effects.push(...a), d = !0;
                        break
                    }
                    u = u.parent
                }
                d || xn(a), w.effects = [], b && t && t.pendingBranch && g === t.pendingId && (t.deps--, 0 !== t.deps || n || t.resolve()), Gn(r, "onResolve")
            },
            fallback(e) {
                if (!w.pendingBranch) return;
                const {vnode: t, activeBranch: n, parentComponent: r, container: o, isSVG: i} = w;
                Gn(t, "onFallback");
                const s = f(n), c = () => {
                    w.isInFallback && (d(null, e, o, s, r, null, i, a, l), er(w, e))
                }, u = e.transition && "out-in" === e.transition.mode;
                u && (n.transition.afterLeave = c), w.isInFallback = !0, p(n, r, null, !0), u || c()
            },
            move(e, t, n) {
                w.activeBranch && h(w.activeBranch, e, t, n), w.container = e
            },
            next: () => w.activeBranch && f(w.activeBranch),
            registerDep(e, t) {
                const n = !!w.pendingBranch;
                n && w.deps++;
                const r = e.vnode.el;
                e.asyncDep.catch((t => {
                    un(t, e, 0)
                })).then((o => {
                    if (e.isUnmounted || w.isUnmounted || w.pendingId !== e.suspenseId) return;
                    e.asyncResolved = !0;
                    const {vnode: i} = e;
                    vs(e, o, !1), r && (i.el = r);
                    const a = !r && e.subTree.el;
                    t(e, i, m(r || e.subTree.el), r ? null : f(e.subTree), w, s, l), a && v(a), Un(e, i.el), n && 0 == --w.deps && w.resolve()
                }))
            },
            unmount(e, t) {
                w.isUnmounted = !0, w.activeBranch && p(w.activeBranch, n, e, t), w.pendingBranch && p(w.pendingBranch, n, e, t)
            }
        };
        return w
    }

    function Jn(e) {
        let t;
        if (w(e)) {
            const n = Oi && e._c;
            n && (e._d = !1, Ai()), e = e(), n && (e._d = !0, t = Li, Ri())
        }
        if (v(e)) {
            const t = function (e) {
                let t;
                for (let n = 0; n < e.length; n++) {
                    const r = e[n];
                    if (!Hi(r)) return;
                    if (r.type !== _i || "v-if" === r.children) {
                        if (t) return;
                        t = r
                    }
                }
                return t
            }(e);
            e = t
        }
        return e = Gi(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t => t !== e))), e
    }

    function Qn(e, t) {
        t && t.pendingBranch ? v(e) ? t.effects.push(...e) : t.effects.push(e) : xn(e)
    }

    function er(e, t) {
        e.activeBranch = t;
        const {vnode: n, parentComponent: r} = e, o = n.el = t.el;
        r && r.subTree === n && (r.vnode.el = o, Un(r, o))
    }

    function tr(e, t) {
        return sr(e, null, t)
    }

    function nr(e, t) {
        return sr(e, null, {flush: "post"})
    }

    function rr(e, t) {
        return sr(e, null, {flush: "sync"})
    }

    const or = {};

    function ir(e, t, n) {
        return sr(e, t, n)
    }

    function sr(e, t, {immediate: n, deep: r, flush: o, onTrack: s, onTrigger: l} = i) {
        var c;
        const u = fe() === (null == (c = os) ? void 0 : c.scope) ? os : null;
        let d, h, f = !1, m = !1;
        if (Vt(e) ? (d = () => e.value, f = Mt(e)) : Dt(e) ? (d = () => e, r = !0) : v(e) ? (m = !0, f = e.some((e => Dt(e) || Mt(e))), d = () => e.map((e => Vt(e) ? e.value : Dt(e) ? cr(e) : w(e) ? ln(e, u, 2) : void 0))) : d = w(e) ? t ? () => ln(e, u, 2) : () => {
            if (!u || !u.isUnmounted) return h && h(), cn(e, u, 3, [b])
        } : a, t && r) {
            const e = d;
            d = () => cr(e())
        }
        let g, b = e => {
            h = x.onStop = () => {
                ln(e, u, 4)
            }
        };
        if (fs) {
            if (b = a, t ? n && cn(t, u, 3, [d(), m ? [] : void 0, b]) : d(), "sync" !== o) return a;
            {
                const e = Cs();
                g = e.__watcherHandles || (e.__watcherHandles = [])
            }
        }
        let y = m ? new Array(e.length).fill(or) : or;
        const S = () => {
            if (x.active) if (t) {
                const e = x.run();
                (r || f || (m ? e.some(((e, t) => W(e, y[t]))) : W(e, y))) && (h && h(), cn(t, u, 3, [e, y === or ? void 0 : m && y[0] === or ? [] : y, b]), y = e)
            } else x.run()
        };
        let k;
        S.allowRecurse = !!t, "sync" === o ? k = S : "post" === o ? k = () => di(S, u && u.suspense) : (S.pre = !0, u && (S.id = u.uid), k = () => Sn(S));
        const x = new Ce(d, k);
        t ? n ? S() : y = x.run() : "post" === o ? di(x.run.bind(x), u && u.suspense) : x.run();
        const E = () => {
            x.stop(), u && u.scope && p(u.scope.effects, x)
        };
        return g && g.push(E), E
    }

    function ar(e, t, n) {
        const r = this.proxy, o = S(e) ? e.includes(".") ? lr(r, e) : () => r[e] : e.bind(r, r);
        let i;
        w(t) ? i = t : (i = t.handler, n = t);
        const s = os;
        cs(this);
        const a = sr(o, i.bind(r), n);
        return s ? cs(s) : us(), a
    }

    function lr(e, t) {
        const n = t.split(".");
        return () => {
            let t = e;
            for (let e = 0; e < n.length && t; e++) t = t[n[e]];
            return t
        }
    }

    function cr(e, t) {
        if (!x(e) || e.__v_skip) return e;
        if ((t = t || new Set).has(e)) return e;
        if (t.add(e), Vt(e)) cr(e.value, t); else if (v(e)) for (let n = 0; n < e.length; n++) cr(e[n], t); else if (b(e) || g(e)) e.forEach((e => {
            cr(e, t)
        })); else if (L(e)) for (const n in e) cr(e[n], t);
        return e
    }

    function ur(e, t) {
        const n = Pn;
        if (null === n) return e;
        const r = Ss(n) || n.proxy, o = e.dirs || (e.dirs = []);
        for (let e = 0; e < t.length; e++) {
            let [n, s, a, l = i] = t[e];
            n && (w(n) && (n = {mounted: n, updated: n}), n.deep && cr(s), o.push({dir: n, instance: r, value: s, oldValue: void 0, arg: a, modifiers: l}))
        }
        return e
    }

    function dr(e, t, n, r) {
        const o = e.dirs, i = t && t.dirs;
        for (let s = 0; s < o.length; s++) {
            const a = o[s];
            i && (a.oldValue = i[s].value);
            let l = a.dir[r];
            l && (Oe(), cn(l, n, 8, [e.el, a, e, t]), Me())
        }
    }

    function hr() {
        const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
        return Nr((() => {
            e.isMounted = !0
        })), Vr((() => {
            e.isUnmounting = !0
        })), e
    }

    const pr = [Function, Array], fr = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: pr,
        onEnter: pr,
        onAfterEnter: pr,
        onEnterCancelled: pr,
        onBeforeLeave: pr,
        onLeave: pr,
        onAfterLeave: pr,
        onLeaveCancelled: pr,
        onBeforeAppear: pr,
        onAppear: pr,
        onAfterAppear: pr,
        onAppearCancelled: pr
    }, mr = {
        name: "BaseTransition", props: fr, setup(e, {slots: t}) {
            const n = is(), r = hr();
            let o;
            return () => {
                const i = t.default && Sr(t.default(), !0);
                if (!i || !i.length) return;
                let s = i[0];
                if (i.length > 1) {
                    let e = !1;
                    for (const t of i) if (t.type !== _i) {
                        s = t, e = !0;
                        break
                    }
                }
                const a = Ft(e), {mode: l} = a;
                if (r.isLeaving) return br(s);
                const c = yr(s);
                if (!c) return br(s);
                const u = gr(c, a, r, n);
                wr(c, u);
                const d = n.subTree, h = d && yr(d);
                let p = !1;
                const {getTransitionKey: f} = c.type;
                if (f) {
                    const e = f();
                    void 0 === o ? o = e : e !== o && (o = e, p = !0)
                }
                if (h && h.type !== _i && (!Ni(c, h) || p)) {
                    const e = gr(h, a, r, n);
                    if (wr(h, e), "out-in" === l) return r.isLeaving = !0, e.afterLeave = () => {
                        r.isLeaving = !1, !1 !== n.update.active && n.update()
                    }, br(s);
                    "in-out" === l && c.type !== _i && (e.delayLeave = (e, t, n) => {
                        vr(r, h)[String(h.key)] = h, e._leaveCb = () => {
                            t(), e._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = n
                    })
                }
                return s
            }
        }
    };

    function vr(e, t) {
        const {leavingVNodes: n} = e;
        let r = n.get(t.type);
        return r || (r = Object.create(null), n.set(t.type, r)), r
    }

    function gr(e, t, n, r) {
        const {
            appear: o,
            mode: i,
            persisted: s = !1,
            onBeforeEnter: a,
            onEnter: l,
            onAfterEnter: c,
            onEnterCancelled: u,
            onBeforeLeave: d,
            onLeave: h,
            onAfterLeave: p,
            onLeaveCancelled: f,
            onBeforeAppear: m,
            onAppear: g,
            onAfterAppear: b,
            onAppearCancelled: y
        } = t, w = String(e.key), S = vr(n, e), k = (e, t) => {
            e && cn(e, r, 9, t)
        }, x = (e, t) => {
            const n = t[1];
            k(e, t), v(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
        }, E = {
            mode: i, persisted: s, beforeEnter(t) {
                let r = a;
                if (!n.isMounted) {
                    if (!o) return;
                    r = m || a
                }
                t._leaveCb && t._leaveCb(!0);
                const i = S[w];
                i && Ni(e, i) && i.el._leaveCb && i.el._leaveCb(), k(r, [t])
            }, enter(e) {
                let t = l, r = c, i = u;
                if (!n.isMounted) {
                    if (!o) return;
                    t = g || l, r = b || c, i = y || u
                }
                let s = !1;
                const a = e._enterCb = t => {
                    s || (s = !0, k(t ? i : r, [e]), E.delayedLeave && E.delayedLeave(), e._enterCb = void 0)
                };
                t ? x(t, [e, a]) : a()
            }, leave(t, r) {
                const o = String(e.key);
                if (t._enterCb && t._enterCb(!0), n.isUnmounting) return r();
                k(d, [t]);
                let i = !1;
                const s = t._leaveCb = n => {
                    i || (i = !0, r(), k(n ? f : p, [t]), t._leaveCb = void 0, S[o] === e && delete S[o])
                };
                S[o] = e, h ? x(h, [t, s]) : s()
            }, clone: e => gr(e, t, n, r)
        };
        return E
    }

    function br(e) {
        if (Cr(e)) return (e = Zi(e)).children = null, e
    }

    function yr(e) {
        return Cr(e) ? e.children ? e.children[0] : void 0 : e
    }

    function wr(e, t) {
        6 & e.shapeFlag && e.component ? wr(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
    }

    function Sr(e, t = !1, n) {
        let r = [], o = 0;
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            const a = null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
            s.type === xi ? (128 & s.patchFlag && o++, r = r.concat(Sr(s.children, t, a))) : (t || s.type !== _i) && r.push(null != a ? Zi(s, {key: a}) : s)
        }
        if (o > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
        return r
    }

    function kr(e, t) {
        return w(e) ? (() => h({name: e.name}, t, {setup: e}))() : e
    }

    const xr = e => !!e.type.__asyncLoader;

    function Er(e) {
        w(e) && (e = {loader: e});
        const {loader: t, loadingComponent: n, errorComponent: r, delay: o = 200, timeout: i, suspensible: s = !0, onError: a} = e;
        let l, c = null, u = 0;
        const d = () => {
            let e;
            return c || (e = c = t().catch((e => {
                if (e = e instanceof Error ? e : new Error(String(e)), a) return new Promise(((t, n) => {
                    a(e, (() => t((u++, c = null, d()))), (() => n(e)), u + 1)
                }));
                throw e
            })).then((t => e !== c && c ? c : (t && (t.__esModule || "Module" === t[Symbol.toStringTag]) && (t = t.default), l = t, t))))
        };
        return kr({
            name: "AsyncComponentWrapper", __asyncLoader: d, get __asyncResolved() {
                return l
            }, setup() {
                const e = os;
                if (l) return () => _r(l, e);
                const t = t => {
                    c = null, un(t, e, 13, !r)
                };
                if (s && e.suspense || fs) return d().then((t => () => _r(t, e))).catch((e => (t(e), () => r ? qi(r, {error: e}) : null)));
                const a = jt(!1), u = jt(), h = jt(!!o);
                return o && setTimeout((() => {
                    h.value = !1
                }), o), null != i && setTimeout((() => {
                    if (!a.value && !u.value) {
                        const e = new Error(`Async component timed out after ${i}ms.`);
                        t(e), u.value = e
                    }
                }), i), d().then((() => {
                    a.value = !0, e.parent && Cr(e.parent.vnode) && Sn(e.parent.update)
                })).catch((e => {
                    t(e), u.value = e
                })), () => a.value && l ? _r(l, e) : u.value && r ? qi(r, {error: u.value}) : n && !h.value ? qi(n) : void 0
            }
        })
    }

    function _r(e, t) {
        const {ref: n, props: r, children: o, ce: i} = t.vnode, s = qi(e, r, o);
        return s.ref = n, s.ce = i, delete t.vnode.ce, s
    }

    const Cr = e => e.type.__isKeepAlive, Tr = {
        name: "KeepAlive", __isKeepAlive: !0, props: {include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number]}, setup(e, {slots: t}) {
            const n = is(), r = n.ctx;
            if (!r.renderer) return () => {
                const e = t.default && t.default();
                return e && 1 === e.length ? e[0] : e
            };
            const o = new Map, i = new Set;
            let s = null;
            const a = n.suspense, {renderer: {p: l, m: c, um: u, o: {createElement: d}}} = r, h = d("div");

            function p(e) {
                Mr(e), u(e, n, a, !0)
            }

            function f(e) {
                o.forEach(((t, n) => {
                    const r = ks(t.type);
                    !r || e && e(r) || m(n)
                }))
            }

            function m(e) {
                const t = o.get(e);
                s && Ni(t, s) ? s && Mr(s) : p(t), o.delete(e), i.delete(e)
            }

            r.activate = (e, t, n, r, o) => {
                const i = e.component;
                c(e, t, n, 0, a), l(i.vnode, e, t, n, i, a, r, e.slotScopeIds, o), di((() => {
                    i.isDeactivated = !1, i.a && B(i.a);
                    const t = e.props && e.props.onVnodeMounted;
                    t && es(t, i.parent, e)
                }), a)
            }, r.deactivate = e => {
                const t = e.component;
                c(e, h, null, 1, a), di((() => {
                    t.da && B(t.da);
                    const n = e.props && e.props.onVnodeUnmounted;
                    n && es(n, t.parent, e), t.isDeactivated = !0
                }), a)
            }, ir((() => [e.include, e.exclude]), (([e, t]) => {
                e && f((t => Lr(e, t))), t && f((e => !Lr(t, e)))
            }), {flush: "post", deep: !0});
            let v = null;
            const g = () => {
                null != v && o.set(v, Ir(n.subTree))
            };
            return Nr(g), Br(g), Vr((() => {
                o.forEach((e => {
                    const {subTree: t, suspense: r} = n, o = Ir(t);
                    if (e.type !== o.type || e.key !== o.key) p(e); else {
                        Mr(o);
                        const e = o.component.da;
                        e && di(e, r)
                    }
                }))
            })), () => {
                if (v = null, !t.default) return null;
                const n = t.default(), r = n[0];
                if (n.length > 1) return s = null, n;
                if (!Hi(r) || !(4 & r.shapeFlag || 128 & r.shapeFlag)) return s = null, r;
                let a = Ir(r);
                const l = a.type, c = ks(xr(a) ? a.type.__asyncResolved || {} : l), {include: u, exclude: d, max: h} = e;
                if (u && (!c || !Lr(u, c)) || d && c && Lr(d, c)) return s = a, r;
                const p = null == a.key ? l : a.key, f = o.get(p);
                return a.el && (a = Zi(a), 128 & r.shapeFlag && (r.ssContent = a)), v = p, f ? (a.el = f.el, a.component = f.component, a.transition && wr(a, a.transition), a.shapeFlag |= 512, i.delete(p), i.add(p)) : (i.add(p), h && i.size > parseInt(h, 10) && m(i.values().next().value)), a.shapeFlag |= 256, s = a, Kn(r.type) ? r : a
            }
        }
    };

    function Lr(e, t) {
        return v(e) ? e.some((e => Lr(e, t))) : S(e) ? e.split(",").includes(t) : "[object RegExp]" === C(e) && e.test(t)
    }

    function Ar(e, t) {
        Dr(e, "a", t)
    }

    function Rr(e, t) {
        Dr(e, "da", t)
    }

    function Dr(e, t, n = os) {
        const r = e.__wdc || (e.__wdc = () => {
            let t = n;
            for (; t;) {
                if (t.isDeactivated) return;
                t = t.parent
            }
            return e()
        });
        if (Fr(t, r, n), n) {
            let e = n.parent;
            for (; e && e.parent;) Cr(e.parent.vnode) && Or(r, t, n, e), e = e.parent
        }
    }

    function Or(e, t, n, r) {
        const o = Fr(t, e, r, !0);
        jr((() => {
            p(r[t], o)
        }), n)
    }

    function Mr(e) {
        e.shapeFlag &= -257, e.shapeFlag &= -513
    }

    function Ir(e) {
        return 128 & e.shapeFlag ? e.ssContent : e
    }

    function Fr(e, t, n = os, r = !1) {
        if (n) {
            const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...r) => {
                if (n.isUnmounted) return;
                Oe(), cs(n);
                const o = cn(t, n, e, r);
                return us(), Me(), o
            });
            return r ? o.unshift(i) : o.push(i), i
        }
    }

    const Pr = e => (t, n = os) => (!fs || "sp" === e) && Fr(e, ((...e) => t(...e)), n), Hr = Pr("bm"), Nr = Pr("m"), Wr = Pr("bu"), Br = Pr("u"), Vr = Pr("bum"), jr = Pr("um"),
        zr = Pr("sp"), qr = Pr("rtg"), $r = Pr("rtc");

    function Zr(e, t = os) {
        Fr("ec", e, t)
    }

    const Ur = "components", Kr = "directives";

    function Yr(e, t) {
        return Qr(Ur, e, !0, t) || e
    }

    const Gr = Symbol.for("v-ndc");

    function Xr(e) {
        return S(e) ? Qr(Ur, e, !1) || e : e || Gr
    }

    function Jr(e) {
        return Qr(Kr, e)
    }

    function Qr(e, t, n = !0, r = !1) {
        const o = Pn || os;
        if (o) {
            const n = o.type;
            if (e === Ur) {
                const e = ks(n, !1);
                if (e && (e === t || e === I(t) || e === H(I(t)))) return n
            }
            const i = eo(o[e] || n[e], t) || eo(o.appContext[e], t);
            return !i && r ? n : i
        }
    }

    function eo(e, t) {
        return e && (e[t] || e[I(t)] || e[H(I(t))])
    }

    function to(e, t, n, r) {
        let o;
        const i = n && n[r];
        if (v(e) || S(e)) {
            o = new Array(e.length);
            for (let n = 0, r = e.length; n < r; n++) o[n] = t(e[n], n, void 0, i && i[n])
        } else if ("number" == typeof e) {
            o = new Array(e);
            for (let n = 0; n < e; n++) o[n] = t(n + 1, n, void 0, i && i[n])
        } else if (x(e)) if (e[Symbol.iterator]) o = Array.from(e, ((e, n) => t(e, n, void 0, i && i[n]))); else {
            const n = Object.keys(e);
            o = new Array(n.length);
            for (let r = 0, s = n.length; r < s; r++) {
                const s = n[r];
                o[r] = t(e[s], s, r, i && i[r])
            }
        } else o = [];
        return n && (n[r] = o), o
    }

    function no(e, t) {
        for (let n = 0; n < t.length; n++) {
            const r = t[n];
            if (v(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn; else r && (e[r.name] = r.key ? (...e) => {
                const t = r.fn(...e);
                return t && (t.key = r.key), t
            } : r.fn)
        }
        return e
    }

    function ro(e, t, n = {}, r, o) {
        if (Pn.isCE || Pn.parent && xr(Pn.parent) && Pn.parent.isCE) return "default" !== t && (n.name = t), qi("slot", n, r && r());
        let i = e[t];
        i && i._c && (i._d = !1), Ai();
        const s = i && oo(i(n)), a = Pi(xi, {key: n.key || s && s.key || `_${t}`}, s || (r ? r() : []), s && 1 === e._ ? 64 : -2);
        return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
    }

    function oo(e) {
        return e.some((e => !Hi(e) || e.type !== _i && !(e.type === xi && !oo(e.children)))) ? e : null
    }

    function io(e, t) {
        const n = {};
        for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : N(r)] = e[r];
        return n
    }

    const so = e => e ? ds(e) ? Ss(e) || e.proxy : so(e.parent) : null, ao = h(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => so(e.parent),
        $root: e => so(e.root),
        $emit: e => e.emit,
        $options: e => Do(e),
        $forceUpdate: e => e.f || (e.f = () => Sn(e.update)),
        $nextTick: e => e.n || (e.n = wn.bind(e.proxy)),
        $watch: e => ar.bind(e)
    }), lo = (e, t) => e !== i && !e.__isScriptSetup && m(e, t), co = {
        get({_: e}, t) {
            const {ctx: n, setupState: r, data: o, props: s, accessCache: a, type: l, appContext: c} = e;
            let u;
            if ("$" !== t[0]) {
                const l = a[t];
                if (void 0 !== l) switch (l) {
                    case 1:
                        return r[t];
                    case 2:
                        return o[t];
                    case 4:
                        return n[t];
                    case 3:
                        return s[t]
                } else {
                    if (lo(r, t)) return a[t] = 1, r[t];
                    if (o !== i && m(o, t)) return a[t] = 2, o[t];
                    if ((u = e.propsOptions[0]) && m(u, t)) return a[t] = 3, s[t];
                    if (n !== i && m(n, t)) return a[t] = 4, n[t];
                    Lo && (a[t] = 0)
                }
            }
            const d = ao[t];
            let h, p;
            return d ? ("$attrs" === t && Ie(e, 0, t), d(e)) : (h = l.__cssModules) && (h = h[t]) ? h : n !== i && m(n, t) ? (a[t] = 4, n[t]) : (p = c.config.globalProperties, m(p, t) ? p[t] : void 0)
        }, set({_: e}, t, n) {
            const {data: r, setupState: o, ctx: s} = e;
            return lo(o, t) ? (o[t] = n, !0) : r !== i && m(r, t) ? (r[t] = n, !0) : !(m(e.props, t) || "$" === t[0] && t.slice(1) in e || (s[t] = n, 0))
        }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s}}, a) {
            let l;
            return !!n[a] || e !== i && m(e, a) || lo(t, a) || (l = s[0]) && m(l, a) || m(r, a) || m(ao, a) || m(o.config.globalProperties, a)
        }, defineProperty(e, t, n) {
            return null != n.get ? e._.accessCache[t] = 0 : m(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    }, uo = h({}, co, {
        get(e, t) {
            if (t !== Symbol.unscopables) return co.get(e, t, e)
        }, has: (e, t) => "_" !== t[0] && !U(t)
    });

    function ho() {
        return null
    }

    function po() {
        return null
    }

    function fo(e) {
    }

    function mo(e) {
    }

    function vo() {
        return null
    }

    function go() {
    }

    function bo(e, t) {
        return null
    }

    function yo() {
        return ko().slots
    }

    function wo() {
        return ko().attrs
    }

    function So(e, t, n) {
        const r = is();
        if (n && n.local) {
            const n = jt(e[t]);
            return ir((() => e[t]), (e => n.value = e)), ir(n, (n => {
                n !== e[t] && r.emit(`update:${t}`, n)
            })), n
        }
        return {
            __v_isRef: !0, get value() {
                return e[t]
            }, set value(e) {
                r.emit(`update:${t}`, e)
            }
        }
    }

    function ko() {
        const e = is();
        return e.setupContext || (e.setupContext = ws(e))
    }

    function xo(e) {
        return v(e) ? e.reduce(((e, t) => (e[t] = null, e)), {}) : e
    }

    function Eo(e, t) {
        const n = xo(e);
        for (const e in t) {
            if (e.startsWith("__skip")) continue;
            let r = n[e];
            r ? v(r) || w(r) ? r = n[e] = {type: r, default: t[e]} : r.default = t[e] : null === r && (r = n[e] = {default: t[e]}), r && t[`__skip_${e}`] && (r.skipFactory = !0)
        }
        return n
    }

    function _o(e, t) {
        return e && t ? v(e) && v(t) ? e.concat(t) : h({}, xo(e), xo(t)) : e || t
    }

    function Co(e, t) {
        const n = {};
        for (const r in e) t.includes(r) || Object.defineProperty(n, r, {enumerable: !0, get: () => e[r]});
        return n
    }

    function To(e) {
        const t = is();
        let n = e();
        return us(), E(n) && (n = n.catch((e => {
            throw cs(t), e
        }))), [n, () => cs(t)]
    }

    let Lo = !0;

    function Ao(e, t, n) {
        cn(v(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
    }

    function Ro(e, t, n, r) {
        const o = r.includes(".") ? lr(n, r) : () => n[r];
        if (S(e)) {
            const n = t[e];
            w(n) && ir(o, n)
        } else if (w(e)) ir(o, e.bind(n)); else if (x(e)) if (v(e)) e.forEach((e => Ro(e, t, n, r))); else {
            const r = w(e.handler) ? e.handler.bind(n) : t[e.handler];
            w(r) && ir(o, r, e)
        }
    }

    function Do(e) {
        const t = e.type, {mixins: n, extends: r} = t, {mixins: o, optionsCache: i, config: {optionMergeStrategies: s}} = e.appContext, a = i.get(t);
        let l;
        return a ? l = a : o.length || n || r ? (l = {}, o.length && o.forEach((e => Oo(l, e, s, !0))), Oo(l, t, s)) : l = t, x(t) && i.set(t, l), l
    }

    function Oo(e, t, n, r = !1) {
        const {mixins: o, extends: i} = t;
        i && Oo(e, i, n, !0), o && o.forEach((t => Oo(e, t, n, !0)));
        for (const o in t) if (r && "expose" === o) ; else {
            const r = Mo[o] || n && n[o];
            e[o] = r ? r(e[o], t[o]) : t[o]
        }
        return e
    }

    const Mo = {
        data: Io,
        props: No,
        emits: No,
        methods: Ho,
        computed: Ho,
        beforeCreate: Po,
        created: Po,
        beforeMount: Po,
        mounted: Po,
        beforeUpdate: Po,
        updated: Po,
        beforeDestroy: Po,
        beforeUnmount: Po,
        destroyed: Po,
        unmounted: Po,
        activated: Po,
        deactivated: Po,
        errorCaptured: Po,
        serverPrefetch: Po,
        components: Ho,
        directives: Ho,
        watch: function (e, t) {
            if (!e) return t;
            if (!t) return e;
            const n = h(Object.create(null), e);
            for (const r in t) n[r] = Po(e[r], t[r]);
            return n
        },
        provide: Io,
        inject: function (e, t) {
            return Ho(Fo(e), Fo(t))
        }
    };

    function Io(e, t) {
        return t ? e ? function () {
            return h(w(e) ? e.call(this, this) : e, w(t) ? t.call(this, this) : t)
        } : t : e
    }

    function Fo(e) {
        if (v(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
            return t
        }
        return e
    }

    function Po(e, t) {
        return e ? [...new Set([].concat(e, t))] : t
    }

    function Ho(e, t) {
        return e ? h(Object.create(null), e, t) : t
    }

    function No(e, t) {
        return e ? v(e) && v(t) ? [...new Set([...e, ...t])] : h(Object.create(null), xo(e), xo(null != t ? t : {})) : t
    }

    function Wo() {
        return {
            app: null,
            config: {isNativeTag: l, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {}},
            mixins: [],
            components: {},
            directives: {},
            provides: Object.create(null),
            optionsCache: new WeakMap,
            propsCache: new WeakMap,
            emitsCache: new WeakMap
        }
    }

    let Bo = 0;

    function Vo(e, t) {
        return function (n, r = null) {
            w(n) || (n = h({}, n)), null == r || x(r) || (r = null);
            const o = Wo(), i = new Set;
            let s = !1;
            const a = o.app = {
                _uid: Bo++,
                _component: n,
                _props: r,
                _container: null,
                _context: o,
                _instance: null,
                version: Rs,
                get config() {
                    return o.config
                },
                set config(e) {
                },
                use: (e, ...t) => (i.has(e) || (e && w(e.install) ? (i.add(e), e.install(a, ...t)) : w(e) && (i.add(e), e(a, ...t))), a),
                mixin: e => (o.mixins.includes(e) || o.mixins.push(e), a),
                component: (e, t) => t ? (o.components[e] = t, a) : o.components[e],
                directive: (e, t) => t ? (o.directives[e] = t, a) : o.directives[e],
                mount(i, l, c) {
                    if (!s) {
                        const u = qi(n, r);
                        return u.appContext = o, l && t ? t(u, i) : e(u, i, c), s = !0, a._container = i, i.__vue_app__ = a, Ss(u.component) || u.component.proxy
                    }
                },
                unmount() {
                    s && (e(null, a._container), delete a._container.__vue_app__)
                },
                provide: (e, t) => (o.provides[e] = t, a),
                runWithContext(e) {
                    jo = a;
                    try {
                        return e()
                    } finally {
                        jo = null
                    }
                }
            };
            return a
        }
    }

    let jo = null;

    function zo(e, t) {
        if (os) {
            let n = os.provides;
            const r = os.parent && os.parent.provides;
            r === n && (n = os.provides = Object.create(r)), n[e] = t
        }
    }

    function qo(e, t, n = !1) {
        const r = os || Pn;
        if (r || jo) {
            const o = r ? null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : jo._context.provides;
            if (o && e in o) return o[e];
            if (arguments.length > 1) return n && w(t) ? t.call(r && r.proxy) : t
        }
    }

    function $o() {
        return !!(os || Pn || jo)
    }

    function Zo(e, t, n, r) {
        const [o, s] = e.propsOptions;
        let a, l = !1;
        if (t) for (let i in t) {
            if (R(i)) continue;
            const c = t[i];
            let u;
            o && m(o, u = I(i)) ? s && s.includes(u) ? (a || (a = {}))[u] = c : n[u] = c : Fn(e.emitsOptions, i) || i in r && c === r[i] || (r[i] = c, l = !0)
        }
        if (s) {
            const t = Ft(n), r = a || i;
            for (let i = 0; i < s.length; i++) {
                const a = s[i];
                n[a] = Uo(o, t, a, r[a], e, !m(r, a))
            }
        }
        return l
    }

    function Uo(e, t, n, r, o, i) {
        const s = e[n];
        if (null != s) {
            const e = m(s, "default");
            if (e && void 0 === r) {
                const e = s.default;
                if (s.type !== Function && !s.skipFactory && w(e)) {
                    const {propsDefaults: i} = o;
                    n in i ? r = i[n] : (cs(o), r = i[n] = e.call(null, t), us())
                } else r = e
            }
            s[0] && (i && !e ? r = !1 : !s[1] || "" !== r && r !== P(n) || (r = !0))
        }
        return r
    }

    function Ko(e, t, n = !1) {
        const r = t.propsCache, o = r.get(e);
        if (o) return o;
        const a = e.props, l = {}, c = [];
        let u = !1;
        if (!w(e)) {
            const r = e => {
                u = !0;
                const [n, r] = Ko(e, t, !0);
                h(l, n), r && c.push(...r)
            };
            !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r)
        }
        if (!a && !u) return x(e) && r.set(e, s), s;
        if (v(a)) for (let e = 0; e < a.length; e++) {
            const t = I(a[e]);
            Yo(t) && (l[t] = i)
        } else if (a) for (const e in a) {
            const t = I(e);
            if (Yo(t)) {
                const n = a[e], r = l[t] = v(n) || w(n) ? {type: n} : h({}, n);
                if (r) {
                    const e = Jo(Boolean, r.type), n = Jo(String, r.type);
                    r[0] = e > -1, r[1] = n < 0 || e < n, (e > -1 || m(r, "default")) && c.push(t)
                }
            }
        }
        const d = [l, c];
        return x(e) && r.set(e, d), d
    }

    function Yo(e) {
        return "$" !== e[0]
    }

    function Go(e) {
        const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
        return t ? t[2] : null === e ? "null" : ""
    }

    function Xo(e, t) {
        return Go(e) === Go(t)
    }

    function Jo(e, t) {
        return v(t) ? t.findIndex((t => Xo(t, e))) : w(t) && Xo(t, e) ? 0 : -1
    }

    const Qo = e => "_" === e[0] || "$stable" === e, ei = e => v(e) ? e.map(Gi) : [Gi(e)], ti = (e, t, n) => {
        if (t._n) return t;
        const r = jn(((...e) => ei(t(...e))), n);
        return r._c = !1, r
    }, ni = (e, t, n) => {
        const r = e._ctx;
        for (const n in e) {
            if (Qo(n)) continue;
            const o = e[n];
            if (w(o)) t[n] = ti(0, o, r); else if (null != o) {
                const e = ei(o);
                t[n] = () => e
            }
        }
    }, ri = (e, t) => {
        const n = ei(t);
        e.slots.default = () => n
    }, oi = (e, t) => {
        if (32 & e.vnode.shapeFlag) {
            const n = t._;
            n ? (e.slots = Ft(t), V(t, "_", n)) : ni(t, e.slots = {})
        } else e.slots = {}, t && ri(e, t);
        V(e.slots, Bi, 1)
    }, ii = (e, t, n) => {
        const {vnode: r, slots: o} = e;
        let s = !0, a = i;
        if (32 & r.shapeFlag) {
            const e = t._;
            e ? n && 1 === e ? s = !1 : (h(o, t), n || 1 !== e || delete o._) : (s = !t.$stable, ni(t, o)), a = t
        } else t && (ri(e, t), a = {default: 1});
        if (s) for (const e in o) Qo(e) || e in a || delete o[e]
    };

    function si(e, t, n, r, o = !1) {
        if (v(e)) return void e.forEach(((e, i) => si(e, t && (v(t) ? t[i] : t), n, r, o)));
        if (xr(r) && !o) return;
        const s = 4 & r.shapeFlag ? Ss(r.component) || r.component.proxy : r.el, a = o ? null : s, {i: l, r: c} = e, u = t && t.r, d = l.refs === i ? l.refs = {} : l.refs,
            h = l.setupState;
        if (null != u && u !== c && (S(u) ? (d[u] = null, m(h, u) && (h[u] = null)) : Vt(u) && (u.value = null)), w(c)) ln(c, l, 12, [a, d]); else {
            const t = S(c), r = Vt(c);
            if (t || r) {
                const i = () => {
                    if (e.f) {
                        const n = t ? m(h, c) ? h[c] : d[c] : c.value;
                        o ? v(n) && p(n, s) : v(n) ? n.includes(s) || n.push(s) : t ? (d[c] = [s], m(h, c) && (h[c] = d[c])) : (c.value = [s], e.k && (d[e.k] = c.value))
                    } else t ? (d[c] = a, m(h, c) && (h[c] = a)) : r && (c.value = a, e.k && (d[e.k] = a))
                };
                a ? (i.id = -1, di(i, n)) : i()
            }
        }
    }

    let ai = !1;
    const li = e => /svg/.test(e.namespaceURI) && "foreignObject" !== e.tagName, ci = e => 8 === e.nodeType;

    function ui(e) {
        const {mt: t, p: n, o: {patchProp: r, createText: o, nextSibling: i, parentNode: s, remove: a, insert: l, createComment: c}} = e, d = (n, r, a, c, u, g = !1) => {
            const b = ci(n) && "[" === n.data, y = () => m(n, r, a, c, u, b), {type: w, ref: S, shapeFlag: k, patchFlag: x} = r;
            let E = n.nodeType;
            r.el = n, -2 === x && (g = !1, r.dynamicChildren = null);
            let _ = null;
            switch (w) {
                case Ei:
                    3 !== E ? "" === r.children ? (l(r.el = o(""), s(n), n), _ = n) : _ = y() : (n.data !== r.children && (ai = !0, n.data = r.children), _ = i(n));
                    break;
                case _i:
                    _ = 8 !== E || b ? y() : i(n);
                    break;
                case Ci:
                    if (b && (E = (n = i(n)).nodeType), 1 === E || 3 === E) {
                        _ = n;
                        const e = !r.children.length;
                        for (let t = 0; t < r.staticCount; t++) e && (r.children += 1 === _.nodeType ? _.outerHTML : _.data), t === r.staticCount - 1 && (r.anchor = _), _ = i(_);
                        return b ? i(_) : _
                    }
                    y();
                    break;
                case xi:
                    _ = b ? f(n, r, a, c, u, g) : y();
                    break;
                default:
                    if (1 & k) _ = 1 !== E || r.type.toLowerCase() !== n.tagName.toLowerCase() ? y() : h(n, r, a, c, u, g); else if (6 & k) {
                        r.slotScopeIds = u;
                        const e = s(n);
                        if (t(r, e, null, a, c, li(e), g), _ = b ? v(n) : i(n), _ && ci(_) && "teleport end" === _.data && (_ = i(_)), xr(r)) {
                            let t;
                            b ? (t = qi(xi), t.anchor = _ ? _.previousSibling : e.lastChild) : t = 3 === n.nodeType ? Ui("") : qi("div"), t.el = n, r.component.subTree = t
                        }
                    } else 64 & k ? _ = 8 !== E ? y() : r.type.hydrate(n, r, a, c, u, g, e, p) : 128 & k && (_ = r.type.hydrate(n, r, a, c, li(s(n)), u, g, e, d))
            }
            return null != S && si(S, null, c, r), _
        }, h = (e, t, n, o, i, s) => {
            s = s || !!t.dynamicChildren;
            const {type: l, props: c, patchFlag: d, shapeFlag: h, dirs: f} = t, m = "input" === l && f || "option" === l;
            if (m || -1 !== d) {
                if (f && dr(t, null, n, "created"), c) if (m || !s || 48 & d) for (const t in c) (m && t.endsWith("value") || u(t) && !R(t)) && r(e, t, null, c[t], !1, void 0, n); else c.onClick && r(e, "onClick", null, c.onClick, !1, void 0, n);
                let l;
                if ((l = c && c.onVnodeBeforeMount) && es(l, n, t), f && dr(t, null, n, "beforeMount"), ((l = c && c.onVnodeMounted) || f) && Qn((() => {
                    l && es(l, n, t), f && dr(t, null, n, "mounted")
                }), o), 16 & h && (!c || !c.innerHTML && !c.textContent)) {
                    let r = p(e.firstChild, t, e, n, o, i, s);
                    for (; r;) {
                        ai = !0;
                        const e = r;
                        r = r.nextSibling, a(e)
                    }
                } else 8 & h && e.textContent !== t.children && (ai = !0, e.textContent = t.children)
            }
            return e.nextSibling
        }, p = (e, t, r, o, i, s, a) => {
            a = a || !!t.dynamicChildren;
            const l = t.children, c = l.length;
            for (let t = 0; t < c; t++) {
                const c = a ? l[t] : l[t] = Gi(l[t]);
                if (e) e = d(e, c, o, i, s, a); else {
                    if (c.type === Ei && !c.children) continue;
                    ai = !0, n(null, c, r, null, o, i, li(r), s)
                }
            }
            return e
        }, f = (e, t, n, r, o, a) => {
            const {slotScopeIds: u} = t;
            u && (o = o ? o.concat(u) : u);
            const d = s(e), h = p(i(e), t, d, n, r, o, a);
            return h && ci(h) && "]" === h.data ? i(t.anchor = h) : (ai = !0, l(t.anchor = c("]"), d, h), h)
        }, m = (e, t, r, o, l, c) => {
            if (ai = !0, t.el = null, c) {
                const t = v(e);
                for (; ;) {
                    const n = i(e);
                    if (!n || n === t) break;
                    a(n)
                }
            }
            const u = i(e), d = s(e);
            return a(e), n(null, t, d, u, r, o, li(d), l), u
        }, v = e => {
            let t = 0;
            for (; e;) if ((e = i(e)) && ci(e) && ("[" === e.data && t++, "]" === e.data)) {
                if (0 === t) return i(e);
                t--
            }
            return e
        };
        return [(e, t) => {
            if (!t.hasChildNodes()) return n(null, e, t), _n(), void (t._vnode = e);
            ai = !1, d(t.firstChild, e, null, null, null), _n(), t._vnode = e, ai && console.error("Hydration completed but contains mismatches.")
        }, d]
    }

    const di = Qn;

    function hi(e) {
        return fi(e)
    }

    function pi(e) {
        return fi(e, ui)
    }

    function fi(e, t) {
        $().__VUE__ = !0;
        const {
            insert: n,
            remove: r,
            patchProp: o,
            createElement: l,
            createText: c,
            createComment: u,
            setText: d,
            setElementText: h,
            parentNode: p,
            nextSibling: f,
            setScopeId: v = a,
            insertStaticContent: g
        } = e, b = (e, t, n, r = null, o = null, i = null, s = !1, a = null, l = !!t.dynamicChildren) => {
            if (e === t) return;
            e && !Ni(e, t) && (r = Y(e), z(e, o, i, !0), e = null), -2 === t.patchFlag && (l = !1, t.dynamicChildren = null);
            const {type: c, ref: u, shapeFlag: d} = t;
            switch (c) {
                case Ei:
                    y(e, t, n, r);
                    break;
                case _i:
                    w(e, t, n, r);
                    break;
                case Ci:
                    null == e && S(t, n, r, s);
                    break;
                case xi:
                    A(e, t, n, r, o, i, s, a, l);
                    break;
                default:
                    1 & d ? k(e, t, n, r, o, i, s, a, l) : 6 & d ? D(e, t, n, r, o, i, s, a, l) : (64 & d || 128 & d) && c.process(e, t, n, r, o, i, s, a, l, X)
            }
            null != u && o && si(u, e && e.ref, i, t || e, !t)
        }, y = (e, t, r, o) => {
            if (null == e) n(t.el = c(t.children), r, o); else {
                const n = t.el = e.el;
                t.children !== e.children && d(n, t.children)
            }
        }, w = (e, t, r, o) => {
            null == e ? n(t.el = u(t.children || ""), r, o) : t.el = e.el
        }, S = (e, t, n, r) => {
            [e.el, e.anchor] = g(e.children, t, n, r, e.el, e.anchor)
        }, k = (e, t, n, r, o, i, s, a, l) => {
            s = s || "svg" === t.type, null == e ? x(t, n, r, o, i, s, a, l) : C(e, t, o, i, s, a, l)
        }, x = (e, t, r, i, s, a, c, u) => {
            let d, p;
            const {type: f, props: m, shapeFlag: v, transition: g, dirs: b} = e;
            if (d = e.el = l(e.type, a, m && m.is, m), 8 & v ? h(d, e.children) : 16 & v && _(e.children, d, null, i, s, a && "foreignObject" !== f, c, u), b && dr(e, null, i, "created"), E(d, e, e.scopeId, c, i), m) {
                for (const t in m) "value" === t || R(t) || o(d, t, null, m[t], a, e.children, i, s, K);
                "value" in m && o(d, "value", null, m.value), (p = m.onVnodeBeforeMount) && es(p, i, e)
            }
            b && dr(e, null, i, "beforeMount");
            const y = (!s || s && !s.pendingBranch) && g && !g.persisted;
            y && g.beforeEnter(d), n(d, t, r), ((p = m && m.onVnodeMounted) || y || b) && di((() => {
                p && es(p, i, e), y && g.enter(d), b && dr(e, null, i, "mounted")
            }), s)
        }, E = (e, t, n, r, o) => {
            if (n && v(e, n), r) for (let t = 0; t < r.length; t++) v(e, r[t]);
            if (o && t === o.subTree) {
                const t = o.vnode;
                E(e, t, t.scopeId, t.slotScopeIds, o.parent)
            }
        }, _ = (e, t, n, r, o, i, s, a, l = 0) => {
            for (let c = l; c < e.length; c++) {
                const l = e[c] = a ? Xi(e[c]) : Gi(e[c]);
                b(null, l, t, n, r, o, i, s, a)
            }
        }, C = (e, t, n, r, s, a, l) => {
            const c = t.el = e.el;
            let {patchFlag: u, dynamicChildren: d, dirs: p} = t;
            u |= 16 & e.patchFlag;
            const f = e.props || i, m = t.props || i;
            let v;
            n && mi(n, !1), (v = m.onVnodeBeforeUpdate) && es(v, n, t, e), p && dr(t, e, n, "beforeUpdate"), n && mi(n, !0);
            const g = s && "foreignObject" !== t.type;
            if (d ? T(e.dynamicChildren, d, c, n, r, g, a) : l || N(e, t, c, null, n, r, g, a, !1), u > 0) {
                if (16 & u) L(c, t, f, m, n, r, s); else if (2 & u && f.class !== m.class && o(c, "class", null, m.class, s), 4 & u && o(c, "style", f.style, m.style, s), 8 & u) {
                    const i = t.dynamicProps;
                    for (let t = 0; t < i.length; t++) {
                        const a = i[t], l = f[a], u = m[a];
                        u === l && "value" !== a || o(c, a, l, u, s, e.children, n, r, K)
                    }
                }
                1 & u && e.children !== t.children && h(c, t.children)
            } else l || null != d || L(c, t, f, m, n, r, s);
            ((v = m.onVnodeUpdated) || p) && di((() => {
                v && es(v, n, t, e), p && dr(t, e, n, "updated")
            }), r)
        }, T = (e, t, n, r, o, i, s) => {
            for (let a = 0; a < t.length; a++) {
                const l = e[a], c = t[a], u = l.el && (l.type === xi || !Ni(l, c) || 70 & l.shapeFlag) ? p(l.el) : n;
                b(l, c, u, null, r, o, i, s, !0)
            }
        }, L = (e, t, n, r, s, a, l) => {
            if (n !== r) {
                if (n !== i) for (const i in n) R(i) || i in r || o(e, i, n[i], null, l, t.children, s, a, K);
                for (const i in r) {
                    if (R(i)) continue;
                    const c = r[i], u = n[i];
                    c !== u && "value" !== i && o(e, i, u, c, l, t.children, s, a, K)
                }
                "value" in r && o(e, "value", n.value, r.value)
            }
        }, A = (e, t, r, o, i, s, a, l, u) => {
            const d = t.el = e ? e.el : c(""), h = t.anchor = e ? e.anchor : c("");
            let {patchFlag: p, dynamicChildren: f, slotScopeIds: m} = t;
            m && (l = l ? l.concat(m) : m), null == e ? (n(d, r, o), n(h, r, o), _(t.children, r, h, i, s, a, l, u)) : p > 0 && 64 & p && f && e.dynamicChildren ? (T(e.dynamicChildren, f, r, i, s, a, l), (null != t.key || i && t === i.subTree) && vi(e, t, !0)) : N(e, t, r, h, i, s, a, l, u)
        }, D = (e, t, n, r, o, i, s, a, l) => {
            t.slotScopeIds = a, null == e ? 512 & t.shapeFlag ? o.ctx.activate(t, n, r, s, l) : O(t, n, r, o, i, s, l) : M(e, t, l)
        }, O = (e, t, n, r, o, i, s) => {
            const a = e.component = rs(e, r, o);
            if (Cr(e) && (a.ctx.renderer = X), ms(a), a.asyncDep) {
                if (o && o.registerDep(a, F), !e.el) {
                    const e = a.subTree = qi(_i);
                    w(null, e, t, n)
                }
            } else F(a, e, t, n, o, i, s)
        }, M = (e, t, n) => {
            const r = t.component = e.component;
            if (function (e, t, n) {
                const {props: r, children: o, component: i} = e, {props: s, children: a, patchFlag: l} = t, c = i.emitsOptions;
                if (t.dirs || t.transition) return !0;
                if (!(n && l >= 0)) return !(!o && !a || a && a.$stable) || r !== s && (r ? !s || Zn(r, s, c) : !!s);
                if (1024 & l) return !0;
                if (16 & l) return r ? Zn(r, s, c) : !!s;
                if (8 & l) {
                    const e = t.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        if (s[n] !== r[n] && !Fn(c, n)) return !0
                    }
                }
                return !1
            }(e, t, n)) {
                if (r.asyncDep && !r.asyncResolved) return void H(r, t, n);
                r.next = t, function (e) {
                    const t = pn.indexOf(e);
                    t > fn && pn.splice(t, 1)
                }(r.update), r.update()
            } else t.el = e.el, r.vnode = t
        }, F = (e, t, n, r, o, i, s) => {
            const a = e.effect = new Ce((() => {
                if (e.isMounted) {
                    let t, {next: n, bu: r, u: a, parent: l, vnode: c} = e, u = n;
                    mi(e, !1), n ? (n.el = c.el, H(e, n, s)) : n = c, r && B(r), (t = n.props && n.props.onVnodeBeforeUpdate) && es(t, l, n, c), mi(e, !0);
                    const d = zn(e), h = e.subTree;
                    e.subTree = d, b(h, d, p(h.el), Y(h), e, o, i), n.el = d.el, null === u && Un(e, d.el), a && di(a, o), (t = n.props && n.props.onVnodeUpdated) && di((() => es(t, l, n, c)), o)
                } else {
                    let s;
                    const {el: a, props: l} = t, {bm: c, m: u, parent: d} = e, h = xr(t);
                    if (mi(e, !1), c && B(c), !h && (s = l && l.onVnodeBeforeMount) && es(s, d, t), mi(e, !0), a && Q) {
                        const n = () => {
                            e.subTree = zn(e), Q(a, e.subTree, e, o, null)
                        };
                        h ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
                    } else {
                        const s = e.subTree = zn(e);
                        b(null, s, n, r, e, o, i), t.el = s.el
                    }
                    if (u && di(u, o), !h && (s = l && l.onVnodeMounted)) {
                        const e = t;
                        di((() => es(s, d, e)), o)
                    }
                    (256 & t.shapeFlag || d && xr(d.vnode) && 256 & d.vnode.shapeFlag) && e.a && di(e.a, o), e.isMounted = !0, t = n = r = null
                }
            }), (() => Sn(l)), e.scope), l = e.update = () => a.run();
            l.id = e.uid, mi(e, !0), l()
        }, H = (e, t, n) => {
            t.component = e;
            const r = e.vnode.props;
            e.vnode = t, e.next = null, function (e, t, n, r) {
                const {props: o, attrs: i, vnode: {patchFlag: s}} = e, a = Ft(o), [l] = e.propsOptions;
                let c = !1;
                if (!(r || s > 0) || 16 & s) {
                    let r;
                    Zo(e, t, o, i) && (c = !0);
                    for (const i in a) t && (m(t, i) || (r = P(i)) !== i && m(t, r)) || (l ? !n || void 0 === n[i] && void 0 === n[r] || (o[i] = Uo(l, a, i, void 0, e, !0)) : delete o[i]);
                    if (i !== a) for (const e in i) t && m(t, e) || (delete i[e], c = !0)
                } else if (8 & s) {
                    const n = e.vnode.dynamicProps;
                    for (let r = 0; r < n.length; r++) {
                        let s = n[r];
                        if (Fn(e.emitsOptions, s)) continue;
                        const u = t[s];
                        if (l) if (m(i, s)) u !== i[s] && (i[s] = u, c = !0); else {
                            const t = I(s);
                            o[t] = Uo(l, a, t, u, e, !1)
                        } else u !== i[s] && (i[s] = u, c = !0)
                    }
                }
                c && Pe(e, "set", "$attrs")
            }(e, t.props, r, n), ii(e, t.children, n), Oe(), En(), Me()
        }, N = (e, t, n, r, o, i, s, a, l = !1) => {
            const c = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, {patchFlag: p, shapeFlag: f} = t;
            if (p > 0) {
                if (128 & p) return void V(c, d, n, r, o, i, s, a, l);
                if (256 & p) return void W(c, d, n, r, o, i, s, a, l)
            }
            8 & f ? (16 & u && K(c, o, i), d !== c && h(n, d)) : 16 & u ? 16 & f ? V(c, d, n, r, o, i, s, a, l) : K(c, o, i, !0) : (8 & u && h(n, ""), 16 & f && _(d, n, r, o, i, s, a, l))
        }, W = (e, t, n, r, o, i, a, l, c) => {
            t = t || s;
            const u = (e = e || s).length, d = t.length, h = Math.min(u, d);
            let p;
            for (p = 0; p < h; p++) {
                const r = t[p] = c ? Xi(t[p]) : Gi(t[p]);
                b(e[p], r, n, null, o, i, a, l, c)
            }
            u > d ? K(e, o, i, !0, !1, h) : _(t, n, r, o, i, a, l, c, h)
        }, V = (e, t, n, r, o, i, a, l, c) => {
            let u = 0;
            const d = t.length;
            let h = e.length - 1, p = d - 1;
            for (; u <= h && u <= p;) {
                const r = e[u], s = t[u] = c ? Xi(t[u]) : Gi(t[u]);
                if (!Ni(r, s)) break;
                b(r, s, n, null, o, i, a, l, c), u++
            }
            for (; u <= h && u <= p;) {
                const r = e[h], s = t[p] = c ? Xi(t[p]) : Gi(t[p]);
                if (!Ni(r, s)) break;
                b(r, s, n, null, o, i, a, l, c), h--, p--
            }
            if (u > h) {
                if (u <= p) {
                    const e = p + 1, s = e < d ? t[e].el : r;
                    for (; u <= p;) b(null, t[u] = c ? Xi(t[u]) : Gi(t[u]), n, s, o, i, a, l, c), u++
                }
            } else if (u > p) for (; u <= h;) z(e[u], o, i, !0), u++; else {
                const f = u, m = u, v = new Map;
                for (u = m; u <= p; u++) {
                    const e = t[u] = c ? Xi(t[u]) : Gi(t[u]);
                    null != e.key && v.set(e.key, u)
                }
                let g, y = 0;
                const w = p - m + 1;
                let S = !1, k = 0;
                const x = new Array(w);
                for (u = 0; u < w; u++) x[u] = 0;
                for (u = f; u <= h; u++) {
                    const r = e[u];
                    if (y >= w) {
                        z(r, o, i, !0);
                        continue
                    }
                    let s;
                    if (null != r.key) s = v.get(r.key); else for (g = m; g <= p; g++) if (0 === x[g - m] && Ni(r, t[g])) {
                        s = g;
                        break
                    }
                    void 0 === s ? z(r, o, i, !0) : (x[s - m] = u + 1, s >= k ? k = s : S = !0, b(r, t[s], n, null, o, i, a, l, c), y++)
                }
                const E = S ? function (e) {
                    const t = e.slice(), n = [0];
                    let r, o, i, s, a;
                    const l = e.length;
                    for (r = 0; r < l; r++) {
                        const l = e[r];
                        if (0 !== l) {
                            if (o = n[n.length - 1], e[o] < l) {
                                t[r] = o, n.push(r);
                                continue
                            }
                            for (i = 0, s = n.length - 1; i < s;) a = i + s >> 1, e[n[a]] < l ? i = a + 1 : s = a;
                            l < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
                        }
                    }
                    for (i = n.length, s = n[i - 1]; i-- > 0;) n[i] = s, s = t[s];
                    return n
                }(x) : s;
                for (g = E.length - 1, u = w - 1; u >= 0; u--) {
                    const e = m + u, s = t[e], h = e + 1 < d ? t[e + 1].el : r;
                    0 === x[u] ? b(null, s, n, h, o, i, a, l, c) : S && (g < 0 || u !== E[g] ? j(s, n, h, 2) : g--)
                }
            }
        }, j = (e, t, r, o, i = null) => {
            const {el: s, type: a, transition: l, children: c, shapeFlag: u} = e;
            if (6 & u) j(e.component.subTree, t, r, o); else if (128 & u) e.suspense.move(t, r, o); else if (64 & u) a.move(e, t, r, X); else if (a !== xi) if (a !== Ci) if (2 !== o && 1 & u && l) if (0 === o) l.beforeEnter(s), n(s, t, r), di((() => l.enter(s)), i); else {
                const {leave: e, delayLeave: o, afterLeave: i} = l, a = () => n(s, t, r), c = () => {
                    e(s, (() => {
                        a(), i && i()
                    }))
                };
                o ? o(s, a, c) : c()
            } else n(s, t, r); else (({el: e, anchor: t}, r, o) => {
                let i;
                for (; e && e !== t;) i = f(e), n(e, r, o), e = i;
                n(t, r, o)
            })(e, t, r); else {
                n(s, t, r);
                for (let e = 0; e < c.length; e++) j(c[e], t, r, o);
                n(e.anchor, t, r)
            }
        }, z = (e, t, n, r = !1, o = !1) => {
            const {type: i, props: s, ref: a, children: l, dynamicChildren: c, shapeFlag: u, patchFlag: d, dirs: h} = e;
            if (null != a && si(a, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
            const p = 1 & u && h, f = !xr(e);
            let m;
            if (f && (m = s && s.onVnodeBeforeUnmount) && es(m, t, e), 6 & u) U(e.component, n, r); else {
                if (128 & u) return void e.suspense.unmount(n, r);
                p && dr(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, o, X, r) : c && (i !== xi || d > 0 && 64 & d) ? K(c, t, n, !1, !0) : (i === xi && 384 & d || !o && 16 & u) && K(l, t, n), r && q(e)
            }
            (f && (m = s && s.onVnodeUnmounted) || p) && di((() => {
                m && es(m, t, e), p && dr(e, null, t, "unmounted")
            }), n)
        }, q = e => {
            const {type: t, el: n, anchor: o, transition: i} = e;
            if (t === xi) return void Z(n, o);
            if (t === Ci) return void (({el: e, anchor: t}) => {
                let n;
                for (; e && e !== t;) n = f(e), r(e), e = n;
                r(t)
            })(e);
            const s = () => {
                r(n), i && !i.persisted && i.afterLeave && i.afterLeave()
            };
            if (1 & e.shapeFlag && i && !i.persisted) {
                const {leave: t, delayLeave: r} = i, o = () => t(n, s);
                r ? r(e.el, s, o) : o()
            } else s()
        }, Z = (e, t) => {
            let n;
            for (; e !== t;) n = f(e), r(e), e = n;
            r(t)
        }, U = (e, t, n) => {
            const {bum: r, scope: o, update: i, subTree: s, um: a} = e;
            r && B(r), o.stop(), i && (i.active = !1, z(s, e, t, n)), a && di(a, t), di((() => {
                e.isUnmounted = !0
            }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
        }, K = (e, t, n, r = !1, o = !1, i = 0) => {
            for (let s = i; s < e.length; s++) z(e[s], t, n, r, o)
        }, Y = e => 6 & e.shapeFlag ? Y(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : f(e.anchor || e.el), G = (e, t, n) => {
            null == e ? t._vnode && z(t._vnode, null, null, !0) : b(t._vnode || null, e, t, null, null, null, n), En(), _n(), t._vnode = e
        }, X = {p: b, um: z, m: j, r: q, mt: O, mc: _, pc: N, pbc: T, n: Y, o: e};
        let J, Q;
        return t && ([J, Q] = t(X)), {render: G, hydrate: J, createApp: Vo(G, J)}
    }

    function mi({effect: e, update: t}, n) {
        e.allowRecurse = t.allowRecurse = n
    }

    function vi(e, t, n = !1) {
        const r = e.children, o = t.children;
        if (v(r) && v(o)) for (let e = 0; e < r.length; e++) {
            const t = r[e];
            let i = o[e];
            1 & i.shapeFlag && !i.dynamicChildren && ((i.patchFlag <= 0 || 32 === i.patchFlag) && (i = o[e] = Xi(o[e]), i.el = t.el), n || vi(t, i)), i.type === Ei && (i.el = t.el)
        }
    }

    const gi = e => e && (e.disabled || "" === e.disabled), bi = e => "undefined" != typeof SVGElement && e instanceof SVGElement, yi = (e, t) => {
        const n = e && e.to;
        if (S(n)) {
            if (t) {
                return t(n)
            }
            return null
        }
        return n
    };

    function wi(e, t, n, {o: {insert: r}, m: o}, i = 2) {
        0 === i && r(e.targetAnchor, t, n);
        const {el: s, anchor: a, shapeFlag: l, children: c, props: u} = e, d = 2 === i;
        if (d && r(s, t, n), (!d || gi(u)) && 16 & l) for (let e = 0; e < c.length; e++) o(c[e], t, n, 2);
        d && r(a, t, n)
    }

    const Si = {
        __isTeleport: !0, process(e, t, n, r, o, i, s, a, l, c) {
            const {mc: u, pc: d, pbc: h, o: {insert: p, querySelector: f, createText: m, createComment: v}} = c, g = gi(t.props);
            let {shapeFlag: b, children: y, dynamicChildren: w} = t;
            if (null == e) {
                const e = t.el = m(""), c = t.anchor = m("");
                p(e, n, r), p(c, n, r);
                const d = t.target = yi(t.props, f), h = t.targetAnchor = m("");
                d && (p(h, d), s = s || bi(d));
                const v = (e, t) => {
                    16 & b && u(y, e, t, o, i, s, a, l)
                };
                g ? v(n, c) : d && v(d, h)
            } else {
                t.el = e.el;
                const r = t.anchor = e.anchor, u = t.target = e.target, p = t.targetAnchor = e.targetAnchor, m = gi(e.props), v = m ? n : u, b = m ? r : p;
                if (s = s || bi(u), w ? (h(e.dynamicChildren, w, v, o, i, s, a), vi(e, t, !0)) : l || d(e, t, v, b, o, i, s, a, !1), g) m || wi(t, n, r, c, 1); else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                    const e = t.target = yi(t.props, f);
                    e && wi(t, e, null, c, 0)
                } else m && wi(t, u, p, c, 1)
            }
            ki(t)
        }, remove(e, t, n, r, {um: o, o: {remove: i}}, s) {
            const {shapeFlag: a, children: l, anchor: c, targetAnchor: u, target: d, props: h} = e;
            if (d && i(u), (s || !gi(h)) && (i(c), 16 & a)) for (let e = 0; e < l.length; e++) {
                const r = l[e];
                o(r, t, n, !0, !!r.dynamicChildren)
            }
        }, move: wi, hydrate: function (e, t, n, r, o, i, {o: {nextSibling: s, parentNode: a, querySelector: l}}, c) {
            const u = t.target = yi(t.props, l);
            if (u) {
                const l = u._lpa || u.firstChild;
                if (16 & t.shapeFlag) if (gi(t.props)) t.anchor = c(s(e), t, a(e), n, r, o, i), t.targetAnchor = l; else {
                    t.anchor = s(e);
                    let a = l;
                    for (; a;) if (a = s(a), a && 8 === a.nodeType && "teleport anchor" === a.data) {
                        t.targetAnchor = a, u._lpa = t.targetAnchor && s(t.targetAnchor);
                        break
                    }
                    c(l, t, u, n, r, o, i)
                }
                ki(t)
            }
            return t.anchor && s(t.anchor)
        }
    };

    function ki(e) {
        const t = e.ctx;
        if (t && t.ut) {
            let n = e.children[0].el;
            for (; n !== e.targetAnchor;) 1 === n.nodeType && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
            t.ut()
        }
    }

    const xi = Symbol.for("v-fgt"), Ei = Symbol.for("v-txt"), _i = Symbol.for("v-cmt"), Ci = Symbol.for("v-stc"), Ti = [];
    let Li = null;

    function Ai(e = !1) {
        Ti.push(Li = e ? null : [])
    }

    function Ri() {
        Ti.pop(), Li = Ti[Ti.length - 1] || null
    }

    let Di, Oi = 1;

    function Mi(e) {
        Oi += e
    }

    function Ii(e) {
        return e.dynamicChildren = Oi > 0 ? Li || s : null, Ri(), Oi > 0 && Li && Li.push(e), e
    }

    function Fi(e, t, n, r, o, i) {
        return Ii(zi(e, t, n, r, o, i, !0))
    }

    function Pi(e, t, n, r, o) {
        return Ii(qi(e, t, n, r, o, !0))
    }

    function Hi(e) {
        return !!e && !0 === e.__v_isVNode
    }

    function Ni(e, t) {
        return e.type === t.type && e.key === t.key
    }

    function Wi(e) {
        Di = e
    }

    const Bi = "__vInternal", Vi = ({key: e}) => null != e ? e : null,
        ji = ({ref: e, ref_key: t, ref_for: n}) => ("number" == typeof e && (e = "" + e), null != e ? S(e) || Vt(e) || w(e) ? {i: Pn, r: e, k: t, f: !!n} : e : null);

    function zi(e, t = null, n = null, r = 0, o = null, i = (e === xi ? 0 : 1), s = !1, a = !1) {
        const l = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e,
            props: t,
            key: t && Vi(t),
            ref: t && ji(t),
            scopeId: Hn,
            slotScopeIds: null,
            children: n,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag: i,
            patchFlag: r,
            dynamicProps: o,
            dynamicChildren: null,
            appContext: null,
            ctx: Pn
        };
        return a ? (Ji(l, n), 128 & i && e.normalize(l)) : n && (l.shapeFlag |= S(n) ? 8 : 16), Oi > 0 && !s && Li && (l.patchFlag > 0 || 6 & i) && 32 !== l.patchFlag && Li.push(l), l
    }

    const qi = function (e, t = null, n = null, r = 0, o = null, i = !1) {
        if (e && e !== Gr || (e = _i), Hi(e)) {
            const r = Zi(e, t, !0);
            return n && Ji(r, n), Oi > 0 && !i && Li && (6 & r.shapeFlag ? Li[Li.indexOf(e)] = r : Li.push(r)), r.patchFlag |= -2, r
        }
        if (s = e, w(s) && "__vccOpts" in s && (e = e.__vccOpts), t) {
            t = $i(t);
            let {class: e, style: n} = t;
            e && !S(e) && (t.class = Q(e)), x(n) && (It(n) && !v(n) && (n = h({}, n)), t.style = K(n))
        }
        var s;
        return zi(e, t, n, r, o, S(e) ? 1 : Kn(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : x(e) ? 4 : w(e) ? 2 : 0, i, !0)
    };

    function $i(e) {
        return e ? It(e) || Bi in e ? h({}, e) : e : null
    }

    function Zi(e, t, n = !1) {
        const {props: r, ref: o, patchFlag: i, children: s} = e, a = t ? Qi(r || {}, t) : r;
        return {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: a,
            key: a && Vi(a),
            ref: t && t.ref ? n && o ? v(o) ? o.concat(ji(t)) : [o, ji(t)] : ji(t) : o,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: s,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== xi ? -1 === i ? 16 : 16 | i : i,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: e.transition,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Zi(e.ssContent),
            ssFallback: e.ssFallback && Zi(e.ssFallback),
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce
        }
    }

    function Ui(e = " ", t = 0) {
        return qi(Ei, null, e, t)
    }

    function Ki(e, t) {
        const n = qi(Ci, null, e);
        return n.staticCount = t, n
    }

    function Yi(e = "", t = !1) {
        return t ? (Ai(), Pi(_i, null, e)) : qi(_i, null, e)
    }

    function Gi(e) {
        return null == e || "boolean" == typeof e ? qi(_i) : v(e) ? qi(xi, null, e.slice()) : "object" == typeof e ? Xi(e) : qi(Ei, null, String(e))
    }

    function Xi(e) {
        return null === e.el && -1 !== e.patchFlag || e.memo ? e : Zi(e)
    }

    function Ji(e, t) {
        let n = 0;
        const {shapeFlag: r} = e;
        if (null == t) t = null; else if (v(t)) n = 16; else if ("object" == typeof t) {
            if (65 & r) {
                const n = t.default;
                return void (n && (n._c && (n._d = !1), Ji(e, n()), n._c && (n._d = !0)))
            }
            {
                n = 32;
                const r = t._;
                r || Bi in t ? 3 === r && Pn && (1 === Pn.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Pn
            }
        } else w(t) ? (t = {default: t, _ctx: Pn}, n = 32) : (t = String(t), 64 & r ? (n = 16, t = [Ui(t)]) : n = 8);
        e.children = t, e.shapeFlag |= n
    }

    function Qi(...e) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            for (const e in r) if ("class" === e) t.class !== r.class && (t.class = Q([t.class, r.class])); else if ("style" === e) t.style = K([t.style, r.style]); else if (u(e)) {
                const n = t[e], o = r[e];
                !o || n === o || v(n) && n.includes(o) || (t[e] = n ? [].concat(n, o) : o)
            } else "" !== e && (t[e] = r[e])
        }
        return t
    }

    function es(e, t, n, r = null) {
        cn(e, t, 7, [n, r])
    }

    const ts = Wo();
    let ns = 0;

    function rs(e, t, n) {
        const r = e.type, o = (t ? t.appContext : e.appContext) || ts, s = {
            uid: ns++,
            vnode: e,
            type: r,
            parent: t,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new de(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Ko(r, o),
            emitsOptions: In(r, o),
            emit: null,
            emitted: null,
            propsDefaults: i,
            inheritAttrs: r.inheritAttrs,
            ctx: i,
            data: i,
            props: i,
            attrs: i,
            slots: i,
            refs: i,
            setupState: i,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
        return s.ctx = {_: s}, s.root = t ? t.root : s, s.emit = Mn.bind(null, s), e.ce && e.ce(s), s
    }

    let os = null;
    const is = () => os || Pn;
    let ss, as, ls = "__VUE_INSTANCE_SETTERS__";
    (as = $()[ls]) || (as = $()[ls] = []), as.push((e => os = e)), ss = e => {
        as.length > 1 ? as.forEach((t => t(e))) : as[0](e)
    };
    const cs = e => {
        ss(e), e.scope.on()
    }, us = () => {
        os && os.scope.off(), ss(null)
    };

    function ds(e) {
        return 4 & e.vnode.shapeFlag
    }

    let hs, ps, fs = !1;

    function ms(e, t = !1) {
        fs = t;
        const {props: n, children: r} = e.vnode, o = ds(e);
        !function (e, t, n, r = !1) {
            const o = {}, i = {};
            V(i, Bi, 1), e.propsDefaults = Object.create(null), Zo(e, t, o, i);
            for (const t in e.propsOptions[0]) t in o || (o[t] = void 0);
            n ? e.props = r ? o : Tt(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i
        }(e, n, o, t), oi(e, r);
        const i = o ? function (e, t) {
            const n = e.type;
            e.accessCache = Object.create(null), e.proxy = Pt(new Proxy(e.ctx, co));
            const {setup: r} = n;
            if (r) {
                const n = e.setupContext = r.length > 1 ? ws(e) : null;
                cs(e), Oe();
                const o = ln(r, e, 0, [e.props, n]);
                if (Me(), us(), E(o)) {
                    if (o.then(us, us), t) return o.then((n => {
                        vs(e, n, t)
                    })).catch((t => {
                        un(t, e, 0)
                    }));
                    e.asyncDep = o
                } else vs(e, o, t)
            } else ys(e, t)
        }(e, t) : void 0;
        return fs = !1, i
    }

    function vs(e, t, n) {
        w(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : x(t) && (e.setupState = Gt(t)), ys(e, n)
    }

    function gs(e) {
        hs = e, ps = e => {
            e.render._rc && (e.withProxy = new Proxy(e.ctx, uo))
        }
    }

    const bs = () => !hs;

    function ys(e, t, n) {
        const r = e.type;
        if (!e.render) {
            if (!t && hs && !r.render) {
                const t = r.template || Do(e).template;
                if (t) {
                    const {isCustomElement: n, compilerOptions: o} = e.appContext.config, {delimiters: i, compilerOptions: s} = r,
                        a = h(h({isCustomElement: n, delimiters: i}, o), s);
                    r.render = hs(t, a)
                }
            }
            e.render = r.render || a, ps && ps(e)
        }
        cs(e), Oe(), function (e) {
            const t = Do(e), n = e.proxy, r = e.ctx;
            Lo = !1, t.beforeCreate && Ao(t.beforeCreate, e, "bc");
            const {
                data: o,
                computed: i,
                methods: s,
                watch: l,
                provide: c,
                inject: u,
                created: d,
                beforeMount: h,
                mounted: p,
                beforeUpdate: f,
                updated: m,
                activated: g,
                deactivated: b,
                beforeDestroy: y,
                beforeUnmount: S,
                destroyed: k,
                unmounted: E,
                render: _,
                renderTracked: C,
                renderTriggered: T,
                errorCaptured: L,
                serverPrefetch: A,
                expose: R,
                inheritAttrs: D,
                components: O,
                directives: M,
                filters: I
            } = t;
            if (u && function (e, t, n = a) {
                v(e) && (e = Fo(e));
                for (const n in e) {
                    const r = e[n];
                    let o;
                    o = x(r) ? "default" in r ? qo(r.from || n, r.default, !0) : qo(r.from || n) : qo(r), Vt(o) ? Object.defineProperty(t, n, {
                        enumerable: !0,
                        configurable: !0,
                        get: () => o.value,
                        set: e => o.value = e
                    }) : t[n] = o
                }
            }(u, r, null), s) for (const e in s) {
                const t = s[e];
                w(t) && (r[e] = t.bind(n))
            }
            if (o) {
                const t = o.call(n, n);
                x(t) && (e.data = Ct(t))
            }
            if (Lo = !0, i) for (const e in i) {
                const t = i[e], o = w(t) ? t.bind(n, n) : w(t.get) ? t.get.bind(n, n) : a, s = !w(t) && w(t.set) ? t.set.bind(n) : a, l = xs({get: o, set: s});
                Object.defineProperty(r, e, {enumerable: !0, configurable: !0, get: () => l.value, set: e => l.value = e})
            }
            if (l) for (const e in l) Ro(l[e], r, n, e);
            if (c) {
                const e = w(c) ? c.call(n) : c;
                Reflect.ownKeys(e).forEach((t => {
                    zo(t, e[t])
                }))
            }

            function F(e, t) {
                v(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
            }

            if (d && Ao(d, e, "c"), F(Hr, h), F(Nr, p), F(Wr, f), F(Br, m), F(Ar, g), F(Rr, b), F(Zr, L), F($r, C), F(qr, T), F(Vr, S), F(jr, E), F(zr, A), v(R)) if (R.length) {
                const t = e.exposed || (e.exposed = {});
                R.forEach((e => {
                    Object.defineProperty(t, e, {get: () => n[e], set: t => n[e] = t})
                }))
            } else e.exposed || (e.exposed = {});
            _ && e.render === a && (e.render = _), null != D && (e.inheritAttrs = D), O && (e.components = O), M && (e.directives = M)
        }(e), Me(), us()
    }

    function ws(e) {
        return {
            get attrs() {
                return function (e) {
                    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {get: (t, n) => (Ie(e, 0, "$attrs"), t[n])}))
                }(e)
            }, slots: e.slots, emit: e.emit, expose: t => {
                e.exposed = t || {}
            }
        }
    }

    function Ss(e) {
        if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Gt(Pt(e.exposed)), {
            get: (t, n) => n in t ? t[n] : n in ao ? ao[n](e) : void 0,
            has: (e, t) => t in e || t in ao
        }))
    }

    function ks(e, t = !0) {
        return w(e) ? e.displayName || e.name : e.name || t && e.__name
    }

    const xs = (e, t) => function (e, t, n = !1) {
        let r, o;
        const i = w(e);
        return i ? (r = e, o = a) : (r = e.get, o = e.set), new on(r, o, i || !o, n)
    }(e, 0, fs);

    function Es(e, t, n) {
        const r = arguments.length;
        return 2 === r ? x(t) && !v(t) ? Hi(t) ? qi(e, null, [t]) : qi(e, t) : qi(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === r && Hi(n) && (n = [n]), qi(e, t, n))
    }

    const _s = Symbol.for("v-scx"), Cs = () => qo(_s);

    function Ts() {
    }

    function Ls(e, t, n, r) {
        const o = n[r];
        if (o && As(o, e)) return o;
        const i = t();
        return i.memo = e.slice(), n[r] = i
    }

    function As(e, t) {
        const n = e.memo;
        if (n.length != t.length) return !1;
        for (let e = 0; e < n.length; e++) if (W(n[e], t[e])) return !1;
        return Oi > 0 && Li && Li.push(e), !0
    }

    const Rs = "3.3.4", Ds = {createComponentInstance: rs, setupComponent: ms, renderComponentRoot: zn, setCurrentRenderingInstance: Nn, isVNode: Hi, normalizeVNode: Gi},
        Os = null, Ms = null, Is = "undefined" != typeof document ? document : null, Fs = Is && Is.createElement("template"), Ps = {
            insert: (e, t, n) => {
                t.insertBefore(e, n || null)
            }, remove: e => {
                const t = e.parentNode;
                t && t.removeChild(e)
            }, createElement: (e, t, n, r) => {
                const o = t ? Is.createElementNS("http://www.w3.org/2000/svg", e) : Is.createElement(e, n ? {is: n} : void 0);
                return "select" === e && r && null != r.multiple && o.setAttribute("multiple", r.multiple), o
            }, createText: e => Is.createTextNode(e), createComment: e => Is.createComment(e), setText: (e, t) => {
                e.nodeValue = t
            }, setElementText: (e, t) => {
                e.textContent = t
            }, parentNode: e => e.parentNode, nextSibling: e => e.nextSibling, querySelector: e => Is.querySelector(e), setScopeId(e, t) {
                e.setAttribute(t, "")
            }, insertStaticContent(e, t, n, r, o, i) {
                const s = n ? n.previousSibling : t.lastChild;
                if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), o !== i && (o = o.nextSibling);) ; else {
                    Fs.innerHTML = r ? `<svg>${e}</svg>` : e;
                    const o = Fs.content;
                    if (r) {
                        const e = o.firstChild;
                        for (; e.firstChild;) o.appendChild(e.firstChild);
                        o.removeChild(e)
                    }
                    t.insertBefore(o, n)
                }
                return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
            }
        }, Hs = /\s*!important$/;

    function Ns(e, t, n) {
        if (v(n)) n.forEach((n => Ns(e, t, n))); else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
            const r = function (e, t) {
                const n = Bs[t];
                if (n) return n;
                let r = I(t);
                if ("filter" !== r && r in e) return Bs[t] = r;
                r = H(r);
                for (let n = 0; n < Ws.length; n++) {
                    const o = Ws[n] + r;
                    if (o in e) return Bs[t] = o
                }
                return t
            }(e, t);
            Hs.test(n) ? e.setProperty(P(r), n.replace(Hs, ""), "important") : e[r] = n
        }
    }

    const Ws = ["Webkit", "Moz", "ms"], Bs = {}, Vs = "http://www.w3.org/1999/xlink";

    function js(e, t, n, r) {
        e.addEventListener(t, n, r)
    }

    const zs = /(?:Once|Passive|Capture)$/;
    let qs = 0;
    const $s = Promise.resolve(), Zs = () => qs || ($s.then((() => qs = 0)), qs = Date.now()), Us = /^on[a-z]/;

    function Ks(e, t) {
        const n = kr(e);

        class r extends Xs {
            constructor(e) {
                super(n, e, t)
            }
        }

        return r.def = n, r
    }

    const Ys = e => Ks(e, Qa), Gs = "undefined" != typeof HTMLElement ? HTMLElement : class {
    };

    class Xs extends Gs {
        constructor(e, t = {}, n) {
            super(), this._def = e, this._props = t, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({mode: "open"}), this._def.__asyncLoader || this._resolveProps(this._def))
        }

        connectedCallback() {
            this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef())
        }

        disconnectedCallback() {
            this._connected = !1, wn((() => {
                this._connected || (Ja(null, this.shadowRoot), this._instance = null)
            }))
        }

        _resolveDef() {
            this._resolved = !0;
            for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
            new MutationObserver((e => {
                for (const t of e) this._setAttr(t.attributeName)
            })).observe(this, {attributes: !0});
            const e = (e, t = !1) => {
                const {props: n, styles: r} = e;
                let o;
                if (n && !v(n)) for (const e in n) {
                    const t = n[e];
                    (t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = z(this._props[e])), (o || (o = Object.create(null)))[I(e)] = !0)
                }
                this._numberProps = o, t && this._resolveProps(e), this._applyStyles(r), this._update()
            }, t = this._def.__asyncLoader;
            t ? t().then((t => e(t, !0))) : e(this._def)
        }

        _resolveProps(e) {
            const {props: t} = e, n = v(t) ? t : Object.keys(t || {});
            for (const e of Object.keys(this)) "_" !== e[0] && n.includes(e) && this._setProp(e, this[e], !0, !1);
            for (const e of n.map(I)) Object.defineProperty(this, e, {
                get() {
                    return this._getProp(e)
                }, set(t) {
                    this._setProp(e, t)
                }
            })
        }

        _setAttr(e) {
            let t = this.getAttribute(e);
            const n = I(e);
            this._numberProps && this._numberProps[n] && (t = z(t)), this._setProp(n, t, !1)
        }

        _getProp(e) {
            return this._props[e]
        }

        _setProp(e, t, n = !0, r = !0) {
            t !== this._props[e] && (this._props[e] = t, r && this._instance && this._update(), n && (!0 === t ? this.setAttribute(P(e), "") : "string" == typeof t || "number" == typeof t ? this.setAttribute(P(e), t + "") : t || this.removeAttribute(P(e))))
        }

        _update() {
            Ja(this._createVNode(), this.shadowRoot)
        }

        _createVNode() {
            const e = qi(this._def, h({}, this._props));
            return this._instance || (e.ce = e => {
                this._instance = e, e.isCE = !0;
                const t = (e, t) => {
                    this.dispatchEvent(new CustomEvent(e, {detail: t}))
                };
                e.emit = (e, ...n) => {
                    t(e, n), P(e) !== e && t(P(e), n)
                };
                let n = this;
                for (; n = n && (n.parentNode || n.host);) if (n instanceof Xs) {
                    e.parent = n._instance, e.provides = n._instance.provides;
                    break
                }
            }), e
        }

        _applyStyles(e) {
            e && e.forEach((e => {
                const t = document.createElement("style");
                t.textContent = e, this.shadowRoot.appendChild(t)
            }))
        }
    }

    function Js(e = "$style") {
        {
            const t = is();
            if (!t) return i;
            const n = t.type.__cssModules;
            if (!n) return i;
            return n[e] || i
        }
    }

    function Qs(e) {
        const t = is();
        if (!t) return;
        const n = t.ut = (n = e(t.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e => ta(e, n)))
        }, r = () => {
            const r = e(t.proxy);
            ea(t.subTree, r), n(r)
        };
        nr(r), Nr((() => {
            const e = new MutationObserver(r);
            e.observe(t.subTree.el.parentNode, {childList: !0}), jr((() => e.disconnect()))
        }))
    }

    function ea(e, t) {
        if (128 & e.shapeFlag) {
            const n = e.suspense;
            e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push((() => {
                ea(n.activeBranch, t)
            }))
        }
        for (; e.component;) e = e.component.subTree;
        if (1 & e.shapeFlag && e.el) ta(e.el, t); else if (e.type === xi) e.children.forEach((e => ea(e, t))); else if (e.type === Ci) {
            let {el: n, anchor: r} = e;
            for (; n && (ta(n, t), n !== r);) n = n.nextSibling
        }
    }

    function ta(e, t) {
        if (1 === e.nodeType) {
            const n = e.style;
            for (const e in t) n.setProperty(`--${e}`, t[e])
        }
    }

    const na = "transition", ra = "animation", oa = (e, {slots: t}) => Es(mr, ca(e), t);
    oa.displayName = "Transition";
    const ia = {
        name: String,
        type: String,
        css: {type: Boolean, default: !0},
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    }, sa = oa.props = h({}, fr, ia), aa = (e, t = []) => {
        v(e) ? e.forEach((e => e(...t))) : e && e(...t)
    }, la = e => !!e && (v(e) ? e.some((e => e.length > 1)) : e.length > 1);

    function ca(e) {
        const t = {};
        for (const n in e) n in ia || (t[n] = e[n]);
        if (!1 === e.css) return t;
        const {
            name: n = "v",
            type: r,
            duration: o,
            enterFromClass: i = `${n}-enter-from`,
            enterActiveClass: s = `${n}-enter-active`,
            enterToClass: a = `${n}-enter-to`,
            appearFromClass: l = i,
            appearActiveClass: c = s,
            appearToClass: u = a,
            leaveFromClass: d = `${n}-leave-from`,
            leaveActiveClass: p = `${n}-leave-active`,
            leaveToClass: f = `${n}-leave-to`
        } = e, m = function (e) {
            if (null == e) return null;
            if (x(e)) return [ua(e.enter), ua(e.leave)];
            {
                const t = ua(e);
                return [t, t]
            }
        }(o), v = m && m[0], g = m && m[1], {
            onBeforeEnter: b,
            onEnter: y,
            onEnterCancelled: w,
            onLeave: S,
            onLeaveCancelled: k,
            onBeforeAppear: E = b,
            onAppear: _ = y,
            onAppearCancelled: C = w
        } = t, T = (e, t, n) => {
            ha(e, t ? u : a), ha(e, t ? c : s), n && n()
        }, L = (e, t) => {
            e._isLeaving = !1, ha(e, d), ha(e, f), ha(e, p), t && t()
        }, A = e => (t, n) => {
            const o = e ? _ : y, s = () => T(t, e, n);
            aa(o, [t, s]), pa((() => {
                ha(t, e ? l : i), da(t, e ? u : a), la(o) || ma(t, r, v, s)
            }))
        };
        return h(t, {
            onBeforeEnter(e) {
                aa(b, [e]), da(e, i), da(e, s)
            }, onBeforeAppear(e) {
                aa(E, [e]), da(e, l), da(e, c)
            }, onEnter: A(!1), onAppear: A(!0), onLeave(e, t) {
                e._isLeaving = !0;
                const n = () => L(e, t);
                da(e, d), ya(), da(e, p), pa((() => {
                    e._isLeaving && (ha(e, d), da(e, f), la(S) || ma(e, r, g, n))
                })), aa(S, [e, n])
            }, onEnterCancelled(e) {
                T(e, !1), aa(w, [e])
            }, onAppearCancelled(e) {
                T(e, !0), aa(C, [e])
            }, onLeaveCancelled(e) {
                L(e), aa(k, [e])
            }
        })
    }

    function ua(e) {
        return z(e)
    }

    function da(e, t) {
        t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
    }

    function ha(e, t) {
        t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
        const {_vtc: n} = e;
        n && (n.delete(t), n.size || (e._vtc = void 0))
    }

    function pa(e) {
        requestAnimationFrame((() => {
            requestAnimationFrame(e)
        }))
    }

    let fa = 0;

    function ma(e, t, n, r) {
        const o = e._endId = ++fa, i = () => {
            o === e._endId && r()
        };
        if (n) return setTimeout(i, n);
        const {type: s, timeout: a, propCount: l} = va(e, t);
        if (!s) return r();
        const c = s + "end";
        let u = 0;
        const d = () => {
            e.removeEventListener(c, h), i()
        }, h = t => {
            t.target === e && ++u >= l && d()
        };
        setTimeout((() => {
            u < l && d()
        }), a + 1), e.addEventListener(c, h)
    }

    function va(e, t) {
        const n = window.getComputedStyle(e), r = e => (n[e] || "").split(", "), o = r(`${na}Delay`), i = r(`${na}Duration`), s = ga(o, i), a = r(`${ra}Delay`),
            l = r(`${ra}Duration`), c = ga(a, l);
        let u = null, d = 0, h = 0;
        return t === na ? s > 0 && (u = na, d = s, h = i.length) : t === ra ? c > 0 && (u = ra, d = c, h = l.length) : (d = Math.max(s, c), u = d > 0 ? s > c ? na : ra : null, h = u ? u === na ? i.length : l.length : 0), {
            type: u,
            timeout: d,
            propCount: h,
            hasTransform: u === na && /\b(transform|all)(,|$)/.test(r(`${na}Property`).toString())
        }
    }

    function ga(e, t) {
        for (; e.length < t.length;) e = e.concat(e);
        return Math.max(...t.map(((t, n) => ba(t) + ba(e[n]))))
    }

    function ba(e) {
        return 1e3 * Number(e.slice(0, -1).replace(",", "."))
    }

    function ya() {
        return document.body.offsetHeight
    }

    const wa = new WeakMap, Sa = new WeakMap, ka = {
        name: "TransitionGroup", props: h({}, sa, {tag: String, moveClass: String}), setup(e, {slots: t}) {
            const n = is(), r = hr();
            let o, i;
            return Br((() => {
                if (!o.length) return;
                const t = e.moveClass || `${e.name || "v"}-move`;
                if (!function (e, t, n) {
                    const r = e.cloneNode();
                    e._vtc && e._vtc.forEach((e => {
                        e.split(/\s+/).forEach((e => e && r.classList.remove(e)))
                    })), n.split(/\s+/).forEach((e => e && r.classList.add(e))), r.style.display = "none";
                    const o = 1 === t.nodeType ? t : t.parentNode;
                    o.appendChild(r);
                    const {hasTransform: i} = va(r);
                    return o.removeChild(r), i
                }(o[0].el, n.vnode.el, t)) return;
                o.forEach(xa), o.forEach(Ea);
                const r = o.filter(_a);
                ya(), r.forEach((e => {
                    const n = e.el, r = n.style;
                    da(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
                    const o = n._moveCb = e => {
                        e && e.target !== n || e && !/transform$/.test(e.propertyName) || (n.removeEventListener("transitionend", o), n._moveCb = null, ha(n, t))
                    };
                    n.addEventListener("transitionend", o)
                }))
            })), () => {
                const s = Ft(e), a = ca(s);
                let l = s.tag || xi;
                o = i, i = t.default ? Sr(t.default()) : [];
                for (let e = 0; e < i.length; e++) {
                    const t = i[e];
                    null != t.key && wr(t, gr(t, a, r, n))
                }
                if (o) for (let e = 0; e < o.length; e++) {
                    const t = o[e];
                    wr(t, gr(t, a, r, n)), wa.set(t, t.el.getBoundingClientRect())
                }
                return qi(l, null, i)
            }
        }
    };

    function xa(e) {
        const t = e.el;
        t._moveCb && t._moveCb(), t._enterCb && t._enterCb()
    }

    function Ea(e) {
        Sa.set(e, e.el.getBoundingClientRect())
    }

    function _a(e) {
        const t = wa.get(e), n = Sa.get(e), r = t.left - n.left, o = t.top - n.top;
        if (r || o) {
            const t = e.el.style;
            return t.transform = t.webkitTransform = `translate(${r}px,${o}px)`, t.transitionDuration = "0s", e
        }
    }

    const Ca = e => {
        const t = e.props["onUpdate:modelValue"] || !1;
        return v(t) ? e => B(t, e) : t
    };

    function Ta(e) {
        e.target.composing = !0
    }

    function La(e) {
        const t = e.target;
        t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
    }

    const Aa = {
        created(e, {modifiers: {lazy: t, trim: n, number: r}}, o) {
            e._assign = Ca(o);
            const i = r || o.props && "number" === o.props.type;
            js(e, t ? "change" : "input", (t => {
                if (t.target.composing) return;
                let r = e.value;
                n && (r = r.trim()), i && (r = j(r)), e._assign(r)
            })), n && js(e, "change", (() => {
                e.value = e.value.trim()
            })), t || (js(e, "compositionstart", Ta), js(e, "compositionend", La), js(e, "change", La))
        }, mounted(e, {value: t}) {
            e.value = null == t ? "" : t
        }, beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: o}}, i) {
            if (e._assign = Ca(i), e.composing) return;
            if (document.activeElement === e && "range" !== e.type) {
                if (n) return;
                if (r && e.value.trim() === t) return;
                if ((o || "number" === e.type) && j(e.value) === t) return
            }
            const s = null == t ? "" : t;
            e.value !== s && (e.value = s)
        }
    }, Ra = {
        deep: !0, created(e, t, n) {
            e._assign = Ca(n), js(e, "change", (() => {
                const t = e._modelValue, n = Fa(e), r = e.checked, o = e._assign;
                if (v(t)) {
                    const e = ae(t, n), i = -1 !== e;
                    if (r && !i) o(t.concat(n)); else if (!r && i) {
                        const n = [...t];
                        n.splice(e, 1), o(n)
                    }
                } else if (b(t)) {
                    const e = new Set(t);
                    r ? e.add(n) : e.delete(n), o(e)
                } else o(Pa(e, r))
            }))
        }, mounted: Da, beforeUpdate(e, t, n) {
            e._assign = Ca(n), Da(e, t, n)
        }
    };

    function Da(e, {value: t, oldValue: n}, r) {
        e._modelValue = t, v(t) ? e.checked = ae(t, r.props.value) > -1 : b(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = se(t, Pa(e, !0)))
    }

    const Oa = {
        created(e, {value: t}, n) {
            e.checked = se(t, n.props.value), e._assign = Ca(n), js(e, "change", (() => {
                e._assign(Fa(e))
            }))
        }, beforeUpdate(e, {value: t, oldValue: n}, r) {
            e._assign = Ca(r), t !== n && (e.checked = se(t, r.props.value))
        }
    }, Ma = {
        deep: !0, created(e, {value: t, modifiers: {number: n}}, r) {
            const o = b(t);
            js(e, "change", (() => {
                const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? j(Fa(e)) : Fa(e)));
                e._assign(e.multiple ? o ? new Set(t) : t : t[0])
            })), e._assign = Ca(r)
        }, mounted(e, {value: t}) {
            Ia(e, t)
        }, beforeUpdate(e, t, n) {
            e._assign = Ca(n)
        }, updated(e, {value: t}) {
            Ia(e, t)
        }
    };

    function Ia(e, t) {
        const n = e.multiple;
        if (!n || v(t) || b(t)) {
            for (let r = 0, o = e.options.length; r < o; r++) {
                const o = e.options[r], i = Fa(o);
                if (n) v(t) ? o.selected = ae(t, i) > -1 : o.selected = t.has(i); else if (se(Fa(o), t)) return void (e.selectedIndex !== r && (e.selectedIndex = r))
            }
            n || -1 === e.selectedIndex || (e.selectedIndex = -1)
        }
    }

    function Fa(e) {
        return "_value" in e ? e._value : e.value
    }

    function Pa(e, t) {
        const n = t ? "_trueValue" : "_falseValue";
        return n in e ? e[n] : t
    }

    const Ha = {
        created(e, t, n) {
            Wa(e, t, n, null, "created")
        }, mounted(e, t, n) {
            Wa(e, t, n, null, "mounted")
        }, beforeUpdate(e, t, n, r) {
            Wa(e, t, n, r, "beforeUpdate")
        }, updated(e, t, n, r) {
            Wa(e, t, n, r, "updated")
        }
    };

    function Na(e, t) {
        switch (e) {
            case"SELECT":
                return Ma;
            case"TEXTAREA":
                return Aa;
            default:
                switch (t) {
                    case"checkbox":
                        return Ra;
                    case"radio":
                        return Oa;
                    default:
                        return Aa
                }
        }
    }

    function Wa(e, t, n, r, o) {
        const i = Na(e.tagName, n.props && n.props.type)[o];
        i && i(e, t, n, r)
    }

    const Ba = ["ctrl", "shift", "alt", "meta"], Va = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => "button" in e && 0 !== e.button,
        middle: e => "button" in e && 1 !== e.button,
        right: e => "button" in e && 2 !== e.button,
        exact: (e, t) => Ba.some((n => e[`${n}Key`] && !t.includes(n)))
    }, ja = (e, t) => (n, ...r) => {
        for (let e = 0; e < t.length; e++) {
            const r = Va[t[e]];
            if (r && r(n, t)) return
        }
        return e(n, ...r)
    }, za = {esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace"}, qa = (e, t) => n => {
        if (!("key" in n)) return;
        const r = P(n.key);
        return t.some((e => e === r || za[e] === r)) ? e(n) : void 0
    }, $a = {
        beforeMount(e, {value: t}, {transition: n}) {
            e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Za(e, t)
        }, mounted(e, {value: t}, {transition: n}) {
            n && t && n.enter(e)
        }, updated(e, {value: t, oldValue: n}, {transition: r}) {
            !t != !n && (r ? t ? (r.beforeEnter(e), Za(e, !0), r.enter(e)) : r.leave(e, (() => {
                Za(e, !1)
            })) : Za(e, t))
        }, beforeUnmount(e, {value: t}) {
            Za(e, t)
        }
    };

    function Za(e, t) {
        e.style.display = t ? e._vod : "none"
    }

    const Ua = h({
        patchProp: (e, t, n, r, o = !1, i, s, a, l) => {
            "class" === t ? function (e, t, n) {
                const r = e._vtc;
                r && (t = (t ? [t, ...r] : [...r]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
            }(e, r, o) : "style" === t ? function (e, t, n) {
                const r = e.style, o = S(n);
                if (n && !o) {
                    if (t && !S(t)) for (const e in t) null == n[e] && Ns(r, e, "");
                    for (const e in n) Ns(r, e, n[e])
                } else {
                    const i = r.display;
                    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i)
                }
            }(e, n, r) : u(t) ? d(t) || function (e, t, n, r, o = null) {
                const i = e._vei || (e._vei = {}), s = i[t];
                if (r && s) s.value = r; else {
                    const [n, a] = function (e) {
                        let t;
                        if (zs.test(e)) {
                            let n;
                            for (t = {}; n = e.match(zs);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
                        }
                        return [":" === e[2] ? e.slice(3) : P(e.slice(2)), t]
                    }(t);
                    if (r) {
                        const s = i[t] = function (e, t) {
                            const n = e => {
                                if (e._vts) {
                                    if (e._vts <= n.attached) return
                                } else e._vts = Date.now();
                                cn(function (e, t) {
                                    if (v(t)) {
                                        const n = e.stopImmediatePropagation;
                                        return e.stopImmediatePropagation = () => {
                                            n.call(e), e._stopped = !0
                                        }, t.map((e => t => !t._stopped && e && e(t)))
                                    }
                                    return t
                                }(e, n.value), t, 5, [e])
                            };
                            return n.value = e, n.attached = Zs(), n
                        }(r, o);
                        js(e, n, s, a)
                    } else s && (function (e, t, n, r) {
                        e.removeEventListener(t, n, r)
                    }(e, n, s, a), i[t] = void 0)
                }
            }(e, t, 0, r, s) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, n, r) {
                return r ? "innerHTML" === t || "textContent" === t || !!(t in e && Us.test(t) && w(n)) : "spellcheck" !== t && "draggable" !== t && "translate" !== t && ("form" !== t && (("list" !== t || "INPUT" !== e.tagName) && (("type" !== t || "TEXTAREA" !== e.tagName) && ((!Us.test(t) || !S(n)) && t in e))))
            }(e, t, r, o)) ? function (e, t, n, r, o, i, s) {
                if ("innerHTML" === t || "textContent" === t) return r && s(r, o, i), void (e[t] = null == n ? "" : n);
                const a = e.tagName;
                if ("value" === t && "PROGRESS" !== a && !a.includes("-")) {
                    e._value = n;
                    const r = null == n ? "" : n;
                    return ("OPTION" === a ? e.getAttribute("value") : e.value) !== r && (e.value = r), void (null == n && e.removeAttribute(t))
                }
                let l = !1;
                if ("" === n || null == n) {
                    const r = typeof e[t];
                    "boolean" === r ? n = ie(n) : null == n && "string" === r ? (n = "", l = !0) : "number" === r && (n = 0, l = !0)
                }
                try {
                    e[t] = n
                } catch (e) {
                }
                l && e.removeAttribute(t)
            }(e, t, r, i, s, a, l) : ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r), function (e, t, n, r, o) {
                if (r && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(Vs, t.slice(6, t.length)) : e.setAttributeNS(Vs, t, n); else {
                    const r = oe(t);
                    null == n || r && !ie(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
                }
            }(e, t, r, o))
        }
    }, Ps);
    let Ka, Ya = !1;

    function Ga() {
        return Ka || (Ka = hi(Ua))
    }

    function Xa() {
        return Ka = Ya ? Ka : pi(Ua), Ya = !0, Ka
    }

    const Ja = (...e) => {
        Ga().render(...e)
    }, Qa = (...e) => {
        Xa().hydrate(...e)
    }, el = (...e) => {
        const t = Ga().createApp(...e), {mount: n} = t;
        return t.mount = e => {
            const r = nl(e);
            if (!r) return;
            const o = t._component;
            w(o) || o.render || o.template || (o.template = r.innerHTML), r.innerHTML = "";
            const i = n(r, !1, r instanceof SVGElement);
            return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i
        }, t
    }, tl = (...e) => {
        const t = Xa().createApp(...e), {mount: n} = t;
        return t.mount = e => {
            const t = nl(e);
            if (t) return n(t, !0, t instanceof SVGElement)
        }, t
    };

    function nl(e) {
        return S(e) ? document.querySelector(e) : e
    }

    let rl = !1;
    const ol = () => {
        rl || (rl = !0, Aa.getSSRProps = ({value: e}) => ({value: e}), Oa.getSSRProps = ({value: e}, t) => {
            if (t.props && se(t.props.value, e)) return {checked: !0}
        }, Ra.getSSRProps = ({value: e}, t) => {
            if (v(e)) {
                if (t.props && ae(e, t.props.value) > -1) return {checked: !0}
            } else if (b(e)) {
                if (t.props && e.has(t.props.value)) return {checked: !0}
            } else if (e) return {checked: !0}
        }, Ha.getSSRProps = (e, t) => {
            if ("string" != typeof t.type) return;
            const n = Na(t.type.toUpperCase(), t.props && t.props.type);
            return n.getSSRProps ? n.getSSRProps(e, t) : void 0
        }, $a.getSSRProps = ({value: e}) => {
            if (!e) return {style: {display: "none"}}
        })
    };

    function il(e) {
        throw e
    }

    function sl(e) {
    }

    function al(e, t, n, r) {
        const o = new SyntaxError(String(e));
        return o.code = e, o.loc = t, o
    }

    const ll = Symbol(""), cl = Symbol(""), ul = Symbol(""), dl = Symbol(""), hl = Symbol(""), pl = Symbol(""), fl = Symbol(""), ml = Symbol(""), vl = Symbol(""), gl = Symbol(""),
        bl = Symbol(""), yl = Symbol(""), wl = Symbol(""), Sl = Symbol(""), kl = Symbol(""), xl = Symbol(""), El = Symbol(""), _l = Symbol(""), Cl = Symbol(""), Tl = Symbol(""),
        Ll = Symbol(""), Al = Symbol(""), Rl = Symbol(""), Dl = Symbol(""), Ol = Symbol(""), Ml = Symbol(""), Il = Symbol(""), Fl = Symbol(""), Pl = Symbol(""), Hl = Symbol(""),
        Nl = Symbol(""), Wl = Symbol(""), Bl = Symbol(""), Vl = Symbol(""), jl = Symbol(""), zl = Symbol(""), ql = Symbol(""), $l = Symbol(""), Zl = Symbol(""), Ul = {
            [ll]: "Fragment",
            [cl]: "Teleport",
            [ul]: "Suspense",
            [dl]: "KeepAlive",
            [hl]: "BaseTransition",
            [pl]: "openBlock",
            [fl]: "createBlock",
            [ml]: "createElementBlock",
            [vl]: "createVNode",
            [gl]: "createElementVNode",
            [bl]: "createCommentVNode",
            [yl]: "createTextVNode",
            [wl]: "createStaticVNode",
            [Sl]: "resolveComponent",
            [kl]: "resolveDynamicComponent",
            [xl]: "resolveDirective",
            [El]: "resolveFilter",
            [_l]: "withDirectives",
            [Cl]: "renderList",
            [Tl]: "renderSlot",
            [Ll]: "createSlots",
            [Al]: "toDisplayString",
            [Rl]: "mergeProps",
            [Dl]: "normalizeClass",
            [Ol]: "normalizeStyle",
            [Ml]: "normalizeProps",
            [Il]: "guardReactiveProps",
            [Fl]: "toHandlers",
            [Pl]: "camelize",
            [Hl]: "capitalize",
            [Nl]: "toHandlerKey",
            [Wl]: "setBlockTracking",
            [Bl]: "pushScopeId",
            [Vl]: "popScopeId",
            [jl]: "withCtx",
            [zl]: "unref",
            [ql]: "isRef",
            [$l]: "withMemo",
            [Zl]: "isMemoSame"
        }, Kl = {source: "", start: {line: 1, column: 1, offset: 0}, end: {line: 1, column: 1, offset: 0}};

    function Yl(e, t, n, r, o, i, s, a = !1, l = !1, c = !1, u = Kl) {
        return e && (a ? (e.helper(pl), e.helper(ic(e.inSSR, c))) : e.helper(oc(e.inSSR, c)), s && e.helper(_l)), {
            type: 13,
            tag: t,
            props: n,
            children: r,
            patchFlag: o,
            dynamicProps: i,
            directives: s,
            isBlock: a,
            disableTracking: l,
            isComponent: c,
            loc: u
        }
    }

    function Gl(e, t = Kl) {
        return {type: 17, loc: t, elements: e}
    }

    function Xl(e, t = Kl) {
        return {type: 15, loc: t, properties: e}
    }

    function Jl(e, t) {
        return {type: 16, loc: Kl, key: S(e) ? Ql(e, !0) : e, value: t}
    }

    function Ql(e, t = !1, n = Kl, r = 0) {
        return {type: 4, loc: n, content: e, isStatic: t, constType: t ? 3 : r}
    }

    function ec(e, t = Kl) {
        return {type: 8, loc: t, children: e}
    }

    function tc(e, t = [], n = Kl) {
        return {type: 14, loc: n, callee: e, arguments: t}
    }

    function nc(e, t = void 0, n = !1, r = !1, o = Kl) {
        return {type: 18, params: e, returns: t, newline: n, isSlot: r, loc: o}
    }

    function rc(e, t, n, r = !0) {
        return {type: 19, test: e, consequent: t, alternate: n, newline: r, loc: Kl}
    }

    function oc(e, t) {
        return e || t ? vl : gl
    }

    function ic(e, t) {
        return e || t ? fl : ml
    }

    function sc(e, {helper: t, removeHelper: n, inSSR: r}) {
        e.isBlock || (e.isBlock = !0, n(oc(r, e.isComponent)), t(pl), t(ic(r, e.isComponent)))
    }

    const ac = e => 4 === e.type && e.isStatic, lc = (e, t) => e === t || e === P(t);

    function cc(e) {
        return lc(e, "Teleport") ? cl : lc(e, "Suspense") ? ul : lc(e, "KeepAlive") ? dl : lc(e, "BaseTransition") ? hl : void 0
    }

    const uc = /^\d|[^\$\w]/, dc = e => !uc.test(e), hc = /[A-Za-z_$\xA0-\uFFFF]/, pc = /[\.\?\w$\xA0-\uFFFF]/, fc = /\s+[.[]\s*|\s*[.[]\s+/g, mc = e => {
        e = e.trim().replace(fc, (e => e.trim()));
        let t = 0, n = [], r = 0, o = 0, i = null;
        for (let s = 0; s < e.length; s++) {
            const a = e.charAt(s);
            switch (t) {
                case 0:
                    if ("[" === a) n.push(t), t = 1, r++; else if ("(" === a) n.push(t), t = 2, o++; else if (!(0 === s ? hc : pc).test(a)) return !1;
                    break;
                case 1:
                    "'" === a || '"' === a || "`" === a ? (n.push(t), t = 3, i = a) : "[" === a ? r++ : "]" === a && (--r || (t = n.pop()));
                    break;
                case 2:
                    if ("'" === a || '"' === a || "`" === a) n.push(t), t = 3, i = a; else if ("(" === a) o++; else if (")" === a) {
                        if (s === e.length - 1) return !1;
                        --o || (t = n.pop())
                    }
                    break;
                case 3:
                    a === i && (t = n.pop(), i = null)
            }
        }
        return !r && !o
    };

    function vc(e, t, n) {
        const r = {source: e.source.slice(t, t + n), start: gc(e.start, e.source, t), end: e.end};
        return null != n && (r.end = gc(e.start, e.source, t + n)), r
    }

    function gc(e, t, n = t.length) {
        return bc(h({}, e), t, n)
    }

    function bc(e, t, n = t.length) {
        let r = 0, o = -1;
        for (let e = 0; e < n; e++) 10 === t.charCodeAt(e) && (r++, o = e);
        return e.offset += n, e.line += r, e.column = -1 === o ? e.column + n : n - o, e
    }

    function yc(e, t, n = !1) {
        for (let r = 0; r < e.props.length; r++) {
            const o = e.props[r];
            if (7 === o.type && (n || o.exp) && (S(t) ? o.name === t : t.test(o.name))) return o
        }
    }

    function wc(e, t, n = !1, r = !1) {
        for (let o = 0; o < e.props.length; o++) {
            const i = e.props[o];
            if (6 === i.type) {
                if (n) continue;
                if (i.name === t && (i.value || r)) return i
            } else if ("bind" === i.name && (i.exp || r) && Sc(i.arg, t)) return i
        }
    }

    function Sc(e, t) {
        return !(!e || !ac(e) || e.content !== t)
    }

    function kc(e) {
        return 5 === e.type || 2 === e.type
    }

    function xc(e) {
        return 7 === e.type && "slot" === e.name
    }

    function Ec(e) {
        return 1 === e.type && 3 === e.tagType
    }

    function _c(e) {
        return 1 === e.type && 2 === e.tagType
    }

    const Cc = new Set([Ml, Il]);

    function Tc(e, t = []) {
        if (e && !S(e) && 14 === e.type) {
            const n = e.callee;
            if (!S(n) && Cc.has(n)) return Tc(e.arguments[0], t.concat(e))
        }
        return [e, t]
    }

    function Lc(e, t, n) {
        let r, o, i = 13 === e.type ? e.props : e.arguments[2], s = [];
        if (i && !S(i) && 14 === i.type) {
            const e = Tc(i);
            i = e[0], s = e[1], o = s[s.length - 1]
        }
        if (null == i || S(i)) r = Xl([t]); else if (14 === i.type) {
            const e = i.arguments[0];
            S(e) || 15 !== e.type ? i.callee === Fl ? r = tc(n.helper(Rl), [Xl([t]), i]) : i.arguments.unshift(Xl([t])) : Ac(t, e) || e.properties.unshift(t), !r && (r = i)
        } else 15 === i.type ? (Ac(t, i) || i.properties.unshift(t), r = i) : (r = tc(n.helper(Rl), [Xl([t]), i]), o && o.callee === Il && (o = s[s.length - 2]));
        13 === e.type ? o ? o.arguments[0] = r : e.props = r : o ? o.arguments[0] = r : e.arguments[2] = r
    }

    function Ac(e, t) {
        let n = !1;
        if (4 === e.key.type) {
            const r = e.key.content;
            n = t.properties.some((e => 4 === e.key.type && e.key.content === r))
        }
        return n
    }

    function Rc(e, t) {
        return `_${t}_${e.replace(/[^\w]/g, ((t, n) => "-" === t ? "_" : e.charCodeAt(n).toString()))}`
    }

    function Dc(e, t) {
        const n = t.options ? t.options.compatConfig : t.compatConfig, r = n && n[e];
        return "MODE" === e ? r || 3 : r
    }

    function Oc(e, t) {
        const n = Dc("MODE", t), r = Dc(e, t);
        return 3 === n ? !0 === r : !1 !== r
    }

    function Mc(e, t, n, ...r) {
        return Oc(e, t)
    }

    const Ic = /&(gt|lt|amp|apos|quot);/g, Fc = {gt: ">", lt: "<", amp: "&", apos: "'", quot: '"'}, Pc = {
        delimiters: ["{{", "}}"],
        getNamespace: () => 0,
        getTextMode: () => 0,
        isVoidTag: l,
        isPreTag: l,
        isCustomElement: l,
        decodeEntities: e => e.replace(Ic, ((e, t) => Fc[t])),
        onError: il,
        onWarn: sl,
        comments: !1
    };

    function Hc(e, t, n) {
        const r = Qc(n), o = r ? r.ns : 0, i = [];
        for (; !iu(e, t, n);) {
            const s = e.source;
            let a;
            if (0 === t || 1 === t) if (!e.inVPre && eu(s, e.options.delimiters[0])) a = Kc(e, t); else if (0 === t && "<" === s[0]) if (1 === s.length) ou(e, 5, 1); else if ("!" === s[1]) eu(s, "\x3c!--") ? a = Bc(e) : eu(s, "<!DOCTYPE") ? a = Vc(e) : eu(s, "<![CDATA[") ? 0 !== o ? a = Wc(e, n) : (ou(e, 1), a = Vc(e)) : (ou(e, 11), a = Vc(e)); else if ("/" === s[1]) if (2 === s.length) ou(e, 5, 2); else {
                if (">" === s[2]) {
                    ou(e, 14, 2), tu(e, 3);
                    continue
                }
                if (/[a-z]/i.test(s[2])) {
                    ou(e, 23), $c(e, zc.End, r);
                    continue
                }
                ou(e, 12, 2), a = Vc(e)
            } else /[a-z]/i.test(s[1]) ? (a = jc(e, n), Oc("COMPILER_NATIVE_TEMPLATE", e) && a && "template" === a.tag && !a.props.some((e => 7 === e.type && qc(e.name))) && (a = a.children)) : "?" === s[1] ? (ou(e, 21, 1), a = Vc(e)) : ou(e, 12, 1);
            if (a || (a = Yc(e, t)), v(a)) for (let e = 0; e < a.length; e++) Nc(i, a[e]); else Nc(i, a)
        }
        let s = !1;
        if (2 !== t && 1 !== t) {
            const t = "preserve" !== e.options.whitespace;
            for (let n = 0; n < i.length; n++) {
                const r = i[n];
                if (2 === r.type) if (e.inPre) r.content = r.content.replace(/\r\n/g, "\n"); else if (/[^\t\r\n\f ]/.test(r.content)) t && (r.content = r.content.replace(/[\t\r\n\f ]+/g, " ")); else {
                    const e = i[n - 1], o = i[n + 1];
                    !e || !o || t && (3 === e.type && 3 === o.type || 3 === e.type && 1 === o.type || 1 === e.type && 3 === o.type || 1 === e.type && 1 === o.type && /[\r\n]/.test(r.content)) ? (s = !0, i[n] = null) : r.content = " "
                } else 3 !== r.type || e.options.comments || (s = !0, i[n] = null)
            }
            if (e.inPre && r && e.options.isPreTag(r.tag)) {
                const e = i[0];
                e && 2 === e.type && (e.content = e.content.replace(/^\r?\n/, ""))
            }
        }
        return s ? i.filter(Boolean) : i
    }

    function Nc(e, t) {
        if (2 === t.type) {
            const n = Qc(e);
            if (n && 2 === n.type && n.loc.end.offset === t.loc.start.offset) return n.content += t.content, n.loc.end = t.loc.end, void (n.loc.source += t.loc.source)
        }
        e.push(t)
    }

    function Wc(e, t) {
        tu(e, 9);
        const n = Hc(e, 3, t);
        return 0 === e.source.length ? ou(e, 6) : tu(e, 3), n
    }

    function Bc(e) {
        const t = Xc(e);
        let n;
        const r = /--(\!)?>/.exec(e.source);
        if (r) {
            r.index <= 3 && ou(e, 0), r[1] && ou(e, 10), n = e.source.slice(4, r.index);
            const t = e.source.slice(0, r.index);
            let o = 1, i = 0;
            for (; -1 !== (i = t.indexOf("\x3c!--", o));) tu(e, i - o + 1), i + 4 < t.length && ou(e, 16), o = i + 1;
            tu(e, r.index + r[0].length - o + 1)
        } else n = e.source.slice(4), tu(e, e.source.length), ou(e, 7);
        return {type: 3, content: n, loc: Jc(e, t)}
    }

    function Vc(e) {
        const t = Xc(e), n = "?" === e.source[1] ? 1 : 2;
        let r;
        const o = e.source.indexOf(">");
        return -1 === o ? (r = e.source.slice(n), tu(e, e.source.length)) : (r = e.source.slice(n, o), tu(e, o + 1)), {type: 3, content: r, loc: Jc(e, t)}
    }

    function jc(e, t) {
        const n = e.inPre, r = e.inVPre, o = Qc(t), i = $c(e, zc.Start, o), s = e.inPre && !n, a = e.inVPre && !r;
        if (i.isSelfClosing || e.options.isVoidTag(i.tag)) return s && (e.inPre = !1), a && (e.inVPre = !1), i;
        t.push(i);
        const l = e.options.getTextMode(i, o), c = Hc(e, l, t);
        t.pop();
        {
            const t = i.props.find((e => 6 === e.type && "inline-template" === e.name));
            if (t && Mc("COMPILER_INLINE_TEMPLATE", e, t.loc)) {
                const n = Jc(e, i.loc.end);
                t.value = {type: 2, content: n.source, loc: n}
            }
        }
        if (i.children = c, su(e.source, i.tag)) $c(e, zc.End, o); else if (ou(e, 24, 0, i.loc.start), 0 === e.source.length && "script" === i.tag.toLowerCase()) {
            const t = c[0];
            t && eu(t.loc.source, "\x3c!--") && ou(e, 8)
        }
        return i.loc = Jc(e, i.loc.start), s && (e.inPre = !1), a && (e.inVPre = !1), i
    }

    var zc = (e => (e[e.Start = 0] = "Start", e[e.End = 1] = "End", e))(zc || {});
    const qc = o("if,else,else-if,for,slot");

    function $c(e, t, n) {
        const r = Xc(e), o = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source), i = o[1], s = e.options.getNamespace(i, n);
        tu(e, o[0].length), nu(e);
        const a = Xc(e), l = e.source;
        e.options.isPreTag(i) && (e.inPre = !0);
        let c = Zc(e, t);
        0 === t && !e.inVPre && c.some((e => 7 === e.type && "pre" === e.name)) && (e.inVPre = !0, h(e, a), e.source = l, c = Zc(e, t).filter((e => "v-pre" !== e.name)));
        let u = !1;
        if (0 === e.source.length ? ou(e, 9) : (u = eu(e.source, "/>"), 1 === t && u && ou(e, 4), tu(e, u ? 2 : 1)), 1 === t) return;
        let d = 0;
        return e.inVPre || ("slot" === i ? d = 2 : "template" === i ? c.some((e => 7 === e.type && qc(e.name))) && (d = 3) : function (e, t, n) {
            const r = n.options;
            if (r.isCustomElement(e)) return !1;
            if ("component" === e || /^[A-Z]/.test(e) || cc(e) || r.isBuiltInComponent && r.isBuiltInComponent(e) || r.isNativeTag && !r.isNativeTag(e)) return !0;
            for (let e = 0; e < t.length; e++) {
                const r = t[e];
                if (6 === r.type) {
                    if ("is" === r.name && r.value) {
                        if (r.value.content.startsWith("vue:")) return !0;
                        if (Mc("COMPILER_IS_ON_ELEMENT", n, r.loc)) return !0
                    }
                } else {
                    if ("is" === r.name) return !0;
                    if ("bind" === r.name && Sc(r.arg, "is") && Mc("COMPILER_IS_ON_ELEMENT", n, r.loc)) return !0
                }
            }
        }(i, c, e) && (d = 1)), {type: 1, ns: s, tag: i, tagType: d, props: c, isSelfClosing: u, children: [], loc: Jc(e, r), codegenNode: void 0}
    }

    function Zc(e, t) {
        const n = [], r = new Set;
        for (; e.source.length > 0 && !eu(e.source, ">") && !eu(e.source, "/>");) {
            if (eu(e.source, "/")) {
                ou(e, 22), tu(e, 1), nu(e);
                continue
            }
            1 === t && ou(e, 3);
            const o = Uc(e, r);
            6 === o.type && o.value && "class" === o.name && (o.value.content = o.value.content.replace(/\s+/g, " ").trim()), 0 === t && n.push(o), /^[^\t\r\n\f />]/.test(e.source) && ou(e, 15), nu(e)
        }
        return n
    }

    function Uc(e, t) {
        var n;
        const r = Xc(e), o = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];
        t.has(o) && ou(e, 2), t.add(o), "=" === o[0] && ou(e, 19);
        {
            const t = /["'<]/g;
            let n;
            for (; n = t.exec(o);) ou(e, 17, n.index)
        }
        let i;
        tu(e, o.length), /^[\t\r\n\f ]*=/.test(e.source) && (nu(e), tu(e, 1), nu(e), i = function (e) {
            const t = Xc(e);
            let n;
            const r = e.source[0], o = '"' === r || "'" === r;
            if (o) {
                tu(e, 1);
                const t = e.source.indexOf(r);
                -1 === t ? n = Gc(e, e.source.length, 4) : (n = Gc(e, t, 4), tu(e, 1))
            } else {
                const t = /^[^\t\r\n\f >]+/.exec(e.source);
                if (!t) return;
                const r = /["'<=`]/g;
                let o;
                for (; o = r.exec(t[0]);) ou(e, 18, o.index);
                n = Gc(e, t[0].length, 4)
            }
            return {content: n, isQuoted: o, loc: Jc(e, t)}
        }(e), i || ou(e, 13));
        const s = Jc(e, r);
        if (!e.inVPre && /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(o)) {
            const t = /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(o);
            let a, l = eu(o, "."), c = t[1] || (l || eu(o, ":") ? "bind" : eu(o, "@") ? "on" : "slot");
            if (t[2]) {
                const i = "slot" === c, s = o.lastIndexOf(t[2], o.length - ((null == (n = t[3]) ? void 0 : n.length) || 0)),
                    l = Jc(e, ru(e, r, s), ru(e, r, s + t[2].length + (i && t[3] || "").length));
                let u = t[2], d = !0;
                u.startsWith("[") ? (d = !1, u.endsWith("]") ? u = u.slice(1, u.length - 1) : (ou(e, 27), u = u.slice(1))) : i && (u += t[3] || ""), a = {
                    type: 4,
                    content: u,
                    isStatic: d,
                    constType: d ? 3 : 0,
                    loc: l
                }
            }
            if (i && i.isQuoted) {
                const e = i.loc;
                e.start.offset++, e.start.column++, e.end = gc(e.start, i.content), e.source = e.source.slice(1, -1)
            }
            const u = t[3] ? t[3].slice(1).split(".") : [];
            return l && u.push("prop"), "bind" === c && a && u.includes("sync") && Mc("COMPILER_V_BIND_SYNC", e, 0, a.loc.source) && (c = "model", u.splice(u.indexOf("sync"), 1)), {
                type: 7,
                name: c,
                exp: i && {type: 4, content: i.content, isStatic: !1, constType: 0, loc: i.loc},
                arg: a,
                modifiers: u,
                loc: s
            }
        }
        return !e.inVPre && eu(o, "v-") && ou(e, 26), {type: 6, name: o, value: i && {type: 2, content: i.content, loc: i.loc}, loc: s}
    }

    function Kc(e, t) {
        const [n, r] = e.options.delimiters, o = e.source.indexOf(r, n.length);
        if (-1 === o) return void ou(e, 25);
        const i = Xc(e);
        tu(e, n.length);
        const s = Xc(e), a = Xc(e), l = o - n.length, c = e.source.slice(0, l), u = Gc(e, l, t), d = u.trim(), h = u.indexOf(d);
        return h > 0 && bc(s, c, h), bc(a, c, l - (u.length - d.length - h)), tu(e, r.length), {
            type: 5,
            content: {type: 4, isStatic: !1, constType: 0, content: d, loc: Jc(e, s, a)},
            loc: Jc(e, i)
        }
    }

    function Yc(e, t) {
        const n = 3 === t ? ["]]>"] : ["<", e.options.delimiters[0]];
        let r = e.source.length;
        for (let t = 0; t < n.length; t++) {
            const o = e.source.indexOf(n[t], 1);
            -1 !== o && r > o && (r = o)
        }
        const o = Xc(e);
        return {type: 2, content: Gc(e, r, t), loc: Jc(e, o)}
    }

    function Gc(e, t, n) {
        const r = e.source.slice(0, t);
        return tu(e, t), 2 !== n && 3 !== n && r.includes("&") ? e.options.decodeEntities(r, 4 === n) : r
    }

    function Xc(e) {
        const {column: t, line: n, offset: r} = e;
        return {column: t, line: n, offset: r}
    }

    function Jc(e, t, n) {
        return {start: t, end: n = n || Xc(e), source: e.originalSource.slice(t.offset, n.offset)}
    }

    function Qc(e) {
        return e[e.length - 1]
    }

    function eu(e, t) {
        return e.startsWith(t)
    }

    function tu(e, t) {
        const {source: n} = e;
        bc(e, n, t), e.source = n.slice(t)
    }

    function nu(e) {
        const t = /^[\t\r\n\f ]+/.exec(e.source);
        t && tu(e, t[0].length)
    }

    function ru(e, t, n) {
        return gc(t, e.originalSource.slice(t.offset, n), n)
    }

    function ou(e, t, n, r = Xc(e)) {
        n && (r.offset += n, r.column += n), e.options.onError(al(t, {start: r, end: r, source: ""}))
    }

    function iu(e, t, n) {
        const r = e.source;
        switch (t) {
            case 0:
                if (eu(r, "</")) for (let e = n.length - 1; e >= 0; --e) if (su(r, n[e].tag)) return !0;
                break;
            case 1:
            case 2: {
                const e = Qc(n);
                if (e && su(r, e.tag)) return !0;
                break
            }
            case 3:
                if (eu(r, "]]>")) return !0
        }
        return !r
    }

    function su(e, t) {
        return eu(e, "</") && e.slice(2, 2 + t.length).toLowerCase() === t.toLowerCase() && /[\t\r\n\f />]/.test(e[2 + t.length] || ">")
    }

    function au(e, t) {
        cu(e, t, lu(e, e.children[0]))
    }

    function lu(e, t) {
        const {children: n} = e;
        return 1 === n.length && 1 === t.type && !_c(t)
    }

    function cu(e, t, n = !1) {
        const {children: r} = e, o = r.length;
        let i = 0;
        for (let e = 0; e < r.length; e++) {
            const o = r[e];
            if (1 === o.type && 0 === o.tagType) {
                const e = n ? 0 : uu(o, t);
                if (e > 0) {
                    if (e >= 2) {
                        o.codegenNode.patchFlag = "-1", o.codegenNode = t.hoist(o.codegenNode), i++;
                        continue
                    }
                } else {
                    const e = o.codegenNode;
                    if (13 === e.type) {
                        const n = mu(e);
                        if ((!n || 512 === n || 1 === n) && pu(o, t) >= 2) {
                            const n = fu(o);
                            n && (e.props = t.hoist(n))
                        }
                        e.dynamicProps && (e.dynamicProps = t.hoist(e.dynamicProps))
                    }
                }
            }
            if (1 === o.type) {
                const e = 1 === o.tagType;
                e && t.scopes.vSlot++, cu(o, t), e && t.scopes.vSlot--
            } else if (11 === o.type) cu(o, t, 1 === o.children.length); else if (9 === o.type) for (let e = 0; e < o.branches.length; e++) cu(o.branches[e], t, 1 === o.branches[e].children.length)
        }
        i && t.transformHoist && t.transformHoist(r, t, e), i && i === o && 1 === e.type && 0 === e.tagType && e.codegenNode && 13 === e.codegenNode.type && v(e.codegenNode.children) && (e.codegenNode.children = t.hoist(Gl(e.codegenNode.children)))
    }

    function uu(e, t) {
        const {constantCache: n} = t;
        switch (e.type) {
            case 1:
                if (0 !== e.tagType) return 0;
                const r = n.get(e);
                if (void 0 !== r) return r;
                const o = e.codegenNode;
                if (13 !== o.type) return 0;
                if (o.isBlock && "svg" !== e.tag && "foreignObject" !== e.tag) return 0;
                if (mu(o)) return n.set(e, 0), 0;
            {
                let r = 3;
                const i = pu(e, t);
                if (0 === i) return n.set(e, 0), 0;
                i < r && (r = i);
                for (let o = 0; o < e.children.length; o++) {
                    const i = uu(e.children[o], t);
                    if (0 === i) return n.set(e, 0), 0;
                    i < r && (r = i)
                }
                if (r > 1) for (let o = 0; o < e.props.length; o++) {
                    const i = e.props[o];
                    if (7 === i.type && "bind" === i.name && i.exp) {
                        const o = uu(i.exp, t);
                        if (0 === o) return n.set(e, 0), 0;
                        o < r && (r = o)
                    }
                }
                if (o.isBlock) {
                    for (let t = 0; t < e.props.length; t++) if (7 === e.props[t].type) return n.set(e, 0), 0;
                    t.removeHelper(pl), t.removeHelper(ic(t.inSSR, o.isComponent)), o.isBlock = !1, t.helper(oc(t.inSSR, o.isComponent))
                }
                return n.set(e, r), r
            }
            case 2:
            case 3:
                return 3;
            case 9:
            case 11:
            case 10:
            default:
                return 0;
            case 5:
            case 12:
                return uu(e.content, t);
            case 4:
                return e.constType;
            case 8:
                let i = 3;
                for (let n = 0; n < e.children.length; n++) {
                    const r = e.children[n];
                    if (S(r) || k(r)) continue;
                    const o = uu(r, t);
                    if (0 === o) return 0;
                    o < i && (i = o)
                }
                return i
        }
    }

    const du = new Set([Dl, Ol, Ml, Il]);

    function hu(e, t) {
        if (14 === e.type && !S(e.callee) && du.has(e.callee)) {
            const n = e.arguments[0];
            if (4 === n.type) return uu(n, t);
            if (14 === n.type) return hu(n, t)
        }
        return 0
    }

    function pu(e, t) {
        let n = 3;
        const r = fu(e);
        if (r && 15 === r.type) {
            const {properties: e} = r;
            for (let r = 0; r < e.length; r++) {
                const {key: o, value: i} = e[r], s = uu(o, t);
                if (0 === s) return s;
                let a;
                if (s < n && (n = s), a = 4 === i.type ? uu(i, t) : 14 === i.type ? hu(i, t) : 0, 0 === a) return a;
                a < n && (n = a)
            }
        }
        return n
    }

    function fu(e) {
        const t = e.codegenNode;
        if (13 === t.type) return t.props
    }

    function mu(e) {
        const t = e.patchFlag;
        return t ? parseInt(t, 10) : void 0
    }

    function vu(e, t) {
        const n = function (e, {
            filename: t = "",
            prefixIdentifiers: n = !1,
            hoistStatic: r = !1,
            cacheHandlers: o = !1,
            nodeTransforms: s = [],
            directiveTransforms: l = {},
            transformHoist: c = null,
            isBuiltInComponent: u = a,
            isCustomElement: d = a,
            expressionPlugins: h = [],
            scopeId: p = null,
            slotted: f = !0,
            ssr: m = !1,
            inSSR: v = !1,
            ssrCssVars: g = "",
            bindingMetadata: b = i,
            inline: y = !1,
            isTS: w = !1,
            onError: k = il,
            onWarn: x = sl,
            compatConfig: E
        }) {
            const _ = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), C = {
                selfName: _ && H(I(_[1])),
                prefixIdentifiers: n,
                hoistStatic: r,
                cacheHandlers: o,
                nodeTransforms: s,
                directiveTransforms: l,
                transformHoist: c,
                isBuiltInComponent: u,
                isCustomElement: d,
                expressionPlugins: h,
                scopeId: p,
                slotted: f,
                ssr: m,
                inSSR: v,
                ssrCssVars: g,
                bindingMetadata: b,
                inline: y,
                isTS: w,
                onError: k,
                onWarn: x,
                compatConfig: E,
                root: e,
                helpers: new Map,
                components: new Set,
                directives: new Set,
                hoists: [],
                imports: [],
                constantCache: new Map,
                temps: 0,
                cached: 0,
                identifiers: Object.create(null),
                scopes: {vFor: 0, vSlot: 0, vPre: 0, vOnce: 0},
                parent: null,
                currentNode: e,
                childIndex: 0,
                inVOnce: !1,
                helper(e) {
                    const t = C.helpers.get(e) || 0;
                    return C.helpers.set(e, t + 1), e
                },
                removeHelper(e) {
                    const t = C.helpers.get(e);
                    if (t) {
                        const n = t - 1;
                        n ? C.helpers.set(e, n) : C.helpers.delete(e)
                    }
                },
                helperString: e => `_${Ul[C.helper(e)]}`,
                replaceNode(e) {
                    C.parent.children[C.childIndex] = C.currentNode = e
                },
                removeNode(e) {
                    const t = C.parent.children, n = e ? t.indexOf(e) : C.currentNode ? C.childIndex : -1;
                    e && e !== C.currentNode ? C.childIndex > n && (C.childIndex--, C.onNodeRemoved()) : (C.currentNode = null, C.onNodeRemoved()), C.parent.children.splice(n, 1)
                },
                onNodeRemoved: () => {
                },
                addIdentifiers(e) {
                },
                removeIdentifiers(e) {
                },
                hoist(e) {
                    S(e) && (e = Ql(e)), C.hoists.push(e);
                    const t = Ql(`_hoisted_${C.hoists.length}`, !1, e.loc, 2);
                    return t.hoisted = e, t
                },
                cache: (e, t = !1) => function (e, t, n = !1) {
                    return {type: 20, index: e, value: t, isVNode: n, loc: Kl}
                }(C.cached++, e, t)
            };
            return C.filters = new Set, C
        }(e, t);
        gu(e, n), t.hoistStatic && au(e, n), t.ssr || function (e, t) {
            const {helper: n} = t, {children: r} = e;
            if (1 === r.length) {
                const n = r[0];
                if (lu(e, n) && n.codegenNode) {
                    const r = n.codegenNode;
                    13 === r.type && sc(r, t), e.codegenNode = r
                } else e.codegenNode = n
            } else if (r.length > 1) {
                let r = 64;
                Z[64], e.codegenNode = Yl(t, n(ll), void 0, e.children, r + "", void 0, void 0, !0, void 0, !1)
            }
        }(e, n), e.helpers = new Set([...n.helpers.keys()]), e.components = [...n.components], e.directives = [...n.directives], e.imports = n.imports, e.hoists = n.hoists, e.temps = n.temps, e.cached = n.cached, e.filters = [...n.filters]
    }

    function gu(e, t) {
        t.currentNode = e;
        const {nodeTransforms: n} = t, r = [];
        for (let o = 0; o < n.length; o++) {
            const i = n[o](e, t);
            if (i && (v(i) ? r.push(...i) : r.push(i)), !t.currentNode) return;
            e = t.currentNode
        }
        switch (e.type) {
            case 3:
                t.ssr || t.helper(bl);
                break;
            case 5:
                t.ssr || t.helper(Al);
                break;
            case 9:
                for (let n = 0; n < e.branches.length; n++) gu(e.branches[n], t);
                break;
            case 10:
            case 11:
            case 1:
            case 0:
                !function (e, t) {
                    let n = 0;
                    const r = () => {
                        n--
                    };
                    for (; n < e.children.length; n++) {
                        const o = e.children[n];
                        S(o) || (t.parent = e, t.childIndex = n, t.onNodeRemoved = r, gu(o, t))
                    }
                }(e, t)
        }
        t.currentNode = e;
        let o = r.length;
        for (; o--;) r[o]()
    }

    function bu(e, t) {
        const n = S(e) ? t => t === e : t => e.test(t);
        return (e, r) => {
            if (1 === e.type) {
                const {props: o} = e;
                if (3 === e.tagType && o.some(xc)) return;
                const i = [];
                for (let s = 0; s < o.length; s++) {
                    const a = o[s];
                    if (7 === a.type && n(a.name)) {
                        o.splice(s, 1), s--;
                        const n = t(e, a, r);
                        n && i.push(n)
                    }
                }
                return i
            }
        }
    }

    const yu = "/*#__PURE__*/", wu = e => `${Ul[e]}: _${Ul[e]}`;

    function Su(e, t = {}) {
        const n = function (e, {
            mode: t = "function",
            prefixIdentifiers: n = "module" === t,
            sourceMap: r = !1,
            filename: o = "template.vue.html",
            scopeId: i = null,
            optimizeImports: s = !1,
            runtimeGlobalName: a = "Vue",
            runtimeModuleName: l = "vue",
            ssrRuntimeModuleName: c = "vue/server-renderer",
            ssr: u = !1,
            isTS: d = !1,
            inSSR: h = !1
        }) {
            const p = {
                mode: t,
                prefixIdentifiers: n,
                sourceMap: r,
                filename: o,
                scopeId: i,
                optimizeImports: s,
                runtimeGlobalName: a,
                runtimeModuleName: l,
                ssrRuntimeModuleName: c,
                ssr: u,
                isTS: d,
                inSSR: h,
                source: e.loc.source,
                code: "",
                column: 1,
                line: 1,
                offset: 0,
                indentLevel: 0,
                pure: !1,
                map: void 0,
                helper: e => `_${Ul[e]}`,
                push(e, t) {
                    p.code += e
                },
                indent() {
                    f(++p.indentLevel)
                },
                deindent(e = !1) {
                    e ? --p.indentLevel : f(--p.indentLevel)
                },
                newline() {
                    f(p.indentLevel)
                }
            };

            function f(e) {
                p.push("\n" + "  ".repeat(e))
            }

            return p
        }(e, t);
        t.onContextCreated && t.onContextCreated(n);
        const {mode: r, push: o, prefixIdentifiers: i, indent: s, deindent: a, newline: l, scopeId: c, ssr: u} = n, d = Array.from(e.helpers), h = d.length > 0,
            p = !i && "module" !== r;
        if (function (e, t) {
            const {ssr: n, prefixIdentifiers: r, push: o, newline: i, runtimeModuleName: s, runtimeGlobalName: a, ssrRuntimeModuleName: l} = t, c = a, u = Array.from(e.helpers);
            u.length > 0 && (o(`const _Vue = ${c}\n`), e.hoists.length) && o(`const { ${[vl, gl, bl, yl, wl].filter((e => u.includes(e))).map(wu).join(", ")} } = _Vue\n`), function (e, t) {
                if (!e.length) return;
                t.pure = !0;
                const {push: n, newline: r, helper: o, scopeId: i, mode: s} = t;
                r();
                for (let o = 0; o < e.length; o++) {
                    const i = e[o];
                    i && (n(`const _hoisted_${o + 1} = `), _u(i, t), r())
                }
                t.pure = !1
            }(e.hoists, t), i(), o("return ")
        }(e, n), o(`function ${u ? "ssrRender" : "render"}(${(u ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ")}) {`), s(), p && (o("with (_ctx) {"), s(), h && (o(`const { ${d.map(wu).join(", ")} } = _Vue`), o("\n"), l())), e.components.length && (ku(e.components, "component", n), (e.directives.length || e.temps > 0) && l()), e.directives.length && (ku(e.directives, "directive", n), e.temps > 0 && l()), e.filters && e.filters.length && (l(), ku(e.filters, "filter", n), l()), e.temps > 0) {
            o("let ");
            for (let t = 0; t < e.temps; t++) o(`${t > 0 ? ", " : ""}_temp${t}`)
        }
        return (e.components.length || e.directives.length || e.temps) && (o("\n"), l()), u || o("return "), e.codegenNode ? _u(e.codegenNode, n) : o("null"), p && (a(), o("}")), a(), o("}"), {
            ast: e,
            code: n.code,
            preamble: "",
            map: n.map ? n.map.toJSON() : void 0
        }
    }

    function ku(e, t, {helper: n, push: r, newline: o, isTS: i}) {
        const s = n("filter" === t ? El : "component" === t ? Sl : xl);
        for (let n = 0; n < e.length; n++) {
            let a = e[n];
            const l = a.endsWith("__self");
            l && (a = a.slice(0, -6)), r(`const ${Rc(a, t)} = ${s}(${JSON.stringify(a)}${l ? ", true" : ""})${i ? "!" : ""}`), n < e.length - 1 && o()
        }
    }

    function xu(e, t) {
        const n = e.length > 3 || !1;
        t.push("["), n && t.indent(), Eu(e, t, n), n && t.deindent(), t.push("]")
    }

    function Eu(e, t, n = !1, r = !0) {
        const {push: o, newline: i} = t;
        for (let s = 0; s < e.length; s++) {
            const a = e[s];
            S(a) ? o(a) : v(a) ? xu(a, t) : _u(a, t), s < e.length - 1 && (n ? (r && o(","), i()) : r && o(", "))
        }
    }

    function _u(e, t) {
        if (S(e)) t.push(e); else if (k(e)) t.push(t.helper(e)); else switch (e.type) {
            case 1:
            case 9:
            case 11:
            case 12:
                _u(e.codegenNode, t);
                break;
            case 2:
                !function (e, t) {
                    t.push(JSON.stringify(e.content), e)
                }(e, t);
                break;
            case 4:
                Cu(e, t);
                break;
            case 5:
                !function (e, t) {
                    const {push: n, helper: r, pure: o} = t;
                    o && n(yu), n(`${r(Al)}(`), _u(e.content, t), n(")")
                }(e, t);
                break;
            case 8:
                Tu(e, t);
                break;
            case 3:
                !function (e, t) {
                    const {push: n, helper: r, pure: o} = t;
                    o && n(yu), n(`${r(bl)}(${JSON.stringify(e.content)})`, e)
                }(e, t);
                break;
            case 13:
                !function (e, t) {
                    const {push: n, helper: r, pure: o} = t, {
                        tag: i,
                        props: s,
                        children: a,
                        patchFlag: l,
                        dynamicProps: c,
                        directives: u,
                        isBlock: d,
                        disableTracking: h,
                        isComponent: p
                    } = e;
                    u && n(r(_l) + "("), d && n(`(${r(pl)}(${h ? "true" : ""}), `), o && n(yu);
                    n(r(d ? ic(t.inSSR, p) : oc(t.inSSR, p)) + "(", e), Eu(function (e) {
                        let t = e.length;
                        for (; t-- && null == e[t];) ;
                        return e.slice(0, t + 1).map((e => e || "null"))
                    }([i, s, a, l, c]), t), n(")"), d && n(")"), u && (n(", "), _u(u, t), n(")"))
                }(e, t);
                break;
            case 14:
                !function (e, t) {
                    const {push: n, helper: r, pure: o} = t, i = S(e.callee) ? e.callee : r(e.callee);
                    o && n(yu), n(i + "(", e), Eu(e.arguments, t), n(")")
                }(e, t);
                break;
            case 15:
                !function (e, t) {
                    const {push: n, indent: r, deindent: o, newline: i} = t, {properties: s} = e;
                    if (!s.length) return void n("{}", e);
                    const a = s.length > 1 || !1;
                    n(a ? "{" : "{ "), a && r();
                    for (let e = 0; e < s.length; e++) {
                        const {key: r, value: o} = s[e];
                        Lu(r, t), n(": "), _u(o, t), e < s.length - 1 && (n(","), i())
                    }
                    a && o(), n(a ? "}" : " }")
                }(e, t);
                break;
            case 17:
                !function (e, t) {
                    xu(e.elements, t)
                }(e, t);
                break;
            case 18:
                !function (e, t) {
                    const {push: n, indent: r, deindent: o} = t, {params: i, returns: s, body: a, newline: l, isSlot: c} = e;
                    c && n(`_${Ul[jl]}(`), n("(", e), v(i) ? Eu(i, t) : i && _u(i, t), n(") => "), (l || a) && (n("{"), r()), s ? (l && n("return "), v(s) ? xu(s, t) : _u(s, t)) : a && _u(a, t), (l || a) && (o(), n("}")), c && (e.isNonScopedSlot && n(", undefined, true"), n(")"))
                }(e, t);
                break;
            case 19:
                !function (e, t) {
                    const {test: n, consequent: r, alternate: o, newline: i} = e, {push: s, indent: a, deindent: l, newline: c} = t;
                    if (4 === n.type) {
                        const e = !dc(n.content);
                        e && s("("), Cu(n, t), e && s(")")
                    } else s("("), _u(n, t), s(")");
                    i && a(), t.indentLevel++, i || s(" "), s("? "), _u(r, t), t.indentLevel--, i && c(), i || s(" "), s(": ");
                    const u = 19 === o.type;
                    u || t.indentLevel++, _u(o, t), u || t.indentLevel--, i && l(!0)
                }(e, t);
                break;
            case 20:
                !function (e, t) {
                    const {push: n, helper: r, indent: o, deindent: i, newline: s} = t;
                    n(`_cache[${e.index}] || (`), e.isVNode && (o(), n(`${r(Wl)}(-1),`), s()), n(`_cache[${e.index}] = `), _u(e.value, t), e.isVNode && (n(","), s(), n(`${r(Wl)}(1),`), s(), n(`_cache[${e.index}]`), i()), n(")")
                }(e, t);
                break;
            case 21:
                Eu(e.body, t, !0, !1)
        }
    }

    function Cu(e, t) {
        const {content: n, isStatic: r} = e;
        t.push(r ? JSON.stringify(n) : n, e)
    }

    function Tu(e, t) {
        for (let n = 0; n < e.children.length; n++) {
            const r = e.children[n];
            S(r) ? t.push(r) : _u(r, t)
        }
    }

    function Lu(e, t) {
        const {push: n} = t;
        8 === e.type ? (n("["), Tu(e, t), n("]")) : e.isStatic ? n(dc(e.content) ? e.content : JSON.stringify(e.content), e) : n(`[${e.content}]`, e)
    }

    new RegExp("\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b");
    const Au = bu(/^(if|else|else-if)$/, ((e, t, n) => function (e, t, n, r) {
        if (!("else" === t.name || t.exp && t.exp.content.trim())) {
            const r = t.exp ? t.exp.loc : e.loc;
            n.onError(al(28, t.loc)), t.exp = Ql("true", !1, r)
        }
        if ("if" === t.name) {
            const o = Ru(e, t), i = {type: 9, loc: e.loc, branches: [o]};
            if (n.replaceNode(i), r) return r(i, o, !0)
        } else {
            const o = n.parent.children;
            let i = o.indexOf(e);
            for (; i-- >= -1;) {
                const s = o[i];
                if (s && 3 === s.type) n.removeNode(s); else {
                    if (!s || 2 !== s.type || s.content.trim().length) {
                        if (s && 9 === s.type) {
                            "else-if" === t.name && void 0 === s.branches[s.branches.length - 1].condition && n.onError(al(30, e.loc)), n.removeNode();
                            const o = Ru(e, t);
                            s.branches.push(o);
                            const i = r && r(s, o, !1);
                            gu(o, n), i && i(), n.currentNode = null
                        } else n.onError(al(30, e.loc));
                        break
                    }
                    n.removeNode(s)
                }
            }
        }
    }(e, t, n, ((e, t, r) => {
        const o = n.parent.children;
        let i = o.indexOf(e), s = 0;
        for (; i-- >= 0;) {
            const e = o[i];
            e && 9 === e.type && (s += e.branches.length)
        }
        return () => {
            if (r) e.codegenNode = Du(t, s, n); else {
                const r = function (e) {
                    for (; ;) if (19 === e.type) {
                        if (19 !== e.alternate.type) return e;
                        e = e.alternate
                    } else 20 === e.type && (e = e.value)
                }(e.codegenNode);
                r.alternate = Du(t, s + e.branches.length - 1, n)
            }
        }
    }))));

    function Ru(e, t) {
        const n = 3 === e.tagType;
        return {type: 10, loc: e.loc, condition: "else" === t.name ? void 0 : t.exp, children: n && !yc(e, "for") ? e.children : [e], userKey: wc(e, "key"), isTemplateIf: n}
    }

    function Du(e, t, n) {
        return e.condition ? rc(e.condition, Ou(e, t, n), tc(n.helper(bl), ['""', "true"])) : Ou(e, t, n)
    }

    function Ou(e, t, n) {
        const {helper: r} = n, o = Jl("key", Ql(`${t}`, !1, Kl, 2)), {children: i} = e, s = i[0];
        if (1 !== i.length || 1 !== s.type) {
            if (1 === i.length && 11 === s.type) {
                const e = s.codegenNode;
                return Lc(e, o, n), e
            }
            {
                let t = 64;
                return Z[64], Yl(n, r(ll), Xl([o]), i, t + "", void 0, void 0, !0, !1, !1, e.loc)
            }
        }
        {
            const e = s.codegenNode, t = 14 === (a = e).type && a.callee === $l ? a.arguments[1].returns : a;
            return 13 === t.type && sc(t, n), Lc(t, o, n), e
        }
        var a
    }

    const Mu = bu("for", ((e, t, n) => {
        const {helper: r, removeHelper: o} = n;
        return function (e, t, n, r) {
            if (!t.exp) return void n.onError(al(31, t.loc));
            const o = Hu(t.exp);
            if (!o) return void n.onError(al(32, t.loc));
            const {addIdentifiers: i, removeIdentifiers: s, scopes: a} = n, {source: l, value: c, key: u, index: d} = o,
                h = {type: 11, loc: t.loc, source: l, valueAlias: c, keyAlias: u, objectIndexAlias: d, parseResult: o, children: Ec(e) ? e.children : [e]};
            n.replaceNode(h), a.vFor++;
            const p = r && r(h);
            return () => {
                a.vFor--, p && p()
            }
        }(e, t, n, (t => {
            const i = tc(r(Cl), [t.source]), s = Ec(e), a = yc(e, "memo"), l = wc(e, "key"), c = l && (6 === l.type ? Ql(l.value.content, !0) : l.exp), u = l ? Jl("key", c) : null,
                d = 4 === t.source.type && t.source.constType > 0, h = d ? 64 : l ? 128 : 256;
            return t.codegenNode = Yl(n, r(ll), void 0, i, h + "", void 0, void 0, !0, !d, !1, e.loc), () => {
                let l;
                const {children: h} = t, p = 1 !== h.length || 1 !== h[0].type, f = _c(e) ? e : s && 1 === e.children.length && _c(e.children[0]) ? e.children[0] : null;
                if (f ? (l = f.codegenNode, s && u && Lc(l, u, n)) : p ? l = Yl(n, r(ll), u ? Xl([u]) : void 0, e.children, "64", void 0, void 0, !0, void 0, !1) : (l = h[0].codegenNode, s && u && Lc(l, u, n), l.isBlock !== !d && (l.isBlock ? (o(pl), o(ic(n.inSSR, l.isComponent))) : o(oc(n.inSSR, l.isComponent))), l.isBlock = !d, l.isBlock ? (r(pl), r(ic(n.inSSR, l.isComponent))) : r(oc(n.inSSR, l.isComponent))), a) {
                    const e = nc(Wu(t.parseResult, [Ql("_cached")]));
                    e.body = {
                        type: 21,
                        body: [ec(["const _memo = (", a.exp, ")"]), ec(["if (_cached", ...c ? [" && _cached.key === ", c] : [], ` && ${n.helperString(Zl)}(_cached, _memo)) return _cached`]), ec(["const _item = ", l]), Ql("_item.memo = _memo"), Ql("return _item")],
                        loc: Kl
                    }, i.arguments.push(e, Ql("_cache"), Ql(String(n.cached++)))
                } else i.arguments.push(nc(Wu(t.parseResult), l, !0))
            }
        }))
    })), Iu = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Fu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Pu = /^\(|\)$/g;

    function Hu(e, t) {
        const n = e.loc, r = e.content, o = r.match(Iu);
        if (!o) return;
        const [, i, s] = o, a = {source: Nu(n, s.trim(), r.indexOf(s, i.length)), value: void 0, key: void 0, index: void 0};
        let l = i.trim().replace(Pu, "").trim();
        const c = i.indexOf(l), u = l.match(Fu);
        if (u) {
            l = l.replace(Fu, "").trim();
            const e = u[1].trim();
            let t;
            if (e && (t = r.indexOf(e, c + l.length), a.key = Nu(n, e, t)), u[2]) {
                const o = u[2].trim();
                o && (a.index = Nu(n, o, r.indexOf(o, a.key ? t + e.length : c + l.length)))
            }
        }
        return l && (a.value = Nu(n, l, c)), a
    }

    function Nu(e, t, n) {
        return Ql(t, !1, vc(e, n, t.length))
    }

    function Wu({value: e, key: t, index: n}, r = []) {
        return function (e) {
            let t = e.length;
            for (; t-- && !e[t];) ;
            return e.slice(0, t + 1).map(((e, t) => e || Ql("_".repeat(t + 1), !1)))
        }([e, t, n, ...r])
    }

    const Bu = Ql("undefined", !1), Vu = (e, t) => {
        if (1 === e.type && (1 === e.tagType || 3 === e.tagType)) {
            const n = yc(e, "slot");
            if (n) return n.exp, t.scopes.vSlot++, () => {
                t.scopes.vSlot--
            }
        }
    }, ju = (e, t, n) => nc(e, t, !1, !0, t.length ? t[0].loc : n);

    function zu(e, t, n = ju) {
        t.helper(jl);
        const {children: r, loc: o} = e, i = [], s = [];
        let a = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
        const l = yc(e, "slot", !0);
        if (l) {
            const {arg: e, exp: t} = l;
            e && !ac(e) && (a = !0), i.push(Jl(e || Ql("default", !0), n(t, r, o)))
        }
        let c = !1, u = !1;
        const d = [], h = new Set;
        let p = 0;
        for (let e = 0; e < r.length; e++) {
            const o = r[e];
            let f;
            if (!Ec(o) || !(f = yc(o, "slot", !0))) {
                3 !== o.type && d.push(o);
                continue
            }
            if (l) {
                t.onError(al(37, f.loc));
                break
            }
            c = !0;
            const {children: m, loc: v} = o, {arg: g = Ql("default", !0), exp: b, loc: y} = f;
            let w;
            ac(g) ? w = g ? g.content : "default" : a = !0;
            const S = n(b, m, v);
            let k, x, E;
            if (k = yc(o, "if")) a = !0, s.push(rc(k.exp, qu(g, S, p++), Bu)); else if (x = yc(o, /^else(-if)?$/, !0)) {
                let n, o = e;
                for (; o-- && (n = r[o], 3 === n.type);) ;
                if (n && Ec(n) && yc(n, "if")) {
                    r.splice(e, 1), e--;
                    let t = s[s.length - 1];
                    for (; 19 === t.alternate.type;) t = t.alternate;
                    t.alternate = x.exp ? rc(x.exp, qu(g, S, p++), Bu) : qu(g, S, p++)
                } else t.onError(al(30, x.loc))
            } else if (E = yc(o, "for")) {
                a = !0;
                const e = E.parseResult || Hu(E.exp);
                e ? s.push(tc(t.helper(Cl), [e.source, nc(Wu(e), qu(g, S), !0)])) : t.onError(al(32, E.loc))
            } else {
                if (w) {
                    if (h.has(w)) {
                        t.onError(al(38, y));
                        continue
                    }
                    h.add(w), "default" === w && (u = !0)
                }
                i.push(Jl(g, S))
            }
        }
        if (!l) {
            const e = (e, r) => {
                const i = n(e, r, o);
                return t.compatConfig && (i.isNonScopedSlot = !0), Jl("default", i)
            };
            c ? d.length && d.some((e => Zu(e))) && (u ? t.onError(al(39, d[0].loc)) : i.push(e(void 0, d))) : i.push(e(void 0, r))
        }
        const f = a ? 2 : $u(e.children) ? 3 : 1;
        let m = Xl(i.concat(Jl("_", Ql(f + "", !1))), o);
        return s.length && (m = tc(t.helper(Ll), [m, Gl(s)])), {slots: m, hasDynamicSlots: a}
    }

    function qu(e, t, n) {
        const r = [Jl("name", e), Jl("fn", t)];
        return null != n && r.push(Jl("key", Ql(String(n), !0))), Xl(r)
    }

    function $u(e) {
        for (let t = 0; t < e.length; t++) {
            const n = e[t];
            switch (n.type) {
                case 1:
                    if (2 === n.tagType || $u(n.children)) return !0;
                    break;
                case 9:
                    if ($u(n.branches)) return !0;
                    break;
                case 10:
                case 11:
                    if ($u(n.children)) return !0
            }
        }
        return !1
    }

    function Zu(e) {
        return 2 !== e.type && 12 !== e.type || (2 === e.type ? !!e.content.trim() : Zu(e.content))
    }

    const Uu = new WeakMap, Ku = (e, t) => function () {
        if (1 !== (e = t.currentNode).type || 0 !== e.tagType && 1 !== e.tagType) return;
        const {tag: n, props: r} = e, o = 1 === e.tagType;
        let i = o ? function (e, t, n = !1) {
            let {tag: r} = e;
            const o = Ju(r), i = wc(e, "is");
            if (i) if (o || Oc("COMPILER_IS_ON_ELEMENT", t)) {
                const e = 6 === i.type ? i.value && Ql(i.value.content, !0) : i.exp;
                if (e) return tc(t.helper(kl), [e])
            } else 6 === i.type && i.value.content.startsWith("vue:") && (r = i.value.content.slice(4));
            const s = !o && yc(e, "is");
            if (s && s.exp) return tc(t.helper(kl), [s.exp]);
            const a = cc(r) || t.isBuiltInComponent(r);
            return a ? (n || t.helper(a), a) : (t.helper(Sl), t.components.add(r), Rc(r, "component"))
        }(e, t) : `"${n}"`;
        const s = x(i) && i.callee === kl;
        let a, l, c, u, d, h, p = 0, f = s || i === cl || i === ul || !o && ("svg" === n || "foreignObject" === n);
        if (r.length > 0) {
            const n = Yu(e, t, void 0, o, s);
            a = n.props, p = n.patchFlag, d = n.dynamicPropNames;
            const r = n.directives;
            h = r && r.length ? Gl(r.map((e => function (e, t) {
                const n = [], r = Uu.get(e);
                r ? n.push(t.helperString(r)) : (t.helper(xl), t.directives.add(e.name), n.push(Rc(e.name, "directive")));
                const {loc: o} = e;
                if (e.exp && n.push(e.exp), e.arg && (e.exp || n.push("void 0"), n.push(e.arg)), Object.keys(e.modifiers).length) {
                    e.arg || (e.exp || n.push("void 0"), n.push("void 0"));
                    const t = Ql("true", !1, o);
                    n.push(Xl(e.modifiers.map((e => Jl(e, t))), o))
                }
                return Gl(n, e.loc)
            }(e, t)))) : void 0, n.shouldUseBlock && (f = !0)
        }
        if (e.children.length > 0) if (i === dl && (f = !0, p |= 1024), o && i !== cl && i !== dl) {
            const {slots: n, hasDynamicSlots: r} = zu(e, t);
            l = n, r && (p |= 1024)
        } else if (1 === e.children.length && i !== cl) {
            const n = e.children[0], r = n.type, o = 5 === r || 8 === r;
            o && 0 === uu(n, t) && (p |= 1), l = o || 2 === r ? n : e.children
        } else l = e.children;
        0 !== p && (c = String(p), d && d.length && (u = function (e) {
            let t = "[";
            for (let n = 0, r = e.length; n < r; n++) t += JSON.stringify(e[n]), n < r - 1 && (t += ", ");
            return t + "]"
        }(d))), e.codegenNode = Yl(t, i, a, l, c, u, h, !!f, !1, o, e.loc)
    };

    function Yu(e, t, n = e.props, r, o, i = !1) {
        const {tag: s, loc: a, children: l} = e;
        let c = [];
        const d = [], h = [], p = l.length > 0;
        let f = !1, m = 0, v = !1, g = !1, b = !1, y = !1, w = !1, S = !1;
        const x = [], E = e => {
            c.length && (d.push(Xl(Gu(c), a)), c = []), e && d.push(e)
        }, _ = ({key: e, value: n}) => {
            if (ac(e)) {
                const i = e.content, s = u(i);
                if (!s || r && !o || "onclick" === i.toLowerCase() || "onUpdate:modelValue" === i || R(i) || (y = !0), s && R(i) && (S = !0), 20 === n.type || (4 === n.type || 8 === n.type) && uu(n, t) > 0) return;
                "ref" === i ? v = !0 : "class" === i ? g = !0 : "style" === i ? b = !0 : "key" === i || x.includes(i) || x.push(i), !r || "class" !== i && "style" !== i || x.includes(i) || x.push(i)
            } else w = !0
        };
        for (let o = 0; o < n.length; o++) {
            const l = n[o];
            if (6 === l.type) {
                const {loc: e, name: n, value: r} = l;
                let o = !0;
                if ("ref" === n && (v = !0, t.scopes.vFor > 0 && c.push(Jl(Ql("ref_for", !0), Ql("true")))), "is" === n && (Ju(s) || r && r.content.startsWith("vue:") || Oc("COMPILER_IS_ON_ELEMENT", t))) continue;
                c.push(Jl(Ql(n, !0, vc(e, 0, n.length)), Ql(r ? r.content : "", o, r ? r.loc : e)))
            } else {
                const {name: n, arg: o, exp: u, loc: m} = l, v = "bind" === n, g = "on" === n;
                if ("slot" === n) {
                    r || t.onError(al(40, m));
                    continue
                }
                if ("once" === n || "memo" === n) continue;
                if ("is" === n || v && Sc(o, "is") && (Ju(s) || Oc("COMPILER_IS_ON_ELEMENT", t))) continue;
                if (g && i) continue;
                if ((v && Sc(o, "key") || g && p && Sc(o, "vue:before-update")) && (f = !0), v && Sc(o, "ref") && t.scopes.vFor > 0 && c.push(Jl(Ql("ref_for", !0), Ql("true"))), !o && (v || g)) {
                    if (w = !0, u) if (v) {
                        if (E(), Oc("COMPILER_V_BIND_OBJECT_ORDER", t)) {
                            d.unshift(u);
                            continue
                        }
                        d.push(u)
                    } else E({type: 14, loc: m, callee: t.helper(Fl), arguments: r ? [u] : [u, "true"]}); else t.onError(al(v ? 34 : 35, m));
                    continue
                }
                const b = t.directiveTransforms[n];
                if (b) {
                    const {props: n, needRuntime: r} = b(l, e, t);
                    !i && n.forEach(_), g && o && !ac(o) ? E(Xl(n, a)) : c.push(...n), r && (h.push(l), k(r) && Uu.set(l, r))
                } else D(n) || (h.push(l), p && (f = !0))
            }
        }
        let C;
        if (d.length ? (E(), C = d.length > 1 ? tc(t.helper(Rl), d, a) : d[0]) : c.length && (C = Xl(Gu(c), a)), w ? m |= 16 : (g && !r && (m |= 2), b && !r && (m |= 4), x.length && (m |= 8), y && (m |= 32)), f || 0 !== m && 32 !== m || !(v || S || h.length > 0) || (m |= 512), !t.inSSR && C) switch (C.type) {
            case 15:
                let e = -1, n = -1, r = !1;
                for (let t = 0; t < C.properties.length; t++) {
                    const o = C.properties[t].key;
                    ac(o) ? "class" === o.content ? e = t : "style" === o.content && (n = t) : o.isHandlerKey || (r = !0)
                }
                const o = C.properties[e], i = C.properties[n];
                r ? C = tc(t.helper(Ml), [C]) : (o && !ac(o.value) && (o.value = tc(t.helper(Dl), [o.value])), i && (b || 4 === i.value.type && "[" === i.value.content.trim()[0] || 17 === i.value.type) && (i.value = tc(t.helper(Ol), [i.value])));
                break;
            case 14:
                break;
            default:
                C = tc(t.helper(Ml), [tc(t.helper(Il), [C])])
        }
        return {props: C, directives: h, patchFlag: m, dynamicPropNames: x, shouldUseBlock: f}
    }

    function Gu(e) {
        const t = new Map, n = [];
        for (let r = 0; r < e.length; r++) {
            const o = e[r];
            if (8 === o.key.type || !o.key.isStatic) {
                n.push(o);
                continue
            }
            const i = o.key.content, s = t.get(i);
            s ? ("style" === i || "class" === i || u(i)) && Xu(s, o) : (t.set(i, o), n.push(o))
        }
        return n
    }

    function Xu(e, t) {
        17 === e.value.type ? e.value.elements.push(t.value) : e.value = Gl([e.value, t.value], e.loc)
    }

    function Ju(e) {
        return "component" === e || "Component" === e
    }

    const Qu = (e, t) => {
        if (_c(e)) {
            const {children: n, loc: r} = e, {slotName: o, slotProps: i} = function (e, t) {
                let n, r = '"default"';
                const o = [];
                for (let t = 0; t < e.props.length; t++) {
                    const n = e.props[t];
                    6 === n.type ? n.value && ("name" === n.name ? r = JSON.stringify(n.value.content) : (n.name = I(n.name), o.push(n))) : "bind" === n.name && Sc(n.arg, "name") ? n.exp && (r = n.exp) : ("bind" === n.name && n.arg && ac(n.arg) && (n.arg.content = I(n.arg.content)), o.push(n))
                }
                if (o.length > 0) {
                    const {props: r, directives: i} = Yu(e, t, o, !1, !1);
                    n = r, i.length && t.onError(al(36, i[0].loc))
                }
                return {slotName: r, slotProps: n}
            }(e, t), s = [t.prefixIdentifiers ? "_ctx.$slots" : "$slots", o, "{}", "undefined", "true"];
            let a = 2;
            i && (s[2] = i, a = 3), n.length && (s[3] = nc([], n, !1, !1, r), a = 4), t.scopeId && !t.slotted && (a = 5), s.splice(a), e.codegenNode = tc(t.helper(Tl), s, r)
        }
    }, ed = /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/, td = (e, t, n, r) => {
        const {loc: o, modifiers: i, arg: s} = e;
        let a;
        if (e.exp || i.length || n.onError(al(35, o)), 4 === s.type) if (s.isStatic) {
            let e = s.content;
            e.startsWith("vue:") && (e = `vnode-${e.slice(4)}`), a = Ql(0 !== t.tagType || e.startsWith("vnode") || !/[A-Z]/.test(e) ? N(I(e)) : `on:${e}`, !0, s.loc)
        } else a = ec([`${n.helperString(Nl)}(`, s, ")"]); else a = s, a.children.unshift(`${n.helperString(Nl)}(`), a.children.push(")");
        let l = e.exp;
        l && !l.content.trim() && (l = void 0);
        let c = n.cacheHandlers && !l && !n.inVOnce;
        if (l) {
            const e = mc(l.content), t = !(e || ed.test(l.content)), n = l.content.includes(";");
            (t || c && e) && (l = ec([`${t ? "$event" : "(...args)"} => ${n ? "{" : "("}`, l, n ? "}" : ")"]))
        }
        let u = {props: [Jl(a, l || Ql("() => {}", !1, o))]};
        return r && (u = r(u)), c && (u.props[0].value = n.cache(u.props[0].value)), u.props.forEach((e => e.key.isHandlerKey = !0)), u
    }, nd = (e, t, n) => {
        const {exp: r, modifiers: o, loc: i} = e, s = e.arg;
        return 4 !== s.type ? (s.children.unshift("("), s.children.push(') || ""')) : s.isStatic || (s.content = `${s.content} || ""`), o.includes("camel") && (4 === s.type ? s.isStatic ? s.content = I(s.content) : s.content = `${n.helperString(Pl)}(${s.content})` : (s.children.unshift(`${n.helperString(Pl)}(`), s.children.push(")"))), n.inSSR || (o.includes("prop") && rd(s, "."), o.includes("attr") && rd(s, "^")), !r || 4 === r.type && !r.content.trim() ? (n.onError(al(34, i)), {props: [Jl(s, Ql("", !0, i))]}) : {props: [Jl(s, r)]}
    }, rd = (e, t) => {
        4 === e.type ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"))
    }, od = (e, t) => {
        if (0 === e.type || 1 === e.type || 11 === e.type || 10 === e.type) return () => {
            const n = e.children;
            let r, o = !1;
            for (let e = 0; e < n.length; e++) {
                const t = n[e];
                if (kc(t)) {
                    o = !0;
                    for (let o = e + 1; o < n.length; o++) {
                        const i = n[o];
                        if (!kc(i)) {
                            r = void 0;
                            break
                        }
                        r || (r = n[e] = ec([t], t.loc)), r.children.push(" + ", i), n.splice(o, 1), o--
                    }
                }
            }
            if (o && (1 !== n.length || 0 !== e.type && (1 !== e.type || 0 !== e.tagType || e.props.find((e => 7 === e.type && !t.directiveTransforms[e.name])) || "template" === e.tag))) for (let e = 0; e < n.length; e++) {
                const r = n[e];
                if (kc(r) || 8 === r.type) {
                    const o = [];
                    2 === r.type && " " === r.content || o.push(r), t.ssr || 0 !== uu(r, t) || o.push("1"), n[e] = {
                        type: 12,
                        content: r,
                        loc: r.loc,
                        codegenNode: tc(t.helper(yl), o)
                    }
                }
            }
        }
    }, id = new WeakSet, sd = (e, t) => {
        if (1 === e.type && yc(e, "once", !0)) {
            if (id.has(e) || t.inVOnce || t.inSSR) return;
            return id.add(e), t.inVOnce = !0, t.helper(Wl), () => {
                t.inVOnce = !1;
                const e = t.currentNode;
                e.codegenNode && (e.codegenNode = t.cache(e.codegenNode, !0))
            }
        }
    }, ad = (e, t, n) => {
        const {exp: r, arg: o} = e;
        if (!r) return n.onError(al(41, e.loc)), ld();
        const i = r.loc.source, s = 4 === r.type ? r.content : i, a = n.bindingMetadata[i];
        if ("props" === a || "props-aliased" === a) return n.onError(al(44, r.loc)), ld();
        if (!s.trim() || !mc(s)) return n.onError(al(42, r.loc)), ld();
        const l = o || Ql("modelValue", !0), c = o ? ac(o) ? `onUpdate:${I(o.content)}` : ec(['"onUpdate:" + ', o]) : "onUpdate:modelValue";
        let u;
        u = ec([(n.isTS ? "($event: any)" : "$event") + " => ((", r, ") = $event)"]);
        const d = [Jl(l, e.exp), Jl(c, u)];
        if (e.modifiers.length && 1 === t.tagType) {
            const t = e.modifiers.map((e => (dc(e) ? e : JSON.stringify(e)) + ": true")).join(", "),
                n = o ? ac(o) ? `${o.content}Modifiers` : ec([o, ' + "Modifiers"']) : "modelModifiers";
            d.push(Jl(n, Ql(`{ ${t} }`, !1, e.loc, 2)))
        }
        return ld(d)
    };

    function ld(e = []) {
        return {props: e}
    }

    const cd = /[\w).+\-_$\]]/, ud = (e, t) => {
        Oc("COMPILER_FILTER", t) && (5 === e.type && dd(e.content, t), 1 === e.type && e.props.forEach((e => {
            7 === e.type && "for" !== e.name && e.exp && dd(e.exp, t)
        })))
    };

    function dd(e, t) {
        if (4 === e.type) hd(e, t); else for (let n = 0; n < e.children.length; n++) {
            const r = e.children[n];
            "object" == typeof r && (4 === r.type ? hd(r, t) : 8 === r.type ? dd(e, t) : 5 === r.type && dd(r.content, t))
        }
    }

    function hd(e, t) {
        const n = e.content;
        let r, o, i, s, a = !1, l = !1, c = !1, u = !1, d = 0, h = 0, p = 0, f = 0, m = [];
        for (i = 0; i < n.length; i++) if (o = r, r = n.charCodeAt(i), a) 39 === r && 92 !== o && (a = !1); else if (l) 34 === r && 92 !== o && (l = !1); else if (c) 96 === r && 92 !== o && (c = !1); else if (u) 47 === r && 92 !== o && (u = !1); else if (124 !== r || 124 === n.charCodeAt(i + 1) || 124 === n.charCodeAt(i - 1) || d || h || p) {
            switch (r) {
                case 34:
                    l = !0;
                    break;
                case 39:
                    a = !0;
                    break;
                case 96:
                    c = !0;
                    break;
                case 40:
                    p++;
                    break;
                case 41:
                    p--;
                    break;
                case 91:
                    h++;
                    break;
                case 93:
                    h--;
                    break;
                case 123:
                    d++;
                    break;
                case 125:
                    d--
            }
            if (47 === r) {
                let e, t = i - 1;
                for (; t >= 0 && (e = n.charAt(t), " " === e); t--) ;
                e && cd.test(e) || (u = !0)
            }
        } else void 0 === s ? (f = i + 1, s = n.slice(0, i).trim()) : v();

        function v() {
            m.push(n.slice(f, i).trim()), f = i + 1
        }

        if (void 0 === s ? s = n.slice(0, i).trim() : 0 !== f && v(), m.length) {
            for (i = 0; i < m.length; i++) s = pd(s, m[i], t);
            e.content = s
        }
    }

    function pd(e, t, n) {
        n.helper(El);
        const r = t.indexOf("(");
        if (r < 0) return n.filters.add(t), `${Rc(t, "filter")}(${e})`;
        {
            const o = t.slice(0, r), i = t.slice(r + 1);
            return n.filters.add(o), `${Rc(o, "filter")}(${e}${")" !== i ? "," + i : i}`
        }
    }

    const fd = new WeakSet, md = (e, t) => {
        if (1 === e.type) {
            const n = yc(e, "memo");
            if (!n || fd.has(e)) return;
            return fd.add(e), () => {
                const r = e.codegenNode || t.currentNode.codegenNode;
                r && 13 === r.type && (1 !== e.tagType && sc(r, t), e.codegenNode = tc(t.helper($l), [n.exp, nc(void 0, r), "_cache", String(t.cached++)]))
            }
        }
    };

    function vd(e, t = {}) {
        const n = t.onError || il, r = "module" === t.mode;
        !0 === t.prefixIdentifiers ? n(al(47)) : r && n(al(48)), t.cacheHandlers && n(al(49)), t.scopeId && !r && n(al(50));
        const o = S(e) ? function (e, t = {}) {
            const n = function (e, t) {
                const n = h({}, Pc);
                let r;
                for (r in t) n[r] = void 0 === t[r] ? Pc[r] : t[r];
                return {options: n, column: 1, line: 1, offset: 0, originalSource: e, source: e, inPre: !1, inVPre: !1, onWarn: n.onWarn}
            }(e, t), r = Xc(n);
            return function (e, t = Kl) {
                return {type: 0, children: e, helpers: new Set, components: [], directives: [], hoists: [], imports: [], cached: 0, temps: 0, codegenNode: void 0, loc: t}
            }(Hc(n, 0, []), Jc(n, r))
        }(e, t) : e, [i, s] = [[sd, Au, md, Mu, ud, Qu, Ku, Vu, od], {on: td, bind: nd, model: ad}];
        return vu(o, h({}, t, {
            prefixIdentifiers: !1,
            nodeTransforms: [...i, ...t.nodeTransforms || []],
            directiveTransforms: h({}, s, t.directiveTransforms || {})
        })), Su(o, h({}, t, {prefixIdentifiers: !1}))
    }

    const gd = Symbol(""), bd = Symbol(""), yd = Symbol(""), wd = Symbol(""), Sd = Symbol(""), kd = Symbol(""), xd = Symbol(""), Ed = Symbol(""), _d = Symbol(""), Cd = Symbol("");
    var Td;
    let Ld;
    Td = {
        [gd]: "vModelRadio",
        [bd]: "vModelCheckbox",
        [yd]: "vModelText",
        [wd]: "vModelSelect",
        [Sd]: "vModelDynamic",
        [kd]: "withModifiers",
        [xd]: "withKeys",
        [Ed]: "vShow",
        [_d]: "Transition",
        [Cd]: "TransitionGroup"
    }, Object.getOwnPropertySymbols(Td).forEach((e => {
        Ul[e] = Td[e]
    }));
    const Ad = o("style,iframe,script,noscript", !0), Rd = {
        isVoidTag: re, isNativeTag: e => te(e) || ne(e), isPreTag: e => "pre" === e, decodeEntities: function (e, t = !1) {
            return Ld || (Ld = document.createElement("div")), t ? (Ld.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, Ld.children[0].getAttribute("foo")) : (Ld.innerHTML = e, Ld.textContent)
        }, isBuiltInComponent: e => lc(e, "Transition") ? _d : lc(e, "TransitionGroup") ? Cd : void 0, getNamespace(e, t) {
            let n = t ? t.ns : 0;
            if (t && 2 === n) if ("annotation-xml" === t.tag) {
                if ("svg" === e) return 1;
                t.props.some((e => 6 === e.type && "encoding" === e.name && null != e.value && ("text/html" === e.value.content || "application/xhtml+xml" === e.value.content))) && (n = 0)
            } else /^m(?:[ions]|text)$/.test(t.tag) && "mglyph" !== e && "malignmark" !== e && (n = 0); else t && 1 === n && ("foreignObject" !== t.tag && "desc" !== t.tag && "title" !== t.tag || (n = 0));
            if (0 === n) {
                if ("svg" === e) return 1;
                if ("math" === e) return 2
            }
            return n
        }, getTextMode({tag: e, ns: t}) {
            if (0 === t) {
                if ("textarea" === e || "title" === e) return 1;
                if (Ad(e)) return 2
            }
            return 0
        }
    }, Dd = (e, t) => {
        const n = J(e);
        return Ql(JSON.stringify(n), !1, t, 3)
    };

    function Od(e, t) {
        return al(e, t)
    }

    const Md = o("passive,once,capture"), Id = o("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), Fd = o("left,right"), Pd = o("onkeyup,onkeydown,onkeypress", !0),
        Hd = (e, t) => ac(e) && "onclick" === e.content.toLowerCase() ? Ql(t, !0) : 4 !== e.type ? ec(["(", e, `) === "onClick" ? "${t}" : (`, e, ")"]) : e, Nd = (e, t) => {
            1 !== e.type || 0 !== e.tagType || "script" !== e.tag && "style" !== e.tag || t.removeNode()
        }, Wd = [e => {
            1 === e.type && e.props.forEach(((t, n) => {
                6 === t.type && "style" === t.name && t.value && (e.props[n] = {
                    type: 7,
                    name: "bind",
                    arg: Ql("style", !0, t.loc),
                    exp: Dd(t.value.content, t.loc),
                    modifiers: [],
                    loc: t.loc
                })
            }))
        }], Bd = {
            cloak: () => ({props: []}), html: (e, t, n) => {
                const {exp: r, loc: o} = e;
                return r || n.onError(Od(53, o)), t.children.length && (n.onError(Od(54, o)), t.children.length = 0), {props: [Jl(Ql("innerHTML", !0, o), r || Ql("", !0))]}
            }, text: (e, t, n) => {
                const {exp: r, loc: o} = e;
                return r || n.onError(Od(55, o)), t.children.length && (n.onError(Od(56, o)), t.children.length = 0), {props: [Jl(Ql("textContent", !0), r ? uu(r, n) > 0 ? r : tc(n.helperString(Al), [r], o) : Ql("", !0))]}
            }, model: (e, t, n) => {
                const r = ad(e, t, n);
                if (!r.props.length || 1 === t.tagType) return r;
                e.arg && n.onError(Od(58, e.arg.loc));
                const {tag: o} = t, i = n.isCustomElement(o);
                if ("input" === o || "textarea" === o || "select" === o || i) {
                    let s = yd, a = !1;
                    if ("input" === o || i) {
                        const r = wc(t, "type");
                        if (r) {
                            if (7 === r.type) s = Sd; else if (r.value) switch (r.value.content) {
                                case"radio":
                                    s = gd;
                                    break;
                                case"checkbox":
                                    s = bd;
                                    break;
                                case"file":
                                    a = !0, n.onError(Od(59, e.loc))
                            }
                        } else (function (e) {
                            return e.props.some((e => !(7 !== e.type || "bind" !== e.name || e.arg && 4 === e.arg.type && e.arg.isStatic)))
                        })(t) && (s = Sd)
                    } else "select" === o && (s = wd);
                    a || (r.needRuntime = n.helper(s))
                } else n.onError(Od(57, e.loc));
                return r.props = r.props.filter((e => !(4 === e.key.type && "modelValue" === e.key.content))), r
            }, on: (e, t, n) => td(e, t, n, (t => {
                const {modifiers: r} = e;
                if (!r.length) return t;
                let {key: o, value: i} = t.props[0];
                const {keyModifiers: s, nonKeyModifiers: a, eventOptionModifiers: l} = ((e, t, n, r) => {
                    const o = [], i = [], s = [];
                    for (let r = 0; r < t.length; r++) {
                        const a = t[r];
                        "native" === a && Mc("COMPILER_V_ON_NATIVE", n) || Md(a) ? s.push(a) : Fd(a) ? ac(e) ? Pd(e.content) ? o.push(a) : i.push(a) : (o.push(a), i.push(a)) : Id(a) ? i.push(a) : o.push(a)
                    }
                    return {keyModifiers: o, nonKeyModifiers: i, eventOptionModifiers: s}
                })(o, r, n, e.loc);
                if (a.includes("right") && (o = Hd(o, "onContextmenu")), a.includes("middle") && (o = Hd(o, "onMouseup")), a.length && (i = tc(n.helper(kd), [i, JSON.stringify(a)])), !s.length || ac(o) && !Pd(o.content) || (i = tc(n.helper(xd), [i, JSON.stringify(s)])), l.length) {
                    const e = l.map(H).join("");
                    o = ac(o) ? Ql(`${o.content}${e}`, !0) : ec(["(", o, `) + "${e}"`])
                }
                return {props: [Jl(o, i)]}
            })), show: (e, t, n) => {
                const {exp: r, loc: o} = e;
                return r || n.onError(Od(61, o)), {props: [], needRuntime: n.helper(Ed)}
            }
        }, Vd = Object.create(null);
    gs((function (e, t) {
        if (!S(e)) {
            if (!e.nodeType) return a;
            e = e.innerHTML
        }
        const n = e, o = Vd[n];
        if (o) return o;
        if ("#" === e[0]) {
            const t = document.querySelector(e);
            e = t ? t.innerHTML : ""
        }
        const i = h({hoistStatic: !0, onError: void 0, onWarn: a}, t);
        i.isCustomElement || "undefined" == typeof customElements || (i.isCustomElement = e => !!customElements.get(e));
        const {code: s} = function (e, t = {}) {
            return vd(e, h({}, Rd, t, {nodeTransforms: [Nd, ...Wd, ...t.nodeTransforms || []], directiveTransforms: h({}, Bd, t.directiveTransforms || {}), transformHoist: null}))
        }(e, i), l = new Function("Vue", s)(r);
        return l._rc = !0, Vd[n] = l
    }))
}, 4515
:
(e, t, n) => {
    var r = {"./index.ts": 7221};

    function o(e) {
        var t = i(e);
        return n(t)
    }

    function i(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }

    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = i, e.exports = o, o.id = 4515
}, 4884
:
e => {
    "use strict";
    e.exports = () => window.__DOCS__
}, 9984
:
e => {
    "use strict";
    e.exports = __DOCS_CONFIG__
}, 4678
:
(e, t, n) => {
    "use strict";

    function r(e) {
        return new Promise(((t, n) => {
            e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => n(e.error)
        }))
    }

    function o(e, t) {
        const n = indexedDB.open(e);
        n.onupgradeneeded = () => n.result.createObjectStore(t);
        const o = r(n);
        return (e, n) => o.then((r => n(r.transaction(t, e).objectStore(t))))
    }

    let i;

    function s() {
        return i || (i = o("keyval-store", "keyval")), i
    }

    function a(e, t = s()) {
        return t("readonly", (t => r(t.get(e))))
    }

    function l(e, t, n = s()) {
        return n("readwrite", (n => (n.put(t, e), r(n.transaction))))
    }

    function c(e, t = s()) {
        return t("readwrite", (t => (t.delete(e), r(t.transaction))))
    }

    n.d(t, {IV: () => c, MT: () => o, U2: () => a, t8: () => l})
}, 4430
:
(e, t, n) => {
    "use strict";
    n.d(t, {Z: () => G});
    var r = n(1807);
    const o = function (e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t)
    }, i = "object" == typeof global && global && global.Object === Object && global;
    var s = "object" == typeof self && self && self.Object === Object && self;
    const a = i || s || Function("return this")(), l = function () {
        return a.Date.now()
    };
    var c = /\s/;
    var u = /^\s+/;
    const d = function (e) {
        return e ? e.slice(0, function (e) {
            for (var t = e.length; t-- && c.test(e.charAt(t));) ;
            return t
        }(e) + 1).replace(u, "") : e
    }, h = a.Symbol;
    var p = Object.prototype, f = p.hasOwnProperty, m = p.toString, v = h ? h.toStringTag : void 0;
    var g = Object.prototype.toString;
    var b = h ? h.toStringTag : void 0;
    const y = function (e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : b && b in Object(e) ? function (e) {
            var t = f.call(e, v), n = e[v];
            try {
                e[v] = void 0;
                var r = !0
            } catch (e) {
            }
            var o = m.call(e);
            return r && (t ? e[v] = n : delete e[v]), o
        }(e) : function (e) {
            return g.call(e)
        }(e)
    };
    var w = /^[-+]0x[0-9a-f]+$/i, S = /^0b[01]+$/i, k = /^0o[0-7]+$/i, x = parseInt;
    const E = function (e) {
        if ("number" == typeof e) return e;
        if (function (e) {
            return "symbol" == typeof e || function (e) {
                return null != e && "object" == typeof e
            }(e) && "[object Symbol]" == y(e)
        }(e)) return NaN;
        if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = d(e);
        var n = S.test(e);
        return n || k.test(e) ? x(e.slice(2), n ? 2 : 8) : w.test(e) ? NaN : +e
    };
    var _ = Math.max, C = Math.min;
    const T = function (e, t, n) {
        var r, i, s, a, c, u, d = 0, h = !1, p = !1, f = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");

        function m(t) {
            var n = r, o = i;
            return r = i = void 0, d = t, a = e.apply(o, n)
        }

        function v(e) {
            var n = e - u;
            return void 0 === u || n >= t || n < 0 || p && e - d >= s
        }

        function g() {
            var e = l();
            if (v(e)) return b(e);
            c = setTimeout(g, function (e) {
                var n = t - (e - u);
                return p ? C(n, s - (e - d)) : n
            }(e))
        }

        function b(e) {
            return c = void 0, f && r ? m(e) : (r = i = void 0, a)
        }

        function y() {
            var e = l(), n = v(e);
            if (r = arguments, i = this, u = e, n) {
                if (void 0 === c) return function (e) {
                    return d = e, c = setTimeout(g, t), h ? m(e) : a
                }(u);
                if (p) return clearTimeout(c), c = setTimeout(g, t), m(u)
            }
            return void 0 === c && (c = setTimeout(g, t)), a
        }

        return t = E(t) || 0, o(n) && (h = !!n.leading, s = (p = "maxWait" in n) ? _(E(n.maxWait) || 0, t) : s, f = "trailing" in n ? !!n.trailing : f), y.cancel = function () {
            void 0 !== c && clearTimeout(c), d = 0, r = u = i = c = void 0
        }, y.flush = function () {
            return void 0 === c ? a : b(l())
        }, y
    };
    var L = function () {
        return L = Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, L.apply(this, arguments)
    }, A = null, R = null;

    function D() {
        if (null === A) {
            if ("undefined" == typeof document) return A = 0;
            var e = document.body, t = document.createElement("div");
            t.classList.add("simplebar-hide-scrollbar"), e.appendChild(t);
            var n = t.getBoundingClientRect().right;
            e.removeChild(t), A = n
        }
        return A
    }

    function O(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window
    }

    function M(e) {
        return e && e.ownerDocument ? e.ownerDocument : document
    }

    r && window.addEventListener("resize", (function () {
        R !== window.devicePixelRatio && (R = window.devicePixelRatio, A = null)
    }));
    var I = function (e) {
        return Array.prototype.reduce.call(e, (function (e, t) {
            var n = t.name.match(/data-simplebar-(.+)/);
            if (n) {
                var r = n[1].replace(/\W+(.)/g, (function (e, t) {
                    return t.toUpperCase()
                }));
                switch (t.value) {
                    case"true":
                        e[r] = !0;
                        break;
                    case"false":
                        e[r] = !1;
                        break;
                    case void 0:
                        e[r] = !0;
                        break;
                    default:
                        e[r] = t.value
                }
            }
            return e
        }), {})
    };

    function F(e, t) {
        var n;
        e && (n = e.classList).add.apply(n, t.split(" "))
    }

    function P(e, t) {
        e && t.split(" ").forEach((function (t) {
            e.classList.remove(t)
        }))
    }

    function H(e) {
        return ".".concat(e.split(" ").join("."))
    }

    var N = Object.freeze({__proto__: null, getElementWindow: O, getElementDocument: M, getOptions: I, addClasses: F, removeClasses: P, classNamesToQuery: H}), W = O, B = M, V = I,
        j = F, z = P, q = H, $ = function () {
            function e(t, n) {
                void 0 === n && (n = {});
                var r = this;
                if (this.removePreventClickId = null, this.minScrollbarWidth = 20, this.stopScrollDelay = 175, this.isScrolling = !1, this.isMouseEntering = !1, this.scrollXTicking = !1, this.scrollYTicking = !1, this.wrapperEl = null, this.contentWrapperEl = null, this.contentEl = null, this.offsetEl = null, this.maskEl = null, this.placeholderEl = null, this.heightAutoObserverWrapperEl = null, this.heightAutoObserverEl = null, this.rtlHelpers = null, this.scrollbarWidth = 0, this.resizeObserver = null, this.mutationObserver = null, this.elStyles = null, this.isRtl = null, this.mouseX = 0, this.mouseY = 0, this.onMouseMove = function () {
                }, this.onWindowResize = function () {
                }, this.onStopScrolling = function () {
                }, this.onMouseEntered = function () {
                }, this.onScroll = function () {
                    var e = W(r.el);
                    r.scrollXTicking || (e.requestAnimationFrame(r.scrollX), r.scrollXTicking = !0), r.scrollYTicking || (e.requestAnimationFrame(r.scrollY), r.scrollYTicking = !0), r.isScrolling || (r.isScrolling = !0, j(r.el, r.classNames.scrolling)), r.showScrollbar("x"), r.showScrollbar("y"), r.onStopScrolling()
                }, this.scrollX = function () {
                    r.axis.x.isOverflowing && r.positionScrollbar("x"), r.scrollXTicking = !1
                }, this.scrollY = function () {
                    r.axis.y.isOverflowing && r.positionScrollbar("y"), r.scrollYTicking = !1
                }, this._onStopScrolling = function () {
                    z(r.el, r.classNames.scrolling), r.options.autoHide && (r.hideScrollbar("x"), r.hideScrollbar("y")), r.isScrolling = !1
                }, this.onMouseEnter = function () {
                    r.isMouseEntering || (j(r.el, r.classNames.mouseEntered), r.showScrollbar("x"), r.showScrollbar("y"), r.isMouseEntering = !0), r.onMouseEntered()
                }, this._onMouseEntered = function () {
                    z(r.el, r.classNames.mouseEntered), r.options.autoHide && (r.hideScrollbar("x"), r.hideScrollbar("y")), r.isMouseEntering = !1
                }, this._onMouseMove = function (e) {
                    r.mouseX = e.clientX, r.mouseY = e.clientY, (r.axis.x.isOverflowing || r.axis.x.forceVisible) && r.onMouseMoveForAxis("x"), (r.axis.y.isOverflowing || r.axis.y.forceVisible) && r.onMouseMoveForAxis("y")
                }, this.onMouseLeave = function () {
                    r.onMouseMove.cancel(), (r.axis.x.isOverflowing || r.axis.x.forceVisible) && r.onMouseLeaveForAxis("x"), (r.axis.y.isOverflowing || r.axis.y.forceVisible) && r.onMouseLeaveForAxis("y"), r.mouseX = -1, r.mouseY = -1
                }, this._onWindowResize = function () {
                    r.scrollbarWidth = r.getScrollbarWidth(), r.hideNativeScrollbar()
                }, this.onPointerEvent = function (e) {
                    var t, n;
                    r.axis.x.track.el && r.axis.y.track.el && r.axis.x.scrollbar.el && r.axis.y.scrollbar.el && (r.axis.x.track.rect = r.axis.x.track.el.getBoundingClientRect(), r.axis.y.track.rect = r.axis.y.track.el.getBoundingClientRect(), (r.axis.x.isOverflowing || r.axis.x.forceVisible) && (t = r.isWithinBounds(r.axis.x.track.rect)), (r.axis.y.isOverflowing || r.axis.y.forceVisible) && (n = r.isWithinBounds(r.axis.y.track.rect)), (t || n) && (e.stopPropagation(), "pointerdown" === e.type && "touch" !== e.pointerType && (t && (r.axis.x.scrollbar.rect = r.axis.x.scrollbar.el.getBoundingClientRect(), r.isWithinBounds(r.axis.x.scrollbar.rect) ? r.onDragStart(e, "x") : r.onTrackClick(e, "x")), n && (r.axis.y.scrollbar.rect = r.axis.y.scrollbar.el.getBoundingClientRect(), r.isWithinBounds(r.axis.y.scrollbar.rect) ? r.onDragStart(e, "y") : r.onTrackClick(e, "y")))))
                }, this.drag = function (t) {
                    var n, o, i, s, a, l, c, u, d, h, p;
                    if (r.draggedAxis && r.contentWrapperEl) {
                        var f = r.axis[r.draggedAxis].track,
                            m = null !== (o = null === (n = f.rect) || void 0 === n ? void 0 : n[r.axis[r.draggedAxis].sizeAttr]) && void 0 !== o ? o : 0,
                            v = r.axis[r.draggedAxis].scrollbar,
                            g = null !== (s = null === (i = r.contentWrapperEl) || void 0 === i ? void 0 : i[r.axis[r.draggedAxis].scrollSizeAttr]) && void 0 !== s ? s : 0,
                            b = parseInt(null !== (l = null === (a = r.elStyles) || void 0 === a ? void 0 : a[r.axis[r.draggedAxis].sizeAttr]) && void 0 !== l ? l : "0px", 10);
                        t.preventDefault(), t.stopPropagation();
                        var y = ("y" === r.draggedAxis ? t.pageY : t.pageX) - (null !== (u = null === (c = f.rect) || void 0 === c ? void 0 : c[r.axis[r.draggedAxis].offsetAttr]) && void 0 !== u ? u : 0) - r.axis[r.draggedAxis].dragOffset,
                            w = (y = "x" === r.draggedAxis && r.isRtl ? (null !== (h = null === (d = f.rect) || void 0 === d ? void 0 : d[r.axis[r.draggedAxis].sizeAttr]) && void 0 !== h ? h : 0) - v.size - y : y) / (m - v.size) * (g - b);
                        "x" === r.draggedAxis && r.isRtl && (w = (null === (p = e.getRtlHelpers()) || void 0 === p ? void 0 : p.isScrollingToNegative) ? -w : w), r.contentWrapperEl[r.axis[r.draggedAxis].scrollOffsetAttr] = w
                    }
                }, this.onEndDrag = function (e) {
                    var t = B(r.el), n = W(r.el);
                    e.preventDefault(), e.stopPropagation(), z(r.el, r.classNames.dragging), t.removeEventListener("mousemove", r.drag, !0), t.removeEventListener("mouseup", r.onEndDrag, !0), r.removePreventClickId = n.setTimeout((function () {
                        t.removeEventListener("click", r.preventClick, !0), t.removeEventListener("dblclick", r.preventClick, !0), r.removePreventClickId = null
                    }))
                }, this.preventClick = function (e) {
                    e.preventDefault(), e.stopPropagation()
                }, this.el = t, this.options = L(L({}, e.defaultOptions), n), this.classNames = L(L({}, e.defaultOptions.classNames), n.classNames), this.axis = {
                    x: {
                        scrollOffsetAttr: "scrollLeft",
                        sizeAttr: "width",
                        scrollSizeAttr: "scrollWidth",
                        offsetSizeAttr: "offsetWidth",
                        offsetAttr: "left",
                        overflowAttr: "overflowX",
                        dragOffset: 0,
                        isOverflowing: !0,
                        forceVisible: !1,
                        track: {size: null, el: null, rect: null, isVisible: !1},
                        scrollbar: {size: null, el: null, rect: null, isVisible: !1}
                    },
                    y: {
                        scrollOffsetAttr: "scrollTop",
                        sizeAttr: "height",
                        scrollSizeAttr: "scrollHeight",
                        offsetSizeAttr: "offsetHeight",
                        offsetAttr: "top",
                        overflowAttr: "overflowY",
                        dragOffset: 0,
                        isOverflowing: !0,
                        forceVisible: !1,
                        track: {size: null, el: null, rect: null, isVisible: !1},
                        scrollbar: {size: null, el: null, rect: null, isVisible: !1}
                    }
                }, "object" != typeof this.el || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
                this.onMouseMove = function (e, t, n) {
                    var r = !0, i = !0;
                    if ("function" != typeof e) throw new TypeError("Expected a function");
                    return o(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), T(e, t, {leading: r, maxWait: t, trailing: i})
                }(this._onMouseMove, 64), this.onWindowResize = T(this._onWindowResize, 64, {leading: !0}), this.onStopScrolling = T(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = T(this._onMouseEntered, this.stopScrollDelay), this.init()
            }

            return e.getRtlHelpers = function () {
                if (e.rtlHelpers) return e.rtlHelpers;
                var t = document.createElement("div");
                t.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
                var n = t.firstElementChild, r = null == n ? void 0 : n.firstElementChild;
                if (!r) return null;
                document.body.appendChild(n), n.scrollLeft = 0;
                var o = e.getOffset(n), i = e.getOffset(r);
                n.scrollLeft = -999;
                var s = e.getOffset(r);
                return document.body.removeChild(n), e.rtlHelpers = {isScrollOriginAtZero: o.left !== i.left, isScrollingToNegative: i.left !== s.left}, e.rtlHelpers
            }, e.prototype.getScrollbarWidth = function () {
                try {
                    return this.contentWrapperEl && "none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : D()
                } catch (e) {
                    return D()
                }
            }, e.getOffset = function (e) {
                var t = e.getBoundingClientRect(), n = B(e), r = W(e);
                return {top: t.top + (r.pageYOffset || n.documentElement.scrollTop), left: t.left + (r.pageXOffset || n.documentElement.scrollLeft)}
            }, e.prototype.init = function () {
                r && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners())
            }, e.prototype.initDOM = function () {
                var e, t;
                this.wrapperEl = this.el.querySelector(q(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(q(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(q(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(q(this.classNames.offset)), this.maskEl = this.el.querySelector(q(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, q(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(q(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(q(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(q(this.classNames.track)).concat(q(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(q(this.classNames.track)).concat(q(this.classNames.vertical))), this.axis.x.scrollbar.el = (null === (e = this.axis.x.track.el) || void 0 === e ? void 0 : e.querySelector(q(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = (null === (t = this.axis.y.track.el) || void 0 === t ? void 0 : t.querySelector(q(this.classNames.scrollbar))) || null, this.options.autoHide || (j(this.axis.x.scrollbar.el, this.classNames.visible), j(this.axis.y.scrollbar.el, this.classNames.visible))
            }, e.prototype.initListeners = function () {
                var e, t = this, n = W(this.el);
                if (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("pointerdown", this.onPointerEvent, !0), this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), null === (e = this.contentWrapperEl) || void 0 === e || e.addEventListener("scroll", this.onScroll), n.addEventListener("resize", this.onWindowResize), this.contentEl) {
                    if (window.ResizeObserver) {
                        var r = !1, o = n.ResizeObserver || ResizeObserver;
                        this.resizeObserver = new o((function () {
                            r && n.requestAnimationFrame((function () {
                                t.recalculate()
                            }))
                        })), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), n.requestAnimationFrame((function () {
                            r = !0
                        }))
                    }
                    this.mutationObserver = new n.MutationObserver((function () {
                        n.requestAnimationFrame((function () {
                            t.recalculate()
                        }))
                    })), this.mutationObserver.observe(this.contentEl, {childList: !0, subtree: !0, characterData: !0})
                }
            }, e.prototype.recalculate = function () {
                if (this.heightAutoObserverEl && this.contentEl && this.contentWrapperEl && this.wrapperEl && this.placeholderEl) {
                    var e = W(this.el);
                    this.elStyles = e.getComputedStyle(this.el), this.isRtl = "rtl" === this.elStyles.direction;
                    var t = this.contentEl.offsetWidth, n = this.heightAutoObserverEl.offsetHeight <= 1, r = this.heightAutoObserverEl.offsetWidth <= 1 || t > 0,
                        o = this.contentWrapperEl.offsetWidth, i = this.elStyles.overflowX, s = this.elStyles.overflowY;
                    this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
                    var a = this.contentEl.scrollHeight, l = this.contentEl.scrollWidth;
                    this.contentWrapperEl.style.height = n ? "auto" : "100%", this.placeholderEl.style.width = r ? "".concat(t || l, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
                    var c = this.contentWrapperEl.offsetHeight;
                    this.axis.x.isOverflowing = 0 !== t && l > t, this.axis.y.isOverflowing = a > c, this.axis.x.isOverflowing = "hidden" !== i && this.axis.x.isOverflowing, this.axis.y.isOverflowing = "hidden" !== s && this.axis.y.isOverflowing, this.axis.x.forceVisible = "x" === this.options.forceVisible || !0 === this.options.forceVisible, this.axis.y.forceVisible = "y" === this.options.forceVisible || !0 === this.options.forceVisible, this.hideNativeScrollbar();
                    var u = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, d = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
                    this.axis.x.isOverflowing = this.axis.x.isOverflowing && l > o - d, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > c - u, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y")
                }
            }, e.prototype.getScrollbarSize = function (e) {
                var t, n;
                if (void 0 === e && (e = "y"), !this.axis[e].isOverflowing || !this.contentEl) return 0;
                var r, o = this.contentEl[this.axis[e].scrollSizeAttr],
                    i = null !== (n = null === (t = this.axis[e].track.el) || void 0 === t ? void 0 : t[this.axis[e].offsetSizeAttr]) && void 0 !== n ? n : 0, s = i / o;
                return r = Math.max(~~(s * i), this.options.scrollbarMinSize), this.options.scrollbarMaxSize && (r = Math.min(r, this.options.scrollbarMaxSize)), r
            }, e.prototype.positionScrollbar = function (t) {
                var n, r, o;
                void 0 === t && (t = "y");
                var i = this.axis[t].scrollbar;
                if (this.axis[t].isOverflowing && this.contentWrapperEl && i.el && this.elStyles) {
                    var s = this.contentWrapperEl[this.axis[t].scrollSizeAttr],
                        a = (null === (n = this.axis[t].track.el) || void 0 === n ? void 0 : n[this.axis[t].offsetSizeAttr]) || 0,
                        l = parseInt(this.elStyles[this.axis[t].sizeAttr], 10), c = this.contentWrapperEl[this.axis[t].scrollOffsetAttr];
                    c = "x" === t && this.isRtl && (null === (r = e.getRtlHelpers()) || void 0 === r ? void 0 : r.isScrollOriginAtZero) ? -c : c, "x" === t && this.isRtl && (c = (null === (o = e.getRtlHelpers()) || void 0 === o ? void 0 : o.isScrollingToNegative) ? c : -c);
                    var u = c / (s - l), d = ~~((a - i.size) * u);
                    d = "x" === t && this.isRtl ? -d + (a - i.size) : d, i.el.style.transform = "x" === t ? "translate3d(".concat(d, "px, 0, 0)") : "translate3d(0, ".concat(d, "px, 0)")
                }
            }, e.prototype.toggleTrackVisibility = function (e) {
                void 0 === e && (e = "y");
                var t = this.axis[e].track.el, n = this.axis[e].scrollbar.el;
                t && n && this.contentWrapperEl && (this.axis[e].isOverflowing || this.axis[e].forceVisible ? (t.style.visibility = "visible", this.contentWrapperEl.style[this.axis[e].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(e))) : (t.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[e].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(e))), this.axis[e].isOverflowing ? n.style.display = "block" : n.style.display = "none")
            }, e.prototype.showScrollbar = function (e) {
                void 0 === e && (e = "y"), this.axis[e].isOverflowing && !this.axis[e].scrollbar.isVisible && (j(this.axis[e].scrollbar.el, this.classNames.visible), this.axis[e].scrollbar.isVisible = !0)
            }, e.prototype.hideScrollbar = function (e) {
                void 0 === e && (e = "y"), this.axis[e].isOverflowing && this.axis[e].scrollbar.isVisible && (z(this.axis[e].scrollbar.el, this.classNames.visible), this.axis[e].scrollbar.isVisible = !1)
            }, e.prototype.hideNativeScrollbar = function () {
                this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px")
            }, e.prototype.onMouseMoveForAxis = function (e) {
                void 0 === e && (e = "y");
                var t = this.axis[e];
                t.track.el && t.scrollbar.el && (t.track.rect = t.track.el.getBoundingClientRect(), t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(t.track.rect) ? (this.showScrollbar(e), j(t.track.el, this.classNames.hover), this.isWithinBounds(t.scrollbar.rect) ? j(t.scrollbar.el, this.classNames.hover) : z(t.scrollbar.el, this.classNames.hover)) : (z(t.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(e)))
            }, e.prototype.onMouseLeaveForAxis = function (e) {
                void 0 === e && (e = "y"), z(this.axis[e].track.el, this.classNames.hover), z(this.axis[e].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(e)
            }, e.prototype.onDragStart = function (e, t) {
                var n;
                void 0 === t && (t = "y");
                var r = B(this.el), o = W(this.el), i = this.axis[t].scrollbar, s = "y" === t ? e.pageY : e.pageX;
                this.axis[t].dragOffset = s - ((null === (n = i.rect) || void 0 === n ? void 0 : n[this.axis[t].offsetAttr]) || 0), this.draggedAxis = t, j(this.el, this.classNames.dragging), r.addEventListener("mousemove", this.drag, !0), r.addEventListener("mouseup", this.onEndDrag, !0), null === this.removePreventClickId ? (r.addEventListener("click", this.preventClick, !0), r.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null)
            }, e.prototype.onTrackClick = function (e, t) {
                var n, r, o, i, s = this;
                void 0 === t && (t = "y");
                var a = this.axis[t];
                if (this.options.clickOnTrack && a.scrollbar.el && this.contentWrapperEl) {
                    e.preventDefault();
                    var l = W(this.el);
                    this.axis[t].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
                    var c = null !== (r = null === (n = this.axis[t].scrollbar.rect) || void 0 === n ? void 0 : n[this.axis[t].offsetAttr]) && void 0 !== r ? r : 0,
                        u = parseInt(null !== (i = null === (o = this.elStyles) || void 0 === o ? void 0 : o[this.axis[t].sizeAttr]) && void 0 !== i ? i : "0px", 10),
                        d = this.contentWrapperEl[this.axis[t].scrollOffsetAttr], h = ("y" === t ? this.mouseY - c : this.mouseX - c) < 0 ? -1 : 1, p = -1 === h ? d - u : d + u,
                        f = function () {
                            s.contentWrapperEl && (-1 === h ? d > p && (d -= 40, s.contentWrapperEl[s.axis[t].scrollOffsetAttr] = d, l.requestAnimationFrame(f)) : d < p && (d += 40, s.contentWrapperEl[s.axis[t].scrollOffsetAttr] = d, l.requestAnimationFrame(f)))
                        };
                    f()
                }
            }, e.prototype.getContentElement = function () {
                return this.contentEl
            }, e.prototype.getScrollElement = function () {
                return this.contentWrapperEl
            }, e.prototype.removeListeners = function () {
                var e = W(this.el);
                this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("pointerdown", this.onPointerEvent, !0), this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.onMouseMove.cancel(), this.onWindowResize.cancel(), this.onStopScrolling.cancel(), this.onMouseEntered.cancel()
            }, e.prototype.unMount = function () {
                this.removeListeners()
            }, e.prototype.isWithinBounds = function (e) {
                return this.mouseX >= e.left && this.mouseX <= e.left + e.width && this.mouseY >= e.top && this.mouseY <= e.top + e.height
            }, e.prototype.findChild = function (e, t) {
                var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
                return Array.prototype.filter.call(e.children, (function (e) {
                    return n.call(e, t)
                }))[0]
            }, e.rtlHelpers = null, e.defaultOptions = {
                forceVisible: !1,
                clickOnTrack: !0,
                scrollbarMinSize: 25,
                scrollbarMaxSize: 0,
                ariaLabel: "scrollable content",
                classNames: {
                    contentEl: "simplebar-content",
                    contentWrapper: "simplebar-content-wrapper",
                    offset: "simplebar-offset",
                    mask: "simplebar-mask",
                    wrapper: "simplebar-wrapper",
                    placeholder: "simplebar-placeholder",
                    scrollbar: "simplebar-scrollbar",
                    track: "simplebar-track",
                    heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                    heightAutoObserverEl: "simplebar-height-auto-observer",
                    visible: "simplebar-visible",
                    horizontal: "simplebar-horizontal",
                    vertical: "simplebar-vertical",
                    hover: "simplebar-hover",
                    dragging: "simplebar-dragging",
                    scrolling: "simplebar-scrolling",
                    scrollable: "simplebar-scrollable",
                    mouseEntered: "simplebar-mouse-entered"
                },
                scrollableNode: null,
                contentNode: null,
                autoHide: !0
            }, e.getOptions = V, e.helpers = N, e
        }(), Z = function (e, t) {
            return Z = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }, Z(e, t)
        }, U = $.helpers, K = U.getOptions, Y = U.addClasses, G = function (e) {
            function t() {
                for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                var o = e.apply(this, n) || this;
                return t.instances.set(n[0], o), o
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }

                Z(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }(t, e), t.initDOMLoadedElements = function () {
                document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.removeEventListener("load", this.initDOMLoadedElements), Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function (e) {
                    "init" === e.getAttribute("data-simplebar") || t.instances.has(e) || new t(e, K(e.attributes))
                }))
            }, t.removeObserver = function () {
                var e;
                null === (e = t.globalObserver) || void 0 === e || e.disconnect()
            }, t.prototype.initDOM = function () {
                var e, t, n, r = this;
                if (!Array.prototype.filter.call(this.el.children, (function (e) {
                    return e.classList.contains(r.classNames.wrapper)
                })).length) {
                    for (this.wrapperEl = document.createElement("div"), this.contentWrapperEl = document.createElement("div"), this.offsetEl = document.createElement("div"), this.maskEl = document.createElement("div"), this.contentEl = document.createElement("div"), this.placeholderEl = document.createElement("div"), this.heightAutoObserverWrapperEl = document.createElement("div"), this.heightAutoObserverEl = document.createElement("div"), Y(this.wrapperEl, this.classNames.wrapper), Y(this.contentWrapperEl, this.classNames.contentWrapper), Y(this.offsetEl, this.classNames.offset), Y(this.maskEl, this.classNames.mask), Y(this.contentEl, this.classNames.contentEl), Y(this.placeholderEl, this.classNames.placeholder), Y(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl), Y(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl); this.el.firstChild;) this.contentEl.appendChild(this.el.firstChild);
                    this.contentWrapperEl.appendChild(this.contentEl), this.offsetEl.appendChild(this.contentWrapperEl), this.maskEl.appendChild(this.offsetEl), this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl), this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl), this.wrapperEl.appendChild(this.maskEl), this.wrapperEl.appendChild(this.placeholderEl), this.el.appendChild(this.wrapperEl), null === (e = this.contentWrapperEl) || void 0 === e || e.setAttribute("tabindex", "0"), null === (t = this.contentWrapperEl) || void 0 === t || t.setAttribute("role", "region"), null === (n = this.contentWrapperEl) || void 0 === n || n.setAttribute("aria-label", this.options.ariaLabel)
                }
                if (!this.axis.x.track.el || !this.axis.y.track.el) {
                    var o = document.createElement("div"), i = document.createElement("div");
                    Y(o, this.classNames.track), Y(i, this.classNames.scrollbar), o.appendChild(i), this.axis.x.track.el = o.cloneNode(!0), Y(this.axis.x.track.el, this.classNames.horizontal), this.axis.y.track.el = o.cloneNode(!0), Y(this.axis.y.track.el, this.classNames.vertical), this.el.appendChild(this.axis.x.track.el), this.el.appendChild(this.axis.y.track.el)
                }
                $.prototype.initDOM.call(this), this.el.setAttribute("data-simplebar", "init")
            }, t.prototype.unMount = function () {
                $.prototype.unMount.call(this), t.instances.delete(this.el)
            }, t.initHtmlApi = function () {
                this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this), "undefined" != typeof MutationObserver && (this.globalObserver = new MutationObserver(t.handleMutations), this.globalObserver.observe(document, {
                    childList: !0,
                    subtree: !0
                })), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.addEventListener("load", this.initDOMLoadedElements))
            }, t.handleMutations = function (e) {
                e.forEach((function (e) {
                    e.addedNodes.forEach((function (e) {
                        1 === e.nodeType && (e.hasAttribute("data-simplebar") ? !t.instances.has(e) && document.documentElement.contains(e) && new t(e, K(e.attributes)) : e.querySelectorAll("[data-simplebar]").forEach((function (e) {
                            "init" !== e.getAttribute("data-simplebar") && !t.instances.has(e) && document.documentElement.contains(e) && new t(e, K(e.attributes))
                        })))
                    })), e.removedNodes.forEach((function (e) {
                        1 === e.nodeType && ("init" === e.getAttribute("data-simplebar") ? t.instances.has(e) && !document.documentElement.contains(e) && t.instances.get(e).unMount() : Array.prototype.forEach.call(e.querySelectorAll('[data-simplebar="init"]'), (function (e) {
                            t.instances.has(e) && !document.documentElement.contains(e) && t.instances.get(e).unMount()
                        })))
                    }))
                }))
            }, t.instances = new WeakMap, t
        }($);
    r && G.initHtmlApi()
}
},
t = {};

function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = t[r] = {exports: {}};
    return e[r].call(i.exports, i, i.exports, n), i.exports
}

n.n = e => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, {a: t}), t
}, n.d = (e, t) => {
    for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
}, n.g = function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
        return this || new Function("return this")()
    } catch (e) {
        if ("object" == typeof window) return window
    }
}(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
}, (() => {
    "use strict";
    var e = n(5166), t = n(9341), r = n(872), o = n(5701), i = n(9984), s = n.n(i), a = n(2110);

    function l(e) {
        setTimeout((function () {
            e(function () {
                var e;
                if ("number" == typeof s().flags) e = s().flags; else {
                    if (!c()) return !1;
                    if ("number" != typeof s().flags) return !1;
                    e = s().flags
                }
                var n = p(h("73696465626172"), h("444F432D53494445424152"), h("646F63732D706F77657265642D6279"), document.children), r = 0 === n.length && t.h.state.unloading;
                if (n.length > 0) for (var o = 0; o < n.length; ++o) {
                    var i = n[o], a = null == i ? void 0 : i.firstChild, l = null == i ? void 0 : i.querySelector("svg");
                    if (!(i && a && l && i.getAttribute(h("68726566")) === h("68747470733A2F2F7265747970652E636F6D2F") && a.innerHTML === h("506F7765726564206279") && l.getAttribute(h("7769647468")) === h("3936") && l.getAttribute(h("686569676874")) === h("3230") && 1045 === l.innerHTML.replace(/\s+/g, "").split("").map((function (e) {
                        return e.charCodeAt(0)
                    })).reduce((function (e, t) {
                        return e ^ 23 * t
                    }), 0))) return !1;
                    r || i && (i.offsetWidth || i.offsetHeight || i.getClientRects().length) && (r = !0)
                }
                return r || (1 & e) * (2 & e) > 0
            }())
        }), 10)
    }

    function c() {
        var e, t = d();
        if (!t) return !1;
        for (var n = parseInt(t.checksum.slice(0, -5) || "0"), r = [s().id, t.fingerprint, ".", t.signature, s().base, s().host, n.toString()], o = 0, i = s().sidebar; o < i.length; o++) {
            var a = i[o];
            r.push(null !== (e = a.l) && void 0 !== e ? e : a.n)
        }
        for (var l = 0, c = 0, u = r; c < u.length; c++) for (var h = u[c], p = 0; p < h.length; ++p) l ^= h.charCodeAt(p);
        return l === parseInt(t.checksum.slice(-5)) && (s().flags = n, !0)
    }

    function u(t, n, r) {
        // if (!n) {
        //     var o = "5B464154414C5D3A20436F".concat(727275, "7074656420776"), i = function () {
        //         t && t.unmount();
        //         var e = "56273697".concat(4652063, "6F6E66696775726174696F6E"), n = document.getElementById(h("646F63732D617070"));
        //         n && (n.innerHTML = "", window[h("636F6E736F6C65")][h("6572726F72")](h(o + e)))
        //     };
        //     r ? (0, e.Y3)((function () {
        //         return i()
        //     })) : i()
        // }
    }

    function d() {
        var e = null === s() || void 0 === s() ? void 0 : s().key;
        if (!e || "string" != typeof e) return null;
        var t = e.indexOf(".");
        if (t <= 0) return null;
        var n = e.lastIndexOf(".");
        if (n <= t) return null;
        for (var r = {fingerprint: e.slice(0, t), signature: e.slice(t + 1, n), checksum: e.slice(n + 1)}, o = r.signature.length % 4; o > 0; --o) r.signature += "=";
        return r
    }

    function h(e) {
        for (var t = "", n = 0; n < e.length; n += 2) t += String.fromCharCode(parseInt(e.substr(n, 2), 16));
        return t
    }

    function p(e, t, n, r, o, i) {
        null != i || (i = []);
        for (var s = 0; s < r.length; ++s) {
            var a = r[s];
            if ("A" === a.nodeName && a.classList.contains(n) && a instanceof HTMLElement) i.push(a); else {
                var l = a.children.length ? a.children : "TEMPLATE" === a.nodeName && a instanceof HTMLTemplateElement && a.content.children ? a.content.children : null;
                (null == l ? void 0 : l.length) && p(e, t, n, l, o, i)
            }
        }
        return i
    }

    var f = n(4884), m = n.n(f);
    const v = () => window.__DOCS_MERMAID__;
    var g = n.n(v);
    const b = () => window.__DOCS_PRISM__;
    var y = n.n(b);
    const w = () => window.__DOCS_KATEX__;
    var S, k = n.n(w), x = n(6184), E = n(7023), _ = n(5184), C = n(5543), T = n(8816), L = n(7755), A = n(4430), R = n(8826), D = n.n(R), O = function (e, t, n, r) {
        return new (n || (n = Promise))((function (o, i) {
            function s(e) {
                try {
                    l(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    l(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(s, a)
            }

            l((r = r.apply(e, t || [])).next())
        }))
    }, M = function (e, t) {
        var n, r, o, i, s = {
            label: 0, sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            }, trys: [], ops: []
        };
        return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function a(a) {
            return function (l) {
                return function (a) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                        if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                        switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return s.label++, {value: a[1], done: !1};
                            case 5:
                                s.label++, r = a[1], a = [0];
                                continue;
                            case 7:
                                a = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                    s.label = a[1];
                                    break
                                }
                                if (6 === a[0] && s.label < o[1]) {
                                    s.label = o[1], o = a;
                                    break
                                }
                                if (o && s.label < o[2]) {
                                    s.label = o[2], s.ops.push(a);
                                    break
                                }
                                o[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        a = t.call(e, s)
                    } catch (e) {
                        a = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & a[0]) throw a[1];
                    return {value: a[0] ? a[1] : void 0, done: !0}
                }([a, l])
            }
        }
    }, I = (S = {}, function () {
        return S
    });

    function F(e, t, n) {
        return O(this, void 0, void 0, (function () {
            var r, o, i, s, a;
            return M(this, (function (l) {
                switch (l.label) {
                    case 0:
                        if (r = !1, o = "/", i = I(), s = function (e, t) {
                            var n, r = e[t];
                            if (r) {
                                var o = atob(r);
                                return new Uint8Array((null !== (n = o.match(/[\s\S]/g)) && void 0 !== n ? n : []).map((function (e) {
                                    return e.charCodeAt(0)
                                })))
                            }
                            return null
                        }(i, o), s && (r = H(e, s)), r) return [3, 5];
                        a = null, t(), l.label = 1;
                    case 1:
                        return [4, P()];
                    case 2:
                        if (!(a = l.sent())) return [3, 4];
                        (r = H(e, a, n)) || (c = document.getElementById("protected-content-error")) && (c.classList.remove("opacity-0"), setTimeout((function () {
                            c.classList.add("opacity-0")
                        }), 1e3)), l.label = 3;
                    case 3:
                        if (!r) return [3, 1];
                        l.label = 4;
                    case 4:
                        r && a && function (e, t, n) {
                            var r = btoa(String.fromCharCode.apply(null, [].slice.call(new Uint8Array(t))));
                            e[n] = r
                        }(i, a, o), l.label = 5;
                    case 5:
                        return r || (e.innerHTML = "<h4>Access denied</h4>"), t(), [2]
                }
                var c
            }))
        }))
    }

    function P() {
        var e = this;
        return new Promise((function (t) {
            document.getElementById("protected-content-password").focus(), document.getElementById("protected-content-ok").addEventListener("click", (function () {
                return O(e, void 0, void 0, (function () {
                    var e, n, r, o;
                    return M(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return e = null === (o = document.getElementById("protected-content-password")) || void 0 === o ? void 0 : o.value, n = (new TextEncoder).encode(e), [4, crypto.subtle.digest("SHA-256", n)];
                            case 1:
                                return r = i.sent(), t(r), [2]
                        }
                    }))
                }))
            }), {once: !0})
        }))
    }

    function H(e, t, n) {
        var r, o, i;
        try {
            var s = (null !== (r = e.getAttribute("data")) && void 0 !== r ? r : "").split("."), a = parseInt(s[0]), l = s[1], c = atob(l),
                u = new Uint8Array((null !== (o = c.match(/[\s\S]/g)) && void 0 !== o ? o : []).map((function (e) {
                    return e.charCodeAt(0)
                }))), d = s[2], h = atob(d), p = new Uint8Array((null !== (i = h.match(/[\s\S]/g)) && void 0 !== i ? i : []).map((function (e) {
                    return e.charCodeAt(0)
                }))), f = new Uint8Array(t), m = new (D().ModeOfOperation.cbc)(f, u).decrypt(p), v = (new TextDecoder).decode(m);
            if (!v.trimStart().startsWith("<")) throw new Error("Invalid password.");
            if (n) {
                n();
                var g = document.getElementById(e.id);
                g && (e = g)
            }
            return e.outerHTML = v.slice(0, a), !0
        } catch (e) {
            return !1
        }
    }

    var N, W, B, V, j, z;

    function q() {
        V = (0, e.ri)((0, e.aZ)({
            name: "DocApp", compilerOptions: {delimiters: ["\0\0", "\0\0"]}, setup: function () {
                var n = (0, t.oR)().store;
                (0, r.g)(n), n.actions.resetMemberData();
                var o = function () {
                    var t = (0, e.iH)(!1), n = null;
                    return (0, E.zX)(window, "scroll", (function () {
                        t.value = !0, null !== n && clearTimeout(n), n = setTimeout((function () {
                            t.value = !1
                        }), 100)
                    })), {isScrolling: t}
                }().isScrolling;
                (0, e.YP)(o, (function (e) {
                    n.state.isWindowScrolling = e
                }), {immediate: !0}), (0, e.bv)((function () {
                    (0, e.Y3)((function () {
                        n.state.initialPageLoad = !1
                    }))
                })), function () {
                    var e = (0, t.oR)().store, n = (0, _.B)().scrollTo;
                    (0, E.zX)(window, "popstate", (function () {
                        var t;
                        if (window.location.hash) {
                            var r = decodeURIComponent(window.location.hash);
                            (null !== (t = document.getElementById(r.slice(1))) && void 0 !== t ? t : document.querySelector(r)) && n(r, {
                                offset: C.vE, onStart: function () {
                                    e.actions.updateScrolledElementId(r.substr(1))
                                }
                            })
                        }
                    }))
                }()
            }
        })), V.provide(t.$Q, t.h), V.provide(o.Mu, o.Ke);
        var i = n(4515);
        i.keys().forEach((function (e) {
            var t = i(e);
            Object.keys(t).forEach((function (e) {
                V.component(e, t[e])
            }))
        }));
        var s = [], a = document.getElementById("docs-app");
        a && a.querySelectorAll("script, style, iframe").forEach((function (e) {
            if (e.parentElement) {
                var t = document.createElement("div");
                t.id = e.id ? "element-placeholder-".concat(s.length, "-").concat(e.id) : "element-placeholder-".concat(s.length), e.parentElement.insertBefore(t, e), s.push([e, t]), e.remove()
            }
        })), V.mount("#docs-app"), s.length && (0, e.Y3)((function () {
            for (var e = 0, t = s; e < t.length; e++) {
                var n = t[e], r = document.getElementById(n[1].id);
                (null == r ? void 0 : r.parentElement) && (r.parentElement.insertBefore(n[0], r), r.remove())
            }
        }))
    }

    (0, x.BL)(), "file:" === location.protocol.toLowerCase() && (x.nP.drive = !1, x.nP.navigator.proposeVisit = function (e) {
        window.location.href = e.toString()
    });
    var $ = "reloadPosition=";
    null !== (N = window.retype) && void 0 !== N || (window.retype = {}), null !== (W = (B = window.retype).reload) && void 0 !== W || (B.reload = function (e, t) {
        if (e) {
            var n = location.pathname.endsWith("/") || /[.]html?$/i.test(location.pathname) ? location.pathname : location.pathname + "/", r = Math.round(window.scrollX),
                o = Math.round(window.scrollY);
            document.cookie = "".concat($).concat(r, ",").concat(o, ";path=").concat(n, ";max-age=5"), window.location.reload()
        } else {
            j = [window.scrollX, window.scrollY], z = window.location.hash;
            var i = window.location.href, s = z ? window.location.pathname + window.location.search : i;
            (0, x.Vn)(s, {action: "replace"}), t && (0, T.v2)()
        }
    }), document.addEventListener("turbo:load", (function () {
        return e = void 0, n = void 0, o = function () {
            var e, n, r, o, i, h, p, f, v, b;
            return function (e, t) {
                var n, r, o, i, s = {
                    label: 0, sent: function () {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    }, trys: [], ops: []
                };
                return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                    return this
                }), i;

                function a(a) {
                    return function (l) {
                        return function (a) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                                if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                                switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        o = a;
                                        break;
                                    case 4:
                                        return s.label++, {value: a[1], done: !1};
                                    case 5:
                                        s.label++, r = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                            s.label = a[1];
                                            break
                                        }
                                        if (6 === a[0] && s.label < o[1]) {
                                            s.label = o[1], o = a;
                                            break
                                        }
                                        if (o && s.label < o[2]) {
                                            s.label = o[2], s.ops.push(a);
                                            break
                                        }
                                        o[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                a = t.call(e, s)
                            } catch (e) {
                                a = [6, e], r = 0
                            } finally {
                                n = o = 0
                            }
                            if (5 & a[0]) throw a[1];
                            return {value: a[0] ? a[1] : void 0, done: !0}
                        }([a, l])
                    }
                }
            }(this, (function (w) {
                switch (w.label) {
                    case 0:
                        if (t.h.state.initialPageLoad) {
                            if (!c()) return u(V, !1), [2];
                            (function () {
                                var e, t, n, r, o;
                                return t = this, n = void 0, o = function () {
                                    var t, n, r, o, i, l, c, u, h, p, f, m, v, g, b;
                                    return function (e, t) {
                                        var n, r, o, i, s = {
                                            label: 0, sent: function () {
                                                if (1 & o[0]) throw o[1];
                                                return o[1]
                                            }, trys: [], ops: []
                                        };
                                        return i = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                                            return this
                                        }), i;

                                        function a(a) {
                                            return function (l) {
                                                return function (a) {
                                                    if (n) throw new TypeError("Generator is already executing.");
                                                    for (; i && (i = 0, a[0] && (s = 0)), s;) try {
                                                        if (n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done) return o;
                                                        switch (r = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                                                            case 0:
                                                            case 1:
                                                                o = a;
                                                                break;
                                                            case 4:
                                                                return s.label++, {value: a[1], done: !1};
                                                            case 5:
                                                                s.label++, r = a[1], a = [0];
                                                                continue;
                                                            case 7:
                                                                a = s.ops.pop(), s.trys.pop();
                                                                continue;
                                                            default:
                                                                if (!((o = (o = s.trys).length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                                    s = 0;
                                                                    continue
                                                                }
                                                                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                                    s.label = a[1];
                                                                    break
                                                                }
                                                                if (6 === a[0] && s.label < o[1]) {
                                                                    s.label = o[1], o = a;
                                                                    break
                                                                }
                                                                if (o && s.label < o[2]) {
                                                                    s.label = o[2], s.ops.push(a);
                                                                    break
                                                                }
                                                                o[2] && s.ops.pop(), s.trys.pop();
                                                                continue
                                                        }
                                                        a = t.call(e, s)
                                                    } catch (e) {
                                                        a = [6, e], r = 0
                                                    } finally {
                                                        n = o = 0
                                                    }
                                                    if (5 & a[0]) throw a[1];
                                                    return {value: a[0] ? a[1] : void 0, done: !0}
                                                }([a, l])
                                            }
                                        }
                                    }(this, (function (y) {
                                        switch (y.label) {
                                            case 0:
                                                if (!(t = d())) return [2, !1];
                                                for (n = parseInt(t.checksum.slice(0, -5) || "0"), r = atob(t.signature), o = [], g = 0; g < r.length; ++g) o.push(r.charCodeAt(g));
                                                for (i = [s().id, s().base, s().host, n.toString()], l = 0, c = s().sidebar; l < c.length; l++) u = c[l], i.push(null !== (e = u.l) && void 0 !== e ? e : u.n);
                                                return i.push(t.fingerprint), h = i.join(""), p = new TextEncoder, f = new TextDecoder, [4, crypto.subtle.digest("SHA-256", p.encode(h))];
                                            case 1:
                                                for (m = y.sent(), v = [48, 71, 48, 115, 103, 125, 49, 133, 75, 132, 137, 14, 25, 65, 99, 18, 116, 124, 42, 116, 85, 72, 11, 45, 125, 183, 150, 91, 96, 33, 111, 30, 32, 103, 88, 212, 96, 188, 182, 160, 83, 67, 148, 88, 185, 171, 117, 178, 221, 234, 50, 86, 254, 60, 165, 240, 3, 106, 69, 30, 235, 147, 143, 222, 64, 97, 80, 223, 163, 20, 180, 16, 45, 166, 117, 156, 157, 202, 217, 232, 216, 165, 93, 4, 176, 78, 44, 97, 133, 2, 3, 1, 0, 1], g = a.u.length + a.bT.length; g > 0; --g) v[g % v.length] ^= a.u[g % a.u.length] ^ a.bT[g % a.bT.length];
                                                return [4, crypto.subtle.importKey("spki", new Uint8Array(v), {name: f.decode(a.u), hash: f.decode(a.bT)}, !1, ["verify"])];
                                            case 2:
                                                return b = y.sent(), [4, crypto.subtle.verify(b.algorithm, b, new Uint8Array(o), m)];
                                            case 3:
                                                return [2, y.sent()]
                                        }
                                    }))
                                }, new ((r = void 0) || (r = Promise))((function (e, i) {
                                    function s(e) {
                                        try {
                                            l(o.next(e))
                                        } catch (e) {
                                            i(e)
                                        }
                                    }

                                    function a(e) {
                                        try {
                                            l(o.throw(e))
                                        } catch (e) {
                                            i(e)
                                        }
                                    }

                                    function l(t) {
                                        var n;
                                        t.done ? e(t.value) : (n = t.value, n instanceof r ? n : new r((function (e) {
                                            e(n)
                                        }))).then(s, a)
                                    }

                                    l((o = o.apply(t, n || [])).next())
                                }))
                            })().then((function (e) {
                                return u(V, e, !0)
                            }))
                        } else V.unmount();
                        return (e = document.getElementById("protected-content")) ? (n = document.getElementById("docs-app")) ? (r = n.outerHTML, [4, F(e, (function () {
                            q()
                        }), (function () {
                            V.unmount(), n.outerHTML = r
                        }))]) : [3, 2] : [3, 3];
                    case 1:
                        w.sent(), w.label = 2;
                    case 2:
                        return [3, 4];
                    case 3:
                        q(), w.label = 4;
                    case 4:
                        return l((function (e) {
                            return u(V, e)
                        })), (null === (v = null === (f = window.retype) || void 0 === f ? void 0 : f.editor) || void 0 === v ? void 0 : v.initView) && window.retype.editor.initView(), (null == (o = m()()) ? void 0 : o.hasPrism) && (0, L.b)("prism-js", y(), (function (e) {
                            return null == e ? void 0 : e.initPrism()
                        })), (null == o ? void 0 : o.hasMermaid) && (0, L.b)("mermaid-js", g(), (function (e) {
                            return null == e ? void 0 : e.initMermaid()
                        })), (null == o ? void 0 : o.hasMath) && (0, L.b)("katex-js", k(), (function (e) {
                            return null == e ? void 0 : e.initKatex()
                        })), document.querySelectorAll(".scrollbar").forEach((function (e) {
                            e.classList.remove("overflow-hidden"), new A.Z(e)
                        })), z && (history.replaceState(history.state, document.title, window.location.pathname + z + window.location.search), z = null), i = !1, j ? (window.scrollTo.apply(window, j), j = null, i = !0) : t.h.state.initialPageLoad && (h = null === (b = document.cookie.split(";").find((function (e) {
                            return e.trim().startsWith($)
                        }))) || void 0 === b ? void 0 : b.trim()) && (p = h.slice(15).split(",")) && 2 == p.length && /^\d+$/.test(p[0]) && /^\d+$/.test(p[1]) && (t.h.state.isScrollPositionRestored = !0, setTimeout((function () {
                            t.h.state.isScrollPositionRestored = !1
                        }), 3e3), window.scrollTo(Number.parseInt(p[0]), Number.parseInt(p[1])), i = !0), i && x.ry.currentVisit && (x.ry.currentVisit.scrolled = !0), t.h.actions.updateMemberFilter(""), t.h.actions.updateSearchQuery(""), [2]
                }
            }))
        }, new ((r = void 0) || (r = Promise))((function (t, i) {
            function s(e) {
                try {
                    l(o.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    l(o.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var n;
                e.done ? t(e.value) : (n = e.value, n instanceof r ? n : new r((function (e) {
                    e(n)
                }))).then(s, a)
            }

            l((o = o.apply(e, n || [])).next())
        }));
        var e, n, r, o
    })), window.addEventListener("beforeunload", (function () {
        t.h.state.unloading = !0
    }))
})()
})
();