var btn = document.querySelector('.btn')
btn.addEventListener('touchstart', function() {
	btn.style.transform = 'scale(0.8)'
})
btn.addEventListener('touchend', function() {
	btn.style.transform = 'scale(1)'
})
var wxdata = localStorage.getItem('wxdata')
//alert(wxdata)
localStorage.setItem('room',GetQueryString('id'))
//alert(localStorage.getItem('room'))
$.post(
	"http://mq.soratech.cn/web_sock/public/index/index/user_insert", {
		user: wxdata,
	},
	function(res) {
		alert(res)
		console.log(1)
	})
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
