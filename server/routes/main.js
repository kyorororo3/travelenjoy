const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// MySQL 
const mysql_config = require('../config/dbconfig')();
const mysql = mysql_config.init();
mysql_config.conn_test(mysql);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/recommend/tourlist', function (req, res) {
    console.log('/recommend/tourlist  req.start = ' , req.query.start);
    let sql = 'select t.seq, t.category, t.title, t.price, t.thumbnail, ifnull(round(r.avg, 2), 0) as score '
            + 'from te_tour t '
            + 'left join (select tour_seq, avg(score) as avg from te_tour_review group by tour_seq) r '
            + 'on t.seq = r.tour_seq ' 
            + 'where t.price is not null '
            + 'order by avg desc '
            + 'limit ?, 4 ;';
    sql = mysql.format(sql, [parseInt(req.query.start)]);
   // console.log(sql);
    mysql.query(sql, function (err, result) {
        if(err){console.log('평점 순 가져오기 실패요')}
     //   console.log(result);
        res.send(result);
    })
});

router.get('/tourScrap', function (req, res) {
    let {email, seq} = req.query;
    console.log('이메일 : ', email, 'seq : ', seq);
    let sql = 'insert into te_tour_scrap '
            + 'values(?, ?); ';
    sql = mysql.format(sql, [email, seq]);
    mysql.query(sql, function (err, result) {
        if(err){console.log('스크랩 에러요')}
        res.send({msg:true})
    })
});

router.get('/deletetourScrap', function (req, res) {
    let {email, seq} = req.query;
    console.log('이메일 : ', email, 'seq : ', seq);
    let sql = 'delete from te_tour_scrap ' 
            + 'where email = ? and tour_seq = ? ;';
    sql = mysql.format(sql, [email, seq]);
    mysql.query(sql, function (err, result) {
        if(err){console.log('스크랩 해제 에러요')}
        res.send({msg:false})
    })
});

router.get('/isScrap', function (req, res) {
    let {email, seq} = req.query;
    let sql = 'select * from te_tour_scrap '
            + 'where email = ? and tour_seq = ? ; ';
    sql = mysql.format(sql, [email, seq]);
    mysql.query(sql, function (err, result) {
        if(err){console.log('스크랩 조회 에러요')}

        if(result.length === 0){
            res.send({msg : false})
        }else{
            res.send({msg : true})
        }
    })
});

router.get('/recommend/talklist', function (req, res) {
    console.log('/recommend/talklist  req.start = ' , req.query.start);
    let sql = 'select f.seq, f.title, f.content, f.email, f.nickname, f.reg_date, ifnull(l.likecount, 0) as likecount, ifnull(c.commentcount, 0) as commentcount, i.name_saved '
            + 'from ((te_freetalk f '
            + 'left join (select te_freetalk_seq, count(*) as likecount from te_freetalk_likes group by te_freetalk_seq) l '
            + 'on f.seq = l.te_freetalk_seq) '
            + 'left join (select talk_seq, count(*) as commentcount from te_comment group by talk_seq) c '
            + 'on f.seq = c.talk_seq) '
            + 'left join (select te_freetalk_seq, name_saved from te_freetalk_images group by te_freetalk_seq) i '
            + 'on f.seq = i.te_freetalk_seq '
            + 'order by likecount desc, f.reg_date desc '
            + 'limit ?, 10 ; ';
    sql = mysql.format(sql, [parseInt(req.query.start)]);
   // console.log(sql);
    mysql.query(sql, function (err, result) {
        if(err){console.log('freetalk 조회 에러용')}
      //  console.log(result);
        res.send(result);
    })
});


module.exports = router;
