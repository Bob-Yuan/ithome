/*
 //彩票
 */
//红球数量
var rball_nums = 0;
//蓝球数量
var bball_nums = 0;
/*
 *点击红球，变红，再点击变回原色
 */
$("#redBall dd p").click(function () {
    //    点击红球动画效果
    if($(this).attr("class")!= "active1"){
        if($(".active1").length<6){
            $(this).toggleClass("active1");
            ballNums();
        }
    }else{
        $(this).toggleClass("active1");
        ballNums();
    }
});

/*
 *点击蓝球，变蓝，再点击变回原色
 */
$("#blueBall li p").click(function () {
//    点击篮球动画效果
    if($(this).attr("class")!= "active2"){
        if($(".active2").length<1) {
            $(this).toggleClass("active2");
            ballNums();
        }
    }else{
        $(this).toggleClass("active2");
        ballNums();
    }
});
/*
 *点击蓝球的全选，选中所有蓝球
 */
var select_all = true;
$("#selectallBox").click(function () {
    if (select_all) {
        //点击全选，全选蓝球
        $("#blueBall li p").addClass('active2');
        $(this).text('全清');
        select_all = false;
    } else {
        //点击全清，零选蓝球
        $(".active2").removeClass('active2');
        $(this).text('全选');
        select_all = true;
    }
    ballNums();
});
/*
 //输出选择的红球和蓝球数量
 */
function ballNums() {
    //    得出选出的红球数量
    rball_nums = $('.active1').length;
//    console.log(rball_nums);
    //    得出选出的蓝球数量
    bball_nums = $('.active2').length;
    var ball_text = "您选了" + rball_nums + "个红球，" + bball_nums + "个蓝球，共0注,0元";
    $("#confirmBallnums").text(ball_text);
}
/*
 //选择随机选红球的数量
 */
$("#machineRBnums dt").click(function () {
    $(this).css('border-color', 'blue');
    $("#machineRBnums dd").toggle();
    $("#machineRBnums dd").css('border-color', 'blue');
});
$("#machineRBnums dd p").click(function () {
    var red_num = $(this).text();
    $("#machineRBnums dt em").text(red_num);
    $("#machineRBnums dd").hide();
});
/*
 //点击机选红球
 */
$("#machineSelectedred").click(function () {
    arr_red = new Array();
//    选择随机红球个数
    maxrnums = parseInt($("#machineRBnums dt em").text());
    redRand();
    while($(".active1").length<maxrnums){
        redRand();
    }
    ballNums();
});
//取机选红球数量函数
function redRand() {
    $('#redBall dd p').removeClass('active1');
    //输出0～33之间的随机整数
    var rrandom_integer = parseInt(Math.random() * 33 + 1);
    if (rrandom_integer < 10) {
        rrandom_integer = '0' + rrandom_integer;
    }
    if(arr_red.indexOf(rrandom_integer) == -1){
        arr_red.push(rrandom_integer);
    }

//    $.unique(arr_red);
//      console.log(rrandom_integer);
    if (arr_red.length < maxrnums) {
        redRand();
    } else {
        $.each(arr_red, function (i, n) {
            $("#redBall p").each(function (k, v) {
                if ($(v).text() == n) {
                    $(this).addClass('active1');
                }
            });
        });
    }
}
//    清空红球
function emptyRedballs() {
    $('#redBall dd p').removeClass('active1');
    ballNums();
}

/*
 //选择随机选蓝球的数量
 */
$("#machineBBnums dt").click(function () {
    $(this).css('border-color', 'blue');
    $("#machineBBnums dd").toggle();
    $("#machineBBnums dd").css('border-color', 'blue');
});
$("#machineBBnums dd p").click(function () {
    var red_num = $(this).text();
    $("#machineBBnums dt em").text(red_num);
    $("#machineBBnums dd").hide();
});

/*
 //点击机选蓝球
 */
$("#machineSelectedblue").click(function () {
    arr_blue = new Array();
//    取机选篮球个数
    maxbnums = parseInt($("#machineBBnums dt em").text());
    blueRan();
    ballNums();
});
function blueRan() {
    $('#blueBall p').removeClass('active2');
    obj = Math.floor(Math.random() * 16 + 1);
    if (obj < 10) {
        obj = '0' + obj;
    }
    arr_blue.push(obj);
    $.unique(arr_blue);
    if (arr_blue.length < maxbnums) {
        blueRan();
    } else {
        $(arr_blue).each(function (k, v) {
            $('#blueBall p').each(function () {
                if ($(this).text() == v) {
                    $(this).addClass('active2');
                }
            });
        });
    }
}
//    清空蓝球
function emptyBlueballs() {
    $('#blueBall p').removeClass('active2');
    ballNums();
}
/*
 //确定选号
 */

$("#confirmBox").click(function () {
    if (rball_nums >= 6 && bball_nums != 0) {
        red_text = $(".active1").text();
        redBallnums();
//        console.log(arr_r);
        blue_text = $(".active2").text();
        blueBallnums();
//        console.log(arr_b);
        $(".revise_area").remove();
        //var str = "<li><span><b>单式 &nbsp;</b><b class=\"red_balls\">" + arr_r.sort().join(' ') + "</b><b>+</b> <b class=\"blue_balls\">" + arr_b.sort().join(' ') + "</b> [1注,2元]</span> <strong>修改</strong> <em>删除</em></li>";
        var str = "<li><span><b class=\"red_balls\">" + arr_r.sort().join(' ') + "</b><b>+</b> <b class=\"blue_balls\">" + arr_b.sort().join(' ') + "</b> </span> <em>删除</em></li>";
        $("#endBallbox").prepend(str);
        $("#redBall dd p").removeClass('active1');
        $('#blueBall p').removeClass('active2');
        ballNums();
    } else {
        if (rball_nums < 6 && bball_nums == 0) {
            var error = "您选了（" + rball_nums + "红 +" + 0 + "蓝）,请至少再选" + (6 - rball_nums) + "个红球+" + 1 + "个蓝球";
            alert(error);
        }
        if (rball_nums < 6 && bball_nums != 0) {
            var error = "您选了（" + rball_nums + "红 +" + bball_nums + "蓝）,请至少再选" + (6 - rball_nums) + "个红球";
            alert(error);
        }
        if (rball_nums >= 6 && bball_nums == 0) {
            var error = "您选了（" + rball_nums + "红 +" + 0 + "蓝）,请至少再选" + 1 + "个蓝球";
            alert(error);
        }
    }
});
function redBallnums() {
    arr_r = new Array();
    var i = 0;
    while (i <= red_text.length - 1) {
        var r = red_text.substr(i, 2);
        arr_r.push(r);
        i += 2;
    }
}
function blueBallnums() {
    arr_b = new Array();
    var n = 0;
    while (n <= blue_text.length - 1) {
        var b = blue_text.substr(n, 2);
        arr_b.push(b);
        n += 2;
    }
}
//点击删除
$("#endBallbox").delegate('li em', 'click', function () {
    //alert(1);
    $(this).parent().remove();
});
//点击修改
$("#endBallbox").delegate('strong', 'click', function () {
    emptyRedballs();
    emptyBlueballs();
    $(this).parent().siblings().removeClass("revise_area");
    $(this).parent().addClass("revise_area");
//    console.log(rebb);
    var rball_text = $(this).siblings("span").find(".red_balls").text();
//    字符串分割成字符串数组
    rball_text = rball_text.split(' ');
    var bball_text = $(this).siblings("span").find(".blue_balls").text();
//    字符串分割成字符串数组
    bball_text = bball_text.split(' ');
//    alert(bball_text);
    $(rball_text).each(function (k, v) {
        $('#redBall dd p').each(function () {
            if ($(this).text() == v) {
                $(this).addClass('active1');
            }
        });
    });
    $(bball_text).each(function (k, v) {
        $('#blueBall li p').each(function () {
            if ($(this).text() == v) {
                $(this).addClass('active2');
            }
        });
    });
});
//清空选号
function emptyBox() {
    $("#redBall dd p").removeClass('active1');
    $('#blueBall p').removeClass('active2');
    ballNums();
}
//机选n注
function jiXuan(num) {
//    console.log(num);
    for (i = 1; i <= num; i++) {
        arr_red = new Array();
        maxrnums = 6;
        redRand();
        arr_blue = new Array();
        maxbnums = 1;
        blueRan();
        console.log(arr_red)
        //var str = "<li><span><b>单式 &nbsp;</b><b class=\"red_balls\">" + arr_red.sort().join(' ') + "</b><b>+</b> <b class=\"blue_balls\">" + arr_blue.sort().join(' ') + "</b> [1注,2元]</span> <strong>修改</strong> <em>删除</em></li>";
        var str = "<li><span><b class=\"red_balls\">" + arr_red.sort().join(' ') + "</b><b>+</b> <b class=\"blue_balls\">" + arr_blue.sort().join(' ') + "</b></span> <em>删除</em></li>";
        $("#endBallbox").prepend(str);
    }
    $("#redBall dd p").removeClass('active1');
    $('#blueBall p').removeClass('active2');
}

//清空列表
$("#clearList").click(function () {
    $("#endBallbox").find("li").remove();
});

function totalNums(){
    var totalnum = $("#endBallbox").find("li").length;
    return totalnum;
}

function totalNumChange() {
    var totalnum = totalNums();
    $("#numsOfLottery").html(totalnum);
    var times = $("#timesOfLottery").val();
    $("#priceOfLottery").html(2*totalnum*parseInt(times));
}

// $("#endBallbox").bind("DOMNodeInserted", totalNumChange);
// $("#endBallbox").bind("DOMNodeRemoved", totalNumChange);
$("#endBallbox").bind("DOMSubtreeModified", totalNumChange);

$("#timesOfLottery").bind("input", totalNumChange);

$("#confirmBox2").click(function () {

    //价格大于积分，则报错
    if(parseInt($("#priceOfLottery").html())>creadits){
        alert("积分不足！");
        return 0;
    }

    var lottery = $("#endBallbox").find("li");
    var tickets=new Array();
    for(var i=0;i<lottery.length;i++){
        tickets[i] = lottery.eq(i).find('b').eq(0).html()+' '+lottery.eq(i).find('b').eq(2).html();
    }
    var times = $("#timesOfLottery").val();
    alert(kaijiang_date);
    var lottery_data = {"type":"daletou","tickets":tickets,"times":times, "issue":issue, "kaijiang_date":kaijiang_date};

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        headers: { "X-CSRFToken": token_csrf },
        url: "/activity/lottery/",
        dataType: "json",
        cache: false,
        data: JSON.stringify(lottery_data),
        error: function (data) {
            alert("服务器错误！投注失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                $("#mycredits").text(data.credits);
                 // if(data.status == 1){
                //     if(data.redirect_url != "" && data.redirect_url != null) {
                //         ShowErrorMessage(data.msg, data.status);
                //         if(top.location!=self.location){
                //             window.setTimeout(function(){ parent.location.href = data.redirect_url; },1000);
                //         }else{
                //             window.setTimeout(function(){ window.location.href = "http://"+window.location.host; },1000);
                //         }
                //     }
                //     else{
                //         //location.replace(http+window.location.host);
                //         ShowErrorMessage(data.msg, data.status);
                //         window.setTimeout(function(){ parent.location.href = "http://"+window.location.host; },1000);
                //     }
                // }else{
                //     ShowErrorMessage(data.msg, data.status);  //1=成功，2=失败，默认为0
                // }
            }
        }
    });
})
