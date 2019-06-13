# Programming Quotes API

**Programming Quotes API for open source projects.**

https://pqapi.herokuapp.com/

See client app: [Programming Quotes React app](https://github.com/skolakoda/programming-quotes).

## Documentation

### Quote model

```json
{
  "_id": "5a6ce86e2af929789500e7e4",
  "en": "Computer Science is no more about computers than astronomy is about telescopes.",
  "sr": "Računarska nauka se tiče računara koliko i astronomija teleskopa.",
  "author": "Edsger W. Dijkstra",
  "source": null
}
```

### API endpoints

GET `/quotes`

POST `/quotes`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language
- author name should be from Wikipedia
- user must be logged in

PUT `/quotes`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)
- user must be admin

DELETE: `/quotes`
- required: `token` and `_id`
- user must be admin

### User authentication

GET `/auth/google`
takes user to the Gmail login, and after success, redirects to

GET `/auth/google/${token}`
where client app should handle token

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
