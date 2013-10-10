var timer1 = null;

var beforePosX = 0;
var lastPosX = 0;

function getposx() {
    var touch = event.touches[0];
    beforePosX = touch.pageX;
    lastPosX = beforePosX;
}

function getmovingposx() {
    var touch = event.touches[0];
    lastPosX = touch.pageX;
}

var DiaogColse2 = function () {
    $("#dialogMain").remove();
    $("#mask").remove();
}

var getw = function (w) {
    return Systemdata.width / 569 * w;
}

var geth = function (h) {
    return Systemdata.height / 320 * h;
}

//生成数字对应的图片格式
function getNum(val, type) {
    var str = new Array();
    var temp = String(val);
    //截取字符串
    var left = 0;
    for (var i = 0; i < temp.length; i++) {
        switch (temp[i]) {
            case '-':
                str.push("<div class='Number' style='background-position:-" + (10 * 14) + "px -" + (type * 16) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
            case '/':
                str.push("<div class='Number' style='background-position:-" + (12 * 14) + "px -" + (type * 16) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
            case '+':
                str.push("<div class='Number' style='background-position:-" + (11 * 14) + "px -" + (type * 16) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
            default:
                str.push("<div class='Number' style='background-position:-" + (Number(temp[i]) * 14) + "px -" + (type * 16) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
        }
        left += 10;
    }
    return str.join("");
}

//生成数学符号
function getNumPoint(val, type) {
    return "<div class='Number' style='background-position:-" + (val * 14) + "px -" + (type * 16) + "px'></div>";
}

function DiaogColse1() {
    $("#dialogMain1").remove(); $("#masktask").remove();
}

//生成数字对应的图片格式
function getNumSmall(val, type, left) {
    var str = new Array();
    var temp = String(val);
    //截取字符串
    for (var i = 0; i < temp.length; i++) {
        switch (temp[i]) {
            case 'X':
                str.push("<div class='NumberSmall' style='background-position:-70px -" + (type * 10) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
            default:
                str.push("<div class='NumberSmall' style='background-position:-" + (Number(temp[i]) * 7) + "px -" + (type * 10) + "px");
                str.push(";left:" + left + "px;'></div>");
                break;
        }
        left += 7;
    }
    return str.join("");
}

//生成数字对应的图片格式
function getLvNum(val,top,left) {
    var str = new Array();
    var temp = String(val);
    if (left)
        left += 17;
    else
        left = 17;
    //截取字符串
    for (var i = 0; i < temp.length; i++) {
        str.push("<div class='HeroLVSmall' style='background-position:-" + (Number(temp[i]) * 9) + "px 0px;");
        if (top != null)
            str.push("top:" + top + "px;");
        str.push("left:" + left + "px;'></div>");
        left += 8;
    }
    return str.join("");
}

//生成数字对应的图片格式
function getNumBig(val, top, left) {
    var temp = String(val);
    var str = new Array();
    //截取字符串
    for (var i = 0; i < temp.length; i++) {
        str.push("<div class='NumBig' style='background-position:-" + (Number(temp[i]) * 24) + "px 0px");
        str.push(";left:" + left + "px;top:" + top + "px;'></div>");
        left += 24;
    }
    return str.join("");
}

//生成数字对应的图片格式
function getNum2(val) {
    var temp = String(val);
    var str = new Array();
    //截取字符串
    var left = 0;
    for (var i = 0; i < temp.length; i++) {
        str.push("<div class='Num' style='background-position:-" + (Number(temp[i]) * 12) + "px 0px");
        str.push(";left:" + left + "px;'></div>");
        left += 11;
    }
    return str.join("");
}

//显示滚动消息
var ShowNewMess = function () {
    if (showtime != 0)
        return;

    if (messArry.length < 1) {
        $("#messtitle").css("display", "none");
        return;
    }
    else
        $("#messtitle").css("display", "");

    var x = 0, index = 0;
    $("#titletext").html(messArry[index]);
    var height = $("#titletext").height();
    showtime = 1;
    var newtime = null;
    $("body").everyTime("4s", "titletexta", function () {
        if (index == messArry.length - 1 && height < 28) {
            $("#titletext").html("");
            $("#titletext").css({ "top": 0 });
            $("#messtitle").css("display", "none");
            showtime = 0;
            messArry.splice(0, messArry.length);
            $("body").stopTime("titletexta");
        }
        else {
            $("body").everyTime("50ms", "titletextb", function () {
                x -= 3;
                $("#titletext").css({ "top": x - 3 });
                if (x % -27 == 0 && x != 0) {
                    $("body").stopTime("titletextb");
                    if (height < 28) {
                        x = 0;
                        messArry.splice(0, 1);
                        if (index < messArry.length) {
                            $("#titletext").html(messArry[index]);
                            $("#titletext").css({ "top": 0 });
                            height = $("#titletext").height();
                        }
                        else
                            height = 0;
                    }
                    else {
                        height -= 27;
                        $("#titletext").css({ "top": x });
                    }
                }
            });
        }
    });
};


/*文字提示*/
function showTextMess(mess, type) {
    if (mess != "") {
        if (timer1 != null)
            clearInterval(timer1);
        
        var color = "Red";
        if (type == 1)
            color = "#00FF00";

        if (document.getElementById("mess") != null)
            $("#mess").remove();

        var str = new Array();        
        str.push("<table cellpadding='0' cellspacing='0'><tr height='37px'><td style='width:16px;background:url(res/dialog/PromptBox1.png) no-repeat;'>&nbsp;</td><td><div class='messText' style='color:" + color + ";'>" + mess + "</div></td><td><div class='messTextRight' id='messright'></div></td></tr></table>");        
        var divnode = document.createElement("div");
        divnode.id = 'mess';
        divnode.className = 'messTextMain';
        divnode.innerHTML = str.join("");
        document.getElementById("other2").appendChild(divnode);        
        $("#mess").css({ 'left': (Systemdata.width - Number($("#mess").width())) / 2});

        var offset1 = 0;
        var top = 150
        timer1 = setInterval(function () {
            offset1 += 1;
            $("#mess").css({ 'top': top + 'px' });
            if (offset1 > 30)
                top -= 5;
            if (offset1 >= 55) {
                clearInterval(timer1);                
                $("#mess").remove();
            }
        }, 40);
    }
}

//只允许输入数字、字母
function keyDigitWithOutDotKeyCheck(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : "") //兼容IE和Firefox获得keyBoardEvent对象
    var key = evt.keyCode ? evt.keyCode : evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
    if ((key < 48 || (key > 57 && key < 65) || (key > 90 && key < 91) || key > 122) && key != 8) {
        return false;
    }
    else {
        return true;
    }
}



/*弹出对话框*/
function ShowMessage(message, fun, exi, string, showclose) {
    $("#mask1").remove();
    $("#message").remove();
    var str = new Array();
    //str.push("<div id='message' style='left:" + (Systemdata.width - 397) / 2 + "px;'>");
    str.push("<div id='messageText'>" + message + "</div>");
    if (fun == null)
        str.push("<div id='messageOk' style='left:170px' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){$(\"#mask1\").remove();$(\"#message\").remove(); }'></div>");
    else {
        str.push("<div id='messageOk'  ontouchmove='getmovingposx()' ontouchstart='getposx()'></div>");
        str.push("<div id='messageCancel'  ontouchmove='getmovingposx()' ontouchstart='getposx()'></div>");
    }
    if (showclose == null)
        str.push("<div id='closeMessage'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#mask1\").remove();$(\"#message\").remove();}'></div>");
    if (string != null) {
        str.push(string);
    }

    var divnode = document.createElement("div");
    divnode.id = "mask1";
    divnode.className = "mask1 opacity1";
    document.getElementById("other").appendChild(divnode);

    divnode = document.createElement("div");
    divnode.id = "message";
    divnode.innerHTML = str.join("");
    document.getElementById("other").appendChild(divnode);
    $("#message").css({ 'left': (Systemdata.width - 397) / 2 });

    if (fun) {
        document.getElementById('messageOk').ontouchend = fun;
    }
    if (exi) {
        document.getElementById('messageCancel').ontouchend = exi;
    }
}

/*弹出升级对话框*/
function showUpLvDialog(sliver, actionpoints) {
    $("#DialogDiv1").remove();
    if (UserJson.vip > 0) {
        sliver = sliver / 2;
        actionpoints = actionpoints / 2;
    }

    var str = new Array();
    //str.push("<div id='DialogDiv1' class='DialogDiv' style='left:" + (Systemdata.width - 450) / 2 + "px;z-index:10000;'>");
    str.push("<div id='UpLvTitle'></div>");
    str.push("<div id='YesBut'><a href='javascript:void(0);'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#DialogDiv1\").remove();} '></a></div>");
    str.push("<div class='UpLvRewardBox' style='background:url(res/dialog/Reward_bg1.png) no-repeat;top:67px;left:59px;'>");

    str.push("<div class='RewardBox' style='top:33px;left:23px;'>");
    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/200.png) no-repeat;'></div>");
    str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>银币</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + sliver + "</div>");
    str.push("</div>");

    str.push("<div class='RewardBox' style='top:89px;left:23px;'>");
    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/500.png) no-repeat;'></div>");
    str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>行动点</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + actionpoints + "</div>");
    str.push("</div>");
    str.push("</div>");

    str.push("<div class='UpLvRewardBox' style='background:url(res/dialog/Reward_bg2.png) no-repeat;top:67;left:231px;'>");
    str.push("<div class='RewardBox' style='top:33px;left:23px;'>");
    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/200.png) no-repeat;'></div>");
    str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>银币</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + sliver + "</div>");
    str.push("</div>");

    str.push("<div class='RewardBox' style='top:89px;left:23px;'>");
    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/500.png) no-repeat;'></div>");
    str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>行动点</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + actionpoints + "</div>");
    str.push("</div>");
    str.push("</div>");
    //str.push("</div>");

    var divnode = document.createElement("div");
    divnode.id = 'DialogDiv1';
    divnode.className = 'DialogDiv';
    divnode.innerHTML = str.join("");
    document.getElementById("other").appendChild(divnode);
    $("#DialogDiv1").css({ 'left': (Systemdata.width - 450) / 2});
}

/*弹出获得奖励对话框*/
function ShowRewardDialog(itemjson) {
    if (itemjson == "")
        return;
    if (document.getElementById("DialogDiv2") != null)
        $("#DialogDiv2").remove();
    var str = new Array();    
    str.push("<div id='RewardTitle'></div>");
    str.push("<div id='YesBut'><a href='javascript:void(0);'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#DialogDiv2\").remove();if(document.getElementById(\"dialogMain\") == null) {$(\"#img1\").css(\"display\", \"none\");$(\"#imgbg\").css(\"display\", \"\");}}'></a></div>");
    var tempjson = eval("([" + itemjson + "])");
    if (tempjson.length > 0) {
        var countlist = tempjson[0].count.split(",");
        var itemlist = tempjson[0].ItemId.split(",");
        for (var i = 0; i < itemlist.length; i++) {
            if (Number(countlist[i]) == 0) {
                itemlist.splice(i, 1);
                countlist.splice(i, 1);
                i -= 1;
            }
        }        
        str.push("<table style='width:350px;height:150px;position:relative;	z-index:11;left:47px;top:65px;'>");
        str.push("<tr valign='middle'><td align='center'>");
        for (var i = 0; i < itemlist.length; i++) {
            if (i % 3 == 0 && i != 0) {
                str.push("</td><tr valign='middle'><td align='center' style='width:350px;'>");
            }

            str.push("<div class='RewardBox' style='position:relative;float:left;'>");
            if (Number(itemlist[i]) < 1000) {
                str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/" + itemlist[i] + ".png) no-repeat;'></div>");
                str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>");
                switch (Number(itemlist[i])) {
                    case 100:
                        str.push("主公EXP");
                        break;
                    case 200:
                        str.push("银币");
                        break;
                    case 300:
                        str.push("军功");
                        break;
                    case 400:
                        str.push("声望");
                        break;
                    case 500:
                        str.push("行动力");
                        break;
                    case 600:
                        str.push("萌币");
                        break;
                }
                str.push("</div>");

            }
            else {
                for (var m = 0; m < GoodsJson.length; m++) {
                    if (GoodsJson[m].ItemId == Number(itemlist[i])) {
                        str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                        str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>" + GoodsJson[m].IName + "</div>");
                        break;
                    }
                }
            }
            str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + countlist[i] + "</div>");
            str.push("</div><div style='position:relative;float:left;width:5px;height:2px;'></div>");
        }
        str.push("</td></tr></table>");
    }
    //str.push("</div>");
    //str.push("<div id='DialogDiv2' class='DialogDiv' style='left:" + (Systemdata.width - 450) / 2 + "px;z-index:10000;'>");
    var divnode = document.createElement("div");
    divnode.id = 'DialogDiv2';
    divnode.className = 'DialogDiv';
    divnode.innerHTML = str.join("");
    document.getElementById("other").appendChild(divnode);
    $("#DialogDiv2").css({ "left": (Systemdata.width - 450) / 2 });
}


/*通关地图后*/
var UpmapDialog = function (json) {
    $("#DialogDiv3").remove();
    var str = new Array();
    var BackJson = JSON.parse(json);
    str.push("<div id='UpLvTitle' style='background:url(res/dialog/Expedition_Mark.png) no-repeat;width:284px;height:67px;left:83px;'></div>");
    str.push("<div id='YesBut'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#DialogDiv3\").remove();'></a></div>");
    str.push("<div id='messageText' style='text-align:left;font-size:14px;top:70px;left:70px;'>" + BackJson.text + "</div>");
    var itemlist = BackJson.itemid.split(",");
    var left = 50;
    for (var i = 0; i < itemlist.length; i++) {
        str.push("<div class='RewardBox' style='position:relative;float:left;left:" + left + "px;top:170px;'>");
        if (Number(itemlist[i]) < 1000) {
            str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/" + itemlist[i] + ".png) no-repeat;'></div>");
            str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>");
            switch (Number(itemlist[i])) {
                case 100:
                    str.push("主公EXP");
                    break;
                case 200:
                    str.push("银币");
                    break;
                case 300:
                    str.push("军功");
                    break;
                case 400:
                    str.push("声望");
                    break;
                case 500:
                    str.push("行动力");
                    break;
                case 600:
                    str.push("萌币");
                    break;
                case 700:
                    str.push("蓝宝石");
                    break;
                case 701:
                    str.push("紫宝石");
                    break;
                case 702:
                    str.push("红宝石");
                    break;
                case 703:
                    str.push("黄宝石");
                    break;

            }
            str.push("</div>");

        }
        else {
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == Number(itemlist[i])) {
                    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>" + GoodsJson[m].IName + "</div>");
                    break;
                }
            }
        }
        str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + BackJson.itemnum.split(",")[i] + "</div>");
        str.push("</div>");

        left += 5;
    }

    var divnode = document.createElement("div");
    divnode.id = 'DialogDiv3';
    divnode.className = 'DialogDiv';
    divnode.innerHTML = str.join("");
    document.getElementById("other").appendChild(divnode);
    $("#DialogDiv3").css({ 'left': (Systemdata.width - 450) / 2 });

    updateGold(1, 0 - BackJson.SCoin);

    if (BackJson.GoodsJson.length > 0 && WarhoushJson.data[0].isResert == 1)
        AddItemToWarOther(BackJson.GoodsJson);
    if (BackJson.tempsJson.length > 0 && TemporaryJson.data[0].isResert == 1)
        AddItemToTwarOther(BackJson.tempsJson);

    PubJsonNew.data[0].isResert = 0;
}

function GetHeroLocalIndex(HeroIndex) {
    var localindex = 0;
    for (; localindex < GeneralsJson.length; localindex++) {
        if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId) {
            return localindex;
        }
    }
}

function GetItemIndex(ItemIndex) {
    var localindex = 0;
    for (; localindex < GoodsJson.length; localindex++) {
        if (GoodsJson[localindex].ItemId == WarhoushJson.data[0].GoodsList[ItemIndex].ItemId) {
            return localindex;
        }
    }
}

function GetSkillIndex(skillID) {
    var localindex = 0;
    for (; localindex < SkillJson.length; localindex++) {
        if (SkillJson[localindex].sId == skillID) {
            return localindex;
        }
    }
}

/*倒计时*/
var expireTime = function (expires) {
    if (expires >= 0) {
        var second = expires;
    } else {
        var second = "0";
        return second;
    }

    var day = "", hour = min = "00:";
    if (second >= 86400) {
        day = Math.floor(second / 86400) + ":";
        second = second % 86400;
    }
    if (second >= 3600) {
        hour = Math.floor(second / 3600);
        hour = hour < 10 ? "0" + hour + ":" : hour + ":";
        second = second % 3600;
    }
    if (second >= 60) {
        min = Math.floor(second / 60);
        min = min < 10 ? "0" + min + ":" : min + ":";
        second = second % 60;
    }
    second = second < 10 ? "0" + second : second;

    return day + hour + min + second;
}

/*倒计时*/
var expireTime1 = function (expires) {
    if (expires >= 0) {
        var second = expires;
    } else {
        var second = "0";
        return second;
    }

    var day = "", hour = min = "00:";
    if (second >= 86400) {
        day = Math.floor(second / 86400) + "天";
        second = second % 86400;
    }
    if (second >= 3600) {
        hour = Math.floor(second / 3600);
        hour = hour < 10 ? "0" + hour + "时" : hour + "时";
        second = second % 3600;
    }
    if (second >= 60) {
        min = Math.floor(second / 60);
        min = min < 10 ? "0" + min + "分" : min + "分";
        second = second % 60;
    }
    second = second < 10 ? "0" + second + "秒" : second + "秒";

    return day + hour + min + second;
}

/*加载用户数据*/
function loadUserData() {
    //用户数据
    $("#UserLVBG").css({ 'width': (UserJson.UExp / UserJson.EUExp * 130) });
    $("#UserLV").html(getNum2(UserJson.UserLV));
    $("#Money").html(UserJson.Silver);
    $("#UserName").html(UserJson.UName);
    $("#Gold").html(UserJson.Gold);
    $("#Mobility").html(UserJson.ActionPs + "/" + UserJson.zActionPs);
    $("#UserExp").html(UserJson.UExp + "/" + UserJson.EUExp);
    $("#jungong").html(UserJson.MilitaryMerit);
    $("#UserHand").css({ "background": "url(res/city/UserImg/" + UserJson.UserHand + ".png) no-repeat" });
    $("#VipLv").css("background-position", "0 -" + (UserJson.vip * 12) + "px");
}

/*改变金钱的数量*/
function updateGold(type, val) {
    if (type == 1) {
        if (val <= UserJson.Silver) {
            UserJson.Silver -= val;
            $("#Money").html(UserJson.Silver);
        }
    }
    else if (type == 2) {
        if (val <= UserJson.Gold) {
            UserJson.Gold -= val;
            $("#Gold").html(UserJson.Gold);
        }
    }
    else if (type == 3) {
        if (val <= UserJson.ActionPs) {
            UserJson.ActionPs -= val;
            $("#Mobility").html(UserJson.ActionPs + "/" + UserJson.zActionPs);
            GetActionJudgment();
            if (document.getElementById("ActionBox") != null) {
                $("#ActionBox").html(UserJson.ActionPs + "/" + UserJson.zActionPs);
            }
        }
    }
    else if (type == 4) {
        if (val <= UserJson.MilitaryMerit) {
            UserJson.MilitaryMerit -= val;
            $("#jungong").html(UserJson.MilitaryMerit);
        }
    }
    else {        
        UserJson.UExp -= val;
        $("#UserExp").html(UserJson.UExp + "/" + UserJson.EUExp);
        $("#UserLVBG").css({ 'width': (UserJson.UExp / UserJson.EUExp * 91) });
    }
}

//往包裹里添加数据
function AddItemToWar(itemjson) {
    var tempHouseJson = [];
    tempHouseJson = eval("([" + itemjson + "])");
    for (var i = 0; i < tempHouseJson.length; i++) {
        var bool = false;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (tempHouseJson[i].ItId == WarhoushJson.data[0].GoodsList[j].ItId) {
                WarhoushJson.data[0].GoodsList[j] = tempHouseJson[i];
                bool = true;
                break;
            }
        }
        if (!bool)
            WarhoushJson.data[0].GoodsList.push(tempHouseJson[i]);
    }

    if (document.getElementById("WhBg") != null) {
        WarHouseClass.templist = new Array();
        WarHouseClass.ShowWHData(1, 0, false);
    }
}

//往包裹里添加数据
function AddItemToWarOther(itemjson) {
    for (var i = 0; i < itemjson.length; i++) {
        var bool = false;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (itemjson[i].ItId == WarhoushJson.data[0].GoodsList[j].ItId) {
                WarhoushJson.data[0].GoodsList[j] = itemjson[i];
                bool = true;
                break;
            }
        }
        if (!bool)
            WarhoushJson.data[0].GoodsList.push(itemjson[i]);
    }    
}



//往临时包裹里添加数据
function AddItemToTwar(itemjson) {
    var tempHouseJson = [];
    tempHouseJson = eval("([" + itemjson + "])");
    for (var i = 0; i < tempHouseJson.length; i++) {
        var bool = false;
        for (var j = 0; j < TemporaryJson.data[0].GoodsList.length; j++) {
            if (tempHouseJson[i].ItId == TemporaryJson.data[0].GoodsList[j].ItId) {
                TemporaryJson.data[0].GoodsList[j] = tempHouseJson[i];
                bool = true;
                break;
            }
        }
        if (!bool)
            TemporaryJson.data[0].GoodsList.push(tempHouseJson[i]);
    }
}

    //往临时包裹里添加数据
function AddItemToTwarOther(itemjson) {    
    for (var i = 0; i < itemjson.length; i++) {
        var bool = false;
        for (var j = 0; j < TemporaryJson.data[0].GoodsList.length; j++) {
            if (itemjson[i].ItId == TemporaryJson.data[0].GoodsList[j].ItId) {
                TemporaryJson.data[0].GoodsList[j] = itemjson[i];
                bool = true;
                break;
            }
        }
        if (!bool)
            TemporaryJson.data[0].GoodsList.push(itemjson[i]);
    }
}

//充值入口
function Recharge() {
    //获取充值数据
    EnterBuliding(8600);
}

//充值结果
function RechargeResert(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        updateGold(2, 0 - BackJson.M);       
        if (UserJson.vip != BackJson.vip) {
            schoolJson.data[0].isResert = 0;
            FunBenJson.data.isResert = 0;
        }
        if (VipJson.data.isResert == 1) {
            VipJson.data.upmoney = BackJson.upmoney;
        }

        CumulationRechargeJson.data.isResert = 0;
        ZodiacData.data.isResert = 0;
    }
    ShowMessage(BackJson.info);
}

//图标跳(CreateBy nobody) 封装方法
var logoAnimate = function (iconName) {
    var flag = true;
    var logoLocation = 0;
    $("body").everyTime("20ms", iconName, function () {
        if (flag)
            logoLocation += 0.2;
        else
            logoLocation -= 0.2;
        if (logoLocation >= 5) {
            flag = false;
        }
        if (logoLocation < 0) {
            flag = true;
        }
        $("#" + iconName).css("top", logoLocation + 24 + "px");
    });
};
