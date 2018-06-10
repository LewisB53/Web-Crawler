	var resultsPage = function(){
	
	var domainName = "http://wiprodigital.com"
    var domainInfo = document.createElement('p');

	document.body.appendChild(domainInfo);
    domainInfo.innerText = "Domain to search " + domainName;

	}

    window.onload = resultsPage;

