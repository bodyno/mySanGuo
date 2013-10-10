
var ActivityClass =
{
    LoadActivity: function () {
        $("#activitybg").remove();
        var str = new Array();
        str.push('<div id="album4"  style="width:371px;height:220px;top:49px;left:49px;" class="album"><div class="paging">');
        var len = 0, left = 0;

        for (var i = 0; i < ActivityJson.data.ActivityList.length; i++) {
            if (i % 2 == 0) {
                str.push("<div class='page pagediv' style='width:371px;height:220px;'>");
            }
            len++;
            str.push("<div id='activitybg'>");

            if (ActivityJson.data.ActivityList[i].isOnline) {
                str.push("<div class='ActivityBox' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) " + ActivityJson.data.ActivityList[i].Afunction + ";' style='background:url(res/activity/" + ActivityJson.data.ActivityList[i].id + ".png) no-repeat;left:" + left + "px;'></div>");
            }
            else {
                str.push("<div class='ActivityBox' style='background:url(res/activity/" + ActivityJson.data.ActivityList[i].id + "s.png) no-repeat;left:" + left + "px;'>");
                str.push("<img src='res/activity/ActNotOpen.png' style='left:9px;top:73px;position:absolute;' /></div>");
            }

            left += 191;
            str.push("</div>");
            if (i == ActivityJson.data.ActivityList.length - 1) {
                len = 0;
                str.push("<div class='ActivityBox' style='background:url(res/activity/0.png) no-repeat;left:" + left + "px;'></div>");
                str.push("</div>");
            }
            if (len == 2) {
                str.push("</div>");
                if (i == ActivityJson.data.ActivityList.length - 1) {
                    str.push("<div class='ActivityBox' style='background:url(res/activity/0.png) no-repeat;left:" + left + "px;'></div>");
                }
                left = 0;
                len = 0;
            }
        }
        str.push("</div></div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $('#album4').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".page",
            bounce: false
        });
    },

    //世界boss
    LoadBossOfWorld: function () {
        $("#BossOfWorldDia").remove();
        var str = new Array();
        //击杀排名
        var top = 63;
        str.push("<div style='position:absolute;z-index:1;width:137px;height:256px;background:url(res/activity/Boss_Bg1.png) no-repeat;top:32px;left:12px;'></div>");
        str.push("<div style='position:absolute;z-index:1;width:137px;height:252px;background:url(res/activity/Boss_Bg3.png) no-repeat;top:36px;left:302px;'></div>");
        str.push("<div id='RankList'>");
        for (var i = 0; i < BossOfWoldJson.data.RankList.length; i++) {
            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:20px;font-size:12px;'>" + (i + 1) + "." + BossOfWoldJson.data.RankList[i].name + "</div>");
            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:102px;font-size:12px;'>" + BossOfWoldJson.data.RankList[i].discount + "%</div>");
            top += 19;
        }
        str.push("</div>");
        //我的战况
        str.push("<div class='DefaultFont RedFont' style='top:242px;left:23px;font-size:12px;'>" + UserJson.UName + "</div>");
        str.push("<div class='DefaultFont RedFont' style='top:242px;left:102px;font-size:12px;'>" + BossOfWoldJson.data.SelfZK + "</div>");
        str.push("<div class='DefaultFont RedFont' style='top:260px;left:23px;font-size:12px;'>击杀总血量</div>");
        str.push("<div class='DefaultFont RedFont' style='top:260px;left:102px;font-size:12px;'>" + BossOfWoldJson.data.SelfDis + "%</div>");

        str.push("<div id='Experience' style='background:url(res/activity/BossWar_Hp.png) no-repeat;height:16px;max-width:137px;width:" + BossOfWoldJson.data.HpDiscount / 100 * 137 + "px;top:62px;left:157px;'></div>");
        str.push("<div id='HpNum' class='DefaultFont_14' style='width:137px;height:16px;top:62px;left:157px;font-size:14px;color:white;text-align:center;line-height:16px;'>" + BossOfWoldJson.data.HpDiscount + "%</div>");
        str.push("<div class='DefaultFont' style='top:200px;left:255px;'><img style='position:absolute;'src='res/dialog/Lv_Txt.png' />" + getLvNum(BossOfWoldJson.data.bossLv, 1) + "</div>");
        if (BossOfWoldJson.data.HpDiscount > 0)
            str.push("<div class='ButtonBig' style='width:141px;height:139px;background:url(res/activity/BossYJ.png) no-repeat;left:156px;top:80px;'></div>");
        else {
            str.push("<div class='ButtonBig' style='width:141px;height:139px;background:url(res/activity/BossYJ.png) no-repeat -141px 0 ;left:156px;top:80px;'></div>");
            str.push("<div class='DefaultFont_14' style='height:21px;width:141px;top:177px;left:156px;text-align:center;line-height:21px;color:white;'>被" + BossOfWoldJson.data.lastkillnick + "击杀</div>");
        }
        //击杀按钮
        if (BossOfWoldJson.data.HpDiscount > 0 && coolingtime < 1 && BossOfWoldJson.data.isLit)
            str.push("<div class='ButtonSmall' id='KillButton' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.startWorldBoss();' style='background:url(res/activity/BossWarBut1.png) no-repeat;height:44px;width:80px;top:245px;left:186px;'></div>");
        else
            str.push("<div class='ButtonSmall' id='KillButton' style='background:url(res/activity/BossWarBut2.png) no-repeat;height:44px;width:80px;top:245px;left:186px;'></div>");

        str.push("<div class='DefaultFont_14 RedFont' id='CoolingTime' style='height:21px;width:72px;top:220px;left:222px;text-align:left;line-height:21px;'>");
        if (BossOfWoldJson.data.isLit == 0)
            str.push("等待中</div>");
        else {
            if (coolingtime < 1)
                str.push("00:00:00</div>");
            str.push("<div class='DefaultFont_14 RedFont' style='left:160px;top:81px;font-weight:200;'>挑战倒计时:<font id='bossendtime'>" + expireTime(BossOfWoldJson.data.leftkilltime) + "</font></div>");
        }

        top = 89;
        //领取奖励
        for (var i = 0; i < 3; i++) {
            if (BossOfWoldJson.data.CompleteState.split(",")[i] == "1")
                str.push("<div class='ButtonSmall' id='BosswordReBut" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.BossOfWorldReward(" + (i + 1) + ");' style='background:url(res/city/Share_But1.png) no-repeat;height:38px;width:60px;top:" + top + "px;left:370px;'></div>");
            else if (BossOfWoldJson.data.CompleteState.split(",")[i] == "0")
                str.push("<div class='ButtonSmall' style='background:url(res/city/Share_But2.png) no-repeat;height:38px;width:60px;top:" + top + "px;left:370px;'></div>");
            else
                str.push("<div class='ButtonSmall' style='background:url(res/city/Share_Label.png) no-repeat;height:42px;width:66px;top:" + top + "px;left:365px;'></div>");

            top += 72;
        }
        str.push("<div class='ButtonSmall' id='showgiftinfo' style='z-index:20;width:45px;height:45px;top:158px;left:314px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowGiftInfo();'></div>");

        var divnode = document.createElement("div");
        divnode.id = 'BossOfWorldDia';
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        if (coolingtime > 0 && iscooling == false)
            CoolingtimeOfBoss();
        if (BossOfWoldJson.data.isLit)
            ActivityClass.BossTime();
    },

    boostimeend: false,
    BossTime: function () {
        if (ActivityClass.boostimeend)
            return;
        ActivityClass.boostimeend = true;
        $("body").everyTime("1s", "bossendtime", function () {
            if (BossOfWoldJson.data.leftkilltime > 0) {
                BossOfWoldJson.data.leftkilltime--;
                $("#bossendtime").html(expireTime(BossOfWoldJson.data.leftkilltime));
            }
            else {
                $("body").stopTime("bossendtime");
                $("#bossendtime").html("");
                ActivityClass.boostimeend = false;
            }
        });
    },

    ShowGiftInfo: function () {
        $("body").stopTime("BubbleData");
        $("#BubbleData1").remove();
        var str = new Array();
        str.push("<div id='BubbleData1' class='BubbleData' style='left:-100px;'>");
        str.push("<div id='BubbleDataUp'></div>");
        str.push("<div id='BubbleDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td>" + BossOfWoldJson.data.giftinfo + "</td></tr>");
        str.push("</table>");
        str.push("</div>");
        str.push("<div id='BubbleDataDown' ></div>");
        str.push("<div id='Arrow' style='left:95px;'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("showgiftinfo").appendChild(divnode);


        //获取被点击英雄头像的座标
        var h = $("#BubbleData1").height();

        var top = 0;
        if (h > 46)
            top = 0 - (h - 46) / 2;
        else
            top = (46 - h) / 2;
        $("#BubbleData1").css({ "top": top + "px" });
        $("#Arrow").css({ "top": (h - 14) / 2 + "px" });

        var satime = 1;
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
    },

    BossOfWorldReward: function (index) {
        window.GameMainClass.sendRequestJson(1129, '{ "rewardtype":' + index + '}', "BossOfWordRewardResert");
    },

    //加载祭拜
    LoadJiBai: function () {
        var str = new Array();
        var index = 1, len = 4;
        if (WorshipJson.data.type == 2) {
            index += 1;
            len += 1;
        }

        var ix = 45, mx = 64, bx = 64;
        for (; index < len; index++) {
            str.push("<div style='position:absolute;top:86px;left:" + ix + "px;background:url(res/activity/Worship/" + index + ".png) no-repeat;width:122px;height:140px;'></div>");
            str.push("<div class='DefaultFont_14 RedFont' style='top:229px;left:" + ix + "px;text-align:center;width:97px;'>祭拜可获得:</div><div class='ButtonSmall' style='background:url(res/dialog/Gem" + index + ".png) no-repeat;width:25px;height:25px;top:225px;left:" + (ix + 88) + "px;'></div>");
            str.push("<div class='DefaultFont_14 RedFont' id='sc" + index + "' style='top:247px;left:" + mx + "px;'>花费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;×" + WorshipJson.data.SwapCount.split(",")[index - 1] + "</div>");
            str.push("<div class='ButtonOther jbbtn' style='top:268px;left:" + bx + "px;background:url(res/activity/Worship/WorshipBut.png) no-repeat' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.StartJb(" + index + ");'></div>");
            ix += 128; mx += 128; bx += 128;
        }
        str.push("<div class='DefaultFont_14 RedFont' id='Gem11' style='top:63px;left:73px;'>" + PubJsonNew.data[0].GemBlue + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem12' style='top:63px;left:145px;'>" + PubJsonNew.data[0].GemPurple + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem13' style='top:63px;left:215px;'>" + PubJsonNew.data[0].GemRed + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem14' style='top:63px;left:287px;'>" + PubJsonNew.data[0].GemYellow + "</div>");
        str.push("<div class='DefaultFont RedFont' style='font-size:12px;top:52px;left:300px;width:120px;text-align:right'>距离结束还剩</div>");
        str.push("<div class='DefaultFont RedFont' id='jbtime' style='font-size:12px;top:68px;left:300px;width:120px;text-align:right;'>" + expireTime1(WorshipJson.data.leftseconds) + "</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        ActivityClass.LoadJbTime();
    },

    StartJb: function (index) {
        if (isSubmit)
            return;

        if (UserJson.Gold < Number(WorshipJson.data.SwapCount.split(",")[index - 1])) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        isSubmit = true;
        window.GameMainClass.sendRequestJson(1138, '{"DemType":' + index + '}', "ActivityClass.WorshipResert");
    },

    LoadJbTime: function () {
        if (isJb)
            return;
        isJb = true;

        $("body").everyTime("1s", "jbtime", function () {
            if (WorshipJson.data.leftseconds > 0) {
                $("#jbtime").html(expireTime1(WorshipJson.data.leftseconds));
                WorshipJson.data.leftseconds--;
            }
            else {
                $("body").stopTime("jbtime");
                $("#jbtime").html("已结束");
                isJb = false;
                $(".jbbtn").css("display", "none");
            }
        });
    },

    WorshipResert: function (json) {
        isSubmit = false;
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            var scount = WorshipJson.data.SwapCount.split(",");
            switch (BackJson.Client[0].DemType) {
                case 1:
                    PubJsonNew.data[0].GemBlue += BackJson.DemNum;
                    $("#Gem11").html(PubJsonNew.data[0].GemBlue);
                    break;
                case 2:
                    PubJsonNew.data[0].GemPurple += BackJson.DemNum;
                    $("#Gem12").html(PubJsonNew.data[0].GemPurple);
                    break;
                case 3:
                    PubJsonNew.data[0].GemRed += BackJson.DemNum;
                    $("#Gem13").html(PubJsonNew.data[0].GemRed);
                    break;
                case 4:
                    PubJsonNew.data[0].GemYellow += BackJson.DemNum;
                    $("#Gem14").html(PubJsonNew.data[0].GemYellow);
                    break;
            }
            updateGold(2, Number(scount[BackJson.Client[0].DemType - 1]));
            scount[BackJson.Client[0].DemType - 1] = BackJson.nextgold;
            var ss = "";
            for (var i = 0; i < scount.length; i++) {
                ss += scount[i];
                if (i != scount.length)
                    ss += ",";
            }
            $("#sc" + BackJson.Client[0].DemType).html("花费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;×" + BackJson.nextgold);
            WorshipJson.data.SwapCount = ss;
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    //加载神将界面
    LoadShenJiang: function () {
        var str = new Array();
        str.push("<div style='position:absolute;left:63px;background:url(res/activity/shenjiang/title/" + ShengJiangJson.data.groupid + ".png) no-repeat;width:349px;height:59px;'></div>");
        str.push("<div style='position:absolute;top:52px;left:122px;background:url(res/activity/shenjiang/GemGroup.png) no-repeat;width:306px;height:24px;'>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem21' style='top:4px;left:25px;'>" + PubJsonNew.data[0].GemBlue + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem22' style='top:4px;left:97px;'>" + PubJsonNew.data[0].GemPurple + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem23' style='top:4px;left:167px;'>" + PubJsonNew.data[0].GemRed + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem24' style='top:4px;left:239px;'>" + PubJsonNew.data[0].GemYellow + "</div>");
        str.push("</div>");
        var omx = 59, sbx = 32;
        str.push("<div style='position:absolute;top:74px;left:55px;background:url(res/activity/shenjiang/bg/" + ShengJiangJson.data.groupid + ".png) no-repeat;width:370px;height:166px;'>");
        for (var i = 0; i < 3; i++) {
            str.push("<div class='DefaultFont_14 GoldFont' style='top:94px;left:" + omx + "px;text-align:center;width:55px;'>" + ShengJiangJson.data.GeneralsList[i].OldGem + "</div>");
            str.push("<div style='position:absolute;left:" + omx + "px;top:99px;background:url(res/activity/shenjiang/AWomanArticle.png) no-repeat;width:55px;height:5px;z-index:60;'></div>");
            str.push("<div class='DefaultFont_14 GoldFont' style='top:113px;left:" + omx + "px;text-align:center;width:55px;'>" + ShengJiangJson.data.GeneralsList[i].NowGem + "</div>");
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowHeroData(" + i + ");' style='top:129px;left:" + sbx + "px;background:url(res/activity/shenjiang/AWomanBut2.png) no-repeat;'></div>");
            omx += 126;
            sbx += 126;
        }
        str.push("</div>");

        var bx = 78;
        for (var i = 0; i < 3; i++) {
            if (ShengJiangJson.data.GeneralsList[i].isOwn)
                str.push("<div class='HasRecruit' style='top:241px;left:" + bx + "px;'></div>");
            else
                str.push("<div class='ButtonOther sjbtn' id='sjbtn" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShengJiang_Recruit(" + i + ");' style='top:242px;left:" + bx + "px;background:url(res/activity/shenjiang/AWomanBut1.png) no-repeat;'></div>");
            bx += 126;
        }
        str.push("<div class='DefaultFont_14 RedFont' style='top:288px;left:68px;'>活动结束时间:<font id='sjtime'>" + expireTime1(ShengJiangJson.data.leftseconds) + "</font></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        ActivityClass.LoadSJTime();
    },

    ShowHeroData: function (index) {
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='ShengJiangDia'>");
        str.push("<div class='close' style='left:233px;top:7px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#ShengJiangDia\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div style='position:absolute;left:68px;background:url(res/activity/shenjiang/GeneralsTxt.png) no-repeat;width:145px;height:49px;'></div>");
        str.push("<div style='position:absolute;left:22px;top:76px;background:url(res/activity/shenjiang/GeneralsETxt.png) no-repeat;width:137px;height:161px;'></div>");

        for (var i = 0; i < GeneralsJson.length; i++) {
            if (GeneralsJson[i].HeroId == ShengJiangJson.data.GeneralsList[index].gID) {
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
                str.push("<div class='DefaultFont_14 RedFont' style='top:75px;left:145px;font-weight:200;'>" + ShengJiangJson.data.GeneralsList[index].QVal + "</div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:92px;left:145px;font-weight:200;'>" + GeneralsJson[i].Hp + "<font style='color:#00ff00;'> (" + GeneralsJson[i].HpGrow + ")</font></div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:109px;left:145px;font-weight:200;'>" + GeneralsJson[i].Attack + "<font style='color:#00ff00;'> (" + GeneralsJson[i].AtkGrow + ")</font></div>");
                str.push("<div class='DefaultFont_14 RedFont' style='top:126px;left:145px;font-weight:200;'>" + GeneralsJson[i].Defend + "<font style='color:#00ff00;'> (" + GeneralsJson[i].DefGrow + ")</font></div>");
                str.push("<div class='DefaultFont' style='font-size:13px;top:155px;left:20px;font-weight:200;color:#8B4625;width:235px;line-height:16px;'>" + GeneralsJson[i].Detail + "</div>");
                for (var m = 0; m < SkillJson.length; m++) {
                    if (SkillJson[m].sId == GeneralsJson[i].Pt1) {
                        str.push("<div id='hert' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowSkillData(" + m + ");' class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;left:40px;top:198px;'></div>");
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
        $("body").stopTime("showData11");
        $("#showData11").remove();
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

        str.push("<div id='showData11' class='showData' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showData11\").remove();'></a></div>");
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

        $("body").oneTime("3s", "showData11", function () {
            $("body").stopTime("showData11");
            var i = 100;
            $("body").everyTime("20ms", "showData11", function () {
                i--;
                document.getElementById("showData11").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData11").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showData11");
                    $("#showData11").remove();
                }
            });
        });
    },

    ShengJiang_Recruit: function (index) {
        var name = "";
        for (var i = 0; i < GeneralsJson.length; i++) {
            if (GeneralsJson[i].HeroId == ShengJiangJson.data.GeneralsList[index].gID) {
                name = GeneralsJson[i].Name;
                break;
            }
        }
        ShowMessage("确定招募 " + name + " 吗？", function () {
            $("#message").remove(); $("#mask1").remove();
            index += 1;
            //提交招募
            window.GameMainClass.sendRequestJson(1139, '{"pos":' + index + '}', "ActivityClass.ShengJiang_RecruitResert");
        }, function () {
            $("#message").remove(); $("#mask1").remove();
        });
    },

    ShengJiang_RecruitResert: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            switch (BackJson.GemType) {
                case 1:
                    PubJsonNew.data[0].GemBlue -= BackJson.GemNum;
                    $("#Gem21").html(PubJsonNew.data[0].GemBlue);
                    break;
                case 2:
                    PubJsonNew.data[0].GemPurple -= BackJson.GemNum;
                    $("#Gem22").html(PubJsonNew.data[0].GemPurple);
                    break;
                case 3:
                    PubJsonNew.data[0].GemRed -= BackJson.GemNum;
                    $("#Gem23").html(PubJsonNew.data[0].GemRed);
                    break;
                case 4:
                    PubJsonNew.data[0].GemYellow -= BackJson.GemNum;
                    $("#Gem24").html(PubJsonNew.data[0].GemYellow);
                    break;
            }

            var index = BackJson.Client[0].pos - 1;
            ShengJiangJson.data.GeneralsList[index].isOwn = 1;
            $("#sjbtn" + index).css("background", "");
            $("#sjbtn" + index).attr("class", "HasRecruit");
            $("#sjbtn" + index).attr("ontouchend", "");
            for (var i = 0; i < PubShengJiangJson.data[0].HeroData.length; i++) {
                if (PubShengJiangJson.data[0].HeroData[i].gid == ShengJiangJson.data.GeneralsList[index].gID) {
                    PubShengJiangJson.data[0].HeroData[i].isGot = 1;
                    break;
                }
            }
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    LoadSJTime: function () {
        if (isSJ)
            return;
        isSJ = true;

        $("body").everyTime("1s", "sjtime", function () {
            if (ShengJiangJson.data.leftseconds > 0) {
                $("#sjtime").html(expireTime1(ShengJiangJson.data.leftseconds));
                ShengJiangJson.data.leftseconds--;
            }
            else {
                $("body").stopTime("sjtime");
                $("#sjtime").html("已结束");
                isJb = false;
                $(".sjbtn").css("display", "none");
            }
        });
    },

    //加载矿区资源
    LoadMine: function () {
        var str = new Array();
        str.push("<div id='MineBg' style='width:" + Systemdata.width + "px;background-position:-" + (569 - Systemdata.width) / 2 + "px 0px;'>");
        str.push("<div class='MuneItem' id='BackCity' style='top:10px;left:" + (485 - (569 - Systemdata.width)) + "px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#other\").html(\"\");LeavePage(1155);}'></a></div>");
        str.push("<div id='MinePageTitle' style='left:" + (Systemdata.width - 173) / 2 + "px;'>" + MineJson.data.lvmin + "-" + MineJson.data.lvmax + "级 矿区<font id='MinePage'>1</font></div>");
        str.push("<div id='MineBox'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("other").appendChild(divnode);

        ActivityClass.CheckMinePage("");
    },

    CheckMinePage: function (json) {
        if (json != "") {
            var BackJson = eval("(" + json + ")");
            MineJson.data = BackJson.json;
        }
        $("#MinePage").html(MineJson.data.pageindex);
        var str = new Array();
        var top = 61, left = 114 - (569 - Systemdata.width) / 2;
        var color = "#fff";
        for (var i = 0; i < MineJson.data.MineList.length; i++) {
            if (MineJson.data.MineList[i].uid == Systemdata.userid)
                color = "Yellow";
            else
                color = "#fff";

            if (MineJson.data.pageindex != 1) {
                if (MineJson.data.MineList[i].uid > 0) {
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 110) + "px -80px;'>");
                    str.push("<div class='DefaultFont_14' style='color:" + color + ";top:5px;width:78px;left:16px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
                }
                else
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 110) + "px 0;'></div>");
            }
            else {
                if (i != 4) {
                    if (MineJson.data.MineList[i].uid > 0) {
                        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + (MineJson.data.pageindex * 110) + "px -80px;'>");
                        str.push("<div class='DefaultFont_14' style='color:" + color + ";top:5px;width:78px;left:16px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
                    }
                    else
                        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:-" + (MineJson.data.pageindex * 110) + "px 0;'></div>");
                }
                else {
                    if (MineJson.data.MineList[i].uid > 0) {
                        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;background-position:0 -80px;'>");
                        str.push("<div class='DefaultFont_14' style='color:" + color + ";top:5px;width:78px;left:16px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + MineJson.data.MineList[i].nick + "</div></div>"); //占领者名称
                    }
                    else
                        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='MineBulid' style='top:" + top + "px;left:" + left + "px;'></div>");
                }
            }

            switch (MineJson.data.MineList[i].gemtype) {
                case 1:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='GemIcon' style='background:url(res/dialog/Gem1.png) no-repeat;top:" + (top + 50) + "px;left:" + (left + 20) + "px;'></div>");
                    break;
                case 2:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='GemIcon' style='background:url(res/dialog/Gem2.png) no-repeat;top:" + (top + 50) + "px;left:" + (left + 20) + "px;'></div>");
                    break;
                case 3:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='GemIcon' style='background:url(res/dialog/Gem3.png) no-repeat;top:" + (top + 50) + "px;left:" + (left + 20) + "px;'></div>");
                    break;
                case 4:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.GetMineData(" + i + ");' class='GemIcon' style='background:url(res/dialog/Gem4.png) no-repeat;top:" + (top + 50) + "px;left:" + (left + 20) + "px;'></div>");
                    break;
            }

            if ((i + 1) % 3 == 0) {
                top += 86;
                left = 114 - (569 - Systemdata.width) / 2;
            }
            else
                left += 116;
        }
        if (MineJson.data.pageindex != 1) {
            str.push("<div class='CampaignNameLeft' style='top:138px;left:" + (45 - (569 - Systemdata.width) / 2) + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.CheckPage(" + (MineJson.data.pageindex - 1) + ");'></div>");
        }
        else
            str.push("<div class='CampaignNameLeft leftEnabled' style='top:138px;left:" + (45 - (569 - Systemdata.width) / 2) + "px;' ></div>");

        if (MineJson.data.pageindex != 5) {
            str.push("<div class='CampaignNameRight'  style='top:138px;left:" + (485 - (569 - Systemdata.width) / 2) + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.CheckPage(" + (MineJson.data.pageindex + 1) + ");'></div>");
        }
        else {
            str.push("<div class='CampaignNameRight rightEnabled'  style='top:138px;left:" + (485 - (569 - Systemdata.width) / 2) + "px;'></div>");
        }
        $("#MineBox").html(str.join(""));
    },

    GetMineData: function (index) {
        window.GameMainClass.sendRequestJson(1150, '{"mineid":' + MineJson.data.MineList[index].id + ',"index":' + index + '}', "ActivityClass.ShowMineData");
    },

    ShowMineData: function (json) {
        //var json = "{Client:[{'index':" + index + "}],'maxcoin':3200,'leftseconds':3,'totalcoin':2000,'ulevel':31}";
        var BackJson = eval("(" + json + ")");
        $("#MineDataDialog").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='MineDataDialog' style='left:" + (Systemdata.width - 332) / 2 + "px;'>");
        str.push("<div class='close' style='left:292px;top:0px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#MineDataDialog\").remove();$(\"#mask2\").remove();$(\"body\").stopTime(\"minetime\");}'></div>");
        if (MineJson.data.pageindex == 1) {
            if (BackJson.Client[0].index != 4)
                str.push("<div class='MineBulid' style='top:32px;left:24px;background-position:-110px 0;'></div>");
            else
                str.push("<div class='MineBulid' style='top:32px;left:24px;'></div>");
        }
        else {
            str.push("<div class='MineBulid' style='top:32px;left:24px;background-position:-" + ((MineJson.data.pageindex == 5 ? 4 : MineJson.data.pageindex) * 110) + "px 0;'></div>");
        }
        str.push("<div class='DefaultFont_14' style='top:28px;left:145px;color:#280300;'>产量：<font style='color:#990000'>" + BackJson.maxcoin + "</font></div>");
        str.push("<div class='DefaultFont_14' style='top:52px;left:145px;color:#280300;'>矿主：<font style='color:#990000'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "无" : ("Lv." + BackJson.ulevel + "  " + MineJson.data.MineList[BackJson.Client[0].index].nick)) + "</font></div>");
        str.push("<div class='DefaultFont_14' style='top:76px;left:145px;color:#280300;'>累计银币：<font style='color:#990000' id='nowcoin'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "0" : BackJson.totalcoin) + "</font></div>");
        str.push("<div class='DefaultFont_14' style='top:100px;left:145px;color:#280300;'>剩余时间：<font style='color:#990000' id='minetime'>" + (MineJson.data.MineList[BackJson.Client[0].index].uid < 1 ? "00:00:00" : expireTime(BackJson.leftseconds)) + "</font></div>");
        ActivityClass.BackJson = BackJson;
        //说明
        str.push("<div class='DefaultFont_14' style='top:120px;left:24px;color:#7A3F38;width:276px;line-height:16px;font-weight:100;'>");
        if (MineJson.data.MineList[BackJson.Client[0].index].uid < 1)
            str.push("注：需占4小时才可获得收益，期间可能遭受攻击。有宝石标识的收获时可获得1-2颗宝石。");
        else {
            if (Systemdata.userid == MineJson.data.MineList[BackJson.Client[0].index].uid)
                if (BackJson.leftseconds > 0)
                    str.push("注：放弃可获得当前累积银币，并占领更高级的矿脉，不会获得宝石。");
                else
                    str.push("注：收获可获得当前累积银币。有宝石标识的收获时可获得1-2颗宝石。");
            else
                str.push("注：抢夺需花费行动点1，成功可获得50%的累积银币，不会获得宝石，并重新占领4小时。");
        }
        str.push("</div>");
        str.push("<div class='ButtonOther' id='minebtn' style='top:157px;left:219px;width:80px;height:44px;");
        if (MineJson.data.MineList[BackJson.Client[0].index].uid < 1) {
            if (MineJson.data.selfmineid > 0)
                str.push("background:url(res/city/MiningArea/MiningButk2.png) no-repeat;'");
            else
                str.push("background:url(res/city/MiningArea/MiningButk1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.MineKaiCai(" + BackJson.Client[0].index + ");'");
        }
        else {
            if (Systemdata.userid == MineJson.data.MineList[BackJson.Client[0].index].uid)
                if (BackJson.leftseconds > 0) {
                    str.push("background:url(res/city/MiningArea/MiningButf1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.MineFQ(" + BackJson.Client[0].index + ");'");
                }
                else
                    str.push("background:url(res/city/MiningArea/MiningButs1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.MineSH(" + BackJson.Client[0].index + ");'");
            else {
                if (MineJson.data.selfmineid > 0)
                    str.push("background:url(res/city/MiningArea/MiningButq2.png) no-repeat;'");
                else
                    str.push("background:url(res/city/MiningArea/MiningButq1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.MineZD(" + BackJson.Client[0].index + ");'");
            }
        }
        str.push("></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("MineBg").appendChild(divnode);

        if (BackJson.leftseconds > 0 && MineJson.data.MineList[BackJson.Client[0].index].uid > 1)
            ActivityClass.LoadMineTime(BackJson.maxcoin);
    },

    CheckPage: function (pageindex) {
        window.GameMainClass.sendRequestJson(1141, '{"pageindex":' + pageindex + ',"ulevel":' + UserJson.UserLV + '}', "ActivityClass.CheckMinePage");
    },
    BackJson: {},
    LoadMineTime: function (money) {
        $("body").stopTime("minetime");
        $("body").everyTime("1s", "minetime", function () {
            if (ActivityClass.BackJson.leftseconds > 0) {
                ActivityClass.BackJson.leftseconds--;
                $("#minetime").html(expireTime(ActivityClass.BackJson.leftseconds));
                if ((14400 - ActivityClass.BackJson.leftseconds) % 600 == 0) {
                    $("#nowcoin").html(Math.round((14400 - ActivityClass.BackJson.leftseconds) / 600 * (money / 24)));
                }
            }
            else {
                $("body").stopTime("minetime");
                $("#minetime").html("00:00:00");
                $("#nowcoin").html(money);
                if (Systemdata.userid == MineJson.data.MineList[ActivityClass.BackJson.Client[0].index].uid) {
                    $("#minebtn").css({ "background": "url(res/city/MiningArea/MiningButs1.png) no-repeat" });
                }
            }
        });
    },

    //开采
    MineKaiCai: function (index) {
        window.GameMainClass.sendRequestJson(1143, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + UserJson.UserLV + ',"nick":"' + UserJson.UName + '"}', "ActivityClass.MineRefesh");
    },

    //放弃    
    MineFQ: function (index) {
        window.GameMainClass.sendRequestJson(1145, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + UserJson.UserLV + ',"nick":"' + UserJson.UName + '"}', "ActivityClass.MineRefesh");
    },

    //争夺
    MineZD: function (index) {
        window.GameMainClass.goldMineBattle(MineJson.data.MineList[index].id);
    },

    //收获
    MineSH: function (index) {
        window.GameMainClass.sendRequestJson(1144, '{"mineid":' + MineJson.data.MineList[index].id + ',"ulevel":' + UserJson.UserLV + ',"nick":"' + UserJson.UName + '"}', "ActivityClass.MineRefesh");
    },

    //刷新当前页的矿区数据
    MineRefesh: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            if (BackJson.uid == Systemdata.userid) {
                if (BackJson.coin != null)
                    updateGold(1, 0 - BackJson.coin);
                if (BackJson.actpoint != null)
                    updateGold(3, BackJson.actpoint);
                if (BackJson.gemnum > 0) {
                    if (PubJsonNew.data[0].isResert == 1) {
                        switch (BackJson.gemtype) {
                            case 1:
                                PubJsonNew.data[0].GemBlue += BackJson.gemnum;
                                break;
                            case 2:
                                PubJsonNew.data[0].GemPurple += BackJson.gemnum;
                                break;
                            case 3:
                                PubJsonNew.data[0].GemRed += BackJson.gemnum;
                                break;
                            case 4:
                                PubJsonNew.data[0].GemYellow += BackJson.gemnum;
                                break;
                        }
                    }
                }
            }
            if (document.getElementById("MineBg") != null) {
                if (BackJson.pageindex == MineJson.data.pageindex) {
                    $("#MineDataDialog").remove(); $("#mask2").remove(); $("body").stopTime("minetime");
                    window.GameMainClass.sendRequestJson(1141, '{"pageindex":' + MineJson.data.pageindex + ',"ulevel":' + UserJson.UserLV + '}', "ActivityClass.CheckMinePage");
                }
            }
        }

        if (BackJson.uid == Systemdata.userid)
            showTextMess(BackJson.info, BackJson.resert);
    },

    //加载排行表
    LoadRankList: function () {
        var str = new Array();
        str.push("<div style='position: absolute;top:-22px;left:10px;z-index:10;background:url(res/Ranking/RankingTit1.png) no-repeat;width:334px;height:62px;'></div>");
        str.push("<div style='position: absolute;top:-2px;left:-29px;z-index:10;background:url(res/Ranking/RankingTit2.png) no-repeat;width:54px;height:195px;'></div>");
        str.push("<div class='ToLeft' style='position: absolute;top:-2px;left:327px;z-index:10;background:url(res/Ranking/RankingTit2.png) no-repeat;width:54px;height:195px;'></div>");
        str.push('<div id="album5" class="album" style="width:327px;height:246px;top:32px;left:12px;"><div class="paging">');
        str.push("<div class='pagediv' style='width:327px;height:246px;background:url(res/Ranking/RankingWBg1.png) no-repeat;'>");
        str.push("<div class='userheadBig' style='background:url(res/city/UserImg/big/" + (RankJson.data.RankList[0].icon) + ".png) no-repeat;top:3px;left:124px;'></div>");
        str.push("<div class='userrankBg' style='top:73px;left:114px;'>" + RankJson.data.RankList[0].nick + "<div class='userRank'></div><div style='position:absolute;left:60px;width:50px;height:20px;top:30px;z-index:5;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(RankJson.data.RankList[0].lv, 0) + "</div></div>");

        str.push("<div class='userheadBig' style='background:url(res/city/UserImg/big/" + (RankJson.data.RankList[1].icon) + ".png) no-repeat;top:46px;left:24px;'></div>");
        str.push("<div class='userrankBg' style='top:116px;left:14px;'>" + RankJson.data.RankList[1].nick + "<div class='userRank' style='background-position:0 -32px;'></div><div style='position:absolute;left:60px;width:50px;height:20px;top:30px;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(RankJson.data.RankList[1].lv, 0) + "</div></div>");

        str.push("<div class='userheadBig' style='background:url(res/city/UserImg/big/" + (RankJson.data.RankList[2].icon) + ".png) no-repeat;top:46px;left:226px;'></div>");
        str.push("<div class='userrankBg' style='top:116px;left:216px;'>" + RankJson.data.RankList[2].nick + "<div class='userRank' style='background-position:0 -16px;'></div><div style='position:absolute;left:60px;width:50px;height:20px;top:30px;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(RankJson.data.RankList[2].lv, 0) + "</div></div>");
        str.push("<div class='DefaultFont RedFont' style='top:148px;left:119px;font-size:12px;'>每日0点刷新奖励</div>");
        str.push("<div class='DefaultFont RedFont' style='top:182px;left:25px;font-weight:200;font-size:12px;'>" + UserJson.UName + " Lv" + UserJson.UserLV + "</div>");
        str.push("<div class='DefaultFont' style='top:198px;left:25px;font-weight:200;color:white;font-size:12px;'>当前名次:<font style='color:Gold;'>" + RankJson.data.nowrank + "名</font></div>");
        str.push("<div class='DefaultFont' style='top:214px;left:25px;font-weight:200;color:white;font-size:12px;'>最高名次:<font style='color:Gold;'>" + RankJson.data.historyrank + "名</font></div>");

        str.push("<div class='DefaultFont RedFont' style='top:182px;left:135px;font-weight:200;font-size:12px;'>排名奖励</div>");
        str.push("<div class='DefaultFont' style='top:198px;left:135px;font-weight:200;color:white;font-size:12px;'>主公EXP<font style='color:Gold;'>×" + RankJson.data.rewardval.split(",")[0] + "</font></div>");
        str.push("<div class='DefaultFont' style='top:214px;left:135px;font-weight:200;color:white;font-size:12px;'>军功<font style='color:Gold;'>×" + RankJson.data.rewardval.split(",")[1] + " </font></div>");

        if (RankJson.data.rewardstatus == 0)
            str.push("<div class='ButtonOther' id='ReceiveRankRewardBtn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ReceiveRankReward();' style='background:url(res/city/Share_But1.png) no-repeat;top:187px;left:240px;'></div>");
        else
            str.push("<div class='ButtonOther' style='background:url(res/city/Share_But2.png) no-repeat;top:187px;left:240px;'></div>");
        str.push("</div>");

        str.push("<div class='pagediv' style='width:327px;height:246px;background:url(res/Ranking/RankingWBg2.png) no-repeat;'>");
        var top = 32, left = 32;
        for (var i = 3; i < 19; i++) {
            str.push("<div class='DefaultFont_14 RedFont' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + (i + 1) + "</div>");
            left += 25;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;text-align:center;width:70px;'>" + RankJson.data.RankList[i].nick + "</div>");
            left += 75;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + RankJson.data.RankList[i].lv + "</div>");

            if (i == 10) {
                top = 32;
                left = 182;
            }
            else {
                if (i < 10)
                    left = 32;
                else
                    left = 182;

                top += 23;
            }
        }
        str.push("</div>");

        str.push("<div class='pagediv' style='width:327px;height:246px;background:url(res/Ranking/RankingWBg2.png) no-repeat;'>");
        top = 32, left = 32;
        for (var i = 19; i < 35; i++) {
            str.push("<div class='DefaultFont_14 RedFont' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + (i + 1) + "</div>");
            left += 25;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;text-align:center;width:70px;'>" + RankJson.data.RankList[i].nick + "</div>");
            left += 75;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + RankJson.data.RankList[i].lv + "</div>");

            if (i == 26) {
                top = 32;
                left = 182;
            }
            else {
                if (i < 26)
                    left = 32;
                else
                    left = 182;

                top += 23;
            }
        }
        str.push("</div>");

        str.push("<div class='pagediv' style='width:327px;height:246px;background:url(res/Ranking/RankingWBg2.png) no-repeat;'>");
        top = 32, left = 32;
        for (var i = 35; i < 51; i++) {
            str.push("<div class='DefaultFont_14 RedFont' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + (i + 1) + "</div>");
            left += 25;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;text-align:center;width:70px;'>" + RankJson.data.RankList[i].nick + "</div>");
            left += 75;
            str.push("<div class='DefaultFont_14' style='top:" + top + "px;left:" + left + "px;font-weight:200;'>" + RankJson.data.RankList[i].lv + "</div>");

            if (i == 42) {
                top = 32;
                left = 182;
            }
            else {
                if (i < 42)
                    left = 32;
                else
                    left = 182;

                top += 23;
            }
        }
        str.push("</div>");

        str.push("</div></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $('#album5').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".pagediv",
            bounce: false
        });
    },

    ReceiveRankReward: function () {
        if (RankJson.data.rewardstatus == 0)
            window.GameMainClass.sendRequestJson(1158, "", "ReceiveRankRewardResert");
    },

    //加载著名战役
    LoadMoreFuBen: function () {
        var str = new Array();
        str.push("<div id='wrapper' style='width:" + Systemdata.width + "px;height:320px;top:0px;left:0px;z-index:1;'><div id='scroller' style='width:569px;height:320px;'><ul><li>");
        str.push("<div id='MineBg' style='width:" + Systemdata.width + "px;background:url(res/Campaign/War_DRBg.png) no-repeat;width:569px;'>");

        var flist = null;
        if (FamousCampaignData.data.extrawarids != "") {
            flist = FamousCampaignData.data.extrawarids.split(",");
        }
        for (var i = 0; i < FamousCampaignJson.length; i++) {
            if (FamousCampaignJson[i].id < 100) {
                if (UserJson.UserLV >= FamousCampaignJson[i].lv)
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowFubenData(" + i + ");' class='Buliding' style='top:" + FamousCampaignJson[i].y + "px;left:" + FamousCampaignJson[i].x + "px;background:url(res/Campaign/icon/" + FamousCampaignJson[i].id + ".png) no-repeat;width:" + FamousCampaignJson[i].w + "px;height:" + FamousCampaignJson[i].h + "px;'></div>");
            }
            else {
                if (flist != null) {
                    for (var j = 0; j < flist.length; j++) {
                        if (Number(flist[j]) == FamousCampaignJson[i].id) {
                            str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowFubenData(" + i + ");' class='
                                ' style='top:" + FamousCampaignJson[i].y + "px;left:" + FamousCampaignJson[i].x + "px;background:url(res/Campaign/icon/" + FamousCampaignJson[i].id + ".png) no-repeat;width:" + FamousCampaignJson[i].w + "px;height:" + FamousCampaignJson[i].h + "px;'></div>");
                            break;
                        }
                    }
                }
            }
        }
        str.push("</div>");
        str.push("</li></div></div>");
        str.push("<div class='MuneItem' id='BackCity' style='top:270px;left:" + (Systemdata.width - 45) + "px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#other\").html(\"\");LeavePage(1156);}'></a></div>");
        str.push("<div id='MinePageTitle' style='left:" + (Systemdata.width - 177) / 2 + "px;width:177px;height:55px;background:url(res/Campaign/DR_titleBg.png) no-repeat;'><img src='res/Campaign/Tits_ZMWar.png' style='left:11px;z-index:1;position:absolute;' /><div class='DefaultFont RedFont' style='top:35px;font-size:12px;left:30px;width:120px;text-align:center;'>剩余 <font id='fgtxt'>" + FamousCampaignData.data.NOT + "</font> 次闯关次数</div></div>");
        str.push("<div class='DefaultFont_14' style='width:207px;height:17px;text-align:center;top:293px;left:" + (Systemdata.width - 207) / 2 + "px;line-height:17px;background:url(res/Campaign/BettBg.png) no-repeat;color:#ff0000;'>剩余 <font  id='fgnot' style='color:#fff;'>" + FamousCampaignData.data.gNOT + "</font> 次好人帮战次数</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("other").appendChild(divnode);

        myScroll = new iScroll('wrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
        window.addEventListener('DOMContentLoaded', loaded, false);
        //ActivityClass.ShowFubenData(0);
        //ActivityClass.GameWin('{"resert":1,"time":"01:20:10","exp":"2400","vip":"20%"}');
        //ActivityClass.LoadFighting("{'Client':[{'index':0}],'resert':1}");

        if (FamousCampaignData.data.isfight) {
            FamousCampaignData.data.datalist = eval("(" + "{'id':" + FamousCampaignData.data.warid + "}" + ")");
            for (var i = 0; i < FamousCampaignJson.length; i++) {
                if (FamousCampaignJson[i].id == FamousCampaignData.data.warid) {
                    window.GameMainClass.sendRequestJson(1186, '{"index":' + i + '}', "ActivityClass.LoadFighting");
                    break;
                }
            }
            return;
        }

        if (FamousCampaignData.data.warid != 0) {
            FamousCampaignData.data.datalist = eval("(" + "{'id':" + FamousCampaignData.data.warid + "}" + ")");
            for (var i = 0; i < FamousCampaignJson.length; i++) {
                if (FamousCampaignJson[i].id == FamousCampaignData.data.warid) {
                    ActivityClass.ShowFubenData(i);
                    break;
                }
            }
        }
    },

    //获取队伍列表数据
    ShowRormData: function (index) {
        window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignJson[index].id + ',"index":' + index + '}', "ActivityClass.ShowContingent");
        //ActivityClass.ShowContingent('{"Client":[{"id":1,"page":1,"index":0}],"json":{"CList":[]}}');
    },

    ShowFubenData: function (index) {
        var str = new Array();
        var divnode = document.createElement("div");
        divnode.id = 'mask31';
        divnode.className = 'mask opacity';
        document.getElementById("other").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.id = 'dialogMaina';
        divnode.className = 'dialogMain';
        document.getElementById("other").appendChild(divnode);

        $("#dialogMaina").css({ "width": 452, "height": 288, "background": "url(res/Campaign/War_bg.png) no-repeat", "top": 23, "left": (Systemdata.width - 452) / 2 + "px" });
        str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ActivityClass.LeaveDialog();}' style='left:412px;top:0px;'></div>");
        str.push("<div class='dialogTitle' style='width:210px;height:42px;background:url(res/Campaign/Tit_ZMWar.png) no-repeat;left:121px;top:-14px;'></div>");

        str.push("<div style='width:152px;height:266px;background:url(res/Campaign/WarInfo_bg.png) no-repeat;position:absolute;z-index:1;top:12px;left:11px;'>");
        str.push("<div class='DefaultFont_14 RedFont' style='width:142px;text-align:center;top:10px;'>" + FamousCampaignJson[index].name + "</div>");
        str.push("<div class='DefaultFont RedFont' style='width:128px;top:30px;left:12px;font-weight:300;line-hight:17px;font-size:12px;'>" + FamousCampaignJson[index].detail + "</div>");

        str.push("<div class='DefaultFont_14 RedFont' style='top:110px;left:12px;'>通关奖励</div>");
        str.push("<div class='DefaultFont RedFont' style='top:130px;left:12px;font-weight:300;line-hight:17px;font-size:12px;'>主公经验：<font style='color:#ff0000;'>" + FamousCampaignJson[index].exp + "</font></div>");

        str.push("<div class='DefaultFont_14 RedFont' style='top:150px;left:12px;'>可抽取奖励</div>");
        //显示可抽取的物品
        var top = 168, left = 8;
        var itemlist = FamousCampaignJson[index].reward.split(",");
        for (var i = 0; i < itemlist.length; i++) {
            for (var j = 0; j < GoodsJson.length; j++) {
                if (Number(itemlist[i]) == GoodsJson[j].ItemId) {
                    str.push("<div class='Skill' id='Goods" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowGoodsData(" + j + "," + i + ");' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'>");
                    str.push("<div id='itemval" + i + "'>" + getNumSmall("X" + FamousCampaignJson[index].rnum.split(",")[i], 1, 2) + "</div>");
                    str.push("</div>");

                    break;
                }
            }

            if ((i + 1) % 3 == 0) {
                top += 45;
                left = 8;
            }
            else
                left += 45;
        }
        str.push("</div>");

        str.push("<div id='fubenRight' style='width:285px;height:266px;position:absolute;z-index:2;top:17px;left:160px;'></div>");
        $("#dialogMaina").html(str.join(""));

        if (FamousCampaignData.data.teamid == 0)
            ActivityClass.ShowRormData(index);
        else {
            ActivityClass.inTeam = true;
            ActivityClass.getRoomInfo(index, 4);
        }
    },

    //显示物品信息
    ShowGoodsData: function (GoodsIndex, boxindex) {
        $("#showData").remove();
        $("body").stopTime("showgoodsdata");

        var str = new Array();
        if (boxindex > 2)
            boxindex -= 3;
        var left = (boxindex + 1) * 45 + 15, top = 15;

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

        str.push("<div id='showData' style='bottom:" + top + "px;left:" + left + "px;z-index:35;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#showData\").remove();$(\"body\").stopTime(\"showgoodsdata\");}'></a></div>");
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
        document.getElementById("dialogMaina").appendChild(divnode);

        $("body").oneTime("3s", "showgoodsdata", function () {
            var i = 100;
            $("body").everyTime("20ms", "showgoodsdata", function () {
                i--;
                document.getElementById("showData").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showgoodsdata");
                    $("#showData").remove();
                }
            });

        });
    },

    //显示队伍列表,每页五行
    ShowContingent: function (json) {
        var BackJson = eval("(" + json + ")");
        FamousCampaignData.data.datalist = BackJson.json;
        //记录warid
        FamousCampaignData.data.warid = FamousCampaignJson[BackJson.Client[0].index].id;

        var str = new Array();
        str.push("<div class='dialogTitle' style='width:276px;height:31px;background:url(res/Campaign/WarInfo.png) no-repeat;left:3px;top:0px;'></div>");
        if (FamousCampaignData.data.datalist.CList.length > 0) {
            var y = 35;
            for (var i = 0; i < FamousCampaignData.data.datalist.CList.length; i++) {
                str.push("<div class='DefaultFont' style='width:280px;height:34px;background:url(res/Campaign/WarTInfo.png) no-repeat;top:" + y + "px;' ontouchend='ActivityClass.inTeam=true;ActivityClass.getRoomInfo(" + BackJson.Client[0].index + ",2," + i + ");'>");
                str.push("<div class='DefaultFont_14' style='text-align:center;color:white;width:90px;line-height:34px;'>" + FamousCampaignData.data.datalist.CList[i].name + "</div>");
                str.push("<div class='DefaultFont_14' style='text-align:center;color:white;width:75px;line-height:34px;left:100px;'>" + FamousCampaignData.data.datalist.CList[i].pnum + "/3</div>");
                str.push("<div class='DefaultFont_14' style='text-align:center;color:white;width:100px;line-height:34px;left:180px;'>" + FamousCampaignData.data.datalist.CList[i].term + "</div>");
                str.push("</div>");
                y += 38;
            }
        }
        else
            str.push("<div class='DefaultFont_14 RedFont' style='top:80px;text-align:center;width:285px;'>没有找到匹配的房间</div>");

        str.push("<div class='ButtonSmall' style='top:225px;left:8px;background:url(res/Campaign/WarBut_sx.png) no-repeat;' ontouchend='ActivityClass.ShowRormData(" + BackJson.Client[0].index + ");' />");
        str.push("<div class='ButtonSmall' style='top:225px;left:156px;background:url(res/Campaign/WarBut_sj.png) no-repeat;' ontouchend='ActivityClass.inTeam=true;ActivityClass.getRoomInfo(" + BackJson.Client[0].index + ",0);' />");
        str.push("<div class='ButtonSmall' style='top:225px;left:216px;background:url(res/Campaign/WarBut_found.png) no-repeat;' ontouchend='ActivityClass.inTeam=true;ActivityClass.getRoomInfo(" + BackJson.Client[0].index + ",1);'></div>");
        $("#fubenRight").html(str.join(""));
    },

    getRoomInfo: function (index, type, roomindex) {
        if (type == 1)//创建
        //ActivityClass.CreateContingent('{"Client":[{"index":' + index + '}],"resert":1}');
            window.GameMainClass.sendRequestJson(1172, '{"id":' + FamousCampaignJson[index].id + ',"index":' + index + '}', "ActivityClass.CreateContingent");
        else if (type == 2) {//加入
            if (FamousCampaignData.data.datalist.CList[roomindex].pnum == 3) {
                showTextMess("队伍人数已满", 0);
                return;
            }
            //ActivityClass.JoinContingent('{"Client":[{"id":1,"index":0,"teamid":1001}],"info":"join ok","json":{"ishost":0,"teamid":1001,"userlist":[{"gColors":"2,2,2,2,2","gNames":"乐进,吕玲绮,马云禄,王元姬,貂蝉","icon":2,"lv":41,"nick":"西方求败","status":0,"userid":10001107,"viplv":5},{"gColors":"1,2,2,2,2","gNames":"李典,兔女郎,吕玲绮,马云禄,王元姬","icon":6,"lv":36,"nick":"夺命书生","status":1,"userid":10006289,"viplv":0}]},"resert":1}');
            window.GameMainClass.sendRequestJson(1173, '{"id":' + FamousCampaignJson[index].id + ',"index":' + index + ',"teamid":' + FamousCampaignData.data.datalist.CList[roomindex].teamid + '}', "ActivityClass.JoinContingent");
        }
        else if (type == 4) { //进入意外退出时所在的队伍
            window.GameMainClass.sendRequestJson(1185, '{"index":' + index + '}', "ActivityClass.InRoom");
        }
        else { //快速加入
            window.GameMainClass.sendRequestJson(1184, '{"id":' + FamousCampaignJson[index].id + ',"index":' + index + '}', "ActivityClass.JoinContingent");
        }
    },

    RoomJson: { "ishost": 1, "userlist": [
            { "userid": 1000078, "nick": "大咪咪", "lv": 36, "viplv": 5, "gNames": "黄月英,典韦,马忠,小乔,陆逊", "icon": 2, "gColors": "3,3,2,2,3", "status": 1 },
            { "userid": 1000078, "nick": "月5七七", "lv": 36, "viplv": 5, "gNames": "黄月英,典韦,马忠,小乔,陆逊", "icon": 3, "gColors": "3,3,2,2,3", "status": 1 },
            { "userid": 1000078, "nick": "陶公公", "lv": 36, "viplv": 5, "gNames": "黄月英,典韦,马忠,小乔,陆逊", "icon": 4, "gColors": "3,3,2,2,3", "status": 0 }
        ]
    },

    InRoom: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            ActivityClass.RoomJson = BackJson.json;
            if (ActivityClass.RoomJson.ishost) {
                ActivityClass.CreateContingent(json);
            }
            else
                ActivityClass.JoinContingent(json);
        }
        else {
            ActivityClass.inTeam = false;
            showTextMess(BackJson.info, BackJson.resert);
        }
    },

    inTeam: false,

    //刷新队伍列表
    RefeshTeam: function (json) {
        if (ActivityClass.inTeam)
            return;

        var BackJson = eval("(" + json + ")");
        if (FamousCampaignData.data.warid != parseInt(BackJson.teamid / 1000))
            return;

        if (FamousCampaignData.data.datalist.CList.length < 5) {
            for (var j = 0; j < FamousCampaignJson.length; j++) {
                if (FamousCampaignJson[j].id == FamousCampaignData.data.datalist.id) {
                    window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignData.data.datalist.id + ',"index":' + j + '}', "ActivityClass.ShowContingent");
                    break;
                }
            }
            return;
        }
        for (var i = 0; i < FamousCampaignData.data.datalist.CList.length; i++) {
            if (FamousCampaignData.data.datalist.CList[i].teamid == BackJson.teamid) {
                for (var j = 0; j < FamousCampaignJson.length; j++) {
                    if (FamousCampaignJson[j].id == FamousCampaignData.data.datalist.id) {
                        window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignData.data.datalist.id + ',"index":' + j + '}', "ActivityClass.ShowContingent");
                        break;
                    }
                }
                break;
            }
        }
    },

    //刷新房间
    RefeshRoom: function (json) {
        if (ActivityClass.inTeam == false)
            return;
        var BackJson = eval("(" + json + ")");
        var str = new Array();
        switch (BackJson.type) {
            case 1: //有人加入
                var hasnull = false;
                var i = 0;
                for (var m = 0; m < ActivityClass.RoomJson.userlist.length; m++) {
                    if (ActivityClass.RoomJson.userlist[m].userid == 0) {
                        ActivityClass.RoomJson.userlist[m] = BackJson.userjson;
                        hasnull = true;
                        i = m;
                        break;
                    }
                }
                if (hasnull == false) {
                    ActivityClass.RoomJson.userlist.push(BackJson.userjson);
                    i = ActivityClass.RoomJson.userlist.length - 1;
                }
                str.push("<div class='DefaultFont_14' style='color:white;top:5px;width:84px;text-align:center;'>" + ActivityClass.RoomJson.userlist[i].nick + "</div>");
                str.push("<div class='UserHandBgSmall' style='left:13px;top:15px;'><div class='VipLv' style='background-position:0 -" + (ActivityClass.RoomJson.userlist[i].viplv * 12) + "px;top:8px;'></div></div>");
                str.push("<img style='width:40px;height:40px;left:21px;top:23px;position:absolute;z-index:1;' src='res/city/UserImg/" + ActivityClass.RoomJson.userlist[i].icon + ".png' />");
                str.push("<div style='position:absolute;left:23px;width:50px;height:20px;top:67px;z-index:5;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(ActivityClass.RoomJson.userlist[i].lv, 0) + "</div>");

                if (ActivityClass.RoomJson.userlist[i].status)
                    str.push("<div class='WarState' id='status" + i + "' style='background-position:-29px 0;'></div>");
                else
                    str.push("<div class='WarState' id='status" + i + "' style='background-position:-58px 0;'></div>");

                var top = 87;
                var glist = ActivityClass.RoomJson.userlist[i].gNames.split(",");
                for (var j = 0; j < glist.length; j++) {
                    var namecolor = "#00CCFF";
                    switch (Number(ActivityClass.RoomJson.userlist[i].gColors.split(",")[j])) {
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
                    str.push("<div class='DefaultFont' style='color:" + namecolor + ";width:84px;font-size:12px;font-weight:300;text-align:center;top:" + top + "px;'>" + glist[j] + "</div>");

                    top += 14;
                }
                if (ActivityClass.RoomJson.ishost)
                    str.push("<div class='ButtonSmall'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='javascript:if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.LoseBody(" + i + ");' style='top:163px;left:14px;background:url(res/Campaign/WarBut_kick.png) no-repeat;'></div>");

                $("#Bossbg" + i).html(str.join(""));
                break;
            case 2: //有人离开房间                
                for (var i = 0; i < ActivityClass.RoomJson.userlist.length; i++) {
                    if (ActivityClass.RoomJson.userlist[i].userid == BackJson.userid) {
                        ActivityClass.RoomJson.userlist[i].userid = 0;
                        $("#Bossbg" + i).html("");
                        break;
                    }
                }

                if (BackJson.userid == Systemdata.userid) {
                    ActivityClass.inTeam = false;
                    FamousCampaignData.data.warid = 0;
                    FamousCampaignData.data.teamid = 0;
                    for (var j = 0; j < FamousCampaignJson.length; j++) {
                        if (FamousCampaignJson[j].id == FamousCampaignData.data.datalist.id) {
                            window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignData.data.datalist.id + ',"index":' + j + '}', "ActivityClass.ShowContingent");
                            break;
                        }
                    }
                }
                break;
            case 3: //有人准备
                for (var i = 0; i < ActivityClass.RoomJson.userlist.length; i++) {
                    if (ActivityClass.RoomJson.userlist[i].userid == BackJson.userid) {
                        ActivityClass.RoomJson.userlist[i].status = 1;
                        $("#status" + i).css("background-position", "-29px 0");
                        break;
                    }
                }
                //判断是否是自己
                if (BackJson.userid == Systemdata.userid) {
                    $("#readybtn").css({ "background": "url(res/Campaign/WarBut_Zbattles.png) no-repeat" });
                    $("#readybtn").attr("ontouchend", "");
                }
                break;
            case 4: //解散了房间，重新获取队伍列表 
                FamousCampaignData.data.warid = 0;
                FamousCampaignData.data.teamid = 0;
                ActivityClass.inTeam = false;
                for (var j = 0; j < FamousCampaignJson.length; j++) {
                    if (FamousCampaignJson[j].id == FamousCampaignData.data.datalist.id) {
                        window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignData.data.datalist.id + ',"index":' + j + '}', "ActivityClass.ShowContingent");
                        break;
                    }
                }
                break;
            case 5: //开战战斗，切换到征战页面
                //减少挑战次数
                if (FamousCampaignData.data.NOT < 1) {
                    if (FamousCampaignData.data.gNOT > 0)
                        FamousCampaignData.data.gNOT -= 1;
                    FamousCampaignData.data.NOT = 0;
                }
                if (FamousCampaignData.data.NOT > 0) {
                    FamousCampaignData.data.NOT -= 1;
                }
                $("#fgtxt").html(FamousCampaignData.data.NOT);
                $("#fgnot").html(FamousCampaignData.data.gNOT);
                for (var i = 0; i < FamousCampaignJson.length; i++) {
                    if (FamousCampaignJson[i].id == BackJson.warid) {
                        ActivityClass.GetFightingData('{"Client":[{"index":' + i + '}],"resert":1}');
                        break;
                    }
                }
                break;
            case 6: //被房主踢出
                for (var i = 0; i < ActivityClass.RoomJson.userlist.length; i++) {
                    if (ActivityClass.RoomJson.userlist[i].userid == BackJson.userid) {
                        ActivityClass.RoomJson.userlist[i].userid = 0;
                        $("#Bossbg" + i).html("");
                        break;
                    }
                }

                if (BackJson.userid == Systemdata.userid) {
                    FamousCampaignData.data.warid = 0;
                    FamousCampaignData.data.teamid = 0;
                    $("#mask31").remove();
                    $("#dialogMaina").css("display", "none"); $("#dialogMaina").remove();
                    for (var j = 0; j < FamousCampaignJson.length; j++) {
                        if (FamousCampaignJson[j].id == FamousCampaignData.data.datalist.id) {
                            window.GameMainClass.sendRequestJson(1171, '{"id":' + FamousCampaignData.data.datalist.id + ',"index":' + j + '}', "ActivityClass.ShowContingent");
                            break;
                        }
                    }
                    ActivityClass.inTeam = false;
                    showTextMess("你被队长请出了队伍", 0);

                }
                break;
        }
    },

    LoseOneResert: function (json) {
        var BackJson = eval("(" + json + ")");
        showTextMess(BackJson.info, BackJson.resert);
    },

    //自己组建的队伍
    CreateContingent: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            ActivityClass.RoomJson = BackJson.json;
            var str = new Array();
            var top = 87, left = 5;
            for (var i = 0; i < 3; i++) {
                str.push("<div class='BossBg' id='Bossbg" + i + "' style='width:84px;height:202px;background:url(res/Campaign/WarPInfo.png) no-repeat;top:17px;left:" + left + "px;'>");
                if (i < ActivityClass.RoomJson.userlist.length) {
                    str.push("<div class='DefaultFont_14' style='color:white;top:5px;width:84px;text-align:center;'>" + ActivityClass.RoomJson.userlist[i].nick + "</div>");
                    str.push("<div class='UserHandBgSmall' style='left:13px;top:15px;'><div class='VipLv' style='background-position:0 -" + (ActivityClass.RoomJson.userlist[i].viplv * 12) + "px;top:8px;'></div></div>");
                    str.push("<img style='width:40px;height:40px;left:21px;top:23px;position:absolute;z-index:1;' src='res/city/UserImg/" + ActivityClass.RoomJson.userlist[i].icon + ".png' />");
                    str.push("<div style='position:absolute;left:23px;width:50px;height:20px;top:67px;z-index:5;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(ActivityClass.RoomJson.userlist[i].lv, 0) + "</div>");
                    if (i == 0)
                        str.push("<div  id='status" + i + "' class='WarState'></div>");
                    else {
                        if (ActivityClass.RoomJson.userlist[i].status)
                            str.push("<div id='status" + i + "' class='WarState' style='background-position:-29px 0;'></div>");
                        else
                            str.push("<div id='status" + i + "' class='WarState' style='background-position:-58px 0;'></div>");
                    }

                    top = 87;
                    var glist = ActivityClass.RoomJson.userlist[i].gNames.split(",");
                    for (var j = 0; j < glist.length; j++) {
                        var namecolor = "#00CCFF";
                        switch (Number(ActivityClass.RoomJson.userlist[i].gColors.split(",")[j])) {
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
                        str.push("<div class='DefaultFont' style='color:" + namecolor + ";width:84px;font-size:12px;font-weight:300;text-align:center;top:" + top + "px;'>" + glist[j] + "</div>");

                        top += 14;
                    }
                    if (i != 0)
                        str.push("<div class='ButtonSmall' style='top:163px;left:14px;background:url(res/Campaign/WarBut_kick.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='javascript:if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.LoseBody(" + i + ");'></div>");
                }
                str.push("</div>");
                left += 92;
            }
            str.push("<div class='ButtonBig' style='top:225px;left:186px;background:url(res/Campaign/WarBut_battle.png) no-repeat;' ontouchend='javascript:ActivityClass.StarFight(" + BackJson.Client[0].index + ");'></div>");
            str.push("<div class='ButtonSmall' style='top:225px;left:10px;background:url(res/Campaign/WarBut_dismis.png) no-repeat;' ontouchend='ActivityClass.LeaveTeam();'></div>");
            $("#fubenRight").html(str.join(""));
        }
        else {
            ActivityClass.inTeam = false;
            showTextMess(BackJson.info, BackJson.resert);
        }
    },

    //加入别人的队伍
    JoinContingent: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            var str = new Array();
            ActivityClass.RoomJson = BackJson.json;
            var top = 87, left = 5;
            var mystate = 1;
            for (var i = 0; i < 3; i++) {
                str.push("<div class='BossBg' id='Bossbg" + i + "' style='width:84px;height:202px;background:url(res/Campaign/WarPInfo.png) no-repeat;top:17px;left:" + left + "px;'>");
                if (i < ActivityClass.RoomJson.userlist.length) {
                    str.push("<div class='DefaultFont_14' style='color:white;top:5px;width:84px;text-align:center;'>" + ActivityClass.RoomJson.userlist[i].nick + "</div>");
                    str.push("<div class='UserHandBgSmall' style='left:13px;top:15px;'><div class='VipLv' style='background-position:0 -" + (ActivityClass.RoomJson.userlist[i].viplv * 12) + "px;top:8px;'></div></div>");
                    str.push("<img style='width:40px;height:40px;left:21px;top:23px;position:absolute;z-index:1;' src='res/city/UserImg/" + ActivityClass.RoomJson.userlist[i].icon + ".png' />");
                    str.push("<div style='position:absolute;left:23px;width:50px;height:20px;top:67px;z-index:5;'><img style='position:absolute;left:0px;' src='res/dialog/Lv_Txt.png' />" + getLvNum(ActivityClass.RoomJson.userlist[i].lv, 0) + "</div>");

                    if (i == 0)
                        str.push("<div id='status" + i + "' class='WarState'></div>");
                    else {
                        if (ActivityClass.RoomJson.userlist[i].status)
                            str.push("<div id='status" + i + "' class='WarState' style='background-position:-29px 0;'></div>");
                        else
                            str.push("<div id='status" + i + "' class='WarState' style='background-position:-58px 0;'></div>");
                    }

                    top = 87;
                    var glist = ActivityClass.RoomJson.userlist[i].gNames.split(",");
                    for (var j = 0; j < glist.length; j++) {
                        var namecolor = "#00CCFF";
                        switch (Number(ActivityClass.RoomJson.userlist[i].gColors.split(",")[j])) {
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
                        str.push("<div class='DefaultFont' style='color:" + namecolor + ";width:84px;font-size:12px;font-weight:300;text-align:center;top:" + top + "px;'>" + glist[j] + "</div>");

                        top += 14;
                    }

                    if (ActivityClass.RoomJson.userlist[i].userid == Systemdata.userid) {
                        str.push("<div class='ButtonSmall' style='top:163px;left:14px;background:url(res/Campaign/WarBut_retreat.png) no-repeat;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.LeaveTeam();'></div>");
                        mystate = ActivityClass.RoomJson.userlist[i].status;
                    }
                }
                str.push("</div>");
                left += 92;
            }
            if (mystate == false)
                str.push("<div class='ButtonBig' id='readybtn' style='top:225px;left:186px;background:url(res/Campaign/WarBut_Zbattle.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ReadyFighting();'></div>");
            else
                str.push("<div class='ButtonBig' id='readybtn' style='top:225px;left:186px;background:url(res/Campaign/WarBut_Zbattles.png) no-repeat;'></div>");

            $("#fubenRight").html(str.join(""));
        }
        else {
            ActivityClass.inTeam = false;
            showTextMess(BackJson.info, BackJson.resert);
        }
    },

    //关闭战役点窗口前
    LeaveDialog: function () {
        if (ActivityClass.inTeam) {
            if (ActivityClass.RoomJson.ishost) {
                ShowMessage("是否解散该队伍？", function () {
                    $("#message").remove();
                    $("#mask1").remove();
                    $("#mask31").remove();
                    $("#dialogMaina").remove();
                    ActivityClass.inTeam = false;
                    FamousCampaignData.data.warid = 0;
                    FamousCampaignData.data.teamid = 0;
                    window.GameMainClass.sendRequestJson(1174, '', "");
                    LeavePage(1156);
                }, function () { $("#message").remove(); $("#mask1").remove(); }, null, "noshow");
            }
            else {
                ShowMessage("是否退出该队伍？", function () {
                    $("#message").remove(); $("#mask1").remove();
                    ActivityClass.inTeam = false;
                    FamousCampaignData.data.warid = 0;
                    FamousCampaignData.data.teamid = 0;
                    $("#mask31").remove();
                    $("#dialogMaina").remove();
                    window.GameMainClass.sendRequestJson(1183, '', "");
                    LeavePage(1156);
                }, function () { $("#message").remove(); $("#mask1").remove(); }, null, "noshow");
            }
        }
        else {
            $("#mask31").remove(); $("#dialogMaina").css("display", "none"); $("#dialogMaina").remove();
            FamousCampaignData.data.warid = 0;
        }

    },

    //退出或解除房间
    LeaveTeam: function () {
        if (ActivityClass.RoomJson.ishost) {
            ShowMessage("是否解散该队伍？", function () { $("#message").remove(); $("#mask1").remove(); FamousCampaignData.data.warid = 0; window.GameMainClass.sendRequestJson(1174, '', ""); }, function () { $("#message").remove(); $("#mask1").remove(); }, null, "noshow");
        }
        else {
            ShowMessage("是否退出该队伍？", function () { $("#message").remove(); $("#mask1").remove(); FamousCampaignData.data.warid = 0; window.GameMainClass.sendRequestJson(1183, '', ""); }, function () { $("#message").remove(); $("#mask1").remove(); }, null, "noshow");
        }
    },

    //踢出队伍
    LoseBody: function (index) {
        window.GameMainClass.sendRequestJson(1179, '{"userid":' + ActivityClass.RoomJson.userlist[index].userid + '}', "ActivityClass.LoseOneResert");
    },

    //准备战斗
    ReadyFighting: function () {
        for (var i = 0; i < ActivityClass.RoomJson.userlist.length; i++) {
            if (ActivityClass.RoomJson.userlist[i].userid == Systemdata.userid) {
                if (ActivityClass.RoomJson.userlist[i].status == false)
                    window.GameMainClass.sendRequestJson(1175, '', "");
                break;
            }
        }
    },

    //获取战斗数据
    GetFightingData: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            window.GameMainClass.sendRequestJson(1186, '{"index":' + BackJson.Client[0].index + '}', "ActivityClass.LoadFighting");
        }
        else
            showTextMess(BackJson.info, BackJson.resert);
    },

    FightingData: {
        "lefttime": 300, "vipexp": 40, "warid": 1, "userlist":
        [
            { "cdpos": 2, "userid": 1058221, "nick": "大咪咪", "viplv": 3, "lv": 35, "icon": 1, "hurt": 3, "cdtime": 15, "pos": 2 },
            { "cdpos": 4, "userid": 10001287, "nick": "大咪咪", "viplv": 3, "lv": 35, "icon": 2, "hurt": 3, "cdtime": 17, "pos": 3 },
            { "cdpos": 0, "userid": 10001287, "nick": "大咪咪", "viplv": 3, "lv": 35, "icon": 3, "hurt": 3, "cdtime": 0, "pos": 0 },
        ], "winpos": "2,3"
    },

    LoadFighting: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            window.GameMainClass.changeMusic(0);
            ActivityClass.FightingData = BackJson.json;

            $("#mask31").remove(); $("#dialogMaina").remove();
            var str = new Array();
            str.push("<div id='mapwrapper' style='width:" + Systemdata.width + "px;'><div id='mapscroller' style='width:640px;height:400px;'><ul style='width:640px;height:400px;' ><li style='width:640px;height:400px;'>");
            str.push("<div style='position:absolute;z-index:1px;width:640px;height:400px;background:url(res/Campaign/Map/" + FuBenMapJson[BackJson.Client[0].index].mapid + ".png) no-repeat;' id='FightMain'>");
            var winpos = ActivityClass.FightingData.winpos.split(",");

            var iswin = false;
            for (var i = 1; i < FuBenMapJson[BackJson.Client[0].index].blist.length; i++) {
                iswin = false;
                for (var j = 0; j < winpos.length; j++)
                    if (FuBenMapJson[BackJson.Client[0].index].blist[i].pos == Number(winpos[j])) {
                        iswin = true;
                        break;
                    }
                if (iswin == false) {//随机说话
                    str.push("<div id='pos" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.PointAction(" + BackJson.Client[0].index + "," + FuBenMapJson[BackJson.Client[0].index].blist[i].pos + ");' class='FuBenBody' style='left:" + FuBenMapJson[BackJson.Client[0].index].blist[i].x + "px;top:" + FuBenMapJson[BackJson.Client[0].index].blist[i].y + "px;background:url(res/Campaign/Part/" + FuBenMapJson[BackJson.Client[0].index].blist[i].icon + ".png) no-repeat;'></div>");
                    if (FuBenMapJson[BackJson.Client[0].index].blist[i].icon < 200 || FuBenMapJson[BackJson.Client[0].index].blist[i].icon > 299)
                        ActivityClass.npcTalk(BackJson.Client[0].index, i, parseInt(Math.random() * 100 + 10));
                }
                else
                    str.push("<div id='pos" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.PointAction(" + BackJson.Client[0].index + "," + FuBenMapJson[BackJson.Client[0].index].blist[i].pos + ");' class='FuBenBody' style='left:" + FuBenMapJson[BackJson.Client[0].index].blist[i].x + "px;top:" + FuBenMapJson[BackJson.Client[0].index].blist[i].y + "px;'></div>");
            }
            str.push("<div id='pos0' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.PointAction(" + BackJson.Client[0].index + ",0);' class='FuBenBody' style='left:" + FuBenMapJson[BackJson.Client[0].index].blist[0].x + "px;top:" + FuBenMapJson[BackJson.Client[0].index].blist[0].y + "px;'></div>");

            str.push("<div id='postemp0' class='FuBenBody' style='display:none'><div class='DefaultFont' id='nick0' style='font-size:12px;width:65px;text-align:center;color:#fff;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'>" + ActivityClass.FightingData.userlist[0].nick + "</div></div>");
            if (ActivityClass.FightingData.userlist.length > 1) {
                str.push("<div id='postemp1' ontouchmove='getmovingposx()' ontouchstart='getposx()' class='FuBenBody' style='display:none'><div class='DefaultFont' id='nick1' style='font-size:12px;width:65px;text-align:center;color:#fff;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'>" + ActivityClass.FightingData.userlist[1].nick + "</div></div>");
            }
            if (ActivityClass.FightingData.userlist.length > 2)
                str.push("<div id='postemp2'  ontouchmove='getmovingposx()' ontouchstart='getposx()' class='FuBenBody' style='display:none'><div class='DefaultFont' id='nick2' style='font-size:12px;width:65px;text-align:center;color:#fff;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'>" + ActivityClass.FightingData.userlist[2].nick + "</div></div>");
            str.push("<div id='cdpos0' class='DefaultFont' style='display:none;font-size:12px;color:#ff0000;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'></div>");
            str.push("<div id='cdpos1' class='DefaultFont' style='display:none;font-size:12px;color:#ff0000;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'></div>");
            str.push("<div id='cdpos2' class='DefaultFont' style='display:none;font-size:12px;color:#ff0000;font-weight:200;-webkit-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;-moz-text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;text-shadow:-1px -1px 0 #000,1px -1px #000,1px 1px #000,-1px 1px #000;'></div>");
            str.push("</div>");
            str.push("</li></ul></div></div>");

            str.push("<div class='MuneItem' id='Show' style='z-index:51;top:220px;left:" + (Systemdata.width - 45) + "px;display:none;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowWarInfo(0);'></a></div>");
            str.push("<div class='MuneItem' id='EnShow' style='z-index:51;top:220px;left:" + (Systemdata.width - 45) + "px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.ShowWarInfo(1);'></a></div>");
            str.push("<div class='MuneItem' id='Exit' style='z-index:51;top:270px;left:" + (Systemdata.width - 45) + "px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {ActivityClass.LeaveFight();;}'></a></div>");
            str.push("<div class='MuneItem' id='FormationIcon1' style='left:0px;top:220px;z-index:51;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  ActivityClass.LoadBuZheng();'></a></div>");
            str.push("<div class='MinePageTitle' style='left:" + (Systemdata.width - 177) / 2 + "px;width:177px;top:2px;height:55px;background:url(res/Campaign/DR_titleBg.png) no-repeat;z-index:51;line-height:40px;'>" + FamousCampaignJson[BackJson.Client[0].index].name + " Lv " + FamousCampaignJson[BackJson.Client[0].index].lv + "<div class='DefaultFont RedFont' id='mycdtime' style='top:36px;font-size:12px;left:30px;width:120px;text-align:center;'>主公CD时间0秒</div></div>");
            var top = 2;
            for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
                str.push("<div class='WarPlayerInfo' id='playerinfo" + i + "' style='top:" + top + "px;'>");
                str.push("<img src='res/city/UserImg/" + ActivityClass.FightingData.userlist[i].icon + ".png' style='width:30px;height:30px;position:absolute;top:5px;left:4px;' />");
                str.push(ActivityClass.FightingData.userlist[i].nick + " LV." + ActivityClass.FightingData.userlist[i].lv + "<br/>击杀<font id='hurt" + i + "'>" + ActivityClass.FightingData.userlist[i].hurt + "</font>");
                if (ActivityClass.FightingData.userlist[i].viplv > 0) {
                    str.push("<div class='vipSmall' style='background-position:0 -" + ((ActivityClass.FightingData.userlist[i].viplv - 1) * 12) + "px;'></div>");
                }
                str.push("</div>");
                top += 40;
            }
            str.push("<div class='WarInfo' style='top:2px;left:" + (Systemdata.width - 120) + "px;'>");
            str.push("<div class='DefaultFont RedFont' style='font-size:12px;font-weight:200;top:3px;left:10px;'>剩余时间:<font style='color:#ff0000' id='fubentime'>" + expireTime(ActivityClass.FightingData.lefttime) + "</font></div>");
            str.push("</div>");

            str.push("<div class='WarInfo' style='top:24px;left:" + (Systemdata.width - 120) + "px;'>");
            str.push("<div class='DefaultFont RedFont' style='font-size:12px;font-weight:200;top:3px;left:10px;'>主公经验:<font style='color:#ff0000'>" + FamousCampaignJson[BackJson.Client[0].index].exp + "</font></div>");
            str.push("</div>");

            str.push("<div class='WarInfo' style='top:46px;left:" + (Systemdata.width - 120) + "px;'>");
            str.push("<div class='DefaultFont RedFont' style='font-size:12px;font-weight:200;top:3px;left:10px;'>VIP加成经验:<font style='color:#ff0000'>" + ActivityClass.FightingData.vipexp + "%</font></div>");
            str.push("</div>");


            var divnode = document.createElement("div");
            divnode.innerHTML = str.join("");
            divnode.id = 'mapdiv';
            document.getElementById("other").appendChild(divnode);

            myScroll = new iScroll('mapwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
            window.addEventListener('DOMContentLoaded', loadedmapwrapper, false);

            for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
                for (var j = 0; j < FuBenMapJson[BackJson.Client[0].index].blist.length; j++) {
                    if (FuBenMapJson[BackJson.Client[0].index].blist[j].pos == ActivityClass.FightingData.userlist[i].pos) {
                        $("#pos" + j).css({ "background": "" });
                        $("#postemp" + i).css({ "background": "url(res/Campaign/Part/" + ActivityClass.FightingData.userlist[i].icon + ".png) no-repeat", "left": FuBenMapJson[BackJson.Client[0].index].blist[j].x, "top": FuBenMapJson[BackJson.Client[0].index].blist[j].y, "display": "" });

                        document.getElementById("postemp" + i).ontouchend = function () {
                            if (Math.abs(lastPosX - beforePosX) < 5) {
                                ActivityClass.PointAction(BackJson.Client[0].index, i);
                            }
                        };
                        break;
                    }
                }
                if (ActivityClass.FightingData.userlist[i].cdpos > 0) {
                    if (ActivityClass.FightingData.userlist[i].cdtime > 0) {
                        for (var k = 0; k < FuBenMapJson[BackJson.Client[0].index].blist.length; k++) {
                            if (FuBenMapJson[BackJson.Client[0].index].blist[k].pos == ActivityClass.FightingData.userlist[i].cdpos) {
                                $("#cdpos" + i).html("CD时间" + ActivityClass.FightingData.userlist[i].cdtime + "秒");
                                $("#cdpos" + i).css({ "display": "", "left": FuBenMapJson[BackJson.Client[0].index].blist[k].x - 5, "top": FuBenMapJson[BackJson.Client[0].index].blist[k].y + 60 });
                                break;
                            }
                        }
                    }
                }
            }

            for (var j = 0; j < ActivityClass.FightingData.userlist.length; j++) {
                if (ActivityClass.FightingData.userlist[j].userid == Systemdata.userid) {
                    $("#nick" + j).css("color", "#ffcc00");
                    if (ActivityClass.FightingData.userlist[j].cdtime > 0) {
                        $("#mycdtime").html(ActivityClass.FightingData.userlist[j].cdtime + "秒后可行动");
                        ActivityClass.ActionCD(j);

                    }
                    else {
                        $("#mycdtime").css("color", "Green");
                        $("#mycdtime").html("可行动");
                    }
                }
                else {
                    if (ActivityClass.FightingData.userlist[j].cdtime > 0)
                        if (ActivityClass.FightingData.userlist[j].pos != 0)
                            ActivityClass.poscd(j);
                }
            }
            ActivityClass.FunBenCD();
        }
    },

    //npc说话
    npcTalk: function (mapindex, index, time) {
        $("body").oneTime(time + "s", "talking" + index, function () {
            $("body").stopTime("talking" + index);

            var left = $("#pos" + index).position().left;
            var top = $("#pos" + index).position().top;

            var str = "<div id='talk" + index + "' class='talkdia' style='top:" + (top - 30) + "px;left:" + (left - 20) + "px;'>" + FuBenMapJson[mapindex].blist[index].saying + "</div>";
            var divnode = document.createElement("div");
            divnode.innerHTML = str;
            document.getElementById("FightMain").appendChild(divnode);

            $("body").oneTime("5s", "talking" + index, function () {
                $("#talk" + index).remove();
                $("body").stopTime("talking" + index);

                ActivityClass.npcTalk(mapindex, index, parseInt(Math.random() * 100 + 10));
            });
        });
    },

    LoadBuZheng: function () {
        var divnode = document.createElement("div");
        divnode.id = 'mask10';
        divnode.className = 'mask opacity';
        document.getElementById("other").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.id = 'dialogMain10';
        divnode.className = 'dialogMain';
        document.getElementById("other").appendChild(divnode);
        var str = new Array();

        str.push("<div class='icon' style='background:url(res/dialog/Icon_EmBat.png) no-repeat;'></div>");
        str.push("<div class='dialogTitle' style='width:59px;background:url(res/dialog/Txt_EmBattle.png) no-repeat;'></div>");
        str.push("<div class='close' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.CloseDialog();' style='left:444px;'></div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain10").appendChild(divnode);

        $("#dialogMain10").css({ "left": (Systemdata.width - 482) / 2 + "px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)", "top": 8 });

        BuZhengClass.tempHeroList = [];
        for (var k = 0; k < HeroJson.data[0].HeroList.length; k++)
            BuZhengClass.tempHeroList.push($.extend({}, HeroJson.data[0].HeroList[k]));

        var FormationHero = UserJson.FormationHero.split(",");

        for (var m = 0; m < BuZhengClass.templocation.length; m++) {
            BuZhengClass.templocation[m].HeroID = Number(FormationHero[m]);
        }
        BuZhengClass.isEdit = false;
        BuZhengClass.LoadZX(1);
    },



    ActionIsCD: false,

    //自己行动倒计时
    ActionCD: function (index) {
        if (ActivityClass.ActionIsCD)
            return;
        ActivityClass.ActionIsCD = true;
        $("body").everyTime("1s", "Actiontime", function () {
            if (ActivityClass.FightingData.userlist[index].cdtime > 1) {
                ActivityClass.FightingData.userlist[index].cdtime--;
                $("#mycdtime").html(ActivityClass.FightingData.userlist[index].cdtime + "秒后可行动");
                $("#cdpos" + index).html("CD时间" + ActivityClass.FightingData.userlist[index].cdtime + "秒");
            }
            else {
                ActivityClass.FightingData.userlist[index].cdtime = 0;
                $("body").stopTime("Actiontime");
                $("#mycdtime").css("color", "Green");
                $("#mycdtime").html("可行动");
                $("#cdpos" + index).css("display", "none");
                ActivityClass.ActionIsCD = false;
                ActivityClass.FightingData.userlist[index].cdpos = 0;
            }
        });
    },

    //其他人行动倒计时
    poscd: function (index) {
        $("body").everyTime("1s", "Actiontime" + index, function () {
            if (ActivityClass.FightingData.userlist[index].cdtime > 1) {
                ActivityClass.FightingData.userlist[index].cdtime--;
                $("#cdpos" + index).html("CD时间" + ActivityClass.FightingData.userlist[index].cdtime + "秒");
            }
            else {
                ActivityClass.FightingData.userlist[index].cdtime = 0;
                $("body").stopTime("Actiontime" + index);
                $("#cdpos" + index).css("display", "none");
                ActivityClass.FightingData.userlist[index].cdpos = 0;
            }
        });
    },

    //多人副本倒计时
    FunBenCD: function () {
        $("body").everyTime("1s", "fubentime", function () {
            if (ActivityClass.FightingData.lefttime > 1) {
                ActivityClass.FightingData.lefttime--;
                $("#fubentime").html(expireTime(ActivityClass.FightingData.lefttime));
            }
            else {
                $("body").stopTime("fubentime");
                //结束战斗
                window.GameMainClass.sendRequestJson(1178, '', "ActivityClass.GameOver");
            }
        });
    },

    WinNotify: 0,
    GameWin: function (json) {
        if (ActivityClass.WinNotify)
            return;
        $("#message").remove();
        $("#mask1").remove();
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            ActivityClass.WinNotify = 1;
            $("body").stopTime("fubentime");
            ActivityClass.FightingData.lefttime = 10000000;
            var str = new Array();
            str.push("<div class='ButtonSmall' style='width:214px;height:65px;top:0px;background:url(res/Campaign/war_victory.png) no-repeat;left:92px;'></div>");
            str.push("<div id='messageText' style='top:86px;left:105px;text-align:left;font-size:15px;width:240px;font-weight:200;'>战斗消耗时间:<font style='color:#ff0000'>&nbsp;" + BackJson.time + "</font><br />每人获得经验:<font style='color:#ff0000'>&nbsp;" + BackJson.exp + "</font><br />VIP经验加成:<font style='color:#ff0000'>&nbsp;" + BackJson.vip + "</font><br><p style='float:right'><font style='color:#ff0000' id='gotime'>5</font>秒后返跳转至抽奖界面</p></div>");
            str.push("<div id='messageOk' style='left:170px;display:none;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){$(\"#mask1\").remove();$(\"#message\").remove();ActivityClass.LotterCount=0; ActivityClass.LotterOver();}'></div>");
            var divnode = document.createElement("div");
            divnode.id = "mask1";
            divnode.className = "mask1 opacity1";
            document.getElementById("other").appendChild(divnode);

            divnode = document.createElement("div");
            divnode.id = "message";
            divnode.innerHTML = str.join("");
            document.getElementById("other").appendChild(divnode);
            $("#message").css({ 'left': (Systemdata.width - 397) / 2 });

            ActivityClass.WinOverTime(BackJson.goodcardnum, BackJson.isgoodguy);
        }
    },

    GameOver: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            ActivityClass.FightingData.lefttime = 0;
            $("#fubentime").html("00:00:00");
            var str = new Array();
            str.push("<div class='ButtonSmall' style='width:214px;height:65px;top:0px;background:url(res/Campaign/war_failure.png) no-repeat;left:92px;'></div>");
            str.push("<div id='messageText' style='top:86px;left:105px;text-align:left;font-size:15px;width:240px;font-weight:200;'>战斗消耗时间:<font style='color:#ff0000'>时间已耗尽</font><br />每人获得经验:<font style='color:#ff0000'>-</font><br />VIP经验加成:<font style='color:#ff0000'>-</font><br><p style='float:right'><font style='color:#ff0000' id='gotime'>5</font>秒后返回战役界面</p></div>");

            var divnode = document.createElement("div");
            divnode.id = "mask1";
            divnode.className = "mask1 opacity1";
            document.getElementById("other").appendChild(divnode);

            divnode = document.createElement("div");
            divnode.id = "message";
            divnode.innerHTML = str.join("");
            document.getElementById("other").appendChild(divnode);
            $("#message").css({ 'left': (Systemdata.width - 397) / 2 });

            ActivityClass.OverTime();
        }
    },

    OverTime: function () {
        var gotime = 5;
        $("body").everyTime("1s", "gotime", function () {
            if (gotime > 1) {
                gotime--;
                $("#gotime").html(gotime);
            }
            else {
                $("body").stopTime("gotime");
                $("#message").remove(); $("#mask1").remove();
                $("#mapdiv").remove();
                FamousCampaignData.data.isfight = 0;
                FamousCampaignData.data.warid = 0;
                FamousCampaignData.data.teamid = 0;
                ActivityClass.inTeam = false;
                window.GameMainClass.changeMusic(1);
            }
        });
    },

    WinOverTime: function (goodcardnum, isgoodguy) {
        var gotime = 5;
        $("body").everyTime("1s", "gotime", function () {
            if (gotime > 1) {
                gotime--;
                $("#gotime").html(gotime);
            }
            else {
                $("body").stopTime("gotime");
                if (isgoodguy == 0) {
                    $("#message").remove(); $("#mask1").remove();
                    ActivityClass.ShowLottery();
                }
                else {
                    if (goodcardnum < 1) {
                        $("#messageText").html("今日好人帮战次数已用完,无法获得好人卡");
                        $("#messageOk").css("display", "");
                    }
                    else {
                        $("#messageText").html("您共获得了" + goodcardnum + "张好人卡！");
                        $("#messageOk").css("display", "");
                    }
                }
            }
        });
    },

    LotterCount: 1,
    ShowLottery: function () {
        var divnode = document.createElement("div");
        divnode.id = 'maskbb';
        divnode.className = 'mask opacity';
        document.getElementById("other").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.className = 'dialogMain';
        divnode.id = "dialogMainbb";
        document.getElementById("other").appendChild(divnode);
        $("#dialogMainbb").css({ "left": (Systemdata.width - 410) / 2 + "px", "top": "3px", "width": 410, "height": 314, "background": "url(res/Campaign/Manypeople_Material.png) no-repeat" });
        var str = new Array();
        str.push("<div class='DefaultFont_14 RedFont' style='top:58px;left:168px;' id='lottertime'>10秒后自动抽奖</div>");
        var top = 82, left = 58;
        for (var i = 0; i < 6; i++) {
            str.push("<div class='L_R_I_Bg0' id='lritem" + i + "' style='top:" + top + "px;left:" + left + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.LotterySubmit(" + i + ");'></div>");
            str.push("<div class='DefaultFont RedFont' id='lotteritem" + i + "' style='top:" + (top + 68) + "px;left:" + left + "px;font-size:12px;font-weight:200;text-align:center;width:65px;'></div>");

            left += 116;
            if ((i + 1) % 3 == 0) {
                top += 93;
                left = 58;
            }
        }

        str.push("<div class='ButtonBig' id='clolseLoginReDg' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ActivityClass.LotterOver();' style='left:159px;top:266px;background:url(res/Campaign/ButMan2.png) no-repeat;'></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMainbb").appendChild(divnode);
        ActivityClass.LotterCount = 1;
        ActivityClass.LotterTimeCD();
    },

    LotterTimeCD: function () {
        var cdtime = 10;
        $("body").everyTime("1s", "lottertime", function () {
            if (cdtime > 1) {
                cdtime--;
                $("#lottertime").html(cdtime + "秒后自动抽奖");
            }
            else {
                $("body").stopTime("lottertime");
                $("#lottertime").html("已自动抽奖");
                window.GameMainClass.sendRequestJson(1189, '{"pos":10}', "ActivityClass.LotteryResert");
            }
        });
    },

    //抽奖
    LotterySubmit: function (index) {
        if (ActivityClass.LotterCount < 1) {
            $("#clolseLoginReDg").css({ "background": "url(res/Campaign/ButMan1.png) no-repeat" });
            return;
        }
        if (isSubmit)
            return;
        isSubmit = true;
        //提交抽奖
        window.GameMainClass.sendRequestJson(1189, '{"pos":' + index + '}', "ActivityClass.LotteryResert");
    },

    LotteryResert: function (json) {
        isSubmit = false;
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            $("#lritem" + BackJson.pos).attr("class", "L_R_I_Bg1");
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == Number(BackJson.itemid)) {
                    $("#lritem" + BackJson.pos).html("<div class='Skill' style='top:14px;left:14px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>" + getNumSmall("X" + BackJson.itemnum, 1, 2) + "</div>");
                    $("#lotteritem" + BackJson.pos).html(BackJson.nick);
                    break;
                }
            }

            if (BackJson.userid == Systemdata.userid) {
                ActivityClass.LotterCount = 0;
                $("body").stopTime("lottertime");
                $("#clolseLoginReDg").css({ "background": "url(res/Campaign/ButMan1.png) no-repeat" });
                //将获得的物品添加到包裹中
                if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
                    AddItemToWarOther(BackJson.GoodsJson);
                }
                //将获得的物品添加临时包裹中去
                if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
                    AddItemToTwarOther(BackJson.tempsJson);
                }
            }
        }
    },

    LotterOver: function () {
        if (ActivityClass.LotterCount > 0)
            return;

        ActivityClass.WinNotify = 0;
        $("#maskbb").remove();
        $("#dialogMainbb").remove();
        $("#mapdiv").remove();
        FamousCampaignData.data.isfight = 0;
        FamousCampaignData.data.warid = 0;
        FamousCampaignData.data.teamid = 0;
        ActivityClass.inTeam = false;
        window.GameMainClass.changeMusic(1);
    },

    //开始战斗
    StarFight: function (index) {
        for (var i = 0; i < ActivityClass.RoomJson.userlist.length; i++) {
            if (ActivityClass.RoomJson.userlist[i].userid != 0) {
                if (ActivityClass.RoomJson.userlist[i].status == 0) {
                    showTextMess("队列中有成员未准备，不能开始", 0);
                    return;
                }
            }
        }
        window.GameMainClass.sendRequestJson(1176, '{"index":' + index + '}', "");
    },

    ShowWarInfo: function (type) {
        if (type == 1) { //隐藏
            $("#Show").css("display", "");
            $("#EnShow").css("display", "none");
            $(".WarPlayerInfo").css("display", "none");
            $(".WarInfo").css("display", "none");
        }
        //显示
        else {
            $("#Show").css("display", "none");
            $("#EnShow").css("display", "");
            $(".WarPlayerInfo").css("display", "");
            $(".WarInfo").css("display", "");
        }
    },

    //移动位置
    PointAction: function (index, pos) {
        if (pos != 0) {
            for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
                if (ActivityClass.FightingData.userlist[i].cdpos == pos) {
                    return;
                }
            }
        }
        //判断当前所在位置
        for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
            if (ActivityClass.FightingData.userlist[i].userid == Systemdata.userid) {
                if (ActivityClass.FightingData.userlist[i].cdtime > 0) {
                    return;
                }
                for (var j = 0; j < FuBenMapJson[index].blist.length; j++) {
                    if (FuBenMapJson[index].blist[j].pos == ActivityClass.FightingData.userlist[i].pos) {
                        var npos = FuBenMapJson[index].blist[j].npos.split(",");
                        for (var k = 0; k < npos.length; k++) {
                            if (Number(npos[k]) == pos) {
                                window.GameMainClass.openShadow();
                                window.GameMainClass.sendRequestJson(1177, '{"pos":' + pos + ',"index":' + index + '}', "ActivityClass.PosActionResert");
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    },

    //移动结果
    PosActionResert: function (json) {
        var BackJson = eval("(" + json + ")"); //{ "resert": 1, "userid": 1058221, "pos": 1,"cdpos":2, "movestatus": 1, "cdtime": 30, "index": 0,"hurt" };
        if (BackJson.resert == 1) {
            for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
                if (ActivityClass.FightingData.userlist[i].userid == BackJson.userid) {
                    //找出新位置的数据
                    for (var j = 0; j < FuBenMapJson[BackJson.index].blist.length; j++) {
                        if (FuBenMapJson[BackJson.index].blist[j].pos == BackJson.pos) {
                            //移动失败
                            if (ActivityClass.FightingData.userlist[i].pos == BackJson.pos) {
                                ActivityClass.FightingData.userlist[i].cdtime = BackJson.cdtime;
                                ActivityClass.FightingData.userlist[i].cdpos = BackJson.cdpos;
                                for (var k = 0; k < FuBenMapJson[BackJson.index].blist.length; k++) {
                                    if (FuBenMapJson[BackJson.index].blist[k].pos == BackJson.cdpos) {
                                        $("#cdpos" + i).css({ "display": "", "left": FuBenMapJson[BackJson.index].blist[k].x - 5, "top": FuBenMapJson[BackJson.index].blist[k].y + 60 });
                                        break;
                                    }
                                }

                                if (Systemdata.userid == BackJson.userid) {
                                    $("#mycdtime").html(BackJson.cdtime + "秒后可行动");
                                    $("#mycdtime").css("color", "#990000");
                                    ActivityClass.ActionCD(i);
                                }
                                else {
                                    ActivityClass.poscd(i);
                                }
                            }
                            else {//移动成功
                                $("#pos" + BackJson.pos).css({ "background": "" });
                                $("#talk" + BackJson.pos).remove();
                                $("body").stopTime("talking" + BackJson.pos);
                                $("#postemp" + i).css({ "background": "url(res/Campaign/Part/" + ActivityClass.FightingData.userlist[i].icon + ".png) no-repeat", "left": FuBenMapJson[BackJson.index].blist[j].x, "top": FuBenMapJson[BackJson.index].blist[j].y });
                                document.getElementById("postemp" + i).ontouchend = function () {
                                    ActivityClass.PointAction(BackJson.index, BackJson.pos);
                                };
                                ActivityClass.FightingData.userlist[i].pos = BackJson.pos;
                                ActivityClass.FightingData.userlist[i].cdpos = BackJson.cdpos;
                                ActivityClass.FightingData.userlist[i].cdtime = BackJson.cdtime;
                                switch (BackJson.movestatus) {
                                    case 1:
                                        window.GameMainClass.closeShadow();
                                        break;
                                    case 2:
                                        ActivityClass.FightingData.userlist[i].hurt = BackJson.hurt;
                                        $("#hurt" + i).html(BackJson.hurt);
                                        break;
                                    case 3:
                                        window.GameMainClass.closeShadow();
                                        break;
                                }

                                if (Systemdata.userid == BackJson.userid) {
                                    $("#mycdtime").html(ActivityClass.FightingData.userlist[i].cdtime + "秒后可行动");
                                    $("#mycdtime").css("color", "#990000");
                                    if (BackJson.cdpos > 0)
                                        $("#cdpos" + i).css({ "display": "", "left": FuBenMapJson[BackJson.index].blist[j].x - 5, "top": FuBenMapJson[BackJson.index].blist[j].y + 60 });
                                    ActivityClass.ActionCD(i);
                                } else {
                                    if (BackJson.cdpos > 0) {
                                        $("#cdpos" + i).css({ "display": "", "left": FuBenMapJson[BackJson.index].blist[j].x - 5, "top": FuBenMapJson[BackJson.index].blist[j].y + 60 });
                                        ActivityClass.poscd(i);
                                    }
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }

        showTextMess(BackJson.info, BackJson.resert);
    },

    //捡到宝箱
    PickBox: function (json) {
        var BackJson = eval("(" + json + ")");
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
        }

        showTextMess(BackJson.info, BackJson.resert);
    },

    LeaveFight: function () {
        ShowMessage("确定要退出战斗吗？", function () { window.GameMainClass.sendRequestJson(1190, '', "ActivityClass.LeaveFightResert"); }, function () { $("#message").remove(); $("#mask1").remove(); }, null, "noshow");
    },

    LeaveFightResert: function (json) {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert == 1) {
            if (Systemdata.userid == BackJson.userid) {
                $("#message").remove(); $("#mask1").remove();
                $("#mapdiv").remove();
                $("body").stopTime("fubentime");
                FamousCampaignData.data.isfight = 0;
                FamousCampaignData.data.warid = 0;
                FamousCampaignData.data.teamid = 0;
                ActivityClass.inTeam = false;
                window.GameMainClass.changeMusic(1);
            }
            else {
                for (var i = 0; i < ActivityClass.FightingData.userlist.length; i++) {
                    if (ActivityClass.FightingData.userlist[i].userid == BackJson.userid) {
                        $("#playerinfo" + i).remove();
                        $("#postemp" + i).css("display", "none");
                        showTextMess(BackJson.info, BackJson.resert);
                        if (i != ActivityClass.FightingData.userlist.length - 1) {
                            for (var j = i + 1; j < ActivityClass.FightingData.userlist.length; j++) {
                                var top = $("#playerinfo" + j).position().top;
                                $("#playerinfo" + j).css("top", (top - 40) + "px");
                            }
                        }
                        break;
                    }
                }
            }
        } else {
            $("#message").remove(); $("#mask1").remove();
            showTextMess(BackJson.info, BackJson.resert);
        }
    }
}