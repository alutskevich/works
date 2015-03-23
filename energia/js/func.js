$(document).ready(function(){
    $(".check").on("click", function(){
        var $this = $(this);

        $this.toggleClass("checked");
        $this.siblings("input[type='checkbox']").prop("checked", function(index, val){
            return !val;
        });
    });

    if($("#map").length != 0){
        var mapMarsh, coorMarsh, markerMarsh;
        coorMarsh = new google.maps.LatLng(55.7149279,37.5745726);

        mapMarsh = new google.maps.Map(document.getElementById('map'),
            {
                backgroundColor: "rgba(15, 31, 54, 1)",
                zoom: 15,
                center: new google.maps.LatLng(55.7149279,37.5745726),
                scrollwheel: false,
                zoomControl: true,
                draggable: true
            });

        markerMarsh = new google.maps.Marker({
            position: coorMarsh,
            map: mapMarsh,
            icon: "img/map-logo.png"
        });
        markerMarsh.setMap(mapMarsh);
    }

    $(".docs_list .controls .but").on("click", function(){
        var $this = $(this),
            prev = $this.hasClass("prev"),
            doc_list = $(".docs_list"),
            page_item = doc_list.find(".page_info").find(".item:visible"),
            docs_block = doc_list.find(".all_docs").find(".block:visible");

        if(prev){
            if(page_item.prev().hasClass("item")){
                page_item.hide();
                page_item.prev().show();
                docs_block.hide();
                docs_block.prev().show();
            } else{
                return false;
            }
        } else{
            if(page_item.next().hasClass("item")){
                page_item.hide();
                page_item.next().show();
                docs_block.hide();
                docs_block.next().show();
            } else{
                return false;
            }
        }
    });

    $(".slider_content .arrow").on("click", function(){
        var $this = $(this),
            prev = $this.hasClass("prev"),
            slider_content = $(".slider_content"),
            block_item = slider_content.find(".info_block:visible");

        if(prev){
            if(block_item.prev().hasClass("info_block")){
                block_item.hide();
                block_item.prev().show();
            } else{
                return false;
            }
        } else{
            if(block_item.next().hasClass("info_block")){
                block_item.hide();
                block_item.next().show();
            } else{
                return false;
            }
        }
    });
});