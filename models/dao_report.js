var sql = require('./dao_sql.js');
var debug = require('./../config/db_config.js');
var connectionError = require('./../config/db_config.js').connectionError;

//신고
var insertReport = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.insertReport, [data.uid, data.pid, data.description], function (err, row) {
        
        if(debug) {
            console.log('insert report data', data);
            console.log('insert report err', err);
            console.log('insert report row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//신고 카운트 증가
var updateReportAdd = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.updateReportAdd, [data.pid], function (err, row) {
        
        if(debug) {
            console.log('update report add data', data);
            console.log('update report add err', err);
            console.log('update report add row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//신고 삭제
var deleteReport = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.deleteReport, [data.uid, data.pid], function (err, row) {
        
        if(debug) {
            console.log('del report data', data);
            console.log('del report err', err);
            console.log('del report row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//신고 카운트 감소
var updateReportDel = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    
    conn.query(sql.updateReportDel, [data.pid], function (err, row) {
        
        if(debug) {
            console.log('update report del data', data);
            console.log('update report del err', err);
            console.log('update report del row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

exports.insertReport = insertReport;
exports.updateReportAdd = updateReportAdd;
exports.deleteReport = deleteReport;
exports.updateReportDel = updateReportDel;