var express = require('express');
var router = express.Router();
var db = require('../models/index');

router.get('/profiles', function(req,res,next){
  db.User
    .findAll({
      attributes: ["id", "username", "firstName", "lastName"], 
      where:{
        username: {
          $like: req.query.username
        }
      },
      limit: 10
    })
    .then(function(users){
      res.send(users);
    })
    .catch(function(users){
      res.sendStatus(404);
    })
});

router.post('/register', function(req,res,next) {
  db.User
    .build(req.body)
    .save()
    .then(function(user){
      res.sendStatus(200);
    })
    .catch(function(err){
      res.sendStatus(500);
    });
});

router.post('/login', function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  db.User
    .findOne(
      {where: {username: username, password: password}}
    )
    .then(function(user){
      if(user){
        req.session.user_id = user.id;
        req.session.username = user.username;
        console.log(user.username, "has logged in!");
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      };
    });
});

router.post('/logout', function(req,res,next){
  req.session.user_id = null;
  req.session.username = null;
  res.sendStatus(200);
  res.redirect("/");
});

router.get('/comments', function(req,res,next){
  var documentId = req.body.documentId;
  db.Document
    .findById(documentId)
    .then(doc => {
      console.log(doc);
      doc.getComments()
        .then(comments=>{
          console.log(comments);
        });
    });
});

router.post('/adduser', function(req, res, next){
  var documentId = req.body.documentId;
  var userId = req.body.userId;
  db.User
    .findById(userId)
    .then(user => {
      var doc = db.Document
        .findById(documentId)
        .then(doc => {
          if(doc.owned_id === req.session.user_id){
            doc.addUser(user);
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(err => {
          res.sendStatus(404);
        });
    })
    .catch(err => {
      res.sendStatus(404);
    });
});

router.post('/removeuser', function(req, res, next){
  var documentId = req.body.documentId;
  var userId = req.body.userId;
  db.User
    .findById(userId)
    .then(user => {
      var doc = db.Document
        .findById(documentId)
        .then(doc => {
          if(doc.owned_id === req.session.user_id){
            if(!doc.hasUser(user)){
              res.sendStatus(404);
            }
            doc.removeUser(user);
            res.sendStatus(200);      
          } else {
            res.sendStatus(404);
          }
        })
        .catch(err => {
          res.sendStatus(404);
        });
    })
    .catch(err => {
      res.sendStatus(404);
    });
});

module.exports = router;
