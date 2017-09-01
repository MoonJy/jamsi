var mysql = require('mysql');
var async = require('async');
var dao = require('./../models/dao_poem.js');
var config = require('./../config/db_config.js');
var pool = mysql.createPool(config.db);

exports.addPoem = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            dao.insertPoem(conn, data, function (err, result) {
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

exports.modifyPoem = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            dao.updatePoem(conn, data, function (err, result) {
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

exports.delPoem = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            dao.deletePoem(conn, data, function (err, result) {
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

exports.getList = function (data, callback) {
    pool.getConnection(function (err, conn) {
        if(err) {
            callback(err);
        } else {
            dao.selectPoems(conn, data, function (err, result) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
                conn.release();
            });
        }
    });
};