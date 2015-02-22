$(document).ready(function(){

    document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
    document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;

    if(document.is_Opera){
        $(".products_slider, .reviews_slider").addClass("opera");
    }

    $(window).on("resize", function(){
        if($(window).width() < 1024){

            if($(window).width() < 768) {
                $(".top.mobile").removeClass("none");
                $(".top.mobile").siblings(".top").addClass("none");
                if(!document.prodSlider){
                    document.prodSlider = $('.products_slider').bxSlider({
                        pager: false,
                        nextSelector: '.arrow.right',
                        prevSelector: '.arrow.left',
                        nextText: '',
                        prevText: ''
                    });
                }
                if($(window).width() < 600) {
                    $('#masonry').masonry('destroy');
                    $('#masonry-news').masonry('destroy');
                } else{
                    if($('#masonry').length != 0){
                        $('#masonry').masonry({
                            //columnWidth: ".review_width",
                            columnWidth: 3,
                            itemSelector: '.review'
                        });
                    }
                    if($('#masonry-news').length != 0){
                        $('#masonry-news').masonry({
                            columnWidth: 2,
                            isAnimated: true,
                            itemSelector: '.item'
                        });
                    }
                }
            } else{
                $(".top.mobile").addClass("none");
                $(".top.mobile").siblings(".top").removeClass("none");
                if(document.prodSlider){
                    document.prodSlider.destroySlider();
                    $('.products_slider').attr("style", "");
                    $(".products_slider .item").each(function(){
                        $(this).width("33%");
                    });
                    document.prodSlider = false;
                }
            }
        } else{
            if(document.prodSlider){
                document.prodSlider.destroySlider();
                $('.products_slider').removeAttr("style");
                $(".products_slider .item").each(function(){
                    $(this).width("33%");
                });
                document.prodSlider = false;
            }
        }
    });

    if($(window).width() < 1024){
        if($(window).width() < 768) {
            $(".top.mobile").removeClass("none");
            $(".top.mobile").siblings(".top").addClass("none");
            if(!document.prodSlider){
                document.prodSlider = $('.products_slider').bxSlider({
                    pager: false,
                    nextSelector: '.arrow.right',
                    prevSelector: '.arrow.left',
                    nextText: '',
                    prevText: ''
                });
            }
        } else{
            $(".top.mobile").addClass("none");
            $(".top.mobile").siblings(".top").removeClass("none");
            if(document.prodSlider){
                document.prodSlider.destroySlider();
                document.prodSlider = false;
                $('.products_slider').removeAttr("style");
                $(".products_slider .item").each(function(){
                    $(this).width("33%");
                });
            }
        }
    } else{
        if(document.prodSlider){
            document.prodSlider.destroySlider();
            document.prodSlider = false;
            $('.products_slider').removeAttr("style");
            $(".products_slider .item").each(function(){
                $(this).removeAttr("style");
            });
        }
    }

    if($(window).width() > 768){
        $('#slider .slider').bxSlider({
            pagerCustom: '.pager',
            nextSelector: '.arrow.next',
            prevSelector: '.arrow.prev',
            nextText: '',
            prevText: ''
        });
    }

    $(".rangeSlider.total").ionRangeSlider({
        type: "single",
        min: 1,
        max: 50000,
        hide_min_max: true,
        hide_from_to: true,
        grid: false,
        onChange: function (data) {
            $(".rangeSlider.total").siblings(".total").find(".field").val(data.from);
        }
    });

    $(".rangeSlider.long").ionRangeSlider({
        type: "single",
        min: 1,
        max: 50,
        hide_min_max: true,
        hide_from_to: true,
        grid: false,
        onChange: function (data) {
            $(".rangeSlider.long").siblings(".total").find(".field").val(data.from);
        }
    });

    $(".menu_show").on("click", function(){
        $("#mobile_body").toggleClass("open");
        $("#mobile_nav").toggleClass("open");
    });

    $(".filters").on("click", ".button", function(){
        var filter_type = $(this).attr("data-filter");
        $("[data-fil='" + filter_type + "']").slideToggle();
        $(this).toggleClass("open");
    });

    $(".checkbox").on("click", function(){
       $(this).toggleClass("check");
    });

    $(".see").on("click", function(e){
        e.preventDefault();
        var el = $(this),
            view = el.siblings(".view");
        $(".view:visible").hide();

        if($(window).width() > 650){
            if((el.offset().left + view.width()) > $(window).width()){
                if(el.offset().left < view.width()){
                    view.addClass("center");
                } else{
                    view.addClass("right");
                }
            } else{
                view.addClass("left");
            }
        } else{
            view.addClass("open");
        }


        view.show();
    });

    $(".view .close").on("click", function(){
       $(this).parent().hide();
    });

    $(".basket_content .button.order").on("click", function(){
        $(".anketa").slideDown();
        $(this).addClass("disabled");
    });
    $('a[href^="#"]').on("click",function(e){
        console.log("123");
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

    $("#lombard").find(".info_block .button").on("click", function(){
        var $button = $(this),
            $info_block = $button.parent(),
            $active_info_block = $info_block.siblings(".active");

        if($info_block.hasClass("active")){
            $info_block.find(".text").slideUp(500, function(){
                $info_block.removeClass("active");
            });
        } else{
            if($active_info_block.length == 0){
                $info_block.find(".text").slideDown(500, function(){
                    $info_block.addClass("active");
                });
            } else{
                $active_info_block.find(".text").slideUp(500, function() {
                    $active_info_block.removeClass("active");
                    $info_block.find(".text").slideDown(500, function(){
                        $info_block.addClass("active");
                    });
                });
            }
        }
    });

    $(".select_block").each(function(){
        $(this).cusSelect();
    });


    if($('#masonry').length != 0 && $(window).width() > 600){
        $('#masonry').masonry({
            //columnWidth: ".review_width",
            columnWidth: 3,
            itemSelector: '.review'
        });
    }
    if($('#masonry-news').length != 0 && $(window).width() > 600){
        $('#masonry-news').find("img").on("load", function(){
            $('#masonry-news').masonry({
                columnWidth: 2,
                isAnimated: true,
                itemSelector: '.item'
            });
        });
    }

    $(".open_form").on("click", function(){
        var $button = $(this);

        $button.siblings(".info").slideUp();
        $button.hide();
        $button.siblings(".form").slideDown();
    });

    $("#school").find(".close").on("click", function(){
        var $parent = $(this).parent();
        $parent.slideUp();
        $parent.siblings(".info").slideDown();
        $parent.siblings(".button").show();
    });

    $(".radio").on("click", function(){
        var $this = $(this);
        $this.parents(".right").find(".check").removeClass("check");
        $this.parents(".right").find("input[type='radio']:checked").prop("checked", false);
        $this.addClass("check");
        $this.prev().prop("checked", true);
    });

});