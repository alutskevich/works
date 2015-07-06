/*
 * Version 1.0
 * by Andrew Lutskevich
 *
 * */

(function($){

    var def_options = {
        hideSelect: true,
        //cssTheme: false
        selectSelector: false,
        bodyClick: true
    };

    var bodyClick = function(element, list_options){
        $("body").bind("click", function(e){
            var el = $(e.target);

            if(el.hasClass("value") || el.is(element) || el.hasClass("list") || el.hasClass("item")){
                return false;
            } else{
                element.removeClass("open");
                list_options.slideUp();
            }
        });
    };

    $.fn.cusSelect = function(options){

        var params = $.extend({}, def_options, options),
            element = this,
            $list_options = element.find(".list"),
            $value_field = element.find(".value"),
            $form_select = params.selectSelector ? $(params.selectSelector) : element.prev("select");

        $list_options.hide();

        if(params.hideSelect){
            $form_select.css("display", "none");
        }

        element.on("click", function(){
            element.toggleClass("open");
            $list_options.slideToggle();
        });

        $list_options.find(".item").on("click", function(){
            var item = $(this),
                value = item.text(),
                index = item.index();
            $value_field.text(value);
            item.siblings(".active").removeClass("active");
            item.addClass("active");
            $form_select.find("option").eq(index).prop("selected", true);
        });

        if(params.bodyClick){
            bodyClick(element, $list_options);
        }
    }
})(jQuery);