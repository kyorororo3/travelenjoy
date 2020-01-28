const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;


let mysql_config = require('../config/dbconfig')();
let mysql = mysql_config.init();
mysql_config.conn_test(mysql);

module.exports = () => {
    passport.serializeUser(function(user, done) {
        console.log("serializeUser ", user)
        if(user){
            done(null, user.email);
        }  
      });
      
    passport.deserializeUser(function(id, done) {
        console.log("deserializeUser id ", id)
        var sql = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH FROM TE_MEMBER WHERE EMAIL=?';
        mysql.query(sql , [id], function (err, result) {
            if(err) {done(err,null);}           
            console.log("deserializeUser mysql result : " , result);
            done(null, JSON.parse(JSON.stringify(result[0])));
        })    
    });
    

    // DB이용한 로그인
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd',
            session: true
        },
        function(username, password, done) {
            var sql = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH FROM TE_MEMBER WHERE EMAIL=? AND PWD=?';
            mysql.query(sql , [username, password], function (err, result) {
              if (err) { return done(err); }
              if (result.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
              }
              return done(null, JSON.parse(JSON.stringify(result[0])));
            });
        }
    ));
    
    // facebook로그인
    const facebookCredentials = require('../config/facebook.json');
    facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName'];
    passport.use(new FacebookStrategy(facebookCredentials,
      function(accessToken, refreshToken, profile, done) {
        //console.log('facebook profile ' , profile);

          let sql = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH FROM TE_MEMBER WHERE EMAIL=?';
          mysql.query(sql , [profile._json.email], function (err, result) {
              if(err) {return done(err);}         

              if(result.length === 0 ){ // facebook최초 로그인
                console.log('페이스북으로 첫 로그인입니다');
              
                  // DB INSERT 진행
                  let sql1 = 'INSERT INTO TE_MEMBER(EMAIL, PWD, PROVIDER, PROVIDER_ID, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH, COMPANYNAME, BRN)'
                            + 'VALUES(?,NULL,?,?,?,?,NULL,NULL,3,NULL,NULL); ';
                  let sql1Datas = [profile._json.email, profile.provider, profile._json.id, profile._json.name, profile._json.name];
                  
                  let sql2 = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE FROM TE_MEMBER WHERE EMAIL=?; ';
                  let sql2Datas = [profile._json.email];
                  
                  sql1 = mysql.format(sql1, sql1Datas);
                  sql2 = mysql.format(sql2, sql2Datas);

                  let sqls = sql1 + sql2;
                  
                  mysql.query(sqls, function (err, result) {
                    if(err) {console.log('INSERT ERR !! ')}
                    console.log(result[1][0]);
                    return done(null, JSON.parse(JSON.stringify(result[1][0])));
                  })
              }
              else{
                console.log('페이스북으로 첫 로그인이 아닙니다');
                return done(null, JSON.parse(JSON.stringify(result[0])));
              }              
          });   
      }
    ));

    // kakao 로그인
    const kakaoCredentials = require('../config/kakao.json');
    passport.use(new KakaoStrategy(kakaoCredentials,
    function(accessToken, refreshToken, profile, done){
      //console.log('kakaoStrategy ', profile);

      let sql = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH FROM TE_MEMBER WHERE EMAIL=?';
      mysql.query(sql , [profile._json.kakao_account.email], function (err, result) {
          if(err) {return done(err);}           
          if(result.length === 0 ){ 
            console.log('카카오로 첫 로그인입니다');
              // DB INSERT 진행
              let sql1 = 'INSERT INTO TE_MEMBER(EMAIL, PWD, PROVIDER, PROVIDER_ID, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH, COMPANYNAME, BRN)'
                        + 'VALUES(?,NULL,?,?,?,?,NULL,NULL,3,NULL,NULL); ';
              let sql1Datas = [profile._json.kakao_account.email, profile.provider, profile.id, profile.username, profile._json.properties.nickname];
              
              let sql2 = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE FROM TE_MEMBER WHERE EMAIL=?; ';
              let sql2Datas = [profile._json.kakao_account.email];
              
              sql1 = mysql.format(sql1, sql1Datas);
              sql2 = mysql.format(sql2, sql2Datas);

              let sqls = sql1 + sql2;
              
              mysql.query(sqls, function (err, result) {
                if(err) {console.log('INSERT ERR !! ')}
                console.log(result[1][0]);
                return done(null, JSON.parse(JSON.stringify(result[1][0])));
              })
          }
          else{
            console.log('카카오로 첫 로그인이 아닙니다');
            return done(null, JSON.parse(JSON.stringify(result[0])));
          }              
      });   

    }
  ));


  // naver로그인
  const naverCredentials = require('../config/naver.json');
  passport.use(new NaverStrategy(naverCredentials,
  function(accessToken, refreshToken, profile, done) {
      //console.log('naver strategy ', profile);

      let sql = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH FROM TE_MEMBER WHERE EMAIL=?';
      mysql.query(sql , [profile._json.email], function (err, result) {
          if(err) {return done(err);}           
          if(result.length === 0 ){ // naver최초 로그인
            console.log('네이버로 첫 로그인입니다');
              // DB INSERT 진행
              let sql1 = 'INSERT INTO TE_MEMBER(EMAIL, PWD, PROVIDER, PROVIDER_ID, NAME, NICKNAME, PROFILE_IMG, PHONE, AUTH, COMPANYNAME, BRN)'
                        + 'VALUES(?,NULL,?,?,?,?,NULL,NULL,3,NULL,NULL); ';
              let sql1Datas = [profile._json.email, profile.provider, profile.id, profile.displayName, profile._json.nickname];
              
              let sql2 = 'SELECT EMAIL, PROVIDER, NAME, NICKNAME, PROFILE_IMG, PHONE FROM TE_MEMBER WHERE EMAIL=?; ';
              let sql2Datas = [profile._json.email];
              
              sql1 = mysql.format(sql1, sql1Datas);
              sql2 = mysql.format(sql2, sql2Datas);

              let sqls = sql1 + sql2;
              
              mysql.query(sqls, function (err, result) {
                if(err) {console.log('INSERT ERR !! ')}
                console.log(result[1][0]);
                return done(null, JSON.parse(JSON.stringify(result[1][0])));
              })
          }
          else{
            console.log('네이버로 첫 로그인이 아닙니다');
            return done(null, JSON.parse(JSON.stringify(result[0])));
          }              
      });   
  }
  ));
    
}

