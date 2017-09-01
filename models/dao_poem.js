var sql = require('./dao_sql.js');
var async = require('async');
var debug = require('./../config/db_config.js').debug;
var connectionError = require('./../config/db_config.js').connectionError;

//시 쓰기
var insertPoem = function write(conn, data, done) {
    if (!conn) {
        done(connectionError);
        return;
    }
    
    var datas = [data.uid, data.emotion_code, data.emotion_name,
        data.title, data.content, data.public];
    
    conn.query(sql.insertPoem, datas, function (err, row) {
        
        if (debug) {
            console.log('write data', datas);
            console.log('write err', err);
            console.log('write row', row);
        }
        
        if (err) {
            done(err);
        } else {
            if (row.affectedRows > 0) {
                done(null, row);
            } else {
                done(null);
            }
        }
    });
};

var updatePoem = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    var datas = [data.title, data.content, data.public, data.pid];
    
    conn.query(sql.updatePoem, datas, function (err, row) {
        
        if(debug) {
            console.log('revise data', datas);
            console.log('revise err', err);
            console.log('revise row', row);
        }
        
        if(err) {
            done(err);
        } else {
            if(row.affectedRows > 0) {
                done(null, row);
            } else {
                done(null);
            }
        }
    });
};

var deletePoem = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.deletePoem, [data.pid], function (err, row) {
    
        if(debug) {
            console.log('remove data', [data.pid]);
            console.log('remove err', err);
            console.log('remove row', row);
        }
    
        if(err) {
            done(err);
        } else {
            if(row.affectedRows > 0) {
                done(null, row);
            } else {
                done(null);
            }
        }
    });
};

var selectPoems = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.selectPoemsByEmotion, [data.emotion_code, data.page, data.limit], function (err, row) {
        
        if(debug) {
            console.log('get list data', data);
            console.log('get list err', err);
            console.log('get list row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

exports.insertPoem = insertPoem;
exports.updatePoem = updatePoem;
exports.deletePoem = deletePoem;
exports.selectPoems = selectPoems;