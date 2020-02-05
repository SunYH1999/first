function offset(dom) {
	/*
		思路:
			获取元素的定位父元素，再获取距离
			再获取元素的定位父元素的定位父元素， 再获取距离
			再获取元素的定位父元素的定位父元素的定位父元素， 直到终点 => body元素 距离相累加
	 */
	// for (, dom != document.body; dom = dom.offsetPatent)

	// 获取浏览器的信息
	var str = window.navigator.userAgent;
	// 定义变量简化书写
	var isIE8 = null;
	// 检测浏览器信息
	if (str.indexOf("MSIE 8.0") === -1) {
		// console.log("不是IE8");
		isIE8 = false;
	} else {
		// console.log("是IE8");
		isIE8 = true;
	}

	// 定义对象
	// 一开始不应该加上自己的边框，
	var result = {
		top: dom.offsetTop,
		left: dom.offsetLeft
	}

	// 使用while循环
	while (dom != document.body) {
		// console.log(dom);
		dom = dom.offsetParent;

		// 判断是不是IE8
		if (isIE8) {
			// 说明是IE8 不需要加上父元素的边框了
			result.left += dom.offsetLeft;
			result.top += dom.offsetTop;
		} else {
			// 说明不是IE8 需要额外加上复元素的边框
			result.left += dom.offsetLeft + dom.clientLeft;
			result.top += dom.offsetTop + dom.clientTop;
		}

	}
	// 返回对象
	return result;
}