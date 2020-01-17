var express = require('express');
var app = express();

// ROUTERS
const login = require('./routes/login');
const mypage = require('./routes/mypage');
const tour = require('./routes/tour');
const freetalk = require('./routes/freetalk')

const cors = require('cors');

app.use(cors());
app.use('/login', login);
app.use('/mypage', mypage);
app.use('/tour', tour);
app.use('/freetalk', freetalk);

app.listen(3002);