// EXPRESS
const express = require('express');
const router = express.Router();

// MODULES
const bodyParser = require('body-parser');

// DB CONNECTION
const dbconfig = require('../config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

router.get('/list', function (req, res) {
  var sql = "select * from te_tour";
  conn.query(sql, function (err, rows) {
    if(err) return console.log("ERR!! " + err);
   // console.log(rows);
    res.send(rows);
  })
});

module.exports = router;