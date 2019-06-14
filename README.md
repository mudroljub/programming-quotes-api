# Programming Quotes API

**Programming Quotes API for open source projects.**

https://pqapi.herokuapp.com/

## API Endpoints

Quote model:

```json
{
  "_id": "5a6ce86e2af929789500e7e4",
  "en": "Computer Science is no more about computers than astronomy is about telescopes.",
  "sr": "Računarska nauka se tiče računara koliko i astronomija teleskopa.",
  "author": "Edsger W. Dijkstra",
  "source": ""
}
```

### Get all quotes

GET `/quotes`

### Post a new quote (user)

POST `/quotes`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language
- author name should be from Wikipedia

### Update a quote (admin)

PUT `/quotes`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)
- optional: `source` and other language

### Delete a quote (admin)

DELETE: `/quotes`
- required: `token` and `_id`

## Authentication

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

- add /random endpoint
- add pagination
- add voting
- save who added and last edited quote
