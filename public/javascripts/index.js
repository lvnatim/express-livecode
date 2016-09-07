  //todo: implement socket functionality here to 
  //populate splash page with randomly selected
  //live document

$(function(){

  // var editor = ace.edit("editor")
  // editor.$blockScrolling = Infinity;
  // editor.setTheme("ace/theme/monokai");
  // editor.getSession().setMode("ace/mode/javascript");

  // var Range = ace.require("ace/range").Range;
  // var editSession = editor.getSession();

  // var onlylisten = false;
 
 //namespaced socket
 var socket = io('/livecode/1');
 console.log(socket.nsp);




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