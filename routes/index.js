var express = require('express');
var router = express.Router();
var db = require("../models/index");

router.get('/', function(req, res, next) {
  var username = req.session.username
  res.render('index', { username: username });
});

router.get('/profile', function(req, res, next) {
  if(req.session.user_id){
    var documents = db.User
      .findById(req.session.user_id)
      .then(function(user){
        user
          .getDocuments()
          .then(function(docs){
            var username = user.username;
            var docs = docs.map(doc => doc.dataValues);
            res.render('profile', {docs: docs, username:username});
        });
      })
      .catch(function(err){
        res.render('error');
    });
  } else {
    res.send("you're not allowed to access this page!");
  }
})

module.exports = router;
