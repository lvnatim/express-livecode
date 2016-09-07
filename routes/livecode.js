var express = require('express');
var router = express.Router();
var db = require("../models/index");

/* GET users listing. */

router.get('/new', function(req, res, next){
  if(!req.session.user_id){
    res.redirect('/');
  } else {
    var doc = db.Document.create({
      name: "untitled",
      content: "",
      owned_id: req.session.user_id,
      language: "javascript"
    })
    .then(function(doc){

      db.User
        .findById(req.session.user_id)
        .then(function(user){
          user.addDocument(doc);
        })
        .catch(function(error){
          console.log(error);
        });

      res.redirect('/livecode/' + doc.id);
    })
    .catch(function(err){
      res.redirect('/');
    });
  }
});

router.get('/:id', function(req, res, next){
  db.Document.findById(req.params.id)
  .then(function(doc){
    var editors = doc.getUsers()
      .then(function(users){
        var users = users.map(user=> user.dataValues);
        res.render('livecode', {
          content: doc.content,
          editors: users
        });
      });
  })
  .catch(function(doc){
    res.redirect('/');
  })
});

router.get('/:id/reload', function(req, res, next){
  db.Document.findById(req.params.id)
    .then(function(doc){
      res.send(doc.content);
    })
    .catch(function(err){
      res.sendStatus(404);
    });
});

router.put('/:id', function(req,res,next){
  if(!req.session.user_id){
    res.sendStatus(404);
  } else {
    db.Document.findById(req.params.id)
    .then(function(doc){
      if(doc && doc.owned_id === req.session.user_id){
        doc.content = req.body.content
        doc.save()
          .then(function(doc){
            res.sendStatus(200);
          })
          .catch(function(err){
            res.sendStatus(404);
          })
      } else {
        res.sendStatus(404);
      }
    });
  }
});

module.exports = router;
