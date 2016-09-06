var express = require('express');
var router = express.Router();
var db = require("../models/index");

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', function(req, res, next) {
  if(!req.session.user_id){
    res.send("you're not allowed to access this page!");
  } else {
    if(req.session.user_id){
      var documents = db.User
        .findById(req.session.user_id)
        .then(function(user){
          if(user){
            console.log(user.getDocuments());
          }
        });
      res.render('profile');
    } else {
      res.send("you're not allowed to access this page!");
    }
  }
})

module.exports = router;
