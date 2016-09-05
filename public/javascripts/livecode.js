var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
var onlylisten = false;

var socket = io.connect('http://localhost:3000');
var documentId = window.location.pathname.split('/')[2];
socket.emit('JOIN', documentId);

socket.on('STOP', function(data){
  onlylisten = true;
});

editor.on('change', function(e){
  if(!onlylisten){
    socket.emit('EDIT', {room: documentId, event: e});
  }
});

socket.on('EDIT', function(data){
  console.log(data);
});

$('.save').on('click', function(){
  var content = editor.getValue();
  console.log(content);
  
  $.ajax({
    url: window.location.pathname,
    method: 'put',
    data: {content: content},
    success: function(){console.log("success!")},
    error: function(){console.log("failure!")}
  })

})