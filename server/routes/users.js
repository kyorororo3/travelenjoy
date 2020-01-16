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
router.use(cookieParser('keyboard cat'));
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:30000, 
          secure:false,
          httpOnly:false}
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
    req.logIn(user, function (err) { 
       return res.send(user);        
    });
  })(req, res);
});

module.exports = router;