<?php
	$param = json_decode(file_get_contents("php://input"),true);
	$user_name = $param["user_name"];
	$user_pwd = $param["user_pwd"];
	$my =  new mysqli("127.0.0.1","root","","TXYD");
	if($my->connect_error){
		die("连接失败".$my->connect_error);
	}
	$my->query("set names utf8");
	$findSql1 = "SELECT *FROM userInformation WHERE user_name = '$user_name' AND user_pwd = '$user_pwd'";
	$findSql2 = "SELECT *FROM userInformation WHERE user_name = '$user_name'";
	$rs1 = $my->query($findSql1);
	$rs2 = $my->query($findSql2);
	if($rs2 && mysqli_num_rows($rs2)>0){
		if($rs1 && mysqli_num_rows($rs1)>0){
			echo "success";
		}else{
			echo "pwdWrong";
		}
	}else{
		echo "false";
	}
?>