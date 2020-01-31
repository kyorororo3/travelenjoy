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

router.use(bodyParser.json());

// List 전체 길이
router.get('/list/length', (req, res) => {
  const {search} = req.query;
  console.log("search : " + search);
  let sql = 'select count(*) as length from te_tour';
  if(search !== undefined) {
    sql += ' where title like ? or category=?';
    const params = [ `%${search}%`, search ];
    sql = mysql.format(sql, params);
  }

  console.log(sql);
  conn.query(sql, (err, rows) => {
    if(err) return console.log("ERR!! " + err);
    res.send(rows[0]);
  })
})

// List 조회
router.get('/list', function (req, res) {
  const {search, start, end} = req.query;
  console.log("search : " + search + ", start : " + start + " end : " + end);
  
  let params = [parseInt(start), parseInt(end)];
  let sql = "select @rownum := @rownum + 1 as rownum, tb.* "
  if(search !== undefined) {
    sql += "from (select * from te_tour where title like ? or category=?) as tb, "
    params = [ `%${search}%`, search ].concat(params);
  }else {
    sql += "from (select * from te_tour) as tb, "
  }
  sql += "(select @rownum := 0) as r "
  sql += "limit ?, ?";  
  sql = mysql.format(sql, params);

  console.log(sql);

  conn.query(sql, function (err, rows) {
    if(err) return console.log("ERR!! " + err);
    // console.log(rows);
    res.send(rows);
  })
})


// Autocomplite
router.get('/autocomplite', (req, res) => {
  const {keyword} = req.query;
  const sql = "select * from te_tour_search where location like ?";

  conn.query(sql, `${keyword}%`, (err, rows) => {
    if(err) return console.log("ERR!! " + err);
    res.send(rows);
  })
})

// 검색어가 db에 저장된 location인지 확인!
router.get('/location', (req, res) => {
  const {loc} = req.query;
  const sql = "select * from te_tour_search where location=?";

  conn.query(sql, loc, (err, rows) => {
    if(err) return console.log("ERR!! " + err);
    
    if(rows.length === 0) {
      console.log('조회 결과가 없습니다.');
      res.send({isLoc: false});
    }else {
      console.log('조회 결과가 존재합니다.');
      res.send({isLoc: true});
    }
  })
})

// 투어 신청이 불가능한 날짜 반환
// router.get('/disabledays', (req, res) => {
//   console.log('http://localhost:3002/tour/disabledays GET');
//   const {tour_seq} = req.query;
//   const sql = 
//   const params = [tour_seq, tour_seq];

//   conn.query(sql, params, (err, result) => {
//     if(err) return console.log(err);
//     res.send(result);
//   });
// })

// 스크랩 여부 확인 / 추가 / 삭제
router.get('/detail/scrap/:command', (req, res) => {
  const { command } = req.params;
  const {email, tour_seq} = req.query;
  console.log(email + " " + tour_seq);
  
  const params = [email, tour_seq];
  if(command === 'isScrapped') {
    const sql = 'select * from te_tour_scrap where email=? and tour_seq=?';

    conn.query(sql, params, (err, result) => {
      if(err) return console.log(err);
      
      let isScrapped = false;
      if(result[0] !== undefined) {
        isScrapped = true;
      }
      res.send({isScrapped: isScrapped});
    })
  }else if(command === 'insert') {
    const sql = 'insert into te_tour_scrap values(?, ?)';

    conn.query(sql, params, (err) => {
      if(err) return console.log(err);
      res.send();
    })
  }else if(command === 'delete') {
    const sql = 'delete from te_tour_scrap where email=? and tour_seq=?';

    conn.query(sql, params, (err) => {
      if(err) return console.log(err);
      res.send();
    })
  }
})

// Detail 조회
router.get('/detail/:seq', (req, res) => {
  const { seq } = req.params;
  console.log(seq);

  let sql1 = "select * from te_tour where seq=?; ";
  let sql2 = "select * from te_tour_des where tour_seq=?; ";

  sql1 = mysql.format(sql1, seq);
  sql2 = mysql.format(sql2, seq);

  let sql3 = 'select start_date' 
  + ' from (select start_date, sum(join_people) as count'
  + ' from te_tour_reservation'
  + ' where tour_seq=? and start_date > now()'
  + ' group by start_date'
  + ') a'
  + ' where count >=(select max_people from te_tour where seq=?)'
  + ' order by start_date;';

  const params = [seq, seq]
  
  sql3 = mysql.format(sql3, params);

  let sqls = sql1 + sql2 + sql3;  // multiple statements

  conn.query(sqls, (err, result) => {
    if(err) return console.log("ERR!! " + err);
    console.log(result);
    const _tour_info = result[0][0];  // 1개의 정보가 json으로
    const _tour_des = result[1];  // 여러개의 정보(json)가 배열로
    const _disabledDays = result[2];
    
    res.send({
      tour_info: _tour_info,
      tour_des: _tour_des,
      disabledDays: _disabledDays
    });
  });

  // 예약하기
  router.post('/reservation', (req, res) => {
    const { reservation_number, tour_seq, email, start_date, join_people, total_price } = req.body;

    console.log(start_date);

    const sql = 'insert into te_tour_reservation values(?, ?, ?, ?, ?, ?)';
    const params = [reservation_number, tour_seq, email, start_date, join_people, total_price];
    conn.query(sql, params, (err) => {
      if(err) {
        console.log("ERR!! " + err);
        res.send({result: 'fail'});
      } else{
        res.send({result: 'succ'}); 
      }
    })
  })

  // 투어 신청 가능인원 조회
  router.post('/available', (req, res) => {
    console.log('http://localhost:3002/tour/available POST');
    const { tour_seq, date } = req.body;
    console.log(tour_seq, date);
    const sql = 'select sum(join_people) as count from te_tour_reservation where tour_seq=? and start_date=?'
    const params = [tour_seq, date];

    conn.query(sql, params, (err, rows) => {
      if(err) return console.log("ERR!! " + err);
      let count = '0';
      console.log(rows);
      if(rows[0].count !== null) {
        count = (rows[0].count).toString();
      }
      res.send(count);
    })
  })



});

module.exports = router;