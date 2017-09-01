var mysql = require('mysql');
var async = require('async');
var dao = require('./../models/dao_user.js');
var config = require('./../config/db_config.js');
var pool = mysql.createPool(config.db);

/*
** 없으면 가입하고 로그인, 있으면 로그인(세션 사용 x)
 */

exports.login = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            conn.beginTransaction(function (err) {
                if (err) {
                    conn.rollback(function () {
                        callback(err);
                        conn.release();
                    });
                } else {
                    async.waterfall(
                        [
                            function (done) {
                                dao.checkUuid(conn, data.uuid, done);
                            },
                            function (uuidResult, done) {
                                //need to join
                                if (!uuidResult) {
                                    dao.join(conn, data, done);
                                }
                                //update user info
                                else {
                                    data.uid = uuidResult.UID;
                                    dao.updateUser(conn, data, done);
                                }
                            }
                        ],
                        function (err, result) {
                            if (err) {
                                conn.rollback(function () {
                                    callback(err);
                                });
                            } else {
                                if (result) {
                                    
                                    if (result.status == 'join') {
                                        result.uid = result.insertId;
                                    }
                                    
                                    conn.commit(function () {
                                        callback(null, result);
                                    });
                                } else {
                                    conn.rollback(function () {
                                        callback(err);
                                    });
                                }
                            }
                            conn.release();
                        });
                }
            }); //begin transaction
        }
    });
};


/*
** register fcm token
 */

exports.token = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            dao.updateToken(conn, data, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
                conn.release();
            });
        }
    });
};