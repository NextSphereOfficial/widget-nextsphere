var vE = { exports: {} }, Xp = {}, Qm = { exports: {} }, yt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XR;
function K_() {
  if (XR) return yt;
  XR = 1;
  var J = Symbol.for("react.element"), W = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), qe = Symbol.for("react.strict_mode"), ct = Symbol.for("react.profiler"), gt = Symbol.for("react.provider"), S = Symbol.for("react.context"), kt = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), ce = Symbol.for("react.memo"), Ze = Symbol.for("react.lazy"), ee = Symbol.iterator;
  function Se(_) {
    return _ === null || typeof _ != "object" ? null : (_ = ee && _[ee] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var X = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Fe = Object.assign, Ke = {};
  function tt(_, P, He) {
    this.props = _, this.context = P, this.refs = Ke, this.updater = He || X;
  }
  tt.prototype.isReactComponent = {}, tt.prototype.setState = function(_, P) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, P, "setState");
  }, tt.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function cn() {
  }
  cn.prototype = tt.prototype;
  function vt(_, P, He) {
    this.props = _, this.context = P, this.refs = Ke, this.updater = He || X;
  }
  var Ye = vt.prototype = new cn();
  Ye.constructor = vt, Fe(Ye, tt.prototype), Ye.isPureReactComponent = !0;
  var ht = Array.isArray, be = Object.prototype.hasOwnProperty, ft = { current: null }, je = { key: !0, ref: !0, __self: !0, __source: !0 };
  function rn(_, P, He) {
    var Ue, lt = {}, nt = null, Je = null;
    if (P != null) for (Ue in P.ref !== void 0 && (Je = P.ref), P.key !== void 0 && (nt = "" + P.key), P) be.call(P, Ue) && !je.hasOwnProperty(Ue) && (lt[Ue] = P[Ue]);
    var rt = arguments.length - 2;
    if (rt === 1) lt.children = He;
    else if (1 < rt) {
      for (var ut = Array(rt), Vt = 0; Vt < rt; Vt++) ut[Vt] = arguments[Vt + 2];
      lt.children = ut;
    }
    if (_ && _.defaultProps) for (Ue in rt = _.defaultProps, rt) lt[Ue] === void 0 && (lt[Ue] = rt[Ue]);
    return { $$typeof: J, type: _, key: nt, ref: Je, props: lt, _owner: ft.current };
  }
  function jt(_, P) {
    return { $$typeof: J, type: _.type, key: P, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function Xt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === J;
  }
  function an(_) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(He) {
      return P[He];
    });
  }
  var xt = /\/+/g;
  function De(_, P) {
    return typeof _ == "object" && _ !== null && _.key != null ? an("" + _.key) : P.toString(36);
  }
  function At(_, P, He, Ue, lt) {
    var nt = typeof _;
    (nt === "undefined" || nt === "boolean") && (_ = null);
    var Je = !1;
    if (_ === null) Je = !0;
    else switch (nt) {
      case "string":
      case "number":
        Je = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case J:
          case W:
            Je = !0;
        }
    }
    if (Je) return Je = _, lt = lt(Je), _ = Ue === "" ? "." + De(Je, 0) : Ue, ht(lt) ? (He = "", _ != null && (He = _.replace(xt, "$&/") + "/"), At(lt, P, He, "", function(Vt) {
      return Vt;
    })) : lt != null && (Xt(lt) && (lt = jt(lt, He + (!lt.key || Je && Je.key === lt.key ? "" : ("" + lt.key).replace(xt, "$&/") + "/") + _)), P.push(lt)), 1;
    if (Je = 0, Ue = Ue === "" ? "." : Ue + ":", ht(_)) for (var rt = 0; rt < _.length; rt++) {
      nt = _[rt];
      var ut = Ue + De(nt, rt);
      Je += At(nt, P, He, ut, lt);
    }
    else if (ut = Se(_), typeof ut == "function") for (_ = ut.call(_), rt = 0; !(nt = _.next()).done; ) nt = nt.value, ut = Ue + De(nt, rt++), Je += At(nt, P, He, ut, lt);
    else if (nt === "object") throw P = String(_), Error("Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead.");
    return Je;
  }
  function bt(_, P, He) {
    if (_ == null) return _;
    var Ue = [], lt = 0;
    return At(_, Ue, "", "", function(nt) {
      return P.call(He, nt, lt++);
    }), Ue;
  }
  function Dt(_) {
    if (_._status === -1) {
      var P = _._result;
      P = P(), P.then(function(He) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = He);
      }, function(He) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = He);
      }), _._status === -1 && (_._status = 0, _._result = P);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var Ce = { current: null }, Z = { transition: null }, Re = { ReactCurrentDispatcher: Ce, ReactCurrentBatchConfig: Z, ReactCurrentOwner: ft };
  function re() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return yt.Children = { map: bt, forEach: function(_, P, He) {
    bt(_, function() {
      P.apply(this, arguments);
    }, He);
  }, count: function(_) {
    var P = 0;
    return bt(_, function() {
      P++;
    }), P;
  }, toArray: function(_) {
    return bt(_, function(P) {
      return P;
    }) || [];
  }, only: function(_) {
    if (!Xt(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, yt.Component = tt, yt.Fragment = A, yt.Profiler = ct, yt.PureComponent = vt, yt.StrictMode = qe, yt.Suspense = oe, yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, yt.act = re, yt.cloneElement = function(_, P, He) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Ue = Fe({}, _.props), lt = _.key, nt = _.ref, Je = _._owner;
    if (P != null) {
      if (P.ref !== void 0 && (nt = P.ref, Je = ft.current), P.key !== void 0 && (lt = "" + P.key), _.type && _.type.defaultProps) var rt = _.type.defaultProps;
      for (ut in P) be.call(P, ut) && !je.hasOwnProperty(ut) && (Ue[ut] = P[ut] === void 0 && rt !== void 0 ? rt[ut] : P[ut]);
    }
    var ut = arguments.length - 2;
    if (ut === 1) Ue.children = He;
    else if (1 < ut) {
      rt = Array(ut);
      for (var Vt = 0; Vt < ut; Vt++) rt[Vt] = arguments[Vt + 2];
      Ue.children = rt;
    }
    return { $$typeof: J, type: _.type, key: lt, ref: nt, props: Ue, _owner: Je };
  }, yt.createContext = function(_) {
    return _ = { $$typeof: S, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: gt, _context: _ }, _.Consumer = _;
  }, yt.createElement = rn, yt.createFactory = function(_) {
    var P = rn.bind(null, _);
    return P.type = _, P;
  }, yt.createRef = function() {
    return { current: null };
  }, yt.forwardRef = function(_) {
    return { $$typeof: kt, render: _ };
  }, yt.isValidElement = Xt, yt.lazy = function(_) {
    return { $$typeof: Ze, _payload: { _status: -1, _result: _ }, _init: Dt };
  }, yt.memo = function(_, P) {
    return { $$typeof: ce, type: _, compare: P === void 0 ? null : P };
  }, yt.startTransition = function(_) {
    var P = Z.transition;
    Z.transition = {};
    try {
      _();
    } finally {
      Z.transition = P;
    }
  }, yt.unstable_act = re, yt.useCallback = function(_, P) {
    return Ce.current.useCallback(_, P);
  }, yt.useContext = function(_) {
    return Ce.current.useContext(_);
  }, yt.useDebugValue = function() {
  }, yt.useDeferredValue = function(_) {
    return Ce.current.useDeferredValue(_);
  }, yt.useEffect = function(_, P) {
    return Ce.current.useEffect(_, P);
  }, yt.useId = function() {
    return Ce.current.useId();
  }, yt.useImperativeHandle = function(_, P, He) {
    return Ce.current.useImperativeHandle(_, P, He);
  }, yt.useInsertionEffect = function(_, P) {
    return Ce.current.useInsertionEffect(_, P);
  }, yt.useLayoutEffect = function(_, P) {
    return Ce.current.useLayoutEffect(_, P);
  }, yt.useMemo = function(_, P) {
    return Ce.current.useMemo(_, P);
  }, yt.useReducer = function(_, P, He) {
    return Ce.current.useReducer(_, P, He);
  }, yt.useRef = function(_) {
    return Ce.current.useRef(_);
  }, yt.useState = function(_) {
    return Ce.current.useState(_);
  }, yt.useSyncExternalStore = function(_, P, He) {
    return Ce.current.useSyncExternalStore(_, P, He);
  }, yt.useTransition = function() {
    return Ce.current.useTransition();
  }, yt.version = "18.3.1", yt;
}
var Jp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Jp.exports;
var ZR;
function X_() {
  return ZR || (ZR = 1, function(J, W) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var A = "18.3.1", qe = Symbol.for("react.element"), ct = Symbol.for("react.portal"), gt = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), kt = Symbol.for("react.profiler"), oe = Symbol.for("react.provider"), ce = Symbol.for("react.context"), Ze = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), Se = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), Fe = Symbol.for("react.lazy"), Ke = Symbol.for("react.offscreen"), tt = Symbol.iterator, cn = "@@iterator";
      function vt(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = tt && h[tt] || h[cn];
        return typeof C == "function" ? C : null;
      }
      var Ye = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ht = {
        transition: null
      }, be = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ft = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, je = {}, rn = null;
      function jt(h) {
        rn = h;
      }
      je.setExtraStackFrame = function(h) {
        rn = h;
      }, je.getCurrentStack = null, je.getStackAddendum = function() {
        var h = "";
        rn && (h += rn);
        var C = je.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Xt = !1, an = !1, xt = !1, De = !1, At = !1, bt = {
        ReactCurrentDispatcher: Ye,
        ReactCurrentBatchConfig: ht,
        ReactCurrentOwner: ft
      };
      bt.ReactDebugCurrentFrame = je, bt.ReactCurrentActQueue = be;
      function Dt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          Z("warn", h, N);
        }
      }
      function Ce(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          Z("error", h, N);
        }
      }
      function Z(h, C, N) {
        {
          var F = bt.ReactDebugCurrentFrame, K = F.getStackAddendum();
          K !== "" && (C += "%s", N = N.concat([K]));
          var Oe = N.map(function(ae) {
            return String(ae);
          });
          Oe.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Oe);
        }
      }
      var Re = {};
      function re(h, C) {
        {
          var N = h.constructor, F = N && (N.displayName || N.name) || "ReactClass", K = F + "." + C;
          if (Re[K])
            return;
          Ce("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, F), Re[K] = !0;
        }
      }
      var _ = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, N) {
          re(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, N, F) {
          re(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, N, F) {
          re(h, "setState");
        }
      }, P = Object.assign, He = {};
      Object.freeze(He);
      function Ue(h, C, N) {
        this.props = h, this.context = C, this.refs = He, this.updater = N || _;
      }
      Ue.prototype.isReactComponent = {}, Ue.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ue.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var lt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, nt = function(h, C) {
          Object.defineProperty(Ue.prototype, h, {
            get: function() {
              Dt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var Je in lt)
          lt.hasOwnProperty(Je) && nt(Je, lt[Je]);
      }
      function rt() {
      }
      rt.prototype = Ue.prototype;
      function ut(h, C, N) {
        this.props = h, this.context = C, this.refs = He, this.updater = N || _;
      }
      var Vt = ut.prototype = new rt();
      Vt.constructor = ut, P(Vt, Ue.prototype), Vt.isPureReactComponent = !0;
      function Dn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var xr = Array.isArray;
      function En(h) {
        return xr(h);
      }
      function tr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Pn(h) {
        try {
          return Vn(h), !1;
        } catch {
          return !0;
        }
      }
      function Vn(h) {
        return "" + h;
      }
      function Ir(h) {
        if (Pn(h))
          return Ce("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(h)), Vn(h);
      }
      function si(h, C, N) {
        var F = h.displayName;
        if (F)
          return F;
        var K = C.displayName || C.name || "";
        return K !== "" ? N + "(" + K + ")" : N;
      }
      function oa(h) {
        return h.displayName || "Context";
      }
      function Gn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Ce("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case gt:
            return "Fragment";
          case ct:
            return "Portal";
          case kt:
            return "Profiler";
          case S:
            return "StrictMode";
          case ee:
            return "Suspense";
          case Se:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ce:
              var C = h;
              return oa(C) + ".Consumer";
            case oe:
              var N = h;
              return oa(N._context) + ".Provider";
            case Ze:
              return si(h, h.render, "ForwardRef");
            case X:
              var F = h.displayName || null;
              return F !== null ? F : Gn(h.type) || "Memo";
            case Fe: {
              var K = h, Oe = K._payload, ae = K._init;
              try {
                return Gn(ae(Oe));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, yr, Ia, On;
      On = {};
      function gr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function sa(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ya(h, C) {
        var N = function() {
          yr || (yr = !0, Ce("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function ci(h, C) {
        var N = function() {
          Ia || (Ia = !0, Ce("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function te(h) {
        if (typeof h.ref == "string" && ft.current && h.__self && ft.current.stateNode !== h.__self) {
          var C = Gn(ft.current.type);
          On[C] || (Ce('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), On[C] = !0);
        }
      }
      var Te = function(h, C, N, F, K, Oe, ae) {
        var Ne = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: qe,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: ae,
          // Record the component responsible for creating this element.
          _owner: Oe
        };
        return Ne._store = {}, Object.defineProperty(Ne._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ne, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: F
        }), Object.defineProperty(Ne, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: K
        }), Object.freeze && (Object.freeze(Ne.props), Object.freeze(Ne)), Ne;
      };
      function at(h, C, N) {
        var F, K = {}, Oe = null, ae = null, Ne = null, pt = null;
        if (C != null) {
          gr(C) && (ae = C.ref, te(C)), sa(C) && (Ir(C.key), Oe = "" + C.key), Ne = C.__self === void 0 ? null : C.__self, pt = C.__source === void 0 ? null : C.__source;
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (K[F] = C[F]);
        }
        var wt = arguments.length - 2;
        if (wt === 1)
          K.children = N;
        else if (wt > 1) {
          for (var tn = Array(wt), Yt = 0; Yt < wt; Yt++)
            tn[Yt] = arguments[Yt + 2];
          Object.freeze && Object.freeze(tn), K.children = tn;
        }
        if (h && h.defaultProps) {
          var it = h.defaultProps;
          for (F in it)
            K[F] === void 0 && (K[F] = it[F]);
        }
        if (Oe || ae) {
          var Qt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Oe && Ya(K, Qt), ae && ci(K, Qt);
        }
        return Te(h, Oe, ae, Ne, pt, ft.current, K);
      }
      function Ft(h, C) {
        var N = Te(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function Zt(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var F, K = P({}, h.props), Oe = h.key, ae = h.ref, Ne = h._self, pt = h._source, wt = h._owner;
        if (C != null) {
          gr(C) && (ae = C.ref, wt = ft.current), sa(C) && (Ir(C.key), Oe = "" + C.key);
          var tn;
          h.type && h.type.defaultProps && (tn = h.type.defaultProps);
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (C[F] === void 0 && tn !== void 0 ? K[F] = tn[F] : K[F] = C[F]);
        }
        var Yt = arguments.length - 2;
        if (Yt === 1)
          K.children = N;
        else if (Yt > 1) {
          for (var it = Array(Yt), Qt = 0; Qt < Yt; Qt++)
            it[Qt] = arguments[Qt + 2];
          K.children = it;
        }
        return Te(h.type, Oe, ae, Ne, pt, wt, K);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === qe;
      }
      var ln = ".", qn = ":";
      function Jt(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, F = h.replace(C, function(K) {
          return N[K];
        });
        return "$" + F;
      }
      var Bt = !1, $t = /\/+/g;
      function ca(h) {
        return h.replace($t, "$&/");
      }
      function Sr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? (Ir(h.key), Jt("" + h.key)) : C.toString(36);
      }
      function Ta(h, C, N, F, K) {
        var Oe = typeof h;
        (Oe === "undefined" || Oe === "boolean") && (h = null);
        var ae = !1;
        if (h === null)
          ae = !0;
        else
          switch (Oe) {
            case "string":
            case "number":
              ae = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case qe:
                case ct:
                  ae = !0;
              }
          }
        if (ae) {
          var Ne = h, pt = K(Ne), wt = F === "" ? ln + Sr(Ne, 0) : F;
          if (En(pt)) {
            var tn = "";
            wt != null && (tn = ca(wt) + "/"), Ta(pt, C, tn, "", function(qf) {
              return qf;
            });
          } else pt != null && (pn(pt) && (pt.key && (!Ne || Ne.key !== pt.key) && Ir(pt.key), pt = Ft(
            pt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (pt.key && (!Ne || Ne.key !== pt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ca("" + pt.key) + "/"
            ) : "") + wt
          )), C.push(pt));
          return 1;
        }
        var Yt, it, Qt = 0, vn = F === "" ? ln : F + qn;
        if (En(h))
          for (var Cl = 0; Cl < h.length; Cl++)
            Yt = h[Cl], it = vn + Sr(Yt, Cl), Qt += Ta(Yt, C, N, it, K);
        else {
          var qo = vt(h);
          if (typeof qo == "function") {
            var Vi = h;
            qo === Vi.entries && (Bt || Dt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Bt = !0);
            for (var Ko = qo.call(Vi), uu, Gf = 0; !(uu = Ko.next()).done; )
              Yt = uu.value, it = vn + Sr(Yt, Gf++), Qt += Ta(Yt, C, N, it, K);
          } else if (Oe === "object") {
            var oc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (oc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : oc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Qt;
      }
      function ji(h, C, N) {
        if (h == null)
          return h;
        var F = [], K = 0;
        return Ta(h, F, "", "", function(Oe) {
          return C.call(N, Oe, K++);
        }), F;
      }
      function Zl(h) {
        var C = 0;
        return ji(h, function() {
          C++;
        }), C;
      }
      function Jl(h, C, N) {
        ji(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function dl(h) {
        return ji(h, function(C) {
          return C;
        }) || [];
      }
      function pl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function eu(h) {
        var C = {
          $$typeof: ce,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: oe,
          _context: C
        };
        var N = !1, F = !1, K = !1;
        {
          var Oe = {
            $$typeof: ce,
            _context: C
          };
          Object.defineProperties(Oe, {
            Provider: {
              get: function() {
                return F || (F = !0, Ce("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(ae) {
                C.Provider = ae;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(ae) {
                C._currentValue = ae;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(ae) {
                C._currentValue2 = ae;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(ae) {
                C._threadCount = ae;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, Ce("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(ae) {
                K || (Dt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ae), K = !0);
              }
            }
          }), C.Consumer = Oe;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var br = -1, _r = 0, nr = 1, fi = 2;
      function Qa(h) {
        if (h._status === br) {
          var C = h._result, N = C();
          if (N.then(function(Oe) {
            if (h._status === _r || h._status === br) {
              var ae = h;
              ae._status = nr, ae._result = Oe;
            }
          }, function(Oe) {
            if (h._status === _r || h._status === br) {
              var ae = h;
              ae._status = fi, ae._result = Oe;
            }
          }), h._status === br) {
            var F = h;
            F._status = _r, F._result = N;
          }
        }
        if (h._status === nr) {
          var K = h._result;
          return K === void 0 && Ce(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, K), "default" in K || Ce(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, K), K.default;
        } else
          throw h._result;
      }
      function di(h) {
        var C = {
          // We use these fields to store the result.
          _status: br,
          _result: h
        }, N = {
          $$typeof: Fe,
          _payload: C,
          _init: Qa
        };
        {
          var F, K;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return F;
              },
              set: function(Oe) {
                Ce("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Oe, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return K;
              },
              set: function(Oe) {
                Ce("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = Oe, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function pi(h) {
        h != null && h.$$typeof === X ? Ce("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Ce("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Ce("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Ce("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: Ze,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(F) {
              N = F, !h.name && !h.displayName && (h.displayName = F);
            }
          });
        }
        return C;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function B(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === gt || h === kt || At || h === S || h === ee || h === Se || De || h === Ke || Xt || an || xt || typeof h == "object" && h !== null && (h.$$typeof === Fe || h.$$typeof === X || h.$$typeof === oe || h.$$typeof === ce || h.$$typeof === Ze || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function ie(h, C) {
        B(h) || Ce("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: X,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var F;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(K) {
              F = K, !h.name && !h.displayName && (h.displayName = K);
            }
          });
        }
        return N;
      }
      function he() {
        var h = Ye.current;
        return h === null && Ce(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function We(h) {
        var C = he();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? Ce("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && Ce("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function $e(h) {
        var C = he();
        return C.useState(h);
      }
      function dt(h, C, N) {
        var F = he();
        return F.useReducer(h, C, N);
      }
      function ot(h) {
        var C = he();
        return C.useRef(h);
      }
      function Rn(h, C) {
        var N = he();
        return N.useEffect(h, C);
      }
      function en(h, C) {
        var N = he();
        return N.useInsertionEffect(h, C);
      }
      function un(h, C) {
        var N = he();
        return N.useLayoutEffect(h, C);
      }
      function rr(h, C) {
        var N = he();
        return N.useCallback(h, C);
      }
      function Wa(h, C) {
        var N = he();
        return N.useMemo(h, C);
      }
      function Ga(h, C, N) {
        var F = he();
        return F.useImperativeHandle(h, C, N);
      }
      function Ge(h, C) {
        {
          var N = he();
          return N.useDebugValue(h, C);
        }
      }
      function et() {
        var h = he();
        return h.useTransition();
      }
      function qa(h) {
        var C = he();
        return C.useDeferredValue(h);
      }
      function tu() {
        var h = he();
        return h.useId();
      }
      function nu(h, C, N) {
        var F = he();
        return F.useSyncExternalStore(h, C, N);
      }
      var vl = 0, Qu, hl, Yr, Yo, kr, lc, uc;
      function Wu() {
      }
      Wu.__reactDisabledLog = !0;
      function ml() {
        {
          if (vl === 0) {
            Qu = console.log, hl = console.info, Yr = console.warn, Yo = console.error, kr = console.group, lc = console.groupCollapsed, uc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Wu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          vl++;
        }
      }
      function fa() {
        {
          if (vl--, vl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: P({}, h, {
                value: Qu
              }),
              info: P({}, h, {
                value: hl
              }),
              warn: P({}, h, {
                value: Yr
              }),
              error: P({}, h, {
                value: Yo
              }),
              group: P({}, h, {
                value: kr
              }),
              groupCollapsed: P({}, h, {
                value: lc
              }),
              groupEnd: P({}, h, {
                value: uc
              })
            });
          }
          vl < 0 && Ce("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ka = bt.ReactCurrentDispatcher, Xa;
      function Gu(h, C, N) {
        {
          if (Xa === void 0)
            try {
              throw Error();
            } catch (K) {
              var F = K.stack.trim().match(/\n( *(at )?)/);
              Xa = F && F[1] || "";
            }
          return `
` + Xa + h;
        }
      }
      var ru = !1, yl;
      {
        var qu = typeof WeakMap == "function" ? WeakMap : Map;
        yl = new qu();
      }
      function Ku(h, C) {
        if (!h || ru)
          return "";
        {
          var N = yl.get(h);
          if (N !== void 0)
            return N;
        }
        var F;
        ru = !0;
        var K = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Oe;
        Oe = Ka.current, Ka.current = null, ml();
        try {
          if (C) {
            var ae = function() {
              throw Error();
            };
            if (Object.defineProperty(ae.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ae, []);
              } catch (vn) {
                F = vn;
              }
              Reflect.construct(h, [], ae);
            } else {
              try {
                ae.call();
              } catch (vn) {
                F = vn;
              }
              h.call(ae.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              F = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && F && typeof vn.stack == "string") {
            for (var Ne = vn.stack.split(`
`), pt = F.stack.split(`
`), wt = Ne.length - 1, tn = pt.length - 1; wt >= 1 && tn >= 0 && Ne[wt] !== pt[tn]; )
              tn--;
            for (; wt >= 1 && tn >= 0; wt--, tn--)
              if (Ne[wt] !== pt[tn]) {
                if (wt !== 1 || tn !== 1)
                  do
                    if (wt--, tn--, tn < 0 || Ne[wt] !== pt[tn]) {
                      var Yt = `
` + Ne[wt].replace(" at new ", " at ");
                      return h.displayName && Yt.includes("<anonymous>") && (Yt = Yt.replace("<anonymous>", h.displayName)), typeof h == "function" && yl.set(h, Yt), Yt;
                    }
                  while (wt >= 1 && tn >= 0);
                break;
              }
          }
        } finally {
          ru = !1, Ka.current = Oe, fa(), Error.prepareStackTrace = K;
        }
        var it = h ? h.displayName || h.name : "", Qt = it ? Gu(it) : "";
        return typeof h == "function" && yl.set(h, Qt), Qt;
      }
      function Hi(h, C, N) {
        return Ku(h, !1);
      }
      function Qf(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Pi(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Ku(h, Qf(h));
        if (typeof h == "string")
          return Gu(h);
        switch (h) {
          case ee:
            return Gu("Suspense");
          case Se:
            return Gu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case Ze:
              return Hi(h.render);
            case X:
              return Pi(h.type, C, N);
            case Fe: {
              var F = h, K = F._payload, Oe = F._init;
              try {
                return Pi(Oe(K), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var Ot = {}, Xu = bt.ReactDebugCurrentFrame;
      function Tt(h) {
        if (h) {
          var C = h._owner, N = Pi(h.type, h._source, C ? C.type : null);
          Xu.setExtraStackFrame(N);
        } else
          Xu.setExtraStackFrame(null);
      }
      function Qo(h, C, N, F, K) {
        {
          var Oe = Function.call.bind(Cn);
          for (var ae in h)
            if (Oe(h, ae)) {
              var Ne = void 0;
              try {
                if (typeof h[ae] != "function") {
                  var pt = Error((F || "React class") + ": " + N + " type `" + ae + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[ae] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw pt.name = "Invariant Violation", pt;
                }
                Ne = h[ae](C, ae, F, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (wt) {
                Ne = wt;
              }
              Ne && !(Ne instanceof Error) && (Tt(K), Ce("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", N, ae, typeof Ne), Tt(null)), Ne instanceof Error && !(Ne.message in Ot) && (Ot[Ne.message] = !0, Tt(K), Ce("Failed %s type: %s", N, Ne.message), Tt(null));
            }
        }
      }
      function vi(h) {
        if (h) {
          var C = h._owner, N = Pi(h.type, h._source, C ? C.type : null);
          jt(N);
        } else
          jt(null);
      }
      var Be;
      Be = !1;
      function Zu() {
        if (ft.current) {
          var h = Gn(ft.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ar(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function hi(h) {
        return h != null ? ar(h.__source) : "";
      }
      var Dr = {};
      function mi(h) {
        var C = Zu();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function on(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = mi(C);
          if (!Dr[N]) {
            Dr[N] = !0;
            var F = "";
            h && h._owner && h._owner !== ft.current && (F = " It was passed a child from " + Gn(h._owner.type) + "."), vi(h), Ce('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, F), vi(null);
          }
        }
      }
      function It(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var N = 0; N < h.length; N++) {
              var F = h[N];
              pn(F) && on(F, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var K = vt(h);
            if (typeof K == "function" && K !== h.entries)
              for (var Oe = K.call(h), ae; !(ae = Oe.next()).done; )
                pn(ae.value) && on(ae.value, C);
          }
        }
      }
      function gl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === Ze || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === X))
            N = C.propTypes;
          else
            return;
          if (N) {
            var F = Gn(C);
            Qo(N, h.props, "prop", F, h);
          } else if (C.PropTypes !== void 0 && !Be) {
            Be = !0;
            var K = Gn(C);
            Ce("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Ce("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function $n(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var F = C[N];
            if (F !== "children" && F !== "key") {
              vi(h), Ce("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), vi(null);
              break;
            }
          }
          h.ref !== null && (vi(h), Ce("Invalid attribute `ref` supplied to `React.Fragment`."), vi(null));
        }
      }
      function Or(h, C, N) {
        var F = B(h);
        if (!F) {
          var K = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Oe = hi(C);
          Oe ? K += Oe : K += Zu();
          var ae;
          h === null ? ae = "null" : En(h) ? ae = "array" : h !== void 0 && h.$$typeof === qe ? (ae = "<" + (Gn(h.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : ae = typeof h, Ce("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ae, K);
        }
        var Ne = at.apply(this, arguments);
        if (Ne == null)
          return Ne;
        if (F)
          for (var pt = 2; pt < arguments.length; pt++)
            It(arguments[pt], h);
        return h === gt ? $n(Ne) : gl(Ne), Ne;
      }
      var wa = !1;
      function au(h) {
        var C = Or.bind(null, h);
        return C.type = h, wa || (wa = !0, Dt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return Dt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Wo(h, C, N) {
        for (var F = Zt.apply(this, arguments), K = 2; K < arguments.length; K++)
          It(arguments[K], F.type);
        return gl(F), F;
      }
      function Go(h, C) {
        var N = ht.transition;
        ht.transition = {};
        var F = ht.transition;
        ht.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (ht.transition = N, N === null && F._updatedFibers) {
            var K = F._updatedFibers.size;
            K > 10 && Dt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
          }
        }
      }
      var Sl = !1, iu = null;
      function Wf(h) {
        if (iu === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = J && J[C];
            iu = N.call(J, "timers").setImmediate;
          } catch {
            iu = function(K) {
              Sl === !1 && (Sl = !0, typeof MessageChannel > "u" && Ce("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Oe = new MessageChannel();
              Oe.port1.onmessage = K, Oe.port2.postMessage(void 0);
            };
          }
        return iu(h);
      }
      var xa = 0, Za = !1;
      function yi(h) {
        {
          var C = xa;
          xa++, be.current === null && (be.current = []);
          var N = be.isBatchingLegacy, F;
          try {
            if (be.isBatchingLegacy = !0, F = h(), !N && be.didScheduleLegacyUpdate) {
              var K = be.current;
              K !== null && (be.didScheduleLegacyUpdate = !1, El(K));
            }
          } catch (it) {
            throw ba(C), it;
          } finally {
            be.isBatchingLegacy = N;
          }
          if (F !== null && typeof F == "object" && typeof F.then == "function") {
            var Oe = F, ae = !1, Ne = {
              then: function(it, Qt) {
                ae = !0, Oe.then(function(vn) {
                  ba(C), xa === 0 ? Ju(vn, it, Qt) : it(vn);
                }, function(vn) {
                  ba(C), Qt(vn);
                });
              }
            };
            return !Za && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ae || (Za = !0, Ce("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ne;
          } else {
            var pt = F;
            if (ba(C), xa === 0) {
              var wt = be.current;
              wt !== null && (El(wt), be.current = null);
              var tn = {
                then: function(it, Qt) {
                  be.current === null ? (be.current = [], Ju(pt, it, Qt)) : it(pt);
                }
              };
              return tn;
            } else {
              var Yt = {
                then: function(it, Qt) {
                  it(pt);
                }
              };
              return Yt;
            }
          }
        }
      }
      function ba(h) {
        h !== xa - 1 && Ce("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), xa = h;
      }
      function Ju(h, C, N) {
        {
          var F = be.current;
          if (F !== null)
            try {
              El(F), Wf(function() {
                F.length === 0 ? (be.current = null, C(h)) : Ju(h, C, N);
              });
            } catch (K) {
              N(K);
            }
          else
            C(h);
        }
      }
      var eo = !1;
      function El(h) {
        if (!eo) {
          eo = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (F) {
            throw h = h.slice(C + 1), F;
          } finally {
            eo = !1;
          }
        }
      }
      var lu = Or, to = Wo, no = au, Ja = {
        map: ji,
        forEach: Jl,
        count: Zl,
        toArray: dl,
        only: pl
      };
      W.Children = Ja, W.Component = Ue, W.Fragment = gt, W.Profiler = kt, W.PureComponent = ut, W.StrictMode = S, W.Suspense = ee, W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bt, W.act = yi, W.cloneElement = to, W.createContext = eu, W.createElement = lu, W.createFactory = no, W.createRef = Dn, W.forwardRef = pi, W.isValidElement = pn, W.lazy = di, W.memo = ie, W.startTransition = Go, W.unstable_act = yi, W.useCallback = rr, W.useContext = We, W.useDebugValue = Ge, W.useDeferredValue = qa, W.useEffect = Rn, W.useId = tu, W.useImperativeHandle = Ga, W.useInsertionEffect = en, W.useLayoutEffect = un, W.useMemo = Wa, W.useReducer = dt, W.useRef = ot, W.useState = $e, W.useSyncExternalStore = nu, W.useTransition = et, W.version = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Jp, Jp.exports)), Jp.exports;
}
var JR;
function ev() {
  return JR || (JR = 1, process.env.NODE_ENV === "production" ? Qm.exports = K_() : Qm.exports = X_()), Qm.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function Z_() {
  if (eT) return Xp;
  eT = 1;
  var J = ev(), W = Symbol.for("react.element"), A = Symbol.for("react.fragment"), qe = Object.prototype.hasOwnProperty, ct = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, gt = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(kt, oe, ce) {
    var Ze, ee = {}, Se = null, X = null;
    ce !== void 0 && (Se = "" + ce), oe.key !== void 0 && (Se = "" + oe.key), oe.ref !== void 0 && (X = oe.ref);
    for (Ze in oe) qe.call(oe, Ze) && !gt.hasOwnProperty(Ze) && (ee[Ze] = oe[Ze]);
    if (kt && kt.defaultProps) for (Ze in oe = kt.defaultProps, oe) ee[Ze] === void 0 && (ee[Ze] = oe[Ze]);
    return { $$typeof: W, type: kt, key: Se, ref: X, props: ee, _owner: ct.current };
  }
  return Xp.Fragment = A, Xp.jsx = S, Xp.jsxs = S, Xp;
}
var Zp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tT;
function J_() {
  return tT || (tT = 1, process.env.NODE_ENV !== "production" && function() {
    var J = ev(), W = Symbol.for("react.element"), A = Symbol.for("react.portal"), qe = Symbol.for("react.fragment"), ct = Symbol.for("react.strict_mode"), gt = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), kt = Symbol.for("react.context"), oe = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), Ze = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), X = Symbol.for("react.offscreen"), Fe = Symbol.iterator, Ke = "@@iterator";
    function tt(R) {
      if (R === null || typeof R != "object")
        return null;
      var B = Fe && R[Fe] || R[Ke];
      return typeof B == "function" ? B : null;
    }
    var cn = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function vt(R) {
      {
        for (var B = arguments.length, ie = new Array(B > 1 ? B - 1 : 0), he = 1; he < B; he++)
          ie[he - 1] = arguments[he];
        Ye("error", R, ie);
      }
    }
    function Ye(R, B, ie) {
      {
        var he = cn.ReactDebugCurrentFrame, We = he.getStackAddendum();
        We !== "" && (B += "%s", ie = ie.concat([We]));
        var $e = ie.map(function(dt) {
          return String(dt);
        });
        $e.unshift("Warning: " + B), Function.prototype.apply.call(console[R], console, $e);
      }
    }
    var ht = !1, be = !1, ft = !1, je = !1, rn = !1, jt;
    jt = Symbol.for("react.module.reference");
    function Xt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === qe || R === gt || rn || R === ct || R === ce || R === Ze || je || R === X || ht || be || ft || typeof R == "object" && R !== null && (R.$$typeof === Se || R.$$typeof === ee || R.$$typeof === S || R.$$typeof === kt || R.$$typeof === oe || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === jt || R.getModuleId !== void 0));
    }
    function an(R, B, ie) {
      var he = R.displayName;
      if (he)
        return he;
      var We = B.displayName || B.name || "";
      return We !== "" ? ie + "(" + We + ")" : ie;
    }
    function xt(R) {
      return R.displayName || "Context";
    }
    function De(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && vt("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case qe:
          return "Fragment";
        case A:
          return "Portal";
        case gt:
          return "Profiler";
        case ct:
          return "StrictMode";
        case ce:
          return "Suspense";
        case Ze:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case kt:
            var B = R;
            return xt(B) + ".Consumer";
          case S:
            var ie = R;
            return xt(ie._context) + ".Provider";
          case oe:
            return an(R, R.render, "ForwardRef");
          case ee:
            var he = R.displayName || null;
            return he !== null ? he : De(R.type) || "Memo";
          case Se: {
            var We = R, $e = We._payload, dt = We._init;
            try {
              return De(dt($e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var At = Object.assign, bt = 0, Dt, Ce, Z, Re, re, _, P;
    function He() {
    }
    He.__reactDisabledLog = !0;
    function Ue() {
      {
        if (bt === 0) {
          Dt = console.log, Ce = console.info, Z = console.warn, Re = console.error, re = console.group, _ = console.groupCollapsed, P = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: He,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        bt++;
      }
    }
    function lt() {
      {
        if (bt--, bt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: At({}, R, {
              value: Dt
            }),
            info: At({}, R, {
              value: Ce
            }),
            warn: At({}, R, {
              value: Z
            }),
            error: At({}, R, {
              value: Re
            }),
            group: At({}, R, {
              value: re
            }),
            groupCollapsed: At({}, R, {
              value: _
            }),
            groupEnd: At({}, R, {
              value: P
            })
          });
        }
        bt < 0 && vt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var nt = cn.ReactCurrentDispatcher, Je;
    function rt(R, B, ie) {
      {
        if (Je === void 0)
          try {
            throw Error();
          } catch (We) {
            var he = We.stack.trim().match(/\n( *(at )?)/);
            Je = he && he[1] || "";
          }
        return `
` + Je + R;
      }
    }
    var ut = !1, Vt;
    {
      var Dn = typeof WeakMap == "function" ? WeakMap : Map;
      Vt = new Dn();
    }
    function xr(R, B) {
      if (!R || ut)
        return "";
      {
        var ie = Vt.get(R);
        if (ie !== void 0)
          return ie;
      }
      var he;
      ut = !0;
      var We = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $e;
      $e = nt.current, nt.current = null, Ue();
      try {
        if (B) {
          var dt = function() {
            throw Error();
          };
          if (Object.defineProperty(dt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(dt, []);
            } catch (Ge) {
              he = Ge;
            }
            Reflect.construct(R, [], dt);
          } else {
            try {
              dt.call();
            } catch (Ge) {
              he = Ge;
            }
            R.call(dt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ge) {
            he = Ge;
          }
          R();
        }
      } catch (Ge) {
        if (Ge && he && typeof Ge.stack == "string") {
          for (var ot = Ge.stack.split(`
`), Rn = he.stack.split(`
`), en = ot.length - 1, un = Rn.length - 1; en >= 1 && un >= 0 && ot[en] !== Rn[un]; )
            un--;
          for (; en >= 1 && un >= 0; en--, un--)
            if (ot[en] !== Rn[un]) {
              if (en !== 1 || un !== 1)
                do
                  if (en--, un--, un < 0 || ot[en] !== Rn[un]) {
                    var rr = `
` + ot[en].replace(" at new ", " at ");
                    return R.displayName && rr.includes("<anonymous>") && (rr = rr.replace("<anonymous>", R.displayName)), typeof R == "function" && Vt.set(R, rr), rr;
                  }
                while (en >= 1 && un >= 0);
              break;
            }
        }
      } finally {
        ut = !1, nt.current = $e, lt(), Error.prepareStackTrace = We;
      }
      var Wa = R ? R.displayName || R.name : "", Ga = Wa ? rt(Wa) : "";
      return typeof R == "function" && Vt.set(R, Ga), Ga;
    }
    function En(R, B, ie) {
      return xr(R, !1);
    }
    function tr(R) {
      var B = R.prototype;
      return !!(B && B.isReactComponent);
    }
    function Pn(R, B, ie) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return xr(R, tr(R));
      if (typeof R == "string")
        return rt(R);
      switch (R) {
        case ce:
          return rt("Suspense");
        case Ze:
          return rt("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case oe:
            return En(R.render);
          case ee:
            return Pn(R.type, B, ie);
          case Se: {
            var he = R, We = he._payload, $e = he._init;
            try {
              return Pn($e(We), B, ie);
            } catch {
            }
          }
        }
      return "";
    }
    var Vn = Object.prototype.hasOwnProperty, Ir = {}, si = cn.ReactDebugCurrentFrame;
    function oa(R) {
      if (R) {
        var B = R._owner, ie = Pn(R.type, R._source, B ? B.type : null);
        si.setExtraStackFrame(ie);
      } else
        si.setExtraStackFrame(null);
    }
    function Gn(R, B, ie, he, We) {
      {
        var $e = Function.call.bind(Vn);
        for (var dt in R)
          if ($e(R, dt)) {
            var ot = void 0;
            try {
              if (typeof R[dt] != "function") {
                var Rn = Error((he || "React class") + ": " + ie + " type `" + dt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[dt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Rn.name = "Invariant Violation", Rn;
              }
              ot = R[dt](B, dt, he, ie, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (en) {
              ot = en;
            }
            ot && !(ot instanceof Error) && (oa(We), vt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", he || "React class", ie, dt, typeof ot), oa(null)), ot instanceof Error && !(ot.message in Ir) && (Ir[ot.message] = !0, oa(We), vt("Failed %s type: %s", ie, ot.message), oa(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function yr(R) {
      {
        var B = typeof Symbol == "function" && Symbol.toStringTag, ie = B && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ie;
      }
    }
    function Ia(R) {
      try {
        return On(R), !1;
      } catch {
        return !0;
      }
    }
    function On(R) {
      return "" + R;
    }
    function gr(R) {
      if (Ia(R))
        return vt("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yr(R)), On(R);
    }
    var sa = cn.ReactCurrentOwner, Ya = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ci, te;
    function Te(R) {
      if (Vn.call(R, "ref")) {
        var B = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function at(R) {
      if (Vn.call(R, "key")) {
        var B = Object.getOwnPropertyDescriptor(R, "key").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function Ft(R, B) {
      typeof R.ref == "string" && sa.current;
    }
    function Zt(R, B) {
      {
        var ie = function() {
          ci || (ci = !0, vt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ie.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ie,
          configurable: !0
        });
      }
    }
    function pn(R, B) {
      {
        var ie = function() {
          te || (te = !0, vt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ie.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ie,
          configurable: !0
        });
      }
    }
    var ln = function(R, B, ie, he, We, $e, dt) {
      var ot = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: W,
        // Built-in properties that belong on the element
        type: R,
        key: B,
        ref: ie,
        props: dt,
        // Record the component responsible for creating this element.
        _owner: $e
      };
      return ot._store = {}, Object.defineProperty(ot._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ot, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.defineProperty(ot, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: We
      }), Object.freeze && (Object.freeze(ot.props), Object.freeze(ot)), ot;
    };
    function qn(R, B, ie, he, We) {
      {
        var $e, dt = {}, ot = null, Rn = null;
        ie !== void 0 && (gr(ie), ot = "" + ie), at(B) && (gr(B.key), ot = "" + B.key), Te(B) && (Rn = B.ref, Ft(B, We));
        for ($e in B)
          Vn.call(B, $e) && !Ya.hasOwnProperty($e) && (dt[$e] = B[$e]);
        if (R && R.defaultProps) {
          var en = R.defaultProps;
          for ($e in en)
            dt[$e] === void 0 && (dt[$e] = en[$e]);
        }
        if (ot || Rn) {
          var un = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          ot && Zt(dt, un), Rn && pn(dt, un);
        }
        return ln(R, ot, Rn, We, he, sa.current, dt);
      }
    }
    var Jt = cn.ReactCurrentOwner, Bt = cn.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var B = R._owner, ie = Pn(R.type, R._source, B ? B.type : null);
        Bt.setExtraStackFrame(ie);
      } else
        Bt.setExtraStackFrame(null);
    }
    var ca;
    ca = !1;
    function Sr(R) {
      return typeof R == "object" && R !== null && R.$$typeof === W;
    }
    function Ta() {
      {
        if (Jt.current) {
          var R = De(Jt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function ji(R) {
      return "";
    }
    var Zl = {};
    function Jl(R) {
      {
        var B = Ta();
        if (!B) {
          var ie = typeof R == "string" ? R : R.displayName || R.name;
          ie && (B = `

Check the top-level render call using <` + ie + ">.");
        }
        return B;
      }
    }
    function dl(R, B) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ie = Jl(B);
        if (Zl[ie])
          return;
        Zl[ie] = !0;
        var he = "";
        R && R._owner && R._owner !== Jt.current && (he = " It was passed a child from " + De(R._owner.type) + "."), $t(R), vt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ie, he), $t(null);
      }
    }
    function pl(R, B) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var ie = 0; ie < R.length; ie++) {
            var he = R[ie];
            Sr(he) && dl(he, B);
          }
        else if (Sr(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var We = tt(R);
          if (typeof We == "function" && We !== R.entries)
            for (var $e = We.call(R), dt; !(dt = $e.next()).done; )
              Sr(dt.value) && dl(dt.value, B);
        }
      }
    }
    function eu(R) {
      {
        var B = R.type;
        if (B == null || typeof B == "string")
          return;
        var ie;
        if (typeof B == "function")
          ie = B.propTypes;
        else if (typeof B == "object" && (B.$$typeof === oe || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        B.$$typeof === ee))
          ie = B.propTypes;
        else
          return;
        if (ie) {
          var he = De(B);
          Gn(ie, R.props, "prop", he, R);
        } else if (B.PropTypes !== void 0 && !ca) {
          ca = !0;
          var We = De(B);
          vt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
        }
        typeof B.getDefaultProps == "function" && !B.getDefaultProps.isReactClassApproved && vt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function br(R) {
      {
        for (var B = Object.keys(R.props), ie = 0; ie < B.length; ie++) {
          var he = B[ie];
          if (he !== "children" && he !== "key") {
            $t(R), vt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", he), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), vt("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var _r = {};
    function nr(R, B, ie, he, We, $e) {
      {
        var dt = Xt(R);
        if (!dt) {
          var ot = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (ot += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Rn = ji();
          Rn ? ot += Rn : ot += Ta();
          var en;
          R === null ? en = "null" : Bn(R) ? en = "array" : R !== void 0 && R.$$typeof === W ? (en = "<" + (De(R.type) || "Unknown") + " />", ot = " Did you accidentally export a JSX literal instead of a component?") : en = typeof R, vt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", en, ot);
        }
        var un = qn(R, B, ie, We, $e);
        if (un == null)
          return un;
        if (dt) {
          var rr = B.children;
          if (rr !== void 0)
            if (he)
              if (Bn(rr)) {
                for (var Wa = 0; Wa < rr.length; Wa++)
                  pl(rr[Wa], R);
                Object.freeze && Object.freeze(rr);
              } else
                vt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pl(rr, R);
        }
        if (Vn.call(B, "key")) {
          var Ga = De(R), Ge = Object.keys(B).filter(function(tu) {
            return tu !== "key";
          }), et = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_r[Ga + et]) {
            var qa = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            vt(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, et, Ga, qa, Ga), _r[Ga + et] = !0;
          }
        }
        return R === qe ? br(un) : eu(un), un;
      }
    }
    function fi(R, B, ie) {
      return nr(R, B, ie, !0);
    }
    function Qa(R, B, ie) {
      return nr(R, B, ie, !1);
    }
    var di = Qa, pi = fi;
    Zp.Fragment = qe, Zp.jsx = di, Zp.jsxs = pi;
  }()), Zp;
}
process.env.NODE_ENV === "production" ? vE.exports = Z_() : vE.exports = J_();
var wr = vE.exports, hE = { exports: {} }, Ba = {}, Wm = { exports: {} }, fE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nT;
function ek() {
  return nT || (nT = 1, function(J) {
    function W(Z, Re) {
      var re = Z.length;
      Z.push(Re);
      e: for (; 0 < re; ) {
        var _ = re - 1 >>> 1, P = Z[_];
        if (0 < ct(P, Re)) Z[_] = Re, Z[re] = P, re = _;
        else break e;
      }
    }
    function A(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function qe(Z) {
      if (Z.length === 0) return null;
      var Re = Z[0], re = Z.pop();
      if (re !== Re) {
        Z[0] = re;
        e: for (var _ = 0, P = Z.length, He = P >>> 1; _ < He; ) {
          var Ue = 2 * (_ + 1) - 1, lt = Z[Ue], nt = Ue + 1, Je = Z[nt];
          if (0 > ct(lt, re)) nt < P && 0 > ct(Je, lt) ? (Z[_] = Je, Z[nt] = re, _ = nt) : (Z[_] = lt, Z[Ue] = re, _ = Ue);
          else if (nt < P && 0 > ct(Je, re)) Z[_] = Je, Z[nt] = re, _ = nt;
          else break e;
        }
      }
      return Re;
    }
    function ct(Z, Re) {
      var re = Z.sortIndex - Re.sortIndex;
      return re !== 0 ? re : Z.id - Re.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var gt = performance;
      J.unstable_now = function() {
        return gt.now();
      };
    } else {
      var S = Date, kt = S.now();
      J.unstable_now = function() {
        return S.now() - kt;
      };
    }
    var oe = [], ce = [], Ze = 1, ee = null, Se = 3, X = !1, Fe = !1, Ke = !1, tt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, vt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ye(Z) {
      for (var Re = A(ce); Re !== null; ) {
        if (Re.callback === null) qe(ce);
        else if (Re.startTime <= Z) qe(ce), Re.sortIndex = Re.expirationTime, W(oe, Re);
        else break;
        Re = A(ce);
      }
    }
    function ht(Z) {
      if (Ke = !1, Ye(Z), !Fe) if (A(oe) !== null) Fe = !0, Dt(be);
      else {
        var Re = A(ce);
        Re !== null && Ce(ht, Re.startTime - Z);
      }
    }
    function be(Z, Re) {
      Fe = !1, Ke && (Ke = !1, cn(rn), rn = -1), X = !0;
      var re = Se;
      try {
        for (Ye(Re), ee = A(oe); ee !== null && (!(ee.expirationTime > Re) || Z && !an()); ) {
          var _ = ee.callback;
          if (typeof _ == "function") {
            ee.callback = null, Se = ee.priorityLevel;
            var P = _(ee.expirationTime <= Re);
            Re = J.unstable_now(), typeof P == "function" ? ee.callback = P : ee === A(oe) && qe(oe), Ye(Re);
          } else qe(oe);
          ee = A(oe);
        }
        if (ee !== null) var He = !0;
        else {
          var Ue = A(ce);
          Ue !== null && Ce(ht, Ue.startTime - Re), He = !1;
        }
        return He;
      } finally {
        ee = null, Se = re, X = !1;
      }
    }
    var ft = !1, je = null, rn = -1, jt = 5, Xt = -1;
    function an() {
      return !(J.unstable_now() - Xt < jt);
    }
    function xt() {
      if (je !== null) {
        var Z = J.unstable_now();
        Xt = Z;
        var Re = !0;
        try {
          Re = je(!0, Z);
        } finally {
          Re ? De() : (ft = !1, je = null);
        }
      } else ft = !1;
    }
    var De;
    if (typeof vt == "function") De = function() {
      vt(xt);
    };
    else if (typeof MessageChannel < "u") {
      var At = new MessageChannel(), bt = At.port2;
      At.port1.onmessage = xt, De = function() {
        bt.postMessage(null);
      };
    } else De = function() {
      tt(xt, 0);
    };
    function Dt(Z) {
      je = Z, ft || (ft = !0, De());
    }
    function Ce(Z, Re) {
      rn = tt(function() {
        Z(J.unstable_now());
      }, Re);
    }
    J.unstable_IdlePriority = 5, J.unstable_ImmediatePriority = 1, J.unstable_LowPriority = 4, J.unstable_NormalPriority = 3, J.unstable_Profiling = null, J.unstable_UserBlockingPriority = 2, J.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, J.unstable_continueExecution = function() {
      Fe || X || (Fe = !0, Dt(be));
    }, J.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : jt = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, J.unstable_getCurrentPriorityLevel = function() {
      return Se;
    }, J.unstable_getFirstCallbackNode = function() {
      return A(oe);
    }, J.unstable_next = function(Z) {
      switch (Se) {
        case 1:
        case 2:
        case 3:
          var Re = 3;
          break;
        default:
          Re = Se;
      }
      var re = Se;
      Se = Re;
      try {
        return Z();
      } finally {
        Se = re;
      }
    }, J.unstable_pauseExecution = function() {
    }, J.unstable_requestPaint = function() {
    }, J.unstable_runWithPriority = function(Z, Re) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var re = Se;
      Se = Z;
      try {
        return Re();
      } finally {
        Se = re;
      }
    }, J.unstable_scheduleCallback = function(Z, Re, re) {
      var _ = J.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? _ + re : _) : re = _, Z) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = re + P, Z = { id: Ze++, callback: Re, priorityLevel: Z, startTime: re, expirationTime: P, sortIndex: -1 }, re > _ ? (Z.sortIndex = re, W(ce, Z), A(oe) === null && Z === A(ce) && (Ke ? (cn(rn), rn = -1) : Ke = !0, Ce(ht, re - _))) : (Z.sortIndex = P, W(oe, Z), Fe || X || (Fe = !0, Dt(be))), Z;
    }, J.unstable_shouldYield = an, J.unstable_wrapCallback = function(Z) {
      var Re = Se;
      return function() {
        var re = Se;
        Se = Re;
        try {
          return Z.apply(this, arguments);
        } finally {
          Se = re;
        }
      };
    };
  }(fE)), fE;
}
var dE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rT;
function tk() {
  return rT || (rT = 1, function(J) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var W = !1, A = 5;
      function qe(te, Te) {
        var at = te.length;
        te.push(Te), S(te, Te, at);
      }
      function ct(te) {
        return te.length === 0 ? null : te[0];
      }
      function gt(te) {
        if (te.length === 0)
          return null;
        var Te = te[0], at = te.pop();
        return at !== Te && (te[0] = at, kt(te, at, 0)), Te;
      }
      function S(te, Te, at) {
        for (var Ft = at; Ft > 0; ) {
          var Zt = Ft - 1 >>> 1, pn = te[Zt];
          if (oe(pn, Te) > 0)
            te[Zt] = Te, te[Ft] = pn, Ft = Zt;
          else
            return;
        }
      }
      function kt(te, Te, at) {
        for (var Ft = at, Zt = te.length, pn = Zt >>> 1; Ft < pn; ) {
          var ln = (Ft + 1) * 2 - 1, qn = te[ln], Jt = ln + 1, Bt = te[Jt];
          if (oe(qn, Te) < 0)
            Jt < Zt && oe(Bt, qn) < 0 ? (te[Ft] = Bt, te[Jt] = Te, Ft = Jt) : (te[Ft] = qn, te[ln] = Te, Ft = ln);
          else if (Jt < Zt && oe(Bt, Te) < 0)
            te[Ft] = Bt, te[Jt] = Te, Ft = Jt;
          else
            return;
        }
      }
      function oe(te, Te) {
        var at = te.sortIndex - Te.sortIndex;
        return at !== 0 ? at : te.id - Te.id;
      }
      var ce = 1, Ze = 2, ee = 3, Se = 4, X = 5;
      function Fe(te, Te) {
      }
      var Ke = typeof performance == "object" && typeof performance.now == "function";
      if (Ke) {
        var tt = performance;
        J.unstable_now = function() {
          return tt.now();
        };
      } else {
        var cn = Date, vt = cn.now();
        J.unstable_now = function() {
          return cn.now() - vt;
        };
      }
      var Ye = 1073741823, ht = -1, be = 250, ft = 5e3, je = 1e4, rn = Ye, jt = [], Xt = [], an = 1, xt = null, De = ee, At = !1, bt = !1, Dt = !1, Ce = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, Re = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function re(te) {
        for (var Te = ct(Xt); Te !== null; ) {
          if (Te.callback === null)
            gt(Xt);
          else if (Te.startTime <= te)
            gt(Xt), Te.sortIndex = Te.expirationTime, qe(jt, Te);
          else
            return;
          Te = ct(Xt);
        }
      }
      function _(te) {
        if (Dt = !1, re(te), !bt)
          if (ct(jt) !== null)
            bt = !0, On(P);
          else {
            var Te = ct(Xt);
            Te !== null && gr(_, Te.startTime - te);
          }
      }
      function P(te, Te) {
        bt = !1, Dt && (Dt = !1, sa()), At = !0;
        var at = De;
        try {
          var Ft;
          if (!W) return He(te, Te);
        } finally {
          xt = null, De = at, At = !1;
        }
      }
      function He(te, Te) {
        var at = Te;
        for (re(at), xt = ct(jt); xt !== null && !(xt.expirationTime > at && (!te || si())); ) {
          var Ft = xt.callback;
          if (typeof Ft == "function") {
            xt.callback = null, De = xt.priorityLevel;
            var Zt = xt.expirationTime <= at, pn = Ft(Zt);
            at = J.unstable_now(), typeof pn == "function" ? xt.callback = pn : xt === ct(jt) && gt(jt), re(at);
          } else
            gt(jt);
          xt = ct(jt);
        }
        if (xt !== null)
          return !0;
        var ln = ct(Xt);
        return ln !== null && gr(_, ln.startTime - at), !1;
      }
      function Ue(te, Te) {
        switch (te) {
          case ce:
          case Ze:
          case ee:
          case Se:
          case X:
            break;
          default:
            te = ee;
        }
        var at = De;
        De = te;
        try {
          return Te();
        } finally {
          De = at;
        }
      }
      function lt(te) {
        var Te;
        switch (De) {
          case ce:
          case Ze:
          case ee:
            Te = ee;
            break;
          default:
            Te = De;
            break;
        }
        var at = De;
        De = Te;
        try {
          return te();
        } finally {
          De = at;
        }
      }
      function nt(te) {
        var Te = De;
        return function() {
          var at = De;
          De = Te;
          try {
            return te.apply(this, arguments);
          } finally {
            De = at;
          }
        };
      }
      function Je(te, Te, at) {
        var Ft = J.unstable_now(), Zt;
        if (typeof at == "object" && at !== null) {
          var pn = at.delay;
          typeof pn == "number" && pn > 0 ? Zt = Ft + pn : Zt = Ft;
        } else
          Zt = Ft;
        var ln;
        switch (te) {
          case ce:
            ln = ht;
            break;
          case Ze:
            ln = be;
            break;
          case X:
            ln = rn;
            break;
          case Se:
            ln = je;
            break;
          case ee:
          default:
            ln = ft;
            break;
        }
        var qn = Zt + ln, Jt = {
          id: an++,
          callback: Te,
          priorityLevel: te,
          startTime: Zt,
          expirationTime: qn,
          sortIndex: -1
        };
        return Zt > Ft ? (Jt.sortIndex = Zt, qe(Xt, Jt), ct(jt) === null && Jt === ct(Xt) && (Dt ? sa() : Dt = !0, gr(_, Zt - Ft))) : (Jt.sortIndex = qn, qe(jt, Jt), !bt && !At && (bt = !0, On(P))), Jt;
      }
      function rt() {
      }
      function ut() {
        !bt && !At && (bt = !0, On(P));
      }
      function Vt() {
        return ct(jt);
      }
      function Dn(te) {
        te.callback = null;
      }
      function xr() {
        return De;
      }
      var En = !1, tr = null, Pn = -1, Vn = A, Ir = -1;
      function si() {
        var te = J.unstable_now() - Ir;
        return !(te < Vn);
      }
      function oa() {
      }
      function Gn(te) {
        if (te < 0 || te > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        te > 0 ? Vn = Math.floor(1e3 / te) : Vn = A;
      }
      var Cn = function() {
        if (tr !== null) {
          var te = J.unstable_now();
          Ir = te;
          var Te = !0, at = !0;
          try {
            at = tr(Te, te);
          } finally {
            at ? Bn() : (En = !1, tr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Re == "function")
        Bn = function() {
          Re(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var yr = new MessageChannel(), Ia = yr.port2;
        yr.port1.onmessage = Cn, Bn = function() {
          Ia.postMessage(null);
        };
      } else
        Bn = function() {
          Ce(Cn, 0);
        };
      function On(te) {
        tr = te, En || (En = !0, Bn());
      }
      function gr(te, Te) {
        Pn = Ce(function() {
          te(J.unstable_now());
        }, Te);
      }
      function sa() {
        Z(Pn), Pn = -1;
      }
      var Ya = oa, ci = null;
      J.unstable_IdlePriority = X, J.unstable_ImmediatePriority = ce, J.unstable_LowPriority = Se, J.unstable_NormalPriority = ee, J.unstable_Profiling = ci, J.unstable_UserBlockingPriority = Ze, J.unstable_cancelCallback = Dn, J.unstable_continueExecution = ut, J.unstable_forceFrameRate = Gn, J.unstable_getCurrentPriorityLevel = xr, J.unstable_getFirstCallbackNode = Vt, J.unstable_next = lt, J.unstable_pauseExecution = rt, J.unstable_requestPaint = Ya, J.unstable_runWithPriority = Ue, J.unstable_scheduleCallback = Je, J.unstable_shouldYield = si, J.unstable_wrapCallback = nt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(dE)), dE;
}
var aT;
function oT() {
  return aT || (aT = 1, process.env.NODE_ENV === "production" ? Wm.exports = ek() : Wm.exports = tk()), Wm.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iT;
function nk() {
  if (iT) return Ba;
  iT = 1;
  var J = ev(), W = oT();
  function A(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var qe = /* @__PURE__ */ new Set(), ct = {};
  function gt(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (ct[n] = r, n = 0; n < r.length; n++) qe.add(r[n]);
  }
  var kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oe = Object.prototype.hasOwnProperty, ce = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ze = {}, ee = {};
  function Se(n) {
    return oe.call(ee, n) ? !0 : oe.call(Ze, n) ? !1 : ce.test(n) ? ee[n] = !0 : (Ze[n] = !0, !1);
  }
  function X(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Fe(n, r, l, o) {
    if (r === null || typeof r > "u" || X(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function Ke(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var tt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    tt[n] = new Ke(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    tt[r] = new Ke(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    tt[n] = new Ke(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    tt[n] = new Ke(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    tt[n] = new Ke(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    tt[n] = new Ke(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    tt[n] = new Ke(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    tt[n] = new Ke(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    tt[n] = new Ke(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function vt(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      vt
    );
    tt[r] = new Ke(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, vt);
    tt[r] = new Ke(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, vt);
    tt[r] = new Ke(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    tt[n] = new Ke(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), tt.xlinkHref = new Ke("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    tt[n] = new Ke(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ye(n, r, l, o) {
    var c = tt.hasOwnProperty(r) ? tt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Fe(r, l, c, o) && (l = null), o || c === null ? Se(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var ht = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, be = Symbol.for("react.element"), ft = Symbol.for("react.portal"), je = Symbol.for("react.fragment"), rn = Symbol.for("react.strict_mode"), jt = Symbol.for("react.profiler"), Xt = Symbol.for("react.provider"), an = Symbol.for("react.context"), xt = Symbol.for("react.forward_ref"), De = Symbol.for("react.suspense"), At = Symbol.for("react.suspense_list"), bt = Symbol.for("react.memo"), Dt = Symbol.for("react.lazy"), Ce = Symbol.for("react.offscreen"), Z = Symbol.iterator;
  function Re(n) {
    return n === null || typeof n != "object" ? null : (n = Z && n[Z] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var re = Object.assign, _;
  function P(n) {
    if (_ === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      _ = r && r[1] || "";
    }
    return `
` + _ + n;
  }
  var He = !1;
  function Ue(n, r) {
    if (!n || He) return "";
    He = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (z) {
          var o = z;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (z) {
          o = z;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (z) {
          o = z;
        }
        n();
      }
    } catch (z) {
      if (z && o && typeof z.stack == "string") {
        for (var c = z.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      He = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? P(n) : "";
  }
  function lt(n) {
    switch (n.tag) {
      case 5:
        return P(n.type);
      case 16:
        return P("Lazy");
      case 13:
        return P("Suspense");
      case 19:
        return P("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ue(n.type, !1), n;
      case 11:
        return n = Ue(n.type.render, !1), n;
      case 1:
        return n = Ue(n.type, !0), n;
      default:
        return "";
    }
  }
  function nt(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case je:
        return "Fragment";
      case ft:
        return "Portal";
      case jt:
        return "Profiler";
      case rn:
        return "StrictMode";
      case De:
        return "Suspense";
      case At:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case an:
        return (n.displayName || "Context") + ".Consumer";
      case Xt:
        return (n._context.displayName || "Context") + ".Provider";
      case xt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case bt:
        return r = n.displayName || null, r !== null ? r : nt(n.type) || "Memo";
      case Dt:
        r = n._payload, n = n._init;
        try {
          return nt(n(r));
        } catch {
        }
    }
    return null;
  }
  function Je(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return nt(r);
      case 8:
        return r === rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function rt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function ut(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Vt(n) {
    var r = ut(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Dn(n) {
    n._valueTracker || (n._valueTracker = Vt(n));
  }
  function xr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = ut(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function tr(n, r) {
    var l = r.checked;
    return re({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Pn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Vn(n, r) {
    r = r.checked, r != null && Ye(n, "checked", r, !1);
  }
  function Ir(n, r) {
    Vn(n, r);
    var l = rt(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? oa(n, r.type, l) : r.hasOwnProperty("defaultValue") && oa(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function si(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function oa(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Gn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(A(91));
    return re({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function yr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(A(92));
        if (Gn(l)) {
          if (1 < l.length) throw Error(A(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function Ia(n, r) {
    var l = rt(r.value), o = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function On(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function gr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function sa(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? gr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ya, ci = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ya = Ya || document.createElement("div"), Ya.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ya.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function te(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Te = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, at = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Te).forEach(function(n) {
    at.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Te[r] = Te[n];
    });
  });
  function Ft(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Te.hasOwnProperty(n) && Te[n] ? ("" + r).trim() : r + "px";
  }
  function Zt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = Ft(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = re({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ln(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(A(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(A(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(A(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(A(62));
    }
  }
  function qn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jt = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var $t = null, ca = null, Sr = null;
  function Ta(n) {
    if (n = _e(n)) {
      if (typeof $t != "function") throw Error(A(280));
      var r = n.stateNode;
      r && (r = hn(r), $t(n.stateNode, n.type, r));
    }
  }
  function ji(n) {
    ca ? Sr ? Sr.push(n) : Sr = [n] : ca = n;
  }
  function Zl() {
    if (ca) {
      var n = ca, r = Sr;
      if (Sr = ca = null, Ta(n), r) for (n = 0; n < r.length; n++) Ta(r[n]);
    }
  }
  function Jl(n, r) {
    return n(r);
  }
  function dl() {
  }
  var pl = !1;
  function eu(n, r, l) {
    if (pl) return n(r, l);
    pl = !0;
    try {
      return Jl(n, r, l);
    } finally {
      pl = !1, (ca !== null || Sr !== null) && (dl(), Zl());
    }
  }
  function br(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(A(231, r, typeof l));
    return l;
  }
  var _r = !1;
  if (kt) try {
    var nr = {};
    Object.defineProperty(nr, "passive", { get: function() {
      _r = !0;
    } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
  } catch {
    _r = !1;
  }
  function fi(n, r, l, o, c, d, m, E, T) {
    var z = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, z);
    } catch (Y) {
      this.onError(Y);
    }
  }
  var Qa = !1, di = null, pi = !1, R = null, B = { onError: function(n) {
    Qa = !0, di = n;
  } };
  function ie(n, r, l, o, c, d, m, E, T) {
    Qa = !1, di = null, fi.apply(B, arguments);
  }
  function he(n, r, l, o, c, d, m, E, T) {
    if (ie.apply(this, arguments), Qa) {
      if (Qa) {
        var z = di;
        Qa = !1, di = null;
      } else throw Error(A(198));
      pi || (pi = !0, R = z);
    }
  }
  function We(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function $e(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function dt(n) {
    if (We(n) !== n) throw Error(A(188));
  }
  function ot(n) {
    var r = n.alternate;
    if (!r) {
      if (r = We(n), r === null) throw Error(A(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return dt(c), n;
          if (d === o) return dt(c), r;
          d = d.sibling;
        }
        throw Error(A(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(A(189));
        }
      }
      if (l.alternate !== o) throw Error(A(190));
    }
    if (l.tag !== 3) throw Error(A(188));
    return l.stateNode.current === l ? n : r;
  }
  function Rn(n) {
    return n = ot(n), n !== null ? en(n) : null;
  }
  function en(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = en(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var un = W.unstable_scheduleCallback, rr = W.unstable_cancelCallback, Wa = W.unstable_shouldYield, Ga = W.unstable_requestPaint, Ge = W.unstable_now, et = W.unstable_getCurrentPriorityLevel, qa = W.unstable_ImmediatePriority, tu = W.unstable_UserBlockingPriority, nu = W.unstable_NormalPriority, vl = W.unstable_LowPriority, Qu = W.unstable_IdlePriority, hl = null, Yr = null;
  function Yo(n) {
    if (Yr && typeof Yr.onCommitFiberRoot == "function") try {
      Yr.onCommitFiberRoot(hl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var kr = Math.clz32 ? Math.clz32 : Wu, lc = Math.log, uc = Math.LN2;
  function Wu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (lc(n) / uc | 0) | 0;
  }
  var ml = 64, fa = 4194304;
  function Ka(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Xa(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = Ka(E) : (d &= m, d !== 0 && (o = Ka(d)));
    } else m = l & ~c, m !== 0 ? o = Ka(m) : d !== 0 && (o = Ka(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - kr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Gu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ru(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - kr(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = Gu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function yl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function qu() {
    var n = ml;
    return ml <<= 1, !(ml & 4194240) && (ml = 64), n;
  }
  function Ku(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Hi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - kr(r), n[r] = l;
  }
  function Qf(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - kr(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Pi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - kr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Ot = 0;
  function Xu(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Tt, Qo, vi, Be, Zu, ar = !1, hi = [], Dr = null, mi = null, on = null, It = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Map(), $n = [], Or = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function wa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Dr = null;
        break;
      case "dragenter":
      case "dragleave":
        mi = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        It.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gl.delete(r.pointerId);
    }
  }
  function au(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = _e(r), r !== null && Qo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Wo(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Dr = au(Dr, n, r, l, o, c), !0;
      case "dragenter":
        return mi = au(mi, n, r, l, o, c), !0;
      case "mouseover":
        return on = au(on, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return It.set(d, au(It.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, gl.set(d, au(gl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Go(n) {
    var r = pu(n.target);
    if (r !== null) {
      var l = We(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = $e(l), r !== null) {
            n.blockedOn = r, Zu(n.priority, function() {
              vi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Sl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = to(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Jt = o, l.target.dispatchEvent(o), Jt = null;
      } else return r = _e(l), r !== null && Qo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function iu(n, r, l) {
    Sl(n) && l.delete(r);
  }
  function Wf() {
    ar = !1, Dr !== null && Sl(Dr) && (Dr = null), mi !== null && Sl(mi) && (mi = null), on !== null && Sl(on) && (on = null), It.forEach(iu), gl.forEach(iu);
  }
  function xa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ar || (ar = !0, W.unstable_scheduleCallback(W.unstable_NormalPriority, Wf)));
  }
  function Za(n) {
    function r(c) {
      return xa(c, n);
    }
    if (0 < hi.length) {
      xa(hi[0], n);
      for (var l = 1; l < hi.length; l++) {
        var o = hi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Dr !== null && xa(Dr, n), mi !== null && xa(mi, n), on !== null && xa(on, n), It.forEach(r), gl.forEach(r), l = 0; l < $n.length; l++) o = $n[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < $n.length && (l = $n[0], l.blockedOn === null); ) Go(l), l.blockedOn === null && $n.shift();
  }
  var yi = ht.ReactCurrentBatchConfig, ba = !0;
  function Ju(n, r, l, o) {
    var c = Ot, d = yi.transition;
    yi.transition = null;
    try {
      Ot = 1, El(n, r, l, o);
    } finally {
      Ot = c, yi.transition = d;
    }
  }
  function eo(n, r, l, o) {
    var c = Ot, d = yi.transition;
    yi.transition = null;
    try {
      Ot = 4, El(n, r, l, o);
    } finally {
      Ot = c, yi.transition = d;
    }
  }
  function El(n, r, l, o) {
    if (ba) {
      var c = to(n, r, l, o);
      if (c === null) Sc(n, r, o, lu, l), wa(n, o);
      else if (Wo(c, n, r, l, o)) o.stopPropagation();
      else if (wa(n, o), r & 4 && -1 < Or.indexOf(n)) {
        for (; c !== null; ) {
          var d = _e(c);
          if (d !== null && Tt(d), d = to(n, r, l, o), d === null && Sc(n, r, o, lu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Sc(n, r, o, null, l);
    }
  }
  var lu = null;
  function to(n, r, l, o) {
    if (lu = null, n = Bt(o), n = pu(n), n !== null) if (r = We(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = $e(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return lu = n, null;
  }
  function no(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (et()) {
          case qa:
            return 1;
          case tu:
            return 4;
          case nu:
          case vl:
            return 16;
          case Qu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ja = null, h = null, C = null;
  function N() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Ja ? Ja.value : Ja.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function F(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function K() {
    return !0;
  }
  function Oe() {
    return !1;
  }
  function ae(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? K : Oe, this.isPropagationStopped = Oe, this;
    }
    return re(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = K);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = K);
    }, persist: function() {
    }, isPersistent: K }), r;
  }
  var Ne = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, pt = ae(Ne), wt = re({}, Ne, { view: 0, detail: 0 }), tn = ae(wt), Yt, it, Qt, vn = re({}, wt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Zf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Qt && (Qt && n.type === "mousemove" ? (Yt = n.screenX - Qt.screenX, it = n.screenY - Qt.screenY) : it = Yt = 0, Qt = n), Yt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : it;
  } }), Cl = ae(vn), qo = re({}, vn, { dataTransfer: 0 }), Vi = ae(qo), Ko = re({}, wt, { relatedTarget: 0 }), uu = ae(Ko), Gf = re({}, Ne, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), oc = ae(Gf), qf = re({}, Ne, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), tv = ae(qf), Kf = re({}, Ne, { data: 0 }), Xf = ae(Kf), nv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, rv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, qm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Bi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = qm[n]) ? !!r[n] : !1;
  }
  function Zf() {
    return Bi;
  }
  var Jf = re({}, wt, { key: function(n) {
    if (n.key) {
      var r = nv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = F(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? rv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Zf, charCode: function(n) {
    return n.type === "keypress" ? F(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? F(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), ed = ae(Jf), td = re({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), av = ae(td), sc = re({}, wt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Zf }), iv = ae(sc), Qr = re({}, Ne, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $i = ae(Qr), Ln = re({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ii = ae(Ln), nd = [9, 13, 27, 32], ro = kt && "CompositionEvent" in window, Xo = null;
  kt && "documentMode" in document && (Xo = document.documentMode);
  var Zo = kt && "TextEvent" in window && !Xo, lv = kt && (!ro || Xo && 8 < Xo && 11 >= Xo), uv = " ", cc = !1;
  function ov(n, r) {
    switch (n) {
      case "keyup":
        return nd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function sv(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ao = !1;
  function cv(n, r) {
    switch (n) {
      case "compositionend":
        return sv(r);
      case "keypress":
        return r.which !== 32 ? null : (cc = !0, uv);
      case "textInput":
        return n = r.data, n === uv && cc ? null : n;
      default:
        return null;
    }
  }
  function Km(n, r) {
    if (ao) return n === "compositionend" || !ro && ov(n, r) ? (n = N(), C = h = Ja = null, ao = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return lv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Xm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function fv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Xm[n.type] : r === "textarea";
  }
  function rd(n, r, l, o) {
    ji(o), r = as(r, "onChange"), 0 < r.length && (l = new pt("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var gi = null, ou = null;
  function dv(n) {
    fu(n, 0);
  }
  function Jo(n) {
    var r = ti(n);
    if (xr(r)) return n;
  }
  function Zm(n, r) {
    if (n === "change") return r;
  }
  var pv = !1;
  if (kt) {
    var ad;
    if (kt) {
      var id = "oninput" in document;
      if (!id) {
        var vv = document.createElement("div");
        vv.setAttribute("oninput", "return;"), id = typeof vv.oninput == "function";
      }
      ad = id;
    } else ad = !1;
    pv = ad && (!document.documentMode || 9 < document.documentMode);
  }
  function hv() {
    gi && (gi.detachEvent("onpropertychange", mv), ou = gi = null);
  }
  function mv(n) {
    if (n.propertyName === "value" && Jo(ou)) {
      var r = [];
      rd(r, ou, n, Bt(n)), eu(dv, r);
    }
  }
  function Jm(n, r, l) {
    n === "focusin" ? (hv(), gi = r, ou = l, gi.attachEvent("onpropertychange", mv)) : n === "focusout" && hv();
  }
  function yv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Jo(ou);
  }
  function ey(n, r) {
    if (n === "click") return Jo(r);
  }
  function gv(n, r) {
    if (n === "input" || n === "change") return Jo(r);
  }
  function ty(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ei = typeof Object.is == "function" ? Object.is : ty;
  function es(n, r) {
    if (ei(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!oe.call(r, c) || !ei(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Sv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function fc(n, r) {
    var l = Sv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Sv(l);
    }
  }
  function Rl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Rl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ts() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function dc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function io(n) {
    var r = ts(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Rl(l.ownerDocument.documentElement, l)) {
      if (o !== null && dc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = fc(l, d);
          var m = fc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ny = kt && "documentMode" in document && 11 >= document.documentMode, lo = null, ld = null, ns = null, ud = !1;
  function od(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ud || lo == null || lo !== En(o) || (o = lo, "selectionStart" in o && dc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ns && es(ns, o) || (ns = o, o = as(ld, "onSelect"), 0 < o.length && (r = new pt("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = lo)));
  }
  function pc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var su = { animationend: pc("Animation", "AnimationEnd"), animationiteration: pc("Animation", "AnimationIteration"), animationstart: pc("Animation", "AnimationStart"), transitionend: pc("Transition", "TransitionEnd") }, ir = {}, sd = {};
  kt && (sd = document.createElement("div").style, "AnimationEvent" in window || (delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation), "TransitionEvent" in window || delete su.transitionend.transition);
  function vc(n) {
    if (ir[n]) return ir[n];
    if (!su[n]) return n;
    var r = su[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in sd) return ir[n] = r[l];
    return n;
  }
  var Ev = vc("animationend"), Cv = vc("animationiteration"), Rv = vc("animationstart"), Tv = vc("transitionend"), cd = /* @__PURE__ */ new Map(), hc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function _a(n, r) {
    cd.set(n, r), gt(r, [n]);
  }
  for (var fd = 0; fd < hc.length; fd++) {
    var cu = hc[fd], ry = cu.toLowerCase(), ay = cu[0].toUpperCase() + cu.slice(1);
    _a(ry, "on" + ay);
  }
  _a(Ev, "onAnimationEnd"), _a(Cv, "onAnimationIteration"), _a(Rv, "onAnimationStart"), _a("dblclick", "onDoubleClick"), _a("focusin", "onFocus"), _a("focusout", "onBlur"), _a(Tv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var rs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dd = new Set("cancel close invalid load scroll toggle".split(" ").concat(rs));
  function mc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, he(o, r, void 0, n), n.currentTarget = null;
  }
  function fu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, z = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          mc(c, E, z), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, z = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          mc(c, E, z), d = T;
        }
      }
    }
    if (pi) throw n = R, pi = !1, R = null, n;
  }
  function Ht(n, r) {
    var l = r[us];
    l === void 0 && (l = r[us] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (wv(r, n, 2, !1), l.add(o));
  }
  function yc(n, r, l) {
    var o = 0;
    r && (o |= 4), wv(l, n, o, r);
  }
  var gc = "_reactListening" + Math.random().toString(36).slice(2);
  function uo(n) {
    if (!n[gc]) {
      n[gc] = !0, qe.forEach(function(l) {
        l !== "selectionchange" && (dd.has(l) || yc(l, !1, n), yc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[gc] || (r[gc] = !0, yc("selectionchange", !1, r));
    }
  }
  function wv(n, r, l, o) {
    switch (no(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = eo;
        break;
      default:
        c = El;
    }
    l = c.bind(null, r, l, n), c = void 0, !_r || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Sc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = pu(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    eu(function() {
      var z = d, Y = Bt(l), G = [];
      e: {
        var I = cd.get(n);
        if (I !== void 0) {
          var fe = pt, me = n;
          switch (n) {
            case "keypress":
              if (F(l) === 0) break e;
            case "keydown":
            case "keyup":
              fe = ed;
              break;
            case "focusin":
              me = "focus", fe = uu;
              break;
            case "focusout":
              me = "blur", fe = uu;
              break;
            case "beforeblur":
            case "afterblur":
              fe = uu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              fe = Cl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              fe = Vi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              fe = iv;
              break;
            case Ev:
            case Cv:
            case Rv:
              fe = oc;
              break;
            case Tv:
              fe = $i;
              break;
            case "scroll":
              fe = tn;
              break;
            case "wheel":
              fe = Ii;
              break;
            case "copy":
            case "cut":
            case "paste":
              fe = tv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              fe = av;
          }
          var Ee = (r & 4) !== 0, _n = !Ee && n === "scroll", k = Ee ? I !== null ? I + "Capture" : null : I;
          Ee = [];
          for (var x = z, L; x !== null; ) {
            L = x;
            var Q = L.stateNode;
            if (L.tag === 5 && Q !== null && (L = Q, k !== null && (Q = br(x, k), Q != null && Ee.push(oo(x, Q, L)))), _n) break;
            x = x.return;
          }
          0 < Ee.length && (I = new fe(I, me, null, l, Y), G.push({ event: I, listeners: Ee }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (I = n === "mouseover" || n === "pointerover", fe = n === "mouseout" || n === "pointerout", I && l !== Jt && (me = l.relatedTarget || l.fromElement) && (pu(me) || me[Yi])) break e;
          if ((fe || I) && (I = Y.window === Y ? Y : (I = Y.ownerDocument) ? I.defaultView || I.parentWindow : window, fe ? (me = l.relatedTarget || l.toElement, fe = z, me = me ? pu(me) : null, me !== null && (_n = We(me), me !== _n || me.tag !== 5 && me.tag !== 6) && (me = null)) : (fe = null, me = z), fe !== me)) {
            if (Ee = Cl, Q = "onMouseLeave", k = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (Ee = av, Q = "onPointerLeave", k = "onPointerEnter", x = "pointer"), _n = fe == null ? I : ti(fe), L = me == null ? I : ti(me), I = new Ee(Q, x + "leave", fe, l, Y), I.target = _n, I.relatedTarget = L, Q = null, pu(Y) === z && (Ee = new Ee(k, x + "enter", me, l, Y), Ee.target = L, Ee.relatedTarget = _n, Q = Ee), _n = Q, fe && me) t: {
              for (Ee = fe, k = me, x = 0, L = Ee; L; L = Tl(L)) x++;
              for (L = 0, Q = k; Q; Q = Tl(Q)) L++;
              for (; 0 < x - L; ) Ee = Tl(Ee), x--;
              for (; 0 < L - x; ) k = Tl(k), L--;
              for (; x--; ) {
                if (Ee === k || k !== null && Ee === k.alternate) break t;
                Ee = Tl(Ee), k = Tl(k);
              }
              Ee = null;
            }
            else Ee = null;
            fe !== null && xv(G, I, fe, Ee, !1), me !== null && _n !== null && xv(G, _n, me, Ee, !0);
          }
        }
        e: {
          if (I = z ? ti(z) : window, fe = I.nodeName && I.nodeName.toLowerCase(), fe === "select" || fe === "input" && I.type === "file") var ye = Zm;
          else if (fv(I)) if (pv) ye = gv;
          else {
            ye = yv;
            var Me = Jm;
          }
          else (fe = I.nodeName) && fe.toLowerCase() === "input" && (I.type === "checkbox" || I.type === "radio") && (ye = ey);
          if (ye && (ye = ye(n, z))) {
            rd(G, ye, l, Y);
            break e;
          }
          Me && Me(n, I, z), n === "focusout" && (Me = I._wrapperState) && Me.controlled && I.type === "number" && oa(I, "number", I.value);
        }
        switch (Me = z ? ti(z) : window, n) {
          case "focusin":
            (fv(Me) || Me.contentEditable === "true") && (lo = Me, ld = z, ns = null);
            break;
          case "focusout":
            ns = ld = lo = null;
            break;
          case "mousedown":
            ud = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ud = !1, od(G, l, Y);
            break;
          case "selectionchange":
            if (ny) break;
          case "keydown":
          case "keyup":
            od(G, l, Y);
        }
        var ze;
        if (ro) e: {
          switch (n) {
            case "compositionstart":
              var Ve = "onCompositionStart";
              break e;
            case "compositionend":
              Ve = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Ve = "onCompositionUpdate";
              break e;
          }
          Ve = void 0;
        }
        else ao ? ov(n, l) && (Ve = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Ve = "onCompositionStart");
        Ve && (lv && l.locale !== "ko" && (ao || Ve !== "onCompositionStart" ? Ve === "onCompositionEnd" && ao && (ze = N()) : (Ja = Y, h = "value" in Ja ? Ja.value : Ja.textContent, ao = !0)), Me = as(z, Ve), 0 < Me.length && (Ve = new Xf(Ve, n, null, l, Y), G.push({ event: Ve, listeners: Me }), ze ? Ve.data = ze : (ze = sv(l), ze !== null && (Ve.data = ze)))), (ze = Zo ? cv(n, l) : Km(n, l)) && (z = as(z, "onBeforeInput"), 0 < z.length && (Y = new Xf("onBeforeInput", "beforeinput", null, l, Y), G.push({ event: Y, listeners: z }), Y.data = ze));
      }
      fu(G, r);
    });
  }
  function oo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function as(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = br(n, l), d != null && o.unshift(oo(n, d, c)), d = br(n, r), d != null && o.push(oo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Tl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function xv(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, z = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && z !== null && (E = z, c ? (T = br(l, d), T != null && m.unshift(oo(l, T, E))) : c || (T = br(l, d), T != null && m.push(oo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var bv = /\r\n?/g, iy = /\u0000|\uFFFD/g;
  function _v(n) {
    return (typeof n == "string" ? n : "" + n).replace(bv, `
`).replace(iy, "");
  }
  function Ec(n, r, l) {
    if (r = _v(r), _v(n) !== r && l) throw Error(A(425));
  }
  function wl() {
  }
  var is = null, du = null;
  function Cc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Rc = typeof setTimeout == "function" ? setTimeout : void 0, pd = typeof clearTimeout == "function" ? clearTimeout : void 0, kv = typeof Promise == "function" ? Promise : void 0, so = typeof queueMicrotask == "function" ? queueMicrotask : typeof kv < "u" ? function(n) {
    return kv.resolve(null).then(n).catch(Tc);
  } : Rc;
  function Tc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function co(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Za(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Za(r);
  }
  function Si(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Dv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var xl = Math.random().toString(36).slice(2), Ei = "__reactFiber$" + xl, ls = "__reactProps$" + xl, Yi = "__reactContainer$" + xl, us = "__reactEvents$" + xl, fo = "__reactListeners$" + xl, ly = "__reactHandles$" + xl;
  function pu(n) {
    var r = n[Ei];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Yi] || l[Ei]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Dv(n); n !== null; ) {
          if (l = n[Ei]) return l;
          n = Dv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function _e(n) {
    return n = n[Ei] || n[Yi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ti(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(A(33));
  }
  function hn(n) {
    return n[ls] || null;
  }
  var St = [], ka = -1;
  function Da(n) {
    return { current: n };
  }
  function nn(n) {
    0 > ka || (n.current = St[ka], St[ka] = null, ka--);
  }
  function xe(n, r) {
    ka++, St[ka] = n.current, n.current = r;
  }
  var Er = {}, Sn = Da(Er), In = Da(!1), Wr = Er;
  function Gr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Er;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function po() {
    nn(In), nn(Sn);
  }
  function Ov(n, r, l) {
    if (Sn.current !== Er) throw Error(A(168));
    xe(Sn, r), xe(In, l);
  }
  function os(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(A(108, Je(n) || "Unknown", c));
    return re({}, l, o);
  }
  function Kn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Er, Wr = Sn.current, xe(Sn, n), xe(In, In.current), !0;
  }
  function wc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(A(169));
    l ? (n = os(n, r, Wr), o.__reactInternalMemoizedMergedChildContext = n, nn(In), nn(Sn), xe(Sn, n)) : nn(In), xe(In, l);
  }
  var Ci = null, vo = !1, Qi = !1;
  function xc(n) {
    Ci === null ? Ci = [n] : Ci.push(n);
  }
  function bl(n) {
    vo = !0, xc(n);
  }
  function Ri() {
    if (!Qi && Ci !== null) {
      Qi = !0;
      var n = 0, r = Ot;
      try {
        var l = Ci;
        for (Ot = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ci = null, vo = !1;
      } catch (c) {
        throw Ci !== null && (Ci = Ci.slice(n + 1)), un(qa, Ri), c;
      } finally {
        Ot = r, Qi = !1;
      }
    }
    return null;
  }
  var _l = [], kl = 0, Dl = null, Wi = 0, Nn = [], Oa = 0, da = null, Ti = 1, wi = "";
  function vu(n, r) {
    _l[kl++] = Wi, _l[kl++] = Dl, Dl = n, Wi = r;
  }
  function Lv(n, r, l) {
    Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = da, da = n;
    var o = Ti;
    n = wi;
    var c = 32 - kr(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - kr(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ti = 1 << 32 - kr(r) + c | l << c | o, wi = d + n;
    } else Ti = 1 << d | l << c | o, wi = n;
  }
  function bc(n) {
    n.return !== null && (vu(n, 1), Lv(n, 1, 0));
  }
  function _c(n) {
    for (; n === Dl; ) Dl = _l[--kl], _l[kl] = null, Wi = _l[--kl], _l[kl] = null;
    for (; n === da; ) da = Nn[--Oa], Nn[Oa] = null, wi = Nn[--Oa], Nn[Oa] = null, Ti = Nn[--Oa], Nn[Oa] = null;
  }
  var qr = null, Kr = null, fn = !1, La = null;
  function vd(n, r) {
    var l = Aa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Mv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, qr = n, Kr = Si(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, qr = n, Kr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = da !== null ? { id: Ti, overflow: wi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Aa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, qr = n, Kr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function hd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function md(n) {
    if (fn) {
      var r = Kr;
      if (r) {
        var l = r;
        if (!Mv(n, r)) {
          if (hd(n)) throw Error(A(418));
          r = Si(l.nextSibling);
          var o = qr;
          r && Mv(n, r) ? vd(o, l) : (n.flags = n.flags & -4097 | 2, fn = !1, qr = n);
        }
      } else {
        if (hd(n)) throw Error(A(418));
        n.flags = n.flags & -4097 | 2, fn = !1, qr = n;
      }
    }
  }
  function Yn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    qr = n;
  }
  function kc(n) {
    if (n !== qr) return !1;
    if (!fn) return Yn(n), fn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Cc(n.type, n.memoizedProps)), r && (r = Kr)) {
      if (hd(n)) throw ss(), Error(A(418));
      for (; r; ) vd(n, r), r = Si(r.nextSibling);
    }
    if (Yn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(A(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Kr = Si(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Kr = null;
      }
    } else Kr = qr ? Si(n.stateNode.nextSibling) : null;
    return !0;
  }
  function ss() {
    for (var n = Kr; n; ) n = Si(n.nextSibling);
  }
  function Ol() {
    Kr = qr = null, fn = !1;
  }
  function Gi(n) {
    La === null ? La = [n] : La.push(n);
  }
  var uy = ht.ReactCurrentBatchConfig;
  function hu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(A(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(A(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(A(284));
      if (!l._owner) throw Error(A(290, n));
    }
    return n;
  }
  function Dc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(A(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Nv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function mu(n) {
    function r(k, x) {
      if (n) {
        var L = k.deletions;
        L === null ? (k.deletions = [x], k.flags |= 16) : L.push(x);
      }
    }
    function l(k, x) {
      if (!n) return null;
      for (; x !== null; ) r(k, x), x = x.sibling;
      return null;
    }
    function o(k, x) {
      for (k = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? k.set(x.key, x) : k.set(x.index, x), x = x.sibling;
      return k;
    }
    function c(k, x) {
      return k = jl(k, x), k.index = 0, k.sibling = null, k;
    }
    function d(k, x, L) {
      return k.index = L, n ? (L = k.alternate, L !== null ? (L = L.index, L < x ? (k.flags |= 2, x) : L) : (k.flags |= 2, x)) : (k.flags |= 1048576, x);
    }
    function m(k) {
      return n && k.alternate === null && (k.flags |= 2), k;
    }
    function E(k, x, L, Q) {
      return x === null || x.tag !== 6 ? (x = Wd(L, k.mode, Q), x.return = k, x) : (x = c(x, L), x.return = k, x);
    }
    function T(k, x, L, Q) {
      var ye = L.type;
      return ye === je ? Y(k, x, L.props.children, Q, L.key) : x !== null && (x.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Nv(ye) === x.type) ? (Q = c(x, L.props), Q.ref = hu(k, x, L), Q.return = k, Q) : (Q = Hs(L.type, L.key, L.props, null, k.mode, Q), Q.ref = hu(k, x, L), Q.return = k, Q);
    }
    function z(k, x, L, Q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = sf(L, k.mode, Q), x.return = k, x) : (x = c(x, L.children || []), x.return = k, x);
    }
    function Y(k, x, L, Q, ye) {
      return x === null || x.tag !== 7 ? (x = el(L, k.mode, Q, ye), x.return = k, x) : (x = c(x, L), x.return = k, x);
    }
    function G(k, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Wd("" + x, k.mode, L), x.return = k, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case be:
            return L = Hs(x.type, x.key, x.props, null, k.mode, L), L.ref = hu(k, null, x), L.return = k, L;
          case ft:
            return x = sf(x, k.mode, L), x.return = k, x;
          case Dt:
            var Q = x._init;
            return G(k, Q(x._payload), L);
        }
        if (Gn(x) || Re(x)) return x = el(x, k.mode, L, null), x.return = k, x;
        Dc(k, x);
      }
      return null;
    }
    function I(k, x, L, Q) {
      var ye = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return ye !== null ? null : E(k, x, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            return L.key === ye ? T(k, x, L, Q) : null;
          case ft:
            return L.key === ye ? z(k, x, L, Q) : null;
          case Dt:
            return ye = L._init, I(
              k,
              x,
              ye(L._payload),
              Q
            );
        }
        if (Gn(L) || Re(L)) return ye !== null ? null : Y(k, x, L, Q, null);
        Dc(k, L);
      }
      return null;
    }
    function fe(k, x, L, Q, ye) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return k = k.get(L) || null, E(x, k, "" + Q, ye);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case be:
            return k = k.get(Q.key === null ? L : Q.key) || null, T(x, k, Q, ye);
          case ft:
            return k = k.get(Q.key === null ? L : Q.key) || null, z(x, k, Q, ye);
          case Dt:
            var Me = Q._init;
            return fe(k, x, L, Me(Q._payload), ye);
        }
        if (Gn(Q) || Re(Q)) return k = k.get(L) || null, Y(x, k, Q, ye, null);
        Dc(x, Q);
      }
      return null;
    }
    function me(k, x, L, Q) {
      for (var ye = null, Me = null, ze = x, Ve = x = 0, Jn = null; ze !== null && Ve < L.length; Ve++) {
        ze.index > Ve ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Nt = I(k, ze, L[Ve], Q);
        if (Nt === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Nt.alternate === null && r(k, ze), x = d(Nt, x, Ve), Me === null ? ye = Nt : Me.sibling = Nt, Me = Nt, ze = Jn;
      }
      if (Ve === L.length) return l(k, ze), fn && vu(k, Ve), ye;
      if (ze === null) {
        for (; Ve < L.length; Ve++) ze = G(k, L[Ve], Q), ze !== null && (x = d(ze, x, Ve), Me === null ? ye = ze : Me.sibling = ze, Me = ze);
        return fn && vu(k, Ve), ye;
      }
      for (ze = o(k, ze); Ve < L.length; Ve++) Jn = fe(ze, k, Ve, L[Ve], Q), Jn !== null && (n && Jn.alternate !== null && ze.delete(Jn.key === null ? Ve : Jn.key), x = d(Jn, x, Ve), Me === null ? ye = Jn : Me.sibling = Jn, Me = Jn);
      return n && ze.forEach(function(Vl) {
        return r(k, Vl);
      }), fn && vu(k, Ve), ye;
    }
    function Ee(k, x, L, Q) {
      var ye = Re(L);
      if (typeof ye != "function") throw Error(A(150));
      if (L = ye.call(L), L == null) throw Error(A(151));
      for (var Me = ye = null, ze = x, Ve = x = 0, Jn = null, Nt = L.next(); ze !== null && !Nt.done; Ve++, Nt = L.next()) {
        ze.index > Ve ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Vl = I(k, ze, Nt.value, Q);
        if (Vl === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Vl.alternate === null && r(k, ze), x = d(Vl, x, Ve), Me === null ? ye = Vl : Me.sibling = Vl, Me = Vl, ze = Jn;
      }
      if (Nt.done) return l(
        k,
        ze
      ), fn && vu(k, Ve), ye;
      if (ze === null) {
        for (; !Nt.done; Ve++, Nt = L.next()) Nt = G(k, Nt.value, Q), Nt !== null && (x = d(Nt, x, Ve), Me === null ? ye = Nt : Me.sibling = Nt, Me = Nt);
        return fn && vu(k, Ve), ye;
      }
      for (ze = o(k, ze); !Nt.done; Ve++, Nt = L.next()) Nt = fe(ze, k, Ve, Nt.value, Q), Nt !== null && (n && Nt.alternate !== null && ze.delete(Nt.key === null ? Ve : Nt.key), x = d(Nt, x, Ve), Me === null ? ye = Nt : Me.sibling = Nt, Me = Nt);
      return n && ze.forEach(function(hh) {
        return r(k, hh);
      }), fn && vu(k, Ve), ye;
    }
    function _n(k, x, L, Q) {
      if (typeof L == "object" && L !== null && L.type === je && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            e: {
              for (var ye = L.key, Me = x; Me !== null; ) {
                if (Me.key === ye) {
                  if (ye = L.type, ye === je) {
                    if (Me.tag === 7) {
                      l(k, Me.sibling), x = c(Me, L.props.children), x.return = k, k = x;
                      break e;
                    }
                  } else if (Me.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Nv(ye) === Me.type) {
                    l(k, Me.sibling), x = c(Me, L.props), x.ref = hu(k, Me, L), x.return = k, k = x;
                    break e;
                  }
                  l(k, Me);
                  break;
                } else r(k, Me);
                Me = Me.sibling;
              }
              L.type === je ? (x = el(L.props.children, k.mode, Q, L.key), x.return = k, k = x) : (Q = Hs(L.type, L.key, L.props, null, k.mode, Q), Q.ref = hu(k, x, L), Q.return = k, k = Q);
            }
            return m(k);
          case ft:
            e: {
              for (Me = L.key; x !== null; ) {
                if (x.key === Me) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(k, x.sibling), x = c(x, L.children || []), x.return = k, k = x;
                  break e;
                } else {
                  l(k, x);
                  break;
                }
                else r(k, x);
                x = x.sibling;
              }
              x = sf(L, k.mode, Q), x.return = k, k = x;
            }
            return m(k);
          case Dt:
            return Me = L._init, _n(k, x, Me(L._payload), Q);
        }
        if (Gn(L)) return me(k, x, L, Q);
        if (Re(L)) return Ee(k, x, L, Q);
        Dc(k, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(k, x.sibling), x = c(x, L), x.return = k, k = x) : (l(k, x), x = Wd(L, k.mode, Q), x.return = k, k = x), m(k)) : l(k, x);
    }
    return _n;
  }
  var Tn = mu(!0), le = mu(!1), pa = Da(null), Xr = null, ho = null, yd = null;
  function gd() {
    yd = ho = Xr = null;
  }
  function Sd(n) {
    var r = pa.current;
    nn(pa), n._currentValue = r;
  }
  function Ed(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Xr = n, yd = ho = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Un = !0), n.firstContext = null);
  }
  function Ma(n) {
    var r = n._currentValue;
    if (yd !== n) if (n = { context: n, memoizedValue: r, next: null }, ho === null) {
      if (Xr === null) throw Error(A(308));
      ho = n, Xr.dependencies = { lanes: 0, firstContext: n };
    } else ho = ho.next = n;
    return r;
  }
  var yu = null;
  function Cd(n) {
    yu === null ? yu = [n] : yu.push(n);
  }
  function Rd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Cd(r)) : (l.next = c.next, c.next = l), r.interleaved = l, va(n, o);
  }
  function va(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ha = !1;
  function Td(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function zv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function qi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, Et & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, va(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Cd(o)) : (r.next = c.next, c.next = r), o.interleaved = r, va(n, l);
  }
  function Oc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  function Uv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function cs(n, r, l, o) {
    var c = n.updateQueue;
    ha = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, z = T.next;
      T.next = null, m === null ? d = z : m.next = z, m = T;
      var Y = n.alternate;
      Y !== null && (Y = Y.updateQueue, E = Y.lastBaseUpdate, E !== m && (E === null ? Y.firstBaseUpdate = z : E.next = z, Y.lastBaseUpdate = T));
    }
    if (d !== null) {
      var G = c.baseState;
      m = 0, Y = z = T = null, E = d;
      do {
        var I = E.lane, fe = E.eventTime;
        if ((o & I) === I) {
          Y !== null && (Y = Y.next = {
            eventTime: fe,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var me = n, Ee = E;
            switch (I = r, fe = l, Ee.tag) {
              case 1:
                if (me = Ee.payload, typeof me == "function") {
                  G = me.call(fe, G, I);
                  break e;
                }
                G = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ee.payload, I = typeof me == "function" ? me.call(fe, G, I) : me, I == null) break e;
                G = re({}, G, I);
                break e;
              case 2:
                ha = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, I = c.effects, I === null ? c.effects = [E] : I.push(E));
        } else fe = { eventTime: fe, lane: I, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, Y === null ? (z = Y = fe, T = G) : Y = Y.next = fe, m |= I;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          I = E, E = I.next, I.next = null, c.lastBaseUpdate = I, c.shared.pending = null;
        }
      } while (!0);
      if (Y === null && (T = G), c.baseState = T, c.firstBaseUpdate = z, c.lastBaseUpdate = Y, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Di |= m, n.lanes = m, n.memoizedState = G;
    }
  }
  function wd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(A(191, c));
        c.call(o);
      }
    }
  }
  var fs = {}, xi = Da(fs), ds = Da(fs), ps = Da(fs);
  function gu(n) {
    if (n === fs) throw Error(A(174));
    return n;
  }
  function xd(n, r) {
    switch (xe(ps, r), xe(ds, n), xe(xi, fs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : sa(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = sa(r, n);
    }
    nn(xi), xe(xi, r);
  }
  function Su() {
    nn(xi), nn(ds), nn(ps);
  }
  function Av(n) {
    gu(ps.current);
    var r = gu(xi.current), l = sa(r, n.type);
    r !== l && (xe(ds, n), xe(xi, l));
  }
  function Lc(n) {
    ds.current === n && (nn(xi), nn(ds));
  }
  var yn = Da(0);
  function Mc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var vs = [];
  function ke() {
    for (var n = 0; n < vs.length; n++) vs[n]._workInProgressVersionPrimary = null;
    vs.length = 0;
  }
  var st = ht.ReactCurrentDispatcher, Lt = ht.ReactCurrentBatchConfig, Wt = 0, Mt = null, zn = null, Xn = null, Nc = !1, hs = !1, Eu = 0, $ = 0;
  function _t() {
    throw Error(A(321));
  }
  function Ae(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ei(n[l], r[l])) return !1;
    return !0;
  }
  function Ml(n, r, l, o, c, d) {
    if (Wt = d, Mt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, st.current = n === null || n.memoizedState === null ? Gc : Cs, n = l(o, c), hs) {
      d = 0;
      do {
        if (hs = !1, Eu = 0, 25 <= d) throw Error(A(301));
        d += 1, Xn = zn = null, r.updateQueue = null, st.current = qc, n = l(o, c);
      } while (hs);
    }
    if (st.current = xu, r = zn !== null && zn.next !== null, Wt = 0, Xn = zn = Mt = null, Nc = !1, r) throw Error(A(300));
    return n;
  }
  function ni() {
    var n = Eu !== 0;
    return Eu = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Xn === null ? Mt.memoizedState = Xn = n : Xn = Xn.next = n, Xn;
  }
  function wn() {
    if (zn === null) {
      var n = Mt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Xn === null ? Mt.memoizedState : Xn.next;
    if (r !== null) Xn = r, zn = n;
    else {
      if (n === null) throw Error(A(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Xn === null ? Mt.memoizedState = Xn = n : Xn = Xn.next = n;
    }
    return Xn;
  }
  function Ki(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Nl(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, z = d;
      do {
        var Y = z.lane;
        if ((Wt & Y) === Y) T !== null && (T = T.next = { lane: 0, action: z.action, hasEagerState: z.hasEagerState, eagerState: z.eagerState, next: null }), o = z.hasEagerState ? z.eagerState : n(o, z.action);
        else {
          var G = {
            lane: Y,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          T === null ? (E = T = G, m = o) : T = T.next = G, Mt.lanes |= Y, Di |= Y;
        }
        z = z.next;
      } while (z !== null && z !== d);
      T === null ? m = o : T.next = E, ei(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Mt.lanes |= d, Di |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Cu(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      ei(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function zc() {
  }
  function Uc(n, r) {
    var l = Mt, o = wn(), c = r(), d = !ei(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, ms(jc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Xn !== null && Xn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ru(9, Fc.bind(null, l, o, c, r), void 0, null), Qn === null) throw Error(A(349));
      Wt & 30 || Ac(l, r, c);
    }
    return c;
  }
  function Ac(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Mt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Mt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Fc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Hc(r) && Pc(n);
  }
  function jc(n, r, l) {
    return l(function() {
      Hc(r) && Pc(n);
    });
  }
  function Hc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ei(n, l);
    } catch {
      return !0;
    }
  }
  function Pc(n) {
    var r = va(n, 1);
    r !== null && zr(r, n, 1, -1);
  }
  function Vc(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ki, lastRenderedState: n }, r.queue = n, n = n.dispatch = wu.bind(null, Mt, n), [r.memoizedState, n];
  }
  function Ru(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Mt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Mt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Bc() {
    return wn().memoizedState;
  }
  function mo(n, r, l, o) {
    var c = Cr();
    Mt.flags |= n, c.memoizedState = Ru(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function yo(n, r, l, o) {
    var c = wn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && Ae(o, m.deps)) {
        c.memoizedState = Ru(r, l, d, o);
        return;
      }
    }
    Mt.flags |= n, c.memoizedState = Ru(1 | r, l, d, o);
  }
  function $c(n, r) {
    return mo(8390656, 8, n, r);
  }
  function ms(n, r) {
    return yo(2048, 8, n, r);
  }
  function Ic(n, r) {
    return yo(4, 2, n, r);
  }
  function ys(n, r) {
    return yo(4, 4, n, r);
  }
  function Tu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Yc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, yo(4, 4, Tu.bind(null, r, n), l);
  }
  function gs() {
  }
  function Qc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Wc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function bd(n, r, l) {
    return Wt & 21 ? (ei(l, r) || (l = qu(), Mt.lanes |= l, Di |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l);
  }
  function Ss(n, r) {
    var l = Ot;
    Ot = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Lt.transition;
    Lt.transition = {};
    try {
      n(!1), r();
    } finally {
      Ot = l, Lt.transition = o;
    }
  }
  function _d() {
    return wn().memoizedState;
  }
  function Es(n, r, l) {
    var o = Oi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Zr(n)) Fv(r, l);
    else if (l = Rd(n, r, l, o), l !== null) {
      var c = jn();
      zr(l, n, o, c), Kt(l, r, o);
    }
  }
  function wu(n, r, l) {
    var o = Oi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Zr(n)) Fv(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, ei(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Cd(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Rd(n, r, c, o), l !== null && (c = jn(), zr(l, n, o, c), Kt(l, r, o));
    }
  }
  function Zr(n) {
    var r = n.alternate;
    return n === Mt || r !== null && r === Mt;
  }
  function Fv(n, r) {
    hs = Nc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Kt(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  var xu = { readContext: Ma, useCallback: _t, useContext: _t, useEffect: _t, useImperativeHandle: _t, useInsertionEffect: _t, useLayoutEffect: _t, useMemo: _t, useReducer: _t, useRef: _t, useState: _t, useDebugValue: _t, useDeferredValue: _t, useTransition: _t, useMutableSource: _t, useSyncExternalStore: _t, useId: _t, unstable_isNewReconciler: !1 }, Gc = { readContext: Ma, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ma, useEffect: $c, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mo(
      4194308,
      4,
      Tu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return mo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return mo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Cr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Cr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Es.bind(null, Mt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Vc, useDebugValue: gs, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = Vc(!1), r = n[0];
    return n = Ss.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Mt, c = Cr();
    if (fn) {
      if (l === void 0) throw Error(A(407));
      l = l();
    } else {
      if (l = r(), Qn === null) throw Error(A(349));
      Wt & 30 || Ac(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, $c(jc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Ru(9, Fc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Cr(), r = Qn.identifierPrefix;
    if (fn) {
      var l = wi, o = Ti;
      l = (o & ~(1 << 32 - kr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Eu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = $++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Cs = {
    readContext: Ma,
    useCallback: Qc,
    useContext: Ma,
    useEffect: ms,
    useImperativeHandle: Yc,
    useInsertionEffect: Ic,
    useLayoutEffect: ys,
    useMemo: Wc,
    useReducer: Nl,
    useRef: Bc,
    useState: function() {
      return Nl(Ki);
    },
    useDebugValue: gs,
    useDeferredValue: function(n) {
      var r = wn();
      return bd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Nl(Ki)[0], r = wn().memoizedState;
      return [n, r];
    },
    useMutableSource: zc,
    useSyncExternalStore: Uc,
    useId: _d,
    unstable_isNewReconciler: !1
  }, qc = { readContext: Ma, useCallback: Qc, useContext: Ma, useEffect: ms, useImperativeHandle: Yc, useInsertionEffect: Ic, useLayoutEffect: ys, useMemo: Wc, useReducer: Cu, useRef: Bc, useState: function() {
    return Cu(Ki);
  }, useDebugValue: gs, useDeferredValue: function(n) {
    var r = wn();
    return zn === null ? r.memoizedState = n : bd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = Cu(Ki)[0], r = wn().memoizedState;
    return [n, r];
  }, useMutableSource: zc, useSyncExternalStore: Uc, useId: _d, unstable_isNewReconciler: !1 };
  function ri(n, r) {
    if (n && n.defaultProps) {
      r = re({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function kd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : re({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Kc = { isMounted: function(n) {
    return (n = n._reactInternals) ? We(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (zr(r, n, c, o), Oc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (zr(r, n, c, o), Oc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = Oi(n), c = qi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ll(n, c, o), r !== null && (zr(r, n, o, l), Oc(r, n, o));
  } };
  function jv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !es(l, o) || !es(c, d) : !0;
  }
  function Xc(n, r, l) {
    var o = !1, c = Er, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ma(d) : (c = Mn(r) ? Wr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Gr(n, c) : Er), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Kc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Hv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Kc.enqueueReplaceState(r, r.state, null);
  }
  function Rs(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Td(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ma(d) : (d = Mn(r) ? Wr : Sn.current, c.context = Gr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (kd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Kc.enqueueReplaceState(c, c.state, null), cs(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function bu(n, r) {
    try {
      var l = "", o = r;
      do
        l += lt(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Dd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Od(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Zc = typeof WeakMap == "function" ? WeakMap : Map;
  function Pv(n, r, l) {
    l = qi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      To || (To = !0, Du = o), Od(n, r);
    }, l;
  }
  function Ld(n, r, l) {
    l = qi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Od(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Od(n, r), typeof o != "function" && (Al === null ? Al = /* @__PURE__ */ new Set([this]) : Al.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Md(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Zc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = vy.bind(null, n, r, l), r.then(n, n));
  }
  function Vv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function zl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = qi(-1, 1), r.tag = 2, Ll(l, r, 1))), l.lanes |= 1), n);
  }
  var Ts = ht.ReactCurrentOwner, Un = !1;
  function lr(n, r, l, o) {
    r.child = n === null ? le(r, null, l, o) : Tn(r, n.child, l, o);
  }
  function Jr(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ml(n, r, l, o, d, c), l = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && l && bc(r), r.flags |= 1, lr(n, r, o, c), r.child);
  }
  function _u(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Qd(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Xe(n, r, d, o, c)) : (n = Hs(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : es, l(m, o) && n.ref === r.ref) return za(n, r, c);
    }
    return r.flags |= 1, n = jl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Xe(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (es(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Un = !0);
      else return r.lanes = n.lanes, za(n, r, c);
    }
    return Bv(n, r, l, o, c);
  }
  function ws(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(Eo, ma), ma |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, xe(Eo, ma), ma |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, xe(Eo, ma), ma |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, xe(Eo, ma), ma |= o;
    return lr(n, r, c, l), r.child;
  }
  function Nd(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Bv(n, r, l, o, c) {
    var d = Mn(l) ? Wr : Sn.current;
    return d = Gr(r, d), mn(r, c), l = Ml(n, r, l, o, d, c), o = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && o && bc(r), r.flags |= 1, lr(n, r, l, c), r.child);
  }
  function $v(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Kn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) Na(n, r), Xc(r, l, o), Rs(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, z = l.contextType;
      typeof z == "object" && z !== null ? z = Ma(z) : (z = Mn(l) ? Wr : Sn.current, z = Gr(r, z));
      var Y = l.getDerivedStateFromProps, G = typeof Y == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      G || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== z) && Hv(r, m, o, z), ha = !1;
      var I = r.memoizedState;
      m.state = I, cs(r, o, m, c), T = r.memoizedState, E !== o || I !== T || In.current || ha ? (typeof Y == "function" && (kd(r, l, Y, o), T = r.memoizedState), (E = ha || jv(r, l, E, o, I, T, z)) ? (G || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = z, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, zv(n, r), E = r.memoizedProps, z = r.type === r.elementType ? E : ri(r.type, E), m.props = z, G = r.pendingProps, I = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = Ma(T) : (T = Mn(l) ? Wr : Sn.current, T = Gr(r, T));
      var fe = l.getDerivedStateFromProps;
      (Y = typeof fe == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== G || I !== T) && Hv(r, m, o, T), ha = !1, I = r.memoizedState, m.state = I, cs(r, o, m, c);
      var me = r.memoizedState;
      E !== G || I !== me || In.current || ha ? (typeof fe == "function" && (kd(r, l, fe, o), me = r.memoizedState), (z = ha || jv(r, l, z, o, I, me, T) || !1) ? (Y || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, me, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, me, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = me), m.props = o, m.state = me, m.context = T, o = z) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return xs(n, r, l, o, d, c);
  }
  function xs(n, r, l, o, c, d) {
    Nd(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && wc(r, l, !1), za(n, r, d);
    o = r.stateNode, Ts.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Tn(r, n.child, null, d), r.child = Tn(r, null, E, d)) : lr(n, r, E, d), r.memoizedState = o.state, c && wc(r, l, !0), r.child;
  }
  function go(n) {
    var r = n.stateNode;
    r.pendingContext ? Ov(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Ov(n, r.context, !1), xd(n, r.containerInfo);
  }
  function Iv(n, r, l, o, c) {
    return Ol(), Gi(c), r.flags |= 256, lr(n, r, l, o), r.child;
  }
  var Jc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ef(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), xe(yn, c & 1), n === null)
      return md(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Hl(m, o, 0, null), n = el(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = zd(l), r.memoizedState = Jc, n) : Ud(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Yv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = jl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = jl(E, d) : (d = el(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? zd(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Jc, o;
    }
    return d = n.child, n = d.sibling, o = jl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Ud(n, r) {
    return r = Hl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function bs(n, r, l, o) {
    return o !== null && Gi(o), Tn(r, n.child, null, l), n = Ud(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Yv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Dd(Error(A(422))), bs(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Hl({ mode: "visible", children: o.children }, c, 0, null), d = el(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Tn(r, n.child, null, m), r.child.memoizedState = zd(m), r.memoizedState = Jc, d);
    if (!(r.mode & 1)) return bs(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(A(419)), o = Dd(d, o, void 0), bs(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Qn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, va(n, c), zr(o, n, c, -1));
      }
      return Yd(), o = Dd(Error(A(421))), bs(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = hy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, Kr = Si(c.nextSibling), qr = r, fn = !0, La = null, n !== null && (Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = da, Ti = n.id, wi = n.overflow, da = r), r = Ud(r, o.children), r.flags |= 4096, r);
  }
  function Ad(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Ed(n.return, r, l);
  }
  function Lr(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function bi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (lr(n, r, o.children, l), o = yn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Ad(n, l, r);
        else if (n.tag === 19) Ad(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (xe(yn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Mc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Lr(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Mc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Lr(r, !0, l, null, d);
        break;
      case "together":
        Lr(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Na(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function za(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Di |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(A(153));
    if (r.child !== null) {
      for (n = r.child, l = jl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = jl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function _s(n, r, l) {
    switch (r.tag) {
      case 3:
        go(r), Ol();
        break;
      case 5:
        Av(r);
        break;
      case 1:
        Mn(r.type) && Kn(r);
        break;
      case 4:
        xd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        xe(pa, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (xe(yn, yn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ef(n, r, l) : (xe(yn, yn.current & 1), n = za(n, r, l), n !== null ? n.sibling : null);
        xe(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return bi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), xe(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ws(n, r, l);
    }
    return za(n, r, l);
  }
  var Ua, An, Qv, Wv;
  Ua = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, An = function() {
  }, Qv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, gu(xi.current);
      var d = null;
      switch (l) {
        case "input":
          c = tr(n, c), o = tr(n, o), d = [];
          break;
        case "select":
          c = re({}, c, { value: void 0 }), o = re({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wl);
      }
      ln(l, o);
      var m;
      l = null;
      for (z in c) if (!o.hasOwnProperty(z) && c.hasOwnProperty(z) && c[z] != null) if (z === "style") {
        var E = c[z];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else z !== "dangerouslySetInnerHTML" && z !== "children" && z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && z !== "autoFocus" && (ct.hasOwnProperty(z) ? d || (d = []) : (d = d || []).push(z, null));
      for (z in o) {
        var T = o[z];
        if (E = c != null ? c[z] : void 0, o.hasOwnProperty(z) && T !== E && (T != null || E != null)) if (z === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          z,
          l
        )), l = T;
        else z === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(z, T)) : z === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(z, "" + T) : z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && (ct.hasOwnProperty(z) ? (T != null && z === "onScroll" && Ht("scroll", n), d || E === T || (d = [])) : (d = d || []).push(z, T));
      }
      l && (d = d || []).push("style", l);
      var z = d;
      (r.updateQueue = z) && (r.flags |= 4);
    }
  }, Wv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function ks(n, r) {
    if (!fn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Zn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Gv(n, r, l) {
    var o = r.pendingProps;
    switch (_c(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Zn(r), null;
      case 1:
        return Mn(r.type) && po(), Zn(r), null;
      case 3:
        return o = r.stateNode, Su(), nn(In), nn(Sn), ke(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (kc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, La !== null && (Ou(La), La = null))), An(n, r), Zn(r), null;
      case 5:
        Lc(r);
        var c = gu(ps.current);
        if (l = r.type, n !== null && r.stateNode != null) Qv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(A(166));
            return Zn(r), null;
          }
          if (n = gu(xi.current), kc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Ei] = r, o[ls] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Ht("cancel", o), Ht("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Ht("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < rs.length; c++) Ht(rs[c], o);
                break;
              case "source":
                Ht("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Ht(
                  "error",
                  o
                ), Ht("load", o);
                break;
              case "details":
                Ht("toggle", o);
                break;
              case "input":
                Pn(o, d), Ht("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Ht("invalid", o);
                break;
              case "textarea":
                yr(o, d), Ht("invalid", o);
            }
            ln(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && Ec(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && Ec(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : ct.hasOwnProperty(m) && E != null && m === "onScroll" && Ht("scroll", o);
            }
            switch (l) {
              case "input":
                Dn(o), si(o, d, !0);
                break;
              case "textarea":
                Dn(o), On(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = wl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = gr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Ei] = r, n[ls] = o, Ua(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = qn(l, o), l) {
                case "dialog":
                  Ht("cancel", n), Ht("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ht("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < rs.length; c++) Ht(rs[c], n);
                  c = o;
                  break;
                case "source":
                  Ht("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Ht(
                    "error",
                    n
                  ), Ht("load", n), c = o;
                  break;
                case "details":
                  Ht("toggle", n), c = o;
                  break;
                case "input":
                  Pn(n, o), c = tr(n, o), Ht("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = re({}, o, { value: void 0 }), Ht("invalid", n);
                  break;
                case "textarea":
                  yr(n, o), c = Bn(n, o), Ht("invalid", n);
                  break;
                default:
                  c = o;
              }
              ln(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? Zt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && ci(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && te(n, T) : typeof T == "number" && te(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (ct.hasOwnProperty(d) ? T != null && d === "onScroll" && Ht("scroll", n) : T != null && Ye(n, d, T, m));
              }
              switch (l) {
                case "input":
                  Dn(n), si(n, o, !1);
                  break;
                case "textarea":
                  Dn(n), On(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + rt(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = wl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Zn(r), null;
      case 6:
        if (n && r.stateNode != null) Wv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(A(166));
          if (l = gu(ps.current), gu(xi.current), kc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Ei] = r, (d = o.nodeValue !== l) && (n = qr, n !== null)) switch (n.tag) {
              case 3:
                Ec(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Ec(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Ei] = r, r.stateNode = o;
        }
        return Zn(r), null;
      case 13:
        if (nn(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (fn && Kr !== null && r.mode & 1 && !(r.flags & 128)) ss(), Ol(), r.flags |= 98560, d = !1;
          else if (d = kc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(A(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(A(317));
              d[Ei] = r;
            } else Ol(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Zn(r), d = !1;
          } else La !== null && (Ou(La), La = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || yn.current & 1 ? bn === 0 && (bn = 3) : Yd())), r.updateQueue !== null && (r.flags |= 4), Zn(r), null);
      case 4:
        return Su(), An(n, r), n === null && uo(r.stateNode.containerInfo), Zn(r), null;
      case 10:
        return Sd(r.type._context), Zn(r), null;
      case 17:
        return Mn(r.type) && po(), Zn(r), null;
      case 19:
        if (nn(yn), d = r.memoizedState, d === null) return Zn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) ks(d, !1);
        else {
          if (bn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = Mc(n), m !== null) {
              for (r.flags |= 128, ks(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return xe(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Ge() > Ro && (r.flags |= 128, o = !0, ks(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Mc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), ks(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !fn) return Zn(r), null;
          } else 2 * Ge() - d.renderingStartTime > Ro && l !== 1073741824 && (r.flags |= 128, o = !0, ks(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Ge(), r.sibling = null, l = yn.current, xe(yn, o ? l & 1 | 2 : l & 1), r) : (Zn(r), null);
      case 22:
      case 23:
        return Id(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ma & 1073741824 && (Zn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Zn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(A(156, r.tag));
  }
  function tf(n, r) {
    switch (_c(r), r.tag) {
      case 1:
        return Mn(r.type) && po(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Su(), nn(In), nn(Sn), ke(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Lc(r), null;
      case 13:
        if (nn(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(A(340));
          Ol();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return nn(yn), null;
      case 4:
        return Su(), null;
      case 10:
        return Sd(r.type._context), null;
      case 22:
      case 23:
        return Id(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ds = !1, Rr = !1, oy = typeof WeakSet == "function" ? WeakSet : Set, ve = null;
  function So(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      dn(n, r, o);
    }
    else l.current = null;
  }
  function nf(n, r, l) {
    try {
      l();
    } catch (o) {
      dn(n, r, o);
    }
  }
  var qv = !1;
  function Kv(n, r) {
    if (is = ba, n = ts(), dc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, E = -1, T = -1, z = 0, Y = 0, G = n, I = null;
          t: for (; ; ) {
            for (var fe; G !== l || c !== 0 && G.nodeType !== 3 || (E = m + c), G !== d || o !== 0 && G.nodeType !== 3 || (T = m + o), G.nodeType === 3 && (m += G.nodeValue.length), (fe = G.firstChild) !== null; )
              I = G, G = fe;
            for (; ; ) {
              if (G === n) break t;
              if (I === l && ++z === c && (E = m), I === d && ++Y === o && (T = m), (fe = G.nextSibling) !== null) break;
              G = I, I = G.parentNode;
            }
            G = fe;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (du = { focusedElem: n, selectionRange: l }, ba = !1, ve = r; ve !== null; ) if (r = ve, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, ve = n;
    else for (; ve !== null; ) {
      r = ve;
      try {
        var me = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (me !== null) {
              var Ee = me.memoizedProps, _n = me.memoizedState, k = r.stateNode, x = k.getSnapshotBeforeUpdate(r.elementType === r.type ? Ee : ri(r.type, Ee), _n);
              k.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(A(163));
        }
      } catch (Q) {
        dn(r, r.return, Q);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, ve = n;
        break;
      }
      ve = r.return;
    }
    return me = qv, qv = !1, me;
  }
  function Os(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && nf(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ls(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Fd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function rf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, rf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ei], delete r[ls], delete r[us], delete r[fo], delete r[ly])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Ms(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Xi(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Ms(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function _i(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wl));
    else if (o !== 4 && (n = n.child, n !== null)) for (_i(n, r, l), n = n.sibling; n !== null; ) _i(n, r, l), n = n.sibling;
  }
  function ki(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (ki(n, r, l), n = n.sibling; n !== null; ) ki(n, r, l), n = n.sibling;
  }
  var xn = null, Mr = !1;
  function Nr(n, r, l) {
    for (l = l.child; l !== null; ) Xv(n, r, l), l = l.sibling;
  }
  function Xv(n, r, l) {
    if (Yr && typeof Yr.onCommitFiberUnmount == "function") try {
      Yr.onCommitFiberUnmount(hl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Rr || So(l, r);
      case 6:
        var o = xn, c = Mr;
        xn = null, Nr(n, r, l), xn = o, Mr = c, xn !== null && (Mr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : xn.removeChild(l.stateNode));
        break;
      case 18:
        xn !== null && (Mr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? co(n.parentNode, l) : n.nodeType === 1 && co(n, l), Za(n)) : co(xn, l.stateNode));
        break;
      case 4:
        o = xn, c = Mr, xn = l.stateNode.containerInfo, Mr = !0, Nr(n, r, l), xn = o, Mr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Rr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && nf(l, r, m), c = c.next;
          } while (c !== o);
        }
        Nr(n, r, l);
        break;
      case 1:
        if (!Rr && (So(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          dn(l, r, E);
        }
        Nr(n, r, l);
        break;
      case 21:
        Nr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Rr = (o = Rr) || l.memoizedState !== null, Nr(n, r, l), Rr = o) : Nr(n, r, l);
        break;
      default:
        Nr(n, r, l);
    }
  }
  function Zv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new oy()), r.forEach(function(o) {
        var c = uh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ai(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              xn = E.stateNode, Mr = !1;
              break e;
            case 3:
              xn = E.stateNode.containerInfo, Mr = !0;
              break e;
            case 4:
              xn = E.stateNode.containerInfo, Mr = !0;
              break e;
          }
          E = E.return;
        }
        if (xn === null) throw Error(A(160));
        Xv(d, m, c), xn = null, Mr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (z) {
        dn(c, r, z);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) jd(r, n), r = r.sibling;
  }
  function jd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ai(r, n), ea(n), o & 4) {
          try {
            Os(3, n, n.return), Ls(3, n);
          } catch (Ee) {
            dn(n, n.return, Ee);
          }
          try {
            Os(5, n, n.return);
          } catch (Ee) {
            dn(n, n.return, Ee);
          }
        }
        break;
      case 1:
        ai(r, n), ea(n), o & 512 && l !== null && So(l, l.return);
        break;
      case 5:
        if (ai(r, n), ea(n), o & 512 && l !== null && So(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            te(c, "");
          } catch (Ee) {
            dn(n, n.return, Ee);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Vn(c, d), qn(E, m);
            var z = qn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var Y = T[m], G = T[m + 1];
              Y === "style" ? Zt(c, G) : Y === "dangerouslySetInnerHTML" ? ci(c, G) : Y === "children" ? te(c, G) : Ye(c, Y, G, z);
            }
            switch (E) {
              case "input":
                Ir(c, d);
                break;
              case "textarea":
                Ia(c, d);
                break;
              case "select":
                var I = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var fe = d.value;
                fe != null ? Cn(c, !!d.multiple, fe, !1) : I !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[ls] = d;
          } catch (Ee) {
            dn(n, n.return, Ee);
          }
        }
        break;
      case 6:
        if (ai(r, n), ea(n), o & 4) {
          if (n.stateNode === null) throw Error(A(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Ee) {
            dn(n, n.return, Ee);
          }
        }
        break;
      case 3:
        if (ai(r, n), ea(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Za(r.containerInfo);
        } catch (Ee) {
          dn(n, n.return, Ee);
        }
        break;
      case 4:
        ai(r, n), ea(n);
        break;
      case 13:
        ai(r, n), ea(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Vd = Ge())), o & 4 && Zv(n);
        break;
      case 22:
        if (Y = l !== null && l.memoizedState !== null, n.mode & 1 ? (Rr = (z = Rr) || Y, ai(r, n), Rr = z) : ai(r, n), ea(n), o & 8192) {
          if (z = n.memoizedState !== null, (n.stateNode.isHidden = z) && !Y && n.mode & 1) for (ve = n, Y = n.child; Y !== null; ) {
            for (G = ve = Y; ve !== null; ) {
              switch (I = ve, fe = I.child, I.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Os(4, I, I.return);
                  break;
                case 1:
                  So(I, I.return);
                  var me = I.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    o = I, l = I.return;
                    try {
                      r = o, me.props = r.memoizedProps, me.state = r.memoizedState, me.componentWillUnmount();
                    } catch (Ee) {
                      dn(o, l, Ee);
                    }
                  }
                  break;
                case 5:
                  So(I, I.return);
                  break;
                case 22:
                  if (I.memoizedState !== null) {
                    Ns(G);
                    continue;
                  }
              }
              fe !== null ? (fe.return = I, ve = fe) : Ns(G);
            }
            Y = Y.sibling;
          }
          e: for (Y = null, G = n; ; ) {
            if (G.tag === 5) {
              if (Y === null) {
                Y = G;
                try {
                  c = G.stateNode, z ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = G.stateNode, T = G.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = Ft("display", m));
                } catch (Ee) {
                  dn(n, n.return, Ee);
                }
              }
            } else if (G.tag === 6) {
              if (Y === null) try {
                G.stateNode.nodeValue = z ? "" : G.memoizedProps;
              } catch (Ee) {
                dn(n, n.return, Ee);
              }
            } else if ((G.tag !== 22 && G.tag !== 23 || G.memoizedState === null || G === n) && G.child !== null) {
              G.child.return = G, G = G.child;
              continue;
            }
            if (G === n) break e;
            for (; G.sibling === null; ) {
              if (G.return === null || G.return === n) break e;
              Y === G && (Y = null), G = G.return;
            }
            Y === G && (Y = null), G.sibling.return = G.return, G = G.sibling;
          }
        }
        break;
      case 19:
        ai(r, n), ea(n), o & 4 && Zv(n);
        break;
      case 21:
        break;
      default:
        ai(
          r,
          n
        ), ea(n);
    }
  }
  function ea(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Ms(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(A(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (te(c, ""), o.flags &= -33);
            var d = Xi(n);
            ki(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = Xi(n);
            _i(n, E, m);
            break;
          default:
            throw Error(A(161));
        }
      } catch (T) {
        dn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function sy(n, r, l) {
    ve = n, Hd(n);
  }
  function Hd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; ve !== null; ) {
      var c = ve, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || Ds;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || Rr;
          E = Ds;
          var z = Rr;
          if (Ds = m, (Rr = T) && !z) for (ve = c; ve !== null; ) m = ve, T = m.child, m.tag === 22 && m.memoizedState !== null ? Pd(c) : T !== null ? (T.return = m, ve = T) : Pd(c);
          for (; d !== null; ) ve = d, Hd(d), d = d.sibling;
          ve = c, Ds = E, Rr = z;
        }
        Jv(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, ve = d) : Jv(n);
    }
  }
  function Jv(n) {
    for (; ve !== null; ) {
      var r = ve;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Rr || Ls(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Rr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ri(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && wd(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                wd(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var z = r.alternate;
                if (z !== null) {
                  var Y = z.memoizedState;
                  if (Y !== null) {
                    var G = Y.dehydrated;
                    G !== null && Za(G);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(A(163));
          }
          Rr || r.flags & 512 && Fd(r);
        } catch (I) {
          dn(r, r.return, I);
        }
      }
      if (r === n) {
        ve = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ve = l;
        break;
      }
      ve = r.return;
    }
  }
  function Ns(n) {
    for (; ve !== null; ) {
      var r = ve;
      if (r === n) {
        ve = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ve = l;
        break;
      }
      ve = r.return;
    }
  }
  function Pd(n) {
    for (; ve !== null; ) {
      var r = ve;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Ls(4, r);
            } catch (T) {
              dn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                dn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Fd(r);
            } catch (T) {
              dn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Fd(r);
            } catch (T) {
              dn(r, m, T);
            }
        }
      } catch (T) {
        dn(r, r.return, T);
      }
      if (r === n) {
        ve = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, ve = E;
        break;
      }
      ve = r.return;
    }
  }
  var cy = Math.ceil, Ul = ht.ReactCurrentDispatcher, ku = ht.ReactCurrentOwner, ur = ht.ReactCurrentBatchConfig, Et = 0, Qn = null, Fn = null, or = 0, ma = 0, Eo = Da(0), bn = 0, zs = null, Di = 0, Co = 0, af = 0, Us = null, ta = null, Vd = 0, Ro = 1 / 0, ya = null, To = !1, Du = null, Al = null, lf = !1, Zi = null, As = 0, Fl = 0, wo = null, Fs = -1, Tr = 0;
  function jn() {
    return Et & 6 ? Ge() : Fs !== -1 ? Fs : Fs = Ge();
  }
  function Oi(n) {
    return n.mode & 1 ? Et & 2 && or !== 0 ? or & -or : uy.transition !== null ? (Tr === 0 && (Tr = qu()), Tr) : (n = Ot, n !== 0 || (n = window.event, n = n === void 0 ? 16 : no(n.type)), n) : 1;
  }
  function zr(n, r, l, o) {
    if (50 < Fl) throw Fl = 0, wo = null, Error(A(185));
    Hi(n, l, o), (!(Et & 2) || n !== Qn) && (n === Qn && (!(Et & 2) && (Co |= l), bn === 4 && ii(n, or)), na(n, o), l === 1 && Et === 0 && !(r.mode & 1) && (Ro = Ge() + 500, vo && Ri()));
  }
  function na(n, r) {
    var l = n.callbackNode;
    ru(n, r);
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) l !== null && rr(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && rr(l), r === 1) n.tag === 0 ? bl(Bd.bind(null, n)) : xc(Bd.bind(null, n)), so(function() {
        !(Et & 6) && Ri();
      }), l = null;
      else {
        switch (Xu(o)) {
          case 1:
            l = qa;
            break;
          case 4:
            l = tu;
            break;
          case 16:
            l = nu;
            break;
          case 536870912:
            l = Qu;
            break;
          default:
            l = nu;
        }
        l = sh(l, uf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function uf(n, r) {
    if (Fs = -1, Tr = 0, Et & 6) throw Error(A(327));
    var l = n.callbackNode;
    if (xo() && n.callbackNode !== l) return null;
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = of(n, o);
    else {
      r = o;
      var c = Et;
      Et |= 2;
      var d = th();
      (Qn !== n || or !== r) && (ya = null, Ro = Ge() + 500, Ji(n, r));
      do
        try {
          nh();
          break;
        } catch (E) {
          eh(n, E);
        }
      while (!0);
      gd(), Ul.current = d, Et = c, Fn !== null ? r = 0 : (Qn = null, or = 0, r = bn);
    }
    if (r !== 0) {
      if (r === 2 && (c = yl(n), c !== 0 && (o = c, r = js(n, c))), r === 1) throw l = zs, Ji(n, 0), ii(n, o), na(n, Ge()), l;
      if (r === 6) ii(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !fy(c) && (r = of(n, o), r === 2 && (d = yl(n), d !== 0 && (o = d, r = js(n, d))), r === 1)) throw l = zs, Ji(n, 0), ii(n, o), na(n, Ge()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(A(345));
          case 2:
            Mu(n, ta, ya);
            break;
          case 3:
            if (ii(n, o), (o & 130023424) === o && (r = Vd + 500 - Ge(), 10 < r)) {
              if (Xa(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Rc(Mu.bind(null, n, ta, ya), r);
              break;
            }
            Mu(n, ta, ya);
            break;
          case 4:
            if (ii(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - kr(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Ge() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * cy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Rc(Mu.bind(null, n, ta, ya), o);
              break;
            }
            Mu(n, ta, ya);
            break;
          case 5:
            Mu(n, ta, ya);
            break;
          default:
            throw Error(A(329));
        }
      }
    }
    return na(n, Ge()), n.callbackNode === l ? uf.bind(null, n) : null;
  }
  function js(n, r) {
    var l = Us;
    return n.current.memoizedState.isDehydrated && (Ji(n, r).flags |= 256), n = of(n, r), n !== 2 && (r = ta, ta = l, r !== null && Ou(r)), n;
  }
  function Ou(n) {
    ta === null ? ta = n : ta.push.apply(ta, n);
  }
  function fy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ei(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ii(n, r) {
    for (r &= ~af, r &= ~Co, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - kr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Bd(n) {
    if (Et & 6) throw Error(A(327));
    xo();
    var r = Xa(n, 0);
    if (!(r & 1)) return na(n, Ge()), null;
    var l = of(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = yl(n);
      o !== 0 && (r = o, l = js(n, o));
    }
    if (l === 1) throw l = zs, Ji(n, 0), ii(n, r), na(n, Ge()), l;
    if (l === 6) throw Error(A(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Mu(n, ta, ya), na(n, Ge()), null;
  }
  function $d(n, r) {
    var l = Et;
    Et |= 1;
    try {
      return n(r);
    } finally {
      Et = l, Et === 0 && (Ro = Ge() + 500, vo && Ri());
    }
  }
  function Lu(n) {
    Zi !== null && Zi.tag === 0 && !(Et & 6) && xo();
    var r = Et;
    Et |= 1;
    var l = ur.transition, o = Ot;
    try {
      if (ur.transition = null, Ot = 1, n) return n();
    } finally {
      Ot = o, ur.transition = l, Et = r, !(Et & 6) && Ri();
    }
  }
  function Id() {
    ma = Eo.current, nn(Eo);
  }
  function Ji(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, pd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (_c(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && po();
          break;
        case 3:
          Su(), nn(In), nn(Sn), ke();
          break;
        case 5:
          Lc(o);
          break;
        case 4:
          Su();
          break;
        case 13:
          nn(yn);
          break;
        case 19:
          nn(yn);
          break;
        case 10:
          Sd(o.type._context);
          break;
        case 22:
        case 23:
          Id();
      }
      l = l.return;
    }
    if (Qn = n, Fn = n = jl(n.current, null), or = ma = r, bn = 0, zs = null, af = Co = Di = 0, ta = Us = null, yu !== null) {
      for (r = 0; r < yu.length; r++) if (l = yu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      yu = null;
    }
    return n;
  }
  function eh(n, r) {
    do {
      var l = Fn;
      try {
        if (gd(), st.current = xu, Nc) {
          for (var o = Mt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Nc = !1;
        }
        if (Wt = 0, Xn = zn = Mt = null, hs = !1, Eu = 0, ku.current = null, l === null || l.return === null) {
          bn = 1, zs = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = or, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var z = T, Y = E, G = Y.tag;
            if (!(Y.mode & 1) && (G === 0 || G === 11 || G === 15)) {
              var I = Y.alternate;
              I ? (Y.updateQueue = I.updateQueue, Y.memoizedState = I.memoizedState, Y.lanes = I.lanes) : (Y.updateQueue = null, Y.memoizedState = null);
            }
            var fe = Vv(m);
            if (fe !== null) {
              fe.flags &= -257, zl(fe, m, E, d, r), fe.mode & 1 && Md(d, z, r), r = fe, T = z;
              var me = r.updateQueue;
              if (me === null) {
                var Ee = /* @__PURE__ */ new Set();
                Ee.add(T), r.updateQueue = Ee;
              } else me.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Md(d, z, r), Yd();
                break e;
              }
              T = Error(A(426));
            }
          } else if (fn && E.mode & 1) {
            var _n = Vv(m);
            if (_n !== null) {
              !(_n.flags & 65536) && (_n.flags |= 256), zl(_n, m, E, d, r), Gi(bu(T, E));
              break e;
            }
          }
          d = T = bu(T, E), bn !== 4 && (bn = 2), Us === null ? Us = [d] : Us.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var k = Pv(d, T, r);
                Uv(d, k);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Al === null || !Al.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Q = Ld(d, E, r);
                  Uv(d, Q);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        ah(l);
      } catch (ye) {
        r = ye, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function th() {
    var n = Ul.current;
    return Ul.current = xu, n === null ? xu : n;
  }
  function Yd() {
    (bn === 0 || bn === 3 || bn === 2) && (bn = 4), Qn === null || !(Di & 268435455) && !(Co & 268435455) || ii(Qn, or);
  }
  function of(n, r) {
    var l = Et;
    Et |= 2;
    var o = th();
    (Qn !== n || or !== r) && (ya = null, Ji(n, r));
    do
      try {
        dy();
        break;
      } catch (c) {
        eh(n, c);
      }
    while (!0);
    if (gd(), Et = l, Ul.current = o, Fn !== null) throw Error(A(261));
    return Qn = null, or = 0, bn;
  }
  function dy() {
    for (; Fn !== null; ) rh(Fn);
  }
  function nh() {
    for (; Fn !== null && !Wa(); ) rh(Fn);
  }
  function rh(n) {
    var r = oh(n.alternate, n, ma);
    n.memoizedProps = n.pendingProps, r === null ? ah(n) : Fn = r, ku.current = null;
  }
  function ah(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = tf(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          bn = 6, Fn = null;
          return;
        }
      } else if (l = Gv(l, r, ma), l !== null) {
        Fn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    bn === 0 && (bn = 5);
  }
  function Mu(n, r, l) {
    var o = Ot, c = ur.transition;
    try {
      ur.transition = null, Ot = 1, py(n, r, l, o);
    } finally {
      ur.transition = c, Ot = o;
    }
    return null;
  }
  function py(n, r, l, o) {
    do
      xo();
    while (Zi !== null);
    if (Et & 6) throw Error(A(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(A(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (Qf(n, d), n === Qn && (Fn = Qn = null, or = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || lf || (lf = !0, sh(nu, function() {
      return xo(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = ur.transition, ur.transition = null;
      var m = Ot;
      Ot = 1;
      var E = Et;
      Et |= 4, ku.current = null, Kv(n, l), jd(l, n), io(du), ba = !!is, du = is = null, n.current = l, sy(l), Ga(), Et = E, Ot = m, ur.transition = d;
    } else n.current = l;
    if (lf && (lf = !1, Zi = n, As = c), d = n.pendingLanes, d === 0 && (Al = null), Yo(l.stateNode), na(n, Ge()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (To) throw To = !1, n = Du, Du = null, n;
    return As & 1 && n.tag !== 0 && xo(), d = n.pendingLanes, d & 1 ? n === wo ? Fl++ : (Fl = 0, wo = n) : Fl = 0, Ri(), null;
  }
  function xo() {
    if (Zi !== null) {
      var n = Xu(As), r = ur.transition, l = Ot;
      try {
        if (ur.transition = null, Ot = 16 > n ? 16 : n, Zi === null) var o = !1;
        else {
          if (n = Zi, Zi = null, As = 0, Et & 6) throw Error(A(331));
          var c = Et;
          for (Et |= 4, ve = n.current; ve !== null; ) {
            var d = ve, m = d.child;
            if (ve.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var z = E[T];
                  for (ve = z; ve !== null; ) {
                    var Y = ve;
                    switch (Y.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Os(8, Y, d);
                    }
                    var G = Y.child;
                    if (G !== null) G.return = Y, ve = G;
                    else for (; ve !== null; ) {
                      Y = ve;
                      var I = Y.sibling, fe = Y.return;
                      if (rf(Y), Y === z) {
                        ve = null;
                        break;
                      }
                      if (I !== null) {
                        I.return = fe, ve = I;
                        break;
                      }
                      ve = fe;
                    }
                  }
                }
                var me = d.alternate;
                if (me !== null) {
                  var Ee = me.child;
                  if (Ee !== null) {
                    me.child = null;
                    do {
                      var _n = Ee.sibling;
                      Ee.sibling = null, Ee = _n;
                    } while (Ee !== null);
                  }
                }
                ve = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, ve = m;
            else e: for (; ve !== null; ) {
              if (d = ve, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Os(9, d, d.return);
              }
              var k = d.sibling;
              if (k !== null) {
                k.return = d.return, ve = k;
                break e;
              }
              ve = d.return;
            }
          }
          var x = n.current;
          for (ve = x; ve !== null; ) {
            m = ve;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null) L.return = m, ve = L;
            else e: for (m = x; ve !== null; ) {
              if (E = ve, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ls(9, E);
                }
              } catch (ye) {
                dn(E, E.return, ye);
              }
              if (E === m) {
                ve = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, ve = Q;
                break e;
              }
              ve = E.return;
            }
          }
          if (Et = c, Ri(), Yr && typeof Yr.onPostCommitFiberRoot == "function") try {
            Yr.onPostCommitFiberRoot(hl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Ot = l, ur.transition = r;
      }
    }
    return !1;
  }
  function ih(n, r, l) {
    r = bu(l, r), r = Pv(n, r, 1), n = Ll(n, r, 1), r = jn(), n !== null && (Hi(n, 1, r), na(n, r));
  }
  function dn(n, r, l) {
    if (n.tag === 3) ih(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ih(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Al === null || !Al.has(o))) {
          n = bu(l, n), n = Ld(r, n, 1), r = Ll(r, n, 1), n = jn(), r !== null && (Hi(r, 1, n), na(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function vy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Qn === n && (or & l) === l && (bn === 4 || bn === 3 && (or & 130023424) === or && 500 > Ge() - Vd ? Ji(n, 0) : af |= l), na(n, r);
  }
  function lh(n, r) {
    r === 0 && (n.mode & 1 ? (r = fa, fa <<= 1, !(fa & 130023424) && (fa = 4194304)) : r = 1);
    var l = jn();
    n = va(n, r), n !== null && (Hi(n, r, l), na(n, l));
  }
  function hy(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), lh(n, l);
  }
  function uh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(A(314));
    }
    o !== null && o.delete(r), lh(n, l);
  }
  var oh;
  oh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || In.current) Un = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Un = !1, _s(n, r, l);
      Un = !!(n.flags & 131072);
    }
    else Un = !1, fn && r.flags & 1048576 && Lv(r, Wi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Na(n, r), n = r.pendingProps;
        var c = Gr(r, Sn.current);
        mn(r, l), c = Ml(null, r, o, n, c, l);
        var d = ni();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Kn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Td(r), c.updater = Kc, r.stateNode = c, c._reactInternals = r, Rs(r, o, n, l), r = xs(null, r, o, !0, d, l)) : (r.tag = 0, fn && d && bc(r), lr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Na(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = yy(o), n = ri(o, n), c) {
            case 0:
              r = Bv(null, r, o, n, l);
              break e;
            case 1:
              r = $v(null, r, o, n, l);
              break e;
            case 11:
              r = Jr(null, r, o, n, l);
              break e;
            case 14:
              r = _u(null, r, o, ri(o.type, n), l);
              break e;
          }
          throw Error(A(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Bv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), $v(n, r, o, c, l);
      case 3:
        e: {
          if (go(r), n === null) throw Error(A(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, zv(n, r), cs(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = bu(Error(A(423)), r), r = Iv(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = bu(Error(A(424)), r), r = Iv(n, r, o, l, c);
            break e;
          } else for (Kr = Si(r.stateNode.containerInfo.firstChild), qr = r, fn = !0, La = null, l = le(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ol(), o === c) {
              r = za(n, r, l);
              break e;
            }
            lr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Av(r), n === null && md(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Cc(o, c) ? m = null : d !== null && Cc(o, d) && (r.flags |= 32), Nd(n, r), lr(n, r, m, l), r.child;
      case 6:
        return n === null && md(r), null;
      case 13:
        return ef(n, r, l);
      case 4:
        return xd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Tn(r, null, o, l) : lr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Jr(n, r, o, c, l);
      case 7:
        return lr(n, r, r.pendingProps, l), r.child;
      case 8:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, xe(pa, o._currentValue), o._currentValue = m, d !== null) if (ei(d.value, m)) {
            if (d.children === c.children && !In.current) {
              r = za(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = qi(-1, l & -l), T.tag = 2;
                    var z = d.updateQueue;
                    if (z !== null) {
                      z = z.shared;
                      var Y = z.pending;
                      Y === null ? T.next = T : (T.next = Y.next, Y.next = T), z.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Ed(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(A(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Ed(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          lr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = Ma(c), o = o(c), r.flags |= 1, lr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ri(o, r.pendingProps), c = ri(o.type, c), _u(n, r, o, c, l);
      case 15:
        return Xe(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Na(n, r), r.tag = 1, Mn(o) ? (n = !0, Kn(r)) : n = !1, mn(r, l), Xc(r, o, c), Rs(r, o, c, l), xs(null, r, o, !0, n, l);
      case 19:
        return bi(n, r, l);
      case 22:
        return ws(n, r, l);
    }
    throw Error(A(156, r.tag));
  };
  function sh(n, r) {
    return un(n, r);
  }
  function my(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Aa(n, r, l, o) {
    return new my(n, r, l, o);
  }
  function Qd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function yy(n) {
    if (typeof n == "function") return Qd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xt) return 11;
      if (n === bt) return 14;
    }
    return 2;
  }
  function jl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Aa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Hs(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Qd(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case je:
        return el(l.children, c, d, r);
      case rn:
        m = 8, c |= 8;
        break;
      case jt:
        return n = Aa(12, l, r, c | 2), n.elementType = jt, n.lanes = d, n;
      case De:
        return n = Aa(13, l, r, c), n.elementType = De, n.lanes = d, n;
      case At:
        return n = Aa(19, l, r, c), n.elementType = At, n.lanes = d, n;
      case Ce:
        return Hl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Xt:
            m = 10;
            break e;
          case an:
            m = 9;
            break e;
          case xt:
            m = 11;
            break e;
          case bt:
            m = 14;
            break e;
          case Dt:
            m = 16, o = null;
            break e;
        }
        throw Error(A(130, n == null ? n : typeof n, ""));
    }
    return r = Aa(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function el(n, r, l, o) {
    return n = Aa(7, n, o, r), n.lanes = l, n;
  }
  function Hl(n, r, l, o) {
    return n = Aa(22, n, o, r), n.elementType = Ce, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Wd(n, r, l) {
    return n = Aa(6, n, null, r), n.lanes = l, n;
  }
  function sf(n, r, l) {
    return r = Aa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function ch(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ku(0), this.expirationTimes = Ku(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ku(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function cf(n, r, l, o, c, d, m, E, T) {
    return n = new ch(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Aa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Td(d), n;
  }
  function gy(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ft, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Gd(n) {
    if (!n) return Er;
    n = n._reactInternals;
    e: {
      if (We(n) !== n || n.tag !== 1) throw Error(A(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(A(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return os(n, l, r);
    }
    return r;
  }
  function fh(n, r, l, o, c, d, m, E, T) {
    return n = cf(l, o, !0, n, c, d, m, E, T), n.context = Gd(null), l = n.current, o = jn(), c = Oi(l), d = qi(o, c), d.callback = r ?? null, Ll(l, d, c), n.current.lanes = c, Hi(n, c, o), na(n, o), n;
  }
  function ff(n, r, l, o) {
    var c = r.current, d = jn(), m = Oi(c);
    return l = Gd(l), r.context === null ? r.context = l : r.pendingContext = l, r = qi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ll(c, r, m), n !== null && (zr(n, c, m, d), Oc(n, c, m)), m;
  }
  function df(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function qd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function pf(n, r) {
    qd(n, r), (n = n.alternate) && qd(n, r);
  }
  function dh() {
    return null;
  }
  var Nu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Kd(n) {
    this._internalRoot = n;
  }
  vf.prototype.render = Kd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(A(409));
    ff(n, r, null, null);
  }, vf.prototype.unmount = Kd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Lu(function() {
        ff(null, n, null, null);
      }), r[Yi] = null;
    }
  };
  function vf(n) {
    this._internalRoot = n;
  }
  vf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Be();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < $n.length && r !== 0 && r < $n[l].priority; l++) ;
      $n.splice(l, 0, n), l === 0 && Go(n);
    }
  };
  function Xd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function hf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function ph() {
  }
  function Sy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var z = df(m);
          d.call(z);
        };
      }
      var m = fh(r, o, n, 0, null, !1, !1, "", ph);
      return n._reactRootContainer = m, n[Yi] = m.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var z = df(T);
        E.call(z);
      };
    }
    var T = cf(n, 0, !1, null, null, !1, !1, "", ph);
    return n._reactRootContainer = T, n[Yi] = T.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(function() {
      ff(r, T, l, o);
    }), T;
  }
  function Ps(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = df(m);
          E.call(T);
        };
      }
      ff(r, m, n, c);
    } else m = Sy(l, r, n, c, o);
    return df(m);
  }
  Tt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Ka(r.pendingLanes);
          l !== 0 && (Pi(r, l | 1), na(r, Ge()), !(Et & 6) && (Ro = Ge() + 500, Ri()));
        }
        break;
      case 13:
        Lu(function() {
          var o = va(n, 1);
          if (o !== null) {
            var c = jn();
            zr(o, n, 1, c);
          }
        }), pf(n, 1);
    }
  }, Qo = function(n) {
    if (n.tag === 13) {
      var r = va(n, 134217728);
      if (r !== null) {
        var l = jn();
        zr(r, n, 134217728, l);
      }
      pf(n, 134217728);
    }
  }, vi = function(n) {
    if (n.tag === 13) {
      var r = Oi(n), l = va(n, r);
      if (l !== null) {
        var o = jn();
        zr(l, n, r, o);
      }
      pf(n, r);
    }
  }, Be = function() {
    return Ot;
  }, Zu = function(n, r) {
    var l = Ot;
    try {
      return Ot = n, r();
    } finally {
      Ot = l;
    }
  }, $t = function(n, r, l) {
    switch (r) {
      case "input":
        if (Ir(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(A(90));
              xr(o), Ir(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ia(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, Jl = $d, dl = Lu;
  var Ey = { usingClientEntryPoint: !1, Events: [_e, ti, hn, ji, Zl, $d] }, Vs = { findFiberByHostInstance: pu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, vh = { bundleType: Vs.bundleType, version: Vs.version, rendererPackageName: Vs.rendererPackageName, rendererConfig: Vs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ht.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Rn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Vs.findFiberByHostInstance || dh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber) try {
      hl = Pl.inject(vh), Yr = Pl;
    } catch {
    }
  }
  return Ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ey, Ba.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xd(r)) throw Error(A(200));
    return gy(n, r, null, l);
  }, Ba.createRoot = function(n, r) {
    if (!Xd(n)) throw Error(A(299));
    var l = !1, o = "", c = Nu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = cf(n, 1, !1, null, null, l, !1, o, c), n[Yi] = r.current, uo(n.nodeType === 8 ? n.parentNode : n), new Kd(r);
  }, Ba.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(A(188)) : (n = Object.keys(n).join(","), Error(A(268, n)));
    return n = Rn(r), n = n === null ? null : n.stateNode, n;
  }, Ba.flushSync = function(n) {
    return Lu(n);
  }, Ba.hydrate = function(n, r, l) {
    if (!hf(r)) throw Error(A(200));
    return Ps(null, n, r, !0, l);
  }, Ba.hydrateRoot = function(n, r, l) {
    if (!Xd(n)) throw Error(A(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Nu;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = fh(r, null, n, 1, l ?? null, c, !1, d, m), n[Yi] = r.current, uo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new vf(r);
  }, Ba.render = function(n, r, l) {
    if (!hf(r)) throw Error(A(200));
    return Ps(null, n, r, !1, l);
  }, Ba.unmountComponentAtNode = function(n) {
    if (!hf(n)) throw Error(A(40));
    return n._reactRootContainer ? (Lu(function() {
      Ps(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Yi] = null;
      });
    }), !0) : !1;
  }, Ba.unstable_batchedUpdates = $d, Ba.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!hf(l)) throw Error(A(200));
    if (n == null || n._reactInternals === void 0) throw Error(A(38));
    return Ps(n, r, l, !1, o);
  }, Ba.version = "18.3.1-next-f1338f8080-20240426", Ba;
}
var $a = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lT;
function rk() {
  return lT || (lT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var J = ev(), W = oT(), A = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, qe = !1;
    function ct(e) {
      qe = e;
    }
    function gt(e) {
      if (!qe) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        kt("warn", e, a);
      }
    }
    function S(e) {
      if (!qe) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        kt("error", e, a);
      }
    }
    function kt(e, t, a) {
      {
        var i = A.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var oe = 0, ce = 1, Ze = 2, ee = 3, Se = 4, X = 5, Fe = 6, Ke = 7, tt = 8, cn = 9, vt = 10, Ye = 11, ht = 12, be = 13, ft = 14, je = 15, rn = 16, jt = 17, Xt = 18, an = 19, xt = 21, De = 22, At = 23, bt = 24, Dt = 25, Ce = !0, Z = !1, Re = !1, re = !1, _ = !1, P = !0, He = !0, Ue = !0, lt = !0, nt = /* @__PURE__ */ new Set(), Je = {}, rt = {};
    function ut(e, t) {
      Vt(e, t), Vt(e + "Capture", t);
    }
    function Vt(e, t) {
      Je[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Je[e] = t;
      {
        var a = e.toLowerCase();
        rt[a] = e, e === "onDoubleClick" && (rt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        nt.add(t[i]);
    }
    var Dn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", xr = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tr(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Vn(e, t) {
      if (tr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function Ir(e) {
      if (tr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function si(e, t) {
      if (tr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function oa(e, t) {
      if (tr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function Gn(e) {
      if (tr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function Cn(e) {
      if (tr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    var Bn = 0, yr = 1, Ia = 2, On = 3, gr = 4, sa = 5, Ya = 6, ci = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", te = ci + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Te = new RegExp("^[" + ci + "][" + te + "]*$"), at = {}, Ft = {};
    function Zt(e) {
      return xr.call(Ft, e) ? !0 : xr.call(at, e) ? !1 : Te.test(e) ? (Ft[e] = !0, !0) : (at[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function ln(e, t, a, i) {
      if (a !== null && a.type === Bn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function qn(e, t, a, i) {
      if (t === null || typeof t > "u" || ln(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case On:
            return !t;
          case gr:
            return t === !1;
          case sa:
            return isNaN(t);
          case Ya:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Jt(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function Bt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ia || t === On || t === gr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var $t = {}, ca = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    ca.forEach(function(e) {
      $t[e] = new Bt(
        e,
        Bn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ia,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ia,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        gr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        sa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Sr = /[\-\:]([a-z])/g, Ta = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ji = "xlinkHref";
    $t[ji] = new Bt(
      "xlinkHref",
      yr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Zl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jl = !1;
    function dl(e) {
      !Jl && Zl.test(e) && (Jl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function pl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Vn(a, t), i.sanitizeURL && dl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === gr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : qn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (qn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === On)
            return a;
          f = e.getAttribute(s);
        }
        return qn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function eu(e, t, a, i) {
      {
        if (!Zt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Vn(a, t), u === "" + a ? a : u;
      }
    }
    function br(e, t, a, i) {
      var u = Jt(t);
      if (!pn(t, u, i)) {
        if (qn(t, a, u, i) && (a = null), i || u === null) {
          if (Zt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Vn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === On ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var b = u.type, w;
          b === On || b === gr && a === !0 ? w = "" : (Vn(a, y), w = "" + a, u.sanitizeURL && dl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var _r = Symbol.for("react.element"), nr = Symbol.for("react.portal"), fi = Symbol.for("react.fragment"), Qa = Symbol.for("react.strict_mode"), di = Symbol.for("react.profiler"), pi = Symbol.for("react.provider"), R = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), ie = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), We = Symbol.for("react.memo"), $e = Symbol.for("react.lazy"), dt = Symbol.for("react.scope"), ot = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), en = Symbol.for("react.legacy_hidden"), un = Symbol.for("react.cache"), rr = Symbol.for("react.tracing_marker"), Wa = Symbol.iterator, Ga = "@@iterator";
    function Ge(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Wa && e[Wa] || e[Ga];
      return typeof t == "function" ? t : null;
    }
    var et = Object.assign, qa = 0, tu, nu, vl, Qu, hl, Yr, Yo;
    function kr() {
    }
    kr.__reactDisabledLog = !0;
    function lc() {
      {
        if (qa === 0) {
          tu = console.log, nu = console.info, vl = console.warn, Qu = console.error, hl = console.group, Yr = console.groupCollapsed, Yo = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: kr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        qa++;
      }
    }
    function uc() {
      {
        if (qa--, qa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: et({}, e, {
              value: tu
            }),
            info: et({}, e, {
              value: nu
            }),
            warn: et({}, e, {
              value: vl
            }),
            error: et({}, e, {
              value: Qu
            }),
            group: et({}, e, {
              value: hl
            }),
            groupCollapsed: et({}, e, {
              value: Yr
            }),
            groupEnd: et({}, e, {
              value: Yo
            })
          });
        }
        qa < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Wu = A.ReactCurrentDispatcher, ml;
    function fa(e, t, a) {
      {
        if (ml === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ml = i && i[1] || "";
          }
        return `
` + ml + e;
      }
    }
    var Ka = !1, Xa;
    {
      var Gu = typeof WeakMap == "function" ? WeakMap : Map;
      Xa = new Gu();
    }
    function ru(e, t) {
      if (!e || Ka)
        return "";
      {
        var a = Xa.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Ka = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Wu.current, Wu.current = null, lc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (U) {
              i = U;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (U) {
              i = U;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            i = U;
          }
          e();
        }
      } catch (U) {
        if (U && i && typeof U.stack == "string") {
          for (var p = U.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var b = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && Xa.set(e, b), b;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        Ka = !1, Wu.current = s, uc(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", M = w ? fa(w) : "";
      return typeof e == "function" && Xa.set(e, M), M;
    }
    function yl(e, t, a) {
      return ru(e, !0);
    }
    function qu(e, t, a) {
      return ru(e, !1);
    }
    function Ku(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Hi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ru(e, Ku(e));
      if (typeof e == "string")
        return fa(e);
      switch (e) {
        case ie:
          return fa("Suspense");
        case he:
          return fa("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            return qu(e.render);
          case We:
            return Hi(e.type, t, a);
          case $e: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Hi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Qf(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case X:
          return fa(e.type);
        case rn:
          return fa("Lazy");
        case be:
          return fa("Suspense");
        case an:
          return fa("SuspenseList");
        case oe:
        case Ze:
        case je:
          return qu(e.type);
        case Ye:
          return qu(e.type.render);
        case ce:
          return yl(e.type);
        default:
          return "";
      }
    }
    function Pi(e) {
      try {
        var t = "", a = e;
        do
          t += Qf(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Ot(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Xu(e) {
      return e.displayName || "Context";
    }
    function Tt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case fi:
          return "Fragment";
        case nr:
          return "Portal";
        case di:
          return "Profiler";
        case Qa:
          return "StrictMode";
        case ie:
          return "Suspense";
        case he:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Xu(t) + ".Consumer";
          case pi:
            var a = e;
            return Xu(a._context) + ".Provider";
          case B:
            return Ot(e, e.render, "ForwardRef");
          case We:
            var i = e.displayName || null;
            return i !== null ? i : Tt(e.type) || "Memo";
          case $e: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Tt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Qo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function vi(e) {
      return e.displayName || "Context";
    }
    function Be(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case bt:
          return "Cache";
        case cn:
          var i = a;
          return vi(i) + ".Consumer";
        case vt:
          var u = a;
          return vi(u._context) + ".Provider";
        case Xt:
          return "DehydratedFragment";
        case Ye:
          return Qo(a, a.render, "ForwardRef");
        case Ke:
          return "Fragment";
        case X:
          return a;
        case Se:
          return "Portal";
        case ee:
          return "Root";
        case Fe:
          return "Text";
        case rn:
          return Tt(a);
        case tt:
          return a === Qa ? "StrictMode" : "Mode";
        case De:
          return "Offscreen";
        case ht:
          return "Profiler";
        case xt:
          return "Scope";
        case be:
          return "Suspense";
        case an:
          return "SuspenseList";
        case Dt:
          return "TracingMarker";
        case ce:
        case oe:
        case jt:
        case Ze:
        case ft:
        case je:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Zu = A.ReactDebugCurrentFrame, ar = null, hi = !1;
    function Dr() {
      {
        if (ar === null)
          return null;
        var e = ar._debugOwner;
        if (e !== null && typeof e < "u")
          return Be(e);
      }
      return null;
    }
    function mi() {
      return ar === null ? "" : Pi(ar);
    }
    function on() {
      Zu.getCurrentStack = null, ar = null, hi = !1;
    }
    function It(e) {
      Zu.getCurrentStack = e === null ? null : mi, ar = e, hi = !1;
    }
    function gl() {
      return ar;
    }
    function $n(e) {
      hi = e;
    }
    function Or(e) {
      return "" + e;
    }
    function wa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var au = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Wo(e, t) {
      au[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Go(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Sl(e) {
      return e._valueTracker;
    }
    function iu(e) {
      e._valueTracker = null;
    }
    function Wf(e) {
      var t = "";
      return e && (Go(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function xa(e) {
      var t = Go(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            iu(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Za(e) {
      Sl(e) || (e._valueTracker = xa(e));
    }
    function yi(e) {
      if (!e)
        return !1;
      var t = Sl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Wf(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ba(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ju = !1, eo = !1, El = !1, lu = !1;
    function to(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function no(e, t) {
      var a = e, i = t.checked, u = et({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Ja(e, t) {
      Wo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !eo && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), eo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ju && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Ju = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: wa(t.value != null ? t.value : i),
        controlled: to(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && br(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = to(t);
        !a._wrapperState.controlled && i && !lu && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), lu = !0), a._wrapperState.controlled && !i && !El && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), El = !0);
      }
      h(e, t);
      var u = wa(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Or(u)) : a.value !== Or(u) && (a.value = Or(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Oe(a, t.type, u) : t.hasOwnProperty("defaultValue") && Oe(a, t.type, wa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function N(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Or(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function F(e, t) {
      var a = e;
      C(a, t), K(a, t);
    }
    function K(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Vn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Mh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            yi(f), C(f, p);
          }
        }
      }
    }
    function Oe(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ba(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Or(e._wrapperState.initialValue) : e.defaultValue !== Or(a) && (e.defaultValue = Or(a)));
    }
    var ae = !1, Ne = !1, pt = !1;
    function wt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? J.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Ne || (Ne = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (pt || (pt = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ae && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ae = !0);
    }
    function tn(e, t) {
      t.value != null && e.setAttribute("value", Or(wa(t.value)));
    }
    var Yt = Array.isArray;
    function it(e) {
      return Yt(e);
    }
    var Qt;
    Qt = !1;
    function vn() {
      var e = Dr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Cl = ["value", "defaultValue"];
    function qo(e) {
      {
        Wo("select", e);
        for (var t = 0; t < Cl.length; t++) {
          var a = Cl[t];
          if (e[a] != null) {
            var i = it(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Vi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = Or(wa(a)), b = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          b === null && !u[w].disabled && (b = u[w]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function Ko(e, t) {
      return et({}, t, {
        value: void 0
      });
    }
    function uu(e, t) {
      var a = e;
      qo(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Qt && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Qt = !0);
    }
    function Gf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Vi(a, !!t.multiple, i, !1) : t.defaultValue != null && Vi(a, !!t.multiple, t.defaultValue, !0);
    }
    function oc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Vi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Vi(a, !!t.multiple, t.defaultValue, !0) : Vi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function qf(e, t) {
      var a = e, i = t.value;
      i != null && Vi(a, !!t.multiple, i, !1);
    }
    var tv = !1;
    function Kf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = et({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Or(a._wrapperState.initialValue)
      });
      return i;
    }
    function Xf(e, t) {
      var a = e;
      Wo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !tv && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component"), tv = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (it(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: wa(i)
      };
    }
    function nv(e, t) {
      var a = e, i = wa(t.value), u = wa(t.defaultValue);
      if (i != null) {
        var s = Or(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Or(u));
    }
    function rv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function qm(e, t) {
      nv(e, t);
    }
    var Bi = "http://www.w3.org/1999/xhtml", Zf = "http://www.w3.org/1998/Math/MathML", Jf = "http://www.w3.org/2000/svg";
    function ed(e) {
      switch (e) {
        case "svg":
          return Jf;
        case "math":
          return Zf;
        default:
          return Bi;
      }
    }
    function td(e, t) {
      return e == null || e === Bi ? ed(t) : e === Jf && t === "foreignObject" ? Bi : e;
    }
    var av = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, sc, iv = av(function(e, t) {
      if (e.namespaceURI === Jf && !("innerHTML" in e)) {
        sc = sc || document.createElement("div"), sc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = sc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Qr = 1, $i = 3, Ln = 8, Ii = 9, nd = 11, ro = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === $i) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Xo = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Zo = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function lv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var uv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Zo).forEach(function(e) {
      uv.forEach(function(t) {
        Zo[lv(t, e)] = Zo[e];
      });
    });
    function cc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Zo.hasOwnProperty(e) && Zo[e]) ? t + "px" : (oa(t, e), ("" + t).trim());
    }
    var ov = /([A-Z])/g, sv = /^ms-/;
    function ao(e) {
      return e.replace(ov, "-$1").toLowerCase().replace(sv, "-ms-");
    }
    var cv = function() {
    };
    {
      var Km = /^(?:webkit|moz|o)[A-Z]/, Xm = /^-ms-/, fv = /-(.)/g, rd = /;\s*$/, gi = {}, ou = {}, dv = !1, Jo = !1, Zm = function(e) {
        return e.replace(fv, function(t, a) {
          return a.toUpperCase();
        });
      }, pv = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Zm(e.replace(Xm, "ms-"))
        ));
      }, ad = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, id = function(e, t) {
        ou.hasOwnProperty(t) && ou[t] || (ou[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(rd, "")));
      }, vv = function(e, t) {
        dv || (dv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, hv = function(e, t) {
        Jo || (Jo = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      cv = function(e, t) {
        e.indexOf("-") > -1 ? pv(e) : Km.test(e) ? ad(e) : rd.test(t) && id(e, t), typeof t == "number" && (isNaN(t) ? vv(e, t) : isFinite(t) || hv(e, t));
      };
    }
    var mv = cv;
    function Jm(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ao(i)) + ":", t += cc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function yv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || mv(i, t[i]);
          var s = cc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function ey(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function gv(e) {
      var t = {};
      for (var a in e)
        for (var i = Xo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ty(e, t) {
      {
        if (!t)
          return;
        var a = gv(e), i = gv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", ey(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var ei = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, es = et({
      menuitem: !0
    }, ei), Sv = "__html";
    function fc(e, t) {
      if (t) {
        if (es[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Sv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Rl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ts = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, dc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, io = {}, ny = new RegExp("^(aria)-[" + te + "]*$"), lo = new RegExp("^(aria)[A-Z][" + te + "]*$");
    function ld(e, t) {
      {
        if (xr.call(io, t) && io[t])
          return !0;
        if (lo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = dc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), io[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), io[t] = !0, !0;
        }
        if (ny.test(t)) {
          var u = t.toLowerCase(), s = dc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return io[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), io[t] = !0, !0;
        }
      }
      return !0;
    }
    function ns(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = ld(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function ud(e, t) {
      Rl(e, t) || ns(e, t);
    }
    var od = !1;
    function pc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !od && (od = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var su = function() {
    };
    {
      var ir = {}, sd = /^on./, vc = /^on[^A-Z]/, Ev = new RegExp("^(aria)-[" + te + "]*$"), Cv = new RegExp("^(aria)[A-Z][" + te + "]*$");
      su = function(e, t, a, i) {
        if (xr.call(ir, t) && ir[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ir[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ir[t] = !0, !0;
          if (sd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), ir[t] = !0, !0;
        } else if (sd.test(t))
          return vc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ir[t] = !0, !0;
        if (Ev.test(t) || Cv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ir[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ir[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ir[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ir[t] = !0, !0;
        var v = Jt(t), y = v !== null && v.type === Bn;
        if (ts.hasOwnProperty(u)) {
          var g = ts[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), ir[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), ir[t] = !0, !0;
        return typeof a == "boolean" && ln(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ir[t] = !0, !0) : y ? !0 : ln(t, a, v, !1) ? (ir[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === On && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ir[t] = !0), !0);
      };
    }
    var Rv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = su(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Tv(e, t, a) {
      Rl(e, t) || Rv(e, t, a);
    }
    var cd = 1, hc = 2, _a = 4, fd = cd | hc | _a, cu = null;
    function ry(e) {
      cu !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), cu = e;
    }
    function ay() {
      cu === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), cu = null;
    }
    function rs(e) {
      return e === cu;
    }
    function dd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === $i ? t.parentNode : t;
    }
    var mc = null, fu = null, Ht = null;
    function yc(e) {
      var t = ko(e);
      if (t) {
        if (typeof mc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Mh(a);
          mc(t.stateNode, t.type, i);
        }
      }
    }
    function gc(e) {
      mc = e;
    }
    function uo(e) {
      fu ? Ht ? Ht.push(e) : Ht = [e] : fu = e;
    }
    function wv() {
      return fu !== null || Ht !== null;
    }
    function Sc() {
      if (fu) {
        var e = fu, t = Ht;
        if (fu = null, Ht = null, yc(e), t)
          for (var a = 0; a < t.length; a++)
            yc(t[a]);
      }
    }
    var oo = function(e, t) {
      return e(t);
    }, as = function() {
    }, Tl = !1;
    function xv() {
      var e = wv();
      e && (as(), Sc());
    }
    function bv(e, t, a) {
      if (Tl)
        return e(t, a);
      Tl = !0;
      try {
        return oo(e, t, a);
      } finally {
        Tl = !1, xv();
      }
    }
    function iy(e, t, a) {
      oo = e, as = a;
    }
    function _v(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Ec(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && _v(t));
        default:
          return !1;
      }
    }
    function wl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Mh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Ec(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var is = !1;
    if (Dn)
      try {
        var du = {};
        Object.defineProperty(du, "passive", {
          get: function() {
            is = !0;
          }
        }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
      } catch {
        is = !1;
      }
    function Cc(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Rc = Cc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var pd = document.createElement("react");
      Rc = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), b = !1, w = !0, M = window.event, U = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          pd.removeEventListener(H, Le, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var ue = Array.prototype.slice.call(arguments, 3);
        function Le() {
          b = !0, j(), a.apply(i, ue), w = !1;
        }
        var we, Rt = !1, mt = !1;
        function D(O) {
          if (we = O.error, Rt = !0, we === null && O.colno === 0 && O.lineno === 0 && (mt = !0), O.defaultPrevented && we != null && typeof we == "object")
            try {
              we._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", D), pd.addEventListener(H, Le, !1), g.initEvent(H, !1, !1), pd.dispatchEvent(g), U && Object.defineProperty(window, "event", U), b && w && (Rt ? mt && (we = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : we = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(we)), window.removeEventListener("error", D), !b)
          return j(), Cc.apply(this, arguments);
      };
    }
    var kv = Rc, so = !1, Tc = null, co = !1, Si = null, Dv = {
      onError: function(e) {
        so = !0, Tc = e;
      }
    };
    function xl(e, t, a, i, u, s, f, p, v) {
      so = !1, Tc = null, kv.apply(Dv, arguments);
    }
    function Ei(e, t, a, i, u, s, f, p, v) {
      if (xl.apply(this, arguments), so) {
        var y = us();
        co || (co = !0, Si = y);
      }
    }
    function ls() {
      if (co) {
        var e = Si;
        throw co = !1, Si = null, e;
      }
    }
    function Yi() {
      return so;
    }
    function us() {
      if (so) {
        var e = Tc;
        return so = !1, Tc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fo(e) {
      return e._reactInternals;
    }
    function ly(e) {
      return e._reactInternals !== void 0;
    }
    function pu(e, t) {
      e._reactInternals = t;
    }
    var _e = (
      /*                      */
      0
    ), ti = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), St = (
      /*                       */
      4
    ), ka = (
      /*                */
      16
    ), Da = (
      /*                 */
      32
    ), nn = (
      /*                     */
      64
    ), xe = (
      /*                   */
      128
    ), Er = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), In = (
      /*                     */
      1024
    ), Wr = (
      /*                      */
      2048
    ), Gr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), po = (
      /*             */
      16384
    ), Ov = (
      /*               */
      32767
    ), os = (
      /*                   */
      32768
    ), Kn = (
      /*                */
      65536
    ), wc = (
      /* */
      131072
    ), Ci = (
      /*                       */
      1048576
    ), vo = (
      /*                    */
      2097152
    ), Qi = (
      /*                 */
      4194304
    ), xc = (
      /*                */
      8388608
    ), bl = (
      /*               */
      16777216
    ), Ri = (
      /*              */
      33554432
    ), _l = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      St | In | 0
    ), kl = hn | St | ka | Da | Sn | Gr | Mn, Dl = St | nn | Sn | Mn, Wi = Wr | ka, Nn = Qi | xc | vo, Oa = A.ReactCurrentOwner;
    function da(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Gr)) !== _e && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === ee ? a : null;
    }
    function Ti(e) {
      if (e.tag === be) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function wi(e) {
      return e.tag === ee ? e.stateNode.containerInfo : null;
    }
    function vu(e) {
      return da(e) === e;
    }
    function Lv(e) {
      {
        var t = Oa.current;
        if (t !== null && t.tag === ce) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Be(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = fo(e);
      return u ? da(u) === u : !1;
    }
    function bc(e) {
      if (da(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function _c(e) {
      var t = e.alternate;
      if (!t) {
        var a = da(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return bc(s), e;
            if (v === u)
              return bc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== ee)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function qr(e) {
      var t = _c(e);
      return t !== null ? Kr(t) : null;
    }
    function Kr(e) {
      if (e.tag === X || e.tag === Fe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Kr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function fn(e) {
      var t = _c(e);
      return t !== null ? La(t) : null;
    }
    function La(e) {
      if (e.tag === X || e.tag === Fe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== Se) {
          var a = La(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var vd = W.unstable_scheduleCallback, Mv = W.unstable_cancelCallback, hd = W.unstable_shouldYield, md = W.unstable_requestPaint, Yn = W.unstable_now, kc = W.unstable_getCurrentPriorityLevel, ss = W.unstable_ImmediatePriority, Ol = W.unstable_UserBlockingPriority, Gi = W.unstable_NormalPriority, uy = W.unstable_LowPriority, hu = W.unstable_IdlePriority, Dc = W.unstable_yieldValue, Nv = W.unstable_setDisableYieldValue, mu = null, Tn = null, le = null, pa = !1, Xr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ho(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        He && (e = et({}, e, {
          getLaneLabelMap: yu,
          injectProfilingHooks: Ma
        })), mu = t.inject(e), Tn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function yd(e, t) {
      if (Tn && typeof Tn.onScheduleFiberRoot == "function")
        try {
          Tn.onScheduleFiberRoot(mu, e, t);
        } catch (a) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function gd(e, t) {
      if (Tn && typeof Tn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & xe) === xe;
          if (Ue) {
            var i;
            switch (t) {
              case Lr:
                i = ss;
                break;
              case bi:
                i = Ol;
                break;
              case Na:
                i = Gi;
                break;
              case za:
                i = hu;
                break;
              default:
                i = Gi;
                break;
            }
            Tn.onCommitFiberRoot(mu, e, i, a);
          }
        } catch (u) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Sd(e) {
      if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
        try {
          Tn.onPostCommitFiberRoot(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ed(e) {
      if (Tn && typeof Tn.onCommitFiberUnmount == "function")
        try {
          Tn.onCommitFiberUnmount(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof Dc == "function" && (Nv(e), ct(e)), Tn && typeof Tn.setStrictMode == "function")
        try {
          Tn.setStrictMode(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ma(e) {
      le = e;
    }
    function yu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Eu; a++) {
          var i = Fv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Cd(e) {
      le !== null && typeof le.markCommitStarted == "function" && le.markCommitStarted(e);
    }
    function Rd() {
      le !== null && typeof le.markCommitStopped == "function" && le.markCommitStopped();
    }
    function va(e) {
      le !== null && typeof le.markComponentRenderStarted == "function" && le.markComponentRenderStarted(e);
    }
    function ha() {
      le !== null && typeof le.markComponentRenderStopped == "function" && le.markComponentRenderStopped();
    }
    function Td(e) {
      le !== null && typeof le.markComponentPassiveEffectMountStarted == "function" && le.markComponentPassiveEffectMountStarted(e);
    }
    function zv() {
      le !== null && typeof le.markComponentPassiveEffectMountStopped == "function" && le.markComponentPassiveEffectMountStopped();
    }
    function qi(e) {
      le !== null && typeof le.markComponentPassiveEffectUnmountStarted == "function" && le.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ll() {
      le !== null && typeof le.markComponentPassiveEffectUnmountStopped == "function" && le.markComponentPassiveEffectUnmountStopped();
    }
    function Oc(e) {
      le !== null && typeof le.markComponentLayoutEffectMountStarted == "function" && le.markComponentLayoutEffectMountStarted(e);
    }
    function Uv() {
      le !== null && typeof le.markComponentLayoutEffectMountStopped == "function" && le.markComponentLayoutEffectMountStopped();
    }
    function cs(e) {
      le !== null && typeof le.markComponentLayoutEffectUnmountStarted == "function" && le.markComponentLayoutEffectUnmountStarted(e);
    }
    function wd() {
      le !== null && typeof le.markComponentLayoutEffectUnmountStopped == "function" && le.markComponentLayoutEffectUnmountStopped();
    }
    function fs(e, t, a) {
      le !== null && typeof le.markComponentErrored == "function" && le.markComponentErrored(e, t, a);
    }
    function xi(e, t, a) {
      le !== null && typeof le.markComponentSuspended == "function" && le.markComponentSuspended(e, t, a);
    }
    function ds(e) {
      le !== null && typeof le.markLayoutEffectsStarted == "function" && le.markLayoutEffectsStarted(e);
    }
    function ps() {
      le !== null && typeof le.markLayoutEffectsStopped == "function" && le.markLayoutEffectsStopped();
    }
    function gu(e) {
      le !== null && typeof le.markPassiveEffectsStarted == "function" && le.markPassiveEffectsStarted(e);
    }
    function xd() {
      le !== null && typeof le.markPassiveEffectsStopped == "function" && le.markPassiveEffectsStopped();
    }
    function Su(e) {
      le !== null && typeof le.markRenderStarted == "function" && le.markRenderStarted(e);
    }
    function Av() {
      le !== null && typeof le.markRenderYielded == "function" && le.markRenderYielded();
    }
    function Lc() {
      le !== null && typeof le.markRenderStopped == "function" && le.markRenderStopped();
    }
    function yn(e) {
      le !== null && typeof le.markRenderScheduled == "function" && le.markRenderScheduled(e);
    }
    function Mc(e, t) {
      le !== null && typeof le.markForceUpdateScheduled == "function" && le.markForceUpdateScheduled(e, t);
    }
    function vs(e, t) {
      le !== null && typeof le.markStateUpdateScheduled == "function" && le.markStateUpdateScheduled(e, t);
    }
    var ke = (
      /*                         */
      0
    ), st = (
      /*                 */
      1
    ), Lt = (
      /*                    */
      2
    ), Wt = (
      /*               */
      8
    ), Mt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : hs, Xn = Math.log, Nc = Math.LN2;
    function hs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Xn(t) / Nc | 0) | 0;
    }
    var Eu = 31, $ = (
      /*                        */
      0
    ), _t = (
      /*                          */
      0
    ), Ae = (
      /*                        */
      1
    ), Ml = (
      /*    */
      2
    ), ni = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), wn = (
      /*                     */
      16
    ), Ki = (
      /*                */
      32
    ), Nl = (
      /*                       */
      4194240
    ), Cu = (
      /*                        */
      64
    ), zc = (
      /*                        */
      128
    ), Uc = (
      /*                        */
      256
    ), Ac = (
      /*                        */
      512
    ), Fc = (
      /*                        */
      1024
    ), jc = (
      /*                        */
      2048
    ), Hc = (
      /*                        */
      4096
    ), Pc = (
      /*                        */
      8192
    ), Vc = (
      /*                        */
      16384
    ), Ru = (
      /*                       */
      32768
    ), Bc = (
      /*                       */
      65536
    ), mo = (
      /*                       */
      131072
    ), yo = (
      /*                       */
      262144
    ), $c = (
      /*                       */
      524288
    ), ms = (
      /*                       */
      1048576
    ), Ic = (
      /*                       */
      2097152
    ), ys = (
      /*                            */
      130023424
    ), Tu = (
      /*                             */
      4194304
    ), Yc = (
      /*                             */
      8388608
    ), gs = (
      /*                             */
      16777216
    ), Qc = (
      /*                             */
      33554432
    ), Wc = (
      /*                             */
      67108864
    ), bd = Tu, Ss = (
      /*          */
      134217728
    ), _d = (
      /*                          */
      268435455
    ), Es = (
      /*               */
      268435456
    ), wu = (
      /*                        */
      536870912
    ), Zr = (
      /*                   */
      1073741824
    );
    function Fv(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Ml)
          return "InputContinuousHydration";
        if (e & ni)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & wn)
          return "Default";
        if (e & Ki)
          return "TransitionHydration";
        if (e & Nl)
          return "Transition";
        if (e & ys)
          return "Retry";
        if (e & Ss)
          return "SelectiveHydration";
        if (e & Es)
          return "IdleHydration";
        if (e & wu)
          return "Idle";
        if (e & Zr)
          return "Offscreen";
      }
    }
    var Kt = -1, xu = Cu, Gc = Tu;
    function Cs(e) {
      switch (zl(e)) {
        case Ae:
          return Ae;
        case Ml:
          return Ml;
        case ni:
          return ni;
        case Cr:
          return Cr;
        case wn:
          return wn;
        case Ki:
          return Ki;
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Vc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Ic:
          return e & Nl;
        case Tu:
        case Yc:
        case gs:
        case Qc:
        case Wc:
          return e & ys;
        case Ss:
          return Ss;
        case Es:
          return Es;
        case wu:
          return wu;
        case Zr:
          return Zr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function qc(e, t) {
      var a = e.pendingLanes;
      if (a === $)
        return $;
      var i = $, u = e.suspendedLanes, s = e.pingedLanes, f = a & _d;
      if (f !== $) {
        var p = f & ~u;
        if (p !== $)
          i = Cs(p);
        else {
          var v = f & s;
          v !== $ && (i = Cs(v));
        }
      } else {
        var y = a & ~u;
        y !== $ ? i = Cs(y) : s !== $ && (i = Cs(s));
      }
      if (i === $)
        return $;
      if (t !== $ && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === $) {
        var g = zl(i), b = zl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= b || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === wn && (b & Nl) !== $
        )
          return t;
      }
      (i & ni) !== $ && (i |= a & wn);
      var w = e.entangledLanes;
      if (w !== $)
        for (var M = e.entanglements, U = i & w; U > 0; ) {
          var j = Un(U), ue = 1 << j;
          i |= M[j], U &= ~ue;
        }
      return i;
    }
    function ri(e, t) {
      for (var a = e.eventTimes, i = Kt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function kd(e, t) {
      switch (e) {
        case Ae:
        case Ml:
        case ni:
          return t + 250;
        case Cr:
        case wn:
        case Ki:
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Vc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Ic:
          return t + 5e3;
        case Tu:
        case Yc:
        case gs:
        case Qc:
        case Wc:
          return Kt;
        case Ss:
        case Es:
        case wu:
        case Zr:
          return Kt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Kt;
      }
    }
    function Kc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Kt ? ((v & i) === $ || (v & u) !== $) && (s[p] = kd(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function jv(e) {
      return Cs(e.pendingLanes);
    }
    function Xc(e) {
      var t = e.pendingLanes & ~Zr;
      return t !== $ ? t : t & Zr ? Zr : $;
    }
    function Hv(e) {
      return (e & Ae) !== $;
    }
    function Rs(e) {
      return (e & _d) !== $;
    }
    function bu(e) {
      return (e & ys) === e;
    }
    function Dd(e) {
      var t = Ae | ni | wn;
      return (e & t) === $;
    }
    function Od(e) {
      return (e & Nl) === e;
    }
    function Zc(e, t) {
      var a = Ml | ni | Cr | wn;
      return (t & a) !== $;
    }
    function Pv(e, t) {
      return (t & e.expiredLanes) !== $;
    }
    function Ld(e) {
      return (e & Nl) !== $;
    }
    function Md() {
      var e = xu;
      return xu <<= 1, (xu & Nl) === $ && (xu = Cu), e;
    }
    function Vv() {
      var e = Gc;
      return Gc <<= 1, (Gc & ys) === $ && (Gc = Tu), e;
    }
    function zl(e) {
      return e & -e;
    }
    function Ts(e) {
      return zl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function lr(e) {
      return Un(e);
    }
    function Jr(e, t) {
      return (e & t) !== $;
    }
    function _u(e, t) {
      return (e & t) === t;
    }
    function Xe(e, t) {
      return e | t;
    }
    function ws(e, t) {
      return e & ~t;
    }
    function Nd(e, t) {
      return e & t;
    }
    function Bv(e) {
      return e;
    }
    function $v(e, t) {
      return e !== _t && e < t ? e : t;
    }
    function xs(e) {
      for (var t = [], a = 0; a < Eu; a++)
        t.push(e);
      return t;
    }
    function go(e, t, a) {
      e.pendingLanes |= t, t !== wu && (e.suspendedLanes = $, e.pingedLanes = $);
      var i = e.eventTimes, u = lr(t);
      i[u] = a;
    }
    function Iv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Kt, i &= ~s;
      }
    }
    function Jc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function zd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = $, u[p] = Kt, s[p] = Kt, f &= ~v;
      }
    }
    function ef(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Ud(e, t) {
      var a = zl(t), i;
      switch (a) {
        case ni:
          i = Ml;
          break;
        case wn:
          i = Cr;
          break;
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Vc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Ic:
        case Tu:
        case Yc:
        case gs:
        case Qc:
        case Wc:
          i = Ki;
          break;
        case wu:
          i = Es;
          break;
        default:
          i = _t;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== _t ? _t : i;
    }
    function bs(e, t, a) {
      if (Xr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = lr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Yv(e, t) {
      if (Xr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = lr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Ad(e, t) {
      return null;
    }
    var Lr = Ae, bi = ni, Na = wn, za = wu, _s = _t;
    function Ua() {
      return _s;
    }
    function An(e) {
      _s = e;
    }
    function Qv(e, t) {
      var a = _s;
      try {
        return _s = e, t();
      } finally {
        _s = a;
      }
    }
    function Wv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function ks(e, t) {
      return e > t ? e : t;
    }
    function Zn(e, t) {
      return e !== 0 && e < t;
    }
    function Gv(e) {
      var t = zl(e);
      return Zn(Lr, t) ? Zn(bi, t) ? Rs(t) ? Na : za : bi : Lr;
    }
    function tf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ds;
    function Rr(e) {
      Ds = e;
    }
    function oy(e) {
      Ds(e);
    }
    var ve;
    function So(e) {
      ve = e;
    }
    var nf;
    function qv(e) {
      nf = e;
    }
    var Kv;
    function Os(e) {
      Kv = e;
    }
    var Ls;
    function Fd(e) {
      Ls = e;
    }
    var rf = !1, Ms = [], Xi = null, _i = null, ki = null, xn = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), Nr = [], Xv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Zv(e) {
      return Xv.indexOf(e) > -1;
    }
    function ai(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function jd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Xi = null;
          break;
        case "dragenter":
        case "dragleave":
          _i = null;
          break;
        case "mouseover":
        case "mouseout":
          ki = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          xn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Mr.delete(i);
          break;
        }
      }
    }
    function ea(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ai(t, a, i, u, s);
        if (t !== null) {
          var p = ko(t);
          p !== null && ve(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function sy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Xi = ea(Xi, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return _i = ea(_i, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return ki = ea(ki, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return xn.set(y, ea(xn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, b = g.pointerId;
          return Mr.set(b, ea(Mr.get(b) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function Hd(e) {
      var t = Is(e.target);
      if (t !== null) {
        var a = da(t);
        if (a !== null) {
          var i = a.tag;
          if (i === be) {
            var u = Ti(a);
            if (u !== null) {
              e.blockedOn = u, Ls(e.priority, function() {
                nf(a);
              });
              return;
            }
          } else if (i === ee) {
            var s = a.stateNode;
            if (tf(s)) {
              e.blockedOn = wi(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Jv(e) {
      for (var t = Kv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Nr.length && Zn(t, Nr[i].priority); i++)
        ;
      Nr.splice(i, 0, a), i === 0 && Hd(a);
    }
    function Ns(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Co(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ry(s), u.target.dispatchEvent(s), ay();
        } else {
          var f = ko(i);
          return f !== null && ve(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Pd(e, t, a) {
      Ns(e) && a.delete(t);
    }
    function cy() {
      rf = !1, Xi !== null && Ns(Xi) && (Xi = null), _i !== null && Ns(_i) && (_i = null), ki !== null && Ns(ki) && (ki = null), xn.forEach(Pd), Mr.forEach(Pd);
    }
    function Ul(e, t) {
      e.blockedOn === t && (e.blockedOn = null, rf || (rf = !0, W.unstable_scheduleCallback(W.unstable_NormalPriority, cy)));
    }
    function ku(e) {
      if (Ms.length > 0) {
        Ul(Ms[0], e);
        for (var t = 1; t < Ms.length; t++) {
          var a = Ms[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Xi !== null && Ul(Xi, e), _i !== null && Ul(_i, e), ki !== null && Ul(ki, e);
      var i = function(p) {
        return Ul(p, e);
      };
      xn.forEach(i), Mr.forEach(i);
      for (var u = 0; u < Nr.length; u++) {
        var s = Nr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Nr.length > 0; ) {
        var f = Nr[0];
        if (f.blockedOn !== null)
          break;
        Hd(f), f.blockedOn === null && Nr.shift();
      }
    }
    var ur = A.ReactCurrentBatchConfig, Et = !0;
    function Qn(e) {
      Et = !!e;
    }
    function Fn() {
      return Et;
    }
    function or(e, t, a) {
      var i = af(t), u;
      switch (i) {
        case Lr:
          u = ma;
          break;
        case bi:
          u = Eo;
          break;
        case Na:
        default:
          u = bn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ma(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(Lr), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function Eo(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(bi), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function bn(e, t, a, i) {
      Et && zs(e, t, a, i);
    }
    function zs(e, t, a, i) {
      var u = Co(e, t, a, i);
      if (u === null) {
        _y(e, t, i, Di, a), jd(e, i);
        return;
      }
      if (sy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (jd(e, i), t & _a && Zv(e)) {
        for (; u !== null; ) {
          var s = ko(u);
          s !== null && oy(s);
          var f = Co(e, t, a, i);
          if (f === null && _y(e, t, i, Di, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      _y(e, t, i, null, a);
    }
    var Di = null;
    function Co(e, t, a, i) {
      Di = null;
      var u = dd(i), s = Is(u);
      if (s !== null) {
        var f = da(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === be) {
            var v = Ti(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === ee) {
            var y = f.stateNode;
            if (tf(y))
              return wi(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Di = s, null;
    }
    function af(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Lr;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return bi;
        case "message": {
          var t = kc();
          switch (t) {
            case ss:
              return Lr;
            case Ol:
              return bi;
            case Gi:
            case uy:
              return Na;
            case hu:
              return za;
            default:
              return Na;
          }
        }
        default:
          return Na;
      }
    }
    function Us(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ta(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Vd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ro(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ya = null, To = null, Du = null;
    function Al(e) {
      return ya = e, To = As(), !0;
    }
    function lf() {
      ya = null, To = null, Du = null;
    }
    function Zi() {
      if (Du)
        return Du;
      var e, t = To, a = t.length, i, u = As(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Du = u.slice(e, p), Du;
    }
    function As() {
      return "value" in ya ? ya.value : ya.textContent;
    }
    function Fl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function wo() {
      return !0;
    }
    function Fs() {
      return !1;
    }
    function Tr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = wo : this.isDefaultPrevented = Fs, this.isPropagationStopped = Fs, this;
      }
      return et(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = wo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = wo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: wo
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Oi = Tr(jn), zr = et({}, jn, {
      view: 0,
      detail: 0
    }), na = Tr(zr), uf, js, Ou;
    function fy(e) {
      e !== Ou && (Ou && e.type === "mousemove" ? (uf = e.screenX - Ou.screenX, js = e.screenY - Ou.screenY) : (uf = 0, js = 0), Ou = e);
    }
    var ii = et({}, zr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (fy(e), uf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : js;
      }
    }), Bd = Tr(ii), $d = et({}, ii, {
      dataTransfer: 0
    }), Lu = Tr($d), Id = et({}, zr, {
      relatedTarget: 0
    }), Ji = Tr(Id), eh = et({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), th = Tr(eh), Yd = et({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), of = Tr(Yd), dy = et({}, jn, {
      data: 0
    }), nh = Tr(dy), rh = nh, ah = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Mu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function py(e) {
      if (e.key) {
        var t = ah[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Fl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Mu[e.keyCode] || "Unidentified" : "";
    }
    var xo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ih(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = xo[e];
      return i ? !!a[i] : !1;
    }
    function dn(e) {
      return ih;
    }
    var vy = et({}, zr, {
      key: py,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Fl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Fl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), lh = Tr(vy), hy = et({}, ii, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), uh = Tr(hy), oh = et({}, zr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dn
    }), sh = Tr(oh), my = et({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Aa = Tr(my), Qd = et({}, ii, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), yy = Tr(Qd), jl = [9, 13, 27, 32], Hs = 229, el = Dn && "CompositionEvent" in window, Hl = null;
    Dn && "documentMode" in document && (Hl = document.documentMode);
    var Wd = Dn && "TextEvent" in window && !Hl, sf = Dn && (!el || Hl && Hl > 8 && Hl <= 11), ch = 32, cf = String.fromCharCode(ch);
    function gy() {
      ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ut("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ut("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ut("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Gd = !1;
    function fh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function ff(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function df(e, t) {
      return e === "keydown" && t.keyCode === Hs;
    }
    function qd(e, t) {
      switch (e) {
        case "keyup":
          return jl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Hs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function pf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function dh(e) {
      return e.locale === "ko";
    }
    var Nu = !1;
    function Kd(e, t, a, i, u) {
      var s, f;
      if (el ? s = ff(t) : Nu ? qd(t, i) && (s = "onCompositionEnd") : df(t, i) && (s = "onCompositionStart"), !s)
        return null;
      sf && !dh(i) && (!Nu && s === "onCompositionStart" ? Nu = Al(u) : s === "onCompositionEnd" && Nu && (f = Zi()));
      var p = Sh(a, s);
      if (p.length > 0) {
        var v = new nh(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = pf(i);
          y !== null && (v.data = y);
        }
      }
    }
    function vf(e, t) {
      switch (e) {
        case "compositionend":
          return pf(t);
        case "keypress":
          var a = t.which;
          return a !== ch ? null : (Gd = !0, cf);
        case "textInput":
          var i = t.data;
          return i === cf && Gd ? null : i;
        default:
          return null;
      }
    }
    function Xd(e, t) {
      if (Nu) {
        if (e === "compositionend" || !el && qd(e, t)) {
          var a = Zi();
          return lf(), Nu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!fh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return sf && !dh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function hf(e, t, a, i, u) {
      var s;
      if (Wd ? s = vf(t, i) : s = Xd(t, i), !s)
        return null;
      var f = Sh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new rh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function ph(e, t, a, i, u, s, f) {
      Kd(e, t, a, i, u), hf(e, t, a, i, u);
    }
    var Sy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Ps(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Sy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Ey(e) {
      if (!Dn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Vs() {
      ut("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function vh(e, t, a, i) {
      uo(i);
      var u = Sh(t, "onChange");
      if (u.length > 0) {
        var s = new Oi("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Pl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      vh(t, n, e, dd(e)), bv(o, t);
    }
    function o(e) {
      kE(e, 0);
    }
    function c(e) {
      var t = Cf(e);
      if (yi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    Dn && (m = Ey("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Pl = e, n = t, Pl.attachEvent("onpropertychange", z);
    }
    function T() {
      Pl && (Pl.detachEvent("onpropertychange", z), Pl = null, n = null);
    }
    function z(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function Y(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function G(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function I(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function fe(e, t) {
      if (e === "click")
        return c(t);
    }
    function me(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Ee(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Oe(e, "number", e.value);
    }
    function _n(e, t, a, i, u, s, f) {
      var p = a ? Cf(a) : window, v, y;
      if (r(p) ? v = d : Ps(p) ? m ? v = me : (v = G, y = Y) : I(p) && (v = fe), v) {
        var g = v(t, a);
        if (g) {
          vh(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && Ee(p);
    }
    function k() {
      Vt("onMouseEnter", ["mouseout", "mouseover"]), Vt("onMouseLeave", ["mouseout", "mouseover"]), Vt("onPointerEnter", ["pointerout", "pointerover"]), Vt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !rs(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && (Is(y) || fp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var b = u.ownerDocument;
          b ? g = b.defaultView || b.parentWindow : g = window;
        }
        var w, M;
        if (v) {
          var U = i.relatedTarget || i.toElement;
          if (w = a, M = U ? Is(U) : null, M !== null) {
            var j = da(M);
            (M !== j || M.tag !== X && M.tag !== Fe) && (M = null);
          }
        } else
          w = null, M = a;
        if (w !== M) {
          var ue = Bd, Le = "onMouseLeave", we = "onMouseEnter", Rt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ue = uh, Le = "onPointerLeave", we = "onPointerEnter", Rt = "pointer");
          var mt = w == null ? g : Cf(w), D = M == null ? g : Cf(M), H = new ue(Le, Rt + "leave", w, i, u);
          H.target = mt, H.relatedTarget = D;
          var O = null, q = Is(u);
          if (q === a) {
            var pe = new ue(we, Rt + "enter", M, i, u);
            pe.target = D, pe.relatedTarget = mt, O = pe;
          }
          kT(e, H, O, w, M);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Q = typeof Object.is == "function" ? Object.is : L;
    function ye(e, t) {
      if (Q(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!xr.call(t, s) || !Q(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Me(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ze(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Ve(e, t) {
      for (var a = Me(e), i = 0, u = 0; a; ) {
        if (a.nodeType === $i) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Me(ze(a));
      }
    }
    function Jn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Nt(e, u, s, f, p);
    }
    function Nt(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, b = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === $i) && (f = s + a), g === i && (u === 0 || g.nodeType === $i) && (p = s + u), g.nodeType === $i && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          b = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (b === t && ++v === a && (f = s), b === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = b, b = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Vl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = Ve(e, f), g = Ve(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var b = a.createRange();
          b.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(b), u.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), u.addRange(b));
        }
      }
    }
    function hh(e) {
      return e && e.nodeType === $i;
    }
    function yE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : hh(e) ? !1 : hh(t) ? yE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function cT(e) {
      return e && e.ownerDocument && yE(e.ownerDocument.documentElement, e);
    }
    function fT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function gE() {
      for (var e = window, t = ba(); t instanceof e.HTMLIFrameElement; ) {
        if (fT(t))
          e = t.contentWindow;
        else
          return t;
        t = ba(e.document);
      }
      return t;
    }
    function Cy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function dT() {
      var e = gE();
      return {
        focusedElem: e,
        selectionRange: Cy(e) ? vT(e) : null
      };
    }
    function pT(e) {
      var t = gE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && cT(a)) {
        i !== null && Cy(a) && hT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Qr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function vT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Jn(e), t || {
        start: 0,
        end: 0
      };
    }
    function hT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Vl(e, t);
    }
    var mT = Dn && "documentMode" in document && document.documentMode <= 11;
    function yT() {
      ut("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var mf = null, Ry = null, Zd = null, Ty = !1;
    function gT(e) {
      if ("selectionStart" in e && Cy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function ST(e) {
      return e.window === e ? e.document : e.nodeType === Ii ? e : e.ownerDocument;
    }
    function SE(e, t, a) {
      var i = ST(a);
      if (!(Ty || mf == null || mf !== ba(i))) {
        var u = gT(mf);
        if (!Zd || !ye(Zd, u)) {
          Zd = u;
          var s = Sh(Ry, "onSelect");
          if (s.length > 0) {
            var f = new Oi("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = mf;
          }
        }
      }
    }
    function ET(e, t, a, i, u, s, f) {
      var p = a ? Cf(a) : window;
      switch (t) {
        case "focusin":
          (Ps(p) || p.contentEditable === "true") && (mf = p, Ry = a, Zd = null);
          break;
        case "focusout":
          mf = null, Ry = null, Zd = null;
          break;
        case "mousedown":
          Ty = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ty = !1, SE(e, i, u);
          break;
        case "selectionchange":
          if (mT)
            break;
        case "keydown":
        case "keyup":
          SE(e, i, u);
      }
    }
    function mh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var yf = {
      animationend: mh("Animation", "AnimationEnd"),
      animationiteration: mh("Animation", "AnimationIteration"),
      animationstart: mh("Animation", "AnimationStart"),
      transitionend: mh("Transition", "TransitionEnd")
    }, wy = {}, EE = {};
    Dn && (EE = document.createElement("div").style, "AnimationEvent" in window || (delete yf.animationend.animation, delete yf.animationiteration.animation, delete yf.animationstart.animation), "TransitionEvent" in window || delete yf.transitionend.transition);
    function yh(e) {
      if (wy[e])
        return wy[e];
      if (!yf[e])
        return e;
      var t = yf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in EE)
          return wy[e] = t[a];
      return e;
    }
    var CE = yh("animationend"), RE = yh("animationiteration"), TE = yh("animationstart"), wE = yh("transitionend"), xE = /* @__PURE__ */ new Map(), bE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function bo(e, t) {
      xE.set(e, t), ut(t, [e]);
    }
    function CT() {
      for (var e = 0; e < bE.length; e++) {
        var t = bE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        bo(a, "on" + i);
      }
      bo(CE, "onAnimationEnd"), bo(RE, "onAnimationIteration"), bo(TE, "onAnimationStart"), bo("dblclick", "onDoubleClick"), bo("focusin", "onFocus"), bo("focusout", "onBlur"), bo(wE, "onTransitionEnd");
    }
    function RT(e, t, a, i, u, s, f) {
      var p = xE.get(t);
      if (p !== void 0) {
        var v = Oi, y = t;
        switch (t) {
          case "keypress":
            if (Fl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = lh;
            break;
          case "focusin":
            y = "focus", v = Ji;
            break;
          case "focusout":
            y = "blur", v = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ji;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Lu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = sh;
            break;
          case CE:
          case RE:
          case TE:
            v = th;
            break;
          case wE:
            v = Aa;
            break;
          case "scroll":
            v = na;
            break;
          case "wheel":
            v = yy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = of;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = uh;
            break;
        }
        var g = (s & _a) !== 0;
        {
          var b = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = bT(a, p, i.type, g, b);
          if (w.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: w
            });
          }
        }
      }
    }
    CT(), k(), Vs(), yT(), gy();
    function TT(e, t, a, i, u, s, f) {
      RT(e, t, a, i, u, s);
      var p = (s & fd) === 0;
      p && (x(e, t, a, i, u), _n(e, t, a, i, u), ET(e, t, a, i, u), ph(e, t, a, i, u));
    }
    var Jd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], xy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Jd));
    function _E(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ei(i, t, void 0, e), e.currentTarget = null;
    }
    function wT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          _E(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], b = g.instance, w = g.currentTarget, M = g.listener;
          if (b !== i && e.isPropagationStopped())
            return;
          _E(e, M, w), i = b;
        }
    }
    function kE(e, t) {
      for (var a = (t & _a) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        wT(s, f, a);
      }
      ls();
    }
    function xT(e, t, a, i, u) {
      var s = dd(a), f = [];
      TT(f, e, i, a, s, t), kE(f, t);
    }
    function gn(e, t) {
      xy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = tw(t), u = DT(e);
      i.has(u) || (DE(t, e, hc, a), i.add(u));
    }
    function by(e, t, a) {
      xy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= _a), DE(a, e, i, t);
    }
    var gh = "_reactListening" + Math.random().toString(36).slice(2);
    function ep(e) {
      if (!e[gh]) {
        e[gh] = !0, nt.forEach(function(a) {
          a !== "selectionchange" && (xy.has(a) || by(a, !1, e), by(a, !0, e));
        });
        var t = e.nodeType === Ii ? e : e.ownerDocument;
        t !== null && (t[gh] || (t[gh] = !0, by("selectionchange", !1, t)));
      }
    }
    function DE(e, t, a, i, u) {
      var s = or(e, t, a), f = void 0;
      is && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Vd(e, t, s, f) : ta(e, t, s) : f !== void 0 ? Ro(e, t, s, f) : Us(e, t, s);
    }
    function OE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function _y(e, t, a, i, u) {
      var s = i;
      if (!(t & cd) && !(t & hc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === ee || v === Se) {
              var y = p.stateNode.containerInfo;
              if (OE(y, f))
                break;
              if (v === Se)
                for (var g = p.return; g !== null; ) {
                  var b = g.tag;
                  if (b === ee || b === Se) {
                    var w = g.stateNode.containerInfo;
                    if (OE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var M = Is(y);
                if (M === null)
                  return;
                var U = M.tag;
                if (U === X || U === Fe) {
                  p = s = M;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      bv(function() {
        return xT(e, t, a, s);
      });
    }
    function tp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function bT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var b = y, w = b.stateNode, M = b.tag;
        if (M === X && w !== null && (g = w, p !== null)) {
          var U = wl(y, p);
          U != null && v.push(tp(y, U, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function Sh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === X && f !== null) {
          var v = f, y = wl(u, a);
          y != null && i.unshift(tp(u, y, v));
          var g = wl(u, t);
          g != null && i.push(tp(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function gf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== X);
      return e || null;
    }
    function _T(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = gf(s))
        u++;
      for (var f = 0, p = i; p; p = gf(p))
        f++;
      for (; u - f > 0; )
        a = gf(a), u--;
      for (; f - u > 0; )
        i = gf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = gf(a), i = gf(i);
      }
      return null;
    }
    function LE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, b = v.tag;
        if (y !== null && y === i)
          break;
        if (b === X && g !== null) {
          var w = g;
          if (u) {
            var M = wl(p, s);
            M != null && f.unshift(tp(p, M, w));
          } else if (!u) {
            var U = wl(p, s);
            U != null && f.push(tp(p, U, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function kT(e, t, a, i, u) {
      var s = i && u ? _T(i, u) : null;
      i !== null && LE(e, t, i, s, !1), u !== null && a !== null && LE(e, a, u, s, !0);
    }
    function DT(e, t) {
      return e + "__bubble";
    }
    var Fa = !1, np = "dangerouslySetInnerHTML", Eh = "suppressContentEditableWarning", _o = "suppressHydrationWarning", ME = "autoFocus", Bs = "children", $s = "style", Ch = "__html", ky, Rh, rp, NE, Th, zE, UE;
    ky = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Rh = function(e, t) {
      ud(e, t), pc(e, t), Tv(e, t, {
        registrationNameDependencies: Je,
        possibleRegistrationNames: rt
      });
    }, zE = Dn && !document.documentMode, rp = function(e, t, a) {
      if (!Fa) {
        var i = wh(a), u = wh(t);
        u !== i && (Fa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, NE = function(e) {
      if (!Fa) {
        Fa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Th = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, UE = function(e, t) {
      var a = e.namespaceURI === Bi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var OT = /\r\n?/g, LT = /\u0000|\uFFFD/g;
    function wh(e) {
      Gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(OT, `
`).replace(LT, "");
    }
    function xh(e, t, a, i) {
      var u = wh(t), s = wh(e);
      if (s !== u && (i && (Fa || (Fa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ce))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function AE(e) {
      return e.nodeType === Ii ? e : e.ownerDocument;
    }
    function MT() {
    }
    function bh(e) {
      e.onclick = MT;
    }
    function NT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === $s)
            f && Object.freeze(f), yv(t, f);
          else if (s === np) {
            var p = f ? f[Ch] : void 0;
            p != null && iv(t, p);
          } else if (s === Bs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && ro(t, f);
            } else typeof f == "number" && ro(t, "" + f);
          else s === Eh || s === _o || s === ME || (Je.hasOwnProperty(s) ? f != null && (typeof f != "function" && Th(s, f), s === "onScroll" && gn("scroll", t)) : f != null && br(t, s, f, u));
        }
    }
    function zT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === $s ? yv(e, f) : s === np ? iv(e, f) : s === Bs ? ro(e, f) : br(e, s, f, i);
      }
    }
    function UT(e, t, a, i) {
      var u, s = AE(a), f, p = i;
      if (p === Bi && (p = ed(e)), p === Bi) {
        if (u = Rl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Bi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !xr.call(ky, e) && (ky[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function AT(e, t) {
      return AE(t).createTextNode(e);
    }
    function FT(e, t, a, i) {
      var u = Rl(t, a);
      Rh(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Jd.length; f++)
            gn(Jd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Ja(e, a), s = no(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a), s = a;
          break;
        case "select":
          uu(e, a), s = Ko(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), s = Kf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (fc(t, s), NT(t, e, i, s, u), t) {
        case "input":
          Za(e), N(e, a, !1);
          break;
        case "textarea":
          Za(e), rv(e);
          break;
        case "option":
          tn(e, a);
          break;
        case "select":
          Gf(e, a);
          break;
        default:
          typeof s.onClick == "function" && bh(e);
          break;
      }
    }
    function jT(e, t, a, i, u) {
      Rh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = no(e, a), p = no(e, i), s = [];
          break;
        case "select":
          f = Ko(e, a), p = Ko(e, i), s = [];
          break;
        case "textarea":
          f = Kf(e, a), p = Kf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && bh(e);
          break;
      }
      fc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === $s) {
            var b = f[v];
            for (y in b)
              b.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === np || v === Bs || v === Eh || v === _o || v === ME || (Je.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === M || w == null && M == null))
          if (v === $s)
            if (w && Object.freeze(w), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && M[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === np) {
            var U = w ? w[Ch] : void 0, j = M ? M[Ch] : void 0;
            U != null && j !== U && (s = s || []).push(v, U);
          } else v === Bs ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === Eh || v === _o || (Je.hasOwnProperty(v) ? (w != null && (typeof w != "function" && Th(v, w), v === "onScroll" && gn("scroll", e)), !s && M !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (ty(g, p[$s]), (s = s || []).push($s, g)), s;
    }
    function HT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Rl(a, i), f = Rl(a, u);
      switch (zT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          nv(e, u);
          break;
        case "select":
          oc(e, u);
          break;
      }
    }
    function PT(e) {
      {
        var t = e.toLowerCase();
        return ts.hasOwnProperty(t) && ts[t] || null;
      }
    }
    function VT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Rl(t, a), Rh(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Jd.length; y++)
            gn(Jd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Ja(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a);
          break;
        case "select":
          uu(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), gn("invalid", e);
          break;
      }
      fc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, b = 0; b < g.length; b++) {
          var w = g[b].name.toLowerCase();
          switch (w) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[b].name);
          }
        }
      }
      var M = null;
      for (var U in a)
        if (a.hasOwnProperty(U)) {
          var j = a[U];
          if (U === Bs)
            typeof j == "string" ? e.textContent !== j && (a[_o] !== !0 && xh(e.textContent, j, s, f), M = [Bs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[_o] !== !0 && xh(e.textContent, j, s, f), M = [Bs, "" + j]);
          else if (Je.hasOwnProperty(U))
            j != null && (typeof j != "function" && Th(U, j), U === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ue = void 0, Le = Jt(U);
            if (a[_o] !== !0) {
              if (!(U === Eh || U === _o || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              U === "value" || U === "checked" || U === "selected")) {
                if (U === np) {
                  var we = e.innerHTML, Rt = j ? j[Ch] : void 0;
                  if (Rt != null) {
                    var mt = UE(e, Rt);
                    mt !== we && rp(U, we, mt);
                  }
                } else if (U === $s) {
                  if (v.delete(U), zE) {
                    var D = Jm(j);
                    ue = e.getAttribute("style"), D !== ue && rp(U, ue, D);
                  }
                } else if (p && !_)
                  v.delete(U.toLowerCase()), ue = eu(e, U, j), j !== ue && rp(U, ue, j);
                else if (!pn(U, Le, p) && !qn(U, j, Le, p)) {
                  var H = !1;
                  if (Le !== null)
                    v.delete(Le.attributeName), ue = pl(e, U, j, Le);
                  else {
                    var O = i;
                    if (O === Bi && (O = ed(t)), O === Bi)
                      v.delete(U.toLowerCase());
                    else {
                      var q = PT(U);
                      q !== null && q !== U && (H = !0, v.delete(q)), v.delete(U);
                    }
                    ue = eu(e, U, j);
                  }
                  var pe = _;
                  !pe && j !== ue && !H && rp(U, ue, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[_o] !== !0 && NE(v), t) {
        case "input":
          Za(e), N(e, a, !0);
          break;
        case "textarea":
          Za(e), rv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && bh(e);
          break;
      }
      return M;
    }
    function BT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Dy(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Oy(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Ly(e, t, a) {
      {
        if (Fa)
          return;
        Fa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function My(e, t) {
      {
        if (t === "" || Fa)
          return;
        Fa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function $T(e, t, a) {
      switch (t) {
        case "input":
          F(e, a);
          return;
        case "textarea":
          qm(e, a);
          return;
        case "select":
          qf(e, a);
          return;
      }
    }
    var ap = function() {
    }, ip = function() {
    };
    {
      var IT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], FE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], YT = FE.concat(["button"]), QT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], jE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      ip = function(e, t) {
        var a = et({}, e || jE), i = {
          tag: t
        };
        return FE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), YT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), IT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var WT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return QT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, GT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, HE = {};
      ap = function(e, t, a) {
        a = a || jE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = WT(e, u) ? null : i, f = s ? null : GT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!HE[y]) {
            HE[y] = !0;
            var g = e, b = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", b = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, b, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var _h = "suppressHydrationWarning", kh = "$", Dh = "/$", lp = "$?", up = "$!", qT = "style", Ny = null, zy = null;
    function KT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ii:
        case nd: {
          t = i === Ii ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : td(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = td(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = ip(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function XT(e, t, a) {
      {
        var i = e, u = td(i.namespace, t), s = ip(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function ck(e) {
      return e;
    }
    function ZT(e) {
      Ny = Fn(), zy = dT();
      var t = null;
      return Qn(!1), t;
    }
    function JT(e) {
      pT(zy), Qn(Ny), Ny = null, zy = null;
    }
    function e1(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (ap(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = ip(f.ancestorInfo, e);
          ap(null, p, v);
        }
        s = f.namespace;
      }
      var y = UT(e, t, a, s);
      return cp(u, y), By(y, t), y;
    }
    function t1(e, t) {
      e.appendChild(t);
    }
    function n1(e, t, a, i, u) {
      switch (FT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function r1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = ip(f.ancestorInfo, t);
          ap(null, p, v);
        }
      }
      return jT(e, t, a, i);
    }
    function Uy(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function a1(e, t, a, i) {
      {
        var u = a;
        ap(null, e, u.ancestorInfo);
      }
      var s = AT(e, t);
      return cp(i, s), s;
    }
    function i1() {
      var e = window.event;
      return e === void 0 ? Na : af(e.type);
    }
    var Ay = typeof setTimeout == "function" ? setTimeout : void 0, l1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Fy = -1, PE = typeof Promise == "function" ? Promise : void 0, u1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof PE < "u" ? function(e) {
      return PE.resolve(null).then(e).catch(o1);
    } : Ay;
    function o1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function s1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function c1(e, t, a, i, u, s) {
      HT(e, t, a, i, u), By(e, u);
    }
    function VE(e) {
      ro(e, "");
    }
    function f1(e, t, a) {
      e.nodeValue = a;
    }
    function d1(e, t) {
      e.appendChild(t);
    }
    function p1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && bh(a);
    }
    function v1(e, t, a) {
      e.insertBefore(t, a);
    }
    function h1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function m1(e, t) {
      e.removeChild(t);
    }
    function y1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function jy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === Dh)
            if (i === 0) {
              e.removeChild(u), ku(t);
              return;
            } else
              i--;
          else (s === kh || s === lp || s === up) && i++;
        }
        a = u;
      } while (a);
      ku(t);
    }
    function g1(e, t) {
      e.nodeType === Ln ? jy(e.parentNode, t) : e.nodeType === Qr && jy(e, t), ku(e);
    }
    function S1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function E1(e) {
      e.nodeValue = "";
    }
    function C1(e, t) {
      e = e;
      var a = t[qT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = cc("display", i);
    }
    function R1(e, t) {
      e.nodeValue = t;
    }
    function T1(e) {
      e.nodeType === Qr ? e.textContent = "" : e.nodeType === Ii && e.documentElement && e.removeChild(e.documentElement);
    }
    function w1(e, t, a) {
      return e.nodeType !== Qr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function x1(e, t) {
      return t === "" || e.nodeType !== $i ? null : e;
    }
    function b1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function BE(e) {
      return e.data === lp;
    }
    function Hy(e) {
      return e.data === up;
    }
    function _1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function k1(e, t) {
      e._reactRetry = t;
    }
    function Oh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Qr || t === $i)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === kh || a === up || a === lp)
            break;
          if (a === Dh)
            return null;
        }
      }
      return e;
    }
    function op(e) {
      return Oh(e.nextSibling);
    }
    function D1(e) {
      return Oh(e.firstChild);
    }
    function O1(e) {
      return Oh(e.firstChild);
    }
    function L1(e) {
      return Oh(e.nextSibling);
    }
    function M1(e, t, a, i, u, s, f) {
      cp(s, e), By(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & st) !== ke;
      return VT(e, t, a, p, i, y, f);
    }
    function N1(e, t, a, i) {
      return cp(a, e), a.mode & st, BT(e, t);
    }
    function z1(e, t) {
      cp(t, e);
    }
    function U1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Dh) {
            if (a === 0)
              return op(t);
            a--;
          } else (i === kh || i === up || i === lp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function $E(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === kh || i === up || i === lp) {
            if (a === 0)
              return t;
            a--;
          } else i === Dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function A1(e) {
      ku(e);
    }
    function F1(e) {
      ku(e);
    }
    function j1(e) {
      return e !== "head" && e !== "body";
    }
    function H1(e, t, a, i) {
      var u = !0;
      xh(t.nodeValue, a, i, u);
    }
    function P1(e, t, a, i, u, s) {
      if (t[_h] !== !0) {
        var f = !0;
        xh(i.nodeValue, u, s, f);
      }
    }
    function V1(e, t) {
      t.nodeType === Qr ? Dy(e, t) : t.nodeType === Ln || Oy(e, t);
    }
    function B1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Qr ? Dy(a, t) : t.nodeType === Ln || Oy(a, t));
      }
    }
    function $1(e, t, a, i, u) {
      (u || t[_h] !== !0) && (i.nodeType === Qr ? Dy(a, i) : i.nodeType === Ln || Oy(a, i));
    }
    function I1(e, t, a) {
      Ly(e, t);
    }
    function Y1(e, t) {
      My(e, t);
    }
    function Q1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Ly(i, t);
      }
    }
    function W1(e, t) {
      {
        var a = e.parentNode;
        a !== null && My(a, t);
      }
    }
    function G1(e, t, a, i, u, s) {
      (s || t[_h] !== !0) && Ly(a, i);
    }
    function q1(e, t, a, i, u) {
      (u || t[_h] !== !0) && My(a, i);
    }
    function K1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function X1(e) {
      ep(e);
    }
    var Sf = Math.random().toString(36).slice(2), Ef = "__reactFiber$" + Sf, Py = "__reactProps$" + Sf, sp = "__reactContainer$" + Sf, Vy = "__reactEvents$" + Sf, Z1 = "__reactListeners$" + Sf, J1 = "__reactHandles$" + Sf;
    function ew(e) {
      delete e[Ef], delete e[Py], delete e[Vy], delete e[Z1], delete e[J1];
    }
    function cp(e, t) {
      t[Ef] = e;
    }
    function Lh(e, t) {
      t[sp] = e;
    }
    function IE(e) {
      e[sp] = null;
    }
    function fp(e) {
      return !!e[sp];
    }
    function Is(e) {
      var t = e[Ef];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[sp] || a[Ef], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = $E(e); u !== null; ) {
              var s = u[Ef];
              if (s)
                return s;
              u = $E(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function ko(e) {
      var t = e[Ef] || e[sp];
      return t && (t.tag === X || t.tag === Fe || t.tag === be || t.tag === ee) ? t : null;
    }
    function Cf(e) {
      if (e.tag === X || e.tag === Fe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Mh(e) {
      return e[Py] || null;
    }
    function By(e, t) {
      e[Py] = t;
    }
    function tw(e) {
      var t = e[Vy];
      return t === void 0 && (t = e[Vy] = /* @__PURE__ */ new Set()), t;
    }
    var YE = {}, QE = A.ReactDebugCurrentFrame;
    function Nh(e) {
      if (e) {
        var t = e._owner, a = Hi(e.type, e._source, t ? t.type : null);
        QE.setExtraStackFrame(a);
      } else
        QE.setExtraStackFrame(null);
    }
    function tl(e, t, a, i, u) {
      {
        var s = Function.call.bind(xr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Nh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Nh(null)), p instanceof Error && !(p.message in YE) && (YE[p.message] = !0, Nh(u), S("Failed %s type: %s", a, p.message), Nh(null));
          }
      }
    }
    var $y = [], zh;
    zh = [];
    var zu = -1;
    function Do(e) {
      return {
        current: e
      };
    }
    function ra(e, t) {
      if (zu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== zh[zu] && S("Unexpected Fiber popped."), e.current = $y[zu], $y[zu] = null, zh[zu] = null, zu--;
    }
    function aa(e, t, a) {
      zu++, $y[zu] = e.current, zh[zu] = a, e.current = t;
    }
    var Iy;
    Iy = {};
    var li = {};
    Object.freeze(li);
    var Uu = Do(li), Bl = Do(!1), Yy = li;
    function Rf(e, t, a) {
      return a && $l(t) ? Yy : Uu.current;
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Tf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return li;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Be(e) || "Unknown";
          tl(i, s, "context", p);
        }
        return u && WE(e, t, s), s;
      }
    }
    function Uh() {
      return Bl.current;
    }
    function $l(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Ah(e) {
      ra(Bl, e), ra(Uu, e);
    }
    function Qy(e) {
      ra(Bl, e), ra(Uu, e);
    }
    function GE(e, t, a) {
      {
        if (Uu.current !== li)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        aa(Uu, t, e), aa(Bl, a, e);
      }
    }
    function qE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Be(e) || "Unknown";
            Iy[s] || (Iy[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Be(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Be(e) || "Unknown";
          tl(u, f, "child context", v);
        }
        return et({}, a, f);
      }
    }
    function Fh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || li;
        return Yy = Uu.current, aa(Uu, a, e), aa(Bl, Bl.current, e), !0;
      }
    }
    function KE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = qE(e, t, Yy);
          i.__reactInternalMemoizedMergedChildContext = u, ra(Bl, e), ra(Uu, e), aa(Uu, u, e), aa(Bl, a, e);
        } else
          ra(Bl, e), aa(Bl, a, e);
      }
    }
    function nw(e) {
      {
        if (!vu(e) || e.tag !== ce)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case ee:
              return t.stateNode.context;
            case ce: {
              var a = t.type;
              if ($l(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Oo = 0, jh = 1, Au = null, Wy = !1, Gy = !1;
    function XE(e) {
      Au === null ? Au = [e] : Au.push(e);
    }
    function rw(e) {
      Wy = !0, XE(e);
    }
    function ZE() {
      Wy && Lo();
    }
    function Lo() {
      if (!Gy && Au !== null) {
        Gy = !0;
        var e = 0, t = Ua();
        try {
          var a = !0, i = Au;
          for (An(Lr); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Au = null, Wy = !1;
        } catch (s) {
          throw Au !== null && (Au = Au.slice(e + 1)), vd(ss, Lo), s;
        } finally {
          An(t), Gy = !1;
        }
      }
      return null;
    }
    var wf = [], xf = 0, Hh = null, Ph = 0, Li = [], Mi = 0, Ys = null, Fu = 1, ju = "";
    function aw(e) {
      return Ws(), (e.flags & Ci) !== _e;
    }
    function iw(e) {
      return Ws(), Ph;
    }
    function lw() {
      var e = ju, t = Fu, a = t & ~uw(t);
      return a.toString(32) + e;
    }
    function Qs(e, t) {
      Ws(), wf[xf++] = Ph, wf[xf++] = Hh, Hh = e, Ph = t;
    }
    function JE(e, t, a) {
      Ws(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Ys, Ys = e;
      var i = Fu, u = ju, s = Vh(i) - 1, f = i & ~(1 << s), p = a + 1, v = Vh(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, b = (f & g).toString(32), w = f >> y, M = s - y, U = Vh(t) + M, j = p << M, ue = j | w, Le = b + u;
        Fu = 1 << U | ue, ju = Le;
      } else {
        var we = p << s, Rt = we | f, mt = u;
        Fu = 1 << v | Rt, ju = mt;
      }
    }
    function qy(e) {
      Ws();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Qs(e, a), JE(e, a, i);
      }
    }
    function Vh(e) {
      return 32 - zn(e);
    }
    function uw(e) {
      return 1 << Vh(e) - 1;
    }
    function Ky(e) {
      for (; e === Hh; )
        Hh = wf[--xf], wf[xf] = null, Ph = wf[--xf], wf[xf] = null;
      for (; e === Ys; )
        Ys = Li[--Mi], Li[Mi] = null, ju = Li[--Mi], Li[Mi] = null, Fu = Li[--Mi], Li[Mi] = null;
    }
    function ow() {
      return Ws(), Ys !== null ? {
        id: Fu,
        overflow: ju
      } : null;
    }
    function sw(e, t) {
      Ws(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Ys, Fu = t.id, ju = t.overflow, Ys = e;
    }
    function Ws() {
      Ar() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Ur = null, Ni = null, nl = !1, Gs = !1, Mo = null;
    function cw() {
      nl && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function eC() {
      Gs = !0;
    }
    function fw() {
      return Gs;
    }
    function dw(e) {
      var t = e.stateNode.containerInfo;
      return Ni = O1(t), Ur = e, nl = !0, Mo = null, Gs = !1, !0;
    }
    function pw(e, t, a) {
      return Ni = L1(t), Ur = e, nl = !0, Mo = null, Gs = !1, a !== null && sw(e, a), !0;
    }
    function tC(e, t) {
      switch (e.tag) {
        case ee: {
          V1(e.stateNode.containerInfo, t);
          break;
        }
        case X: {
          var a = (e.mode & st) !== ke;
          $1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case be: {
          var i = e.memoizedState;
          i.dehydrated !== null && B1(i.dehydrated, t);
          break;
        }
      }
    }
    function nC(e, t) {
      tC(e, t);
      var a = y_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ka) : i.push(a);
    }
    function Xy(e, t) {
      {
        if (Gs)
          return;
        switch (e.tag) {
          case ee: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case X:
                var i = t.type;
                t.pendingProps, I1(a, i);
                break;
              case Fe:
                var u = t.pendingProps;
                Y1(a, u);
                break;
            }
            break;
          }
          case X: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case X: {
                var v = t.type, y = t.pendingProps, g = (e.mode & st) !== ke;
                G1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Fe: {
                var b = t.pendingProps, w = (e.mode & st) !== ke;
                q1(
                  s,
                  f,
                  p,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case be: {
            var M = e.memoizedState, U = M.dehydrated;
            if (U !== null) switch (t.tag) {
              case X:
                var j = t.type;
                t.pendingProps, Q1(U, j);
                break;
              case Fe:
                var ue = t.pendingProps;
                W1(U, ue);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function rC(e, t) {
      t.flags = t.flags & ~Gr | hn, Xy(e, t);
    }
    function aC(e, t) {
      switch (e.tag) {
        case X: {
          var a = e.type;
          e.pendingProps;
          var i = w1(t, a);
          return i !== null ? (e.stateNode = i, Ur = e, Ni = D1(i), !0) : !1;
        }
        case Fe: {
          var u = e.pendingProps, s = x1(t, u);
          return s !== null ? (e.stateNode = s, Ur = e, Ni = null, !0) : !1;
        }
        case be: {
          var f = b1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: ow(),
              retryLane: Zr
            };
            e.memoizedState = p;
            var v = g_(f);
            return v.return = e, e.child = v, Ur = e, Ni = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Zy(e) {
      return (e.mode & st) !== ke && (e.flags & xe) === _e;
    }
    function Jy(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function eg(e) {
      if (nl) {
        var t = Ni;
        if (!t) {
          Zy(e) && (Xy(Ur, e), Jy()), rC(Ur, e), nl = !1, Ur = e;
          return;
        }
        var a = t;
        if (!aC(e, t)) {
          Zy(e) && (Xy(Ur, e), Jy()), t = op(a);
          var i = Ur;
          if (!t || !aC(e, t)) {
            rC(Ur, e), nl = !1, Ur = e;
            return;
          }
          nC(i, a);
        }
      }
    }
    function vw(e, t, a) {
      var i = e.stateNode, u = !Gs, s = M1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function hw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = N1(t, a, e);
      if (i) {
        var u = Ur;
        if (u !== null)
          switch (u.tag) {
            case ee: {
              var s = u.stateNode.containerInfo, f = (u.mode & st) !== ke;
              H1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case X: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & st) !== ke;
              P1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function mw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      z1(a, e);
    }
    function yw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return U1(a);
    }
    function iC(e) {
      for (var t = e.return; t !== null && t.tag !== X && t.tag !== ee && t.tag !== be; )
        t = t.return;
      Ur = t;
    }
    function Bh(e) {
      if (e !== Ur)
        return !1;
      if (!nl)
        return iC(e), nl = !0, !1;
      if (e.tag !== ee && (e.tag !== X || j1(e.type) && !Uy(e.type, e.memoizedProps))) {
        var t = Ni;
        if (t)
          if (Zy(e))
            lC(e), Jy();
          else
            for (; t; )
              nC(e, t), t = op(t);
      }
      return iC(e), e.tag === be ? Ni = yw(e) : Ni = Ur ? op(e.stateNode) : null, !0;
    }
    function gw() {
      return nl && Ni !== null;
    }
    function lC(e) {
      for (var t = Ni; t; )
        tC(e, t), t = op(t);
    }
    function bf() {
      Ur = null, Ni = null, nl = !1, Gs = !1;
    }
    function uC() {
      Mo !== null && (eR(Mo), Mo = null);
    }
    function Ar() {
      return nl;
    }
    function tg(e) {
      Mo === null ? Mo = [e] : Mo.push(e);
    }
    var Sw = A.ReactCurrentBatchConfig, Ew = null;
    function Cw() {
      return Sw.transition;
    }
    var rl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Rw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Wt && (t = a), a = a.return;
        return t;
      }, qs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, dp = [], pp = [], vp = [], hp = [], mp = [], yp = [], Ks = /* @__PURE__ */ new Set();
      rl.recordUnsafeLifecycleWarnings = function(e, t) {
        Ks.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && dp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillMount == "function" && pp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillReceiveProps == "function" && hp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillUpdate == "function" && yp.push(e));
      }, rl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          e.add(Be(w) || "Component"), Ks.add(w.type);
        }), dp = []);
        var t = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          t.add(Be(w) || "Component"), Ks.add(w.type);
        }), pp = []);
        var a = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          a.add(Be(w) || "Component"), Ks.add(w.type);
        }), vp = []);
        var i = /* @__PURE__ */ new Set();
        hp.length > 0 && (hp.forEach(function(w) {
          i.add(Be(w) || "Component"), Ks.add(w.type);
        }), hp = []);
        var u = /* @__PURE__ */ new Set();
        mp.length > 0 && (mp.forEach(function(w) {
          u.add(Be(w) || "Component"), Ks.add(w.type);
        }), mp = []);
        var s = /* @__PURE__ */ new Set();
        if (yp.length > 0 && (yp.forEach(function(w) {
          s.add(Be(w) || "Component"), Ks.add(w.type);
        }), yp = []), t.size > 0) {
          var f = qs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = qs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = qs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = qs(e);
          gt(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = qs(a);
          gt(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var b = qs(u);
          gt(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
      };
      var $h = /* @__PURE__ */ new Map(), oC = /* @__PURE__ */ new Set();
      rl.recordLegacyContextWarning = function(e, t) {
        var a = Rw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!oC.has(e.type)) {
          var i = $h.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], $h.set(a, i)), i.push(e));
        }
      }, rl.flushLegacyContextWarning = function() {
        $h.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Be(s) || "Component"), oC.add(s.type);
            });
            var u = qs(i);
            try {
              It(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              on();
            }
          }
        });
      }, rl.discardPendingWarnings = function() {
        dp = [], pp = [], vp = [], hp = [], mp = [], yp = [], $h = /* @__PURE__ */ new Map();
      };
    }
    var ng, rg, ag, ig, lg, sC = function(e, t) {
    };
    ng = !1, rg = !1, ag = {}, ig = {}, lg = {}, sC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Be(t) || "Component";
        ig[a] || (ig[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Tw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function gp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Wt || P) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== ce) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Tw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Be(e) || "Component";
          ag[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), ag[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ce)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          si(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(b) {
            var w = v.refs;
            b === null ? delete w[y] : w[y] = b;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Ih(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Yh(e) {
      {
        var t = Be(e) || "Component";
        if (lg[t])
          return;
        lg[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function cC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function fC(e) {
      function t(D, H) {
        if (e) {
          var O = D.deletions;
          O === null ? (D.deletions = [H], D.flags |= ka) : O.push(H);
        }
      }
      function a(D, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(D, O), O = O.sibling;
        return null;
      }
      function i(D, H) {
        for (var O = /* @__PURE__ */ new Map(), q = H; q !== null; )
          q.key !== null ? O.set(q.key, q) : O.set(q.index, q), q = q.sibling;
        return O;
      }
      function u(D, H) {
        var O = ic(D, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(D, H, O) {
        if (D.index = O, !e)
          return D.flags |= Ci, H;
        var q = D.alternate;
        if (q !== null) {
          var pe = q.index;
          return pe < H ? (D.flags |= hn, H) : pe;
        } else
          return D.flags |= hn, H;
      }
      function f(D) {
        return e && D.alternate === null && (D.flags |= hn), D;
      }
      function p(D, H, O, q) {
        if (H === null || H.tag !== Fe) {
          var pe = tE(O, D.mode, q);
          return pe.return = D, pe;
        } else {
          var se = u(H, O);
          return se.return = D, se;
        }
      }
      function v(D, H, O, q) {
        var pe = O.type;
        if (pe === fi)
          return g(D, H, O.props.children, q, O.key);
        if (H !== null && (H.elementType === pe || // Keep this check inline so it only runs on the false path:
        mR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof pe == "object" && pe !== null && pe.$$typeof === $e && cC(pe) === H.type)) {
          var se = u(H, O.props);
          return se.ref = gp(D, H, O), se.return = D, se._debugSource = O._source, se._debugOwner = O._owner, se;
        }
        var Pe = eE(O, D.mode, q);
        return Pe.ref = gp(D, H, O), Pe.return = D, Pe;
      }
      function y(D, H, O, q) {
        if (H === null || H.tag !== Se || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var pe = nE(O, D.mode, q);
          return pe.return = D, pe;
        } else {
          var se = u(H, O.children || []);
          return se.return = D, se;
        }
      }
      function g(D, H, O, q, pe) {
        if (H === null || H.tag !== Ke) {
          var se = $o(O, D.mode, q, pe);
          return se.return = D, se;
        } else {
          var Pe = u(H, O);
          return Pe.return = D, Pe;
        }
      }
      function b(D, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var q = tE("" + H, D.mode, O);
          return q.return = D, q;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case _r: {
              var pe = eE(H, D.mode, O);
              return pe.ref = gp(D, null, H), pe.return = D, pe;
            }
            case nr: {
              var se = nE(H, D.mode, O);
              return se.return = D, se;
            }
            case $e: {
              var Pe = H._payload, Qe = H._init;
              return b(D, Qe(Pe), O);
            }
          }
          if (it(H) || Ge(H)) {
            var qt = $o(H, D.mode, O, null);
            return qt.return = D, qt;
          }
          Ih(D, H);
        }
        return typeof H == "function" && Yh(D), null;
      }
      function w(D, H, O, q) {
        var pe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return pe !== null ? null : p(D, H, "" + O, q);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return O.key === pe ? v(D, H, O, q) : null;
            case nr:
              return O.key === pe ? y(D, H, O, q) : null;
            case $e: {
              var se = O._payload, Pe = O._init;
              return w(D, H, Pe(se), q);
            }
          }
          if (it(O) || Ge(O))
            return pe !== null ? null : g(D, H, O, q, null);
          Ih(D, O);
        }
        return typeof O == "function" && Yh(D), null;
      }
      function M(D, H, O, q, pe) {
        if (typeof q == "string" && q !== "" || typeof q == "number") {
          var se = D.get(O) || null;
          return p(H, se, "" + q, pe);
        }
        if (typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case _r: {
              var Pe = D.get(q.key === null ? O : q.key) || null;
              return v(H, Pe, q, pe);
            }
            case nr: {
              var Qe = D.get(q.key === null ? O : q.key) || null;
              return y(H, Qe, q, pe);
            }
            case $e:
              var qt = q._payload, zt = q._init;
              return M(D, H, O, zt(qt), pe);
          }
          if (it(q) || Ge(q)) {
            var Wn = D.get(O) || null;
            return g(H, Wn, q, pe, null);
          }
          Ih(H, q);
        }
        return typeof q == "function" && Yh(H), null;
      }
      function U(D, H, O) {
        {
          if (typeof D != "object" || D === null)
            return H;
          switch (D.$$typeof) {
            case _r:
            case nr:
              sC(D, O);
              var q = D.key;
              if (typeof q != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(q);
                break;
              }
              if (!H.has(q)) {
                H.add(q);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", q);
              break;
            case $e:
              var pe = D._payload, se = D._init;
              U(se(pe), H, O);
              break;
          }
        }
        return H;
      }
      function j(D, H, O, q) {
        for (var pe = null, se = 0; se < O.length; se++) {
          var Pe = O[se];
          pe = U(Pe, pe, D);
        }
        for (var Qe = null, qt = null, zt = H, Wn = 0, Ut = 0, Hn = null; zt !== null && Ut < O.length; Ut++) {
          zt.index > Ut ? (Hn = zt, zt = null) : Hn = zt.sibling;
          var la = w(D, zt, O[Ut], q);
          if (la === null) {
            zt === null && (zt = Hn);
            break;
          }
          e && zt && la.alternate === null && t(D, zt), Wn = s(la, Wn, Ut), qt === null ? Qe = la : qt.sibling = la, qt = la, zt = Hn;
        }
        if (Ut === O.length) {
          if (a(D, zt), Ar()) {
            var $r = Ut;
            Qs(D, $r);
          }
          return Qe;
        }
        if (zt === null) {
          for (; Ut < O.length; Ut++) {
            var oi = b(D, O[Ut], q);
            oi !== null && (Wn = s(oi, Wn, Ut), qt === null ? Qe = oi : qt.sibling = oi, qt = oi);
          }
          if (Ar()) {
            var Ca = Ut;
            Qs(D, Ca);
          }
          return Qe;
        }
        for (var Ra = i(D, zt); Ut < O.length; Ut++) {
          var ua = M(Ra, D, Ut, O[Ut], q);
          ua !== null && (e && ua.alternate !== null && Ra.delete(ua.key === null ? Ut : ua.key), Wn = s(ua, Wn, Ut), qt === null ? Qe = ua : qt.sibling = ua, qt = ua);
        }
        if (e && Ra.forEach(function(Yf) {
          return t(D, Yf);
        }), Ar()) {
          var Yu = Ut;
          Qs(D, Yu);
        }
        return Qe;
      }
      function ue(D, H, O, q) {
        var pe = Ge(O);
        if (typeof pe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (rg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), rg = !0), O.entries === pe && (ng || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ng = !0);
          var se = pe.call(O);
          if (se)
            for (var Pe = null, Qe = se.next(); !Qe.done; Qe = se.next()) {
              var qt = Qe.value;
              Pe = U(qt, Pe, D);
            }
        }
        var zt = pe.call(O);
        if (zt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, Ut = null, Hn = H, la = 0, $r = 0, oi = null, Ca = zt.next(); Hn !== null && !Ca.done; $r++, Ca = zt.next()) {
          Hn.index > $r ? (oi = Hn, Hn = null) : oi = Hn.sibling;
          var Ra = w(D, Hn, Ca.value, q);
          if (Ra === null) {
            Hn === null && (Hn = oi);
            break;
          }
          e && Hn && Ra.alternate === null && t(D, Hn), la = s(Ra, la, $r), Ut === null ? Wn = Ra : Ut.sibling = Ra, Ut = Ra, Hn = oi;
        }
        if (Ca.done) {
          if (a(D, Hn), Ar()) {
            var ua = $r;
            Qs(D, ua);
          }
          return Wn;
        }
        if (Hn === null) {
          for (; !Ca.done; $r++, Ca = zt.next()) {
            var Yu = b(D, Ca.value, q);
            Yu !== null && (la = s(Yu, la, $r), Ut === null ? Wn = Yu : Ut.sibling = Yu, Ut = Yu);
          }
          if (Ar()) {
            var Yf = $r;
            Qs(D, Yf);
          }
          return Wn;
        }
        for (var Kp = i(D, Hn); !Ca.done; $r++, Ca = zt.next()) {
          var Xl = M(Kp, D, $r, Ca.value, q);
          Xl !== null && (e && Xl.alternate !== null && Kp.delete(Xl.key === null ? $r : Xl.key), la = s(Xl, la, $r), Ut === null ? Wn = Xl : Ut.sibling = Xl, Ut = Xl);
        }
        if (e && Kp.forEach(function(q_) {
          return t(D, q_);
        }), Ar()) {
          var G_ = $r;
          Qs(D, G_);
        }
        return Wn;
      }
      function Le(D, H, O, q) {
        if (H !== null && H.tag === Fe) {
          a(D, H.sibling);
          var pe = u(H, O);
          return pe.return = D, pe;
        }
        a(D, H);
        var se = tE(O, D.mode, q);
        return se.return = D, se;
      }
      function we(D, H, O, q) {
        for (var pe = O.key, se = H; se !== null; ) {
          if (se.key === pe) {
            var Pe = O.type;
            if (Pe === fi) {
              if (se.tag === Ke) {
                a(D, se.sibling);
                var Qe = u(se, O.props.children);
                return Qe.return = D, Qe._debugSource = O._source, Qe._debugOwner = O._owner, Qe;
              }
            } else if (se.elementType === Pe || // Keep this check inline so it only runs on the false path:
            mR(se, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Pe == "object" && Pe !== null && Pe.$$typeof === $e && cC(Pe) === se.type) {
              a(D, se.sibling);
              var qt = u(se, O.props);
              return qt.ref = gp(D, se, O), qt.return = D, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(D, se);
            break;
          } else
            t(D, se);
          se = se.sibling;
        }
        if (O.type === fi) {
          var zt = $o(O.props.children, D.mode, q, O.key);
          return zt.return = D, zt;
        } else {
          var Wn = eE(O, D.mode, q);
          return Wn.ref = gp(D, H, O), Wn.return = D, Wn;
        }
      }
      function Rt(D, H, O, q) {
        for (var pe = O.key, se = H; se !== null; ) {
          if (se.key === pe)
            if (se.tag === Se && se.stateNode.containerInfo === O.containerInfo && se.stateNode.implementation === O.implementation) {
              a(D, se.sibling);
              var Pe = u(se, O.children || []);
              return Pe.return = D, Pe;
            } else {
              a(D, se);
              break;
            }
          else
            t(D, se);
          se = se.sibling;
        }
        var Qe = nE(O, D.mode, q);
        return Qe.return = D, Qe;
      }
      function mt(D, H, O, q) {
        var pe = typeof O == "object" && O !== null && O.type === fi && O.key === null;
        if (pe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return f(we(D, H, O, q));
            case nr:
              return f(Rt(D, H, O, q));
            case $e:
              var se = O._payload, Pe = O._init;
              return mt(D, H, Pe(se), q);
          }
          if (it(O))
            return j(D, H, O, q);
          if (Ge(O))
            return ue(D, H, O, q);
          Ih(D, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Le(D, H, "" + O, q)) : (typeof O == "function" && Yh(D), a(D, H));
      }
      return mt;
    }
    var _f = fC(!0), dC = fC(!1);
    function ww(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ic(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ic(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function xw(e, t) {
      for (var a = e.child; a !== null; )
        d_(a, t), a = a.sibling;
    }
    var ug = Do(null), og;
    og = {};
    var Qh = null, kf = null, sg = null, Wh = !1;
    function Gh() {
      Qh = null, kf = null, sg = null, Wh = !1;
    }
    function pC() {
      Wh = !0;
    }
    function vC() {
      Wh = !1;
    }
    function hC(e, t, a) {
      aa(ug, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== og && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = og;
    }
    function cg(e, t) {
      var a = ug.current;
      ra(ug, t), e._currentValue = a;
    }
    function fg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (_u(i.childLanes, t) ? u !== null && !_u(u.childLanes, t) && (u.childLanes = Xe(u.childLanes, t)) : (i.childLanes = Xe(i.childLanes, t), u !== null && (u.childLanes = Xe(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function bw(e, t, a) {
      _w(e, t, a);
    }
    function _w(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ce) {
                var p = Ts(a), v = Hu(Kt, p);
                v.tag = Kh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, b = g.pending;
                  b === null ? v.next = v : (v.next = b.next, b.next = v), g.pending = v;
                }
              }
              i.lanes = Xe(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = Xe(w.lanes, a)), fg(i.return, a, e), s.lanes = Xe(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === vt)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Xt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = Xe(M.lanes, a);
          var U = M.alternate;
          U !== null && (U.lanes = Xe(U.lanes, a)), fg(M, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Df(e, t) {
      Qh = e, kf = null, sg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Jr(a.lanes, t) && Np(), a.firstContext = null);
      }
    }
    function er(e) {
      Wh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (sg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (kf === null) {
          if (Qh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          kf = a, Qh.dependencies = {
            lanes: $,
            firstContext: a
          };
        } else
          kf = kf.next = a;
      }
      return t;
    }
    var Xs = null;
    function dg(e) {
      Xs === null ? Xs = [e] : Xs.push(e);
    }
    function kw() {
      if (Xs !== null) {
        for (var e = 0; e < Xs.length; e++) {
          var t = Xs[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Xs = null;
      }
    }
    function mC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, dg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, qh(e, i);
    }
    function Dw(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, dg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Ow(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, dg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, qh(e, i);
    }
    function ja(e, t) {
      return qh(e, t);
    }
    var Lw = qh;
    function qh(e, t) {
      e.lanes = Xe(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Xe(a.lanes, t)), a === null && (e.flags & (hn | Gr)) !== _e && dR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Xe(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Xe(a.childLanes, t) : (u.flags & (hn | Gr)) !== _e && dR(e), i = u, u = u.return;
      if (i.tag === ee) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var yC = 0, gC = 1, Kh = 2, pg = 3, Xh = !1, vg, Zh;
    vg = !1, Zh = null;
    function hg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: $
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function SC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Hu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: yC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function No(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Zh === u && !vg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), vg = !0), Db()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Lw(e, a);
      } else
        return Ow(e, u, t, a);
    }
    function Jh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Ld(a)) {
          var s = u.lanes;
          s = Nd(s, e.pendingLanes);
          var f = Xe(s, a);
          u.lanes = f, ef(e, f);
        }
      }
    }
    function mg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Mw(e, t, a, i, u, s) {
      switch (a.tag) {
        case gC: {
          var f = a.payload;
          if (typeof f == "function") {
            pC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              vC();
            }
            return p;
          }
          return f;
        }
        case pg:
          e.flags = e.flags & ~Kn | xe;
        case yC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            pC(), y = v.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              vC();
            }
          } else
            y = v;
          return y == null ? i : et({}, i, y);
        }
        case Kh:
          return Xh = !0, i;
      }
      return i;
    }
    function em(e, t, a, i) {
      var u = e.updateQueue;
      Xh = !1, Zh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var b = g.updateQueue, w = b.lastBaseUpdate;
          w !== f && (w === null ? b.firstBaseUpdate = y : w.next = y, b.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, U = $, j = null, ue = null, Le = null, we = s;
        do {
          var Rt = we.lane, mt = we.eventTime;
          if (_u(i, Rt)) {
            if (Le !== null) {
              var H = {
                eventTime: mt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                tag: we.tag,
                payload: we.payload,
                callback: we.callback,
                next: null
              };
              Le = Le.next = H;
            }
            M = Mw(e, u, we, M, t, a);
            var O = we.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            we.lane !== _t) {
              e.flags |= nn;
              var q = u.effects;
              q === null ? u.effects = [we] : q.push(we);
            }
          } else {
            var D = {
              eventTime: mt,
              lane: Rt,
              tag: we.tag,
              payload: we.payload,
              callback: we.callback,
              next: null
            };
            Le === null ? (ue = Le = D, j = M) : Le = Le.next = D, U = Xe(U, Rt);
          }
          if (we = we.next, we === null) {
            if (p = u.shared.pending, p === null)
              break;
            var pe = p, se = pe.next;
            pe.next = null, we = se, u.lastBaseUpdate = pe, u.shared.pending = null;
          }
        } while (!0);
        Le === null && (j = M), u.baseState = j, u.firstBaseUpdate = ue, u.lastBaseUpdate = Le;
        var Pe = u.shared.interleaved;
        if (Pe !== null) {
          var Qe = Pe;
          do
            U = Xe(U, Qe.lane), Qe = Qe.next;
          while (Qe !== Pe);
        } else s === null && (u.shared.lanes = $);
        Yp(U), e.lanes = U, e.memoizedState = M;
      }
      Zh = null;
    }
    function Nw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function EC() {
      Xh = !1;
    }
    function tm() {
      return Xh;
    }
    function CC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Nw(f, a));
        }
    }
    var Sp = {}, zo = Do(Sp), Ep = Do(Sp), nm = Do(Sp);
    function rm(e) {
      if (e === Sp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function RC() {
      var e = rm(nm.current);
      return e;
    }
    function yg(e, t) {
      aa(nm, t, e), aa(Ep, e, e), aa(zo, Sp, e);
      var a = KT(t);
      ra(zo, e), aa(zo, a, e);
    }
    function Of(e) {
      ra(zo, e), ra(Ep, e), ra(nm, e);
    }
    function gg() {
      var e = rm(zo.current);
      return e;
    }
    function TC(e) {
      rm(nm.current);
      var t = rm(zo.current), a = XT(t, e.type);
      t !== a && (aa(Ep, e, e), aa(zo, a, e));
    }
    function Sg(e) {
      Ep.current === e && (ra(zo, e), ra(Ep, e));
    }
    var zw = 0, wC = 1, xC = 1, Cp = 2, al = Do(zw);
    function Eg(e, t) {
      return (e & t) !== 0;
    }
    function Lf(e) {
      return e & wC;
    }
    function Cg(e, t) {
      return e & wC | t;
    }
    function Uw(e, t) {
      return e | t;
    }
    function Uo(e, t) {
      aa(al, t, e);
    }
    function Mf(e) {
      ra(al, e);
    }
    function Aw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function am(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === be) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || BE(i) || Hy(i))
              return t;
          }
        } else if (t.tag === an && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & xe) !== _e;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ha = (
      /*   */
      0
    ), sr = (
      /* */
      1
    ), Il = (
      /*  */
      2
    ), cr = (
      /*    */
      4
    ), Fr = (
      /*   */
      8
    ), Rg = [];
    function Tg() {
      for (var e = 0; e < Rg.length; e++) {
        var t = Rg[e];
        t._workInProgressVersionPrimary = null;
      }
      Rg.length = 0;
    }
    function Fw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var de = A.ReactCurrentDispatcher, Rp = A.ReactCurrentBatchConfig, wg, Nf;
    wg = /* @__PURE__ */ new Set();
    var Zs = $, Gt = null, fr = null, dr = null, im = !1, Tp = !1, wp = 0, jw = 0, Hw = 25, V = null, zi = null, Ao = -1, xg = !1;
    function Pt() {
      {
        var e = V;
        zi === null ? zi = [e] : zi.push(e);
      }
    }
    function ne() {
      {
        var e = V;
        zi !== null && (Ao++, zi[Ao] !== e && Pw(e));
      }
    }
    function zf(e) {
      e != null && !it(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", V, typeof e);
    }
    function Pw(e) {
      {
        var t = Be(Gt);
        if (!wg.has(t) && (wg.add(t), zi !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ao; u++) {
            for (var s = zi[u], f = u === Ao ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ia() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function bg(e, t) {
      if (xg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", V), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, V, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Q(e[a], t[a]))
          return !1;
      return !0;
    }
    function Uf(e, t, a, i, u, s) {
      Zs = s, Gt = t, zi = e !== null ? e._debugHookTypes : null, Ao = -1, xg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? de.current = WC : zi !== null ? de.current = QC : de.current = YC;
      var f = a(i, u);
      if (Tp) {
        var p = 0;
        do {
          if (Tp = !1, wp = 0, p >= Hw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, xg = !1, fr = null, dr = null, t.updateQueue = null, Ao = -1, de.current = GC, f = a(i, u);
        } while (Tp);
      }
      de.current = gm, t._debugHookTypes = zi;
      var v = fr !== null && fr.next !== null;
      if (Zs = $, Gt = null, fr = null, dr = null, V = null, zi = null, Ao = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & st) !== ke && S("Internal React error: Expected static flag was missing. Please notify the React team."), im = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Af() {
      var e = wp !== 0;
      return wp = 0, e;
    }
    function bC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Mt) !== ke ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = ws(e.lanes, a);
    }
    function _C() {
      if (de.current = gm, im) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        im = !1;
      }
      Zs = $, Gt = null, fr = null, dr = null, zi = null, Ao = -1, V = null, PC = !1, Tp = !1, wp = 0;
    }
    function Yl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return dr === null ? Gt.memoizedState = dr = e : dr = dr.next = e, dr;
    }
    function Ui() {
      var e;
      if (fr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = fr.next;
      var a;
      if (dr === null ? a = Gt.memoizedState : a = dr.next, a !== null)
        dr = a, a = dr.next, fr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        fr = e;
        var i = {
          memoizedState: fr.memoizedState,
          baseState: fr.baseState,
          baseQueue: fr.baseQueue,
          queue: fr.queue,
          next: null
        };
        dr === null ? Gt.memoizedState = dr = i : dr = dr.next = i;
      }
      return dr;
    }
    function kC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function _g(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function kg(e, t, a) {
      var i = Yl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Iw.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function Dg(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = fr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, b = s.baseState, w = null, M = null, U = null, j = g;
        do {
          var ue = j.lane;
          if (_u(Zs, ue)) {
            if (U !== null) {
              var we = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              U = U.next = we;
            }
            if (j.hasEagerState)
              b = j.eagerState;
            else {
              var Rt = j.action;
              b = e(b, Rt);
            }
          } else {
            var Le = {
              lane: ue,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            U === null ? (M = U = Le, w = b) : U = U.next = Le, Gt.lanes = Xe(Gt.lanes, ue), Yp(ue);
          }
          j = j.next;
        } while (j !== null && j !== g);
        U === null ? w = b : U.next = M, Q(b, i.memoizedState) || Np(), i.memoizedState = b, i.baseState = w, i.baseQueue = U, u.lastRenderedState = b;
      }
      var mt = u.interleaved;
      if (mt !== null) {
        var D = mt;
        do {
          var H = D.lane;
          Gt.lanes = Xe(Gt.lanes, H), Yp(H), D = D.next;
        } while (D !== mt);
      } else f === null && (u.lanes = $);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function Og(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        Q(p, i.memoizedState) || Np(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function fk(e, t, a) {
    }
    function dk(e, t, a) {
    }
    function Lg(e, t, a) {
      var i = Gt, u = Yl(), s, f = Ar();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Nf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Nf = !0);
      } else {
        if (s = t(), !Nf) {
          var p = t();
          Q(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Nf = !0);
        }
        var v = Fm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Zc(v, Zs) || DC(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, cm(LC.bind(null, i, y, e), [e]), i.flags |= Wr, xp(sr | Fr, OC.bind(null, i, y, s, t), void 0, null), s;
    }
    function lm(e, t, a) {
      var i = Gt, u = Ui(), s = t();
      if (!Nf) {
        var f = t();
        Q(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Nf = !0);
      }
      var p = u.memoizedState, v = !Q(p, s);
      v && (u.memoizedState = s, Np());
      var y = u.queue;
      if (_p(LC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      dr !== null && dr.memoizedState.tag & sr) {
        i.flags |= Wr, xp(sr | Fr, OC.bind(null, i, y, s, t), void 0, null);
        var g = Fm();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Zc(g, Zs) || DC(i, t, s);
      }
      return s;
    }
    function DC(e, t, a) {
      e.flags |= po;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = kC(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function OC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, MC(t) && NC(e);
    }
    function LC(e, t, a) {
      var i = function() {
        MC(t) && NC(e);
      };
      return a(i);
    }
    function MC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Q(a, i);
      } catch {
        return !0;
      }
    }
    function NC(e) {
      var t = ja(e, Ae);
      t !== null && mr(t, e, Ae, Kt);
    }
    function um(e) {
      var t = Yl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: _g,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Yw.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function Mg(e) {
      return Dg(_g);
    }
    function Ng(e) {
      return Og(_g);
    }
    function xp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = kC(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function zg(e) {
      var t = Yl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function om(e) {
      var t = Ui();
      return t.memoizedState;
    }
    function bp(e, t, a, i) {
      var u = Yl(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = xp(sr | t, a, void 0, s);
    }
    function sm(e, t, a, i) {
      var u = Ui(), s = i === void 0 ? null : i, f = void 0;
      if (fr !== null) {
        var p = fr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (bg(s, v)) {
            u.memoizedState = xp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = xp(sr | t, a, f, s);
    }
    function cm(e, t) {
      return (Gt.mode & Mt) !== ke ? bp(Ri | Wr | xc, Fr, e, t) : bp(Wr | xc, Fr, e, t);
    }
    function _p(e, t) {
      return sm(Wr, Fr, e, t);
    }
    function Ug(e, t) {
      return bp(St, Il, e, t);
    }
    function fm(e, t) {
      return sm(St, Il, e, t);
    }
    function Ag(e, t) {
      var a = St;
      return a |= Qi, (Gt.mode & Mt) !== ke && (a |= bl), bp(a, cr, e, t);
    }
    function dm(e, t) {
      return sm(St, cr, e, t);
    }
    function zC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Fg(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = St;
      return u |= Qi, (Gt.mode & Mt) !== ke && (u |= bl), bp(u, cr, zC.bind(null, t, e), i);
    }
    function pm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return sm(St, cr, zC.bind(null, t, e), i);
    }
    function Vw(e, t) {
    }
    var vm = Vw;
    function jg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function hm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Hg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function mm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Pg(e) {
      var t = Yl();
      return t.memoizedState = e, e;
    }
    function UC(e) {
      var t = Ui(), a = fr, i = a.memoizedState;
      return FC(t, i, e);
    }
    function AC(e) {
      var t = Ui();
      if (fr === null)
        return t.memoizedState = e, e;
      var a = fr.memoizedState;
      return FC(t, a, e);
    }
    function FC(e, t, a) {
      var i = !Dd(Zs);
      if (i) {
        if (!Q(a, t)) {
          var u = Md();
          Gt.lanes = Xe(Gt.lanes, u), Yp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Np()), e.memoizedState = a, a;
    }
    function Bw(e, t, a) {
      var i = Ua();
      An(Wv(i, bi)), e(!0);
      var u = Rp.transition;
      Rp.transition = {};
      var s = Rp.transition;
      Rp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Rp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && gt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Vg() {
      var e = um(!1), t = e[0], a = e[1], i = Bw.bind(null, a), u = Yl();
      return u.memoizedState = i, [t, i];
    }
    function jC() {
      var e = Mg(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    function HC() {
      var e = Ng(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    var PC = !1;
    function $w() {
      return PC;
    }
    function Bg() {
      var e = Yl(), t = Fm(), a = t.identifierPrefix, i;
      if (Ar()) {
        var u = lw();
        i = ":" + a + "R" + u;
        var s = wp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = jw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function ym() {
      var e = Ui(), t = e.memoizedState;
      return t;
    }
    function Iw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (VC(e))
        BC(t, u);
      else {
        var s = mC(e, t, u, i);
        if (s !== null) {
          var f = Ea();
          mr(s, e, i, f), $C(s, t, i);
        }
      }
      IC(e, i);
    }
    function Yw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (VC(e))
        BC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === $ && (s === null || s.lanes === $)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = de.current, de.current = il;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, Q(y, v)) {
                Dw(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              de.current = p;
            }
          }
        }
        var g = mC(e, t, u, i);
        if (g !== null) {
          var b = Ea();
          mr(g, e, i, b), $C(g, t, i);
        }
      }
      IC(e, i);
    }
    function VC(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function BC(e, t) {
      Tp = im = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function $C(e, t, a) {
      if (Ld(a)) {
        var i = t.lanes;
        i = Nd(i, e.pendingLanes);
        var u = Xe(i, a);
        t.lanes = u, ef(e, u);
      }
    }
    function IC(e, t, a) {
      vs(e, t);
    }
    var gm = {
      readContext: er,
      useCallback: ia,
      useContext: ia,
      useEffect: ia,
      useImperativeHandle: ia,
      useInsertionEffect: ia,
      useLayoutEffect: ia,
      useMemo: ia,
      useReducer: ia,
      useRef: ia,
      useState: ia,
      useDebugValue: ia,
      useDeferredValue: ia,
      useTransition: ia,
      useMutableSource: ia,
      useSyncExternalStore: ia,
      useId: ia,
      unstable_isNewReconciler: Z
    }, YC = null, QC = null, WC = null, GC = null, Ql = null, il = null, Sm = null;
    {
      var $g = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Ie = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      YC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Pt(), zf(t), jg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Pt(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Pt(), zf(t), cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Pt(), zf(a), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Pt(), zf(t), Ug(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Pt(), zf(t), Ag(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Pt(), zf(t);
          var a = de.current;
          de.current = Ql;
          try {
            return Hg(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Pt();
          var i = de.current;
          de.current = Ql;
          try {
            return kg(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Pt(), zg(e);
        },
        useState: function(e) {
          V = "useState", Pt();
          var t = de.current;
          de.current = Ql;
          try {
            return um(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Pt(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Pt(), Pg(e);
        },
        useTransition: function() {
          return V = "useTransition", Pt(), Vg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Pt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Pt(), Lg(e, t, a);
        },
        useId: function() {
          return V = "useId", Pt(), Bg();
        },
        unstable_isNewReconciler: Z
      }, QC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", ne(), jg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", ne(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", ne(), cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", ne(), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", ne(), Ug(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", ne(), Ag(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", ne();
          var a = de.current;
          de.current = Ql;
          try {
            return Hg(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", ne();
          var i = de.current;
          de.current = Ql;
          try {
            return kg(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", ne(), zg(e);
        },
        useState: function(e) {
          V = "useState", ne();
          var t = de.current;
          de.current = Ql;
          try {
            return um(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", ne(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", ne(), Pg(e);
        },
        useTransition: function() {
          return V = "useTransition", ne(), Vg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", ne(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", ne(), Lg(e, t, a);
        },
        useId: function() {
          return V = "useId", ne(), Bg();
        },
        unstable_isNewReconciler: Z
      }, WC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", ne(), hm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", ne(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", ne(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", ne(), pm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", ne(), fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", ne(), dm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", ne();
          var a = de.current;
          de.current = il;
          try {
            return mm(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", ne();
          var i = de.current;
          de.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", ne(), om();
        },
        useState: function(e) {
          V = "useState", ne();
          var t = de.current;
          de.current = il;
          try {
            return Mg(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", ne(), vm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", ne(), UC(e);
        },
        useTransition: function() {
          return V = "useTransition", ne(), jC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", ne(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", ne(), lm(e, t);
        },
        useId: function() {
          return V = "useId", ne(), ym();
        },
        unstable_isNewReconciler: Z
      }, GC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", ne(), hm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", ne(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", ne(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", ne(), pm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", ne(), fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", ne(), dm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", ne();
          var a = de.current;
          de.current = Sm;
          try {
            return mm(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", ne();
          var i = de.current;
          de.current = Sm;
          try {
            return Og(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", ne(), om();
        },
        useState: function(e) {
          V = "useState", ne();
          var t = de.current;
          de.current = Sm;
          try {
            return Ng(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", ne(), vm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", ne(), AC(e);
        },
        useTransition: function() {
          return V = "useTransition", ne(), HC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", ne(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", ne(), lm(e, t);
        },
        useId: function() {
          return V = "useId", ne(), ym();
        },
        unstable_isNewReconciler: Z
      }, Ql = {
        readContext: function(e) {
          return $g(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Ie(), Pt(), jg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Ie(), Pt(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Ie(), Pt(), cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Ie(), Pt(), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Ie(), Pt(), Ug(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Ie(), Pt(), Ag(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Ie(), Pt();
          var a = de.current;
          de.current = Ql;
          try {
            return Hg(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Ie(), Pt();
          var i = de.current;
          de.current = Ql;
          try {
            return kg(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Ie(), Pt(), zg(e);
        },
        useState: function(e) {
          V = "useState", Ie(), Pt();
          var t = de.current;
          de.current = Ql;
          try {
            return um(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Ie(), Pt(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Ie(), Pt(), Pg(e);
        },
        useTransition: function() {
          return V = "useTransition", Ie(), Pt(), Vg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Ie(), Pt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Ie(), Pt(), Lg(e, t, a);
        },
        useId: function() {
          return V = "useId", Ie(), Pt(), Bg();
        },
        unstable_isNewReconciler: Z
      }, il = {
        readContext: function(e) {
          return $g(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Ie(), ne(), hm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Ie(), ne(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Ie(), ne(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Ie(), ne(), pm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Ie(), ne(), fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Ie(), ne(), dm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Ie(), ne();
          var a = de.current;
          de.current = il;
          try {
            return mm(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Ie(), ne();
          var i = de.current;
          de.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Ie(), ne(), om();
        },
        useState: function(e) {
          V = "useState", Ie(), ne();
          var t = de.current;
          de.current = il;
          try {
            return Mg(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Ie(), ne(), vm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Ie(), ne(), UC(e);
        },
        useTransition: function() {
          return V = "useTransition", Ie(), ne(), jC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Ie(), ne(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Ie(), ne(), lm(e, t);
        },
        useId: function() {
          return V = "useId", Ie(), ne(), ym();
        },
        unstable_isNewReconciler: Z
      }, Sm = {
        readContext: function(e) {
          return $g(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Ie(), ne(), hm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Ie(), ne(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Ie(), ne(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Ie(), ne(), pm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Ie(), ne(), fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Ie(), ne(), dm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Ie(), ne();
          var a = de.current;
          de.current = il;
          try {
            return mm(e, t);
          } finally {
            de.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Ie(), ne();
          var i = de.current;
          de.current = il;
          try {
            return Og(e, t, a);
          } finally {
            de.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Ie(), ne(), om();
        },
        useState: function(e) {
          V = "useState", Ie(), ne();
          var t = de.current;
          de.current = il;
          try {
            return Ng(e);
          } finally {
            de.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Ie(), ne(), vm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Ie(), ne(), AC(e);
        },
        useTransition: function() {
          return V = "useTransition", Ie(), ne(), HC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Ie(), ne(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Ie(), ne(), lm(e, t);
        },
        useId: function() {
          return V = "useId", Ie(), ne(), ym();
        },
        unstable_isNewReconciler: Z
      };
    }
    var Fo = W.unstable_now, qC = 0, Em = -1, kp = -1, Cm = -1, Ig = !1, Rm = !1;
    function KC() {
      return Ig;
    }
    function Qw() {
      Rm = !0;
    }
    function Ww() {
      Ig = !1, Rm = !1;
    }
    function Gw() {
      Ig = Rm, Rm = !1;
    }
    function XC() {
      return qC;
    }
    function ZC() {
      qC = Fo();
    }
    function Yg(e) {
      kp = Fo(), e.actualStartTime < 0 && (e.actualStartTime = Fo());
    }
    function JC(e) {
      kp = -1;
    }
    function Tm(e, t) {
      if (kp >= 0) {
        var a = Fo() - kp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), kp = -1;
      }
    }
    function Wl(e) {
      if (Em >= 0) {
        var t = Fo() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case ht:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Qg(e) {
      if (Cm >= 0) {
        var t = Fo() - Cm;
        Cm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case ht:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gl() {
      Em = Fo();
    }
    function Wg() {
      Cm = Fo();
    }
    function Gg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ll(e, t) {
      if (e && e.defaultProps) {
        var a = et({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var qg = {}, Kg, Xg, Zg, Jg, eS, e0, wm, tS, nS, rS, Dp;
    {
      Kg = /* @__PURE__ */ new Set(), Xg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), Dp = /* @__PURE__ */ new Set();
      var t0 = /* @__PURE__ */ new Set();
      wm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          t0.has(a) || (t0.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, e0 = function(e, t) {
        if (t === void 0) {
          var a = Tt(e) || "Component";
          eS.has(a) || (eS.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(qg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(qg);
    }
    function aS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Wt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        e0(t, s);
      }
      var f = s == null ? u : et({}, u, s);
      if (e.memoizedState = f, e.lanes === $) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var iS = {
      isMounted: Lv,
      enqueueSetState: function(e, t, a) {
        var i = fo(e), u = Ea(), s = Vo(i), f = Hu(u, s);
        f.payload = t, a != null && (wm(a, "setState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Jh(p, i, s)), vs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = fo(e), u = Ea(), s = Vo(i), f = Hu(u, s);
        f.tag = gC, f.payload = t, a != null && (wm(a, "replaceState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Jh(p, i, s)), vs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = fo(e), i = Ea(), u = Vo(a), s = Hu(i, u);
        s.tag = Kh, t != null && (wm(t, "forceUpdate"), s.callback = t);
        var f = No(a, s, u);
        f !== null && (mr(f, a, u, i), Jh(f, a, u)), Mc(a, u);
      }
    };
    function n0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Wt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Tt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !ye(a, i) || !ye(u, s) : !0;
    }
    function qw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Tt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === ke && (Dp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === ke && (Dp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !nS.has(t) && (nS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Tt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Zg.has(t) && (Zg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Tt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || it(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function r0(e, t) {
      t.updater = iS, e.stateNode = t, pu(t, e), t._reactInternalInstance = qg;
    }
    function a0(e, t, a) {
      var i = !1, u = li, s = li, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === R && f._context === void 0
        );
        if (!p && !rS.has(t)) {
          rS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === pi ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Tt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = er(f);
      else {
        u = Rf(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Tf(e, u) : li;
      }
      var g = new t(a, s);
      if (e.mode & Wt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var b = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      r0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && b === null) {
          var w = Tt(t) || "Component";
          Xg.has(w) || (Xg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, U = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? U = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (U = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), M !== null || U !== null || j !== null) {
            var ue = Tt(t) || "Component", Le = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Jg.has(ue) || (Jg.add(ue), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ue, Le, M !== null ? `
  ` + M : "", U !== null ? `
  ` + U : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && WE(e, u, s), g;
    }
    function Kw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Be(e) || "Component"), iS.enqueueReplaceState(t, t.state, null));
    }
    function i0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Be(e) || "Component";
          Kg.has(s) || (Kg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        iS.enqueueReplaceState(t, t.state, null);
      }
    }
    function lS(e, t, a, i) {
      qw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, hg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = er(s);
      else {
        var f = Rf(e, t, !0);
        u.context = Tf(e, f);
      }
      {
        if (u.state === a) {
          var p = Tt(t) || "Component";
          tS.has(p) || (tS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Wt && rl.recordLegacyContextWarning(e, u), rl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (aS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Kw(e, u), em(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = St;
        y |= Qi, (e.mode & Mt) !== ke && (y |= bl), e.flags |= y;
      }
    }
    function Xw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = li;
      if (typeof p == "object" && p !== null)
        v = er(p);
      else {
        var y = Rf(e, t, !0);
        v = Tf(e, y);
      }
      var g = t.getDerivedStateFromProps, b = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !b && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && i0(e, u, a, v), EC();
      var w = e.memoizedState, M = u.state = w;
      if (em(e, a, u, i), M = e.memoizedState, s === a && w === M && !Uh() && !tm()) {
        if (typeof u.componentDidMount == "function") {
          var U = St;
          U |= Qi, (e.mode & Mt) !== ke && (U |= bl), e.flags |= U;
        }
        return !1;
      }
      typeof g == "function" && (aS(e, t, g, a), M = e.memoizedState);
      var j = tm() || n0(e, t, s, a, w, M, v);
      if (j) {
        if (!b && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var ue = St;
          ue |= Qi, (e.mode & Mt) !== ke && (ue |= bl), e.flags |= ue;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Le = St;
          Le |= Qi, (e.mode & Mt) !== ke && (Le |= bl), e.flags |= Le;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, j;
    }
    function Zw(e, t, a, i, u) {
      var s = t.stateNode;
      SC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : ll(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, b = li;
      if (typeof g == "object" && g !== null)
        b = er(g);
      else {
        var w = Rf(t, a, !0);
        b = Tf(t, w);
      }
      var M = a.getDerivedStateFromProps, U = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !U && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== b) && i0(t, s, i, b), EC();
      var j = t.memoizedState, ue = s.state = j;
      if (em(t, i, s, u), ue = t.memoizedState, f === v && j === ue && !Uh() && !tm() && !Re)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= St), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), !1;
      typeof M == "function" && (aS(t, a, M, i), ue = t.memoizedState);
      var Le = tm() || n0(t, a, p, i, j, ue, b) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Re;
      return Le ? (!U && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, ue, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, ue, b)), typeof s.componentDidUpdate == "function" && (t.flags |= St), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= In)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= St), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), t.memoizedProps = i, t.memoizedState = ue), s.props = i, s.state = ue, s.context = b, Le;
    }
    function Js(e, t) {
      return {
        value: e,
        source: t,
        stack: Pi(t),
        digest: null
      };
    }
    function uS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Jw(e, t) {
      return !0;
    }
    function oS(e, t) {
      try {
        var a = Jw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ce)
            return;
          console.error(i);
        }
        var p = u ? Be(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === ee)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Be(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var b = v + `
` + f + `

` + ("" + y);
        console.error(b);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var ex = typeof WeakMap == "function" ? WeakMap : Map;
    function l0(e, t, a) {
      var i = Hu(Kt, a);
      i.tag = pg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        Qb(u), oS(e, t);
      }, i;
    }
    function sS(e, t, a) {
      var i = Hu(Kt, a);
      i.tag = pg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          yR(e), oS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        yR(e), oS(e, t), typeof u != "function" && Ib(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (Jr(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Be(e) || "Unknown"));
      }), i;
    }
    function u0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new ex(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = Wb.bind(null, e, t, a);
        Xr && Qp(e, a), t.then(s, s);
      }
    }
    function tx(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function nx(e, t) {
      var a = e.tag;
      if ((e.mode & st) === ke && (a === oe || a === Ye || a === je)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function o0(e) {
      var t = e;
      do {
        if (t.tag === be && Aw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function s0(e, t, a, i, u) {
      if ((e.mode & st) === ke) {
        if (e === t)
          e.flags |= Kn;
        else {
          if (e.flags |= xe, a.flags |= wc, a.flags &= -52805, a.tag === ce) {
            var s = a.alternate;
            if (s === null)
              a.tag = jt;
            else {
              var f = Hu(Kt, Ae);
              f.tag = Kh, No(a, f, Ae);
            }
          }
          a.lanes = Xe(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= Kn, e.lanes = u, e;
    }
    function rx(e, t, a, i, u) {
      if (a.flags |= os, Xr && Qp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        nx(a), Ar() && a.mode & st && eC();
        var f = o0(t);
        if (f !== null) {
          f.flags &= ~Er, s0(f, t, a, e, u), f.mode & st && u0(e, s, u), tx(f, e, s);
          return;
        } else {
          if (!Hv(u)) {
            u0(e, s, u), BS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ar() && a.mode & st) {
        eC();
        var v = o0(t);
        if (v !== null) {
          (v.flags & Kn) === _e && (v.flags |= Er), s0(v, t, a, e, u), tg(Js(i, a));
          return;
        }
      }
      i = Js(i, a), Ab(i);
      var y = t;
      do {
        switch (y.tag) {
          case ee: {
            var g = i;
            y.flags |= Kn;
            var b = Ts(u);
            y.lanes = Xe(y.lanes, b);
            var w = l0(y, g, b);
            mg(y, w);
            return;
          }
          case ce:
            var M = i, U = y.type, j = y.stateNode;
            if ((y.flags & xe) === _e && (typeof U.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !oR(j))) {
              y.flags |= Kn;
              var ue = Ts(u);
              y.lanes = Xe(y.lanes, ue);
              var Le = sS(y, M, ue);
              mg(y, Le);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function ax() {
      return null;
    }
    var Op = A.ReactCurrentOwner, ul = !1, cS, Lp, fS, dS, pS, ec, vS, xm, Mp;
    cS = {}, Lp = {}, fS = {}, dS = {}, pS = {}, ec = !1, vS = {}, xm = {}, Mp = {};
    function ga(e, t, a, i) {
      e === null ? t.child = dC(t, null, a, i) : t.child = _f(t, e.child, a, i);
    }
    function ix(e, t, a, i) {
      t.child = _f(t, e.child, null, i), t.child = _f(t, null, a, i);
    }
    function c0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      Df(t, u), va(t);
      {
        if (Op.current = t, $n(!0), v = Uf(e, t, f, i, p, u), y = Af(), t.mode & Wt) {
          mn(!0);
          try {
            v = Uf(e, t, f, i, p, u), y = Af();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return ha(), e !== null && !ul ? (bC(e, t, u), Pu(e, t, u)) : (Ar() && y && qy(t), t.flags |= ti, ga(e, t, v, u), t.child);
    }
    function f0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (c_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = If(s), t.tag = je, t.type = f, yS(t, s), d0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && tl(
            p,
            i,
            // Resolved props
            "prop",
            Tt(s)
          ), a.defaultProps !== void 0) {
            var v = Tt(s) || "Unknown";
            Mp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Mp[v] = !0);
          }
        }
        var y = JS(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, b = g.propTypes;
        b && tl(
          b,
          i,
          // Resolved props
          "prop",
          Tt(g)
        );
      }
      var w = e.child, M = TS(e, u);
      if (!M) {
        var U = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : ye, j(U, i) && e.ref === t.ref)
          return Pu(e, t, u);
      }
      t.flags |= ti;
      var ue = ic(w, i);
      return ue.ref = t.ref, ue.return = t, t.child = ue, ue;
    }
    function d0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === $e) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && tl(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Tt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (ye(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ul = !1, t.pendingProps = i = g, TS(e, u))
            (e.flags & wc) !== _e && (ul = !0);
          else return t.lanes = e.lanes, Pu(e, t, u);
      }
      return hS(e, t, a, i, u);
    }
    function p0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || re)
        if ((t.mode & st) === ke) {
          var f = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, jm(t, a);
        } else if (Jr(a, Zr)) {
          var b = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = b;
          var w = s !== null ? s.baseLanes : a;
          jm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = Xe(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Zr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, jm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = Xe(s.baseLanes, a), t.memoizedState = null) : M = a, jm(t, M);
      }
      return ga(e, t, u, a), t.child;
    }
    function lx(e, t, a) {
      var i = t.pendingProps;
      return ga(e, t, i, a), t.child;
    }
    function ux(e, t, a) {
      var i = t.pendingProps.children;
      return ga(e, t, i, a), t.child;
    }
    function ox(e, t, a) {
      {
        t.flags |= St;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ga(e, t, s, a), t.child;
    }
    function v0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= vo);
    }
    function hS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f;
      {
        var p = Rf(t, a, !0);
        f = Tf(t, p);
      }
      var v, y;
      Df(t, u), va(t);
      {
        if (Op.current = t, $n(!0), v = Uf(e, t, a, i, f, u), y = Af(), t.mode & Wt) {
          mn(!0);
          try {
            v = Uf(e, t, a, i, f, u), y = Af();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return ha(), e !== null && !ul ? (bC(e, t, u), Pu(e, t, u)) : (Ar() && y && qy(t), t.flags |= ti, ga(e, t, v, u), t.child);
    }
    function h0(e, t, a, i, u) {
      {
        switch (x_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= xe, t.flags |= Kn;
            var y = new Error("Simulated error coming from DevTools"), g = Ts(u);
            t.lanes = Xe(t.lanes, g);
            var b = sS(t, Js(y, t), g);
            mg(t, b);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && tl(
            w,
            i,
            // Resolved props
            "prop",
            Tt(a)
          );
        }
      }
      var M;
      $l(a) ? (M = !0, Fh(t)) : M = !1, Df(t, u);
      var U = t.stateNode, j;
      U === null ? (_m(e, t), a0(t, a, i), lS(t, a, i, u), j = !0) : e === null ? j = Xw(t, a, i, u) : j = Zw(e, t, a, i, u);
      var ue = mS(e, t, a, j, M, u);
      {
        var Le = t.stateNode;
        j && Le.props !== i && (ec || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Be(t) || "a component"), ec = !0);
      }
      return ue;
    }
    function mS(e, t, a, i, u, s) {
      v0(e, t);
      var f = (t.flags & xe) !== _e;
      if (!i && !f)
        return u && KE(t, a, !1), Pu(e, t, s);
      var p = t.stateNode;
      Op.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, JC();
      else {
        va(t);
        {
          if ($n(!0), v = p.render(), t.mode & Wt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          $n(!1);
        }
        ha();
      }
      return t.flags |= ti, e !== null && f ? ix(e, t, v, s) : ga(e, t, v, s), t.memoizedState = p.state, u && KE(t, a, !0), t.child;
    }
    function m0(e) {
      var t = e.stateNode;
      t.pendingContext ? GE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && GE(e, t.context, !1), yg(e, t.containerInfo);
    }
    function sx(e, t, a) {
      if (m0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      SC(e, t), em(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Er) {
          var g = Js(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return y0(e, t, p, a, g);
        } else if (p !== s) {
          var b = Js(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return y0(e, t, p, a, b);
        } else {
          dw(t);
          var w = dC(t, null, p, a);
          t.child = w;
          for (var M = w; M; )
            M.flags = M.flags & ~hn | Gr, M = M.sibling;
        }
      } else {
        if (bf(), p === s)
          return Pu(e, t, a);
        ga(e, t, p, a);
      }
      return t.child;
    }
    function y0(e, t, a, i, u) {
      return bf(), tg(u), t.flags |= Er, ga(e, t, a, i), t.child;
    }
    function cx(e, t, a) {
      TC(t), e === null && eg(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Uy(i, u);
      return p ? f = null : s !== null && Uy(i, s) && (t.flags |= Da), v0(e, t), ga(e, t, f, a), t.child;
    }
    function fx(e, t) {
      return e === null && eg(t), null;
    }
    function dx(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = f_(v), g = ll(v, u), b;
      switch (y) {
        case oe:
          return yS(t, v), t.type = v = If(v), b = hS(null, t, v, g, i), b;
        case ce:
          return t.type = v = WS(v), b = h0(null, t, v, g, i), b;
        case Ye:
          return t.type = v = GS(v), b = c0(null, t, v, g, i), b;
        case ft: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && tl(
              w,
              g,
              // Resolved for outer only
              "prop",
              Tt(v)
            );
          }
          return b = f0(
            null,
            t,
            v,
            ll(v.type, g),
            // The inner type can have defaults too
            i
          ), b;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === $e && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function px(e, t, a, i, u) {
      _m(e, t), t.tag = ce;
      var s;
      return $l(a) ? (s = !0, Fh(t)) : s = !1, Df(t, u), a0(t, a, i), lS(t, a, i, u), mS(null, t, a, !0, s, u);
    }
    function vx(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s;
      {
        var f = Rf(t, a, !1);
        s = Tf(t, f);
      }
      Df(t, i);
      var p, v;
      va(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = Tt(a) || "Unknown";
          cS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), cS[y] = !0);
        }
        t.mode & Wt && rl.recordLegacyContextWarning(t, null), $n(!0), Op.current = t, p = Uf(null, t, a, u, s, i), v = Af(), $n(!1);
      }
      if (ha(), t.flags |= ti, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = Tt(a) || "Unknown";
        Lp[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), Lp[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var b = Tt(a) || "Unknown";
          Lp[b] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", b, b, b), Lp[b] = !0);
        }
        t.tag = ce, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return $l(a) ? (w = !0, Fh(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, hg(t), r0(t, p), lS(t, a, u, i), mS(null, t, a, !0, w, i);
      } else {
        if (t.tag = oe, t.mode & Wt) {
          mn(!0);
          try {
            p = Uf(null, t, a, u, s, i), v = Af();
          } finally {
            mn(!1);
          }
        }
        return Ar() && v && qy(t), ga(null, t, p, i), yS(t, a), t.child;
      }
    }
    function yS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Dr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), pS[u] || (pS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Tt(t) || "Unknown";
          Mp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Mp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Tt(t) || "Unknown";
          dS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), dS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Tt(t) || "Unknown";
          fS[v] || (S("%s: Function components do not support contextType.", v), fS[v] = !0);
        }
      }
    }
    var gS = {
      dehydrated: null,
      treeContext: null,
      retryLane: _t
    };
    function SS(e) {
      return {
        baseLanes: e,
        cachePool: ax(),
        transitions: null
      };
    }
    function hx(e, t) {
      var a = null;
      return {
        baseLanes: Xe(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function mx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Eg(e, Cp);
    }
    function yx(e, t) {
      return ws(e.childLanes, t);
    }
    function g0(e, t, a) {
      var i = t.pendingProps;
      b_(t) && (t.flags |= xe);
      var u = al.current, s = !1, f = (t.flags & xe) !== _e;
      if (f || mx(u, e) ? (s = !0, t.flags &= ~xe) : (e === null || e.memoizedState !== null) && (u = Uw(u, xC)), u = Lf(u), Uo(t, u), e === null) {
        eg(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Rx(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var b = gx(t, y, g, a), w = t.child;
          return w.memoizedState = SS(a), t.memoizedState = gS, b;
        } else
          return ES(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var U = M.dehydrated;
          if (U !== null)
            return Tx(e, t, f, i, U, M, a);
        }
        if (s) {
          var j = i.fallback, ue = i.children, Le = Ex(e, t, ue, j, a), we = t.child, Rt = e.child.memoizedState;
          return we.memoizedState = Rt === null ? SS(a) : hx(Rt, a), we.childLanes = yx(e, a), t.memoizedState = gS, Le;
        } else {
          var mt = i.children, D = Sx(e, t, mt, a);
          return t.memoizedState = null, D;
        }
      }
    }
    function ES(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = CS(u, i);
      return s.return = e, e.child = s, s;
    }
    function gx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & st) === ke && s !== null ? (p = s, p.childLanes = $, p.pendingProps = f, e.mode & Lt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = $o(a, u, i, null)) : (p = CS(f, u), v = $o(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function CS(e, t, a) {
      return SR(e, t, $, null);
    }
    function S0(e, t) {
      return ic(e, t);
    }
    function Sx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = S0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & st) === ke && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= ka) : p.push(s);
      }
      return t.child = f, f;
    }
    function Ex(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & st) === ke && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = $, y.pendingProps = v, t.mode & Lt && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = S0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var b;
      return p !== null ? b = ic(p, i) : (b = $o(i, s, u, null), b.flags |= hn), b.return = t, y.return = t, y.sibling = b, t.child = y, b;
    }
    function bm(e, t, a, i) {
      i !== null && tg(i), _f(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = ES(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function Cx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = CS(f, s), v = $o(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & st) !== ke && _f(t, e.child, null, u), v;
    }
    function Rx(e, t, a) {
      return (e.mode & st) === ke ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : Hy(t) ? e.lanes = Cr : e.lanes = Zr, null;
    }
    function Tx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Er) {
          t.flags &= ~Er;
          var D = uS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return bm(e, t, f, D);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= xe, null;
          var H = i.children, O = i.fallback, q = Cx(e, t, H, O, f), pe = t.child;
          return pe.memoizedState = SS(f), t.memoizedState = gS, q;
        }
      else {
        if (cw(), (t.mode & st) === ke)
          return bm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Hy(u)) {
          var p, v, y;
          {
            var g = _1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var b;
          v ? b = new Error(v) : b = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = uS(b, p, y);
          return bm(e, t, f, w);
        }
        var M = Jr(f, e.childLanes);
        if (ul || M) {
          var U = Fm();
          if (U !== null) {
            var j = Ud(U, f);
            if (j !== _t && j !== s.retryLane) {
              s.retryLane = j;
              var ue = Kt;
              ja(e, j), mr(U, e, j, ue);
            }
          }
          BS();
          var Le = uS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return bm(e, t, f, Le);
        } else if (BE(u)) {
          t.flags |= xe, t.child = e.child;
          var we = Gb.bind(null, e);
          return k1(u, we), null;
        } else {
          pw(t, u, s.treeContext);
          var Rt = i.children, mt = ES(t, Rt);
          return mt.flags |= Gr, mt;
        }
      }
    }
    function E0(e, t, a) {
      e.lanes = Xe(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Xe(i.lanes, t)), fg(e.return, t, a);
    }
    function wx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === be) {
          var u = i.memoizedState;
          u !== null && E0(i, a, e);
        } else if (i.tag === an)
          E0(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function xx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && am(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function bx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !vS[e])
        if (vS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function _x(e, t) {
      e !== void 0 && !xm[e] && (e !== "collapsed" && e !== "hidden" ? (xm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (xm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function C0(e, t) {
      {
        var a = it(e), i = !a && typeof Ge(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function kx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (it(e)) {
          for (var a = 0; a < e.length; a++)
            if (!C0(e[a], a))
              return;
        } else {
          var i = Ge(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!C0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function RS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function R0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      bx(u), _x(s, u), kx(f, u), ga(e, t, f, a);
      var p = al.current, v = Eg(p, Cp);
      if (v)
        p = Cg(p, Cp), t.flags |= xe;
      else {
        var y = e !== null && (e.flags & xe) !== _e;
        y && wx(t, t.child, a), p = Lf(p);
      }
      if (Uo(t, p), (t.mode & st) === ke)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = xx(t.child), b;
            g === null ? (b = t.child, t.child = null) : (b = g.sibling, g.sibling = null), RS(
              t,
              !1,
              // isBackwards
              b,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var U = M.alternate;
              if (U !== null && am(U) === null) {
                t.child = M;
                break;
              }
              var j = M.sibling;
              M.sibling = w, w = M, M = j;
            }
            RS(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            RS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Dx(e, t, a) {
      yg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = _f(t, null, i, a) : ga(e, t, i, a), t.child;
    }
    var T0 = !1;
    function Ox(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || T0 || (T0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && tl(v, s, "prop", "Context.Provider");
      }
      if (hC(t, u, p), f !== null) {
        var y = f.value;
        if (Q(y, p)) {
          if (f.children === s.children && !Uh())
            return Pu(e, t, a);
        } else
          bw(t, u, a);
      }
      var g = s.children;
      return ga(e, t, g, a), t.child;
    }
    var w0 = !1;
    function Lx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (w0 || (w0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Df(t, a);
      var f = er(i);
      va(t);
      var p;
      return Op.current = t, $n(!0), p = s(f), $n(!1), ha(), t.flags |= ti, ga(e, t, p, a), t.child;
    }
    function Np() {
      ul = !0;
    }
    function _m(e, t) {
      (t.mode & st) === ke && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Pu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), JC(), Yp(t.lanes), Jr(a, t.childLanes) ? (ww(e, t), t.child) : null;
    }
    function Mx(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ka) : s.push(e), a.flags |= hn, a;
      }
    }
    function TS(e, t) {
      var a = e.lanes;
      return !!Jr(a, t);
    }
    function Nx(e, t, a) {
      switch (t.tag) {
        case ee:
          m0(t), t.stateNode, bf();
          break;
        case X:
          TC(t);
          break;
        case ce: {
          var i = t.type;
          $l(i) && Fh(t);
          break;
        }
        case Se:
          yg(t, t.stateNode.containerInfo);
          break;
        case vt: {
          var u = t.memoizedProps.value, s = t.type._context;
          hC(t, s, u);
          break;
        }
        case ht:
          {
            var f = Jr(a, t.childLanes);
            f && (t.flags |= St);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case be: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Uo(t, Lf(al.current)), t.flags |= xe, null;
            var y = t.child, g = y.childLanes;
            if (Jr(a, g))
              return g0(e, t, a);
            Uo(t, Lf(al.current));
            var b = Pu(e, t, a);
            return b !== null ? b.sibling : null;
          } else
            Uo(t, Lf(al.current));
          break;
        }
        case an: {
          var w = (e.flags & xe) !== _e, M = Jr(a, t.childLanes);
          if (w) {
            if (M)
              return R0(e, t, a);
            t.flags |= xe;
          }
          var U = t.memoizedState;
          if (U !== null && (U.rendering = null, U.tail = null, U.lastEffect = null), Uo(t, al.current), M)
            break;
          return null;
        }
        case De:
        case At:
          return t.lanes = $, p0(e, t, a);
      }
      return Pu(e, t, a);
    }
    function x0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Mx(e, t, JS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Uh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ul = !0;
        else {
          var s = TS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & xe) === _e)
            return ul = !1, Nx(e, t, a);
          (e.flags & wc) !== _e ? ul = !0 : ul = !1;
        }
      } else if (ul = !1, Ar() && aw(t)) {
        var f = t.index, p = iw();
        JE(t, p, f);
      }
      switch (t.lanes = $, t.tag) {
        case Ze:
          return vx(e, t, t.type, a);
        case rn: {
          var v = t.elementType;
          return dx(e, t, v, a);
        }
        case oe: {
          var y = t.type, g = t.pendingProps, b = t.elementType === y ? g : ll(y, g);
          return hS(e, t, y, b, a);
        }
        case ce: {
          var w = t.type, M = t.pendingProps, U = t.elementType === w ? M : ll(w, M);
          return h0(e, t, w, U, a);
        }
        case ee:
          return sx(e, t, a);
        case X:
          return cx(e, t, a);
        case Fe:
          return fx(e, t);
        case be:
          return g0(e, t, a);
        case Se:
          return Dx(e, t, a);
        case Ye: {
          var j = t.type, ue = t.pendingProps, Le = t.elementType === j ? ue : ll(j, ue);
          return c0(e, t, j, Le, a);
        }
        case Ke:
          return lx(e, t, a);
        case tt:
          return ux(e, t, a);
        case ht:
          return ox(e, t, a);
        case vt:
          return Ox(e, t, a);
        case cn:
          return Lx(e, t, a);
        case ft: {
          var we = t.type, Rt = t.pendingProps, mt = ll(we, Rt);
          if (t.type !== t.elementType) {
            var D = we.propTypes;
            D && tl(
              D,
              mt,
              // Resolved for outer only
              "prop",
              Tt(we)
            );
          }
          return mt = ll(we.type, mt), f0(e, t, we, mt, a);
        }
        case je:
          return d0(e, t, t.type, t.pendingProps, a);
        case jt: {
          var H = t.type, O = t.pendingProps, q = t.elementType === H ? O : ll(H, O);
          return px(e, t, H, q, a);
        }
        case an:
          return R0(e, t, a);
        case xt:
          break;
        case De:
          return p0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ff(e) {
      e.flags |= St;
    }
    function b0(e) {
      e.flags |= Sn, e.flags |= vo;
    }
    var _0, wS, k0, D0;
    _0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === X || u.tag === Fe)
          t1(e, u.stateNode);
        else if (u.tag !== Se) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, wS = function(e, t) {
    }, k0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = gg(), v = r1(f, a, s, i, u, p);
        t.updateQueue = v, v && Ff(t);
      }
    }, D0 = function(e, t, a, i) {
      a !== i && Ff(t);
    };
    function zp(e, t) {
      if (!Ar())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function jr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = $, i = _e;
      if (t) {
        if ((e.mode & Lt) !== ke) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = Xe(a, Xe(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = Xe(a, Xe(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Lt) !== ke) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Xe(a, Xe(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Xe(a, Xe(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function zx(e, t, a) {
      if (gw() && (t.mode & st) !== ke && (t.flags & xe) === _e)
        return lC(t), bf(), t.flags |= Er | os | Kn, !1;
      var i = Bh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (mw(t), jr(t), (t.mode & Lt) !== ke) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (bf(), (t.flags & xe) === _e && (t.memoizedState = null), t.flags |= St, jr(t), (t.mode & Lt) !== ke) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return uC(), !0;
    }
    function O0(e, t, a) {
      var i = t.pendingProps;
      switch (Ky(t), t.tag) {
        case Ze:
        case rn:
        case je:
        case oe:
        case Ye:
        case Ke:
        case tt:
        case ht:
        case cn:
        case ft:
          return jr(t), null;
        case ce: {
          var u = t.type;
          return $l(u) && Ah(t), jr(t), null;
        }
        case ee: {
          var s = t.stateNode;
          if (Of(t), Qy(t), Tg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Bh(t);
            if (f)
              Ff(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Er) !== _e) && (t.flags |= In, uC());
            }
          }
          return wS(e, t), jr(t), null;
        }
        case X: {
          Sg(t);
          var v = RC(), y = t.type;
          if (e !== null && t.stateNode != null)
            k0(e, t, y, i, v), e.ref !== t.ref && b0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return jr(t), null;
            }
            var g = gg(), b = Bh(t);
            if (b)
              vw(t, v, g) && Ff(t);
            else {
              var w = e1(y, i, v, g, t);
              _0(w, t, !1, !1), t.stateNode = w, n1(w, y, i, v) && Ff(t);
            }
            t.ref !== null && b0(t);
          }
          return jr(t), null;
        }
        case Fe: {
          var M = i;
          if (e && t.stateNode != null) {
            var U = e.memoizedProps;
            D0(e, t, U, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = RC(), ue = gg(), Le = Bh(t);
            Le ? hw(t) && Ff(t) : t.stateNode = a1(M, j, ue, t);
          }
          return jr(t), null;
        }
        case be: {
          Mf(t);
          var we = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Rt = zx(e, t, we);
            if (!Rt)
              return t.flags & Kn ? t : null;
          }
          if ((t.flags & xe) !== _e)
            return t.lanes = a, (t.mode & Lt) !== ke && Gg(t), t;
          var mt = we !== null, D = e !== null && e.memoizedState !== null;
          if (mt !== D && mt) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & st) !== ke) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || Eg(al.current, xC) ? Ub() : BS();
            }
          }
          var q = t.updateQueue;
          if (q !== null && (t.flags |= St), jr(t), (t.mode & Lt) !== ke && mt) {
            var pe = t.child;
            pe !== null && (t.treeBaseDuration -= pe.treeBaseDuration);
          }
          return null;
        }
        case Se:
          return Of(t), wS(e, t), e === null && X1(t.stateNode.containerInfo), jr(t), null;
        case vt:
          var se = t.type._context;
          return cg(se, t), jr(t), null;
        case jt: {
          var Pe = t.type;
          return $l(Pe) && Ah(t), jr(t), null;
        }
        case an: {
          Mf(t);
          var Qe = t.memoizedState;
          if (Qe === null)
            return jr(t), null;
          var qt = (t.flags & xe) !== _e, zt = Qe.rendering;
          if (zt === null)
            if (qt)
              zp(Qe, !1);
            else {
              var Wn = Fb() && (e === null || (e.flags & xe) === _e);
              if (!Wn)
                for (var Ut = t.child; Ut !== null; ) {
                  var Hn = am(Ut);
                  if (Hn !== null) {
                    qt = !0, t.flags |= xe, zp(Qe, !1);
                    var la = Hn.updateQueue;
                    return la !== null && (t.updateQueue = la, t.flags |= St), t.subtreeFlags = _e, xw(t, a), Uo(t, Cg(al.current, Cp)), t.child;
                  }
                  Ut = Ut.sibling;
                }
              Qe.tail !== null && Yn() > X0() && (t.flags |= xe, qt = !0, zp(Qe, !1), t.lanes = bd);
            }
          else {
            if (!qt) {
              var $r = am(zt);
              if ($r !== null) {
                t.flags |= xe, qt = !0;
                var oi = $r.updateQueue;
                if (oi !== null && (t.updateQueue = oi, t.flags |= St), zp(Qe, !0), Qe.tail === null && Qe.tailMode === "hidden" && !zt.alternate && !Ar())
                  return jr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Yn() * 2 - Qe.renderingStartTime > X0() && a !== Zr && (t.flags |= xe, qt = !0, zp(Qe, !1), t.lanes = bd);
            }
            if (Qe.isBackwards)
              zt.sibling = t.child, t.child = zt;
            else {
              var Ca = Qe.last;
              Ca !== null ? Ca.sibling = zt : t.child = zt, Qe.last = zt;
            }
          }
          if (Qe.tail !== null) {
            var Ra = Qe.tail;
            Qe.rendering = Ra, Qe.tail = Ra.sibling, Qe.renderingStartTime = Yn(), Ra.sibling = null;
            var ua = al.current;
            return qt ? ua = Cg(ua, Cp) : ua = Lf(ua), Uo(t, ua), Ra;
          }
          return jr(t), null;
        }
        case xt:
          break;
        case De:
        case At: {
          VS(t);
          var Yu = t.memoizedState, Yf = Yu !== null;
          if (e !== null) {
            var Kp = e.memoizedState, Xl = Kp !== null;
            Xl !== Yf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !re && (t.flags |= Mn);
          }
          return !Yf || (t.mode & st) === ke ? jr(t) : Jr(Kl, Zr) && (jr(t), t.subtreeFlags & (hn | St) && (t.flags |= Mn)), null;
        }
        case bt:
          return null;
        case Dt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ux(e, t, a) {
      switch (Ky(t), t.tag) {
        case ce: {
          var i = t.type;
          $l(i) && Ah(t);
          var u = t.flags;
          return u & Kn ? (t.flags = u & ~Kn | xe, (t.mode & Lt) !== ke && Gg(t), t) : null;
        }
        case ee: {
          t.stateNode, Of(t), Qy(t), Tg();
          var s = t.flags;
          return (s & Kn) !== _e && (s & xe) === _e ? (t.flags = s & ~Kn | xe, t) : null;
        }
        case X:
          return Sg(t), null;
        case be: {
          Mf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            bf();
          }
          var p = t.flags;
          return p & Kn ? (t.flags = p & ~Kn | xe, (t.mode & Lt) !== ke && Gg(t), t) : null;
        }
        case an:
          return Mf(t), null;
        case Se:
          return Of(t), null;
        case vt:
          var v = t.type._context;
          return cg(v, t), null;
        case De:
        case At:
          return VS(t), null;
        case bt:
          return null;
        default:
          return null;
      }
    }
    function L0(e, t, a) {
      switch (Ky(t), t.tag) {
        case ce: {
          var i = t.type.childContextTypes;
          i != null && Ah(t);
          break;
        }
        case ee: {
          t.stateNode, Of(t), Qy(t), Tg();
          break;
        }
        case X: {
          Sg(t);
          break;
        }
        case Se:
          Of(t);
          break;
        case be:
          Mf(t);
          break;
        case an:
          Mf(t);
          break;
        case vt:
          var u = t.type._context;
          cg(u, t);
          break;
        case De:
        case At:
          VS(t);
          break;
      }
    }
    var M0 = null;
    M0 = /* @__PURE__ */ new Set();
    var km = !1, Hr = !1, Ax = typeof WeakSet == "function" ? WeakSet : Set, ge = null, jf = null, Hf = null;
    function Fx(e) {
      xl(null, function() {
        throw e;
      }), us();
    }
    var jx = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Lt)
        try {
          Gl(), t.componentWillUnmount();
        } finally {
          Wl(e);
        }
      else
        t.componentWillUnmount();
    };
    function N0(e, t) {
      try {
        jo(cr, e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function xS(e, t, a) {
      try {
        jx(e, a);
      } catch (i) {
        sn(e, t, i);
      }
    }
    function Hx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        sn(e, t, i);
      }
    }
    function z0(e, t) {
      try {
        A0(e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function Pf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ue && lt && e.mode & Lt)
              try {
                Gl(), i = a(null);
              } finally {
                Wl(e);
              }
            else
              i = a(null);
          } catch (u) {
            sn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Be(e));
        } else
          a.current = null;
    }
    function Dm(e, t, a) {
      try {
        a();
      } catch (i) {
        sn(e, t, i);
      }
    }
    var U0 = !1;
    function Px(e, t) {
      ZT(e.containerInfo), ge = t, Vx();
      var a = U0;
      return U0 = !1, a;
    }
    function Vx() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        (e.subtreeFlags & _l) !== _e && t !== null ? (t.return = e, ge = t) : Bx();
      }
    }
    function Bx() {
      for (; ge !== null; ) {
        var e = ge;
        It(e);
        try {
          $x(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        on();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function $x(e) {
      var t = e.alternate, a = e.flags;
      if ((a & In) !== _e) {
        switch (It(e), e.tag) {
          case oe:
          case Ye:
          case je:
            break;
          case ce: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !ec && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Be(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Be(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ll(e.type, i), u);
              {
                var p = M0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Be(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case ee: {
            {
              var v = e.stateNode;
              T1(v.containerInfo);
            }
            break;
          }
          case X:
          case Fe:
          case Se:
          case jt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        on();
      }
    }
    function ol(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Fr) !== Ha ? qi(t) : (e & cr) !== Ha && cs(t), (e & Il) !== Ha && Wp(!0), Dm(t, a, p), (e & Il) !== Ha && Wp(!1), (e & Fr) !== Ha ? Ll() : (e & cr) !== Ha && wd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function jo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Fr) !== Ha ? Td(t) : (e & cr) !== Ha && Oc(t);
            var f = s.create;
            (e & Il) !== Ha && Wp(!0), s.destroy = f(), (e & Il) !== Ha && Wp(!1), (e & Fr) !== Ha ? zv() : (e & cr) !== Ha && Uv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & cr) !== _e ? v = "useLayoutEffect" : (s.tag & Il) !== _e ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Ix(e, t) {
      if ((t.flags & St) !== _e)
        switch (t.tag) {
          case ht: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = XC(), p = t.alternate === null ? "mount" : "update";
            KC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case ee:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case ht:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Yx(e, t, a, i) {
      if ((a.flags & Dl) !== _e)
        switch (a.tag) {
          case oe:
          case Ye:
          case je: {
            if (!Hr)
              if (a.mode & Lt)
                try {
                  Gl(), jo(cr | sr, a);
                } finally {
                  Wl(a);
                }
              else
                jo(cr | sr, a);
            break;
          }
          case ce: {
            var u = a.stateNode;
            if (a.flags & St && !Hr)
              if (t === null)
                if (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Be(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Be(a) || "instance")), a.mode & Lt)
                  try {
                    Gl(), u.componentDidMount();
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ll(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Be(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Be(a) || "instance")), a.mode & Lt)
                  try {
                    Gl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Be(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Be(a) || "instance")), CC(a, p, u));
            break;
          }
          case ee: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case X:
                    y = a.child.stateNode;
                    break;
                  case ce:
                    y = a.child.stateNode;
                    break;
                }
              CC(a, v, y);
            }
            break;
          }
          case X: {
            var g = a.stateNode;
            if (t === null && a.flags & St) {
              var b = a.type, w = a.memoizedProps;
              s1(g, b, w);
            }
            break;
          }
          case Fe:
            break;
          case Se:
            break;
          case ht: {
            {
              var M = a.memoizedProps, U = M.onCommit, j = M.onRender, ue = a.stateNode.effectDuration, Le = XC(), we = t === null ? "mount" : "update";
              KC() && (we = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, we, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Le);
              {
                typeof U == "function" && U(a.memoizedProps.id, we, ue, Le), Bb(a);
                var Rt = a.return;
                e: for (; Rt !== null; ) {
                  switch (Rt.tag) {
                    case ee:
                      var mt = Rt.stateNode;
                      mt.effectDuration += ue;
                      break e;
                    case ht:
                      var D = Rt.stateNode;
                      D.effectDuration += ue;
                      break e;
                  }
                  Rt = Rt.return;
                }
              }
            }
            break;
          }
          case be: {
            Jx(e, a);
            break;
          }
          case an:
          case jt:
          case xt:
          case De:
          case At:
          case Dt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Hr || a.flags & Sn && A0(a);
    }
    function Qx(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          if (e.mode & Lt)
            try {
              Gl(), N0(e, e.return);
            } finally {
              Wl(e);
            }
          else
            N0(e, e.return);
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Hx(e, e.return, t), z0(e, e.return);
          break;
        }
        case X: {
          z0(e, e.return);
          break;
        }
      }
    }
    function Wx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === X) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? S1(u) : C1(i.stateNode, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
          }
        } else if (i.tag === Fe) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? E1(s) : R1(s, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
        } else if (!((i.tag === De || i.tag === At) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function A0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case X:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Lt)
            try {
              Gl(), u = t(i);
            } finally {
              Wl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Be(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Be(e)), t.current = i;
      }
    }
    function Gx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function F0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, F0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === X) {
          var a = e.stateNode;
          a !== null && ew(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function qx(e) {
      for (var t = e.return; t !== null; ) {
        if (j0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function j0(e) {
      return e.tag === X || e.tag === ee || e.tag === Se;
    }
    function H0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || j0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== X && t.tag !== Fe && t.tag !== Xt; ) {
          if (t.flags & hn || t.child === null || t.tag === Se)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Kx(e) {
      var t = qx(e);
      switch (t.tag) {
        case X: {
          var a = t.stateNode;
          t.flags & Da && (VE(a), t.flags &= ~Da);
          var i = H0(e);
          _S(e, i, a);
          break;
        }
        case ee:
        case Se: {
          var u = t.stateNode.containerInfo, s = H0(e);
          bS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function bS(e, t, a) {
      var i = e.tag, u = i === X || i === Fe;
      if (u) {
        var s = e.stateNode;
        t ? h1(a, s, t) : p1(a, s);
      } else if (i !== Se) {
        var f = e.child;
        if (f !== null) {
          bS(f, t, a);
          for (var p = f.sibling; p !== null; )
            bS(p, t, a), p = p.sibling;
        }
      }
    }
    function _S(e, t, a) {
      var i = e.tag, u = i === X || i === Fe;
      if (u) {
        var s = e.stateNode;
        t ? v1(a, s, t) : d1(a, s);
      } else if (i !== Se) {
        var f = e.child;
        if (f !== null) {
          _S(f, t, a);
          for (var p = f.sibling; p !== null; )
            _S(p, t, a), p = p.sibling;
        }
      }
    }
    var Pr = null, sl = !1;
    function Xx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case X: {
              Pr = i.stateNode, sl = !1;
              break e;
            }
            case ee: {
              Pr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
            case Se: {
              Pr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Pr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        P0(e, t, a), Pr = null, sl = !1;
      }
      Gx(a);
    }
    function Ho(e, t, a) {
      for (var i = a.child; i !== null; )
        P0(e, t, i), i = i.sibling;
    }
    function P0(e, t, a) {
      switch (Ed(a), a.tag) {
        case X:
          Hr || Pf(a, t);
        case Fe: {
          {
            var i = Pr, u = sl;
            Pr = null, Ho(e, t, a), Pr = i, sl = u, Pr !== null && (sl ? y1(Pr, a.stateNode) : m1(Pr, a.stateNode));
          }
          return;
        }
        case Xt: {
          Pr !== null && (sl ? g1(Pr, a.stateNode) : jy(Pr, a.stateNode));
          return;
        }
        case Se: {
          {
            var s = Pr, f = sl;
            Pr = a.stateNode.containerInfo, sl = !0, Ho(e, t, a), Pr = s, sl = f;
          }
          return;
        }
        case oe:
        case Ye:
        case ft:
        case je: {
          if (!Hr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var b = g, w = b.destroy, M = b.tag;
                  w !== void 0 && ((M & Il) !== Ha ? Dm(a, t, w) : (M & cr) !== Ha && (cs(a), a.mode & Lt ? (Gl(), Dm(a, t, w), Wl(a)) : Dm(a, t, w), wd())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Ho(e, t, a);
          return;
        }
        case ce: {
          if (!Hr) {
            Pf(a, t);
            var U = a.stateNode;
            typeof U.componentWillUnmount == "function" && xS(a, t, U);
          }
          Ho(e, t, a);
          return;
        }
        case xt: {
          Ho(e, t, a);
          return;
        }
        case De: {
          if (
            // TODO: Remove this dead flag
            a.mode & st
          ) {
            var j = Hr;
            Hr = j || a.memoizedState !== null, Ho(e, t, a), Hr = j;
          } else
            Ho(e, t, a);
          break;
        }
        default: {
          Ho(e, t, a);
          return;
        }
      }
    }
    function Zx(e) {
      e.memoizedState;
    }
    function Jx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && F1(s);
          }
        }
      }
    }
    function V0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Ax()), t.forEach(function(i) {
          var u = qb.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Xr)
              if (jf !== null && Hf !== null)
                Qp(Hf, jf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function eb(e, t, a) {
      jf = a, Hf = e, It(t), B0(t, e), It(t), jf = null, Hf = null;
    }
    function cl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Xx(e, t, s);
          } catch (v) {
            sn(s, t, v);
          }
        }
      var f = gl();
      if (t.subtreeFlags & kl)
        for (var p = t.child; p !== null; )
          It(p), B0(p, e), p = p.sibling;
      It(f);
    }
    function B0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case oe:
        case Ye:
        case ft:
        case je: {
          if (cl(t, e), ql(e), u & St) {
            try {
              ol(Il | sr, e, e.return), jo(Il | sr, e);
            } catch (Pe) {
              sn(e, e.return, Pe);
            }
            if (e.mode & Lt) {
              try {
                Gl(), ol(cr | sr, e, e.return);
              } catch (Pe) {
                sn(e, e.return, Pe);
              }
              Wl(e);
            } else
              try {
                ol(cr | sr, e, e.return);
              } catch (Pe) {
                sn(e, e.return, Pe);
              }
          }
          return;
        }
        case ce: {
          cl(t, e), ql(e), u & Sn && i !== null && Pf(i, i.return);
          return;
        }
        case X: {
          cl(t, e), ql(e), u & Sn && i !== null && Pf(i, i.return);
          {
            if (e.flags & Da) {
              var s = e.stateNode;
              try {
                VE(s);
              } catch (Pe) {
                sn(e, e.return, Pe);
              }
            }
            if (u & St) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    c1(f, g, y, v, p, e);
                  } catch (Pe) {
                    sn(e, e.return, Pe);
                  }
              }
            }
          }
          return;
        }
        case Fe: {
          if (cl(t, e), ql(e), u & St) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var b = e.stateNode, w = e.memoizedProps, M = i !== null ? i.memoizedProps : w;
            try {
              f1(b, M, w);
            } catch (Pe) {
              sn(e, e.return, Pe);
            }
          }
          return;
        }
        case ee: {
          if (cl(t, e), ql(e), u & St && i !== null) {
            var U = i.memoizedState;
            if (U.isDehydrated)
              try {
                A1(t.containerInfo);
              } catch (Pe) {
                sn(e, e.return, Pe);
              }
          }
          return;
        }
        case Se: {
          cl(t, e), ql(e);
          return;
        }
        case be: {
          cl(t, e), ql(e);
          var j = e.child;
          if (j.flags & Mn) {
            var ue = j.stateNode, Le = j.memoizedState, we = Le !== null;
            if (ue.isHidden = we, we) {
              var Rt = j.alternate !== null && j.alternate.memoizedState !== null;
              Rt || zb();
            }
          }
          if (u & St) {
            try {
              Zx(e);
            } catch (Pe) {
              sn(e, e.return, Pe);
            }
            V0(e);
          }
          return;
        }
        case De: {
          var mt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & st
          ) {
            var D = Hr;
            Hr = D || mt, cl(t, e), Hr = D;
          } else
            cl(t, e);
          if (ql(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, q = O !== null, pe = e;
            if (H.isHidden = q, q && !mt && (pe.mode & st) !== ke) {
              ge = pe;
              for (var se = pe.child; se !== null; )
                ge = se, nb(se), se = se.sibling;
            }
            Wx(pe, q);
          }
          return;
        }
        case an: {
          cl(t, e), ql(e), u & St && V0(e);
          return;
        }
        case xt:
          return;
        default: {
          cl(t, e), ql(e);
          return;
        }
      }
    }
    function ql(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Kx(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Gr && (e.flags &= ~Gr);
    }
    function tb(e, t, a) {
      jf = a, Hf = t, ge = e, $0(e, t, a), jf = null, Hf = null;
    }
    function $0(e, t, a) {
      for (var i = (e.mode & st) !== ke; ge !== null; ) {
        var u = ge, s = u.child;
        if (u.tag === De && i) {
          var f = u.memoizedState !== null, p = f || km;
          if (p) {
            kS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || Hr, b = km, w = Hr;
            km = p, Hr = g, Hr && !w && (ge = u, rb(u));
            for (var M = s; M !== null; )
              ge = M, $0(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            ge = u, km = b, Hr = w, kS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Dl) !== _e && s !== null ? (s.return = u, ge = s) : kS(e, t, a);
      }
    }
    function kS(e, t, a) {
      for (; ge !== null; ) {
        var i = ge;
        if ((i.flags & Dl) !== _e) {
          var u = i.alternate;
          It(i);
          try {
            Yx(t, u, i, a);
          } catch (f) {
            sn(i, i.return, f);
          }
          on();
        }
        if (i === e) {
          ge = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ge = s;
          return;
        }
        ge = i.return;
      }
    }
    function nb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        switch (t.tag) {
          case oe:
          case Ye:
          case ft:
          case je: {
            if (t.mode & Lt)
              try {
                Gl(), ol(cr, t, t.return);
              } finally {
                Wl(t);
              }
            else
              ol(cr, t, t.return);
            break;
          }
          case ce: {
            Pf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && xS(t, t.return, i);
            break;
          }
          case X: {
            Pf(t, t.return);
            break;
          }
          case De: {
            var u = t.memoizedState !== null;
            if (u) {
              I0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ge = a) : I0(e);
      }
    }
    function I0(e) {
      for (; ge !== null; ) {
        var t = ge;
        if (t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function rb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        if (t.tag === De) {
          var i = t.memoizedState !== null;
          if (i) {
            Y0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ge = a) : Y0(e);
      }
    }
    function Y0(e) {
      for (; ge !== null; ) {
        var t = ge;
        It(t);
        try {
          Qx(t);
        } catch (i) {
          sn(t, t.return, i);
        }
        if (on(), t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function ab(e, t, a, i) {
      ge = t, ib(t, e, a, i);
    }
    function ib(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge, s = u.child;
        (u.subtreeFlags & Wi) !== _e && s !== null ? (s.return = u, ge = s) : lb(e, t, a, i);
      }
    }
    function lb(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge;
        if ((u.flags & Wr) !== _e) {
          It(u);
          try {
            ub(t, u, a, i);
          } catch (f) {
            sn(u, u.return, f);
          }
          on();
        }
        if (u === e) {
          ge = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, ge = s;
          return;
        }
        ge = u.return;
      }
    }
    function ub(e, t, a, i) {
      switch (t.tag) {
        case oe:
        case Ye:
        case je: {
          if (t.mode & Lt) {
            Wg();
            try {
              jo(Fr | sr, t);
            } finally {
              Qg(t);
            }
          } else
            jo(Fr | sr, t);
          break;
        }
      }
    }
    function ob(e) {
      ge = e, sb();
    }
    function sb() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        if ((ge.flags & ka) !== _e) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              ge = u, db(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            ge = e;
          }
        }
        (e.subtreeFlags & Wi) !== _e && t !== null ? (t.return = e, ge = t) : cb();
      }
    }
    function cb() {
      for (; ge !== null; ) {
        var e = ge;
        (e.flags & Wr) !== _e && (It(e), fb(e), on());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function fb(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          e.mode & Lt ? (Wg(), ol(Fr | sr, e, e.return), Qg(e)) : ol(Fr | sr, e, e.return);
          break;
        }
      }
    }
    function db(e, t) {
      for (; ge !== null; ) {
        var a = ge;
        It(a), vb(a, t), on();
        var i = a.child;
        i !== null ? (i.return = a, ge = i) : pb(e);
      }
    }
    function pb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.sibling, i = t.return;
        if (F0(t), t === e) {
          ge = null;
          return;
        }
        if (a !== null) {
          a.return = i, ge = a;
          return;
        }
        ge = i;
      }
    }
    function vb(e, t) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          e.mode & Lt ? (Wg(), ol(Fr, e, t), Qg(e)) : ol(Fr, e, t);
          break;
        }
      }
    }
    function hb(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          try {
            jo(cr | sr, e);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ce: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
      }
    }
    function mb(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          try {
            jo(Fr | sr, e);
          } catch (t) {
            sn(e, e.return, t);
          }
          break;
        }
      }
    }
    function yb(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je: {
          try {
            ol(cr | sr, e, e.return);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && xS(e, e.return, t);
          break;
        }
      }
    }
    function gb(e) {
      switch (e.tag) {
        case oe:
        case Ye:
        case je:
          try {
            ol(Fr | sr, e, e.return);
          } catch (t) {
            sn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Up = Symbol.for;
      Up("selector.component"), Up("selector.has_pseudo_class"), Up("selector.role"), Up("selector.test_id"), Up("selector.text");
    }
    var Sb = [];
    function Eb() {
      Sb.forEach(function(e) {
        return e();
      });
    }
    var Cb = A.ReactCurrentActQueue;
    function Rb(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Q0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Cb.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Tb = Math.ceil, DS = A.ReactCurrentDispatcher, OS = A.ReactCurrentOwner, Vr = A.ReactCurrentBatchConfig, fl = A.ReactCurrentActQueue, pr = (
      /*             */
      0
    ), W0 = (
      /*               */
      1
    ), Br = (
      /*                */
      2
    ), Ai = (
      /*                */
      4
    ), Vu = 0, Ap = 1, tc = 2, Om = 3, Fp = 4, G0 = 5, LS = 6, Ct = pr, Sa = null, kn = null, vr = $, Kl = $, MS = Do($), hr = Vu, jp = null, Lm = $, Hp = $, Mm = $, Pp = null, Pa = null, NS = 0, q0 = 500, K0 = 1 / 0, wb = 500, Bu = null;
    function Vp() {
      K0 = Yn() + wb;
    }
    function X0() {
      return K0;
    }
    var Nm = !1, zS = null, Vf = null, nc = !1, Po = null, Bp = $, US = [], AS = null, xb = 50, $p = 0, FS = null, jS = !1, zm = !1, bb = 50, Bf = 0, Um = null, Ip = Kt, Am = $, Z0 = !1;
    function Fm() {
      return Sa;
    }
    function Ea() {
      return (Ct & (Br | Ai)) !== pr ? Yn() : (Ip !== Kt || (Ip = Yn()), Ip);
    }
    function Vo(e) {
      var t = e.mode;
      if ((t & st) === ke)
        return Ae;
      if ((Ct & Br) !== pr && vr !== $)
        return Ts(vr);
      var a = Cw() !== Ew;
      if (a) {
        if (Vr.transition !== null) {
          var i = Vr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Am === _t && (Am = Md()), Am;
      }
      var u = Ua();
      if (u !== _t)
        return u;
      var s = i1();
      return s;
    }
    function _b(e) {
      var t = e.mode;
      return (t & st) === ke ? Ae : Vv();
    }
    function mr(e, t, a, i) {
      Xb(), Z0 && S("useInsertionEffect must not schedule updates."), jS && (zm = !0), go(e, a, i), (Ct & Br) !== $ && e === Sa ? e_(t) : (Xr && bs(e, t, a), t_(t), e === Sa && ((Ct & Br) === pr && (Hp = Xe(Hp, a)), hr === Fp && Bo(e, vr)), Va(e, i), a === Ae && Ct === pr && (t.mode & st) === ke && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !fl.isBatchingLegacy && (Vp(), ZE()));
    }
    function kb(e, t, a) {
      var i = e.current;
      i.lanes = t, go(e, t, a), Va(e, a);
    }
    function Db(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Ct & Br) !== pr
      );
    }
    function Va(e, t) {
      var a = e.callbackNode;
      Kc(e, t);
      var i = qc(e, e === Sa ? vr : $);
      if (i === $) {
        a !== null && vR(a), e.callbackNode = null, e.callbackPriority = _t;
        return;
      }
      var u = zl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(fl.current !== null && a !== YS)) {
        a == null && s !== Ae && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && vR(a);
      var f;
      if (u === Ae)
        e.tag === Oo ? (fl.isBatchingLegacy !== null && (fl.didScheduleLegacyUpdate = !0), rw(tR.bind(null, e))) : XE(tR.bind(null, e)), fl.current !== null ? fl.current.push(Lo) : u1(function() {
          (Ct & (Br | Ai)) === pr && Lo();
        }), f = null;
      else {
        var p;
        switch (Gv(i)) {
          case Lr:
            p = ss;
            break;
          case bi:
            p = Ol;
            break;
          case Na:
            p = Gi;
            break;
          case za:
            p = hu;
            break;
          default:
            p = Gi;
            break;
        }
        f = QS(p, J0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function J0(e, t) {
      if (Ww(), Ip = Kt, Am = $, (Ct & (Br | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Iu();
      if (i && e.callbackNode !== a)
        return null;
      var u = qc(e, e === Sa ? vr : $);
      if (u === $)
        return null;
      var s = !Zc(e, u) && !Pv(e, u) && !t, f = s ? Hb(e, u) : Hm(e, u);
      if (f !== Vu) {
        if (f === tc) {
          var p = Xc(e);
          p !== $ && (u = p, f = HS(e, p));
        }
        if (f === Ap) {
          var v = jp;
          throw rc(e, $), Bo(e, u), Va(e, Yn()), v;
        }
        if (f === LS)
          Bo(e, u);
        else {
          var y = !Zc(e, u), g = e.current.alternate;
          if (y && !Lb(g)) {
            if (f = Hm(e, u), f === tc) {
              var b = Xc(e);
              b !== $ && (u = b, f = HS(e, b));
            }
            if (f === Ap) {
              var w = jp;
              throw rc(e, $), Bo(e, u), Va(e, Yn()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, Ob(e, f, u);
        }
      }
      return Va(e, Yn()), e.callbackNode === a ? J0.bind(null, e) : null;
    }
    function HS(e, t) {
      var a = Pp;
      if (tf(e)) {
        var i = rc(e, t);
        i.flags |= Er, K1(e.containerInfo);
      }
      var u = Hm(e, t);
      if (u !== tc) {
        var s = Pa;
        Pa = a, s !== null && eR(s);
      }
      return u;
    }
    function eR(e) {
      Pa === null ? Pa = e : Pa.push.apply(Pa, e);
    }
    function Ob(e, t, a) {
      switch (t) {
        case Vu:
        case Ap:
          throw new Error("Root did not complete. This is a bug in React.");
        case tc: {
          ac(e, Pa, Bu);
          break;
        }
        case Om: {
          if (Bo(e, a), bu(a) && // do not delay if we're inside an act() scope
          !hR()) {
            var i = NS + q0 - Yn();
            if (i > 10) {
              var u = qc(e, $);
              if (u !== $)
                break;
              var s = e.suspendedLanes;
              if (!_u(s, a)) {
                Ea(), Jc(e, s);
                break;
              }
              e.timeoutHandle = Ay(ac.bind(null, e, Pa, Bu), i);
              break;
            }
          }
          ac(e, Pa, Bu);
          break;
        }
        case Fp: {
          if (Bo(e, a), Od(a))
            break;
          if (!hR()) {
            var f = ri(e, a), p = f, v = Yn() - p, y = Kb(v) - v;
            if (y > 10) {
              e.timeoutHandle = Ay(ac.bind(null, e, Pa, Bu), y);
              break;
            }
          }
          ac(e, Pa, Bu);
          break;
        }
        case G0: {
          ac(e, Pa, Bu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Lb(e) {
      for (var t = e; ; ) {
        if (t.flags & po) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Q(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & po && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Bo(e, t) {
      t = ws(t, Mm), t = ws(t, Hp), Iv(e, t);
    }
    function tR(e) {
      if (Gw(), (Ct & (Br | Ai)) !== pr)
        throw new Error("Should not already be working.");
      Iu();
      var t = qc(e, $);
      if (!Jr(t, Ae))
        return Va(e, Yn()), null;
      var a = Hm(e, t);
      if (e.tag !== Oo && a === tc) {
        var i = Xc(e);
        i !== $ && (t = i, a = HS(e, i));
      }
      if (a === Ap) {
        var u = jp;
        throw rc(e, $), Bo(e, t), Va(e, Yn()), u;
      }
      if (a === LS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, ac(e, Pa, Bu), Va(e, Yn()), null;
    }
    function Mb(e, t) {
      t !== $ && (ef(e, Xe(t, Ae)), Va(e, Yn()), (Ct & (Br | Ai)) === pr && (Vp(), Lo()));
    }
    function PS(e, t) {
      var a = Ct;
      Ct |= W0;
      try {
        return e(t);
      } finally {
        Ct = a, Ct === pr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !fl.isBatchingLegacy && (Vp(), ZE());
      }
    }
    function Nb(e, t, a, i, u) {
      var s = Ua(), f = Vr.transition;
      try {
        return Vr.transition = null, An(Lr), e(t, a, i, u);
      } finally {
        An(s), Vr.transition = f, Ct === pr && Vp();
      }
    }
    function $u(e) {
      Po !== null && Po.tag === Oo && (Ct & (Br | Ai)) === pr && Iu();
      var t = Ct;
      Ct |= W0;
      var a = Vr.transition, i = Ua();
      try {
        return Vr.transition = null, An(Lr), e ? e() : void 0;
      } finally {
        An(i), Vr.transition = a, Ct = t, (Ct & (Br | Ai)) === pr && Lo();
      }
    }
    function nR() {
      return (Ct & (Br | Ai)) !== pr;
    }
    function jm(e, t) {
      aa(MS, Kl, e), Kl = Xe(Kl, t);
    }
    function VS(e) {
      Kl = MS.current, ra(MS, e);
    }
    function rc(e, t) {
      e.finishedWork = null, e.finishedLanes = $;
      var a = e.timeoutHandle;
      if (a !== Fy && (e.timeoutHandle = Fy, l1(a)), kn !== null)
        for (var i = kn.return; i !== null; ) {
          var u = i.alternate;
          L0(u, i), i = i.return;
        }
      Sa = e;
      var s = ic(e.current, null);
      return kn = s, vr = Kl = t, hr = Vu, jp = null, Lm = $, Hp = $, Mm = $, Pp = null, Pa = null, kw(), rl.discardPendingWarnings(), s;
    }
    function rR(e, t) {
      do {
        var a = kn;
        try {
          if (Gh(), _C(), on(), OS.current = null, a === null || a.return === null) {
            hr = Ap, jp = t, kn = null;
            return;
          }
          if (Ue && a.mode & Lt && Tm(a, !0), He)
            if (ha(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              xi(a, i, vr);
            } else
              fs(a, t, vr);
          rx(e, a.return, a, t, vr), uR(a);
        } catch (u) {
          t = u, kn === a && a !== null ? (a = a.return, kn = a) : a = kn;
          continue;
        }
        return;
      } while (!0);
    }
    function aR() {
      var e = DS.current;
      return DS.current = gm, e === null ? gm : e;
    }
    function iR(e) {
      DS.current = e;
    }
    function zb() {
      NS = Yn();
    }
    function Yp(e) {
      Lm = Xe(e, Lm);
    }
    function Ub() {
      hr === Vu && (hr = Om);
    }
    function BS() {
      (hr === Vu || hr === Om || hr === tc) && (hr = Fp), Sa !== null && (Rs(Lm) || Rs(Hp)) && Bo(Sa, vr);
    }
    function Ab(e) {
      hr !== Fp && (hr = tc), Pp === null ? Pp = [e] : Pp.push(e);
    }
    function Fb() {
      return hr === Vu;
    }
    function Hm(e, t) {
      var a = Ct;
      Ct |= Br;
      var i = aR();
      if (Sa !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Qp(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ad(), rc(e, t);
      }
      Su(t);
      do
        try {
          jb();
          break;
        } catch (s) {
          rR(e, s);
        }
      while (!0);
      if (Gh(), Ct = a, iR(i), kn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Lc(), Sa = null, vr = $, hr;
    }
    function jb() {
      for (; kn !== null; )
        lR(kn);
    }
    function Hb(e, t) {
      var a = Ct;
      Ct |= Br;
      var i = aR();
      if (Sa !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Qp(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ad(), Vp(), rc(e, t);
      }
      Su(t);
      do
        try {
          Pb();
          break;
        } catch (s) {
          rR(e, s);
        }
      while (!0);
      return Gh(), iR(i), Ct = a, kn !== null ? (Av(), Vu) : (Lc(), Sa = null, vr = $, hr);
    }
    function Pb() {
      for (; kn !== null && !hd(); )
        lR(kn);
    }
    function lR(e) {
      var t = e.alternate;
      It(e);
      var a;
      (e.mode & Lt) !== ke ? (Yg(e), a = $S(t, e, Kl), Tm(e, !0)) : a = $S(t, e, Kl), on(), e.memoizedProps = e.pendingProps, a === null ? uR(e) : kn = a, OS.current = null;
    }
    function uR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & os) === _e) {
          It(t);
          var u = void 0;
          if ((t.mode & Lt) === ke ? u = O0(a, t, Kl) : (Yg(t), u = O0(a, t, Kl), Tm(t, !1)), on(), u !== null) {
            kn = u;
            return;
          }
        } else {
          var s = Ux(a, t);
          if (s !== null) {
            s.flags &= Ov, kn = s;
            return;
          }
          if ((t.mode & Lt) !== ke) {
            Tm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= os, i.subtreeFlags = _e, i.deletions = null;
          else {
            hr = LS, kn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          kn = v;
          return;
        }
        t = i, kn = t;
      } while (t !== null);
      hr === Vu && (hr = G0);
    }
    function ac(e, t, a) {
      var i = Ua(), u = Vr.transition;
      try {
        Vr.transition = null, An(Lr), Vb(e, t, a, i);
      } finally {
        Vr.transition = u, An(i);
      }
      return null;
    }
    function Vb(e, t, a, i) {
      do
        Iu();
      while (Po !== null);
      if (Zb(), (Ct & (Br | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Cd(s), u === null)
        return Rd(), null;
      if (s === $ && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = _t;
      var f = Xe(u.lanes, u.childLanes);
      zd(e, f), e === Sa && (Sa = null, kn = null, vr = $), ((u.subtreeFlags & Wi) !== _e || (u.flags & Wi) !== _e) && (nc || (nc = !0, AS = a, QS(Gi, function() {
        return Iu(), null;
      })));
      var p = (u.subtreeFlags & (_l | kl | Dl | Wi)) !== _e, v = (u.flags & (_l | kl | Dl | Wi)) !== _e;
      if (p || v) {
        var y = Vr.transition;
        Vr.transition = null;
        var g = Ua();
        An(Lr);
        var b = Ct;
        Ct |= Ai, OS.current = null, Px(e, u), ZC(), eb(e, u, s), JT(e.containerInfo), e.current = u, ds(s), tb(u, e, s), ps(), md(), Ct = b, An(g), Vr.transition = y;
      } else
        e.current = u, ZC();
      var w = nc;
      if (nc ? (nc = !1, Po = e, Bp = s) : (Bf = 0, Um = null), f = e.pendingLanes, f === $ && (Vf = null), w || fR(e.current, !1), gd(u.stateNode, i), Xr && e.memoizedUpdaters.clear(), Eb(), Va(e, Yn()), t !== null)
        for (var M = e.onRecoverableError, U = 0; U < t.length; U++) {
          var j = t[U], ue = j.stack, Le = j.digest;
          M(j.value, {
            componentStack: ue,
            digest: Le
          });
        }
      if (Nm) {
        Nm = !1;
        var we = zS;
        throw zS = null, we;
      }
      return Jr(Bp, Ae) && e.tag !== Oo && Iu(), f = e.pendingLanes, Jr(f, Ae) ? (Qw(), e === FS ? $p++ : ($p = 0, FS = e)) : $p = 0, Lo(), Rd(), null;
    }
    function Iu() {
      if (Po !== null) {
        var e = Gv(Bp), t = ks(Na, e), a = Vr.transition, i = Ua();
        try {
          return Vr.transition = null, An(t), $b();
        } finally {
          An(i), Vr.transition = a;
        }
      }
      return !1;
    }
    function Bb(e) {
      US.push(e), nc || (nc = !0, QS(Gi, function() {
        return Iu(), null;
      }));
    }
    function $b() {
      if (Po === null)
        return !1;
      var e = AS;
      AS = null;
      var t = Po, a = Bp;
      if (Po = null, Bp = $, (Ct & (Br | Ai)) !== pr)
        throw new Error("Cannot flush passive effects while already rendering.");
      jS = !0, zm = !1, gu(a);
      var i = Ct;
      Ct |= Ai, ob(t.current), ab(t, t.current, a, e);
      {
        var u = US;
        US = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Ix(t, f);
        }
      }
      xd(), fR(t.current, !0), Ct = i, Lo(), zm ? t === Um ? Bf++ : (Bf = 0, Um = t) : Bf = 0, jS = !1, zm = !1, Sd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function oR(e) {
      return Vf !== null && Vf.has(e);
    }
    function Ib(e) {
      Vf === null ? Vf = /* @__PURE__ */ new Set([e]) : Vf.add(e);
    }
    function Yb(e) {
      Nm || (Nm = !0, zS = e);
    }
    var Qb = Yb;
    function sR(e, t, a) {
      var i = Js(a, t), u = l0(e, i, Ae), s = No(e, u, Ae), f = Ea();
      s !== null && (go(s, Ae, f), Va(s, f));
    }
    function sn(e, t, a) {
      if (Fx(a), Wp(!1), e.tag === ee) {
        sR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === ee) {
          sR(i, e, a);
          return;
        } else if (i.tag === ce) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !oR(s)) {
            var f = Js(a, e), p = sS(i, f, Ae), v = No(i, p, Ae), y = Ea();
            v !== null && (go(v, Ae, y), Va(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function Wb(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Ea();
      Jc(e, a), n_(e), Sa === e && _u(vr, a) && (hr === Fp || hr === Om && bu(vr) && Yn() - NS < q0 ? rc(e, $) : Mm = Xe(Mm, a)), Va(e, u);
    }
    function cR(e, t) {
      t === _t && (t = _b(e));
      var a = Ea(), i = ja(e, t);
      i !== null && (go(i, t, a), Va(i, a));
    }
    function Gb(e) {
      var t = e.memoizedState, a = _t;
      t !== null && (a = t.retryLane), cR(e, a);
    }
    function qb(e, t) {
      var a = _t, i;
      switch (e.tag) {
        case be:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case an:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), cR(e, a);
    }
    function Kb(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Tb(e / 1960) * 1960;
    }
    function Xb() {
      if ($p > xb)
        throw $p = 0, FS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Bf > bb && (Bf = 0, Um = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function Zb() {
      rl.flushLegacyContextWarning(), rl.flushPendingUnsafeLifecycleWarnings();
    }
    function fR(e, t) {
      It(e), Pm(e, bl, yb), t && Pm(e, Ri, gb), Pm(e, bl, hb), t && Pm(e, Ri, mb), on();
    }
    function Pm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== _e ? i = i.child : ((i.flags & t) !== _e && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Vm = null;
    function dR(e) {
      {
        if ((Ct & Br) !== pr || !(e.mode & st))
          return;
        var t = e.tag;
        if (t !== Ze && t !== ee && t !== ce && t !== oe && t !== Ye && t !== ft && t !== je)
          return;
        var a = Be(e) || "ReactComponent";
        if (Vm !== null) {
          if (Vm.has(a))
            return;
          Vm.add(a);
        } else
          Vm = /* @__PURE__ */ new Set([a]);
        var i = ar;
        try {
          It(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? It(e) : on();
        }
      }
    }
    var $S;
    {
      var Jb = null;
      $S = function(e, t, a) {
        var i = ER(Jb, t);
        try {
          return x0(e, t, a);
        } catch (s) {
          if (fw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Gh(), _C(), L0(e, t), ER(t, i), t.mode & Lt && Yg(t), xl(null, x0, null, e, t, a), Yi()) {
            var u = us();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var pR = !1, IS;
    IS = /* @__PURE__ */ new Set();
    function e_(e) {
      if (hi && !$w())
        switch (e.tag) {
          case oe:
          case Ye:
          case je: {
            var t = kn && Be(kn) || "Unknown", a = t;
            if (!IS.has(a)) {
              IS.add(a);
              var i = Be(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case ce: {
            pR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), pR = !0);
            break;
          }
        }
    }
    function Qp(e, t) {
      if (Xr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          bs(e, i, t);
        });
      }
    }
    var YS = {};
    function QS(e, t) {
      {
        var a = fl.current;
        return a !== null ? (a.push(t), YS) : vd(e, t);
      }
    }
    function vR(e) {
      if (e !== YS)
        return Mv(e);
    }
    function hR() {
      return fl.current !== null;
    }
    function t_(e) {
      {
        if (e.mode & st) {
          if (!Q0())
            return;
        } else if (!Rb() || Ct !== pr || e.tag !== oe && e.tag !== Ye && e.tag !== je)
          return;
        if (fl.current === null) {
          var t = ar;
          try {
            It(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Be(e));
          } finally {
            t ? It(e) : on();
          }
        }
      }
    }
    function n_(e) {
      e.tag !== Oo && Q0() && fl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Wp(e) {
      Z0 = e;
    }
    var Fi = null, $f = null, r_ = function(e) {
      Fi = e;
    };
    function If(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function WS(e) {
      return If(e);
    }
    function GS(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = If(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: B,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function mR(e, t) {
      {
        if (Fi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ce: {
            typeof i == "function" && (u = !0);
            break;
          }
          case oe: {
            (typeof i == "function" || s === $e) && (u = !0);
            break;
          }
          case Ye: {
            (s === B || s === $e) && (u = !0);
            break;
          }
          case ft:
          case je: {
            (s === We || s === $e) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Fi(a);
          if (f !== void 0 && f === Fi(i))
            return !0;
        }
        return !1;
      }
    }
    function yR(e) {
      {
        if (Fi === null || typeof WeakSet != "function")
          return;
        $f === null && ($f = /* @__PURE__ */ new WeakSet()), $f.add(e);
      }
    }
    var a_ = function(e, t) {
      {
        if (Fi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Iu(), $u(function() {
          qS(e.current, i, a);
        });
      }
    }, i_ = function(e, t) {
      {
        if (e.context !== li)
          return;
        Iu(), $u(function() {
          Gp(t, e, null, null);
        });
      }
    };
    function qS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case oe:
          case je:
          case ce:
            v = p;
            break;
          case Ye:
            v = p.render;
            break;
        }
        if (Fi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var b = Fi(v);
          b !== void 0 && (a.has(b) ? g = !0 : t.has(b) && (f === ce ? g = !0 : y = !0));
        }
        if ($f !== null && ($f.has(e) || i !== null && $f.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = ja(e, Ae);
          w !== null && mr(w, e, Ae, Kt);
        }
        u !== null && !g && qS(u, t, a), s !== null && qS(s, t, a);
      }
    }
    var l_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return KS(e.current, i, a), a;
      }
    };
    function KS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case oe:
          case je:
          case ce:
            p = f;
            break;
          case Ye:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? u_(e, a) : i !== null && KS(i, t, a), u !== null && KS(u, t, a);
      }
    }
    function u_(e, t) {
      {
        var a = o_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case X:
              t.add(i.stateNode);
              return;
            case Se:
              t.add(i.stateNode.containerInfo);
              return;
            case ee:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function o_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === X)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var XS;
    {
      XS = !1;
      try {
        var gR = Object.preventExtensions({});
      } catch {
        XS = !0;
      }
    }
    function s_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = _e, this.subtreeFlags = _e, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !XS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ui = function(e, t, a, i) {
      return new s_(e, t, a, i);
    };
    function ZS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function c_(e) {
      return typeof e == "function" && !ZS(e) && e.defaultProps === void 0;
    }
    function f_(e) {
      if (typeof e == "function")
        return ZS(e) ? ce : oe;
      if (e != null) {
        var t = e.$$typeof;
        if (t === B)
          return Ye;
        if (t === We)
          return ft;
      }
      return Ze;
    }
    function ic(e, t) {
      var a = e.alternate;
      a === null ? (a = ui(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = _e, a.subtreeFlags = _e, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case Ze:
        case oe:
        case je:
          a.type = If(e.type);
          break;
        case ce:
          a.type = WS(e.type);
          break;
        case Ye:
          a.type = GS(e.type);
          break;
      }
      return a;
    }
    function d_(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = _e, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = _e, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function p_(e, t, a) {
      var i;
      return e === jh ? (i = st, t === !0 && (i |= Wt, i |= Mt)) : i = ke, Xr && (i |= Lt), ui(ee, null, null, i);
    }
    function JS(e, t, a, i, u, s) {
      var f = Ze, p = e;
      if (typeof e == "function")
        ZS(e) ? (f = ce, p = WS(p)) : p = If(p);
      else if (typeof e == "string")
        f = X;
      else
        e: switch (e) {
          case fi:
            return $o(a.children, u, s, t);
          case Qa:
            f = tt, u |= Wt, (u & st) !== ke && (u |= Mt);
            break;
          case di:
            return v_(a, u, s, t);
          case ie:
            return h_(a, u, s, t);
          case he:
            return m_(a, u, s, t);
          case Rn:
            return SR(a, u, s, t);
          case en:
          case dt:
          case un:
          case rr:
          case ot:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case pi:
                  f = vt;
                  break e;
                case R:
                  f = cn;
                  break e;
                case B:
                  f = Ye, p = GS(p);
                  break e;
                case We:
                  f = ft;
                  break e;
                case $e:
                  f = rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Be(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = ui(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function eE(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = JS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function $o(e, t, a, i) {
      var u = ui(Ke, e, i, t);
      return u.lanes = a, u;
    }
    function v_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = ui(ht, e, i, t | Lt);
      return u.elementType = di, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function h_(e, t, a, i) {
      var u = ui(be, e, i, t);
      return u.elementType = ie, u.lanes = a, u;
    }
    function m_(e, t, a, i) {
      var u = ui(an, e, i, t);
      return u.elementType = he, u.lanes = a, u;
    }
    function SR(e, t, a, i) {
      var u = ui(De, e, i, t);
      u.elementType = Rn, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function tE(e, t, a) {
      var i = ui(Fe, e, null, t);
      return i.lanes = a, i;
    }
    function y_() {
      var e = ui(X, null, null, ke);
      return e.elementType = "DELETED", e;
    }
    function g_(e) {
      var t = ui(Xt, null, null, ke);
      return t.stateNode = e, t;
    }
    function nE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = ui(Se, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function ER(e, t) {
      return e === null && (e = ui(Ze, null, null, ke)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function S_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Fy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = _t, this.eventTimes = xs($), this.expirationTimes = xs(Kt), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = xs($), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Eu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case jh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Oo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function CR(e, t, a, i, u, s, f, p, v, y) {
      var g = new S_(e, t, a, p, v), b = p_(t, s);
      g.current = b, b.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        b.memoizedState = w;
      }
      return hg(b), g;
    }
    var rE = "18.3.1";
    function E_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Ir(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: nr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var aE, iE;
    aE = !1, iE = {};
    function RR(e) {
      if (!e)
        return li;
      var t = fo(e), a = nw(t);
      if (t.tag === ce) {
        var i = t.type;
        if ($l(i))
          return qE(t, i, a);
      }
      return a;
    }
    function C_(e, t) {
      {
        var a = fo(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = qr(a);
        if (u === null)
          return null;
        if (u.mode & Wt) {
          var s = Be(a) || "Component";
          if (!iE[s]) {
            iE[s] = !0;
            var f = ar;
            try {
              It(u), a.mode & Wt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? It(f) : on();
            }
          }
        }
        return u.stateNode;
      }
    }
    function TR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return CR(e, t, v, y, a, i, u, s, f);
    }
    function wR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, b = CR(a, i, g, e, u, s, f, p, v);
      b.context = RR(null);
      var w = b.current, M = Ea(), U = Vo(w), j = Hu(M, U);
      return j.callback = t ?? null, No(w, j, U), kb(b, U, M), b;
    }
    function Gp(e, t, a, i) {
      yd(t, e);
      var u = t.current, s = Ea(), f = Vo(u);
      yn(f);
      var p = RR(a);
      t.context === null ? t.context = p : t.pendingContext = p, hi && ar !== null && !aE && (aE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Be(ar) || "Unknown"));
      var v = Hu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = No(u, v, f);
      return y !== null && (mr(y, u, f, s), Jh(y, u, f)), f;
    }
    function Bm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case X:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function R_(e) {
      switch (e.tag) {
        case ee: {
          var t = e.stateNode;
          if (tf(t)) {
            var a = jv(t);
            Mb(t, a);
          }
          break;
        }
        case be: {
          $u(function() {
            var u = ja(e, Ae);
            if (u !== null) {
              var s = Ea();
              mr(u, e, Ae, s);
            }
          });
          var i = Ae;
          lE(e, i);
          break;
        }
      }
    }
    function xR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = $v(a.retryLane, t));
    }
    function lE(e, t) {
      xR(e, t);
      var a = e.alternate;
      a && xR(a, t);
    }
    function T_(e) {
      if (e.tag === be) {
        var t = Ss, a = ja(e, t);
        if (a !== null) {
          var i = Ea();
          mr(a, e, t, i);
        }
        lE(e, t);
      }
    }
    function w_(e) {
      if (e.tag === be) {
        var t = Vo(e), a = ja(e, t);
        if (a !== null) {
          var i = Ea();
          mr(a, e, t, i);
        }
        lE(e, t);
      }
    }
    function bR(e) {
      var t = fn(e);
      return t === null ? null : t.stateNode;
    }
    var _R = function(e) {
      return null;
    };
    function x_(e) {
      return _R(e);
    }
    var kR = function(e) {
      return !1;
    };
    function b_(e) {
      return kR(e);
    }
    var DR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null, AR = null, FR = null;
    {
      var jR = function(e, t, a) {
        var i = t[a], u = it(e) ? e.slice() : et({}, e);
        return a + 1 === t.length ? (it(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = jR(e[i], t, a + 1), u);
      }, HR = function(e, t) {
        return jR(e, t, 0);
      }, PR = function(e, t, a, i) {
        var u = t[i], s = it(e) ? e.slice() : et({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], it(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = PR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, VR = function(e, t, a) {
        if (t.length !== a.length) {
          gt("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              gt("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return PR(e, t, a, 0);
      }, BR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = it(e) ? e.slice() : et({}, e);
        return s[u] = BR(e[u], t, a + 1, i), s;
      }, $R = function(e, t, a) {
        return BR(e, t, 0, a);
      }, uE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      DR = function(e, t, a, i) {
        var u = uE(e, t);
        if (u !== null) {
          var s = $R(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = et({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Kt);
        }
      }, OR = function(e, t, a) {
        var i = uE(e, t);
        if (i !== null) {
          var u = HR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = et({}, e.memoizedProps);
          var s = ja(e, Ae);
          s !== null && mr(s, e, Ae, Kt);
        }
      }, LR = function(e, t, a, i) {
        var u = uE(e, t);
        if (u !== null) {
          var s = VR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = et({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Kt);
        }
      }, MR = function(e, t, a) {
        e.pendingProps = $R(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Kt);
      }, NR = function(e, t) {
        e.pendingProps = HR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = ja(e, Ae);
        a !== null && mr(a, e, Ae, Kt);
      }, zR = function(e, t, a) {
        e.pendingProps = VR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Kt);
      }, UR = function(e) {
        var t = ja(e, Ae);
        t !== null && mr(t, e, Ae, Kt);
      }, AR = function(e) {
        _R = e;
      }, FR = function(e) {
        kR = e;
      };
    }
    function __(e) {
      var t = qr(e);
      return t === null ? null : t.stateNode;
    }
    function k_(e) {
      return null;
    }
    function D_() {
      return ar;
    }
    function O_(e) {
      var t = e.findFiberByHostInstance, a = A.ReactCurrentDispatcher;
      return ho({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: DR,
        overrideHookStateDeletePath: OR,
        overrideHookStateRenamePath: LR,
        overrideProps: MR,
        overridePropsDeletePath: NR,
        overridePropsRenamePath: zR,
        setErrorHandler: AR,
        setSuspenseHandler: FR,
        scheduleUpdate: UR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: __,
        findFiberByHostInstance: t || k_,
        // React Refresh
        findHostInstancesForRefresh: l_,
        scheduleRefresh: a_,
        scheduleRoot: i_,
        setRefreshHandler: r_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: D_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: rE
      });
    }
    var IR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function oE(e) {
      this._internalRoot = e;
    }
    $m.prototype.render = oE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Im(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = bR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Gp(e, t, null, null);
    }, $m.prototype.unmount = oE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        nR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $u(function() {
          Gp(null, e, null, null);
        }), IE(t);
      }
    };
    function L_(e, t) {
      if (!Im(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      YR(e);
      var a = !1, i = !1, u = "", s = IR;
      t != null && (t.hydrate ? gt("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === _r && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = TR(e, jh, null, a, i, u, s);
      Lh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return ep(p), new oE(f);
    }
    function $m(e) {
      this._internalRoot = e;
    }
    function M_(e) {
      e && Jv(e);
    }
    $m.prototype.unstable_scheduleHydration = M_;
    function N_(e, t, a) {
      if (!Im(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      YR(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = IR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = wR(t, null, e, jh, i, s, f, p, v);
      if (Lh(y.current, e), ep(e), u)
        for (var g = 0; g < u.length; g++) {
          var b = u[g];
          Fw(y, b);
        }
      return new $m(y);
    }
    function Im(e) {
      return !!(e && (e.nodeType === Qr || e.nodeType === Ii || e.nodeType === nd));
    }
    function qp(e) {
      return !!(e && (e.nodeType === Qr || e.nodeType === Ii || e.nodeType === nd || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function YR(e) {
      e.nodeType === Qr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var z_ = A.ReactCurrentOwner, QR;
    QR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = bR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = sE(e), u = !!(i && ko(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Qr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function sE(e) {
      return e ? e.nodeType === Ii ? e.documentElement : e.firstChild : null;
    }
    function WR() {
    }
    function U_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Bm(f);
            s.call(w);
          };
        }
        var f = wR(
          t,
          i,
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          WR
        );
        e._reactRootContainer = f, Lh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return ep(p), $u(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Bm(g);
            y.call(w);
          };
        }
        var g = TR(
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          WR
        );
        e._reactRootContainer = g, Lh(g.current, e);
        var b = e.nodeType === Ln ? e.parentNode : e;
        return ep(b), $u(function() {
          Gp(t, g, a, i);
        }), g;
      }
    }
    function A_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Ym(e, t, a, i, u) {
      QR(a), A_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = U_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Bm(f);
            p.call(v);
          };
        }
        Gp(t, f, e, u);
      }
      return Bm(f);
    }
    var GR = !1;
    function F_(e) {
      {
        GR || (GR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = z_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Tt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Qr ? e : C_(e, "findDOMNode");
    }
    function j_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = fp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Ym(null, e, t, !0, a);
    }
    function H_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = fp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Ym(null, e, t, !1, a);
    }
    function P_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ly(e))
        throw new Error("parentComponent must be a valid React Component");
      return Ym(e, t, a, !1, i);
    }
    var qR = !1;
    function V_(e) {
      if (qR || (qR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !qp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = fp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = sE(e), i = a && !ko(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return $u(function() {
          Ym(null, null, e, !1, function() {
            e._reactRootContainer = null, IE(e);
          });
        }), !0;
      } else {
        {
          var u = sE(e), s = !!(u && ko(u)), f = e.nodeType === Qr && qp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Rr(R_), So(T_), qv(w_), Os(Ua), Fd(Qv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), gc($T), iy(PS, Nb, $u);
    function B_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Im(t))
        throw new Error("Target container is not a DOM element.");
      return E_(e, t, null, a);
    }
    function $_(e, t, a, i) {
      return P_(e, t, a, i);
    }
    var cE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [ko, Cf, Mh, uo, Sc, PS]
    };
    function I_(e, t) {
      return cE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), L_(e, t);
    }
    function Y_(e, t, a) {
      return cE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), N_(e, t, a);
    }
    function Q_(e) {
      return nR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), $u(e);
    }
    var W_ = O_({
      findFiberByHostInstance: Is,
      bundleType: 1,
      version: rE,
      rendererPackageName: "react-dom"
    });
    if (!W_ && Dn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var KR = window.location.protocol;
      /^(https?|file):$/.test(KR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (KR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cE, $a.createPortal = B_, $a.createRoot = I_, $a.findDOMNode = F_, $a.flushSync = Q_, $a.hydrate = j_, $a.hydrateRoot = Y_, $a.render = H_, $a.unmountComponentAtNode = V_, $a.unstable_batchedUpdates = PS, $a.unstable_renderSubtreeIntoContainer = $_, $a.version = rE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), $a;
}
function sT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sT);
    } catch (J) {
      console.error(J);
    }
  }
}
process.env.NODE_ENV === "production" ? (sT(), hE.exports = nk()) : hE.exports = rk();
var ak = hE.exports, mE, Gm = ak;
if (process.env.NODE_ENV === "production")
  mE = Gm.createRoot, Gm.hydrateRoot;
else {
  var uT = Gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  mE = function(J, W) {
    uT.usingClientEntryPoint = !0;
    try {
      return Gm.createRoot(J, W);
    } finally {
      uT.usingClientEntryPoint = !1;
    }
  };
}
var Io = ev();
function pE(J, W = window.location.search) {
  const qe = new URLSearchParams(W).get(J);
  return qe && qe.trim() !== "" ? qe.trim() : null;
}
function ik() {
  const J = pE("hotel") ?? "NS001", W = pE("room") ?? "101", A = (pE("lang") ?? "auto").toLowerCase(), qe = (navigator.language || "it").slice(0, 2).toLowerCase();
  return { hotel: J, room: W, langParam: A, locale: A === "auto" ? qe === "en" ? "en" : "it" : A === "en" ? "en" : "it" };
}
const lk = "http://localhost:8081";
async function uk(J, W) {
  const A = {
    text: J,
    // ⬅️ QUI: 'text' (non 'message')
    hotel: W.hotel ?? null,
    room: W.room ?? null,
    locale: W.locale ?? "it"
  }, qe = await fetch(`${lk}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(A)
  });
  if (!qe.ok) {
    const ct = await qe.text().catch(() => "");
    throw console.error("[sendMessage] HTTP", qe.status, ct), new Error(`HTTP ${qe.status} ${ct}`);
  }
  return qe.json();
}
function ok() {
  const J = ik(), W = Io.useMemo(() => J.locale, []), A = Io.useMemo(
    () => ({
      hotel: J.hotel,
      room: J.room,
      locale: J.locale
    }),
    []
  ), qe = Io.useMemo(
    () => W === "en" ? {
      title: "NextSphere",
      placeholder: "Type a message...",
      send: "Send",
      serverError: "Oops, I can't reach the server 😅"
    } : {
      title: "NextSphere",
      placeholder: "Scrivi un messaggio...",
      send: "Invia",
      serverError: "Ops, non riesco a contattare il server 😅"
    },
    [W]
  ), [ct, gt] = Io.useState(!1), [S, kt] = Io.useState([]), [oe, ce] = Io.useState(""), Ze = Io.useRef(null);
  Io.useEffect(() => {
    var X;
    (X = Ze.current) == null || X.scrollIntoView({ behavior: "smooth" });
  }, [S]);
  async function ee() {
    const X = oe.trim();
    if (!X) return;
    const Fe = { role: "user", content: X };
    kt((Ke) => [...Ke, Fe]), ce("");
    try {
      const Ke = await uk(X, A);
      kt((tt) => [
        ...tt,
        { role: "assistant", content: (Ke == null ? void 0 : Ke.reply) ?? "..." }
      ]);
    } catch (Ke) {
      console.error("Errore chiamata /api/chat", Ke), kt((tt) => [
        ...tt,
        { role: "assistant", content: qe.serverError }
      ]);
    }
  }
  function Se(X) {
    X.key === "Enter" && !X.shiftKey && (X.preventDefault(), ee());
  }
  return /* @__PURE__ */ wr.jsxs("div", { className: "fixed bottom-4 right-4 z-50", children: [
    !ct && /* @__PURE__ */ wr.jsx(
      "button",
      {
        className: "rounded-full p-3 shadow bg-black text-white",
        onClick: () => gt(!0),
        "aria-label": W === "en" ? "Open chat" : "Apri chat",
        children: "💬"
      }
    ),
    ct && /* @__PURE__ */ wr.jsxs("div", { className: "w-96 max-w-[92vw] h-96 rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-md border border-black/5 flex flex-col", children: [
      /* @__PURE__ */ wr.jsxs("header", { className: "h-12 flex items-center justify-between px-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-black/5", children: [
        /* @__PURE__ */ wr.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ wr.jsx(
            "span",
            {
              className: "inline-block h-6 w-6 rounded-full bg-black/80",
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ wr.jsx("span", { className: "sr-only", children: "NextSphere" })
        ] }),
        /* @__PURE__ */ wr.jsx(
          "button",
          {
            className: "h-8 w-8 grid place-items-center rounded-lg hover:bg-black/5 transition",
            "aria-label": W === "en" ? "Close chat" : "Chiudi chat",
            onClick: () => gt(!1),
            children: /* @__PURE__ */ wr.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", children: /* @__PURE__ */ wr.jsx(
              "path",
              {
                d: "M6 6l12 12M18 6L6 18",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            ) })
          }
        )
      ] }),
      /* @__PURE__ */ wr.jsxs("div", { className: "flex-1 overflow-auto p-4 space-y-3 chat-scroll", children: [
        S.map((X, Fe) => /* @__PURE__ */ wr.jsx("div", { className: `flex ${X.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ wr.jsx(
          "div",
          {
            className: X.role === "user" ? "max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-black text-white shadow-sm" : "max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-white border border-black/10 shadow-sm",
            children: X.content
          }
        ) }, Fe)),
        /* @__PURE__ */ wr.jsx("div", { ref: Ze })
      ] }),
      /* @__PURE__ */ wr.jsxs("div", { className: "flex items-center gap-2 p-2 border-t bg-white/60 backdrop-blur-md", children: [
        /* @__PURE__ */ wr.jsx(
          "input",
          {
            className: `flex-1 border border-black/10 rounded-xl px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20
               placeholder:text-gray-400 transition-shadow`,
            value: oe,
            onChange: (X) => ce(X.target.value),
            onKeyDown: Se,
            placeholder: qe.placeholder,
            "aria-label": W === "en" ? "Message input" : "Input messaggio"
          }
        ),
        /* @__PURE__ */ wr.jsx(
          "button",
          {
            className: `px-3 py-2 rounded-xl text-sm font-medium transition
                ${oe.trim() ? "bg-black text-white hover:opacity-90 active:scale-[0.98] shadow-sm" : "bg-black/10 text-gray-500 cursor-not-allowed"}`,
            onClick: ee,
            disabled: !oe.trim(),
            "aria-label": W === "en" ? "Send message" : "Invia messaggio",
            title: W === "en" ? "Press Enter to send" : "Premi Invio per inviare",
            children: qe.send
          }
        )
      ] })
    ] })
  ] });
}
const sk = document.getElementById("nx-widget");
mE(sk).render(/* @__PURE__ */ wr.jsx(ok, {}));
