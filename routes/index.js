var express = require('express');
var router = express.Router();
var db = require("../models/index");

router.get('/', function(req, res, next) {
  res.render('index', { username: req.session.username });
});

router.get('/profile', function(req, res, next) {
  var documents = db.User
    .findById(req.session.user_id)
    .then(function(user){
      user
        .getDocuments()
        .then(function(docs){
          var username = user.username;
          var docs = docs.map(doc => doc.dataValues);
          console.log(docs);
          res.render('profile', {docs: docs, username: req.session.username });
      });
    })
    .catch(function(err){
      res.render('error');
  });
});

module.exports = router;
