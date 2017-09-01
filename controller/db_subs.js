var mysql = require('mysql');
var async = require('async');
var dao = require('./../models/dao_subs.js');
var config = require('./../config/db_config');
var pool = mysql.createPool(config.db);

/*
** add subscribe
 */

exports.addSubs = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if(err) {
            callback(err);
        } else {
            conn.beginTransaction(function (err) {
                if(err) {
                    conn.rollback(function () {
                        callback(err);
                        conn.release();
                    });
                } else {
                    async.waterfall(
                        [
                            function (done) {
                                dao.insertSubs(conn, data, done);
                            },
                            function (result, done) {
                                if(result.insertId >= 0) {
                                    dao.updateSubsAdd(conn, data, done);
                                } else {
                                    done(result);
                                }
                            }
                        ],
                        function (err, result) {
                            if(err) {
                                conn.rollback(function () {
                                    callback(err);
                                });
                            } else {
                                conn.commit(function () {
                                    callback(null, result);  
                                });
                            }
                            conn.release();
                        }
                    ); //async
                }
            });
        }
    });
};

/*
** delete subscribe
 */

exports.delSubs = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if(err) {
            callback(err);
        } else {
            conn.beginTransaction(function (err) {
                if(err) {
                    conn.rollback(function () {
                        callback(err);
                        conn.release();
                    });
                } else {
                    async.waterfall(
                        [
                            function (done) {
                                dao.deleteSubs(conn, data, done);
                            },
                            function (result, done) {
                                if(result.affectedRows > 0){
                                    dao.updateSubsDel(conn, data, done);
                                } else {
                                    done(result);
                                }
                            }
                        ],
                        function (err, result) {
                            if(err) {
                                conn.rollback(function () {
                                    callback(err, null);
                                });
                            } else {
                                conn.commit(function () {
                                    callback(null, result);
                                });
                            }
                            conn.release();
                        }
                    ); //async
                }
            });
        }
    });
};