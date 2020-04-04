//引入 express
const express =require("express");
//引入 express-async-error
require("express-async-errors");
//引入路由中间件文件
const indexRouter = require('./routers/indexRouter');
//生产 express 实例
const app = express();

//处理中间件
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

//处理模板引擎相关的设置
app.set("view engine","ejs");
app.set("views","./views");

//处理路由中间件
app.use('/',indexRouter);

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