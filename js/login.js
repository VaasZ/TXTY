var login = angular.module("login",["ngCookies"]);
login.controller("loginCtrl",["$scope","$http","$cookies",function($scope,$http,$cookies){
	$scope.username = "";
	$scope.userpwd = "";
	$scope.check = "";
	$scope.result1 = true;
	$scope.result2 = true;
	$scope.checkUserName = function(){
		var reg = /^[a-zA-z][a-zA-Z0-9_]{3,}$/;
		$scope.result1 = reg.test($scope.username);
	}
	$scope.checkUserPwd = function(){
		var reg = /^[a-zA-Z0-9_]{6,16}$/;
		$scope.result2 = reg.test($scope.userpwd); 
	}
	$scope.submitUser = function(){
		if ($scope.result1 && $scope.result2) {
			console.log(1);
			$http({
				url:"http://127.0.0.1/天选体育/php/login.php",
				method:"POST",
				data:{
					user_name:$scope.username,
					user_pwd:$scope.userpwd,
				},
			}).then(function(response){
				console.log(response.data);
				if (response.data == "success") {
					alert("登陆成功");
					if ($scope.check == true) {
//						设置cookie 保存时间
						var expireDate = new Date();
						expireDate.setDate(expireDate.getDate() + 7);
						$cookies.put("username", $scope.username, {'expires': expireDate});
					} else{
						$cookies.put("username", $scope.username);
					}				
					window.location.href = "http://127.0.0.1/%E5%A4%A9%E9%80%89%E4%BD%93%E8%82%B2/home.html";
				}else if(response.data == "pwdWrong"){
					alert("密码错误");
				}else if(response.data == "false"){
					alert("用户名不存在!");
				}
			});
		}else{
			alert("请完善您的信息!");
		}
	}
}]);