var http = require('http'),
  express = require('express'),
  io = require('socket.io'),
  pty = require('pty.js'),
  terminal = require('term.js'),
  open = require('open');

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

app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), 'localhost', function(){
  console.log('Ready! 👍')
  console.log('listening port '+app.get('port'));
  open('http://localhost:'+app.get('port'));
});
