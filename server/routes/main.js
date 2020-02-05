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
    let sql = 'select t.seq, t.category, t.title, t.price, ifnull(round(r.avg, 2), 0) as score '
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
})

module.exports = router;
