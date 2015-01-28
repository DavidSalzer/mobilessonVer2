/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$rootScope', '$scope', '$state', '$stateParams', 'httpRequest', '$timeout', function ($rootScope, $scope, $state, $stateParams, httpRequest, $timeout) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });

    $scope.departments = []; // [{ 'name': 'transport', 'id': '123' }, { 'name': 'finance', 'id': '456'}];
    $scope.currentPage = 'courses';
    $scope.navigate = function (page, params) {
        console.log(page);
        $state.transitionTo(page, params)
        //add class active
        //remove active from others
        //transition to
        //if openable- slide down
        // if page=currentpage
    }

    queryString = '?action=getDepartments';

    httpRequest.sendRequest('get', queryString)
    .then(function (data) {
        if (data.status == 'ok') {
            $timeout(function () {
                $scope.departments = data.data;
            }, 0);
        }
    })


    $scope.$on('setUser', function (event, args) {
        $timeout(function () {
            $scope.user = args.user;
        }, 0);
    });
} ]);