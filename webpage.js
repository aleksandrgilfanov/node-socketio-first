var main = function () {
    var messages = [];
    var socket = io.connect();

    socket.on('connect', function () {
        //socket.emit('message', { 'content': 'eto looool' });
        $("#sendMsgButton").click( function(){
            var $input_text = $("#sendMsgInput");
            socket.emit('message', { 'content': $input_text.val() });
        });
    });

   
 
    socket.on('message', function (data) {
        var $content;
        $content = $("main .content");
        //$content.empty();
        if (data.content) {
            $content.append($("<li>").text(data.content)); 
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