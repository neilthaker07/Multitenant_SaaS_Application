var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/newgrader', function (req, res, next) {
  res.render('newgrader');
});

router.post('/signup', function(req, res, next) {
    res.redirect('/newgrader');
});

router.get('/grader/:username', function (req, res, next) {
  res.render('grader',{grader: req.params.username});
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  res.redirect('/grader/'+username);
});

module.exports = router;
