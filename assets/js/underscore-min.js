(function () {
  function n (n) {
    function t (t, r, e, u, i, o) {
      for (; i >= 0 && o > i; i += n) {
        const a = u ? u[i] : i
        e = r(e, t[a], a, t)
      }
      return e
    }
    return function (r, e, u, i) {
      e = b(e, i, 4)
      const o = !k(r) && m.keys(r)
      const a = (o || r).length
      let c = n > 0 ? 0 : a - 1
      return (
        arguments.length < 3 && ((u = r[o ? o[c] : c]), (c += n)),
        t(r, e, u, o, c, a)
      )
    }
  }
  function t (n) {
    return function (t, r, e) {
      r = x(r, e)
      for (let u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n) {
        if (r(t[i], i, t)) return i
      }
      return -1
    }
  }
  function r (n, t, r) {
    return function (e, u, i) {
      let o = 0
      let a = O(e)
      if (typeof i === 'number') {
        n > 0
          ? (o = i >= 0 ? i : Math.max(i + a, o))
          : (a = i >= 0 ? Math.min(i + 1, a) : i + a + 1)
      } else if (r && i && a) return (i = r(e, u)), e[i] === u ? i : -1
      if (u !== u) {
        return (i = t(l.call(e, o, a), m.isNaN)), i >= 0 ? i + o : -1
      }
      for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n) {
        if (e[i] === u) return i
      }
      return -1
    }
  }
  function e (n, t) {
    let r = I.length
    const e = n.constructor
    const u = (m.isFunction(e) && e.prototype) || a
    let i = 'constructor'
    for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) {
      (i = I[r]), i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
  }
  const u = this
  const i = u._
  const o = Array.prototype
  var a = Object.prototype
  const c = Function.prototype
  const f = o.push
  var l = o.slice
  const s = a.toString
  const p = a.hasOwnProperty
  const h = Array.isArray
  const v = Object.keys
  const g = c.bind
  const y = Object.create
  const d = function () {}
  var m = function (n) {
    return n instanceof m
      ? n
      : this instanceof m
        ? void (this._wrapped = n)
        : new m(n)
  }
  typeof exports !== 'undefined'
    ? (typeof module !== 'undefined' &&
        module.exports &&
        (exports = module.exports = m),
      (exports._ = m))
    : (u._ = m),
  (m.VERSION = '1.8.3')
  var b = function (n, t, r) {
    if (void 0 === t) return n
    switch (r == null ? 3 : r) {
      case 1:
        return function (r) {
          return n.call(t, r)
        }
      case 2:
        return function (r, e) {
          return n.call(t, r, e)
        }
      case 3:
        return function (r, e, u) {
          return n.call(t, r, e, u)
        }
      case 4:
        return function (r, e, u, i) {
          return n.call(t, r, e, u, i)
        }
    }
    return function () {
      return n.apply(t, arguments)
    }
  }
  var x = function (n, t, r) {
    return n == null
      ? m.identity
      : m.isFunction(n)
        ? b(n, t, r)
        : m.isObject(n)
          ? m.matcher(n)
          : m.property(n)
  }
  m.iteratee = function (n, t) {
    return x(n, t, 1 / 0)
  }
  const _ = function (n, t) {
    return function (r) {
      const e = arguments.length
      if (e < 2 || r == null) return r
      for (let u = 1; e > u; u++) {
        for (let i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
          const f = o[c];
          (t && void 0 !== r[f]) || (r[f] = i[f])
        }
      }
      return r
    }
  }
  const j = function (n) {
    if (!m.isObject(n)) return {}
    if (y) return y(n)
    d.prototype = n
    const t = new d()
    return (d.prototype = null), t
  }
  const w = function (n) {
    return function (t) {
      return t == null ? void 0 : t[n]
    }
  }
  const A = Math.pow(2, 53) - 1
  var O = w('length')
  var k = function (n) {
    const t = O(n)
    return typeof t === 'number' && t >= 0 && A >= t
  };
  (m.each = m.forEach =
    function (n, t, r) {
      t = b(t, r)
      let e, u
      if (k(n)) for (e = 0, u = n.length; u > e; e++) t(n[e], e, n)
      else {
        const i = m.keys(n)
        for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
      }
      return n
    }),
  (m.map = m.collect =
      function (n, t, r) {
        t = x(t, r)
        for (
          var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0;
          u > o;
          o++
        ) {
          const a = e ? e[o] : o
          i[o] = t(n[a], a, n)
        }
        return i
      }),
  (m.reduce = m.foldl = m.inject = n(1)),
  (m.reduceRight = m.foldr = n(-1)),
  (m.find = m.detect =
      function (n, t, r) {
        let e
        return (
          (e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r)),
          void 0 !== e && e !== -1 ? n[e] : void 0
        )
      }),
  (m.filter = m.select =
      function (n, t, r) {
        const e = []
        return (
          (t = x(t, r)),
          m.each(n, function (n, r, u) {
            t(n, r, u) && e.push(n)
          }),
          e
        )
      }),
  (m.reject = function (n, t, r) {
    return m.filter(n, m.negate(x(t)), r)
  }),
  (m.every = m.all =
      function (n, t, r) {
        t = x(t, r)
        for (
          let e = !k(n) && m.keys(n), u = (e || n).length, i = 0;
          u > i;
          i++
        ) {
          const o = e ? e[i] : i
          if (!t(n[o], o, n)) return !1
        }
        return !0
      }),
  (m.some = m.any =
      function (n, t, r) {
        t = x(t, r)
        for (
          let e = !k(n) && m.keys(n), u = (e || n).length, i = 0;
          u > i;
          i++
        ) {
          const o = e ? e[i] : i
          if (t(n[o], o, n)) return !0
        }
        return !1
      }),
  (m.contains =
      m.includes =
      m.include =
        function (n, t, r, e) {
          return (
            k(n) || (n = m.values(n)),
            (typeof r !== 'number' || e) && (r = 0),
            m.indexOf(n, t, r) >= 0
          )
        }),
  (m.invoke = function (n, t) {
    const r = l.call(arguments, 2)
    const e = m.isFunction(t)
    return m.map(n, function (n) {
      const u = e ? t : n[t]
      return u == null ? u : u.apply(n, r)
    })
  }),
  (m.pluck = function (n, t) {
    return m.map(n, m.property(t))
  }),
  (m.where = function (n, t) {
    return m.filter(n, m.matcher(t))
  }),
  (m.findWhere = function (n, t) {
    return m.find(n, m.matcher(t))
  }),
  (m.max = function (n, t, r) {
    let e
    let u
    let i = -1 / 0
    let o = -1 / 0
    if (t == null && n != null) {
      n = k(n) ? n : m.values(n)
      for (let a = 0, c = n.length; c > a; a++) (e = n[a]), e > i && (i = e)
    } else {
      (t = x(t, r)),
      m.each(n, function (n, r, e) {
        (u = t(n, r, e)),
        (u > o || (u === -1 / 0 && i === -1 / 0)) && ((i = n), (o = u))
      })
    }
    return i
  }),
  (m.min = function (n, t, r) {
    let e
    let u
    let i = 1 / 0
    let o = 1 / 0
    if (t == null && n != null) {
      n = k(n) ? n : m.values(n)
      for (let a = 0, c = n.length; c > a; a++) (e = n[a]), i > e && (i = e)
    } else {
      (t = x(t, r)),
      m.each(n, function (n, r, e) {
        (u = t(n, r, e)),
        (o > u || (1 / 0 === u && 1 / 0 === i)) && ((i = n), (o = u))
      })
    }
    return i
  }),
  (m.shuffle = function (n) {
    for (
      var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0;
      e > i;
      i++
    ) {
      (t = m.random(0, i)), t !== i && (u[i] = u[t]), (u[t] = r[i])
    }
    return u
  }),
  (m.sample = function (n, t, r) {
    return t == null || r
      ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)])
      : m.shuffle(n).slice(0, Math.max(0, t))
  }),
  (m.sortBy = function (n, t, r) {
    return (
      (t = x(t, r)),
      m.pluck(
        m
          .map(n, function (n, r, e) {
            return { value: n, index: r, criteria: t(n, r, e) }
          })
          .sort(function (n, t) {
            const r = n.criteria
            const e = t.criteria
            if (r !== e) {
              if (r > e || void 0 === r) return 1
              if (e > r || void 0 === e) return -1
            }
            return n.index - t.index
          }),
        'value'
      )
    )
  })
  const F = function (n) {
    return function (t, r, e) {
      const u = {}
      return (
        (r = x(r, e)),
        m.each(t, function (e, i) {
          const o = r(e, i, t)
          n(u, e, o)
        }),
        u
      )
    }
  };
  (m.groupBy = F(function (n, t, r) {
    m.has(n, r) ? n[r].push(t) : (n[r] = [t])
  })),
  (m.indexBy = F(function (n, t, r) {
    n[r] = t
  })),
  (m.countBy = F(function (n, t, r) {
    m.has(n, r) ? n[r]++ : (n[r] = 1)
  })),
  (m.toArray = function (n) {
    return n
      ? m.isArray(n)
        ? l.call(n)
        : k(n)
          ? m.map(n, m.identity)
          : m.values(n)
      : []
  }),
  (m.size = function (n) {
    return n == null ? 0 : k(n) ? n.length : m.keys(n).length
  }),
  (m.partition = function (n, t, r) {
    t = x(t, r)
    const e = []
    const u = []
    return (
      m.each(n, function (n, r, i) {
        (t(n, r, i) ? e : u).push(n)
      }),
      [e, u]
    )
  }),
  (m.first =
      m.head =
      m.take =
        function (n, t, r) {
          return n == null
            ? void 0
            : t == null || r
              ? n[0]
              : m.initial(n, n.length - t)
        }),
  (m.initial = function (n, t, r) {
    return l.call(n, 0, Math.max(0, n.length - (t == null || r ? 1 : t)))
  }),
  (m.last = function (n, t, r) {
    return n == null
      ? void 0
      : t == null || r
        ? n[n.length - 1]
        : m.rest(n, Math.max(0, n.length - t))
  }),
  (m.rest =
      m.tail =
      m.drop =
        function (n, t, r) {
          return l.call(n, t == null || r ? 1 : t)
        }),
  (m.compact = function (n) {
    return m.filter(n, m.identity)
  })
  const S = function (n, t, r, e) {
    for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
      let c = n[o]
      if (k(c) && (m.isArray(c) || m.isArguments(c))) {
        t || (c = S(c, t, r))
        let f = 0
        const l = c.length
        for (u.length += l; l > f;) u[i++] = c[f++]
      } else r || (u[i++] = c)
    }
    return u
  };
  (m.flatten = function (n, t) {
    return S(n, t, !1)
  }),
  (m.without = function (n) {
    return m.difference(n, l.call(arguments, 1))
  }),
  (m.uniq = m.unique =
      function (n, t, r, e) {
        m.isBoolean(t) || ((e = r), (r = t), (t = !1)),
        r != null && (r = x(r, e))
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
          const c = n[o]
          const f = r ? r(c, o, n) : c
          t
            ? ((o && i === f) || u.push(c), (i = f))
            : r
              ? m.contains(i, f) || (i.push(f), u.push(c))
              : m.contains(u, c) || u.push(c)
        }
        return u
      }),
  (m.union = function () {
    return m.uniq(S(arguments, !0, !0))
  }),
  (m.intersection = function (n) {
    for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
      const i = n[e]
      if (!m.contains(t, i)) {
        for (var o = 1; r > o && m.contains(arguments[o], i); o++);
        o === r && t.push(i)
      }
    }
    return t
  }),
  (m.difference = function (n) {
    const t = S(arguments, !0, !0, 1)
    return m.filter(n, function (n) {
      return !m.contains(t, n)
    })
  }),
  (m.zip = function () {
    return m.unzip(arguments)
  }),
  (m.unzip = function (n) {
    for (
      var t = (n && m.max(n, O).length) || 0, r = Array(t), e = 0;
      t > e;
      e++
    ) {
      r[e] = m.pluck(n, e)
    }
    return r
  }),
  (m.object = function (n, t) {
    for (var r = {}, e = 0, u = O(n); u > e; e++) {
      t ? (r[n[e]] = t[e]) : (r[n[e][0]] = n[e][1])
    }
    return r
  }),
  (m.findIndex = t(1)),
  (m.findLastIndex = t(-1)),
  (m.sortedIndex = function (n, t, r, e) {
    r = x(r, e, 1)
    for (var u = r(t), i = 0, o = O(n); o > i;) {
      const a = Math.floor((i + o) / 2)
      r(n[a]) < u ? (i = a + 1) : (o = a)
    }
    return i
  }),
  (m.indexOf = r(1, m.findIndex, m.sortedIndex)),
  (m.lastIndexOf = r(-1, m.findLastIndex)),
  (m.range = function (n, t, r) {
    t == null && ((t = n || 0), (n = 0)), (r = r || 1)
    for (
      var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0;
      e > i;
      i++, n += r
    ) {
      u[i] = n
    }
    return u
  })
  const E = function (n, t, r, e, u) {
    if (!(e instanceof t)) return n.apply(r, u)
    const i = j(n.prototype)
    const o = n.apply(i, u)
    return m.isObject(o) ? o : i
  };
  (m.bind = function (n, t) {
    if (g && n.bind === g) return g.apply(n, l.call(arguments, 1))
    if (!m.isFunction(n)) {
      throw new TypeError('Bind must be called on a function')
    }
    const r = l.call(arguments, 2)
    const e = function () {
      return E(n, e, t, this, r.concat(l.call(arguments)))
    }
    return e
  }),
  (m.partial = function (n) {
    const t = l.call(arguments, 1)
    const r = function () {
      for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) {
        i[o] = t[o] === m ? arguments[e++] : t[o]
      }
      for (; e < arguments.length;) i.push(arguments[e++])
      return E(n, r, this, this, i)
    }
    return r
  }),
  (m.bindAll = function (n) {
    let t
    let r
    const e = arguments.length
    if (e <= 1) throw new Error('bindAll must be passed function names')
    for (t = 1; e > t; t++) (r = arguments[t]), (n[r] = m.bind(n[r], n))
    return n
  }),
  (m.memoize = function (n, t) {
    const r = function (e) {
      const u = r.cache
      const i = '' + (t ? t.apply(this, arguments) : e)
      return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
    }
    return (r.cache = {}), r
  }),
  (m.delay = function (n, t) {
    const r = l.call(arguments, 2)
    return setTimeout(function () {
      return n.apply(null, r)
    }, t)
  }),
  (m.defer = m.partial(m.delay, m, 1)),
  (m.throttle = function (n, t, r) {
    let e
    let u
    let i
    let o = null
    let a = 0
    r || (r = {})
    const c = function () {
      (a = r.leading === !1 ? 0 : m.now()),
      (o = null),
      (i = n.apply(e, u)),
      o || (e = u = null)
    }
    return function () {
      const f = m.now()
      a || r.leading !== !1 || (a = f)
      const l = t - (f - a)
      return (
        (e = this),
        (u = arguments),
        l <= 0 || l > t
          ? (o && (clearTimeout(o), (o = null)),
            (a = f),
            (i = n.apply(e, u)),
            o || (e = u = null))
          : o || r.trailing === !1 || (o = setTimeout(c, l)),
        i
      )
    }
  }),
  (m.debounce = function (n, t, r) {
    let e
    let u
    let i
    let o
    let a
    const c = function () {
      const f = m.now() - o
      t > f && f >= 0
        ? (e = setTimeout(c, t - f))
        : ((e = null), r || ((a = n.apply(i, u)), e || (i = u = null)))
    }
    return function () {
      (i = this), (u = arguments), (o = m.now())
      const f = r && !e
      return (
        e || (e = setTimeout(c, t)),
        f && ((a = n.apply(i, u)), (i = u = null)),
        a
      )
    }
  }),
  (m.wrap = function (n, t) {
    return m.partial(t, n)
  }),
  (m.negate = function (n) {
    return function () {
      return !n.apply(this, arguments)
    }
  }),
  (m.compose = function () {
    const n = arguments
    const t = n.length - 1
    return function () {
      for (var r = t, e = n[t].apply(this, arguments); r--;) {
        e = n[r].call(this, e)
      }
      return e
    }
  }),
  (m.after = function (n, t) {
    return function () {
      return --n < 1 ? t.apply(this, arguments) : void 0
    }
  }),
  (m.before = function (n, t) {
    let r
    return function () {
      return (
        --n > 0 && (r = t.apply(this, arguments)), n <= 1 && (t = null), r
      )
    }
  }),
  (m.once = m.partial(m.before, 2))
  const M = !{ toString: null }.propertyIsEnumerable('toString')
  var I = [
    'valueOf',
    'isPrototypeOf',
    'toString',
    'propertyIsEnumerable',
    'hasOwnProperty',
    'toLocaleString'
  ];
  (m.keys = function (n) {
    if (!m.isObject(n)) return []
    if (v) return v(n)
    const t = []
    for (const r in n) m.has(n, r) && t.push(r)
    return M && e(n, t), t
  }),
  (m.allKeys = function (n) {
    if (!m.isObject(n)) return []
    const t = []
    for (const r in n) t.push(r)
    return M && e(n, t), t
  }),
  (m.values = function (n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) {
      e[u] = n[t[u]]
    }
    return e
  }),
  (m.mapObject = function (n, t, r) {
    t = x(t, r)
    for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) {
      (e = u[a]), (o[e] = t(n[e], e, n))
    }
    return o
  }),
  (m.pairs = function (n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) {
      e[u] = [t[u], n[t[u]]]
    }
    return e
  }),
  (m.invert = function (n) {
    for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) {
      t[n[r[e]]] = r[e]
    }
    return t
  }),
  (m.functions = m.methods =
      function (n) {
        const t = []
        for (const r in n) m.isFunction(n[r]) && t.push(r)
        return t.sort()
      }),
  (m.extend = _(m.allKeys)),
  (m.extendOwn = m.assign = _(m.keys)),
  (m.findKey = function (n, t, r) {
    t = x(t, r)
    for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++) {
      if (((e = u[i]), t(n[e], e, n))) return e
    }
  }),
  (m.pick = function (n, t, r) {
    let e
    let u
    const i = {}
    let o = n
    if (o == null) return i
    m.isFunction(t)
      ? ((u = m.allKeys(o)), (e = b(t, r)))
      : ((u = S(arguments, !1, !1, 1)),
        (e = function (n, t, r) {
          return t in r
        }),
        (o = Object(o)))
    for (let a = 0, c = u.length; c > a; a++) {
      const f = u[a]
      const l = o[f]
      e(l, f, o) && (i[f] = l)
    }
    return i
  }),
  (m.omit = function (n, t, r) {
    if (m.isFunction(t)) t = m.negate(t)
    else {
      const e = m.map(S(arguments, !1, !1, 1), String)
      t = function (n, t) {
        return !m.contains(e, t)
      }
    }
    return m.pick(n, t, r)
  }),
  (m.defaults = _(m.allKeys, !0)),
  (m.create = function (n, t) {
    const r = j(n)
    return t && m.extendOwn(r, t), r
  }),
  (m.clone = function (n) {
    return m.isObject(n) ? (m.isArray(n) ? n.slice() : m.extend({}, n)) : n
  }),
  (m.tap = function (n, t) {
    return t(n), n
  }),
  (m.isMatch = function (n, t) {
    const r = m.keys(t)
    const e = r.length
    if (n == null) return !e
    for (let u = Object(n), i = 0; e > i; i++) {
      const o = r[i]
      if (t[o] !== u[o] || !(o in u)) return !1
    }
    return !0
  })
  const N = function (n, t, r, e) {
    if (n === t) return n !== 0 || 1 / n === 1 / t
    if (n == null || t == null) return n === t
    n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped)
    const u = s.call(n)
    if (u !== s.call(t)) return !1
    switch (u) {
      case '[object RegExp]':
      case '[object String]':
        return '' + n == '' + t
      case '[object Number]':
        return +n !== +n ? +t !== +t : +n === 0 ? 1 / +n === 1 / t : +n === +t
      case '[object Date]':
      case '[object Boolean]':
        return +n === +t
    }
    const i = u === '[object Array]'
    if (!i) {
      if (typeof n !== 'object' || typeof t !== 'object') return !1
      const o = n.constructor
      const a = t.constructor
      if (
        o !== a &&
        !(
          m.isFunction(o) &&
          o instanceof o &&
          m.isFunction(a) &&
          a instanceof a
        ) &&
        'constructor' in n &&
        'constructor' in t
      ) {
        return !1
      }
    }
    (r = r || []), (e = e || [])
    for (var c = r.length; c--;) if (r[c] === n) return e[c] === t
    if ((r.push(n), e.push(t), i)) {
      if (((c = n.length), c !== t.length)) return !1
      for (; c--;) if (!N(n[c], t[c], r, e)) return !1
    } else {
      let f
      const l = m.keys(n)
      if (((c = l.length), m.keys(t).length !== c)) return !1
      for (; c--;) {
        if (((f = l[c]), !m.has(t, f) || !N(n[f], t[f], r, e))) return !1
      }
    }
    return r.pop(), e.pop(), !0
  };
  (m.isEqual = function (n, t) {
    return N(n, t)
  }),
  (m.isEmpty = function (n) {
    return n == null
      ? !0
      : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n))
        ? n.length === 0
        : m.keys(n).length === 0
  }),
  (m.isElement = function (n) {
    return !(!n || n.nodeType !== 1)
  }),
  (m.isArray =
      h ||
      function (n) {
        return s.call(n) === '[object Array]'
      }),
  (m.isObject = function (n) {
    const t = typeof n
    return t === 'function' || (t === 'object' && !!n)
  }),
  m.each(
    ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'],
    function (n) {
      m['is' + n] = function (t) {
        return s.call(t) === '[object ' + n + ']'
      }
    }
  ),
  m.isArguments(arguments) ||
      (m.isArguments = function (n) {
        return m.has(n, 'callee')
      }),
  typeof /./ !== 'function' &&
      typeof Int8Array !== 'object' &&
      (m.isFunction = function (n) {
        return typeof n === 'function' || !1
      }),
  (m.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n))
  }),
  (m.isNaN = function (n) {
    return m.isNumber(n) && n !== +n
  }),
  (m.isBoolean = function (n) {
    return n === !0 || n === !1 || s.call(n) === '[object Boolean]'
  }),
  (m.isNull = function (n) {
    return n === null
  }),
  (m.isUndefined = function (n) {
    return void 0 === n
  }),
  (m.has = function (n, t) {
    return n != null && p.call(n, t)
  }),
  (m.noConflict = function () {
    return (u._ = i), this
  }),
  (m.identity = function (n) {
    return n
  }),
  (m.constant = function (n) {
    return function () {
      return n
    }
  }),
  (m.noop = function () {}),
  (m.property = w),
  (m.propertyOf = function (n) {
    return n == null
      ? function () {}
      : function (t) {
        return n[t]
      }
  }),
  (m.matcher = m.matches =
      function (n) {
        return (
          (n = m.extendOwn({}, n)),
          function (t) {
            return m.isMatch(t, n)
          }
        )
      }),
  (m.times = function (n, t, r) {
    const e = Array(Math.max(0, n))
    t = b(t, r, 1)
    for (let u = 0; n > u; u++) e[u] = t(u)
    return e
  }),
  (m.random = function (n, t) {
    return (
      t == null && ((t = n), (n = 0)),
      n + Math.floor(Math.random() * (t - n + 1))
    )
  }),
  (m.now =
      Date.now ||
      function () {
        return new Date().getTime()
      })
  const B = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  }
  const T = m.invert(B)
  const R = function (n) {
    const t = function (t) {
      return n[t]
    }
    const r = '(?:' + m.keys(n).join('|') + ')'
    const e = RegExp(r)
    const u = RegExp(r, 'g')
    return function (n) {
      return (n = n == null ? '' : '' + n), e.test(n) ? n.replace(u, t) : n
    }
  };
  (m.escape = R(B)),
  (m.unescape = R(T)),
  (m.result = function (n, t, r) {
    let e = n == null ? void 0 : n[t]
    return void 0 === e && (e = r), m.isFunction(e) ? e.call(n) : e
  })
  let q = 0;
  (m.uniqueId = function (n) {
    const t = ++q + ''
    return n ? n + t : t
  }),
  (m.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  })
  const K = /(.)^/
  const z = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  }
  const D = /\\|'|\r|\n|\u2028|\u2029/g
  const L = function (n) {
    return '\\' + z[n]
  };
  (m.template = function (n, t, r) {
    !t && r && (t = r), (t = m.defaults({}, t, m.templateSettings))
    const e = RegExp(
      [
        (t.escape || K).source,
        (t.interpolate || K).source,
        (t.evaluate || K).source
      ].join('|') + '|$',
      'g'
    )
    let u = 0
    let i = "__p+='"
    n.replace(e, function (t, r, e, o, a) {
      return (
        (i += n.slice(u, a).replace(D, L)),
        (u = a + t.length),
        r
          ? (i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'")
          : e
            ? (i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'")
            : o && (i += "';\n" + o + "\n__p+='"),
        t
      )
    }),
    (i += "';\n"),
    t.variable || (i = 'with(obj||{}){\n' + i + '}\n'),
    (i =
        "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
        i +
        'return __p;\n')
    try {
      var o = new Function(t.variable || 'obj', '_', i)
    } catch (a) {
      throw ((a.source = i), a)
    }
    const c = function (n) {
      return o.call(this, n, m)
    }
    const f = t.variable || 'obj'
    return (c.source = 'function(' + f + '){\n' + i + '}'), c
  }),
  (m.chain = function (n) {
    const t = m(n)
    return (t._chain = !0), t
  })
  const P = function (n, t) {
    return n._chain ? m(t).chain() : t
  };
  (m.mixin = function (n) {
    m.each(m.functions(n), function (t) {
      const r = (m[t] = n[t])
      m.prototype[t] = function () {
        const n = [this._wrapped]
        return f.apply(n, arguments), P(this, r.apply(m, n))
      }
    })
  }),
  m.mixin(m),
  m.each(
    ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'],
    function (n) {
      const t = o[n]
      m.prototype[n] = function () {
        const r = this._wrapped
        return (
          t.apply(r, arguments),
          (n !== 'shift' && n !== 'splice') || r.length !== 0 || delete r[0],
          P(this, r)
        )
      }
    }
  ),
  m.each(['concat', 'join', 'slice'], function (n) {
    const t = o[n]
    m.prototype[n] = function () {
      return P(this, t.apply(this._wrapped, arguments))
    }
  }),
  (m.prototype.value = function () {
    return this._wrapped
  }),
  (m.prototype.valueOf = m.prototype.toJSON = m.prototype.value),
  (m.prototype.toString = function () {
    return '' + this._wrapped
  }),
  typeof define === 'function' &&
      define.amd &&
      define('underscore', [], function () {
        return m
      })
}.call(this))
