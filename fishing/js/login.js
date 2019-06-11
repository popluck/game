window.onload = function() {
	var code = getUrlKey("code");
	if(code) {			   
					localStorage.setItem('code', code)	   
	} else {
		getCodeApi("123");
		}
	
	function getUrlKey(name) { //获取url 参数
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

	function getCodeApi(state) { //获取code   
		var urlNow = encodeURIComponent(window.location.href);
		//   alert(window.location.href)
		var scope = 'snsapi_userinfo'; //snsapi_userinfo   //静默授权 用户无感知snsapi_base
		var appid = 'wxfd06f76da71ca6db';
		var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
		window.location.replace(url);
	}

}