var express = require('express');
var app = express();
const bodyParser = require('body-parser');

const api = require('./routes/index');
const api_freetalk = require('./routes/freetalk');
const cors = require('cors');

//routes는 알아서 넣어주세요

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);
app.use('/api', api_freetalk);



app.listen(3002);