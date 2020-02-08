const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//파일관련 모듈
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });
//db
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

router.use(bodyParser.json());//파라미터 사용

//Tour 등록
router.post('/makeAf', upload.single('thumbnail'), function (req, res) {
  console.log('/guide/makeAf 접속!');
  console.log(req.body);
  console.log("파일..", req.file);

  var sql = "INSERT INTO TE_TOUR(EMAIL, COMPANYNAME, CATEGORY, TITLE, CONTENT, THUMBNAIL, PERIOD, MIN_PEOPLE, MAX_PEOPLE, PRICE)" +
    " VALUE(?,?,?,?,?,?,?,?,?,?)";
  var val = [req.body.email, req.body.companyname, req.body.category, req.body.title, req.body.content, req.file.filename, req.body.period, req.body.min_people, req.body.max_people, req.body.price]
  conn.query(sql, val, function (err, result) {
    if (err) return console.log("err!! " + err);
    else {
      console.log("insert suc: ", result.insertId);
      res.send({ result });
    }
  })
});

//Tour_Des 등록
router.post('/makeDesAf', upload.single('des_img'), function (req, res) {
  console.log('/guide/makeDesAf 접속!');
  console.log(req.body);
  console.log("파일..", req.file);
  var sql = "INSERT INTO TE_TOUR_DES(TOUR_SEQ, DES_NAME, DES_IMG, DES_DESCRIPTION, POSTCODE, ADDRESS, ADDRESS_DETAIL,TOUR_DAY,START_TIME,END_TIME) " +
    "VALUE(?,?,?,?,?,?,?,1,?,?)";
  var val = [req.body.tour_seq, req.body.des_name, req.file.filename, req.body.des_description, req.body.postcode, req.body.address, req.body.address_detail, req.body.start_time, req.body.end_time]
  conn.query(sql, val, function (err) {
    if (err) return console.log("err!! " + err);
    else res.send('suc');
  })
});

//Tour list
router.get('/tourList', function (req, res) {
  console.log('/guide/tourList 접속!');
  console.log(req.query.email);
  var sql = "SELECT * FROM TE_TOUR WHERE EMAIL = ?"
  var val = req.query.email;
  conn.query(sql, val, function (err, data) {
    if (err) return console.log("Tour list err!! " + err);
    else res.send(data);
  })
});

//Tour Detail
router.get('/tourDetail', function(req, res){
  console.log('guide/tourDetail 접속!');
  console.log(req.query);

});

// Question List
router.get('/questionList', (req, res) => {
  const {email} = req.query;
  const sql = 'select * from te_chat_room where guide=?';

  conn.query(sql, email, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows);
  })
})

module.exports = router;