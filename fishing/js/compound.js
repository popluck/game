window.onload = function() {
	// 类型判断
	var type = '';
	var prize = ''; // 合成物品
	var fishing_openid = ''; // 微信图像
	var fishing_coupons = ''; // 优惠券
	var wxdata = JSON.parse(localStorage.getItem('wxdata'))
	var openid = wxdata.openid; // 用户id
	// 合成物品数量
	var prize1 = 1;
	var prize2 = 4;
	var prize3 = 3;
	var prize4 = 4;
	var prize5 = 5;
	// 是否跨域合成
	var bool = true;
	// 添加高度
	setWh('#box')
	setWh('.box0')
	setWh('.box1')
	setWh('.box2')
	setWh('.box3')
	setWh('.box4')
	setWh('.box5')
	
	rePost()
	// 合成按钮触发事件
	$('.box_0')[0].addEventListener('click', judgeNum)
	
	// 设置高度
	function setWh(res) {
		return $(res).css('height', $('#box').width())
	}
	// 添加动画
	function addAnimation(res) {
		//  	var boxs=$(res).attr('class')
		$(res).addClass('setAn')
		setTimeout(function() {
			$(res).removeClass('setAn')
		}, 2000)
	}
	// 判断图标
	function judge(res, prize, i) {
		// 图标个数
		$('.img').eq(i).siblings('div').text(res)
		// 是否切换图标
		if(res > 0) {
			$('.img')[i].src = 'image/compound/' + prize + '.png';
			bool = bool === true ? true : false
		} else {
			$('.img')[i].src = 'image/compound/' + prize + '_1.png';
			bool = false
		}
	};
	// 图标数量
	function judgeNum() {
		if(bool) {
			// 添加动画
			addAnimation('.box_1')
			addAnimation('.box_2')
			addAnimation('.box_3')
			addAnimation('.box_4')
			addAnimation('.box_5')
			addPost()
			// 是否切换图标
			judge(prize1, 'prize1', 0)
			judge(prize2, 'prize2', 1)
			judge(prize3, 'prize3', 2)
			judge(prize4, 'prize4', 3)
			judge(prize5, 'prize5', 4)
		} else {
			//			alert('数量不足')
		}
	}
	// 获取合成需要的基础图标
	function rePost() {
		// 更新数据
		$.post(
			"http://mq.soratech.cn/web_sock/public/index/index/user_sel", {
				openid: openid
			},
			function(msg) {
				if(msg) {
					var data = JSON.parse(msg);
					prize1 = data.prize1;
					prize2 = data.prize2;
					prize3 = data.prize3;
					prize4 = data.prize4;
					prize5 = data.prize5;
					// 改变图标
	judge(prize1, 'prize1', 0)
	judge(prize2, 'prize2', 1)
	judge(prize3, 'prize3', 2)
	judge(prize4, 'prize4', 3)
	judge(prize5, 'prize5', 4)
				}
			}
		)
	};
	// 合成物品
	function addPost() {
		// 添加数据
		$.post(
			// 请求地址
			'http://mq.soratech.cn/web_sock/public/index/index/user_update',
			// 数据data
			{
				data: [{
					type: type,
					prize: prize,
					fishing_openid: fishing_openid,
					fishing_coupons: fishing_coupons
				}],
				openid: openid,
				nickname: nickname

			},
			// 成功回调函数
			function(msg) {

				// 数量自减一
				prize1--;
				prize2--;
				prize3--;
				prize4--;
				prize5--;

			})
	};
}