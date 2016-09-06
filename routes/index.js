var express = require('express');
var router = express.Router();
var db = require("../models/index");

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile/:id', function(req, res, next) {
  if(!req.session.user_id){
    res.send("you're not allowed to access this page!");
  } else {
    if(req.session.user_id == req.params.id){
      res.render('profile');
    } else {
      res.send("you're not allowed to access this page!");
    }
  }
})

module.exports = router;
