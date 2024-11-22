# Programming Quotes API

**Programming Quotes API for open source projects.**

Github repo: [github.com/mudroljub/programming-quotes-api](https://github.com/mudroljub/programming-quotes-api)

## API Documentation

### Public routes

GET [`/quotes`](/quotes) (get all quotes)

http://localhost:5000/quotes?page=1&numPerPage=10&author=Edsger%20W.%20Dijkstra
GET [`/quotes/page/2`](/quotes/page/2) (get quotes by page)

GET [`/quotes/random`](/quotes/random) (get random quote)

GET [`/quotes/id/5a6ce86f2af929789500e824`](/quotes/id/5a6ce86f2af929789500e824) (get quote by id)

### Protected routes

POST `/quotes/vote` (post vote)
- required params: `quoteId`, `newVote` (number from 1 to 5)

POST `/quotes` (post new quote)
- required params: `token`, `author`, `en`
- optional: `source`, `sr`
- author name should be from Wikipedia

PUT `/quotes` (update quote)
- required params: `token`, `id`, `author`, `en`
- optional: `source`, `sr`

DELETE: `/quotes`
- required params: `token`, `id`

### Authentication

GET `/auth/{provider}` (user login)
- suported providers: Github, Google
- opens login page

After successful login, user will be redirected to client app. The client app should handle token on this route: `#/auth/{provider}/${token}`.

GET `/auth/{provider}:token` (get user data)
- returns info on current user

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

## TODO

- Dokumentacija: Jasno opisujemo svrhu i parametre svake rute (OpenAPI/Swagger)
