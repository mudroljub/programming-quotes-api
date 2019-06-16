# Programming Quotes API

Programming Quotes API for open source projects. You are welcome to contribute!

Repo: [github.com/skolakoda/programming-quotes-api](https://github.com/skolakoda/programming-quotes-api)

Homepage: [programming-quotes-api.herokuapp.com](https://programming-quotes-api.herokuapp.com)

## API Documentation

Suported languages: en, sr.

```json
{
  "en": "Computer Science is no more about computers than astronomy is about telescopes.",
  "sr": "Računarska nauka se tiče računara koliko i astronomija teleskopa.",
  "author": "Edsger W. Dijkstra",
}
```

### Get all quotes

GET [`/quotes`](https://programming-quotes-api.herokuapp.com/quotes)

### Get quotes by language

GET [`/quotes/lang/en`](https://programming-quotes-api.herokuapp.com/quotes/lang/en)

### Get quotes by page

GET [`/quotes/page/2`](https://programming-quotes-api.herokuapp.com/quotes/page/2)

### Get random quote

GET [`/quotes/random`](https://programming-quotes-api.herokuapp.com/quotes/random)

### Get random quote by language

GET [`/quotes/random/lang/sr`](https://programming-quotes-api.herokuapp.com/quotes/random/lang/sr)

### Get quote by id

GET [`/quotes/id/5a6ce86f2af929789500e824`](https://programming-quotes-api.herokuapp.com/quotes/id/5a6ce86f2af929789500e824)

### Post vote

POST `/quotes/vote`
- required: `_id` and `newVote` (number from 1 to 5)

### Post quote (user)

POST `/quotes`
- required: `token`, `author` and `en`
- optional: `source` and `sr` language
- author name should be from Wikipedia

### Update quote (admin)

PUT `/quotes`
- required: `token`, `_id`,`author` and `en`
- optional: `source` and `sr` language

### Delete quote (admin)

DELETE: `/quotes`
- required: `token` and `_id`

## Authentication

### User login

GET `/auth/{provider}`
- suported providers: Github, Google
- opens login page

After successful login, user will be redirected to client app. The client app should handle token on this route: `#/auth/{provider}/${token}`.

### Get user data

GET `/auth/{provider}:token`
- returns info on current user

## Development

### Prerequisites

- Intall Node.js
- Set [environment variables](https://github.com/skolakoda/baza-podataka/wiki/Environment-variables)

### Start

```
npm i
npm run dev
```

### Deploy

Deploy will be done automatically after merge into master branch.

### TODO

- add voting
