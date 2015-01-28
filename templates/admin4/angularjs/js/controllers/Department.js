MetronicApp.controller('department', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function ($rootScope, $scope, $state, $stateParams, $http) {
    // $('#scroll-to-top').click();


    //$scope.departmentId = $stateParams.departmentId;
    $http.get(domain + '?action=getStatisticsByUnit&unit=department&id=' + $stateParams.departmentId)
    .success(function (data) {
        if (data.status == 'ok') {
            $scope.statistics = data.data;

            $scope.courses = data.data.statisticsByCourse;
            for (i = 0; i < $scope.courses.length; i++) {
                $scope.courses[i].completedPercent = $scope.courses[i].employees * $scope.courses[i].ended / 100;
            }
            console.log($scope.statistics)
        }
    })
    .error(function (data) {
        console.log(data);
    })

    $scope.getEmployeesByCourse = function (courseId) {
        $http.get(domain + '?action=getStatisticsByUnit&unit=employeesStatus&departmentId=' + $stateParams.departmentId + '&courseId=' + courseId)
    .success(function (data) {
        console.log(data)
        if (data.status == 'ok') {
            $scope.courseDetails = data.data.general;
            $scope.employees = data.data.employees;

            console.log($scope.employees);
            initTable1();
        }
    })
    .error(function (data) {
        console.log(data);
    })
    }

    var initTable1 = function () {
        $('#employeesTable').DataTable({
            dom: 'T<"clear">lfrtip',
            tableTools: {
                "sSwfPath": "../../../assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
            }
        });
    }
} ])