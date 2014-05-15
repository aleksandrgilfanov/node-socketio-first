var main = function () {
    var messages = [];
    var socket = io.connect();
 
    socket.on('message', function (data) {
        var $content;
        $content = $("main .content");
        //$content.empty();
        if (data.message) {
            $content.append($("<li>").text(data.message)); 
        } 
        else if (data.date) {
            $content.append($("<li>").text(data.date));
        }
        else {
            console.log("There is a problem:", data);
        }
    });
}

$(document).ready(main);