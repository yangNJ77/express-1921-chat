module.exports=(req,res,next) => {
    //判断是否登录了
    if(req.session.auth) {
        //登录了  就直接走后续的流程代码
        req.auth = req.session.auth;
        
        next();
    } else {
        //没有登录 
        // 将当前的url地址 给存到session中
        console.log(req.url);
        req.session.redirect = req.url;
        //直接打回到登录页面
        res.redirect("/login");
    }
}