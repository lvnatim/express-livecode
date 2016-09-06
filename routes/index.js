var express = require('express');
var router = express.Router();
var db = require("../models/index");

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', function(req, res, next) {
  res.send("you're at the profile!");
})

module.exports = router;
