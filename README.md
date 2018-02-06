# Baza podataka

**Bekend API i baza podataka za otvorene projekte Škole koda. Tehnologije: Node.js i MongoDB.** 

Ako želiš da se uključiš u razvoj, [kontaktiraj nas](https://skolakoda.org/kontakt) za pristupna ovlašćenja i kredencijale.

## Preduslovi

- Instaliraj Node.js i [Heroku](https://devcenter.heroku.com/articles/heroku-cli).
- Otvori naloge na Github i Heroku
- Moraš biti dodat na Github i Heroku kao saradnik
- Moraš podesiti [varijable okruženja](https://devcenter.heroku.com/articles/heroku-local#set-up-your-local-environment-variables) u `.env` fajl

## Pokretanje

```
npm i
npm start
```

## Deploy

```
git push heroku master
```

## Kredencijali

To protect your data, it is best practice to store your database credentials in environment variables. On a traditional host you can set environment vars in your `bashrc` file. On Heroku, you use config vars. To see config variable run:

```
heroku config
```
