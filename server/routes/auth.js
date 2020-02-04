const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// nodemailer
const nodemailer = require('nodemailer');
const mailCredentials = require('../config/nodemailer.json');
const smtpTransport = nodemailer.createTransport(mailCredentials);

let randomNum;
function setRandomNumber(rnum) {
    randomNum = rnum;
}

function getRandomNumber() {
    return randomNum;
}

router.post('/emailAuth', async(req, res) => {

    // 인증을 위한 인증 키 생성

    // 문자 + 숫자
    // let randomNum = Math.random().toString(36).substr(2,6);
    // console.log('randomNum = ', randomNum);

    // 숫자
    let rnum = Math.random().toString().substr(2,6);
    setRandomNumber(rnum);
    let authNum = getRandomNumber();

   let emailTemplete;
   ejs.renderFile('./src/resources/users/emailtemplete.ejs', {authCode : authNum}, function (err, data) {
        if(err){console.log('ejs.renderFile err')}
        emailTemplete = data;
    });

    const mailOptions = {
        from: 'mskkl770@gmail.com',
        to: req.body.email,
        subject: '[Travel&Joy] 회원가입 인증번호입니다.',
        html : emailTemplete
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


  router.post('/emailAuth/check', function (req, res) {
     // console.log('/emailAuth/check', req.body.authCode);
      let correctCode = getRandomNumber();
      if(req.body.authCode === correctCode){
          res.send({msg : 'ok'});
      }else{
        res.send({msg : 'no'});
      }
  })

module.exports = router;