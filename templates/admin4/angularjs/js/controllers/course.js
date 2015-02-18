MetronicApp.controller('course', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function ($rootScope, $scope, $state, $stateParams, $http) {

    var departments;

    $http.get(domain + '?action=getStatisticsByUnit&unit=course&id=' + $stateParams.courseId)
    .success(function (data) {
        if (data.status == 'ok') {
            departments = data.data.statisticsByCourse;
            $scope.courseName = data.data.general.courseName;
            initChart();
        }
    })
    .error(function (data) {
        console.log(data);
    })

    function initChart() {

        if (!jQuery.plot) {
            return;
        }

        //bars with controls

        if ($('#course-chart').size() != 1) {
            return;
        }


        var started = [], ended = [], notStarted = []; //notStarted=employees-started

        var ticks = [];



        for (var department in departments) {
            started.push([parseInt(department), departments[department].started]);
            ended.push([parseInt(department), departments[department].ended]);
            notStarted.push([parseInt(department), departments[department].employees]);
            ticks.push([parseInt(department), departments[department].department.departmentName]);
        }

        var d3 = started;
        var d2 = ended;
        var d1 = notStarted;

        var stack = 1,
                    bars = true,
                    lines = false,
                    steps = false;

        $.plot($("#course-chart"),

                [
                {
                    label: "התחילו",
                    data: d1,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }
                , {
                    label: "סיימו",
                    data: d2,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }, {
                    label: "לא התחילו",
                    data: d3,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }]
                    , {
                        series: {
                            stack: true,
                            bars: {
                                show: bars,
                                barWidth: 0.5,
                                lineWidth: 0, // in pixels
                                shadowSize: 0,
                                align: 'center'
                            }
                        },
                        grid: {
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        },
                        colors: ["#6ea416", "#4dc1e6", "#eb2621"],
                        xaxis: {
                            ticks: ticks
                        }
                    }

            );

    }

} ])
