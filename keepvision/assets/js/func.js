$(document).ready(function(){
    var $tabs = $("#tabs");

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
});
