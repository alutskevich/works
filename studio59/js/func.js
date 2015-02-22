$(document).ready(function(){
    if($("#masonry").length == 1){

        setTimeout(function(){
            $("#masonry").masonry({
                columnWidth: 10,
                itemSelector: '.item',
                isResizable: true
            });
        },0);
        /*new Masonry('.masonry', {
            columnWidth: 10,
            itemSelector: '.item',
            isResizable: true
        }).imagesLoaded(function() {
                $('#content').masonry('reload');
            });*/
    }
    if($(".fancybox").length >= 1){
        $(".fancybox").fancybox({
            maxWidth: "90%",
            fitToView: false
        });
    }
    if($("#map-canvas").length == 1){
        var map;
        function initialize() {
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(-34.397, 150.644)
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }
});