//window.requestAnimFrame = (function() {
//return (
//  window.requestAnimationFrame ||
//  window.webkitRequestAnimationFrame ||
//  window.mozRequestAnimationFrame ||
//  window.oRequestAnimationFrame ||
//  window.msRequestAnimationFrame ||
//  function(callback, element) {
//    window.setTimeout(callback, 1000 / 60)
//  }
//)
//})()
// 钓鱼按钮
var btn = document.querySelector('.btn')
btn.addEventListener('touchstart', function() {
	btn.style.transform = 'scale(0.8)'
})
btn.addEventListener('touchend', function() {
	btn.style.transform = 'scale(1)'
})
// 门店id
if(localStorage.getItem('room')==0){
localStorage.setItem('room',GetQueryString('id'))	
}
var imgXS=0
// 地址栏参数获取
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
// 图片加载
function imgload(){
	for (var i=0;i<9;i++) {
		$('.img1').eq(i).css('background-image','url(image/index/shouye_'+(i+1)+'.png)')
	}
}
imgload()
// 轮换
function imgrotate(){
	imgXS = imgXS<8?imgXS+1:0
	$('.img1').eq(imgXS).animate({
		'opacity':1,
		'z-index':10
	},70)
	$('.img1').eq(imgXS).siblings('.img1').css({
		'z-index':'-100',
		'opacity':'0.5'
	})
}
setInterval(imgrotate,70)
//		imgrotate()
//		requestAnimationFrame(imgrotate)

//window.onload = function() {
//(function animloop() {
//  imgrotate()
//  requestAnimFrame(animloop, window)
//})()
//}
