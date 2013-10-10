var timecount1, timecount2, timecount3, timecount4, timecount5, timecount6, timecount9, timecount10, showtime = 0, coolingtime = 0;
var arrays = new Array(timecount1, timecount2, timecount3, timecount4, timecount5, timecount6);
var tempdialog = "";
var messArry = new Array();
var showgoodstime1, showgoodstime2;
var IsAthleticsRefreshTim = false, isZhengShouTime = false, iscooling = false, isSubmit = false, isActionBack = false, isJb = false, isSJ = false, isactime = false, baowucooling = false;
var actime = 0, canchat = 0;
var haschat = false;
var chattype = 2; //1,系统，2世界 3组

var FestivalJson = {
    "data": {
        "actid": 1351, "lefttime": 113900, "itemlist": "2110,6901,6554,6846", "itemnum": "1,1,50,2", "status": 0, "totalmoney": 300
    }
};

var QianDaoData = {
    "data": {
        "isResert": 0, "days": "1,2,1,0,0", "nday": 3
    }
};
                                                      
//阵法加成
var ZfJcData = {
    "data": {
        "jlist": [
            { "job": 1, "type": 1, "sum": 40 },
            { "job": 1, "type": 2, "sum": 40 },
            { "job": 1, "type": 3, "sum": 40 },
            { "job": 2, "type": 1, "sum": 40 },
            { "job": 2, "type": 2, "sum": 40 },
            { "job": 2, "type": 3, "sum": 40 },
            { "job": 3, "type": 1, "sum": 40 },
            { "job": 3, "type": 2, "sum": 40 },
            { "job": 3, "type": 3, "sum": 40 }
        ], "isResert": 0
    }
};
//灵器加成
var lqJcData = {
    "data": {
        "llist": [
            { "gsid": 3, "hp": 10, "atk": 40, "def": 20 }
        ], "isResert": 0
    }
};

//重置灵器加成数据
var ResertlqJcData = function (json) {
    var BackJson = JSON.parse(json);
    lqJcData.data.llist = BackJson.json;
    lqJcData.data.isResert = 1;
}

//12生肖本地数据
var ZodiacJson = [
{ "id": 1, "lv": 30, "detail": "<font style='color:#ff0000'>冥界将军</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木子灵器，铁子灵器<br/>铜子灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁子灵器，铜子灵器<br/>银子灵器，金子灵器" },
{ "id": 2, "lv": 40, "detail": "<font style='color:#ff0000'>混沌力士</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木丑灵器，铁丑灵器<br/>铜丑灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁丑灵器，铜丑灵器<br/>银丑灵器，金丑灵器" },
{ "id": 3, "lv": 50, "detail": "<font style='color:#ff0000'>热血战神</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木寅灵器，铁寅灵器<br/>铜寅灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁寅灵器，铜寅灵器<br/>银寅灵器，金寅灵器" },
{ "id": 4, "lv": 60, "detail": "<font style='color:#ff0000'>灭绝师太</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木卯灵器，铁卯灵器<br/>铜卯灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁卯灵器，铜卯灵器<br/>银卯灵器，金卯灵器" },
{ "id": 5, "lv": 70, "detail": "<font style='color:#ff0000'>疾风游侠</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木午灵器，铁午灵器<br/>铜午灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁午灵器，铜午灵器<br/>银午灵器，金午灵器" },
{ "id": 6, "lv": 80, "detail": "<font style='color:#ff0000'>拂晓大仙</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木未灵器，铁未灵器<br/>铜未灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁未灵器，铜未灵器<br/>银未灵器，金未灵器" },
{ "id": 7, "lv": 90, "detail": "<font style='color:#ff0000'>齐天大圣</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木申灵器，铁申灵器<br/>铜申灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁申灵器，铜申灵器<br/>银申灵器，金申灵器" },
{ "id": 8, "lv": 100, "detail": "<font style='color:#ff0000'>彩冠奇士</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木酉灵器，铁酉灵器<br/>铜酉灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁酉灵器，铜酉灵器<br/>银酉灵器，金酉灵器" },
{ "id": 9, "lv": 110, "detail": "<font style='color:#ff0000'>刺客信条</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木戌灵器，铁戌灵器<br/>铜戌灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁戌灵器，铜戌灵器<br/>银戌灵器，金戌灵器" },
{ "id": 10, "lv": 120, "detail": "<font style='color:#ff0000'>天蓬元帅</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木亥灵器，铁亥灵器<br/>铜亥灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁亥灵器，铜亥灵器<br/>银亥灵器，金亥灵器" },
{ "id": 11, "lv": 130, "detail": "<font style='color:#ff0000'>猎心女皇</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木辰灵器，铁辰灵器<br/>铜辰灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁辰灵器，铜辰灵器<br/>银辰灵器，金辰灵器" },
{ "id": 12, "lv": 140, "detail": "<font style='color:#ff0000'>东宫太子</font><br/><font style='color:#ffff00'>容易掉落:</font><br/>木巳灵器，铁巳灵器<br/>铜巳灵器<br/><font style='color:#ffff00'>困难掉落:</font><br/>铁巳灵器，铜巳灵器<br/>银巳灵器，金巳灵器" }
];

//服务器传过来的
var ZodiacData = {
    "data": { "dareNum": 7, "BuyNum": 3, "gold": 50,
        "isResert": 0,
        "zlist": [
            { "Diff": 2, "id": 1, "lastDiff": 0 },
            { "Diff": 2, "id": 2, "lastDiff": 0 }
        ]
    }
};

    //查看生肖详细资料
var ShowZodiacDetail = function (index) {
    var left = 0;
    if (index % 3 == 0)
        left = 70;
    else if (index % 3 == 1)
        left = 200;
    else
        left = 290;
    $("#showDatass").remove();
    var str = new Array();
    str.push("<div id='showDatass' class='showData' style='top:80px;left:" + left + "px;z-index:35;'>");
    str.push("<div id='HeroDataMessageClose' style='left:113px;top:2px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){$(\"#showDatass\").remove();}'></a></div>");
    str.push("<div id='showDataUp'></div>");
    str.push("<div id='showDataCenter' style='font-size:12px;font-weight:200;' >");
    str.push("<table width='93%'>");
    str.push("<tr><td>" + ZodiacJson[index].detail + "</td></tr></table>");
    str.push("</div>");
    str.push("<div id='showDataDown' ></div>");
    str.push("</div>");

    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);
}    

//12生肖界面
var LoadZodiac = function (json) {
    if (UserJson.UserLV < 30) {
        showTextMess("主公30级开启", 0);
        return;
    }
    if (ZodiacData.data.isResert == 0) {
        if (json) {
            var BackJson = JSON.parse(json);
            ZodiacData.data = BackJson.json;
        }
        else {
            window.GameMainClass.sendRequestJson(1237, '', "LoadZodiac");
            return;
        }
    }
    DiaogColse();
    var divnode = document.createElement("div");
    divnode.id = 'mask';
    divnode.className = 'mask opacity';
    document.getElementById("main").appendChild(divnode);

    divnode = document.createElement("div");
    divnode.id = 'dialogMain';
    document.getElementById("main").appendChild(divnode);

    $("#dialogMain").css({ "left": (Systemdata.width - 446) / 2, "width": 446, "height": 292, "top": 14, "background": "url(res/Zodiac/Zod_bg1.png) no-repeat" });

    var str = new Array();
    str.push("<div class='close' style='left:402px;top:6px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();'></div>");
    str.push('<div id="albumzod"  style="width:320px;height:210px;top:50px;left:98px;" class="album"><div class="paging">');
    var len = 0, left = 0;

    for (var i = 0; i < ZodiacJson.length; i++) {
        if (i % 3 == 0) {
            str.push("<div class='page pagediv' style='width:320px;height:210px;'>");
        }
        len++;
        str.push("<div class='ZodiacBox' style='left:" + left + "px;'>");

        if (UserJson.UserLV >= ZodiacJson[i].lv) {
            str.push("<div id='zbody" + i + "' class='ZodiacBody' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowZodiacDetail(" + i + ");' style='background-position:0 -" + (ZodiacJson[i].id - 1) * 140 + "px;'></div>");
            str.push("<div class='ZodiacLv' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChoseDiff(" + i + ",1);' style='left:5px;'></div>");

            if (ZodiacData.data.zlist[i].Diff == 2) {
                str.push("<div class='ZodiacLv' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChoseDiff(" + i + ",2);' style='left:51px;background-position:-44px 0;'></div>");
            }
            else
                str.push("<div class='ZodiacLv' id='ZodiacDiff" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' style='left:51px;background-position:-44px -23px;'></div>");
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DareZodia(" + i + ");'  style='width:60px;height:38px;top:157px;left:20px;background:url(res/Zodiac/Zod_But1.png) no-repeat;'></div>");
            if (ZodiacData.data.zlist[i].lastDiff == 2)
                str.push("<div id='diff" + i + "' class='ButtonSmall' style='width:38px;height:38px;top:117px;left:55px;background:url(res/Zodiac/Zod_Tag2.png) no-repeat;'></div>");
            else
                str.push("<div id='diff" + i + "' class='ButtonSmall' style='width:38px;height:38px;top:117px;left:9px;background:url(res/Zodiac/Zod_Tag2.png) no-repeat;'></div>");
        }
        else {
            str.push("<div id='zbody" + i + "' class='ZodiacBody' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowZodiacDetail(" + i + ");' style='background-position:-100px -" + (ZodiacJson[i].id - 1) * 140 + "px;'></div>");
            str.push("<div class='ZodiacLv' style='left:9px;background-position:0 -23px;'></div>");
            str.push("<div class='ZodiacLv' style='left:55px;background-position:-44px -23px;'></div>");
            str.push("<div class='ButtonSmall' style='width:60px;height:38px;top:157px;left:20px;background:url(res/Zodiac/Zod_But2.png) no-repeat;'></div>");
        }

        left += 110;
        str.push("</div>");
        if (len == 3) {
            str.push("</div>");
            left = 0;
            len = 0;
        }
    }
    str.push("</div></div>");
    str.push("<div class='DefaultFont' style='width:446px;color:#fff;text-align:center;top:268px;font-size:12px;'>通过\"容易\"后开启\"困难\",点击形象显示掉落信息。</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='width:15px;text-align:center;top:48px;left:40px;line-height:17px;'>今日免费挑战<font id='darenum'>" + ZodiacData.data.dareNum + "</font>次</div>");
    str.push("<div class='DefaultFont_14 RedFont' style='width:15px;text-align:center;top:48px;left:20px;line-height:17px;'>会员可以购买次数</div>");
    str.push("<div class='TaskIcon' id='ZByIcon' style='top:205px;left:15px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuyExtranum();'><a href='javascript:void(0);'></a></div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    $('#albumzod').iphoneSlide1({
        handler: ".paging",
        pageHandler: ".page",
        bounce: false
    });
}

var BuyExtranum = function () {
    if (ZodiacData.data.BuyNum < 1) {
        showTextMess("今日购买次数已用完", 0);
        return;
    }
    ShowMessage("购买共需花费" + ZodiacData.data.gold + "萌币，确定购买吗？", function () {
        window.GameMainClass.sendRequestJson(1248, '', "BuyExtranumResult");
        $("#mask1").remove();
        $("#message").remove();
    }, function () {
        $("#mask1").remove();
        $("#message").remove();
    });
}
//12生肖次数购买结果
var BuyExtranumResult = function (json) {
    //{"Client":[{xxx}],"extranum":5,"gold":50,"info":"萌币-50","resert":1}
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        ZodiacData.data.dareNum += BackJson.extranum;
        ZodiacData.data.BuyNum -= 1;
        ZodiacData.data.gold = BackJson.ngold;
        updateGold(2, BackJson.gold);
        $("#darenum").html(ZodiacData.data.dareNum);
    }
    showTextMess(BackJson.info, BackJson.resert);
}

    //选择生肖难度
    var ChoseDiff = function (index, diff) {
        if (diff == 2) {
            $("#diff" + index).css("left", "55px");
            ZodiacData.data.zlist[index].lastDiff = 2;
        }
        else {
            $("#diff" + index).css("left", "9px");
            ZodiacData.data.zlist[index].lastDiff = 1;
        }
    }

    //挑战
    var DareZodia = function (index) {
        if (UserJson.UserLV >= ZodiacJson[index].lv) {
            window.GameMainClass.startSXFight(ZodiacJson[index].id, ZodiacData.data.zlist[index].lastDiff);
        }
    }
    //挑战结果
    var DareZodiaResult = function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert != -1) {
            MyshowDialog.MySpiritData.data.isResert = 0;
            ZodiacData.data.dareNum -= 1;
            $("#darenum").html(ZodiacData.data.dareNum);
            if (BackJson.resert == 1) {
                for (var i = 0; i < ZodiacData.data.zlist.length; i++) {
                    if (ZodiacData.data.zlist[i].id == BackJson.id) {
                        if (ZodiacData.data.zlist[i].Diff == 1) {
                            ZodiacData.data.zlist[i].Diff = 2;
                            $("#ZodiacDiff" + i).css({ "background-position": "-44px 0" });
                            document.getElementById("ZodiacDiff" + i).ontouchend = function () { if (Math.abs(lastPosX - beforePosX) < 5) ChoseDiff(i, 2); };
                        }
                        break;
                    }
                }
            }
        }
        else
            showTextMess(BackJson.info, 0);
    }

var ShenShouFightJson =
        {
            "data": { "CompleteState": "0,0,0",
                "id": 0,
                "HpDiscount": 100,
                "RankList": [],
                "SelfDis": "0",  
                "SelfZK": "0万",
                "bossLv": 20,
                "giftinfo": "1.红宝石箱x2<br>2.紫宝石箱x3<br>3.紫宝石箱x2<br>4.紫宝石箱x2<br>5.蓝宝石箱x3<br>6.蓝宝石箱x3<br>7.蓝宝石箱x2<br>8.蓝宝石箱x2",
                "isLit": 0,
                "isResert": 1,
                "lastkillnick": "",
                "leftkilltime": 0 
             }
        };

//世界boss冷却时间 
var CoolingtimeOfBoss = function () {    
    if (iscooling == true)
        return;
   
    iscooling = true;
    $("body").everyTime("1s", "coolingtime", function () {
        if (coolingtime > 0) {
            coolingtime--;
            $("#CoolingTime").html(expireTime(coolingtime));            
        }
        else {
            $("body").stopTime("coolingtime");           
            $("#CoolingTime").html("00:00:00");
            iscooling = false;
            $("#KillButton").css({ "background": "url(res/activity/BossWarBut1.png) no-repeat" });
            document.getElementById("KillButton").ontouchend = function () { if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startWorldBoss(); }
        }
    });
}

//关闭所有浮出层
var HidnDiv = function () {
    $("#FaceDiv").css("display", "none");
    $("#ChatTypeDiv").css("display", "none");
}

var loadChat = function () {
    $("#chatdivsmall").css("display", "none");
    document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
    document.getElementById("chatdivsmall").style.opacity = 1; //for FF
    $("#chatdiv2").html("");
    $("#chatdiv1").html("");
    ischatcooling = false;
    $("body").stopTime("chatcooling");

    if (chatjson.resert == 0)
        window.GameMainClass.sendRequestJson(1219, '', "ShowChat");
    else
        ShowChat("");
}

//聊天json
var chatjson = {
    "data": [
//            { "chattype": 2,"vip":1, "nick": "大咪咪", "words": "有没有sb在啊#23##" },
//            { "chattype": 3,"vip":2, "nick": "大咪咪", "words": "有没有sb在啊#21" },
//            { "chattype": 2,"vip":3, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 3,"vip":4, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 1,"vip":0, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 3,"vip":0, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 2,"vip":1, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 3,"vip":2, "nick": "大咪咪", "words": "有没有sb在啊" },
//            { "chattype": 2,"vip":3, "nick": "大咪咪", "words": "有没有sb在啊#23" },
//            { "chattype": 1,"vip":4, "nick": "大咪咪", "words": "有没有sb在啊#23" },
//            { "chattype": 2,"vip":5, "nick": "大咪咪", "words": "有没有sb在啊#23" },
//            { "chattype": 3,"vip":6, "nick": "大咪咪", "words": "有没有sb在啊#21" },
//            { "chattype": 2,"vip":1, "nick": "大咪咪", "words": "有没有sb在啊#23" },
//            { "chattype": 3,"vip":2, "nick": "大咪咪", "words": "有没有sb在啊#21" },
//            { "chattype": 3,"vip":3, "nick": "大咪咪", "words": "有没有sb在啊#21" },
//            { "chattype": 3,"vip":4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
//            { "chattype": 1,"vip":5, "nick": "", "words": "有没有sb在啊" }
    ], "resert": 0                
};

var showchattype = 0;
//切换聊天类型
var CheckChatTypeDia = function (type) {
    if (type == showchattype)
        return;
    $(".ChatShow").attr("class", "ChatTabBtn");
    $("#chattb" + type).attr("class", "ChatShow");
    var str = new Array();
    str.push("<div id='chatscroller' style='width:" + Systemdata.width + "px;'><ul><li>");
    str.push("<table id='chattable' cellpadding='0' cellspacing='0' style='font-size:14px;padding:0; line-height:16px;'>");
    showchattype = type;

    var ihtml = "", ihtml1 = "";
    var temp = "";
    var hasface = "margin-top:4px;";
    for (var i = 0; i < chatjson.data.length; i++) {
        if (type != 0) {
            if (chatjson.data[i].chattype != type && chatjson.data[i].chattype != 1)
                continue;
        }
        hasface = "margin-top:4px;";
        ihtml = chatjson.data[i].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 28) {
                            ihtml1 += "<img src='res/face/" + temp + ".png' />";
                            hasface = "margin-top:8px;";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[i].chattype) {
            case 1:
                str.push("<tr><td width='70px'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td></tr>");
                break;
            case 2:
                str.push("<tr><td width='70px'><font style='color:#66ccff'>【世界】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((chatjson.data[i].vip - 1) * 12) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
            case 3:
                str.push("<tr><td width='70px'><font style='color:#00ff00'>【组队】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((chatjson.data[i].vip - 1) * 12) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
        }
    }
    str.push("</table></li></ul></div>");
    $("#chatwrapper").html(str.join(""));
    var h = $("#chattable").height();
    if (h < 225) {
        $("#chatscroller").css({ "top": 225 - h, "height": h });
        myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
        window.addEventListener('DOMContentLoaded', loaded1, false);

    }
    else {
        $("#chatscroller").css({ "top": 0, "height": h });
        myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
        window.addEventListener('DOMContentLoaded', loaded1, false);
        myScroll1.scrollTo(0, 0 - h + 225, 0);
    }
}

//聊天窗口
var ShowChat = function (json) {
    showchattype = 0;
    if (json != "") {
        var BackJson = JSON.parse(json);
        if (BackJson.resert != 1)
            return;
        for (var j = 0; j < BackJson.json.length; j++) {
            chatjson.data.push(BackJson.json[j]);
        }
        chatjson.resert = 1;
    }
    var str = new Array();
    str.push("<div class='mask' id='maskchat' style='opacity:0.7; filter: alpha(opacity=70); background-color:#000;'></div>");
    str.push("<div id='ChatDia' style='position:absolute;z-index:601;top:0px;left:0'>");
    str.push("<div class='ChatShow' id='chattb0' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(0);' style='top:9px;left:11px;'>全部</div>");
    str.push("<div class='ChatTabBtn' id='chattb2' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(2);' style='top:9px;left:81px;'>世界</div>");
    str.push("<div class='ChatTabBtn' id='chattb3' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(3);' style='top:9px;left:151px;'>组队</div>");
    //关闭小窗提示
    str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatSelect();' style='top:13px;left:255px;background:url(res/login/" + (Systemdata.chatPrompt ? "checkbox.png" : "checkbox_empty.png") + ") no-repeat;width:32px;height:32px;' id='select'>");
    str.push("</div>");
    str.push("<div class='DefaultFont_14' style='left:290px;top:22px;width:120px;color:#fff'>最小化时提示消息</div>");

    str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) closechat();'  style='left:" + (Systemdata.width - 49) + "px;top:10px;z-index:100;'></div>");
    str.push("<div id='chatwrapper' style='width:" + Systemdata.width + "px;'><div id='chatscroller' style='width:" + Systemdata.width + "px;'><ul><li>");
    str.push("<table id='chattable' cellpadding='0' cellspacing='0' style='font-size:14px;padding:0; line-height:16px;'>");
    var ihtml = "", ihtml1 = "";
    var temp = "";
    var hasface = "margin-top:4px;";
    for (var i = 0; i < chatjson.data.length; i++) {
        hasface = "margin-top:4px;";
        ihtml = chatjson.data[i].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 28) {
                            ihtml1 += "<img src='res/face/" + temp + ".png' />";
                            j += 2;
                            hasface = "margin-top:8px;";
                            continue;
                        }
                    }
                }
            }

            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[i].chattype) {
            case 1:
                str.push("<tr><td width='70px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td></tr>");
                break;
            case 2:
                str.push("<tr><td width='70px;'><font style='color:#66ccff'>【世界】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((chatjson.data[i].vip - 1) * 12) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
            case 3:
                str.push("<tr><td width='70px;'><font style='color:#00ff00'>【组队】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((chatjson.data[i].vip - 1) * 12) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
        }
    }
    str.push("</table></li></ul></div></div>")
    str.push("<div id='ChatTypeDiv' style='display:none;'>");
    str.push("<div class='ButtonSmall' style='width:78px;height:14px;color:#66ccff;text-align:center;top:10px;font-size:14px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChoseChatType(2)'>世 界</div>");
    str.push("<div class='ButtonSmall' style='width:78px;height:14px;color:#00ff00;text-align:center;top:35px;font-size:14px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChoseChatType(3)'>组 队</div>");
    str.push("</div>");
    str.push("<div class='ButtonSmall'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChatTypeDivDisplay();' style='width:78px;height:32px;background:url(res/city/Chat_Seq2.png) no-repeat;top:286px;left:2px;text-align:center;font-size:14px;line-height:30px;'><font id='chattypetext' style='color:#66ccff'>世 界</font></div>");
    str.push("<div class='ButtonSmall'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {OpenChatText();}' style='width:432px;height:32px;background:url(res/city/Chat_BG.png) no-repeat;top:286px;left:2px;font-size:14px;line-height:30px;z-index:1;padding-left:90px;'><font id='ChatTxt' style='color:#a9a9a9;'>输入您想说的话（谨防充值、中奖诈骗）</font></div>");
    str.push("<img class='ButtonSmall'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) showFaceDiv();' style='width:32px;height:32px;top:286px;left:420px;' src='res/face/08.png' />");
    str.push("<div id='FaceDiv' style='display:none;'>");
    for (var i = 0; i < 24; i++) {
        if (i < 9)
            str.push("<img src='res/face/0" + (i + 1) + ".png' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) insertFace(\"0" + +String(i + 1) + "\");' />");
        else
            str.push("<img src='res/face/" + (i + 1) + ".png' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) insertFace(" + (i + 1) + ");'/>");
    }

    str.push("</div>");
    str.push("<div class='ButtonSmall'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {PushChat();}'  style='background:url(res/city/Chat_ButFS.png) no-repeat;top:286px;left:" + (Systemdata.width - 55) + "px;width:52px;height:32px;'></div>");


    str.push("</div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("other2").appendChild(divnode);

    var h = $("#chattable").height();
    if (h < 225)
        $("#chatscroller").css({ "top": 225 - h });
    else {
        $("#chatscroller").css({ "top": 0, "height": h });
    }

    myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
    window.addEventListener('DOMContentLoaded', loaded1, false);
    if (h > 225)
        myScroll1.scrollTo(0, 0 - h, 0);
}

var CheckChatSelect = function () {
    if (Systemdata.chatPrompt) {
        $("#select").css("background", "url(res/login/checkbox_empty.png) no-repeat");
        Systemdata.chatPrompt = 0;
        window.GameMainClass.setChatPrompt(0);
    }
    else {
        $("#select").css("background", "url(res/login/checkbox.png) no-repeat");
        Systemdata.chatPrompt = 1;
        window.GameMainClass.setChatPrompt(1)
    }
}

//插入表情
var insertFace = function (index) {
    if (haschat)
        $("#ChatTxt").html($("#ChatTxt").html() + "#" + String(index));
    else {
        haschat = true;
        $("#ChatTxt").html("#" + String(index))
    }
    $("#FaceDiv").css("display", "none");
}

//打开表情框
var showFaceDiv = function () {
    if ($("#FaceDiv").css("display") == "none")
        $("#FaceDiv").css("display", "");
    else
        $("#FaceDiv").css("display", "none");
}

//关闭聊天窗口
var closechat = function () {
    $("#maskchat").remove();
    $("#ChatDia").remove();

    chattype = 2;
    haschat = false;
}


//选择聊天消息类型
var ChoseChatType = function (index) {
    switch (index) {
        case 2:
            $("#chattypetext").html("世 界");
            $("#chattypetext").css("color", "#66ccff");
            chattype = 2;
            break;
        case 3:
            $("#chattypetext").html("组 队");
            $("#chattypetext").css("color", "#00ff00");
            chattype = 3;
            break;
    }

    HideChatTypeDiv();
}

//选择框样式判断
var ChatTypeDivDisplay = function () {
    if ($("#ChatTypeDiv").css("display") == "none")
        ShowChatTypeDiv();
    else
        HideChatTypeDiv();
}

//弹出选择框
var ShowChatTypeDiv = function () {    
    $("body").stopTime("chattype");
    var h = 0;
    $("#ChatTypeDiv").css("display", "");
    $("body").everyTime("10ms", "chattype", function () {
        if (h < 70) {
            h += 4;
            $("#ChatTypeDiv").css({ "height": h, "top": 225 + 70 - h });
        }
        else {
            $("#ChatTypeDiv").css({ "height": 70, "top": 225 });
            $("body").stopTime("chattype");
            //AcceptChat('{"Client":[{"chattype":2,"words":"good luck"}],"chattype":2,"info":"say_ok","nick":"大咪咪","resert":1,"words":"good luck"}');
        }
    });
}

//消失选择框
var HideChatTypeDiv = function () {
    $("body").stopTime("chattype");
    var h = 70;
    $("body").everyTime("10ms", "chattype", function () {
        if (h > 0) {
            h -= 4;
            $("#ChatTypeDiv").css({ "height": h, "top": 225 + 70 - h });
        }
        else {
            $("#ChatTypeDiv").css({ "display": "none" });
            $("body").stopTime("chattype");
        }
    });
}

//打开聊天输入框
var OpenChatText = function () {
    if (haschat)
        window.GameMainClass.openchat($("#ChatTxt").html());
    else
        window.GameMainClass.openchat("");
}

//获取输入框输入内容
var GetChatText = function (text) {
    if (text != "") {
        haschat = true;
        $("#ChatTxt").html(text);
    } else {
        haschat = false;
        $("#ChatTxt").html("输入您想说的话（谨防充值、中奖诈骗）");
    }
}

//发送聊天内容
var PushChat = function () {
    if (haschat == false)
        return;
    var str = "";
    haschat = false;
    if (UserJson.vip < 1 && UserJson.UserLV < 25 && chattype == 2) {
        str = "<td width='70px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>VIP1或25级以上玩家才可在世界发言</font></td>";
    }
    else if (canchat != 0) {
        switch (canchat) {
            case 2:
                str = "<td width='70px'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>您已被禁言</font></td>";
                break;
            case 3:
                str = "<td width='70px'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>今日发言次数已尽</font></td>";
                break;
        }
    }
    else {
        window.GameMainClass.sendRequestJson(1217, '{"chattype":' + chattype + ',"words":"' + $("#ChatTxt").html() + '"}', "");
    }

    if (str != "") {        
        var trnode = document.createElement("tr");
        trnode.innerHTML = str;
        document.getElementById("chattable").appendChild(trnode);

        var h = $("#chattable").height();
        $("#chatscroller").css({ "height": h });
        if (h < 225)
            $("#chatscroller").css({ "top": 225 - h });
        else {
            $("#chatscroller").css({ "top": 0 });
            myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
            window.addEventListener('DOMContentLoaded', loaded1, false);
            myScroll1.scrollTo(0, 0 - h + 225, 0);
        }
    }
    $("#ChatTxt").html("输入您想说的话（谨防充值、中奖诈骗）");
}
var ischatcooling = false;
//在主界面上显示新消息
var ShowSmallChat = function () {
    $("body").stopTime("chatcooling");
    document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
    document.getElementById("chatdivsmall").style.opacity = 1; //for FF
    var str = "";
    var ihtml = "";
    var ihtml1 = "", temp = "";
    if (ischatcooling == false) {
        $("#chatdivsmall").css("display", "");
        ihtml = chatjson.data[chatjson.data.length - 1].words;
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 28) {
                            ihtml1 += "<img src='res/face/" + temp + ".png' />";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[chatjson.data.length - 1].chattype) {
            case 1:
                str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                break;
            case 2:
                str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
            case 3:
                str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
        }
        $("#chatdiv1").html(str);
        ischatcooling = true;
    }
    else {
        if (chatjson.data.length > 1) {
            ihtml = chatjson.data[chatjson.data.length - 2].words;
            for (var j = 0; j < ihtml.length; j++) {
                temp = "";
                if (ihtml.charAt(j) == "#") {
                    if (j < ihtml.length - 2) {
                        temp = ihtml.substr(j + 1, 2);
                        if (!isNaN(temp)) {
                            if (parseInt(temp) < 28) {
                                ihtml1 += "<img src='res/face/" + temp + ".png' />";
                                j += 2;
                                continue;
                            }
                        }
                    }
                }
                ihtml1 += ihtml.charAt(j)
            }
            switch (chatjson.data[chatjson.data.length - 2].chattype) {
                case 1:
                    str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                    break;
                case 2:
                    str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 2].nick + ":</font>" + ihtml1;
                    break;
                case 3:
                    str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 2].nick + ":</font>" + ihtml1;
                    break;
            }
            $("#chatdiv1").html(str);
        }
        ihtml = chatjson.data[chatjson.data.length - 1].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 28) {
                            ihtml1 += "<img src='res/face/" + temp + ".png' />";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[chatjson.data.length - 1].chattype) {
            case 1:
                str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                break;
            case 2:
                str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
            case 3:
                str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
        }
        $("#chatdiv2").html(str);
    }
    $("body").oneTime("5s", "chatcooling", function () {
        $("body").stopTime("chatcooling");
        var i = 100;
        $("body").everyTime("20ms", "chatcooling", function () {
            if (i > 0) {
                i--;
                document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("chatdivsmall").style.opacity = i / 100; //for FF
            }
            else {
                $("#chatdivsmall").css("display", "none");
                document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
                document.getElementById("chatdivsmall").style.opacity = 1; //for FF
                $("#chatdiv2").html("");
                $("#chatdiv1").html("");
                ischatcooling = false;
                $("body").stopTime("chatcooling");
            }
        });
    });
}

var AcceptChat = function (json) {
    //{"Client":[{"chattype":2,"words":"good luck"}],"chattype":2,"info":"say_ok","nick":"大咪咪","resert":1,"words":"good luck"}    
    if (UserJson.NewGuideIndex != -1)
        return;
    var BackJson = JSON.parse(json);
    chatjson.data.push({ "chattype": BackJson.chattype, "nick": BackJson.nick, "words": BackJson.words, "vip": BackJson.vip });
    if (chatjson.data.length > 100) {
        chatjson.data.splice(0, 1);
    }
    if (document.getElementById("ChatDia") != null) {
        var str = "";
        switch (BackJson.resert) {
            case 1:
                if (BackJson.chattype != 1) {
                    if (BackJson.chattype != showchattype && showchattype != 0)
                        return;
                }
                var ihtml = BackJson.words;
                var ihtml1 = "", temp = "";
                var hasface = "margin-top:4px;";
                for (var j = 0; j < ihtml.length; j++) {
                    temp = "";
                    if (ihtml.charAt(j) == "#") {
                        if (j < ihtml.length - 2) {
                            temp = ihtml.substr(j + 1, 2);
                            if (!isNaN(temp)) {
                                if (parseInt(temp) < 28) {
                                    ihtml1 += "<img src='res/face/" + temp + ".png' />";
                                    j += 2;
                                    hasface = "margin-top:8px;";
                                    continue;
                                }
                            }
                        }
                    }
                    ihtml1 += ihtml.charAt(j)
                }
                switch (BackJson.chattype) {
                    case 1:
                        str = "<td width='70px'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td>";
                        break;
                    case 2:
                        str = "<td width='70px'><font style='color:#66ccff'>【世界】</font></td><td>" + (BackJson.vip > 0 ? ("<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((BackJson.vip - 1) * 12) + "px;" + hasface + "'></div>") : "") + "<font class='chatnick'>" + BackJson.nick + ":</font>" + ihtml1 + "</td>";
                        break;
                    case 3:
                        str = "<td width='70px'><font style='color:#00ff00'>【组队】</font></td><td>" + (BackJson.vip > 0 ? ("<div style='width:21px;height:12px;background:url(res/Vip/VipSmall.png) no-repeat 0 -" + ((BackJson.vip - 1) * 12) + "px;" + hasface + "'></div>") : "") + "<font class='chatnick'>" + BackJson.nick + ":</font>" + ihtml1 + "</td>";
                        break;
                }
                break;
            default:
                canchat = BackJson.resert;
                str = "<td width='70px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + BackJson.words + "</font></td>";
                break;
        }
        var trnode = document.createElement("tr");
        trnode.innerHTML = str;
        document.getElementById("chattable").appendChild(trnode);

        var h = $("#chattable").height();
        $("#chatscroller").css({ "height": h });
        if (h < 225)
            $("#chatscroller").css({ "top": 225 - h });
        else {
            $("#chatscroller").css({ "top": 0 });
            myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
            window.addEventListener('DOMContentLoaded', loaded1, false);
            myScroll1.scrollTo(0, 0 - h + 225, 0);
        }
    }
    else {
        if (Systemdata.chatPrompt)
            ShowSmallChat();
    }
}

//在线任务完成计时
var OnlineReward = function () {
    $("body").everyTime("1s","onlinetime", function () {
        if (UserJson.RewardOnlineTime > 0) {
            UserJson.RewardOnlineTime--;
            $("#OnlineTime").html(expireTime(UserJson.RewardOnlineTime));            
        }
        else {
            $("body").stopTime("onlinetime");
            $("#RewardOnline").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.fetchAward();'></a><div class='PromptImage'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.fetchAward();' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div>");
        }
    });
};

//滚动消息
function ReceiverMess(obj) {
    messArry.push(obj);
    ShowNewMess();
}

//演武竞技自动刷新倒计时
var RefreshTime = function () {
    if (IsAthleticsRefreshTim)
        return;
    IsAthleticsRefreshTim = true;
    $("body").everyTime("1s", "AthleticsRefreshTime", function () {
        if (AthleticsJson.data[0].RefreshTime >= 0) {
            AthleticsJson.data[0].RefreshTime--;
            $("#AthleticsRefreshTime").html(expireTime(AthleticsJson.data[0].RefreshTime));            
        }
        if (AthleticsJson.data[0].RefreshTime < 0) {            
            IsAthleticsRefreshTim = false;
            window.GameMainClass.arenaRefresh(1);
            $("body").stopTime("AthleticsRefreshTime");
        }
    });
};

//自动讨伐倒计时
function CrusadeTime() {
    if (UserBattleJson.data[0].CrusadeTime >= 0) {
        UserBattleJson.data[0].CrusadeTime--;
        $("#CrusadeTimeLabel").html(expireTime(UserBattleJson.data[0].CrusadeTime));        
    }
    if (UserBattleJson.data[0].CrusadeTime < 0) {
        clearTimeout(timecount10);        
        $("#CrusadeState").css({ "background-position": "0 -45px" });
        if (document.getElementById("CrusadeDialong") != null) {
            $("#CrusadeDialong").remove();
            $("#mask2").remove();
        }
        window.GameMainClass.sendRequestJson(1091, '{"isAuto":1,"pointid":0,"mapid":0,"comid":0,"usermapid":0,"usercomid":0}', "battleAutoStopResert");
        return;
    }
    timecount10 = setTimeout("CrusadeTime()", 1000);
}

//结束自动讨伐
function battleAutoStopResert(json) {
    CampaignClass.RewardData = JSON.parse(json);
    if (CampaignClass.RewardData.resert == 1) {
        //将获得的物品添加到包裹中
        if (CampaignClass.RewardData.GoodsList != "") {
            if (WarhoushJson.data[0].isResert == 1 && CampaignClass.RewardData.GoodsJson.length > 0) {
                AddItemToWarOther(CampaignClass.RewardData.GoodsJson);
            }

            //将获得的物品添加临时包裹中去
            if (TemporaryJson.data[0].isResert == 1 && CampaignClass.RewardData.tempsJson.length > 0) {
                AddItemToTwarOther(CampaignClass.RewardData.tempsJson);
            }
        }
        UserBattleJson.data[0].CrusadeTime = 0;
        //如果是立即结束的，则弹出获得的奖励
        if (document.getElementById("CrusadeState") != null)
            $("#CrusadeState").css({ "background-position": "0 -45px" });
        if (CampaignClass.RewardData.Client[0].isAuto != 1) {
            $("#CrusadeDialong").remove();
            $("#mask2").remove();            
            clearTimeout(timecount10);
            //$("#CrusadeState").css({ "background-position": "0 -45px" });
            CampaignClass.showCompaignPoint(CampaignClass.RewardData.Client[0].pointid, CampaignClass.RewardData.Client[0].mapid, CampaignClass.RewardData.Client[0].comid, CampaignClass.RewardData.Client[0].usermapid, CampaignClass.RewardData.Client[0].usercomid);
        }
    }
    showTextMess(CampaignClass.RewardData.info, CampaignClass.RewardData.resert);
}

//购买物品结果
function BuyResert(json) {    
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson.length > 0) {
            AddItemToWarOther(BackJson.GoodsJson);
        }

        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson.length > 0) {
            AddItemToTwarOther(BackJson.tempsJson);
        }
        $("#ShopBuyDialog").remove();
        $("#mask2").remove();
        switch (BackJson.sellType) {
            case 1:
                updateGold(2, BackJson.Gold);
                break;
            case 11:
                PubJsonNew.data[0].GemBlue -= BackJson.Gold;                
                break;
            case 12:
                PubJsonNew.data[0].GemPurple -= BackJson.Gold;                
                break;
            case 13:
                PubJsonNew.data[0].GemRed -= BackJson.Gold;                
                break;
            case 14:
                PubJsonNew.data[0].GemYellow -= BackJson.Gold;
                break;
            case 20:
                window.GameMainClass.sendRequestJson(1236, '', "ShopClass.SetGoodcardnum");
                break;
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
 }

//展示公告
 function ShowBulletin() {
     if (UserJson.NewGuideIndex == -1) {
         if (LoginJson.RemainingNum < 1) {
             if (BulletinData != "") {
                 EnterBuliding(8000);
             }
         }
         else
             LoginReward();
     }
     if (UserJson.MsgRewardNum > 0) {
         $("#MessageBtn").html("<div class='MessageNum' id='MessageNum'>" + UserJson.MsgRewardNum + "</div>");
     }
     //获取活动下线情况
     window.GameMainClass.sendRequestJson(1153, "", "ActivityOnline");
     //获取离线消息
     window.GameMainClass.sendRequestJson(1152, "", "GetOfflineMessage");
     //获取最近的一次活动时间
     window.GameMainClass.sendRequestJson(1154, "", "ActivityTime");
     //获取神兽的基本数据
     window.GameMainClass.sendRequestJson(1195, "", "GetShenShouData");
 }

 var GetShenShouData = function (json) {
     var BackJson = JSON.parse(json);
     ShenShouJson.data = BackJson;
 }

 var OfflineMessage = [
    //{ "type": 1, "msg": "<font style='color:Red;'> sb欧阳 </font>攻打了您的矿，掠夺了您的部分银币。" }
 ];

 //主界面倒计时
 var ActivityTime = function (json) {     
     var BackJson = JSON.parse(json);
     $("#actimename").html(BackJson.json[0].name);
     $("#actime").html(expireTime(BackJson.json[0].leftseconds));
     actime = BackJson.json[0].leftseconds;
     CountdownActime();
 }

 var CountdownActime = function () {
     if (isactime)
         return;
     isactime = true;
     $("body").everyTime("1s", "actime", function () {
         if (actime > 1) {
             actime--;
             $("#actime").html(expireTime(actime));
         }
         else {
             isactime = false;
             $("#actime").html("进行中");
             $("body").stopTime("actime");
         }
     });
 }

 var ActivityOnline = function (json) {
     var BackJson = JSON.parse(json);
     if (BackJson.resert == 1) {
         ActivityOnlineJosn = BackJson.json;
         var top = 117;
         for (var i = 0; i < ActivityOnlineJosn.length; i++) {
             switch (ActivityOnlineJosn[i].ActivityID) {
                 case 101:
                     if (ActivityOnlineJosn[i].isOnline) {
                         $("#JiBai").css({ "display": "", "top": top });
                         top += 47;
                     }
                     else
                         $("#JiBai").css("display", "none");
                     break;
                 case 100:
                     if (ActivityOnlineJosn[i].isOnline) {
                         $("#ShenJiang").css({ "display": "", "top": top });
                         top += 47;
                     }
                     else
                         $("#ShenJiang").css("display", "none");
                     break;
                 case 104:
                     if (ActivityOnlineJosn[i].isOnline) {
                         $("#_51btn").css({ "display": "", "top": top });
                         top += 47;
                     }
                     else
                         $("#_51btn").css("display", "none");
                     break;
                 case 102:
                     if (ActivityOnlineJosn[i].isOnline == 0) {
                         $("#ChongJiIcon").css({ "display": "none" });
                         if (UserJson.FristRecharge < 2) {
                             $("#ShouChongIcon").css({ "left": "44px" });
                         }
                     }
                     else
                         $("#ChongJiIcon").css({ "display": "" });
                     break;
             }
         }
     }
 } 

    //主界面消息通知
    var GetOfflineMessage = function (json) {
        if (json != "") {
            var BackJson = JSON.parse(json);
            for (var i = 0; i < OfflineMessage.length; i++) {
                if (OfflineMessage[i].type == BackJson.type) {
                    OfflineMessage.splice(i, 1);
                    break;
                }
            }
            OfflineMessage.push(JSON.parse(json));

            $("#noticebox").css({ "width": OfflineMessage.length * 52 });
            if (BackJson.type == 1)
                $("#MineNotice").css("display", "inline");
        }
    };

    //查看矿区消息
    var LookMineNotice = function () {
        for (var i = 0; i < OfflineMessage.length; i++) {
            if (OfflineMessage[i].type == 1) {
                ShowMessage(OfflineMessage[i].msg);
                OfflineMessage.splice(i, 1);
                $("#MineNotice").css("display", "none");
                $("#noticebox").css({ "width": OfflineMessage.length * 52 });
                break;
            }
        }
    }

//征收倒计时
 function ZhengShou() {
     if (isZhengShouTime)
         return;
     isZhengShouTime = true;
     $("body").everyTime("1s", "zhengshoutime", function () {
         if (TaishouFuJson.data[0].LevyTime > 0) {
             TaishouFuJson.data[0].LevyTime--;
             $("#ZhengShouTime").html(expireTime(TaishouFuJson.data[0].LevyTime));
         }
         else {
             isZhengShouTime = false;
             $("#ZhengShouTime").attr("class", "DefaultFont_14 GreenFont");
             $("#ZhengShouTime").html("当前可征收");
             $("#EndZhengshouTimeBtn").css("display", "none");
             $("body").stopTime("zhengshoutime");
         }
     });
}

//行动力回复倒计时
function GetAction() {
    if (isActionBack)
        return;
    isActionBack = true;   
    $("body").everyTime("1s", "ActionBackTime", function () {
        if (UserJson.ReTime > 0) {
            UserJson.ReTime--;
            $("#HudeTime").html(expireTime(UserJson.ReTime));            
        }
        else {
            $("#HudeTime").html("");            
            updateGold(3, -1);
            $("#ActionBox").html(UserJson.ActionPs + "/" + UserJson.zActionPs);
            UserJson.ActionPointReLave++;
            $("#ActionBackBox").html("(" + UserJson.ActionPointReLave + " / 30)");
            $("body").stopTime("ActionBackTime");           
            isActionBack = false;
            GetActionJudgment();
        }
    });   
}

//行动力回复判断
function GetActionJudgment() {
    if (UserJson.ActionPs < UserJson.zActionPs) {        
        if (UserJson.ActionPointReLave >= 30) {
            $("#HudeTime").html("回复结束");
        }
        else {
            if (UserJson.ReTime < 1)
                UserJson.ReTime = 300;               
            GetAction();
        }
    }
    else {
        if (document.getElementById("HudeTime") != null) {
            if (UserJson.ActionPointReLave < 30)
                $("#HudeTime").html("行动力充足"); //获得时间            
        }
    }

}

var dialogtype = [
            { "id": 1003, "type": "Training", "icon": "Icon_School.png" },
            { "id": 2000, "type": "MyHero", "icon": "Icon_Hero.png" },
            { "id": 3000, "type": "warhouse", "icon": "Icon_Warhouse.png" },
            { "id": 1001, "type": "Pub", icon: "Icon_Pub.png" },
            { "id": 1004, "type": "Smithy", icon: "Icon_Iron.png" },
            { "id": 1002, "type": "Smithy", icon: "Icon_Academy.png" },
            { "id": 4000, "type": "Smithy", icon: "Icon_EmBat.png" },
            { "id": 6000, "type": "Smithy", icon: "Icon_Daily.png" }, { "id": 1000, "type": "Smithy", icon: "Icon_Revenue.png" },
            { "id": 1005, "type": "Smithy", icon: "Icon_Revenue.png" }, { "id": 5000, "type": "Smithy", icon: "Icon_Athletics.png" },
            { "id": 7000, "type": "Smithy", icon: "Icon_News.png" }, { "id": 8000, "type": "Smithy", icon: "Icon_Announ.png" }, { "id": 8600, "type": "Smithy", icon: "Icon_MB.png" },
            { "id": 7500, "type": "Smithy", icon: "Icon_FirstKill.png" }, { "id": 5501, "type": "Smithy", icon: "Icon_Trade.png" },
            { "id": 5231, "icon": "Icon_Task.png" }, { "id": 1800, "icon": "Icon_Revenue.png" }, { "id": 2014, "icon": "Icon_Animal.png" }, { "id": 7800, "icon": "Icon_QinDao.png" }
        ]; 

//主入口
function DiaShow(type) {   
    var str = new Array(); 
    //加载图标
    var index = -1;

    for (var i = 0; i < dialogtype.length; i++) {
        if (type == dialogtype[i].id) {
            index = i;
            break;
        }
    }
    //弹出层图标
    if (index != -1)
        str.push("<div class='icon' style='background:url(res/dialog/" + dialogtype[index].icon + ") no-repeat;'></div>");
    //加载英雄资源
    switch (type) {        
        case 1001: break;
        case 3000: break;
        case 1004: break;
        case 1002: break;
        case 4000: break;
        case 6000: break;
        case 1000: break;
        case 1005: break;
        case 5000: break;
        case 7000: break;
        case 8000: break;
        case 8500: break;
        case 9000: break;
        case 8600: break;
        case 7500: break; 
        case 5501: break;
        case 5231: break;
        case 1800: break;
        case 7800: break;
        case 2014: break;
        case 51: break;      
        default:
            str.push("<div id='HeroSelect'><div class='ButtonLeft'></div>");
            var len = HeroJson.data[0].HeroList.length;
            var maxpage = 1;
            if (HeroJson.data[0].HeroList.length > 8 || UserJson.HeroPos >= 8) {
                switch (type) {
                    case 2000:
                        str.push("<div style='left:82px;' class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.HeroChangePage(" + String(2) + ");'");
                        break;
                    case 1003:
                        str.push("<div style='left:82px;' class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.HeroChangePage(" + String(2) + ");'");
                        break;
                }

                maxpage = parseInt((UserJson.HeroPos + 1) / 8) + ((UserJson.HeroPos + 1) % 8 == 0 ? 0 : 1);
                if (HeroJson.data[0].HeroList.length > 8)
                    len = 8;
            }
            else
                str.push("<div class='ButtonRight' style='left:82px;'");

            if (UserJson.HeroPos == 24)
                maxpage -= 1;
            str.push("></div>");
            str.push("<div class='PageNumber' style='top:210px;left:42px;'>1/" + maxpage + "</div>");
            var top = 5, left = 8;
            for (var i = 0; i < len; i++) {
                if (i % 2 == 0) {
                    if (i != 0) {
                        top += 49; left = 8;
                    }
                }
                else {
                    left += 51;
                }
                //获取该武将对应的本地数据
                var localindex = 0;
                for (; localindex < GeneralsJson.length; localindex++) {
                    if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[i].HeroId) {
                        break;
                    }
                }

                str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:" + top + "px;left:" + left + "px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[i].Qualification + ".png) no-repeat;'");
                switch (type) {
                    case 2000:
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.HeroHandClick(" + Number(i) + "," + Number(localindex) + ");'");
                        break;
                    case 1003:
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.HeroHandClick(" + Number(i) + "," + Number(localindex) + ");'");
                        break;
                }

                var namecolor = '#00CCFF';
                switch (HeroJson.data[0].HeroList[i].Qualification) {
                    case 0:
                        namecolor = "#00ff00";
                        break;
                    case 1:
                        break;
                    case 2:
                        namecolor = "#FF00FF";
                        break;
                    case 3:
                        namecolor = "#FF0000";
                        break;
                    case 4:
                        namecolor = "#FFFF00";
                        break;
                }
                str.push("><img src='res/HeroHead/" + GeneralsJson[localindex].Imgid + ".png' style='position:absolute;' /><div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[localindex].Name + "</div>");
                str.push("<div id='LvBox" + i + "'><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[i].Hlv) + "</div>");

                switch (HeroJson.data[0].HeroList[i].State1) {
                    case 1: //训练中
                        if (type == 1003)
                            str.push("<div class='HeroState HasTraining' id='HeroHP" + i + "'></div>");
                        break;
                    case 2: //征收中
                        str.push("<div class='HeroState HasLevy' id='HeroHP" + i + "'></div>");
                        break;
                    case 3: //打工中
                        str.push("<div class='HeroState HasWork' id='HeroHP" + i + "'></div>");
                        break;
                }

                str.push("</div>");
            }
            //填充空格
            if (HeroJson.data[0].HeroList.length < 8) {
                for (var i = HeroJson.data[0].HeroList.length; i < 8; i++) {
                    if (i % 2 == 0) {
                        if (i != 0) {
                            top += 49; left = 8;
                        }
                    }
                    else {
                        left += 51;
                    }
                    if (i < UserJson.HeroPos)
                        str.push("<div class='HeroHeadEmp' style='top:" + top + "px;left:" + left + "px;'></div>");
                    else if (i == UserJson.HeroPos) {
                        if (UserJson.New_HeroPos_M != -1)
                            str.push("<div class='HeroHeadAdd' id='HeroPos" + i + "' style='top:" + top + "px;left:" + left + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.OpenHeroPos(" + i + ");'></div>");
                        else
                            str.push("<div class='HeroHeadLock' id='HeroPos" + i + "' style='top:" + top + "px;left:" + left + "px;'></div>");

                    }
                    else
                        str.push("<div class='HeroHeadLock' id='HeroPos" + i + "' style='top:" + top + "px;left:" + left + "px;'></div>");

                }
            }            
            //使第一个头像被点中
            str.push("<div id='HeroHeadClick' style='top:3px;left:6px;' ></div>");
            str.push("</div>");
            break;
    }    
    //加载主模块
    switch (type) {
        /****************************************************************************校场*************************************/
        case 1003:
            //显示title            
            str.push("<div class='dialogTitle' style='width:58px;background:url(res/dialog/Txt_School.png) no-repeat;'></div>");
            str.push("<div id='TrainingItem' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckItem(1)' style='right:430px;top:50px;'><div class='MuneFontClick'>训练</div></div><div id='CultureItem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckItem(2)' style='right:430px;top:100px;'><div class='MuneFont'>培养</div></div>");

            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);

            //获取该武将对应的本地数据
            var x = 0;
            for (; x < GeneralsJson.length; x++) {
                if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[0].HeroId) {
                    break;
                }
            }

            for (var i = 0; i < usercityjson.length; i++) {
                if (usercityjson[i].id == 1003) {
                    var lvlist = schoolJson.data[0].lvlist.split(",");
                    var goldlist = schoolJson.data[0].moneylist.split(",");
                    var exlist = schoolJson.data[0].exlist.split(",");

                    for (var j = 0; j < lvlist.length; j++) {
                        if (Number(lvlist[j]) == usercityjson[i].LV) {
                            SchoolClass.needGold = Number(goldlist[j]);
                            SchoolClass.exval = Number(exlist[j]);
                        }
                    }
                    break;
                }
            }
            SchoolClass.CultureNum = 1;
            SchoolClass.CheckHeroIndex = 0;
            SchoolClass.SelectIndex = 0;
            SchoolClass.tempHeroIndex = 0;
            SchoolClass.tempLocalIndex = x;
            SchoolClass.loadSchool();
            break;

        /********************************************************************************我的武将*****************************************************/
        case 2000:
            //显示title
            str.push("<div class='dialogTitle' style='width:122px;background:url(res/dialog/Txt_Hero.png) no-repeat;'></div>");
            str.push("<div id='Hero' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.CheckItem(1)' style='right:430px;top:50px;'><div class='MuneFontClick'>武将</div></div>");
            str.push("<div id='Equipment' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.CheckItem(3)' style='right:430px;top:100px;'><div class='MuneFont'>装备</div></div>");
            str.push("<div id='FuHun' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.CheckItem(2)' style='right:430px;top:150px;'><div class='MuneFont'>附魂</div>");
            if (UserJson.UserLV < 30)
                str.push("<img style='position:absolute;z-index:10; top:10px;left:15px;' src='res/dialog/RecruitingLock.png' />");
            str.push("</div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);

            //获取该武将对应的本地数据
            var x = 0;
            for (; x < GeneralsJson.length; x++) {
                if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[0].HeroId) {
                    break;
                }
            }
            MyshowDialog.tempHeroIndex = 0;
            MyshowDialog.tempLocalIndex = x;
            MyshowDialog.CheckMyHero(); //0, x
            break;
        /*************************************************酒馆*************************************/
        case 1001:
            //显示title
            str.push("<div class='dialogTitle' style='width:90px;background:url(res/dialog/Txt_Pub.png) no-repeat;'></div>");
            str.push("<div id='Recruit' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.CheckItem(1)' style='right:430px;top:50px;' ><div class='MuneFontClick'>招募</div></div><div id='Synthesis' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.CheckItem(2)' style='right:430px;top:150px;'><div class='MuneFont'>召唤</div></div><div id='mingjiang' class='ListItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.CheckItem(3)'  style='right:430px;top:100px;'><div class='MuneFont'>神将</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);

            pubclass.LoadPub();
            break;

        /********************************************包裹*************************************/
        case 3000:
            //显示title
            str.push("<div class='dialogTitle' style='width:111px;background:url(res/dialog/Txt_Warehouse.png) no-repeat;'></div>");
            str.push("<div id='Goods' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.CheckItem(1)' style='right:430px;top:50px;' ><div class='MuneFontClick'>物品</div></div><div id='Temporary' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.CheckItem(2)' style='right:430px;top:100px;'><div class='MuneFont'>临时</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            WarHouseClass.templist = new Array();
            WarHouseClass.ShowWHData(1, 0);
            break;
        /********************************************铁匠铺*************************************/
        case 1004:
            //显示title
            str.push("<div class='dialogTitle' style='width:111px;background:url(res/dialog/Txt_Iron.png) no-repeat;'></div>");
            str.push("<div id='RListItem' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.CheckItem(1)' style='right:430px;top:50px;' ><div class='MuneFontClick'>强化</div></div><div id='SListItem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.CheckItem(2)' style='right:430px;top:100px;'><div class='MuneFont'>合成</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            
            SmithyClass.tempHeroData = { "List": [] };
            SmithyClass.templist = new Array();
            SmithyClass.tempid = -1;
            SmithyClass.LoadSmithy();
            break;
            /********************************************军机处******************************/
        case 1002:
            //显示title
            str.push("<div class='dialogTitle' style='width:111px;background:url(res/dialog/Txt_Academy.png) no-repeat;'></div>");
            str.push("<div id='zhengxing' class='ListItemClick'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.CheckItem(2);' style='right:430px;top:50px;'><div class='MuneFontClick'>阵型</div></div><div id='zhangfa' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.CheckItem(3);' style='right:430px;top:100px;'><div class='MuneFont'>战法</div></div>");
            str.push("<div id='bowuitem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.CheckItem(1);' style='right:430px;top:150px;'><div class='MuneFont'>宝物</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            GrandCouncilClass.LoadZX(1);
            GrandCouncilClass.LoadCooingTime();
            //GrandCouncilClass.LoadGrandCouncil();
            break;

        case 4000: //************************布阵***************************/
            str = new Array();
            var divnode = document.createElement("div");
            divnode.id = 'mask10';
            divnode.className = 'mask opacity';
            document.getElementById("other").appendChild(divnode);

            divnode = document.createElement("div");
            divnode.id = 'dialogMain10';
            divnode.className = 'dialogMain';
            document.getElementById("other").appendChild(divnode);

            str.push("<div class='icon' style='background:url(res/dialog/Icon_EmBat.png) no-repeat;'></div>");
            str.push("<div class='dialogTitle' style='width:59px;background:url(res/dialog/Txt_EmBattle.png) no-repeat;'></div>");

            $("#dialogMain10").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "height": 304, "top": 8 });
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.CloseDialog();' style='left:444px;'></div>");

            divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain10").appendChild(divnode);

            BuZhengClass.tempHeroList = [];
            for (var k = 0; k < HeroJson.data[0].HeroList.length; k++)
                BuZhengClass.tempHeroList.push($.extend({}, HeroJson.data[0].HeroList[k]));

            var FormationHero = UserJson.FormationHero.split(",");

            for (var m = 0; m < BuZhengClass.templocation.length; m++) {
                BuZhengClass.templocation[m].HeroID = Number(FormationHero[m]);
            }
            BuZhengClass.isEdit = false;
            BuZhengClass.LoadZX(1);
            break;
            /*****************************************每日任务********************************/
        case 6000:
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_Daily.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)" });
            $("#colsemain").css({ "left": "444px" });
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            TaskClass.TaskDay();
            break;

            /*************************************太守府*********************************/
        case 1000:
            str.push("<div class='dialogTitle' style='width:89px;background:url(res/dialog/Txt_Viceregal.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)" });
            $("#colsemain").css({ "left": "444px" });
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            TaishouFuCalss.LoadTaishouFu();
            break;
        case 1005:
            str.push("<div class='dialogTitle' style='width:89px;background:url(res/dialog/Txt_Viceregal.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)" });
            $("#colsemain").css({ "left": "444px" });
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            TaishouFuCalss.LoadTaishouFu();
            break;
        case 5000:
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_Athletics.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)" });
            $("#colsemain").css({ "left": "444px" });
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);            
            AthleticsClass.LoadAthletics();
            break;           
        case 7000:
            str.push("<div class='dialogTitle' style='width:61px;background:url(res/dialog/Txt_News.png) no-repeat;'></div>");
            str.push("<div id='Message_All' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MessageClass.LoadMessage(1,1);' style='right:430px;top:50px;'><div class='MuneFontClick'>全部</div></div>");
            str.push("<div id='Message_Fighting' class='ListItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MessageClass.LoadMessage(1,3);' style='right:430px;top:100px;'><div class='MuneFont'>战报</div></div>");
            str.push("<div id='Message_System' class='ListItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MessageClass.LoadMessage(1,2);' style='right:430px;top:150px;'><div class='MuneFont'>系统</div></div>");
            
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            MessageClass.LoadMessage(1, 1);
            break;
        case 8000: /***************************************公告****************************************/
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_Announ.png) no-repeat;'></div>");
            str.push("<div id='GGItem' class='ListItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.CheckItem(1);' style='right:430px;top:100px;' ><div class='MuneFont' style=''>活动</div></div><div id='huodong' class='ListItemClick'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.CheckItem(2);' style='right:430px;top:50px;'><div class='MuneFontClick'>公告</div></div>");
            str.push("<div id='BulletinDialog'>");            
            str.push("<div class='DetialBox' id='BulletinDetail' style='left:10px;top:10px;line-height:20px;width:278px;height:225px;color:#793F38;font-size:14px;font-weight:300;'></div>");            
            str.push("</div>");
            str.push("<div id='BulletinDialogLeft'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            KaiFuClass.CheckPage(1);            
            break;
        case 9000:
            $("#dialogMain").css({ "left": (Systemdata.width - 484) / 2 + "px", "width": 484, "height": 318, "top": 1, "background-image": "url(res/BattleMap/NMapBg.png)" });
            $("#colsemain").remove();            
            CampaignClass.LoadMap();
            break;
        case 8500: //商城
            $("#dialogMain").css({ "left": (Systemdata.width - 410) / 2 + "px", "width": 443, "height": 290, "top": 20, "background-image": "url(res/dialog/Shop_bg_1.png)" });
            str.push("<div id='HotItem' class='ListItemClick' ontouchmove='getmovingposx()' ontouchstart='getposx()' onclick='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.CheckItem(1)' style='right:430px;top:50px;' ><div class='MuneFontClick'>热销</div></div><div id='AllItem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' onclick='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.CheckItem(2)' style='right:430px;top:100px;'><div class='MuneFont'>全部</div></div><div id='OneItem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.CheckItem(3)' style='right:430px;top:200px;'><div class='MuneFont'>筛选</div></div><div id='DuihuanItem' class='ListItem'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.CheckItem(4)' style='right:430px;top:150px;'><div class='MuneFont'>兑换</div></div>");
            $("#colsemain").remove();
            str.push("<div class='close' style='left:404px;top:0px;z-index:100;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {DiaogColse();ShopClass.ShowItemId=0;}'></div>");
            str.push("<img style='position:absolute;z-index:1;top:-17px;left:80px;' src='res/dialog/Shop_txt.png' />");
            str.push("<div id='ShopBg'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            if (ShopClass.ShowItemId != 0) {
                $("#OneItem").css("display", "");
                ShopClass.CheckItem(3);
            }
            else {
                $("#OneItem").css("display", "none");
                ShopClass.LoadHot(1);
            }
            break;
        case 8800: //首充
            KaiFuClass.RechargeFirst();
            break;
        case 8600: //充值            
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/city/Txt_MBRecharge.png) no-repeat;'></div>");

            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:444px;'></div>");
            str.push("<div id='RechargeBg'>");

            /********************************斯凯新服内容:客服电话:0571-87966766(9:00-21:00)************************************************/
            str.push("<div class='DefaultFont GoldFont' style='top:-22px;left:180px;font-size:11px;' >1RMB=10萌币,充值问题请联系官方群58266932</div>");
            /********************************************************************************************************************************/

            var mlist = RechargeData.data.money.split(",");
            var mblist = RechargeData.data.M.split(",");
            top = 14; left = 8;
            for (var index = 0; index < mlist.length; index++) {
                str.push("<div class='RechargeItemBox' style='top:" + top + "px;left:" + left + "px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.Recharge(" + Number(mlist[index]) + ");'>");
                str.push("<div class='DetialBox' style='top:4px;line-height:14px;width:140px;height:14px;color:#58221D;font-size:14px;text-align:center;'>充值<font color='#990000'>" + mlist[index] + "</font>元</div>")
                str.push("<div class='DetialBox' style='top:82px;line-height:14px;width:140px;height:14px;color:#58221D;font-size:14px;text-align:center;'>获得<font color='#990000'>" + mblist[index] + "</font>萌币</div>")
                str.push("</div>");

                left += 148;
                if (index == 2) {
                    top += 108;
                    left = 8;
                }
            }
            str.push("</div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            break;
        case 7500: //首杀
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_FirstKill.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });
            $("#colsemain").remove();            
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:444px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            FirstKillClass.LoadDialg(1);
            break;
        case 7600: //活动
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 468) / 2 + "px", "width": 468, "background-image": "url(res/activity/Bg.png)", "top": 8 });
            $("#colsemain").remove();            
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:423px;top:14px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            ActivityClass.LoadActivity();
            break;
        case 7700: //冲级
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 468) / 2 + "px", "width": 468, "height": 316, "background-image": "url(res/city/Drawing_Bg.png)", "top": 2 });
            $("#colsemain").remove();            
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:424px;top:30px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            KaiFuClass.LoadChongJi();
            break;
        case 7800: //分享
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_QinDao.png) no-repeat;'></div>");

            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });
            $("#colsemain").css("left", "444px");
            KaiFuClass.LoadQianDao();
            //            str = new Array();
            //            $("#dialogMain").css({ "left": (Systemdata.width - 472) / 2 + "px", "width": 472, "height": 316, "background-image": "url(res/dialog/Share_Bg.png)", "top": 2 });
            //            $("#colsemain").remove();            
            //            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:411px;top:9px;'></div>");
            //            var divnode = document.createElement("div");
            //            divnode.innerHTML = str.join("");
            //            document.getElementById("dialogMain").appendChild(divnode);
            //KaiFuClass.LoadShare();
            break;
        case 7900: //累充
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 472) / 2 + "px", "width": 472, "height": 316, "background-image": "url(res/kaifu/RechargeN_Bg.png)", "top": 2 });
            $("#colsemain").remove();            
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:411px;top:9px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            KaiFuClass.LoadCumulationRecharge();
            break;
        case 4100: //世界boss
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 452) / 2 + "px", "width": 452, "height": 304, "background-image": "url(res/activity/Boss_Bg.png)", "top": 8 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){DiaogColse();LeavePage(1156);}' style='left:411px;top:15px;'></div>");
            str.push("<div class='ButtonBig' style='left:109px;background:url(res/activity/BossWar_Tit.png) no-repeat;width:234px;height:40px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            ActivityClass.LoadBossOfWorld();
            break;
        case 5500: //系统设置
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 410) / 2 + "px", "width": 410, "height": 288, "background-image": "url(res/system/SystemBg.png)", "top": 16 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:369px;top:10px;'></div>");
            str.push("<div class='systembox' id='systemmusic' style='top:54px;left:22px;'>");
            if (Systemdata.MusicState) {
                str.push("<img src='res/system/SysMusic1.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysClose.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SetMusic();'></div>");
            }
            else {
                str.push("<img src='res/system/SysMusic2.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysOpen.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SetMusic();'></div>");
            }
            str.push("</div>");

            //特效开关
            str.push("<div class='systembox' style='top:54px;left:208px;' id='specialbox'>");
            if (Systemdata.special)
                str.push("<img src='res/system/SysEffect1.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysClose.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Setspecial();'></div>");
            else
                str.push("<img src='res/system/SysEffect2.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysOpen.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Setspecial();'></div>");
            str.push("</div>");

            //领取cdkey
            str.push("<div class='systembox' style='top:124px;left:22px;' id='specialbox'>");
            str.push("<img src='res/system/SysGift.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysEnter.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowCdkeyDia();'></div>");
            str.push("</div>");

            if (Systemdata.utype == 15) {
                str.push("<div class='systembox' style='top:124px;left:208px;'>");
                str.push("<img src='res/system/SysHome.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysEnter.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.ucUserCenter();'></div>");
                str.push("</div>");
            }

            if (Systemdata.utype > 99) {
                str.push("<div class='systembox' style='top:124px;left:208px;'>");
                str.push("<img src='res/system/SysUserinfo.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysEnter.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowUserInfo(\"\");'></div>");
                str.push("</div>");
            }

            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            break;
        case 5501: //贸易中心            
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_Trade.png) no-repeat;'></div>");
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:444px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);

            pubclass.LoadTrading();
            break;
        case 5200: //祭拜
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 472) / 2 + "px", "width": 472, "height": 316, "background-image": "url(res/activity/Worship/WorshipBg.png)", "top": 2 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:411px;top:9px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            ActivityClass.LoadJiBai();
            break;
        case 5300: //神将
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 480) / 2 + "px", "width": 480, "height": 312, "background-image": "url(res/activity/shenjiang/MarvellousBg.png)", "top": 4 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:431px;top:13px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            ActivityClass.LoadShenJiang();
            break;
        case 5231: //任务界面        
            str.push("<div class='dialogTitle' style='width:111px;background:url(res/dialog/Txt_Task.png) no-repeat;'></div>");
            str.push("<div id='RListItem' class='ListItemClick' style='right:430px;top:50px;' ><div class='MuneFontClick'>主线</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            TaskClass.LoadMainTaskList(1);
            break;
        case 5232: //排名界面        
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 352) / 2 + "px", "width": 352, "height": 294, "background-image": "url(res/Ranking/RankingBg.png)", "top": 23 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:312px;top:0px;'></div>");       
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            ActivityClass.LoadRankList(1);
            break;
        case 1800: //主公信息
            str.push("<div class='dialogTitle' style='width:111px;background:url(res/dialog/VipTxt.png) no-repeat;'></div>");
            str.push("<div id='RListItem' class='ListItemClick' style='right:430px;top:50px;' ><div class='MuneFontClick'>VIP</div></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            UserClass.LoadVip();
            break;
        case 2011: //征战总入口
            str = new Array();
            $("#dialogMain").css({ "left": (Systemdata.width - 452) / 2 + "px", "width": 452, "height": 288, "background-image": "url(res/Campaign/War_bg.png)", "top": 23 });
            $("#colsemain").remove();
            str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();' style='left:412px;top:0px;'></div>");
            str.push("<div class='dialogTitle' style='width:151px;height:40px;background:url(res/Campaign/Tit_War.png) no-repeat;left:151px;top:-14px;'></div>");

            str.push("<div class='ButtonBig' style='width:98px;height:244px;background:url(res/Campaign/Warimg_1.png) no-repeat;top:26px;left:18px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  EnterBuliding(9000);'></div>");
            str.push("<div class='ButtonBig' style='width:98px;height:244px;background:url(res/Campaign/Warimg_2.png) no-repeat;top:26px;left:124px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  EnterBuliding(5000);'>");
            if (UserJson.UserLV < 16) {
                str.push("<div class='ButtonBig' style='width:83px;height:13px;background:url(res/Campaign/ZjLv16.png) no-repeat;top:56px;left:8px;'></div>");
            }
            str.push("</div>");
            str.push("<div class='ButtonBig' style='width:98px;height:244px;background:url(res/Campaign/Warimg_3.png) no-repeat;top:26px;left:230px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  EnterBuliding(2012);'>");
            if (UserJson.UserLV < 20) {
                str.push("<div class='ButtonBig' style='width:83px;height:13px;background:url(res/Campaign/ZjLv20.png) no-repeat;top:56px;left:8px;'></div>");
            }
            str.push("</div>");
            str.push("<div class='ButtonBig' style='width:98px;height:244px;background:url(res/Campaign/Warimg_4.png) no-repeat;top:26px;left:336px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  return false;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            break;
        case 2014: //神兽
            str.push("<div class='dialogTitle' style='width:117px;background:url(res/dialog/Txt_Animal.png) no-repeat;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            $("#dialogMain").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });
            $("#colsemain").css("left", "444px");
            KaiFuClass.LoadShenShou();
            break;
        case 51: //51劳动节活动
            $("#dialogMain").css({ "left": (Systemdata.width - 476) / 2 + "px", "width": 476, "height": 306, "background-image": "url(res/activity/51/Activity_LaborBg.png)", "top": 7 });
            $("#colsemain").css({ "left": "352px", "top": 26 });
            str.push("<div class='DefaultFont' style='top:69px;left:152px;color:#fff;font-weight:200;font-size:12px;width:184px;text-align:center;'>活动倒计时:" + expireTime1(FestivalJson.data.lefttime) + "</div>");
            var itemlist = FestivalJson.data.itemlist.split(",");
            var x1 = 147, x2 = 105, y = 135;
            for (var i = 0; i < itemlist.length; i++) {
                if (Number(itemlist[i]) < 1000) {
                    str.push("<div class='Skill' style='top:202px;left:" + (x2 += 46) + "px;background:url(res/dialog/" + itemlist[i] + ".png) no-repeat;'>");
                    str.push("<div>" + getNumSmall("X" + FestivalJson.data.itemnum.split(",")[i], 1, 2) + "</div></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:" + y + "px;left:" + x1 + "px;'>");
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
                    str.push("<font style='color:red'>×" + FestivalJson.data.itemnum.split(",")[i] + "</font></div>");

                }
                else {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == Number(itemlist[i])) {
                            str.push("<div class='Skill' style='top:202px;left:" + (x2 += 46) + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                            str.push("<div>" + getNumSmall("X" + FestivalJson.data.itemnum.split(",")[i], 1, 2) + "</div></div>");
                            str.push("<div class='DefaultFont_14 RedFont' style='top:" + y + "px;left:+" + x1 + "px;'>" + GoodsJson[m].IName + "<font style='color:red'>×" + FestivalJson.data.itemnum.split(",")[i] + "</font></div>");
                            break;
                        }
                    }
                }
                x1 = 240;
                if ((i + 1) % 2 == 0) {
                    y += 20;
                    x1 = 147;
                }
            }
            switch (FestivalJson.data.status) {
                case 0:
                    str.push("<div class='ButtonBig' style='background:url(res/activity/51/Activity_LaborBut2.png) no-repeat;top:250px;left:190px;width:96px;height:36px;'></div>");
                    str.push("<div class='DefaultFont RedFont' style='top:258px;left:290px;font-size:10px;'>您已累计充值:" + FestivalJson.data.totalmoney + "元</div>");
                    break;
                case 1:
                    str.push("<div class='ButtonBig' id='ReceiveBtn'  ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ Receive51Reward();}' style='background:url(res/activity/51/Activity_LaborBut1.png) no-repeat;top:250px;left:190px;width:96px;height:36px;'></div>");
                    break;
                case 2:
                    str.push("<div class='ButtonBig' style='background:url(res/city/Share_Label.png) no-repeat;top:240px;left:210px;width:66px;height:42px;'></div>");
                    break;
            }
            str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ Recharge();}' style='background:url(res/kaifu/Fcharge_No.png) no-repeat;top:193px;left:369px;width:75px;height:77px;'></div>");
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
            break;
    }
}

var Receive51Reward = function () {
    window.GameMainClass.sendRequestJson(1245, '{"actid":104}', "Receive51RewardResult");
}

var Receive51RewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }
        ShowRewardDialog(JSON.stringify(BackJson.rewardjson));

        $("#ReceiveBtn").css({ "background": "url(res/city/Share_Label.png) no-repeat", "top": 240, "left": 210, "width": 66, "height": 42 });
        document.getElementById("ReceiveBtn").ontouchend = function () { return false; };
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//打开输入CDKEY界面
var ShowCdkeyDia = function () {
    var str = new Array();
    str.push("<div id='mask2' class='mask2 opacity2'></div>");
    str.push("<div id='CdKeydia'>");
    str.push("<div class='close' style='left:355px;top:18px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#CdKeydia\").remove();$(\"#mask2\").remove();}'></div>");
    str.push("<div class='DefaultFont_14' id='cdkeytext' style='width:268px;height:30px;text-align:center;top:120px;left:60px;color:#fff;line-height:30px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){window.GameMainClass.openCdkeyInput($(\"#cdkeytext\").html() == \"请输入您的CD-KEY兑换码\" ? \"\":$(\"#cdkeytext\").html());}'>请输入您的CD-KEY兑换码</div>");
    str.push("<div class='ButtonBig' style='width:80px;height:44px;background:url(res/system/SysGiftBut.png) no-repeat;top:180px;left:154px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ cdkeySubmit();}'></div>");
    str.push("</div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);
}

var DmUserJson = null;

var ShowUserInfo = function (json) {
    if (DmUserJson == null) {
        if (json != "") {
            DmUserJson = JSON.parse(json);
        }
        else {
            window.GameMainClass.sendRequestJson(1241, '', "ShowUserInfo");
            return;
        }
    }
    var str = new Array();
    str.push("<div id='mask2' class='mask2 opacity2'></div>");
    str.push("<div id='message' style=''>");
    str.push("<div class='close' style='left:355px;top:18px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#message\").remove();$(\"#mask2\").remove();}'></div>");
    if (DmUserJson.isupdated == 0) {
        str.push("<div class='DefaultFont_14 RedFont' style='width:268px;height:30px;text-align:center;top:30px;left:60px;line-height:30px;'>我的账号:" + DmUserJson.dmuser + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' style='height:30px;top:110px;left:112px;line-height:30px;'>新的密码:</div><input type='text' id='p' class='ui_textinput' style='top:113px;left:175px;' onkeypress='return keyDigitWithOutDotKeyCheck(event);' autocomplete='false'  onpaste='return false'></input>");
        str.push("<div class='DefaultFont' style='left:112px;top:90px;font-size:10px;color:#ff0000;'>第一次修改密码可获得50萌币的奖励</div>");
        str.push("<div class='DefaultFont' style='left:112px;top:75px;font-size:10px;color:#ff0000;'>您拥有一次更改密码的机会，密码为6-16位</div>");
        str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) UpPassSubmit();' id='uppasssubmit' style=';background:url(res/dialog/ButOK.png) no-repeat;top:110px;left:290px;'></div>");
    }
    else {
        str.push("<div class='DefaultFont_14 RedFont' style='width:268px;height:30px;text-align:center;top:90px;left:60px;line-height:30px;'>我的账号:" + DmUserJson.dmuser + "</div>");
    }

    str.push("<div id='messageOk' style='left:170px;top:145px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#message\").remove();$(\"#mask2\").remove();}'></div>");
    str.push("<div class='DefaultFont_14 RedFont' style='left:112px;font-size:12px;color:#ff0000;top:150px;' id='upinfo'></div>");
    str.push("</div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);
}

//提交修改密码
var UpPassSubmit = function () {
    if ($("#p").val() != "" && $("#p").val().length >= 6) {
        window.GameMainClass.sendPassword($("#p").val())
    }
}

var UpPassResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        DmUserJson.isupdated = 1;
        showTextMess("密码修改成功，获得50萌币。", BackJson.resert);
        $("#upinfo").html("请牢记您的新密码！<br>并于下次登录时输入");
        $("#messageOk").css("left", "250px");
        updateGold(2, -50);        
    }
    else
        showTextMess(BackJson.info, BackJson.resert);
}

//输入CDKEY
var InputCdKey = function (key) {
    if (key == "")
        key = "请输入您的CD-KEY兑换码";
    $("#cdkeytext").html(key);
}
//提交CDKEY
var cdkeySubmit = function () {
    if ($("#cdkeytext").html() != "") {
        window.GameMainClass.sendRequestJson(1227, '{"cdkey":"' + $("#cdkeytext").html() + '"}', "cdkeyResult");
    }
}

//CDKEY提交结果
var cdkeyResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }
        ShowRewardDialog(JSON.stringify(BackJson.rewardjson));
        DiaogColse();
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//音乐设置
var SetMusic = function () {
    Systemdata.MusicState = Number(window.GameMainClass.setMusic());
    if (Systemdata.MusicState) {
        $("#systemmusic").html("<img src='res/system/SysMusic1.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysClose.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SetMusic();'></div>");
    }
    else {
        $("#systemmusic").html("<img src='res/system/SysMusic2.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysOpen.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SetMusic();'></div>");
    }
}

var Setspecial = function () {
    Systemdata.special = Number(window.GameMainClass.setLevel());
    if (Systemdata.special) {
        $("#specialbox").html("<img src='res/system/SysEffect1.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysClose.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Setspecial();'></div>");
    }
    else {
        $("#specialbox").html("<img src='res/system/SysEffect2.png' style=' position:absolute;top:5px;left:8px;' /><div class='ButtonSmall' style='background:url(res/system/SysOpen.png) no-repeat;top:16px;left:111px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Setspecial();'></div>");
    }
}

//加城城池界面
$(document).ready(function () {
    $("#mainwrapper").css("width", Systemdata.width);
    myScroll = new iScroll('mainwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
    window.addEventListener('DOMContentLoaded', loadedwrapper, false);

    if (Systemdata.isnight)
        $("#mainbg").css("background", "url(res/city/city2.png) no-repeat");
    $("#main").css("width", Systemdata.width);
    $("#other").css("width", Systemdata.width);
    $("#other2").css("width", Systemdata.width);
    $("#shareicon").css("left", Systemdata.width - 48);
    $("#ButtonMune").css("left", Systemdata.width - 445);
    $("#JobMune").css("left", Systemdata.width - 45);
    $("#messtitle").css("left", (Systemdata.width - 347) / 2);
    $("#noticetable").css("width", Systemdata.width);

    LoadMainTask();
    loadBulidingData();
    ShowNewMess();
    //EnterBuliding(1001);    
    //LoadZodiac();
    //EnterBuliding(1002);
    //加载用户数据
    loadUserData();
    if (UserJson.RewardOnlineTime != -1) {
        OnlineReward();
    }
    else {
        $("#RewardOnline").html("<a href='javascript:void(0);'></a><img style='position:absolute;z-index:10;width:44px;height:34px;top:5px;left:0px;' src='res/city/Label_After.png' />");
    }
    GetActionJudgment();

    if (UserJson.FristRecharge < 2) {
    }
    else
        $("#ShouChongIcon").remove();

    if (UserJson.NewGuideIndex != -1) {
        NewGuideClass.tempindex = UserJson.NewGuideIndex;
        if (UserJson.NewGuideIndex == 0)
            NewGuideClass.NewBegin();
        else
            NewGuideClass.LoadNewGuide();

        return;
    }

    if (UserJson.UserLV < 17 && UserJson.NewGuideIndex == -1) {
        window.GameMainClass.sendRequestJson(1243, '', "KaiFuGiftIsOpen");
    }
    ShowBulletin();
});

var KaiFuGiftIsOpen = function (json) {
    var BackJson = JSON.parse(json);
    if (!BackJson.isgot) {
        var str = new Array();
        str.push("<div id='mask11' class='mask opacity'></div><img id='imggift' src='res/kaifu/Opens_box.png' style='position:absolute;top:99px;z-index:10000;left:" + Math.round((Systemdata.width - 102) / 2) + "px;width:102px;height:89px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) NewGuideClass.EndClick();' />");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("main").appendChild(divnode);
    }
}

function updateTaiShouSeilver(Seilver) {
    if (TaishouFuJson.data[0].isResert == 1)
        TaishouFuJson.data[0].Seilver = Seilver;

    if (document.getElementById("TaishouFuBg") != null)
        TaishouFuCalss.LoadTaishouFu();
}

//活跃数据
function SetDayTaskJson(json) {    
    TaskDayJson.data.splice(0, TaskDayJson.data.length);
    TaskDayJson.data.push(JSON.parse(json));

    var Point = TaskDayJson.data[0].ActivePoint;    
    var templist = TaskDayJson.data[0].RewardState.split(',');
    
    var bool = false;
    if (Point >= 20) {
        if (templist[0] == "1") {            
            $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
            bool = true;
        }
    }
    if (Point >= 45) {
        if (templist[1] == "1") {            
            if (!bool) {
                $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                bool = true;
            }
        }
    }
    if (Point >= 70) {
        if (templist[2] == "1") {            
            if (!bool) {
                $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                bool = true;
            }
        }
    }

    if (Point == 100) {
        if (templist[3] == "1") {           
            if (!bool) {
                $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                bool = true;
            }
        }
    }
}

/*加载建筑数据*/
var loadBulidingData = function () {
    var str = new Array();
    for (var i = 0; i < cityJson.length; i++) {
        var lv = 0;
        for (var j = 0; j < usercityjson.length; j++) {
            if (usercityjson[j].id == cityJson[i].id) {
                lv = usercityjson[j].LV;
                break;
            }
        }
        str.push('<div class="Buliding"  ontouchmove="getmovingposx()" ontouchstart="getposx()" ontouchend="if (Math.abs(lastPosX - beforePosX) < 5) return main(' + cityJson[i].id + ');" style="width:' + cityJson[i].width + 'px;height:' + cityJson[i].height + 'px;top:' + cityJson[i].top + 'px;left:' + cityJson[i].left + 'px;">');
        str.push("<div id='butitle" + cityJson[i].id + "' class='divtext2' style='top:" + cityJson[i].ftop + "px;left:" + (cityJson[i].fleft) + "px;'><div class='BulidName' style='background-position:0 -" + 15 * i + "px;'></div>" + "<div class='BulidLV' id='Bulidlv" + cityJson[i].id + "' style='background-position:0 -" + 15 * (lv - 1) + "px;'></div></div>");
        str.push("</div>");
    }
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("mainbg").appendChild(divnode);
    LoadMainTask();
};

/*加载主线任务*/
function LoadMainTask() {
    var bool = false;
    for (var i = 0; i < MainTaskData.length; i++) {
        if (MainTaskData[i].TaskState == 1 && bool == false) {            
            TaskClass.LoadMainLinTask(i);
            $("#colsemain1").remove();
            bool = true;
            break;
        }
    }
}

//推送新武将数据
function pushHeroJson(json) {
    var NewJson = JSON.parse(json);
    if (HeroJson.data[0].isResert == 1) {
        HeroJson.data[0].HeroList.push(NewJson.gJson.HeroJson[0]);
    }

    if (CultureJson.data[0].isResert == 1) {
        var tempjson = { "LaveNum": "0,0,0", "TotalNum": NewJson.gJson.TotalNum, "Gid": NewJson.gJson.Gid };
        CultureJson.data[0].list.push(tempjson);
    }
}

/*更改用户数据*/
function upUserJson(newjson, res, info) {
    if (res == 1) {
        var oldlv = UserJson.UserLV;
        UserJson = eval("(" + newjson + ")");
        if (oldlv != UserJson.UserLV) {
            ChongJiJson.data.isResert = 0;
            if (TaishouFuJson.data[0].isResert == 1) {
                TaishouFuJson.data[0].QiangZhengNumTotal += 1;
                TaishouFuJson.data[0].QiangZhengNumLave += 1;
            }
            if (UserJson.UserLV == 10 && Systemdata.utype > 99) {
                if (DmUserJson == null) {
                    window.GameMainClass.sendRequestJson(1241, '', "ShowUpPassDia");
                }
            }
            RankJson.data.isResert = 0;
        }
        loadUserData();
    }   
    showTextMess(info, res);
}

//判断是否需要打开修改密码界面
var ShowUpPassDia = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.isupdated == 0) {
        EnterBuliding(5500);
        ShowUserInfo(json);
    }
}

/*建筑升级*/
function upCityJson(type, newjson, resert, info) {
    if (resert == 1) {
        $("#CityDialog").remove();
        $("#mask").remove();
        if (type == 1000) {
            if (TaishouFuJson.data[0].isResert == 1) {
                TaishouFuJson.data[0].TodayNumTotal += 1;
                TaishouFuJson.data[0].TodayNumLave += 1;                
            } 
        }

        var index = -1;
        for (var i = 0; i < usercityjson.length; i++) {
            if (usercityjson[i].id == type) {
                index = i;
                break;
            }
        }

        if (index == -1)
            return;

        usercityjson[index] = eval("(" + newjson + ")");

        var j = 0;
        for (; j < cityJson.length; j++) {
            if (cityJson[j].id == type)
                break;
        }
        $("#Bulidlv" + cityJson[j].id).css({ "background-position": "0 -" + (15 * (usercityjson[index].LV - 1)) + "px" });
    }
    showTextMess(info, resert); 
}


var DiaogColse = function () {
    $("#dialogMain").remove();
    $("#mask").remove();
//    if (tempdialog != "") {
//        var temp = tempdialog
//        tempdialog = "";
//        main(temp);
//    }
}

//程序主入口
function main(type) {   
    if (type >= 2000)
        EnterBuliding(type);
    else {
        var index = -1;
        //获取当前建筑的数据
        for (var i = 0; i < usercityjson.length; i++) {
            if (usercityjson[i].id == type) {
                if (usercityjson[i].LV < 1)
                    return;
                index = i;
                break;
            }
        }

        if (index == -1)
            return;

        //获取建筑的本地数据
        var localindex = -1;
        for (var j = 0; j < cityJson.length; j++) {
            if (cityJson[j].id == type) {
                localindex = j;
                break;
            }
        }
        if (localindex == -1)
            return;
        if (document.getElementById("CityDialog") != null) {
            $("#CityDialog").remove();
            $("#mask").remove();
        }       
        var str = new Array();
        str.push("<div id='mask' class='mask opacity'></div><div id='CityDialog' style='left:" + (Systemdata.width - 326) / 2 + "px'>");
        str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#mask\").remove();$(\"#CityDialog\").remove();}' style='top:0px;left:287px;'></div>");
        str.push("<div class='ButtonOther' style='background:url(res/dialog/Butt_BGetInto.png) no-repeat;top:23px;left:23px;width:90px;height:40px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) EnterBuliding(" + type + ")'></div>"); //进入按钮
        if (usercityjson[index].LV < usercityjson[index].maxlv) {
            str.push("<div class='ButtonOther' style='background:url(res/dialog/Butt_BlvUp.png) no-repeat;top:23px;left:120px;width:90px;height:40px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) UpBuliding(" + type + ");'></div>");  //升级按钮
            if (usercityjson[index].SCoins != -1)
                str.push("<div class='PageNumber' style='top:125px;left:17px;font-size:14px;'><font style='color:#F3F102'>升级费用:</font>" + usercityjson[index].SCoins + "</div>");
            if (usercityjson[index].JudgeId != -1) {
                str.push("<div class='PageNumber' style='top:140px;left:17px;font-size:14px;text-align:center;'><font style='color:#F3F102'>主公等级:</font>LV  " + usercityjson[index].JudgeLv + "</div>");
            }
        }
        else {
            str.push("<div class='ButtonOther' style='background:url(res/dialog/Butt_BlvUps.png) no-repeat;top:23px;left:120px;width:90px;height:40px;'></div>");  //升级按钮不可用
            str.push("<div class='PageNumber' style='z-index:100;top:110px;left:60px;width:115px;background:url(res/dialog/Butt_BlvMax.png) no-repeat;height:49px;'></div>");
        }
        str.push("<div class='PageNumber' style='top:75px;left:17px;width:200px;font-size:14px;line-height:15px;'>" + cityJson[localindex].detail + "</div>");


        str.push("<img class='Buliding' src='");        
        str.push("res/city/" + type + "/1.png' style='width:96px;height:123px;top:35px;left:220px;top:16px;'/>");
        str.push("<div class='PageNumber' style='top:135px;left:220px;width:100px;text-align:center;'>" + cityJson[localindex].name + "<font style='color:#F3F102'>LV  " + usercityjson[index].LV + "</font></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("main").appendChild(divnode);        
    }
}

//升级建筑
function UpBuliding(type) {
    //获取需要升级的建筑的条件
    var index = -1;
    for (var i = 0; i < usercityjson.length; i++) {
        if (usercityjson[i].id == type) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        if (usercityjson[index].canup == false) {
            showTextMess("该建筑不能升级", 0);
            return;
        }

        if (usercityjson[index].JudgeLv > UserJson.UserLV) {
            showTextMess("等级不够，不能升级", 0);
            return;
        }

        if (UserJson.Silver < usercityjson[index].SCoins) {
            showTextMess("银币不足", 0);
            return;
        }

        //向服务器发送升级请求
        window.GameMainClass.upgradeBuilding(type);
        //upCityJson(type, '{ "id": 1001, "JudgeId": 1000, "LV": 2, "JudgeLv": 3, "SCoins": 3000, "canup": true }', 1, 'aaa');
    }
}

//进入建筑
var EnterBuliding = function (type) {
    if (type == 4100) {
        if (UserJson.UserLV < 20) {
            showTextMess("主公20级可开启", 0);
            return;
        }
    }

    if (type == 1007) {
        if (UserJson.UserLV < 15) {
            showTextMess("主公15级可开启", 0);
            return;
        }
    }

    if (type == 2014) {
        if (UserJson.UserLV < 15) {
            showTextMess("主公15级可开启", 0);
            return;
        }
    }

    if (type == 5000) {
        if (UserJson.UserLV < 16) {
            showTextMess("主公16级可开启", 0);
            return;
        }
    }

    if (type == 2012) {
        if (UserJson.UserLV < 20) {
            showTextMess("主公20级可开启", 0);
            return;
        }
    }

    $("#mask").remove();
    $("#CityDialog").remove();
    //$("#dialogMain").remove();
    var isResert = true;
    switch (type) {
        case 1001: //酒馆
            //判断酒馆英雄数据是否已经获取过                
            if (PubJsonNew.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1130, '{"jsontype":1,"pagetype":' + type + '}', "PushJsonData_New");
                //window.GameMainClass.setHtmlJson(type, 1);
            }
            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                //window.GameMainClass.sendRequestJson(1131, '{"jsontype":2,"pagetype":' + type + '}', "PushJsonData_New");
                window.GameMainClass.setHtmlJson(type, 2);
            }

            if (PubShengJiangJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1165, '{"jsontype":33,"pagetype":' + type + '}', "PushJsonData_New");
            }

            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }
            break;

        case 2000: //英雄            
            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }
            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 2);
            }

            if (ZfJcData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1239, '{"jsontype":36,"pagetype":' + type + '}', "PushJsonData_New");
            }

            if (lqJcData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1240, '{"jsontype":37,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;

        case 1003: //校场            
            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }
            //判断校场数据是否已经获取过
            if (schoolJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 4);
            }
            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 2);
            }
            //培养数据
            if (CultureJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 6);
            }
            //培养字典数据
            if (CultureDicJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 7);
            }

            if (ZfJcData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1239, '{"jsontype":36,"pagetype":' + type + '}', "PushJsonData_New");
            }

            if (lqJcData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1240, '{"jsontype":37,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;

        case 3000: //包裹
            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 2);
            }
            //判断临时包裹数据是否已经获取过
            if (TemporaryJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 5);
            }
            break;

        case 1004: //铁匠铺
            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }
            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 2);
            }
            break;

        case 1002: //军机处
            if (TacticsJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1161, '{"jsontype":31,"pagetype":' + type + '}', "PushJsonData_New");
            }

            //判断阵形数据是否已经获取
            if (FormationJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 9);
            }

            if (BaowuJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1221, '{"jsontype":35,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;

        case 4000: //布阵
            //判断英雄数据是否已经获取过
            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }
            //判断布阵数据是否已经获取过
            if (BuZhengJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 16);
            }
            break;

        case 6000: //每日任务
            //判断英雄数据是否已经获取过
            if (TaskDayJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 10);
            }
            break;
        case 1000: //太守府
            if (TaishouFuJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 11);
            }
            break;
        case 1005: //民居
            if (TaishouFuJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 11);
            }
            break;

        case 5000: //演武竞技
            if (AthleticsJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 12);
            }
            break;
        case 7000: //消息
            if (MessageJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 13);
            }
            break;
        case 9000: //征战
            if (UserBattleJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 14);
            }

            if (HeroJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 3);
            }

            if (FunBenJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 17);
            }

            //判断包裹数据是否已经获取过
            if (WarhoushJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 2);
            }
            break;

        case 8500: //商城
            if (ShopJson.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 15);
            }

            //判断酒馆英雄数据是否已经获取过                
            if (PubJsonNew.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1130, '{"jsontype":1,"pagetype":' + type + '}', "PushJsonData_New");
                //window.GameMainClass.setHtmlJson(type, 1);
            }
            break;

        case 8600: //充值
            if (RechargeData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 19);
            }
            break;
        case 7500: //首杀
            if (FirstKillJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 20);
            }
            break;
        case 7600: //活动
            if (ActivityJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 21);
            }
            break;
        case 7700: //冲级
            if (ChongJiJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 22);
            }
            break;
        case 7800: //分享   签到
            if (QianDaoData.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1246, '{"jsontype":39,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 7900: //累充
            if (CumulationRechargeJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.setHtmlJson(type, 24);
            }
            break;
        case 4100: //世界boss            
            isResert = false;
            window.GameMainClass.setHtmlJson(type, 25);
            break;
        case 5501: //贸易中心
            if (TradingJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1134, '{"jsontype":26,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 5200: //祭拜
            //判断酒馆英雄数据是否已经获取过                
            if (PubJsonNew.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1130, '{"jsontype":1,"pagetype":' + type + '}', "PushJsonData_New");
            }
            //判断包裹数据是否已经获取过
            if (WorshipJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1137, '{"jsontype":27,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 5300: //神将
            //判断酒馆英雄数据是否已经获取过                
            if (PubJsonNew.data[0].isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1130, '{"jsontype":1,"pagetype":' + type + '}', "PushJsonData_New");
            }
            //判断包裹数据是否已经获取过
            if (ShengJiangJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1140, '{"jsontype":28,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 1007:
            isResert = false;
            window.GameMainClass.sendRequestJson(1141, '{"pageindex":1,"ulevel":' + UserJson.UserLV + ',"jsontype":29,"pagetype":' + type + '}', "PushJsonData_New");
            break;
        case 5232: //排行
            if (RankJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1157, '{"jsontype":30,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 1800:
            if (VipJson.data.isResert == 0) {
                isResert = false;
                window.GameMainClass.sendRequestJson(1163, '{"jsontype":32,"pagetype":' + type + '}', "PushJsonData_New");
            }
            break;
        case 2012: //多人副本
            //判断英雄数据是否已经获取过
            if (HeroJson.data[0].isResert == 0) {
                window.GameMainClass.setHtmlJson(type, 3);
            }
            //判断布阵数据是否已经获取过
            if (BuZhengJson.data[0].isResert == 0) {
                window.GameMainClass.setHtmlJson(type, 16);
            }
            isResert = false;
            window.GameMainClass.sendRequestJson(1180, '{"jsontype":34,"pagetype":' + type + '}', "PushJsonData_New");
            break;
        case 51:
            isResert = false;
            window.GameMainClass.sendRequestJson(1244, '{"jsontype":38,"pagetype":' + type + ',"actid":104}', "PushJsonData_New");
            break;
    }

    if (isResert)
        showDialog(type);
}

//训练计时
function setstate(arrayIndex, needtime, state, heroIndex) {
    if (arrays[arrayIndex] != null && state == 1)
        return;
    if (needtime > 0) {
        $("#expireTime" + heroIndex).html(expireTime(needtime) + " 后完成");
        schoolJson.data[0].schooldata[arrayIndex].time--;
    }
    needtime--;
    if (needtime < 0) {
        clearTimeout(arrays[arrayIndex]);
        $("#expireTime" + heroIndex).html("");
        window.GameMainClass.trainingStop(Number(arrayIndex + 1), 1);
        //TraingOverResert(1, "OK", arrayIndex + 1, 0);
        return;
    }
    arrays[arrayIndex] = setTimeout("setstate(" + arrayIndex + "," + needtime + ",0," + heroIndex + ")", 1000);
}

//接收新的json
var PushJsonData_New = function (json) {
    //{"Client":[{"jsontype":1,"pagetype",1001}],"json":[{ "HeroData": [{ "gid": 1000, "isGot": 1 },{ "gid": 1001, "isGot": 0 }, { "gid": 1002, "isGot": 0 }], "isResert": 1,"Gem_Z":100,"Gem_R":100,"Gem_G":50}]}
    var BackJson = JSON.parse(json);
    switch (BackJson.Client[0].jsontype) {
        case 1: //酒馆数据            
            PubJsonNew.data = BackJson.json;
            break;
        case 2: //包裹数据            
            WarhoushJson.data = BackJson.json;
            break;
        case 26: //贸易
            TradingJson.data = BackJson.json;
            break;
        case 27: //祭拜
            WorshipJson.data = BackJson.json;
            break;
        case 28: //神将
            ShengJiangJson.data = BackJson.json;
            break;
        case 29:
            MineJson.data = BackJson.json;
            break;
        case 30:
            RankJson.data = BackJson.json;
            break;
        case 31:
            TacticsJson.data = BackJson.json;
            break;
        case 32:
            VipJson.data = BackJson.json;
            break;
        case 33:
            PubShengJiangJson.data = BackJson.json;
            break;
        case 34:
            FamousCampaignData.data = BackJson.json;
            break;
        case 35:
            BaowuJson.data = BackJson.json;
            break;
        case 36:
            ZfJcData.data.jlist = BackJson.json;
            ZfJcData.data.isResert = 1;
            break;
        case 37:
            lqJcData.data.llist = BackJson.json;
            lqJcData.data.isResert = 1;
            break;
        case 38:
            FestivalJson.data = BackJson.json;
            break;
        case 39:
            QianDaoData.data = BackJson.json;
            break;
    }

    switch (BackJson.Client[0].pagetype) {
        case 1001: //酒馆数据               
            if (WarhoushJson.data[0].isResert == 0 || PubJsonNew.data[0].isResert == 0 || PubShengJiangJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;
        case 2000: //英雄数据
            if (WarhoushJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0 || ZfJcData.data.isResert == 0 || lqJcData.data.isResert == 0)
                return;
            break;
        case 5501: //贸易
            if (TradingJson.data.isResert == 0)
                return;
            break;
        case 5200: //祭拜
            if (WorshipJson.data.isResert == 0 || PubJsonNew.data[0].isResert == 0)
                return;
            break;
        case 5300: //神将
            if (ShengJiangJson.data.isResert == 0 || PubJsonNew.data[0].isResert == 0)
                return;
            break;
        case 8500: //商城
            if (ShopJson.data[0].isResert == 0 || PubJsonNew.data[0].isResert == 0)
                return;
            break;
        case 5232: //排行
            if (RankJson.data.isResert == 0)
                return;
            break;
        case 1002:
            if (TacticsJson.data.isResert == 0 || FormationJson.data[0].isResert == 0 || BaowuJson.data.isResert == 0)
                return;
            break;
        case 1008:
            if (VipJson.data.isResert == 0)
                return;
            break;
        case 2012:
            if (FamousCampaignData.data.isResert == 0 || BuZhengJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;
        case 1003: //校场数据
            if (schoolJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0 || CultureJson.data[0].isResert == 0 || CultureDicJson.data[0].isResert == 0 || WarhoushJson.data[0].isResert == 0 || ZfJcData.data.isResert == 0 || lqJcData.data.isResert == 0)
                return;

            //判断是否有需要改变的武将训练状态
            var bool = false;
            for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                if (HeroJson.data[0].HeroList[i].State1 == 1) {
                    bool = false;
                    for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
                        if (schoolJson.data[0].schooldata[j].HeroId == HeroJson.data[0].HeroList[i].Id) {
                            bool = true;
                            break;
                        }
                    }
                    if (bool == false)
                        HeroJson.data[0].HeroList[i].State1 = 0;
                }
            }
            break;
    }

    showDialog(BackJson.Client[0].pagetype);
}
//接收新的json
function PushJsonData(pagetype, jsontype, json) {    
    switch (jsontype) {
        case 1: //酒馆数据
            PubJson.data.splice(0, PubJson.data.length);
            PubJson.data.push(JSON.parse(json));
            break;
        case 2: //包裹数据
            WarhoushJson.data.splice(0, WarhoushJson.data.length);
            WarhoushJson.data.push(JSON.parse(json));
            break;
        case 3: //英雄数据
            HeroJson.data.splice(0, HeroJson.data.length);
            HeroJson.data.push(JSON.parse(json));
            break;
        case 4: //校场数据
            schoolJson.data.splice(0, schoolJson.data.length);
            schoolJson.data.push(JSON.parse(json));
            break;
        case 5://临时包裹
            TemporaryJson.data.splice(0, TemporaryJson.data.length);
            TemporaryJson.data.push(JSON.parse(json));
            break;
        case 6://培养数据
            CultureJson.data.splice(0, CultureJson.data.length);
            CultureJson.data.push(JSON.parse(json));
            break;
        case 7://培养字典数据
            CultureDicJson.data.splice(0, CultureDicJson.data.length);
            CultureDicJson.data.push(JSON.parse(json));
            break;
        case 8://军机处数据
            GrandCouncilJSon.data.splice(0, GrandCouncilJSon.data.length);
            GrandCouncilJSon.data.push(JSON.parse(json));
            break;
        case 9://阵形数据
            FormationJson.data.splice(0, FormationJson.data.length);
            FormationJson.data.push(JSON.parse(json));
            break;
        case 10: //每日任务
            TaskDayJson.data.splice(0, TaskDayJson.data.length);
            TaskDayJson.data.push(JSON.parse(json));
            break;
        case 11: //太守府
            TaishouFuJson.data.splice(0, TaishouFuJson.data.length);
            TaishouFuJson.data.push(JSON.parse(json));
            break;
        case 12: //演武竞技
            AthleticsJson.data.splice(0, AthleticsJson.data.length);
            AthleticsJson.data.push(JSON.parse(json));
            break;
        case 13: //消息            
            MessageJson.data.splice(0, MessageJson.data.length);           
            MessageJson.data.push(JSON.parse(json));
            break;
        case 14: //征战            
            UserBattleJson.data.splice(0, UserBattleJson.data.length);
            UserBattleJson.data.push(JSON.parse(json));
            break;
        case 15: //商城
            ShopJson.data.splice(0, ShopJson.data.length);
            ShopJson.data.push(JSON.parse(json));
            break;
        case 16: //布阵
            BuZhengJson.data.splice(0, BuZhengJson.data.length);
            BuZhengJson.data.push(JSON.parse(json));
            break;
        case 17:            
            FunBenJson = JSON.parse(json);
            break;
        case 19:
            RechargeData.data = JSON.parse(json);
            break;
        case 20:
            FirstKillJson.data = JSON.parse(json);
            break;
        case 21://活动
            ActivityJson.data = JSON.parse(json);
            break;
        case 22:
            ChongJiJson.data = JSON.parse(json);
            break;
        case 23: //分享
            ShareJson.data = JSON.parse(json);
            break;
        case 24: //累充
            CumulationRechargeJson.data = JSON.parse(json);
            break;
        case 25:
            BossOfWoldJson.data = JSON.parse(json);
            break;    
    }

    switch (pagetype) {
        case 1001: //酒馆数据               
            if (WarhoushJson.data[0].isResert == 0 || PubJsonNew.data[0].isResert == 0 || PubShengJiangJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;

        case 2000: //英雄数据
            if (WarhoushJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0 || ZfJcData.data.isResert == 0 || lqJcData.data.isResert == 0)
                return;
            break;
        case 1003: //校场数据
            if (schoolJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0 || CultureJson.data[0].isResert == 0 || CultureDicJson.data[0].isResert == 0 || WarhoushJson.data[0].isResert == 0 || ZfJcData.data.isResert == 0 || lqJcData.data.isResert == 0)
                return;

            //判断是否有需要改变的武将训练状态
            var bool = false;
            for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                if (HeroJson.data[0].HeroList[i].State1 == 1) {
                    bool = false;
                    for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
                        if (schoolJson.data[0].schooldata[j].HeroId == HeroJson.data[0].HeroList[i].Id) {
                            bool = true;
                            break;
                        } 
                    }
                    if (bool == false)
                        HeroJson.data[0].HeroList[i].State1 = 0;
                }
            }
            break;
        case 3000:
            if (WarhoushJson.data[0].isResert == 0 || TemporaryJson.data[0].isResert == 0)
                return;
            break;
        case 1004: //铁匠铺
            if (WarhoushJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;
        case 1002: //军机处
            if (TacticsJson.data.isResert == 0 || FormationJson.data[0].isResert == 0 || BaowuJson.data.isResert == 0)
                return;
            break;
        case 4000: //布阵
            if (BuZhengJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;
        case 6000: //每日任务
            if (TaskDayJson.data[0].isResert == 0)
                return;
            break;
        case 1000: //太守府
            if (TaishouFuJson.data[0].isResert == 0)
                return;
            break;
        case 5000: //演武竞技
            if (AthleticsJson.data[0].isResert == 0)
                return;
            break;
        case 7000: //消息            
            if (MessageJson.data[0].isResert == 0)
                return;
            break;
        case 9000: //征战            
            if (UserBattleJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0 || FunBenJson.data.isResert == 0 || WarhoushJson.data[0].isResert == 0)
                return;
            break;
        case 8500: //商城
            if (ShopJson.data[0].isResert == 0 || PubJsonNew.data[0].isResert == 0)
                return;
            break;

        case 8600: //充值
            if (RechargeData.data.isResert == 0)
                return;
            break;
        case 7500: //首杀
            if (FirstKillJson.data.isResert == 0)
                return;
            break;
        case 7600: //活动
            if (ActivityJson.data.isResert == 0)
                return;
            break;
        case 7700: //冲级
            if (ChongJiJson.data.isResert == 0) {
                return;
            }
            break;
        case 7800://分享
            if (ShareJson.data.isResert == 0)
                return;
            break;
        case 7900: //
            if (CumulationRechargeJson.data.isResert == 0)
                return;
            break;
        case 4100://世界boss
            if (BossOfWoldJson.data.isResert == 0)
                return;
            break;
        case 2012:
            if (FamousCampaignData.data.isResert == 0 || BuZhengJson.data[0].isResert == 0 || HeroJson.data[0].isResert == 0)
                return;
            break;
    }

    showDialog(pagetype);
}

//弹出层
function showDialog(obj) {    
    if (obj == 1007) {
        ActivityClass.LoadMine();
        return;
    }

    if (obj == 2012) {
        ActivityClass.LoadMoreFuBen();
        return;
    }

    if (obj != 4000) {
        DiaogColse();
        var divnode = document.createElement("div");
        divnode.id = 'mask';
        divnode.className = 'mask opacity';
        document.getElementById("main").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.id = 'dialogMain';
        document.getElementById("main").appendChild(divnode);

        $("#dialogMain").css({ "top": "8px", "left": (Systemdata.width - 443 + 40) / 2 + "px" });

        $("#dialogMain").html("<div class='close' id='colsemain' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();'></div>");
    }
    DiaShow(obj);

}

//接收武将解雇结果
function DismissResert(json) {   
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到数据库中
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }
        
        //在包裹中扣除返回令
        if (BackJson.Client[0].isReturnToken == 1) {
            var TokenNum = BackJson.useTokenSID.split(",");
            for (var i = 0; i < TokenNum.length; i++) {
                if (Number(TokenNum[i]) != 0) {
                    for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                        if (WarhoushJson.data[0].GoodsList[j].ItId == Number(TokenNum[i])) {
                            WarhoushJson.data[0].GoodsList[j].iVal = Number(BackJson.useTokenNum.split(",")[i]);

                            if (WarhoushJson.data[0].GoodsList[j].iVal == 0) {
                                WarhoushJson.data[0].GoodsList.splice(j, 1);
                            }
                            break;
                        }
                    }
                }
            } 
        }

        //判断阵形中是否有该武将，如果有，则将该武将对应的位置置0
        var FomartiomList = UserJson.FormationHero.split(",");
        var ss = "";
        for (var i = 0; i < FomartiomList.length; i++) {
            if (FomartiomList[i] == String(BackJson.Client[0].gSID)) {
                FomartiomList[i] = 0;
            }

            ss += FomartiomList[i];
            if (i != FomartiomList.length - 1)
                ss += ",";
        }

        UserJson.FormationHero = ss;

        for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
            if (HeroJson.data[0].HeroList[i].Id == BackJson.Client[0].gSID) {
                //判断酒馆中是否有该武将,有则改为可招募的状态
                if (PubJsonNew.data[0].isResert == 1) {
                    for (var j = 0; j < PubJsonNew.data[0].HeroData.length; j++) {
                        if (PubJsonNew.data[0].HeroData[j].gid == HeroJson.data[0].HeroList[i].HeroId) {
                            PubJsonNew.data[0].HeroData[j].isGot = 0;
                            break;
                        }
                    }
                }

                if (PubShengJiangJson.data[0].isResert == 1) {
                    for (var j = 0; j < PubShengJiangJson.data[0].HeroData.length; j++) {
                        if (PubShengJiangJson.data[0].HeroData[j].gid == HeroJson.data[0].HeroList[i].HeroId) {
                            PubShengJiangJson.data[0].HeroData[j].isGot = 0;
                            break;
                        }
                    }
                }

                if (ShengJiangJson.data.isResert == 1) {
                    for (var j = 0; j < ShengJiangJson.data.GeneralsList.length; j++) {
                        if (ShengJiangJson.data.GeneralsList[j].gID == HeroJson.data[0].HeroList[i].HeroId) {
                            ShengJiangJson.data.GeneralsList[j].isOwn = 0;
                            break;
                        }
                    }
                }
                
                //将对应的装备放到包裹中
                for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                    if (WarhoushJson.data[0].GoodsList[j].gid == BackJson.Client[0].gSID)
                        WarhoushJson.data[0].GoodsList[j].gid = 0;
                }
                //重置校场数据
                if (HeroJson.data[0].HeroList[i].State1 == 1) {
                    if (schoolJson.data[0].isResert == 1) {
                        //清除旧的计时器
                        for (var m = 0; m < arrays.length; m++) {
                            if (arrays[m] != null)
                                clearTimeout(arrays[m]);
                        }
                        schoolJson.data[0].isResert = 0;
                    }
                }

                HeroJson.data[0].HeroList.splice(i, 1);

                var pageindex = parseInt(i / 8);                
                if (i % 8 != 0)
                    pageindex += 1;
                if (pageindex == 0)
                    pageindex = 1;
                MyshowDialog.HeroChangePage(pageindex);
                $("#jgbg").remove();
                $("#mask2").remove();
                break;
            }            
        }

        //获得物品提示窗
        var bool = false;
        if (BackJson.getCoin > 0)
            bool = true;
        if (!bool) {
            var booklist = BackJson.ExpBooksNum.split(",");
            for (var i = 0; i < booklist.length; i++) {
                if (Number(booklist[i]) > 0) {
                    bool = true;
                    break;
                }
            }
        }
        if (bool) {
            ShowRewardDialog("{'ItemId':'" + BackJson.ExpBooksID + ",200','count':'" + BackJson.ExpBooksNum + "," + BackJson.getCoin + "'}");
        }
        //更新银币
        updateGold(1, 0 - BackJson.getCoin);
    }

    showTextMess(BackJson.info, BackJson.resert);
}

//更改武将数据
function updateHerodata(json) {
    if (json != "") {
        var BackJson = JSON.parse(json);
        for (var i = 0; i < DeleHeroJson.data.HeroList.length; i++) {
            if (DeleHeroJson.data.HeroList[i].gID == BackJson.Gid) {
                DeleHeroJson.data.HeroList[i].isResert = 0;
                break;
            }
        }

        if (BackJson.HeroId != 0 && HeroJson.data[0].isResert == 1) {
            for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                if (HeroJson.data[0].HeroList[i].Id == BackJson.Gid) {
                    HeroJson.data[0].HeroList[i] = BackJson.HeroJson[0];
                    break;
                }
            }
        }

        if (CultureJson.data[0].isResert == 1) {
            for (var i = 0; i < CultureJson.data[0].list.length; i++) {
                if (CultureJson.data[0].list[i].Gid == BackJson.Gid) {
                    CultureJson.data[0].list[i].TotalNum = BackJson.TotalNum;
                    break;
                }
            }
        }

        if (document.getElementById("Training") != null) {
            SchoolClass.loadSchool();
            if (BackJson.Gid != 0) {
                for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                    if (HeroJson.data[0].HeroList[i].Id == BackJson.Gid) {                        
                        $("#LvBox" + i).html("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[i].Hlv));
                        break;
                    }
                }
            }
            
        }

        if (document.getElementById("MyHero") != null) {
            MyshowDialog.CheckMyHero();
            if (BackJson.Gid != 0) {
                for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                    if (HeroJson.data[0].HeroList[i].Id == BackJson.Gid) {
                        $("#LvBox" + i).html("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[i].Hlv));
                        break;
                    }
                }
            }
        } 
    }
}

//接收武将训练结果
function TrainingResert(HeroIndex, reset, info, locid, time, money, HeroId, money_type) {
    if (reset == 1) {
        HeroJson.data[0].HeroList[HeroIndex].State1 = 1;
        //更改校场状态
        schoolJson.data[0].schooldata[locid - 1].state = 1;
        schoolJson.data[0].schooldata[locid - 1].time = time;
        schoolJson.data[0].schooldata[locid - 1].HeroId = HeroId;
        //减少钱数
        if (money_type == 0)
            updateGold(1, money);
        else
            updateGold(2, money);

        $("#HeroHead" + HeroIndex).html($("#HeroHead" + HeroIndex).html() + "<div class='HeroState HasTraining' id='HeroHP" + HeroIndex + "'></div>");

        var x = 0;
        for (; x < GeneralsJson.length; x++) {
            if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId) {
                break;
            }
        }
        $("#LvBox" + HeroIndex).html("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv));
        setstate(locid - 1, time, 0, HeroIndex);
        if (SchoolClass.tempHeroIndex == HeroIndex) {
            //SchoolClass.tempHeroIndex = HeroIndex;
            //SchoolClass.tempLocalIndex = x;
            SchoolClass.loadSchool();
        }
    }

    showTextMess(info, reset);
}

//开启训练位结果
function OpenNewLoca(resert, info, oldgold, oldtype, newgold, newtype, newjson) {
    if (resert == 1) {
        //减少钱数
        if (oldtype == 1) {
            updateGold(1, oldgold);
        }
        else {
            updateGold(2, oldgold);
        }
        //改变校场数据
        schoolJson.data[0].Gold = newgold;
        schoolJson.data[0].gtype = newtype;

        schoolJson.data[0].schooldata.push(eval("(" + newjson + ")"));
        //更改训练位提示
        var count = 0;
        for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
            if (schoolJson.data[0].schooldata[j].state == 1)
                count++;
        }
        if (schoolJson.data[0].Gold == -1)
            $("#AddNewPosBtn").css({"background":"url(res/dialog/ButtonAdd2.png) no-repeat"});
            
        $('#SchLoaState').html(count + "/" + schoolJson.data[0].schooldata.length);
        $("#UserBookDg").remove();
        $("#mask2").remove();
    }

    showTextMess(info, resert);
}

//结束武将训练
function TraingOverResert(resert, info, lcoaid, gold) {
    if (resert == 1) {
        var index = 0;
        lcoaid -= 1;        
        for (; index < HeroJson.data[0].HeroList.length; index++) {
            if (HeroJson.data[0].HeroList[index].Id == schoolJson.data[0].schooldata[lcoaid].HeroId) {                
                break;
            }
        }
        HeroJson.data[0].HeroList[index].State1 = 0;
        //减少钱的数量
        updateGold(2, gold);
        //清除计时器
        clearTimeout(arrays[lcoaid]);
        //改变校场状态
        schoolJson.data[0].schooldata[lcoaid].HeroId = 0;
        schoolJson.data[0].schooldata[lcoaid].time = 0;
        schoolJson.data[0].schooldata[lcoaid].state = 0;

        var count = 0;
        for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
            if (schoolJson.data[0].schooldata[j].state == 1)
                count++;
        }
        //改变校场空位展示
        $('#SchLoaState').html(count + "/" + schoolJson.data[0].schooldata.length);
        $("#HeroHP" + index).remove();
        var x = 0;
        for (; x < GeneralsJson.length; x++) {
            if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[index].HeroId) {
                break;
            }
        }

        SchoolClass.tempHeroIndex = index;
        SchoolClass.tempLocalIndex = x;
        if (document.getElementById("Training") != null)
            SchoolClass.loadSchool();
    }

    showTextMess(info, resert);
}

//开启英雄技能位结果通知
function OpenHeroSkillResert(HeroIndex, SkillIndex, reset, info,MCoin) {
    if (reset == 1) {
        if (MCoin > 0)
            updateGold(2, MCoin);
        var skillList = HeroJson.data[0].HeroList[HeroIndex].SkillLocation.split(",");
        skillList[SkillIndex] = 1;
        var str = new Array();
        for (var i = 0; i < skillList.length; i++) {
            str.push(skillList[i]);
            if (i != skillList.length - 1)
                str.push(",");
        }
        HeroJson.data[0].HeroList[HeroIndex].SkillLocation = str.join("");
        $("#HeroSkillManage").remove();
        MyshowDialog.HeroSkillManage(HeroIndex);
    }

    showTextMess(info, reset);
}

//学习英雄技能返回结果
function LearnHeroSkillResert(HeroIndex, GoodsIndex, reset, info) {
    if (reset == 1) {
        var skillList = HeroJson.data[0].HeroList[HeroIndex].SkillLocation.split(",");        
        var str = new Array();
        var bool = false;
        for (var i = 0; i < skillList.length; i++) {
            if (skillList[i] == "1" && bool == false) {
                skillList[i] = WarhoushJson.data[0].GoodsList[GoodsIndex].correId;
                bool = true;
            }
            str.push(skillList[i]);
            if (i != skillList.length - 1)
                str.push(",");
        }
        
        HeroJson.data[0].HeroList[HeroIndex].SkillLocation = str.join("");

        
        //将技能书从json中删除
        if (WarhoushJson.data[0].GoodsList[GoodsIndex].iVal > 1) {
            WarhoushJson.data[0].GoodsList[GoodsIndex].iVal = WarhoushJson.data[0].GoodsList[GoodsIndex].iVal - 1;
        }
        else {
            WarhoushJson.data[0].GoodsList.splice(parseInt(GoodsIndex), 1);
        }

        MyshowDialog.tempBookJson.SkillBook.splice(0, MyshowDialog.tempBookJson.SkillBook.length);        

        MyshowDialog.HeroSkillManage(HeroIndex);
    }

    showTextMess(info, reset);
}

//使用技能返回结果
function UserSkillResert(HeroIndex, SkillIndex, reset, info) {
    if (reset == 1) {
        HeroJson.data[0].HeroList[HeroIndex].Hert = Number(SkillJson[SkillIndex].sId);

        if (document.getElementById("hert") != null) {
            $("#hert").remove();
            $("#MyHero").html($("#MyHero").html() + "<div id='hert' class='Skill' style='background:url(res/skill/" + SkillJson[SkillIndex].sImgid + ".png) no-repeat;left:172px;top:119px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSkillData(" + SkillIndex + ",0);'></div>");
            $("#KidsDialog").remove();
            $("#mask2").remove();

        }
        else {
            if (document.getElementById("MyHero") != null) {
                $("#MyHero").html($("#MyHero").html() + "<div id='hert' class='Skill' style='background:url(res/skill/" + SkillJson[SkillIndex].sImgid + ".png) no-repeat;left:172px;top:119px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSkillData(" + SkillIndex + ",0);'></div>");
                $("#KidsDialog").remove();
                $("#mask2").remove();
            }
        }
    }
    showTextMess(info, reset);
}

//保存阵形结果
function SaveFormationResert(FormationHero, reset, info, FormationID, FonmationIndex) {
    if (reset == 1) {
        UserJson.FormationHero = FormationHero + ",0,0,0,0";
        //更改武将状态
        var temp = FormationHero.split(",");
        for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
            HeroJson.data[0].HeroList[i].State2 = 0;
            for (var j = 0; j < temp.length; j++) {
                if (temp[j] == HeroJson.data[0].HeroList[i].Id) {
                    HeroJson.data[0].HeroList[i].State2 = 1;
                    break;
                }
            }
        }
        UserJson.FormationId = FormationID;
        var tempjson = BuZhengJson.data[0].list.slice(0);
        BuZhengJson.data[0].list[0] = tempjson[FonmationIndex];
        BuZhengJson.data[0].list[FonmationIndex] = tempjson[0];

        BuZhengClass.isEdit = false;
        if (document.getElementById("SynthesisHeroSelect") != null)
            BuZhengClass.LoadZX(1);
    }

    showTextMess(info, reset);
}

//招募结果
function RecruitResert(json) {
    //{"resert":1,"info":"","Client":[{"gid":1}],"money":50,"moneytype":1}
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        if (BackJson.Client[0].type == 1) {
            for (var i = 0; i < PubJsonNew.data[0].HeroData.length; i++) {
                if (PubJsonNew.data[0].HeroData[i].gid == BackJson.Client[0].gid) {
                    PubJsonNew.data[0].HeroData[i].isGot = 1;
                    if (BackJson.money > 0) {
                        switch (BackJson.moneytype) {
                            case 0:
                                updateGold(1, 3000);
                                break;
                            case 1:
                                PubJsonNew.data[0].GemBlue -= BackJson.money;
                                $("#Gem1").html(PubJsonNew.data[0].GemBlue);
                                break;
                            case 2:
                                PubJsonNew.data[0].GemPurple -= BackJson.money;
                                $("#Gem2").html(PubJsonNew.data[0].GemPurple);
                                break;
                            case 3:
                                PubJsonNew.data[0].GemRed -= BackJson.money;
                                $("#Gem3").html(PubJsonNew.data[0].GemRed);
                                break;
                            case 4:
                                PubJsonNew.data[0].GemYellow -= BackJson.money;
                                $("#Gem4").html(PubJsonNew.data[0].GemYellow);
                                break;
                        }
                    }
                    var divnode = document.createElement("div");
                    divnode.className = "HasRecruit";
                    document.getElementById("pubHeroSelect" + i).appendChild(divnode);

                    var x = 0;
                    for (; x < GeneralsJson.length; x++) {
                        if (GeneralsJson[x].HeroId == BackJson.Client[0].gid) {
                            break;
                        }
                    }
                    pubclass.ShowHeroData(i, x);
                    break;
                }
            }
        }
        else {
            if (ShengJiangJson.data.isResert == 1) {
                for (var i = 0; i < ShengJiangJson.data.GeneralsList.length; i++) {
                    if (BackJson.Client[0].gid == ShengJiangJson.data.GeneralsList[i].gID) {
                        ShengJiangJson.data.GeneralsList[i].isOwn = 1;
                        break;
                    }
                }
            }
            for (var i = 0; i < PubShengJiangJson.data[0].HeroData.length; i++) {
                if (PubShengJiangJson.data[0].HeroData[i].gid == BackJson.Client[0].gid) {
                    PubShengJiangJson.data[0].HeroData[i].isGot = 1;
                    if (BackJson.money > 0) {
                        switch (BackJson.moneytype) {
                            case 0:
                                updateGold(1, 3000);
                                break;
                            case 1:
                                PubJsonNew.data[0].GemBlue -= BackJson.money;
                                $("#Gem1").html(PubJsonNew.data[0].GemBlue);
                                break;
                            case 2:
                                PubJsonNew.data[0].GemPurple -= BackJson.money;
                                $("#Gem2").html(PubJsonNew.data[0].GemPurple);
                                break;
                            case 3:
                                PubJsonNew.data[0].GemRed -= BackJson.money;
                                $("#Gem3").html(PubJsonNew.data[0].GemRed);
                                break;
                            case 4:
                                PubJsonNew.data[0].GemYellow -= BackJson.money;
                                $("#Gem4").html(PubJsonNew.data[0].GemYellow);
                                break;
                        }
                    }
                    var divnode = document.createElement("div");
                    divnode.className = "HasRecruit";
                    document.getElementById("pubHeroSelect" + i).appendChild(divnode);

                    var x = 0;
                    for (; x < GeneralsJson.length; x++) {
                        if (GeneralsJson[x].HeroId == BackJson.Client[0].gid) {
                            break;
                        }
                    }
                    pubclass.ShowShengjiangData(i, x);
                    break;
                }
            } 
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//刷新酒馆结果
function RefreshResert(reset, info, newjsondata, goldtype, gold) {
    isSubmit = false;
    if (reset == 1) {
        PubJson.data.splice(0, PubJson.data.length);
        PubJson.data.push(eval("(" + newjsondata + ")"));
        updateGold(goldtype, gold);
        showDialog(1001);
    }

    showTextMess(info, reset);
}

//更换装备结果
function WearOrTakeoffEqResert(HeroIndex, resert, info, ItemId,type,oldid) {
    if (resert == 1) {
        var itemindex = 0;
        for (; itemindex < WarhoushJson.data[0].GoodsList.length; itemindex++) {
            if (WarhoushJson.data[0].GoodsList[itemindex].ItId == ItemId)
                break;
        }

        var Eqlist = HeroJson.data[0].HeroList[HeroIndex].Equipment.split(",");

        if (type == 1) {
            if (oldid != -1) {//替换
                for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                    if (WarhoushJson.data[0].GoodsList[i].ItId == oldid) {
                        WarhoushJson.data[0].GoodsList[i].gid = 0;
                        break;
                    }
                }
            }
            WarhoushJson.data[0].GoodsList[itemindex].gid = HeroJson.data[0].HeroList[HeroIndex].Id;
            Eqlist[WarhoushJson.data[0].GoodsList[itemindex].Type - 1] = ItemId;

            var temp = "";
            for (var j = 0; j < Eqlist.length; j++) {
                temp += Eqlist[j];
                if (j != Eqlist.length - 1)
                    temp += ",";
            }
            HeroJson.data[0].HeroList[HeroIndex].Equipment = temp;
        }
        else {
            WarhoushJson.data[0].GoodsList[itemindex].gid = 0;
            var Eqlist = HeroJson.data[0].HeroList[HeroIndex].Equipment.split(",");
            Eqlist[WarhoushJson.data[0].GoodsList[itemindex].Type - 1] = 0;

            var temp = "";
            for (var j = 0; j < Eqlist.length; j++) {
                temp += Eqlist[j];
                if (j != Eqlist.length - 1)
                    temp += ",";
            }
            HeroJson.data[0].HeroList[HeroIndex].Equipment = temp;
        }

        var x = 0;
        for (; x < GeneralsJson.length; x++) {
            if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId) {
                break;
            }
        }
        MyshowDialog.loadEquipment(HeroIndex, x);

        //获取被点击英雄头像的座标
        var left = $("#HeroHead" + String(HeroIndex)).position().left;
        var top = $("#HeroHead" + String(HeroIndex)).position().top;
        $("#HeroHeadClick").css({ "top": top - 3, "left": left - 2 });
    }

    $("#EquipmentMessage").remove();
    showTextMess(info, resert);
}

//合成结果
function SynthesisResert(reset, info, goodsindex, wuhuncount) {
    isSubmit = false;
    showTextMess(info, reset);
    if (reset == 1) {
        //减少该武魂的数量
        WarhoushJson.data[0].GoodsList[goodsindex].iVal -= wuhuncount;
        if (WarhoushJson.data[0].GoodsList[goodsindex].iVal < 1) {
            WarhoushJson.data[0].GoodsList.splice(goodsindex, 1);
            pubclass.GoodsChangePage(1);
        }
        else {
            $("#wuhunNum" + String(goodsindex)).html(WarhoushJson.data[0].GoodsList[goodsindex].iVal);
        }        
    }
    else if (reset == 0)
    { }
    else {
        //减少该武魂的数量
        WarhoushJson.data[0].GoodsList[goodsindex].iVal -= wuhuncount;
        if (WarhoushJson.data[0].GoodsList[goodsindex].iVal < 1) {
            WarhoushJson.data[0].GoodsList.splice(goodsindex, 1);
            pubclass.GoodsChangePage(1);
        }
        else {
            $("#wuhunNum" + String(goodsindex)).html(WarhoushJson.data[0].GoodsList[goodsindex].iVal);
        }
    }    
}

//商品出售结果
function SaleGoodsResert(itemid, resert, info, money) {
    isSubmit = false;
    if (resert == 1) {
        var len = 0, index = 0, islast = true;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].gid == 0)
                len++;

            if (WarhoushJson.data[0].GoodsList[i].ItId == itemid) {
                //判断是否有宝石获得
                if (WarhoushJson.data[0].GoodsList[i].Type < 5 || WarhoushJson.data[0].GoodsList[i].Type == 8) {
                    if (PubJsonNew.data[0].isResert == 1) {
                        for (var j = 0; j < GoodsJson.length; j++) {
                            if (GoodsJson[j].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                                switch (GoodsJson[j].NColor) {
                                    case 1:
                                        PubJsonNew.data[0].GemBlue += WarhoushJson.data[0].GoodsList[i].iVal;
                                        break;
                                    case 2:
                                        PubJsonNew.data[0].GemPurple += WarhoushJson.data[0].GoodsList[i].iVal;
                                        break;
                                    case 3:
                                        PubJsonNew.data[0].GemRed += WarhoushJson.data[0].GoodsList[i].iVal;
                                        break;
                                    case 4:
                                        PubJsonNew.data[0].GemYellow += WarhoushJson.data[0].GoodsList[i].iVal;
                                        break;
                                }
                                break;
                            }
                        }
                    }
                }

                WarhoushJson.data[0].GoodsList.splice(i, 1);
                //判断是否为最后一个物品
                for (var x = i; x < WarhoushJson.data[0].GoodsList.length; x++) {
                    if (WarhoushJson.data[0].GoodsList[x].gid == 0) {
                        islast = false;
                        break;
                    }
                }
                if (islast)
                    len -= 1;
                break;
            }
        }
        updateGold(1, 0 - money);

        var len1 = 0;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (WarhoushJson.data[0].GoodsList[j].gid == 0) {
                len1++;
                if (len1 == len)
                    index = j;
            }
        }
        var pageindex = 1;
        pageindex = parseInt(len / 24);
        if (len % 24 != 0)
            pageindex += 1;

        if (document.getElementById("WhBg") != null)
            WarHouseClass.ShowWHData(pageindex, index, false);
    }
    showTextMess(info, resert);
    
}

//拾取物品结果
function PickGoodsResert(json) {    
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        switch (BackJson.type) {
            case 1:
                AddItemToWarOther(BackJson.GoodsJson);
                //删除临时包裹中的物品数据
                for (var i = 0; i < TemporaryJson.data[0].GoodsList.length; i++) {
                    if (TemporaryJson.data[0].GoodsList[i].ItId == BackJson.SIDOld) {                        
                        TemporaryJson.data[0].GoodsList.splice(i, 1);
                        break;
                    }
                }
                WarHouseClass.ShowLSData(1);
                break;
            case 0:
                WarhoushJson.data[0].isResert = 0;
                TemporaryJson.data[0].GoodsList.splice(0, TemporaryJson.data[0].GoodsList.length);
                EnterBuliding(3000);
                break;
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//精炼结果
function SmithyResert(resert, info, itid, lv, ATK, def, hp, Silver) {
    isSubmit = false;
    if (resert == 1) {
        updateGold(1, Silver);
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].ItId == itid) {
                WarhoushJson.data[0].GoodsList[i].RefineLv = lv;
                WarhoushJson.data[0].GoodsList[i].refAtk = ATK;
                WarhoushJson.data[0].GoodsList[i].refDef = def;
                WarhoushJson.data[0].GoodsList[i].refHP = hp;

                var type = WarhoushJson.data[0].GoodsList[i].gid == 0 ? 2 : 1;

                var pageindex1 = 1, pageindex2 = 1;
                if (type == 1) {
                    var len = 0;
                    for (var j = 0; j < SmithyClass.tempHeroData.List.length; j++) {
                        len++;
                        if (SmithyClass.tempHeroData.List[j].Id == WarhoushJson.data[0].GoodsList[i].gid)
                            break;
                    }

                    if (len > 3) {
                        pageindex1 = parseInt(len / 3);
                        if (len % 3 != 0)
                            pageindex1 += 1;
                    }
                }
                else {
                    var len = 0;
                    for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                        if (WarhoushJson.data[0].GoodsList[j].gid == 0 && WarhoushJson.data[0].GoodsList[j].Type < 5) {
                            len++;
                            if (i == j)
                                break;
                        }
                    }

                    if (j > 16) {
                        pageindex2 = parseInt(len / 16);
                        if (len % 16 != 0)
                            pageindex2 += 1;
                    }
                }


                SmithyClass.tempHeroData.List.splice(0, SmithyClass.tempHeroData.List.length);
                SmithyClass.LoadByHero(pageindex1);
                SmithyClass.LoadByWarHouse(pageindex2, i);

                SmithyClass.ClickE(i, type, itid);

                break;
            }
        }
    }
    else if (resert == 6) {
        //强化失败，扣除银币
        updateGold(1, Silver);
    }
    else {
    }
    showTextMess(info, resert);
}


//合成结果
function SynthesisGoodsResert(json) {
    var BackJson = JSON.parse(json); 
    showTextMess(BackJson.info, BackJson.resert);
    if (BackJson.resert == 1) {
        //减少该碎片的数量
        WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal -= BackJson.Client[0].IVal;
        $("#wuhunNum" + String(BackJson.Client[0].Goodsindex)).html(WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal);

        if (WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal <= 0) {
            WarhoushJson.data[0].GoodsList.splice(BackJson.Client[0].Goodsindex, 1);
            SmithyClass.LoadSynthesisGoods();
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 9) {
                    SmithyClass.LoadSynthesis(i);
                    break;
                }

                if (i == WarhoushJson.data[0].GoodsList.length - 1)
                    SmithyClass.LoadSynthesis(0);
            }
        }

        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson.length > 0) {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson.length > 0) {
            AddItemToTwarOther(BackJson.tempsJson);
        }        
    }
    else if (BackJson.resert == 0)
    { }
    else {
        //减少该物品的数量
        WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal -= BackJson.Client[0].IVal;
        $("#wuhunNum" + String(BackJson.Client[0].Goodsindex)).html(WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal);
        if (WarhoushJson.data[0].GoodsList[BackJson.Client[0].Goodsindex].iVal <= 0) {
            WarhoushJson.data[0].GoodsList.splice(BackJson.Client[0].Goodsindex, 1);
            SmithyClass.LoadSynthesisGoods();
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 9) {
                    SmithyClass.LoadSynthesis(i);
                    break;
                }

                if (i == WarhoushJson.data[0].GoodsList.length - 1)
                    SmithyClass.LoadSynthesis(0);
            }
        }        
    }
}

//培养结果
function CultureResert(resert, info, HeroIndex, outcome, ctype, etype, goldval, CultureIndex, itemid, itemnum, NOT) {
    isSubmit = false;
    if (resert == 1) {
        var templist = CultureJson.data[0].list[CultureIndex].LaveNum.split(",");
        templist[etype - 1] = Number(templist[etype - 1]) + NOT;
        var ss = "";
        for (var i = 0; i < templist.length; i++) {
            ss += templist[i];
            if (i != templist.length - 1)
                ss += ",";
        }
        CultureJson.data[0].list[CultureIndex].LaveNum = ss;

        templist = HeroJson.data[0].HeroList[HeroIndex].Equipment.split(",");

        for (var m = 0; m < templist.length; m++) {
            if (templist[m] != "0") {
                for (var n = 0; n < WarhoushJson.data[0].GoodsList.length; n++) {
                    if (WarhoushJson.data[0].GoodsList[n].ItId == templist[m]) {
                        templist[m] = WarhoushJson.data[0].GoodsList[n].atkBonus + WarhoushJson.data[0].GoodsList[n].defBonus + WarhoushJson.data[0].GoodsList[n].hpBonus + WarhoushJson.data[0].GoodsList[n].refHP + WarhoushJson.data[0].GoodsList[n].refAtk + WarhoushJson.data[0].GoodsList[n].refDef;
                        break;
                    }
                }
            }
        }

        switch (etype) {
            case 1:
                HeroJson.data[0].HeroList[HeroIndex].Hp = outcome; 
                break;
            case 2:
                HeroJson.data[0].HeroList[HeroIndex].Attack = outcome; 
                break;
            case 3:
                HeroJson.data[0].HeroList[HeroIndex].Defend = outcome;
                break;
        }

        var zslist = HeroJson.data[0].HeroList[HeroIndex].stars.split(",");
        var discount = 0;
        for (var n = 0; n < zslist.length; n++) {
            switch (Number(zslist[n])) {
                case 1:
                    discount += 2;
                    break;
                case 2:
                    discount += 4;
                    break;
                case 3:
                    discount += 6;
                    break;
            }
        }


        //hp结果
        var hpval = Math.round((HeroJson.data[0].HeroList[HeroIndex].Hp * discount / 100) + HeroJson.data[0].HeroList[HeroIndex].Hp + Number(templist[1]) + Number(templist[3]));
        //atk结果
        var atkval = Math.round(HeroJson.data[0].HeroList[HeroIndex].Attack * discount / 100 + HeroJson.data[0].HeroList[HeroIndex].Attack + Number(templist[0]));
        //def结果
        var defval = Math.round(HeroJson.data[0].HeroList[HeroIndex].Defend * discount / 100 + HeroJson.data[0].HeroList[HeroIndex].Defend + Number(templist[2]));

        //战法加成
        for (var aa = 0; aa < ZfJcData.data.jlist.length; aa++) {
            if (ZfJcData.data.jlist[aa].job == HeroJson.data[0].HeroList[HeroIndex].Job) {
                switch (ZfJcData.data.jlist[aa].type) {
                    case 1:
                        hpval += ZfJcData.data.jlist[aa].sum;
                        break;
                    case 2:
                        atkval += ZfJcData.data.jlist[aa].sum;
                        break;
                    case 3:
                        defval += ZfJcData.data.jlist[aa].sum;
                        break;
                }
            }
        }

        //灵器加成
        for (var bb = 0; bb < lqJcData.data.llist.length; bb++) {
            if (lqJcData.data.llist[bb].gsid == HeroJson.data[0].HeroList[HeroIndex].Id) {
                hpval += lqJcData.data.llist[bb].hp;
                atkval += lqJcData.data.llist[bb].atk;
                defval += lqJcData.data.llist[bb].def;
                break;
            }
        }

        switch (etype) {
            case 1:
                HeroJson.data[0].HeroList[HeroIndex].Hp = outcome;
                $("#hp").html("<div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + hpval + "</div>");
                $('#lvnum1').html("培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[0] + " / " + CultureJson.data[0].list[CultureIndex].TotalNum + " </font>次</div>");
                break;
            case 2:
                HeroJson.data[0].HeroList[HeroIndex].Attack = outcome;
                $("#Attack").html("<div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + atkval + "</div>");
                $('#lvnum2').html("培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[1] + " / " + CultureJson.data[0].list[CultureIndex].TotalNum + " </font>次</div>");
                break;
            case 3:
                HeroJson.data[0].HeroList[HeroIndex].Defend = outcome;
                $("#Defend").html("<div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + defval + "</div>");
                $('#lvnum3').html("培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[2] + " / " + CultureJson.data[0].list[CultureIndex].TotalNum + " </font>次</div>");
                break;
        }

        var localIndex = 0;

        for (; localIndex < GeneralsJson.length; localIndex++) {
            if (GeneralsJson[localIndex].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId) {
                break;
            }
        }

        //判断是高级培养还是普通培养
        switch (ctype) {
            case 1:
                updateGold(1, goldval);
                break;
            case 2:
                if (WarhoushJson.data[0].isResert == 1) {
                    if (itemid != "") {
                        var itemlist = itemid.split(",");
                        for (var i = 0; i < itemlist.length; i++) {
                            for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                                if (WarhoushJson.data[0].GoodsList[j].ItId == Number(itemlist[i])) {
                                    WarhoushJson.data[0].GoodsList[j].iVal = Number(itemnum.split(",")[i]);

                                    if (WarhoushJson.data[0].GoodsList[j].iVal < 1) {
                                        WarhoushJson.data[0].GoodsList.splice(j, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
        }
        SchoolClass.StarCulture(HeroIndex, localIndex, CultureIndex);
        SchoolClass.CheckTranType(HeroIndex, localIndex, etype - 1, CultureIndex);
    }
    showTextMess(info, resert);
}

//书院购买结果返回
function BuyBookResert(resert, info, locationid, goldvale, json, id) {
    if (resert == 1) {        
        for (var i = 0; i < GrandCouncilJSon.data[0].list.length; i++) {
            if (GrandCouncilJSon.data[0].list[i].Position == locationid) {
                GrandCouncilJSon.data[0].list[i].State = 1;
                break;
            }
        }
        
        GrandCouncilClass.LoadGrandCouncil();
        updateGold(1, goldvale);

        if (json != "" && WarhoushJson.data[0].isResert == 1) {
            AddItemToWar(json);
        }
    }
    showTextMess(info, resert);
}

//书院开启新位置
function OpenNewBookResert(resert, info, goldval, json) {
    if (resert == 1) {
        GrandCouncilJSon.data[0].list.push(JSON.parse(json));
        GrandCouncilClass.LoadGrandCouncil();
        updateGold(1, goldval);
    }
    showTextMess(info, resert);
}

//书院刷新返回结果
function ResBookResert(resert, info, goldtype, goldval, json) {
    isSubmit = false;
    if (resert == 1) {
        GrandCouncilJSon.data.splice(0, GrandCouncilJSon.data.length);
        GrandCouncilJSon.data.push(JSON.parse(json));
        GrandCouncilClass.LoadGrandCouncil();
        if (goldtype != 0)
            updateGold(goldtype, goldval);
    }
    showTextMess(info, resert);
}

//阵形开启返回结果
function OpenFormationResert(resert, info, goldval, fid, uplv, upsliver, UpAchievement, maxlv, jungong) {
    if (resert == 1) {
        updateGold(1, goldval);
        updateGold(4, jungong);
        for (var i = 0; i < FormationJson.data[0].list.length; i++) {
            if (FormationJson.data[0].list[i].FId == fid) {                
                FormationJson.data[0].list[i].FLv = 1;             
                FormationJson.data[0].list[i].UpLv = uplv;
                FormationJson.data[0].list[i].UpSliver = upsliver;
                FormationJson.data[0].list[i].UpAchievement = UpAchievement;
                FormationJson.data[0].list[i].maxLv = maxlv;

                //将新阵形加到布阵数据中
                if (BuZhengJson.data[0].isResert == 1) {
                    BuZhengJson.data[0].list.push(FormationJson.data[0].list[i])
                }
                $("#ForState" + fid).html("已研发");

                var localindex = 0;
                for (; localindex < FormationDicJson.length; localindex++) {
                    if (FormationDicJson[localindex].FID == fid) {
                        break;
                    }
                }
 
                GrandCouncilClass.LoadZXData(i, localindex);
                break;
            }
        }        
    }
    showTextMess(info, resert);
}


//阵形升级返回结果
function UpFormationResert(resert, info, goldval, fid, nowlv, uplv, upsliver, UpAchievement, jungong) {
    if (resert == 1) {
        updateGold(1, goldval);
        updateGold(4, jungong);
        for (var i = 0; i < FormationJson.data[0].list.length; i++) {
            if (FormationJson.data[0].list[i].FId == fid) {
                FormationJson.data[0].list[i].FLv = nowlv;
                FormationJson.data[0].list[i].UpLv = uplv;
                FormationJson.data[0].list[i].UpSliver = upsliver;
                FormationJson.data[0].list[i].UpAchievement = UpAchievement;

                //将新阵形加到布阵数据中
                if (BuZhengJson.data[0].isResert == 1) {
                    for (var j = 0; j < BuZhengJson.data[0].list.length; j++) {
                        if (BuZhengJson.data[0].list[j].FId == fid) {
                            BuZhengJson.data[0].list[j] = FormationJson.data[0].list[i];
                            break;
                        }
                    }
                }

                var localindex = 0;
                for (; localindex < FormationDicJson.length; localindex++) {
                    if (FormationDicJson[localindex].FID == fid) {
                        break;
                    }
                }

                GrandCouncilClass.LoadZXData(i, localindex);
                break;
            }
        }        
    }
    showTextMess(info, resert);
}

//更改每日任务状态:任务ID，活跃点数，完成数量
function upTaskDay(TaskID, Point, CompleteNum) {
    if (TaskDayJson.data[0].isResert == 1) {
        TaskDayJson.data[0].ActivePoint = Point;
        TaskDayJson.data[0].list[TaskID - 1000].CompleteNum = CompleteNum;
        var templist = TaskDayJson.data[0].RewardState.split(',');
        var bool = false;
        if (Point >= 20) {
            if (templist[0] == "0") {
                templist[0] = 1;
                $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                bool = true;
            }
        }
        if (Point >= 45) {
            if (templist[1] == "0") {
                templist[1] = 1;
                if (!bool) {
                    $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                    bool = true;
                }
            }
        }
        if (Point >= 70) {
            if (templist[2] == "0") {
                templist[2] = 1;
                if (!bool) {
                    $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                    bool = true;
                }
            }
        }

        if (Point == 100) {
            if (templist[3] == "0") {
                templist[3] = 1;
                if (!bool) {
                    $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                    bool = true;
                }
            }
        }

        var ss = "";
        for (var i = 0; i < templist.length; i++) {
            ss += templist[i];
            if (i != templist.length - 1)
                ss += ",";
        }
        TaskDayJson.data[0].RewardState = ss;
    }
}

//开启任务奖励结果
function OpenReBoxResert(resert, info, seliver, itemjson, tempjson, boxid, rewardjson) {
    if (resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && itemjson != "") {
            AddItemToWar(itemjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }
        //更改箱子的状态
        var templist = TaskDayJson.data[0].RewardState.split(',');
        templist[boxid - 1] = "2";
        var ss = "";
        for (var i = 0; i < templist.length; i++) {
            ss += templist[i];
            if (i != templist.length - 1)
                ss += ",";
        }
        $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'></a>");
        TaskDayJson.data[0].RewardState = ss;
        //增加钱的数量
        updateGold(1, 0 - seliver);
        if (document.getElementById("TaskDayInfoDialog") != null)
            TaskClass.TaskDay();

        ShowRewardDialog(rewardjson);
    }
    else
        showTextMess(info, resert);
}

//领取在线奖励返回结果
function RewardOnlineResert(resert, info, itemjson, tempjson, newtime, rewardjson) {
    if (resert != 0) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && itemjson != "") {
            AddItemToWar(itemjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }
        //更改下次领取奖励的时间
        UserJson.RewardOnlineTime = newtime;
        if (newtime != -1) {
            $("#RewardOnline").html("<a href='javascript:void(0);'></a><div id='OnlineTime'>" + expireTime(UserJson.RewardOnlineTime) + "</div>");                     
            OnlineReward();
        }
        else {
            $("#RewardOnline").stopTime();
            $("#RewardOnline").html("<a href='javascript:void(0);'></a><div class='PromptImage' style='width:44px;height:34px;top:5px;left:0px;background:url(res/city/Label_After.png) no-repeat;'></div>");
        }
    }
    showTextMess(info, resert);
}

//立即结束征收CD时间
function EndZhengshouTimeResert(resert, info, goldvalue) {
    if (resert == 1) {
        TaishouFuJson.data[0].LevyTime = 0;
        isZhengShouTime = false;
        TaishouFuCalss.LoadTaishouFu();
        
        updateGold(2, goldvalue);
    }
    showTextMess(info, resert);
}

//征收
function ZhengShouResert(resert, info, lavenum, sliver, cdtime, itemid) {
    if (resert == 1) {
        TaishouFuJson.data[0].TodayNumLave = lavenum;
        TaishouFuJson.data[0].LevyTime = cdtime;
        updateGold(1, 0 - sliver);
        if (itemid != 0) {
            if (TaishouFuJson.data[0].ZSLNum < 3)
                TaishouFuJson.data[0].ZSLNum++;
        }
        if (itemid != 0 && WarhoushJson.data[0].isResert == 1) {
            //更改当日使用征收令次数            
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].ItId == itemid) {
                    WarhoushJson.data[0].GoodsList[i].iVal -= 1;
                    if (WarhoushJson.data[0].GoodsList[i].iVal <= 0) {
                        WarhoushJson.data[0].GoodsList.splice(i, 1);
                    }
                    break;
                }
            }
        }
        TaishouFuCalss.LoadTaishouFu();
    }
    showTextMess(info, resert);
}

//强征
function QiangZhengResert(resert, info, lavenum, sliver, goldConsume, goldGet) {
    if (resert == 1) {
        TaishouFuJson.data[0].QiangZhengNumLave = lavenum;
        updateGold(1, 0 - sliver);
        updateGold(2, goldConsume);
        updateGold(2, 0 - goldGet);        
        TaishouFuCalss.LoadTaishouFu();
    }
    showTextMess(info, resert);
}

//刷新演武竞技玩家
function RefreshAthleticsResert(resert, info, json, gold, totalnum,refreshtime) {
    if (resert == 1) {
        updateGold(2, gold);
        if (refreshtime != 0) {
            AthleticsJson.data[0].RefreshTime = refreshtime;
            RefreshTime();
        }
        AthleticsJson.data[0].list = eval("(" + "[" + json + "]" + ")");
        var state = AthleticsJson.data[0].BoxState.split(",");
        var ss = "";
        for (var i = 0; i < state.length; i++) {
            ss += "0";
            if (i != state.length - 1)
                ss += ",";
        }
        AthleticsJson.data[0].BoxState = ss;
        AthleticsJson.data[0].RefreshNum = totalnum;
        if (document.getElementById("AthleticsBg") != null)
            AthleticsClass.LoadAthletics();
    }
    showTextMess(info, resert);
}

//使用物品结果
function UseItemResert(resert, info, itemid, seliver, jugong, ActionPs, goodsjson, tempjson, rewardjson,gemtype,gemvale,Mcoin) {
    isSubmit = false;
    //{"resert":1,"info":"","Client":[{"gid":1000}],"seliver":500,"jugong":500,"ActionPs":20,"goodsjson":[],"tempjson":[],rewardjson:[],'gemtype':2,'gemcount':100}
    if (resert == 1) {
        updateGold(1, 0 - seliver);
        updateGold(3, 0 - ActionPs);
        updateGold(4, 0 - jugong);
        updateGold(2, 0 - Mcoin);
        if (PubJsonNew.data[0].isResert == 1) {
            switch (gemtype) {
                case 1:
                    PubJsonNew.data[0].GemBlue += gemvale;
                    break;
                case 2:
                    PubJsonNew.data[0].GemPurple += gemvale;
                    break;
                case 3:
                    PubJsonNew.data[0].GemRed += gemvale;
                    break;
                case 4:
                    PubJsonNew.data[0].GemYellow += gemvale;
                    break;
            }
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }
        var index = 0, len1 = 0, islast = true;
        //改变物品数量
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].gid == 0)
                len1++;
            if (WarhoushJson.data[0].GoodsList[i].ItId == itemid) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 26)
                    MyshowDialog.MySpiritData.data.isResert = 0;
                WarhoushJson.data[0].GoodsList[i].iVal -= 1;
                if (WarhoushJson.data[0].GoodsList[i].iVal < 1) {
                    WarhoushJson.data[0].GoodsList.splice(i, 1);
                    //判断是否为最后一个物品
                    for (var x = i; x < WarhoushJson.data[0].GoodsList.length; x++) {
                        if (WarhoushJson.data[0].GoodsList[x].gid == 0) {
                            islast = false;
                            break;
                        }
                    }
                    if (islast)
                        len1 -= 1;                    
                }
                else
                    $("#itemval" + i).html(getNumSmall("X" + String(WarhoushJson.data[0].GoodsList[i].iVal), 1, 2));

                break;
            }
        } 
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && goodsjson != "") {
            AddItemToWar(goodsjson);
        }

        var len = 0;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (WarhoushJson.data[0].GoodsList[j].gid == 0) {
                len++;
                if (len == len1)
                    index = j;
            }
        }
        var pageindex = 1;
        pageindex = parseInt(len1 / 24);
        if (len1 % 24 != 0)
            pageindex += 1;

//        if (len1 > 24)
//            pageindex = 2;
//        else if (len1 > 48)
//            pageindex = 3;
//        else if (len1 > 72)
//            pageindex = 4;
//        else if (len1 > 96)
//            pageindex = 5;

        if (document.getElementById("WhBg") != null)
            WarHouseClass.ShowWHData(pageindex, index, false);

        if (rewardjson != "")
            ShowRewardDialog(rewardjson);
        else
            showTextMess(info, resert);
    }
    else
        showTextMess(info, resert);    
}


//领取演武竞技礼盒返回结果
function RewardAthleticsResert(resert, info, seliver, jugong, itemjson, tempjson, index, rewardjson) {
    if (resert != 0) {
        updateGold(1, 0 - seliver);
        updateGold(4, 0 - jugong);
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && itemjson != "") {
            AddItemToWar(itemjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }       

        var state = AthleticsJson.data[0].BoxState.split(",");
        state[index - 1] = 2;
        var ss = "";
        for (var i = 0; i < state.length; i++) {
            ss += state[i];
            if (i != state.length - 1)
                ss += ",";
        }
        AthleticsJson.data[0].BoxState = ss;
        AthleticsClass.LoadAthletics();

        ShowRewardDialog(rewardjson);
    }
    else
        showTextMess(info, resert);
}

//主线任务完成推送
function MainTaskComleteResert(taskid) {
    for (var i = 0; i < MainTaskData.length; i++) {
        if (MainTaskData[i].TaskID == taskid) {
            MainTaskData[i].TaskState = 1;
            TaskClass.LoadMainLinTask(i);
            $("#colsemain1").remove();            
            break;
        }
    }
}

//领取主线任务奖励返回结果
function RewardMainTaskResert(resert, info, seliver, jugong, shengwang, exp, itemjson, tempjson, newtaskjson, oldtaskid, rewardjson) {
    if (resert != 0) {
        if (exp == 0) {
            updateGold(1, 0 - seliver);
            updateGold(4, 0 - jugong);
            updateGold(5, 0 - exp);
        }

        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && itemjson != "") {
            AddItemToWar(itemjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }

        for (var i = 0; i < MainTaskData.length; i++) {
            if (MainTaskData[i].TaskID == oldtaskid) {
                MainTaskData.splice(i, 1);
                if (document.getElementById("Task" + String(i)) != null) {
                    DiaogColse1();
                }
                break;
            }
        }

        var tempHouseJson = [];
        var len = MainTaskData.length;
        tempHouseJson = eval("([" + newtaskjson + "])");
        for (var i = 0; i < tempHouseJson.length; i++) {
            MainTaskData.push(tempHouseJson[i]);
        }
        LoadMainTask();
    }
    showTextMess(info, resert);
}


//领取消息物品返回结果
var RewardMessageResert = function (resert, info, itemjson, tempjson, MessageID, rewardjson, SCoin, MCoin, jungong) {
    if (resert != 0) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && itemjson != "") {
            AddItemToWar(itemjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }
        if (SCoin != 0)
            updateGold(1, 0 - SCoin);
        if (MCoin != 0)
            updateGold(2, 0 - MCoin);
        if (jungong != 0)
            updateGold(4, 0 - jungong);

        ShowRewardDialog(rewardjson);
        for (var i = 0; i < MessageJson.data[0].list.length; i++) {
            if (MessageJson.data[0].list[i].MessageID == MessageID) {
                MessageJson.data[0].list[i].Receive = 1;
                //获取被点击英雄头像的座标
                if (document.getElementById("MessButn" + String(i)) != null) {
                    var top = $("#MessButn" + String(i)).position().top;
                    $("#MessageBg").html($("#MessageBg").html() + "<div class='HasBuyed' style='top:" + (top - 10) + "px;width:63px;height:48px;left:340px;background:url(res/dialog/NeLabel_Rv.png) no-repeat;'></div>");
                    $("#MessButn" + i).remove();
                }
                break;
            }
        }
        UserJson.MsgRewardNum -= 1;
        if (UserJson.MsgRewardNum > 0) {
            $("#MessageBtn").html("<div class='MessageNum' id='MessageNum'>" + UserJson.MsgRewardNum + "</div>");
        }
        else
            $("#MessageBtn").html("");
    }
    else
        showTextMess(info, resert);
}

function UpdateMsgRewardNum(num) {
    UserJson.MsgRewardNum = num;
    MessageJson.data[0].isResert = 0;
    if (UserJson.MsgRewardNum > 0) {
        $("#MessageBtn").html("<div class='MessageNum' id='MessageNum'>" + UserJson.MsgRewardNum + "</div>");
    }
}
//自动讨伐处理结果
function AutomaticCrusadeResert(resert, info, warID, wartime, heroid, actionpoint) {
    if (resert == 1) {
        //改变武将的状态
        for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
            if (HeroJson.data[0].HeroList[i].Id == heroid) {
                HeroJson.data[0].HeroList[i].State2 = 2;
                break;
            }
        }
        updateGold(3, actionpoint);

        UserBattleJson.data[0].CrusadePoint= warID;
        UserBattleJson.data[0].CrusadeHero= heroid;
        UserBattleJson.data[0].CrusadeTime = wartime;
        CrusadeTime();
        for (var i = 0; i < UserBattleJson.data[0].mapdata.length; i++) {
            for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                if (UserBattleJson.data[0].mapdata[i].list[j].id == warID) {
                    CampaignClass.LoadMap(UserBattleJson.data[0].mapdata[i].mapid);
                    break;
                }
            }
        }        
    }
    showTextMess(info, resert);
}

function UpdateHeroState2(json) {
    var BackJson = JSON.parse(json);
    //{“resert”:1,”info”:””,”Gid”:1001}
    if (BackJson.resert == 1) {
        //改变武将状态
        for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
            if (HeroJson.data[0].HeroList[i].Id == BackJson.Gid) {
                HeroJson.data[0].HeroList[i].State2 = 0;
                break;
            }
        }
        //将武将下阵
        var FomartiomList = UserJson.FormationHero.split(",");
        var ss = "";
        for (var i = 0; i < FomartiomList.length; i++) {
            if (FomartiomList[i] == String(BackJson.Gid)) {
                FomartiomList[i] = 0;
            }

            ss += FomartiomList[i];
            if (i != FomartiomList.lenght - 1)
                ss += ",";
        }       
        UserJson.FormationHero = ss;
    }
    showTextMess(BackJson.info, BackJson.resert);
}


//讨伐结束
function CampaignOver(resert, info, goodsjson, tempjson) {
    if (resert != 0) {        
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && goodsjson != "") {
            AddItemToWar(goodsjson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && tempjson != "") {
            AddItemToTwar(tempjson);
        }
    }
}

//更改征战点的数据
function SetBattleData(json) {
    /*{"list":[{"CardVal":5,"ComVal":5,"id":1004,"ispass":true,"type":1},{"CardVal":3,"ComVal":1,"id":1005,"ispass":false,"type":1}],"mapid":1,"newMapId":2,"FubenID":8000,"TotalNOT":10}*/
    var BackJson = JSON.parse(json);
    var bool = false;    
    for (var i = 0; i < UserBattleJson.data[0].mapdata.length; i++) {
        if (UserBattleJson.data[0].mapdata[i].mapid == BackJson.mapid) {            
            for (var k = 0; k < BackJson.list.length; k++) {
                bool = false;
                for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                    if (BackJson.list[k].id == UserBattleJson.data[0].mapdata[i].list[j].id) {
                        UserBattleJson.data[0].mapdata[i].list[j] = BackJson.list[k];
                        bool = true;
                        break;
                    }
                }
                if (bool == false && BackJson.newMapId == BackJson.mapid)
                    UserBattleJson.data[0].mapdata[i].list.push(BackJson.list[k]);
            }           
            if (BackJson.FubenID != 0) {
                var ss = '{"id": ' + BackJson.FubenID + ', "type": 2, "CardVal": 5, "ComVal": 5, "ispass": false}';                
                UserBattleJson.data[0].mapdata[i].list.push(eval("(" + ss + ")"));
                FunBenJson.data.TotalNOT = BackJson.TotalNOT;
                FunBenJson.data.FuBenList.push(BackJson.FubenOpened);
                for (var i = 0; i < BattleJson.length; i++) {
                    if (BattleJson[i].mapid == BackJson.mapid) {
                        for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                            if (UserBattleJson.data[0].mapdata[i].list[j].id == BackJson.FubenID) {
                                var ss = "<div class='Buliding' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.LoadFuBen(" + i + "," + j + ");'  id='Cbu" + BattleJson[i].list[j].id + "' style='top:" + BattleJson[i].list[j].top + "px;left:" + BattleJson[i].list[j].left + "px;'>";
                                ss += "<a href='javascript:void(0);'><img id='img" + BattleJson[i].list[j].id + "' src='res/BattleMap/" + BattleJson[i].list[j].iconid + ".png' /></a></div>";
                                var node = document.createElement("div");
                                node.innerHTML = ss;
                                document.getElementById("mapdiv" + i).appendChild(node);
                                break;
                            }
                        }
                        break;
                    } 
                }                                
            }            
            break;
        }
    }

    if (BackJson.newMapId != BackJson.mapid) {         
        if (BackJson.list.length > 1) { 
            var temp = '{"mapid":' + BackJson.newMapId + ',"list":[' + JSON.stringify(BackJson.list[1]) + ']}';           
            UserBattleJson.data[0].mapdata.push(eval("(" + temp + ")"));
        }        
        UserJson.mapid = BackJson.newMapId;
    }

    if (document.getElementById("album3") != null) {
        if (BackJson.newMapId != BackJson.mapid) {
            for (var i = 0; i < BattleJson.length; i++) {
                if (BattleJson[i].mapid == BackJson.newMapId) {
                    var str = new Array();
                    for (var m = 0; m < ShenShouJson.data.list.length; m++) {
                        if (ShenShouJson.data.list[m].mapid == BattleJson[i].mapid) {
                            if (ShenShouJson.data.list[m].status == 0) {
                                if (parseInt(10 * Math.random()) % 2 == 0) {
                                    str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(147 * Math.random()) + "px;left:" + parseInt(316 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/1.gif' />");
                                } else {
                                    str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(99 * Math.random()) + "px;left:" + parseInt(318 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/2.gif' />");
                                }
                            }
                            if (ShenShouJson.data.list[m].status == 3)
                                str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(177 * Math.random()) + "px;left:" + parseInt(330 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/3.gif' />");
                        }

                    }
                    if (i < UserBattleJson.data[0].mapdata.length) {
                        for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                            str.push("<div class='Buliding'");
                            if (BattleJson[i].list[j].type == 1)
                                str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.showCompaignPoint(" + BattleJson[i].list[j].id + "," + i + "," + j + "," + i + "," + j + ");'");
                            else
                                str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.LoadFuBen(" + i + "," + j + ");'");
                            str.push(" id='Cbu" + BattleJson[i].list[j].id + "' style='top:" + BattleJson[i].list[j].top + "px;left:" + BattleJson[i].list[j].left + "px;'>");
                            if (UserBattleJson.data[0].mapdata[i].list[j].id == UserBattleJson.data[0].CrusadePoint) {
                                str.push("<div class='CrusadeState' id='CrusadeState' style='");
                                if (UserBattleJson.data[0].CrusadeTime < 1)
                                    str.push("background-position:0 -45px;");
                                if (BattleJson[i].list[j].iconid == 2)
                                    str.push("left:-10px;");

                                str.push("'></div>");
                            }
                            str.push("<a href='javascript:void(0);'><img id='img" + BattleJson[i].list[j].id + "' src='res/BattleMap/" + BattleJson[i].list[j].iconid + ".png' /></a>");
                            str.push("</div>");
                        }
                    } 
                    $("#mapdiv" + i).html(str.join(""));
                    break;
                }
            }
            $("#CampaignDialog").remove();
            $("#mask2").remove();
            //显示下一张地图
            var ips = $('#album3').data('iphoneslide');
            ips.slide2page('next');
        }
        else if (BackJson.list.length > 1) {
            $("#CampaignDialog").remove();
            $("#mask2").remove();
            for (var i = 0; i < BattleJson.length; i++) {
                if (BattleJson[i].mapid == BackJson.mapid) {
                    var str = new Array();
                    for (var m = 0; m < ShenShouJson.data.list.length; m++) {
                        if (ShenShouJson.data.list[m].mapid == BattleJson[i].mapid) {
                            if (ShenShouJson.data.list[m].status == 0) {
                                if (parseInt(10 * Math.random()) % 2 == 0) {
                                    str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(147 * Math.random()) + "px;left:" + parseInt(316 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/1.gif' />");
                                } else {
                                    str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(99 * Math.random()) + "px;left:" + parseInt(318 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/2.gif' />");
                                }
                            }
                            if (ShenShouJson.data.list[m].status == 3)
                                str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(177 * Math.random()) + "px;left:" + parseInt(330 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/3.gif' />");
                        }

                    }
                    if (i < UserBattleJson.data[0].mapdata.length) {
                        for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                            str.push("<div class='Buliding'");
                            if (BattleJson[i].list[j].type == 1)
                                str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.showCompaignPoint(" + BattleJson[i].list[j].id + "," + i + "," + j + "," + i + "," + j + ");'");
                            else
                                str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.LoadFuBen(" + i + "," + j + ");'");
                            str.push(" id='Cbu" + BattleJson[i].list[j].id + "' style='top:" + BattleJson[i].list[j].top + "px;left:" + BattleJson[i].list[j].left + "px;'>");
                            if (UserBattleJson.data[0].mapdata[i].list[j].id == UserBattleJson.data[0].CrusadePoint) {
                                str.push("<div class='CrusadeState' id='CrusadeState' style='");
                                if (UserBattleJson.data[0].CrusadeTime < 1)
                                    str.push("background-position:0 -45px;");
                                if (BattleJson[i].list[j].iconid == 2)
                                    str.push("left:-10px;");

                                str.push("'></div>");
                            }
                            str.push("<a href='javascript:void(0);'><img id='img" + BattleJson[i].list[j].id + "' src='res/BattleMap/" + BattleJson[i].list[j].iconid + ".png' /></a>");
                            str.push("</div>");
                        }
                    }                    
                    $("#mapdiv" + i).html(str.join(""));
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < UserBattleJson.data[0].mapdata.length; i++) {
                if (UserBattleJson.data[0].mapdata[i].mapid == BackJson.mapid) {
                    for (var j = 0; j < BattleJson[i].list.length; j++) {
                        if (BattleJson[i].list[j].id == BackJson.list[0].id) {                            
                            CampaignClass.showCompaignPoint(BattleJson[i].list[j].id, i, j, i, j);
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
}

//副本征战结果
function FuBenFightingBack(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.data.resert == 1) {
        for (var i = 0; i < FunBenJson.data.FuBenList.length; i++) {
            if (FunBenJson.data.FuBenList[i].FubenID == BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id) {
                FunBenJson.data.FuBenList[i].InPoint = BackJson.data.point;
                //判断是否为最后一个点
                if (FunBenJson.data.FuBenList[i].InPoint == 6) {                

                    //重置副本数据
                    FunBenJson.data.InFubenID = 0;
                    FunBenJson.data.FuBenList[i].InPoint = 0;
                    FunBenJson.data.FuBenList[i].LineID = 0;

                    CampaignClass.LoadFuBen(BackJson.data.mapindex, BackJson.data.commindex);                   
                    //弹出抽奖窗口
                    CampaignClass.FuBenLottery();                    
                }
                else {
                    if (FunBenJson.data.FuBenList[i].InPoint <= 1) {
                        FunBenJson.data.InFubenID = BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id;
                        FunBenJson.data.FuBenList[i].InPoint = 2;
                        //当日征战次数加1，此副本关卡征战次数加1
                        FunBenJson.data.TodayNOT += 1;
                        if (BackJson.data.SID == 0)
                            FunBenJson.data.FuBenList[i].TodayNot -= 1;
                        else {
                            FunBenJson.data.FuBenList[i].TigerSignNum -= 1;
                            //减去包裹中虎符数量
                            if (WarhoushJson.data[0].isResert == 1) {
                                for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                                    if (WarhoushJson.data[0].GoodsList[j].ItId == BackJson.data.SID) {
                                        if (WarhoushJson.data[0].GoodsList[j].iVal == 1)
                                            WarhoushJson.data[0].GoodsList.splice(j, 1);
                                        else
                                            WarhoushJson.data[0].GoodsList[j].iVal -= 1;

                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else
                        FunBenJson.data.FuBenList[i].InPoint += 2;

                    if (FunBenJson.data.FuBenList[i].InPoint > 6)
                        FunBenJson.data.FuBenList[i].InPoint = 6;

                    if (CampaignClass.funbenindex == 2)
                        FunBenJson.data.FuBenList[i].LineID = 1;
                    if (CampaignClass.funbenindex == 3)
                        FunBenJson.data.FuBenList[i].LineID = 2;

                    CampaignClass.LoadFuBen(BackJson.data.mapindex, BackJson.data.commindex);
                }                
                return;
            }
        }
    }
    else {
        if (FunBenJson.data.ReAlive > 0) {
            ShowMessage("是否花费1个行动点原地复活？<br />剩余" + FunBenJson.data.ReAlive + "次", function () {
                $("#other").html("");
                $("#mask1").remove();                
                if (UserJson.ActionPs < 1) {
                    window.GameMainClass.sendRequestJson(1103, '{"fubenID":' + BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id + ',"isRealive":0}', "");
                    showTextMess("行动点不足", 0);
                    var i = 0;
                    for (; i < FunBenJson.data.FuBenList.length; i++) {
                        if (FunBenJson.data.FuBenList[i].FubenID == BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id) {
                            if (FunBenJson.data.FuBenList[i].InPoint <= 1) {
                                FunBenJson.data.TodayNOT += 1;
                                if (BackJson.data.SID == 0)
                                    FunBenJson.data.FuBenList[i].TodayNot -= 1;
                                else {
                                    FunBenJson.data.FuBenList[i].TigerSignNum -= 1;
                                    //减去包裹中虎符数量
                                    if (WarhoushJson.data[0].isResert == 1) {
                                        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                                            if (WarhoushJson.data[0].GoodsList[j].ItId == BackJson.data.SID) {
                                                if (WarhoushJson.data[0].GoodsList[j].iVal == 1)
                                                    WarhoushJson.data[0].GoodsList.splice(j, 1);
                                                else
                                                    WarhoushJson.data[0].GoodsList[j].iVal -= 1;

                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                    //重置副本数据
                    FunBenJson.data.InFubenID = 0;
                    FunBenJson.data.FuBenList[i].InPoint = 0;
                    FunBenJson.data.FuBenList[i].LineID = 0;
                    CampaignClass.LoadFuBen(BackJson.data.mapindex, BackJson.data.commindex);
                    return;
                }
                else//调用方法                
                    window.GameMainClass.sendRequestJson(1103, '{"fubenID":' + BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id + ',"isRealive":1,"InPoint":' + BackJson.data.point + '}', "revivalBack");
            }, function () {
                $("#other").html("");
                $("#mask1").remove();
                for (var i = 0; i < FunBenJson.data.FuBenList.length; i++) {
                    if (FunBenJson.data.FuBenList[i].FubenID == BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id) {
                        if (FunBenJson.data.FuBenList[i].InPoint <= 1) {
                            FunBenJson.data.InFubenID = BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id;
                            FunBenJson.data.FuBenList[i].InPoint = 0;
                            //当日征战次数加1，此副本关卡征战次数加1
                            FunBenJson.data.TodayNOT += 1;
                            if (BackJson.data.SID == 0)
                                FunBenJson.data.FuBenList[i].TodayNot -= 1;
                            else {
                                FunBenJson.data.FuBenList[i].TigerSignNum -= 1;
                                //减去包裹中虎符数量
                                if (WarhoushJson.data[0].isResert == 1) {
                                    for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                                        if (WarhoushJson.data[0].GoodsList[j].ItId == BackJson.data.SID) {
                                            if (WarhoushJson.data[0].GoodsList[j].iVal == 1)
                                                WarhoushJson.data[0].GoodsList.splice(j, 1);
                                            else
                                                WarhoushJson.data[0].GoodsList[j].iVal -= 1;

                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        //重置副本数据
                        FunBenJson.data.InFubenID = 0;
                        FunBenJson.data.FuBenList[i].InPoint = 0;
                        FunBenJson.data.FuBenList[i].LineID = 0;

                        CampaignClass.LoadFuBen(BackJson.data.mapindex, BackJson.data.commindex);
                        window.GameMainClass.sendRequestJson(1103, '{"fubenID":' + BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id + ',"isRealive":0}', "");
                    }
                }
            }, null, "displayClose"); 
        }
        else {
            for (var i = 0; i < FunBenJson.data.FuBenList.length; i++) {
                if (FunBenJson.data.FuBenList[i].FubenID == BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id) {
                    if (FunBenJson.data.FuBenList[i].InPoint <= 1) {                       
                        FunBenJson.data.TodayNOT += 1;
                        if (BackJson.data.SID == 0)
                            FunBenJson.data.FuBenList[i].TodayNot -= 1;
                        else {
                            FunBenJson.data.FuBenList[i].TigerSignNum -= 1;
                            //减去包裹中虎符数量
                            if (WarhoushJson.data[0].isResert == 1) {
                                for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                                    if (WarhoushJson.data[0].GoodsList[j].ItId == BackJson.data.SID) {
                                        if (WarhoushJson.data[0].GoodsList[j].iVal == 1)
                                            WarhoushJson.data[0].GoodsList.splice(j, 1);
                                        else
                                            WarhoushJson.data[0].GoodsList[j].iVal -= 1;

                                        break;
                                    }
                                }
                            }
                        }
                    }

                    //重置副本数据
                    FunBenJson.data.InFubenID = 0;
                    FunBenJson.data.FuBenList[i].InPoint = 0;
                    FunBenJson.data.FuBenList[i].LineID = 0;

                    window.GameMainClass.sendRequestJson(1103, '{"fubenID":' + BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id + ',"isRealive":0}', "");
                    CampaignClass.LoadFuBen(BackJson.data.mapindex, BackJson.data.commindex);
                }
            } 
        }
    }
}

//复活结果返回
function revivalBack(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //减少行动点        
        updateGold(3, 1);
        //改变复活次数
        FunBenJson.data.ReAlive -= 1;
        showTextMess("复活成功", 1);
    }
    else
        showTextMess(BackJson.info, 0);
}

//副本抽奖结果
function FuBenLotteryBack(json) {
    isSubmit = false;
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        CampaignClass.LotteryNum++;
        if (CampaignClass.LotteryNum == FunBenJson.data.freenum)
            $("#closeLoBg").css({ "background": "url(res/FuBen/CopyOK1.png) no-repeat" });
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }

        $("#lb" + BackJson.Client[0].pos).attr("class", "LotteryBox3");
        $("#lb" + BackJson.Client[0].pos).attr("ontouchend", "");
        if (CampaignClass.LotteryNum > FunBenJson.data.freenum) {
            updateGold(2, (CampaignClass.LotteryNum - FunBenJson.data.freenum) * 10);
        }

        if (CampaignClass.LotteryNum == (FunBenJson.data.freenum + 2)) {
            $(".LotteryBox1").attr("class", "LotteryBox2"); +
            $(".LotteryBox1").attr("ontouchend", "");
        }
        var str = new Array();
        for (var j = 0; j < GoodsJson.length; j++) {
            if (GoodsJson[j].ItemId == BackJson.itemID) {
                str.push("<div class='SkillBook' style='background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;top:7px;left:10px;'>");
                str.push(getNumSmall("X" + String(BackJson.itemNum), 1, 2));
                str.push("</div>");
                break;
            }
        }
        $("#lb" + BackJson.Client[0].pos).html(str.join(""));
    }
    showTextMess(BackJson.info, BackJson.resert);
}

function JieGuData(json) {
    //{ "gID": 244, "useCount": 1, "GoodsList": "6652,6651,6650", "useVal": "1,1,6", "noUseVal": "0,6,6", "UseSVal": 6480, "noUseSVal": 3240, "isResert": 1 }
    var BackJson = JSON.parse(json);
    DeleHeroJson.data.HeroList.push(BackJson);
    MyshowDialog.ShowJGData(DeleHeroJson.data.HeroList.length - 1);
}

//连续登录奖励
function LoginReward() {
    var str = new Array();
    DiaogColse();
    var divnode = document.createElement("div");
    divnode.id = 'mask';
    divnode.className = 'mask opacity';
    document.getElementById("main").appendChild(divnode);

    divnode = document.createElement("div");
    divnode.className = 'dialogMain';
    divnode.id = "dialogMain";
    document.getElementById("main").appendChild(divnode);
    
    $("#dialogMain").css({ "left": (Systemdata.width - 410) / 2 + "px", "top": "3px", "width": 410, "height": 314, "background": "url(res/city/Landing_Material.png) no-repeat" });
    //$("#dialogMain").html("<div class='close' id='colsemain' style='left:280px;'></div>");    
    var top = 86, left = 70;
    for (var i = 0; i < 3; i++) {
        if (i < LoginJson.lDays) {
            str.push("<div class='LoginReLight LightOn' style='top:" + top + "px;left:" + left + "px;'></div>");
        }
        else {
            str.push("<div class='LoginReLight' style='top:" + top + "px;left:" + left + "px;'></div>");
        }

        top += 68;
    }

    top = 80; left = 126;

    for (var i = 0; i < 9; i++) {
        str.push("<div class='L_R_I_Bg0' id='lritem" + i + "' style='top:" + top + "px;left:" + left + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) LoginLottery(" + i + ");'></div>");

        left += 88;
        if ((i + 1) % 3 == 0) {
            top += 74;
            left = 126;
        }
    }

    str.push("<div class='ButtonSmall' id='clolseLoginReDg' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CloseLoginBg();' style='width:47px;height:47px;left:356px;top:20px;background:url(res/city/Landing_Material.png) -317px -318px no-repeat;'></div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    if (LoginJson.LotteryHisPos != "") {
        var itemlist = LoginJson.LotteryHisPos.split(",");
        for (var i = 0; i < itemlist.length; i++) {
            $("#lritem" + itemlist[i]).attr("class", "L_R_I_Bg1");  
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == Number(LoginJson.LotterItem.split(",")[i])) {
                    $("#lritem" + itemlist[i]).html("<div class='Skill' id='' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowGoodsData(" + itemlist[i] + "," + m + ");' style='top:14px;left:14px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>" + getNumSmall("X" + String(LoginJson.LotterItemNum.split(",")[i]), 1, 2) + "</div>");
                    break;
                }
            }

        }
    } 
}

//连续登录抽奖
function LoginLottery(index) {
    if (LoginJson.RemainingNum < 1) {
        $("#clolseLoginReDg").css({ "background": "url(res/city/Landing_Material.png) -270px -318px no-repeat;" });
        return;
    }
    if (LoginJson.LotteryHisPos != "") {
        var poslist = LoginJson.LotteryHisPos.split(",");
        for (var i = 0; i < poslist.length; i++) {
            if (poslist[i] == index)
                return;
        }
    }
    if (isSubmit)
        return;
    isSubmit = true; 
    //提交抽奖
    window.GameMainClass.sendRequestJson(1113, '{"pos":' + index + '}', "LoginLotteryResert");
}

//登录抽奖结果
function LoginLotteryResert(json) {
    isSubmit = false; 
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        $("#lritem" + BackJson.Client[0].pos).attr("class", "L_R_I_Bg1");
        for (var m = 0; m < GoodsJson.length; m++) {
            if (GoodsJson[m].ItemId == Number(BackJson.itemid)) {
                $("#lritem" + BackJson.Client[0].pos).html("<div class='Skill' id='' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowGoodsData(" + BackJson.Client[0].pos + "," + m + ")' style='top:14px;left:14px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>" + getNumSmall("X" + BackJson.itemnum, 1, 2) + "</div>");
                break;
            }
        }

        //更改登录json
        if (LoginJson.LotteryHisPos != "") {
            LoginJson.LotteryHisPos += ",";
            LoginJson.LotterItem += ","; 
            LoginJson.LotterItemNum += ",";
        }

        LoginJson.LotteryHisPos += String(BackJson.Client[0].pos);
        LoginJson.LotterItem += String(BackJson.itemid);
        LoginJson.LotterItemNum += String(BackJson.itemnum);

        LoginJson.RemainingNum -= 1;
        if (LoginJson.RemainingNum < 1) {
            $("#clolseLoginReDg").css({ "background": "url(res/city/Landing_Material.png) -270px -318px no-repeat" });
            var len = 0;
            for (var i = 0; i < 9; i++) {
                if ($("#lritem" + i).attr("class") == "L_R_I_Bg0") {
                    $("#lritem" + i).attr("class", "L_R_I_Bg2");
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == BackJson.other[len].itemid) {
                            $("#lritem" + i).html("<div class='Skill' id='' style='top:14px;left:14px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>" + getNumSmall("X" + BackJson.other[len].itemnum, 1, 2) + "</div><div  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShowGoodsData(" + i + "," + m + ")' class='L_R_I_Bg3'></div>");
                            break;
                        }
                    }
                    len++;
                }
            }            
        }
    }
    showTextMess(BackJson.info, BackJson.resert);

}
//关闭登录抽奖界面
function CloseLoginBg() {
    if (LoginJson.RemainingNum > 0)
        return;
    DiaogColse();
    ShowBulletin();
}

//使用经验书的返回结果
function UseJyBookCallBack(json) {    
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].ItId == BackJson.itemid) {
                WarhoushJson.data[0].GoodsList[i].iVal -= 1;
                if (WarhoushJson.data[0].GoodsList[i].iVal <= 0)
                    WarhoushJson.data[0].GoodsList.splice(i, 1);

                break;
            }
        }

        if (document.getElementById("dialogMain") != null)
            SchoolClass.UseBook();
    }
    showTextMess(BackJson.info, BackJson.resert);
}

function ShowGoodsData(pos,GoodsIndex) {
    $("#showData").remove();
    if (showgoodstime1 != null) {
        clearTimeout(showgoodstime1);
        clearTimeout(showgoodstime2);
    }
    var top = $("#lritem" + pos).offset().top;
    var left = $("#lritem" + pos).offset().left;
    var str = new Array();
   
    var h = GoodsJson[GoodsIndex].detail.length / 9 + (GoodsJson[GoodsIndex].detail.length % 9 == 0 ? 0 : 1);

    h = (h + 5) * 17;
    var namecolor = "#ffffff";
    switch (GoodsJson[GoodsIndex].NColor) {
        case 1:
            namecolor = "#00CCFF"
            break;
        case 2:
            namecolor = "#FF00FF";
            break;
        case 3:
            namecolor = "#FF0000";
            break;
        case 4:
            namecolor = "#FFFF00";
            break;
    }

    var type = "", job = "", val = 0, type2 = "";
    
    switch (GoodsJson[GoodsIndex].Njob) {
        case 1:
            job = '战士';
            break;
        case 2:
            job = '射手';
            break;
        case 3:
            job = '谋士';
            break;
        default:
            job = '';
            break;
    }

    switch (GoodsJson[GoodsIndex].iType) {
        case 2:
            type = '头盔';
            type2 = "防御";
            val = GoodsJson[GoodsIndex].hpBonus;
            job = '全职业';
            break;
        case 3:
            type = '盔甲';
            type2 = "防御";
            val = GoodsJson[GoodsIndex].defBonus;
            job = '全职业';
            break;
        case 1:
            type = '武器';
            type2 = "攻击";
            val = GoodsJson[GoodsIndex].atkBonus;
            break;
        case 4:
            type = '宝物';
            type2 = "生命";
            val = 0; //WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
            job = '全职业';
            break;
        case 5:
            type = '技能书';
            break;
        case 6:
            type = '材料';
            break;
        case 7:
            type = '兑换品';
            break;
        case 8:
            type = '武魂';
            break;
        case 9:
            type = '碎片';
            break;
        case 10:
            type = '经验书';
            break;
        case 11:
            type = '美酒';
            break;
        case 20:
            type = '钱袋';
            break;
        case 21:
            type = '军功薄';
            break;
        case 22:
            type = '行动包';
            break;
        case 23:
            type = '礼包';
            break;
        case 24:
            type = '武将包';
            break;
        case 25:
            type = "武魂包";
            break;
        case 26:
            type = "宝物箱";
            break;
        case 27:
            type = "宝石箱";
            break;
        case 28:
            type = "福袋";
            break;
        case 29:
            type = "装备箱";
            break;
    }

    if (pos % 3 == 0)
        left += 30;
    else
        left -= 170;

    top -= 30;
    if (pos > 5)
        top = 10;

    str.push("<div id='showData' style='" + (pos <= 5 ? "top" : "bottom") + ":" + top + "px;left:" + left + "px;z-index:35;'>");
    str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#showData\").remove();clearTimeout(showgoodstime1);clearTimeout(showgoodstime2);}'></a></div>");
    str.push("<div id='showDataUp'></div>");
    str.push("<div id='showDataCenter' >");
    str.push("<table width='93%'>");
    str.push("<tr><td style='color:" + namecolor + ";'>" + GoodsJson[GoodsIndex].IName + "</td></tr>");
    str.push("<tr><td>类型：<font style='color:#E4BA5D'>" + type + "</font></td></tr>");
    if (GoodsJson[GoodsIndex].NLv > 0)
        str.push("<tr><td>等级：<font style='color:#E4BA5D'>武将" + GoodsJson[GoodsIndex].NLv + "级</font></td></tr>");
    if (type2 != 0)
        str.push("<tr><td>" + type2 + ":<font style='color:#E4BA5D'>" + val + "</font></td></tr>");

    str.push("<tr><td>描述：</td></tr>");
    str.push("<tr><td style='color:#E4BA5D'>" + GoodsJson[GoodsIndex].detail + "</td></tr></table>");
    str.push("</div>");
    str.push("<div id='showDataDown' ></div>");
    str.push("</div>");

    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    var satime = 1;
    showgoodstime1 = setInterval(function () {
        satime++;
        if (satime == 25) {
            clearTimeout(showgoodstime1);
            var i = 100;
            showgoodstime2 = setInterval(function () {
                i--;
                document.getElementById("showData").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData").style.opacity = i / 100; //for FF

                if (i == 0) {
                    clearTimeout(showgoodstime2);
                    $("#showData").remove();
                }

            }, 20);

        }
    }, 100);
}

//首充完成
function Frist_Recharge_Complete(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {        
        UserJson.FristRecharge = 1;
        EnterBuliding(8800);
    }
}

//首充招募结果
function F_R_RecruitResert(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        UserJson.FristRecharge = 2;
        $("#ShouChongIcon").remove();
        updateGold(1, 0 - BackJson.coin);
        DiaogColse();
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//开启新武将位结果
function OpenNewHeroPosResert(json) {   
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        UserJson.New_HeroPos_M = BackJson.MCoin;
        UserJson.HeroPos += 1;
        EnterBuliding(2000);
        var pageindex = parseInt(UserJson.HeroPos / 8) + (UserJson.HeroPos % 8 == 0 ? 0 : 1);
        MyshowDialog.HeroChangePage(pageindex);
        updateGold(2, BackJson.price);
        
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//首杀完成推送
function FirstKillResert() {
    FirstKillJson.data.isResert = 0;
    if (document.getElementById("KillFirstDialog") != null) {
        return EnterBuliding(7500);
    }
}

//首杀奖励领取
function FirstKillReward(json) {
    //{"SCoin":10000,"MCoin":0,"resert":1,"info":"","FuBenID":8000}
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        if (BackJson.SCoin != 0)
            updateGold(1, 0 - BackJson.SCoin);

        if (BackJson.MCoin != 0)
            updateGold(2, 0 - BackJson.MCoin);

        //更改领取状态
        for (var i = 0; i < FirstKillJson.data.BossList.length; i++) {
            if (BackJson.Client[0].FuBenID == FirstKillJson.data.BossList[i].FubenID) {
                FirstKillJson.data.BossList[i].isComplete = true;
                FirstKillJson.data.BossList[i].isReceive = true;                
                $("#rewardbtn" + i).remove();
                break;
            }
        }        
    }

    showTextMess(BackJson.info, BackJson.resert);
}

//领取分享奖励
function ShareRewardResert(json) {    
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }

        updateGold(1, 0 - BackJson.SCoin);
        for (var i = 0; i < ShareJson.data.datalist.length; i++) {            
            if (ShareJson.data.datalist[i].nop == BackJson.Client[0].objNum) {                
                ShareJson.data.datalist[i].isReceive = true;
                $("#ShareRwbtn" + i).remove();
                var ss = "<div class='ButtonOther' style='width:66px;height:42px;background:url(res/city/Share_Label.png) no-repeat;top:8px;left:120px;'></div>";
                var divnode = document.createElement("div");
                divnode.innerHTML = ss;
                document.getElementById("ShareBox" + i).appendChild(divnode);                
                break;
            }
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

function C_R_RewardResert(json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }

        if (BackJson.SCoin != 0)
            updateGold(1, 0 - BackJson.SCoin);
        if (BackJson.M != 0)
            updateGold(2, 0 - BackJson.M);
        if (BackJson.jungong != 0)
            updateGold(4, 0 - BackJson.jungong); 

        for (var i = 0; i < CumulationRechargeJson.data.datalist.length; i++) {
            if (CumulationRechargeJson.data.datalist[i].nop == BackJson.Client[0].objNum) {
                CumulationRechargeJson.data.datalist[i].isReceive = true;
                KaiFuClass.ShowC_R_Reward(i);
                $("#ShareRwbtn" + i).remove();
                var ss = "<div class='ButtonOther' style='width:66px;height:42px;background:url(res/city/Share_Label.png) no-repeat;top:267px;left:240px;'></div>";
                var divnode = document.createElement("div");
                divnode.innerHTML = ss;
                document.getElementById("rewardBox").appendChild(divnode);
                break;
            }
        }
        ShowRewardDialog(JSON.stringify(BackJson.rewardjson));
    }
    else
        showTextMess(BackJson.info, BackJson.resert);
}

function OpenWarhouseResert(json) {
    var BackJson = JSON.parse(json);    
    if (BackJson.resert == 1) {
        updateGold(2, BackJson.MCoin);
        UserJson.NumOpenedStorage += 1;
        var goodslen = 0;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (WarhoushJson.data[0].GoodsList[j].gid == 0)
                goodslen++;
        }
        $("#itemcount").html(goodslen + " / " + 24 * UserJson.NumOpenedStorage);
        if (document.getElementById("WhBg") != null) {            
            $("#warhouseLockPage").remove();
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//更改分享人数
function updateSharePN(num) {
    if (ShareJson.data.isResert == 1) {
        ShareJson.data.NumOfPelple = num;
        $("#shareple").html(num + "人");
    }
}

//0点更新数据
function AutoUpdateData() {
    DiaogColse();
    PubJson.data[0].isResert = 0;
    GrandCouncilJSon.data[0].isResert = 0;
    WarhoushJson.data[0].isResert = 0;
    TemporaryJson.data[0].isResert = 0;
    RankJson.data.isResert = 0;
    VipJson.data.giftstatus = 0;
    window.GameMainClass.sendRequestJson(1153, "", "ActivityOnline");
    showTextMess("数据已更新，请重新查看", 1);
}

//世界boss活动点亮
var litActivity = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        BossOfWoldJson.data.isLit = true;
        BossOfWoldJson.data.CompleteState = "0,0,0";
        BossOfWoldJson.data.HpDiscount = 100;
        BossOfWoldJson.data.SelfDis = 0;
        BossOfWoldJson.data.SelfZK = "0";
        BossOfWoldJson.data.RankList = [];
        BossOfWoldJson.data.lastkillnick = "";
        BossOfWoldJson.data.leftkilltime = 1800;
        if (document.getElementById("BossOfWorldDia") != null) {
            ActivityClass.LoadBossOfWorld();
        }
    }
    var backjson = JSON.parse(json);
    showTextMess(backjson.info, 1);
};

//世界boss活动结束
var endActivity = function (json) {
    $("body").stopTime("coolingtime");
    coolingtime = 0;
    iscooling = false;
    if (BossOfWoldJson.data.isResert == 1) {
        BossOfWoldJson.data.isResert = 0;        
        if (document.getElementById("BossOfWorldDia") != null) {
            EnterBuliding(4100);
        }
    }
    window.GameMainClass.sendRequestJson(1154, "", "ActivityTime");
    var backjson = JSON.parse(json);
    showTextMess(backjson.info, 1);
};

//世界boss数据更新
var SetBossOfWorldData = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        BossOfWoldJson.data = JSON.parse(json);
        if (document.getElementById("BossOfWorldDia") != null) {
            ActivityClass.LoadBossOfWorld();
        }
    }
};

//世界boss数据更新
var SetBossOfWorldDataAll = function (json) {
    if (BossOfWoldJson.data.isResert == 1) {
        var BackJson = JSON.parse(json);
        BossOfWoldJson.data.HpDiscount = BackJson.HpDiscount;
        BossOfWoldJson.data.RankList = BackJson.RankList;
        if (document.getElementById("BossOfWorldDia") != null) {            
            var str = new Array();
            var top = 63;
            for (var i = 0; i < BossOfWoldJson.data.RankList.length; i++) {
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:20px;font-size:12px;'>" + (i + 1) + "." + BossOfWoldJson.data.RankList[i].name + "</div>");
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:102px;font-size:12px;'>" + BossOfWoldJson.data.RankList[i].discount + "%</div>");
                top += 19;
            }

            $("#RankList").html(str.join(""));
            $("#Experience").css({ "width": (BossOfWoldJson.data.HpDiscount / 100 * 137) + "px" });
            $("#HpNum").html(BossOfWoldJson.data.HpDiscount + "%");
        }
    }
};

//世界boss战斗回调
var BossOfWorldResert = function () {
    if (BossOfWoldJson.data.isLit == true) {
        coolingtime = 30;
        CoolingtimeOfBoss();
    }
    $("#KillButton").css({ "background": "url(res/activity/BossWarBut2.png) no-repeat" });
    $("#KillButton").attr("ontouchend", "");
};

//世界boss领奖
var BossOfWordRewardResert = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        $("#BosswordReBut" + (BackJson.Client[0].rewardtype - 1)).css({ "background": "url(res/city/Share_Label.png)", "width": 66, "height": 42, "left": 365 });
        $("#BosswordReBut" + (BackJson.Client[0].rewardtype - 1)).attr("ontouchend", "");

        if (BackJson.SCoin != 0)
            updateGold(1, 0 - BackJson.SCoin);

        if (BackJson.MCoin != 0)
            updateGold(2, 0 - BackJson.MCoin);

        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }

        var state = BossOfWoldJson.data.CompleteState.split(",");
        var ss = "";
        for (var i = 0; i < state.length; i++) {
            if (i == BackJson.Client[0].rewardtype - 1)
                state[i] = "2";

            ss += state[i];
            if (i != state.length - 1)
                ss += ",";
        }

        BossOfWoldJson.data.CompleteState = ss;
    }
    showTextMess(BackJson.info, BackJson.resert);
};

var TradingResert = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        updateGold(1, BackJson.coin);
        if (TradingJson.data.NowIndex != BackJson.nowindex) {
            $("#TradingLit" + (TradingJson.data.NowIndex - 1)).css("display", "none");
            $("#TradingLit" + (BackJson.nowindex - 1)).css("display", "");

            TradingJson.data.NowIndex = BackJson.nowindex;
        }
        if (TradingJson.data.freecount > 0)
            TradingJson.data.freecount -= 1;

        if (TradingJson.data.freecount < 1)
            $('#CoinNum').html("花费" + TradingJson.data.TradingCoin.split(",")[BackJson.nowindex - 1] + "银币");
        else
            $('#CoinNum').html("免费贸易");

        switch (BackJson.gemtype) {
            case 1:
                PubJsonNew.data[0].GemBlue += BackJson.gemvalue;
                $("#Gem11").html(PubJsonNew.data[0].GemBlue);
                break;
            case 2:
                PubJsonNew.data[0].GemPurple += BackJson.gemvalue;
                $("#Gem12").html(PubJsonNew.data[0].GemPurple);
                break;
            case 3:
                PubJsonNew.data[0].GemRed += BackJson.gemvalue;
                $("#Gem13").html(PubJsonNew.data[0].GemRed); 
                break;
            case 4:
                PubJsonNew.data[0].GemYellow += BackJson.gemvalue;
                $("#Gem14").html(PubJsonNew.data[0].GemYellow);
                break;
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

var ReceiveRankRewardResert = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        RankJson.data.rewardstatus = 1;
        $("#ReceiveRankRewardBtn").css("background", "url(res/city/Share_But2.png) no-repeat");
        $("#ReceiveRankRewardBtn").attr("ontouchend", "");
    }
    showTextMess(BackJson.info, BackJson.resert);
}

var UpZFResert = function (json) {
    isSubmit = false;
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        ZfJcData.data.isResert = 0;//重置战法数据        
        updateGold(1, BackJson.upcoin);
        updateGold(4, BackJson.upjungong);
        for (var i = 0; i < TacticsJson.data.datalist.length; i++) {
            if (TacticsJson.data.datalist[i].id == BackJson.Client[0].id) {
                TacticsJson.data.datalist[i].lv += 1;
                $("#ForLv" + TacticsJson.data.datalist[i].id).html("等级:" + TacticsJson.data.datalist[i].lv);
                $("#upcoin" + i).html(TacticsJson.data.upcoin * (TacticsJson.data.datalist[i].lv + 1));
                $("#upjungong" + i).html(TacticsJson.data.upjungong * (TacticsJson.data.datalist[i].lv + 1));
                break;
            }
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}


var ReceiveVipGiftResert = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        //{"resert":1,"info":"","GoodsJson":[],"tempsJson":[],"SCoin":100,"M":0,"rewardjson":""}
        //将获得的物品添加到包裹中
        if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
            AddItemToWarOther(BackJson.GoodsJson);
        }
        //将获得的物品添加临时包裹中去
        if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
            AddItemToTwarOther(BackJson.tempsJson);
        }

        if (BackJson.SCoin != 0)
            updateGold(1, 0 - BackJson.SCoin);
        if (BackJson.M != 0)
            updateGold(2, 0 - BackJson.M);

        ShowRewardDialog(JSON.stringify(BackJson.rewardjson));
        $("#vipreceivebtn").css("background", "url(res/Vip/ButVip2.png) no-repeat");
        $("#vipreceivebtn").attr("ontouchend", "");
        VipJson.data.giftstatus = 1;
    }
    else
        showTextMess(BackJson.info, BackJson.resert);
}

//通知服务器离开某些页面
var LeavePage = function (type) {
    window.GameMainClass.sendRequestJson(type, "", "");
}