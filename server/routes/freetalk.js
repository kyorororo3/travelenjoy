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

router.get('/list', function (req, res) {
    let stmt = "select * from te_freetalk";
    connection.query(stmt, function (err, result) {
        if (err) console.log('connection result err : ' + result);
        console.log(result);
        res.json({list: result});
    });
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