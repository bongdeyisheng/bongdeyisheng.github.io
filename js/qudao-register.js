//ios 渠道代理ID
var pid = "4124";
//report url
var reportUrl = "//dt.6cchome.com/register/qd";
var arr = {
apk: 'http://hot.882yishenghuo.com/app/142121496df63e94d63b22ecfc906b8cbf1.apk',
    ipa: 'https://itunes.apple.com/cn/app/id1455193752'
}

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

if (browser.versions.android) {
    $('.appdown').find('a').attr('href', arr.apk);
} else if (browser.versions.ios) {
    $('.appdown').find('a').attr('href', arr.ipa);
} else {
    $('.appdown').find('a').attr('href', arr.apk);
}

$(document).ready(function () {
    var a_list = document.getElementsByTagName("a");
    for (i = 0; i < a_list.length; i++) {
        (function (index) {
            a_list[index].addEventListener('click', function () {
                //loadRemarkHtml();

                    setupCopy(pid);
                    reportInfo(pid, "0.0.0.0");
            }, false);
        })(i)
    }
});

function reportInfo(id, addr) {
    $.get(reportUrl, { ip: addr, id: id, t: 2 }, function (data, status, xhr) { });
}

function setupCopy(id) {
    var text = "&8#@2" + id;
    $('.appdown').find('a').attr("data-clipboard-action", "copy");
    $('.appdown').find('a').attr("data-clipboard-text", text);

    var clipboard = new ClipboardJS('a');
    clipboard.on('success', function (e) {
        console.log('Text:', e.text);
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        console.error('Trigger:', e.trigger);
    });
}
