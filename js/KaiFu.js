

//开服奖励
var KaiFuClass = {
    //首充奖励
    RechargeFirst: function () {
        var str = new Array();
        $("#dialogMain").css({ "left": (Systemdata.width - 480) / 2 + "px", "top": 4, "width": 480, "height": 312, "background-image": "url(res/activity/shenjiang/MarvellousBg.png)" });
        $("#colsemain").remove();
        str.push("<div class='close' style='left:430px;top:13px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();'></div>");

        str.push("<img style='top:0px;left:56px;width:368px;height:72px;position:absolute;' src='res/kaifu/OFchargeTxt.png' />");
        str.push("<img style='top:73px;left:55px;width:370px;height:166px;position:absolute;' src='res/kaifu/Generals_OFcharge.png' />");
        var left = 75;
        if (UserJson.FristRecharge == 1) {
            for (var i = 0; i < 3; i++) {
                str.push("<div class='ButtonOther' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.F_R_Recruit(" + i + ");' style='width:76px;height:44px;top:238px;left:" + left + "px;background:url(res/activity/shenjiang/AWomanBut1.png) no-repeat'></div>");
                left += 126;
            }
            str.push("<img src='res/kaifu/Fcharge_Ok.png' style='position:absolute;top:224px;left:400px;width:75px;height:77px;' />");
        }
        else {
            for (var i = 0; i < 3; i++) {
                str.push("<div class='ButtonOther' style='width:76px;height:44px;top:238px;left:" + left + "px;background:url(res/activity/shenjiang/AWomanBut3.png) no-repeat;'></div>");
                left += 126;
            }
            str.push("<img src='res/kaifu/Fcharge_No.png' style='position:absolute;top:224px;left:400px;width:75px;height:77px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();' />");
        }
        var sbx = 84;
        for (var i = 0; i < 3; i++) {
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowHeroData(" + i + ");' style='top:202px;left:" + sbx + "px;background:url(res/activity/shenjiang/AWomanBut2.png) no-repeat;'></div>");
            sbx += 126;
        }
        str.push("<div class='DefaultFont_14 RedFont' style='top:288px;left:68px;'>1RMB = 10萌币哦，亲！</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);
    },

    herolist: new Array(2301, 2353, 2406),

    ShowHeroData: function (index) {
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='ShengJiangDia'>");
        str.push("<div class='close' style='left:233px;top:7px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#ShengJiangDia\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div style='position:absolute;left:68px;background:url(res/activity/shenjiang/GeneralsTxt.png) no-repeat;width:145px;height:49px;'></div>");
        str.push("<div style='position:absolute;left:22px;top:76px;background:url(res/activity/shenjiang/GeneralsETxt.png) no-repeat;width:137px;height:161px;'></div>");

        for (var i = 0; i < GeneralsJson.length; i++) {
            if (GeneralsJson[i].HeroId == KaiFuClass.herolist[index]) {
                var namecolor = "#00CCFF";
                switch (GeneralsJson[i].Qualification) {
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
                str.push("<div id='HeroBody' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;top:58px;left:11px;'></div>");
                str.push("<div class='DefaultFont' style='top:55px;left:165px;font-weight:400;color:" + namecolor + ";'>" + GeneralsJson[i].Name + "</div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:75px;left:145px;font-weight:200;'>25</div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:92px;left:145px;font-weight:200;'>" + GeneralsJson[i].Hp + "<font style='color:#00ff00;'> (" + GeneralsJson[i].HpGrow + ")</font></div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:109px;left:145px;font-weight:200;'>" + GeneralsJson[i].Attack + "<font style='color:#00ff00;'> (" + GeneralsJson[i].AtkGrow + ")</font></div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:126px;left:145px;font-weight:200;'>" + GeneralsJson[i].Defend + "<font style='color:#00ff00;'> (" + GeneralsJson[i].DefGrow + ")</font></div>");
                str.push("<div class='DefaultFont' style='font-size:13px;top:155px;left:20px;font-weight:200;color:#8B4625;width:235px;line-height:16px;'>" + GeneralsJson[i].Detail + "</div>");
                for (var m = 0; m < SkillJson.length; m++) {
                    if (SkillJson[m].sId == GeneralsJson[i].Pt1) {
                        str.push("<div id='hert' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowSkillData(" + m + ");' class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;left:40px;top:198px;'></div>");
                        break;
                    }
                }
                break;
            }
        }

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //显示技能信息
    ShowSkillData: function (skillindex) {
        $("body").stopTime("showData21");
        $("#showData21").remove();
        var str = new Array();
        var left = 90, top = 120;
        var job = "";

        var h = SkillJson[skillindex].detail.length / 9 + (SkillJson[skillindex].detail.length % 9 == 0 ? 0 : 1);

        h = (h + 4) * 17;

        var namecolor = "#ffffff";
        //var temp = SkillJson[skillindex].sLv + "级";

        if (SkillJson[skillindex].sLv == 60) {
            namecolor = "#FF00FF";
            //temp = "初级";
        }
        else if (SkillJson[skillindex].sLv == 61) {
            namecolor = "#FF0000";
            //temp = "终级";
        }

        str.push("<div id='showData21' class='showData' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showData21\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:" + namecolor + ";'>" + SkillJson[skillindex].sName + "</td></tr>");
        str.push("<tr><td>类型：" + "<font style='color:#E4BA5D'>" + (SkillJson[skillindex].sType == 1 ? "主动技能" : "被动技能") + "</font></td></tr>");
        str.push("<tr><td>描述：</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + SkillJson[skillindex].detail + "</td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("ShengJiangDia").appendChild(divnode);

        $("body").oneTime("3s", "showData21", function () {
            $("body").stopTime("showData21");
            var i = 100;
            $("body").everyTime("20ms", "showData21", function () {
                i--;
                document.getElementById("showData21").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData21").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showData21");
                    $("#showData21").remove();
                }
            });
        });
    },

    F_R_Recruit: function (index) {
        index += 1;
        //提交抽奖
        window.GameMainClass.sendRequestJson(1115, '{"pos":' + index + '}', "F_R_RecruitResert");
    },

    LoadChongJi: function () {
        var str = new Array();
        str.push("<div class='DefaultFont RedFont' style='font-size:15px;top:97px;left:57px;line-height:18px;'>" + ChongJiJson.data.timedetail + "</div>");
        //str.push("<img src='res/city/Drawing_Time.png' style='position:absolute;top:97px;left:55px;' />");
        var top = 168, left = 60;
        for (var i = 0; i < ChongJiJson.data.datalist.length; i++) {
            var color = "";
            switch (i + 1) {
                case 1:
                    color = "#ff0000";
                    break;
                case 2:
                    color = "#0099ff";
                    break;
                case 3:
                    color = "#00cc00";
                    break;
                default:
                    color = "#884400";
                    break;
            }

            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;color:" + color + ";font-weight:200;'>" + (i + 1) + "</div>");
            left += 30;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;color:" + color + ";font-weight:200;text-align:center;width:90px;'>" + ChongJiJson.data.datalist[i].username + "</div>");
            if (i <= 4)
                left += 105;
            else
                left += 95;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;color:" + color + ";font-weight:200;'>" + ChongJiJson.data.datalist[i].lv + "</div>");

            if (i == 4) {
                top = 168;
                left = 265;
            }
            else {
                if (i < 4)
                    left = 60;
                else
                    left = 265;

                top += 23;
            }
        }
        str.push("<div class='DefaultFont_14' style='top:96px;left:280px;text-align:center;width:138px;height:38px;line-height:16px;color:#990000;'>" + UserJson.UName + "<br/><font style='color:#660000;'>我的名次</font>: <font style='color:#ff0000;line-height:23px;'>" + ChongJiJson.data.selfRanking + "</font></div>");
        str.push("<div class='ButtonOther' style='width:44px;height:44px;background:url(res/city/Drawing_Explain.png) no-repeat;top:268px;left:417px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ChongJiDetail();'></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    ChongJiDetail: function () {
        //var myScroll;       

        //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div class='FuBengDialog' id='FuBengDialog' style='width:444px;height:278px;background:url(res/city/Explain_Bg.png) no-repeat;top:19px;left:12px;'>");
        str.push("<div class='close' style='left:403px;top:10px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\".FuBengDialog\").remove();$(\".mask2\").remove();}'></div>");
        str.push("<div id='wrapper'><div id='scroller'>");
        str.push('<ul id="thelist">');
        str.push("<li>【活动规则】:</li>");
        str.push("<li>1、每次排名在前10名的主公都可获得奖励。</li><li>2、奖励通过消息系统发放给获得奖励的玩家。</li><li>3、本活动的最终解释权归《乐闹三国》官方运营所有。</li>");
        str.push("<li style='height:229px;'><img src='res/city/Drawing_001.png' /></li>");
        str.push("</ul></div></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        myScroll = new iScroll('wrapper');
        window.addEventListener('DOMContentLoaded', loaded, false);
    },

    //分享数据
    LoadShare: function () {
        $("#sharedia").remove();
        var str = new Array(); //H:184  w:378
        str.push("<div class='DefaultFont_14 RedFont' id='shareple' style='top:55px;left:110px;'>" + ShareJson.data.NumOfPelple + "人</div>");
        var top = 0, left = 0;
        str.push("<div id='wrapper' style='top:75px;left:47px;width:378px;height:184px;'><div id='scroller'><ul id='thelist'><li>");
        for (var i = 0; i < ShareJson.data.datalist.length; i++) {
            str.push("<div id='ShareBox" + i + "' style='position:absolute;width:188px;height:60px;background:url(res/city/Share_Xbg.png) no-repeat;top:" + top + "px;left:" + left + "px;'>");
            if ((i + 1) % 2 == 0) {
                top += 62;
                left = 0;
            }
            else
                left += 190;
            if (ShareJson.data.datalist[i].nop <= ShareJson.data.NumOfPelple) {
                if (ShareJson.data.datalist[i].isReceive)
                    str.push("<div class='ButtonOther' style='width:66px;height:42px;background:url(res/city/Share_Label.png) no-repeat;top:8px;left:120px;'></div>");
                else
                    str.push("<div class='ButtonOther' id='ShareRwbtn" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShareReward(" + i + ");' style='width:60px;height:38px;background:url(res/city/Share_But1.png) no-repeat;top:10px;left:130px;'></div>");
            }
            else
                str.push("<div class='ButtonOther' style='width:60px;height:38px;background:url(res/city/Share_But2.png) no-repeat;top:10px;left:130px;'></div>");
            str.push("<div class='DefaultFont' style='top:2px;left:5px;line-height:18px;font-weight:600;font-size:12px;color:#ff0000;'>" + ShareJson.data.datalist[i].nop + "人分享</div>");
            str.push("<div class='DefaultFont RedFont' style='top:20px;left:5px;line-height:18px;font-weight:400;font-size:12px;'>" + ShareJson.data.datalist[i].Reward + "</div>");
            str.push("</div>");
        }
        str.push("</li></ul></div></div>");
        str.push("<img src='res/city/ShareIcon.png' style='position:absolute; z-index:1px;top:260px;left:35px;' />");
        str.push("<div class='ButtonSmall' style='top:260px;left:40px;width:50px;height:48px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.share();'></div>");
        var divnode = document.createElement("div");
        divnode.id = "sharedia";
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        $("#scroller").css("height", (ShareJson.data.datalist.length / 2 + (ShareJson.data.datalist.length % 2 == 0 ? 0 : 1)) * 62);

        myScroll = new iScroll('wrapper', { 'hScrollbar': false, 'vScrollbar': false });
        window.addEventListener('DOMContentLoaded', loaded, false);
    },

    QinDaoJson: [
        { "itemlist": "200", "itemnum": "50000" },
        { "itemlist": "300", "itemnum": "1000" },
        { "itemlist": "6552,6841", "itemnum": "3,3" },
        { "itemlist": "6521,6842,6621", "itemnum": "1,3,3" },
        { "itemlist": "600,6554,6622", "itemnum": "50,2,2" }
    ],

    //加载签到
    LoadQianDao: function () {
        var str = new Array();
        var WeekArray = ["第一天", "第二天", "第三天", "第四天", "第五天"];
        var top = 4, x = 75;
        str.push("<div id='TaishouFuBg' style='background:url(res/dialog/QinDao_Bg.png) no-repeat;'>");
        var itemlist;
        for (var i = 0; i < 5; i++) {
            str.push("<div  class='RewardBox'style='top:" + top + "px;background:url() no-repeat;width:450px;'>");
            if ((i + 1) == QianDaoData.data.nday)
                str.push("<div class='DefaultFont' style='top:13px;left:8px;height:20px;width:65px;text-align:center;font-size:12px;line-height:22px;color:#ff0000;'>" + WeekArray[i] + "</div>");
            else
                str.push("<div class='DefaultFont GoldFont' style='top:13px;left:8px;height:20px;width:65px;text-align:center;font-size:12px;line-height:22px;'>" + WeekArray[i] + "</div>");
            itemlist = KaiFuClass.QinDaoJson[i].itemlist.split(",");
            x = 75;
            for (var j = 0; j < itemlist.length; j++) {
                if (Number(itemlist[j]) < 1000) {
                    str.push("<div class='Skill' style='top:4px;left:" + x + "px;background:url(res/dialog/" + itemlist[j] + ".png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:" + (45 + x) + "px;'>");
                    switch (Number(itemlist[j])) {
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
                        case 600:
                            str.push("萌币");
                            break;
                    }
                    str.push("</div>");

                }
                else {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == Number(itemlist[j])) {
                            str.push("<div class='Skill' style='top:4px;left:" + x + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                            var name = GoodsJson[m].IName;
                            if (name.length > 4) {
                                name = name.substring(0, 4);
                            }
                            str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:" + (45 + x) + "px;'>" + name + "</div>");
                            break;
                        }
                    }
                }
                str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:" + (45 + x) + "px;'>×" + KaiFuClass.QinDaoJson[i].itemnum.split(",")[j] + "</div>");
                x += 105;
            }
            switch (Number(QianDaoData.data.days.split(",")[i])) {
                case 0:
                    str.push("<div class='ButtonOther' style='width:60px;height:38px;background:url(res/city/Share_But2.png) no-repeat;top:5px;left:390px;'></div>");
                    break;
                case 1:
                    str.push("<div class='ButtonOther' id='qiaodaoBtn" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.QianDaoReward(" + i + ");' style='width:60px;height:38px;background:url(res/city/Share_But1.png) no-repeat;top:5px;left:390px;'></div>");
                    break;
                case 2:
                    str.push("<div class='ButtonOther' style='width:66px;height:42px;background:url(res/city/Share_Label.png) no-repeat;top:5px;left:385px;'></div>");
                    break;
            }
            str.push("</div>");
            top += 45;
        }
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    QianDaoReward: function (index) {
        window.GameMainClass.sendRequestJson(1247, '{"nday":' + (index + 1) + '}', "KaiFuClass.QianDaoResult");
    },

    QianDaoResult: function (json) {
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
            updateGold(2, 0 - BackJson.gold);
            updateGold(1, 0 - BackJson.coin);
            updateGold(4, 0 - BackJson.jungong);

            $("#qiaodaoBtn" + (BackJson.Client[0].nday - 1)).css({ "width": "66px", "height": "42px", "background": "url(res/city/Share_Label.png) no-repeat", "top": "5px", "left": "385px" });
            document.getElementById("qiaodaoBtn" + (BackJson.Client[0].nday - 1)).ontouchend = function () { return false; };

            var ss = QianDaoData.data.days.split(",");
            ss[BackJson.Client[0].nday - 1] = "2";
            QianDaoData.data.days = String(ss);
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    ShareReward: function (index) {
        window.GameMainClass.sendRequestJson(1123, '{"objNum":' + ShareJson.data.datalist[index].nop + '}', "ShareRewardResert");
    },

    //累充
    LoadCumulationRecharge: function () {
        var str = new Array();
        str.push("<div id='wrapper' style='top:68px;left:50px;width:84px;height:204px;'><div id='scroller'><ul id='thelist'><li>");
        var top = 0;
        for (var i = 0; i < CumulationRechargeJson.data.datalist.length; i++) {
            str.push("<div id='listitem" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowC_R_Reward(" + i + ");' class='C_R_Mnume' style='top:" + top + "px;'><div class='C_R_MuneFont' id='font" + i + "'>" + CumulationRechargeJson.data.datalist[i].nop + "元礼包</div></div>");
            top += 42;
        }
        str.push("</li></ul></div></div>");
        str.push("<div id='rewardBox'></div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:289px;left:140px;'>" + CumulationRechargeJson.data.totalNum + "</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        $("#scroller").css("height", CumulationRechargeJson.data.datalist.length * 42);

        myScroll = new iScroll('wrapper', { 'hScrollbar': false, 'vScrollbar': false });
        window.addEventListener('DOMContentLoaded', loaded, false);
        KaiFuClass.ShowC_R_Reward(0);
    },

    ShowC_R_Reward: function (index) {
        if ($("#listitem" + index).attr("class") == "C_R_MnumeClick")
            return;
        $("#showData").remove();
        if (showgoodstime1 != null) {
            clearTimeout(showgoodstime1);
            clearTimeout(showgoodstime2);
        }
        $(".C_R_MnumeClick").attr("class", "C_R_Mnume");
        $("#listitem" + index).attr("class", "C_R_MnumeClick");
        $(".C_R_MuneFontClick").attr("class", "C_R_MuneFont");
        $("#font" + index).attr("class", "C_R_MuneFontClick");

        var str = new Array();
        var top = 63, left = 142;
        var rewarelist = CumulationRechargeJson.data.datalist[index].reward.split(",");
        var rewardnumlist = CumulationRechargeJson.data.datalist[index].rewardNum.split(",");
        var len = 0;
        for (var i = 0; i < rewardnumlist.length; i++) {
            if (Number(rewardnumlist[i]) != 0) {
                str.push("<div class='RewardBox' id='rwbox" + len + "' style='top:" + top + "px;left:" + left + "px;background:url(res/kaifu/RechargeItemBg.png) no-repeat;width:132px;height:48px;'>");
                switch (Number(rewarelist[i])) {
                    case 200:
                        str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/dialog/200.png) no-repeat;'></div>");
                        str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>银币<br />×" + rewardnumlist[i] + "</div>");
                        break;
                    case 300:
                        str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/dialog/300.png) no-repeat;'></div>");
                        str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>军功<br />×" + rewardnumlist[i] + "</div>");
                        break;
                    case 600:
                        str.push("<div class='Skill' style='top:4px;left:4px;background:url(res/dialog/600.png) no-repeat;'></div>");
                        str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>萌币<br />×" + rewardnumlist[i] + "</div>");
                        break;
                    default:
                        for (var m = 0; m < GoodsJson.length; m++) {
                            if (GoodsJson[m].ItemId == Number(rewarelist[i])) {
                                str.push("<div class='Skill' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowGoodsInfo(" + len + "," + m + ");' style='top:4px;left:4px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                                str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;line-height:18px;'>" + GoodsJson[m].IName + "<br />×" + rewardnumlist[i] + "</div>");
                                break;
                            }
                        }
                        break;
                }
                str.push("</div>");
                left += 142;
                if ((len + 1) % 2 == 0) {
                    left = 142;
                    top += 54;
                }
                len++;
            }
        }

        str.push("<div class='DefaultFont_14 RedFont' style='top:225px;left:142px;width:277px;line-height:18px;'>" + CumulationRechargeJson.data.datalist[index].detail + "</div>");
        if (CumulationRechargeJson.data.datalist[index].nop <= CumulationRechargeJson.data.totalNum) {
            if (CumulationRechargeJson.data.datalist[index].isReceive)
                str.push("<div class='ButtonOther' style='width:66px;height:42px;background:url(res/city/Share_Label.png) no-repeat;top:260px;left:230px;'></div>");
            else
                str.push("<div class='ButtonOther' id='ShareRwbtn" + index + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.C_R_Reward(" + index + ");' style='width:60px;height:38px;background:url(res/city/Share_But1.png) no-repeat;top:267px;left:240px;'></div>");
        }
        else {
            str.push("<div class='ButtonOther' style='width:60px;height:38px;background:url(res/city/Share_But2.png) no-repeat;top:267px;left:240px;'></div>");
        }
        $("#rewardBox").html(str.join(""));
    },

    C_R_Reward: function (index) {
        window.GameMainClass.sendRequestJson(1125, '{"objNum":' + CumulationRechargeJson.data.datalist[index].nop + '}', "C_R_RewardResert");
    },

    ShowGoodsInfo: function (pos, GoodsIndex) {
        $("#showData").remove();
        if (showgoodstime1 != null) {
            clearTimeout(showgoodstime1);
            clearTimeout(showgoodstime2);
        }
        var top = $("#rwbox" + pos).offset().top;
        var left = $("#rwbox" + pos).offset().left;

        if (pos % 2 == 0) {
            left += 100;
        }
        else
            left -= 170;

        if (pos > 3)
            top -= 50;

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
                type2 = "生命";
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
                val = GoodsJson[GoodsIndex].hpBonus; //WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
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
        str.push("<div id='showData' style='top:" + top + "px;left:" + left + "px;z-index:35;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#showData\").remove();clearTimeout(showgoodstime1);clearTimeout(showgoodstime2);}'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:" + namecolor + ";'>" + GoodsJson[GoodsIndex].IName + "</td></tr>");
        str.push("<tr><td>类型:<font style='color:#E4BA5D'>" + type + "</font></td></tr>");
        if (GoodsJson[GoodsIndex].NLv > 0)
            str.push("<tr><td>等级:<font style='color:#E4BA5D'>武将" + GoodsJson[GoodsIndex].NLv + "级</font></td></tr>");
        if (type2 != 0)
            str.push("<tr><td>" + type2 + ":<font style='color:#E4BA5D'>" + val + "</font></td></tr>");

        str.push("<tr><td>描述:</td></tr>");
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
    },

    //系统公告
    LoadGongGao: function (index) {
        if (index < BulletinData.GongGao.length) {
            $(".GongGaoBtnShow").attr("class", "GongGaoBtn");
            $("#GongGaoBtn" + index).attr("class", "GongGaoBtnShow");

            var str = new Array();
            str.push("<div id='wrapper' style='top:0px;left:0px;width:285px;height:220px;bottom:50px;'><div id='scroller'>");
            str.push('<ul id="thelist"><li><table width="100%"><tr><td>');
            str.push(BulletinData.GongGao[index].detial + "</td></tr>");

            if (BulletinData.GongGao[index].functionName != "") {
                str.push("<tr><td><div class='ButtonSmall' style='background:url(res/city/AnnBut3.png) no-repeat;left:300px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) " + BulletinData.GongGao[index].functionName + "'></div></td></tr>");
            }

            str.push("</table></li></ul></div></div>");

            $("#BulletinDetail").html(str.join(""));
            myScroll = new iScroll('wrapper', { 'hScrollbar': false, 'vScrollbar': false });
            window.addEventListener('DOMContentLoaded', loaded, false);
        }
    },

    //活动公告
    LoadHDGongGao: function (index) {
        if (index < BulletinData.Activity.length) {
            $(".GongGaoBtnShow").attr("class", "GongGaoBtn");
            $("#GongGaoBtn" + index).attr("class", "GongGaoBtnShow");

            var str = new Array();
            str.push("<div id='wrapper' style='top:0px;left:0px;height:220px;bottom:50px;width:285px;'><div id='scroller'>");
            str.push('<ul id="thelist"><li><table width="100%"><tr><td>');
            str.push(BulletinData.Activity[index].detial + "</td></tr>");

            if (BulletinData.Activity[index].functionName != "") {
                str.push("<tr><td><div class='ButtonSmall' style='background:url(res/city/AnnBut3.png) no-repeat;left:220px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) " + BulletinData.Activity[index].functionName + "'></div><td></tr>");
            }
            str.push("</table></li></ul></div></div>");
            $("#BulletinDetail").html(str.join(""));
            myScroll = new iScroll('wrapper', { 'hScrollbar': false, 'vScrollbar': false });
            window.addEventListener('DOMContentLoaded', loaded, false);
        }
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        /********************************************************活动**************************/
        switch (obj) {
            case 1:
                $("#GGItem").attr("class", "ListItemClick");
                $("#GGItem").html("<div class='MuneFontClick'>活动</div>");

                $("#huodong").attr("class", "ListItem");
                $("#huodong").html("<div class='MuneFont'>公告</div>");

                KaiFuClass.HDCheckPage(1);

                break;
            /******************************************公告******************************************************************/ 
            case 2:
                $("#GGItem").attr("class", "ListItem");
                $("#GGItem").html("<div class='MuneFont'>活动</div>");
                $("#huodong").attr("class", "ListItemClick");
                $("#huodong").html("<div class='MuneFontClick'>公告</div>");
                KaiFuClass.CheckPage(1);
                break;

        }
    },

    HDCheckPage: function (pageindex) {
        var len = BulletinData.Activity.length;
        var startindex = (pageindex - 1) * 4;
        var endindex = 4;
        var maxpage = 1;
        if (len > 4) {
            maxpage = parseInt(len / 4) + (len % 4 == 0 ? 0 : 1);
        }

        if (len <= 4)
            endindex = len;
        else if (pageindex <= len / 4) {
            endindex = startindex + 4;
        }
        else {
            endindex = startindex + len % 4;
        }
        var top = 5;
        var str = new Array();
        for (var i = startindex; i < endindex; i++) {
            str.push("<div class='GongGaoBtn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.LoadHDGongGao(" + i + ");' id='GongGaoBtn" + i + "' style='top:" + top + "px;left:3px;'>" + BulletinData.Activity[i].name + "</div>");
            top += 50;
        }
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.HDCheckPage(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" ></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.HDCheckPage(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        $("#BulletinDialogLeft").html(str.join(""));

        KaiFuClass.LoadHDGongGao(startindex);
    },

    CheckPage: function (pageindex) {
        var len = BulletinData.GongGao.length;
        var startindex = (pageindex - 1) * 4;
        var endindex = 4;
        var maxpage = 1;
        if (len > 4) {
            maxpage = parseInt(len / 4) + (len % 4 == 0 ? 0 : 1);
        }

        if (len <= 4)
            endindex = len;
        else if (pageindex <= len / 4) {
            endindex = startindex + 4;
        }
        else {
            endindex = startindex + len % 4;
        }
        var top = 5;
        var str = new Array();
        for (var i = startindex; i < endindex; i++) {
            str.push("<div class='GongGaoBtn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.LoadGongGao(" + i + ");' id='GongGaoBtn" + i + "' style='top:" + top + "px;left:3px;'>" + BulletinData.GongGao[i].name + "</div>");
            top += 50;
        }
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.CheckPage(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" ></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.CheckPage(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        $("#BulletinDialogLeft").html(str.join(""));

        KaiFuClass.LoadGongGao(startindex);
    },

    //加载神兽界面
    LoadShenShou: function () {
        var str = new Array();
        str.push("<div id='KillFirstDialog'>");
        str.push("<div class='DefaultFont' style='color:white;top:-22px;left:181px;font-size:12px;'>神兽出现在征战地图，点击即可进入击杀。</div>");
        str.push('<div id="album6"  style="width:392px;height:216px;top:10px;left:30px;" class="album"><div class="paging">');
        var len = 0, left = 0;
        for (var i = 0; i < ShenShouJson.data.list.length; i++) {
            if (i % 2 == 0) {
                str.push("<div class='page pagediv' style='width:392px;height:216px;'>");
            }
            len++;
            str.push("<div class='ShenShouBox' id='ssbox" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowShenShouDetail(" + i + ");' style='left:" + left + "px;'>");
            str.push("<div class='ButtonSmall' style='width:188px;height:102px;background:url(res/activity/" + ShenShouJson.data.list[i].id + "/1.png) no-repeat;'></div>");
            str.push("<div class='ShenShouStatus' style='top:2px;left:2px;background-position:0 -" + ((ShenShouJson.data.list[i].status == 3 ? 1 : ShenShouJson.data.list[i].status) * 64) + "px;'></div>");
            //下次入侵时间
            str.push("<div class='DefaultFont_14' style='width:188px;text-align:center;top:105px;color:#ffcc99;font-weight:200;'>下次入侵时间:<font style='color:#ffff00'>" + ShenShouJson.data.list[i].nexttime + "</font></div>");
            str.push("<div class='DefaultFont_14' style='width:188px;text-align:center;top:125px;color:#ffcc99;font-weight:200;'>上轮击杀者:<font style='color:#ffff00'>" + ShenShouJson.data.list[i].lastnick + "</font></div>");

            str.push("<div class='DefaultFont' style='width:188px;text-align:center;top:156px;color:#990000;font-weight:200;font-size:12px;'>活动时间:(击杀才有奖励)</div>");
            str.push("<div class='DefaultFont' style='width:188px;text-align:center;top:172px;color:#990000;font-weight:200;font-size:12px;'>" + ShenShouJson.data.list[i].atime + "</div>");
            str.push("<div class='DefaultFont RedFont' style='width:188px;text-align:center;top:195px;font-size:12px;'>点击查看详细资料</div>");
            str.push("</div>");
            left += 204;
            if (i == ShenShouJson.data.list.length - 1) {
                if (len == 2) {
                    str.push("</div><div class='page pagediv' style='width:392px;height:216px;'>");
                    left = 0;
                }
                str.push("<div class='ShenShouBox' style='background:url(res/activity/Animal_Bg2.png) no-repeat;left:" + left + "px;'></div>");
                str.push("</div>");
                len = 0;
            }
            if (len == 2) {
                str.push("</div>");
                if (i == ShenShouJson.data.list.length - 1) {
                    str.push("<div class='page pagediv' style='width:392px;height:216px;'>");
                    str.push("<div class='ActivityBox' style='background:url(res/activity/0.png) no-repeat;left:" + left + "px;'></div></div>");
                }
                left = 0;
                len = 0;
            }
        }
        str.push("</div></div></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $('#album6').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".page",
            bounce: false
        });
    },

    //查看神兽详细资料
    ShowShenShouDetail: function (index) {
        $("body").stopTime("showDatass");
        var left = 0;
        if (index % 2 == 0)
            left = 70;
        else
            left = 275;
        $("#showDatass").remove();
        var str = new Array();
        str.push("<div id='showDatass' class='showData' style='top:80px;left:" + left + "px;z-index:35;'>");
        str.push("<div id='HeroDataMessageClose' style='left:113px;top:2px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){$(\"#showDatass\").remove();}'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' style='font-size:12px;font-weight:200;' >");
        str.push("<table width='93%'>");
        str.push("<tr><td>" + ShenShouJson.data.list[index].detail + "</td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $("body").oneTime("3s", "showDatass", function () {
            $("body").stopTime("showDatass");
            var i = 100;
            $("body").everyTime("20ms", "showDatass", function () {
                if (i > 0) {
                    i--;
                    document.getElementById("showDatass").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                    document.getElementById("showDatass").style.opacity = i / 100; //for FF
                }
                else {
                    $("body").stopTime("showDatass");
                    $("#showDatass").remove();
                }
            });

        });
    },

    FightShenShou: function (index) {
        DiaogColse();
        var divnode = document.createElement("div");
        divnode.id = 'mask';
        divnode.className = 'mask opacity';
        document.getElementById("main").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.id = 'dialogMain';
        document.getElementById("main").appendChild(divnode);
        var str = new Array();
        $("#dialogMain").css({ "left": (Systemdata.width - 452) / 2 + "px", "width": 452, "height": 304, "background-image": "url(res/activity/Boss_Bg.png)", "top": 8 });
        $("#colsemain").remove();
        str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){DiaogColse();LeavePage(1156);}' style='left:411px;top:15px;'></div>");
        str.push("<div class='ButtonBig' style='left:109px;background:url(res/activity/Animal_Tit.png) no-repeat;width:234px;height:40px;'></div>");
        str.push("<div style='position:absolute;z-index:1;width:137px;height:256px;background:url(res/activity/Boss_Bg1.png) no-repeat;top:32px;left:12px;'></div>");
        str.push("<div style='position:absolute;z-index:1;width:137px;height:252px;background:url(res/activity/Boss_Bg2.png) no-repeat;top:36px;left:302px;'></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        window.GameMainClass.sendRequestJson(1191, '{ "id":' + ShenShouJson.data.list[index].id + ',"index":' + index + '}', "KaiFuClass.FightShenShouResert");
        //KaiFuClass.FightShenShouResert('{"Client":[{"index":0}],"json":{"id":1,"CompleteState":"0,0,0","HpDiscount":100,"RankList":[],"SelfDis":"0","SelfZK":"0万","bossLv":20,"giftinfo":"1.红宝石箱x2<br>2.紫宝石箱x3<br>3.紫宝石箱x2<br>4.紫宝石箱x2<br>5.蓝宝石箱x3<br>6.蓝宝石箱x3<br>7.蓝宝石箱x2<br>8.蓝宝石箱x2","isLit":0,"isResert":1,"lastkillnick":"","leftkilltime":0}}');
    },

    cooltimeArry: new Array(),
    iscooling: new Array(),
    cdBossTime: new Array(),

    FightShenShouResert: function (json) {
        var index = 0;
        if (json != "") {
            var BackJson = JSON.parse(json);
            ShenShouFightJson.data = BackJson.json;

            for (var i = 0; i < BackJson.Client[0].index + 1; i++) {
                if (KaiFuClass.cooltimeArry[i] == null) {
                    KaiFuClass.cooltimeArry.push(0);
                    KaiFuClass.iscooling.push(0);
                    KaiFuClass.cdBossTime.push(0);
                }
            }

            index = BackJson.Client[0].index;
        }

        var str = new Array();
        //击杀排名
        var top = 63;
        str.push("<div id='RankList'>");
        for (var i = 0; i < ShenShouFightJson.data.RankList.length; i++) {
            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:20px;font-size:12px;'>" + (i + 1) + "." + ShenShouFightJson.data.RankList[i].name + "</div>");
            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:102px;font-size:12px;'>" + ShenShouFightJson.data.RankList[i].discount + "%</div>");
            top += 19;
        }
        str.push("</div>");
        //我的战况
        str.push("<div class='DefaultFont RedFont' style='top:242px;left:23px;font-size:12px;'>" + UserJson.UName + "</div>");
        str.push("<div class='DefaultFont RedFont' style='top:242px;left:102px;font-size:12px;'>" + ShenShouFightJson.data.SelfZK + "</div>");
        str.push("<div class='DefaultFont RedFont' style='top:260px;left:23px;font-size:12px;'>击杀总血量</div>");
        str.push("<div class='DefaultFont RedFont' style='top:260px;left:102px;font-size:12px;'>" + ShenShouFightJson.data.SelfDis + "%</div>");

        str.push("<div id='Experience' style='background:url(res/activity/BossWar_Hp.png) no-repeat;height:16px;max-width:137px;width:" + ShenShouFightJson.data.HpDiscount / 100 * 137 + "px;top:62px;left:157px;'></div>");
        str.push("<div class='DefaultFont_14' style='width:137px;height:16px;top:62px;left:157px;font-size:14px;color:white;text-align:center;line-height:16px;' id='HpNum'>" + ShenShouFightJson.data.HpDiscount + "%</div>");
        str.push("<div class='DefaultFont' style='top:200px;left:255px;'><img style='position:absolute;'src='res/dialog/Lv_Txt.png' />" + getLvNum(ShenShouFightJson.data.bossLv, 1) + "</div>");
        if (ShenShouFightJson.data.HpDiscount > 0)
            str.push("<div class='ButtonBig' style='width:141px;height:139px;background:url(res/activity/" + ShenShouFightJson.data.id + "/Icon.png) no-repeat;left:156px;top:80px;'></div>");
        else {
            str.push("<div class='ButtonBig' style='width:141px;height:139px;background:url(res/activity/" + ShenShouFightJson.data.id + "/Icon.png) no-repeat -141px 0 ;left:156px;top:80px;'></div>");
            str.push("<div class='DefaultFont_14' style='height:21px;width:141px;top:177px;left:156px;text-align:center;line-height:21px;color:white;'>被" + ShenShouFightJson.data.lastkillnick + "击杀</div>");
        }
        //击杀按钮
        if (ShenShouFightJson.data.HpDiscount > 0 && KaiFuClass.cooltimeArry[index] < 1 && ShenShouFightJson.data.isLit)
            str.push("<div class='ButtonSmall' id='KillButton1' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startMosterFight();' style='background:url(res/activity/BossWarBut1.png) no-repeat;height:44px;width:80px;top:245px;left:186px;'></div>");
        else
            str.push("<div class='ButtonSmall' id='KillButton1' style='background:url(res/activity/BossWarBut2.png) no-repeat;height:44px;width:80px;top:245px;left:186px;'></div>");

        str.push("<div class='DefaultFont_14 RedFont' id='CoolingTime1' style='height:21px;width:72px;top:220px;left:222px;text-align:left;line-height:21px;'>");
        if (ShenShouFightJson.data.isLit == 0)
            str.push("等待中</div>");
        else {
            if (KaiFuClass.cooltimeArry[index] < 1)
                str.push("00:00:00</div>");
            str.push("<div class='DefaultFont_14 RedFont' style='left:160px;top:81px;font-weight:200;'>挑战倒计时:<font id='bossendtime1'>" + expireTime(ShenShouFightJson.data.leftkilltime) + "</font></div>");
        }

        top = 89;
        var ss = "";
        //领取奖励
        for (var i = 0; i < 3; i++) {
            if (Number(ShenShouFightJson.data.CompleteState.split(",")[i]) == 1) {
                str.push("<div class='ButtonSmall' id='BosswordReBut" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.BossOfWorldReward(" + (i + 1) + ");' style='background:url(res/city/Share_But1.png) no-repeat;height:38px;width:60px;top:" + top + "px;left:370px;'></div>");
            }
            else if (Number(ShenShouFightJson.data.CompleteState.split(",")[i]) == 0) {
                str.push("<div class='ButtonSmall' style='background:url(res/city/Share_But2.png) no-repeat;height:38px;width:60px;top:" + top + "px;left:370px;'></div>");
            }
            else {
                str.push("<div class='ButtonSmall' style='background:url(res/city/Share_Label.png) no-repeat;height:42px;width:66px;top:" + top + "px;left:365px;'></div>");
            }
            top += 72;
        }
        str.push("<div class='ButtonSmall' id='showgiftinfo0' style='z-index:20;width:45px;height:45px;top:86px;left:314px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowGiftInfo(0);'></div>");
        str.push("<div class='ButtonSmall' id='showgiftinfo1' style='z-index:20;width:45px;height:45px;top:158px;left:314px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowGiftInfo(1);'></div>");
        str.push("<div class='ButtonSmall' id='showgiftinfo2' style='z-index:20;width:45px;height:45px;top:230px;left:314px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.ShowGiftInfo(2);'></div>");

        if (document.getElementById("BossOfWorldDia1") == null) {
            var divnode = document.createElement("div");
            divnode.id = 'BossOfWorldDia1';
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
        }
        else {
            $("#BossOfWorldDia1").html(str.join(""));
        }

        if (KaiFuClass.cooltimeArry[index] > 0 && KaiFuClass.iscooling[index] == 0) {
            KaiFuClass.CoolingtimeOfBoss(index);
        }
        if (ShenShouFightJson.data.isLit) {
            KaiFuClass.BossTime(index);
        }
    },

    CoolingtimeOfBoss: function (index) {
        if (KaiFuClass.iscooling[index] == 1)
            return;

        KaiFuClass.iscooling[index] = 1;
        $("body").everyTime("1s", "coolingtime" + index, function () {
            if (KaiFuClass.cooltimeArry[index] > 0) {
                KaiFuClass.cooltimeArry[index]--;
                $("#CoolingTime1").html(expireTime(KaiFuClass.cooltimeArry[index]));
            }
            else {
                $("body").stopTime("coolingtime" + index);
                $("#CoolingTime1").html("00:00:00");
                KaiFuClass.iscooling[index] = 0;
                $("#KillButton1").css({ "background": "url(res/activity/BossWarBut1.png) no-repeat" });
                document.getElementById("KillButton1").ontouchend = function () { if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startMosterFight(); }
            }
        });
    },

    //世界boss活动点亮
    litActivity: function (json) {
        window.GameMainClass.sendRequestJson(1195, "", "GetShenShouData");
        if (document.getElementById("BossOfWorldDia1") != null) {
            window.GameMainClass.sendRequestJson(1191, '{ "id": 1,"index": 0}', "KaiFuClass.FightShenShouResert");
        }
        var backjson = JSON.parse(json);

        if (document.getElementById("album3") != null) {
            $("#nsgif").remove();
            var ss = "";
            for (var i = 0; i < BattleJson.length; i++) {
                if (backjson.mapid == BattleJson[i].mapid) {
                    if (parseInt(10 * Math.random()) % 2 == 0) {
                        ss = "<img id='nsgif' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(0)' style='position: absolute;z-index:35;top:" + parseInt(147 * Math.random()) + "px;left:" + parseInt(316 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[0].id + "/1.gif' />";
                    } else {
                        ss = "<img id='nsgif' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(0)' style='position: absolute;z-index:35;top:" + parseInt(99 * Math.random()) + "px;left:" + parseInt(318 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[0].id + "/2.gif' />";
                    }
                    var divnode = document.createElement("div");
                    divnode.innerHTML = ss;
                    document.getElementById("mapdiv" + i).appendChild(divnode);
                    break;
                }
            }
        }
        showTextMess(backjson.info, 1);
    },

    //世界boss活动结束
    endActivity: function (json) {
        $("body").stopTime("coolingtime0");
        KaiFuClass.cooltimeArry[0] = 0;
        KaiFuClass.iscooling[0] = 0;
        if (document.getElementById("BossOfWorldDia1") != null) {
            window.GameMainClass.sendRequestJson(1191, '{ "id": 1,"index": 0}', "KaiFuClass.FightShenShouResert");
        }
        var backjson = JSON.parse(json);
        if (backjson.status != 3)
            $("#nsgif").remove();
        showTextMess(backjson.info, 1);
        window.GameMainClass.sendRequestJson(1195, "", "GetShenShouData");
    },

    //世界boss数据更新
    SetBossOfWorldData: function (json) {
        if (document.getElementById("BossOfWorldDia1") != null) {
            window.GameMainClass.sendRequestJson(1191, '{ "id": 1,"index": 0}', "KaiFuClass.FightShenShouResert");
        }
    },

    //世界boss数据更新
    SetBossOfWorldDataAll: function (json) {
        var BackJson = JSON.parse(json);
        ShenShouFightJson.data.HpDiscount = BackJson.HpDiscount;
        ShenShouFightJson.data.RankList = BackJson.RankList;
        if (document.getElementById("BossOfWorldDia1") != null) {
            var str = new Array();
            var top = 63;
            for (var i = 0; i < ShenShouFightJson.data.RankList.length; i++) {
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:20px;font-size:12px;'>" + (i + 1) + "." + ShenShouFightJson.data.RankList[i].name + "</div>");
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:102px;font-size:12px;'>" + ShenShouFightJson.data.RankList[i].discount + "%</div>");
                top += 19;
            }

            $("#RankList").html(str.join(""));
            $("#Experience").css({ "width": (ShenShouFightJson.data.HpDiscount / 100 * 137) + "px" });
            $("#HpNum").html(ShenShouFightJson.data.HpDiscount + "%");
        }
    },

    //世界boss战斗回调
    BossOfWorldResert: function () {
        if (ShenShouFightJson.data.isLit == true) {
            KaiFuClass.cooltimeArry[0] = 30;
            KaiFuClass.CoolingtimeOfBoss(0);
        }
        $("#KillButton1").css({ "background": "url(res/activity/BossWarBut2.png) no-repeat" });
        $("#KillButton1").attr("ontouchend", "");
    },

    BossOfWorldReward: function (index) {
        window.GameMainClass.sendRequestJson(1193, '{ "rewardtype":' + index + '}', "KaiFuClass.BossOfWordRewardResert");
    },

    //世界boss领奖
    BossOfWordRewardResert: function (json) {
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

            var state = ShenShouFightJson.data.CompleteState.split(",");
            var ss = "";
            for (var i = 0; i < state.length; i++) {
                if (i == BackJson.Client[0].rewardtype - 1)
                    state[i] = "2";

                ss += state[i];
                if (i != state.length - 1)
                    ss += ",";
            }

            ShenShouFightJson.data.CompleteState = ss;
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    BossTime: function (index) {
        if (KaiFuClass.cdBossTime[index] == 1)
            return;
        KaiFuClass.cdBossTime[index] = 1;
        $("body").everyTime("1s", "bossendtime" + index, function () {
            if (ShenShouFightJson.data.leftkilltime > 0) {
                ShenShouFightJson.data.leftkilltime--;
                $("#bossendtime1").html(expireTime(ShenShouFightJson.data.leftkilltime));
            }
            else {
                $("body").stopTime("bossendtime" + index);
                $("#bossendtime1").html("");
                KaiFuClass.cdBossTime[index] = 0;
            }
        });
    },

    ShowGiftInfo: function (index) {
        $("body").stopTime("BubbleData");
        $("#BubbleData1").remove();
        var str = new Array();
        str.push("<div id='BubbleData1' class='BubbleData' style='left:-100px;'>");
        str.push("<div id='BubbleDataUp'></div>");
        str.push("<div id='BubbleDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td>" + ShenShouFightJson.data.giftinfo.split("|")[index] + "</td></tr>");
        str.push("</table>");
        str.push("</div>");
        str.push("<div id='BubbleDataDown' ></div>");
        str.push("<div id='Arrow' style='left:95px;'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("showgiftinfo" + index).appendChild(divnode);


        //获取被点击英雄头像的座标
        var h = $("#BubbleData1").height();

        var top = 0;
        if (h > 46)
            top = 0 - (h - 46) / 2;
        else
            top = (46 - h) / 2;
        $("#BubbleData1").css({ "top": top + "px" });
        $("#Arrow").css({ "top": (h - 14) / 2 + "px" });

        $("body").oneTime("3s", "BubbleData", function () {
            $("body").stopTime("BubbleData");
            var i = 100;
            $("body").everyTime("20ms", "BubbleData", function () {
                if (i > 0) {
                    i--;
                    document.getElementById("BubbleData1").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                    document.getElementById("BubbleData1").style.opacity = i / 100; //for FF
                }
                else {
                    $("body").stopTime("BubbleData");
                    $("#BubbleData1").remove();
                }
            });

        });
    }
}