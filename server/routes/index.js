const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);

router.use(bodyParser.json());  // 

router.get('/routes/index', (req, res) =>
    res.json({
        list: [
            {id: 1, content: "content1!!!"},
            {id: 2, content: "content2!!!"}
        ]
    })
);

router.get('/routes/dbtest', function (req, res) {
        let stmt = "select * from test_min";
        connection.query(stmt, function(err, result) {
            if(err) console.error("err : " + err);
            console.log(result);
        })
    }
);



router.post('/account', (req, res) => {
  console.log(req.body);

  var sql = "insert into te_member(email, pwd, nickname, name, auth) " + 
            "values(?, ?, ?, ?, 3)";
  var params = [req.body.email, req.body.pwd, req.body.nickname, req.body.name];
  connection.query(sql, params, function(err) {
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.send({result: 'succ'});
  });
});

router.post('/login', (req, res) => {
  console.log(req.body);

  var sql= "select * from te_member where email=? and pwd=?";
  var params = [req.body.email, req.body.pwd];
  connection.query(sql, params, function(err, rows) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else {
      //console.log(rows[0]);
      var obj = rows[0];

      // 일치하는 자료가 없을 경우 undefined
      // --> json 타입의 데이터가 아니라 에러 발생
      if(obj === undefined) {
        obj = {};
      }
      console.log(obj);
      res.send(obj);
    }
  });
});

module.exports = router