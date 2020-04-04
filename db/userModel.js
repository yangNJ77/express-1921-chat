//引入连接了MongDB的mongoose
const mongoose = require("../connect");

//定义 schema
const userSchema = new mongoose.userSchema({
    username:{ type: String, require:true},
    password:{ type: String, require:true},

    avater:{ type:String, default:"http://localhost:3000/assats/img/01.jpg"}

})

// 生成 model
const UserModle = mongoose.model("user",userSchema);

//暴露
module.exports =UserModle;