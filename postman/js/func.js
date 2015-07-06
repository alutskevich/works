$(document).ready(function() {
    var app = new App(),
        dragDrop = $(".drag-drop"),
        $image_input = $(".form-image");

    app.testBrowser();

    $(window).on("scroll", function(e){
        if($(".content").hasClass("index")){
            app.winScroll(e);
        }
    });

    $("[data-popup]").on("click", function(){
        app.openPopup($(this).data("popup"));
    });

    $("#popup").find(".close").on("click", app.closePopup);
    $("#overlay").on("click", app.closePopup);

    $(".select_block").each(function(){
        $(this).cusSelect();
    });

    $(".checkbox").on("click", function(){
        app.checkBox($(this));
    });

    $(".menu").on("click", app.toggleNav);

    $(".trans").on("click", function(){
        app.toggleTrans($(this));
    });

    dragDrop.on("dragenter", function(e){
        e.preventDefault();
        app.dragEnter($(this));
    });

    dragDrop.on('dragover', function (e){
        e.preventDefault();
    });

    dragDrop.on('drop', function (e){
        e.preventDefault();
        var image = e.originalEvent.dataTransfer.files;

        app.dragDrop(image, dragDrop);
    });

    $(".download-image").on("click", function(){
        $image_input.click();
    });

    $image_input.on("change", function(e){
        var input = e.target;
        app.dragDrop(input.files, dragDrop);
    });

    $(".tab").on("click", function(){
        app.tabToogle($(this));
    });

    $(".add_line").on("click", function(){
        $(".optional-trip").slideDown();
        $(this).hide();
    });

    $(".period-block").find("input").datetimepicker({
        timepicker:false,
        format:'d.m.Y',
        theme: "postman"
    });

    $(".edit-profile").on("click", function(){
        $("#profile").toggleClass("edit");
    });

    $("#profile").find("input").on("focus", function(){
        $(this).parent().addClass("active");
    });
    $("#profile").find("input").on("blur", function(){
        $(this).parent().removeClass("active");
    });
});