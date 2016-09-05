var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

var socket = io.connect('http://localhost:3000');

socket.on('connect', function (data) {
  socket.emit('init', {id: 0});
});

editor.on("change", function(e){
  socket.emit('edit', {event: e});
});

