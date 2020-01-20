// EXPRESS
const express = require('express');
const router = express.Router();

// MODULES
const bodyParser = require('body-parser');

// DB CONNECTION
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

// List 조회
router.get('/list', function (req, res) {
  const {search} = req.query;
  // console.log(search);
  let sql = "select * from te_tour";

  if(search !== undefined) {
    sql = "select * from te_tour where title like ? or category=?";
    const params = [ `%${search}%`, search ];
    sql = mysql.format(sql, params);
  }

  console.log(sql);

  conn.query(sql, function (err, rows) {
    if(err) return console.log("ERR!! " + err);
    console.log(rows);
    res.send(rows);
  })
})

// Detail 조회
router.get('/detail/:seq', (req, res) => {
  let { seq } = req.params;
  console.log(seq);

  let sql1 = "select * from te_tour where seq=?; ";
  let sql2 = "select * from te_tour_sche where tour_seq=?; ";
  let sql3 = "select * from te_tour_des where tour_seq=?; ";

  let params = [ seq ];

  sql1 = mysql.format(sql1, params);
  sql2 = mysql.format(sql2, params);
  sql3 = mysql.format(sql3, params);
  let sqls = sql1 + sql2 + sql3;  // multiple statements

  let _tour_info;
  let _tour_sche;
  let _tour_des;

  conn.query(sqls, (err, result) => {
    if(err) return console.log("ERR!! " + err);
    console.log(result);
    _tour_info = result[0][0];  // 1개의 정보가 json으로
    _tour_sche = result[1]; // 여러개의 정보(json)가 배열로
    _tour_des = result[2];  // 여러개의 정보(json)가 배열로

    res.send({
      tour_info: _tour_info,
      tour_sche: _tour_sche,
      tour_des: _tour_des,
    });
  });
});

module.exports = router;