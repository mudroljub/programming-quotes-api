# Programming Quotes API

**Programming Quotes API for open source projects.**

Status: ~~[currently without free hosting](https://github.com/mudroljub/programming-quotes-api/issues/54).~~ [live](https://programming-quotes-api-seven.vercel.app/)

## Introduction

This open source API provides a large collection of programming quotes and their authors. These can be searched and favoured. This allows the citations to be filtered according to personal preferences. Quotes can also be edited, created and deleted. 

Convention: The names of the authors are as on Wikipedia.

## Development

Start the project locally:

```
dotnet build
dotnet watch run
```

Listening on: http://localhost:5000 and https://localhost:5001

## API Documentation

GET `/quotes` (get all quotes)

GET `/quotes/random` (get random quote)

GET `/quotes/5a6ce86f2af929789500e824` (get quote by id)

GET `/quotes/author/Edsger W. Dijkstra` (get quote by author)

You can also POST, PUT, PATCH and DELETE. See Swagger docs for more.

## Express Implementation

GET [`/quotes`](https://programming-quotes-api-seven.vercel.app/quotes) (get all quotes)

GET [`/quotes/random`](https://programming-quotes-api-seven.vercel.app/quotes/random) (get random quote)

GET [`/quotes/5a6ce86f2af929789500e824`](https://programming-quotes-api-seven.vercel.app/quotes/5a6ce86f2af929789500e824) (get quote by id)

GET [`/quotes/author/Edsger W. Dijkstra`](https://programming-quotes-api-seven.vercel.app/quotes/author/Edsger%20W.%20Dijkstra) (get quote by author)


## Author info

You can use Wikipedia API for author's image and info. 

To get author's image:

[`https://en.wikipedia.org/w/api.php?action=query&titles=Fred%20Brooks&prop=pageimages&format=json&pithumbsize=250`](https://en.wikipedia.org/w/api.php?action=query&titles=Fred%20Brooks&prop=pageimages&format=json&pithumbsize=250)

To get author info:

[`https://en.wikipedia.org/w/api.php?action=query&titles=Fred%20Brooks&prop=extracts&format=json&exintro=1`](https://en.wikipedia.org/w/api.php?action=query&titles=Fred%20Brooks&prop=extracts&format=json&exintro=1)

Note that you can change `titles`, `pithumbsize` and other params. The `%20` character (as in `Fred%20Brooks`) is for empty space.

## Tutorials

- Web API: https://docs.microsoft.com/en-us/learn/modules/build-web-api-aspnet-core/
- Web API: https://channel9.msdn.com/Series/Beginners-Series-to-Web-APIs?page=2
- Auth: https://jasonwatmore.com/post/2021/07/29/net-5-role-based-authorization-tutorial-with-example-api
- Auth: https://medium.com/@marcosvinicios_net/asp-net-core-3-authorization-and-authentication-with-bearer-and-jwt-3041c47c8b1d

## TODO

- remove Helpers, move settings to env
- ~~deploy on some free server?~~ 
