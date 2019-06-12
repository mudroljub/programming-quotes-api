# Programming Quotes API

**Programming Quotes REST API for open source projects.**

https://baza-podataka.herokuapp.com

See client app: [Programming Quotes React app](https://github.com/skolakoda/programming-quotes).

## API endpoints

### Create

POST `/quotes`
- required: `token`, `author` and one language (`en` or `sr`)
- optional: `source` and other language

### Read

GET `/quotes`

### Update

PUT `/quotes`
- required: `token`, `_id`,`author` and one language (`en` or `sr`)

### Delete

DELETE: `/quotes`
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
- add voting