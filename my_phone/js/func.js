$(document).ready(function() {
    var page = new Page();
    page.testBrowser();

    $(".slider").bxSlider({
        auto: true,
        pause: 7000,
        infiniteLoop: false
    });

    $('a[href^="#"]').on("click",function(e){
        e.preventDefault();
        var elem = $(this),
            elementClick = elem.attr("href"),
            destination = $(elementClick).offset().top;

        if(document.is_firefox || document.is_explorer){
            $("html").animate( { scrollTop: destination }, 1100);
        } else{
            $("body").animate( { scrollTop: destination }, 1100);
        }
    });

    $(".arrow").on("click", function(){
        var self = $(this),
            $next = self.parents("section").next(),
            scrollTo = $next.hasClass("list") ? $next.offset().top + 80 : $next.offset().top;
        if (document.is_firefox || document.is_explorer) {
            $("html").animate({scrollTop: scrollTo}, 1100);
        } else {
            $("body").animate({scrollTop: scrollTo}, 1100);
        }
    });
});