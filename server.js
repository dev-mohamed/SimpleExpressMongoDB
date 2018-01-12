var express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/SchoolDb', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('SchoolDb');        
        closure(db);
    });
};

app.get('/students', (req, res) => {
    connection(function(db){db.collection('Classes').find({}).toArray(function(err,data){
        if (err) throw err;        
        res.send(data);
    })})
});

app.get('/students/:id', (req, res) => {
    connection(function(db){
        db.collection('Classes').findOne({"_id":ObjectID(req.params.id)},function(err,data){
        if (err) throw err;        
        console.log(req.params.id);
        res.send(data);
    })})
});

app.post('/students',function(req,res){
    console.log(req.body);
    connection(function(db){
        db.collection('Classes').insertOne(req.body,function(err,data){
        if (err) throw err;        
            console.log('object inserted');
            res.send(data);
    })})
})

console.log('listening on port 3000');
app.listen(3000);