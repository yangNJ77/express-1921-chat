//引入 express
const express =require("express");
//引入 express-async-error
require("express-async-errors");
// 引入 express-session 中间件模块
const session = require("express-session");
//引入路由中间件文件
const indexRouter = require('./routers/indexRouter');
const userRouter = require("./routers/userRouter");
//生产 express 实例
const app = express();

//处理中间件
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

/**
 * session 处理
 * 会给 req 对象上添加一个 session 的属性
 * 注意：在开发工程中，修改了代码，session 就会重新开始
 */
app.use(
    session({
        // 秘钥
        secret: "ersfseaf",
        // 是否每次有请求的时候都去更新有效时间
        resave: false,
        // 是否初始化时就设置一次
        saveUninitialized: true
    })
);

//处理模板引擎相关的设置
app.set("view engine","ejs");
app.set("views","./views");

//处理路由中间件
app.use('/',indexRouter);
app.use('/users',userRouter);
//统一出路错误，需要放在中间件与路由代码之后
app.use((err,req,res,next) =>{
   console.log(err);
   //响应给前端
   res.status(500).send(err.message);
})

//监听端口  启动服务
const server= app.listen(3000, ()=>{
    console.log("服务启动成功")
});