const scrape = require(`./`)

scrape(`http://www.newyorker.com`, (err, meta) =>
  console.log(err, meta)
)

scrape(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, (err, meta) =>
  console.log(err, meta)
)

scrape(`http://www.w3.org/TR/html4/index/list.html`, (err, meta) =>
  console.log(err, meta)
)

scrape(`https://medium.freecodecamp.com/functional-setstate-is-the-future-of-react-374f30401b6b`, (err, meta) =>
  console.log(err, meta)
)

scrape(`https://ponyfoo.com`, (err, meta) =>
  console.log(err, meta)
)
