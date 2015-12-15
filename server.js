var http = require('http');
var express = require('express');
var fs = require('fs');
var marked = require("marked")

var markdown_handler = function (request, response) {
    console.log("URL:", request.url)

    fs.readFile("." + request.url, {encoding:"utf8"}, function(err, data) {
	if (err) {
	    response.writeHead(404, {'Content-Type': 'text/plain'});
	    response.end(err.toString());
	} else {
	    response.writeHead(200, {'Content-Type': 'text/html'});
	    response.write("<!doctype html>\n");
	    response.write("<html>\n");
	    response.write("<head>\n");
	    response.write('<link rel="stylesheet" href="/static/highlight/styles/default.css">\n');
	    response.write('<script src="/static/highlight/highlight.pack.js"></script>\n');
	    response.write('<script>hljs.initHighlightingOnLoad();</script>\n')
	    response.write("</head>\n");
	    response.write("<body>\n");
	    response.write(marked(data));
	    response.write("</body>\n");
	    response.write("</html>\n");
	    response.end();
	}
    })
}

app = express();

app.use('/static', express.static('static'));
app.get('/markdown/*.md', markdown_handler)

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
