window.onload = function() {


	
//	var wxdata = localStorage.getItem('wxdata')
//		if(!wxdata) {
	let code = getUrlKey("code");
	if(code) {
						   alert('code:'+code)
					localStorage.setItem('code', code)	   
			$.get(
				"http://mq.soratech.cn/stores/public/game/index/openid", {
					code: code
				},
				function(res) {
					console.log(res)
					alert(res,2)
					localStorage.setItem('wxdata', res)
					
				})
	} else {
		getCodeApi("123");
		}
	

	function getUrlKey(name) { //获取url 参数
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

	function getCodeApi(state) { //获取code   
		let urlNow = encodeURIComponent(window.location.href);
		//   alert(window.location.href)
		let scope = 'snsapi_userinfo'; //snsapi_userinfo   //静默授权 用户无感知snsapi_base
		let appid = 'wxfd06f76da71ca6db';
		let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
		window.location.replace(url);
	}

}