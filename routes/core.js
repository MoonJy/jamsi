var express = require('express');
var router = express.Router();
var db_emotion = require('../controller/db_emotion.js');

var fail_json = {
    "success": 0,
    "result": {
    }
};

var success_json = {
    "success": 200,
    "total_count": 0,
    "result": {
    }
};

router.get('serviceinfo', function (req, res, next) {
    
    db_emotion.getList(function (err, result) {
        if(result) {
            success_json.total_count = result.length;
            success_json.result.items = result;
            res.json(success_json);
        } else {
            fail_json.message = '감정목록조회 실패';
            res.json(fail_json);
        }
    });

});

router.post('/name', function (req, res, next) {
    
    db_emotion
});

module.exports = router;