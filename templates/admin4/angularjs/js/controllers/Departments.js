MetronicApp.controller('departments', ['$rootScope', '$scope', '$state', 'httpRequest', function ($rootScope, $scope, $state, httpRequest) {

    queryString = '?action=getStatisticsByUnit&unit=all';

    httpRequest.sendRequest('get', queryString)
    .then(function (data) {
        if (data.status == 'ok') {
            $timeout(function () {
                $scope.statistics = data.data;
            }, 0);
        }
    })

} ])
