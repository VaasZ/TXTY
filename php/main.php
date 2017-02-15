<?php
	$param = json_decode(file_get_contents("php://input"),true);
	$user_name = $param["user_name"];
	$user_pwd = $param["user_pwd"];
	$user_email = $param["user_email"];
	$user_phone = $param["user_phone"];
	
	$my = new mysqli("127.0.0.1","root","","TXYD");
	if($my->connect_errno){
		die("链接失败".$my->connect_error);
	}
	$my->query("set names utf8");
	$sql = "SELECT *FROM userInformation WHERE user_name = '$user_name'";
	$rs = $my->query($sql);
	if ($rs && mysqli_num_rows($rs)>0) {
				echo "false";
		}else{
			$value = $user_name;
			
			$insertSql = "INSERT INTO userInformation (user_name,user_pwd,email,phone) VALUES ('$user_name','$user_pwd','$user_email','$user_phone')";
			$createTable = "CREATE TABLE IF NOT EXISTS `TX_".$user_name."_shopCar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopCar` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;";
			$rs = $my->query($insertSql);
			$rt = $my->query($createTable);
			if ($rs && $rt) {
				echo "true";
			}else{
				echo "false";
			}
		}
?>