# Programming Quotes API

**Programming Quotes API for open source projects.**

https://programming-quotes-api.herokuapp.com

```json
{
  "en": "Computer Science is no more about computers than astronomy is about telescopes.",
  "sr": "Računarska nauka se tiče računara koliko i astronomija teleskopa.",
  "author": "Edsger W. Dijkstra",
}
```

## API Endpoints

### Get all quotes

GET [`/quotes`](https://programming-quotes-api.herokuapp.com/quotes)

### Get a random quote

GET [`/quotes/random`](https://programming-quotes-api.herokuapp.com/quotes/random)

### Post a new quote (user)

POST `/quotes`
- required: `token`, `author` and `en`
- optional: `source` and `sr` language
- author name should be from Wikipedia

### Update a quote (admin)

PUT `/quotes`
- required: `token`, `_id`,`author` and `en`
- optional: `source` and `sr` language

### Delete a quote (admin)

DELETE: `/quotes`
- required: `token` and `_id`

## User Authentication

### Google login

GET `/auth/google`

- opens Google login page, and after success, redirects to client app

### Client URL

GET `${clientDomain}#/auth/google/${token}`

- the client app should handle token on this route after login

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

- add pagination
- add voting
- save who added and last edited quote
