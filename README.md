# Programming Quotes API

**Programming Quotes API for open source projects.**

Visit: [programming-quotes-api.azurewebsites.net](https://programming-quotes-api.azurewebsites.net)

Github repo: [github.com/mudroljub/programming-quotes-api](https://github.com/mudroljub/programming-quotes-api)

Feel free to get involved, suggest or implement new features.

## API Documentation

### Public Routes  

#### GET [`/api/quotes/random`](/api/quotes/random)
- **Description**: Fetches a random programming quote.  

#### GET [`/api/quotes?author=Edsger_W._Dijkstra`](/api/quotes?author=Edsger_W._Dijkstra) 
#### GET [`/api/quotes?page=1&quotesPerPage=20`](/api/quotes?page=1&quotesPerPage=20) 
#### GET [`/api/quotes`](/api/quotes) 
- **Description**: Retrieves quotes, with optional query parameters:  
  - `page`: The page number (default: 1).  
  - `quotesPerPage`: Number of quotes per page (default: 20).  
  - `author`: Filter quotes by a specific author.  

#### GET `/api/quotes/:id`  
- **Description**: Retrieves a single quote by its unique ID.  

---

### Protected Routes  

Access to these routes requires a valid token.  

#### POST `/api/quotes`  
- **Description**: Adds a new quote.  
- **Required Parameters** (in JSON body):  
  - `author`: The name of the author (should match a Wikipedia entry).  
  - `text`: The quote text.  
- **Optional Parameters**:  
  - `source`: The source or context of the quote.  

#### PUT `/api/quotes/:id`  
- **Description**: Updates an existing quote by ID.  
- **Parameters** (in JSON body):  
  - `author`, `text`, or `source`.  

#### POST `/api/quotes/vote`  
- **Description**: Votes for a specific quote.  
- **Required Parameters** (in JSON body):  
  - `quoteId`: The ID of the quote.  
  - `newVote`: A numeric value (1–5).  

#### DELETE `/api/quotes/:id`  
- **Description**: Deletes a quote by its unique ID.  

---

### Authentication  

#### POST `/api/auth/token`  
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

Create `.env` file proper values (this is an example):

```
# database credentials (obtain from MongoDB)
CONNECTION_STRING=mongodb://quotes:quotes@localhost:27017/quotes

# whatever random string you like
JWT_SECRET=BILO ŠTA SAMO DA JE TAJNA

# use development for local testing
NODE_ENV=development 
```

### Start

```
npm i
npm run dev
```
