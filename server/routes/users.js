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
  cookie:{maxAge:30000} //30분으로 변경함 
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

router.get('/login/kakao', passport.authenticate('kakao'));

router.get('/login/kakao/callback', function (req, res, next) {
  passport.authenticate('kakao', function (err, user) {
    console.log('passport.authenticate(kakao)실행');
    if (!user) { return res.redirect('http://localhost:3000/login'); }
    req.logIn(user, function (err) { 
       console.log('kakao/callback user : ', user);
       return res.redirect('http://localhost:3000/');        
    });
  })(req, res);
});

router.get('/login/naver', passport.authenticate('naver'));

router.get('/login/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    console.log('passport.authenticate(naver)실행');
    if (!user) { return res.redirect('http://localhost:3000/login'); }
    req.logIn(user, function (err) { 
       console.log('naver/callback user : ', user);
       return res.redirect('http://localhost:3000/');        
    });
  })(req, res);
});


router.post('/logout', function(req, res) {
  req.logOut();
  res.send({msg:'로그아웃'})
});


router.post('/sign-up/duplicationCheck', function(req, res){
  //이메일 중복확인
 // console.log('/sign-up/emailCheck', req.body);
 if(req.body.email !== undefined){
    console.log('이메일 중복 체크');
    let sql = 'SELECT * FROM TE_MEMBER WHERE EMAIL=?';
    mysql.query(sql, [req.body.email], function(err, result){
      if(err) {res.send({msg:'err'})}
      if(result.length === 0){
        res.send({emailCheck:'ok'})
      }else{
        res.send({emailCheck:'no'})
      }
    });
 }else if(req.body.nickname !== undefined){
    console.log('닉네임 중복 체크');
    let sql = 'SELECT * FROM TE_MEMBER WHERE NICKNAME=?';
    mysql.query(sql, [req.body.nickname], function(err, result){
      if(err) {res.send({msg:'err'})}
      if(result.length === 0){
        res.send({nicknameCheck:'ok'})
      }else{
        res.send({nicknameCheck:'no'})
      }
    });
 }
  
});

router.post('/sign-up/member', upload.single('profile_img'), function (req, res, next) {
  console.log('/sign-up/member ' , req.body);
  console.log(req.file);
  let profile_img = '';
  if(req.file === undefined){ // 프로필 이미지 등록 안 한 경우
    profile_img = null;
  }else{
    let filetype = req.file.mimetype.substring(6);
    profile_img = req.file.filename + '.' + filetype;
    console.log(profile_img);
  }
  let sql = 'INSERT INTO TE_MEMBER(EMAIL, PWD, PROVIDER, PROVIDER_ID, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH)'
            + 'VALUES(?,?,NULL,NULL,?,?,?,?,3)';
  let datas = [req.body.email, req.body.pwd, req.body.name, req.body.nickname, profile_img,  req.body.phone];
  mysql.query(sql, datas, function (err, result) {
    if(err) {
      console.log('회원가입 INSERT ERR!!!!');
      res.send({msg:'fail'});
    }
    res.send({msg:'success'});
  })
})

module.exports = router;