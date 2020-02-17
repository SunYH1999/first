/**
 *	@Game 整个游戏类
 *	@ctx:  画笔
 *	@bird: 鸟的实例
 *	@pipe: 管子的实例
 *	@land: 地面（背景的实例）
 *	@montain: 山（背景的实例）
 **/
 function Game(ctx, bird, pipe, land, mountain) {
 	this.ctx = ctx;
 	this.bird = bird;
 	// 因为管子有多根， 所以我们将它放入数组中
 	this.pipeArr = [pipe];
 	this.land = land;
 	this.mountain = mountain;
 	this.timer = null;
 	// 定义帧
 	this.iframe = 0;


 	this.init();
 }

 // 定义初始化的方法
 Game.prototype.init = function() {
 	this.start();
 	this.bindEvent();
 } 
 
 // 渲染山
 Game.prototype.renderMontain = function() {
 	// 这里绘制的不是this.mountain 而是this.mountain.img
 	// 定义变量简化书写
 	var img = this.mountain.img;
 	this.mountain.x -= this.mountain.step;
 	// 边界判断
 	if (this.mountain.x < - img.width) {
 		this.mountain.x = 0;
 	}
 	// 绘制图片
 	this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
 	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
 	this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);
 }

 // 渲染地面
 Game.prototype.renderLand = function() {
 	// 定义变量简化书写
 	var img = this.land.img;
 	this.land.x -= this.land.step;
 	// 判断边界 
 	if (this.land.x < - img.width) {
 		this.land.x = 0;
 	}
 	// 绘制图片
 	this.ctx.drawImage(img, this.land.x, this.land.y);
 	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
 	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
 }

 // 开始游戏
 Game.prototype.start = function() {
 	// 缓存this
 	var me = this;
 	// 赋值timer
 	this.timer = setInterval(function() {
 		// 帧改变
 		me.iframe++;
 		// 清屏
 		me.clear();
 		me.checkPix();
 		// 渲染山
 		me.renderMontain();
 		// 渲染地面
 		me.renderLand();
 		// 改变煽动翅膀的频率为1/10
 		if (!(me.iframe % 10)) {
	 		// 煽动翅膀
 			me.bird.fly();
 		}
 		// 鸟下降
 		me.bird.fallDown();
 		// 管子的移动
 		me.movePipe();
 		// 渲染上管子
 		me.renderPipe();
 		// 渲染鸟
 		me.renderBird();
 		// 创建管子
 		// 每iframe65次 创建一根管子
 		if (!(me.iframe % 65)) {
 			me.createPipe();
 		}
 		// 清除管子方法
 		me.clearPipe();

 		// 渲染鸟的四个点
 		me.renderBirdPoints();
 		// 渲染上管子的四个点
 		me.renderPipePoints();
 		// 碰撞检测
 		// me.checkBoom();
 		
 	}, 20)
 }

 // 清屏方法
 Game.prototype.clear = function() {
 	this.ctx.clearRect(0, 0, 360, 512);
 }


 // 渲染鸟
 Game.prototype.renderBird = function() {
 	// 获取鸟的图片
 	var img = this.bird.img;
 	// 保存状态
 	this.ctx.save();
 	// 平移坐标系
 	this.ctx.translate(this.bird.x, this.bird.y);
 	// 绘制矩形
 	// this.ctx.strokeRect(-this.bird.img.width / 2 + 5, -this.bird.img.height / 2 + 8, this.bird.img.width - 10, this.bird.img.height - 15);
 	// 判断鸟的状态
 	var deg = this.bird.state === "D" ? Math.PI / 180 * this.bird.speed : - Math.PI / 180 * this.bird.speed;
 	// 旋转坐标系
 	this.ctx.rotate(deg);
 	// 绘制图片
 	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
 	// 恢复转态
 	this.ctx.restore();
 }


// 绑定事件
Game.prototype.bindEvent = function() {
	// 缓存this
	var me = this;
	// 添加点击事件
	this.ctx.canvas.onclick = function() {
		// 调用鸟上升的方法
		me.bird.goUp();
	}
}

// 渲染管子
Game.prototype.renderPipe = function() {
	// 缓存this
	var me = this;
	// 由于管子有多根， 所以要循环渲染
	this.pipeArr.forEach(function(value, index) {
		// value 表示每一根管子
		// 获取上管子图片
		var img_up = value.pipe_up;
		// 绘制管子
		// 由于这里的this是window 所以不能用
		// 图片的x值
		var img_x = 0;
		// 图片的y值
		var img_y = img_up.height - value.up_height;
		// 图片的宽
		var img_w = img_up.width;
		// 图片的高
		var img_h = value.up_height;
		// canvas上的x点
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		// canvas上的y点
		var canvas_y = 0;
		// canvas_w
		var canvas_w = img_up.width;
		// canvas_h
		var canvas_h = value.up_height;
		// 绘制图片
		me.ctx.drawImage(img_up, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);


		// 绘制下管子
		// 获取下管子的图片
		var img_down = value.pipe_down;
		// 图片的x点
		var down_img_x = 0;
		// 图片的y点
		var down_img_y = 0;
		// 图片的宽
		var down_img_w = img_down.width;
		// 图片的高
		var down_img_h = 250 - value.up_height;
		// 放在canvas上的x点
		var down_canvas_x = me.ctx.canvas.width - value.step * value.count;
		// 放在canvas上的y点
		var down_canvas_y = value.up_height + 150;
		// 放在canvas上的图片的宽
		var down_canvas_w = down_img_w;
		// 放在canvas上的图片的高
		var down_canvas_h = down_img_h;

		// 绘制图片
		me.ctx.drawImage(img_down, down_img_x, down_img_y, down_img_w, down_img_h, down_canvas_x, down_canvas_y, down_canvas_w, down_canvas_h);

	})
}

// 管子移动方法
Game.prototype.movePipe = function() {
	this.pipeArr.forEach(function(value) {
		value.count++;
	})
}

// 创建多根管子
Game.prototype.createPipe = function() {
	var pipe = this.pipeArr[0].createPipe();
	// 将创建出来的管子放入数组中
	this.pipeArr.push(pipe);
}

// 清理数组中的管子
Game.prototype.clearPipe = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];
		// 判断管子的距离
		if (pipe.x - pipe.step * pipe.count < - pipe.pipe_up.width) {
			// console.log("第" + i + "根管子该移除了");
			this.pipeArr.splice(i, 1);
			return;
		}
	}
}

// 在原始坐标系中绘制鸟的四个点
Game.prototype.renderBirdPoints = function() {
	// 绘制鸟的A点
	var bird_A = {
		x: -this.bird.img.width / 2 + 5 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 + this.bird.y
	}
	// 绘制鸟的B点
	var bird_B = {
		x: -this.bird.img.width / 2 + 5 + this.bird.img.width - 10 + this.bird.x,
		y: -this.bird.img.height / 2 + 8  + this.bird.y
	}

	// 绘制鸟的C点
	var bird_C = {
		x: -this.bird.img.width / 2 + 5 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 +  this.bird.img.height - 15  + this.bird.y
	}

	// 绘制鸟的D点
	var bird_D = {
		x: -this.bird.img.width / 2 + 5 + this.bird.img.width - 10 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 +  this.bird.img.height - 15 + this.bird.y
	}

	// 开启路径
	this.ctx.beginPath();
	// 绘制矩形
	this.ctx.moveTo(bird_A.x, bird_A.y);
	this.ctx.lineTo(bird_B.x, bird_B.y);
	this.ctx.lineTo(bird_D.x, bird_D.y);
	this.ctx.lineTo(bird_C.x, bird_C.y);
	// 关闭路径
	this.ctx.closePath();
	// 描边
	// 改变描边色
	this.ctx.strokeStyle = "blue";
	this.ctx.stroke();
}

// 绘制管子的8个点
Game.prototype.renderPipePoints = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		// 绘制管子的A点
		var pipe_up_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 绘制管子的B点
		var pipe_up_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}
		// 绘制管子的C点
		var pipe_up_C = {
			x: pipe_up_A.x,
			y: pipe.up_height
		}

		// 绘制管子的D点
		var pipe_up_D = {
			x: pipe_up_B.x,
			y: pipe_up_C.y
		}

		// 开启路径
		this.ctx.beginPath();
		// 绘制矩形
		this.ctx.moveTo(pipe_up_A.x, pipe_up_A.y);
		this.ctx.lineTo(pipe_up_B.x, pipe_up_B.y);
		this.ctx.lineTo(pipe_up_D.x, pipe_up_D.y);
		this.ctx.lineTo(pipe_up_C.x, pipe_up_C.y);
		// 关闭路径
		this.ctx.closePath();
		// 描边
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		this.ctx.stroke();



		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe_up_C.y + 150
		}

		// 绘制管子的B点
		var pipe_down_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe_up_C.y + 150
		}
		// 绘制管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}

		// 绘制管子的D点
		var pipe_down_D = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 400
		}

		// 开启路径
		this.ctx.beginPath();
		// 绘制矩形
		this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
		// 关闭路径
		this.ctx.closePath();
		// 描边
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		this.ctx.stroke();
	}
}


// 检测鸟与管子是否碰撞到
Game.prototype.checkBoom = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		// 绘制管子的A点
		var pipe_up_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 绘制管子的B点
		var pipe_up_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}
		// 绘制管子的C点
		var pipe_up_C = {
			x: pipe_up_A.x,
			y: pipe.up_height
		}

		// 绘制管子的D点
		var pipe_up_D = {
			x: pipe_up_B.x,
			y: pipe_up_C.y
		}

		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe_up_C.y + 150
		}

		// 绘制管子的B点
		var pipe_down_B = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe_up_C.y + 150
		}
		// 绘制管子的C点
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}

		// 绘制管子的D点
		var pipe_down_D = {
			x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 400
		}

		// 鸟的四个点
		var bird_A = {
			x: -this.bird.img.width / 2 + 5 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 + this.bird.y
		}
		// 绘制鸟的B点
		var bird_B = {
			x: -this.bird.img.width / 2 + 5 + this.bird.img.width - 10 + this.bird.x,
			y: -this.bird.img.height / 2 + 8  + this.bird.y
		}

		// 绘制鸟的C点
		var bird_C = {
			x: -this.bird.img.width / 2 + 5 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 +  this.bird.img.height - 15  + this.bird.y
		}

		// 绘制鸟的D点
		var bird_D = {
			x: -this.bird.img.width / 2 + 5 + this.bird.img.width - 10 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 +  this.bird.img.height - 15 + this.bird.y
		}


		// 用鸟的B点的x值与上管子的C点x值做对比
		if (bird_B.x >= pipe_up_C.x && bird_B.y <= pipe_up_C.y && bird_A.x <= pipe_up_D.x) {
			console.log("撞到上管子了");
			this.gameOver();
		}

		// 用鸟的D点的x值与下管子的A点x值做对比
		if (bird_D.x >= pipe_down_A.x && bird_D.y >= pipe_down_A.y && bird_A.x <= pipe_down_B.x) {
			console.log("撞到下管子了");
			this.gameOver();
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	// 停止定时器
	clearInterval(this.timer);
}

// 像素检测
Game.prototype.checkPix = function() {
	this.ctx.clearRect(0, 0, 360, 512);
	// 保存状态
	this.ctx.save();
	// 渲染
	this.renderPipe();
	// 改变融合方式
	this.ctx.globalCompositeOperation = "source-in";
	this.renderBird();
	// 恢复状态
	this.ctx.restore();
	// 获取像素信息
	var imgData = this.ctx.getImageData(0, 0, 360, 512);
	for (var i = 0; i < imgData.data.length; i++) {
		if (imgData.data[i]) {
			console.log("撞到了");
			this.gameOver();
			return;
		}
	}
}