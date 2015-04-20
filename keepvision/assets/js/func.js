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

});
