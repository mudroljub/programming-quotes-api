# Baza podataka

**Backend API for our open source projects. Technologies: Node.js and MongoDB.**

Also, see client: [Programming Quotes React app](https://github.com/skolakoda/programming-quotes).

## API endpoints

### Create

POST `https://baza-podataka.herokuapp.com/quotes/create/`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language

### Read

GET `https://baza-podataka.herokuapp.com/quotes/`

### Update

POST `https://baza-podataka.herokuapp.com/quotes/update/`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)

POST `https://baza-podataka.herokuapp.com/quotes/rate/`
- required: `_id` and `newRating`

### Delete

DELETE: `https://baza-podataka.herokuapp.com/quotes/delete/`
- required: `token` and `_id`


## Development

### Prerequisites

- Intall Node.js
- Set [environment variables](https://github.com/skolakoda/baza-podataka/wiki/Environment-variables)

### Start

```
npm i
npm start
```

### Deploy

Deploy will be done automatically after merge into master branch.

### TODO

- add /random endpoint
- add pagination