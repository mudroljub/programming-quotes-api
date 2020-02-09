const Twit = require('twit')
const quotes = require('./backup/svetemysli.json')
const {shuffle} = require('./utils/helpers')
const {toCyrillic} = require('./utils/transliterate')

/* TODO:
- ms imena autora
*/

const msQuotes = quotes.filter(q => q.ms)
shuffle(msQuotes)

let i = 0

const bot = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

function post(status) {
  bot.post('statuses/update', {status}, (err, data) => {
    if (err) return console.error(err)
    console.log(data.text)
  })
}

function twitQuote() {
  const quote = msQuotes[++i % msQuotes.length]
  const text = `${quote.ms} 
  — ${quote.author}`
  post(text)
  post(toCyrillic(text))
}

function initBot() {
  twitQuote()
  setInterval(twitQuote, 6 * 60 * 60 * 1000) // hours * min * sec * ms
}

module.exports = {
  initBot,
}
