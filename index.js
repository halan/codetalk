var http = require('http'),
  express = require('express'),
  io = require('socket.io'),
  pty = require('pty.js'),
  terminal = require('term.js');

var app = express(),
  server = http.createServer(app),
  io = io(server);

app.use(express.static(__dirname + '/public'));
app.use(terminal.middleware());

io.sockets.on('connection', function(socket) {
  var term = pty.fork(process.env.SHELL);
  term.on('data', function(data) { socket.emit('data', data); });
  socket.on('data', function(data) { term.write(data); });
});

server.listen(8080, 'localhost', function(){
  console.log('Ready! 👍')
});
