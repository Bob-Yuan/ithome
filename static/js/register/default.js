var isWap = false;
var isPC = false;
var isApp = false;
var isWeApp = false;
var isIFrame = false;
var source = "ruanmei";
var app = "";

var reginfo = '';

var login_url = "http://" + window.location.host + "/login";
var register_url = "http://" + window.location.host + "/register";

$(function () {
    //取得source参数
    source = GetQueryString("source");
    if (null == source || "" == source) {//默认值
        source = "ruanmei";
    }

    //取得app参数
    app = GetQueryString("app");
    if (null == app) {
        app = "";
    }
    //判断是否移动端、PC、App
  if (isWapPage()||"wapithome" == source) {
        isWap = true;
        if (app != "")
        {
            if (app !== "ithome_wap")
                isApp = true;
            if (app.indexOf("_weapp") > 0) {
                isWeApp = true;
            }
        }
    }else {
        if ("" == app || "pc" == app) {
            app = "pc";
        } else {
            isApp = true;
        }
        isPC = true;
    }

    if (!isApp) {
        //是否在iframe中
        if ("ithome" == source /*|| "wapithome" == source*/ || "lapin" == source || "itquan" == source) {
            isIFrame = true;
        }
        //如果是Wap添加关闭按钮
        if ("wapithome" == source) {
            app = "wap";
            var closeBtnHtml = '<a href="javascript:history.go(-1);"><div class="nologin" style="z-index:700;position:fixed;top:0;right:0;background:transparent;height: 2.3rem;line-height: 1.7rem;vertical-align:middle;text-align:right;cursor: pointer;"><b style="margin: 0.7rem;display: inline-block;font-size: 2.3rem;color:#777">×</b></div></a>';
            $("body").append(closeBtnHtml);
        }
    }
    //判断是否是https
    if ('https:' == document.location.protocol) {
        http = 'https://';
    }

    rm.ready(function () {
        rm.getSystemInfo(function (res) {
            if (res.success) {
                reginfo = res.systemInfo.deviceId;
            }
        });
        var env = rm.getEnv();
        if (env.isLegal) {
            var platform = env.platform;
            if (platform === 'iOS')
                platform = "_iphone";
            if (platform === 'Android')
                platform = "_android";
            app = env.app + platform;
        }

    });


});

//根据状态设置界面
$(function () {
    //App端界面差异
    if (isApp) {
        $(".remember_me_link").hide();
        $("#remember_me_text_parent").hide();

        $(".login_now").hide();
        $("#openplat").hide();
        $(".one_press_login_parent").hide();

        $(".regbtn").css("margin-top", "60px");

        $(".fp_backbtn").hide();
    }

    //wap或者界面宽度较窄时界面调整
    window.onload = onResize;
    window.onresize = onResize;
    function onResize() {
        var useNoBorder = isWap || window.innerWidth < 640;
        if (isIFrame) {
            useNoBorder = true;
        }
        if (useNoBorder) {
            $("#form1").attr("class", "form_style_m");
            $("body").css("background-color", "#fff");
        } else {
            $("#form1").attr("class", "form_style");
            $("body").css("background-color", "#F6F6F6");
        }
    }

    //根据page参数显示相关页面
    var page = GetQueryString("page");
    if (null != page || "" != page) {
        if ("register" == page) {
            regnow_clicked();
            checkBindingRegJump();
        } else if ("forgetpsw" == page) {
            forgetpsw_clilcked();
            var account = GetQueryString("account");
            if (null != account && "" != account) {
                $("#txtFpEmail").val(account);
            }
        }
    }
});

//检查是否是绑定注册跳转
function checkBindingRegJump() {
    var bindtype = GetQueryString("bindtype");
    if (null == bindtype || "" == bindtype) {//无参数不需跳转
        return;
    }

    //手机和验证码参数不对
    var mobile = GetQueryString("mobile");
    var sendcode = GetQueryString("sendcode");
    if (null == mobile || "" == mobile || !isMobile(mobile) || null == sendcode || "" == sendcode) {
        return;
    }

    //将不需要的元素隐藏
    $(".login_now").hide();
    $(".one_press_login_parent").hide();
    $(".openplat").hide();
    $(".regbtn").html("校验并继续绑定");
    $(".save_user_info").html("保存并绑定");

    //将验证码填写到界面上，然后自动点击注册按钮
    $("#phone").val(mobile);
    $("#code").val(sendcode);
    registerbtn_clicked();
}

//输入框焦点时隐藏placeholder，并显示标题
$(function () {
    //输入框焦点
    $(".user_input").focus(function () {
        if ($(this).val() == "") {
            var placeholder = $(this).attr("placeholder");
            if (placeholder != "") {
                $(this).attr("placeholder-data", placeholder);
            }
            $(this).attr("placeholder", "");
            var user_input_text = findUserInputText($(this));
            if (null != user_input_text) {
                user_input_text.html(placeholder);
            }
        }

        var userinput_parent = findUserInputParent($(this));
        if (null != userinput_parent) {
            userinput_parent.addClass("blue_border");
        }
    });

    //输入框失去焦点
    $(".user_input").blur(function () {
        if ($(this).val() == "") {
            var placeholder = $(this).attr("placeholder-data");
            $(this).attr("placeholder", placeholder);
            var user_input_text = findUserInputText($(this));
            if (null != user_input_text) {
                user_input_text.html("&nbsp;");
            }
        }
        var userinput_parent = findUserInputParent($(this));
        if (null != userinput_parent) {
            userinput_parent.removeClass("blue_border");
        }
    });

    //查找输入框标题元素
    function findUserInputText(input) {
        var prev = input.prev();
        if (null != prev && prev.hasClass("user_input_text")) {
            return prev;
        }
        prev = input.parent().prev();
        if (null != prev && prev.hasClass("user_input_text")) {
            return prev;
        }
        return null;
    }

    //找到输入框的父元素
    function findUserInputParent(input) {
        var parent = input.parent();
        if (null != parent && parent.hasClass("userinput_parent")) {
            return parent;
        }
        parent = parent.parent();
        if (null != parent && parent.hasClass("userinput_parent")) {
            return parent;
        }
        parent = parent.parent();
        if (null != parent && parent.hasClass("userinput_parent")) {
            return parent;
        }
        return null;
    }
});

//输入框回车登录
$(function () {
    $("#txtEmail").keydown(loginUserInputKeyDown);
    $("#txtPwd").keydown(loginUserInputKeyDown);
    $("#phone").keydown(registerUserInputKeyDown);
    $("#code").keydown(registerUserInputKeyDown);
    $("#txtFpEmail").keydown(findPasswordUserInputKeyDown);
    $("#txtFpCode").keydown(findPasswordUserInputKeyDown);

    function loginUserInputKeyDown(e) {
        if (13 == e.which) {
            loginbtn_clicked();
        }
    }

    function registerUserInputKeyDown(e) {
        if (13 == e.which) {
            registerbtn_clicked();
        }
    }

    function findPasswordUserInputKeyDown(e) {
        if (13 == e.which) {
            fp_nextbtn_clicked();
        }
    }
});

/***************************************
                登录页面
***************************************/

function loginbtn_clicked() {
    var email = $("#txtEmail").val();
    var psw = $("#txtPwd").val();
    var id_captcha_1 = $("#id_captcha_1").val();
    var id_captcha_0 = $("#id_captcha_0").val();

    if (null == email || "" == email || null == psw || "" == psw) {
        ShowErrorMessage("请输入账号密码");
        return;
    }
    if (null == id_captcha_1 || "" == id_captcha_1) {
        ShowErrorMessage("请输入验证码");
        return;
    }

    //记忆密码
    var rememberme = "true";
    var remember_me_img = $("#remember_me_img");
    var src = remember_me_img.attr("src");
    if (src.indexOf("un") >= 0) {
        rememberme = "false";
    }

    //密码转义
    psw = escape(psw);
    while (psw.indexOf("+") >= 0) {
        psw = psw.replace("+", "%2B");
    }

    //发送验证请求
    var login_data = { "email" :escape(email) , "password":psw,  "captcha_0": id_captcha_0, "captcha_1": id_captcha_1};  

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        headers: { "X-CSRFToken": token_csrf },
        url: "/login/",
        dataType: "json",
        cache: false,
        data: JSON.stringify(login_data),
        error: function () {
            ShowErrorMessage("登录失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                //console.log(data);
                if(data.status == 1){
                    if(data.redirect_url != "" && data.redirect_url != null) {
                        window.location.href = "http://"+window.location.host + data.redirect_url;
                    }
                    else{
                        //location.replace(http+window.location.host);
                        window.location.href = "http://"+window.location.host;
                    }
                }
                // if (data.d.indexOf("ok:") == 0) {
                    // var hash = data.d.replace("ok:", "");
                    // if (isIFrame) {
                    //     var url = http + "my.ruanmei.com/openplat/callback.aspx?type=web&hash=" + hash;
                    //     var iframe = createHiddenIFrameElement(url, function () {
                    //         url = getCallbackUrl(hash, rememberme);
                    //         if ("" != url) {
                    //             createHiddenIFrameElement(url);
                    //         }
                    //     })
                    // } else {
                    //     //如果是Wap或云日历
                    //     if ("wapithome" == source || "mytime" == source) {
                    //         var wapBackUrl = GetBackUrlWithCheck();
                    //         if (wapBackUrl !== "")
                    //             window.location.href = wapBackUrl + hash;
                    //     } else {
                    //         var url = getReturnUrl();
                    //         location.replace(url);
                    //     }
                    // }
                // } else {
                //     ShowErrorMessage(data.d);
                // }
            }
        }
    });
}
//获取wap跳转页面
function GetBackUrlWithCheck() {
    var backUrl = GetQueryString("returnurl");
    //验证是否是软媒域名
    if (backUrl.indexOf("?") !== -1) {
        backUrl = backUrl.substring(0, backUrl.indexOf("?"));
    }
    if (backUrl.indexOf("ithome.com") !== -1 || backUrl.indexOf("ruanmei.com") !== -1)
        return GetQueryString("returnurl");
    else
        return "";
}
//记住我，点击
function remember_me_click() {
    var src = $("#remember_me_img").attr("src");
    if (src.indexOf("un") > 0) {//当前unchecked
        src = "/static/image/register/checked.png";
    } else {
        src = "/static/image/register/unchecked.png";
    }
    $("#remember_me_img").attr("src", src);
}

function read_protocol_click() {
    var src = $("#read_protocol_img").attr("src");
    if (src.indexOf("un") > 0) { //当前unchecked
        src = "/static/image/register/checked.png";
    } else {
        src = "/static/image/register/unchecked.png";
    }
    $("#read_protocol_img").attr("src", src);
}

//忘记密码点击
function forgetpsw_clilcked() {
    $("#rm_login").hide();
    $("#reg_panel").hide();
    $("#rm_forgetpassword").show();
}

//立即注册点击
function regnow_clicked() {
    window.location.href = register_url;
    $("#id_captcha_1").attr("placeholder","验证码");
}

//第三方登录
function connectLogin(type) {
    var url = "/openplat/callback.aspx?type=" + type,
        name = "",
        width = 630,
        height = 688;
    var clienttime = parseInt((new Date).getTime() / 1000);

    switch (type) {
        case "sina":
            name = "SinaLogin";
            break;
        case "qq":
            name = "qq";
            break;
        case "wx":
            name = "wx";
            break;
        case "taobao":
            name = "taobao";
            break;
    }

    url += "&source=" + source;
    url += "&clienttime=" + clienttime
    var l = (window.screen.width - width) / 2,
        t = (window.screen.height - height) / 2;
    var childwindow = window.open(url, name, "width=" + width + ",height=" + height + ",left=" + l + ",top=" + t + ",menubar=0,scrollbars=0,resizable=0,status=0,titlebar=0,toolbar=0,location=1");
    var timer = setInterval(function () {
        if (childwindow.closed) {
            var hash = getCookie("rmlogin_hash");
            if (isIFrame) {
                var url = getCallbackUrl(hash);
                if ("" != url) {
                    createHiddenIFrameElement(url);
                }
            } else {
                if ("wapithome" == source || "mytime" == source) {
                    var wapBackUrl = GetBackUrlWithCheck();
                    if (wapBackUrl !== "")
                        window.location.href = wapBackUrl + hash;
                } else {
                    window.location.reload();
                }
            }
            clearInterval(timer);
        }
    }, 10, null);
}

//创建一个隐藏的iframe
function createHiddenIFrameElement(url, onload) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("style", "display:none;");
    document.body.appendChild(iframe);
    if (null != onload) {
        iframe.onload = iframe.onreadystatechange = function () {
            if (this.readyState && this.readyState != 'complete')
                return;
            else {
                onload();
            }
        };
    }
    iframe.setAttribute("src", url);
    return iframe;
}

//获取回调地址
function getCallbackUrl(hash, rememberme) {
    //记忆密码
    if (null == rememberme) {
        rememberme = "true";
        var remember_me_img = $("#remember_me_img");
        var src = remember_me_img.attr("src");
        if (src.indexOf("un") >= 0) {
            rememberme = "false";
        }
    }

    var urlbase = "";
    if ("ithome" == source) {
        urlbase = "https://www.ithome.com/ithome/openplat/qq/callBack.aspx?hash=";
    }
    else if ("lapin" == source) {
        urlbase = "";
    } else if ("itquan" == source) {
        urlbase = "";
    }
    if (null != urlbase) {
        var url = urlbase + hash + "&rmlogin=true&rememberme=" + rememberme;
        return url;
    }
    return "";
}

/***************************************
                验证码相关
***************************************/

//点击验证码刷新
$(function() {
    $('.captcha').css({
        'cursor': 'pointer'
    })
    // ajax 刷新
    $('.captcha').click(function () {
        console.log('click');
        $.getJSON("/captcha/refresh/",
            function (result) {
                $('.captcha').attr('src', result['image_url']);
                $('#id_captcha_0').val(result['key']);
            }
        );
    });
});

//检查发送验证码的超时时间
var sendCodeTimeOutSecond = 60;
$(function () {
    var seconds = GetSendSmsCoundDownSecond();
    if (seconds > 0) {//不到超时时间
        //注册发送验证码
        var sendsms = $("#sendsms");
        sendsms.removeClass("sendsms_enable");
        sendsms.addClass("sendsms_disable");
        sendsms.html(seconds.toString() + "秒");

        //找回密码发送验证码
        var fp_sendsms = $("#fp_sendsms");
        fp_sendsms.removeClass("sendsms_enable");
        fp_sendsms.addClass("sendsms_disable");
        fp_sendsms.html(seconds.toString() + "秒");

        sendSmsCountDown(seconds);
    }
});

//获取当前发送验证码倒计时时间，在此时间内不能再次发送
function GetSendSmsCoundDownSecond() {
    var sendsmstime = getCookie("sendsms");
    if (null != sendsmstime && "" != sendsmstime) {
        sendsmstime = new Date(sendsmstime);
        var now = new Date();
        var seconds = now.getTime() - sendsmstime.getTime();
        seconds = parseInt(seconds / 1000);
        seconds = sendCodeTimeOutSecond - seconds;
        return seconds;
    }
}

//开始发送验证码按钮的倒计时
function sendSmsCountDown(seconds) {
    var sendsms = $("#sendsms");
    var fp_sendsms = $("#fp_sendsms");
    var countdownTimer = setInterval(function () {
        seconds -= 1;

        //注册发送验证码
        if (null != sendsms) {
            sendsms.html(seconds.toString() + "秒");
            if (seconds <= 0) {
                clearInterval(countdownTimer);
                sendsms.removeClass("sendsms_disable");
                sendsms.addClass("sendsms_enable");
                sendsms.html("重新发送");
            }
        }

        //找回密码发送验证码
        if (null != fp_sendsms) {
            fp_sendsms.html(seconds.toString() + "秒");
            if (seconds <= 0) {
                clearInterval(countdownTimer);
                fp_sendsms.removeClass("sendsms_disable");
                fp_sendsms.addClass("sendsms_enable");
                fp_sendsms.html("重新发送");
            }
        }
    }, 1000, null);
}

//发送验证码点击
function send_sms_click() {
    var sendsms = $("#sendsms");
    if (sendsms.hasClass("sendsms_disable")) {
        return;
    }
    if (GetSendSmsCoundDownSecond() > 0) {
        return;
    }

    //校验手机号
    var phone = $('#phone');
    if (!isMobile(phone.val())) {
        ShowErrorMessage("请输入正确的手机号码");
        return;
    }

    var mobile = phone.val();
    if (mobile.indexOf('170') == 0 || mobile.indexOf('171') == 0 || mobile.indexOf('14') == 0) {
        var msg = "目前禁止使用14，170，171号段注册通行证";
        ShowErrorMessage(msg);
        phone.focus();
        return;
    }

    //校验验证码
    var validate = $("#validate").val();
    if ($("#validateParent").css("display") != 'none') {
        if (null == validate || "" == validate) {
            ShowErrorMessage("请输入图片中的验证码！");
            return;
        }
    }

    //发送短信
    var data = $("#data20190202").val();
    sendSms(phone.val(), true, validate, data, function (msg) {
        var type = null;
        if (msg.indexOf("发送成功") >= 0) {
            type = 1;

            //发送成功，开始倒计时
            var date = new Date();
            setCookie("sendsms", date.toString(), null);
            sendsms.removeClass("sendsms_enable");
            sendsms.addClass("sendsms_disable");
            sendsms.html(sendCodeTimeOutSecond.toString() + "秒");
            sendSmsCountDown(sendCodeTimeOutSecond);
        } else if (msg.indexOf("验证码不正确") >= 0) {
            $("#randomNoImg").click();
        }
        ShowErrorMessage(msg, type);
    });
}

//发送验证码
function sendSms(mobile, checkreg, validate, data, finish) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/SendSmsReg20190319",
        dataType: "json",
        cache: false,
        data: '{mobile:"' + escape(mobile) + '", checkreg:"' + escape(checkreg) + '", validate:"' + escape(validate) + '", data:"' + escape(data) + '"  }',
        success: function (data) {
            if (null != data && "" != data) {
                var msg = data.d;
                if ("ok" == data.d) {
                    msg = "手机验证码发送成功！";
                }
                if (null != finish) {
                    finish(msg);
                }
            }
        }
    });
}

/***************************************
                注册
***************************************/

//立即登录点击
function loginnow_clicked() {
    location.replace(login_url);
    $("#id_captcha_1").attr("placeholder","验证码");
}

//获得刷新url
function getReloadUrl() {
    // var url = http + "my.ruanmei.com/?app=" + app;
    // if (null != source && "" != source && "ruanmei" != source) {
    //     url += "&source=" + source;
    // }
    var url = window.location.href;
    return url;
}

//获得返回url
function getReturnUrl() {
    var url = "/usercenter/base.aspx";
    var returnurl = GetQueryString("returnurl");
    if (null != returnurl && "" != returnurl) {
        if ("hd" == returnurl) {
            url = "/usercenter/myactivities.aspx";
        } else {
            url = returnurl;
        }
    }
    return url;
}

//注册按钮点击
function registerbtn_clicked() {
    var email = $("#txtEmail").val();
    var psw = $("#txtPwd").val();
    var id_captcha_1 = $("#id_captcha_1").val();
    var id_captcha_0 = $("#id_captcha_0").val();

    if (null == email || "" == email || null == psw || "" == psw) {
        ShowErrorMessage("请输入账号密码");
        return;
    }
    if (null == id_captcha_1 || "" == id_captcha_1) {
        ShowErrorMessage("请输入验证码");
        return;
    }
    //密码转义
    psw = escape(psw);
    while (psw.indexOf("+") >= 0) {
        psw = psw.replace("+", "%2B");
    }

    var read_protocol_imgSrc = $("#read_protocol_img").attr("src");
    if (read_protocol_imgSrc.indexOf("un") > 0) {
        ShowErrorMessage("请先阅读并同意注册协议和隐私政策");
        return;
    }

    var register_data = { "email" :escape(email) , "password":psw,  "captcha_0": id_captcha_0, "captcha_1": id_captcha_1};  

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        headers: { "X-CSRFToken": token_csrf },
        url: "/register/",
        dataType: "json",
        cache: false,
        data: JSON.stringify(register_data),
        error: function () {
            ShowErrorMessage("注册失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                console.log(data);
                if(data.status == 1){
                    alert("注册成功！")
                    window.location.href = login_url;
                }
                //下面几行为调试使用
                //$("#rm_login").hide();
                //$("#rm_userinfo").show();
                //return;

                // if ("ok" == data.d) {
                //     $("#rm_login").hide();
                //     $("#rm_forgetpassword").hide();
                //     $("#rm_userinfo").show();
                // } else {
                //     ShowErrorMessage(data.d);
                // }
            }
        }
    });
}

/***************************************
              用户信息输入
***************************************/

//头像点击
function avater_clicked() {
    $("#avaterFileInput").click();
}

//选择图片
var avatarData = null;
$(function () {
    $("#avaterFileInput").change(function () {
        var filePath = $(this).prop("files");
        if (filePath.length > 0) {
            filePath = filePath[0];
            lrz(filePath, {
                width: 150,
                height: 150
            }).then(function (rst) {
                avatarData = rst.base64;
                var avaterImg = $("#avaterImg");
                avaterImg.attr("src", avatarData);
                avaterImg.attr("style", "border-radius: 50% 50%");
            });
        }
    });
});

//保存用户信息点击
function save_user_info_clicked() {
    var userNick = $("#txtUserInfoNickName").val();
    var userPsw = $("#txtUserInfoPsw").val();
    var userPswConfirm = $("#txtUserInfoPswConfirm").val();
    var userQQ = $("#txtUserInfoQQ").val();
    if (null == userNick || "" == userNick
        || null == userPsw || "" == userPsw
        || null == userPswConfirm || "" == userPswConfirm) {
        ShowErrorMessage("昵称/密码不能为空");
        return;
    }
    if (userPsw != userPswConfirm) {
        ShowErrorMessage("输入的密码不一致");
        return;
    }
    if (null == userQQ || "" == userQQ) {
        ShowAvaterAndQQMessage();
        return;
    } else {
        var regexp = /^[1-9][0-9]{4,14}$/;
        if (!regexp.test(userQQ)) {
            ShowErrorMessage("请输入正确的QQ号码")
            return;
        }
    }

    //注册
    RegisterUser(userNick, userPsw, userPswConfirm, userQQ, app);
}

//注册账号
function RegisterUser(userNick, userPsw, userPswConfirm, userQQ, app) {


    var mobile = $("#phone").val();
    var checkcode = $("#code").val();

    var oriPsw = userPsw;

    //密码转义
    userPsw = escape(userPsw);
    while (userPsw.indexOf("+") >= 0) {
        userPsw = userPsw.replace("+", "%2B");
    }

    //密码转义
    userPswConfirm = escape(userPswConfirm);
    while (userPswConfirm.indexOf("+") >= 0) {
        userPswConfirm = userPswConfirm.replace("+", "%2B");
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/RegisterUser",
        dataType: "json",
        cache: false,
        data: '{mobile:"' + escape(mobile) + '", checkcode:"' + escape(checkcode) + '", nick:"' + escape(userNick) + '", psw:"' + userPsw + '", pswConfirm:"' + userPswConfirm + '", qq:"' + escape(userQQ) + '", avatar:"' + (avatarData == null ? "" : escape(avatarData.substr(0, 32))) + '", app:"' + escape(app) + '" , reginfo:"' + escape(reginfo) + '"  }',
        error: function () {
            ShowErrorMessage("注册失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                if (data.d.indexOf("注册成功:") == 0) {
                    var tmpstr = data.d.replace("注册成功:", "");
                    var array = tmpstr.split("\f");
                    if (array.length >= 2) {
                        var userId = parseInt(array[0]);
                        var psw = array[1];
                        if (!isAndroid()) {
                            oriPsw = psw;
                        }

                        //用户选择了头像，上传头像
                        if (null != avatarData) {
                            var xhr = new XMLHttpRequest();
                            var url = "/receive/avatar.aspx?avatar=true&uid=" + userId + "&p=" + psw + "&r=" + (new Date().getTime());
                            xhr.onreadystatechange = function () {
                            };
                            xhr.open("POST", url);
                            xhr.send(avatarData);
                        }

                        //绑定账户
                        var bindtype = GetQueryString("bindtype");
                        if (null != bindtype && "" != bindtype) {
                            var string1 = "", string2 = "", string3 = "", string4 = "";
                            if ("qq" == bindtype || "wx" == bindtype) {
                                string1 = GetQueryString("string1");
                            } else if ("sina" == bindtype) {
                                string1 = GetQueryString("string1");
                                string2 = GetQueryString("string2");
                            } else if ("taobao" == bindtype) {
                                string1 = GetQueryString("string1");
                                string2 = "";//暂时没有这个参数
                                string3 = GetQueryString("string3");
                                string4 = GetQueryString("string4");
                            } else {
                                return;
                            }

                            //解一下码
                            string1 = unescape(string1);
                            string2 = unescape(string2);
                            string3 = unescape(string3);
                            string4 = unescape(string4);

                            //是否是APP调用
                            var isapp = GetQueryString("isapp");
                            if (isapp == null) {
                                isapp = "false";
                            }
                            isapp = unescape(isapp);

                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "Default.aspx/BindUser",
                                dataType: "json",
                                cache: false,
                                data: '{userid:"' + escape(userId) + '", psw:"' + escape(psw) + '", bindtype:"' + escape(bindtype) + '", isapp:"' + escape(isapp) + '", string1:"' + escape(string1) + '", string2:"' + escape(string2) + '", string3:"' + escape(string3) + '", string4:"' + escape(string4) + '"}',
                                error: function () {
                                    ShowErrorMessage("绑定失败！");
                                },
                                success: function (data) {
                                    if (data.d.indexOf("ok") == 0) {
                                        var hash = data.d.replace("ok:", "");
                                        if (null != isapp && "true" == isapp) {
                                            AppLogin(hash);
                                        } else {
                                            var url = "http://" + "my.ruanmei.com/openplat/callback.aspx?type=web&hash=" + hash;
                                            location.replace(url);
                                        }
                                    } else {
                                        ShowErrorMessage(data.d);
                                    }
                                }
                            })
                        } else {
                            //提示成功并跳转
                            showRegSuccessAndJump();
                        }
                    }
                } else {
                    ShowErrorMessage(data.d);
                }
            }
        }
    });
}

function showRegSuccessAndJump() {
    var msg = "";
    if (isApp) {
        msg = "注册成功，正在登录，请稍候...";
    } else {
        msg = "注册成功，现在为您登录！";
    }

    ShowErrorMessage(msg, 1);
    var jumpTimer = setInterval(function () {
        clearInterval(jumpTimer);
        //if (isWeApp) {
        //    var url = '/pages/login/login?username=' + encodeURIComponent(mobile) + '&password=' + encodeURIComponent(oriPsw);
        //    ShowErrorMessage(url, 1);
        //}
        if (isApp) {
            if (isWeApp) {
                //debugger;
                var url = '/pages/login/login?to=weapp_login&username=' + encodeURIComponent(mobile) + '&password=' + encodeURIComponent(oriPsw);
                wx.miniProgram.redirectTo({ url: url });
            } else {
                RegOK(mobile, oriPsw);
            }
        } else {
            var url = getReturnUrl();
            location.replace(url);
        }
    }, 2500, null);
}

/***************************************
                找回密码
***************************************/

//忘记密码发送验证码，区分手机和Email
function send_sp_sms_click() {
    var mail = $("#txtFpEmail").val();
    if (null == mail || "" == mail) {
        ShowErrorMessage("请填写账号和验证码");
        return;
    }

    //发送验证码禁用状态，无需发送
    var fp_sendsms = $("#fp_sendsms");
    if (fp_sendsms.hasClass("sendsms_disable")) {
        return;
    }
    if (GetSendSmsCoundDownSecond() > 0) {//发送时间间隔太短
        return;
    }

    //校验验证码
    var validate = $("#validateFP").val();
    if ($("#validateParent").css("display") != 'none') {
        if (null == validate || "" == validate) {
            ShowErrorMessage("请输入图片中的验证码！");
            return;
        }
    }

    //根据用户输入的是Email还是手机发送验证码
    function show_msg(msg) {
        var type = null;
        if (msg.indexOf("成功") >= 0) {
            type = 1;

            //开始倒计时
            var date = new Date();
            setCookie("sendsms", date.toString(), null);
            fp_sendsms.removeClass("sendsms_enable");
            fp_sendsms.addClass("sendsms_disable");
            fp_sendsms.html(sendCodeTimeOutSecond.toString() + "秒");
            sendSmsCountDown(sendCodeTimeOutSecond);
        } else if (msg.indexOf("验证码不正确") >= 0) {
            $("#randomNoImgFP").click();
        }
        ShowErrorMessage(msg, type);
    }
    var data = $("#data20190202").val();
    if (isEmail(mail)) {
        sendEmail(mail, validate, data, show_msg);
    } else if (isMobile(mail)) {
        sendSms(mail, false, validate, data, show_msg);
    } else {
        ShowErrorMessage("请正确填写邮箱或者手机号");
        return;
    }
}

//忘记密码下一步
function fp_nextbtn_clicked() {
    var mail = $("#txtFpEmail").val();
    var code = $("#txtFpCode").val();
    if (null == mail || "" == mail) {
        ShowErrorMessage("请填写邮箱或者手机号");
        return;
    }
    if (null == code || "" == code) {
        ShowErrorMessage("请输入验证码");
        return;
    }
    var checkcodeOk = true;
    for (var i = 0; i < code.length; ++i) {
        var c = code.charAt(i);
        if (c < '0' || c > '9') {
            checkcodeOk = false;
            break;
        }
    }
    if (6 != code.length || !checkcodeOk) {
        ShowErrorMessage("请输入正确的验证码");
        return;
    }

    //根据用户输入的是Email还是手机发送验证码
    var func = "";
    var keyname = "";
    if (isEmail(mail)) {
        func = "VerifyEmailCode";
        keyname = "mail";
    } else if (isMobile(mail)) {
        func = "VerifyMobileCode";
        keyname = "mobile";
    } else {
        ShowErrorMessage("请正确填写邮箱或者手机号");
        return;
    }

    //以下是调试代码
    //$("#fp_step1").hide();
    //$("#fp_step2").show();
    //return;

    //校验验证码
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/" + func,
        dataType: "json",
        cache: false,
        data: '{' + keyname + ':"' + escape(mail) + '", sendcode:"' + code + '"}',
        error: function () {
            ShowErrorMessage("校验验证码失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                var msg = data.d;
                if ("ok" == data.d) {
                    $("#fp_step1").hide();
                    $("#fp_step2").show();
                } else {
                    ShowErrorMessage(data.d);
                }
            }
        }
    });
}

//返回按钮点击
function fp_backbtn_clicked() {
    var url = getReloadUrl();
    location.replace(url);
}

//保存新密码按钮点击
function fp_save_psw_clicked() {
    var psw = $("#txtFpPsw").val();
    var pswConfirm = $("#txtFpPswConfirm").val();
    if (null == psw || "" == psw || null == pswConfirm || "" == pswConfirm) {
        ShowErrorMessage("请输入新密码和确认密码");
        return;
    }
    if (psw != pswConfirm) {
        ShowErrorMessage("新密码和确认密码不一致");
        return;
    }

    //密码转义
    psw = escape(psw);
    while (psw.indexOf("+") >= 0) {
        psw = psw.replace("+", "%2B");
    }

    //密码确认转义
    pswConfirm = escape(pswConfirm);
    while (pswConfirm.indexOf("+") >= 0) {
        pswConfirm = pswConfirm.replace("+", "%2B");
    }

    var mail = $("#txtFpEmail").val();
    var code = $("#txtFpCode").val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/ModifyPsw",
        dataType: "json",
        cache: false,
        data: '{mail:"' + escape(mail) + '", sendcode:"' + code + '", psw:"' + psw + '", pswConfirm:"' + pswConfirm + '"}',
        error: function () {
            ShowErrorMessage("校验验证码失败！");
        },
        success: function (data) {
            if (null != data && "" != data) {
                var msg = data.d;
                if (data.d.indexOf("ok") >= 0) {
                    if (isApp) {
                        var pswMD5 = data.d.replace("ok:", "");
                        if ("undefined" != typeof ForgetPwdOK) {
                            ForgetPwdOK(mail, pswMD5);
                        } else {
                            if (isWeApp) {
                                debugger;
                                var url = '/pages/login/login?to=weapp_forgetpwd&username=' + encodeURIComponent(mail) + '&password=' + encodeURIComponent(pswMD5);
                                wx.miniProgram.redirectTo({ url: url });
                            } else {
                                //RetrievePwdOK("修改密码成功！");
                                ShowErrorMessage("修改密码成功！", 1);
                            }
                        }
                    } else {
                        ShowErrorMessage("修改密码成功，请使用新密码登录软媒通行证！", 1);
                        var timer = setInterval(function () {
                            var url = getReloadUrl();
                            location.replace(url);
                            clearInterval(timer);
                        }, 2500, null);
                    }
                } else {
                    ShowErrorMessage(data.d);
                }
            }
        }
    });
}

//发送邮件
function sendEmail(mail, validate, data, finish) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/SendEmail",
        dataType: "json",
        cache: false,
        data: '{mail:"' + escape(mail) + '", validate:"' + escape(validate) + '", data:"' + escape(data) + '"}',
        success: function (data) {
            if (null != data && "" != data) {
                var msg = data.d;
                if ("ok" == data.d) {
                    msg = "发送邮件成功";
                }
                if (null != finish) {
                    finish(msg);
                }
            }
        }
    });
}

/***************************************
                错误信息
***************************************/

//显示错误信息，type：0=信息提示，1=成功，2=失败，默认为0
var errRegTimer = null;
function ShowErrorMessage(msg, type) {
    if (null == type || type > 2 || type < 0) {
        type = 0;
    }

    //图片
    var errimg = $(".error_img");
    if (null != errimg) {
        if (1 == type) {
            errimg.attr("src", "http://"+window.location.host+"/static/image/register/ok.png");
        } else {
            errimg.attr("src", "http://"+window.location.host+"/static/image/register/error.png");
        }
    }

    //文字
    var errtext = $(".error_text");
    if (null != errtext) {
        errtext.html(msg);
        errtext.removeClass("error_text_ok");
        errtext.removeClass("error_text_error");
        errtext.removeClass("error_text_info");
        switch (type) {
            case 0:
                errtext.addClass("error_text_info");
                break;
            case 1:
                errtext.addClass("error_text_ok");
                break;
            case 2:
                errtext.addClass("error_text_error");
                break;
        }
    }

    //显示
    var errmsg = $(".error_msg");
    errmsg.show();

    //自动消失
    errRegTimer = setInterval(function () {
        errmsg.hide();
        clearInterval(errRegTimer);
        errRegTimer = null;
    }, 2500, null);
}

//隐藏错误信息
function HideErrorMessage() {
    var errmsg = $(".error_msg");
    errmsg.hide();
    if (null != errRegTimer) {
        clearInterval(errRegTimer);
        errRegTimer = null;
    }
}

//点击空白区域隐藏错误信息
$(function () {
    $(".error_mask").click(function () {
        HideErrorMessage();
    })
})

//显示未填写头像和QQ的提示
function ShowAvaterAndQQMessage() {
    $(".avater_qq_msg").show();
}

//隐藏未填写头像和QQ的提示
function HideAvaterAndQQMessage() {
    $(".avater_qq_msg").hide();
}

//继续保存未填写头像和QQ的提示
function ContinueAvaterAndQQMessage() {
    var userNick = $("#txtUserInfoNickName").val();
    var userPsw = $("#txtUserInfoPsw").val();
    var userPswConfirm = $("#txtUserInfoPswConfirm").val();
    var userQQ = $("#txtUserInfoQQ").val();
    HideAvaterAndQQMessage();
    RegisterUser(userNick, userPsw, userPswConfirm, userQQ, app);
}

/***************************************
                功能函数
***************************************/

//是否是安卓
function isAndroid() {
    if (navigator.userAgent.match(/(Android)/i)) {
        return true;
    }
    return false;
}

//获得当前浏览器
function getBrowser() {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    return "";
}

$(function () {
    var browser = getBrowser();
    if ("IE" == browser) {
        jQuery.fn.placeholder = function () {
            var i = document.createElement('input'),
                placeholdersupport = 'placeholder' in i;
            if (!placeholdersupport) {
                var inputs = jQuery(this);
                inputs.each(function () {
                    var input = jQuery(this),
                        text = input.attr('placeholder'),
                        placeholder = jQuery('<div class="phTips">' + text + '</div>');
                    placeholder.css({
                        'left': 0,
                        'top': 0,
                        'margin-top': -19,
                        'margin-left': 3,
                        'height': 19,
                        'line-height': 19 + "px",
                        'position': 'relative',
                        'color': "#888",
                        'font-size': "14px"
                    });
                    placeholder.click(function () {
                        input.focus();
                    });
                    if (input.val() != "") {
                        placeholder.css({ display: 'none' });
                    } else {
                        placeholder.css({ display: 'block' });
                    }
                    placeholder.insertAfter(input);
                    input.keyup(function (e) {
                        if (jQuery(this).val() != "") {
                            placeholder.css({ display: 'none' });
                        } else {
                            placeholder.css({ display: 'inline' });
                        }
                    });
                });
            }
            return this;
        };

        jQuery('input[placeholder]').placeholder();
    }
})