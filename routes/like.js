var express = require('express');
var router = express.Router();
var db_like = require('../controller/db_like.js');

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
        'pid' : req.params.pid * 1
    }
    
    db_like.addLike(data, function (err, result) {
        
        console.log('add like err', err);
        console.log('add like res', result);
        
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
    
    db_like.delLike(data, function (err, result) {
        
        console.log('del like err', err);
        console.log('del like res', result);
        
        if(err) {
            if(err.affectedRows <= 0) {
                fail_json.success = 404;
                fail_json.result.message = "like not found";
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