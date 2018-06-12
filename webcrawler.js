var request = require('request');
var URL = require('url-parse');
var cheerio = require('cheerio');


// Function to make connection and report errors
var domainName = "http://wiprodigital.com";

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(domainName);

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
			collectInternalLinks($);
			collectImages($);
	   }
	});
}



function collectInternalLinks($) {
  var allLinks = [];

  var links = $("a[href^='http']");
  links.each(function() {
      allLinks.push($(this).attr('href'));
  });

  console.log("Found " + allLinks.length + " links");
  console.log(allLinks);

require('fs').writeFile(

    './siteList.xml',

    JSON.stringify(allLinks),

    function (err) {
        if (err) {
            console.error('Error writing to XML');
        }
    }
);
}




function collectImages($) {
  var allImages = [];

  var images = $("img");
  images.each(function() {
      allImages.push($(this).attr('src'));
  });

  console.log("Found " + allImages.length + " Images");
  console.log(allImages);

  require('fs').writeFile(

    './images.xml',

    JSON.stringify(allImages),

    function (err) {
        if (err) {
            console.error('Error writing to XML');
        }
    }
);
}