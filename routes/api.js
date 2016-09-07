var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findById(1)
    .then((user)=>console.log(user))
    .catch((err)=>console.log(err));
  res.send('respond with a resource');
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
  db.User
    .findOne(
      {where: req.body}
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
  res.redirect('/');
});

module.exports = router;
