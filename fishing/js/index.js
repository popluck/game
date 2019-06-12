// 钓鱼按钮
//window.onload=function(){

var btn = document.querySelector('.btn')
btn.addEventListener('touchstart', function() {
	btn.style.transform = 'scale(0.8)'
})
btn.addEventListener('touchend', function() {
	btn.style.transform = 'scale(1)'
})
$.get(
				"http://mq.soratech.cn/stores/public/game/index/openid", {
					code: localStorage.getItem('code')
				},
				function(res) {
					alert(res)

					localStorage.setItem('wxdata', res)
				})
// 用户微信信息
//var wxdata = localStorage.getItem('wxdata')
//alert(wxdata)
// 门店id
localStorage.setItem('room',GetQueryString('id'))
//alert(localStorage.getItem('room'))

// 加入游戏
//$.post(
//	"http://mq.soratech.cn/web_sock/public/index/index/user_insert", {
//		user: wxdata,
//	},
//	function(res) {
//		alert(res)
//		console.log(1)
//	})
var imgURL=0;
var imgXS=0
var imgXS1=1
// 地址栏参数获取
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
// 图片加载
function imgload(){
//	console.log($('#bkg').css('background-image'))
//	$('.img1').eq(imgXS).css('background-image','url(image/index/shouye_'+imgURL+'.png)')
//	$('.img1').eq(imgXS+1).css('background-image','url(image/index/shouye_'+(imgURL+1)+'.png)')
//	$('.img1').eq(imgXS+2).css('background-image','url(image/index/shouye_'+(imgURL+2)+'.png)')
	$('.img1').eq(imgXS1).css('background-image','url(image/index/shouye_'+(imgURL+1)+'.png)')
 
	imgURL=imgURL<99?imgURL+1:0

}
//console.log($('.img1'))
// 轮换
function imgrotate(){
	imgXS = imgXS<3?imgXS+1:0
	$('.img1').css('z-index','-100')
	$('.img1').eq(imgXS).css('z-index','10')
	
}

//	$('#bkg').css('background-image','url(image/index/shouye_'+imgURL+'.png)')
//setInterval(function(){
//	imgload()
//	imgrotate()
//	console.log(imgURL)
//	console.log(imgXS)
//},1000)
//}