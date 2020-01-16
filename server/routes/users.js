const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
router.use(cookieParser());
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:30000}
}));
router.use(passport.initialize());
router.use(passport.session());
passport_config();


passport.serializeUser(function(user, done) {
  console.log("serializeUser ", user)
  if(user){
      done(null, user.EMAIL);
  }  
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser id ", id)
  var userinfo;
  var sql = 'SELECT * FROM TE_MEMBER WHERE EMAIL=?';
  mysql.query(sql , [id], function (err, result) {
    if(err) {console.log('mysql 에러'); done(err,null);}
   
    console.log("deserializeUser mysql result : " , result);
    var json = JSON.stringify(result[0]);
    userinfo = JSON.parse(json);
    done(null, userinfo);
  })    
});

router.get('/getUser',function(req, res){
  console.log('req.isAuthenticated() = ', req.isAuthenticated(), req.user);
  var loginUser = [];
  if(req.user){
    loginUser = req.user;
  }
  res.send(loginUser);
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send([]); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });
  })(req, res, next);
});

module.exports = router;