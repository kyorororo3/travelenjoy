var express = require('express');
var app = express();
const api = require('./routes/index');
const cors = require('cors');

//routes는 알아서 넣어주세요

app.use(cors());
app.use('/api', api);

app.listen(3002);