function chooseTab(){
    var tab = $(this),
        formBlock = $(".formStage"),
        profileBlock = $(".profileBlock"),
        windowBlock = $(".windowStage"),
        optionBlock = $(".optionStage");

    tab.siblings(".active").removeClass("active");
    tab.addClass("active");

    if(tab.hasClass("form")){
        profileBlock.fadeOut(function(){
            windowBlock.fadeOut(function(){
                optionBlock.fadeOut(function(){
                    formBlock.fadeIn();
                    $(".cut .window .vent, .set, .fileComment .params").hide();
                });
            });
        });
    }
    else if(tab.hasClass("profile")){
        formBlock.fadeOut(function(){
            windowBlock.fadeOut(function(){
                optionBlock.fadeOut(function(){
                    profileBlock.fadeIn();
                    $(".cut .window .vent, .set, .fileComment .params").hide();
                });
            });
        });
    }
    else if(tab.hasClass("window")){
        profileBlock.fadeOut(function(){
            formBlock.fadeOut(function(){
                optionBlock.fadeOut(function(){
                    windowBlock.fadeIn();
                    $(".cut .window .vent, .set, .fileComment .params").hide();
                });
            });
        });
    }
    else if(tab.hasClass("options")){
        profileBlock.fadeOut(function(){
            windowBlock.fadeOut(function(){
                formBlock.fadeOut(function(){
                    optionBlock.fadeIn();
                    $(".cut .window .vent, .set, .fileComment .params").show();
                });
            });
        });
    }
}

function validationLength(e){
    console.log($(e.target).text().length);
    if ((e.keyCode < 48 || e.keyCode > 57) || $(e.target).text().length >= 5) {
        e.preventDefault();
    }
}