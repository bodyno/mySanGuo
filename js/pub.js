var pubclass =
{
    //加载酒馆资源
    LoadPub: function () {
        $("#PubDialog").remove();
        $("#SynthesisHeroDataDialog").remove();
        var str = new Array();
        str.push("<div id='PubDialog' >");
        str.push("<div class='DefaultFont' style='color:white;top:-22px;left:181px;font-size:12px;'>招募馆武将出自征战,解雇可重新招募</div>");
        str.push('<div id="album1"  style="width:357px;height:106px;top:12px;left:33px;" class="album"><div class="paging">');

        var left = 0, index = 0, len = 0;
        for (var i = 0; i < PubJsonNew.data[0].HeroData.length; i++) {
            if (i % 4 == 0) {
                str.push("<div class='pagediv' style='width:357px;height:106px;'>");
            }
            len++;
            for (var j = 0; j < GeneralsJson.length; j++) {
                if (GeneralsJson[j].HeroId == PubJsonNew.data[0].HeroData[i].gid) {
                    str.push("<div class='pubHeroSelect' id='pubHeroSelect" + i + "' style='left:" + left + "px;'");
                    str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.ShowHeroData(" + i + "," + j + ");'>");
                    str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[j].Imgid + "/1.png) no-repeat;left:-8px;'></div>");
                    str.push("<div id='job' style='left:0px;");
                    var hp = GeneralsJson[j].Hp, atk = GeneralsJson[j].Attack, def = GeneralsJson[j].Defend;
                    switch (GeneralsJson[j].Job) {
                        case 1:
                            str.push("'></div>");
                            break;
                        case 2:
                            str.push("background-position:0 -23px;'></div>");
                            break;
                        case 3:
                            str.push("background-position:0 -46px;'></div>");
                            break;
                    }
                    var namecolor = "#00CCFF";
                    switch (GeneralsJson[j].Qualification) {
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
                    str.push("<div class='DefaultFont_14' style='color:" + namecolor + ";top:75px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + GeneralsJson[j].Name + "</div>"); //武将名称   
                    if (PubJsonNew.data[0].HeroData[i].isGot) {
                        str.push("<div class='HasRecruit'></div>");
                    }
                    if (i == 0) {
                        index = j;
                        str.push('<div id="HeroClickBig"></div>');
                    }
                    str.push("</div>");
                    break;
                }
            }

            left += 91;
            if (len == 4) {
                str.push("</div>");
                left = 0;
                len = 0;
            }
        }

        if (i == RecruitJson.length + 1 && len != 4) {
            str.push("</div>");
        } else {
            for (var i = PubJsonNew.data[0].HeroData.length; i < RecruitJson.length; i++) {
                if (i % 4 == 0) {
                    str.push("<div class='pagediv' style='width:357px;height:106px;'>");
                }
                len++;
                for (var j = 0; j < GeneralsJson.length; j++) {
                    if (GeneralsJson[j].HeroId == RecruitJson[i].gid) {
                        if (i == 0) {
                            index = j;
                        }
                        str.push("<div class='pubHeroSelect' id='pubHeroSelect" + i + "' style='left:" + left + "px;'");
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.ShowHeroData(" + i + "," + j + ");'>");
                        str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[j].Imgid + "/1.png) no-repeat;left:-8px;'></div>");
                        str.push("<div id='job' style='left:0px;");
                        var hp = GeneralsJson[j].Hp, atk = GeneralsJson[j].Attack, def = GeneralsJson[j].Defend;
                        switch (GeneralsJson[j].Job) {
                            case 1:
                                str.push("'></div>");
                                break;
                            case 2:
                                str.push("background-position:0 -23px;'></div>");
                                break;
                            case 3:
                                str.push("background-position:0 -46px;'></div>");
                                break;
                        }
                        var namecolor = "#00CCFF";
                        switch (GeneralsJson[j].Qualification) {
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
                        str.push("<div class='DefaultFont_14' style='color:" + namecolor + ";top:75px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + GeneralsJson[j].Name + "</div>"); //武将名称
                        str.push("<div class='ButtonSmall' style='width:23px;height:25px;background:url(res/dialog/RecruitingLock.png) no-repeat;left:52px;'></div>");
                        str.push("</div>");
                        break;
                    }
                }

                left += 91;

                if (i == RecruitJson.length - 1) {
                    len = 0;
                    str.push("</div>");
                }

                if (len == 4) {
                    str.push("</div>");
                    left = 0;
                    len = 0;
                }
            }
        }
        str.push('</div></div>');
        str.push("<div id='herostatebox' style='position:absolute;z-index:30;top:114px;width:100%;height:70px;'></div>");
        //四种宝石的数量
        str.push("<div class='DefaultFont_14' id='Gem1' style='top:215px;left:30px;color:white;'>" + PubJsonNew.data[0].GemBlue + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem2' style='top:215px;left:100px;color:white;'>" + PubJsonNew.data[0].GemPurple + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem3' style='top:215px;left:170px;color:white;'>" + PubJsonNew.data[0].GemRed + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem4' style='top:215px;left:240px;color:white;'>" + PubJsonNew.data[0].GemYellow + "</div>");
        str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonTrade.png) no-repeat;left:315px;top:207px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(5501);'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        $('#album1').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".pagediv",
            bounce: false
        });
        pubclass.ShowHeroData(0, index);
    },

    ShowHeroData: function (heroindex, gindex) {
        var str = new Array();
        var hp = GeneralsJson[gindex].Hp, atk = GeneralsJson[gindex].Attack, def = GeneralsJson[gindex].Defend;
        if (GeneralsJson[gindex].RecruitFee != 0)
            str.push("<div class='DefaultFont_14 RedFont' style='top:45px;left:278px;font-size:13px;text-align:right;width:40px;'>×" + GeneralsJson[gindex].RecruitFee + "</div>");
        else
            str.push("<div class='DefaultFont_14 RedFont' style='top:45px;left:268px;font-size:13px;'>3000银币</div>");
        switch (GeneralsJson[gindex].Qualification) {
            case 1:
                str.push("<div class='GemIcon' style='background:url(res/dialog/Gem1.png) no-repeat;'></div>");
                break;
            case 2:
                str.push("<div class='GemIcon' style='background:url(res/dialog/Gem2.png) no-repeat;'></div>");
                break;
            case 3:
                str.push("<div class='GemIcon' style='background:url(res/dialog/Gem3.png) no-repeat;'></div>");
                break;
            case 4:
                str.push("<div class='GemIcon' style='background:url(res/dialog/Gem4.png) no-repeat;'></div>");
                break;
        }

        if (heroindex < PubJsonNew.data[0].HeroData.length) {
            str.push("<div class='DefaultFont_14 RedFont' style='left:235px;font-size:13px;top:63px;text-align:right;width:80px;'>可招募</div>");
            if (PubJsonNew.data[0].HeroData[heroindex].isGot)
                str.push("<div class='ButtonSmall' style='top:42px;left:331px;background:url(res/dialog/ButtonRecruitment2.png) no-repeat;''></div>");
            else
                str.push("<div class='ButtonSmall' style='top:42px;left:331px;background:url(res/dialog/ButtonRecruitment1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.Recruit(" + heroindex + ",1);'></div>");
        }
        else {
            str.push("<div class='DefaultFont_14 RedFont' style='left:251px;font-size:13px;top:64px;text-align:center;width:80px;'>" + RecruitJson[heroindex].condition + "</div>");
            str.push("<div class='ButtonSmall' style='top:42px;left:331px;background:url(res/dialog/ButtonRecruitment2.png) no-repeat;''></div>");
        }
        str.push("<div class='DefaultFont_14 RedFont' style='left:60px;font-size:13px;'>" + GeneralsJson[gindex].Qmin + "-" + GeneralsJson[gindex].Qmax + "</div>"); //资质       
        str.push("<div class='DefaultFont_14 RedFont' style='left:60px;top:17px;font-size:13px;'>" + hp + "<font style='color:green;'>(" + GeneralsJson[gindex].HpGrow + ")</font></div>"); //生命值
        str.push("<div class='DefaultFont_14 RedFont' style='left:150px;font-size:13px;'>" + atk + "<font style='color:green;'>(" + GeneralsJson[gindex].AtkGrow + ")</font></div>"); //进攻
        str.push("<div class='DefaultFont_14 RedFont' style='left:150px;font-size:13px;top:17px;'>" + def + "<font style='color:green;'>(" + GeneralsJson[gindex].DefGrow + ")</font></div>"); //防守        
        str.push("<div id='Detial' style='left:200px;top:-2px;'>" + GeneralsJson[gindex].Detail + "</div>"); //武将介绍

        var m = 0;
        for (; m < SkillJson.length; m++) {
            if (SkillJson[m].sId == GeneralsJson[gindex].Pt1) {
                str.push("<div id='pt1' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.ShowSkillData(" + m + ");' class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;left:52px;top:40px;'></div>");
                break;
            }
        }

        $("#herostatebox").html(str.join(""));
        $("#HeroClickBig").remove();

        var divnode = document.createElement("div");
        divnode.id = "HeroClickBig";
        document.getElementById("pubHeroSelect" + heroindex).appendChild(divnode);
    },

    //显示技能信息
    ShowSkillData: function (skillindex) {
        $("body").stopTime("pubskill");
        $("#showData2").remove();
        var str = new Array();

        var left = 120, top = -5;

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

        str.push("<div id='showData2' class='showData' style='top:" + top + "px;left:" + left + "px;'>");
        str.push("<div id='HeroDataMessageClose' style='left:115px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#showData2\").remove();$(\"#showData2\").stopTime();'></a></div>");
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
        document.getElementById("herostatebox").appendChild(divnode);

        var satime = 1;
        $("body").oneTime("3s", "pubskill", function () {
            var i = 100;
            $("body").everyTime("20ms", "pubskill", function () {
                i--;
                document.getElementById("showData2").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                document.getElementById("showData2").style.opacity = i / 100; //for FF
                if (i == 0) {
                    $("body").stopTime("pubskill");
                    $("#showData2").remove();
                }
            });

        });
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        /********************************************************招募**************************/
        switch (obj) {
            case 1:
                $("#SynthesisHeroSelect").css("display", "none");
                $("#PubDialog").css("display", "");
                $("#Recruit").attr("class", "ListItemClick");
                $("#Recruit").html("<div class='MuneFontClick'>招募</div>");

                $("#Synthesis").attr("class", "ListItem");
                $("#Synthesis").html("<div class='MuneFont'>召唤</div>");

                $("#mingjiang").attr("class", "ListItem");
                $("#mingjiang").html("<div class='MuneFont'>神将</div>");

                pubclass.LoadPub();


                break;
            /*******************************************合成******************************************************************/ 
            case 2:
                $("#PubDialog").css("display", "none");

                if (document.getElementById("SynthesisHeroSelect") != null)
                    $("#SynthesisHeroSelect").css("display", "");
                else
                    pubclass.LoadSynthesisGoods();

                $("#Recruit").attr("class", "ListItem");
                $("#Recruit").html("<div class='MuneFont'>招募</div>");
                $("#Synthesis").attr("class", "ListItemClick");
                $("#Synthesis").html("<div class='MuneFontClick'>召唤</div>");
                $("#mingjiang").attr("class", "ListItem");
                $("#mingjiang").html("<div class='MuneFont'>神将</div>");

                for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                    if (WarhoushJson.data[0].GoodsList[i].Type == 8) {
                        pubclass.LoadSynthesis(i);
                        break;
                    }

                    if (i == WarhoushJson.data[0].GoodsList.length - 1)
                        pubclass.LoadSynthesis(0);
                }

                break;

            case 3:
                $("#SynthesisHeroSelect").css("display", "none");
                $("#Recruit").attr("class", "ListItem");
                $("#Recruit").html("<div class='MuneFont'>招募</div>");
                $("#Synthesis").attr("class", "ListItem");
                $("#Synthesis").html("<div class='MuneFont'>召唤</div>");
                $("#mingjiang").attr("class", "ListItemClick");
                $("#mingjiang").html("<div class='MuneFontClick'>神将</div>");
                pubclass.LoadShengJiang();
                break;

        }
    },

    LoadShengJiang: function () {
        $("#PubDialog").remove();
        $("#SynthesisHeroDataDialog").remove();
        var str = new Array();
        str.push("<div id='PubDialog' >");
        str.push("<div class='DefaultFont' style='color:white;top:-22px;left:181px;font-size:12px;'>神将馆武将出自虚拟和穿越,活动后出现</div>");
        str.push('<div id="album2"  style="width:357px;height:106px;top:12px;left:33px;" class="album"><div class="paging"  style="width:357px;height:106px;">');

        var left = 0, index = 0, len = 0;
        for (var i = 0; i < PubShengJiangJson.data[0].HeroData.length; i++) {
            if (i % 4 == 0) {
                str.push("<div class='pagediv' style='width:357px;height:106px;'>");
            }
            len++;
            for (var j = 0; j < GeneralsJson.length; j++) {
                if (GeneralsJson[j].HeroId == PubShengJiangJson.data[0].HeroData[i].gid) {
                    str.push("<div class='pubHeroSelect' id='pubHeroSelect" + i + "' style='left:" + left + "px;'");
                    str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.ShowShengjiangData(" + i + "," + j + ");'>");
                    str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[j].Imgid + "/1.png) no-repeat;left:-8px;'></div>");
                    str.push("<div id='job' style='left:0px;");
                    var hp = GeneralsJson[j].Hp, atk = GeneralsJson[j].Attack, def = GeneralsJson[j].Defend;
                    switch (GeneralsJson[j].Job) {
                        case 1:
                            str.push("'></div>");
                            break;
                        case 2:
                            str.push("background-position:0 -23px;'></div>");
                            break;
                        case 3:
                            str.push("background-position:0 -46px;'></div>");
                            break;
                    }
                    var namecolor = "#00CCFF";
                    switch (GeneralsJson[j].Qualification) {
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
                    str.push("<div class='DefaultFont_14' style='color:" + namecolor + ";top:75px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>" + GeneralsJson[j].Name + "</div>"); //武将名称   
                    if (PubShengJiangJson.data[0].HeroData[i].isGot) {
                        str.push("<div class='HasRecruit'></div>");
                    }
                    if (i == 0) {
                        index = j;
                        str.push('<div id="HeroClickBig"></div>');
                    }
                    str.push("</div>");
                    break;
                }
            }

            left += 91;

            if (i == PubShengJiangJson.data[0].HeroData.length - 1) {
                len = 0;
                str.push("</div>");
            }

            if (len == 4) {
                str.push("</div>");
                left = 0;
                len = 0;
            }
        }

        str.push('</div></div>');
        str.push("<div id='herostatebox' style='position:absolute;z-index:30;top:114px;width:100%;height:70px;'></div>");
        //四种宝石的数量
        str.push("<div class='DefaultFont_14' id='Gem1' style='top:215px;left:30px;color:white;'>" + PubJsonNew.data[0].GemBlue + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem2' style='top:215px;left:100px;color:white;'>" + PubJsonNew.data[0].GemPurple + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem3' style='top:215px;left:170px;color:white;'>" + PubJsonNew.data[0].GemRed + "</div>");
        str.push("<div class='DefaultFont_14' id='Gem4' style='top:215px;left:240px;color:white;'>" + PubJsonNew.data[0].GemYellow + "</div>");
        str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonTrade.png) no-repeat;left:315px;top:207px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(5501);'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $('#album2').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".pagediv",
            bounce: false
        });

        pubclass.ShowShengjiangData(0, index);
    },

    ShowShengjiangData: function (heroindex, gindex) {
        var str = new Array();
        var hp = GeneralsJson[gindex].Hp, atk = GeneralsJson[gindex].Attack, def = GeneralsJson[gindex].Defend;
        if (GeneralsJson[gindex].RecruitFee != 0) {
            str.push("<div class='DefaultFont_14 RedFont' style='top:45px;left:278px;font-size:13px;text-align:right;width:40px;'>×" + GeneralsJson[gindex].RecruitFee + "</div>");
            switch (GeneralsJson[gindex].Qualification) {
                case 1:
                    str.push("<div class='GemIcon' style='background:url(res/dialog/Gem1.png) no-repeat;'></div>");
                    break;
                case 2:
                    str.push("<div class='GemIcon' style='background:url(res/dialog/Gem2.png) no-repeat;'></div>");
                    break;
                case 3:
                    str.push("<div class='GemIcon' style='background:url(res/dialog/Gem3.png) no-repeat;'></div>");
                    break;
                case 4:
                    str.push("<div class='GemIcon' style='background:url(res/dialog/Gem4.png) no-repeat;'></div>");
                    break;
            }
        }
        else
            str.push("<div class='DefaultFont_14 RedFont' style='top:45px;left:288px;font-size:13px;'>免费</div>");

        str.push("<div class='DefaultFont_14 RedFont' style='left:235px;font-size:13px;top:63px;text-align:right;width:80px;'>" + PubShengJiangJson.data[0].HeroData[heroindex].detail + "</div>");

        if (PubShengJiangJson.data[0].HeroData[heroindex].isGot)
            str.push("<div class='ButtonSmall' style='top:42px;left:331px;background:url(res/dialog/ButtonRecruitment2.png) no-repeat;''></div>");
        else
            str.push("<div class='ButtonSmall' style='top:42px;left:331px;background:url(res/dialog/ButtonRecruitment1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.Recruit(" + heroindex + ",2);'></div>");

        str.push("<div class='DefaultFont_14 RedFont' style='left:60px;font-size:13px;'>" + GeneralsJson[gindex].Qmin + "-" + GeneralsJson[gindex].Qmax + "</div>"); //资质       
        str.push("<div class='DefaultFont_14 RedFont' style='left:60px;top:17px;font-size:13px;'>" + hp + "<font style='color:green;'>(" + GeneralsJson[gindex].HpGrow + ")</font></div>"); //生命值
        str.push("<div class='DefaultFont_14 RedFont' style='left:150px;font-size:13px;'>" + atk + "<font style='color:green;'>(" + GeneralsJson[gindex].AtkGrow + ")</font></div>"); //进攻
        str.push("<div class='DefaultFont_14 RedFont' style='left:150px;font-size:13px;top:17px;'>" + def + "<font style='color:green;'>(" + GeneralsJson[gindex].DefGrow + ")</font></div>"); //防守        
        str.push("<div id='Detial' style='left:200px;top:-2px;'>" + GeneralsJson[gindex].Detail + "</div>"); //武将介绍

        var m = 0;
        for (; m < SkillJson.length; m++) {
            if (SkillJson[m].sId == GeneralsJson[gindex].Pt1) {
                str.push("<div id='pt1' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.ShowSkillData(" + m + ");' class='Skill' style='background:url(res/skill/" + SkillJson[m].sImgid + ".png) no-repeat;left:52px;top:40px;'></div>");
                break;
            }
        }

        $("#herostatebox").html(str.join(""));
        $("#HeroClickBig").remove();

        var divnode = document.createElement("div");
        divnode.id = "HeroClickBig";
        document.getElementById("pubHeroSelect" + heroindex).appendChild(divnode);
    },

    //点击小头像事件
    HeroHandClick: function (i, index) {
        //获取被点击英雄头像的座标        
        var top = $("#HeroHead" + String(i)).position().top;
        $("#GoodsClickBig").css({ "top": top - 1 });
        //更改头像样式

        if (document.getElementById("PubDialog") != null)
            pubclass.LoadPub(i, index);
    },

    //点击了招募按钮
    Recruit: function (index, type) {
        //判断当前的金额是否足够
        //pushHeroJson('{"gJson":{"Gid":855,"HeroJson":[{"Attack":26,"Defend":7,"Equipment":"0,0,0,0","Experience":0,"HeroId":1114,"Hert":0,"Hlv":1,"Hp":69,"Id":855,"Job":2,"NextE":12340,"Pt1":2000,"Pt2":0,"Qualification":1,"QualificationVal":3,"ST1":0,"ST2":0,"SkillList":"2001,2101,2252,2053,2003,2104,2255,2056,2006,2306,2011,2111,2262,2063,2013,2114,2265,2066,2016,2316","SkillLocation":"1,1,0,0,0,0,0,0","State1":0,"State2":0}],"TotalNum":2},"info":"","resert":1}');
        if (type == 1)
            window.GameMainClass.sendRequestJson(1132, '{"gid":' + PubJsonNew.data[0].HeroData[index].gid + ',"type":1}', "RecruitResert");
        else
            window.GameMainClass.sendRequestJson(1166, '{"gid":' + PubShengJiangJson.data[0].HeroData[index].gid + ',"type":2}', "RecruitResert");
        //window.GameMainClass.PubRecruitGeneral(Number(PubJsonNew.data[0].HeroData[index].gid), Number(index + 1));
    },

    //刷新方法
    RefreshPub: function () {
        if (isSubmit)
            return;
        //判断当前的金额是否足够
        if (PubJson.data[0].cnaResNum > 0) {
            for (var i = 0; i < PubJson.data[0].HeroData.length; i++) {
                if (PubJson.data[0].HeroData[i].QualificationVal > 9 && PubJson.data[0].HeroData[i].PubState == 0) {
                    ShowMessage("当前酒馆内有高品质武将未被招募<br/>是否继续刷新？", function () { $("#other").html(""); $("#mask1").remove(); isSubmit = true; window.GameMainClass.PubRefresh(); $("#other").html(""); }, function () { $("#other").html(""); $("#mask1").remove(); $("#other").html(""); });
                    return;
                }
            }
            isSubmit = true;
            window.GameMainClass.PubRefresh();
        }
        else {
            if (UserJson.Gold < 10) {
                ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            }
            else {
                for (var i = 0; i < PubJson.data[0].HeroData.length; i++) {
                    if (PubJson.data[0].HeroData[i].QualificationVal > 9 && PubJson.data[0].HeroData[i].PubState == 0) {
                        ShowMessage("当前酒馆内有高品质武将未被招募<br/>是否继续刷新？", function () { $("#other").html(""); $("#mask1").remove(); isSubmit = true; window.GameMainClass.PubRefresh(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                        return;
                    }
                }
                isSubmit = true;
                window.GameMainClass.PubRefresh();
            }
        }
    },

    /*加载合成页物品信息*/
    LoadSynthesisGoods: function () {
        /*改变英雄列表样式*/
        var str = new Array();
        str.push("<div id='SynthesisHeroSelect'>");
        var len = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 8)
                len++;
        }
        if (len > 0) {
            var maxpage = 1;
            str.push("<div class='ButtonLeft'></div><div style='left:82px;' ");
            if (len > 4) {
                str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.GoodsChangePage(" + String(2) + ");'");
                maxpage = parseInt(len / 4) + (len % 4 == 0 ? 0 : 1);
                len = 4;
            }
            else str.push(" class='ButtonRight'");

            str.push("></div>");
            str.push("<div class='PageNumber' style='top:210px;left:42px;'>1/" + maxpage + "</div>");
            var top = 11, left = 5, temp = 0;
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 8) {
                    if (temp != 0) {
                        top += 48;
                    }

                    //获取该武将对应的本地数据
                    var localindex = 0;
                    for (; localindex < GoodsJson.length; localindex++) {
                        if (GoodsJson[localindex].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                            break;
                        }
                    }
                    str.push("<div id='wuhun" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[localindex].ImgId + ".png) no-repeat;'");
                    str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.LoadSynthesis(" + i + ");'");

                    str.push(">" + GoodsJson[localindex].IName + "<br />(<font id='wuhunNum" + i + "'>" + WarhoushJson.data[0].GoodsList[i].iVal + "</font>)");
                    str.push("</div>");

                    temp++;
                    if (temp == len)
                        break;

                }
            }
            //使第一个物品被点中
            str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>");

        }
        else {
            str.push("<div class='PageNumber' style='top:210px;left:42px;'>1/1</div>");
            str.push("<div class='ButtonLeft'></div><div style='left:82px;' class='ButtonRight'></div>");
        }

        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

    },

    /*加载合成页物品信息*/
    LoadSynthesis: function (GoodsIndex) {
        $("#PubDialog").remove();
        $("#SynthesisHeroDataDialog").remove();

        var str = new Array();
        str.push("<div id='SynthesisHeroDataDialog'>");
        str.push("<div class='DefaultFont' style='color:white;top:-22px;left:68px;font-size:12px;'>召唤馆武将出自副本和活动,武魂召唤。</div>");

        var len = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 8)
                len++;
        }
        //获取被点击物品对应的人物ID
        if (len > 0) {
            var HeroIndex = 0;
            for (; HeroIndex < GeneralsJson.length; HeroIndex++)
                if (GeneralsJson[HeroIndex].HeroId == WarhoushJson.data[0].GoodsList[GoodsIndex].correId)
                    break;
            str.push("<div id='discount'>合成成功率<font style='color:#F6F204' id='discountVal'> 5%</font></div>");
            str.push("<div id='HeroBody' style='background:url(res/Fighting/" + GeneralsJson[HeroIndex].Imgid + "/1.png) no-repeat;top:58px;left:20px;'></div>");
            for (var j = 0; j < HeroJson.data[0].HeroList.length; j++) {
                if (HeroJson.data[0].HeroList[j].HeroId == GeneralsJson[HeroIndex].HeroId) {
                    str.push("<div class='ButtonSmall' style='width:73px;height:47px;top:82px;left:37px;background:url(res/dialog/Label_Recruitment.png) no-repeat;z-index:40;'></div>");
                    break;
                }
            }

            str.push("<div id='job' style='top:34px;left:42px;");
            switch (GeneralsJson[HeroIndex].Job) {
                case 1:
                    str.push("'></div>");
                    //克制类型
                    str.push("<div id='Restraint' style='top:64px;left:200px;'  ></div>");
                    break;
                case 2:
                    str.push("background-position:0 -23px;'></div>");
                    str.push("<div id='Restraint'style='background-position:0 -15px;top:64px;left:200px;'></div>");
                    break;
                case 3:
                    str.push("background-position:0 -46px;'></div>");
                    str.push("<div id='Restraint' style='background-position:0 -30px;top:64px;left:200px;'></div>");
                    break;
            }
            var namecolor = "#00CCFF";
            switch (GeneralsJson[HeroIndex].Qualification) {
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
            }

            var y = 0;
            //获得对应的武将技能*/
            for (; y < SkillJson.length; y++)
                if (SkillJson[y].sId == GeneralsJson[HeroIndex].Pt1)
                    break;
            str.push("<div id='HeroName' style='color:" + namecolor + ";left:200px;top:12px;'>" + GeneralsJson[HeroIndex].Name + "</div>"); //武将名称   
            str.push("<div class='DefaultFont' style='left:200px;top:37px;'>LV 1</div>"); //等级        
            str.push("<div class='DefaultFont' style='left:200px;top:88px;'>???</div>"); //生命值
            str.push("<div class='DefaultFont' style='left:200px;top:114px;'>???</div>"); //进攻
            str.push("<div class='DefaultFont' style='left:200px;top:140px;'>???</div>"); //防守   
            str.push("<div class='DefaultFont' style='left:200px;top:168px;'>" + SkillJson[y].sName + "</div>"); //技能名称     
            str.push("<div class='DefaultFont' style='top:185px;left:160px;font-size:12px;line-height:14px;'>" + SkillJson[y].detail + "</div>"); //技能介绍、
            str.push("<div class='AddButtonLeft' id='MoveBut' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.SetWuHunCount(1," + GoodsIndex + ");' style='top:151px;left:16px;'></div>");
            if (WarhoushJson.data[0].GoodsList[GoodsIndex].iVal > 1)
                str.push("<div style='top:151px;left:109px;' id='AddBut'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.SetWuHunCount(2," + GoodsIndex + ");' class='AddButtonRight AddrightOn'></div>");
            else
                str.push("<div style='top:151px;left:109px;' id='AddBut' class='AddButtonRight'></div>");
            str.push("<div class='PageNumber' id='whcount' style='top:153px;left:72px;'>1</div>");

            str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonEternal1.png) no-repeat;top:207px;left:30px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.SynthesisSubmit(" + GoodsIndex + ");'></div>"); ; //合成武将令按钮

        }
        else
            str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonEternal2.png) no-repeat;top:207px;left:30px;'></div>"); ; //合成武将按钮

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        var left = $("#wuhun" + String(GoodsIndex)).position().left;
        var top = $("#wuhun" + String(GoodsIndex)).position().top;

        $("#GoodsClick").css({ "top": top - 1, "left": left - 1 });


    },


    SynthesisSubmit: function (goodsindex) {
        if (isSubmit)
            return;
        var nowcount = Number($("#whcount").html());
        if (nowcount > 5) {
            showTextMess("武魂数量不能多于5个!", 0);
            return;
        }

        if (nowcount > WarhoushJson.data[0].GoodsList[goodsindex].iVal) {
            showTextMess("武魂数量不能多于现有数量!", 0);
            return;
        }

        if (nowcount < 1) {
            showTextMess("武魂数量不能少于1个!", 0);
            return;
        }
        isSubmit = true;
        window.GameMainClass.PubComposite(Number(WarhoushJson.data[0].GoodsList[goodsindex].ItId), nowcount, Number(goodsindex));

    },
    //PubComposite(int gId, int WHnum)

    /*武魂翻页*/
    GoodsChangePage: function (pageindex) {
        var len = 0;
        var bool = false;
        var tempindex = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 8)
                len++;
            if (pageindex > 1) {
                if ((len == (pageindex - 1) * 4) && bool == false) {
                    tempindex = i;
                    bool = true;
                }
            }
            else {
                if (len == 1 && bool == false) {
                    tempindex = i - 1;
                    bool = true;
                }
            }
        }
        if (len > 0) {
            var startindex = tempindex + 1;
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

            var top = 11, left = 5;
            var str = new Array();
            var temp = startindex;
            var x = -1;
            for (var i = startindex; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 8) {
                    if (x == -1)
                        x = i;
                    if (temp != startindex) {
                        top += 48;
                    }

                    //获取该武将对应的本地数据
                    var localindex = 0;
                    for (; localindex < GoodsJson.length; localindex++) {
                        if (GoodsJson[localindex].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                            break;
                        }

                    }

                    str.push("<div id='wuhun" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[localindex].ImgId + ".png) no-repeat;'");
                    str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.LoadSynthesis(" + i + ");'");

                    str.push(">" + GoodsJson[localindex].IName + "<br />(<font id='wuhunNum" + i + "'>" + WarhoushJson.data[0].GoodsList[i].iVal + "</font>)");
                    str.push("</div>");

                    temp++;
                    if (temp == endindex)
                        break;

                }
            }

            //使第一个头像被点中
            str.push("<div id='GoodsClick' style='top:10px;left:5px;' ></div>");

            str.push("<div");
            if (pageindex != 1) {
                str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.GoodsChangePage(" + String(pageindex - 1) + ");'");
            }
            else
                str.push(" class='ButtonLeft'");
            str.push("></div><div style='left:82px;'");
            if (pageindex < maxpage) {
                str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.GoodsChangePage(" + String(pageindex + 1) + ");'");
            }
            else
                str.push(" class='ButtonRight'");
            str.push("></div>");
            str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
            $("#SynthesisHeroSelect").html(str.join(""));
            pubclass.LoadSynthesis(x);
        }
        else {
            $("#SynthesisHeroSelect").html("<div class='ButtonLeft'></div><div style='left:82px;' class='ButtonRight'></div><div class='PageNumber' style='top:210px;left:42px;'>1/1</div>");
            pubclass.LoadSynthesis(0);
        }
    },

    /*更改武魂数量*/
    SetWuHunCount: function (type, goodsindex) {
        //获得当前使用武魂数量
        var nowcount = Number($("#whcount").html());
        switch (type) {
            case 1:
                //减少数量
                if (nowcount <= 1)
                    return;

                if (nowcount == 5) {
                    $("#AddBut").attr("class", "AddButtonRight");
                }

                nowcount -= 1;
                if (nowcount <= 1) {
                    $("#MoveBut").attr("class", "AddButtonLeft");
                }
                else {
                    $("#MoveBut").attr("class", "AddButtonLeft AddleftOn");
                }

                $("#whcount").html(nowcount);
                break;

            case 2:
                //增加数量

                if (nowcount >= 5)
                    return;

                if (nowcount >= WarhoushJson.data[0].GoodsList[goodsindex].iVal)
                    return;

                if (nowcount == 1) {
                    $("#MoveBut").attr("class", "AddButtonLeft AddleftOn");
                }

                if (nowcount >= 5) {
                    $("#AddBut").attr("class", "AddButtonRight");
                }
                else {
                    $("#AddBut").attr("class", "AddButtonRight AddrightOn");
                }

                nowcount += 1;
                $("#whcount").html(nowcount);
                break;
        }

        if (nowcount >= WarhoushJson.data[0].GoodsList[goodsindex].iVal) {
            $("#AddBut").attr("class", "AddButtonRight");
        }
        else
            if (nowcount < 5)
                $("#AddBut").attr("class", "AddButtonRight AddrightOn");
            else
                $("#AddBut").attr("class", "AddButtonRight");

        switch (nowcount) {
            case 1:
                $("#discountVal").html("5%");
                break;
            case 2:
                $("#discountVal").html("10%");
                break;
            case 3:
                $("#discountVal").html("30%");
                break;
            case 4:
                $("#discountVal").html("60%");
                break;
            case 5:
                $("#discountVal").html("100%");
                break;
        }
    },

    //贸易中心
    LoadTrading: function () {
        var str = new Array();
        str.push("<div class='DefaultFont' style='color:white;top:25px;left:200px;font-size:12px;'>贸易->获得宝石->酒馆->招募武将</div>");
        str.push("<div id='TradingDia'>");
        var x = 15;
        var coin = 0;
        for (var i = 0; i < 5; i++) {
            str.push("<div class='TradingLit' id='TradingLit" + i + "' style='background-position:-" + i * 78 + "px 0;top:14px;left:" + x + "px;");
            if (i + 1 != TradingJson.data.NowIndex)
                str.push("display:none;");
            str.push("'></div>");

            if (i + 1 == TradingJson.data.NowIndex) {
                if (TradingJson.data.freecount < 1) {
                    str.push("<div class='DefaultFont_14 RedFont' id='CoinNum' style='width:125px;text-align:center;top:150px;left:292px;'>花费" + TradingJson.data.TradingCoin.split(",")[i] + "银币</div>");
                    coin = Number(TradingJson.data.TradingCoin.split(",")[i]);
                }
                else {
                    str.push("<div class='DefaultFont_14 RedFont' id='CoinNum' style='width:125px;text-align:center;top:150px;left:292px;'>免费贸易</div>");
                }
            }
            x += 86;
        }
        str.push("<div class='DefaultFont_14 RedFont' id='Gem11' style='top:115px;left:35px;'>" + PubJsonNew.data[0].GemBlue + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem12' style='top:115px;left:100px;'>" + PubJsonNew.data[0].GemPurple + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem13' style='top:115px;left:160px;'>" + PubJsonNew.data[0].GemRed + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='Gem14' style='top:115px;left:225px;'>" + PubJsonNew.data[0].GemYellow + "</div>");
        x = 15;
        str.push("<div class='DefaultFont_14' style='color:#00CCFF;top:87px;left:" + x + "px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>欧阳掌柜</div>");
        str.push("<div class='DefaultFont_14' style='color:#00CCFF;top:87px;left:" + (x += 86) + "px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>蓝春来</div>");
        str.push("<div class='DefaultFont_14' style='color:#FF00FF;top:87px;left:" + (x += 86) + "px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>周扒皮</div>");
        str.push("<div class='DefaultFont_14' style='color:#FF0000;top:87px;left:" + (x += 86) + "px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>天仙妹妹</div>");
        str.push("<div class='DefaultFont_14' style='color:#FFFF00;top:87px;left:" + (x += 86) + "px;width:78px;text-align:center;font-weight:200;background:url(res/dialog/NameBg.png) no-repeat;height:22px;line-height:22px;'>神秘商人</div>");
        str.push("<div class='ButtonOther' style='width:125px;height:48px;top:174px;left:292px;background:url(res/dialog/TradeBut.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) pubclass.TradingSubmit();'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    TradingSubmit: function () {
        //判断银币是否足够
        if (TradingJson.data.freecount < 1) {
            if (Number(TradingJson.data.TradingCoin.split(",")[TradingJson.data.NowIndex - 1]) > UserJson.Silver) {
                showTextMess("银币不足", 0);
                return;
            }
        }
        window.GameMainClass.sendRequestJson(1135, "", "TradingResert");
    }
}