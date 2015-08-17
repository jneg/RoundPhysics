var express = require('express');
var app = express();
var http = require('http').Server(app);
var sio = require('socket.io')(http);
var port = 3000;

app.use('/', express.static(__dirname));

app.listen(port, function() {
   console.log('Server listening on *:' + port);
});
