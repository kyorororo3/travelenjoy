var express = require('express');
var app = express();

// ROUTERS
const login = require('./routes/login');
const mypage = require('./routes/mypage');
const tour = require('./routes/tour');

const cors = require('cors');

app.use(cors());
app.use('/login', login);
app.use('/mypage', mypage);
app.use('/tour', tour);

app.listen(3002);