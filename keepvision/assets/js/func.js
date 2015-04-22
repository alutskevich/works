$(document).ready(function(){
    var $tabs = $("#tabs"),
        $header = $("#header");

    $.material.init();

    $tabs.find(".tab").on("click", function(){
        var $tab = $(this),
            screen = $tab.data("target");

        if(!$tab.hasClass("active")){
            $tab.siblings(".active").removeClass("active");
            $tab.addClass("active");
        }

        if(screen == 'login'){
            $(".screen.signup").fadeOut();
            $(".forgot-form").fadeOut();
            $(".screen.login").fadeIn().find(".login-form").fadeIn();
        } else{
            $(".screen.login").fadeOut();
            $(".forgot-form").fadeOut();
            $(".screen.signup").fadeIn();
        }

        $(".tab_panel:visible").fadeOut();
        $(".tab_panel." + screen).fadeIn();
    });

    $(".forgot_password").on("click", function(){
        $(".screen.login").find(".login-form").fadeOut();
        $(".forgot-form").fadeIn();
        $(".screen.signup").fadeOut();
    });

    /*if($header.length != 0){
        $(".select").dropdown({ "autoinit" : ".select" });
    }*/

    if($(".shor").length != 0){
        $(".shor").noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });
    }

    $(".radio_block").on("click", function(){
        var self = $(this);
        self.siblings(".radio_input").prop("checked", true);
    });

    if($('.chart').length != 0){
        $('.chart').easyPieChart({
            size: 150,
            lineWidth: 10,
            animate: 2000,
            scaleColor: false,
            barColor: '#51ace8',
            trackColor: '#e1e7e9'
        });
    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
        labels : [ "10.12.2015" , "11.12.2015" , "12.12.2015" ],
        datasets : [
            {
                label : "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [ 30 , 40 , 50]
            }
        ]
    };
    var myLineChart = new Chart (ctx).Line(data);
});
