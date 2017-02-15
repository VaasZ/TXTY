var resetPwd = angular.module("resetPwd",["ngCookies"]);
resetPwd.controller("resetPwdCtrl",["$scope","$http","$cookies",function($scope,$http,$cookies){
	$scope.oldpwd = "";
	$scope.newpwd = "";
	$scope.newpwdr = "";
	$scope.result1 = true;
	$scope.result2 = true;
	$scope.cookie = $cookies.get("username");
	$scope.checkNewPwd = function(){
		var reg = /^[a-zA-Z0-9_]{6,16}$/;
		$scope.result2 = reg.test($scope.newpwd); 
	}
	$scope.resetPwdSubmit = function(){
		if ($scope.result2 && $scope.newpwd === $scope.newpwdr) {
			$http({
				url:"http://127.0.0.1/天选体育/php/resetPwd.php",
				method:"POST",
				data:{
					newpwd:$scope.newpwd,
					oldpwd:$scope.oldpwd,
					username:$scope.cookie
				},
			}).then(function(response){
				console.log(response.data);
				if (response.data == "success") {
					$cookies.remove("username");
					alert("修改成功,请重新登录");
					window.history.back();
				} else{
					$scope.result1 = false;
				}
			});
		}
	}
}]);