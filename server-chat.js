var http = require("http");
var url = require('url');
var fs = require('fs');

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

io.sockets.on('connection', function(socket){
  /* hello message from server to client */
  socket.emit('message', {'content': 'hello, freak!'});

  socket.on('message', function (data) {
    socket.emit('message', {'content': data.content});
    socket.broadcast.emit('message', {'content': data.content});
  });
});