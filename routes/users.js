var express = require('express');
var router = express.Router();

var users = {
    'vicky' : {
        name : '123',
        website:'http://www.123.com'
    }
};

/* GET users listing. */
router.get('/', function(req, res) { /*localhost:3000/users*/
  res.send('respond with a resource');
});

router.all('/:username', function(req,res,next){
    if(users[req.params.username]){
        next();
    } else {
        next(new Error(req.params.username + ' 不存在'));
    }
});

router.get('/:username', function(req,res){  /*localhost:3000/users:username*/
    res.send(JSON.stringify(users[req.params.username]));
});

module.exports = router;
