const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let mysql_config = require('../config/dbconfig')();
let mysql = mysql_config.init();
mysql_config.conn_test(mysql);

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd'
        },
        function(username, password, done) {
            var sql = 'SELECT * FROM TE_MEMBER WHERE EMAIL=? AND PWD=?';
            mysql.query(sql , [username, password], function (err, result) {
            if(err) console.log('mysql 에러');  
            // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
            if(result.length === 0){
                console.log("결과 없음");
                return done(null, false);
            }else{
                console.log("로그인 성공" + result);
                var json = JSON.stringify(result[0]);
                var userinfo = JSON.parse(json);
                console.log("userinfo " + userinfo);
                return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
            }
            })
        }
    ));
}