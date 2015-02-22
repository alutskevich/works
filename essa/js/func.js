$(document).ready(function(){

    document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
    document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;

    $(".tab_content").mCustomScrollbar({
        theme:"dark-3"
    });

    $("header").find(".button").on("click", function(){
        var $button = $(this),
            $text = $("div.text");

        $button.toggleClass("active");
        $(".online_block").css("opacity", $button.hasClass("active") ? 1 : 0);
    });

    $(".service").on("click", function(){
        var $service = $(this),
            data_target = $service.data("target"),
            $info_active = $(".info.active"),
            $info_action = $(".info[data-action='" + data_target + "']");
        if($service.hasClass("active")){
            $info_active.slideUp(500, function(){
                $(this).removeClass("active");
                $service.removeClass("active");
            });
        } else{
            $info_active.slideUp(500).removeClass("active");
            $(".service.active").removeClass("active");
            $info_action.slideDown(500, function(){
                $(this).addClass("active");
                $service.addClass("active");
            });
        }
    });

    var mapMarsh, markerMarsh, marker,
        coorMarsh = new google.maps.LatLng(55.7919647, 37.7082784);

    mapMarsh = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 15,
            center: coorMarsh,
            scrollwheel: $(window).width() > 600 ? true : false,
            zoomControl: $(window).width() > 600 ? true : false,
            draggable: $(window).width() > 600 ? true : false
        });

    markerMarsh = new google.maps.Marker({
        position: coorMarsh,
        map: mapMarsh
    });
    markerMarsh.setMap(mapMarsh);

    $('a[href^="#"]').on("click",function(e){
        e.preventDefault();
        var elementClick = $(this).attr("href"),
            destination = $(elementClick).offset().top;

        document.navScroll = true;

        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");

        if(document.is_firefox || document.is_explorer){
            $("html").animate( { scrollTop: destination }, 1100 ,function(){
                document.navScroll = false;
            });
        } else{
            $("body").animate( { scrollTop: destination }, 1100 ,function(){
                document.navScroll = false;
            });
        }
    });

    $(".list_urls").smoothDivScroll();
});