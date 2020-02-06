// 定义一个函数，可以实现多个浏览器的事件绑定
function bindEvent(dom, type, fn) {

	// 判断type的类型
	if (type.toLowerCase() === "mousewheel") {
		// 判断是否是火狐浏览器
		var isFF = window.navigator.userAgent.indexOf("Firefox") === -1 ? false : true;
		// console.log(isFF);

		// 如果是火狐 要添加DOMMouseScroll事件
		if (isFF) {
			dom.addEventListener("DOMMouseScroll", fn, false);
			return;
		} 
	}



	// 使用能力检测， 检测浏览器支持哪种能力
	if (dom.addEventListener) {
		// 说明是高级浏览器
		dom.addEventListener(type, fn, false);
	} else if (dom.attachEvent) {
		// 说名是IE中的高版本
		dom.attachEvent("on" + type, fn);
	} else {
		// 说明是其它不知名的浏览器
		dom["on" + type] = fn;
	}
}