const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// nodemailer
const nodemailer = require('nodemailer');
const mailCredentials = require('../config/nodemailer.json');
const smtpTransport = nodemailer.createTransport(mailCredentials);

router.post('/emailAuth', async(req, res) => {
    // 메일 작성
    const mailOptions = {
      from: 'mskkl770@gmail.com',
      to: req.body.email,
      subject: '[Travel&Joy] 회원가입 인증번호입니다.',
      text: '내용'
    };
    // 실제 메일 전송되는 부분
    await smtpTransport.sendMail(mailOptions, (error, info) =>{
        if(error){
          res.json({msg:'err'});
        }else{
          res.json({msg:'sucess'});
        }
        smtpTransport.close();
    });
  });

module.exports = router;