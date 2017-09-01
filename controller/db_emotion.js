var mysql = require('mysql');
var async = require('async');
var dao = require('./../models/dao_emotion.js');
var config = require('./../config/db_config');
var pool = mysql.createPool(config.db);

//감정 조회
exports.getList = function (callback) {
 
	pool.getConnection(function(err, conn) {
		if(err) {
			callback(err);
			conn.release();
		}
		dao.selectEmotion(conn, function (err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
			conn.release();
        });
	});
};

//코드에 따른 가장 많이 쓰인 감정이름 조회
exports.getNameList = function (callback) {
	
	pool.getConnection(function (err, conn) {
       	if(err) {
       		callback(err);
       		conn.release();
		}
		dao.selectNameByCode(conn, data, function (err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
			conn.release();
        });
    });
};