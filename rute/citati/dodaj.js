const Quote = require('../../models/quotes')
const Author = require('../../models/authors')

const dodajCitat = (req, res) => {
  const {sr, autor, izvor, en} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('Niste poslali obavezna polja.')
  Quote.find({$or: [{sr: sr}, {en: en}]})
    .then(quote => {
      if(quote.length) {
        throw new Error()
      }
      return Author.findOne({name: autor})
    })
    .then(author => {
      if(!author) {
        let author = new Author({name: autor})
        return author.save()
      } else {
        return author
      }
    })
    .then(author => {
      req.body.author = author._id
      let quote = new Quote(req.body)
      return quote.save()
    })
    .then(quote => {
      if(!quote) {
        return res.send('doslo je do greske')
      }
      res.send('uspesno sacuvano')
    })
    .catch(e => {
      res.send('greska')
    })
}

module.exports = dodajCitat
