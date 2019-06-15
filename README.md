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

## Authentication

### User login

GET `/auth/{provider}`
- suported providers: Github, Google
- opens login page

After successful login, user will be returned to the client app. The client app will get token in this format: `#/auth/{provider}/${token}`.

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

- dodati readme kao naslovnu
https://stackoverflow.com/questions/27971806/returning-rendered-markdown-with-express-and-marked
- add pagination
- add voting
- save who added and last edited quote
