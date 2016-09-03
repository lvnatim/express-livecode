var express = require('express');
var router = express.Router();
var db = require("../models/index");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET user profile page
router.get('/profile', function (req, res) {
  res.render('profile', { title: 'Express'});
});


//get live code page
router.get('/live', function (req, res) {
  res.render('live', { title: 'Express'});
});



module.exports = router;
