var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var URL = require('url-parse');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.use(express.static('public'));
var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;


console.log('Example app listening at http://%s:%s', host, port);


var domainName = "http://wiprodigital.com"

request(domainName, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     console.log("Status OK");
   }
});


});