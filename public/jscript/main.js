$(document).ready(function(){

    var bodyStyles = window.getComputedStyle(document.body);

    var navColor = bodyStyles.getPropertyValue('--navColor');
    var hoverNavColor = bodyStyles.getPropertyValue('--hoverNavColor');

    var pink = bodyStyles.getPropertyValue('--pink');
    var mauve = bodyStyles.getPropertyValue('--mauve');
    var red = bodyStyles.getPropertyValue('--red');
    var sky = bodyStyles.getPropertyValue('--sky');
    var blue = bodyStyles.getPropertyValue('--blue');
    var purple = bodyStyles.getPropertyValue('--purple');
    var yellow = bodyStyles.getPropertyValue('--yellow');
    var gold = bodyStyles.getPropertyValue('--gold');
    var spring = bodyStyles.getPropertyValue('--spring');
    var green = bodyStyles.getPropertyValue('--green');
    var snot = bodyStyles.getPropertyValue('--snot');
    var fave = bodyStyles.getPropertyValue('--fave');


    var cycleTimer; //variable for auto playing slideshow
    var slideshowIndex = 0;

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
            document.body.style.setProperty( '--hoverNavColor', purple);
        else if ( hoverNavButt == "resumeNav" )
            document.body.style.setProperty( '--hoverNavColor', gold);
        else
            document.body.style.setProperty( '--hoverNavColor', red);
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
        if( $(this).parent().attr("id") != "activeNav" ) {
             $(this).parent().attr( "id", "activeNav" );

             //Reset some styling when navigating outside of projects
             $("footer").css("display", "flex");
             $(".footerText").css("display", "block");
             $("#fillContent").first().css("margin-bottom", "100px");

             //set correct color for active nav button, and theme colors
            if( clickNavButt == "aboutNav" ) {
                document.body.style.setProperty( '--navColor', purple);
                document.body.style.setProperty( '--bgColor', yellow);
                document.body.style.setProperty( '--detailColor1', gold);
                document.body.style.setProperty( '--detailColor2', red);
                document.body.style.setProperty( '--emphasisColor', purple);

            }
            else if ( clickNavButt == "resumeNav" ) {
                document.body.style.setProperty( '--navColor', gold);
                document.body.style.setProperty( '--bgColor', spring);
                document.body.style.setProperty( '--detailColor1', green);
                document.body.style.setProperty( '--detailColor2', snot);
                document.body.style.setProperty( '--emphasisColor', gold);
            }
            else {
                document.body.style.setProperty( '--navColor', red);
                document.body.style.setProperty( '--bgColor', pink);
                document.body.style.setProperty( '--detailColor1', mauve);
                document.body.style.setProperty( '--detailColor2', red);
                document.body.style.setProperty( '--emphasisColor', snot);
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

        //set the correct URL
        // history.replaceState(null, null, url);
        history.pushState(null, null, url);


        //empty the content wrapper
        $("#contentWrapper").empty();
        //replace it with new content **NOTE: maintain space b/w url and #mainContent
        //in order to prevent loading the entire page
        $("#contentWrapper").load(url + " #fillContent");

        //stop slideshow timer if it is available
        clearTimeout(cycleTimer);
        if( pageName == "portfolio") {
            slideshowIndex = 0;
            cycleTimer = setTimeout(function() {cycleSlides();}, 2000);
        }

        //force scroll to top of the page
        $("html, body").animate({ scrollTop: 0 }, "fast");
     });

     /* Function to:
      * Reveal backItUp when page scrolls passed window height
      * hide backItUp when page is within window height
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
    });

    /* Function to:
     * - push page to the top when backItUp is pressed
     */
    $(document).on("click","#backItUp", function( event ){
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

//-----------------PORTFLIO FUNCTIONS-----------------\\


    /* Function to:
     * - Display correct slideshow image
     * - Display correct slideshow title
     * - Change to correct slideshow link
     */
    function displaySlideshow( num ) {
        if( num === undefined ) num = 0;

        //process the correct image, set the correct title, set the correct link
        switch( num ) {
        case 0:
            $("#slideshowImg").css("background-image", "url(../img/joshric_background1_17Aug20.jpg)");
            $("#slideshowTitle").text( "TITLE 0");
            break;
        case 1:
            $("#slideshowImg").css("background-image", "url(../img/joshric_background1.jpg)");
            $("#slideshowTitle").text( "TITLE 1");
            break;
        case 2:
            $("#slideshowImg").css("background-image", "url(../img/joshric_background2.jpg)");
            $("#slideshowTitle").text( "TITLE 2");
            break;
        case 3:
            $("#slideshowImg").css("background-image", "url(../img/joshric_background3.jpg)");
            $("#slideshowTitle").text( "TITLE 3");
            break;
        }

    }

    /* Function to:
     * -auto play the slideshow after 5 seconds;
     */
    function cycleSlides() {
        //increment our place in the slideshow, loopback if neccessary
        slideshowIndex++;
        if( slideshowIndex > 3) slideshowIndex = 0;
        // console.log( "curr slide: " + slideshowIndex);

        //display correct selected dot
        $(".dot").removeClass("activeDot");
        var currDot = "#dot" + parseInt(slideshowIndex);
        $(currDot).addClass("activeDot");

        displaySlideshow( slideshowIndex ); //display correct image
        cycleTimer = setTimeout(function() {cycleSlides();}, 5000); //call function again in 4 seconds
    }

    //set auto cycle slides after 2 seconds
    cycleTimer = setTimeout(function() {cycleSlides();}, 2000);

    /* Function to:
     * - process clicking on slideshow dots
     * - display correct image depending on slide index
     */
    $(document).on("click", ".dot", function(){
        $(this).siblings(".activeDot").removeClass("activeDot");
        $(this).addClass("activeDot");

        //change which slide we are on
        var dotNum = ( $(this).attr("id") ).split("dot")[1];
        slideshowIndex = parseInt(dotNum);
        displaySlideshow( slideshowIndex );
        console.log("clicked on dot: " + dotNum);

        //reset cycle slideshow
        clearTimeout(cycleTimer);
        cycleTimer = setTimeout(function() {cycleSlides();}, 7000);
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });


    /* TODO Function to:
     *  - display correct project page when clicking on viewMore
     *  similar to clicking on project Container
     */


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
        //load project info
        $("#popUp").load(newURL + " #fillContent", function () {

            //restyle project stuff
            $(this).css("display", "block");
            $(this).find("#exitProj").css("display", "block").addClass("portExitProj");
            $(this).find("#projEnvelope").css({
                "margin": "2px",
                "background-color": "rgba(255, 255, 255, 0.75)"
            });
            $(this).find("#projImgs").css("margin-top", "100px");
            $(this).find("#projDets").css("margin-top", "50px");
            $(this).find("#imgModal").addClass("portImgModal");

            //restyle popup
            $(this).find("#projDets").css("border", "solid 5px var(--detailColor2)");
            $(this).find("#projDetTop").css("border-bottom", "solid 5px var(--detailColor2)");
            $(this).find("#projDate").css("border-left", "solid 5px var(--detailColor2)");


            $("#content").css({
                "overflow": "hidden",
                // "position": "fixed",
                "overflow-y": "hidden"
            });
            $('html').css('overflow', 'hidden'); //prevent scrolling behind the modal some how

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

        //reset URL
        var url = window.location.host;
        var newURL = "http://" + url;
        history.pushState(null, null, newURL);
    });


//-----------------ABOUT FUNCTIONS-----------------\\

    $(document).on("click", "#contactButt", function(){
        $("html, body").animate({
            scrollTop: ( $("#contactWrapper").position().top - 150)
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

        //if we are in the portfolio Modal, prevent creating another scroll bar
        if( $(this).attr("class") == "portImgModal")
            $('html').css('overflow', 'hidden');
        else
         $('html').css('overflow', 'auto');
    });


}); /*End check for if the document is ready */