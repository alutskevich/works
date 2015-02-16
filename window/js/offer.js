$(document).ready(function(){
    $(".listWindow, .sliderWindow .slider").smoothDivScroll({
        mousewheelScrolling: "horizontal",
        touchScrolling: true,
        scrollingHotSpotLeftClass: "arrow-left",
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightClass: "arrow-right",
        scrollingHotSpotRightVisibleClass: "visible"
    });

    $(".offer").on("click", ".more", function(){
        var $this = $(this),
            fullOfferActive = $(".fullOffer.active");
        fullOfferActive.slideUp();
        $(".offer.active").removeClass("active");
        fullOfferActive.removeClass("active");
        $this.siblings(".fullOffer").slideDown().addClass("active");
        $this.parent().addClass("active");
    })
});