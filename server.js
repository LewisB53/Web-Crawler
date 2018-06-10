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

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(domainName);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(domainName);
crawl();



function crawl() {
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    crawl();
  } else {
    visitPage(nextPage, crawl);
  }
}



function visitPage(url, callback) {
	request(domainName, function(error, response, body) {
	   if(error) {
	    	console.log("Error: " + error);
	   }

	   if(response.statusCode === 200) {
	   		var $ = cheerio.load(body);
			console.log("Status OK" + response.statusCode);
			collectInternalLinks($)
	   }
	});
}



function collectInternalLinks($) {
  var allLinks = [];

  var links = $("a[href^='http']");
  links.each(function() {
      allLinks.push($(this).attr('href'));
  });

  console.log("Found " + allLinks.length + " absolute links");
  console.log(allLinks);
}
});