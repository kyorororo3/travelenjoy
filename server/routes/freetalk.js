const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

const mysql = require('mysql');
let dbconfig = require('../config/dbconfig')();
let connection = dbconfig.init();
dbconfig.conn_test(connection, 'freetalk!!');

router.get('/test', function (req, res) {
    res.json({
        list: [
            {id: 1, content: 'content1'},
            {id: 2, content: 'content2'}
        ]
    })
    console.log('get ok');
});

//게시물 페이징 + 검색
router.get('/list', function (req, res) {
    let talkList;
    const seq = (req.query.seq == null)?1:req.query.seq;
    let stmt = "select * from te_freetalk order by seq desc limit " + seq + ", 9";
    connection.query(stmt, function (err, result) {
        if (err) console.log('connection result err : ' + result);
        talkList = result;
        console.log('result len : ' + result.length);
        res.json({list: result, image: '1212'});
    });
    console.log('req seq : ' + req.query.seq);
    console.log('req seq == null' + (req.query.seq == null));
    console.log('req seq == undefined' + (req.query.seq == undefined));
});

router.post('/free/save/1', (req, res) => {
    //let body = JSON.parse(req.body);
    console.log('body : ' + req.body);
    console.log('title : ' + req.body.title);
    console.log('content : ' + req.body.content);
    console.log('email : ' + req.body.email);
    console.log('nick : ' + req.body.nickname);
});

router.post('/free/save', function (req, res, next) {
        const post = req.body;

        let stmt = "insert into te_freetalk (title, content, email, nickname) values(?, ?, ?, ?)";
        connection.query(stmt, [post.title, post.content, post.email, post.nickname], function (err, rows, fields) {
            if (err) console.log('connection result err : ' + err);
        });

        res.json({
            resp: "ok"
        });
});

module.exports = router