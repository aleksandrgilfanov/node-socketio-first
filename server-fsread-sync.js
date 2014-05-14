var http = require("http");
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response){
	console.log('Connection');

	var path = url.parse(request.url).pathname;

	console.log('requested path: ' + path);

	switch(path){
		case '/':
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('hello world');
		break;

		case '/socket.html':
		var data = fs.readFileSync( __dirname + path );
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		break;

		default:
		console.log('default switch: ' + path);
		response.writeHead(404);
		response.write("opps this doesn't exist - 404");
		break;
	}
	response.end();
});

server.listen(8001);