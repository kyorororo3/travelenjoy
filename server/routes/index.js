const express = require('express');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);

router.get('/routes/index', (req, res) =>
    res.json({
        list: [
            {id: 1, content: "content1!!!"},
            {id: 2, content: "content2!!!"}
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

module.exports = router