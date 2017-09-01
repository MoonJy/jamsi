var express = require('express');
var router = express.Router();
var db_subs = require('../controller/db_subs.js');

var fail_json = {
    "success": 0,
    "result": {}
};

var success_json = {
    "success": 200,
    "result": {}
};

router.post('/add/:writer_id', function (req, res, next) {
    
    var data = {
        'uid' : req.body.uid,
        'writer_id' : req.params.writer_id
    }
    
    if(data.uid <= 0 || data.writer_id <= 0) {
        fail_json.success = 403;
        fail_json.result.message = 'uid or writer_id invalid';
        res.json(fail_json);
    }
    
    db_subs.addSubs(data, function (err, result) {
        
        console.log('add subs err', err);
        console.log('add subs res', result);
        
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

router.post('/del/:writer_id', function (req, res, next) {
    
    var data = {
        'uid' : req.body.uid,
        'writer_id' : req.params.writer_id
    }
    
    if(data.uid <= 0 || data.writer_id <= 0) {
        fail_json.success = 403;
        fail_json.result.message = 'uid or writer_id invalid';
        res.json(fail_json);
    }
    
    db_subs.delSubs(data, function (err, result) {
        
        console.log('del subs err', err);
        console.log('del subs res', result);
    
        if(err) {
            if(err.affectedRows <= 0) {
                fail_json.success = 409;
                fail_json.result.message = "subs not found";
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