$(document).ready(function(){
    var oldx = 0,
        x = 0,
        points = $(".tizer .points"),
        tizerItems = $(".tizer .listItem"),
        sliderReviews = $('#reviews .slider');

    $(".startNow .slider, .articles .slider").smoothDivScroll({
        mousewheelScrolling: "horizontal",
        touchScrolling: true,
        scrollingHotSpotLeftClass: "arrow-left",
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightClass: "arrow-right",
        scrollingHotSpotRightVisibleClass: "visible"
    });

    $(".reviews .slider").getWidth();
    tizerItems.getWidth();

    if(tizerItems.find(".item").length > 2){
        var countItems = Math.ceil(tizerItems.find(".item").length / 2);
        for(var i = 0; i < countItems; i++)
            points.append("<li class='point'></li>");
        points.find(".point").first().addClass("active");
    }

    points.on("click", ".point", function(){
        var index = $(this).index(),
            left = index == 0 ? 0 : tizerItems.find(".item").width() * 2 * index + 60;
        tizerItems.css("left", 0 - left);
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".reviews .slider .item").each(function(){
        var max = 20,
            min = 0,
            top = parseInt(Math.random() * (max - min) + min),
            $this = $(this);
        $(".reviews .slider .item:before").css("top", top);
        $this.find(".border, .text, .author, .date").css("top", top);
    });

    //$(".moscow").getHeight();

    $('a[href^="#"]').bind('click',function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target),
            top = $target.offset().top - 73,
            $this = $(this);

        $('html, body').stop().animate({
            //'scrollTop': top + (target == "#map" ? 64 : 0)
            'scrollTop': top
        }, 900, 'swing', function(){
            $this.siblings(".active").removeClass("active");
            $this.addClass("active");
        });
    });

    $('#home, #reviews').mousemove(function(e){
        var x = -(e.pageX + this.offsetLeft) / 20;
        $(this).css('background-position', x + 'px ');
    });

    sliderReviews.mousemove(function(e){
        //if (this.offsetLeft == 0 || this.offsetLeft >= oldx) {
        if (e.pageX < oldx) {
            x = this.offsetLeft == 0 ? 0 : this.offsetLeft + 10;
        }
        //else if (this.offsetLeft < oldx){
        else if (e.pageX > oldx){
            x = this.offsetLeft == sliderReviews.width() ? sliderReviews.width() : this.offsetLeft - 20;
        }
        $(this).css('left', x + 'px');
        oldx = e.pageX;
    });

    $(".forMan .form .field[name='phone']").inputmask("+7(999)999-99-99");

    $(".anotherWay").on("click", ".button", function(){
        var thisForm = $(this).parent().parent(),
            anotherForm = thisForm.siblings("form");

        thisForm.slideUp();
        anotherForm.slideDown();
    });

    $(window).on("scroll", setActiveMenu);
});

$.fn.getWidth = function(){
    var items = $(this).find(".item");
    $(this).width(items.outerWidth() * items.length + 200);
};

$.fn.getHeight = function(){
    var height = $(window).height() - $("header").innerHeight() - $("#map .name").first().height() - $("#map.label").first().height();
    $(this).height(height);
};

function setActiveMenu(){
    var top = $(this).scrollTop(),
        nav = $("header nav"),
        number = 0;

    nav.find(".item").removeClass("active");
    if(top >=0 && top < 597)
        number = 0;
    else if(top >=597 && top < 1195)
        number = 1;
    else if(top >=1195 && top < 1724)
        number = 2;
    else if(top >=1724 && top < 2195)
        number = 4;
    else if(top >=2195 && top < 2565)
        number = 5;
    else
        number = 6;

    top != 0 ? $("header").addClass("scrolling") : $("header").removeClass("scrolling");

    if(top >= 2166){
        $(".map .moscow").animate({
            top: 0,
            left: 0
        }, 500, function(){
            setTimeout(function() {
            /*setTimeout(function() {
                $(".map .point").eq(1).css("opacity", 1);
            }, 1000);
            setTimeout(function() {
                $(".map .point").eq(2).css("opacity", 1);
            }, 2000);
            setTimeout(function() {
                $(".map .point").eq(3).css("opacity", 1);
            }, 3000);*/
                var array = $(".map .point").sort(function(a,b) {
                    var aa = parseInt($(a).css('top')),
                        bb = parseInt($(b).css('top'));
                    if(aa > bb)
                        return aa - bb;
                });
            var index = [];
            array.each(function(elem, val){
               index.push($(val).index());
            });
            var i = 0;
            console.log(index);
            (function() {
                if (i < array.length) {
                    var topPoint = parseInt($(".map .point").eq(index[i]).css("top"));
                    $(".map .point").eq(index[i]).css("opacity", 1).css("top", topPoint + 20);
                    i++;
                    setTimeout(arguments.callee, 500);
                }})();
                /*array.each(function(elem, val){
                    var topP = parseInt($(val).css("top"));
                    setTimeout(function() {
                        $(".map .point").eq(elem).css("opacity", 1);
                    }, 1000);
                    //console.log(elem);
                    //$(val).delay(elem * 1500).css("opacity", 1);
                    //$(val).animate({top: topP + 20}, );delay(elem * 1500).css("opacity", 1);
                });*/
            }, 1000);
        });
    }

    nav.find(".item").eq(number).addClass("active");
}