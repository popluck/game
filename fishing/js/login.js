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
					alert(res)
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

}