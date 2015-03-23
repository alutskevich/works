$(document).ready(function() {
    var slider = $(".slider"),
        $map = $("#map");
    slider.each(function(){
        var is_actions = $(this).parent().hasClass("actions");
        $(this).bxSlider({
            pager: is_actions ? true : false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            minSlides: is_actions ? 3 : 1,
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
                styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
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