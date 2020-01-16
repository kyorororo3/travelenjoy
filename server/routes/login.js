const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);

router.use(bodyParser.json());

router.post('/', (req, res) => {
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

  module.exports = router;