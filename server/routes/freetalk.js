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

module.exports = router