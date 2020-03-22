// 引入KOA
const Koa = require("koa");

// 搭建服务器
const app = new Koa();

// 引入中间件 koa-static
const serv = require("koa-static");

// 引入路由中间件
const Router = require("koa-router");
// 引入解析post请求的中间件
const body = require("koa-body");

// 初始化一个路由对象
const router = new Router();


// 挂载一个路由
router.get("/checkName", (ctx) => {
	console.log(ctx);
	ctx.response.message = JSON.stringify({
		"error": 0,
		"data": "success"
	})
})

// 挂载一个登录接口
router.post("/login", (ctx) => {
	console.log(ctx.request.body);
})

// 应用body中间件
app.use(body());

// 将路由对象 挂载到app上
app.use(router.routes())

// 使用中间件功能
app.use(serv("static"))


// 监听端口号
app.listen(3000)