# Baza podataka

Bekend API i baza podataka za otvorene projekte Škole koda. Rađena u Node.js i MongoDB.

## Razvoj

Aplikacija je otvorenog koda, ali da bi je razvijao, [kontaktiraj](https://skolakoda.org/kontakt) Školu koda da bi dobio pristupna ovlašćenja serveru i kredencijale za bazu.

### Pokretanje

Klasika:

```
npm i
npm start
```

### Credentials

To protect your database, it is best practice to store your database credentials in environment variables. On a traditional host or working locally you can set environment vars in your `bashrc` file. On Heroku, you use config vars. To see config variable run:

```
$ heroku config
```
