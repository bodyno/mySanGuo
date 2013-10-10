var PromptJson = [
{ "text": "只有成品的武器出售才可以换取宝石！" },
{ "text": "多余的武魂可以出售以换取银币和宝石！" },
{ "text": "武魂可以在酒馆召唤对应的武将！" },
{ "text": "装备碎片只有在铁匠铺合成才可以使用!" },
{ "text": "紫色装备碎片只有在副本才会掉落！" },
{ "text": "每天的世界BOSS是产出银币最快的途径！" },
{ "text": "点击人物头像，可以进入到VIP每日礼包的领取界面！" },
{ "text": "每天的著名战役0点重置4次，15:00还会赠送3次！" },
{ "text": "只有15级以上的武将解雇后才会返还经验书！" },
];

var LoginClass = {

    //自动登录
    QuickLogin: function () {
        if (serverJson.latelyServer.length < 1 && serverid == 0) {
            showservers();
            return;
        }
        if (serverid == 0) {
            if (serverJson.latelyServer[0].type == 2 || serverJson.latelyServer[0].type == 3) {
                showservers();
                return;
            }
            serverid = serverJson.latelyServer[0].sid;
        }
        window.GameMainClass.startGame(serverid, autologin);
    }
}

//新加(Nobody 2013-4-24) logo上下动
var logoAnimate = function () {
    var flag = true;
    $("#main img").css("position","absolute").css("left", (Systemdata.width - 282) / 2 + "px").css("top", "-110px");
    var logoLocation = -110;
    var position = 5;
    var time = setInterval(function () {
        if (flag)
            logoLocation += position;
        else
            logoLocation -= position;
        if (logoLocation >= 10) {
            flag = false;
            position = 0.5;
        }
        if (logoLocation < 0) {
            flag = true;
        }
        $("#main img").css("top", logoLocation + "px");
    }, 33)
}
$(function () {
    logoAnimate();
})