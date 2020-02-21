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

let users = [];

io.on('connection', (socket) => {
  console.log('a user connected. socket id : ' + socket.id);

  socket.on('join', (name) => {
    console.log(`socket id : ${socket.id} room : ${name}`)
    socket.join(name);
    
    // 방이 이미 생성되어 있는지 체크체크!
    let isExist = false;
    users.some(obj => {
      if(obj.room === name) {
        obj.member.push(socket.id)
        isExist = true;
        return true;
      };
    });

    if(!isExist) {
      users.push({room: name, member: [socket.id]});
    }

    console.log(users);

    socket.broadcast.to(name).emit('join', {
      msg: '누군가가 들어왔따!'
    })
  })

  socket.on('sendmsg', (data) => {
    const {seq, writer, msg} = data
    console.log(`writer : ${writer} msg : ${msg}`);

    // 1대1 대화방이므로 접속자 수가 2명이라면? 글을 읽은 상태가 되는것이다 ㅋ
    let join_member = 0;
    let isread = 1;
    users.some(obj => {
      if(obj.room === `room${seq}`) {
        join_member = obj.member.length;
      }
    })

    if(join_member === 2) {
      isread = 0;
    } 

    const send = {
      seq : seq,
      writer : writer,
      msg : msg,
      isread : isread
    }
    io.to(`room${seq}`).emit('sendmsg', send);
    
    // 대화내용 db 저장
    const sql = 'insert into te_chat_msg(room_seq, writer, msg, isread) values (?, ?, ?, ?)';
    const params = [seq, writer, msg, isread];
    conn.query(sql, params, (err) => {
      if(err) return console.log(err);
      console.log('insert 성공!');
    });
  })

  socket.on('leave', (data) => {
    const {seq} = data
    users.some((obj, index) => {
      if(obj.room === `room${seq}`) {
        obj.member.some((mem, index) => {
          if(mem === socket.id) {
            obj.member.splice(index, 1);
            return true;
          }
        })

        if(obj.member.length === 0) {
          users.splice(index, 1);
        }

        return true;
      }
    })

    console.log(users);
  })
  
  socket.on('disconnect', () => {
    console.log('a user disconneted. socket id : ' + socket.id);
  })

})