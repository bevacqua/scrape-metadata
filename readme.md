# `scrape-metadata`

> HTML metadata scraper

# install

```shell
npm install --save scrape-metadata
```

# usage

```js
const scrape = require('scrape-metadata')
scrape('https://google.com', (err, meta) => {
  console.log(meta)
})
```

# api

`scrape(url, options?, done)`

- `url` is the URL of the page you want to scrape metadata from
- `options` is optional, passed to `request`
- `done` is a callback with an `(err, meta)` signature

# license

mit
