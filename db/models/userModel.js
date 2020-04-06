//引入连接了MongDB的mongoose
const mongoose = require("../connect");

// 引入 bcryptjs 做加密
const bcryptjs = require("bcryptjs");

//定义 schema
const userSchema = new mongoose.Schema({
    username:{ type: String, require:true},
    password:{ type: String, require:true},

    avater:{ type:String, default:`${process.env.BASEURL}/assats/img/01.jpg`}

})

//钩子函数加密处理
userSchema.pre("save", function(next) {
    this.password = bcryptjs.hashSync(this.password, 10);
  
    next();
  });

  /**
 * 给UserModel提供一个原型方法  UserModel.proptype.comparePassword
 *
 * 原型上的这个方法，可以给每一个 UserModel 的实例去使用
 */
userSchema.methods.comparePassword = function(password) {
  return bcryptjs.compareSync(password, this.password);
};

// 生成 model
const UserModle = mongoose.model("user",userSchema);



//暴露
module.exports =UserModle;