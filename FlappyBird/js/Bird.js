/*鸟类*/
function Bird(imgArr, x, y) {
	// 图片数组
	this.imgArr = imgArr;
	// 定义图片索引
	this.idx = parseInt(Math.random() * this.imgArr.length);
	// 获取具体的图片
	this.img = this.imgArr[this.idx];
	// x, y 用于平移坐标系的
	this.x = x;
	this.y = y;
	// 定义鸟的状态
	this.state = "D";  // "D" Down  "U" Up  
	// 为了鸟的移动速度，定义speed属性
	this.speed = 0;
}

// 煽动翅膀
Bird.prototype.fly = function() {
	//改变图片索引
	this.idx++;
	// 保证图片的有效性
	if (this.idx >= this.imgArr.length) {
		this.idx = 0;
	}
	// 虽然此时图片的索引改变了， 但是图片并没有改变
	this.img = this.imgArr[this.idx];
}

// 鸟下降
Bird.prototype.fallDown = function() {
	// 判断鸟的状态
	if (this.state === "D") {
		this.speed++;
		// 修正speed值
		this.y += Math.sqrt(this.speed);
	} else {
		this.speed--;
		if (this.speed === 0) {
			// 改变状态
			this.state = "D";
			return;
		}
		this.y -= Math.sqrt(this.speed);
	}
}

// 鸟上升的方法
Bird.prototype.goUp = function() {
	// 改变y值
	// this.y -= 30; // 这么写鸟呈现的效果是“干嘣”的效果
	this.state = "U";
	this.speed = 20;
}