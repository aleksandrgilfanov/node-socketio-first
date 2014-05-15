var http = require("http");
var url = require('url');
var fs = require('fs');
var net = require('net');

var httpServer = http.createServer(function(request, response){
	console.log('Connection');

	var path = url.parse(request.url).pathname;

	console.log('requested path: ' + path);

	switch(path){
		case '/':
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('hello world');
		response.end();
		break;

		case '/style.css':
		case '/webpage.js':
		case '/jquery-1.11.1.min.js':
		case '/socket.html':
		fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                	var typeOfContent = "text/html";
                	if (path.indexOf('.css') != -1)
                		typeOfContent = "text/css";
                    response.writeHead(200, {"Content-Type": typeOfContent});
                    response.write(data, "utf8");
                    response.end();
                }
            });
		break;

		default:
		console.log('default switch: ' + path);
		response.writeHead(404);
		response.write("opps this doesn't exist - 404");
		response.end();
		break;
	}
	
});

httpServer.listen(8001);

var io = require('socket.io').listen(httpServer);


var port = 6666;
var server = net.createServer(function(c) {
  console.log('client connected ' + c.remoteAddress + ':' + c.remotePort);

  c.on('end', function() {
    console.log('client disconnected');
  });

  io.sockets.on('connection', function(socket){
    socket.emit('message', {'message': 'hello world'});
    c.on('data', function(piece) {
		socket.emit('message', {'date': ''+piece});
  	});
  });

});

server.listen(port, function() {
  var serverAddress = server.address();
  console.log( 'server is listening at port ' + serverAddress.address + ':' + serverAddress.port );
});