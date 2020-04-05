//引入 express
const express =require("express");
//引入 socket.io
const socketIo = require("socket.io")
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

//通过 sockectIo.listen 去与当前服务关联上
const io = socketIo.listen(server);

// 建立 io 的 connection 事件去处理客户端连接
io.on("connection", socket => {
    // 提供一个事件将做 setName 。供客户端去设置名字
    // 客户端连接到服务之后，第一个要做的事情就是调用（触发） setName 这个事件
    socket.on("setName", username => {
      // 给当前socket添加一个名字，值就是传递过来的username
    socket.username = username;
  
      // 给其它人发送一个系统消息，xxx加入聊天室
      socket.broadcast.emit("message", {
        // username 代表谁说的
        username: "System",
        // message 代表说的内容
        message: `欢迎${socket.username}加入聊天室`
      });
    });

    // 监听 message 事件  这个事件有客户端触发
    socket.on('message',(data) => {
      // data { message:value}
      // 转给当前客户端
      socket.emit("message", {
        username:socket.username,
        message:data.message
      });
      //收到消息后  转发给其他客户端
      socket.broadcast.emit("message", {
        // username 代表谁说的
        username:socket.username,
        // message 代表说的内容
        message:data.message
      });
    })
})