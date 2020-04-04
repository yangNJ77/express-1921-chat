const express = require("express");
const router =express.Router();

// GET /欢迎页面
router.get('/',(req,res) =>{
    res.render("welcome")
});
//  GET /chatroom  聊天页面
router.get('/chatroom',(req,res) =>{
    res.render("chatroom")
});
//  GET /login  登录页面
router.get('/login',(req,res) =>{
    res.render("login")
});
module.exports = router;