
var mysql = require('mysql');

var pool;

exports.connect = function ConnectionHandler(done){
    pool = mysql.createPool({
        host: "localhost",
        user: "root",
        database: "films"
    });
    done();
}

exports.get = function GetHandler(){
    return pool;
}
