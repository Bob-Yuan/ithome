function showloading(options) {
    $('.loadingplugin').show();
    return;
    var htmlstr = "<div class=\"loadingplugin\"><div class=\"loadwrapper\" style=\"position: fixed;left: 0;background: black;right: 0;top: 0;bottom: 0;opacity: 0.2;\"></div><img class=\"loadimg\" style=\"position: fixed;    width: 90px;    left: 50%;    top: 40%;    margin-top: -20px;    margin-left: -45px;\" src=\"images/lapinloading.gif\" /></div>";
    $(htmlstr).appendTo("body");
}
function openinappConfirm(targeturl) {
    mscConfirm({
        title: '请安装或启动IT之家客户端最新版!',
        subtitle: '',    // default: ''
        okText: '前往',      // default: OK
        cancelText: '取消',   // default: Cancel
        dismissOverlay: true,   // default: false, closes dialog when clicked on overlay.
        onOk: function () {
            location.href = "/shop/downapp.htm?targeturl=" + targeturl;
        },
        onCancel: function () {
            ;
        }
    });
}