var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var mongoose= require('mongoose');
var models = require('../models/User');
var User = models.User;
mongoose.connect('mongodb://localhost/mydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function callback(){

});

/* GET home page. */
router.get('/', function(req, res) { /*localhost:3000/*/
  res.render('index', { title: '首页' }); //加载名为express的模板（index.ejs），饼干传入一个对象作为参数
});

router.get('/hello', function(req,res){  /*localhost:3000/hello*/
     res.send('Hello vivi, time is ' + new Date().toString());
});

router.get('/u/:user', function(req,res){ /*用户主页*/

});

router.post('/post', function(req,res){ /*发表信息*/

});

router.get('/reg', function(req, res){ /*注册*/
    res.render('reg', {title:'用户注册'});
});

router.post('/reg', function(req, res){
    /*检查两次用户口令是否一致*/
    if(req.body['password-repeat'] != req.body['password']){ //req.body就是POST请求信息解析过后的对象
        req.session('error', '两次输入的密码不一致'); //express提供的一个好工具，通过它保存的变量只会在用户当前和下一次请求中被访问，之后
        // 会被清除，通过它可以很方便地实现页面的通知和错误信息显示
        return res.redirect('/reg');//重定向，返回303
    }
    //生成口令数列
    var md5 = crypto.createHash('md5'); //crypto是nodejs的核心模块，功能是加密并生成各种散列。
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name:req.body.username,
        password : password
    });

    //检查用户名是否存在
    User.get(newUser.name, function(err, user){
        if(user){
            err = 'Username already exists.';
        }
        if(err){
            req.flash('error', err);
            return res.redirect('/reg');
        }

    });
    //如果不存在则新增用户
    newUser.save(function(err){
        if(err){
           req.flash('error', err);
           return res.redict('/reg');
        }
        req.session.user = newUser;
        req.flash('success', '注册成功');
        res.redirect('/');
    });


});

router.get('/login', function(req, res){ /*登陆*/

});

router.post('/login', function(req, res){

});

router.get('logout', function(req, res){ /*登出*/

});

module.exports = router;
