window.onload = function() {
console.log(typeof localStorage.getItem('wxdata'))
//	if(!localStorage.getItem('wxdata')) {
		var code = getUrlKey("code");
		if(code) {
			$.get(
				"http://mq.soratech.cn/stores/public/game/index/openid", {
					code: code
				},
				function(res) {
//					alert(res)
					localStorage.setItem('wxdata', res)
				})
		} else {
			getCodeApi("123");
		}
//	}
	function getUrlKey(name) { //获取url 参数
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

	function getCodeApi(state) { //获取code   
		let urlNow = encodeURIComponent(window.location.href);
		let scope = 'snsapi_userinfo'; //snsapi_userinfo   //静默授权 用户无感知snsapi_base
		let appid = 'wxfd06f76da71ca6db';
		let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
		window.location.replace(url);
	}
	
	
	// 钓鱼按钮
var btn = document.querySelector('.btn');
var gift = document.querySelector('.gift')
btn.addEventListener('touchstart', function() {
	btn.style.transform = 'scale(0.8)'
})
btn.addEventListener('touchend', function() {
	btn.style.transform = 'scale(1)'
})
// 门店id
localStorage.setItem('room',GetQueryString('id'))	
var imgXS=1
// 地址栏参数获取
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

// 轮换
function imgrotate(){
	imgXS = imgXS<9?imgXS+1:1
	$('.img1').eq(imgXS).animate({
		'opacity':1,
		'z-index':10
	},150)
	$('.img1').eq(imgXS).siblings('.img1').css({
		'z-index':'-100',
		'opacity':'0.5'
	})
}

}