var Page = function(){
    var self = this,
        userAgent = window.navigator.userAgent;

    self.testBrowser = function(){
        document.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        document.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
        document.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        document.is_safari = navigator.userAgent.indexOf("Safari") > -1;
        document.is_Opera = navigator.userAgent.indexOf("Presto") > -1;
        document.is_Apple = false;
        document.is_Android = false;

        if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)){document.is_Apple = true;}
        if(userAgent.match(/Android/i)){document.is_Android = true;}
        if((document.is_chrome)&&(document.is_safari)) {document.is_safari=false;}
    };

    self.slider = function(elem){
        if($(window).width() > 460){
            elem.bxSlider({
                nextSelector: '.arrow.next',
                prevSelector: '.arrow.prev',
                nextText: '',
                prevText: '',
                pager: false,
                slideWidth: 780,
                auto: true
            });
        } else{
            elem.bxSlider({
                nextSelector: '.arrow.next',
                prevSelector: '.arrow.prev',
                nextText: '',
                prevText: '',
                pager: false,
                touchEnabled: false,
                slideWidth: 780,
                auto: true
            });
        }
    };
};