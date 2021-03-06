__author__ = 'boy'
__date__ = '2019/12/23 1:36'

import MySQLdb
import time


html1 = """
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>美团外卖回应外卖员杀人事件：因取货问题发生口角 - 美团外卖 - IT之家</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
    <meta name="description" content="针对武汉一外卖小哥持刀杀人致死事件，美团外卖发 表声明称，事件起因于该配送员到超市取货品时，因取货问题与店员发生口角酿成悲剧" />
    <meta name="keywords" content="美团外卖,IT资讯,业界" />
    <meta name="format-detection" content="telephone=no"/>
    <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <link rel="canonical" href="https://www.ithome.com/0/464/497.htm" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link href="//www.ithome.com/css/style.css" rel="stylesheet" type="text/css" />
    <link href="//img.ithome.com/file/js/prettify/prettify.css" rel="stylesheet" />
    <style type="text/css">
        .content{
            float:left;
            width:1080px;
        }
        .post_content{
            margin-left:50px;
            margin-right:50px;
        }
    </style>
</head>

<body class="single it">
<script src="https://dup.baidustatic.com/js/ds.js"></script>
<link rel="stylesheet" href="//www.ithome.com/css/top.css?r=2017021312" type="text/css" />
<script src="//img.ithome.com/file/js/ua.js?r=2017110" type="text/javascript"></script>

<div id="hd">
    <div id="nav">
        <div class="an">
            <a href="//www.ithome.com/" class="nav-item nav-item-1 sel">IT之家</a>
            <div class="nl">
                <div class="nl-con">
                    <div class="bx bx1">
                        <h2 class="cate-title">资讯</h2>
                        <ul class="cate-list">
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//it.ithome.com/">IT资讯</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//discovery.ithome.com/">科学频道</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="bx bx1">
                        <h2 class="cate-title">极客</h2>
                        <ul class="cate-list">
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//mobile.ithome.com/">玩手机</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//android.ithome.com/">安卓之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//digi.ithome.com/">数码之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//next.ithome.com/">智能时代</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="bx bx2">
                        <h2 class="cate-title">微软</h2>
                        <ul class="cate-list">
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//wp.ithome.com/">WP之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//win10.ithome.com/">Win10之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//win8.ithome.com/">Win8之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//win7.ithome.com/">Win7之家</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="bx bx3">
                        <h2 class="cate-title">苹果</h2>
                        <ul class="cate-list">
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//iphone.ithome.com/">iPhone之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//ipad.ithome.com/">iPad之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//mac.ithome.com/">Mac之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//ios.ithome.com/">iOS之家</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="bx bx5 nb">
                        <h2 class="cate-title">资源</h2>
                        <ul class="cate-list">
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//soft.ithome.com/">软件之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//zhuti.ithome.com/">主题之家</a>
                                </span>
                            </li>
                            <li>
                                <span class="cate-sub-title">
                                    <a href="//www.ithome.com/bibei/">装机必备</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="all_cate">
                    <a href="//www.ithome.com/sitemap/">全部分类&gt;&gt;</a>
                </div>
            </div>
        </div>
        <ul class="nav_list">
            <li>
                <a target="_blank" href="//www.lapin365.com/" class="nav-item nav-item-7">辣品</a>
            </li>
            <li class="quan">
                <a href="//quan.ithome.com/" class="nav-item nav-item-5" target="_blank">IT圈</a>
                <div class="nlquan">
                    <a href="//quan.ithome.com/talk/">科技畅谈</a>
                    <a href="//quan.ithome.com/geek/">极客圈</a>
                    <a href="//quan.ithome.com/android/">安卓圈</a>
                    <a href="//quan.ithome.com/ios/">iOS圈</a>
                    <a href="//quan.ithome.com/win10/">Win10圈</a>
                    <a href="//quan.ithome.com/win10mobile/">Win10手机圈</a>
                    <a href="//quan.ithome.com/ruanmei/">软媒产品</a>
                    <a href="//quan.ithome.com/helpcenter/">站务处理</a>
                </div>
            </li>
        </ul>
        <div class="tb-nav">
            <div class="tb-item">
                <a  href="//dyn.ithome.com/tougao/"  target="_blank"  class="item-link">投稿</a>
            </div>
            <div class="tb-item dm"><a href="javascript:;" class="item-link item-link-2">订阅</a>
                <div id="dy" class="menu feed">
                    <ul class="mn_con">
                        <li>
                            <a href="//www.ithome.com/rss/">RSS订阅</a>
                        </li>
                        <li>
                            <a href="#" onclick="window.external.addFavorite('http://www.ithome.com/', 'IT之家 - ithome.com')">收藏IT之家</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tb-item dm">
                <a href="javascript:;" class="item-link item-link-3" id="rm_app">软媒应用</a>
                <div id="app" class="menu app">
                    <ul class="mn_con">
                        <li><a href="https://m.ruanmei.com/" target="_blank">软媒App应用</a></li>
                        <li><a href="http://qiyu.ruanmei.com/" target="_blank">旗鱼浏览器</a></li>
                        <li><a href="http://mofang.ruanmei.com/" target="_blank">软媒魔方</a></li>
                        <li><a href="http://sj.ruanmei.com/" target="_blank">软媒时间</a></li>
                        <li><a href="http://www.cooldock.com/" target="_blank">酷点桌面</a></li>
                    </ul>
                </div>
            </div>
            <div class="tb-item dm">
                <div id="toplogin"></div>
            </div>
        </div>
    </div>
</div>
<div class="view view_setting">
    <div class="set_con">
        <p class="c_st">
            <span class="set_op">内容字号：</span>
            <a href="javascript:;" id="fs1">默认</a>
            <span class="v"></span>
            <a href="javascript:;" id="fs2">大号</a>
            <span class="v"></span>
            <a href="javascript:;" id="fs3">超大号</a>
        </p>
        <p class="c_st">
            <span class="set_op">段落设置：</span>
            <a href="javascript:;" id="indt">取消段首缩进</a>
            <a href="javascript:;" id="noindt" class="hide">段首缩进</a>
        </p>
        <p class="g_st">
            <span class="set_op">字体设置：</span>
            <a href="javascript:;" id="yahei">切换到微软雅黑</a>
            <a href="javascript:;" id="song" class="hide">切换到宋体</a>
        </p>
    </div>
</div>
<div id="top5" class="clearfix">
    <a href="//www.ithome.com" id="logo">
        <img src="//img.ithome.com/images/v2.3/ithome.logo.png" alt="IT之家" />
    </a>
    <div class="col">
        <a href="//it.ithome.com/">业界资讯</a>
        <a href="//soft.ithome.com/">软件之家</a>
    </div>
    <div class="col">
        <a href="//win10.ithome.com/">Win10之家</a>
        <a href="//wp.ithome.com/">WP之家</a>
    </div>
    <div class="col">
        <a href="//iphone.ithome.com/">iPhone之家</a>
        <a href="//ipad.ithome.com/">iPad之家</a>
    </div>
    <div class="col">
        <a href="//android.ithome.com/">安卓之家</a>
        <a href="//digi.ithome.com/">数码之家</a>
    </div>
    <div class="col last">
        <a href="//digi.ithome.com/labs/">评测中心</a>
        <a href="//next.ithome.com/">智能设备</a>
    </div>
    <div class="sc">
        <form action="//dyn.ithome.com/search" target="_blank">
            <input type="hidden" name="s" value="10375816656400526905">
            <input id="searchTextbox" class="focus" size="24" name="q" accesskey="s" autosave="baidu" results="8" autocomplete="off">
            <button type="button" name="sa" onclick='location.href="//dyn.ithome.com/search/adt_all_"+ $("#searchTextbox").val() +"_0.html";'>搜索</button>
        </form>
        <div class="extra_sc">精准搜索请尝试：
            <a href="//dyn.ithome.com/search/" target="_blank" class="js" title="精确搜索">精确搜 索</a>
        </div>
    </div>
</div>
<div id="tt50">
    <div id="hl-toutiao"></div>
</div>
<script src="//img.ithome.com/file/js/money/pc/content1.js"></script>
<script>if (location.host === "www.ithome.com" || location.host === "lapin.ithome.com") document.domain = "ithome.com";</script>
<div id="con">
    <div id="wrapper">
        <div class="content fl">
            <div class="current_nav">
                <a href="//www.ithome.com/">首页</a>
                <span class="sub">&gt;</span>
                <a href="https://it.ithome.com/">IT资讯</a>
                <span class="sub">&gt;</span>
                <a href="https://it.ithome.com/ityejie/">业界</a>
            </div>
"""

html2 = """
        </div>
    </div>
</div>
<div id="ft">
    <div class="lk pre1">
        <div class="bx1">
            <p>
                <strong><a href="//www.ruanmei.com/">软媒旗下网站</a>：</strong>
                <span class="link">
                    <a href="//www.ithome.com/" target="_blank">IT之家</a>
                    <span class="v">|</span>
                    <a href="//www.lapin365.com/" target="_blank">辣品 - 超值导购，优惠券</a>
                    <span class="v">|</span>
                    <a href="//quan.ithome.com/" target="_blank">IT圈（Win10/WP8.1/Win7论坛）</a>
                    <span class="v">|</span>
                    <a href="http://www.6655.com/" target="_blank" class="wz">6655网址之家</a>
                    <span class="v">|</span>
                    <a href="//win10.ithome.com/" target="_blank">Win10之家</a>
                    <span class="v">|</span>
                    <a href="http://www.win8china.com/" target="_blank">Win8之家</a>
                    <span class="v">|</span>
                    <a href="//www.win7china.com/" target="_blank">Win7之家</a>
                    <span class="v">|</span>
                    <a href="http://www.vista123.com/" target="_blank">Vista之家</a>
                </span>
            </p>
            <p>
                <strong>软媒旗下软件：</strong>
                <span class="link">
                    <a href="//mofang.ruanmei.com/" target="_blank">魔方</a>
                    <span class="v">|</span>
                    <a href="//qiyu.ruanmei.com/" target="_blank">旗鱼浏览器（ 极速内核）</a>
                    <span class="v">|</span>
                    <a href="//mytime.ruanmei.com/" target="_blank">云日历</a>
                    <span class="v">|</span>
                    <a href="http://www.cooldock.com/" target="_blank">酷点桌面</a>
                    <span class="v">|</span>
                    <a href="http://www.saayaa.com/" target="_blank">闪游浏览器（IE内核）</a>
                    <span class="v">|</span>
                    <a href="//www.win7china.com/windows7master/" target="_blank">Win7优化大师</a>
                    <span class="v">|</span>
                    <a href="http://www.win8china.com/windows8master/" target="_blank">Win8优 化大师</a>
                    <span class="v">|</span>
                    <a href="//win10.ithome.com/windows10master/" target="_blank">Win10优化大师</a>
                    <span class="v">|</span>
                    <a href="//m.ruanmei.com/" target="_blank">软媒手机APP应用</a>
                </span>
            </p>
        </div>
    </div>
    <div class="if">
        <div class="bx1">
            <a href="//www.ithome.com/about.htm" target="_blank">
                <strong>关于IT之家</strong>
            </a>
            <span class="v">|</span>
            <a href="//www.ruanmei.com/aboutus/" target="_blank">
                <strong>关于软媒</strong>
            </a>
            <span class="v">|</span>
            <a href="//www.ruanmei.com/contact/" target="_blank">
                <strong>联系我们</strong>
            </a>
            <span class="v">|</span>
            <a href="//www.ruanmei.com/joinus/" target="_blank">
                <strong>加入软媒</strong>
            </a>
            <span class="v">|</span>
            <a href="//m.ithome.com/" target="_blank">
                <strong>WAP版</strong>
            </a>
            <span class="v">|</span>
            <a href="//www.ithome.com/sitemap/" target="_blank">
                <strong>网站地图</strong>
            </a>
            <span class="v">|</span>
            <a href="//www.ithome.com/archiver/" target="_blank">
                <strong>Archiver</strong>
            </a>
            <span class="v">|</span>
            <a href="http://www.cike.cn/" target="_blank">
                <strong>刺客团队</strong>
            </a>
        </div>
        <div class="bx2">
            <p>IT之家，软媒旗下科技门户网站 - 爱科技，爱这里。</p>
            <p>Copyright (C)
                <a href="//www.ruanmei.com" target="_blank">RuanMei.com</a>
                , All Rights Reserved.
            </p>
            <p>
                <a href="//www.ruanmei.com/" target="_blank">软媒公司</a>
                版权所有
                <script>
                    document.write('<a href="http://www.miitbeian.gov.cn" target="_blank" rel ="nofollow">鲁ICP备11016544号-10</a>')
                </script>
            </p>
        </div>
    </div>
</div>
<script src="https://s3.pstatp.com/cdn/expire-1-M/jquery/2.1.1/jquery.min.js"></script>
<script>(window.jQuery || document.write("<script src='https://img.ithome.com/file/js/jquery/jquery.min.js'></script>"));</script>
<script src="https://s3.pstatp.com/cdn/expire-1-M/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script>(window.jQuery && window.jQuery.fn && window.jQuery.fn.cookie || document.write("<script src='https://img.ithome.com/file/js/jquery/jquery.cookie.js'></script>"));</script>
<script src="https://s3.pstatp.com/cdn/expire-1-M/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script>
<script>(window.jQuery && window.jQuery.fn && window.jQuery.fn.lazyload || document.write("<script src='https://img.ithome.com/file/js/jquery/jquery.lazyload.js'></script>"));</script>
<script src="//img.ithome.com/file/js/v2.3/top.js?r=2017021312"></script>
<script src="//img.ithome.com/file/js/jquery/popwin.js?r=2018071003"></script>
<script src="//img.ithome.com/file/js/v2.3/common.js?r=2018071302"></script>
<script type="text/javascript" src="//img.ithome.com/file/js/v2/tt.js"></script>
<script type="text/javascript" charset="utf-8">$(function () { $("img.lazy").lazyload(); });</script>
<script type="text/javascript" id="bdshare_js" data="type=tools&uid=192225"></script>
<script src="//img.ithome.com/file/js/prettify/prettify.js"></script>
<script src="//dyn.ithome.com/api/comment/count?newsid=464497"></script>
<script type="text/javascript" src="//dyn.ithome.com/grade/464497"></script>
<script>$(".newsgrade").html(gradestr)</script>
</body>
</html>
"""


class Htmloutputer(object):
    def __init__(self):
        self.day_id = 0

    def collect_data(self, db, current_url, title, date, meta, excerpt, paragraph):
        if str(title) == "" or str(paragraph) == "":
            return None
        self.day_id = self.day_id + 1

        cursor = db.cursor()
        #print(str(date)+"\n"+str(self.day_id)+"\n"+current_url+"\n"+title+"\n"+meta+"\n"+excerpt+"\n"+paragraph)
        sql = "INSERT INTO article_articles(t_date, day_id, url, title, meta, excerpt, paragraph) VALUES ('" + str(date) + "', "+str(self.day_id)+", '"+current_url+"', '"+title+"', '"+meta+"', '"+excerpt+"', '"+paragraph+"');"
        try:
            cursor.execute(sql)
            db.commit()
            return 1
        except Exception as e:
            print(e)
            print("db error")
            db.rollback()
            return None

    def output_html(self, cursor):

        sql = "select * from articles order by total_id DESC limit 1;"
        cursor.execute(sql)
        data = cursor.fetchone()
        title = data[4]
        paragraph = data[5]

        fout = open("output.html", 'wb')

        fout.write(html1.encode("utf-8"))
        fout.write(title.encode("utf-8"))
        fout.write(paragraph.encode("utf-8"))
        fout.write(html2.encode("utf-8"))

        fout.close()