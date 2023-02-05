self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
      ? self
      : {}
const Prism = (function () {
  const e = /\blang(?:uage)?-(?!\*)(\w+)\b/i
  var t = (self.Prism = {
    util: {
      encode: function (e) {
        return e instanceof n
          ? new n(e.type, t.util.encode(e.content), e.alias)
          : t.util.type(e) === 'Array'
            ? e.map(t.util.encode)
            : e
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
      },
      clone: function (e) {
        const n = t.util.type(e)
        switch (n) {
          case 'Object':
            var a = {}
            for (const i in e) {
              e.hasOwnProperty(i) && (a[i] = t.util.clone(e[i]))
            }
            return a
          case 'Array':
            return e.map(function (e) {
              return t.util.clone(e)
            })
        }
        return e
      }
    },
    languages: {
      extend: function (e, n) {
        const a = t.util.clone(t.languages[e])
        for (const i in n) a[i] = n[i]
        return a
      },
      insertBefore: function (e, n, a, i) {
        i = i || t.languages
        const r = i[e]
        if (arguments.length == 2) {
          a = arguments[1]
          for (var s in a) a.hasOwnProperty(s) && (r[s] = a[s])
          return r
        }
        const o = {}
        for (const l in r) {
          if (r.hasOwnProperty(l)) {
            if (l == n) for (var s in a) a.hasOwnProperty(s) && (o[s] = a[s])
            o[l] = r[l]
          }
        }
        return (
          t.languages.DFS(t.languages, function (t, n) {
            n === i[e] && t != e && (this[t] = o)
          }),
          (i[e] = o)
        )
      },
      DFS: function (e, n, a) {
        for (const i in e) {
          e.hasOwnProperty(i) &&
            (n.call(e, i, e[i], a || i),
            t.util.type(e[i]) === 'Object'
              ? t.languages.DFS(e[i], n)
              : t.util.type(e[i]) === 'Array' && t.languages.DFS(e[i], n, i))
        }
      }
    },
    highlightAll: function (e, n) {
      for (
        var a,
          i = document.querySelectorAll(
            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          ),
          r = 0;
        (a = i[r++]);

      ) {
        t.highlightElement(a, e === !0, n)
      }
    },
    highlightElement: function (a, i, r) {
      for (var s, o, l = a; l && !e.test(l.className);) l = l.parentNode
      if (
        (l && ((s = (l.className.match(e) || [, ''])[1]), (o = t.languages[s])),
        o)
      ) {
        (a.className =
          a.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + s),
        (l = a.parentNode),
        /pre/i.test(l.nodeName) &&
            (l.className =
              l.className.replace(e, '').replace(/\s+/g, ' ') +
              ' language-' +
              s)
        let u = a.textContent
        if (u) {
          u = u.replace(/^(?:\r?\n|\r)/, '')
          const c = { element: a, language: s, grammar: o, code: u }
          if ((t.hooks.run('before-highlight', c), i && self.Worker)) {
            const p = new Worker(t.filename);
            (p.onmessage = function (e) {
              (c.highlightedCode = n.stringify(JSON.parse(e.data), s)),
              t.hooks.run('before-insert', c),
              (c.element.innerHTML = c.highlightedCode),
              r && r.call(c.element),
              t.hooks.run('after-highlight', c)
            }),
            p.postMessage(
              JSON.stringify({ language: c.language, code: c.code })
            )
          } else {
            (c.highlightedCode = t.highlight(c.code, c.grammar, c.language)),
            t.hooks.run('before-insert', c),
            (c.element.innerHTML = c.highlightedCode),
            r && r.call(a),
            t.hooks.run('after-highlight', c)
          }
        }
      }
    },
    highlight: function (e, a, i) {
      const r = t.tokenize(e, a)
      return n.stringify(t.util.encode(r), i)
    },
    tokenize: function (e, n) {
      const a = t.Token
      const i = [e]
      const r = n.rest
      if (r) {
        for (var s in r) n[s] = r[s]
        delete n.rest
      }
      e: for (var s in n) {
        if (n.hasOwnProperty(s) && n[s]) {
          let o = n[s]
          o = t.util.type(o) === 'Array' ? o : [o]
          for (let l = 0; l < o.length; ++l) {
            let u = o[l]
            const c = u.inside
            const p = !!u.lookbehind
            let g = 0
            const d = u.alias
            u = u.pattern || u
            for (let f = 0; f < i.length; f++) {
              const m = i[f]
              if (i.length > e.length) break e
              if (!(m instanceof a)) {
                u.lastIndex = 0
                var h = u.exec(m)
                if (h) {
                  p && (g = h[1].length)
                  const b = h.index - 1 + g
                  var h = h[0].slice(g)
                  const w = h.length
                  const y = b + w
                  const k = m.slice(0, b + 1)
                  const P = m.slice(y + 1)
                  const v = [f, 1]
                  k && v.push(k)
                  const _ = new a(s, c ? t.tokenize(h, c) : h, d)
                  v.push(_), P && v.push(P), Array.prototype.splice.apply(i, v)
                }
              }
            }
          }
        }
      }
      return i
    },
    hooks: {
      all: {},
      add: function (e, n) {
        const a = t.hooks.all;
        (a[e] = a[e] || []), a[e].push(n)
      },
      run: function (e, n) {
        const a = t.hooks.all[e]
        if (a && a.length) for (var i, r = 0; (i = a[r++]);) i(n)
      }
    }
  })
  var n = (t.Token = function (e, t, n) {
    (this.type = e), (this.content = t), (this.alias = n)
  })
  if (
    ((n.stringify = function (e, a, i) {
      if (typeof e === 'string') return e
      if (t.util.type(e) === 'Array') {
        return e
          .map(function (t) {
            return n.stringify(t, a, e)
          })
          .join('')
      }
      const r = {
        type: e.type,
        content: n.stringify(e.content, a, i),
        tag: 'span',
        classes: ['token', e.type],
        attributes: {},
        language: a,
        parent: i
      }
      if (
        (r.type == 'comment' && (r.attributes.spellcheck = 'true'), e.alias)
      ) {
        const s = t.util.type(e.alias) === 'Array' ? e.alias : [e.alias]
        Array.prototype.push.apply(r.classes, s)
      }
      t.hooks.run('wrap', r)
      let o = ''
      for (const l in r.attributes) { o += l + '="' + (r.attributes[l] || '') + '"' }
      return (
        '<' +
        r.tag +
        ' class="' +
        r.classes.join(' ') +
        '" ' +
        o +
        '>' +
        r.content +
        '</' +
        r.tag +
        '>'
      )
    }),
    !self.document)
  ) {
    return self.addEventListener
      ? (self.addEventListener(
          'message',
          function (e) {
            const n = JSON.parse(e.data)
            const a = n.language
            const i = n.code
            self.postMessage(
              JSON.stringify(t.util.encode(t.tokenize(i, t.languages[a])))
            ),
            self.close()
          },
          !1
        ),
        self.Prism)
      : self.Prism
  }
  let a = document.getElementsByTagName('script')
  return (
    (a = a[a.length - 1]),
    a &&
      ((t.filename = a.src),
      document.addEventListener &&
        !a.hasAttribute('data-manual') &&
        document.addEventListener('DOMContentLoaded', t.highlightAll)),
    self.Prism
  )
})()
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
(Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern:
        /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[\w:-]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[\w-]+?:/ }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
        inside: { punctuation: /=|>|"/ }
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[\w:-]+/, inside: { namespace: /^[\w-]+?:/ } }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}),
Prism.hooks.add('wrap', function (e) {
  e.type === 'entity' &&
      (e.attributes.title = e.content.replace(/&amp;/, '&'))
}),
(Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
    inside: { punctuation: /[;:]/ }
  },
  url: /url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/,
  string: /("|')(\\\n|\\?.)*?\1/,
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  punctuation: /[\{\};:]/,
  function: /[-a-z0-9]+(?=\()/i
}),
Prism.languages.markup &&
    (Prism.languages.insertBefore('markup', 'tag', {
      style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
        inside: {
          tag: {
            pattern: /<style[\w\W]*?>|<\/style>/i,
            inside: Prism.languages.markup.tag.inside
          },
          rest: Prism.languages.css
        },
        alias: 'language-css'
      }
    }),
    Prism.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|').*?\1/i,
          inside: {
            'attr-name': {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: Prism.languages.css }
          },
          alias: 'language-css'
        }
      },
      Prism.languages.markup.tag
    )),
(Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
  ],
  string: /("|')(\\\n|\\?.)*?\1/,
  'class-name': {
    pattern:
        /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /(\.|\\)/ }
  },
  keyword:
      /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(true|false)\b/,
  function: { pattern: /[a-z0-9_]+\(/i, inside: { punctuation: /\(/ } },
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
  ignore: /&(lt|gt|amp);/i,
  punctuation: /[{}[\];(),.:]/
}),
(Prism.languages.javascript = Prism.languages.extend('clike', {
  keyword:
      /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/,
  function: /(?!\d)[a-z0-9_$]+(?=\()/i
})),
Prism.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern:
        /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: !0
  }
}),
Prism.languages.markup &&
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
        inside: {
          tag: {
            pattern: /<script[\w\W]*?>|<\/script>/i,
            inside: Prism.languages.markup.tag.inside
          },
          rest: Prism.languages.javascript
        },
        alias: 'language-javascript'
      }
    }),
(Prism.languages.css.selector = {
  pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
  inside: {
    'pseudo-element':
        /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+(?:\(.*\))?/,
    class: /\.[-:\.\w]+/,
    id: /#[-:\.\w]+/
  }
}),
Prism.languages.insertBefore('css', 'function', {
  hexcode: /#[\da-f]{3,6}/i,
  entity: /\\[\da-f]{1,8}/i,
  number: /[\d%\.]+/
}),
(Prism.languages.php = Prism.languages.extend('clike', {
  keyword:
      /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/,
    lookbehind: !0
  }
})),
Prism.languages.insertBefore('php', 'class-name', {
  'shell-comment': {
    pattern: /(^|[^\\])#.*?(\r?\n|$)/,
    lookbehind: !0,
    alias: 'comment'
  }
}),
Prism.languages.insertBefore('php', 'keyword', {
  delimiter: /(\?>|<\?php|<\?)/i,
  variable: /(\$\w+)\b/i,
  package: {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
    lookbehind: !0,
    inside: { punctuation: /\\/ }
  }
}),
Prism.languages.insertBefore('php', 'operator', {
  property: { pattern: /(->)[\w]+/, lookbehind: !0 }
}),
Prism.languages.markup &&
    (Prism.hooks.add('before-highlight', function (e) {
      e.language === 'php' &&
        ((e.tokenStack = []),
        (e.backupCode = e.code),
        (e.code = e.code.replace(
          /(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,
          function (t) {
            return e.tokenStack.push(t), '{{{PHP' + e.tokenStack.length + '}}}'
          }
        )))
    }),
    Prism.hooks.add('before-insert', function (e) {
      e.language === 'php' && ((e.code = e.backupCode), delete e.backupCode)
    }),
    Prism.hooks.add('after-highlight', function (e) {
      if (e.language === 'php') {
        for (var t, n = 0; (t = e.tokenStack[n]); n++) {
          e.highlightedCode = e.highlightedCode.replace(
            '{{{PHP' + (n + 1) + '}}}',
            Prism.highlight(t, e.grammar, 'php')
          )
        }
        e.element.innerHTML = e.highlightedCode
      }
    }),
    Prism.hooks.add('wrap', function (e) {
      e.language === 'php' &&
        e.type === 'markup' &&
        (e.content = e.content.replace(
          /(\{\{\{PHP[0-9]+\}\}\})/g,
          '<span class="token php">$1</span>'
        ))
    }),
    Prism.languages.insertBefore('php', 'comment', {
      markup: { pattern: /<[^?]\/?(.*?)>/, inside: Prism.languages.markup },
      php: /\{\{\{PHP[0-9]+\}\}\}/
    })),
Prism.languages.insertBefore('php', 'variable', {
  this: /\$this/,
  global:
      /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
  scope: {
    pattern: /\b[\w\\]+::/,
    inside: { keyword: /(static|self|parent)/, punctuation: /(::|\\)/ }
  }
}),
(Prism.languages.scss = Prism.languages.extend('css', {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/,
    lookbehind: !0
  },
  atrule: /@[\w-]+(?=\s+(\(|\{|;))/i,
  url: /([-a-z]+-)*url(?=\()/i,
  selector:
      /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m
})),
Prism.languages.insertBefore('scss', 'atrule', {
  keyword:
      /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}),
Prism.languages.insertBefore('scss', 'property', {
  variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}),
Prism.languages.insertBefore('scss', 'function', {
  placeholder: /%[-_\w]+/i,
  statement: /\B!(default|optional)\b/i,
  boolean: /\b(true|false)\b/,
  null: /\b(null)\b/,
  operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/
}),
(Prism.languages.swift = Prism.languages.extend('clike', {
  keyword:
      /\b(as|associativity|break|case|class|continue|convenience|default|deinit|didSet|do|dynamicType|else|enum|extension|fallthrough|final|for|func|get|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|required|return|right|safe|self|Self|set|static|struct|subscript|super|switch|Type|typealias|unowned|unowned|unsafe|var|weak|where|while|willSet|__COLUMN__|__FILE__|__FUNCTION__|__LINE__)\b/,
  number:
      /\b([\d_]+(\.[\de_]+)?|0x[a-f0-9_]+(\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  constant: /\b(nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  atrule:
      /@\b(IBOutlet|IBDesignable|IBAction|IBInspectable|class_protocol|exported|noreturn|NSCopying|NSManaged|objc|UIApplicationMain|auto_closure)\b/,
  builtin:
      /\b([A-Z]\S+|abs|advance|alignof|alignofValue|assert|contains|count|countElements|debugPrint|debugPrintln|distance|dropFirst|dropLast|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lazy|lexicographicalCompare|map|max|maxElement|min|minElement|numericCast|overlaps|partition|prefix|print|println|reduce|reflect|reverse|sizeof|sizeofValue|sort|sorted|split|startsWith|stride|strideof|strideofValue|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|withExtendedLifetime|withUnsafeMutablePointer|withUnsafeMutablePointers|withUnsafePointer|withUnsafePointers|withVaList)\b/
})),
(Prism.languages.yaml = {
  scalar: {
    pattern:
        /([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:(\n[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,
    lookbehind: !0,
    alias: 'string'
  },
  comment: /#[^\n]+/,
  key: {
    pattern: /(\s*[:\-,[{\n?][ \t]*(![^\s]+)?[ \t]*)[^\n{[\]},#]+?(?=\s*:\s)/,
    lookbehind: !0,
    alias: 'atrule'
  },
  directive: {
    pattern: /((^|\n)[ \t]*)%[^\n]+/,
    lookbehind: !0,
    alias: 'important'
  },
  datetime: {
    pattern:
        /([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*(\n|$|,|]|}))/,
    lookbehind: !0,
    alias: 'number'
  },
  boolean: {
    pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=\n|$|,|]|})/i,
    lookbehind: !0,
    alias: 'important'
  },
  null: {
    pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=\n|$|,|]|})/i,
    lookbehind: !0,
    alias: 'important'
  },
  string: {
    pattern:
        /([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')(?=[ \t]*(\n|$|,|]|}))/,
    lookbehind: !0
  },
  number: {
    pattern:
        /([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\dA-Fa-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=\n|$|,|]|})/i,
    lookbehind: !0
  },
  tag: /![^\s]+/,
  important: /[&*][\w]+/,
  punctuation: /([:[\]{}\-,|>?]|---|\.\.\.)/
})
