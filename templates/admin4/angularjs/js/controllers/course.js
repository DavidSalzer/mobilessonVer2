MetronicApp.controller('course', ['$rootScope', '$scope', '$state', '$stateParams', '$http', function ($rootScope, $scope, $state, $stateParams, $http) {

    var departments;

    $http.get(domain + '?action=getStatisticsByUnit&unit=course&id=' + $stateParams.courseId)
    .success(function (data) {
        if (data.status == 'ok') {
            departments = data.data.statisticsByCourse;
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

        var ticks = [[0, "London"], [1, "New York"], [2, "New Delhi"]];



        for (var department in departments) {
            started.push([parseInt(department), departments[department].started]);
            ended.push([parseInt(department), departments[department].ended]);
            notStarted.push([parseInt(department), departments[department].employees]);
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
                    label: "started",
                    data: d1,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }
                , {
                    label: "ended",
                    data: d2,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }, {
                    label: "ustarted",
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
                        colors: ["#ff0000", "#00ff00", "#0000ff"],
                        xaxis: {
                            ticks: ticks
                        }
                    }

            );

    }

} ])
