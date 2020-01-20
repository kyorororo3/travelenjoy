const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/'});

// MySQL 
const mysql_config = require('../config/dbconfig')();
const mysql = mysql_config.init();
mysql_config.conn_test(mysql);

// Passport.js
const passport = require('passport');
let passport_config = require('../config/passport');

router.use(express.static("public"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat'));
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:30000}
}));
router.use(passport.initialize());
router.use(passport.session());
passport_config();

router.get('/getUser',function(req, res){
  console.log('req.isAuthenticated() = ', req.isAuthenticated(), req.user);
  var loginUser = [];
  if(req.user){
    loginUser = req.user;
  }
  res.send(loginUser);
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (!user) { return res.send([]); }
    req.logIn(user, function (err) { 
       return res.send(user);        
    });
  })(req, res);
});

router.get('/login/facebook', passport.authenticate('facebook', {scope:'email'}));

router.get('/login/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function (err, user) {
    console.log('passport.authenticate(facebook)실행');
    if (!user) { return res.redirect('http://localhost:3000/login'); }
    req.logIn(user, function (err) { 
       console.log('facebook/callback user : ', user);
       return res.redirect('http://localhost:3000/');        
    });
  })(req, res);
});

router.post('/account', upload.single('profile_img'), function (req, res, next) {
  console.log('/account ' , req.body);
  console.log(req.file);
  let filetype = req.file.mimetype.substring(6);
  let profile_img = req.file.filename + '.' + filetype;
  console.log(profile_img);
  let sql = 'INSERT INTO TE_MEMBER(EMAIL, PWD, PROFILE_IMG, NAME, NICKNAME, PHONE, AUTH)'
            + 'VALUES(?,?,?,?,?,?,3)';
  let datas = [req.body.email, req.body.pwd, profile_img, req.body.name, req.body.nickname, req.body.phone];
  mysql.query(sql, datas, function (err, result) {
    if(err) {
      console.log('회원가입 INSERT ERR!!!!');
      res.send({msg:'fail'});
    }
    res.send({msg:'success'});
  })
 
})


module.exports = router;