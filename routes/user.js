var express = require('express');
var router = express.Router();
var db_user = require('../controller/db_user.js');

var fail_json = {
    "success": 0,
    "result": {}
};

var success_json = {
    "success": 200,
    "result": {}
};

router.post('/login', function (req, res, next) {
    var bodydata = req.body;
    
    var data = {
        "uuid": bodydata.uuid,
        "os_type": bodydata.os_type,
        "os_version": bodydata.os_version,
        "p_version": bodydata.p_version
    };
    
    if(data.uuid == null) {
        fail_json.success = 403;
        fail_json.result.message = 'uuid invalid';
        res.json(fail_json);
    }
    
    db_user.login(data, function (err, result) {
        
        console.log('login err', err);
        console.log('login res', result);
        
        if (err) {
            fail_json.success = err.errno;
            fail_json.result.message = err.code;
            res.json(fail_json);
        } else {
            success_json.result.uid = result.uid;
            res.json(success_json);
        }
    });
});

router.post('/token', function (req, res, next) {
    var bodydata = req.body;
    
    db_user.token(bodydata, function (err, result) {
        if (err) {
            fail_json.success = err.errno;
            fail_json.result.message = err.code;
            res.json(fail_json);
        } else {
            res.json(success_json);
        }
    });
});

module.exports = router;