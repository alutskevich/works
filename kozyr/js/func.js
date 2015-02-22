var Page = function(){
    var self = this,
        kozyrsBlock = $("#kozyrs"),
        clientsBlock = $("#clients"),
        channelBlock = $("#channels"),
        contactsBlock = $("#contacts"),
        triangleWidth = $(window).width() < 1024 ? "48%" : "49%";

    self.pageLoad = function(){
        if(!document.videoPlay){
            self.setHeaderHeight(function(){
                $("body").removeClass("overflow");
                if(!document.is_safari){
                    $("#preloader").fadeOut("slow", function(){
                        $("header .logo").addClass("visible");
                        $(".head_desc").css("opacity", 1);
                        $(".main-section .triangle").width(triangleWidth);
                        kozyrsBlock.height(kozyrsBlock.find(".image.tv").height());
                        if($(window).scrollTop() == 0){
                            kozyrsBlock.find(".image.tv").css("opacity", 0);
                        }
                        kozyrsBlock.find(".image").addClass("abs");
                        self.winScroll();
                    });
                } else{
                    $(".main-section .triangle").width(triangleWidth);
                    $("#preloader").fadeOut("slow", function(){
                        self.winScroll();
                        kozyrsBlock.find(".image.tv").css("opacity", 0);
                        kozyrsBlock.height(kozyrsBlock.find(".image.tv").height());
                        kozyrsBlock.find(".image").addClass("abs");
                        $(".head_desc").css("opacity", 1);
                    });
                    $("header .logo").addClass("visible");
                }
                self.navOffset = $("nav").offset().top;

                document.videoPlay = true;
                self.setChannelBlock();
            });
        }
    };
    self.mobilePageLoad = function(){
        $("body").addClass("mobile").removeClass("overflow").removeClass("minipk");
        $("#preloader").fadeOut("slow", function() {
            $("header .logo").addClass("visible");
            $(".head_desc").css("opacity", 1);
            kozyrsBlock.height(kozyrsBlock.find(".image.tv").height());
            if ($(window).scrollTop() == 0) {
                kozyrsBlock.find(".image.tv").css("opacity", 0);
            }
            kozyrsBlock.find(".image").addClass("abs");
            self.navOffset = $("nav").offset().top;
            self.winScroll();
            self.setChannelBlock();

            //TODO must be optimize
            kozyrsBlock.find(".name").css("opacity", 1);
            kozyrsBlock.find(".image.tv").css("opacity", 1);
            kozyrsBlock.find(".nav .item").each(function(){
                $(this).css({"margin-top": 0, opacity: 1});
            });
            kozyrsBlock.find(".gradient").css("opacity", 1);
            kozyrsBlock.find(".header .text").addClass("visible");
            channelBlock.find(".mainName").addClass("visible");
            channelBlock.find(".item img").addClass("visible");
            clientsBlock.find(".name").addClass("visible");
            clientsBlock.find(".client img").addClass("visible");
            contactsBlock.find(".head .address").addClass("visible");
        });
    };
    self.setHeaderHeight = function(cb){
        if($(window).height() > 650) {
            var mainSectionHeight = $(".main-section").innerHeight(),
                navHeight = $(window).width() > 460 ? $("nav").innerHeight() : $("nav").height(),
                winHeight = $(window).height(),
                headHeight = winHeight - navHeight - mainSectionHeight + 1;
            $("header").height(headHeight);
            self.setLogo(headHeight, cb);
        } else{
            self.setLogo($("header").height(), cb);
            if(cb){
                cb();
            }
        }

    };
    self.setLogo = function(headHeight, cb){
        var header = $("header");
        if(document.is_safari){
            if(document.is_Apple){
                $("#about").find(".logo").css("top", (headHeight - $("#about").find(".logo").height())/2);
                if(cb) {
                    cb();
                }
            } else{
                $("#about").find(".logo").on("load", function(){
                    $("#about").find(".logo").css("top", (headHeight - $("#about").find(".logo").height())/2);
                    if(cb) {
                        cb();
                    }
                });
            }
        } else{
            var logo = header.find(".logo"),
                logoHeight = logo.height();
            logo.css("top", (headHeight - logoHeight)/2);
            if(cb) {
                cb();
            }
        }
    };
    self.winScroll = function(){
        var win = $(window),
            arenda = $("nav"),
            scrollTop = win.scrollTop();

        if(scrollTop == 0 && win.width() > 460){
            arenda.find(".url").first().addClass("active");
        }

        if (scrollTop > self.navOffset) {
            arenda.addClass("fix");
            //if (win.width() < 460){
            //kozyrsBlock.css("margin-top", 296);
            //}else{
            kozyrsBlock.css("margin-top", arenda.height());
            //}
        } else {
            arenda.removeClass("fix");
            kozyrsBlock.css("margin-top", 0);
        }

        if(!document.navScroll && win.width() > 460) {
            if (scrollTop <= self.navOffset && kozyrsBlock.offset().top - scrollTop > 350 || scrollTop == 0) {
                arenda.find(".url.active").removeClass("active");
                arenda.find(".url").first().addClass("active");
            } else if (kozyrsBlock.offset().top - scrollTop < 350 && scrollTop < kozyrsBlock.offset().top) {
                arenda.find(".url.active").removeClass("active");
                arenda.find(".url").eq(1).addClass("active");
            } else if (channelBlock.offset().top - scrollTop < 350 && scrollTop < channelBlock.offset().top) {
                arenda.find(".url.active").removeClass("active");
                arenda.find(".url").eq(2).addClass("active");
            } else if (clientsBlock.offset().top - scrollTop < 350 && scrollTop < clientsBlock.offset().top) {
                arenda.find(".url.active").removeClass("active");
                arenda.find(".url").eq(3).addClass("active");
            } else if (contactsBlock.offset().top - scrollTop < 350) {
                arenda.find(".url.active").removeClass("active");
                arenda.find(".url").eq(4).addClass("active");
            }

            //TODO must be optimize
            if((kozyrsBlock.find(".name").offset().top - win.scrollTop()) < win.height()){
                kozyrsBlock.find(".name").css("opacity", 1);
            }
            if((kozyrsBlock.find(".image.tv").offset().top - win.scrollTop()) < win.height()){
                kozyrsBlock.find(".image.tv").css("opacity", 1);
            }
            self.animateBlock(kozyrsBlock.find(".nav .item"), function(){
                kozyrsBlock.find(".nav .item").each(function(){
                    $(this).css({"margin-top": 0, opacity: 1});
                });
            });
            self.animateBlock(kozyrsBlock.find(".gradient"), function(){
                kozyrsBlock.find(".gradient").css("opacity", 1);
            });
            self.animateBlock(kozyrsBlock.find(".header .text"), function(){
                kozyrsBlock.find(".header .text").addClass("visible");
            });
            self.animateBlock(channelBlock.find(".mainName"), function(){
                channelBlock.find(".mainName").addClass("visible");
            });
            if((channelBlock.find(".item img").offset().top - win.scrollTop()) < win.height()*0.8){
                channelBlock.find(".item img").addClass("visible");
            }
            self.animateBlock(clientsBlock.find(".name"), function(){
                clientsBlock.find(".name").addClass("visible");
            });
            if((clientsBlock.find(".client img").offset().top - win.scrollTop()) < win.height()*0.8){
                clientsBlock.find(".client img").addClass("visible");
            }
            self.animateBlock(contactsBlock.find(".head .address"), function(){
                contactsBlock.find(".head .address").addClass("visible");
            });

        }
    };
    self.winResize = function(){
        var body = $("body");
        if($(window).width() > 460){
            $("nav").find(".urls").show();
        } else{
            $("nav").find(".urls").hide();
        }
        if($(window).width() >= 640){
            self.setHeaderHeight();
            body.removeClass("mobile");
            if($(window).width() <= 1024){
                body.addClass("minipk");
            } else{
                body.removeClass("minipk");
            }
            $(".main-section .triangle").width($(window).width() < 1024 ? "48%" : "49%")
        } else{
            body.addClass("mobile");
            body.removeClass("minipk");
        }
        self.setChannelArrow();
        self.setChannelBlock();
        self.checkChannelBlock();
        if(parseInt(clientsBlock.find(".list").css("max-height")) > 85){
            clientsBlock.find(".list").css("max-height", 85);
            clientsBlock.find(".but.hide").toggleClass("none");
            clientsBlock.find(".but.show").toggleClass("none");
            clientsBlock.find(".more").toggleClass("none");
        }
        self.navOffset = +$("header").innerHeight() + $(".main-section").innerHeight();
        kozyrsBlock.height(kozyrsBlock.find(".image.show").height());

        if($(window).height() <= 650) {
            $("header").height(260);
            self.setLogo(260);
        }
        if($(window).width() >= 870){
            $("#kozyrs .arrow").removeAttr("style");
        }

        //self.checkChannelBlock();

        //alert("123");
    };
    self.navScroll = function(elem, e){
        e.preventDefault();
        var elementClick = elem.attr("href"),
            nav = $("nav"),
            navHeight =  nav.height(),
            winPos = $(window).scrollTop(),
            destination = $(elementClick).offset().top,
            scrollTo = 0;

        if($(window).width() < 460) {
            $("nav").find(".urls").slideUp();
            if(parseInt(clientsBlock.find(".list").css("max-height")) == 2500){
                clientsBlock.find(".list").css("max-height", 85);
                clientsBlock.find(".but.hide").toggleClass("none");
                clientsBlock.find(".but.show").toggleClass("none");
                clientsBlock.find(".more").toggleClass("none");
            }
        }

        elem.siblings(".active").removeClass("active");

        document.navScroll = true;

        if(destination != 0) {
            scrollTo = destination - navHeight;
        }
        if(elementClick == "#contacts" || elementClick == "#channels"){
            scrollTo += 2;
            if($(window).width() < 460 && elementClick == "#contacts" && parseInt(clientsBlock.find(".list").css("max-height")) == 2500){
                channelBlock.find(".close").click();
                scrollTo = 1554;
            }
        }

        if($(window).width() < 460){
            if(elementClick == "#about"){
                scrollTo = 253;
            }
         /*if(winPos != 0 && elementClick == "#channels"){
                scrollTo = 735;
            }
            if(winPos != 0 && elementClick == "#kozyrs"){
                scrollTo = 503;
            }
            if(winPos != 0 && elementClick == "#clients"){
                scrollTo = 1172;
            }
            if(winPos != 0 && elementClick == "#contacts"){
                scrollTo = 1506;
            }

            //if(document.is_Apple){
                scrollTo = +scrollTo + 3;
            //}*/
        }

        elem.addClass("active");

        if(document.is_firefox || document.is_explorer){
            $("html").animate( { scrollTop: scrollTo }, 1100 ,function(){
                document.navScroll = false;
            });
        } else{
            $("body").animate( { scrollTop: scrollTo }, 1100 ,function(){
                if(document.is_Apple){
                    nav.removeClass("fix");
                }
                document.navScroll = false;
            });
        }
    };
    self.setChannelArrow = function(){
        if(channelBlock.hasClass("open")) {
            var activeItem = channelBlock.find(".item.active");
            setTimeout(function(){
                channelBlock.find(".arrow").css("left", activeItem.offset().left + (activeItem.width() - 60) / 2);
            }, 500);
        }
    };
    self.animateBlock = function(block, action){
        var win = $(window);
        if((block.offset().top - win.scrollTop()) < win.height()){
            action();
        }
    };
    self.setChannelBlock = function(){
        if($(window).width() <= 900 && $(window).width() > 640){
            //TODO bad code
            if(channelBlock.find(".list").find(".textLi").find(".chanel_content").length == 0){
                var chan1 = channelBlock.find(".text").find(".chanel_content").eq(0).clone(),
                    chan2 = channelBlock.find(".text").find(".chanel_content").eq(1).clone(),
                    chan3 = channelBlock.find(".text").find(".chanel_content").eq(2).clone();

                channelBlock.find(".list").find(".textLi").append([chan1, chan2, chan3]);
            }
        } else if($(window).width() <= 640){
            //TODO bad code
            if(channelBlock.find(".list").find(".mobileTextLi").find(".chanel_content").length == 0){
                var chan1 = channelBlock.find(".text").find(".chanel_content").eq(0).clone(),
                    chan2 = channelBlock.find(".text").find(".chanel_content").eq(1).clone(),
                    chan3 = channelBlock.find(".text").find(".chanel_content").eq(2).clone(),
                    chan4 = channelBlock.find(".text").find(".chanel_content").eq(3).clone(),
                    chan5 = channelBlock.find(".text").find(".chanel_content").eq(4).clone(),
                    chan6 = channelBlock.find(".text").find(".chanel_content").eq(5).clone();
                channelBlock.find(".list").find(".mobileTextLi").eq(0).append([chan1, chan2]);
                channelBlock.find(".list").find(".mobileTextLi").eq(1).append([chan3, chan4]);
                channelBlock.find(".list").find(".mobileTextLi").eq(2).append([chan5, chan6]);
            }
        }
    };
    self.checkChannelBlock = function(){
        var activeItem = channelBlock.find(".list").find(".item.active");
        if(activeItem.length == 1 && $(".chanel_content:visible").length == 1){
            var activeContent = channelBlock.find(".chanel_content:visible"),
                arrow = channelBlock.find(".arrow"),
                typeInfo = activeItem.attr("data-channel"),
                chanelContent,
                winWidth = $(window).width();

            if(winWidth < 900){
                if(winWidth <= 640){
                    chanelContent = activeItem.find(".chanel_content." + typeInfo);
                    if(activeItem.index() < 3){
                        chanelContent = channelBlock.find(".list .mobileTextLi").eq(0).find(".chanel_content." + typeInfo);
                        arrow.removeClass("twoLine");
                        arrow.removeClass("threeLine");
                        arrow.addClass("oneLine");
                    } else if(activeItem.index() < 6){
                        arrow.removeClass("oneLine");
                        arrow.removeClass("threeLine");
                        chanelContent = channelBlock.find(".list .mobileTextLi").eq(1).find(".chanel_content." + typeInfo);
                        arrow.addClass("twoLine");
                    } else{
                        arrow.removeClass("twoLine");
                        arrow.removeClass("oneLine");
                        chanelContent = channelBlock.find(".list .mobileTextLi").eq(2).find(".chanel_content." + typeInfo);
                        arrow.addClass("threeLine");
                    }
                } else{
                    if(activeItem.index() < 4){
                        chanelContent = channelBlock.find(".list .textLi .chanel_content." + typeInfo);
                        arrow.addClass("three");
                    } else{
                        chanelContent = channelBlock.find(".text .chanel_content." + typeInfo);
                        arrow.removeClass("three");
                    }
                }
            } else{
                chanelContent = channelBlock.find(".text .chanel_content." + typeInfo);
                channelBlock.find(".text").show();
            }

            if(!chanelContent.is(":visible")){
                activeContent.find(".close").click();
                activeItem.click();
            }
        }
    };
};
$(document).ready(function(){

    var page = new Page(),
        userAgent = window.navigator.userAgent,
        kozyrsBlock = $("#kozyrs"),
        clientsBlock = $("#clients"),
        channelBlock = $("#channels"),
        contactsBlock = $("#contacts"),
        map,
        body = $("body");

    document.navScroll = false;
    document.videoPlay = false;
    document.changeSlide = false;

    document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
    document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;
    document.is_Apple = false;
    document.is_Android = false;
    document.is_Android_mobile = false;

    var ua = userAgent.toLowerCase();
    var ver = userAgent.toLowerCase();

    if(ua.indexOf("android") != -1 && ua.indexOf("version") != -1 && ua.indexOf("mobile") != -1) {
        document.is_Android_mobile = true;
    }

    if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)){
        document.is_Apple = true;
    }

    if(userAgent.match(/Android/i)){
        document.is_Android = true;
    }

    if ((document.is_chrome)&&(document.is_safari)) {document.is_safari=false;}

    if(document.is_safari){
        body.addClass("safari");
    }
    if(document.is_Android){
        body.addClass("android");
    }
    if(document.is_Android_mobile){
        body.addClass("android_mobile");
    }

    if($(window).width() > 640){
        body.removeClass("mobile");
        if($(window).width() < 1024){
            body.addClass("minipk");
        } else{
            body.removeClass("minipk");
        }
        if($("#movie").is(":visible") && !document.is_safari && !document.is_Apple && !document.is_Android){
            $("#movie").bind("playing", page.pageLoad);
        } else{
            page.pageLoad();
        }
    } else{
        page.mobilePageLoad();
    }

    $(window).on("scroll", page.winScroll);
    $(window).on("resize", page.winResize);

    $('a[href^="#"]').on("click",function(e){
        page.navScroll($(this), e)
    });

    kozyrsBlock.on('swipeleft', function() {
        kozyrsBlock.find(".arrow.next").click();
    });
    kozyrsBlock.on('swiperight', function(e) {
        kozyrsBlock.find(".arrow.prev").click();
    });

    kozyrsBlock.find(".arrow").on("click", function(){
        var arrow = $(this),
            activeImage = kozyrsBlock.find(".image.show"),
            activeText = kozyrsBlock.find(".text.show");

        if(!document.changeSlide){
            if(arrow.hasClass("prev")){
                if(activeImage.prev().is("img")){
                    activeText.removeClass("show").fadeOut(300, function(){
                        activeText.prev().fadeIn(200).addClass("show");
                    });
                    activeImage.removeClass("show").fadeOut(700);
                    activeImage.prev().fadeIn(100).addClass("show");
                    document.changeSlide = false;

                    if(!activeImage.prev().prev().is("img")){
                        arrow.fadeOut();
                    }
                    if(!kozyrsBlock.find(".arrow.next").is(":visible")){
                        kozyrsBlock.find(".arrow.next").fadeIn();
                    }
                }
            }else{
                if(activeImage.next().is("img")){
                    activeText.removeClass("show").fadeOut(300, function(){
                        activeText.next().fadeIn(200).addClass("show");
                    });
                    activeImage.removeClass("show").fadeOut(500);
                    activeImage.next().fadeIn(500).addClass("show");
                    document.changeSlide = false;

                    if(!activeImage.next().next().is("img")){
                        arrow.fadeOut();
                    }

                    if(!kozyrsBlock.find(".arrow.prev").is(":visible")){
                        kozyrsBlock.find(".arrow.prev").fadeIn();
                    }
                }
            }
        }
    });

    kozyrsBlock.find(".item").on("click", function(){
        var item = $(this),
            slide = item.attr("data-slide");
        if(!item.hasClass("active") && !document.changeSlide){
            document.changeSlide = true;
            item.siblings(".active").removeClass("active");
            kozyrsBlock.attr("class", slide);
            item.addClass("active");
            kozyrsBlock.find(".image.active").removeClass("active");
            kozyrsBlock.find(".text.active").removeClass("active");
            kozyrsBlock.find(".text.show").removeClass("show").fadeOut(300, function(){
                kozyrsBlock.find(".text." + slide).fadeIn(200).addClass("show");
            });
            kozyrsBlock.find(".image." + slide).fadeIn(500);
            kozyrsBlock.find(".image.show").removeClass("show").fadeOut(500);
            kozyrsBlock.find(".image." + slide).addClass("show");
            document.changeSlide = false;
            /*kozyrsBlock.find(".image.show").removeClass("show").fadeOut(500, function(){
             kozyrsBlock.find(".image." + slide).fadeIn(200, function(){
             $(this).addClass("show");
             document.changeSlide = false;
             });
             });*/
        }
    });

    clientsBlock.find(".but").on("click", function(){
        var button = $(this),
            clientsList = clientsBlock.find(".list"),
            maxHeight = 2000;

        if($(window).width() < 460) {
            $("nav").find(".urls").slideUp();
        }

        if($(window).width() < 480){
            maxHeight = 2500;
        }

        if(button.hasClass("show")){
            clientsList.css("max-height", maxHeight);
        } else{
            clientsList.css("max-height", 85);
        }
        button.toggleClass("none");
        button.siblings(".but").toggleClass("none");
        clientsBlock.find(".more").toggleClass("none");
        setTimeout(function(){
            //$("nav").find(".url[href='#clients']").click();
           var scrollTo = clientsBlock.offset().top - $("nav").height();
            if(document.is_firefox || document.is_explorer){
                $("html").animate( { scrollTop: scrollTo }, 1100 ,function(){
                    if(document.is_Apple){
                        $("nav").removeClass("fix");
                    }
                    document.navScroll = false;
                });
            } else{
                $("body").animate( { scrollTop: scrollTo }, 1100 ,function(){
                    if(document.is_Apple){
                        $("nav").removeClass("fix");
                    }
                    document.navScroll = false;
                });
            }
        }, 0);
    });

    google.maps.event.addDomListener(window, 'load', function(){
        createMapRish();
    });

    contactsBlock.find(".head .address").on("click", function(){
        var but = $(this),
            contMarsh = contactsBlock.find(".footer .marsh"),
            contRish = contactsBlock.find(".footer .rish");
        if(!but.hasClass("active")) {
            but.siblings(".address").removeClass("active");
            but.addClass("active");
            if (but.attr("data-map") == 'rish') {
                createMapRish();
                contMarsh.fadeOut(300, function(){
                    contRish.fadeIn();
                });
            } else {
                createMapMarsh();
                contRish.fadeOut(300, function(){
                    contMarsh.fadeIn();
                });
            }
        }
    });

    channelBlock.find(".but").on("click", function(e){
        e.stopPropagation();
        var button = $(this),
            height = 0,scrollTo,
            clientsList = button.siblings(".infoText");
        if(button.hasClass("show")){
            clientsList.css("max-height", 1000);
        } else{
            clientsList.css("max-height", 120);
        }
        button.toggleClass("none");
        clientsList.find(".shadow").toggleClass("none");
        button.siblings(".but").toggleClass("none");
        button.siblings(".more").toggleClass("none");
        if(!button.hasClass("show")) {
            setTimeout(function () {
                scrollTo = button.parents(".mobileTextLi").siblings(".active").offset().top - $("nav").height();
                if (document.is_firefox || document.is_explorer) {
                    $("html").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                    });
                } else {
                    $("body").animate({scrollTop: scrollTo}, 1100, function () {
                        document.navScroll = false;
                    });
                }
            }, 0);
        }
    });

    channelBlock.find(".item").on("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        var item = $(this),
            arrow = channelBlock.find(".arrow"),
            typeInfo = item.attr("data-channel"),
            chanelContent,
            winWidth = $(window).width();

        if(winWidth < 900){
            if(winWidth <= 640){
                chanelContent = item.find(".chanel_content." + typeInfo);
                if(item.index() < 3){
                    chanelContent = channelBlock.find(".list .mobileTextLi").eq(0).find(".chanel_content." + typeInfo);
                    arrow.removeClass("twoLine");
                    arrow.removeClass("threeLine");
                    arrow.addClass("oneLine");
                } else if(item.index() < 6){
                    arrow.removeClass("oneLine");
                    arrow.removeClass("threeLine");
                    chanelContent = channelBlock.find(".list .mobileTextLi").eq(1).find(".chanel_content." + typeInfo);
                    arrow.addClass("twoLine");
                } else{
                    arrow.removeClass("twoLine");
                    arrow.removeClass("oneLine");
                    chanelContent = channelBlock.find(".list .mobileTextLi").eq(2).find(".chanel_content." + typeInfo);
                    arrow.addClass("threeLine");
                }
            } else{
                if(item.index() < 4){
                    chanelContent = channelBlock.find(".list .textLi .chanel_content." + typeInfo);
                    arrow.addClass("three");
                } else{
                    chanelContent = channelBlock.find(".text .chanel_content." + typeInfo);
                    arrow.removeClass("three");
                }
            }
        } else{
            chanelContent = channelBlock.find(".text .chanel_content." + typeInfo);
            channelBlock.find(".text").show();
        }

        $(".chanel_content:visible").slideUp();
        item.siblings(".active").removeClass("active");
        item.removeClass("active");
        if(!chanelContent.is(":visible")){
            if($(window).width() < 460) {
                $("nav").find(".urls").slideUp();
            }
            chanelContent.slideDown(500, function(){
                channelBlock.addClass("open");
                if(winWidth <= 640) {
                    setTimeout(function () {
                        var scrollTo = item.offset().top - $("nav").height() - 25;
                        if (document.is_firefox || document.is_explorer) {
                            $("html").animate({scrollTop: scrollTo}, 1100, function () {
                                document.navScroll = false;
                            });
                        } else {
                            $("body").animate({scrollTop: scrollTo}, 1100, function () {
                                document.navScroll = false;
                            });
                        }
                    }, 0);
                }
            });
            item.addClass("active");
            arrow.css("left", item.offset().left + (item.width() - 60)/2);
        } else{
            channelBlock.removeClass("open");
        }
    });
    channelBlock.on("click", ".close", function(){
        $.when(channelBlock.removeClass("open")).then(
            setTimeout(function(){
                $(".chanel_content:visible").slideUp(500);
            })
        );
    });

    $("nav .head .menuBut").on("click", function(){
        $("nav").find(".urls").slideToggle(500, function(){
            if($("nav").find(".urls").is(":visible")){
                if (document.is_firefox || document.is_explorer) {
                    $("html").animate({scrollTop: $("nav").offset().top}, 1100, function () {
                        document.navScroll = false;
                    });
                } else {
                    $("body").animate({scrollTop: $("nav").offset().top}, 1100, function () {
                        document.navScroll = false;
                    });
                }
            }
        });
    });
    $("nav .head .mini_logo").on("click", function(){
        if (document.is_firefox || document.is_explorer) {
            $("html").animate({scrollTop: 0}, 1100, function () {
                document.navScroll = false;
            });
        } else {
            $("body").animate({scrollTop: 0}, 1100, function () {
                document.navScroll = false;
            });
        }
    })
});

function createMapRish(){
    var mapRish, coorRish, markerRish;
    coorRish = new google.maps.LatLng(46.4772711,30.7400167);
    mapRish = new google.maps.Map(document.getElementById('map'),
        {
            backgroundColor: "rgba(0, 76, 106, 0.75)",
            zoom: 15,
            center: new google.maps.LatLng(46.478497, 30.739866),
            scrollwheel: false,
            zoomControl: $(window).width() < 1024 ? false : true,
            draggable: $(window).width() < 1024 ? false : true
        });
    markerRish = new google.maps.Marker({
        position: coorRish,
        map: mapRish,
        icon: "img/map.png"
    });
    markerRish.setMap(mapRish);
}

function createMapMarsh(){
    var mapMarsh, coorMarsh, markerMarsh;
    coorMarsh = new google.maps.LatLng(46.4159737,30.7112893);

    mapMarsh = new google.maps.Map(document.getElementById('map'),
        {
            backgroundColor: "rgba(0, 76, 106, 0.75)",
            zoom: 15,
            center: new google.maps.LatLng(46.417461, 30.711514),
            scrollwheel: false,
            zoomControl: $(window).width() < 1024 ? false : true,
            draggable: $(window).width() < 1024 ? false : true
        });

    markerMarsh = new google.maps.Marker({
        position: coorMarsh,
        map: mapMarsh,
        icon: "img/map.png"
    });
    markerMarsh.setMap(mapMarsh);
}