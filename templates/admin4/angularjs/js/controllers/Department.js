MetronicApp.controller('department', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function ($rootScope, $scope, $state, $stateParams, $http) {
    // $('#scroll-to-top').click();

    /*$(function () {
    $('#dataTable').dataTable({
    "bJQueryUI": true,
    "sPaginationType": "full_numbers"
    });
    $('#chk-all').click(function()	{
    if($(this).is(':checked'))	{
    $('#responsiveTable').find('.chk-row').each(function()	{
    $(this).prop('checked', true);
    $(this).parent().parent().parent().addClass('selected');
    });
    }
    else	{
    $('#responsiveTable').find('.chk-row').each(function()	{
    $(this).prop('checked' , false);
    $(this).parent().parent().parent().removeClass('selected');
    });
    }
    });
    });
    */
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

    $scope.getEmployeesByCourse = function () {
        $http.get(domain + '?action=getStatisticsByUnit&unit=department&id=' + $stateParams.departmentId)
    .success(function (data) {
        if (data.status == 'ok') {
            //$scope.employees = data.data;
            $scope.employees = [{ "No": "#1001",
                "Product": "Leather Bag",
                "Price": "$89",
                "Quantity": "30",
                "Sales": "187",
                "Date": "Oct 08,2013",
                "Status": "In Stock"
            },
            { "No": "#1002",
                "Product": "Leather Bag",
                "Price": "$89",
                "Quantity": "30",
                "Sales": "187",
                "Date": "Oct 08,2013",
                "Status": "In Stock"
            }]
            console.log($scope.employees)
        }
    })
    .error(function (data) {
        console.log(data);
    })
    }

} ])