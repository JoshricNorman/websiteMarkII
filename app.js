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

app.get('/bearGarden1516', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/bearGarden1516.html'));
});

app.get('/lucerneRepackaging', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/lucerne.html'));
});

app.get('/redCross', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/redCrossMore.html'));
});

app.get('/sunGodFestival2017', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/sgf17.html'));
});

app.get('/tritonTracker', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/tritonTracker.html'));
});

app.get('/familyWeekend', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/famWeekend.html'));
});

app.get('/hullabaloo2017', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/hullabaloo2017.html'));
});

app.get('/backgrounds1', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/bg1.html'));
});

app.get('/logos2', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/logos2.html'));
});

app.get('/branding', function( req, res) {
    res.sendFile(path.join(__dirname + '/projects/personalBranding.html'));
});


app.use(express.static(__dirname + '/public'));


app.listen( process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});

app.use(function(req, res) {
    res.status(400);
    res.sendFile(path.join(__dirname + '/404page.html'));
});
