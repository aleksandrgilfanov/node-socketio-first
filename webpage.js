var main = function () {
    var messages = [];
    var socket = io.connect();
 
    socket.on('message', function (data) {
        if(data.message) {

            var $content;
            console.log(data.message);
            
            $content = $("main .content");
            $content.append($("<li>").text(data.message));

        } else {
            console.log("There is a problem:", data);
        }
    });
}

$(document).ready(main);