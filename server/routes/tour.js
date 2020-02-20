// EXPRESS
const express = require('express');
const router = express.Router();

// MODULES
const bodyParser = require('body-parser');
const axios = require('axios');
const await = require('await');
const async = require('async');

// DB CONNECTION
const mysql = require('mysql');
const dbconfig = require('../config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

router.use(bodyParser.json());

// List 조회
router.get('/list', function (req, res) {
  const {search, start} = req.query;
  console.log("search : " + search + ", start : " + start);
  
  let params = [parseInt(start)];
  let sql = "select * from te_tour ";
  if(search !== undefined) {
    sql += "where title like ? or category=? "
    params = [ `%${search}%`, search ].concat(params);
  }
  sql += "limit ?, 12";  
  sql = mysql.format(sql, params);

  console.log(sql);

  conn.query(sql, function (err, rows) {
    if(err) return console.log("ERR!! " + err);
    // console.log(rows);
    res.send(rows);
  })
})

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

// Autocomplite
router.get('/list/autocomplite', (req, res) => {
  const {keyword} = req.query;
  const sql = "select * from te_tour_search where location like ?";

  if(keyword === '') return res.send([]);

  conn.query(sql, `${keyword}%`, (err, rows) => {
    if(err) return console.log("ERR!! " + err);
    res.send(rows);
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

// Detail 조회
router.get('/detail', (req, res) => {
  const { seq } = req.query;
  console.log(seq);

  let sql1 = "select * from te_tour where seq=?; ";
  let sql2 = "select * from te_tour_des where tour_seq=? order by start_time; ";

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
})

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

// 투어 가이드 조회
router.get('/detail/guide', (req, res) => {
  const {email} = req.query;
  const sql = 'select email, companyname, profile_img from te_member where email=?';

  conn.query(sql, email, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows[0]);
  })
})

// Detail-Review 조회
router.get('/detail/review', (req, res) => {
  const {tour_seq, start} = req.query
  console.log(`/tour/detail/review?tour_seq=${tour_seq}`);
  let sql = 'select * from te_tour_review where tour_seq=? ';
  sql += 'limit ?, 5';

  const params = [tour_seq, parseInt(start)];
  console.log(mysql.format(sql, params));
  conn.query(sql, params, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows);
  })
})

// Detail-Review-Length 조회
router.get('/detail/review/length', (req, res) => {
  const {tour_seq} = req.query
  const sql = 'select count(*) as length from te_tour_review where tour_seq=?';
  conn.query(sql, tour_seq, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows[0]);
  })
});

// Detail-Review-Average 조회
router.get('/detail/review/average', (req, res) => {
  const {tour_seq} = req.query;
  const sql = 'select avg(score) as avg from te_tour_review where tour_seq=?';
  conn.query(sql, tour_seq, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows[0]);
  })
})

// Detail-Review-Writer Infomation 조회
router.get('/detail/review/writer', (req, res) => {
  const {email} = req.query;
  const sql = 'select nickname, profile_img from te_member where email=?';
  
  conn.query(sql, email, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows[0]);
  })
});

// 문의하기 채팅방 생성
router.post('/question/chatroom', (req, res) => {
  const {guide, client} = req.body;
  let sql = 'select * from te_chat_room where guide=? and client=?';
  const params = [guide, client];

  sql = mysql.format(sql, params);

  conn.query(sql, (err, rows) => {
    if(err) return console.log(err);
    // console.log(rows[0]);
    if(rows[0] !== undefined) {
      console.log('조회결과 있음.');
      res.send(rows[0]);
    }else {
      console.log('조회결과 없음. insert 실행');
      let insert_sql = 'insert into te_chat_room(guide, client) values(?, ?); ';
      insert_sql = mysql.format(insert_sql, params);
      const sqls = insert_sql + sql;
      conn.query(sqls, (err, result) => {
        if(err) return console.log(err);
        res.send(result[1][0]);
      });
    }
  });
})

// 문의하기 채팅방 대화내용 불러오기
router.post('/question/chatmsg', (req, res) => {
  const {seq} = req.body;
  console.log(seq);
  const sql = 'select * from te_chat_msg where room_seq=?';

  conn.query(sql, seq, (err, rows) => {
    if(err) return console.log(err);
    console.log(rows);
    res.send(rows);
  })
})

// 예약하기
router.post('/reservation', (req, res) => {
  const { reservation_number, tour_seq, email, start_date, join_people, total_price, phone, message } = req.body;

  console.log(start_date);

  let sql1 = 'insert into te_tour_reservation values(null, ?, ?, ?, ?, ?, ?, ?, ?);';
  const params = [reservation_number, tour_seq, email, start_date, join_people, total_price, phone, message];
  sql1 = mysql.format(sql1, params);
  const sql2 = 'select last_insert_id() as seq;';

  const sqls = sql1 + sql2;
  conn.query(sqls, (err, result) => {
    if(err) return console.log("ERR!! " + err);
    res.send(result[1][0]); 
  })
})

// 예약정보 조회
router.get('/reservation/info', (req, res) => {
  const {seq} = req.query;
  const sql = 'select * from te_tour_reservation where seq=?';
  conn.query(sql, seq, (err, rows) => {
    if(err) return console.log(err);
    res.send(rows[0]);
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

// 투어 취소하기 rest api 요청
router.post('/cancle', async (req, res, next) => {
  try {
    /* 액세스 토큰(access token) 발급 */
    const getToken = await (axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { 
        "Content-Type": "application/json" 
      },
      data: {
        imp_key: "1276512919449348", // [아임포트 관리자] REST API키
        imp_secret: "QfSbPuGY4IKUEJlp06POTiJcKWROJHzAXrMNVtL0bwUQggggn55goPs8LkXv2w5ZYSMUlyVx4Pok6EBt" // [아임포트 관리자] REST API Secret
      }
    }));
    
    const { access_token } = getToken.data.response; // 엑세스 토큰
    const {reservation_number} = req.body; // 클라이언트로부터 전달받은 주문번호

    console.log(reservation_number)

    const sql = 'select * from te_tour_reservation where reservation_number=?';

    conn.query(sql, reservation_number, async (err, rows) => {
      if(err) return console.log(err);
      else {
        /* 아임포트 REST API로 결제환불 요청 */
        const getCancelData = await (axios({
          url: "https://api.iamport.kr/payments/cancel",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token // 아임포트 서버로부터 발급받은 엑세스 토큰
          },
          data: {
            reason: 'none', // 가맹점 클라이언트로부터 받은 환불사유
            merchant_uid: reservation_number, // imp_uid를 환불 고유번호로 입력
            // amount: rows[0].total_price
            amount: 10
          }
        }))
        const { response } = getCancelData.data;
        console.log(response);
        const { merchant_uid } = response;
        const delete_sql = "delete from te_tour_reservation where reservation_number=?";
        conn.query(delete_sql, merchant_uid, (err) => {
          if(err) return console.log(err);
          res.send({isSucc: true});
        });
      }
    })

  } catch(error) {
    console.log(error);
    res.send({isSucc: false});
  }
  
})

module.exports = router;