# Baza podataka

**Backend API and database for our open projects. Technologies: Node.js and MongoDB.**

For client see: [Programming Quotes React app](https://github.com/skolakoda/programming-quotes).

## Prerequisites

- Intall Node.js
- Github account
- Set [environment variables](https://github.com/skolakoda/baza-podataka/wiki/Environment-variables)

## Start

```
npm i
npm start
```

## Deploy

Deploy will be done automatically after merge into master branch.

## API endpoints
### Read

GET `https://baza-podataka.herokuapp.com/quotes/`

### Create

POST `https://baza-podataka.herokuapp.com/quotes/create/`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language

### Update

POST `https://baza-podataka.herokuapp.com/quotes/update/`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)

### Delete

DELETE: `https://baza-podataka.herokuapp.com/quotes/delete/`
- required: `token` and `_id`

### Rate

POST `https://baza-podataka.herokuapp.com/quotes/rate/`
- required: `_id` and `newRating`
