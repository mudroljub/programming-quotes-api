# Programming Quotes API

**Programming Quotes API for open source projects.**

https://pqapi.herokuapp.com/

See client app: [Programming Quotes React app](https://github.com/skolakoda/programming-quotes).

## API endpoints

GET `/quotes`

POST `/quotes`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language

PUT `/quotes`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)

DELETE: `/quotes`
- required: `token` and `_id`

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
