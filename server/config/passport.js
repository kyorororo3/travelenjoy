const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let mysql_config = require('../config/dbconfig')();
let mysql = mysql_config.init();
mysql_config.conn_test(mysql);

module.exports = () => {
    passport.serializeUser(function(user, done) {
        console.log("serializeUser ", user)
        if(user){
            done(null, user.EMAIL);
        }  
      });
      
    passport.deserializeUser(function(id, done) {
        console.log("deserializeUser id ", id)
        var sql = 'SELECT * FROM TE_MEMBER WHERE EMAIL=?';
        mysql.query(sql , [id], function (err, result) {
            if(err) {done(err,null);}           
            console.log("deserializeUser mysql result : " , result);
            done(null, result[0]);
        })    
    });
      
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd',
            session: true
        },
        function(username, password, done) {
            var sql = 'SELECT * FROM TE_MEMBER WHERE EMAIL=? AND PWD=?';
            mysql.query(sql , [username, password], function (err, result) {
              if (err) { return done(err); }
              if (result.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
              }
              return done(null, JSON.parse(JSON.stringify(result[0])));
            });
        }
    ));
}