<?php
	$param = json_decode(file_get_contents("php://input"),true);
	$oldpwd = $param["oldpwd"];
	$newpwd = $param["newpwd"];
	$username = $param["username"];
	$my = new mysqli("127.0.0.1","root","","TXYD");
	if($my->connect_error){
		die("链接失败".$my->connect_error);
	}
	$my->query("set names utf8");
	$findSql = "SELECT *FROM userInformation WHERE user_name = '$username' AND user_pwd = '$oldpwd'";
	$updateSql = "UPDATE userInformation SET user_pwd = '$newpwd' WHERE user_name = '$username'";
	$rs = $my->query($findSql);
	if($rs && mysqli_num_rows($rs)>0){
		$rs1 = $my->query($updateSql);
		echo "success";
	}else{
		echo "wrongOld";
	}
?>