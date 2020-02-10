const Twit = require('twit')
const quotes = require('./backup/svetemysli.json')
const {shuffle, getName} = require('./utils/helpers')
const {toCyrillic} = require('./utils/transliterate')

const twitLength = 280
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

function postQuote() {
  const quote = msQuotes[++i % msQuotes.length]
  const author = getName(quote.author)
  const text = `${quote.ms}
— ${author}
#medžuslovjansky`
  if (text.length > twitLength) return
  post(text)
  post(toCyrillic(text))
}

function initBot() {
  console.log('initBot')
  postQuote()
  setInterval(postQuote, 6 * 60 * 60 * 1000) // hours * min * sec * ms
}

module.exports = {
  initBot,
}
