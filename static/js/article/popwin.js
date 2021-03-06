var popWin = {
    scrolling: 'no',
    //是否显示滚动条 no,yes,auto

int: function() {
        this.mouseClose();
        this.closeMask();
        //this.mouseDown();

    },

showWin: function(width, height, title, src) {
        var iframeHeight = height - 52;
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var inntHtml = '';
        inntHtml += '<div id="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:1999;background:#000; filter:alpha(opacity=60); -moz-opacity:0.6; -khtml-opacity: 0.6; opacity:0.6;"></div>'
        inntHtml += '<div id="maskTop" style="width: ' + width + 'px; height: ' + height + 'px; border-radius: 8px; background: #fff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4); -moz-box-shadow: 2px 2px 10px #909090; -webkit-box-shadow: 2px 2px 10px #909090; box-shadow: 2px 2px 10px #909090;">'
        inntHtml += '<div id="maskTitle" style="height: 50px; line-height: 50px;border-radius: 8px;  font-family: Microsoft Yahei; font-size: 20px; color: #333333; padding-left: 20px; text-align:center; position: relative;">'
        inntHtml += '' + title + ''
        inntHtml += '<div id="popWinClose" style="background-image:url(/static/image/register/close.svg);"></div>'
        inntHtml += '</div>'
        inntHtml += '<iframe width="' + width + '" height="' + iframeHeight + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + src + '"></iframe>';

        $("body").append(inntHtml);
        this.int();


    },

mouseClose: function() {
        $("#popWinClose").on('mouseenter',
        function() {
            $(this).css("background-image", "url(/static/image/register/close.svg)");

        });

        $("#popWinClose").on('mouseleave',
        function() {
 						$(this).css("background-image", "url(/static/image/register/close.svg)");
        });

    },

closeMask: function() {
        $("#popWinClose").on('click',
        function() {
            $("#mask,#maskTop").fadeOut(function() {
                $(this).remove();

            });

        });

    }

};