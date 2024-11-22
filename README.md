# Programming Quotes API

**Programming Quotes API for open source projects.**

Github repo: [github.com/mudroljub/programming-quotes-api](https://github.com/mudroljub/programming-quotes-api)

## API Documentation

### Public Routes  

#### GET `/quotes/random`  
- **Description**: Fetches a random programming quote.  

#### GET `/quotes`  
- **Description**: Retrieves all programming quotes.  

#### GET `/quotes?page=1&quotesPerPage=20`  
- **Description**: Retrieves quotes with optional query parameters:  
  - `page`: The page number (default: 1).  
  - `quotesPerPage`: Number of quotes per page (default: 20).  
  - `author`: Filter quotes by a specific author.  

#### GET `/quotes/:id`  
- **Description**: Retrieves a single quote by its unique ID.  

---

### Protected Routes  

Access to these routes requires a valid token.  

#### POST `/quotes`  
- **Description**: Adds a new quote.  
- **Required Parameters** (in JSON body):  
  - `author`: The name of the author (should match a Wikipedia entry).  
  - `text`: The quote text.  
- **Optional Parameters**:  
  - `source`: The source or context of the quote.  

#### PUT `/quotes/:id`  
- **Description**: Updates an existing quote by ID.  
- **Parameters** (in JSON body):  
  - `author`, `text`, or `source`.  

#### POST `/quotes/vote`  
- **Description**: Votes for a specific quote.  
- **Required Parameters** (in JSON body):  
  - `quoteId`: The ID of the quote.  
  - `newVote`: A numeric value (1–5).  

#### DELETE `/quotes/:id`  
- **Description**: Deletes a quote by its unique ID.  

---

### Authentication  

#### GET `/auth/token`  
- **Description**: Logs in or registers a new user.  
- **Required Parameters** (in JSON body):  
  - `email`: The user's email address.  
  - `password`: The user's password.  
- **Returns**: A JWT token.  

**Token Usage**: For all subsequent requests, include the token in the `Authorization` header as follows:  
```
Authorization: Bearer <token>
```  

---

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
