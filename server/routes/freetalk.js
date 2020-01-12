const express = require('express');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();

router.get('/free/get/all', (req, res) =>
    res.json({
        list: [
            {id: 1, content: "free1111"},
            {id: 2, content: "free2222"}
        ]
    })
);

router.post('/free/save', function (req, res, param) {
        console.log('free save req : ' + req);

        // let stmt = "select * from test_min";
        // connection.query(stmt, function(err, result) {
        //     if(err) console.error("err : " + err);
        //     console.log(result);
        // })
        res.json({
            resp : "ok"
        })
    }
);

module.exports = router