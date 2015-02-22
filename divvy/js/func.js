$(document).ready(function() {
    var winHeight = $(window).height(),
        $fs_block = $(".full_size");

    document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    document.is_ie11 = navigator.userAgent.indexOf("rv:11.0") > -1;
    document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
    document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;
    document.is_Apple = false;
    document.is_Android = false;

    if(window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)){document.is_Apple = true;}
    if(window.navigator.userAgent.match(/Android/i)){document.is_Android = true;}
    if((document.is_chrome)&&(document.is_safari)) {document.is_safari=false;}

    $fs_block.height(winHeight);
    $fs_block.find(".center").css("top",
        (winHeight - $fs_block.find(".center").outerHeight())/2
    );

    $fs_block.find(".hiw_p").hover(function(){
        if($(window).width() > 1200){
            document.scroll = setTimeout(function(){
                $fs_block.find(".hiw_p").addClass("edge");
                $fs_block.find(".hiw_p").append('<p class="must_click"> < You must click!</p>');
            }, 3000);
        }
    }, function(){
        if(document.scroll){
            clearTimeout(document.scroll);
            $fs_block.find(".hiw_p").removeClass("edge");
            $fs_block.find(".hiw_p").find(".must_click").remove();
        }
    });

    if(document.is_Apple){
        $(".field").on("focus", function(){
            $("header").hide();
        });
        $(".field").on("blur", function(){
            $("header").show();
        })
    }

    $(window).on("resize", function(){
        winHeight = $(window).height();
        $fs_block.height(winHeight);
        $fs_block.find(".center").css("top",
                (winHeight - $fs_block.find(".center").outerHeight())/2
        );

        if($(window).width() > 890){
            $("nav").removeAttr("style");
        }
    });

    $('a[href^="#"]').on("click", function(e){
        e.preventDefault();

        var elementClick = $(this).attr("href");

        if (document.is_firefox || document.is_explorer || document.is_ie11) {
            $("html").animate({scrollTop: elementClick == "#main" ? 0 : winHeight}, 1100);
        } else {
            $("body").animate({scrollTop: elementClick == "#main" ? 0 : winHeight}, 1100);
        }
    });

    $(".select_block").cusSelect();

    $(".menu").on("click", function(){
        $("nav").slideToggle();
        $(this).toggleClass("close");
        $("body").toggleClass("overflow");
        $("header").toggleClass("close");
    });
});