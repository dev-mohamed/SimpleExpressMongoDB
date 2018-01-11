var express = require('express')
const MongoClient = require('mongodb').MongoClient;
var app = express()

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/meanDB', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('meanDB');        
        closure(db);
    });
};

app.get('/', (req, res) => {
    connection(function(db){db.collection('Users').find({name:"Chehir"}).toArray().then(function(donnee){
        res.send(donnee);
    })})
});

console.log('listening on port 3000');
app.listen(3000);