const Quote = require('../../models/quotes')
const Author = require('../../models/authors')


const azurirajCitat = (req, res) => {
  const {id, sr, autor, izvor, en} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('Niste poslali obavezna polja.')
  Quote.findById(id)
    .then(quote => {
      console.log('trazi citat');
      if(!quote) {
        throw new Error()
      }
      req.newQuote = quote
      req.newQuote.sr = sr
      req.newQuote.en = en
      req.newQuote.izvor = izvor
      return Author.findOne({name: autor})
    })
    .then(author => {
      console.log('trazi autora');
      if(!author) {
        let author = new Author({name: autor})
        return author.save()
      }
      return author
    })
    .then(author => {
      req.newQuote.author = author._id
      console.log('sasa', req.newQuote)
      return req.newQuote.save()
    })
    .then(newQuote => {
      res.send(newQuote)
    })
    .catch(e => {
      console.log(e);
      res.send('greska')
    })
}

module.exports = azurirajCitat
