const express = require('express');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();

router.get('/free/get/alltest', (req, res) =>
    res.json({
        list: [
            {id: 1, content: "free1111"},
            {id: 2, content: "free2222"}
        ]
    })
);

router.get('/routes/dbtest', function (req, res) {
        let stmt = "select * from test_min";
        connection.query(stmt, function(err, result) {
            if(err) console.error("err : " + err);
            console.log(result);
        })
    }
);

router.get('/free/get/all', function (req, res) {
    let stmt = "select * from te_freetalk";
    connection.query(stmt, function (err, result) {
        if (err) console.log('connection result err : ' + result);
        console.log(result);
        res.json({list: result});
        // result = JSON.stringify(rows);
        // console.log('result : ' + result);
        // console.log('fields : ' + fields);
        // res.json({
        //     result: rows
            // resp: "ok",
            // result: rows,
            // checker: "done"
        // });
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