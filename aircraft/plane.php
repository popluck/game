<?php
header("Content-type: text/html; charset=utf-8");
if(!isset($_GET['code'])){
$APPID='wxfd06f76da71ca6db';
$REDIRECT_URI='http://mq.soratech.cn/h5_game/aircraft/plane.php';
$scope='snsapi_base';
$url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$APPID.'&redirect_uri='.urlencode($REDIRECT_URI).'&response_type=code&scope='.$scope.'&state=wx'.'#wechat_redirect';
 echo "<script>location.href='".$url."'</script>";
}else{
$appid = "wxfd06f76da71ca6db";
$secret = "2f7378287e89d87d3046839c82f46df4";
$code = $_GET["code"];
$get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$get_token_url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
$res = curl_exec($ch);
curl_close($ch);
$json_obj = json_decode($res,true);
//根据openid和access_token查询用户信息
$access_token = $json_obj['access_token'];
$openid = $json_obj['openid'];
$get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$get_user_info_url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
$res = curl_exec($ch);
curl_close($ch);

//解析json
$user_obj = json_decode($res,true);
$_SESSION['user'] = $user_obj;
print_r($user_obj);
} 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>javascript 原生打飞机游戏</title>
	<link rel="stylesheet" href="style.css">
	<script src="step8.js"></script>
</head>
<body>
	<div id="game">
		<div id="gameStart">
			<span>开始游戏</span>
		</div>
		<div id="gameEnter">
			<div id="myPlane">
				<img src="image/my.png" alt="">
			</div>
			<div id="bullets">
			</div>
			<div id="enemys"></div>
			<div id="scores">
				<p>得分：<span>0</span> 分</p>
			</div>
		</div>
	</div>
</body>
</html>