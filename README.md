# Programming Quotes API

**Programming Quotes API for open source projects.**

Docs: [programming-quotes-api.herokuapp.com](https://programming-quotes-api.herokuapp.com)

Convention: The names of the authors are as on Wikipedia.

I am open to your feature requests. Also, you can send me your client apps if you want to share it with the world :)

## API Documentation

GET [`/quotes`](https://programming-quotes-api.herokuapp.com/quotes) (get all quotes)

GET [`/quotes/random`](https://programming-quotes-api.herokuapp.com/quotes/random) (get random quote)

GET [`/quotes/5a6ce86f2af929789500e824`](https://programming-quotes-api.herokuapp.com/quotes/5a6ce86f2af929789500e824) (get quote by id)

GET [`/quotes/author/Edsger W. Dijkstra`](https://programming-quotes-api.herokuapp.com/quotes/author/Edsger%20W.%20Dijkstra) (get quote by author)

You can also POST, PUT, PATCH and DELETE. See [docs](https://https://programming-quotes-api.herokuapp.com) for more.

## Development

Start the project locally:

```
dotnet build
dotnet watch run
```

Deploy:

```
heroku login
heroku git:remote -a programming-quotes-api
heroku buildpacks:set https://github.com/jincod/dotnetcore-buildpack

git push heroku master
```

## Tutorials

- Web API: https://docs.microsoft.com/en-us/learn/modules/build-web-api-aspnet-core/
- Web API: https://channel9.msdn.com/Series/Beginners-Series-to-Web-APIs?page=2
- Auth: https://jasonwatmore.com/post/2021/07/29/net-5-role-based-authorization-tutorial-with-example-api
- Auth: https://medium.com/@marcosvinicios_net/asp-net-core-3-authorization-and-authentication-with-bearer-and-jwt-3041c47c8b1d
- Deploy: https://stackoverflow.com/questions/29100993/how-to-deploy-net-application-to-heroku

## TODO

- ne dozvoliti role: string
- add User patch
- merge Helpers and Authorization dir
