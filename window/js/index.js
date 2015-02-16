var mapVisible = false;
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
        console.log(this.offsetLeft);
        var maxLeft = 0 - sliderReviews.width() + 1300;
        console.log("maxLeft: ", maxLeft);
        if (e.pageX < oldx) {
            if(this.offsetLeft == 0)
                x = 0;
            else
                x = this.offsetLeft + 10;
            //x = this.offsetLeft == 0 && this.offsetLeft >= sliderReviews.width() - 1300 ? 0 : this.offsetLeft + 10;
        }
        else if (e.pageX > oldx){
            if(this.offsetLeft <= maxLeft)
                x = maxLeft;
            else
                x = this.offsetLeft - 10;
            //x = this.offsetLeft >= sliderReviews.width() - 1300 ? sliderReviews.width() - 1300 : this.offsetLeft - 10;
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

    /*
    * Update, November, 2014
    * */
    $("#articles .slider .info .bs").on("click", function(e){
        e.stopPropagation();
        $(".overlay").height($("body").height()).fadeIn();
        if(document.slider){
            document.slider.destroySlider();
        }
        document.slider = $('.modal.article .gal').bxSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 250,
            slideMargin: 10,
            pager: false,
            nextText: "",
            prevText: "",
            nextSelector: ".arrowRight",
            prevSelector: ".arrowLeft"
        });
    });

    $(".fancybox").fancybox();

    $("body").on("click", function(e){
        var element = $(e.target);
        console.log(element);
        console.log(!element.is("a"));
        console.log(element.parents("a").length);

        if(!element.is("a") && element.parents("a").length == 0){
            if((element.parents(".modal").length == 1 || element.is(".modal")) && !element.hasClass("close")){
                return false;
            }
            $(".overlay").fadeOut();
        }



    });
    $(document).on('keyup',function(e){
        if (e.keyCode == 27) {
            $(".overlay").fadeOut();
        }
    });
    /*
    * End update
    * */

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
    if(top >= 2166 && !mapVisible){
        $(".map .moscow").animate({
            top: 0,
            left: 0
        }, 10, function(){
            setTimeout(function() {
                var array = $(".map .point").sort(function(a,b) {
                    var aa = parseInt($(a).css('top')),
                        bb = parseInt($(b).css('top'));
                    if(aa > bb)
                        return aa - bb;
                });
                var index = [], i = 0;
                array.each(function(elem, val){
                   index.push($(val).index());
                });
                (function() {
                    if (i < array.length) {
                        var topPoint = parseInt($(".map .point").eq(index[i]).css("top"));
                        $(".map .point").eq(index[i]).css("opacity", 1).css("top", topPoint + 20);
                        i++;
                        setTimeout(arguments.callee, 200);
                    }
                })();
            }, 1000);
            mapVisible = true;
        });
    }

    nav.find(".item").eq(number).addClass("active");
}