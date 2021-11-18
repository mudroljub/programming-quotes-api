# Programming Quotes API

**Programming Quotes API for open source projects.**

Docs: [programmingquotesapi.azurewebsites.net](https://programmingquotesapi.azurewebsites.net)

Convention: The names of the authors are as on Wikipedia.

## API Documentation

GET [`/quotes`](https://programmingquotesapi.azurewebsites.net/quotes) (get all quotes)

GET [`/quotes/random`](https://programmingquotesapi.azurewebsites.net/quotes/random) (get random quote)

GET [`/quotes/5a6ce86f2af929789500e824`](https://programmingquotesapi.azurewebsites.net/quotes/5a6ce86f2af929789500e824) (get quote by id)

GET [`/quotes/author/Edsger W. Dijkstra`](https://programmingquotesapi.azurewebsites.net/quotes/author/Edsger%20W.%20Dijkstra) (get quote by author)

You can also POST, PUT, PATCH and DELETE. See [docs](https://https://programmingquotesapi.azurewebsites.net) for more.

## Development

Start the project locally:

```
cd Api
dotnet build
dotnet watch run
```

Unit testing:

```
cd Tests
dotnet test
```

Tutorials: 
- Web API: https://docs.microsoft.com/en-us/learn/modules/build-web-api-aspnet-core/
- Web API: https://channel9.msdn.com/Series/Beginners-Series-to-Web-APIs?page=2
- Auth: https://jasonwatmore.com/post/2021/07/29/net-5-role-based-authorization-tutorial-with-example-api
- Auth: https://medium.com/@marcosvinicios_net/asp-net-core-3-authorization-and-authentication-with-bearer-and-jwt-3041c47c8b1d

## TODO

- and DbContext for Quotes 
- add CRUD for User (add, delete, modify)