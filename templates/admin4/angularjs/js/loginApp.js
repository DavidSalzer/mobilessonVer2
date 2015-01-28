//var domain = 'http://ec2-184-73-131-143.compute-1.amazonaws.com/';

var loginApp = angular.module('loginApp', [])

.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {

    $scope.sendLogin = function () {

        //validation
        $scope.showUserNameError = $scope.userName == undefined || $scope.userName == '';
        $scope.showPasswordError = $scope.password == undefined || $scope.password == '';

        if ($scope.showUserNameError || $scope.showPasswordError) {
            $scope.loginErrorMessage = errorMessages.validationError;
            alert($scope.loginErrorMessage);
            return;
        }

        queryString = '?action=login';
        request = {
            userName: $scope.userName,
            password: $scope.password
        }
        $scope.json = JSON.stringify(request);

        $http.post(domain + queryString, $scope.json)
        .success(function (data) {
            console.log(data);
            //if server return success code - need match to sever api.
            if (data.status == 'ok') {
                window.location.replace(cmsOrigin + 'templates/admin4/angularjs/index.html');
            }
            else {
                $scope.loginErrorMessage = errorMessages.loginError;
                alert($scope.loginErrorMessage);
            }
        })
        .error(function (data) {
            $scope.loginErrorMessage = errorMessages.loginError;
            alert($scope.loginErrorMessage);
        })
    }
} ])

