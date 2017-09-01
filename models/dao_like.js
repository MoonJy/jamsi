var sql = require('./dao_sql.js');
var debug = require('./../config/db_config.js').debug;
var connectionError = require('./../config/db_config.js').connectionError;

//좋아요
var insertLike = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.insertLike, [data.uid, data.pid], function (err, row) {
        
        if(debug) {
            console.log('insert like data', data);
            console.log('insert like err', err);
            console.log('insert like row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//좋아요 카운트 증가
var updateLikeAdd = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.updateLikeAdd, [data.pid], function (err, row) {
        
        if(debug) {
            console.log('update like add data', data);
            console.log('update like add err', err);
            console.log('update like add row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//좋아요 해제
var deleteLike = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.deleteLike, [data.uid, data.pid], function (err, row) {
        
        if(debug) {
            console.log('delete like data', data);
            console.log('delete like err', err);
            console.log('delete like row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//좋아요 카운트 감소
var updateLikeDel = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.updateLikeDel, [data.pid], function (err, row) {
        
        if(debug) {
            console.log('update like add data', data);
            console.log('update like add err', err);
            console.log('update like add row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

exports.insertLike = insertLike;
exports.updateLikeAdd = updateLikeAdd;
exports.deleteLike = deleteLike;
exports.updateLikeDel = updateLikeDel;