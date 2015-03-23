$(document).ready(function(){
    $(".howitworksBlock_center_text8").on("click", function(){
        $(".video, video").show();
    });
    $(".video .close").on("click", function(){
        $(".video").hide();
        $("video")[0].pause();
    });

    $(window).on("scroll", function(){
        var scrollTop = $(this).scrollTop(),
            arenda = $(".navigation .arenda");

        if(scrollTop > 83) {
            arenda.addClass("fix");
        } else{
            arenda.removeClass("fix");
        }
    });

    $(".reviewsBlock_center_buttonLeft").on("click", function(){
        var review1 = $(".reviewsBlock_center_rectangle1"),
            ava1 = $(".reviewsBlock_center_circle1"),
            review2 = $(".reviewsBlock_center_rectangle2"),
            ava2 = $(".reviewsBlock_center_circle2"),
            review3 = $(".reviewsBlock_center_rectangle3"),
            ava3 = $(".reviewsBlock_center_circle3"),
            point1 = $(".reviewsBlock_center_button1"),
            point2 = $(".reviewsBlock_center_button2"),
            point3 = $(".reviewsBlock_center_button3");

        if(ava3.is(":visible") && review3.is(":visible")){
            return false;
        } else if(ava1.is(":visible") && review1.is(":visible")){
            ava1.hide();
            ava2.show();
            review1.hide();
            review2.show();
            point1.removeClass("active");
            point2.addClass("active");

        } else if(ava2.is(":visible") && review2.is(":visible")){
            ava2.hide();
            ava3.show();
            review2.hide();
            review3.show();
            point2.removeClass("active");
            point3.addClass("active");
        }
    });
    $(".reviewsBlock_center_buttonRight").on("click", function(){
        var review1 = $(".reviewsBlock_center_rectangle1"),
            ava1 = $(".reviewsBlock_center_circle1"),
            review2 = $(".reviewsBlock_center_rectangle2"),
            ava2 = $(".reviewsBlock_center_circle2"),
            review3 = $(".reviewsBlock_center_rectangle3"),
            ava3 = $(".reviewsBlock_center_circle3"),
            point1 = $(".reviewsBlock_center_button1"),
            point2 = $(".reviewsBlock_center_button2"),
            point3 = $(".reviewsBlock_center_button3");

        if(ava1.is(":visible") && review1.is(":visible")){
            return false;
        } else if(ava3.is(":visible") && review3.is(":visible")){
            ava3.hide();
            ava2.show();
            review3.hide();
            review2.show();
            point3.removeClass("active");
            point2.addClass("active");

        } else if(ava2.is(":visible") && review2.is(":visible")){
            ava2.hide();
            ava1.show();
            review2.hide();
            review1.show();
            point2.removeClass("active");
            point1.addClass("active");
        }
    });
    $(".reviewsBlock_center_button1").on("click", function(){
        var review1 = $(".reviewsBlock_center_rectangle1"),
            ava1 = $(".reviewsBlock_center_circle1"),
            review2 = $(".reviewsBlock_center_rectangle2"),
            ava2 = $(".reviewsBlock_center_circle2"),
            review3 = $(".reviewsBlock_center_rectangle3"),
            ava3 = $(".reviewsBlock_center_circle3"),
            point1 = $(".reviewsBlock_center_button1"),
            point2 = $(".reviewsBlock_center_button2"),
            point3 = $(".reviewsBlock_center_button3");
        ava1.show();
        review1.show();
        ava2.hide();
        review2.hide();
        ava3.hide();
        review3.hide();
        point3.removeClass("active");
        point2.removeClass("active");
        $(this).addClass("active");
    });
    $(".reviewsBlock_center_button2").on("click", function(){
        var review1 = $(".reviewsBlock_center_rectangle1"),
            ava1 = $(".reviewsBlock_center_circle1"),
            review2 = $(".reviewsBlock_center_rectangle2"),
            ava2 = $(".reviewsBlock_center_circle2"),
            review3 = $(".reviewsBlock_center_rectangle3"),
            ava3 = $(".reviewsBlock_center_circle3"),
            point1 = $(".reviewsBlock_center_button1"),
            point2 = $(".reviewsBlock_center_button2"),
            point3 = $(".reviewsBlock_center_button3");
        ava2.show();
        review2.show();
        ava1.hide();
        review1.hide();
        ava3.hide();
        review3.hide();
        point3.removeClass("active");
        point1.removeClass("active");
        $(this).addClass("active");
    });
    $(".reviewsBlock_center_button3").on("click", function(){
        var review1 = $(".reviewsBlock_center_rectangle1"),
            ava1 = $(".reviewsBlock_center_circle1"),
            review2 = $(".reviewsBlock_center_rectangle2"),
            ava2 = $(".reviewsBlock_center_circle2"),
            review3 = $(".reviewsBlock_center_rectangle3"),
            ava3 = $(".reviewsBlock_center_circle3"),
            point1 = $(".reviewsBlock_center_button1"),
            point2 = $(".reviewsBlock_center_button2"),
            point3 = $(".reviewsBlock_center_button3");
        ava3.show();
        review3.show();
        ava2.hide();
        review2.hide();
        ava1.hide();
        review1.hide();
        point1.removeClass("active");
        point2.removeClass("active");
        $(this).addClass("active");
    });
});
