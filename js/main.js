//onload在页面完毕后，调用这个匿名函数



window.onload = function () {
	//配置全局图片尺寸
	var pic_width = 520;
	var pic_height = 280;

	// document.getElementById('container');通过该ID获取DOM节点
	// 相当于jquery的$("#id"),原生的写法速度更快
	
	// 缓存DOM节点
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	
	var index = 1;
	var len = 5;//图片张数
	var interval = 3000; //切换时间3秒
	var timer;


	function play () {
		timer = setTimeout(function () {
			next.onclick();
			play();
		}, interval);
	}

	function stop () {
		clearTimeout(timer);
	}

	function animate (offset) {
		// list.style.left 获取到的是一个字符串比如"-600px"，要转为Int
		var newLeft = parseInt(list.style.left) + offset;
		list.style.left = newLeft + 'px';
		if(newLeft > 0){
			list.style.left = -pic_width*4 + 'px';
		}
		if(newLeft < -pic_width*4){
			list.style.left = 0 + 'px';
		}
	}

	// onlick时间绑定，传入一个匿名函数
	next.onclick = function () {
		animate(-pic_width);
		if(index == 5){
			index = 1;
		}else{
			index ++;
		}
		highlightButton();
	}

	prev.onclick = function () {
		animate(pic_width);
		if(index == 1){
			index = 5;
		}else{
			index --;
		}
		highlightButton();
	}

	// 控制小圆点的高亮
	function highlightButton () {
		for (var i = 0;i < buttons.length; i++){
			if(buttons[i].className == "on"){
				buttons[i].className = '';
				break;
			}
		}
		buttons[index - 1].className = 'on';
	}
	// 点击小圆点，跳转
	for(var i=0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			if(this.className == 'on'){
				//这里的this指向buttons[i]
				return;
			}
			// getAttribute()获取自定义属性
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -pic_width * (myIndex - index);
			animate(offset);
			index = myIndex;//保存点击的index到全局
			highlightButton();
		}
	}
	//鼠标移动上去，停止播放
	container.onmouseover = stop;
	container.onmouseout = play;
	//载入后自动播放
	play();





}