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

app.get('/portfolio/temp', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/projectTemplate.html'));
});

app.get('/temp', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/projectTemplate.html'));
});



 // END PORTFOLIO PROJECTS

app.use(express.static(__dirname + '/public'));


app.listen( process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});

app.use(function(req, res) {
    res.status(400);
    res.sendFile(path.join(__dirname + '/404page.html'));
});
