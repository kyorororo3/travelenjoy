const express = require('express');
const app = express();
const cors = require('cors');


// ROUTERS
const users = require('./routes/users');
const mypage = require('./routes/mypage');
const tour = require('./routes/tour');
const freetalk = require('./routes/freetalk')
const guide = require('./routes/guide');
const auth = require('./routes/auth');
const main = require('./routes/main');

app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use('/users', users);
app.use('/mypage', mypage);
app.use('/tour', tour);
app.use('/freetalk', freetalk);
app.use('/guide', guide);
app.use('/auth', auth);
app.use('/main', main);


app.listen(3002);