$(document).ready(function() {
    var slider = $(".slider"),
        $map = $("#map");
    slider.each(function(){
        var is_actions = $(this).parent().hasClass("actions");
        $(this).bxSlider({
            pager: is_actions ? true : false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            minSlides: is_actions ? 2 : 1,
            maxSlides: is_actions ? 3 : 1,
            slideWidth: is_actions ? 360 : 0,
            slideMargin: is_actions ? 22 : 0
        });
    });

    if($map.length != 0){
        var coor = new google.maps.LatLng(46.4036637, 30.7484919);

        var map = new google.maps.Map(document.getElementById('map'),
            {
                zoom: 15,
                center: coor,
                scrollwheel: true,
                zoomControl: true,
                draggable: true,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            });

        new google.maps.Marker({
            position: coor,
            map: map
        });
    }

    $("input[type='datetime']").datetimepicker();

    $(".change_bg_slide").hover(function(){
        var $a = $(this),
            target = $a.data("target"),
            $fons = $a.parents("article").find(".fons");
        $fons.find(".bl_fons:visible").css("opacity", 0);
        $fons.find("." + target).css("opacity", 1);
    });
});