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
    const seq = (req.query.seq == null)?1:req.query.seq;
    let stmt = "select * from te_freetalk order by seq desc limit " + seq + ", 9";
    connection.query(stmt, function (err, result) {
        if (err) console.log('connection result err : ' + result);
        res.json({list: result});
    });
});

router.get('/list/images', function(req, res) {
    // const {seq} = req.query.seq;
    const stmt = "select * from te_freetalk_images where te_freetalk_seq=?";
    connection.query(stmt, req.query.seq, function(err, result){
        if(result == null)
            res.send(false)
        else
            res.json({images:result});
    });
})

router.get('/list/likes', function(req, res) {
    // const {seq} = req.query.seq;
    const stmt = "select count(*) as cnt from te_freetalk_likes where te_freetalk_seq=?";
    connection.query(stmt, req.query.seq, function(err, result){
        res.json({likes: result[0].cnt})
    });
})

//게시물 ID에 맞는 댓글 리턴
router.get('/list/comments', function(req, res) {
    const stmt = "select * from te_comment a, te_member b where talk_seq=? and a.email = b.email";
    connection.query(stmt, req.query.talk_seq, function(err, result){
        res.json({comments: result})
    });

})

//게시물 ID에 맞는 댓글 수 리턴
router.get('/list/comments/count', function(req, res) {
    const stmt = "select count(*) as cnt from te_comment where talk_seq=?";
    connection.query(stmt, req.query.seq, function(err, result){
        res.json({comments: result[0].cnt})
    });
})

//게시글 작성자 정보 리턴
router.get('/list/author', function(req, res) {
    const stmt = "select * from te_member where email=? and nickname=?";
    connection.query(stmt, [req.query.email, req.query.nickname], function(err, result){
        res.json({author: result[0]});
    });
})

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