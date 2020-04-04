const express =require("express");
const router = express.Router();

//登录操作 POST /users/login 
router.post('/login',(req,res) =>{
    console.log(req.body)
    res.send("登录操作")
});
module.exports = router