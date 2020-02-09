require('dotenv').config()
const Twit = require('twit')
const quotes = require('./backup/svetemysli.json')
const {shuffle} = require('./utils/helpers')

/* TODO:
- dodati cirilicu
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

function post() {
  const quote = msQuotes[++i % msQuotes.length]
  const status = `${quote.ms} 
— ${quote.author}`
  bot.post('statuses/update', {status}, (err, data) => {
    if (err) return console.error(err)
    console.log(data.text)
  })
}

function initBot() {
  console.log('initBot')
  post()
  setInterval(post, 0.1 * 60 * 60 * 1000) // hours * min * sec * ms
}

module.exports = {
  initBot,
}
