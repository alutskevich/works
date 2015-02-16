$(document).ready(function(){
    var sliderList = $(".slider"),
        width = 0,
        body = $("body"),
        filesInput = $(".fileComment .files");

    sliderList.smoothDivScroll({
        mousewheelScrolling: "horizontal",
        touchScrolling: true,
        scrollingHotSpotLeftClass: "arrow-left",
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightClass: "arrow-right",
        scrollingHotSpotRightVisibleClass: "visible"
    });

    sliderList.on("click", ".img", function(){
        var img = $(this),
            sliderPosition = $(".sliderArrow"),
            left;
        img.siblings(".active").removeClass("active");
        img.addClass("active");
        left = img.position().left + parseInt($(".slider").css("padding-left")) + (img.width() - sliderPosition.width())/2;
        sliderPosition.css("left", left);
    });

    filesInput.on("click", ".noImage .add", function(){
        var $this = $(this);
        $this.siblings("form").find(".fileUpload").click();
    });

    filesInput.on("change", ".fileUpload", function(){
        var $this = $(this),
            parent = $this.parent(),
            liItem = parent.parent(),
            markup = liItem.html();
        if (this.files && this.files[0]){
            var filerdr = new FileReader();
            filerdr.onload = function(e){
                liItem.removeClass("noImage");
                parent.siblings(".downloadImage").attr("src", e.target.result).show();
            };
            filerdr.readAsDataURL(this.files[0]);
            if(liItem.parent().children().length < 3)
                liItem.parent().append("<li class='item noImage'>" + markup + "</li>");
        }
    });

    filesInput.on("click", ".remove", function(){
        var $this = $(this),
            parent = $this.parent(),
            liItem = parent.parent();
        $(this).parent().parent().remove();
    });

    $(".fileComment .comment .textarea").on("keydown", function(e){
        var $this = $(this);
        if($this.text().length > 999 && e.which != 8 && e.which != 46){
            $this.siblings(".message").css("opacity", 1);
            return false;
        }
        else
            $this.siblings(".message").css("opacity", 0);
    });

    $(".material").on("click", ".item", function(){
        var $this = $(this),
            checkbox = $this.find(".checkbox");
        checkbox.toggleClass("checked");
        if(checkbox.hasClass("checked")){
            $this.siblings(".item").find(".checkbox").removeClass("checked");
            $(".manufacture .manuf").slideUp();
            if($this.hasClass("wood"))
                $(".manufacture .wood").slideDown();
            if($this.hasClass("plastic"))
                $(".manufacture .plastic").slideDown();
        }
    });

    $(".checkbox").on("click", function(){
        var $this = $(this);
        $this.toggleClass("checked");
    });

    $(".windowInOrder .list").smoothDivScroll({
        mousewheelScrolling: "horizontal",
        touchScrolling: true,
        scrollingHotSpotLeftClass: "arrow-left",
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightClass: "arrow-right",
        scrollingHotSpotRightVisibleClass: "visible"
    });

    $(".control .remove").on("click", function(){
        var $this = $(this),
            index = $(this).index(),
            slider = $(".windowInOrder .list");
        $this.parent().parent().remove();
        slider.smoothDivScroll("recalculateScrollableArea");
        slider.smoothDivScroll("scrollToElement", "number", index - 1);
    });

    $(".manSlider .sliderList").smoothDivScroll({
        mousewheelScrolling: "horizontal",
        touchScrolling: true,
        scrollingHotSpotLeftClass: "arrow-left",
        scrollingHotSpotLeftVisibleClass: "visible",
        scrollingHotSpotRightClass: "arrow-right",
        scrollingHotSpotRightVisibleClass: "visible"
    });

    $(".manSlider").on("click", ".item", function(){
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
        $(".frame-material, .manufacture").slideUp();
        $(".modelChoose").slideDown();
        $(".fileComment .wallMaterial").slideDown();
    });

    $(".backBut").on("click", ".back", function(){
        var backBut = $(this).parent();
        if(backBut.hasClass("man")) {
            $(".modelChoose").slideUp();
            $(".fileComment .wallMaterial").slideUp();
            $(".frame-material, .manufacture").slideDown();
        }
        if(backBut.hasClass("model")) {
            $(".oneModel").slideUp();
            $(".allList").slideDown();
            $(".backBut.model").hide();
            $(".backBut.man").show();
        }
    });

    $(".modelChoose .allList .modelList .slider").on("click", ".item", function(){
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
        $(".modelChoose .allList").slideUp();
        $(".backBut.man").hide();
        $(".modelChoose .oneModel").slideDown();
        $(".backBut.model").css("display", "inline-block");
    });

    $(".optionsChoose .item").on("click", function(){
       $(this).find(".checkbox").toggleClass("check");
    });

    $(".stages .list .item").on("click", chooseTab);

    $(".wall .length .input").on("keypress", function(e){
        validationLength(e)
    });

    setTimeout(function(){
        $(".overlay").fadeIn();
    }, 500);

    $(".modal .close").on("click", function(){
        $(".overlay").fadeOut();
    })
});
