# Programming Quotes API

**Programming Quotes API for open source projects.**

Homepage: [programming-quotes-api.herokuapp.com](https://programming-quotes-api.herokuapp.com)

Github repo: [github.com/skolakoda/programming-quotes-api](https://github.com/skolakoda/programming-quotes-api)

Client app: [skolakoda.org/programming-quotes](https://skolakoda.org/programming-quotes/)

## API Documentation

Suported languages: en, sr.

### Public routes

GET [`/quotes`](https://programming-quotes-api.herokuapp.com/quotes) (get all quotes)

GET [`/quotes/lang/en`](https://programming-quotes-api.herokuapp.com/quotes/lang/en) (get quotes by language)

GET [`/quotes/page/2`](https://programming-quotes-api.herokuapp.com/quotes/page/2) (get quotes by page)

GET [`/quotes/random`](https://programming-quotes-api.herokuapp.com/quotes/random) (get random quote)

GET [`/quotes/random/lang/sr`](https://programming-quotes-api.herokuapp.com/quotes/random/lang/sr) (get random quote by language)

GET [`/quotes/id/5a6ce86f2af929789500e824`](https://programming-quotes-api.herokuapp.com/quotes/id/5a6ce86f2af929789500e824) (get quote by id)

### Protected routes

POST `/quotes/vote` (post vote)
- required params: `quoteId`, `newVote` (number from 1 to 5)

POST `/quotes` (for registered user)
- required params: `token`, `author`, `en`
- optional: `source`, `sr`
- author name should be from Wikipedia

PUT `/quotes` (update quote for admin)
- required params: `token`, `_id`, `author`, `en`
- optional: `source`, `sr`

DELETE: `/quotes` (for admin)
- required params: `token`, `_id`

### Authentication

GET `/auth/{provider}` (user login)
- suported providers: Github, Google
- opens login page

After successful login, user will be redirected to client app. The client app should handle token on this route: `#/auth/{provider}/${token}`.

GET `/auth/{provider}:token` (get user data)
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

See server logs:

```
heroku logs --app programming-quotes-api
```

### Deploy

Deploy will be done automatically after merge into master branch.
