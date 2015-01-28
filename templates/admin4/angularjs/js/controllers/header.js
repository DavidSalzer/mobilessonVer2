/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'httpRequest', function ($rootScope, $scope, $state, $stateParams, $timeout, httpRequest) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });

    queryString = '?action=profile';

    httpRequest.sendRequest('get', queryString)
    .then(function (data) {
        if (data.status == 'ok') {
            $timeout(function () {
                $scope.user = data.data;
            }, 0);
            $rootScope.$broadcast('setUser', { user: data.data });
        }
    })

    $scope.logout = function () {
        queryString = '?action=logout';
        httpRequest.sendRequest('get', queryString)
        .then(function (data) {
            if (data.status == 'ok') {
                window.location.replace(cmsOrigin + 'templates/admin4/login.html');
            }
        })
    }

} ]);