const express = require('express')
const app = express()

// DB CONNECTION
const mysql = require('mysql');
const dbconfig = require('./config/dbconfig')();
const conn = dbconfig.init();
dbconfig.conn_test(conn);

const server = require('http').createServer(app);
server.listen(4000, () => console.log('server is running on port 4000...'))

const cors = require('cors')
app.use(cors());

const socketio = require('socket.io')();
const io = socketio.listen(server);

io.on('connection', (socket) => {
  console.log('a user connected. socket id : ' + socket.id);

  socket.on('join', (name) => {
    console.log(`socket id : ${socket.id} room : ${name}`)
    socket.join(name);
  })

  socket.on('sendmsg', (data) => {
    const {seq, writer, msg} = data
    console.log(`writer : ${writer} msg : ${msg}`);
    io.to(`room${seq}`).emit('sendmsg', data);
    
    // 대화내용 db 저장
    const sql = 'insert into te_chat_msg(room_seq, writer, msg) values (?, ?, ?)';
    const params = [seq, writer, msg];
    conn.query(sql, params, (err) => {
      if(err) return console.log(err);
      console.log('insert 성공!');
    });
  })
  
  socket.on('disconnect', () => {
    console.log('a user disconneted. socket id : ' + socket.id);
  })

})