var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
