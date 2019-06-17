window.onload=function(){
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
var openid = ''; // 用户id    wxdata.openid
var nickname = ''; // 用户昵称   wxdata.nickname
var sex = ''; // 用户性别   wxdata.sex
var head = '' // 用户图像   wxdata.headimgurl
var room = ''  //  localStorage.getItem('room')
var a = 1; //点击数
var rand; //随机次数
	var t=0;
	var rodmath=0;
var ws = new WebSocket('ws://118.89.20.208:8585'); // 连接服务器
// 动效
wave()
$('.fishing-rod').css('background-image','url(image/start-fishing/鱼竿1/yu1_0.png)')
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
		console.log(msg, 2)
	
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

btn.addEventListener('click', changProgress,false)
btn.addEventListener('click', turntable,false)
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
		rodmath=0;
		rodstart()
	H = H + rerandom
		
		var sendDate={
			"type":"msg",
			"content":"moveRope",
			"room":room,
			"openid":openid
		}
		ws.send(JSON.stringify(sendDate))
		console.log(JSON.stringify(sendDate))

	}

	if(H < 100 && H>0) {
		rodmath=rodmath==9?6:rodmath;
		rod()
		progressBar.style.height = H + '%';
	H = H + rerandom
		
	} else {
		progressBar.style.height = '100%';
		rodlast()
		init()
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
	rodmath=0
	H = 0;
	type = '';
	progressBar.style.height = '0';
	
	navigator.vibrate(1000); // 手机震动
}
// 波浪
function wave(){
	setInterval(function(){
		t=(t==-100)?-0:t;
		t-=2;
		$('.boxH').animate({'bottom':t+'px'},110)
	},100)
}
// 鱼竿
function rod(){
	$('.fishing-rod').css(
		'background-image','url(image/start-fishing/鱼竿1/yu1_'+rodmath+'.png)'
	)
	rodmath++
}
// 鱼竿动作1
function rodstart(){
	var stac=setInterval(function(){
		if(rodmath==6){
			clearInterval(stac)
		}else{
			rod()
		}
		console.log(rodmath)
	},70)
}
// 鱼竿动作3
function rodlast(){
	var stac2=setInterval(function(){
		if(rodmath==14){
			clearInterval(stac2)
		}else{
			rod()
		}
		console.log(rodmath)
	},70)
}
}
