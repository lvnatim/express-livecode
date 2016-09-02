$(function(){
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
      success: function(){console.log("Successful login!")},
      error: function(){console.log("Invalid username/password.")}
    });

  });


});