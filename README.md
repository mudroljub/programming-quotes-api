Created `mongolab-spherical-50636` as `MONGOLAB_NAVY_URI`

heroku config:get MONGODB_URI
```
mongodb://heroku_sljlvq37:l32nin5ialth2jdkf0ur0uo1i4@ds243285.mlab.com:43285/heroku_sljlvq37
```

user=heroku_sljlvq37
password=l32nin5ialth2jdkf0ur0uo1i4

To protect your database, it is best practice to store your database credentials in a Heroku config variable. This allows you to avoid hard coding credentials directly in your application code. For example, you may run:

```
$ heroku config:set PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1,host2:port2/dbname
```


To connect using the mongo shell:
```
mongo ds243285.mlab.com:43285/heroku_sljlvq37 -u <dbuser> -p <dbpassword>
mongo ds243285.mlab.com:43285/heroku_sljlvq37 -u filmovi -p filmovi
```

To connect using a driver via the standard MongoDB URI (what's this?):
```
mongodb://<dbuser>:<dbpassword>@ds243285.mlab.com:43285/heroku_sljlvq37
mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37
```
