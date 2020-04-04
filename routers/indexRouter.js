const express = require("express");
const auth = require("../middlewares/auth")
const router =express.Router();

// GET /欢迎页面
router.get('/',(req,res) =>{
    console.log(req.session);

    res.render("welcome")
});
//  GET /chatroom  聊天页面
router.get('/chatroom',auth,(req,res) =>{
    res.render("chatroom");   
});
//  GET /posts  聊天页面
router.get('/posts',auth,(req,res) =>{
    res.render("post/index");   
});
//  GET /login  登录页面
router.get('/login',(req,res) =>{
    res.render("login")
});
module.exports = router;