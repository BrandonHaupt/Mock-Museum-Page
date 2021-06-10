const openLightBox = function(event){
    console.log(event.target.src);
    
    //Change the content of the lightbox
    $(".lightbox-content").html("<img src='" + event.target.src + "'>");
    
    //add a class to show the lightbox
    $(".lightbox").addClass("active");
}


//Document Ready
$(function (){
    
    $("body").on("click", ".gallery img", openLightBox);
    
    $(".lightbox-back").on("click", function(){
        $(".lightbox").removeClass("active");
    });
    
});