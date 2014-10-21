var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({ /*定义User数据表类型*/
    userid : String,
    name : String,
    password : String
});

exports.User = mongoose.model('User', UserSchema); /*导出User数据表模型*/