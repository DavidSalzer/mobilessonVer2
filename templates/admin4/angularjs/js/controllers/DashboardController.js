'use strict';

MetronicApp.controller('DashboardController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        // Metronic.initAjax();
    });



    /*** Pie chart ***/

    //fake data
    var data = [];
    var series = Math.floor(Math.random() * 3) + 1;
    series = 3;

    for (var i = 0; i < series; i++) {
        data[i] = {
            label: "Series" + (i + 1),
            data: Math.floor(Math.random() * 100) + 1
        };
    }

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
            }
        });
    }


    //Flot Chart			
    var init = { data: [[1183240800000, 184.36], [1185919200000, 31.85], [1188597600000, 280.74], [1191189600000, 381.15], [1193871600000, 82.38], [1196463600000, 483.94], [1199142000000, 85.44]],
        label: "Entries Per Day"
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

    plot = $.plot("#placeholder", [init], options);

    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #222",
        padding: "4px",
        color: "#fff",
        "border-radius": "4px",
        "background-color": "rgb(0,0,0)",
        opacity: 0.90
    }).appendTo("body");

    $("#placeholder").bind("plothover", function (event, pos, item) {

        var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
        $("#hoverdata").text(str);

        if (item) {
            var x = item.datapoint[0],
				y = item.datapoint[1];

            $("#tooltip").html("Visitor : " + y)
				.css({ top: item.pageY + 5, left: item.pageX + 5 })
				.fadeIn(200);
        } else {
            $("#tooltip").hide();
        }
    });

    $("#placeholder").bind("plotclick", function (event, pos, item) {
        if (item) {
            $("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
            plot.highlight(item.series, item.datapoint);
        }
    });

    var animate = function () {
        $('#placeholder').animate({ tabIndex: 0 }, {
            duration: 3000,
            step: function (now, fx) {

                var r = $.map(init.data, function (o) {
                    return [[o[0], o[1] * fx.pos]];
                });

                plot.setData([{ data: r}]);
                plot.draw();
            }
        });
    }

    animate();


    //

    departments=[
        {"employees":40,"started":20,"ended":5},
        {"employees":90,"started":80,"ended":78},
        {"employees":20,"started":20,"ended":5}
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
    initChart();

});