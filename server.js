var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var URL = require('url-parse');
var cheerio = require('cheerio');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.use(express.static('public'));
var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;


console.log('Example app listening at http://%s:%s', host, port);

// Function to make connection and report errors
var domainName = "http://wiprodigital.com"

request(domainName, function(error, response, body) {
   if(error) {
    	console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);

   if(response.statusCode === 200) {
   		var $ = cheerio.load(body);
		console.log("Status OK");
		collectInternalLinks($)
   }
});


//Function to collect internal links

function collectInternalLinks($) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
      allRelativeLinks.push($(this).attr('href'));

  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
});