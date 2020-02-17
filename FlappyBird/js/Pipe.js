/*管子类*/
function Pipe(pipe_up, pipe_down, step, x) {
	// 上管子
	this.pipe_up = pipe_up;
	// 下管子
	this.pipe_down = pipe_down;
	// 定义上管子的高
	this.up_height = parseInt(Math.random() * 249) + 1;
	// 定义下管子的高
	this.down_height = 250 - this.up_height;
	// 定义步长
	this.step = step;
	// x位置
	this.x = x;
	// 定义计数器属性
	this.count = 0;
}

// 创建管子
Pipe.prototype.createPipe = function() {
	return new Pipe(this.pipe_up, this.pipe_down, this.step, this.x);
}