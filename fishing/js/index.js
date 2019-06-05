window.onload = function() {

	$('.model_index')[0].addEventListener('click', dianji, false)
	var wxdata = localStorage.getItem('wxdata')
	$.post(
		"http://mq.soratech.cn/web_sock/public/index/index/user_insert",{
		user: wxdata,
		},
		function(res) {
			console.log(1)
		})

	function dianji() {
		$('.model_index')[0].style.display = 'none'
	}

}