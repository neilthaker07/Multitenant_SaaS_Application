var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('exec');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index'); //index
});

router.post('/savefile', function(req, res, next) {
    var textToSave = req.body.textarea;
    fs.writeFile('/home/neil/Neil_Work/MS_SJSU/CT_281/final_personal_project/multitenant-app-281/multitenant/routes/example.seq', textToSave, function (err) {
      if (err) {
      }
    });

    exec('java -Dzanthan.prefs=diagram.preferences -jar /home/neil/Neil_Work/MS_SJSU/CT_281/final_personal_project/multitenant-app-281/multitenant/routes/sequence-10.0.jar --headless /home/neil/Neil_Work/MS_SJSU/CT_281/final_personal_project/multitenant-app-281/multitenant/routes/example.seq',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.redirect('/grader2/admin');
        });

/*    exec('sudo chmod 777 routes/example.png',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });*/
});

router.get('/grader2/admin', function (req, res, next) {
    res.render('grader', {grader: 'admin',filename:'/example.png'});
});


var userGlobal ;
// login flow for grader
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if(username=='admin' && password=='admin'){
        //res.redirect('281loadbalancer-1535719175.us-west-2.elb.amazonaws.com/sequence');
        res.redirect('/grader/'+username);
    }
    else{
        res.redirect('/');
    }
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

    exec('unzip '+__dirname+'/uploads/test1.zip -d '+__dirname+'/uploads',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    exec('java -jar '+__dirname+'/umlparser.jar '+__dirname+'/uploads '+__dirname+'/soutput.png',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.redirect('/grader3/admin');
        });
});

router.get('/grader3/admin', function (req, res, next) {
    res.render('grader', {grader: 'admin',filename:'/soutput.png'});
});

module.exports = router;