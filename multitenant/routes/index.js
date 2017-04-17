var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('exec');

var userDataSchema = new Schema({
    username: {type: String, required:true},
    password: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
var userGlobal ;
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
    userGlobal = req.params.username;
    res.render('grader',{grader: req.params.username,filename:""});
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

var imageProcess;

// save the uploaded file to the server
router.post('/uploading', function(req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        imageProcess = file.name;
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occurred: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

// execute uploaded file on instance and get output image
router.post('/submit2',function (req, res, next) {

    var fileName = imageProcess;
    var fileWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    var pngName= fileWithoutExt+".png";

    exec('/home/neil/Neil_Work/MS_SJSU/CT_281/node_personal_project/multitenant-app-281/instance_execution/exe_script.sh /home/neil/Neil_Work/MS_SJSU/CT_281/node_personal_project/multitenant-app-281/multitenant/routes/uploads/'+fileName+' '+fileName+' '+pngName,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }

     res.render('grader', {grader: req.params.username,filename:pngName});

        });

});

module.exports = router;