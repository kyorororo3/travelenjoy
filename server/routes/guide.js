const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mysql = require('mysql');
const dbconfig = require('../config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

router.use(bodyParser.json());//파라미터 사용

router.post('/makeAf', function (req, res) {
    console.log('/guide/makeAf 접속!');
    console.log(req.body);
    var sql = "INSERT INTO TE_TOUR(EMAIL, NICKNAME, CATEGORY, TITLE, CONTENT, THUMBNAIL, PERIOD, MIN_PEOPLE, MAX_PEOPLE, PRICE)" +
            " VALUE('mandoo','mandooNuna',?,?,?,?,?,?,?,?)"; 
    var val = [req.body.category, req.body.title, req.body.content, req.body.tumbnail, req.body.period, req.body.min_people, req.body.max_people, req.body.price]
  conn.query(sql, val, function (err) {
    if(err) return console.log("err!! " + err);
    else res.send('suc');
  })
});

module.exports = router;