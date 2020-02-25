const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/'});

const mysql = require('mysql');
let mysql_dbc = require('../config/dbconfig')();
let connection = mysql_dbc.init();
mysql_dbc.conn_test(connection);


// router.use(express.static("/public/uploads"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


//myHome 에서 나의 활동 카운트 
router.get('/home', (req, res)=>{
    console.log('home에서 온 email', req.query);
    const {email} = req.query;

    let travel_sql = 'select count(b.tour_seq) as travel_count from te_tour a, te_tour_reservation b where a.seq = b.tour_seq and b.email = ?; ';
    let scrap_sql = 'select count(b.tour_seq) as scrap_count from te_tour a, te_tour_scrap b where a.seq = b.tour_seq and b.email = ?; ';
    let post_sql = 'select count(seq) as post_count from te_freetalk where email = ?; ';
    let comment_sql = 'select count(seq) as comment_count from te_comment where email = ?; ';

    travel_sql= mysql.format(travel_sql,email);
    scrap_sql = mysql.format(scrap_sql,email);
    post_sql = mysql.format(post_sql, email);
    comment_sql = mysql.format(comment_sql,email);

    connection.query(travel_sql + scrap_sql + post_sql + comment_sql, (err, result) => {
        if(err) return console.log('err' + err);
        console.log(result[0][0].travel_count);
        res.send({
            travel_count:result[0][0].travel_count,
            scrap_count:result[1][0].scrap_count,
            post_count:result[2][0].post_count,
            comment_count:result[3][0].comment_count
        })
    });
});

//myHome 에서 나의 메시지 체크
router.get('/home/msg', function(req,res){
    const {email, pageNumber} = req.query;
    let param = [email, parseInt(pageNumber)];
    let sql = 'select * from te_freetalk_msg where recipient = ? order by msg_reg_date desc limit ?, 5';
    
    sql = mysql.format(sql, param);

    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows);
    });
});

//myHome 에서 나의 메시지 length 조회
router.get('/home/msg/length', function(req,res){
    const {email} = req.query;
    let param = [email];
    let sql = 'select count(*) as length from te_freetalk_msg where recipient = ? ';
    
    sql = mysql.format(sql, param);

    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows[0]);
    });
});

//myHome 에서 msg 읽음 처리
router.get('/home/msg/update', function(req,res){
    const {seq} = req.query;
    let param = [seq];
    let sql = 'update te_freetalk_msg set isread = 1 where msg_seq = ?';
    
    sql = mysql.format(sql, param);

    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows);
    });
});

//myHome 에서 msg 읽음 처리 후 자동 삭제 하는 부분 
router.get('/home/msg/delete', function(req,res){
    const {seq} = req.query;
    let param = [seq];
    let sql = 'delete from te_freetalk_msg where msg_seq = ?';
    
    sql = mysql.format(sql, param);

    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows);
    });
});


//MyInfo 닉네임 중복체크
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

//MyInfo 프로필 내용 수정 업뎃
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
       
        profile_img = req.file.filename;
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

router.get('/calendar', function(req,res){
    const { email } =req.query;
    
    let sql = 'select * from te_tour a, te_tour_reservation b where a.seq = b.tour_seq and b.email =?';
    let param = [email];
    sql = mysql.format(sql,param);
    console.log(sql);
  
    connection.query(sql,  function (err, rows) {
      if(err) return console.log("ERR!! " + err);
      res.send(rows);
    })
})

//MyTravel 리스트 가져오기   ++ 검색하는 리스트까지 처리해야함 
router.post('/travel', function (req, res) {
    const { search, keyword, email, currentPage, isChecked } = req.body;
    const defaultSql =  " select * from (select a.seq, a.category, a.title, a.content, a.thumbnail, a.price, a.companyname, "
                     +  " b.seq as res_seq, b.reservation_number, b.email, b.start_date, b.join_people, b.total_price, b.phone, b.message "
                     +  " from te_tour a, te_tour_reservation b "
                     +  " where a.seq = b.tour_seq and b.email =?";

    let sql = defaultSql;
    let page = parseInt(currentPage);
    let params = [email, page] ;   

    if(search !== undefined && search !== '') {
        if(search === 'title'){
            sql =` ${defaultSql} and a.title like ? `;
            
        }else if(search === 'location'){
            sql = ` ${defaultSql} and a.category like ? `;
        }
        params  = [ email, `%${keyword}%`, page];
    }
    if(isChecked){
        sql += " and b.start_date > now() ";
    }
    sql+=' order by b.start_date asc ) A limit ?, 6 ';

    sql = mysql.format(sql, params);
    console.log(sql);
  
    connection.query(sql,  function (err, rows) {
      if(err) return console.log("ERR!! " + err);
      res.send(rows);
    })
  })

  //MyTravel length 가져오기 
  router.post('/travel/length', function(req,res){
    const { email, search, keyword, isChecked} = req.body;
    
    const defaultSql = 'select count(*) as length from te_tour a, te_tour_reservation b where a.seq = b.tour_seq and b.email =?';
    let sql = defaultSql;
    let params = [email];

    if(search !== undefined && search !== '') {
        if(search === 'title'){
            sql =` ${defaultSql} and a.title like ? `;
            
        }else if(search === 'location'){
            sql = ` ${defaultSql} and a.category like ? `;
        }
        params  = [ email, `%${keyword}%`];
    }
    if(isChecked){
        sql += "and b.start_date > now()";
    }

    sql = mysql.format(sql, params);
    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows[0]);
    })
  
  });

//MyScrap 리스트 가져오기 
router.post('/scrap', function(req, res){
    const { search, keyword, email, currentPage } = req.body;
    const defaultSql =  " select * from te_tour a, te_tour_scrap b where a.seq = b.tour_seq and b.email =?";
    let sql = defaultSql;
    let page = parseInt(currentPage);
    let params = [email,page];   

    if(search !== undefined) {
        if(search === 'title'){
            sql =` ${defaultSql} and a.title like ? `;
            
        }else if(search === 'location'){
            sql = ` ${defaultSql} and a.category like ? `;
        }
        params  = [ email, `%${keyword}%`, page ];
    }
   
    sql+=' order by a.seq asc limit ?, 6';
    sql = mysql.format(sql, params);
    console.log(sql); 
  
    connection.query(sql, function(err, rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })
})

//MyScrap length 가져오기 
router.post('/scrap/length', function(req,res){
    const { email, search, keyword} = req.body;
    
    const defaultSql = 'select count(*) as length from te_tour a, te_tour_scrap b where a.seq = b.tour_seq and b.email =?';
    let sql = defaultSql;
    let params = [email];

    if(search !== undefined && search !== '') {
        if(search === 'title'){
            sql =` ${defaultSql} and a.title like ? `;
            
        }else if(search === 'location'){
            sql = ` ${defaultSql} and a.category like ? `;
        }
        params  = [ email, `%${keyword}%`];
    }

    sql = mysql.format(sql, params);
    console.log(sql);
    connection.query(sql,  function (err, rows) {
        if(err) return console.log("ERR!! " + err);
        res.send(rows[0]);
    })
  
});

//MyReview Post 해야하는 것과 이미 Post 한것 리스트 가져오기 
router.get('/review', (req, res)=>{
    const {command, email, currentPage, pageNumber} = req.query;
    let sql, params = ''; 
    if(command === 'unposted'){
        sql = 'select c.*, d.seq as review_seq, d.email, d.title as review_title, d.content as review_content, d.score, d.review_img' 
            +' from (select a.seq, a.category, a.thumbnail, a.price, a.title, b.seq as res_seq, '
            +' b.email, b.start_date from te_tour a, te_tour_reservation b where a.seq = b.tour_seq) as c left join '
            +' te_tour_review as d on c.res_seq = d.res_seq where c.email =? and c.start_date < now() and d.res_seq is null order by c.start_date asc limit ?, 3';
        params = [email, parseInt(currentPage)];
        sql = mysql.format(sql,params);
        console.log(sql);
   
    }
    if(command === 'completed'){
        sql = 'select a.category, a.title as tour_title, b.* from te_tour a, te_tour_review b  where a.seq = b.tour_seq and b.email = ? order by b.wdate desc limit ?,5';
        // select * from te_tour_review a, te_tour b where a.tour_seq = b.seq and a.email = ?
        params = [email, parseInt(pageNumber)];
        sql = mysql.format(sql,params);
        console.log(sql);
    }

    connection.query(sql, function(err,rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })

});

//unposted review length 조회
router.get('/review/length', function(req,res){
    const {command, email} = req.query;
    let sql, params = '';
    if(command === 'unposted'){
        sql = 'select count(*) as length from (select a.seq, a.category, a.thumbnail, a.price, a.title, b.seq as res_seq, '
            +' b.email, b.start_date from te_tour a, te_tour_reservation b where a.seq = b.tour_seq) as c left join '
            +' te_tour_review as d on c.seq = d.tour_seq where c.email =? and c.start_date < now() and d.seq is null ' 
            +' order by c.start_date asc';
    }

    if(command === 'completed'){
        sql = 'select count(*) as length from te_tour a, te_tour_review b  where a.seq = b.tour_seq and b.email = ? ';   
    }

    params = [email];
    sql = mysql.format(sql,params);
    console.log(sql);

    connection.query(sql, function(err,rows){
        if(err) return console.log('err' + err);
        res.send(rows[0]);
    })

});

//MyReview 추가 
router.post('/review/register', upload.single('review_img'), function(req,res){
    const { tour_seq, res_seq, email, title, content, score} = req.body;
    console.log('file 체크' , req.file)
    let review_img = '';
    if(req.file === undefined){
        review_img = null;
    }else{
        review_img = req.file.filename;
        console.log('review_img 파일명 체크 ', review_img)
    }
    let sql = 'insert into te_tour_review values(null,?,?,?,?,?,?,?,now())';
    let params = [tour_seq, res_seq, email, title, content, score, review_img];
    sql = mysql.format(sql,params);

    console.log(sql);
    connection.query(sql, function(err,result){
        if(err) return console.log('err' + err);
        res.send({isInsertSuccess:true});
    })

});

//review 삭제
router.get('/review/delete', function(req,res){
    const { seq } = req.query;

    let sql = 'delete from te_tour_review where seq = ?';
    let params = [seq];
    sql = mysql.format(sql,params);
    console.log(sql);
    connection.query(sql, function(err,result){
        if(err) return console.log('err' + err);
        res.send({isDeleteSuccess:true});
    })

});

//mytalk - post 조회
router.get('/talk/post', function(req, res){
    const { email, postPage } =req.query;
    
    let sql = 'select f.seq, f.title, f.content, f.email, f.nickname, f.reg_date, ifnull(l.likecount, 0) as likecount, ifnull(c.commentcount, 0) as commentcount, i.name_saved '
             + 'from ((te_freetalk f '
             + 'left join (select te_freetalk_seq, count(*) as likecount from te_freetalk_likes group by te_freetalk_seq) l '
             + 'on f.seq = l.te_freetalk_seq) '
             + 'left join (select talk_seq, count(*) as commentcount from te_comment group by talk_seq) c '
             + 'on f.seq = c.talk_seq) '
             + 'left join (select te_freetalk_seq, name_saved from te_freetalk_images group by te_freetalk_seq) i '
             + 'on f.seq = i.te_freetalk_seq '
             + 'where f.email = ? '
             + 'order by f.reg_date desc '
             + 'limit ?, 3 ; ';
    
    connection.query(sql, [email, parseInt(postPage)], function(err,rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })
});

//mytalk - post length 조회 
router.get('/talk/post/length', function(req,res){
    const {email} = req.query;
    let sql = 'select count(*) as length from te_freetalk where email = ? ';

    connection.query(sql, [email], function(err,rows){
    if(err) return console.log('err' + err);
    console.log('post length', rows[0]);
    res.send(rows[0]);
    })
});

router.get('/talk/post/images', function(req,res){
    const {email, seq} = req.query;
  
    let sql = 'select name_saved  from te_freetalk a, te_freetalk_images b  where a.seq = b.te_freetalk_seq and a.email = ? and b.te_freetalk_seq = ? ';
    let params = [email, seq];
    sql = mysql.format(sql, params);

    connection.query(sql, function(err,rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })

});
//mytalk - comment 조회 
router.get('/talk/comment', function(req, res){
    const { email, pageNumber } = req.query;

    // let sql = 'select * from (select row_number()over(order by reg_date desc) as rnum, '
    //         + ' seq, talk_seq, email, nickname, content, reg_date te_comment where email = ? ) '
    //         + ' where rnum > = ? and rnum <= ?  ';
    
    let sql = ' select * from te_comment where email = ? order by reg_date desc limit ? , 5 ';
    let params = [email, parseInt(pageNumber)]

    sql = mysql.format(sql, params);

    connection.query(sql, function(err,rows){
        if(err) return console.log('err' + err);
        res.send(rows);
    })
})

//mytalk - comment length 조회 
router.get('/talk/comment/length', function(req, res){
    const { email } = req.query;

    let sql = 'select count(*) as length from te_comment where email = ?';
    let param = [ email ];
    sql = mysql.format(sql, param);

    connection.query(sql, function(err,rows){
        if(err) return console.log('여기서 오는 건가요err' + err);
        console.log('cmt length', rows[0]);
        res.send(rows[0]);
    })
})


module.exports = router;


