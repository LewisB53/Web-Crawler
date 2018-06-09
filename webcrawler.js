    var request = require('request');
	var URL = require('url-parse');


    var app = function(){

    var textBox = document.createElement('p')

    document.body.appendChild(textBox)
    textBox.innerText = "Inserted Text"

	}
    window.addEventListener('load', app);