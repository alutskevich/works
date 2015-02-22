/*
* Version 0.1
* by Andrew Lutskevich
*
* Markup example:
*
* <select name="cuisine_type" class="select none">
    <option value="Type1">Type1</option>
    <option value="Type2">Type2</option>
    <option value="Type3">Type3</option>
    <option value="Type4">Type4</option>
 </select>
 <div class="select_block">
    <p class="value">Cuisine Type</p>
    <ul class="list">
        <li class="item">Type1</li>
        <li class="item">Type2</li>
        <li class="item">Type3</li>
        <li class="item">Type4</li>
    </ul>
 </div>
* */
$.fn.extend({
    cusSelect: function(){
        var element = this,
            $list_options = element.find(".list"),
            $value_field = element.find(".value"),
            $form_select = element.siblings("select");

        element.on("click", function(){
            element.toggleClass("open");
            $list_options.slideToggle();
        });

        $list_options.find(".item").on("click", function(){
            var item = $(this),
                value = item.text();
            item.siblings(".active").removeClass("active").end().addClass("active");
            $value_field.text(value);
            $form_select.find("option:selected").prop("selected", false);
            $form_select.find("option[value='" + value + "']").prop("selected", true);
        });

        $("body").on("click", function(e){
            var el = $(e.target);

            if(!el.is("a") && (el.hasClass("value") || el.is(element) || el.hasClass("list") || el.hasClass("item"))){
                return false;
            } else{
                element.removeClass("open");
                $list_options.slideUp();
            }
        });
    }
});