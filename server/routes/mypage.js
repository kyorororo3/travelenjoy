const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);

router.use(bodyParser.json());


