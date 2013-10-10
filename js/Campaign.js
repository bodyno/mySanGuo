
//征战
var CampaignClass = {
    tempid: -1,
    timer: null,
    timer1: null,
    funbenindex: 0,
    LotteryNum: 0,
    AutomaticCrusadeHero: -1,
    RewardData: null, //{ "GoodsList": "1000,1001,1002,1003", "GoodsCount": "10,5,1,3", "EXPList": "200,300,100" },

    LoadMap: function () {
        var str = new Array();
        $("#dialogMain").html("");
        str.push("<div class='close' style='left:443px;top:10px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) DiaogColse();'></div>");
        var mapid = UserJson.mapid;
        var mapindex = -1;
        for (var i = 0; i < BattleJson.length; i++) {
            if (BattleJson[i].mapid == mapid) {
                mapindex = i;
                break;
            }
        }

        var usermapindex = -1;
        for (var i = 0; i < UserBattleJson.data[0].mapdata.length; i++) {
            if (UserBattleJson.data[0].mapdata[i].mapid == mapid) {
                usermapindex = i;
                break;
            }
        }
        str.push('<div id="album3" style="width:420px;height:240px;z-index:1;left:34px;top:40px;" class="album"><div class="paging" id="paging">');
        for (var i = 0; i < BattleJson.length; i++) {
            str.push("<div class='pagediv' style='width:420px;height:240px;'>");
            str.push("<div class='CampaignDiv' id='mapdiv" + i + "' style='background:url(res/BattleMap/map/" + BattleJson[i].mapid + ".png) no-repeat;z-index:5;top:0px;left:0px;'>");
            for (var m = 0; m < ShenShouJson.data.list.length; m++) {
                if (ShenShouJson.data.list[m].mapid == BattleJson[i].mapid) {
                    if (ShenShouJson.data.list[m].status == 0) {
                        if (parseInt(10 * Math.random()) % 2 == 0) {
                            str.push("<img id='nsgif' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(147 * Math.random()) + "px;left:" + parseInt(316 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/1.gif' />");
                        } else {
                            str.push("<img id='nsgif' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(99 * Math.random()) + "px;left:" + parseInt(318 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/2.gif' />");
                        }
                    }
                    if (ShenShouJson.data.list[m].status == 3)
                        str.push("<img id='nsgif' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) KaiFuClass.FightShenShou(" + m + ")' style='position: absolute;z-index:35;top:" + parseInt(177 * Math.random()) + "px;left:" + parseInt(330 * Math.random()) + "px;' src='res/activity/" + ShenShouJson.data.list[m].id + "/3.gif' />");
                }

            }

            if (i < UserBattleJson.data[0].mapdata.length) {
                if (BattleJson[i].list.length == 0) {
                    str.push("<img src='res/BattleMap/NotOpen.png' style='position:absolute;z-index:10;' />");
                }
                else {
                    for (var j = 0; j < UserBattleJson.data[0].mapdata[i].list.length; j++) {
                        if (BattleJson[i].list.length > j) {
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
                }
            }
            else {
                if (BattleJson[i].list.length == 0) {
                    str.push("<img src='res/BattleMap/NotOpen.png' style='position:absolute;z-index:10;' />");
                }
            }
            str.push("</div>");
            str.push("</div>");
        }

        str.push("</div></div>");

        str.push("<div id='CampaignTitleBox'>");
        str.push("<div id='CampaignTitle' style='background-position:0 -" + (mapindex * 32) + "px;'></div>");
        str.push("</div>");
        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' id='mapprev' class='ButtonBig' style='width:40px;height:314px;background:url(res/BattleMap/NMapUpper.png) no-repeat;left:2px;top:2px;'></div>");
        str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' id='mapnext' style='width:40px;height:314px;background:url(res/BattleMap/NMapUpper.png) no-repeat;left:442px;top:2px;-moz-transform:scaleX(-1); -webkit-transform:scaleX(-1); -o-transform:scaleX(-1); transform:scaleX(-1); /*IE*/filter:FlipH;	transform: rotateY(180deg); '></div>");
        if (mapindex != 0)
            str.push("<div class='DefaultFont RedFont' id='mapnameprev' style='top:78px;left:17px;width:12px;font-size:12px;line-height:14px;'>" + BattleJson[mapindex - 1].mapname + "</div>");
        if (mapindex < BattleJson.length - 1)
            str.push("<div class='DefaultFont RedFont' id='mapnamenext' style='top:78px;left:455px;width:12px;font-size:12px;line-height:14px;'>" + BattleJson[mapindex + 1].mapname + "</div>");
        else
            str.push("<div class='DefaultFont RedFont' id='mapnamenext' style='top:78px;left:455px;width:12px;font-size:12px;line-height:14px;'>更多精彩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即将开放</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);

        if (UserBattleJson.data[0].CrusadeTime > 0 && timecount10 == null)
            CrusadeTime();

        $('#album3').iphoneSlide({
            handler: "#paging",
            pageHandler: ".pagediv",
            bounce: false,
            onShiftComplete: function (elem, page) {
                $("#CampaignTitle").css({ "background-position": "0 -" + ((page - 1) * 32) + "px" });
                if (page != BattleJson.length)
                    $("#mapnamenext").html(BattleJson[page].mapname);
                else
                    $("#mapnamenext").html("更多精彩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即将开放");

                if (page != 1)
                    $("#mapnameprev").html(BattleJson[page - 2].mapname);
                else
                    $("#mapnameprev").html("");

                UserJson.mapid = BattleJson[page - 1].mapid;
            }
        });

        $("#album3").iphoneSlide("slide2page", mapindex + 1, false);
        document.getElementById("mapnext").ontouchend = function () {
            if (Math.abs(lastPosX - beforePosX) < 5) {
                var ips = $('#album3').data('iphoneslide');
                ips.slide2page('next');
            }
        }
        document.getElementById("mapprev").ontouchend = function () {
            if (Math.abs(lastPosX - beforePosX) < 5) {
                var ips = $('#album3').data('iphoneslide');
                ips.slide2page('prev');
            }
        }
    },

    //副本信息
    LoadFuBen: function (mapindex, commindex) {
        $(".FuBengDialog").remove();
        var str = new Array();
        str.push("<div class='FuBengDialog' id='FuBengDialog'>");
        str.push("<div class='close' style='left:443px;top:10px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\".FuBengDialog\").remove();'></div>");
        if (mapindex != 0) {
            str.push("<div class='CampaignNameLeft' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.LoadFuBen(" + (mapindex - 1) + "," + (BattleJson[mapindex - 1].list.length - 1) + ");'></div>");
        }
        if (mapindex != FunBenJson.data.FuBenList.length - 1) {
            str.push("<div class='CampaignNameRight' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.LoadFuBen(" + (mapindex + 1) + "," + (BattleJson[mapindex + 1].list.length - 1) + ");'></div>");
        }
        else {
            str.push("<div class='CampaignNameRight rightEnabled'></div>");
        }
        str.push("<div id='CampaignTitleBox'>");
        str.push("<div id='CampaignTitle' style='background:url(res/FuBen/battletxt3.png) 0 -" + String(mapindex * 32) + "px no-repeat;'></div>");
        str.push("</div>");
        if (BattleJson[mapindex].list[commindex].id == FunBenJson.data.FuBenList[mapindex].FubenID) {
            str.push("<div class='CampaignDiv' id='CampaignDiv1' style='background:url(res/FuBen/bg/1.png) no-repeat;'>");
            if (BattleJson[mapindex].list[commindex].id == FunBenJson.data.InFubenID)
                str.push("<img src='res/FuBen/Txt_jxz.png' style='position:absolute;z-index:100;' />");
            str.push("<div class='FuBengbg'></div>");
            str.push("<div class='NpcBox' style='background:url(res/FuBen/npc/" + (mapindex + 1) + ".png) no-repeat;'></div>");
            var x1 = x2 = x3 = 4, y1 = 42, y2 = 42, y3 = 52;
            str.push("<div class='NpcName' style='background:url(res/FuBen/npcname/" + (mapindex + 1) + ".png) no-repeat;'></div>");

            for (var i = 0; i < FunBenJson.data.FuBenList.length; i++) {
                if (FunBenJson.data.FuBenList[i].FubenID == BattleJson[mapindex].list[commindex].id) {
                    CampaignClass.funbenindex = FunBenJson.data.FuBenList[i].InPoint == 0 ? 1 : FunBenJson.data.FuBenList[i].InPoint;
                    var nindex = FunBenJson.data.FuBenList[i].InPoint > 0 ? FunBenJson.data.FuBenList[i].InPoint - 1 : 0;
                    var RewardList = BattleJson[mapindex].list[commindex].Reward.split('|')[nindex].split(",");
                    var left = 27, top = 143;
                    for (var j = 0; j < RewardList.length; j++) {
                        if (j != 0) {
                            if (j % 2 == 0) {
                                top += 21;
                                left = 27;
                            }
                            else
                                left += 109;
                        }

                        if (RewardList[j] != "0") {
                            str.push("<div class='RewardIcon' id='Reward" + j + "' style='top:" + top + "px;left:" + left + "px;background-position:0 -" + (j * 19) + "px;z-index:27;'>");
                            str.push("<div class='DefaultFont_14 RedFont' style='top:3px;left:58px;width:100px;'>" + RewardList[j] + "</div></div>");
                        }
                    }

                    var goodslist = BattleJson[mapindex].list[commindex].GetItem.split('|')[nindex].split(",");
                    left = 48;
                    str.push("<div id='rewardbox'>");
                    for (var j = 0; j < goodslist.length; j++) {
                        str.push("<div class='Skill' id='Goods" + j + "' ");
                        for (var m = 0; m < GoodsJson.length; m++) {
                            if (GoodsJson[m].ItemId == goodslist[j]) {
                                str.push("style='top:186px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;z-index:28;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + j + ",4);'");
                                break;
                            }
                        }

                        str.push("></div>");
                        left += 50;
                    }
                    str.push("</div>");
                    str.push("<div class='DefaultFont' style='left:287px;width:100px;line-height:11px;top:150px;color:white;font-size:13px;'>推荐等级:<font style='color:#ff0000'>" + FunBenJson.data.FuBenList[i].NeedLv + "</font></div>");
                    var fnum = false;
                    if (FunBenJson.data.FuBenList[i].TodayNot > 0)
                        str.push("<div class='DefaultFont' style='left:281px;width:150px;line-height:11px;top:176px;color:#663327;font-size:13px;'>当前副本可挑战数:<font style='color:#ff0000'>" + FunBenJson.data.FuBenList[i].TodayNot + "</font></div>");
                    else {
                        if (FunBenJson.data.FuBenList[i].TigerSignNum > 0)
                            str.push("<div class='DefaultFont' style='left:281px;width:150px;line-height:11px;top:176px;color:#663327;font-size:13px;'>虎符额外可挑战数:<font style='color:#ff0000'>" + FunBenJson.data.FuBenList[i].TigerSignNum + "</font></div>");
                        else {
                            if (FunBenJson.data.FuBenList[i].InPoint <= 1)
                                fnum = true;
                            str.push("<div class='DefaultFont' style='left:281px;width:150px;line-height:11px;top:176px;color:#663327;font-size:13px;'><font style='color:#ff0000'>已达当日挑战上限</font></div>");
                        }
                    }
                    str.push("<div class='DefaultFont_14 RedFont' style='left:276px;width:135px;line-height:11px;top:209px;color:#663327;font-size:13px;text-align:center;'><font style='color:#ff0000'>额外挑战消耗1个虎符</font></div>");
                    if (FunBenJson.data.TodayNOT >= FunBenJson.data.TotalNOT)
                        if (FunBenJson.data.FuBenList[i].InPoint <= 1)
                            fnum = true;

                    goodslist = FunBenJson.data.FuBenList[i].ItemStr.split(",");
                    top = 16; left = 277;
                    for (var j = 0; j < goodslist.length; j++) {
                        str.push("<div class='Skill' id='Goodsx" + j + "' ");
                        for (var m = 0; m < GoodsJson.length; m++) {
                            if (GoodsJson[m].ItemId == goodslist[j]) {
                                str.push("style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;z-index:28;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + ",1,5);'");
                                break;
                            }
                        }

                        str.push("></div>");
                        left += 44;
                        if ((j + 1) % 3 == 0) {
                            left = 277;
                            top += 44;
                        }
                    }

                    var line1 = new Array(1, 2, 4, 6);
                    var line2 = new Array(1, 3, 5, 6);
                    var bool = false;
                    for (var m = 1; m < 7; m++) {
                        if (FunBenJson.data.FuBenList[i].LineID == 0) {
                            if (FunBenJson.data.FuBenList[i].InPoint == 2 || FunBenJson.data.FuBenList[i].InPoint == 3) {
                                if (m == 1)
                                    str.push("<div class='NpcComplete' style='top:" + y3 + "px;left:" + x3 + "px;'></div>");
                                else if (m == 2) {
                                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.CheckNpc(" + mapindex + "," + commindex + ",2);' class='NpcFight' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                                    str.push("<div id='nc2' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.CheckNpc(" + mapindex + "," + commindex + ",2);' style='width:61px;height:60px;position:absolute;z-index:25;top:" + y2 + "px;left:" + x2 + "px;'></div>");
                                }
                                else if (m == 3) {
                                    str.push("<div id='nc3' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.CheckNpc(" + mapindex + "," + commindex + ",3);' style='width:61px;height:60px;position:absolute;z-index:25;top:" + y2 + "px;left:" + x2 + "px;'></div>");
                                }
                                else
                                    str.push("<div  class='NpcLock' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                            }
                            else {
                                if (m != 1)
                                    str.push("<div class='NpcLock' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                                else
                                    str.push("<div class='NpcFight' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                            }
                        }
                        else {
                            bool = false;
                            var templine = null;
                            switch (FunBenJson.data.FuBenList[i].LineID) {
                                case 1:
                                    templine = line1;
                                    break;
                                case 2:
                                    templine = line2;
                                    break;
                            }
                            if (m <= FunBenJson.data.FuBenList[i].InPoint) {
                                for (var k = 0; k < templine.length; k++) {
                                    if (templine[k] == m) {
                                        bool = true;
                                        if (m == FunBenJson.data.FuBenList[i].InPoint)
                                            str.push("<div class='NpcFight' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                                        else
                                            str.push("<div class='NpcComplete' style='top:" + y3 + "px;left:" + x3 + "px;'></div>");

                                        break;
                                    }
                                }
                            }
                            if (bool == false)
                                str.push("<div class='NpcLock' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
                        }


                        if ((m + 1) % 2 == 0) {
                            if (m == 5) {
                                y2 = 42;
                                y3 = 52;
                            }
                            else {
                                y2 = 14;
                                y3 = 24;
                            }
                        }
                        else {
                            y2 = 75;
                            y3 = 85;
                        }
                        if (m == 1 || m == 2) {
                            x2 = 68;
                            x3 = 68;
                        }
                        else if (m == 3 || m == 4) {
                            x2 = 138;
                            x3 = 138;
                        }
                        else {
                            x2 = 202;
                            x3 = 202;
                        }
                    }
                    break;
                }
            }

            str.push("</div>");
            if (fnum)
                str.push("<div class='ButtonOther' style='background:url(res/FuBen/CopyExpedition1.png) no-repeat;top:242px;left:190px;width:104px;'></div>");
            else
                str.push("<div class='ButtonOther' style='background:url(res/FuBen/CopyExpedition.png) no-repeat;top:242px;left:190px;width:104px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.FunbenFighting(" + mapindex + "," + commindex + ");'></div>");

            str.push("<div class='MuneItem' id='FormationIcon1' style='left:440px;top:250px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  EnterBuliding(4000);'></a></div>");
        }
        else {
            str.push("<div class='CampaignDiv' id='CampaignDiv1' style='background:url(res/FuBen/CopyChest_No.png) no-repeat;width:484px;height:318px;left:0px;top:0px;'>");
        }
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);

        if (FunBenJson.data.isLottery == 1) {
            CampaignClass.FuBenLottery();
            FunBenJson.data.isLottery = 0;
        }
    },

    CheckNpc: function (mapindex, commindex, index) {
        $(".NpcFight").remove();
        switch (index) {
            case 2:
                CampaignClass.funbenindex = 2;
                var divnode = document.createElement("div");
                divnode.className = "NpcFight";
                divnode.style.top = "14px";
                divnode.style.left = "68px";

                document.getElementById("CampaignDiv1").appendChild(divnode);
                break;
            case 3:
                CampaignClass.funbenindex = 3;
                var divnode = document.createElement("div");
                divnode.className = "NpcFight";
                divnode.style.top = "75px";
                divnode.style.left = "68px";

                document.getElementById("CampaignDiv1").appendChild(divnode);
                break;
        }

        var goodslist = BattleJson[mapindex].list[commindex].GetItem.split('|')[index - 1].split(",");
        var str = new Array();
        var left = 48;
        for (var j = 0; j < goodslist.length; j++) {
            str.push("<div class='Skill' id='Goods" + j + "' ");
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == goodslist[j]) {
                    str.push("style='top:186px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;z-index:28;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + j + ",4);'");
                    break;
                }
            }

            str.push("></div>");
            left += 50;
        }
        $("#rewardbox").html(str.join(""));
    },

    FunbenFighting: function (mapindex, commindex) {
        //先判断当前是否有副本战役在进行中，如果有，是否是当前这个，如果不是，则不能进行征战
        if (FunBenJson.data.InFubenID == 0) {
            //FunBenJson.data.InFubenID = BattleJson[mapindex].list[commindex].id;
        }
        else {
            if (FunBenJson.data.InFubenID != BattleJson[mapindex].list[commindex].id) {
                ShowMessage("已有进行中的副本了！");
                return;
            }
        }

        //判断是否有虎符
        if (FunBenJson.data.FuBenList[mapindex].TodayNot < 1 && FunBenJson.data.FuBenList[mapindex].TigerSignNum > 0 && FunBenJson.data.InFubenID == 0) {
            if (WarHouseClass.GetItemCounts(6511) < 1) {
                ShowMessage("虎符不足，是否去商城购买?", function () { $("#other").html(""); $("#mask1").remove(); ShopClass.ShowItemId = 6511; EnterBuliding(8500); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }

        //调用
        window.GameMainClass.startFubenBattle(BattleJson[mapindex].mapid, BattleJson[mapindex].list[commindex].id, CampaignClass.funbenindex, mapindex, commindex)//.list[commindex].
    },

    //副本抽奖
    FuBenLottery: function () {
        var str = new Array();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        $("#LotteryBg").remove();
        str.push("<div id='LotteryBg'>");
        var x = 26, y = 57;
        for (var i = 0; i < 9; i++) {
            str.push("<div class='LotteryBox1' id='lb" + i + "' style='top:" + y + "px;left:" + x + "px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.FuBenLotterySubmit(" + i + ");'></div>");
            x += 77;
            if (i != 0 && (i + 1) % 3 == 0) {
                x = 23;
                y += 57;
            }
        }
        str.push("<div class='DefaultFont' style='width:110px;top:70px;left:270px;color:#8B4625;font-size:13px;'>◆ 每次通过副本都可抽取对应副本的奖励</div>");
        str.push("<div class='DefaultFont' style='width:110px;top:130px;left:270px;color:#8B4625;font-size:13px;'>◆ 免费抽奖1次</div>");
        str.push("<div class='DefaultFont' style='width:110px;top:148px;left:270px;color:#8B4625;font-size:13px;'>◆ VIP4免费+1次</div>");
        str.push("<div class='DefaultFont' style='width:110px;top:166px;left:270px;color:#8B4625;font-size:13px;'>◆ VIP5免费+2次</div>");
        str.push("<div class='DefaultFont' style='width:110px;top:184px;left:270px;color:#8B4625;font-size:13px;'>◆ 萌币抽奖2次</div>");
        str.push("<div class='ButtonSmall' id='closeLoBg' style='background:url(res/FuBen/CopyOK2.png) no-repeat;top:246px;left:177px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) if(CampaignClass.LotteryNum>=FunBenJson.data.freenum){$(\"#mask2\").remove();$(\"#LotteryBg\").remove();CampaignClass.LotteryNum=0;}'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("FuBengDialog").appendChild(divnode);
    },

    FuBenLotterySubmit: function (index) {
        if (isSubmit)
            return;
        if (CampaignClass.LotteryNum == FunBenJson.data.freenum + 2)
            return;

        if (CampaignClass.LotteryNum >= FunBenJson.data.freenum) {
            ShowMessage("是否花费" + ((CampaignClass.LotteryNum - FunBenJson.data.freenum + 1) * 10) + "萌币继续抽奖？", function () {
                $("#other").html(""); $("#mask1").remove();
                if (UserJson.Gold < ((CampaignClass.LotteryNum - FunBenJson.data.freenum + 1) * 10)) {
                    showTextMess("萌币不足", 0);
                    return;
                }
                isSubmit = true;
                window.GameMainClass.sendRequestJson(1104, '{"pos":' + index + ',"flag":1}', "FuBenLotteryBack");
            }, function () { $("#other").html(""); $("#mask1").remove(); });
        }
        else {
            isSubmit = true;
            window.GameMainClass.sendRequestJson(1104, '{"pos":' + index + ',"flag":1}', "FuBenLotteryBack");
        }
    },

    //显示征战点信息
    showCompaignPoint: function (pointid, mapid, comid, usermapid, usercomid) {
        if (pointid == UserBattleJson.data[0].CrusadePoint) {
            $("#mask2").remove();
            var str = new Array();
            str.push("<div id='mask2' class='mask2 opacity2'></div>"); //
            if (UserBattleJson.data[0].CrusadeTime > 0) {
                $("#CrusadeDialong").remove();
                str.push("<div id='CrusadeDialong'>");
                str.push("<div id='HeroDataMessageClose' style='left:175px;top:-5px;'><a href='javascript:void(0);'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#CrusadeDialong\").remove();$(\"#mask2\").remove();}'></a></div>");

                var HeroIndex = 0;
                for (; HeroIndex < HeroJson.data[0].HeroList.length; HeroIndex++) {
                    if (HeroJson.data[0].HeroList[HeroIndex].Id == UserBattleJson.data[0].CrusadeHero)
                        break;
                }
                var localindex = 0;
                for (; localindex < GeneralsJson.length; localindex++) {
                    if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId) {
                        break;
                    }
                }
                str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:43px;left:25px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[HeroIndex].Qualification + ".png) no-repeat;'");
                var namecolor = '#00CCFF';
                switch (HeroJson.data[0].HeroList[HeroIndex].Qualification) {
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
                str.push("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv));
                str.push("</div>");
                str.push("<div class='DefaultFont_14 RedFont' id='CrusadeTimeLabel' style='top:73px;left:77px;'></div>");
                str.push("<div class='ButtonSmall'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.StopTime(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + ",0);' id='EndCrusadeTimeBtn' style='top:68px;left:148px;width:52px;height:28px;background:url(res/dialog/ClearTime.png) no-repeat;'></div>");
                str.push("</div>");
            }
            else {
                if (CampaignClass.RewardData == null) {
                    window.GameMainClass.sendRequestJson(1091, '{"isAuto":2,"pointid":' + pointid + ',"mapid":' + mapid + ',"comid":' + comid + ',"usermapid":' + usermapid + ',"usercomid":' + usercomid + '}', "battleAutoStopResert");
                    return;
                }

                $("#CrusadeResertDialog").remove();
                str.push("<div id='CrusadeResertDialog'>");
                str.push("<div class='icon' style='background:url(res/BattleMap/Icon_Battle.png) no-repeat;'></div><div class='dialogTitle' style='background:url(res/BattleMap/Txt_AonB.png) no-repeat;width:117px;'></div>");
                var temps = UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == 0 ? 0 : (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal - 1);

                if (CampaignClass.RewardData.GoodsList != "") {
                    var goodslist = CampaignClass.RewardData.GoodsList.split(',');
                    left = 37;
                    str.push("<div id='goodsbox'>");
                    for (var i = 0; i < goodslist.length; i++) {
                        str.push("<div class='Skill' id='Goods" + i + "' ");
                        for (var m = 0; m < GoodsJson.length; m++) {
                            if (GoodsJson[m].ItemId == goodslist[i]) {
                                str.push("style='top:92px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + i + ",3);'");
                                break;
                            }
                        }
                        str.push(">" + (getNumSmall("X" + String(CampaignClass.RewardData.GoodsCount.split(',')[i]), 1, 2)) + "</div>");
                        left += 45;
                    }
                    str.push("</div>");
                }
                //获得奖励
                var RewardList = CampaignClass.RewardData.EXPList.split(',');
                var left = 31, top = 178;
                str.push("<div id='rewarddiv'>");
                for (var i = 0; i < RewardList.length; i++) {
                    if (i == 1)
                        continue;
                    if (RewardList[i] != 0) {
                        str.push("<div class='RewardIcon' id='Reward" + i + "' style='top:" + top + "px;left:" + left + "px;background-position:0 -" + (i * 19) + "px;'>");
                        str.push("<div class='DefaultFont_14 GoldFont' style='line-height:25px;left:58px;width:100px;'>" + RewardList[i] + "</div></div>");
                        top += 22;
                    }
                }
                str.push("</div>");
                //武将头像
                var HeroIndex = 0;
                for (; HeroIndex < HeroJson.data[0].HeroList.length; HeroIndex++) {
                    if (UserBattleJson.data[0].CrusadeHero == HeroJson.data[0].HeroList[HeroIndex].Id)
                        break;
                }
                var LocalIndex = 0;
                for (; LocalIndex < GeneralsJson.length; LocalIndex++) {
                    if (GeneralsJson[LocalIndex].HeroId == HeroJson.data[0].HeroList[HeroIndex].HeroId)
                        break;
                }
                var namecolor = '#00CCFF';
                switch (HeroJson.data[0].HeroList[HeroIndex].Qualification) {
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
                str.push("<div class='HeroHead' style='top:174px;left:211px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[HeroIndex].Qualification + ".png) no-repeat;'><img src='res/HeroHead/" + GeneralsJson[LocalIndex].Imgid + ".png' style='position:absolute;' /><div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[LocalIndex].Name + "</div><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv) + "</div>");
                str.push("<div class='RewardIcon' id='Reward1' style='top:221px;left:174px;background-position:0 -19px;'>");
                str.push("<div class='DefaultFont_14 GoldFont' style='left:58px;width:100px;line-height:25px;'>" + RewardList[1] + "</div></div>");

                str.push("<div class='ButtonSmall' style='top:249px;left:140px;background:url(res/BattleMap/BntAon4.png) no-repeat;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){UserBattleJson.data[0].CrusadePoint=0;UserBattleJson.data[0].CrusadeHero=0;UserBattleJson.data[0].CrusadeTime=0;$(\"#CrusadeResertDialog\").remove();$(\"#mask2\").remove();CampaignClass.LoadMap(" + (mapid + 1) + ");}'></div>");

                str.push("</div>");
            }
            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");

            document.getElementById("dialogMain").appendChild(divnode);
            return;
        }
        $("#CampaignDialog").remove();
        $("#mask2").remove();
        var str = new Array();
        var temps = UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == 0 ? 0 : (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal - 1);

        CampaignClass.tempid = temps;
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='CampaignDialog'>");
        str.push("<div class='close' style='left:359px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#CampaignDialog\").remove();$(\"#mask2\").remove();}'></div>");

        str.push("<div class='icon' style='background:url(res/BattleMap/Icon_Battle.png) no-repeat;'></div>");
        str.push("<div class='dialogTitle'>" + BattleJson[mapid].list[comid].BattleName + "</div>");
        //str.push("<div id='Mbatitle' style='background-position:0 -" + String((BattleJson[mapid].list[comid].titleindex) * 32) + "px;'></div>");
        str.push("<div id='CHeroHand' class='HeroHead' style='top:48px;left:18px;background:url(res/HeroHead/" + BattleJson[mapid].list[comid].HandIcon.split(",")[temps] + ".png) no-repeat;'></div>");
        str.push("<div id='MbDetial'><font style='color:#260100'>" + BattleJson[mapid].list[comid].NpcName.split(",")[temps] + "：</font>" + BattleJson[mapid].list[comid].detail.split("|")[temps] + "</div>");
        var state = "";
        if (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == UserBattleJson.data[0].mapdata[usermapid].list[usercomid].CardVal) {
            if (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ispass)
                state = "已通关";
            else
                state = (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == 0 ? 1 : UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal) + "/" + UserBattleJson.data[0].mapdata[usermapid].list[usercomid].CardVal;
        }
        else
            state = (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == 0 ? 1 : UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal) + "/" + UserBattleJson.data[0].mapdata[usermapid].list[usercomid].CardVal;
        str.push("<div class='DefaultFont_14 RedFont' id='divPointShow' style='top:98px;left:84px'>" + state + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='divLv' style='top:98px;left:204px;'>" + BattleJson[mapid].list[comid].battleLV.split(",")[temps] + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:98px;left:314px;'>1</div>");
        str.push("<div id='PointDiv'>");
        var left = 18;
        for (var i = 0; i < UserBattleJson.data[0].mapdata[usermapid].list[usercomid].CardVal; i++) {
            str.push("<div class='PintButton' style='left:" + left + "px;");

            if (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal == 0) {
                if (i == 0)
                    str.push("background-position:-76px 0;");
                str.push("'>" + (i + 1) + "</div>");
            }
            else { //&& UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ispass
                if ((i + 1) < UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal) {
                    str.push("background-position:-38px 0;");
                    str.push("'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.checkPoint(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + i + ");'>" + (i + 1) + "</div>");
                }
                else if ((i + 1) == UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal) {
                    str.push("background-position:-76px 0;");
                    str.push("'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)CampaignClass.checkPoint(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + i + ");'>" + (i + 1) + "</div>");
                }
                else
                    str.push("'>" + (i + 1) + "</div>");
            }

            left += 51;
        }

        str.push("</div>");
        //获得奖励
        var RewardList = BattleJson[mapid].list[comid].Reward.split('|')[temps].split(",");
        var left = 18, top = 192;
        str.push("<div id='rewarddiv'>");
        for (var i = 0; i < RewardList.length; i++) {
            if (i != 0) {
                if (i % 2 == 0) {
                    top += 22;
                    left = 18;
                }
                else
                    left += 110;
            }

            if (RewardList[i] != "0") {
                str.push("<div class='RewardIcon' id='Reward" + i + "' style='top:" + top + "px;left:" + left + "px;background-position:0 -" + (i * 19) + "px;'>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:3px;left:58px;width:100px;'>" + RewardList[i] + "</div></div>");
            }
        }
        str.push("</div>");
        var goodslist = BattleJson[mapid].list[comid].GetItem.split('|')[temps].split(",");
        left = 40;
        str.push("<div id='goodsbox'>");
        for (var i = 0; i < 4; i++) {
            str.push("<div class='Skill' id='Goods" + i + "' ");
            if (goodslist.length > i) {
                if (goodslist[i] != 0) {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == goodslist[i])
                            str.push("style='top:237px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + i + ",1);'");
                    }
                }
            }
            str.push("></div>");
            left += 45;
        }

        str.push("</div>");
        //自动讨伐按钮
        str.push("<div id='AutomaticCrusadeButs'>");
        if (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ispass && UserBattleJson.data[0].CrusadePoint == 0)
            str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle1.png) no-repeat;top:190px;left:272px;width:104px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.AutomaticCrusade(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + temps + ");'></div>");
        else {
            str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle2.png) no-repeat;top:190px;left:272px;width:104px;'></div>");
        }
        str.push("<div id='CaBut' class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle.png) no-repeat;top:235px;left:272px;width:104px;'ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startBattle(" + Number(UserBattleJson.data[0].mapdata[usermapid].mapid) + "," + Number(UserBattleJson.data[0].mapdata[usermapid].list[usercomid].id) + "," + Number(temps + 1) + ");'></div>");
        str.push("</div></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        //SetBattleData('{"FubenID":8000,"FubenOpened":{"FubenID":8000,"InPoint":1,"ItemStr":"6003,6550,6601,6611,7000,7006,7012,7018,7024","LineID":0,"NeedLv":15,"TigerSignNum":2,"TodayNot":3},"list":[{"CardVal":5,"ComVal":5,"id":1004,"ispass":true,"type":1},{"CardVal":3,"ComVal":1,"id":1005,"ispass":false,"type":1}],"mapid":1,"newMapId":2}');
    },

    //自动讨伐时间结束
    StopTime: function (pointid, mapid, comid, usermapid, usercomid, isAuto) {
        if (isAuto == 1) {
            window.GameMainClass.sendRequestJson(1091, '{"isAuto":1,"pointid":' + pointid + ',"mapid":' + mapid + ',"comid":' + comid + ',"usermapid":' + usermapid + ',"usercomid":' + usercomid + '}', "battleAutoStopResert");
        }
        else {
            if (document.getElementById("message") == null)
                $("#other").html("");
            var needmoney = parseInt(UserBattleJson.data[0].CrusadeTime / (12 * 60)) + (UserBattleJson.data[0].CrusadeTime % (12 * 60) == 0 ? 0 : 1);
            needmoney = needmoney == 0 ? 1 : needmoney;
            ShowMessage("立即完成一共需要" + needmoney + "萌币，是否立即完成？", function () {
                $("#other").html(""); $("#mask1").remove();
                if (UserJson.Gold < needmoney) {
                    ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                    return;
                }
                else
                //battleAutoStopResert('{"Client":[{"isAuto":0,"pointid":1000,"mapid":0,"comid":0,"usermapid":0,"usercomid":0}],"EXPList":"5,10,200,0","GoodsCount":"","GoodsList":"","info":"自动完成成功","resert":1}');
                    window.GameMainClass.sendRequestJson(1091, '{"isAuto":0,"pointid":' + pointid + ',"mapid":' + mapid + ',"comid":' + comid + ',"usermapid":' + usermapid + ',"usercomid":' + usercomid + '}', "battleAutoStopResert");
            },
             function () {
                 $("#other").html(""); $("#mask1").remove();
             });
        }
    },

    //点击不同的征战点
    checkPoint: function (pointid, mapid, comid, usermapid, usercomid, showpointid) {
        CampaignClass.tempid = showpointid;
        var str = new Array();

        var left = 18;
        for (var i = 0; i < UserBattleJson.data[0].mapdata[usermapid].list[usercomid].CardVal; i++) {
            str.push("<div class='PintButton' style='left:" + left + "px;");

            if (i == showpointid) {
                str.push("background-position:-76px 0;");
                str.push("' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.checkPoint(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + i + ");'>" + (i + 1) + "</div>");
            }
            else {
                if (i < UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal) {
                    str.push("background-position:-38px 0;");
                    str.push("' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.checkPoint(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + i + ");'>" + (i + 1) + "</div>");
                }
                else
                    str.push("'>" + (i + 1) + "</div>");
            }

            left += 51;
        }
        $("#PointDiv").html(str.join(""));
        $("#CHeroHand").css({ "background": "url(res/HeroHead/" + BattleJson[mapid].list[comid].HandIcon.split(",")[showpointid] + ".png) no-repeat" });
        $("#MbDetial").html("<font style='color:#260100'>" + BattleJson[mapid].list[comid].NpcName.split(",")[showpointid] + "：</font>" + BattleJson[mapid].list[comid].detail.split("|")[showpointid]);
        $("#divLv").html(BattleJson[mapid].list[comid].battleLV.split(",")[showpointid]);

        var goodslist = BattleJson[mapid].list[comid].GetItem.split('|')[CampaignClass.tempid].split(",");
        str = new Array();
        left = 40;
        for (var i = 0; i < 4; i++) {
            str.push("<div class='Skill' id='Goods" + i + "' ");
            if (goodslist.length > i) {
                if (goodslist[i] != 0) {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == goodslist[i])
                            str.push("style='top:237px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + i + ",1);'");
                    }
                }
            }
            str.push("></div>");
            left += 45;
        }
        $("#goodsbox").html(str.join(""));
        str = new Array();
        //获得奖励
        $(".RewardIcon").remove();
        var RewardList = BattleJson[mapid].list[comid].Reward.split('|')[CampaignClass.tempid].split(",");
        var left = 18, top = 192;
        for (var i = 0; i < RewardList.length; i++) {
            if (i != 0) {
                if (i % 2 == 0) {
                    top += 22;
                    left = 18;
                }
                else
                    left += 110;
            }
            if (RewardList[i] != "0") {
                str.push("<div class='RewardIcon' id='Reward" + i + "' style='top:" + top + "px;left:" + left + "px;background-position:0 -" + (i * 19) + "px;'>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:2px;left:58px;width:100px;'>" + RewardList[i] + "</div></div>");
            }
        }
        $("#rewarddiv").html(str.join(""));

        str = new Array();
        //自动讨伐按钮
        if (UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ispass && UserBattleJson.data[0].CrusadePoint == 0)
            str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle1.png) no-repeat;top:190px;left:272px;width:104px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.AutomaticCrusade(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + showpointid + ");'></div>");
        else {
            //            if ((showpointid + 1) >= UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal)
            //                str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle2.png) no-repeat;top:190px;left:272px;width:104px;'></div>");
            //            else {
            if (UserBattleJson.data[0].CrusadePoint == 0 && showpointid < UserBattleJson.data[0].mapdata[usermapid].list[usercomid].ComVal - 1)
                str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle1.png) no-repeat;top:190px;left:272px;width:104px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.AutomaticCrusade(" + pointid + "," + mapid + "," + comid + "," + usermapid + "," + usercomid + "," + showpointid + ");'></div>");
            else
                str.push("<div class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle2.png) no-repeat;top:190px;left:272px;width:104px;'></div>");
            //}
        }
        str.push("<div id='CaBut' class='ButtonOther' style='background:url(res/BattleMap/ButtonBattle.png) no-repeat;top:235px;left:272px;width:104px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startBattle(" + Number(UserBattleJson.data[0].mapdata[usermapid].mapid) + "," + Number(UserBattleJson.data[0].mapdata[usermapid].list[usercomid].id) + "," + Number(showpointid + 1) + ");'></div>"); //
        $("#AutomaticCrusadeButs").html(str.join(""));
    },
    //    tempclick: function () {
    //        SetBattleData('{"FubenID":0,"FubenOpened":{},"TotalNOT":0,"list":[{"CardVal":5,"ComVal":5,"id":1007,"ispass":true,"type":1},{"CardVal":5,"ComVal":1,"id":1008,"ispass":false,"type":1}],"mapid":2,"newMapId":2}');
    //    },

    //显示物品信息
    ShowGoodsData: function (GoodsIndex, boxindex, pagetype) {
        $("#showDatacam").remove();
        $("body").stopTime("showDatacam");

        var str = new Array();

        var left = (boxindex + 1) * 45 + 35, top = 15;
        if (pagetype == 2) {
            left += 40;
            top = 101;
        }
        if (pagetype == 3)
            top = 75;
        if (pagetype == 5) {
            top = 16;
            left = 130;
        }
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

        str.push("<div class='showData' id='showDatacam' style='" + (pagetype == 1 ? "bottom:" : "top:") + top + "px;left:" + left + "px;z-index:35;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#showDatacam\").remove();clearTimeout(CampaignClass.timer);clearTimeout(CampaignClass.timer1);}'></a></div>");
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
        if (pagetype == 1)
            document.getElementById("CampaignDialog").appendChild(divnode);
        else if (pagetype == 2)
            document.getElementById("AutomaticCrusadeDialog").appendChild(divnode);
        else if (pagetype == 3)
            document.getElementById("CrusadeResertDialog").appendChild(divnode);
        else {
            document.getElementById("CampaignDiv1").appendChild(divnode);
        }

        $("body").oneTime("3s", "showDatacam", function () {
            $("body").stopTime("showDatacam");
            var i = 100;
            $("body").everyTime("20ms", "showDatacam", function () {
                i--;
                document.getElementById("showDatacam").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showDatacam").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showDatacam");
                    $("#showDatacam").remove();
                }
            });
        });
    },

    //自动讨伐
    AutomaticCrusade: function (pointid, mapid, comid, usermapid, usercomid, showpointid) {
        var str = new Array();
        $("#AutomaticCrusadeDialog").remove();
        $("#mask3").remove();
        CampaignClass.AutomaticCrusadeHero = -1;
        str.push("<div id='mask3' class='mask2 opacity2'></div>");
        str.push("<div id='AutomaticCrusadeDialog'>");
        str.push("<div class='close' style='left:359px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#AutomaticCrusadeDialog\").remove();$(\"#mask3\").remove();}'></div>");
        str.push("<div class='icon' style='background:url(res/BattleMap/Icon_Battle.png) no-repeat;'></div><div class='dialogTitle' style='background:url(res/BattleMap/Txt_AonB.png) no-repeat;width:117px;'></div>");
        var left = 53, top = 55;
        var RewardList = BattleJson[mapid].list[comid].Reward.split('|')[showpointid].split(",");
        for (var i = 0; i < RewardList.length; i++) {
            if (i != 0) {
                if (i % 2 == 0) {
                    top += 22;
                    left = 53;
                }
                else
                    left = 240;
            }
            if (RewardList[i] != "0") {
                str.push("<div class='RewardIcon'  style='top:" + top + "px;left:" + left + "px;background-position:0 -" + (i * 19) + "px;'>");
                str.push("<div class='DefaultFont_14 RedFont' id='RewardVal" + i + "' style='top:2px;left:58px;width:100px;'>" + RewardList[i] + "</div></div>"); //获得奖励
            }
        }
        left = 76;
        var goodslist = BattleJson[mapid].list[comid].GetItem.split('|')[showpointid].split(",");
        for (var i = 0; i < 4; i++) {
            str.push("<div class='Skill' id='Goods" + i + "' ");
            if (goodslist.length > i) {
                if (goodslist[i] != 0) {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == goodslist[i])//获得的物品
                            str.push("style='top:101px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ShowGoodsData(" + m + "," + i + ",2);'");
                    }
                }
            }
            str.push("></div>");
            left += 45;
        }
        str.push("<div class='ButtonSmall' style='background:url(res/BattleMap/BntAon1.png) no-repeat;top:221px;left:51px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ChooseHero(1);'></div>"); //选择武将按钮
        str.push("<div class='ButtonSmall' style='background:url(res/BattleMap/BntAon2.png) no-repeat;top:168px;left:317px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.SetNumTimet(3," + mapid + "," + comid + "," + showpointid + ");'></div>"); //最大数量按钮
        str.push("<div class='DefaultFont_14 RedFont' id='ActionShow' style='top:230px;left:185px'>1</div>"); //花费的行动点
        str.push("<div class='DefaultFont_14 RedFont' id='Times' style='top:202px;left:185px'>" + expireTime(BattleJson[mapid].list[comid].time.split(',')[showpointid]) + "</div>"); //花费的时间
        str.push("<div class='AddButtonLeft' id='MoveBut' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)CampaignClass.SetNumTimet(1," + mapid + "," + comid + "," + showpointid + ");' style='top:168px;left:182px;'></div><div style='top:168px;left:268px;' id='AddBut'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)CampaignClass.SetNumTimet(2," + mapid + "," + comid + "," + showpointid + ");' class='AddButtonRight AddrightOn'></div>");
        str.push("<div class='PageNumber' id='NumTime' style='top:170px;left:214px;width:50px;height:24px;text-align:center;'>1</div>"); //征战次数
        str.push("<div class='ButtonOther' style='background:url(res/BattleMap/BntAon3.png) no-repeat;top:218px;left:271px;width:104px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)CampaignClass.AutomaticCrusadeSubmit(" + BattleJson[mapid].list[comid].id + "," + showpointid + ");'></div>"); //开始征战
        str.push("<div class='HeroHead' id='HeroHeadBox' style='top:171px;left:55px;'></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("CampaignDialog").appendChild(divnode);

    },

    AutomaticCrusadeSubmit: function (commid, pointid) {
        if (CampaignClass.AutomaticCrusadeHero == -1) {
            showTextMess("请选择讨伐的武将", 0);
        }
        else {
            window.GameMainClass.battleAutoStart(Number(commid), Number(pointid + 1), HeroJson.data[0].HeroList[CampaignClass.AutomaticCrusadeHero].Id, Number($("#NumTime").html()));
        }
    },

    /*更改讨伐数量*/
    SetNumTimet: function (type, mapid, comid, showpointid) {
        //获得当前讨伐次数
        var nowcount = Number($("#NumTime").html());
        var maxcount = 10;
        if (UserJson.ActionPs < maxcount)
            maxcount = UserJson.ActionPs;

        switch (type) {
            case 1:
                //减少数量
                if (nowcount <= 1)
                    return;

                if (nowcount == maxcount) {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight AddrightOn");
                }

                if (nowcount <= 2) {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft");
                }
                else {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft AddleftOn");
                }

                $("#NumTime").html(nowcount - 1);
                nowcount -= 1;
                break;

            case 2:
                //增加数量

                if (nowcount >= maxcount)
                    return;

                if (nowcount == 1) {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft AddleftOn");
                }

                if (nowcount >= maxcount - 1) {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight");
                }
                else {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight AddrightOn");
                }
                $("#NumTime").html(nowcount + 1);
                nowcount += 1;
                break;
            case 3:
                //增加数量

                if (nowcount >= maxcount)
                    return;

                $("#MoveBut").removeClass();
                $("#MoveBut").addClass("AddButtonLeft AddleftOn");

                $("#AddBut").removeClass();
                $("#AddBut").addClass("AddButtonRight");

                $("#NumTime").html(maxcount);
                nowcount = maxcount;
                break;
        }

        var RewardList = BattleJson[mapid].list[comid].Reward.split('|')[showpointid].split(",");
        for (var i = 0; i < RewardList.length; i++) {
            $("#RewardVal" + i).html(Number(RewardList[i]) * nowcount);
        }
        $("#ActionShow").html(nowcount);
        $("#Times").html(expireTime((Number(BattleJson[mapid].list[comid].time.split(',')[showpointid]) * nowcount)));
    },

    //选择讨伐的武将
    ChooseHero: function (pageindex) {
        var str = new Array();
        $("#ChooseHeroDialog").remove();
        $("#mask4").remove();
        str.push("<div id='mask4' class='mask2 opacity2'></div>");
        str.push("<div id='ChooseHeroDialog'>");
        str.push("<div class='close' style='left:329px;top:-10px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#ChooseHeroDialog\").remove();$(\"#mask4\").remove();}'></div>");

        var len = HeroJson.data[0].HeroList.length;
        var startindex = (pageindex - 1) * 7;
        var endindex = 7;
        var maxpage = 1;
        if (len > 7) {
            maxpage = parseInt(len / 7) + (len % 7 == 0 ? 0 : 1);
        }

        if (len <= 7)
            endindex = len;
        else if (pageindex <= len / 7) {
            endindex = startindex + 7;
        }
        else {
            endindex = startindex + len % 7;
        }


        var top = 43, left = 23;
        for (var i = startindex; i < endindex; i++) {
            //获取该武将对应的本地数据
            var localindex = 0;
            for (; localindex < GeneralsJson.length; localindex++) {
                if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[i].HeroId) {
                    break;
                }
            }

            str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:" + top + "px;left:" + left + "px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[i].Qualification + ".png) no-repeat;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)CampaignClass.PickHero(" + i + "," + localindex + ");'");
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
            str.push("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[i].Hlv));
            switch (HeroJson.data[0].HeroList[i].State2) {
                case 1: //征战中
                    str.push("<div class='HeroState HasPlayed' id='HeroHP" + i + "'></div>");
                    break;
                case 2: //讨伐中
                    str.push("<div class='HeroState HasCrusade' id='HeroHP" + i + "'></div>");
                    break;
            }

            str.push("</div>");
            left += 51;
        }

        if (pageindex != 1) {
            str.push("<div class='ButtonLeft leftOn'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ChooseHero(" + String(pageindex - 1) + ");'");
        }
        else
            str.push("<div class='ButtonLeft'");

        str.push(" style='left:141px;top:110px;'></div>");
        if (pageindex < maxpage) {
            str.push("<div class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CampaignClass.ChooseHero(" + String(pageindex + 1) + ");'");
        }
        else
            str.push("<div class='ButtonRight'");
        str.push(" style='left:227px;top:110px;' ></div>");
        str.push("<div class='PageNumber' style='top:112px;left:173px;width:50px;height:24px;text-align:center;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("AutomaticCrusadeDialog").appendChild(divnode);

    },

    //选中武将
    PickHero: function (HeroIndex, LocalIndex) {
        //如果状态是正在讨伐中的，不允许使用
        if (HeroJson.data[0].HeroList[HeroIndex].State2 == 2)
            return;
        //如果是在阵型中， 则判断是不是阵型中的最后一个武将
        if (HeroJson.data[0].HeroList[HeroIndex].State2 == 1) {
            //判断当前阵型中武将的数量
            var FormationHero = UserJson.FormationHero.split(",");
            var len = 0;
            for (var i = 0; i < FormationHero.length; i++) {
                if (Number(FormationHero[i]) > 0) {
                    len++;
                }
            }

            if (len > 1) {
                ShowMessage("此武将当前在阵型中，是否将武将下阵用于讨伐？", function () {
                    $("#message").remove(); $("#mask1").remove();
                    CampaignClass.AutomaticCrusadeHero = HeroIndex;
                    //通知服务器下阵该武将
                    window.GameMainClass.sendRequestJson(1096, '{"Gid":' + HeroJson.data[0].HeroList[HeroIndex].Id + '}', "UpdateHeroState2");
                    $("#HeroHeadBox").css({ "background": "url(res/HeroHead/" + GeneralsJson[LocalIndex].Imgid + ".png) no-repeat" });
                    var namecolor = '#00CCFF';
                    switch (HeroJson.data[0].HeroList[HeroIndex].Qualification) {
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
                    $("#HeroHeadBox").html("<div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[LocalIndex].Name + "</div><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv));
                    $("#ChooseHeroDialog").remove();
                    $("#mask4").remove();
                },
             function () {
                 $("#message").remove(); $("#mask1").remove();
             });
            }
            else {
                ShowMessage("此武将为阵形中最后一个武将，不能下阵!");
            }
        }
        else {
            CampaignClass.AutomaticCrusadeHero = HeroIndex;
            $("#HeroHeadBox").css({ "background": "url(res/HeroHead/" + HeroJson.data[0].HeroList[HeroIndex].Qualification + ".png) no-repeat" });
            var namecolor = '#00CCFF';
            switch (HeroJson.data[0].HeroList[HeroIndex].Qualification) {
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
            $("#HeroHeadBox").html("<img src='res/HeroHead/" + GeneralsJson[LocalIndex].Imgid + ".png' style='position:absolute;' /><div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[LocalIndex].Name + "</div><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv));
            $("#ChooseHeroDialog").remove();
            $("#mask4").remove();
        }
    }
}