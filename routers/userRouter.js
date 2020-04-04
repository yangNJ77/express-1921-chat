const express =require("express");
const UserModel = require("../db/models/userModel")
const router = express.Router();

//登录操作 POST /users/login 
router.post('/login', async(req,res) =>{
    // console.log(req.body)
    //获取页面传递过来的参数
    const { username, password} = req.body;

    //判断是否已经注册过
    let user = await UserModel.findOne({ username});
    if(!user){
         //不存在 注册并登录
         user= await UserModel.create({ username, password});
    }

    //校验密码是否正确
    if(user.comparePassword(password)){
        //通过 就可以登录 
        res.send("登录成功");
    } else {
        //不通过 用户名或密码不正确
        throw new Error("用户名或密码不正确");  //异常处理
    }
   
});
module.exports = router