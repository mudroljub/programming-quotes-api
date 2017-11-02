// https://stackoverflow.com/questions/22849527/mongodb-only-insert-if-value-is-unique-else-update-in-node-js

const mongodb = require('mongodb')
const uri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'

const noviFilmovi = [
  {
    godina: '2017',
    slika: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    naziv: 'Thor: Ragnarok',
    ocena: 7
  },
  {
    godina: '2017',
    slika: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjYzZGMzYjItMjY5OS00ZTM0LTliNzMtNzg5OTE3NmQyNGY4XkEyXkFqcGdeQXVyNzU0NjU2Mzc@._V1_SY1000_CR0,0,679,1000_AL_.jpg',
    naziv: 'I, Tonya',
    ocena: 6
  },
  {
    godina: '2017',
    slika: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    naziv: 'Ratovi Zvezde: Epizoda 8 - Poslednji Džedaj',
    ocena: 8
  }
]

mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err

  const filmovi = db.collection('filmovi')
  filmovi.insert(noviFilmovi, function(err, result) {
    if(err) throw err
    db.close()
  })
})


// filmovi.update(
//   { naziv: 'Ratovi Zvezde: Epizoda 8 - Poslednji Džedaj' },
//   { $set: { slika: 'xxxxx' } },
//   function (err, result) {
//     if(err) throw err
//   }
// )
