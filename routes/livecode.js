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
    if(doc){
      res.render('livecode', {content: doc.content});
    } else {
      res.redirect('/');
    }
  });
});

router.get('/:id/reload', function(req, res, next){
  db.Document.findById(req.params.id)
    .then(function(doc){
      if(doc){
        res.send(doc.content);
      } else {
        res.sendStatus(404);
      }
    });
});

router.put('/:id', function(req,res,next){
  if(!req.session.user_id){
    res.sendStatus(404);
  } else {
    db.Document.findById(req.params.id)
    .then(function(doc){
      console.log(typeof doc.owned_id);
      console.log(typeof req.session.user_id);
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
