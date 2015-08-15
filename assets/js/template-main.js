var posts = 5, /* number of posts per page ??? */
    num = 4, /* pages in the bottom */
    previous = "&#171;",
    next = "&#187;";
var G = "/",
    C = location.href,
    H, D, B, F;
I();

function loophalaman(a) { // a = total posts
    var b = "";
    nomerkiri = parseInt(num / 2); // number left
    if (nomerkiri == num - nomerkiri) num = nomerkiri * 2 + 1;
    mulai = B - nomerkiri; // start
    if (mulai < 1) mulai = 1;
    maksimal = parseInt(a / posts) + 1; // maximum
    if (maksimal - 1 == a / posts) maksimal = maksimal - 1;
    akhir = mulai + num - 1; // end
    if (akhir > maksimal) akhir = maksimal;
    b += "<span class='pages'>Page " + B + " of " + maksimal + "</span>";
    var c = parseInt(B) - 1;
    if (B > 1)
        if (B == 2)
            if (D == "page") b += '<a href="' + G + '">' + previous + "</a>";
            else b += '<a href="/search/label/' + F + "?&max-results=" + posts + '">' + previous + "</a>";
        else if (D == "page") b += '<a href="#" onclick="redirectpage(' + c + ');return false">' + previous + "</a>";
        else b += '<a href="#" onclick="redirectlabel(' + c + ');return false">' + previous + "</a>";
    for (var d = mulai; d <= akhir; d++)
        if (B == d) b += '<span class="current">' + d + "</span>";
        else if (d == 1)
            if (D == "page") b += '<a href="' + G + '">1</a>';
            else b += '<a href="/search/label/' + F + "?&max-results=" + posts + '">1</a>';
        else if (D == "page") b += '<a href="#" onclick="redirectpage(' + d + ');return false">' + d + "</a>";
        else b += '<a href="#" onclick="redirectlabel(' + d + ');return false">' + d + "</a>";
    var e = parseInt(B) + 1;
    if (B < maksimal)
        if (D == "page") b += '<a href="#" onclick="redirectpage(' + e + ');return false">' + next + "</a>";
        else b += '<a href="#" onclick="redirectlabel(' + e + ');return false">' + next + "</a>";
    var f = document.getElementsByName("pageArea");
    var g = document.getElementById("blog-pager");
    for (var p = 0; p < f.length; p++) f[p].innerHTML = b;
    if (f && f.length > 0) b = "";
    if (g) g.innerHTML = '<div class="pagenavi">' + b + "</div>"
}

function hitungtotaldata(a) {
    var b = a.feed;
    var c = parseInt(b.openSearch$totalResults.$t, 10);
    loophalaman(c)
}

function I() {
    var a = C;
    if (a.indexOf("/search/label/") != -1)
        if (a.indexOf("?updated-max") != -1) F = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max"));
        else F = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"));
    if (a.indexOf("?q=") == -1 && a.indexOf(".html") == -1)
        if (a.indexOf("/search/label/") == -1) {
            D = "page";
            if (C.indexOf("#PageNo=") != -1) B = C.substring(C.indexOf("#PageNo=") + 8, C.length);
            else B = 1;
            document.write('<script src="' + G + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata">\x3c/script>')
        } else {
            D = "label";
            if (a.indexOf("&max-results=") == -1) posts = 20;
            if (C.indexOf("#PageNo=") != -1) B = C.substring(C.indexOf("#PageNo=") + 8, C.length);
            else B = 1;
            document.write('<script src="' + G + "feeds/posts/summary/-/" + F + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" >\x3c/script>')
        }
}

function redirectpage(a) {
    jsonstart = (a - 1) * posts;
    H = a;
    var b = document.getElementsByTagName("head")[0];
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.setAttribute("src", G + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    b.appendChild(c)
}

function redirectlabel(a) {
    jsonstart = (a - 1) * posts;
    H = a;
    var b = document.getElementsByTagName("head")[0];
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.setAttribute("src", G + "feeds/posts/summary/-/" + F + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    b.appendChild(c)
}

function finddatepost(a) {
    post = a.feed.entry[0];
    var b = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var c = encodeURIComponent(b);
    if (D == "page") var d = "/search?updated-max=" + c + "&max-results=" + posts + "#PageNo=" + H;
    else var d = "/search/label/" + F + "?updated-max=" + c + "&max-results=" + posts + "#PageNo=" + H;
    location.href = d
}! function(a) {
    a(function() {
        a.support.transition = function() {
            var a = function() {
                var a = document.createElement("bootstrap"),
                    b = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    c;
                for (c in b)
                    if (a.style[c] !== undefined) return b[c]
            }();
            return a && {
                    end: a
                }
        }()
    })
}(window.jQuery);

jQuery(function() {
    jQuery('#searchform input[type="text"]').val("Search...");
    jQuery('#searchform input[type="text"]').focus(function() {
        if (jQuery(this).val() == "Search...") jQuery(this).val("")
    });
    jQuery('#searchform input[type="text"]').blur(function() {
        if (jQuery(this).val() == "") jQuery(this).val("Search...")
    });
    jQuery(".tips").tooltip();
    jQuery(".bl_popover").popover();
    var d = jQuery(".entry-video iframe, .entry-video object, .related-video iframe, .related-video iframe"),
        $fluidEl = jQuery("#content");
    $fluidElRelated = jQuery("#related-posts > div").first();
    d.each(function() {
        var a = this.height === "" ? 473 : this.height;
        var b = this.width === "" ? 840 : this.width;
        jQuery(this).attr("data-aspectRatio", a / b).removeAttr("height").removeAttr("width")
    });
    jQuery(window).resize(function() {
        var b = $fluidEl.width();
        var c = $fluidElRelated.width();
        d.each(function() {
            var a = jQuery(this);
            if (a.parent().hasClass("related-header")) a.width(c).height(c * a.attr("data-aspectRatio"));
            else a.width(b).height(b * a.attr("data-aspectRatio"))
        })
    }).resize()
});

function social_share(a) {
    window.open(a, "fbshare", "height=450,width=760,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
}

/* another block */

function processTranslationLinks() {
    var langs = ['en', 'pt', 'es', 'tl'];
    for(var i=0; i<langs.length; i++){
        var lang = langs[i];
        var selector = $('#lang-selector-' + lang);
        if(selector.length === 1) {
            var transLink = $('.translation-link-' + lang);
            if(transLink.length === 1) {
                var href = transLink.attr('href');
                if(!href){
                    href = transLink.data('href');
                }
                if(href) {
                    selector.attr('href', href);
                }
            }
        }
    }
}

$('.go-top').click(function(){$('.st-content').animate({scrollTop:0},'slow');$('html, body').animate({scrollTop:0},'slow');return false;});