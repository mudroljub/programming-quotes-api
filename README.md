# Programming Quotes API

**Programming Quotes API for open source projects.**

Github repo: [github.com/mudroljub/programming-quotes-api](https://github.com/mudroljub/programming-quotes-api)

## API Documentation

### Public routes

GET [`/quotes/random`](/quotes/random) (get random quote)

GET [`/quotes`](/quotes) (get all quotes)

GET [`/quotes?page=1&quotesPerPage=20`](/quotes?page=1&quotesPerPage=20) (get quotes with params: `page`, `quotesPerPage`, `author`)

GET [`/quotes/5a6ce86f2af929789500e824`](/quotes/5a6ce86f2af929789500e824) (get quote by id)

### Protected routes

The following routes are protected and depend on the user's privilege. You can only vote for a quote with a newly created user.

POST `/quotes` (post new quote)
- required params: `author`, `text` (should be sent in json body)
- optional: `source`
- author name should be from Wikipedia

PUT `/quotes/5a6ce86f2af929789500e824` (update values)
- params: `author`, `text` or `source`

POST `/quotes/vote` (vote for quote)
- required params: `quoteId`, `newVote` (number from 1 to 5)

DELETE: `/quotes/5a6ce86f2af929789500e824`

### Authentication

GET `/auth/token` (logs in or registers user)
- required params: `email`, `password`
- returns `token`

For all subsequent requests, the token should be sent in the Authorization header:

```
Authorization: Bearer <token>
```

## Development

### Prerequisites

- Install Node.js
- Set environment variables

### Setup database

Import json file into local MongoDB database (replace with real values):

```
mongoimport --db quotes --collection quotes --file quotes.json --jsonArray --username quotes --password quotes
```

### Env variables

Create `.env` file proper values:

```
# Database credentials (obtain from MongoDB)
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_DOMAIN=

# whatever random string you like
JWT_SECRET=

# use development for local testing
NODE_ENV=development 
```

### Start

```
npm i
npm run dev
```
