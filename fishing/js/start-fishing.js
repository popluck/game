window.onload = function() {
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
	var openid = wxdata.openid; // 用户id    wxdata.openid
	var nickname = wxdata.nickname; // 用户昵称   wxdata.nickname
	var sex = wxdata.sex; // 用户性别   wxdata.sex
	var head = wxdata.headimgurl // 用户图像   wxdata.headimgurl
	var room = localStorage.getItem('room') //  localStorage.getItem('room')
	var rand; //随机次数
	var t = 0;
	var rodmath = 0;
	var time=0;
	$('.warehouse_name')[0].innerText = nickname

	var ws = new WebSocket('ws://118.89.20.208:8585'); // 连接服务器 
	// 动效
	wave()
	$('.fishing-rod').css('background-image', 'url(image/start-fishing/鱼竿1/yu1_0.png)')
	// 握手函数
	ws.onopen = function() {
		//状态为1证明握手成功，然后把client自定义的名字发送过去
		if(ws.readyState == 1) {
			ws.send('{"type":"add","name":"' + nickname + '","openid":"' + openid + '","head":"' + head + '","sex":"' + sex + '","role":"2","room":"' + room + '"}');
		};
	}
	//握手失败或者其他原因连接socket失败，则清除so对象并做相应提示操作
	ws.onclose = function() {
		ws = false;
	}
	//数据接收监听，接收服务器推送过来的信息，返回的数据给msg，然后进行显示
	ws.onmessage = function(msg) {
		console.log(msg, 1)
		// 类型改变
		if(msg.data) {
			var content = JSON.parse(msg.data).content;
			console.log(content, 2)
			try {
				if(content.prize) {
					type = 'prize';
					prize = content.prize[0]
				}
				if(content.coupons) {
					type = 'coupons';
					fishing_coupons = content.coupons[0];
				}
				if(content.wechat) {
					type = 'wechat';
					fishing_openid = content.wechat[0];
					selType(content.wechat[0])
				}
			} catch(e) {}
		}
	}

	btn.addEventListener('click', changProgress, false)
	btn.addEventListener('click', turntable, false)
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
		var sendDate = {
				"type": "msg",
				"content": "moveRope",
				"room": room,
				"openid": openid
			}
		time++
		if(H == 0) {


			ws.send(JSON.stringify(sendDate))
			
			rodmath = 0;
			rodstart()
			H = H + rerandom

			console.log(JSON.stringify(sendDate))

		}

		if(H < 100 && H > 0) {
			rodmath = rodmath == 9 ? 6 : rodmath;
			if(time==2){
			    rod()
				time=0
			}
			progressBar.style.height = H + '%';
			H = H + rerandom

		} else {
			btn.removeEventListener('click', changProgress, false) // 移除事件 禁止点击
			progressBar.style.height = '100%'; // 进度条加满
			rodlast() // 鱼竿摆动
			popup_gift() //弹出奖励
		}

	} 
	// 弹出奖励
	function popup_gift(){
		// 获得奖品
			if(type == 'coupons') {
				$('.model_gilf')[0].src = "imgaes/start_last/" + fishing_coupons + '.png';
				$('.model1')[0].style.display = 'block';
			}
			if(type == 'prize') {
				$('.model_gilf')[0].src = "imgaes/start_last/" + prize + '.png';
				$('.model1')[0].style.display = 'block';
			}
			if(type == 'wechat' && fishing_sex != '') {
				if(fishing_sex == sex) {
					$('.warehouse_img')[0].src = 'image/start/基友卡.png';
					$('.img1')[0].src = 'imgaes/start/框框2.png';
					$('.img2')[0].src = fishing_img;
					$('.warehouse_name')[0].innerText = fishing_name
				}
				if(fishing_sex != sex) {
					$('.warehouse_img')[0].src = 'image/start/桃花卡.png';
					$('.img1')[0].src = 'imgaes/start/框框.png';
					$('.img2')[0].src = fishing_img;
					$('.warehouse_name')[0].innerText = fishing_name
				}
				$('.model2')[0].style.display = 'block';
			}
	}
	// 转盘
	function turntable() {
		reRoratez = reRoratez + 360
		circle.style.transform = 'rotateZ(' + reRoratez + 'deg)'
		gan_bg.style.transform = 'rotateZ(' + reRoratez + 'deg)'
	}
	// 波浪
	function wave() {
		setInterval(function() {
			t = (t == -100) ? -0 : t;
			t -= 2;
			$('.boxH').animate({
				'bottom': t + 'px'
			}, 110)
		}, 100)
	}
	// 鱼竿
	function rod() {
		$('.fishing-rod').css(
			'background-image', 'url(image/start-fishing/鱼竿1/yu1_' + rodmath + '.png)'
		)
		rodmath++
	}
	// 鱼竿动作1
	function rodstart() {
		var stac = setInterval(function() {
			if(rodmath == 6) {
				clearInterval(stac)
			} else {
				rod()
			}
			console.log(rodmath)
		}, 70)
	}
	// 鱼竿动作3
	function rodlast() {
		var stac2 = setInterval(function() {
			if(rodmath == 14) {
				clearInterval(stac2)
			} else {
				rod()
			}
			console.log(rodmath)
		}, 70)
	}
	$('.model_btn')[0].addEventListener('click', btninit, false)
	$('.warehouse_btn')[0].addEventListener('click', sendTo, false)
	$('.model_colse')[0].addEventListener('click', btninit, false)
	$('.model_btn4')[0].addEventListener('click', btninit, false)
	btn.addEventListener('click', changProgress, false)

	function btninit() {
//		alert('即将返回上一页')
		window.history.go(-1); 
//		$('.model1')[0].style.display = 'none';
//		$('.model2')[0].style.display = 'none';
//		$('.model4')[0].style.display = 'none';
		
//		window.location.href = "index.html?id=" + room
	}

	function sendTo() {
		var senddata = {
			"type": "msg",
			"content": "wechat",
			"room": room,
			"openid": openid,
			"name1": nickname,
			"name2": fishing_name
		}
		ws.send(JSON.stringify(senddata))
		$('.model2')[0].style.display = 'none';
		$('.model4')[0].style.display = 'block';
		btn.addEventListener('click', changProgress, false)
	}
	// 查询信息
	function selType(id) {
		$.post(
			"http://mq.soratech.cn/web_sock/public/index/index/user_sel", {
				'openid': id
			},
			function(msg) {
				try {
					var data = JSON.parse(msg);
					fishing_sex = data.sex;
					fishing_img = data.head;
					fishing_name = data.name;
					console.log(fishing_name)
					console.log(data)

				} catch(e) {
					//TODO handle the exception
				}

			}
		)
	}

	// 发出请求添加数据
	function addType() {
		$.post(
			'http://mq.soratech.cn/web_sock/public/index/index/user_update', // 请求地址
			{
				'data': [{ // 数据data
					'type': type,
					'prize': prize,
					'fishing_openid': fishing_openid,
					'fishing_coupons': fishing_coupons
				}],
				'openid': openid
			},
			function(data) { // 成功回调函数
				console.log(data)
			}
		)
	}

	function init() { // 初始化
		addType() // 请求添加数据
		rodmath = 0
		H = 0;
		progressBar.style.height = '0';
		type = '';
		fishing_sex = ''
		navigator.vibrate(1000); // 手机震动
	}

}