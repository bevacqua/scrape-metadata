`use strict`

const url = require(`url`)
const request = require(`request`)
const htmlparser = require(`htmlparser2`)
const rhttp = /^https?:\/\//i
const whitelist = /charset|author|host|description|twitter:|og:|theme-color/im

function extract (endpoint, options, done) {
  if (!done) {
    done = options
    options = {}
  }
  options.url = endpoint

  const payload = { title: `` }
  const parser = createParser(options.url, payload)

  request(options, gotResponse)

  function gotResponse (err, res, body) {
    if (err) {
      done(err)
      return
    }

    const rdoublespaces = /\s{2,}|\n/img

    parser.write(body)
    payload.title = (payload.title || ``).replace(rdoublespaces, ``)
    payload.images = Array.from(payload.images || [])

    done(null, payload)
  }
}

function createParser (base, payload) {
  let inHead = false
  let tagName = null
  const events = { onopentag, ontext, onclosetag }
  const options = { decodeEntities: true }
  const parser = new htmlparser.Parser(events, options)
  return parser

  function onopentag (name, attrs) {
    tagName = name
    if (name === `head`) {
      inHead = true
    }
    if (name === `meta`) {
      const meta = parseMeta(attrs)
      if (meta) {
        const [key, value] = meta
        payload[key] = value
      }
    }
    if (name === `img`) {
      const src = attrs.src
      if (src && rhttp.test(src)) {
        if (!payload.images) {
          payload.images = new Set()
        }
        payload.images.add(url.resolve(base, src))
      }
    }
  }

  function ontext (text) {
    if (inHead && tagName === `title`) {
      payload.title += text
    }
  }

  function onclosetag (name) {
    if (name === `head`) {
      inHead = false
    }
  }
}

function parseMeta (attr) {
  const name = attr.name || attr.property || Object.keys(attr)[0]

  if (whitelist.test(name)) {
    return [
      camelCase(name),
      attr.content || attr[name]
    ]
  }
}

function camelCase (name) {
  const rseparator = /(?:\:|_)(\w)/g
  return name.replace(rseparator,
    (all, letter) => letter.toUpperCase()
  )
}

module.exports = extract
