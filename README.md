# Programming Quotes API

**Programming Quotes API for open source projects.**

Github repo: [github.com/skolakoda/programming-quotes-api](https://github.com/skolakoda/programming-quotes-api)

## API Documentation

Suported languages: en, sr.

### Public routes

GET [`/quotes`](/quotes) (get all quotes)

GET [`/quotes/lang/en`](/quotes/lang/en) (get quotes by language)

GET [`/quotes/page/2`](/quotes/page/2) (get quotes by page)

GET [`/quotes/random`](/quotes/random) (get random quote)

GET [`/quotes/random/lang/sr`](/quotes/random/lang/sr) (get random quote by language)

GET [`/quotes/id/5a6ce86f2af929789500e824`](/quotes/id/5a6ce86f2af929789500e824) (get quote by id)

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

- Install Node.js
- Set [environment variables](https://github.com/skolakoda/baza-podataka/wiki/Environment-variables)

### Setup database

Import json file into local MongoDB database, if needed (replace with real values):

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

# obtain from Github (have two separate OAuth apps, for local and for production)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# OAuth 2.0 client IDs (obtain from Google API Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

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

- auth kontroler
  - izdavanje tokena
  - provera autentifikacije (validacija JWT-a i dozvola pristupa)
- user kontroler
  - get profil
  - ažuriranje podataka o korisniku
  - brisanje korisnika
  - lista korisnika (za admine)
  - dodela privilegije (za admine)
- zameniti admin sa privilege (1, 2, 3...)
  - validateUser i validateAdmin u validatePrivilege
- en u text, sr u?

- možda
  UserService za validaciju korisnika, dobijanje ili ažuriranje podataka.
  AuthService za prijavu, registraciju i generisanje tokena.