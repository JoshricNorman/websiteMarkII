
/* Function to:
 * - stick the footer to the bottom of the page
 */
function stickFooter() {
    var contentBott = $("#content").offset().top + $("#content").outerHeight();
    var viewPortBott = $(window).scrollTop() + $(window).height();
    // var viewPortBott = $("html").offset().top + $("html").outerHeight();

    if( contentBott  < viewPortBott) {
        var currFootMargTop = $("footer").css("margin-top");
        $("footer").css("margin-top",  parseInt(currFootMargTop.split("px")[0]) + viewPortBott - contentBott + "px");
    }
}


 /* Function to:
  * - force a redraw of an element by hiding then showing it right away
  */
$.fn.forceRedraw = function() {
    return this.hide(0, function() {
        $(this).show();
     });
 }


function startAnimations() {
    //animate anime obj when on screen, else, reset animation
    $.each( $(".anime"), function () {
        var top_of_element = $(this).offset().top;
        var bottom_of_element = $(this).offset().top + $(this).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).height();
        var top_of_screen = $(window).scrollTop();

        //check if in screen first
        if( (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element) ) {
            if( $(this).hasClass("anUnderline") ) {
                $(this).css({
                    "animation": "underline 1.5s",
                    "-webkit-animation-play-state": "running",
                    "animation-play-state": "running"
                });
            }
            if (  $(this).hasClass("anWaveText") ) {
                var str = $(this).text();
                var strLength = str.length;
                var letters = str.split('');
                var $anWaveText = $(this);
                $(this).empty(); //empty the text we are making wave

                //reinsert each char into the original string but w/ enclosing span tags
                $.each( letters, function(_, letter) {
                     $('<span>', {text: letter}).appendTo($anWaveText);
                });

                //for each spanned char, animate it with a delay
                for( i = 0; i <= strLength; i++) {
                    $(':nth-child(' + i +')', this).css({
                        "animation": "bounce 0.5s ease-in-out infinite",
                        "-webkit-animation-play-state": "running",
                        "animation-play-state": "running",
                        "animation-direction": "alternate",
                        "animation-fill-mode": "forwards",
                        "display": "inline-block",
                        "-webkit-animation-delay": String(i/30) + "s",
                        "animation-delay": String(i/30) + "s",
                        "white-space": "pre-wrap",
                    });
                }
            } //end anWaveText

            if ( $(this).hasClass("anFadeIn") ) {
                $(this).css("display", "none").fadeIn("slow", "swing");
            }

            if (  $(this).hasClass("anBounceText") ) {
                var str = $(this).text();
                var strLength = str.length;
                var letters = str.split('');
                var $anBounceText = $(this);
                $(this).empty(); //empty the text we are making wave

                //reinsert each char into the original string but w/ enclosing span tags
                $.each( letters, function(_, letter) {
                     $('<span>', {text: letter}).appendTo($anBounceText);
                });

                //for each spanned char, animate it with a delay
                for( i = 0; i <= strLength; i++) {
                    $(':nth-child(' + i +')', this).css({
                        "animation": "bounce 0.5s ease-in-out",
                        "-webkit-animation-play-state": "running",
                        "animation-play-state": "running",
                        "animation-direction": "alternate",
                        "animation-fill-mode": "forwards",
                        "display": "inline-block",
                        "-webkit-animation-delay": String(i/20) + "s",
                        "animation-delay": String(i/20) + "s",
                        "white-space": "pre-wrap",
                        "-webkit-animation-iteration-count": "4",
                        "animation-iteration-count": "4"
                    });
                }
            } //end anBounceText

            if (  $(this).hasClass("anStartAnime") ) {
                $(this).css("animation-play-state", "running");
            }
            //once animated, remove the need to check for it
            $(this).removeClass("anime");
        }
    }); //end animations
} //end function startAnimations

$(document).ready(function(){
    $.getScript("../slick-1.8.0/slick/slick.min.js", function(){
        $('.carousel').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            variableWidth: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            pauseOnDotsHover: true,
        });
    });

    var bodyStyles = window.getComputedStyle(document.body);

    var navColor = bodyStyles.getPropertyValue('--navColor');
    var hoverNavColor = bodyStyles.getPropertyValue('--hoverNavColor');

    var plum = bodyStyles.getPropertyValue('--plum');

    var ribbon = bodyStyles.getPropertyValue('--ribbon');
    var rose = bodyStyles.getPropertyValue('--rose');
    var wine = bodyStyles.getPropertyValue('--wine');

    var coral = bodyStyles.getPropertyValue('--coral');
    var salmon = bodyStyles.getPropertyValue('--salmon');
    var tuna = bodyStyles.getPropertyValue('--tuna');

    var sky = bodyStyles.getPropertyValue('--sky');
    var lake = bodyStyles.getPropertyValue('--lake');
    var ocean = bodyStyles.getPropertyValue('--ocean');
    var abyss = bodyStyles.getPropertyValue('--abyss');

    var mint = bodyStyles.getPropertyValue('--mint');
    var aloe = bodyStyles.getPropertyValue('--aloe');
    var grass = bodyStyles.getPropertyValue('--grass');
    var pine = bodyStyles.getPropertyValue('--pine');

    var lemon = bodyStyles.getPropertyValue('--lemon');
    var honey = bodyStyles.getPropertyValue('--honey');

    stickFooter();
    startAnimations();

//-----------------NAVIGATION-----------------\\

    /* Function to:
     * -allow usage of back and forward buttons
     */
    $(window).on('popstate', function(event) {
        var url = window.location.host;
        // console.log("navigate to: " + url);
        history.go( url );
    });

    /* Function to:
     * -Retrieve current nav color on hover
     */
     $(".navButt").hover(function(){
        var hoverNavButt = $(this).attr("id");

        if( hoverNavButt == "aboutNav" )
            document.body.style.setProperty( '--hoverNavColor', honey);
        else if ( hoverNavButt == "resumeNav" )
            document.body.style.setProperty( '--hoverNavColor', ocean);
        else
            document.body.style.setProperty( '--hoverNavColor', salmon);
     });

    /* Function to:
     * -Show which nav button is selected/clicked on
     * -choose the correct background color
     * -load correct content without reloading entire page
     * -scroll to the top of the page
     */
     $(document).on("click", ".navButt", function( event ){
        event.preventDefault();

        var clickNavButt = $(this).attr("id");

        //  add active id to clicked on nav
        if( $(this).parent().attr("id") != "activeNav" || $(this).parent().attr("class") == "projectActiveNav" ) {
             $(this).parent().attr( "id", "activeNav" );
             $(this).parent().removeClass();

             //Reset some styling when navigating outside of projects
             $("footer").css("display", "flex");
             $(".footerText").css("display", "block");
             $("#fillContent").first().css("margin-bottom", "100px");

             //set correct color for active nav button, and theme colors
            if( clickNavButt == "aboutNav" ) {
                document.body.style.setProperty( '--navColor', honey);
                document.body.style.setProperty( '--bg', lemon);
                document.body.style.setProperty( '--side', salmon);
                document.body.style.setProperty( '--hero', wine);
                document.body.style.setProperty( '--foil', lake);
                document.body.style.setProperty( '--villain', ocean);
            }
            else if ( clickNavButt == "resumeNav" ) {
                document.body.style.setProperty( '--navColor', grass);
                document.body.style.setProperty( '--bg', mint);
                document.body.style.setProperty( '--side', aloe);
                document.body.style.setProperty( '--hero', pine);
                document.body.style.setProperty( '--foil', ribbon);
                document.body.style.setProperty( '--villain', tuna);
            }
            else {
                document.body.style.setProperty( '--navColor', salmon);
                document.body.style.setProperty( '--bg', ribbon);
                document.body.style.setProperty( '--side', rose);
                document.body.style.setProperty( '--hero', salmon);
                document.body.style.setProperty( '--foil', sky);
                document.body.style.setProperty( '--villain', abyss);
                $('.carousel').slick('unslick');
            }
         }

         //remove ::after psuedo element from inactive siblings
         $("#activeNav::after").remove();

         //set all activeNavs as inactive
        $(this).parent().siblings("#activeNav").removeAttr("id");

        //get the current URL
        var url = this.href;
        var trueURL = url+'.html'
        var splitURL = url.split("/");
        var pageName = splitURL[splitURL.length - 1] //figures out which page we're displaying
        var truePageName = pageName + ".html";


        //In the event that we are navigating from a project popUp, emppty the popUp
        //and reset scrolling
        $("#popUp").empty().css("display", "none");
        $('html').css('overflow', 'auto'); //allow scrolling


        //set the correct URL and push it to history so we can navigate back and forth
        history.pushState(null, null, url);

        //empty the content wrapper
        $("#contentWrapper").empty();
        //replace it with new content **NOTE: maintain space b/w url and #mainContent
        //in order to prevent loading the entire page

        $('footer').hide(1);
        $("#contentWrapper").load(url + " #fillContent").hide().fadeIn('fast', function () {
                  startAnimations();
                  $('footer').show();
                  stickFooter();
                  if( clickNavButt == "portNav") {
                      $('.carousel').slick({
                          autoplay: true,
                          autoplaySpeed: 3000,
                          variableWidth: true,
                          dots: true,
                          infinite: true,
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          arrows: false,
                          pauseOnDotsHover: true,
                      });
                  }

         });

        //force scroll to top of the page
        $("html, body").animate({ scrollTop: 0 }, "fast");

     });


     /* Function to:
      * - Reveal backItUp when page scrolls passed window height
      * - hide backItUp when page is within window height
      * - trigger animations when on the screen
      */
    $(window).on('scroll', function( event ) {
        var scrollPos = $(document).scrollTop();

        var windowHeight = $(window).height();
        // console.log( "scrollPos: " + scrollPos);
        if( scrollPos > (windowHeight * 2 / 3) ) {
             $("#backItUp").fadeIn("slow", function() {
                 $("#backItUp").css("display", "block");
                //  console.log("BACK UP");
             });
        }
        else {
            $("#backItUp").fadeOut("slow", function() {
                $("#backItUp").css("display", "none");
            });
        }

        startAnimations();
    });

    /* Function to:
     * - push page to the top when backItUp is pressed
     */
    $(document).on("click","#backItUp", function( event ){
        event.preventDefault();
        if( $("#popUp").css("display") == "none")
            $("html, body").animate({ scrollTop: 0 }, "slow");
        else
            $("#popUp").animate({ scrollTop: 0 }, "slow");
    });

//-----------------PORTFLIO FUNCTIONS-----------------\\

    /* Function to:
     * - auto scroll window to the top when a carousel dot is clicked
     */
    $(document).on("click", ".slick-dots li button", function( event ) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });


    /* Function to:
     * - show the correct project information when the view more button is clicked
     */
     $(document).on("click", ".caraButt", function( event ) {

        var projPage = $(this).attr('value');

         console.log( projPage );
         var url = window.location.host;
         var rootURL = url.split("/")[0];
         var newURL = "http://" + rootURL + projPage;
         history.pushState(null, null, newURL);

         $('#popUp').scrollTop(0); //reset scroll so we're always at the top of the project images

         //load project info
         $("#popUp").load(newURL + " #fillContent", function () {
             //restyle project stuff
             $(this).css("display", "block");
             $(this).find("#exitProj").css("display", "block").addClass("portExitProj");
             $(this).find("#projEnvelope").css({
                 "background-color": "rgba(255, 255, 255, 0.75)",
             });
             $(this).find("#projImgs").css("margin-top", "100px").scrollTop(0);
             $(this).find("#imgModal").addClass("portImgModal"); //prevents creating another scrollbar

             //restyle popup
             $(this).find("#projDets").css({
                 "margin-top": "0"
             });


             $("#content").css({
                 "overflow": "hidden",
                 "overflow-y": "hidden"
             });
             $('html').css('overflow', 'hidden'); //prevent scrolling behind the modal some how

             $("#backItUp").css("display", "none").css("display", "block");
         }); //end load callback function
     });


    /* Function to:
     * - display project details when clicked on
     * - allow navigation to specific project page when right clicked
     */
    $(document).on("click", ".projectContainer", function( event ) {
        event.preventDefault();

        var projPage = $(this).find(".projectImg").attr('href');
        var url = window.location.host;
        var rootURL = url.split("/")[0];
        var newURL = "http://" + rootURL + projPage;
        history.pushState(null, null, newURL);

        $('#popUp').scrollTop(0); //reset scroll so we're always at the top of the project images

        //load project info
        $("#popUp").load(newURL + " #fillContent", function () {
            //restyle project stuff
            $(this).css("display", "block");
            $(this).find("#exitProj").css("display", "block").addClass("portExitProj");
            $(this).find("#projEnvelope").css({
                "background-color": "rgba(255, 255, 255, 0.75)",
            });
            $(this).find("#projImgs").css("margin-top", "100px").scrollTop(0);
            $(this).find("#imgModal").addClass("portImgModal"); //prevents creating another scrollbar

            //restyle popup
            $(this).find("#projDets").css({
                "margin-top": "0"
            });

            $("#content").css({
                "overflow": "hidden",
                "overflow-y": "hidden"
            });
            $('html').css('overflow', 'hidden'); //prevent scrolling behind the modal some how

            $("#backItUp").css("display", "none").css("display", "block");
        }); //end load callback function
    });

    /* Function to:
     * prevent the exit button from reloading the portfolio page
     * Empty the popup modal
     * reset scrolling
     */
    $(document).on("click", ".portExitProj", function( event ) {
        event.preventDefault();

        $("#popUp").empty().css("display", "none");

        $('html').css('overflow', 'auto'); //allow scrolling

        $("#backItUp").css("display", "none");


        //reset URL
        var url = window.location.host;
        var newURL = "http://" + url;
        history.pushState(null, null, newURL);

        $("nav").css("visibility", "visible");

    });


//-----------------ABOUT FUNCTIONS-----------------\\

    $(document).on("click", "#contactButt", function(){


        $("#contactWrapper").slideDown("fast", function() {
            $(this).css("opacity", "1");

            $("html, body").animate({
                scrollTop: ( $("#contactWrapper").position().top - 150)
            });

        });


    });


//-----------------Resume FUNCTIONS-----------------\\


//-----------------Project FUNCTIONS-----------------\\

    /* Function to:
     * - map fullscale project image onto modal
     * - map image description onto modal
     * - freeze scrolling
     */
    $(document).on("click", ".projImg", function(){
        $("#imgModal").css("display", "flex");

        $("#modalImg").attr( "src", $(this).attr("src") );
        $("#modalDesc").text(  $(this).attr("alt") );
        $(".projFillCont").css("padding", "0");

        $('html').css('overflow', 'hidden');

        //hide navigation
        // $('header').css('z-index', '800');
        $("nav").css("visibility", "hidden");
        $("#backItUp").css("visibility", "hidden");

    });

    /* Function to:
     * - empty the image modal
     * - close the image modal
     * - resume scrolling
     */
     $(document).on("click", "#imgModal", function(){
        $("#modalImg").empty();
        $("#modalDesc").empty();
        $("#imgModal").css("display", "none");
        $(".projFillCont").css("padding-top", "80px");

        //reshow navigation
        // $('header').css('z-index', '10010');
        $("nav").css("visibility", "visible");
        $("#backItUp").css("visibility", "visible");

        //if we are in the portfolio Modal, prevent creating another scroll bar
        if( $(this).attr("class") == "portImgModal")
            $('html').css('overflow', 'hidden');
        else
         $('html').css('overflow', 'auto');
    });


}); /*End check for if the document is ready */
