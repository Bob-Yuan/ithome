/* IT之家 PC Common JS 20161220 */
$(document).ready(function () {
    $(document).click(function () {
        $(".view_setting").slideUp(300,
            function () {
                $('.item-link-5').removeClass('il5-bg');
            });
    });
    $("img").each(function () {
        $(this).parent("a").css("border", "0");
    });
    $(".view_setting").click(function (e) {
        e.stopPropagation();
    });

    /* 首页新闻标题 */
    var HOMENL = $('.rt .nlst .new-list ul li');
    HOMENL.hover(function () {
        if ($(this).find(".title a").is(":visible")) {
            $(this).addClass('mnow');
            $(this).find('.date').hide();
        }

    },
        function () {
            $(this).removeClass('mnow');
            $(this).find('.date').show();
        });

    /* 新闻分类切换 */
    var CTULA = $('.ct ul li a');
    CTULA.click(function () {
        CTULA.removeClass('current');
        $(this).addClass('current');
        var NUMB = $(this).parent().index() + 1;
        //alert(String(NUMB));
        if ($(this).attr('class') == 'current') {
            $('.lst').css({
                'display': 'none'
            });
            $('.lst-' + String(NUMB)).css({
                'display': 'block'
            });
        } else {
            $('.lst').css({
                'display': 'none'
            });
        }
    });

    /* 页码切换 */
    var NLNUM = $('.page_num a');
    NLNUM.click(function () {
        NLNUM.removeClass('current');
        $(this).addClass('current');
        var NUMB = $(this).index() + 1;
        //alert(String(NUMB));
        if ($(this).attr('class') == 'current') {
            $('.new-list .block').css({
                'display': 'none'
            });
            $('.new-list-' + String(NUMB)).css({
                'display': 'block'
            });
        } else {
            $('.new-list .block').css({
                'display': 'none'
            });
        }
    });

    /* 浮动内容 */
    $(window).scroll(function () {
        var bodyTop = 0,
            sideTop = $('.sidebar ul').eq(0).height() + 142;
        if (typeof window.pageYOffset != 'undefined') {
            bodyTop = window.pageYOffset;
        } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            bodyTop = document.documentElement.scrollTop;
        } else if (typeof document.body != 'undefined') {
            bodyTop = document.body.scrollTop;
        }
        if (bodyTop > sideTop) {
            $('#crf1').css({
                'position': 'fixed',
                'top': '53px'
            });
        } else {
            $('#crf1').css({
                'position': 'relative',
                'top': '0'
            });
        }
    });

    /* 侧边分享按钮 */
    $('#goshare').mouseleave(function () {
        clearTimeout(hideTimer);
        $('#bdshare_s').removeAttr('te');
        hideTimer = setTimeout(function () {
            if ($('#bdshare_s').attr('te') != 'displayed') {
                $('#bdshare_l').fadeOut(200,
                    function () {
                        $('#bdshare_s').prependTo('body');
                    });
            }
        },
            100); //鼠标移除元素区域子元素消失
    }).mouseenter(function () {
        $('#bdshare_s').attr('te', 'displayed');
        hideTimer = setTimeout(function () {
            //$('#bdshare_s').appendTo('#side_func');
            $('#bdshare_l').addClass('show_bds').fadeIn(200);
        },
            500); //鼠标滑过元素1秒钟显示子元素
        $('#bdshare_l').mouseenter(function () {
            $('#bdshare_s').attr('te', 'displayed');
        }).mouseleave(function () {
            hideTimer = setTimeout(function () {
                $('#bdshare_l').fadeOut(200,
                    function () {
                        $('#bdshare_s').prependTo('body');
                        $('#bdshare_s').removeAttr('te');
                    });
            },
                100); //鼠标移除元素区域子元素消失
        });
    });

    $('.related_post a').hover(function () {
        $(this).parent().find('span').addClass('rp_span');
    },
        function () {
            $(this).parent().find('span').removeClass('rp_span');
        });

    $('#searchTextbox').bind('keydown',
        function (event) {
            if (event.keyCode == "13") {
                $(".sc button").click();
                return false;
            }
        });

    if (document.getElementById("ifcomment")) {

        var viewHeight =  $(window).height();
        var contentHeight = $(".post_content").height();
        if (viewHeight > contentHeight) {
            if ($("#ifcomment").attr("src") == null) {
                $("#ifcomment").attr("src", '//dyn.ithome.com/comment/' + $("#ifcomment").attr("data"));
            }
        }


        $(window).scroll(function () { //绑定浏览器窗口对象
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();

            if (scrollTop + windowHeight + 300 >= scrollHeight  || windowHeight>contentHeight ) {
                if ($("#ifcomment").attr("src") == null) {
                    $("#ifcomment").attr("src", '//dyn.ithome.com/comment/' + $("#ifcomment").attr("data"));
                }
            }
            if (scrollTop + windowHeight + 100 >= scrollHeight) {

                    try {
                        document.getElementById('ifcomment').contentWindow.AutoifHeight();
                    } catch (e) { }

                if ($("#ifcomment").contents().find("#commentlatest").is(':checked')) {
                    $("#ifcomment").contents().find("#latestpagecomment")[0].click();
                } else {
                    if ($("#ifcomment").contents().find("#pagecomment").length > 0)
                        $("#ifcomment").contents().find("#pagecomment")[0].click();
                }
            }
        });
    }
    //$.getScript("//dyn.ithome.com/js/login");

    $('body').on("click",
        ".login",
        function () {
            // popWin.showWin("400", "620", "软媒通行证登录", "//my.ruanmei.com/?source=ithome");
            popWin.showWin("400", "620", "软媒通行证登录", "/register/");
        });
    $('body').on("click",
        "#btnLogout",
        function () {
            var url = "https://www.ithome.com/logout";
            $.getScript(url).done(function () {
                location.reload();
            });
        });
    $(".refresh a").on({
        click: function () {
            location.reload();
        }
    });



    $(".post_content").delegate("a", "click", function () {
        if ($(this).attr("href").indexOf("ithome:/") === 0)
            alert("网页端暂时不支持购买，请下载IT之家App进行购买");
    });

});
/* jQuery Document End */

//hd_float = "<div id=\"hd_float\" style=\"position:fixed;left:50%;bottom:175px;margin-left:-740px;width:190px;\"><a id='close-float' style='height:20px;clear:both;text-align:right;font-size:20px; cursor: pointer;display:block;float:right;margin-right:30px;' >&times;</a><a class=\"close\" href=\"https://s.click.taobao.com/4cYlPHw\" target=\"_blank\" style=\"display:block;width:209px;height:175px;background:url(https://img.lapin365.com/2019nian/pcleft.png) no-repeat;\"></a></div>"
{
    /*
    var floatLinkTop = "https://s.click.taobao.com/n54KHLw";
        var floatLinkBottom = "https://u.jd.com/TQNzln";
        var hd_float = "<div id=\"hd_float\" style=\"position:fixed;left:50%;bottom:220px;margin-left:-770px;width:190px;\"><div class=\"close\" style=\"display:block;width:220px;height:240px;background:url(https://img.lapin365.com/hbf2.20181111.png) no-repeat;\"><a href=\"" + floatLinkTop + "\" style='display:block;width:100%;height:65%' target=\"_blank\"></a><a href=\"" + floatLinkBottom + "\" style='display:block;width:100%;height:35%' target=\"_blank\"></a></div></div>";
    */
}
//document.write(hd_float);
//$('#hd_float').prependTo('body');

/* 修复Flash遮挡 */
$('embed').attr('wmode', 'transparent');

if ((navigator.userAgent.match(/(iPhone|iPod|Android|Windows Phone)/i))) {
    app_recom = $('<a href="//m.ithome.com" class="go_wap">进入WAP版</a>');
    app_recom.prependTo('#hd');
    $('body').css({
        'padding-top': '86px'
    });
}

function connectLogin(type) {
    var url = "",
        name = "",
        width = "",
        height = "";
    var clienttime = parseInt((new Date).getTime() / 1000)

    switch (type) {
        case "Sina":
            url = "//www.ithome.com/ithome/openplat/sina/login.aspx";
            name = "SinaLogin";
            width = 562;
            height = 380;
            break;
        case "QQ":
            url = "//www.ithome.com/openplat/qq/login";
            name = "qq";
            width = 600;
            height = 380;
            break;
        case "WX":
            url = "//www.ithome.com/ithome/openplat/wx/login.aspx";
            name = "wx";
            width = 580;
            height = 660;
            break;

    }
    if (url) {
        url += "?clienttime=" + clienttime
        var l = (window.screen.width - width) / 2,
            t = (window.screen.height - height) / 2;
        window.open(url,
            name,
            "width=" +
            width +
            ",height=" +
            height +
            ",left=" +
            l +
            ",top=" +
            t +
            ",menubar=0,scrollbars=0,resizable=0,status=0,titlebar=0,toolbar=0,location=1");
    }

}


$("body").append("<div style='display:none;'>" + $(".con-recom").css("display") + "</div>");

if ($.cookie('ipadapp') == null && navigator.userAgent.match(/(iPad)/i)) {
    app_top =
        '<div class="app_recom fly_down"><div class="close"><a href="javascript:;" id="close_app"><img src="//img.ithome.com/images/v2.3/close.png" width="26" height="26"></a></div><a id="a_ad" href="//m.ruanmei.com/d/it/" style="display: block;" target="_blank"><img src="//img.ithome.com/images/v2.3/ipad.png"></a></div>';
    document.write(app_top);
    $('.app_top').prependTo('body');
    $('#close_app').click(function () {
        $('body').removeClass('app');
        $('.fly_down').remove();
        $.cookie('ipadapp',
            'ipadhide',
            {
                expires: 7
            });
    });
}

function goanswer() {
    location.href = "#ifcomment";
}

function AddToSideBlock(htmlCode) { $('#lapin').html(htmlCode) }

function topcallback(html) { $('#toplogin').html(html); }

function showFullSrcModal(link, imgurl, width, height, domain, openInNew, clickBgClose, link2) {
    var close1 = false;
    var close2 = false;
    if (getCookie("fullsrcmodal") == null) {
        if ($(".rm-modal-bg").length == 0) {
            if (link2 == undefined || link2 == "") {
                var html = "<div class='rm-modal-bg' style='display:none; position: fixed; top: -5000px; bottom: -5000px; left: -5000px; right: -5000px; z-index: 99999; background: rgba(43, 43, 43, 0.8);'></div>";
                html += "<div class='rm-modal-body' style='display:none;position:fixed; top:0; bottom:0; left:0; right:0; z-index:100000; text-align:center;'>";
                html += "<div class='rm-modal-content' style='position: absolute; top: 50%; left: 50%; margin-top: -" +
                    (height / 2) + "px; margin-left: -" + (width / 2) + "px; width: " + width + "px; height: " + height + "px; color: #2b2e38;'></a>";
                html += "<div style='overflow:hidden; display:block;width: " + width + "px; height: " + height + "px;background: url(" + imgurl + ") no-repeat center center;'><a href='" + link + "' " + (openInNew ? "target='_blank'" : "") + " style='display:block;width:100%; height:100%;'></a></div>";
            } else {
                var html = "<div class='rm-modal-bg' style='display:none; position: fixed; top: -5000px; bottom: -5000px; left: -5000px; right: -5000px; z-index: 99999; background: rgba(43, 43, 43, 0.8);'></div>";
                html += "<div class='rm-modal-body' style='display:none;position:fixed; top:0; bottom:0; left:0; right:0; z-index:100000; text-align:center;'>";
                html += "<div class='rm-modal-content' style='background:url(" + imgurl + ") center center no-repeat;position: absolute; top: 50%; left: 50%; margin-top: -" +
                    (height / 2) + "px; margin-left: -" + (width / 2) + "px; width: " + width + "px; height: " + height + "px; color: #2b2e38;'></a>";
                html += "<a class='rm-modal-link1' href='" + link + "' " + (openInNew ? "target='_blank'" : "") + " style='float:left;width:49%; height:" + height + "px;'></a>";
                html += "<a class='rm-modal-link2'  href='" + link2 + "' " + (openInNew ? "target='_blank'" : "") + " style='float:right;width:49%; height:" + height + "px;'></a>";
            }
            html += "<span class='rm-modal-close'></span></div ></div>";
            html += "<style>.rm-modal-close {position: absolute; top: -45px; right: -45px; display: block; width: 45px; height:45px; text-align: center; color: rgba(255, 255, 255, 0.6); cursor: pointer; background: rgba(0, 0, 0, 0.6); border-radius: 25px;}";
            html += ".rm-modal-close:after { font-family: Arial, \"Helvetica CY\", \"Nimbus Sans L\", sans-serif!important; font-size: 35px; line-height: 46px; content: '\\00d7'; text-align: center;}";
            html += ".rm-modal-close:hover { background: rgba(0, 0, 0, 0.9); color: rgba(255, 255, 255, 0.9); transition: color .3s ease-in-out; transition: background .3s ease-in-out; }</style>"
            $("body").append(html);
        }

        showModal();

        if (clickBgClose) {
            $(".rm-modal-bg").click(function () {
                closeModal();
            });
            if (link2 == undefined || link2 == "") {
                $(".rm-modal-body").click(function () {
                    closeModal();
                });
            } else {
                $(".rm-modal-link1").click(function () {
                    close1 = true;
                    if (close1 && close2) {
                        closeModal();
                    }
                });
                $(".rm-modal-link2").click(function () {
                    close2 = true;
                    if (close1 && close2) {
                        closeModal();
                    }
                });
            }
        }
        $(".rm-modal-close").click(function () {
            closeModal();
        });
    }

    function showModal() {
        $(".rm-modal-bg").css("display", "block");
        $(".rm-modal-body").css("display", "block");
        closeCount = 2;
    }

    function closeModal() {
        $(".rm-modal-bg").css("display", "none");
        $(".rm-modal-body").css("display", "none");

        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
        //exp.setFullYear(exp.getFullYear(), exp.getMonth(), exp.getDay());
        //exp.setHours(0);
        //exp.setMinutes(0);
        //exp.setSeconds(0);
        //exp.setTime(exp.getTime() - 12 * 60 * 60 * 1000);
        document.cookie = "fullsrcmodal=true;path=/;domain=" + domain + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
}

function showTopBanner(link, imgurl, height, cookieDomain, openInNew, clickBodyClose) {
    if (getCookie("topestbanner") == null) {
        var html = '<div id="topest-banner" style="height:' +
            height +
            'px; width: 100%; background: #e4430e; top:0px; position:fixed; z-index:99999999999;">';
        html += '<div style="height:' +
            height +
            'px; width:1100px; margin: 0 auto; display: block;position: relative;">';
        html += '<a id="a-topest-link" href="' +
            link +
            '" ' +
            ' style="height:' +
            height +
            'px; width: 1100px; margin: 0 auto; display: block; background:url(' +
            imgurl +
            ') no-repeat center center; "></a>';
        html +=
            '<span id="btn-topest-close" style="cursor:pointer; position: absolute; right: 5px; top: 5px; font-size: 14px; color: #FFF; background: rgb(45,45,45); opacity: .3; height:20px; filter: alpha(opacity=30); width: 20px; text-align: center; line-height: 17px;">x</span>';
        html += '</div></div>';
        $(html).insertBefore($(document.body.firstChild));
        $("body").css("padding-top", (height + 35) + "px");

        $("#hd").css("top", height + "px");

        if (clickBodyClose) {
            $("#a-topest-link").click(function () {
                closeTopestBanner();
            });
        }
        $("#btn-topest-close").click(function () {
            closeTopestBanner();
            return false;
        });
    }

    function closeTopestBanner() {
        $("#topest-banner").css("display", "none");
        $("body").css("padding-top", "35px");
        $("#hd").css("top", "0px");


        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
        document.cookie = "topestbanner=true;path=/;domain=" + cookieDomain + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
}

function showFloat(url, pic, width, cookieDomain, url2) {
    if (getCookie("leftFloat") == null || getCookie("leftFloat") == "") {

        var hd_float = "";
        if (url2 == "" || url2 == undefined || url2 == null) {
            hd_float = "<div id=\"hd_float\" style=\"position:fixed;left:50%;bottom:175px;margin-left:-740px;width:" + width + "px;\"><a id='close-float' style='height:20px;clear:both;text-align:right;font-size:20px; cursor: pointer;display:block;float:right;margin-right:30px;' >&times;</a><a class=\"close\" href=\"" + url + "\" target=\"_blank\" style=\"display:block;width:209px;height:175px;background:url(" + pic + ") no-repeat;\"></a></div>";
        } else {
            hd_float = "<div id=\"hd_float\" style=\"position:fixed;left:50%;bottom:220px;margin-left:-770px;width:" + width + "px;\"><div class=\"close\" style=\"display:block;width:220px;height:240px;background:url(" + pic + ") no-repeat;\"><a href=\"" + url + "\" style='display:block;width:100%;height:65%' target=\"_blank\"></a><a href=\"" + url2 + "\" style='display:block;width:100%;height:35%' target=\"_blank\"></a></div></div>";
        }

        $(hd_float).insertBefore($(document.body.firstChild));
    }

    $("#close-float").click(function() {
       $("#hd_float").hide();

        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
        document.cookie = "leftFloat=true;path=/;domain=" + cookieDomain + ";expires=" + exp.toGMTString();
    });
}

//showFloat("https://u.jd.com/7OboxQ", "https://img.lapin365.com/20191231/www-left1.png", 190, ".ithome.com", "");

//showFullSrcModal("https://u.jd.com/ZcWbtW", "https://img.lapin365.com/20191231/www-700x470.png", 700, 470, ".ithome.com", true, true,"");

//showTopBanner("http://t.cn/RQgOV9h", "//img.ithome.com/images/jd-top.jpg", 80, ".ithome.com", true, false);
