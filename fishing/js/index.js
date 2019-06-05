var wxdata = localStorage.getItem('wxdata')
$.post(
	"http://mq.soratech.cn/web_sock/public/index/index/user_insert",
	user:wxdata,
	function(res){
		console.log(1)
	}
)

	$('.model_index')[0].addEventListener('click',dianji,false)
			function dianji(){
				$('.model_index')[0].style.display='none'
			}

		