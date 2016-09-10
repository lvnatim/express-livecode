var editor = ace.edit("editor");
var editSession = editor.getSession();
var Range = ace.require('ace/range').Range;
var socket = io.connect('http://localhost:3000');
var documentId = $('#documentMeta').data('documentId');
var onlylisten = false;
var documentBarVisible = false;

editor.$blockScrolling = Infinity;
editor.setTheme('ace/theme/dreamweaver');
editSession.setMode("ace/mode/javascript");

// TODO: load document data into the editor
function loadNewDocument(newDoc){
  $("#editor").animate({opacity: 0}, 1000, function(){
    socket.disconnect();
    socket = io.connect('http://localhost:3000');
    documentId = newDoc.id;
    onlylisten = true;
    editor.setValue(newDoc.content);
    $("#editor").animate({opacity: 1}, 1000, function(){
      onlylisten = false;
      establishNewSocketConnection();
    });
  });
}

// TODO: reset socket connection
function establishNewSocketConnection(){
  socket.emit('JOIN', documentId);
  socket.on('STOP', function(data){
    onlylisten = true;
  });
}

// flashes error message in commentBar when called
function flashErrorMessage(str){
  $('.errorMessage').text(str);
  $('.errorMessage').fadeIn(1500, function(){
    setTimeout(
      function(){
        $('.errorMessage').fadeOut(1500);
      },
      1500
    );
  })
}

// Populates found users from a array of users
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

// Populates comment box from an array of comments
function populateCommentBox(commentArray){
  $.get({
    url: '/api/comments',
    data: {documentId: documentId},
    success: function(commentArray){
      $('.comments').empty();
      commentArray.forEach(comment=>{
        var $comment = $('.commentTemplate').clone().removeClass('commentTemplate');
        $comment.find('.line').text(comment.line);
        $comment.find('.username').text(comment.User.username);
        $comment.find('.content').text(comment.content);
        $comment.appendTo('.comments');
      })
    },
    error: function(data){}
  });
}

// Toggles document bar.
$('.loadDocument').on('click', function(){
  if(documentBarVisible){
    $('#editor').animate({bottom: "0%"});
    $('.documentBar').animate({top: "100%"});
    documentBarVisible = false;
  } else {
    $('#editor').animate({bottom: "20%"});
    $('.documentBar').animate({top: "80%"});
    documentBarVisible = true;
  }
});

// Loads new document on document click
$('.document').on('click', function(){
  var documentId = $(this).data("documentId");
  console.log(documentId);
  $.get({
    url: '/api/document',
    data: {
      documentId: documentId
    },
    success: function(newDoc){
      documentId = 3;
      loadNewDocument(newDoc);
    },
    error: function(){
      flashErrorMessage("Couldn't load the document");
    }
  })
});

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

$('.hideComments').on('click', function(){
  $('.commentBar').animate({"left":"175%"});
});

$('.language').on('change', function(){
  var language = $(this).val();
  editSession.setMode('ace/mode/'+language);
  console.log(language);
})

$('.save').on('click', function(){
  var content = editor.getValue();
  $.ajax({
    url: documentId.toString(),
    method: 'put',
    data: {content: content},
    success: function(){console.log("Successful save!")},
    error: function(){flashErrorMessage("You can't save this document.")}
  });
})

$('.showComments').on('click', function(){
  $('.commentBar').animate({"left":"75%"});
  populateCommentBox();
});

$('.submitComment').on('click', function(){
  var commentLine = $('.commentLine').val();
  var commentContent = $('.commentContent').val();
  console.log(commentLine, commentContent);
  $.post({
    url: '/api/comments',
    data: {
      documentId: documentId,
      line: commentLine,
      content: commentContent
    },
    success: function(){
      populateCommentBox();
    },
    error: function(){}
  })

  $
});

$('.userSearch').on('keyup',function(e){
  var value = $(this).val() + '%';
  if(value === "%"){
    $('.foundUsers').empty();
  } else {
    $.ajax({
      url: '/api/profiles',
      method: 'get',
      data: {username: value},
      success: function(data){
        populateSearchForm(data)
      },
      error: function(){flashErrorMessage("Error in finding users...")}
    });
  }
});

// SOCKET LOGIC IS ALL DEFINED BELOW

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

socket.on('SAVE', function(data){
  var content = editor.getValue();
  $.ajax({
    url: window.location.pathname,
    method: 'put',
    data: {content: content},
    success: function(){
      socket.emit('RELOAD', {room: documentId});
    },
    error: function(){
      flashErrorMessage("An error occurred in saving.")
    }
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
    },
    error: function(){
      flashErrorMessage("Failed to reload!")
    }
  });
});

