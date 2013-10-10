var MyshowDialog =
{

    isResert: false, //当前是否已经发送过重置的指令了
    timer2: null,
    timer3: null,
    tempHeroIndex: 0,
    tempLocalIndex: 0,

    //切换英雄
    CheckMyHero: function () {
        var index = MyshowDialog.tempHeroIndex;
        var i = MyshowDialog.tempLocalIndex;
        var str = new Array();
        $("#MyHero").remove();
        $("#FuHunDialog").remove();
        $("#EquipmentDialog").remove();
        str.push("<div id='MyHero' >");
        if (index < HeroJson.data[0].HeroList.length) {
            str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;'></div>");
            str.push("<div id='job'");
            switch (HeroJson.data[0].HeroList[index].Job) {
                case 1:
                    str.push("></div>");
                    //克制类型
                    str.push("<div id='Restraint'  ></div>");
                    break;
                case 2:
                    str.push(" style='background-position:0 -23px;'></div>");
                    str.push("<div id='Restraint'style='background-position:0 -15px;'></div>");
                    break;
                case 3:
                    str.push(" style='background-position:0 -46px;'></div>");
                    str.push("<div id='Restraint' style='background-position:0 -30px;'></div>");
                    break;
            }
            var namecolor = "#00CCFF";
            switch (HeroJson.data[0].HeroList[index].Qualification) {
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

            //资质+培养属性
            var templist = HeroJson.data[0].HeroList[index].Equipment.split(",");

            //加装备的属性
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

            //转生次数
            str.push("<div id='zsStars'>");
            var zslist = HeroJson.data[0].HeroList[index].stars.split(",");
            var haszsnum = false;
            var discount = 0;
            for (var n = 0; n < zslist.length; n++) {
                if (Number(zslist[n]) == 0) {
                    haszsnum = true;
                    break;
                }
                switch (Number(zslist[n])) {
                    case 1:
                        str.push("<div class='Copper'></div>");
                        discount += 6;
                        break;
                    case 2:
                        str.push("<div class='Silver'></div>");
                        discount += 8;
                        break;
                    case 3:
                        str.push("<div class='Glod'></div>");
                        discount += 10;
                        break;
                }
            }
            str.push("</div>");

            //hp结果
            var hpval = Math.round((HeroJson.data[0].HeroList[index].Hp * discount / 100) + HeroJson.data[0].HeroList[index].Hp + Number(templist[1]) + Number(templist[3]));
            //atk结果
            var atkval = Math.round(HeroJson.data[0].HeroList[index].Attack * discount / 100 + HeroJson.data[0].HeroList[index].Attack + Number(templist[0]));
            //def结果
            var defval = Math.round(HeroJson.data[0].HeroList[index].Defend * discount / 100 + HeroJson.data[0].HeroList[index].Defend + Number(templist[2]));

            //战法加成
            for (var aa = 0; aa < ZfJcData.data.jlist.length; aa++) {
                if (ZfJcData.data.jlist[aa].job == HeroJson.data[0].HeroList[index].Job) {
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
                if (lqJcData.data.llist[bb].gsid == HeroJson.data[0].HeroList[index].Id) {
                    hpval += lqJcData.data.llist[bb].hp;
                    atkval += lqJcData.data.llist[bb].atk;
                    defval += lqJcData.data.llist[bb].def;
                    break;
                }
            }

            str.push("<div id='HeroName' style='color:" + namecolor + ";'>" + GeneralsJson[i].Name + "</div>"); //武将名称
            str.push("<div id='HeroLV'>" + getLvNum(HeroJson.data[0].HeroList[index].Hlv, 0) + "</div>"); //等级
            str.push("<div id='Qualification' class='Qualification' style='left:65px;top:132px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:50px;'>" + HeroJson.data[0].HeroList[index].QualificationVal + "</div></div>"); //资质
            str.push("<div id='Experience' style='width:" + (HeroJson.data[0].HeroList[index].Experience / HeroJson.data[0].HeroList[index].NextE) * 95 + "px;'>"); //经验值进度条
            str.push("<div id='ExperienceVal'>" + HeroJson.data[0].HeroList[index].Experience + "/" + HeroJson.data[0].HeroList[index].NextE + "</div></div>"); //经验值数字
            str.push("<div id='hp' class='Qualification' style='left:48px;top:157px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:100px;'>" + hpval + "<font style='color:green;'>(" + GeneralsJson[i].HpGrow + ")</font></div></div>"); //生命值
            str.push("<div id='Attack' class='Qualification' style='left:48px;top:180px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:100px;'>" + atkval + "<font style='color:green;'>(" + GeneralsJson[i].AtkGrow + ")</font></div></div>"); //进攻
            str.push("<div id='Defend' class='Qualification' style='left:48px;top:205px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:100px;'>" + defval + "<font style='color:green;'>(" + GeneralsJson[i].DefGrow + ")</font></div></div>"); //防守
            var newstring = GeneralsJson[i].Detail;
            if (newstring.length > 30) {
                newstring = newstring.substring(0, 29) + "...";
            }
            str.push("<div id='Detial'>" + newstring + "</div>"); //武将介绍
            str.push("<div Class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.DissMissHero(" + index + ");' style='background:url(res/dialog/ButtonFire.png) no-repeat;;top:26px;left:230px;'></div>"); //解雇按钮

            //技能
            if (HeroJson.data[0].HeroList[index].Hert != 0) {
                var m = 0;
                for (; m < SkillJson.length; m++) {
                    if (SkillJson[m].sId == HeroJson.data[0].HeroList[index].Hert) {
                        str.push("<div id='hert' class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;left:172px;top:135px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSkillData(" + m + ",0);'></div>");
                        break;
                    }
                }
            }
            else {
                str.push("<div id='hert' class='SkillEmpt' style='left:172px;top:119px;'></div>");
            }

            str.push("<div class='DefaultFont' style='color:#FFFF00;top:98px;left:145px;text-align:center;width:75px;font-size:12px;'>三围培养增加" + discount + "%</div>");
            //转生按钮
            if (haszsnum)
                str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.LoadZS(" + index + ");' style='top:98px;left:230px;background:url(res/dialog/Turn_But2.png) no-repeat;'></div>");

            //专属技能
            if (GeneralsJson[i].talent != 0) {
                str.push("<div id='pt2'");
                var m = 0;
                for (; m < TalentJson.length; m++) {
                    if (TalentJson[m].tId == GeneralsJson[i].talent) {
                        break;
                    }
                }
                str.push("class='Skill' style='background:url(res/talent/" + TalentJson[m].tImgid + ".png) no-repeat;left:172px;top:186px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowTalentData(" + m + ");'>");

                if (HeroJson.data[0].HeroList[index].talent < 1) {
                    str.push("<img src='res/dialog/Turn_Dower.png' /></div>");
                    //开启天赋按钮
                    str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.OpenTalent();' style='top:190px;left:230px;background:url(res/dialog/ButtonOpen.png) no-repeat;'></div>");
                }
                else
                    str.push("</div>");
            }
            else {
                str.push("<div id='pt2' class='DefaultFont_14 RedFont' style='left:172px;top:196px;'>金将专属</div>");
            }
        }
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);
    },

    //开启天赋
    OpenTalent: function () {
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv < 60) {
            showTextMess("武将60级可开启", 0);
            return;
        }
        window.GameMainClass.sendRequestJson(1226, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.OpenTalentResult");
    },

    //开启天赋结果
    OpenTalentResult: function (json) {
        //{"resert":1,"info":ok,"tokensid":23444}  扣除一个天赋令的包裹序号ID
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            if (WarhoushJson.data[0].isResert == 1) {
                if (BackJson.tokensid > 0) {
                    for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                        if (WarhoushJson.data[0].GoodsList[j].ItId == BackJson.tokensid) {
                            WarhoushJson.data[0].GoodsList[j].iVal -= 1;
                            if (WarhoushJson.data[0].GoodsList[j].iVal == 0)
                                WarhoushJson.data[0].GoodsList.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            //改变武将数据
            for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                if (HeroJson.data[0].HeroList[i].Id == BackJson.Client[0].gsid) {
                    HeroJson.data[0].HeroList[i].talent = 1;
                    break;
                }
            }
            MyshowDialog.CheckMyHero();
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    //显示天赋简介
    ShowTalentData: function (tindex) {
        $("body").stopTime("showData");
        $("#showData1").remove();
        var str = new Array();
        var h = TalentJson[tindex].detail.length / 9 + (TalentJson[tindex].detail.length % 9 == 0 ? 0 : 1);
        h = (h + 1) * 17;
        str.push("<div id='showData1' class='showData' style='bottom:20px;left:30px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showData1\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:#FFFF00;'>" + TalentJson[tindex].tName + "</td></tr>");
        str.push("<tr><td>描述：</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + TalentJson[tindex].detail + "</td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("MyHero").appendChild(divnode);

        $("body").oneTime("3s", "showData", function () {
            $("body").stopTime("showData");
            var i = 100;
            $("body").everyTime("20ms", "showData", function () {
                i--;
                document.getElementById("showData1").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData1").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showData");
                    $("#showData1").remove();
                }
            });
        });
    },

    checkGoldMod: 0,

    loadZSData: function (json) {
        var BackJosn = JSON.parse(json);
        if (BackJosn.resert == 1) {
            $("#scfont").html("银币×<font style='color:#990000'>" + BackJosn.coin + "</font>");
            var itemlist = BackJosn.itemnums.split(",");
            if (Number(itemlist[0]) != 0) {
                $("#itemfont").html(BackJosn.itemnames.split(",")[0] + "×<font style='color:#990000'>" + itemlist[0] + "</font>");
            }
            else
                $("#itemfont").html("无消耗");
            $("#itemfontH").html(BackJosn.itemnames.split(",")[1] + "×<font style='color:#990000'>" + itemlist[1] + "</font>");
        }
    },

    //打开转生界面
    LoadZS: function () {
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv < 65) {
            showTextMess("武将等级不够", 0);
            return;
        }
        MyshowDialog.checkGoldMod = 0;
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='ZSdia'>");
        str.push("<div class='close' style='left:410px;top:2px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#ZSdia\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div class='DefaultFont RedFont' style='top:100px;left:30px;font-size:12px;'>铜星-三围培养加成 <font style='color:#ffff00;'>6%</font></div>");
        str.push("<div class='DefaultFont RedFont' style='top:115px;left:30px;font-size:12px;'>银星-三围培养加成 <font style='color:#ffff00;'>8%</font></div>");

        str.push("<div class='DefaultFont RedFont' style='top:100px;left:177px;font-size:12px;'>三围培养加成 <font style='color:#ffff00;'>10%</font></div>");
        str.push("<div class='DefaultFont RedFont' style='top:115px;left:182px;font-size:12px;'>可以使用金星符</div>");

        //系统说明
        str.push("<div class='DefaultFont RedFont' style='font-size:12px;font-weight:200;top:50px;left:298px;width:125px;'>武将达到65级可转生，超过65级的EXP转生时系统自动返还给转生武将。转生等级返回到1级，每个武将只有5次转生机会。不同星加成的百分比不同。<br />铜星：6%<br />银星：8%<br/>金星：10%</div>");

        //花费
        str.push("<div class='DefaultFont_14' id='scfont' style='top:160px;left:50px;'>loading...</div>");
        str.push("<div class='DefaultFont_14' id='itemfont' style='top:183px;left:50px;'>loading...</div>");

        str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.CheckSelect();' style='top:163px;left:165px;background:url(res/login/checkbox_empty.png) no-repeat;width:32px;height:32px;' id='select'>");
        str.push("</div>");

        str.push("<div class='DefaultFont_14' id='itemfontH' style='top:172px;left:200px;'>loading...</font></div>");

        str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ZSSubmit();'  style='width:80px;height:44px;background:url(res/dialog/Turn_But1.png) no-repeat;top:210px;left:184px;'></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);

        window.GameMainClass.sendRequestJson(1225, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.loadZSData");
    },

    //转生提交
    ZSSubmit: function () {
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv < 65) {
            showTextMess("武将等级不够", 0);
            return;
        }
        window.GameMainClass.sendRequestJson(1223, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"isgoldstar":' + Number(MyshowDialog.checkGoldMod) + '}', "MyshowDialog.ZSResult");
    },

    //转生结果
    ZSResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            $("#ZSdia").remove();
            $("#mask2").remove();
            //减去银币
            updateGold(1, BackJson.coin);
            if (WarhoushJson.data[0].isResert == 1) {
                //减去物品
                var itemlist = BackJson.itemsids.split(",");
                for (var i = 0; i < itemlist.length; i++) {
                    for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                        if (WarhoushJson.data[0].GoodsList[j].ItId == parseInt(itemlist[i])) {
                            if (parseInt(BackJson.itemnums.split(",")[i]) > 0)
                                WarhoushJson.data[0].GoodsList[j].iVal = BackJson.itemnums.split(",")[i];
                            else
                                WarhoushJson.data[0].GoodsList.splice(j, 1);

                            break;
                        }
                    }
                }
            }
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    CheckSelect: function () {
        if (MyshowDialog.checkGoldMod)
            $("#select").css("background", "url(res/login/checkbox_empty.png) no-repeat");
        else
            $("#select").css("background", "url(res/login/checkbox.png) no-repeat");

        MyshowDialog.checkGoldMod = !MyshowDialog.checkGoldMod;
    },

    //显示技能信息
    ShowSkillData: function (skillindex, type) {
        $("body").stopTime("showData");
        $("#showData1").remove();
        var str = new Array();

        var left = 30, top = 0;
        switch (type) {
            case 0:
                top = 50;
                break;
            case 1:
                top = 80;
                break;
            case 2:
                top = 100;
                break;
            case 4:
                top = 26;
                left = 246;
                break;
            case 5:
                top = 26;
                left = 246;
                break;
        }

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

        str.push("<div id='showData1' class='showData' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showData1\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:" + namecolor + ";'>" + SkillJson[skillindex].sName + "</td></tr>");
        //str.push("<tr><td>职业：" + "<font style='color:#E4BA5D'>" + job + "</font></td></tr>");
        str.push("<tr><td>类型：" + "<font style='color:#E4BA5D'>" + (SkillJson[skillindex].sType == 1 ? "主动技能" : "被动技能") + "</font></td></tr>");
        str.push("<tr><td>描述：</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + SkillJson[skillindex].detail + "</td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        if (type == 4)
            document.getElementById("ResetSkillDialog").appendChild(divnode);
        else if (type == 5)
            document.getElementById("HeroSkillDialog").appendChild(divnode);
        else
            document.getElementById("MyHero").appendChild(divnode);

        $("body").oneTime("3s", "showData", function () {
            $("body").stopTime("showData");
            var i = 100;
            $("body").everyTime("20ms", "showData", function () {
                i--;
                document.getElementById("showData1").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData1").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("showData");
                    $("#showData1").remove();
                }
            });
        });
    },

    //开启新武将位
    OpenHeroPos: function (index) {
        $("#UserBookDg").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='UserBookDg'>");
        //关闭按钮
        str.push("<div class='close' style='left:235px;top:2px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div id='UseBookBg' style='background:url(res/dialog/OpenGP.png) no-repeat;'>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:40px;left:78px;text-align:center;width:48px;height:15px;'>" + UserJson.New_HeroPos_M + "</div>");
        str.push("<div class='ButtonSmall' style='top:150px;left:48px;background:url(res/dialog/ButOK.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.OpenHeroSubmit();'></div>");
        str.push("<div class='ButtonSmall' style='top:150px;left:150px;background:url(res/dialog/ButClose.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("</div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //开启新武将位提交
    OpenHeroSubmit: function (index) {
        if (UserJson.Gold < UserJson.New_HeroPos_M) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        window.GameMainClass.sendRequestJson(1116, "", "OpenNewHeroPosResert");
    },

    //解雇武将
    DissMissHero: function (index) {
        //判断武将当前状态是否允许被解雇
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].State1 > 1 || HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].State2 == 2) {
            showTextMess("当前武将正在讨伐中，不能被解雇", 0);
            return;
        }
        //如果是在阵型中， 则判断是不是阵型中的最后一个武将
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].State2 == 1) {
            //判断当前阵型中武将的数量
            var FormationHero = UserJson.FormationHero.split(",");
            var len = 0;
            for (var i = 0; i < FormationHero.length; i++) {
                if (Number(FormationHero[i]) > 0) {
                    len++;
                }
            }

            if (len == 1) {
                showTextMess("当前阵形中仅余该名武将，不能被解雇", 0);
                return;
            }
        }
        //判断是否有装备
        var HeroEq = HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Equipment.split(",");
        var len = 0;
        for (var i = 0; i < HeroEq.length; i++) {
            if (Number(HeroEq[i]) != 0)
                len++;
        }
        //判断包裹的空余数量
        if (len > 0) {
            var warlen = 0;
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].gid == 0)
                    warlen++;
            }

            if (len > 24 * UserJson.NumOpenedStorage - warlen) {
                ShowMessage("包裹当前的空位不足以存放该武将解雇后卸下的装备，是否现在去清理包裹？", function () { $("#other").html(""); $("#mask1").remove(); EnterBuliding(3000); tempdialog = "2000"; }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }

        var str = new Array();
        $("#jgbg").remove();
        $("#mask2").remove();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='jgbg'>");
        str.push("<div class='close' style='left:232px;top:3px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#jgbg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div class='HeroHead' style='top:35px;left:25px;background:url(res/HeroHead/" + GeneralsJson[MyshowDialog.tempLocalIndex].Imgid + ".png) no-repeat;'");
        var namecolor = '#00CCFF';
        switch (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Qualification) {
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

        str.push("><div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[MyshowDialog.tempLocalIndex].Name + "</div>");
        str.push("<div><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv) + "</div>");
        str.push("</div>");
        str.push("<div class='SelectedItem' style='top:50px;left:220px; width:35px;height:35px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.CheckUseFhl();'><div class='SelectedImg' style='top:3px;left:2px;' id='selectimg'></div></div>");
        str.push("<div class='DefaultFont_14 RedFont' id='fhlcount' style='top:47px;left:134px;width:26px;height:16px;text-align:center;'>10</div>");
        str.push("<div class='DetialBox' id='jgdetial' style='width:234px;height:64px;font-size:14px;line-height:16px;left:19px;top:119px;padding-left:5px;color:#990000;'>数据加载中...</div>");
        str.push("<div class='ButtonSmall' id='jiegubtn' style='background:url(res/dialog/ButtonFire.png) no-repeat;top:198px;left:108px;display:none;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.JieGuSubmit();'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        //判断该武将的解雇数据是否已经获取
        var bool = false;
        var nindex = -1;
        for (var i = 0; i < DeleHeroJson.data.HeroList.length; i++) {
            if (DeleHeroJson.data.HeroList[i].gID == HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id) {
                if (DeleHeroJson.data.HeroList[i].isResert == 1) {
                    nindex = i;
                    bool = true;
                }
                break;
            }
        }
        if (bool)
            MyshowDialog.ShowJGData(nindex);
        else {
            window.GameMainClass.sendRequestJson(1105, '{"gSID":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "JieGuData");
        }

    },

    //显示武将解雇信息
    ShowJGData: function (index) {
        //{ "gID": 3, "useCount": 10, "GoodsList": "6450,6451,6452", "useVal": "3,1,1", "noUseVal": "1,0,1", "UseSVal": 5000, "noUseSVal": 3000, "isResert": 1 }
        if (document.getElementById("jgbg") != null) {
            $("#fhlcount").html(DeleHeroJson.data.HeroList[index].useCount); //需要使用的返回令数量
            var goodslist = DeleHeroJson.data.HeroList[index].GoodsList.split(",");
            var str = new Array();
            var len = 0;
            str.push("<table width='100%'><tr>");
            if ($("#selectimg").css("display") == "none") {
                for (var i = 0; i < goodslist.length; i++) {
                    if (Number(DeleHeroJson.data.HeroList[index].noUseVal.split(",")[i]) > 0) {
                        str.push("<td>" + goodslist[i] + "×" + DeleHeroJson.data.HeroList[index].noUseVal.split(",")[i] + "</td>");
                        len++;
                    }

                    if ((len + 1) % 2 == 0) {
                        str.push("</tr><tr>");
                    }
                }
                if (DeleHeroJson.data.HeroList[index].noUseSVal > 0) {
                    str.push("<td>银币×" + DeleHeroJson.data.HeroList[index].noUseSVal + "</td>");
                    str.push("</tr>");
                }
            }
            else {
                for (var i = 0; i < goodslist.length; i++) {
                    if (Number(DeleHeroJson.data.HeroList[index].useVal.split(",")[i]) > 0) {
                        str.push("<td>" + goodslist[i] + "×" + DeleHeroJson.data.HeroList[index].useVal.split(",")[i] + "</td>");
                        len++;
                    }
                    if ((len + 1) % 2 == 0) {
                        str.push("</tr><tr>");
                    }
                }
                if (DeleHeroJson.data.HeroList[index].UseSVal > 0) {
                    str.push("<td>银币×" + DeleHeroJson.data.HeroList[index].UseSVal + "</td>");
                    str.push("</tr>");
                }
            }

            str.push("</table>");
            $("#jgdetial").html(str.join(""));
            $("#jiegubtn").css("display", "");
            //window.GameMainClass.sendRequestJson(1103, '{"fubenID":' + BattleJson[BackJson.data.mapindex].list[BackJson.data.commindex].id + ',"isRealive":0}', "revivalBack");
        }
    },

    //改变使用返回令的状态
    CheckUseFhl: function () {
        if ($("#selectimg").css("display") == "none")
            $("#selectimg").css("display", "")
        else
            $("#selectimg").css("display", "none")
        for (var j = 0; j < DeleHeroJson.data.HeroList.length; j++) {
            if (DeleHeroJson.data.HeroList[j].gID == HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id) {
                if (DeleHeroJson.data.HeroList[j].isResert == 1) {
                    var goodslist = DeleHeroJson.data.HeroList[j].GoodsList.split(",");
                    var str = new Array();
                    var len = 0;
                    str.push("<table width='100%'><tr>");
                    if ($("#selectimg").css("display") == "none") {
                        for (var i = 0; i < goodslist.length; i++) {
                            if (Number(DeleHeroJson.data.HeroList[j].noUseVal.split(",")[i]) > 0) {
                                str.push("<td>" + goodslist[i] + "×" + DeleHeroJson.data.HeroList[j].noUseVal.split(",")[i] + "</td>");
                                len++;
                            }

                            if ((len + 1) % 2 == 0) {
                                str.push("</tr><tr>");
                            }
                        }
                        if (DeleHeroJson.data.HeroList[j].noUseSVal > 0) {
                            str.push("<td>银币×" + DeleHeroJson.data.HeroList[j].noUseSVal + "</td>");
                            str.push("</tr>");
                        }
                    }
                    else {
                        for (var i = 0; i < goodslist.length; i++) {
                            if (Number(DeleHeroJson.data.HeroList[j].useVal.split(",")[i]) > 0) {
                                str.push("<td>" + goodslist[i] + "×" + DeleHeroJson.data.HeroList[j].useVal.split(",")[i] + "</td>");
                                len++;
                            }
                            if ((len + 1) % 2 == 0) {
                                str.push("</tr><tr>");
                            }
                        }
                        if (DeleHeroJson.data.HeroList[j].UseSVal > 0) {
                            str.push("<td>银币×" + DeleHeroJson.data.HeroList[j].UseSVal + "</td>");
                            str.push("</tr>");
                        }
                    }

                    str.push("</table>");

                    $("#jgdetial").html(str.join(""));
                }
                break;
            }
        }
    },

    //提交解雇武将请求
    JieGuSubmit: function () {
        var bool = $("#selectimg").css("display") == "none" ? 0 : 1;
        if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].State2 == 1) {
            ShowMessage("该武将正在出战阵型上，解雇后将自动撤离，是否确认解雇？",
            function () {
                $("#other").html(""); $("#mask1").remove();
                //是否使用了返回令，如果使用了，判断当前返回令的数量
                if (bool == 1) {
                    for (var j = 0; j < DeleHeroJson.data.HeroList.length; j++) {
                        if (DeleHeroJson.data.HeroList[j].gID == HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id) {
                            if (DeleHeroJson.data.HeroList[j].useCount > WarHouseClass.GetItemCounts(6512)) {
                                ShowMessage("返还令不足，共缺少" + String(DeleHeroJson.data.HeroList[j].useCount - WarHouseClass.GetItemCounts(6512)) + "个，是否去商城购买?",
                                function () { $("#message").remove(); $("#mask1").remove(); ShopClass.ShowItemId = 6512; EnterBuliding(8500); }, function () { $("#message").remove(); $("#mask1").remove(); });
                                return;
                            }
                            else {
                                //DismissResert('{"Client":[{"gSID":3,"isReturnToken":1}],"ExpBooksID":"6552,6551,6550","ExpBooksNum":"1,1,4","GoodsJson":[{"ItId":2988,"ItemId":6511,"Job":0,"NLv":0,"RefineLv":0,"Type":6,"atkBonus":0,"correId":0,"defBonus":0,"gid":0,"hpBonus":0,"iVal":7,"quality":0,"refAtk":0,"refDef":0,"refHP":0}],"getCoin":6000,"getExp":11491,"info":"胡车儿 卸甲归田","numReturnToken":1,"resert":1,"tempsJson":[],"useTokenNum":"7","useTokenSID":"2988"}');
                                window.GameMainClass.sendRequestJson(1106, '{"gSID":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"isReturnToken":1}', "DismissResert");
                            }
                            break;
                        }
                    }
                }
                else
                //DismissResert('{"Client":[{"gSID":3,"isReturnToken":1}],"ExpBooksID":"6552,6551,6550","ExpBooksNum":"1,1,4","GoodsJson":[{"ItId":2988,"ItemId":6511,"Job":0,"NLv":0,"RefineLv":0,"Type":6,"atkBonus":0,"correId":0,"defBonus":0,"gid":0,"hpBonus":0,"iVal":7,"quality":0,"refAtk":0,"refDef":0,"refHP":0}],"getCoin":6000,"getExp":11491,"info":"胡车儿 卸甲归田","numReturnToken":1,"resert":1,"tempsJson":[],"useTokenNum":"7","useTokenSID":"2988"}');
                    window.GameMainClass.sendRequestJson(1106, '{"gSID":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"isReturnToken":0}', "DismissResert");
            }, function () { $("#other").html(""); $("#mask1").remove(); });
        }
        else {
            //是否使用了返回令，如果使用了，判断当前返回令的数量
            if (bool == 1) {
                for (var j = 0; j < DeleHeroJson.data.HeroList.length; j++) {
                    if (DeleHeroJson.data.HeroList[j].gID == HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id) {
                        if (DeleHeroJson.data.HeroList[j].useCount > WarHouseClass.GetItemCounts(6512)) {
                            ShowMessage("返还令不足，共缺少" + String(DeleHeroJson.data.HeroList[j].useCount - WarHouseClass.GetItemCounts(6512)) + "个，是否去商城购买?",
                                function () { $("#other").html(""); $("#mask1").remove(); ShopClass.ShowItemId = 6512; EnterBuliding(8500); }, function () { $("#other").html(""); $("#mask1").remove(); });

                            return;
                        }
                        else {
                            window.GameMainClass.sendRequestJson(1106, '{"gSID":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"isReturnToken":1}', "DismissResert");
                            //DismissResert('{"Client":[{"gSID":3,"isReturnToken":1}],"ExpBooksID":"6552,6551,6550","ExpBooksNum":"1,1,4","GoodsJson":[{"ItId":2988,"ItemId":6511,"Job":0,"NLv":0,"RefineLv":0,"Type":6,"atkBonus":0,"correId":0,"defBonus":0,"gid":0,"hpBonus":0,"iVal":7,"quality":0,"refAtk":0,"refDef":0,"refHP":0}],"getCoin":6000,"getExp":11491,"info":"胡车儿 卸甲归田","numReturnToken":1,"resert":1,"tempsJson":[],"useTokenNum":"7","useTokenSID":"2988"}');
                        }
                        break;
                    }
                }
            }
            else
                window.GameMainClass.sendRequestJson(1106, '{"gSID":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"isReturnToken":0}', "DismissResert");
        }
    },

    //英雄技能位管理
    HeroSkillManage: function (index) {
        $("#KidsDialog").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='KidsDialog'>");
        //关闭按钮
        str.push("<div class='close' style='left:441px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#KidsDialog\").remove();$(\"#mask2\").remove();}'></div>");
        //title
        str.push("<div class='dialogTitle' style='width:122px;background:url(res/dialog/Txt_HSkill.png) no-repeat;top:5px;left:35px;'></div>");
        str.push("<div id='HeroSkillDialog'>");
        //获取当前英雄技的数据
        var isFirst = true;
        var top = 101, left = 14, top1 = 55, left1 = 22;
        var MySkillList = HeroJson.data[0].HeroList[index].SkillLocation.split(",");
        for (var i = 0; i < MySkillList.length; i++) {
            if (MySkillList[i] == "0") {
                if (isFirst) {
                    str.push("<div class='SkillLock' style='top:" + top1 + "px;left:" + left1 + "px;'><div class='TenGold'></div></div>");
                    str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.OpenHeroSill(" + index + "," + i + ");' id='But" + String(i) + "' style='top:" + top + "px;left:" + left + "px;background:url(res/dialog/ButtonOpen.png) no-repeat;'></div>");
                    isFirst = false;
                }
                else {
                    str.push("<div class='ButtonSmall' id='But" + String(i) + "' style='top:" + top + "px;left:" + left + "px;background:url(res/dialog/ButtonOpens.png) no-repeat;'></div>");
                    str.push("<div class='SkillLock' style='top:" + top1 + "px;left:" + left1 + "px;'><div class='TenGold'></div></div>");
                }
            }
            else {
                if (MySkillList[i] == "1") {
                    str.push("<div class='SkillEmpt' style='top:" + top1 + "px;left:" + left1 + "px;'></div>");
                    str.push("<div class='ButtonSmall' style='top:" + (top - 2) + "px;left:" + (left + 7) + "px;background:url(res/dialog/UI_SkillTxT1.png) no-repeat;width:38px;height:29px;'></div>");
                    //str.push("<div class='LearnButton' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.LearnHeroSkill(Number(" + index + ")," + i + ");' id='But" + String(i) + "' style='top:" + top + "px;left:" + left + "px;'></div>");
                }
                else {
                    //获取对应技能对应的图标
                    var m = 0;
                    for (; m < SkillJson.length; m++) {
                        if (SkillJson[m].sId == Number(MySkillList[i]))
                            break;
                    }
                    str.push("<div class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;top:" + top1 + "px;left:" + left1 + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSkillData(" + m + ",5);'></div>");
                    if (HeroJson.data[0].HeroList[index].Hert == Number(MySkillList[i])) {
                        str.push("<div id='SkillSelect' style='top:" + (top1 - 2) + "px;left:" + (left1 - 2) + "px'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSkillData(" + m + ",5);'></div>");
                        str.push("<div class='ButtonSmall' id='But" + String(i) + "' style='top:" + (top - 2) + "px;left:" + (left - 2) + "px;background:url(res/dialog/ButtonUse2.png) no-repeat;'></div>");
                    }
                    else
                        str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.UseHeroSkill(Number(" + index + ")," + m + "," + i + ");' id='But" + String(i) + "' style='top:" + (top - 2) + "px;left:" + (left - 2) + "px;background:url(res/dialog/ButtonUse.png) no-repeat;'></div>");
                }
            }
            if (i == 3) {
                top += 86;
                left = 16;

                top1 += 86;
                left1 = 22;
            }
            else {
                left += 56;
                left1 += 56;
            }
        }
        str.push("</div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        MyshowDialog.LearnHeroSkill(index);
    },

    //使用了某个英雄技
    UseHeroSkill: function (HeroIndex, SkillIndex, SkillLocationIndex) {
        window.GameMainClass.ManageUseSkill(Number(HeroJson.data[0].HeroList[HeroIndex].Id), Number(HeroIndex), Number(SkillIndex), Number(SkillLocationIndex));
    },

    tempBookJson: { "SkillBook": [] },

    //学习英雄技能窗口:英雄序列，技能位的序列
    LearnHeroSkill: function (HeroIndex) {
        var str = new Array();
        if (document.getElementById("LearnSkillDialog") != null)
            return;

        str.push("<div id='LearnSkillDialog'>");
        str.push("<div id='BookPage'>");
        str.push("</div>");
        $("#HeroSkillDialog").html($("#HeroSkillDialog").html() + str.join(""));
        MyshowDialog.tempBookJson.SkillBook.splice(0, MyshowDialog.tempBookJson.SkillBook.length);
        var job = HeroJson.data[0].HeroList[HeroIndex].Job;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 5) {
                if (WarhoushJson.data[0].GoodsList[i].Job == job) {
                    //获取对应技能的图片
                    for (var j = 0; j < GoodsJson.length; j++) {
                        if (GoodsJson[j].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                            MyshowDialog.tempBookJson.SkillBook.push(eval(WarhoushJson.data[0].GoodsList[i]));
                            break;
                        }
                    }
                }
            }
        }
        MyshowDialog.SkillBookChangePage(1, HeroIndex);
    },

    /*技能书翻页*/
    SkillBookChangePage: function (pageindex, HeroIndex) {
        var len = MyshowDialog.tempBookJson.SkillBook.length;
        var startindex = (pageindex - 1) * 12;
        var endindex = 12;
        var maxpage = 1;
        if (len > 12) {
            maxpage = parseInt(len / 12) + (len % 12 == 0 ? 0 : 1);
        }

        if (len <= 12)
            endindex = len;
        else if (pageindex <= len / 12) {
            endindex = startindex + 12;
        }
        else {
            endindex = startindex + len % 12;
        }


        var top = 6, left = 10, top1 = 116, left1 = 23;
        var str = new Array();
        for (var i = startindex, k = 0; i < endindex; i++, k++) {
            if (k != 0) {
                if (k % 4 == 0) {
                    top += 46;
                    left = 10;
                }
                else {
                    left += 46;
                }
            }
            //获取对应技能的图片
            for (var j = 0; j < GoodsJson.length; j++) {
                if (GoodsJson[j].ItemId == MyshowDialog.tempBookJson.SkillBook[i].ItemId) {
                    str.push("<div class='SkillBook' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowBookData(" + j + "," + HeroIndex + "," + i + ");' style='background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;top:" + top + "px;left:" + left + "px;'>");
                    if (MyshowDialog.tempBookJson.SkillBook[i].iVal > 0)
                        str.push(getNumSmall("X" + String(MyshowDialog.tempBookJson.SkillBook[i].iVal), 1, 2));
                    str.push("</div>");
                    break;
                }
            }
        }

        if (pageindex != 1) {
            str.push("<div class='ButtonLeft leftOn' style='top:147px;left:34px;z-index:30;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.SkillBookChangePage(" + String(pageindex - 1) + "," + HeroIndex + ");'");
        }
        else
            str.push("<div class='ButtonLeft' style='top:147px;left:34px;z-index:30;'");
        str.push("></div>");
        if (pageindex < maxpage) {
            str.push("<div class='ButtonRight rightOn'  style='top:147px;left:132px;z-index:30;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.SkillBookChangePage(" + String(pageindex + 1) + "," + HeroIndex + ");'");
        }
        else
            str.push("<div class='ButtonRight'  style='top:147px;left:132px;z-index:30;'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:147px;left:70px;text-align:center;width:54px; line-height:25px;'>" + pageindex + "/" + maxpage + "</div>");
        $("#BookPage").html(str.join(""));
    },


    //显示技能书信息
    ShowBookData: function (bookindex, HeroIndex, index) {
        $("#showData").remove();
        var str = new Array();
        var left = 110, top = 40;
        var h = GoodsJson[bookindex].detail.length / 9 + (GoodsJson[bookindex].detail.length % 9 == 0 ? 0 : 1);

        h = (h + 3) * 17 + 40;


        var namecolor = "#ffffff";
        switch (GoodsJson[bookindex].NColor) {
            case 1:
                namecolor = "#00CCFF";
                break;
            case 2:
                namecolor = "#FF00FF";
                break;
            case 3:
                namecolor = "#FF0000";
                break;
        }
        str.push("<div id='showData' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#showData\").remove();clearTimeout(MyshowDialog.timer);clearTimeout(MyshowDialog.timer1);}'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:" + namecolor + ";'>" + GoodsJson[bookindex].IName + "</td></tr>");
        str.push("<tr><td>类型：" + "<font style='color:#E4BA5D'>" + (MyshowDialog.tempBookJson.SkillBook[index].quality == 1 ? "主动技能" : "被动技能") + "</font></td></tr>");
        str.push("<tr><td>描述：</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + GoodsJson[bookindex].detail + "</td></tr>");
        str.push("<tr><td><div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.UserSkillBook(" + index + "," + HeroIndex + ");' style='background:url(res/dialog/ButtonStudy.png) no-repeat;position:relative;left:30px; float:center;' class='ButtonSmall'></div></td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("HeroSkillDialog").appendChild(divnode);
    },


    //使用技能书
    UserSkillBook: function (bookindex, HeroIndex) {
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].ItId == MyshowDialog.tempBookJson.SkillBook[bookindex].ItId) {
                bookindex = i;
                break;
            }
        }

        var skillList = HeroJson.data[0].HeroList[HeroIndex].SkillLocation.split(",");
        for (var i = 0; i < skillList.length; i++) {
            if (skillList[i] == WarhoushJson.data[0].GoodsList[bookindex].correId) {
                showTextMess("您已经拥有该技能了！", 0);
                return;
            }
        }

        //LearnHeroSkillResert(HeroIndex, bookindex, SkillIndex, 1, 'aaa');
        window.GameMainClass.ManageLearnSkill(Number(HeroJson.data[0].HeroList[HeroIndex].Id), Number(HeroIndex), Number(WarhoushJson.data[0].GoodsList[bookindex].ItId), Number(bookindex));

    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        //获取该武将对应的本地数据
        var x = 0;
        for (; x < GeneralsJson.length; x++) {
            if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[0].HeroId) {
                break;
            }
        }
        /********************************************************我的武将**************************/
        switch (obj) {
            case 1:
                $(".HeroState").remove();
                if (document.getElementById("MyHero") == null) {
                    $("#Hero").attr("class", "ListItemClick");
                    $("#Hero").html("<div class='MuneFontClick'>武将</div>");

                    $("#Equipment").attr("class", "ListItem");
                    $("#Equipment").html("<div class='MuneFont'>装备</div>");

                    $("#FuHun").attr("class", "ListItem");
                    if (UserJson.UserLV < 30)
                        $("#FuHun").html("<div class='MuneFont'>附魂</div><img style='position:absolute;z-index:10; top:10px;left:15px;' src='res/dialog/RecruitingLock.png' />");
                    else
                        $("#FuHun").html("<div class='MuneFont'>附魂</div>");

                    MyshowDialog.CheckMyHero();
                }
                break;

            case 2:
                if (UserJson.UserLV < 30) {
                    showTextMess("主公30级开启", 0);
                    return;
                }
                $(".HeroState").remove();
                $("#Hero").attr("class", "ListItem");
                $("#Hero").html("<div class='MuneFont'>武将</div>");

                $("#Equipment").attr("class", "ListItem");
                $("#Equipment").html("<div class='MuneFont'>装备</div>");

                $("#FuHun").attr("class", "ListItemClick");
                $("#FuHun").html("<div class='MuneFontClick'>附魂</div>");
                if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv < 30)
                    MyshowDialog.LoadFunHun("{'data':[]}");
                else
                    window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
                //MyshowDialog.LoadFunHun();
                break;

            case 3:
                $(".HeroState").remove();
                $("#Hero").attr("class", "ListItem");
                $("#Hero").html("<div class='MuneFont'>武将</div>");

                $("#Equipment").attr("class", "ListItemClick");
                $("#Equipment").html("<div class='MuneFontClick'>装备</div>");

                $("#FuHun").attr("class", "ListItem");
                if (UserJson.UserLV < 30)
                    $("#FuHun").html("<div class='MuneFont'>附魂</div><img style='position:absolute;z-index:10; top:10px;left:15px;' src='res/dialog/RecruitingLock.png' />");
                else
                    $("#FuHun").html("<div class='MuneFont'>附魂</div>");
                MyshowDialog.loadEquipment();
                break;
        }
    },
    //点击小头像事件
    HeroHandClick: function (i, index) {
        //获取被点击英雄头像的座标
        var left = $("#HeroHead" + String(i)).position().left;
        var top = $("#HeroHead" + String(i)).position().top;
        $("#HeroHeadClick").css({ "top": top - 2, "left": left - 2 });
        //更改头像样式
        MyshowDialog.tempHeroIndex = i;
        MyshowDialog.tempLocalIndex = index;

        if (document.getElementById("MyHero") != null)
            MyshowDialog.CheckMyHero();
        if (document.getElementById("EquipmentDialog") != null)
            MyshowDialog.loadEquipment();
        if (document.getElementById("FuHunDialog") != null) {
            if (HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Hlv < 30)
                MyshowDialog.LoadFunHun("{'data':[]}");
            else
                window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
        }

    },

    //****************************************************** 附魂**********************************************
    soulidJson: null,

    LoadFunHun: function (json) {
        var BackJson = JSON.parse(json); /*{"data":[{"id":1,"sid": 1000,"lv": 1,"exp":1, "upexp":2}]};*/
        MyshowDialog.soulidJson = BackJson.data;
        var HeroIndex = MyshowDialog.tempHeroIndex;
        var i = MyshowDialog.tempLocalIndex;
        $("#MyHero").remove();
        $("#FuHunDialog").remove();
        $("#EquipmentDialog").remove();
        var str = new Array();
        str.push("<div id='FuHunDialog'>");
        str.push("<div id='HeroBody' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;top:70px;left:99px;'></div>"); //武将全身像

        //魂
        var x = 4, y = 4;
        if (BackJson.data.length < 1) {
            for (var i = 0; i < 8; i++) {
                str.push("<div class='SpiritIcon' style='top:" + y + "px;left:" + x + "px;background:url(res/dialog/SpiritYH_Bg2.png) no-repeat;'><div><img style='position:absolute;top:33px;left:18px;'src='res/dialog/Lv_Txt.png' />" + getLvNum((i * 10) + 30, 33, 18) + "</div></div>");
                x += 72;
                if (i == 3) {
                    y = 157;
                    x = 4;
                }
            }
        }
        else {
            var sindex = 0;
            for (var i = 0; i < 8; i++) {
                switch (BackJson.data[i].sid) {
                    case 0:
                        str.push("<div class='SpiritIcon' style='top:" + y + "px;left:" + x + "px;background:url(res/dialog/SpiritYH_Bg2.png) no-repeat;'><div><img style='position:absolute;top:33px;left:18px;'src='res/dialog/Lv_Txt.png' />" + getLvNum((i * 10) + 30, 33, 18) + "</div></div>");
                        break;
                    case 1:
                        str.push("<div class='SpiritIcon' style='top:" + y + "px;left:" + x + "px;'></div>");
                        break;
                    default:
                        sindex = 0;
                        for (; sindex < SoulData.length; sindex++) {
                            if (SoulData[sindex].sid == BackJson.data[i].sid) {
                                if (SoulData[sindex].quality == 0)
                                    return;
                                break;
                            }
                        }
                        str.push("<div class='SpiritIcon' ontouchend='MyshowDialog.ShowSoulidData(" + i + ");' style='top:" + y + "px;left:" + x + "px;'>");
                        str.push("<img src='res/Spirit/" + SoulData[sindex].imgid + ".png' style='position:absolute;top:6px;left:6px;' />");
                        str.push("<img style='position:absolute;top:45px;left:25px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(BackJson.data[i].lv, 45, 25) + "</div>");
                        break;
                }

                x += 72;
                if (i == 3) {
                    y = 157;
                    x = 4;
                }
            }
        }

        //效果按钮
        str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.SoulPreview();' class='ButtonSmall' style='background:url(res/dialog/Spirit_But1.png) no-repeat;top:102px;left:9px;'></div>");
        //宝阁按钮
        str.push("<div class='ButtonSmall' style='background:url(res/dialog/Spirit_But2.png) no-repeat;top:102px;left:233px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowBaogeDia();'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //显示魂器数据
    ShowSoulidData: function (index) {
        var sindex = 0;
        for (; sindex < SoulData.length; sindex++) {
            if (SoulData[sindex].sid == MyshowDialog.soulidJson[index].sid) {
                if (SoulData[sindex].quality == 0)
                    return;
                break;
            }
        }
        $("#showDataSoulid").remove();
        var str = new Array();
        var left = 0;
        if (index < 3)
            left = index * 72 + 4;
        else if (index == 3)
            left = 148;
        else
            left = (index - 3) * 72 + 4;

        var temp = "top:70px;";
        if (index > 3)
            temp = "bottom:80px";

        var sparment = "";
        var value = 0;

        if (SoulData[sindex].hpBonus != 0) {
            sparment = "HP";
            value = SoulData[sindex].hpBonus * MyshowDialog.soulidJson[index].lv;
        }

        if (SoulData[sindex].atkBonus != 0) {
            sparment = "攻击";
            value = SoulData[sindex].atkBonus * MyshowDialog.soulidJson[index].lv;
        }

        if (SoulData[sindex].defBonus != 0) {
            sparment = "防御";
            value = SoulData[sindex].defBonus * MyshowDialog.soulidJson[index].lv;
        }

        if (SoulData[sindex].XKBonus != 0) {
            sparment = "相克";
            value = SoulData[sindex].XKBonus * MyshowDialog.soulidJson[index].lv;
            value = value.toFixed(2);
            value += "%";
        }

        if (SoulData[sindex].BJBonus != 0) {
            sparment = "暴击";
            value = SoulData[sindex].BJBonus * MyshowDialog.soulidJson[index].lv;
            value = value.toFixed(2);
            value += "%";
        }

        str.push("<div id='showDataSoulid' class='showData' style='left:" + left + "px;" + temp + "'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showDataSoulid\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:#FFFF00;'>" + SoulData[sindex].sname + "</td></tr>");
        str.push("<tr><td>经验：" + MyshowDialog.soulidJson[index].exp + "/" + MyshowDialog.soulidJson[index].upexp + "</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + sparment + "：" + value + "</td></tr>");
        str.push("<tr><td style='height:30px'><div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.RemoveSouls(" + index + ");' style='background:url(res/dialog/ButtonUnload.png) no-repeat;top:85px;'></div>");
        str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  MyshowDialog.SynthesisSouls_Out(" + index + "," + sindex + ");' style='background:url(res/dialog/ButtonComposeSP.png) no-repeat;top:85px;left:75px;'></div></td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("FuHunDialog").appendChild(divnode);

    },

    SoulPreviewData: null,
    //附魂效果
    SoulPreview: function (json) {
        if (MyshowDialog.SoulPreviewData) {
            if (MyshowDialog.SoulPreviewData.heroindex != MyshowDialog.tempHeroIndex) {
                MyshowDialog.SoulPreviewData = null;
                window.GameMainClass.sendRequestJson(1235, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.SoulPreview");
                return;
            }
        }
        else {
            if (json) {
                var BackJson = JSON.parse(json);
                MyshowDialog.SoulPreviewData = { "heroindex": MyshowDialog.tempHeroIndex, "atk": BackJson.atk, "bj": BackJson.bj, "def": BackJson.def, "hp": BackJson.hp, "xk": BackJson.xk };
            }
            else {
                window.GameMainClass.sendRequestJson(1235, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.SoulPreview");
                return;
            }
        }
        $("#showDataSoulid").remove();
        var str = new Array();
        str.push("<div id='showDataSoulid' class='showData' style='left:70px;top:70px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showDataSoulid\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:#FFFF00;'>灵器最终加成效果</td></tr>");
        str.push("<tr><td>生命：" + MyshowDialog.SoulPreviewData.hp + "</td></tr>");
        str.push("<tr><td>攻击：" + MyshowDialog.SoulPreviewData.atk + "</td></tr>");
        str.push("<tr><td>防御：" + MyshowDialog.SoulPreviewData.def + "</td></tr>");
        str.push("<tr><td>相克：" + MyshowDialog.SoulPreviewData.xk + "%</td></tr>");
        str.push("<tr><td>暴击：" + MyshowDialog.SoulPreviewData.bj + "%</td></tr>");
        str.push("</table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("FuHunDialog").appendChild(divnode);
    },

    //卸下魂器
    RemoveSouls: function (index) {
        window.GameMainClass.sendRequestJson(1234, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"id":' + MyshowDialog.soulidJson[index].id + '}', "MyshowDialog.RemoveSoulsResult");
    },

    //卸下魂器结果
    RemoveSoulsResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            lqJcData.data.isResert = 0;
            window.GameMainClass.sendRequestJson(1240, '', "ResertlqJcData");
            MyshowDialog.SoulPreviewData = null;
            MyshowDialog.MySpiritData.data.isResert = 0;
            window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    //合成魂器
    SynthesisSouls_Out: function (index, lindex) {
        ShowMessage("是否要吞噬宝阁中<font style='color:#ff0000'>所有未锁定灵器</font>来使 <font style='color:#ff0000'>" + SoulData[lindex].sname + "</font> 升级？", function () { $("#other").html(""); $("#mask1").remove(); window.GameMainClass.sendRequestJson(1230, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"id":' + MyshowDialog.soulidJson[index].id + '}', "MyshowDialog.SynthesisSouls_Out_Result"); }, function () { $("#other").html(""); $("#mask1").remove(); });
    },

    //合成魂
    SynthesisSouls_Out_Result: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            lqJcData.data.isResert = 0;
            window.GameMainClass.sendRequestJson(1240, '', "ResertlqJcData");
            MyshowDialog.MySpiritData.data.isResert = 0;
            MyshowDialog.SoulPreviewData = null;
            window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    MySpiritData: {
        "data": {
            "isResert": 0, "slist": [
                { "id": 3, "islock": 1, "lv": 3, "soulid": 1007 },
                { "id": 4, "islock": 1, "lv": 3, "soulid": 1402 },
                { "id": 5, "islock": 1, "lv": 1, "soulid": 1209 }
            ]
        }
    },

    //藏宝阁
    ShowBaogeDia: function (json) {
        if (MyshowDialog.MySpiritData.data.isResert == 0) {
            if (json) {
                var bjson = JSON.parse(json);
                MyshowDialog.MySpiritData.data.slist = bjson.bag;
                MyshowDialog.MySpiritData.data.isResert = 1;
            }
            else {
                window.GameMainClass.sendRequestJson(1229, '', "MyshowDialog.ShowBaogeDia");
                return;
            }
        }
        $("#dialogMainbg").remove();
        var str = new Array();
        var divnode = document.createElement("div");
        divnode = document.createElement("div");
        divnode.className = 'dialogMain';
        divnode.id = "dialogMainbg";
        document.getElementById("dialogMain").appendChild(divnode);
        $("#dialogMainbg").css({ "left": "-40px", "width": 482, "background-image": "url(res/dialog/Embattle_Bg.png)" });
        str.push("<div class='close' style='left:440px;top:15px;z-index:100;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) { $(\"#dialogMainbg\").remove();}'></div>");
        str.push("<div class='icon' style='background:url(res/dialog/Icon_Academy.png) no-repeat;'></div>");
        str.push("<div class='dialogTitle' style='width:89px;padding-left:10px;background:url(res/dialog/Txt_Spirit.png) no-repeat;'></div>");
        str.push("<div class='DefaultFont' style='color:white;top:26px;left:200px;font-size:12px;'>共18个器槽，无器槽时不能挑战十二生肖。</div>");
        str.push("<div id='BGDia'>");
        var x = 11, y = 8;
        var sindex = 0;
        for (var i = 0; i < 18; i++) {
            str.push("<div class='SpiritIcon' style='top:" + y + "px;left:" + x + "px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowSoulidData2(" + i + ");'>");
            if (i < MyshowDialog.MySpiritData.data.slist.length) {
                sindex = 0;
                for (; sindex < SoulData.length; sindex++) {
                    if (SoulData[sindex].sid == MyshowDialog.MySpiritData.data.slist[i].soulid) {
                        break;
                    }
                }
                str.push("<img src='res/Spirit/" + SoulData[sindex].imgid + ".png' style='position:absolute;top:6px;left:6px;z-index:1;' />");
                str.push("<div style='position:absolute;z-index:2'><img style='position:absolute;top:45px;left:25px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(MyshowDialog.MySpiritData.data.slist[i].lv, 45, 25) + "</div></div>");
                if (MyshowDialog.MySpiritData.data.slist[i].islock) {
                    str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.LockUnLock(" + i + ");' id='lockimg" + i + "' src='res/dialog/SpiritYH_Suo2.png' style='position:absolute;z-index:6;top:" + y + "px;left:" + x + "px;' />");
                }
                else {
                    if (SoulData[sindex].quality > 0) {
                        str.push("<img ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  MyshowDialog.LockUnLock(" + i + ");' id='lockimg" + i + "' src='res/dialog/SpiritYH_Suo1.png' style='position:absolute;z-index:6;top:" + y + "px;left:" + x + "px;' />");
                    }
                }
            }
            else
                str.push("</div>");
            x += 72;
            if ((i + 1) % 6 == 0) {
                y += 73;
                x = 11;
            }
        }
        str.push("</div>");
        divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMainbg").appendChild(divnode);
    },

    //改变魂器的锁定状态
    LockUnLock: function (index) {
        $("#showDataSoulid").remove();
        window.GameMainClass.sendRequestJson(1232, '{"islock":' + (MyshowDialog.MySpiritData.data.slist[index].islock ? 0 : 1) + ',"soulsid":' + MyshowDialog.MySpiritData.data.slist[index].id + '}', "MyshowDialog.LockResult");
    },

    //锁定结果
    LockResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            //{"Client":[{"islock":1,"soulsid":4}],"info":"锁定OK","resert":1}
            for (var i = 0; i < MyshowDialog.MySpiritData.data.slist.length; i++) {
                if (MyshowDialog.MySpiritData.data.slist[i].id == BackJson.Client[0].soulsid) {
                    MyshowDialog.MySpiritData.data.slist[i].islock = BackJson.Client[0].islock;
                    switch (BackJson.Client[0].islock) {
                        case 1:
                            $("#lockimg" + i).attr("src", "res/dialog/SpiritYH_Suo2.png");
                            break;
                        case 0:
                            $("#lockimg" + i).attr("src", "res/dialog/SpiritYH_Suo1.png");
                            break;
                    }
                    break;
                }
            }
        }
    },

    //显示魂器数据
    ShowSoulidData2: function (index) {
        if (index > MyshowDialog.MySpiritData.data.slist.length)
            return;

        var sindex = 0;
        for (; sindex < SoulData.length; sindex++) {
            if (SoulData[sindex].sid == MyshowDialog.MySpiritData.data.slist[index].soulid) {
                if (SoulData[sindex].quality == 0)
                    return;
                break;
            }
        }
        $("#showDataSoulid").remove();
        var str = new Array();
        var left = 200;
        var temp = "top:120px;";

        var sparment = "";
        var value = 0;

        if (SoulData[sindex].hpBonus != 0) {
            sparment = "HP";
            value = SoulData[sindex].hpBonus * MyshowDialog.MySpiritData.data.slist[index].lv;
        }

        if (SoulData[sindex].atkBonus != 0) {
            sparment = "攻击";
            value = SoulData[sindex].atkBonus * MyshowDialog.MySpiritData.data.slist[index].lv;
        }

        if (SoulData[sindex].defBonus != 0) {
            sparment = "防御";
            value = SoulData[sindex].defBonus * MyshowDialog.MySpiritData.data.slist[index].lv;
        }

        if (SoulData[sindex].XKBonus != 0) {
            sparment = "相克";
            value = SoulData[sindex].XKBonus * MyshowDialog.MySpiritData.data.slist[index].lv;
            value = value.toFixed(2);
            value += "%";
        }

        if (SoulData[sindex].BJBonus != 0) {
            sparment = "暴击";
            value = SoulData[sindex].BJBonus * MyshowDialog.MySpiritData.data.slist[index].lv;
            value = value.toFixed(2);
            value += "%";
        }

        str.push("<div id='showDataSoulid' class='showData' style='left:" + left + "px;" + temp + "'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showDataSoulid\").remove();'></a></div>");
        str.push("<div id='showDataUp'></div>");
        str.push("<div id='showDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td style='color:#FFFF00;'>" + SoulData[sindex].sname + "</td></tr>");
        str.push("<tr><td>经验：" + MyshowDialog.MySpiritData.data.slist[index].exp + "/" + MyshowDialog.MySpiritData.data.slist[index].upexp + "</td></tr>");
        str.push("<tr><td style='color:#E4BA5D'>" + sparment + "：" + value + "</td></tr>");
        str.push("<tr><td style='height:30px'><div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  MyshowDialog.EquipSouls(" + index + ");' style='background:url(res/dialog/ButtonEquip.png) no-repeat;top:85px;'></div>");
        str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5)  MyshowDialog.SynthesisSouls(" + index + "," + sindex + ");' style='background:url(res/dialog/ButtonComposeSP.png) no-repeat;top:85px;left:75px;'></div></td></tr></table>");
        str.push("</div>");
        str.push("<div id='showDataDown' ></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMainbg").appendChild(divnode);
    },

    //合成魂器
    SynthesisSouls: function (index, lindex) {
        ShowMessage("是否要吞噬宝阁中<font style='color:#ff0000'>所有未锁定灵器</font>来使 <font style='color:#ff0000'>" + SoulData[lindex].sname + "</font> 升级？", function () { $("#other").html(""); $("#mask1").remove(); window.GameMainClass.sendRequestJson(1230, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"id":' + MyshowDialog.MySpiritData.data.slist[index].id + '}', "MyshowDialog.SynthesisSoulsResult"); }, function () { $("#other").html(""); $("#mask1").remove(); });

    },
    //合成魂
    SynthesisSoulsResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            MyshowDialog.MySpiritData.data.isResert = 0;
            window.GameMainClass.sendRequestJson(1229, '', "MyshowDialog.ShowBaogeDia");
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    //装备魂器
    EquipSouls: function (index) {
        window.GameMainClass.sendRequestJson(1233, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + ',"soulsid":' + MyshowDialog.MySpiritData.data.slist[index].id + '}', "MyshowDialog.EquipSoulsResult");
    },
    //装备结果
    EquipSoulsResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            lqJcData.data.isResert = 0;
            window.GameMainClass.sendRequestJson(1240, '', "ResertlqJcData");
            MyshowDialog.MySpiritData.data.isResert = 0;
            MyshowDialog.SoulPreviewData = null;
            window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
            $("#dialogMainbg").remove();
        }
        showTextMess(BackJson.info, BackJson.resert);
    },
    /********************************************************装备***********************************************/

    tempEquipmentJson: { "List": [] },

    loadEquipment: function () {
        var HeroIndex = MyshowDialog.tempHeroIndex;
        var i = MyshowDialog.tempLocalIndex;
        $("#MyHero").remove();
        $("#FuHunDialog").remove();
        $("#EquipmentDialog").remove();
        var str = new Array();
        str.push("<div id='EquipmentDialog'>");
        if (HeroIndex < HeroJson.data[0].HeroList.length) {
            str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;'></div>"); //武将全身像
            str.push("<div id='job'");
            switch (HeroJson.data[0].HeroList[HeroIndex].Job) {
                case 1:
                    str.push("></div>");
                    break;
                case 2:
                    str.push(" style='background-position:0 -23px;'></div>");
                    break;
                case 3:
                    str.push(" style='background-position:0 -46px;'></div>");
                    break;
            }
            var namecolor = "#00CCFF";
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

            var templist = HeroJson.data[0].HeroList[HeroIndex].Equipment.split(",");

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

            var zslist = HeroJson.data[0].HeroList[HeroIndex].stars.split(",");
            var discount = 0;
            for (var n = 0; n < zslist.length; n++) {
                switch (Number(zslist[n])) {
                    case 1:
                        discount += 6;
                        break;
                    case 2:
                        discount += 8;
                        break;
                    case 3:
                        discount += 10;
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

            str.push("<div id='HeroName' style='color:" + namecolor + ";'>" + GeneralsJson[i].Name + "</div>"); //武将名称
            str.push("<div id='HeroLV'>" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv, 0) + "</div>"); //等级
            str.push("<div id='hp' class='Qualification' style='left:113px;top:25px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:70px;'>" + hpval + "</div></div>"); //生命值
            str.push("<div id='Attack' class='Qualification' style='left:113px;top:49px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:70px;'>" + atkval + "</div></div>"); //进攻
            str.push("<div id='Defend' class='Qualification' style='left:113px;top:73px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:70px;'>" + defval + "</div></div>"); //防守

            /*当前装备*/
            var nowEquipmentList = HeroJson.data[0].HeroList[HeroIndex].Equipment.split(",");

            var top = 8, left = 198;
            for (var j = 0; j < nowEquipmentList.length; j++) {
                if (j == 2) {
                    left = 198;
                    top = 52;
                }
                str.push("<div class='Skill' id='nowEquipmentList" + j + "' style='top:" + top + "px;left:" + left + "px;");
                if (nowEquipmentList[j] == "0")
                    str.push("'>");
                else {
                    for (var y = 0; y < WarhoushJson.data[0].GoodsList.length; y++) {
                        if (WarhoushJson.data[0].GoodsList[y].ItId == nowEquipmentList[j]) {
                            for (var m = 0; m < GoodsJson.length; m++) {
                                if (WarhoushJson.data[0].GoodsList[y].ItemId == GoodsJson[m].ItemId) {
                                    str.push("background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowNowEquipment(" + y + "," + m + "," + j + "," + HeroIndex + ");' >");
                                    if (WarhoushJson.data[0].GoodsList[y].RefineLv > 0)
                                        str.push("<div class='Stars'></div>" + getNumSmall(WarhoushJson.data[0].GoodsList[y].RefineLv, 0, 15));

                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                str.push("</div>");
                left = 247;
            }
        }
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        /*包裹中的装备*/
        MyshowDialog.tempEquipmentJson.List.splice(0, MyshowDialog.tempEquipmentJson.List.length);

        for (var h = 0; h < WarhoushJson.data[0].GoodsList.length; h++) {
            if (WarhoushJson.data[0].GoodsList[h].Type < 5 && WarhoushJson.data[0].GoodsList[h].gid == 0)
                if (WarhoushJson.data[0].GoodsList[h].Type == 1) {
                    if (WarhoushJson.data[0].GoodsList[h].Job == HeroJson.data[0].HeroList[HeroIndex].Job)
                        MyshowDialog.tempEquipmentJson.List.push(WarhoushJson.data[0].GoodsList[h]);
                }
                else
                    MyshowDialog.tempEquipmentJson.List.push(WarhoushJson.data[0].GoodsList[h]);
        }

        MyshowDialog.ChangeWhEquipmentPage(1, HeroIndex);

    },

    /*装备翻页*/
    ChangeWhEquipmentPage: function (pageindex, HeroIndex) {
        if (document.getElementById("divWhE") != null)
            $("#divWhE").remove();

        var str = new Array();
        str.push("<div id='divWhE'>");
        var top = 106, left = 13;
        var len = MyshowDialog.tempEquipmentJson.List.length;
        var starindex = (pageindex - 1) * 12;
        var endindex = 12;
        var maxpage = 1;

        str.push("<div style='top:201px;left:90px;'");
        if (pageindex != 1)
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ChangeWhEquipmentPage(" + (pageindex - 1) + "," + HeroIndex + ");'");
        else
            str.push(" class='ButtonLeft'");
        str.push("></div><div style='top:201px;left:180px;'");
        if (len > 12) {
            maxpage = parseInt(len / 12) + (len % 12 == 0 ? 0 : 1);
            if (pageindex < maxpage)
                str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ChangeWhEquipmentPage(" + (pageindex + 1) + "," + HeroIndex + ");'");
        }
        else
            str.push(" class='ButtonRight'");

        if (len <= 12)
            endindex = len;
        else if (pageindex <= len / 12) {
            endindex = starindex + 12;
        }
        else {
            endindex = starindex + len % 12;
        }

        str.push("></div>");
        str.push("<div class='PageNumber' style='top:202px;left:135px;'>" + pageindex + "/" + maxpage + "</div>");
        var x = 0, y = 0;
        for (var m = starindex; m < endindex; m++) {
            for (var n = 0; n < GoodsJson.length; n++) {
                if (MyshowDialog.tempEquipmentJson.List[m].ItemId == GoodsJson[n].ItemId) {
                    str.push("<div class='Skill' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.ShowEquipment(" + m + "," + n + "," + y + "," + x + "," + HeroIndex + ");' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[n].ImgId + ".png) no-repeat;'>");
                    if (MyshowDialog.tempEquipmentJson.List[m].RefineLv > 0)
                        str.push("<div class='Stars'></div>" + getNumSmall(MyshowDialog.tempEquipmentJson.List[m].RefineLv, 0, 15));

                    str.push("</div>");
                    break;
                }
            }

            y++;
            left += 46;
            if ((m + 1) % 6 == 0 && m != starindex) {
                top += 48;
                left = 13;
                x += 1;
                y = 0;
            }
        }

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("EquipmentDialog").appendChild(divnode);

    },

    /*显示正在装备中的装备信息*/
    ShowNowEquipment: function (itemindex, localindex, index, HeroIndex) {
        if (document.getElementById("EquipmentMessage") != null)
            $("#EquipmentMessage").remove();

        var top = 8;
        var left = 199;

        if (index % 2 == 0)
            left -= 129;
        else
            left -= 129 - 48;

        var str = new Array();
        str.push("<div id='EquipmentMessage' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:100px'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#EquipmentMessage\").remove();'></a></div>");

        var color = GoodsJson[localindex].NColor;
        var detial = WarhoushJson.data[0].GoodsList[itemindex].RefineLv;
        var lv = WarhoushJson.data[0].GoodsList[itemindex].NLv;

        var namecolor = "white";
        var type = WarhoushJson.data[0].GoodsList[itemindex].Type;
        var type2 = "";
        var val = 0;
        switch (type) {
            case 2:
                type = '头盔';
                type2 = "生命";
                val = WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
                break;
            case 3:
                type = '盔甲';
                type2 = "防御";
                val = WarhoushJson.data[0].GoodsList[itemindex].defBonus;
                break;
            case 1:
                type = '武器';
                type2 = "攻击";
                val = WarhoushJson.data[0].GoodsList[itemindex].atkBonus;
                break;
            case 4:
                type = '宝物';
                type2 = "生命";
                val = WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
                break;
        }

        switch (Number(color)) {
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



        var tempVal = WarhoushJson.data[0].GoodsList[itemindex].refHP + WarhoushJson.data[0].GoodsList[itemindex].refAtk + WarhoushJson.data[0].GoodsList[itemindex].refDef;

        str.push("<div class='DefaultFont' style='color:" + namecolor + ";padding-top:5px;padding-left:10px;font-size:13px;'>" + (GoodsJson[localindex].IName + (detial == 0 ? "" : (" +" + detial))) + "</div><div class='DefaultFont' style='padding-top:22px;padding-left:10px;font-size:13px;color:white;'>类型: <font style='color:#E4BA5D'>" + type + "</font></div>");
        str.push("<div class='DefaultFont' style='padding-top:39px;padding-left:10px;font-size:13px;color:white;'>等级: <font style='color:#E4BA5D'>" + lv + "</font></div><div class='DefaultFont' style='padding-top:56px;padding-left:10px;font-size:13px;color:white;'>" + type2 + ": <font style='color:#E4BA5D'>" + val + (tempVal == 0 ? "" : "+" + tempVal) + "</font></div>");
        str.push("<div class='ButtonSmall' style='top:80px;left:38px;background:url(res/dialog/ButtonUnload.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.WearOrTakeoffEq(0," + HeroIndex + "," + WarhoushJson.data[0].GoodsList[itemindex].ItId + ");'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("EquipmentDialog").appendChild(divnode);

    },
    /*显示装备信息*/
    ShowEquipment: function (itemindex, localindex, cells, rows, HeroIndex) {
        if (document.getElementById("EquipmentMessage") != null)
            $("#EquipmentMessage").remove();

        var top = 106;
        var left = 13;
        if (cells <= 2)
            left += (cells + 1) * 40 + cells * 8;
        else
            left += cells * 46 - 129;

        if (rows == 0)
            top -= 40;
        var str = new Array();
        str.push("<div id='EquipmentMessage' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:100px'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#EquipmentMessage\").remove();'></a></div>");
        var color = GoodsJson[localindex].NColor;
        var detial = MyshowDialog.tempEquipmentJson.List[itemindex].RefineLv;
        var lv = MyshowDialog.tempEquipmentJson.List[itemindex].NLv;

        var namecolor = "white";
        var type = MyshowDialog.tempEquipmentJson.List[itemindex].Type;
        var type2 = "";
        var val = 0;
        switch (type) {
            case 2:
                type = '头盔';
                type2 = "生命";
                val = MyshowDialog.tempEquipmentJson.List[itemindex].hpBonus;
                break;
            case 3:
                type = '盔甲';
                type2 = "防御";
                val = MyshowDialog.tempEquipmentJson.List[itemindex].defBonus;
                break;
            case 1:
                type = '武器';
                type2 = "攻击";
                val = MyshowDialog.tempEquipmentJson.List[itemindex].atkBonus;
                break;
            case 4:
                type = '宝物';
                type2 = "生命";
                val = MyshowDialog.tempEquipmentJson.List[itemindex].hpBonus;
                break;
        }

        switch (Number(color)) {
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

        var tempVal = MyshowDialog.tempEquipmentJson.List[itemindex].refHP + MyshowDialog.tempEquipmentJson.List[itemindex].refAtk + MyshowDialog.tempEquipmentJson.List[itemindex].refDef;

        str.push("<div class='DefaultFont' style='color:" + namecolor + ";padding-top:5px;padding-left:10px;font-size:13px;'>" + (GoodsJson[localindex].IName + (detial == "" ? "" : (" +" + detial))) + "</div><div class='DefaultFont' style='padding-top:22px;padding-left:10px;font-size:13px;color:white;'>类型: <font style='color:#E4BA5D'>" + type + "</font></div>");
        str.push("<div class='DefaultFont' style='padding-top:39px;padding-left:10px;font-size:13px;color:white;'>等级: <font style='color:#E4BA5D'>" + lv + "</font></div><div class='DefaultFont' style='padding-top:56px;padding-left:10px;font-size:13px;color:white;'>" + type2 + ": <font style='color:#E4BA5D'>" + val + (tempVal == 0 ? "" : "+" + tempVal) + "</font></div>");
        str.push("<div class='ButtonSmall' style='top:80px;left:38px;background:url(res/dialog/ButtonEquip.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.WearOrTakeoffEq(1," + HeroIndex + "," + MyshowDialog.tempEquipmentJson.List[itemindex].ItId + ");'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("EquipmentDialog").appendChild(divnode);

    },

    WearOrTakeoffEq: function (type, HeroIndex, ItmeID) {
        window.GameMainClass.changeEquipment(Number(ItmeID), Number(HeroJson.data[0].HeroList[HeroIndex].Id), Number(type), Number(HeroIndex));
    },

    //开启技能位
    OpenSill: function (id, index, heroindex) {
        if (document.getElementById("message") == null)
            $("#message").remove();

        if (UserJson.Silver < 3000) {
            ShowMessage("银币不足，请先征收银币!");
            return;
        }

        //PtOpenRestert(heroindex, index, 1, "开启技能位成功<br />花费30000银币");
        window.GameMainClass.openGeneralSkill(Number(id), Number(index), Number(heroindex));
    },

    //开启英雄技能位
    OpenHeroSill: function (HeroIndex, SkillIndex) {
        if (document.getElementById("message") != null)
            $("#message").remove();

        if (UserJson.Gold < 10) {
            ShowMessage("萌币不足，是否充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
        }
        else {
            window.GameMainClass.ManageOpenSkill(Number(HeroJson.data[0].HeroList[HeroIndex].Id), Number(HeroIndex), Number(SkillIndex));
        }
    },

    /*武将翻页*/
    HeroChangePage: function (pageindex) {
        var len = HeroJson.data[0].HeroList.length;
        var startindex = (pageindex - 1) * 8;
        var endindex = 8;
        var maxpage = 1;
        if (UserJson.HeroPos >= 8) {
            maxpage = parseInt((UserJson.HeroPos + 1) / 8) + ((UserJson.HeroPos + 1) % 8 == 0 ? 0 : 1);
        }

        if (UserJson.HeroPos == 24)
            maxpage -= 1;

        endindex = startindex + 8;


        var top = 5, left = 8;
        var str = new Array();
        for (var i = startindex; i < endindex; i++) {
            if (i % 2 == 0) {
                if (i != startindex) {
                    top += 49; left = 8;
                }
            }
            else {
                left += 51;
            }
            //获取该武将对应的本地数据
            if (i >= HeroJson.data[0].HeroList.length) {
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

                continue;
            }
            var localindex = 0;
            for (; localindex < GeneralsJson.length; localindex++) {
                if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[i].HeroId) {
                    break;
                }
            }

            str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:" + top + "px;left:" + left + "px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[i].Qualification + ".png) no-repeat;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.HeroHandClick(" + Number(i) + "," + Number(localindex) + ");'");
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
            str.push("</div>");
        }

        //使第一个头像被点中
        if (startindex < HeroJson.data[0].HeroList.length)
            str.push("<div id='HeroHeadClick' style='top:3px;left:6px;' ></div>");


        if (pageindex != 1) {
            str.push("<div class='ButtonLeft leftOn' ");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.HeroChangePage(" + String(pageindex - 1) + ");'");
        }
        else
            str.push("<div class='ButtonLeft'");

        str.push("></div>");
        if (pageindex < maxpage) {
            str.push("<div class='ButtonRight rightOn'  style='left:82px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MyshowDialog.HeroChangePage(" + String(pageindex + 1) + ");'");
        }
        else
            str.push("<div class='ButtonRight' style='left:82px;'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        $("#HeroSelect").html(str.join(""));
        var x = 0;
        if (startindex < HeroJson.data[0].HeroList.length) {
            for (; x < GeneralsJson.length; x++) {
                if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[startindex].HeroId) {
                    break;
                }
            }
        }
        MyshowDialog.tempHeroIndex = startindex;
        MyshowDialog.tempLocalIndex = x;

        if (document.getElementById("MyHero") != null) {
            MyshowDialog.CheckMyHero();
        }
        else if (document.getElementById("EquipmentDialog") != null) {
            MyshowDialog.loadEquipment();
        }
        else
            window.GameMainClass.sendRequestJson(1228, '{"gsid":' + HeroJson.data[0].HeroList[MyshowDialog.tempHeroIndex].Id + '}', "MyshowDialog.LoadFunHun");
    }
}