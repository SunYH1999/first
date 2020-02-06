function animate(dom, json, time, callBack) {
		
	// 计数器
	var count = 0;
	// 定义间隔时间
	var interval = 20;
	// 总次数 = 总时间 / 间隔时间
	var allCount = time / interval;
	
	// 获的总距离， 就是用目标值 - 初始值
	// json里面传递都是目标值
 	// 定义一个nowJson 用于保存元素的初始值
 	var nowJson = {};
 	for (var i in json) {
 		// console.log(i);
 		nowJson[i] = parseInt(getComputedStyle(dom)[i]);
 	}
 
 	// 计算总距离，在得到步长值
 	var stepJson = {};
 	for (var i in json) {
 		// 步长值 = (目标值 - 初始值)  / 总次数
 		stepJson[i] = (json[i] - nowJson[i]) / allCount;
 	}

	// 定义定时器
	var timer = setInterval(function() {
		// 计数器++
		count++;
		// 改变dom的定位值
		for (var i in json) {
			// 当前值 = 初始值 + 步长值 * 次数
			dom.style[i] = nowJson[i] + stepJson[i] * count + "px";
		}
		// 判断是否到达边界
		if (count >= allCount) {
			// 拉终
			for (var i in json) {
				dom.style[i] = json[i] + "px";
			}
			// 停止定时器
			clearInterval(timer);
			// 执行回调函数
			callBack && callBack();
		}
	}, interval)
}