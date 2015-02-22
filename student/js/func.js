$(document).ready(function(){

    $("#overlay").height($("body").height() + 25);

    $("#overlay").on("click", function(){
        $(".popup").hide();
        $(this).hide();
    });

    $(".form_field, .form_area, label.up").on("click focus", function(){
        var el = $(this);
        if(el.hasClass("up")){
            el.hide();
            el.next(".form_field, .form_area").focus();
        } else{
            el.prev("label.up").hide();
        }
    });

    $(".form_field, .form_area").on("change blur", function(){
        if($.trim($(this).val()) == ""){
            $(this).siblings("label.up").show();
        }
    });

    $(".index .form").on("submit", function(e){
        e.preventDefault();
        var inpName = $(this).find("input[name='name']");

        if($.trim(inpName.val()) == ""){
            $(".start").fadeOut(500, function(){
                $(".error").fadeIn().removeClass("none");
            });
        } else{
            $(".start").fadeOut(500, function(){
                $(".success").fadeIn().removeClass("none");
            });
        }
    });

    $(".index .button").on("click", function(){
       if($(this).is("div")){
           $(".error").fadeOut(500, function(){
               $(".start").fadeIn();
           });
       }
    });

    $(".service .toggle").on("click", function(){
        $(this).parents(".service").find(".full_info").slideUp();
        $(this).parents(".service").removeClass("active");
    });
    $(".service h3").on("click", function(){
        if($(this).parents(".garant").length == 0 && $(this).parents(".payment").length == 0 && $(this).parents(".review").length == 0){
            $(this).parents(".service").find(".full_info").slideDown();
            $(this).parents(".service").addClass("active");
        }
    });

    $(".payment .toggle").on("click", function(){
        var but = $(this);

        if(but.hasClass("open")){
            but.siblings(".full_info").slideUp();
            but.addClass("none");
            but.siblings(".toggle").removeClass("none");
        } else{
            but.siblings(".full_info").slideDown();
            but.addClass("none");
            but.siblings(".toggle").removeClass("none");
        }
    });

    $(".checkBlock").on("click", function(){
        var block = $(this);

        block.siblings(".checkBlock").find(".radio .check.checked").removeClass("checked");
        block.siblings(".checkBlock").find("input[type='radio']").removeAttr("checked");

        block.find(".radio .check").addClass("checked");
        block.find("input[type='checkbox']").attr("checked", "checked");
    });

    $(".selectBox").on("click", function(e){
        var select = $(this),
            formSelect = select.find(".form_select"),
            dropDown = select.find(".dropDownList");

        if(formSelect.hasClass("open")){
            dropDown.slideUp();
            formSelect.removeClass("open");
        } else{
            dropDown.slideDown();
            formSelect.addClass("open");
        }
    });

    $(".dropDownList .item").on("click", function(e){
        e.stopPropagation();
        var dropDown = $(this),
            formSelect = dropDown.parents(".form_select");

        formSelect.find(".value").html(dropDown.text());
        $(".dropDownList").slideUp();
        formSelect.removeClass("open");
    });

    $(".popup .close").on("click", function(){
        $(".popup").hide();
        $("#overlay").hide();
    });

    if(!$("body").hasClass("index")){
        $(window).on("scroll", function(){
           if($(window).scrollTop() > 0){
               $("header").addClass("fix");
           } else{
                $("header").removeClass("fix");
            }
        });
    }
    $("#top .down").on("click", function(){
        $(window).scrollTop(890);
    });
});