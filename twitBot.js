const Twit = require('twit')
const quotes = require('./backup/quotes.json')
const {shuffle} = require('./utils/helpers')

const twitLength = 280
const srQuotes = quotes.filter(q => q.sr)
shuffle(srQuotes)

let i = 0

function post(status) {
  const bot = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  bot.post('statuses/update', {status}, (err, data) => {
    if (err) return console.error(err)
    console.log(data.text)
  })
}

function postQuote() {
  const quote = srQuotes[++i % srQuotes.length]
  const text = `${quote.sr}
— ${quote.author}`
  if (text.length > twitLength) return

  const tags = '\n#programiranje #citati'
  const fullText = (text + tags).length < twitLength ? text + tags : text
  post(fullText)
}

function initBot() {
  console.log('initBot')
  // postQuote()
  // setInterval(postQuote, 2 * 60 * 60 * 1000) // hours * min * sec * ms
}

module.exports = {
  initBot,
}
