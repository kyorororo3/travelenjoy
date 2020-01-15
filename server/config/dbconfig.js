const mysql = require('mysql');

module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection( {
                host: '1.229.137.14',
                port: '3306',
                user: 'te',
                password: ',,,,',
                database: 'travelenjoy',
                multipleStatements: true  // 다중쿼리용 설정
            })
        },

        conn_test: function (connection) {
            connection.connect(function (err){
                if (err) console.error("mysql connection error : " + err);
                else console.info("mysql connect success");
            })
        }
    }
}