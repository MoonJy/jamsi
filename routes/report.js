var express = require('express');
var router = express.Router();
var db_report = require('../controller/db_report.js');

var fail_json = {
    "success": 0,
    "result": {}
};

var success_json = {
    "success": 200,
    "result": {}
};

router.post('/add/:pid', function (req, res, next) {
    
    var data = {
        'uid' : req.body.uid,
        'pid' : req.params.pid * 1,
        'description' : req.body.description
    }
    
    db_report.addReport(data, function (err, result) {
        
        console.log('add report err', err);
        console.log('add report res', result);
        
        if(err) {
            
            if(err.errno == 1062) { //ER_DUP_ENTRY
                fail_json.success = 409;
            }
            fail_json.result.message = err.code;
            res.json(fail_json);
        } else {
            res.json(success_json);
        }
    });
});

router.post('/del/:pid', function (req, res, next) {
    
    var data = {
        'uid' : req.body.uid,
        'pid' : req.params.pid * 1
    }
    
    db_report.delReport(data, function (err, result) {
        
        console.log('del report err', err);
        console.log('del report res', result);
        
        if(err) {
            if(err.affectedRows <= 0) {
                fail_json.success = 409;
                fail_json.result.message = "report not found";
            } else {
                fail_json.success = err.errno;
                fail_json.result.message = err.code;
            }
            res.json(fail_json);
        } else {
            res.json(success_json);
        }
    });
});

module.exports = router;