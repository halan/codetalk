(function() {

  var colors = Terminal.colors; colors[256] = 'rgba(84, 18, 94, .8)';
  var term = new Terminal({useStyle: true, colors: colors});

  window.onload = function() {
    var socket = io.connect();
    socket.on('connect', function() {
      term.open(document.getElementById('terminal'));
      term.on('data', function(data) { socket.emit('data', data); });

      socket.on('data', function(data) { term.write(data); });
      socket.on('disconnect', function() { term.destroy(); });
    });
  };
})();
