var H = 0;
var reRoratez = 0;
var progressBar = document.querySelector('.progress');
var btn = document.querySelector('.btn');
var circle = document.querySelector('.circle');
var gan_bg = document.querySelector('.gan-bg');

var type = ''; // 类型判断
var prize = ''; // 合成物品
var fishing_openid = ''; // 微信图像id
var fishing_img = ''; // 奖励着微信图像
var fishing_name = ''; // 奖励微信昵称
var fishing_sex = ''; // 奖励微信性别
var fishing_coupons = 'couponsOne'; // 优惠券
var wxdata = JSON.parse(localStorage.getItem('wxdata'))
var openid = wxdata.openid; // 用户id
var nickname = wxdata.nickname; // 用户昵称
var sex = wxdata.sex; // 用户性别
var head = wxdata.headimgurl // 用户图像
var room = localStorage.getItem('room')
var a = 1; //点击数
var rand; //随机次数
var ws = new WebSocket('ws://118.89.20.208:8585'); // 连接服务器
// 握手函数
ws.onopen = function() {
	//状态为1证明握手成功，然后把client自定义的名字发送过去
	if(ws.readyState == 1) {			
		ws.send('{"type":"add","name":"' + nickname + '","openid":"' + openid + '","head":"' + head + '","sex":"' + sex + '","role":"2","room":"'+room+'"}');
	};
}
//握手失败或者其他原因连接socket失败，则清除so对象并做相应提示操作
ws.onclose = function() {
	ws = false;
}
//数据接收监听，接收服务器推送过来的信息，返回的数据给msg，然后进行显示
ws.onmessage = function(msg) {
	// 类型改变
	if(msg.data) {
		var data = JSON.parse(msg.data).nrong;
		console.log(data, 2)
		try {
			data = JSON.parse(data)
			if(data.type == 'moveRope') {
				window.location.href = "start_last.html"
			}
			if(data.prize) {
				type = 'prize';
			}
			if(data.coupons) {
				type = 'coupons';
				fishing_coupons = data.coupons[0];
			}
			if(data.wechat) {
				type = 'wechat';
				fishing_openid = data.wechat[0];
				selType(fishing_openid)
				console.log()
			}
		} catch(e) {}
	}
}

btn.addEventListener('touchstart', changProgress)
btn.addEventListener('touchstart', turntable)
// 手机摇一摇判断
if(window.DeviceMotionEvent) {
	var speed = 25;
	var x = y = z = lastX = lastY = lastZ = 0;
	window.addEventListener('devicemotion', function() {
		var acceleration = event.accelerationIncludingGravity;
		x = acceleration.x;
		y = acceleration.y;
		if(Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
			btn.click()
		}
		lastX = x;
		lastY = y;
	}, false);
}
// 点击事件----进度条
function changProgress() {
	var rerandom = Math.floor(Math.random() * 20);
	if(H==0){
		var sendDate={
			"type":"msg",
			"content":"moveRope",
			"room":room,
			"openid":openid
		}
		ws.send(JSON.stringify(sendDate))
		alert(JSON.stringify(sendDate))
	}
	H = H + rerandom
	if(H < 100) {
		progressBar.style.height = H + '%';
	} else {
		progressBar.style.height = '100%';
		// 获得奖品
		if(type == 'coupons') {
			alert(type)
			init()
		}
		if(type == 'prize') {
			alert(type)
			init()
		}
		if(type == 'wechat') {
			if(fishing_sex == sex) {
				alert(type,fishing_sex)
			}
			if(fishing_sex != sex) {
				alert(type,fishing_sex)
			}
			init()
		}

	}
	
}
// 转盘
function turntable() {
	reRoratez = reRoratez + 360
	circle.style.transform = 'rotateZ(' + reRoratez + 'deg)'
	gan_bg.style.transform = 'rotateZ(' + reRoratez + 'deg)'
}
// 初始化
function init() { 
	H = 0;
	type = '';
	navigator.vibrate(1000); // 手机震动
}