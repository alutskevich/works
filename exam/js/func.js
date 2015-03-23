$.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);
//});

var Page = function(){
    var self = this,
        userAgent = window.navigator.userAgent;

    self.testBrowser = function(){
        document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
        document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
        document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;
        document.is_Apple = false;
        document.is_Android = false;

        if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)){document.is_Apple = true;}
        if(userAgent.match(/Android/i)){document.is_Android = true;}
        if((document.is_chrome)&&(document.is_safari)) {document.is_safari=false;}
    };
    self.slider = function(elem){
        if($(window).width() > 460){
            elem.bxSlider({
                nextSelector: '.arrow.next',
                prevSelector: '.arrow.prev',
                nextText: '',
                prevText: '',
                pager: false,
                slideWidth: 780,
                auto: true
            });
        } else{
            elem.bxSlider({
                nextSelector: '.arrow.next',
                prevSelector: '.arrow.prev',
                nextText: '',
                prevText: '',
                pager: false,
                touchEnabled: false,
                slideWidth: 780,
                auto: true
            });
        }
    };
    self.pageLoad = function(){
        var header = $("header");

        header.addClass("visible");
    };
    self.tabChoose = function(){
        var tab = $(this),
            curTab = tab.attr("data-tab"),
            tabs_content = $(".tabs_content");
        if(!tab.hasClass("active")) {
            /*tabs_content.find(".tab.active").removeClass("active").hide(500, function(){
                tabs_content.find(".tab." + curTab).show(500, function() {
                    $(this).addClass("active");
                })
            });*/
            tabs_content.css("max-height", "230px");
            tabs_content.siblings(".readMore").removeClass("hide").html("Читать далее");
            if($(window).width() > 650){
                $("#important").height(875);
            }else{
                $("#important").height(705);
            }
            setTimeout(function(){
                tabs_content.find(".tab.active").removeClass("active").hide(500);
                tabs_content.find(".tab." + curTab).show(500, function() {
                    var tab = $(this);
                    tab.addClass("active");
                    tab.addClass("action");
                    setTimeout(function(){
                        tab.removeClass("action");
                    },500);
                });
                tab.siblings(".active").removeClass("active");
                tab.addClass("active");
            }, 10);
        }
    };
    self.toggleOrderForm = function(){
        var orderForm = $(".order_form"),
            orderBlock = $("#order"),
            scrollTo = orderBlock.find(".button").offset().top - ($(window).width() > 650 ? 156 : 115);
        if(orderBlock.hasClass("vis_form")){
            orderForm.slideUp(500, function(){
                orderBlock.removeClass("vis_form");
            });
        } else{
            orderBlock.addClass("vis_form");
            orderForm.slideDown(500, function(){
                if (document.is_firefox || document.is_explorer) {
                    $("html").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                        if(document.is_Apple){
                            if($(window).width() > 650){
                                $("nav").removeClass("fix");
                            } else{
                                $(".for_mobile").removeClass("fix");
                            }
                        }
                        if($(window).width() < 460){
                            $(".for_mobile").removeClass("fix");
                        }
                    });
                } else {
                    $("body").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                        if(document.is_Apple){
                            if($(window).width() > 650){
                                $("nav").removeClass("fix");
                            } else{
                                $(".for_mobile").removeClass("fix");
                            }
                        }
                        if($(window).width() < 460){
                            $(".for_mobile").removeClass("fix");
                        }
                    });
                }
            });
        }
    };
    self.navigation = function(elem, param){
        var elementClick = elem.attr("href"),
            scrollTo = 0;

        if(!elem.hasClass("active")) {
            elem.siblings(".active").removeClass("active");

            document.navScroll = true;

                if(param == 'desktop') {

                    //$(".order_form").slideUp();

                    switch (elementClick) {
                        case '#about':
                            scrollTo = 0;
                            break;
                        case '#work':
                            scrollTo = 1090;
                            if ($(window).width() < 890) {
                                scrollTo = 1470;
                            }
                            break;
                        case '#reviews':
                            scrollTo = 1796;
                            if ($(window).width() < 890) {
                                scrollTo = 2277;
                            }
                            break;
                        case '#advantages':
                            scrollTo = 2684;
                            if ($(window).width() < 980) {
                                scrollTo = 2589;
                                if ($(window).width() < 890) {
                                    scrollTo = 2973;
                                }
                            }
                            break;
                        case '#important':
                            scrollTo = 3327;
                            if ($(window).width() < 890) {
                                scrollTo = 3720;
                            }
                            break;
                        case '#order':
                            scrollTo = 4158;
                            if ($(window).width() < 890) {
                                scrollTo = 4541;
                            }
                            break;
                        case '#payments':
                            scrollTo = 6344;
                            if ($(window).width() < 890) {
                                scrollTo = 5886;
                            }
                            break;
                    }

                    /*if (elementClick != "#about") {
                     scrollTo = $(elementClick).offset().top;
                     if (elementClick == "#work") {
                     scrollTo = scrollTo - 30;
                     }
                     if (elementClick == "#order") {
                     scrollTo = scrollTo - 60;
                     }
                     }*/
                }
            else{
                    $("nav").slideUp();
                    if (elementClick != "#about") {
                        scrollTo = $(elementClick).offset().top - 90;
                        /*if (elementClick == "#work") {
                            scrollTo = scrollTo - 30;
                        }
                        if (elementClick == "#order") {
                            scrollTo = scrollTo - 60;
                        }*/
                    }  else{
                        scrollTo = 0;
                    }
                }

                elem.addClass("active");

                if (document.is_firefox || document.is_explorer) {
                    $("html").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                        if(document.is_Apple){
                            if(param == 'desktop'){
                                $("nav").removeClass("fix");
                            } else{
                                $(".for_mobile").removeClass("fix");
                            }
                        }

                        if($(window).width() < 460){
                            $(".for_mobile").removeClass("fix");
                        }
                    });
                } else {
                    $("body").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                        if(document.is_Apple){
                            if(param == 'desktop'){
                                $("nav").removeClass("fix");
                            } else{
                                $(".for_mobile").removeClass("fix");
                            }
                        }
                        if($(window).width() < 460){
                            $(".for_mobile").removeClass("fix");
                        }
                    });
                }
            }
    };
    self.winScroll = function(){
        var winPos = $(window).scrollTop(),
            nav = $("nav"),
            fm = $(".for_mobile"),
            textBlock = $("header .text");

        if($(window).width() > 650){
            if(winPos > nav.height()){
                nav.addClass("fix");
                textBlock.addClass("fix");
            } else{
                nav.removeClass("fix");
                textBlock.removeClass("fix");
            }
        } else{
            if(winPos != 0){
                fm.addClass("fix");
                textBlock.addClass("fix");
            } else{
                fm.removeClass("fix");
                textBlock.removeClass("fix");
            }
        }

        if(!document.navScroll){
            self.setActiveBlock();
        }

        self.setBlocks();
    };
    self.setActiveBlock = function(){
        var winPos = $(window).scrollTop(),
            visWinPos = $(window).width()*0.2,
            nav = $("nav"),
            blocks = {
                work: $("#work"),
                reviews: $("#reviews"),
                advantages: $("#advantages"),
                important: $("#important"),
                order: $("#order"),
                subscribe: $("#subscribe"),
                payments: $("#payments")
            },
            urls = {
                about: nav.find(".item[href='#about']"),
                work: nav.find(".item[href='#work']"),
                reviews: nav.find(".item[href='#reviews']"),
                advantages: nav.find(".item[href='#advantages']"),
                important: nav.find(".item[href='#important']"),
                order: nav.find(".item[href='#order']"),
                //subscribe: nav.find(".item[href='#subscribe']"),
                payments: nav.find(".item[href='#payments']")
            };

        if($(window).width() > 650) {
            if (!nav.hasClass("fix")) {
                nav.find(".item.active").removeClass("active");
                urls.about.addClass("active");
            }
            if (visWinPos > blocks.work.offset().top - winPos && winPos < blocks.work.offset().top) {
                if (!urls.work.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.work.addClass("active");
                }
            }
            if (visWinPos > blocks.reviews.offset().top - winPos && winPos < blocks.reviews.offset().top) {
                if (!urls.reviews.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.reviews.addClass("active");
                }
            }
            if (visWinPos > blocks.advantages.offset().top - winPos && winPos < blocks.advantages.offset().top) {
                if (!urls.advantages.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.advantages.addClass("active");
                }
            }
            if (visWinPos > blocks.important.offset().top - winPos && winPos < blocks.important.offset().top) {
                if (!urls.important.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.important.addClass("active");
                }
            }
            if (visWinPos > blocks.order.offset().top - winPos && winPos < blocks.order.offset().top) {
                if (!urls.order.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.order.addClass("active");
                }
            }
            if (visWinPos > blocks.subscribe.offset().top - winPos && winPos < blocks.subscribe.offset().top) {
                //if(!urls.subscribe.hasClass("active")) {
                nav.find(".item.active").removeClass("active");
                //urls.subscribe.addClass("active");
                //}
            }
            if (visWinPos > blocks.payments.offset().top - winPos && winPos < blocks.payments.offset().top) {
                if (!urls.payments.hasClass("active")) {
                    nav.find(".item.active").removeClass("active");
                    urls.payments.addClass("active");
                }
            }
        }
    };
    self.setBlocks = function(){
        var win = $(window),
            winPos = win.scrollTop(),
            workBlock = $("#work"),
            reviewsBlock = $("#reviews"),
            advBlock = $("#advantages"),
            impBlock = $("#important"),
            orderBlock = $("#order"),
            subBlock = $("#subscribe"),
            payBlock = $("#payments"),
            footer = $("footer");

        if($(window).width() > 650) {
            if ((workBlock.offset().top - winPos) < win.height()) {
                workBlock.addClass("visible");
            }

            if ((workBlock.find(".steps").offset().top - winPos) < win.height()) {
                workBlock.find(".steps").find(".item").addClass("visible");
            }
            if ((reviewsBlock.find(".count").offset().top - winPos) < win.height()) {
                reviewsBlock.find(".count").find(".label").addClass("visible");
                //reviewsBlock.find(".count").find(".num").addClass("visible");
            }

            if ((advBlock.find(".list").offset().top - winPos) < win.height()) {
                advBlock.find(".list").find(".item").addClass("visible");
            }

            if ((advBlock.offset().top - winPos) < win.height()) {
                advBlock.addClass("visible");
            }

            if ((impBlock.find(".tabs_content").offset().top - winPos) < win.height()) {
                impBlock.find(".tabs_content").addClass("visible");
            }

            if ((impBlock.find(".tabs").offset().top - winPos) < win.height()) {
                impBlock.find(".tabs").addClass("visible");
            }

            if ((orderBlock.find(".vk_url").offset().top - winPos) < win.height()) {
                orderBlock.find(".vk_url").addClass("visible");
            }

            if ((orderBlock.offset().top - winPos) < win.height()) {
                orderBlock.addClass("visible");
            }

            if ((subBlock.find(".label").offset().top - winPos) < win.height()) {
                subBlock.find(".label").addClass("visible");
            }

            if ((payBlock.find(".item").offset().top - winPos) < win.height()) {
                payBlock.find(".item").addClass("visible");
            }

            if ((footer.offset().top - winPos) < win.height()) {
                footer.find(".contact").addClass("visible");
            }
        } else{
            workBlock.addClass("visible");
            workBlock.find(".steps").find(".item").addClass("visible");
            reviewsBlock.find(".count").find(".label").addClass("visible");
            advBlock.find(".list").find(".item").addClass("visible");
            advBlock.addClass("visible");
            impBlock.find(".tabs_content").addClass("visible");
            impBlock.find(".tabs").addClass("visible");
            orderBlock.find(".vk_url").addClass("visible");
            orderBlock.addClass("visible");
            subBlock.find(".label").addClass("visible");
            payBlock.find(".item").addClass("visible");
            footer.find(".contact").addClass("visible");
        }
    };
    self.sendForm = function(form){
        var data = form.serialize(),
            subText = form.find(".submit").html();

        form.find("[data-required='true']").each(function(){
            if($.trim($(this).val()) == ""){
                $(this).addClass("error");
            } else{
                $(this).removeClass("error");
            }

            if($(this).hasClass("email")){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test($(this).val())){
                    $(this).addClass("error");
                } else{
                    $(this).removeClass("error");
                }
            }
        });

        if(form.find(".error").length == 0){
            form.find(".submit").html("Узнаём...");

            $.post("send.php", data, function(res){
                console.log(res);
                if(res){
                    form.find(".submit").html("Всё<br>успешно!");
                    setTimeout(function(){
                        form.find(".submit").html(subText);
                    }, 2000);
                } else{
                    form.find(".submit").html("Произошла<br>ошибка!");
                    setTimeout(function(){
                        form.find(".submit").html(subText);
                    }, 2000);
                }
            });
        }
    };
};
$(document).ready(function() {

    var page = new Page(),
        blocks = {
            important: $("#important"),
            order: $("#order"),
            nav: $("nav")
        };
    page.testBrowser();
    page.pageLoad();

    page.slider($(".reviews"));

    blocks.important.find(".tabs .item").on("click", page.tabChoose);
    blocks.order.find(".button").on("click", page.toggleOrderForm);
    $('a[href^="#"]').on("click", function(e){
        e.preventDefault();

        var param = "desktop";
        if($(window).width() < 650) {
            param = "mobile";
        }
        page.navigation($(this), param);
    });

    $(".file_choose ").on("click", function(){
        $(this).siblings("input[type='file']").click();
    });

    $(window).on("scroll", page.winScroll);
    //$(window).on("resize", page.winResize);

    page.setActiveBlock();

    $(".order_form .submit").on("click", function(){

        var form = $(".order_form");

        form.find("[data-required='true']").each(function(){
            if($.trim($(this).val()) == ""){
                $(this).addClass("error");
            } else{
                $(this).removeClass("error");
            }

            if($(this).hasClass("email")){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test($(this).val())){
                    $(this).addClass("error");
                } else{
                    $(this).removeClass("error");
                }
            }
        });

        if(form.find(".error").length == 0){
            $(".order_form").submit();
        }
    });

    $('#time').inputmask('99:99');

    if($(window).width() > 650) {
        $("#date").datepicker();
        //$('#time').timepicker({'timeFormat': 'H:i'});
    } else{
        page.setBlocks();
        if(document.is_Apple) {
            $("#reviews .slider .review").addClass("apple");
        }
        $("#date").inputmask("date");
    }


    /*$(".order_form").on("submit", function(e){
        e.preventDefault();
        page.sendForm($(this));
    });*/

    $(".selectDiv").on("click", function(e){
        var div = $(this);

        if(div.hasClass("open")){
            //div.find(".sel_ico").addClass("open");
            div.find(".lessonsList").slideUp(500);
            div.removeClass("open");
        } else{
            //div.find(".sel_ico").removeClass("open");
            div.find(".lessonsList").slideDown();
            div.addClass("open");
        }
    });
    $(".selectDiv .lessonsList .item").on("click", function(){
        var parent = $(this).parents(".selectDiv"),
            value = $(this).text(),
            selectType = $("select[data-type-select='" + parent.attr("data-select") + "']");

        parent.find(".value").html(value);

        selectType.find("option").removeAttr("selected");

        selectType.find("option[name='" + value + "']").attr("selected", "selected");
    });

    $("body").on("click", function(e){
       var target = $(e.target),
           div = $(".selectDiv");

        if(!target.hasClass("item") && !target.hasClass("selectDiv") && !target.hasClass("value") && !target.hasClass("sel_ico")){
            if(div.hasClass("open")){
                div.find(".lessonsList").slideUp(500);
                div.removeClass("open");
            }
        }
    });

    $("input[type='file']").on("change", function(e){
        var input = e.target,
            markup = "<li class='item'>_FILENAME_</li>",
            totMarkup = "";

        for (var i = 0; i < input.files.length; ++i) {
            var name = input.files.item(i).name;
            totMarkup += markup.replace("_FILENAME_", name);
        }

        $("#order .order_form .uploadedFile .files").html(totMarkup);
        $("#order .order_form .uploadedFile").slideDown();
    });

    $(".open_menu").on("click", function(){
        $("nav").slideToggle();
    });

    $(".readMore").on("click", function(){
        var but = $(this),
            type = but.attr("data-type"),
            impBlock = $("#important"),
            lessBlock = $("#lessons");

        if(type == 'imp'){
            if(!but.hasClass("hide")){
                impBlock.height(800 + $(".tabs_content").find(".tab.active").height() - 230 - 95);
                $(".tabs_content").css("max-height", "100%");
                but.addClass("hide").html("Скрыть");
            } else{
                $(".tabs_content").css("max-height", "230px");
                but.removeClass("hide").html("Читать далее");
                setTimeout(function(){
                    impBlock.height("705px");

                    var scrollTo = impBlock.offset().top - 90;

                    if (document.is_firefox || document.is_explorer) {
                        $("html").animate({scrollTop: scrollTo}, 1100, function () {
                            document.navScroll = false;
                            if(document.is_Apple){
                                if($(window).width() > 650){
                                    $("nav").removeClass("fix");
                                } else{
                                    $(".for_mobile").removeClass("fix");
                                }
                            }

                            if($(window).width() < 460){
                                $(".for_mobile").removeClass("fix");
                            }
                        });
                    } else {
                        $("body").animate({scrollTop: scrollTo}, 1100, function () {
                            document.navScroll = false;
                            if(document.is_Apple){
                                if($(window).width() > 650){
                                    $("nav").removeClass("fix");
                                } else{
                                    $(".for_mobile").removeClass("fix");
                                }
                            }
                            if($(window).width() < 460){
                                $(".for_mobile").removeClass("fix");
                            }
                        });
                    }

                }, 500);
            }
        } else{
            if(!but.hasClass("hide")){
                lessBlock.height(800);
                lessBlock.find(".list").eq(1).fadeIn(100, function(){
                    lessBlock.find(".list").eq(2).fadeIn(100);
                });
                but.addClass("hide").html("Скрыть");
            } else{
                lessBlock.find(".list").eq(2).slideUp();
                lessBlock.find(".list").eq(1).slideUp();
                but.removeClass("hide").html("Узнать больше");
                setTimeout(function(){
                    lessBlock.height(440);

                    var scrollTo = lessBlock.offset().top - 90;

                    if (document.is_firefox || document.is_explorer) {
                        $("html").animate({scrollTop: scrollTo}, 1100, function () {
                            document.navScroll = false;
                            if(document.is_Apple){
                                if($(window).width() > 650){
                                    $("nav").removeClass("fix");
                                } else{
                                    $(".for_mobile").removeClass("fix");
                                }
                            }

                            if($(window).width() < 460){
                                $(".for_mobile").removeClass("fix");
                            }
                        });
                    } else {
                        $("body").animate({scrollTop: scrollTo}, 1100, function () {
                            document.navScroll = false;
                            if(document.is_Apple){
                                if($(window).width() > 650){
                                    $("nav").removeClass("fix");
                                } else{
                                    $(".for_mobile").removeClass("fix");
                                }
                            }
                            if($(window).width() < 460){
                                $(".for_mobile").removeClass("fix");
                            }
                        });
                    }


                }, 500);
            }
        }
    });

    $("#order .order_form .cal_ico").on("click", function(){
        $("#date").focus();
    });
    $("#order .order_form .time_ico").on("click", function(){
        $("#time").focus();
    });

    $(".lessonsList").mCustomScrollbar({
        theme:"dark-3"
    });
});