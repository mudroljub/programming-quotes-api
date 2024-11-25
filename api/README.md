# Programming Quotes API

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
# database credentials (obtain from MongoDB)
CONNECTION_STRING=

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

- srediti random
- list authors
- quotes/total