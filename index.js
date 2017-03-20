`use strict`

const url = require(`url`)
const request = require(`request`)
const htmlparser = require(`htmlparser2`)
const rhttp = /^https?:\/\//i
const whitelist = /(^(charset|author|host|description|theme-color)$)|(^(twitter:|og:))/im

function extract (endpoint, options, done) {
  if (!done) {
    done = options
    options = {}
  }
  options.url = endpoint

  request(options, gotResponse)

  function gotResponse (err, res, body) {
    if (err) {
      done(err)
      return
    }

    done(null, parse(body, { endpoint }))
  }
}

function parse (body, { endpoint }) {
  const rdoublespaces = /\s{2,}|\n/img
  const events = { onopentag, ontext, onclosetag }
  const parserConfig = { decodeEntities: true }
  const parser = new htmlparser.Parser(events, parserConfig)
  const ogImages = []
  const payload = {}
  let inHead = false
  let tagName = null

  parser.write(body)

  payload.title = (payload.title || ``).replace(rdoublespaces, ``)
  payload.images = (
    ogImages.length
      ? ogImages
      : Array.from(payload.images || [])
  )
    .map(src => url.resolve(endpoint, src))

  return payload

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

        if (key === `ogImage`) {
          ogImages.push(value)
        }
      }
    }
    if (name === `img`) {
      const src = attrs.src
      if (src && rhttp.test(src)) {
        if (!payload.images) {
          payload.images = new Set()
        }
        payload.images.add(src)
      }
    }
  }

  function ontext (text) {
    if (inHead && tagName === `title`) {
      payload.title = (payload.title || ``) + text
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
  const rseparator = /(?:[:_-])(\w)/g
  return name.replace(rseparator,
    (all, letter) => letter.toUpperCase()
  )
}

module.exports = extract
