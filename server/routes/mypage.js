const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'})


let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);


router.use(bodyParser.json());

router.post('/info/nickname', (req,res)=>{
    let input_nickname = req.body;
    let sql = 'select * from te_member where nickname=?';

    connection.query(sql, input_nickname, (err, result) => {
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
    
});
module.exports = router;


