<?php
	$param = json_decode(file_get_contents("php://input"),true);
	$user_name = $param["user_name"];
?>