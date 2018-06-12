# Web-Crawler
A simple Web crawler app to search for links within a single domain

Installation instructions

Make sure Node Js is installed on your system

Download this git repository


Run npm install from console

Type node webcrawler.js in console to run.

This will create output files: 'sitelist.xml' and images.xml.


Development Thoughts
I've never build a webcrawler in any of the languages I use before.For this reason, I was tempted to write this in Vanilla JS in order to gain a full understanding of the inner mechanics of the process. After some research I opted to use established libraries for this process due to time constaints.

With more time I would implement a fully working front end using Express and Webpack which could be run in HTML on localhost. Previous Git commits show the bare bones for the front end but I made the decision to strip this back entirely for now, and export sitelist directly to XML file using FS.

Also, code could do with refactoring. For example, CollectImages and collectInternalLinks functions are repetitions - this could be refactored in to a 'collect' function with suitable arguments to generate both files dynamically.