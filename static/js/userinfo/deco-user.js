function centerDialog(dialogBox){
    $(dialogBox).show(0,function(){
        var winHei = $(window).height(),
        dialogHei = $(this).height();
        if(dialogHei + 120 < winHei){
            $(this).css('margin-top',(winHei-dialogHei)/2 + 'px');
            $('html').removeClass('dialog-open');
        }else{
             $(this).css('margin-top','30px');
            $('html').addClass('dialog-open');
        }
    });
}
var Dml = {};
Dml.fun = {
    showErrorTips: function($elem,tips){
        $elem.html(tips).show();
        //setTimeout(function(){$elem.hide()},3000);
        return false;
    },
    showDialog: function(dialogBox){
        $('#jsDialog').show();
        $('#dialogBg').show();
        $('.dialogbox').hide();
       centerDialog(dialogBox);
        if(arguments[1]) $(arguments[1]).hide();
        if(arguments[2]) $(arguments[2]).hide();
    },
    showTipsDialog: function(obj){
        //type :'' || failbox
        var $Box = $('#jsSuccessTips'),
            h1 = obj.title || '提示',
            h2 = obj.h2 || '您的操作成功！';
            p = obj.p || '';
            type = obj.type || '';
        $('#jsDialog').show();
        $('#dialogBg').show();
        $('.dialogbox').hide();
        $Box.find('h1').html(h1);
        $Box.find('h2').html(h2);
        $Box.find('p').html(p);
        if(type){
            $Box.addClass(type);
            centerDialog($Box);
        }else{
            $Box.removeClass('failbox');
            centerDialog($Box);
        }
    },
    showComfirmDialog: function(obj){
        var $Box = $('#jsComfirmDialig'),
            h1 = obj.h1 || '确认提交',
            h2 = obj.h2 || '您确认提交吗？',
            callBack = obj.callBack;
        $('#jsDialog').show();
        $('#dialogBg').show();
        $('.dialogbox').hide();
        $Box.find('h1').html(h1);
        $Box.find('h2').html(h2);
        $('#jsComfirmBtn').on('click', function(){
            callBack();
        });
        centerDialog($Box);
    },
    showValidateError: function($elem,tips){
        var $tips = arguments[2] || '';
        $elem.focus();
        setTimeout(function(){
            $elem.parent().addClass('errorput');
            if($tips){
                $tips.html(tips).show();
            }else{
                if($elem.attr('id') == 'mobile-register-captcha_1'){
                    $('#jsMobileTips').html(tips).show();
                }else if($elem.attr('id') == 'jsPhoneRegCaptcha'){
                    $elem.parent().siblings('.error').html(tips).show();
                }else{
                    $elem.parent().siblings('.error').html(tips).show();
                }
            }
        },10);
        return false;
    },
    getDate: function(){
        if (arguments[0]){
            var now = new Date(arguments[0])
        }else{
            var now = new Date();
        }

        return now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
    },
    winReload: function(){
        var URL = arguments[0] || window.location.href;
        setTimeout(function(){
            window.location.href = URL;
        },1500);
    }
};
Dml.regExp = {
    phone: /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/,
    tel:/(^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$)|(^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    phMail: /(^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$)|(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)/,
    number: /^[0-9]*$/,
    float: /^\d+(\.\d+)?$/,
    zsNumber: /^(-?[1-9]\d*|0)$/,
    name: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    pwd: /^([^\u4e00-\u9fa5]{6,20})$/,
    verifyCode: /^[a-zA-z]{5}$/,
    phoneCode: /^\d{6}$/,
    emailCode: /^\d{4}$/,
    rsiName: /^[\u4e00-\u9fa5\-a-zA-Z0-9]{2,30}$/,
    //rsiName: /^([\u4e00-\u9fa5])([\u4e00-\u9fa5a-zA-Z0-9]+)$/,
    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};
Dml.Msg = {
    epUserName: '请输入登录手机或邮箱！',
    erUserName: '请输入正确的登录手机或邮箱！',
    epPhone: '请输入您的手机号码！',
    erPhone: '请输入正确的手机号码！',
    epTel: '请输入您的电话号码！',
    erTel: '请输入正确的电话号码，固定电话：区号-号码！',
    epVerifyCode: '请输入验证码！',
    erVerifyCode: '请输入正确的验证码！',
    epMail: '请输入您的邮箱！',
    erMail: '请输入正确的邮箱！',
    epPwd: '请输入登录密码！',
    erPwd: '密码为6-20位非中文字符！',
    epResetPwd: '请输入密码！',
    erResetPwd: '密码为6-20位非中文字符！',
    epRePwd:'请重复输入密码！',
    erRePwd:'两次密码输入不一致！',
    epPhCode: '请输入手机验证码！',
    erPhCode: '请输入正确的手机验证码！',
    epEmCode: '请输入邮箱验证码！',
    erEmCode: '请输入正确的邮箱验证码！',
    epName: '请输入您的姓名！',
    epNickName: '请输入昵称！',
};

//修改个人中心邮箱验证码
function sendCodeChangeEmail($btn){
    var verify = verifyDialogSubmit(
        [
          {id: '#jsChangeEmail', tips: Dml.Msg.epMail, errorTips: Dml.Msg.erMail, regName: 'email', require: true}
        ]
    );
    if(!verify){
       return;
    }
    $.ajax({
        cache: false,
        type: "get",
        dataType:'json',
        url:"/users/sendemail_code/",
        data:$('#jsChangeEmailForm').serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $btn.val("发送中...");
            $btn.attr('disabled',true);
        },
        success: function(data){
            if(data.email){
                Dml.fun.showValidateError($('#jsChangeEmail'), data.email);
            }else if(data.status == 'success'){
                Dml.fun.showErrorTips($('#jsChangeEmailTips'), "邮箱验证码已发送");
            }else if(data.status == 'failure'){
                 Dml.fun.showValidateError($('#jsChangeEmail'), "邮箱验证码发送失败");
            }else if(data.status == 'success'){
            }
        },
        complete: function(XMLHttpRequest){
            $btn.val("获取验证码");
            $btn.removeAttr("disabled");
        }
    });

}
//个人资料邮箱修改
function changeEmailSubmit($btn){
var verify = verifyDialogSubmit(
        [
          {id: '#jsChangeEmail', tips: Dml.Msg.epMail, errorTips: Dml.Msg.erMail, regName: 'email', require: true},
        ]
    );
    if(!verify){
       return;
    }
    $.ajax({
        cache: false,
        type: 'post',
        dataType:'json',
        url:"/users/update_email/ ",
        data:$('#jsChangeEmailForm').serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $btn.val("发送中...");
            $btn.attr('disabled',true);
            $("#jsChangeEmailTips").html("验证中...").show(500);
        },
        success: function(data) {
            if(data.email){
                Dml.fun.showValidateError($('#jsChangeEmail'), data.email);
            }else if(data.status == "success"){
                Dml.fun.showErrorTips($('#jsChangePhoneTips'), "邮箱信息更新成功");
                setTimeout(function(){location.reload();},1000);
            }else{
                 Dml.fun.showValidateError($('#jsChangeEmail'), "邮箱信息更新失败");
            }
        },
        complete: function(XMLHttpRequest){
            $btn.val("完成");
            $btn.removeAttr("disabled");
        }
    });
}

$(function(){
    //个人资料修改密码
    $('#jsUserResetPwd').on('click', function(){
        Dml.fun.showDialog('#jsResetDialog', '#jsResetPwdTips');
    });

    $('#jsResetPwdBtn').click(function(){
        $.ajax({
            cache: false,
            type: "POST",
            dataType:'json',
            url:"/users/update/pwd/",
            data:$('#jsResetPwdForm').serialize(),
            async: true,
            success: function(data) {
                if(data.password1){
                    Dml.fun.showValidateError($("#pwd"), data.password1);
                }else if(data.password2){
                    Dml.fun.showValidateError($("#repwd"), data.password2);
                }else if(data.status == "success"){
                    Dml.fun.showTipsDialog({
                        title:'提交成功',
                        h2:'修改密码成功，请重新登录!',
                    });
                    Dml.fun.winReload();
                }else if(data.msg){
                    Dml.fun.showValidateError($("#pwd"), data.msg);
                    Dml.fun.showValidateError($("#repwd"), data.msg);
                }
            }
        });
    });

    //个人资料头像
    $('.js-img-up').uploadPreview({ Img: ".js-img-show", Width: 94, Height: 94 ,Callback:function(){
        $('#jsAvatarForm').submit();
    }});


    $('.changeemai_btn').click(function(){
        Dml.fun.showDialog('#jsChangeEmailDialog', '#jsChangePhoneTips' ,'jsChangeEmailTips');
    });
    $('#jsChangeEmailCodeBtn').on('click', function(){
        sendCodeChangeEmail($(this));
    });
    $('#jsChangeEmailBtn').on('click', function(){
        changeEmailSubmit($(this));
    });


    //input获得焦点样式
    $('.perinform input[type=text]').focus(function(){
        $(this).parent('li').addClass('focus');
    });
    $('.perinform input[type=text]').blur(function(){
        $(this).parent('li').removeClass('focus');
    });

    laydate({
        elem: '#birth_day',
        format: 'YYYY-MM-DD',
        max: laydate.now()
    });

    verify(
        [
            {id: '#nick_name', tips: Dml.Msg.epNickName, require: true}
        ]
    );
    //保存个人资料
    $('#jsEditUserBtn').on('click', function(){
        var _self = $(this),
            $jsEditUserForm = $('#jsEditUserForm')
            verify = verifySubmit(
            [
                {id: '#nick_name', tips: Dml.Msg.epNickName, require: true}
            ]
        );
        if(!verify){
           return;
        }
        $.ajax({
            cache: false,
            type: 'post',
            dataType:'json',
            url:"/users/info/",
            data:$jsEditUserForm.serialize(),
            async: true,
            beforeSend:function(XMLHttpRequest){
                _self.val("保存中...");
                _self.attr('disabled',true);
            },
            success: function(data) {
                if(data.nick_name){
                    _showValidateError($('#nick_name'), data.nick_name);
                }else if(data.birday){
                   _showValidateError($('#birth_day'), data.birday);
                }else if(data.address){
                   _showValidateError($('#address'), data.address);
                }else if(data.status == "failure"){
                     Dml.fun.showTipsDialog({
                        title: '保存失败',
                        h2: data.msg
                    });
                }else if(data.status == "success"){
                    Dml.fun.showTipsDialog({
                        title: '保存成功',
                        h2: '个人信息修改成功！'
                    });
                    setTimeout(function(){window.location.href = window.location.href;},1500);
                }
            },
            complete: function(XMLHttpRequest){
                _self.val("保存");
                _self.removeAttr("disabled");
            }
        });
    });


});