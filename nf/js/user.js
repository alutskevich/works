$(document).ready(function(){
    var profileDay = $(".day"),
        labelNumber = $("#label .header .num .number");

    $(".user .me").on("click", function(){
        $(".user .menu").toggle();
    });

    $("#rightButton").on("click", function(){
        $("#rightButtonHide").css("top",$(this).offset().top).toggle();
        $("aside").toggle();
    });
    $("body").on("click", "#rightButtonHide", function(){
        $("aside").toggle();
        $(this).hide();
    });

    $(".changeBut").on("click", function(){
        $(this).siblings(".file").click();
    });
    $(".file").on("change", function(){
        var input = $(this),
            reader = new FileReader();
        reader.onload = function(event) {
            var contents = event.target.result;
            input.siblings(".image").find("img").attr("src", contents);
        };

        reader.onerror = function(event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
        reader.readAsDataURL(this.files[0]);
    });

    $(".radioBut").on("click", function(){
        var radioBut = $(this),
            radioGroup = radioBut.parents(".radioGroup");
        radioGroup.find("input[type='checkbox']").removeAttr("checked");
        radioGroup.find(".radioBut.check").removeClass("check");
        radioBut.siblings("input[name='" + radioBut.data("attr") +"']").attr("checked", "checked");
        radioBut.addClass("check");
    });

    $(".checkBut").on("click", function(){
        $(this).toggleClass("on");
    });

    profileDay.on("click", ".off", function(){
        var parent = $(this).parent();
        parent.addClass("off");
        parent.find("select").attr("disabled", "disabled");
    });

    profileDay.on("click", ".h24", function(){
        var h24 = $(this),
            checkbox = $(this).siblings("input[name='" + $(this).data("attr") + "']");
        h24.toggleClass("active");

        checkbox.attr("checked") ? checkbox.removeAttr("checked") : checkbox.attr("checked", "checked");
    });

    $(".fileDiv .openFile").on("click", function(){
        $(this).parent().siblings("input[type='file']").click();
    });
    $(".form").on("click", ".del", function(){
        $(this).parent().remove();
    });
    $(".select").on("click", function(){
        $(this).find(".options").toggle();
    });
    $(".select .options").on("click", ".option", function(){
        var text = $(this).text(),
            markup = '<li class="chooseCat"><span class="' + text + ' icon"></span><div class="del"></div></li>';
        $(this).parent().siblings(".value").text(text);
        $(".category .categories").append(markup);
    });

    $(".calculate .button").on("click", function(){
        $(this).parent().siblings("#label").show();
        $("#rightButton").click();
    });

    $(".form .item .value .categories .item").on("click", function(){
        $(this).toggleClass("active");
    });

    $(".body .about .buttons .item").on("click", function(){
        var but = $(this),
            parent = but.parent();
        if(!but.hasClass("active")) {
            if (but.hasClass("good")) {
                parent.siblings(".bad").hide();
                parent.siblings(".good").show();
            } else {
                parent.siblings(".good").hide();
                parent.siblings(".bad").show();
            }
            but.siblings(".active").removeClass("active");
            but.addClass("active");
        }
    });

    $(".faq .questions .list .item").on("click", function(){
        var item = $(this),
            index = item.index();
        if(!item.hasClass("active")){
            $(".faq .answers .answer.active").removeClass("active");
            $(".faq .answers .answer").eq(index).addClass("active");
            item.siblings(".active").removeClass("active");
            item.addClass("active");
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

    $(".certif").on("click", function(){
        $(this).toggleClass("active");
    });

    $(".value .block .add").on("click", function(){
        $(".hideBlock.lines").show();
    });

    $(".checkbox").on("click", function(){
        $(this).toggleClass("checked");
        $(this).parent().toggleClass("disabled");
    });

    $(".count .num .after").on("click", function(){
        var numberBlock = $(this).siblings(".n"),
            count = parseInt(numberBlock.html());
        if(count <= 8) {
            numberBlock.html(parseInt(count + 1));
        }
    });
    $(".count .num .before").on("click", function(){
        var numberBlock = $(this).siblings(".n"),
            count = parseInt(numberBlock.html());
        if(count >= 2) {
            numberBlock.html(parseInt(count - 1));
        }
    });
});
