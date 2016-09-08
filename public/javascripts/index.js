  //todo: implement socket functionality here to 
  //populate splash page with randomly selected
  //live document
//to do: get view only version

$(function(){

  var editor = ace.edit("editor");
  editor.setOptions({
    readOnly: true,
    highlightActiveLine: true,
    highlightGutterLine: true
  })

  editor.$blockScrolling = Infinity;
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  var Range = ace.require('ace/range').Range;
  var editSession = editor.getSession();

  var onlylisten = true;

  var socket = io.connect('http://localhost:3000')

  socket.emit('index-view', function(data){
    console.log(data);
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
      console.log(position)
      editSession.insert(position, newText);
      onlylisten = false;
    } else if (action==="remove"){
      onlylisten = true;
      editSession.remove(removeRange);
      onlylisten = false;
    }

  });



  $('.openRegisterForm').on("click", function(){
    $('.registerForm').toggle();
  });

  //TODO: Implement client side validation, as well as server-side

  $('.register').on("click", function(){
    var username = $(".username").val();
    var firstname = $(".firstname").val();
    var lastname = $(".lastname").val();
    var email = $(".email").val();
    var password = $(".password").val();
    var passwordCheck = $(".passwordCheck").val();
    var userData = {
      username: username,
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password
    };

    $.post({
      url: '/api/register',
      data: userData,
      success: function(){console.log("success!")},
      error: function(){console.log("there was an error!")}
    });

  });

  $('.openLoginForm').on("click", function(){
    $('.loginForm').toggle();
  });

  $('.login').on("click", function(){
    var loginUsername = $(".loginUsername").val();
    var loginPassword= $(".loginPassword").val();
    var loginData = {
      username: loginUsername,
      password: loginPassword
    };

    $.post({
      url: '/api/login',
      data: loginData,
      success: function(){ window.location.href = "/"},
      error: function(){console.log("Invalid username/password.")}
    });

  });

  $('.logout').on("click", function(){
    $.post({
      url: '/api/logout',
      success: function(){ window.location.href = "/"}
    });

  });

  $('.profile').on("click", function(){
    window.location.href = "/profile";

  });


});