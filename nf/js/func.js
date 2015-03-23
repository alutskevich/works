$(document).ready(function(){
    var searchBlock = $(".searchBlock"),
        dropDown = {
            search: searchBlock.find(".dropdown.search")
        },
        rangeSlider = $("#rangeSlider"),
        labelBlock = $("#label"),
        body = $("body"),
        labelNumber = $("#label .header .num .number"),
        graphic = $("#graphic"),
        regPopup = $("#regPopup");

    searchBlock.find(".field").on("keyup", function(){
        dropDown.search.slideDown();
    });
    dropDown.search.find(".item").on("click", function(){
        var text = $(this).text();
        dropDown.search.siblings(".field").val(text);
        dropDown.search.slideUp();
    });

    $(".content .filters .line .choose .categories .item").on("click", function(){
        $(this).toggleClass("active");
    });

    $(".user .me").on("click", function(e){
        e.stopPropagation();
        $(".user .menu").toggle();
    });

    $(".guest").on("click", ".button", function(e){
        e.stopPropagation();
        var heightPopup = body.height() - $("header").height();
        if($(this).hasClass("signin")){
            $(".signinPopup").toggle();
            $("#overlay").toggle().height(heightPopup);
            regPopup.hide();
            $("#regOverlay").hide();
        }
        if($(this).hasClass("reg")){
            regPopup.toggle().css("left", ($(window).width() - regPopup.width())/2);
            $("#regOverlay").toggle().height(heightPopup);
            $(".signinPopup").hide();
            $("#overlay").hide();
        }
    });

    if(rangeSlider.length != 0) {
        $.when(
            rangeSlider.ionRangeSlider({
                min: 0,
                max: 1000,
                from: 100,
                to: 240,
                type: 'double',
                step: 1,
                hideMinMax: true,
                prettify: true,
                postfix: " kcal",
                hasGrid: true,
                onFinish: function (obj) {
                    var max = obj.toNumber,
                        diapason = $(".irs-diapason");
                    diapason.removeClass("green red blue orange");
                    if(max <= 250 ){
                        diapason.addClass("green");
                    } else if(max <= 500){
                        diapason.addClass("blue");
                    } else if(max <= 750){
                        diapason.addClass("orange");
                    } else{
                        diapason.addClass("red");
                    }
                }
            })
        ).then(function () {
                var gridText = $(".irs-grid-text");
                gridText.eq(0).text("0-250").addClass("green").css("left", 50);
                gridText.eq(1).text("250-500").addClass("blue").css("left", "+=70");
                gridText.eq(2).text("500-750").addClass("orange").css("left", "+=70");
                gridText.eq(3).text(">750").addClass("red").css("left", "+=70");
                gridText.eq(4).text("");
                $(".irs-grid-pol").last().hide();
            });
    }

    if(labelBlock.length != 0) {
        labelBlock.find(".range").each(function(){
            var self = $(this),
                procent = parseInt(self.siblings(".procent").html()) <= 100 ? self.siblings(".procent").html() : "100%";
            self.width(procent);
        });
    }

    body.on("click", ".select", function(e){
        e.stopPropagation();
        $(this).find(".options").toggle();
        dropDown.search.slideUp();
    });
    $("#regOverlay").on("click", function(){
        regPopup.hide();
        $(this).hide();
    });
    body.on("click", ".select .options .option", function(){
        var text = $(this).text(),
            markup = '<li class="chooseCat"><span class="' + text + ' icon"></span><div class="del"></div></li>';
        $(this).parent().siblings(".value").text(text);
        $(this).parents(".select").siblings(".bySelect").find("option").removeAttr("checked");
        $(this).parents(".select").siblings(".bySelect").find("option[value='" + text +"']").attr("checked", "checked");
    });

    $("html").on("click", function(e){
        $(".user .menu").hide();
        $(".options").hide();
        $(".signinPopup").hide();
        $("#overlay").hide();
    });

    $(".ingridients .add").on("click", function(){
        var markup = $(this).prev().html(),
            countItems = $(".ingridients .item").length;
        if(countItems < 20) {
            $(this).before("<div class='item'>" + markup + "</div>");
            if(countItems == 19){
                $(this).hide();
            }
        }
    });

    labelNumber.find(".before").on("click", function(){
        var numberBlock = labelNumber.find(".n"),
            count = parseInt(numberBlock.html());
        if(count >= 2) {
            numberBlock.html(parseInt(count - 1));
        }
    });

    labelNumber.find(".after").on("click", function(){
        var numberBlock = labelNumber.find(".n"),
            count = parseInt(numberBlock.html());
        if(count <= 8) {
            numberBlock.html(parseInt(count + 1));
        }
    });

    if(graphic.length >= 1){
        graphic.find(".graph").each(function(){
            var graph = $(this),
                bgBlock = graph.find(".bg"),
                bgHeight = bgBlock.height();
            bgBlock.height(parseInt(graph.find(".procent").html()) * bgHeight / 100);
        });
    }

    $(".checkBut").on("click", function(){
        $(this).toggleClass("on");
    });

    regPopup.on("click", ".button.next", function(){
        regPopup.find(".step.one").hide();
        regPopup.find(".step.two").show();
        $(this).hide();
        $(this).siblings(".back").css("display", "inline-block");
        $(this).siblings(".apply.conf").css("display", "inline-block");
    });
    regPopup.on("click", ".hours .value", function(e){
        e.stopPropagation();
        $(this).siblings(".hoursBlock").toggle();
    });
    regPopup.on("click", ".hoursBlock .confirm", function(){
        $(this).parent().toggle();
    });

    regPopup.find(".upload").on("click", function(){
        $(this).siblings(".file").click();
    });
    $(".file").on("change", function(){
        var input = $(this),
            reader = new FileReader();
        reader.onload = function(event) {
            var contents = event.target.result;
            input.siblings(".image").find(".empty").hide();
            input.siblings(".image").find("img").remove();
            input.siblings(".image").append("<img src='" + contents + "' alt='Image'>");
        };

        reader.onerror = function(event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
        reader.readAsDataURL(this.files[0]);
    });

    regPopup.on("click", ".button.apply", function(){
        if(regPopup.find(".step.two").is(":visible")){
            regPopup.find(".step.two").hide();
            regPopup.find(".step.three").show();
        } else if(regPopup.find(".step.three").is(":visible")) {
            regPopup.find(".step.three").hide();
            regPopup.find(".step.four").show();
        } else if(regPopup.find(".step.four").is(":visible")){
            regPopup.find(".step.four").hide();
            regPopup.find(".apply.conf").hide();
            regPopup.find(".back").hide();
            regPopup.find(".step.five").show();
            regPopup.find(".apply.signin").show();
            regPopup.find(".close").show();
        } else{
            regPopup.find(".step.five").hide();
            regPopup.find(".step.one").show();
            regPopup.find("form").trigger("reset");
            regPopup.hide();
            $("#regOverlay").hide();
        }
    });
    regPopup.on("click", ".radioBut", function(){
        var radioBut = $(this),
            radioGroup = radioBut.parents(".radioGroup");
        radioGroup.find("input[type='checkbox']").removeAttr("checked");
        radioGroup.find(".radioBut.check").removeClass("check");
        radioBut.siblings("input[name='" + radioBut.data("attr") +"']").attr("checked", "checked");
        radioBut.addClass("check");
    });

    regPopup.on("click", ".button.back", function(){
        if(regPopup.find(".step.two").is(":visible")){
            regPopup.find(".step.two").hide();
            regPopup.find(".step.one").show();
            $(this).hide();
            $(this).siblings(".next").css("display", "inline-block");
            $(this).siblings(".apply.conf").css("display", "none");
        } else if(regPopup.find(".step.three").is(":visible")) {
            regPopup.find(".step.three").hide();
            regPopup.find(".step.two").show();
        } else if(regPopup.find(".step.four").is(":visible")){
            regPopup.find(".step.four").hide();
            regPopup.find(".step.three").show();
        }
    });

    regPopup.on("click", ".close", function(){
        regPopup.find(".step.five").hide();
        regPopup.find(".step.one").show();
        regPopup.find("form").trigger("reset");
        regPopup.hide();
        $("#regOverlay").hide();
    });

    $(window).on("resize", function(){
        regPopup.css("left", ($(this).width() - regPopup.width())/2);
    });

    $(".hoursBlock").on("click", ".off", function(){
        var parent = $(this).parent();
        parent.addClass("off");
        parent.find("select").attr("disabled", "disabled");
    });

    $(".hoursBlock").on("click", ".h24", function(){
        var h24 = $(this),
            checkbox = $(this).siblings("input[name='" + $(this).data("attr") + "']");
        h24.toggleClass("active");

        checkbox.attr("checked") ? checkbox.removeAttr("checked") : checkbox.attr("checked", "checked");
    });
    $(".certif").on("click", function(){
        $(this).toggleClass("active");
    });
});