const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

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
    let emailTemplete = '<div style="text-align: center;">'
                        + '<p><img width="200px" src="cid:logoImg"></p>'
                        + '<p>Travel&Joy 회원 가입을 위한 인증번호 입니다.</p>'
                        + '<p>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p>'
                        + '<div style="margin: auto; width: 200px; border: 1px solid #d9e1e8; color: #2b90d9;">'
                        + `<h2>${authNum}</h2>`
                        + '</div></div>';

    // 메일 작성
    const mailOptions = {
      from: 'mskkl770@gmail.com',
      to: req.body.email,
      subject: '[Travel&Joy] 회원가입 인증번호입니다.',
      html : emailTemplete,
      attachments: [{
        filename: 'logo.png',
        path: './src/resources/users/images/logo.png',
        cid: 'logoImg'
      }]
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