'use strict';

MetronicApp.controller('DashboardController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        // Metronic.initAjax();
    });



    /*** Pie chart ***/

    //fake data
    var data = [
        { label: "השלימו",
          data: 78},
        {label: "בתהליך",
          data: 11},
        { label: "לא התחילו",
          data: 11}
    ];
    

    // plot pie chart
    if ($('#pie_chart').size() !== 0) {
        $.plot($("#pie_chart"), data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: function (label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.5,
                            color: '#000'
                        }
                    }
                }
            },
            legend: {
                show: false
            },
            colors: [ "#6ea416", "#4dc1e6","#eb2621"]
        });
    }


    //Flot Chart- time entries			
    var init = { data: [[1183240800000, 184.36], [1185919200000, 31.85], [1188597600000, 280.74], [1191189600000, 381.15], [1193871600000, 82.38], [1196463600000, 483.94], [1199142000000, 85.44]],
        label: " כניסות ליום "
    };

    var options = {
        series: {
            lines: {
                show: true,
                fill: true,
                fillColor: 'rgba(121,206,167,0.2)'
            },
            points: {
                show: true,
                radius: '4.5'
            },
            xaxis: { mode: "time",
                timeformat: "%Y/%m/%d"
            }
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        colors: ["#37b494"],
        xaxis: { mode: "time" }
    };

    $.plot("#placeholder", [init], options);


    //

    var departments = [
        { "employees": 5, "started": 5, "ended": 90 },
        { "employees": 10, "started": 30, "ended": 304 },
        { "employees": 9, "started": 20, "ended": 128 },
        { "employees": 6, "started": 18, "ended": 95 },
        { "employees": 15, "started": 18, "ended": 205 },
        { "employees": 5, "started": 5, "ended": 90 },
        { "employees": 60, "started": 150, "ended": 200 },
        { "employees": 15, "started": 20, "ended": 170 }
    ]

    function initChart() {

        if (!jQuery.plot) {
            return;
        }

        //bars with controls

        if ($('#course-chart').size() != 1) {
            return;
        }


        var started = [], ended = [], notStarted = []; //notStarted=employees-started

        var ticks = [[0, "תפעול"], [1, "מכירות"], [2, "הפצה"], [3, "לקוחות גדולים"], [4, "מלוחים סיירת"], [5, "מחלקת סחר"], [6, "בקרי שטח"], [7, "נציגות"]];



        for (var department in departments) {
            ended.push([parseInt(department), departments[department].ended]);
            started.push([parseInt(department), departments[department].started]);
            notStarted.push([parseInt(department), departments[department].employees]);
        }

        var d1 = ended;
        var d2 = started;
        var d3 = notStarted;

        var stack = 1,
                    bars = true,
                    lines = false,
                    steps = false;

        $.plot($("#course-chart"),

                [
                {
                    label: " סיימו ",
                    data: d1,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }
                , {
                    label: " התחילו ",
                    data: d2,
                    lines: {
                        lineWidth: 1
                    },
                    shadowSize: 0
                }, {
                    label: " לא התחילו ",
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
                        colors: [ "#6ea416", "#4dc1e6","#eb2621"],
                        xaxis: {
                            ticks: ticks
                        }
                    }

            );

    }
    initChart();

});