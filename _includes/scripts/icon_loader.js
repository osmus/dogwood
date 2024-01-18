fetch("{{site.url}}{{site.baseurl}}/assets/icons/fa-solid.svg")
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        document.body.insertBefore(div, document.body.childNodes[0]);
    });

fetch("{{site.url}}{{site.baseurl}}/assets/icons/fa-brands.svg")
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        document.body.insertBefore(div, document.body.childNodes[0]);
    });