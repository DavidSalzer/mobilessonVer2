/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    });
} ]);

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
} ]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
} ]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/


/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
    });
} ]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
} ]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

    // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard', pageSubTitle: 'statistics & reports' },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        files: [
                            '../../../assets/global/plugins/morris/morris.css',
                            '../../../assets/admin/pages/css/tasks.css',

                            '../../../assets/global/plugins/morris/morris.min.js',
                            '../../../assets/global/plugins/morris/raphael-min.js',
                            '../../../assets/global/plugins/jquery.sparkline.min.js',

                            '../../../assets/admin/pages/scripts/index3.js',
                            '../../../assets/admin/pages/scripts/tasks.js',

                             'js/controllers/DashboardController.js'
                        ]
                    });
                } ]
            }
        })

    // Department
        .state('department', {
            url: "/department.html/:departmentId",
            templateUrl: "views/departments/department.html",
            data: { pageTitle: 'מחלקות', pageSubTitle: '' },
            controller: "department",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        files: [
                            '../../../assets/global/plugins/datatables/media/css/jquery.dataTables.min.css',
                            '../../../assets/global/plugins/datatables/extensions/TableTools/css/dataTables.tableTools.min.css',

                            '../../../assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js',

                            'js/controllers/Department.js'
                        ]
                    });
                } ]
            }
        })

    // courses
        .state('course', {
            url: "/course.html/:courseId",
            templateUrl: "views/courses/course.html",
            data: { pageTitle: 'קורסים', pageSubTitle: '' },
            controller: "course",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        files: [
                            '../../../assets/global/plugins/flot/jquery.flot.stack.min.js',
                             'js/controllers/course.js'
                        ]
                    });
                } ]
            }
        })

} ]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
} ]);