if(location.host=="www.ithome.com" || location.host == "lapin.ithome.com")
	document.domain = "ithome.com";
$(document).ready(function () {
    var cur = 0;
    var t;
    $('.an').hover(
		function () { cur = 1; t = setTimeout(function () { $('.nav-item-1').addClass('ni1-bg'); $('.nl').slideDown(100); }, 50); },
		function () { clearTimeout(t); cur = 0; t = setTimeout(function () { if (cur != 1) { $('.nl').slideUp(100, function () { $('.nav-item-1').removeClass('ni1-bg'); }); } }, 50); }
	);

    /* IT圈 */
    $('.quan').hover(
		function () { t = setTimeout(function () { $('.nav-item-5').addClass('ni1-bg'); $('.nlquan').slideDown(100); }, 50); },
		function () { clearTimeout(t); $('.nlquan').slideUp(100, function () { $('.nav-item-5').removeClass('ni1-bg'); }); }
	);

    /* 顶部菜单 */
    $('.dm').hover(
		function () { var e = $(this); t = setTimeout(function () { e.find('.menu').stop().slideDown(200); }, 50); $(this).find('.item-link').addClass('dm_hover'); },
		function () { clearTimeout(t); $(this).find('.menu').stop().slideUp(150); $(this).find('.item-link').removeClass('dm_hover'); }
	);

    /* 搜索菜单 */
    $('.item-link-4').click(function () {
        $('.view_search').stop().slideToggle(300, function () { $('.sc').fadeIn(); $('#searchTextbox').focus(); $('.item-link-4').addClass('il_4'); });
    });

    /* 高级搜索 */
    $('#searchTextbox').click(function () {
        //$('.sc').css({'background':'#9e0021'});
        $('.extra_sc').slideDown(300);
        //$('.sc button').addClass('on');
        clearTimeout(t);
    });

    $('.sc').mouseleave(function () {
        t = setTimeout(function () {
            //$('.sc').css({'background':'none'});
            $('.extra_sc').slideUp(300);
            //$('.sc button').removeClass('on');
        }, 500);
    });

});

/* 侧边浮动内容 */
lastScrollY = 0;
function gotop() {
    var diffY;
    if (document.documentElement && document.documentElement.scrollTop)
        diffY = document.documentElement.scrollTop;
    else if (document.body)
        diffY = document.body.scrollTop;
    else
    {/*Netscape stuff*/ }
    percent = .1 * (diffY - lastScrollY);
    if (percent > 0) percent = Math.ceil(percent);
    else percent = Math.floor(percent);
    lastScrollY = lastScrollY + percent;

    if (lastScrollY < 100) { $("#gotop").fadeOut('fast'); } else { $("#gotop").fadeIn('fast'); }
}
var commentText = "评论";
if (document.domain.indexOf("quan.ithome.com") >= 0)
{
	commentText = "回复";
}
gotopcode = ""
gotopcode1 = " \
	<div id=\"side_func\"> \
	<!--<a class=\"sfa lapin\" href=\"http://www.lapin365.com/\" title=\"辣品\"><span class=\"text1\"><img src=//img.ithome.com/images/side/lapin.png width=50></span><span class=\"text2\" style=\"display:none;\">辣品</span></a>--> \
		<a class=\"sfa app\" href=\"http://m.ruanmei.com/d/it/\" target=\"_blank\" >App</a> \
      <a class=\"sfa sideweixin\" href=\"http://m.ruanmei.com/d/it/\" target=\"_blank\" >公众号</a> \
      <a class=\"sfa tougao\" href=\"//dyn.ithome.com/tougao/\" target=\"_blank\" >投稿</a> \
		<a class=\"sfa comment\" id=\"gocomm\" href=\"#ifcomment\" onclick=\"javascript:goanswer();\">" + commentText + "</a> \
	<a class=\"sfa gotop\" id=\"gotop\" href=\"javascript:;\" title=\"顶部\" onfocus=\"this.blur()\" style=\"display:none\">顶部</span></a> \
	</div>"

document.write(gotopcode);
//$('#side_func').prependTo('body');
window.setInterval("gotop()", 500);
$('#side_func a.lapin').hover(
	function () { $(this).find('span.text1').css({ 'display': 'none' }); $(this).find('span.text2').css({ 'display': 'block' }); },
	function () { $(this).find('span.text2').css({ 'display': 'none' }); $(this).find('span.text1').css({ 'display': 'block' }); }
);
$('#side_func a.app,#side_func .papp').hover(
	function () { $(".papp").show();},
	function () { $(".papp").hide(); }
);
$('#side_func a.sideweixin,#side_func .pweixin').hover(
	function () { $(".pweixin").show(); },
	function () { $(".pweixin").hide(); }
);

$('#side_func .papp').hover(
	function () { $(".papp").show(); },
	function () { $(".papp").hide(); }
);

$("#gotop").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 200);
    return false;
});

$('#gocomm,.pti_comm').click(function () {
    var href = $(this).attr("href");
    var pos = $(href).offset().top - 35;
    $("html,body").animate({ scrollTop: pos }, 200);
    return false;
});

