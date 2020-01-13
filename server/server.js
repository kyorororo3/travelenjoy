var express = require('express');
var app = express();

const login = require('./routes/login');
const mypage = require('./routes/mypage');
const cors = require('cors');

//routes는 알아서 넣어주세요

app.use(cors());
app.use('/login', login);
app.use('/mypage', mypage);

app.listen(3002);