function Page(){
    var self = this;

    self.gradShow = function(cb){
        $(".grad_top, .grad_bottom").addClass("vis");

        if(typeof cb === 'function'){
            setTimeout(function(){
                cb();
            }, 500);
        }
    };

    self.showBlocks = function(cb){
        $("header, footer").addClass("vis");
        setTimeout(function(){
            $("#logo").addClass("vis");
            if(typeof cb === 'function'){
                cb();
            }
        }, 100);
    };

    self.winResize = function(){
        var content = $(".content");
        content.find(".button.event").css("right", $(".circle.events").offset().left - 20);
        content.find(".button.gallery").css("left", $(".content_bg.gallery").find("img").offset().left - 170);
    };
}

function Index(){
    var self = this;

    self.imgload = function(){
        var fon_circle = $(".fon_circle"),
            fon_arctic = $(".fon_arctic"),
            arctic_load = self.loadImage(fon_arctic),
            circle_load = self.loadImage(fon_circle);

        arctic_load.done(function(){
            circle_load.done(function(){
                self.onload("full");
            }).fail(function(){
                self.onload("no-image");
            });
        }).fail(function(){
            self.onload("no-image");
        });
    };

    self.loadImage = function(img) {
        var def = $.Deferred();
        img.on("load error",function(e){
            if (e.type === "error") {
                def.reject(img.attr("src"));
            }
            else {
                def.resolve(img.attr("src"));
            }
        });
        return def.promise();
    };

    self.onload = function(type){
        if($(window).width() > 1000){
            switch(type){
                case "full":
                    var content_bg = $(".content_bg.events"),
                        circle = $(".circle"),
                        content = $(".content"),
                        butEvent = content.find(".button.event");

                    self.showCircles(content_bg, circle, function(){
                        self.gradShow(function(){
                            self.showBlocks(function(){
                                self.toggleButtons(butEvent, 'events');
                            });
                        });
                    });
                    break;
                case "no-image":
                    break;
            }
        }
    };

    self.showCircles = function(content_bg, circle, cb){
        content_bg.fadeIn(100, function(){
            circle.fadeIn(500, function(){
                content_bg.addClass("vis");
                setTimeout(function(){
                    cb()
                }, 500);
            });
        });
    };

    self.mouseOver = function(type){
        var random = Math.random(),
            content_img = $(".content_bg").find("img"),
            circle_img = $(".circle.events").find("img");

        if(type){
            content_img.transition({
                scale: 1 - random/50
            }, 500, "linear");
            circle_img.transition({
                scale: 1 + random/50
            }, 500, "linear");
        } else{
            content_img.clearQueue();
            circle_img.clearQueue();
        }
    };

    self.changeSlide = function(){
        var button = $(this),
            circleEvents = $(".circle.events"),
            content_bg = $(".content_bg.events"),
            content_bg_gal = $(".content_bg.gallery"),
            contEvents = $(".content").find(".events"),
            but = button.siblings(".button");

        clearInterval(document.butInterval);

        if(button.hasClass("event")){

            self.mouseOver(false);

            $("body").unbind("mousemove");

            contEvents.find(".dates, .info").removeClass("vis");

            setTimeout(function(){
                button.clearQueue().fadeOut(500, function(){
                    circleEvents.transition({
                        scale: 1.9
                    }, 1000, 'linear');
                    content_bg.find("img").transition({
                        scale: 1.3
                    }, 1000, 'linear');
                    content_bg_gal.show().transition({
                        scale: 1
                    }, 1000, 'linear');

                    setTimeout(function(){
                        contEvents.hide();
                        content_bg_gal.addClass("vis");
                        self.toggleButtons(but, 'gallery');
                    }, 1500);
                });
            }, 300);
        } else{
            button.clearQueue().fadeOut(500, function(){
                self.showGalleries(false, true);

                setTimeout(function(){
                    content_bg_gal.transition({
                        scale: 0.4
                    }, 1000, 'linear').hide();
                    circleEvents.transition({
                        scale: 1
                    }, 1000, 'linear');
                    content_bg.find("img").transition({
                        scale: 1
                    }, 1000, 'linear');

                    content_bg_gal.removeClass("vis");
                    $(".gallery_block").removeClass("vis");
                    contEvents.show();

                    setTimeout(function(){
                        contEvents.find(".dates, .info").addClass("vis");
                        self.toggleButtons(but, 'events');
                    }, 2000);
                }, 1500);
            });
        }
    };

    self.toggleButtons = function(button, type){
        var circle = $(".circle"),
            content = $(".content"),
            galBlock = content.find(".gallery_block");

        if(type == 'events'){
            button.css("right", circle.offset().left - 20);

            button.fadeIn(500, function(){
                content.find(".events").find(".dates, .info").addClass("vis");
                clearInterval(document.butInterval);
                document.butInterval = setInterval(function(){
                    var top = Math.random() * 15,
                        right = Math.random() * 15;
                    button.transition({
                        x: top,
                        y: right,
                        rotate: '-90deg'
                    }, 1000, "linear");
                }, 1);
                $("body").on("mousemove", function(){
                    self.mouseOver(true);
                });
            });
        }
        if(type == 'gallery'){
            button.css("left", $(".content_bg.gallery").find("img").offset().left - 170);

            galBlock.css("top", ($(window).height() - galBlock.height())/2 + 40).addClass("vis");
            self.showGalleries(true, false);
            button.fadeIn();
            clearInterval(document.butInterval);
            document.butInterval = setInterval(function(){
                var top = Math.random() * 15,
                    right = Math.random() * 15;
                button.transition({
                    x: top,
                    y: right,
                    rotate: '-90deg'
                }, 1000, "linear");
            },1);
        }
    };

    self.showGalleries = function(show, hide){
        var galBlock = $(".gallery_block"),
            places = galBlock.find(".place");

        if(show && !hide){
            places.addClass("vis");

            setTimeout(function(){
                var a = function(){
                    return places.find(".square").fadeIn("fast");
                };

                $.when(a()).done(function(){
                    places.find(".square").addClass("vis");
                    setTimeout(function(){
                        places.find(".after").addClass("vis");
                        setTimeout(function(){
                            places.find(".name").addClass("vis");
                        }, 500);
                    }, 500);
                });
            }, 500);

        } else if(!show && hide){
            places.find(".name").removeClass("vis");

            setTimeout(function(){
                places.find(".after").removeClass("vis");
                setTimeout(function(){
                    places.find(".square").removeClass("vis");
                    setTimeout(function(){
                        places.find(".square").hide();
                        places.removeClass("vis");
                    }, 600);
                }, 400);
            }, 400);
        }
    }
}

var page = new Page();
Index.prototype = page;
var index = new Index();

