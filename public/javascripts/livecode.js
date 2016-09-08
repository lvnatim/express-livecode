var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
var editSession = editor.getSession();
var socket = io.connect('http://localhost:3000');
var documentId = window.location.pathname.split('/')[2];
var onlylisten = false;

editor.$blockScrolling = Infinity;
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

socket.emit('JOIN', documentId);

socket.on('STOP', function(data){
  onlylisten = true;
});

editor.on('change', function(e){
  if(onlylisten){
    return false;
  }
  socket.emit('EDIT', {room: documentId, event: e});
});

socket.on('EDIT', function(data){

  var action = data.action;
  var newText = data.lines.join("\n");
  var position = data.start;

  var startRow = data.start.row
  var startColumn = data.start.column
  var endRow = data.end.row
  var endColumn = data.end.column
  var removeRange = new Range(startRow,startColumn,endRow,endColumn);

  if(action==="insert"){
    onlylisten = true;
    editSession.insert(position, newText);
    onlylisten = false;
  } else if (action==="remove"){
    onlylisten = true;
    editSession.remove(removeRange);
    onlylisten = false;
  }

});

// TODO: IMPLEMENT THIS SAVE FEATURE AND RELOAD DOCUMENT BASED ON SERVER DOC

socket.on('SAVE', function(data){
  var content = editor.getValue();
  $.ajax({
    url: window.location.pathname,
    method: 'put',
    data: {content: content},
    success: function(){
      console.log("Successful save!");
      socket.emit('RELOAD', {room: documentId});
    },
    error: function(){console.log("Failed to save!")}
  });
});

socket.on('RELOAD', function(data){
  $.ajax({
    url: window.location.pathname + '/reload',
    method: 'get',
    success: function(data){
      onlylisten = true;
      editSession.setValue(data);
      onlylisten = false;
      console.log("Successful reload!");
    },
    error: function(){console.log("Failed to reload!")}
  });
});

$('.save').on('click', function(){
  var content = editor.getValue();
  $.ajax({
    url: window.location.pathname,
    method: 'put',
    data: {content: content},
    success: function(){console.log("Successful save!")},
    error: function(){console.log("Failed to save!")}
  });
})

$('input.userSearch').on('keyup',function(e){
  var value = $(this).val() + '%';
  $.ajax({
    url: '/api/profiles',
    method: 'get',
    data: {username: value},
    success: function(data){
      populateSearchForm(data)
    },
    error: function(){console.log("404 error")}
  });
});

// helper function used in input user search

function populateSearchForm(userArray){
  $('.foundUsers').empty();
  userArray.forEach(function(object){
    $('<li>')
      .addClass("userButton")
      .attr("data-user-id", object.id)
      .text(object.username)
      .appendTo($('.foundUsers'));
  });
}

$('.editorList').on('click', '.removeUser', function(e){
  var $user = $(this);
  var value = $user.data("userId");
  var data = {userId: value, documentId: documentId};
  $.post({
    url: '/api/removeuser',
    data: data,
    success: function(){
      $user.parent().remove()
    },
    error: function(){}
  });
})

$('.foundUsers').on('click', '.userButton', function(e){
  var $user = $(this);
  var value = $user.data("userId");
  var data = {userId: value, documentId: documentId};
  $.post({
    url: '/api/adduser',
    data: data,
    success: function(){
      var newListNode = $("<li>")
        .text($user.text());
      $("<a>")
        .addClass("removeUser")
        .attr("data-user-id", value)
        .text("x")
        .appendTo(newListNode);
      newListNode
        .appendTo($(".editorList"));
    },
    error: function(){}
  });
})

$('.showComments').on('click', function(){
  $('.commentBar').animate({"left":"75%"});

  $.get({
    url: '/api/comments',
    data: {documentId: documentId},
    success: function(data){console.log("error")},
    error: function(data){}
  })

});

$('.hideComments').on('click', function(){
  $('.commentBar').animate({"left":"175%"});
});

