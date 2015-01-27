$(document).ready(function() {
    var $html = $("html");

    if($html.hasClass("main_page")){
        var contentBlock = $(".content"),
            evBlock = contentBlock.find(".events"),
            evHeight = evBlock.height(),
            winHeight = $(window).height();

        evBlock.css("top", (winHeight - evHeight)/2 + 40);

        $(window).on("resize", index.winResize);
        index.imgload();

        contentBlock.find(".button").on("click", index.changeSlide);
    }
});