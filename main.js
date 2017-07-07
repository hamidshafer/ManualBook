
var mnWidth = 564;
var mnHeight = 792;
var mnGatter = 15;
var mnSpeed = 600;
var mnHSpeed = mnSpeed/2;

var toc_page_url = "./manual/file-page0.htm";
var ctx_page_urls = {
    // TODO please change this url addresses to each page's context page
    1:  "./manual/file-page1.htm",
    3:  "./manual/file-page1.htm",
    5:  "./manual/file-page1.htm",
    7:  "./manual/file-page1.htm",
    9:  "./manual/file-page1.htm",
    11: "./manual/file-page1.htm",
    13: "./manual/file-page1.htm",
    15: "./manual/file-page1.htm",
    17: "./manual/file-page1.htm",
    19: "./manual/file-page1.htm",
    21: "./manual/file-page1.htm",
    23: "./manual/file-page1.htm",
    25: "./manual/file-page1.htm",
    27: "./manual/file-page1.htm",
    29: "./manual/file-page1.htm",
    31: "./manual/file-page1.htm",
    33: "./manual/file-page1.htm",
    35: "./manual/file-page1.htm",
    37: "./manual/file-page1.htm",
    39: "./manual/file-page1.htm",
    41: "./manual/file-page1.htm",
}

function showTOC()
{
    var b = $.find('.booklet');
    toc = $.find('.toc');
    if (toc.length)
        return;
    
    toc = $('<div class="toc b-page b-wrap"></div>').css({width: mnWidth, height: mnHeight}).appendTo(b);
    
    $('<iframe scrolling=no src="' + toc_page_url + '"></iframe>')
        .css({"left": 0, "margin-left": "-" + mnWidth + "px"}).appendTo(toc)
        .stop().animate({"margin-left": 0}, mnSpeed, "easeInQuad");
    
    $('<div class="b-shadow-toc"></div>')   // shadow
        .css({left: 0}).appendTo(toc)
        .stop().animate({left: mnWidth}, mnSpeed, "easeInQuad");
    
    toc[0].onmouseleave = hideTOC; 
}

function hideTOC()
{
    var toc = $.find('.toc');
    if (toc.length)
        $(toc).stop().animate({width: 0}, mnHSpeed, "easeOutQuad", $(toc).detach);
}

function showContextPage()
{
    var b = $.find('.booklet');
    ctx = $.find('.ctx');
    if (ctx.length)
        return;
    
    ctx = $('<div class="ctx b-page b-wrap"></div>').css({left: mnWidth+mnGatter*2, width: mnWidth, height: mnHeight}).appendTo(b);
    
    $('<iframe scrolling=no src="' + ctx_page_urls[getCurrentPage()] + '"></iframe>')
        .css({"margin-left": mnWidth}).appendTo(ctx)
        .stop().animate({"margin-left": 0}, mnSpeed, "easeInQuad");
    
    $('<div class="b-shadow-ctx"></div>')   // shadow
        .css({left: mnWidth}).appendTo(ctx)
        .stop().animate({left: -mnGatter-5}, mnSpeed, "easeInQuad");
    
    ctx[0].onmouseleave = hideContextPage; 
}

function hideContextPage()
{
    var ctx = $.find('.ctx');
    if (ctx.length)
        $('.ctx').stop().animate({"margin-left": mnWidth, width: 0}, mnHSpeed, "easeOutQuad", $(ctx).detach);
}

function getCurrentPage()
{
    var curr = $.fn.booklet.interfaces[0].options.curr;
    if (curr % 2 == 0)
        curr++;
    
    return curr;
}


$(function() {

    var $mybook 		= $('#mybook');
    var $bttn_first		= $('#first_page_button');
    var $bttn_prev		= $('#prev_page_button');
    var $bttn_next		= $('#next_page_button');
    var $bttn_last		= $('#last_page_button');
    var $loading		= $('#loading');
    var $mybook_frames	= $mybook.find('iframe');
    var cnt_frames		= $mybook_frames.length;
    var loaded			= 0;
    //preload all the frames,
    //and then call the booklet plugin
    // TODO ll
    
    $('#left_indicator_button').click(function(e){
        e.preventDefault();
        var toc = $.find('.toc');
        
        if (toc.length == 0) {
            showTOC();
        } else {
            hideTOC();
        }
    });
    
    $('#right_indicator_button').click(function(e){
        e.preventDefault();
        var ctx = $.find('.ctx');
        
        if (ctx.length == 0) {
            showContextPage();
        } else {
            hideContextPage();
        }
    });
    
    // $('.toc').load(function(){
        // console.log($(this)[0].contentDocument.location.href);
        // console.log($('a',  $(this)[0].contentDocument).context.baseURI);
        // $('a',  $(this)[0].contentDocument).context.baseURI = "/Moleskine/";
    // });
    
    $bttn_first.click(function() {
        $mybook.booklet(0);
    });
    $bttn_last.click(function() {
        $mybook.booklet(-1);
    });

    $mybook_frames.each(function(){
        var $frame 	= $(this);
        var source	= $frame.attr('src');
        $('iframe').load(function(){
            ++loaded;
            // console.log(loaded);
            if(loaded == cnt_frames){
                $loading.hide();
                $bttn_first.show();
                $bttn_prev.show();
                $bttn_next.show();
                $bttn_last.show();
                $mybook.show().booklet({
                    name:               null,                            // name of the booklet to display in the document title bar
                    width:              ((mnWidth+mnGatter)*2),          // container width
                    height:             mnHeight,                        // container height
                    speed:              mnSpeed,                         // speed of the transition between pages
                    direction:          'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
                    startingPage:       0,                               // index of the first page to be displayed
                    easing:             'easeInOutQuad',                 // easing method for complete transition
                    easeIn:             'easeInQuad',                    // easing method for first half of transition
                    easeOut:            'easeOutQuad',                   // easing method for second half of transition

                    closed:             true,                            // start with the book "closed", will add empty pages to beginning and end of book
                    closedFrontTitle:   null,                            // used with "closed", "menu" and "pageSelector", determines title of blank starting page
                    closedFrontChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank starting page
                    closedBackTitle:    null,                            // used with "closed", "menu" and "pageSelector", determines chapter name of blank ending page
                    closedBackChapter:  null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank ending page
                    covers:             false,                           // used with  "closed", makes first and last pages into covers, without page numbers (if enabled)

                    pagePadding:        mnGatter,                        // padding for each page wrapper
                    pageNumbers:        false,                           // display page numbers on each page

                    hovers:             false,                           // enables preview pageturn hover animation, shows a small preview of previous or next page on hover
                    overlays:           true,                            // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
                    tabs:               false,                           // adds tabs along the top of the pages
                    tabWidth:           60,                              // set the width of the tabs
                    tabHeight:          20,                              // set the height of the tabs
                    arrows:             false,                           // adds arrows overlayed over the book edges
                    cursor:             'pointer',                       // cursor css setting for side bar areas

                    hash:               true,                            // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
                    keyboard:           true,                            // enables navigation with arrow keys (left: previous, right: next)
                    next:               $bttn_next,          		 	 // selector for element to use as click trigger for next page
                    prev:               $bttn_prev,          		 	 // selector for element to use as click trigger for previous page

                    menu:               '#menu',                         // selector for element to use as the menu area, required for 'pageSelector'
                    pageSelector:       true,                            // enables navigation with a dropdown menu of pages, requires 'menu'
                    chapterSelector:    true,                            // enables navigation with a dropdown menu of chapters, determined by the "rel" attribute, requires 'menu'

                    shadows:            true,                            // display shadows on page animations
                    shadowTopFwdWidth:  166,                             // shadow width for top forward anim
                    shadowTopBackWidth: 166,                             // shadow width for top back anim
                    shadowBtmWidth:     50,                              // shadow width for bottom shadow

                    before:             function(){                      // callback invoked before each page turn animation
                        hideTOC();
                        hideContextPage();
                    },
                    after:              function(){                      // callback invoked after each page turn animation
                    }
                });
                
                try { Cufon.refresh(); } catch(e) {}
            }
        });//.attr('src',source);
    });
    
});