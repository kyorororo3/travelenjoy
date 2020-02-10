const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'public/uploads/'})

const mysql = require('mysql');
let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);


router.use(express.static("/public/uploads"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/info/nickname', (req,res)=>{
    
    console.log(req.body.nickname);
    if(req.body.nickname !== undefined){
        let sql = 'select * from te_member where nickname=?';
        connection.query(sql, [req.body.nickname], (err, result) => {
            if(err) return console.log('err' + err);
            console.log(result);
            if(result.length === 0){
                console.log('사용할 수 있는 닉네임입니다.');
                res.send({isExistNickname:false});
            }else{
                console.log('이미 존재하는 닉네임입니다.');
                res.send({isExistNickname:true});
            }
    
        })
    }
    
});

router.post('/info/updatemember', upload.single('profile_img'), (req,res)=>{
    console.log('/info/update', req.body);
    let email = req.body.email;
    let profile_img = '';
    let nickname = req.body.nickname;
    let phone = req.body.phone;

    console.log(email, nickname, profile_img, phone);
    let sql = '';
    let datas = '';
    if(req.file === undefined){
       sql =  'update te_member set nickname =?, phone =? where email =?';
       datas = [nickname, phone, email];
    }
    else{
        let filetype = req.file.mimetype.substring(6);
        profile_img = req.file.filename + '.' + filetype;
        console.log(profile_img);
        sql = 'update te_member set nickname =?, profile_img =?, phone =? where email =?';
        datas = [nickname, profile_img, phone, email];
    }

    connection.query(sql, datas, (err, result) => {
        if(err) return console.log('err' + err);
        console.log(result);
        if(result.length === 0){
            console.log('프로필 수정 실패');
            res.send({isUpdateSuccess:false});
        }else{
            console.log('프로필 수정 성공');
            res.send({isUpdateSuccess:true});
        }
    })
})

router.get('/travel', function (req, res) {
    const {search} = req.query;
    const {email} = req.query;
   

    let sql = "select * from te_tour a, te_tour_reservation b where a.seq = b.tour_seq  and b.email = ?";
    let params = [ email ];
    sql = mysql.format(sql, params);

    if(search !== undefined) {
      sql = "select * from te_tour a, te_tour_reservation b where a.seq = b.tour_seq  and b.email = ? and a.title like ? or a.category=?";
      params  = [ email, `%${search}%`, search ];
      
      sql = mysql.format(sql, params);
    }
  
    console.log(sql);
  
    connection.query(sql,  function (err, rows) {
      if(err) return console.log("ERR!! " + err);
      res.send(rows);
    })
  })


router.get('/scrap', function(req, res){
    const {email} = req.query;

    let sql = 'select * from te_tour a, te_tour_scrap b where a.seq = b.tour_seq and b.email = ?';
    let params = [email];
    sql= mysql.format(sql, params);

    connection.query(sql, function(err, rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })
})
module.exports = router;


