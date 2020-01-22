const express = require('express');
const app = express();
const cors = require('cors');


// ROUTERS
const users = require('./routes/users');
const mypage = require('./routes/mypage');
const tour = require('./routes/tour');
const freetalk = require('./routes/freetalk')

app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use('/users', users);
app.use('/mypage', mypage);
app.use('/tour', tour);
app.use('/freetalk', freetalk);

app.listen(3002);