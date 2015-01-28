mobilessonApp.controller('course', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function ($rootScope, $scope, $state, $stateParams, $http) {


    $http.get(domain + '?action=getStatisticsByUnit&unit=course&id=' + $stateParams.courseId)
    .success(function (data) {
        if (data.status == 'ok') {
            $scope.statistics = data.data;
        }
    })
    .error(function (data) {
        console.log(data);
    })

} ])
