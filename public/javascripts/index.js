$(function(){
  $('.closeRegisterForm').on("click", function(){
    $('.registerForm').animate({top: "-1000px"}, 500);
    $('.overlay').fadeOut();
  });

  $('.openRegisterForm').on("click", function(){
    $('.overlay').fadeIn();
    $('.registerForm').animate({top: "150px"}, 500);
  });

  //TODO: Implement client side validation, as well as server-side

  $('.registerForm').on("click", '.register', function(){
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