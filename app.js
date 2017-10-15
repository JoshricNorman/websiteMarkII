var express = require('express');
var app = express();
var path = require("path");


app.get('/', function( req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/portfolio', function( req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function( req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/resume', function( req, res) {
    res.sendFile(path.join(__dirname + '/resume.html'));
});

//portfolio URLs

app.get('/temp', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/projectTemplate.html'));
});

app.get('/bearGarden1315', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/bearGarden1315.html'));
});

app.get('/photoStudies1', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/photoStudies1.html'));
});

app.get('/ASEJA', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/associatedStudentsEJA.html'));
});

app.get('/logos1', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/logos1.html'));
});



app.use(express.static(__dirname + '/public'));


app.listen( process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});

app.use(function(req, res) {
    res.status(400);
    res.sendFile(path.join(__dirname + '/404page.html'));
});
