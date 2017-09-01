var sql = require('./dao_sql.js');
var debug = require('./../config/db_config.js').debug;
var connectionError = require('./../config/db_config.js').connectionError;

//구독
var insertSubs = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.insertSubs, [data.uid, data.writer_id], function (err, row) {
        
        if(debug) {
            console.log('insert subs data', data);
            console.log('insert subs err', err);
            console.log('insert subs row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//구독 카운트 증가
var updateSubsAdd = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.updateSubsAdd, [data.writer_id], function (err, row) {
        
        if(debug) {
            console.log('update subs add data', data);
            console.log('update subs add err', err);
            console.log('update subs add row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//구독 해제
var deleteSubs = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.deleteSubs, [data.uid, data.writer_id], function (err, row) {
        
        if(debug) {
            console.log('del subs data', data);
            console.log('del subs err', err);
            console.log('del subs row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row)
        }
    });
};

//구독 카운트 감소
var updateSubsDel = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.updateSubsDel, [data.writer_id], function (err, row) {
        
        if(debug) {
            console.log('update subs del data', data);
            console.log('update subs del err', err);
            console.log('update subs del row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

exports.insertSubs = insertSubs;
exports.updateSubsAdd = updateSubsAdd;
exports.deleteSubs = deleteSubs;
exports.updateSubsDel = updateSubsDel;