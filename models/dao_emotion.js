var sql = require('./dao_sql.js');
var async = require('async');
var debug = require('./../config/db_config.js').debug;
var connectionError = require('./../config/db_config.js').connectionError;

//emotion 정보 조회
var selectEmotion = function selectEmotion(conn, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.selectEmotion, [], function (err, row) {
        
        if (debug) {
            console.log('select emotion err', err);
            console.log('select emotion row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

//코드에 따른 가장 많이 쓰인 감정명 조회
var selectNameList = function (conn, data, done) {
    if(!conn) {
        done(connectionError);
        return;
    }
    conn.query(sql.selectEmotionNameByCode, [data.emotion_code, data.limit], function (err, row) {
        
        if(debug) {
            console.log('emotion name data', data);
            console.log('emotion name err', err);
            console.log('emotion name row', row);
        }
        
        if(err) {
            done(err);
        } else {
            done(null, row);
        }
    });
};

exports.selectEmotion = selectEmotion;
exports.selectNameByCode = selectNameList;