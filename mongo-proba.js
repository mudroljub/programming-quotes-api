var mongodb = require('mongodb');
var uri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37';

var novePesme = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  }
];

mongodb.MongoClient.connect(uri, function(err, db) {
  if(err) throw err;

  var pesme = db.collection('pesme');

  // insert method can take either an array or a dict.
  pesme.insert(novePesme, function(err, result) {
    if(err) throw err;

    pesme.update(
      { song: 'One Sweet Day' },
      { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
      function (err, result) {
        if(err) throw err;

        pesme.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {
          if(err) throw err;

          docs.forEach(function (doc) {
            console.log(
              'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
              ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
            );
          });

          // Since this is an example, we'll clean up after ourselves.
          pesme.drop(function (err) {
            if(err) throw err;

            // Only close the connection when your app is terminating.
            db.close(function (err) {
              if(err) throw err;
            });
          });

        });
      }
    );
  });
});
