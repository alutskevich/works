$(document).ready(function(){
    $(".choise .select").on("click", function(){
        var $this = $(this),
            options = $this.find(".options");
        if(options.is(":visible")){
            $this.find(".options").slideUp();
            $this.removeClass("choosing");
        }
        else{
            $this.find(".options").slideDown();
            $this.addClass("choosing");
        }
    });

    $(".choise .select .options .option").on("click", function(){
        var $this = $(this);
        $this.parent().parent().find(".name").text($this.text());
    });

    $(".choise.intellect .select .options .item").on("click", function(){
        var $this = $(this);
        $this.parent().parent().find(".name").html($this.html());
    });

    $(".textareaComment").on("keydown", function(e){
        var $this = $(this);
        if($this.val().length > 999 && e.which != 8 && e.which != 46){
            $this.siblings(".messageError").css("opacity", 1);
            return false;
        }
        else
            $this.siblings(".messageError").css("opacity", 0);
    });

    $(".rait").each(function(){
        var point = $(this).find(".point"),
            fullWidth = point.width(),
            maxPoint = 10,
            left = 0;

        left = parseInt(point.find(".number").text()) * fullWidth / maxPoint;
        point.find(".number").css("left", left - 5);
        point.find(".bg").width(left);
    });

    $(".radioButton").on("click", function(){
        $(this).toggleClass("checked");
    });
});
