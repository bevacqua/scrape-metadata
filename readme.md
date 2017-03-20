# `scrape-metadata`

> HTML metadata scraper

# install

```shell
npm install --save scrape-metadata
```

# usage

```js
const scrape = require('scrape-metadata')
scrape('https://ponyfoo.com', (err, meta) => {
  console.log(meta)
})
```

# example response

Here's what an example response might look like in a website heavily decorated with metadata. Note that by default `images` will contain every image on an HTML page. When `og:image` tags are present, the `images` list will be replaced with their contents.

```json
{
  "charset": "utf-8",
  "title": "Pony Foo — JavaScript consulting, modularity, front-end architecture, performance, and more. Authored by Nicolás Bevacqua",
  "themeColor": "#e92c6c",
  "twitterWidgetsLinkColor": "#e92c6c",
  "author": "Nicolás Bevacqua <nico@ponyfoo.com>",
  "description": "Pony Foo is a technical blog maintained by Nicolás Bevacqua, where he shares his thoughts on JavaScript and the web. Nico likes writing, public speaking, and open-source.",
  "ogSiteName": "Pony Foo",
  "ogUrl": "https://ponyfoo.com/",
  "twitterTitle": "Pony Foo — JavaScript consulting, modularity, front-end architecture, performance, and more. Authored by Nicolás Bevacqua",
  "twitterDescription": "Pony Foo is a technical blog maintained by Nicolás Bevacqua, where he shares his thoughts on JavaScript and the web. Nico likes writing, public speaking, and open-source.",
  "twitterCard": "summary_large_image",
  "twitterSite": "@ponyfoo",
  "twitterCreator": "@nzgb",
  "twitterWidgetsCsp": "on",
  "twitterWidgetsDnt": "on",
  "ogImage": "https://ponyfoo.com/img/banners/branded.9d42b711.png",
  "twitterImageSrc": "https://ponyfoo.com/img/banners/branded.9d42b711.png",
  "images": [
    "https://i.imgur.com/GKoh78o.jpg",
    "https://i.imgur.com/TjJ7TAS.jpg",
    "https://i.imgur.com/wWiTEO4.jpg",
    "https://lh5.googleusercontent.com/FekVGkoPt2gq8VzN5XLarr93psyFuI-_O0bUwJWZVLh9gzQiOJaXavUPuroyMjoPFRfmveefETIbMADUX3R_5Ij7_HIH7xxXj70L6M0CTbVGEjbVSkbYX7RwabOuESpPEFyJY-Br",
    "https://i.imgur.com/J2MHHUM.jpg",
    "https://i.imgur.com/URl6zyr.jpg",
    "https://i.imgur.com/BFQAdJy.jpg",
    "https://i.imgur.com/QnzjRhT.png",
    "https://i.imgur.com/ZpyYMV1.png",
    "https://i.imgur.com/fFN8WA5.jpg",
    "https://i.imgur.com/saRiGkb.png",
    "https://i.imgur.com/2vRXFlf.png",
    "https://i.imgur.com/E0TZnJW.jpg",
    "https://i.imgur.com/wmv3GRL.jpg",
    "https://i.imgur.com/mh3JG2O.jpg",
    "https://i.imgur.com/8snMhDu.png",
    "https://i.imgur.com/mc5wsXD.jpg",
    "https://i.imgur.com/OCD5AJB.png",
    "https://i.imgur.com/0yANQiP.png",
    "https://i.imgur.com/lw9x3Dz.jpg",
    "https://dl.dropboxusercontent.com/u/909725/SW/background-sync-logo.jpg",
    "https://i.imgur.com/0kiHzgx.png",
    "https://i.imgur.com/VW7FAUH.png",
    "https://i.imgur.com/2nevyPE.png",
    "https://i.imgur.com/lrg9mQr.jpg",
    "https://i.imgur.com/6lNsZrT.jpg",
    "https://i.imgur.com/Hsx9pWl.jpg",
    "https://i.imgur.com/N2zPQ2q.jpg",
    "https://i.imgur.com/yKJ7sXD.png",
    "https://i.imgur.com/NydsbSG.png",
    "https://i.imgur.com/MW4oAaz.jpg",
    "https://i.imgur.com/ly0xhbt.png",
    "https://i.imgur.com/aliSqdF.png",
    "https://i.imgur.com/m346jQz.png",
    "https://i.imgur.com/g0FSmfB.jpg",
    "https://i.imgur.com/gJJdfyS.jpg",
    "https://i.imgur.com/4obNc9t.jpg",
    "https://i.imgur.com/ArxlARC.png",
    "https://i.imgur.com/o8Iibqx.jpg",
    "https://ponyfoo.com/img/banners/branded.9d42b711.png"
  ]
}
```

# api

`scrape(url, options?, done)`

- `url` is the URL of the page you want to scrape metadata from
- `options` is optional, passed to `request`
- `done` is a callback with an `(err, meta)` signature

# license

mit
