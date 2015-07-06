var App = function(){
    var self = this,
        userAgent = window.navigator.userAgent;

    self.winPos = document.winPos = $(window).scrollTop();

    self.overlay = $("#overlay");

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

    self.winScroll = function(e){
        var $header = $("header"),
            $index_block = $(".index-block"),
            scrollTo = $index_block.height(),
            winPos = $(window).scrollTop();
        if(!document.scroll){
            if(self.winPos == 0 && document.winPos <= winPos && self.overlay.is(":hidden")){
                document.scroll = true;
                $header.hide(500, function(){
                    $(this).addClass("fixed");
                });
                self.scroll(scrollTo, function(){
                    document.scroll = false;
                    $header.show();
                });

            } else if(winPos == 0 && self.overlay.is(":hidden")){
                if($header.hasClass("fixed")){
                    $header.removeClass("fixed");

                    self.scroll(0, function(){
                        document.scroll = false;
                        //$header.show();
                    });
                }
            }

            document.winPos = winPos;
            self.winPos = winPos;
        }
    };

    self.scroll = function(scrollTo, cb){
        if (document.is_firefox || document.is_explorer) {
            $("html").animate({scrollTop: scrollTo}, 1100, cb);
        } else {
            $("body").animate({scrollTop: scrollTo}, 1100, cb);
        }
    };

    self.openPopup = function(popup){
        var $popup = $("#popup"),
            $body = $("body"),
            height = $body.height() > $(window).height() ? $body.height() : $(window).height(),
            left = ($body.width() - $popup.width())/2;

        if($popup.is(":visible")){
            $popup.find(".popup-block").fadeOut();
        }
        if(self.overlay.is(":hidden")){
            self.overlay.height(height).fadeIn();
        }
        $popup.css("left", left);
        $popup.find("." + popup).fadeIn();
        $popup.fadeIn();
    };

    self.closePopup = function(){
        var $popup = $("#popup");

        $popup.find(".popup-block").fadeOut();
        $popup.fadeOut();
        self.overlay.fadeOut();
        $("#navigation").css("right", "-410px");
    };

    self.checkBox = function(elem){
        var prev = elem.prev();

        if(prev.attr("type") == 'checkbox'){
            prev.prop("checked", !prev.prop("checked"));
        }
    };

    self.toggleNav = function(){
        var slide = $("#navigation"),
            right = parseInt(slide.css("right")) == 0 ? "-410px" : 0;

        slide.css("right", right);
        self.overlay.fadeToggle();
    };

    self.toggleTrans = function(elem){
          elem.prev().prop("checked", !elem.prev().prop("checked"));
    };

    self.dragEnter = function(elem){
        elem.find(".download-image").addClass("active");
    };

    self.dragDrop = function(image, elem){
        var width = 0;

        elem.find(".preload").hide(500, function(){
            elem.find(".load").show(500, function(){
                var interval = setInterval(function(){
                    if(width <= 100){
                        elem.find(".load-bar").width(width + "%");
                        elem.find(".procent").text(width + "%");
                        width++;
                    } else{
                        clearInterval(interval);
                        var reader = new FileReader();
                        reader.onload = function(){
                            var dataURL = reader.result;
                            elem.find(".load").hide(500, function(){
                                elem.attr("style", "background-image: url('" + dataURL + "')");
                                elem.find(".wrapper").hide();
                            });
                        };
                        reader.readAsDataURL(image[0]);
                    }
                }, 50);
            });
        });
    };

    self.tabToogle = function(tab){
        var $active_tab = tab.siblings(".active"),
            $active_block = $("." + $active_tab.data("tab"));
        $active_tab.removeClass("active");
        $active_block.hide();
        $("." + tab.data("tab")).show();
        tab.addClass("active");
    }
};
