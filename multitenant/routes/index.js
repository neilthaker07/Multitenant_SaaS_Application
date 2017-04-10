var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    username: {type: String, required:true},
    password: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// login flow for grader
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

        // validate user login
        var query = UserData.findOne({ 'username': username , 'password': password});
        query.select('username');
        query.exec(function (err, results) {
            if (err) return handleError(err);
            if (results == null)
            {
                res.redirect('/');
            }
            else
            {
                res.redirect('/grader/'+username);
            }
        });
});

router.get('/grader/:username', function (req, res, next) {
    res.render('grader',{grader: req.params.username});
});


// new grader flow
router.post('/signup', function(req, res, next) {
    res.redirect('/newgrader');
});

router.get('/newgrader', function (req, res, next) {
  res.render('newgrader');
});

// sign up form for new grader
router.post('/signupForm', function(req,res,next){
    var item = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    var data = new UserData(item);
    data.save();

    res.redirect('/');
});


module.exports = router;
