var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
var url = 'mongodb://heroku_3zxh32wv:drtb1bmckefnjb5bdb2rh19ans@ds149855.mlab.com:49855/heroku_3zxh32wv';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// La web pide las canciones y el servidor se las envia
app.get('/getSongs', function(req, res) {
    console.log('Peticion');
    var songs;

    // Conecta con la base de datos
    MongoClient.connect(url, function(err, db) {
        // Recuperamos la coleccion con las canciones o la crea si no existe
        var col = db.collection('songsPlayed');

        // Se buscan las canciones agrupandolas por usuarios
        col.find().sort({ user: -1 }).toArray(function(err, data) {
            var songs = data.reverse();  // Se da la vuelta para que se ordene con la ultima cancion primero
            console.log(songs);  // Se muestran las canciones por la consola
            res.jsonp(songs);  // Se envian al 
        });

        // Se cierra la base de datos
        db.close();
    });
});

// La web manda la cancion y el servidor la guarda en la base de datos
app.post('/events', function(req, res) {
    // Conecta con la base de datos
    MongoClient.connect(url, function(err, db) {
        // Recuperamos la coleccion con las canciones o la crea si no existe
        var col = db.collection('songsPlayed');

        // Se insertan los datos
        col.insert(
            {
                ts: new Date(),
                eventType: 'songPlayed',
                data: {
                    artist: req.body.artist,
                    album: req.body.album,
                    track: req.body.track,
                    title: req.body.title
                },
                user: req.body.user
            }
        );

        // Se cierra la base de datos
        db.close();
    });

    // Se muestran los datos por consola
    console.log('Artist: ' + req.body.artist +
                '\nAlbum: ' + req.body.album +
                '\nTrack: ' + req.body.track +
                '\nTitle: ' + req.body.title);
});

var port = process.env.PORT || 8000;
console.log('Listening in port ' + port);
app.listen(port);