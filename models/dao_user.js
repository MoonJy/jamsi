var sql = require('./dao_sql.js');
var async = require('async');
var debug = require('./../config/db_config.js').debug;

//uuid로 uid, name 조회
var checkUuid = function checkUuid(conn, uuid, done) {
    if (!conn) {
        done('connection error');
        return;
    }
    conn.query(sql.selectUserByUuid, [uuid], function (err, row) {
        
        if (debug) {
            console.log('check uuid data', uuid);
            console.log('check uuid err', err);
            console.log('check uuid row', row);
        }
        
        if (err) {
            done(err);
        } else {
            if (row[0]) {
                done(null, row[0]);
            } else {
                //no result
                done(null);
            }
        }
    });
};

//uuid를 통한 가입
var join = function join(conn, data, done) {
    if (!conn) {
        done('connection error');
        return;
    }
    conn.query(sql.join, [data.uuid, data.os_type, data.os_version, data.p_version], function (err, row) {
        
        if (debug) {
            console.log('join data', data);
            console.log('join err', err);
            console.log('join row', row);
        }
        
        if (err) {
            done(err);
        } else {
            if (row.affectedRows > 0) {
                row.status = 'join';
                done(null, row);
            } else {
                done(null);
            }
        }
    });
};

//사용자 최신 정보로 갱신
var updateUser = function updateUser(conn, data, done) {
    if (!conn) {
        done('connection error');
        return;
    }
    conn.query(sql.updateUser, [data.os_type, data.os_version, data.p_version, data.uid], function (err, row) {
        
        if (debug) {
            console.log('update user data', data);
            console.log('update user err', err);
            console.log('update user row', row);
        }
        
        if (err) {
            done(err);
        } else {
            if (row.affectedRows > 0) {
                row.uid = data.uid;
                done(null, row);
            } else {
                done(null);
            }
        }
    });
};

//uid로 사용자 전체 정보 조회
var selectUser = function selectUser(conn, uid, done) {
    if (!conn) {
        done('connection error');
        return;
    }
    conn.query(sql.selectUser, [uid], function (err, row) {
        
        if (debug) {
            console.log('select user data', data);
            console.log('select user err', err);
            console.log('select user row', row);
        }
        
        if (err) {
            done(err);
        } else {
            if (row[0]) {
                done(null, row);
            } else {
                done('select user fail');
            }
        }
    });
};

//token 갱신
var updateToken = function updateToken (conn, data, done) {
    if (!conn) {
        done('connection error');
        return;
    }
    conn.query(sql.updateToken, [data.token, data.uid], function (err, row) {
        
        if (debug) {
            console.log('update token data', data);
            console.log('update token err', err);
            console.log('update token row', row);
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


exports.checkUuid = checkUuid;
exports.join = join;
exports.updateUser = updateUser;
exports.selectUser = selectUser;
exports.updateToken = updateToken;