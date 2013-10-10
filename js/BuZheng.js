
var BuZhengClass =
{
    //记录布阵信息
    templocation: [
        { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }
    ],

    isEdit: false, //记录阵形是否被更改过
    tempHeroList: [],
    tempForIndex: 0,
    FotempList: [
        { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }, { "HeroID": 0 }
    ],
    /**********************************************************布阵开始***********************************************/
    //加载阵型
    LoadZX: function (pageindex) {
        $("#SynthesisHeroSelect").remove();
        var str = new Array();
        str.push("<div id='SynthesisHeroSelect'>");
        var len = BuZhengJson.data[0].list.length;
        var tempindex = 0;
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

        var top = 11, left = 5;
        var temp = -1;

        for (var i = startindex; i < endindex; i++) {
            //获取该物品对应的本地数据
            var localindex = 0;
            for (; localindex < FormationDicJson.length; localindex++) {
                if (FormationDicJson[localindex].FID == BuZhengJson.data[0].list[i].FId) {
                    break;
                }
            }

            if (temp == -1) {
                temp = localindex;
            }
            str.push("<div id='wuhun" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;background:url(res/Array/" + FormationDicJson[localindex].IconId + ".png) no-repeat;'");
            str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.Lineup(" + i + "," + localindex + ");'");

            str.push("><font>" + FormationDicJson[localindex].FName + "</font><br /><font id='ForLV" + BuZhengJson.data[0].list[i].FId + "'>等级 " + BuZhengJson.data[0].list[i].FLv + "</font>");

            if (UserJson.FormationId == BuZhengJson.data[0].list[i].FId) {
                str.push("<div class='LabelUse'></div>");
            }

            str.push("</div>");

            top += 48;
        }
        str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>"); ////使第一个物品被点中

        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.LoadZX(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push("></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.LoadZX(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push(" ></div>");

        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain10").appendChild(divnode);

        BuZhengClass.Lineup(startindex, temp);
    },

    //加载布阵
    Lineup: function (index, localindex) {
        BuZhengClass.tempForIndex = index;
        var str = new Array();
        $("#LineupDialog").remove();

        str.push("<div id='LineupDialog'>");
        str.push("<div id='FormationName' style='background-position:-" + localindex * 26 + "px 0;'></div>");
        str.push("<div id='FormationBig' style='background:url(res/Formation_Big/" + BuZhengJson.data[0].list[index].FId + ".png) no-repeat;'>");
        str.push("</div>");

        var ForLocalEnabled = BuZhengJson.data[0].list[index].LocalEnabled.split(",");

        var m = 0;
        for (var i = 0; i < ForLocalEnabled.length; i++) {
            if (ForLocalEnabled[i] != "-1") {
                ForLocalEnabled[i] = BuZhengClass.templocation[m].HeroID;
                m++;
            }
        }

        var top = 17, left = 159, top1 = -14, left1 = 141;
        var forlocaindex = 0;
        for (var j = 0; j < 9; j++) {
            if (j % 3 == 0) {
                if (j != 0) {
                    top = 17; left -= 56;
                    top1 = -14; left1 -= 56;
                }
            }
            else {
                top += 57; top1 += 57;
            }
            if (ForLocalEnabled[j] != "-1" && ForLocalEnabled[j] != "0") {
                //画阴影
                str.push("<div class='ToLeft'  id='HeroBody" + j + "' style='background:url(");
                //画人物
                //找出人物对应的heroID
                var x = 0;
                for (; x < HeroJson.data[0].HeroList.length; x++) {
                    if (HeroJson.data[0].HeroList[x].Id == Number(ForLocalEnabled[j])) {
                        break;
                    }
                }

                var y = 0;
                for (; y < GeneralsJson.length; y++) {
                    if (GeneralsJson[y].HeroId == HeroJson.data[0].HeroList[x].HeroId) {
                        str.push("res/Fighting/" + GeneralsJson[y].Imgid + "/1.png) no-repeat;width:100px;height:90px;top:" + top1 + "px;left:" + left1 + "px;");
                        break;
                    }
                }

                str.push("'></div>");
                str.push("<div class='LocalShow' style='top:" + top + "px;left:" + left + "px;' id='Local" + j + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.ShowBattleHero(" + x + "," + y + "," + j + "," + forlocaindex + ");'>");
                forlocaindex++;
                str.push("</div>");
                BuZhengClass.FotempList[j].HeroID = Number(ForLocalEnabled[j]);
            }
            else if (ForLocalEnabled[j] == "0") {
                str.push("<div class='LocalShow' style='top:" + top + "px;left:" + left + "px;' id='Local" + j + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.ShowBattleHero(-1,-1," + j + "," + forlocaindex + ");'>");
                forlocaindex++;
                str.push("</div>");
                BuZhengClass.FotempList[j].HeroID = 0;
            }
            else
                BuZhengClass.FotempList[j].HeroID = 0;
        }

        top = 6;

        var templist = FormationDicJson[localindex].FLocation.split("|");
        for (var i = 0; i < 5; i++) {
            str.push("<div class='FormationLocalInfo' style='top:" + top + "px;'>");
            var templist2 = templist[i].split(",");
            var ss = "";
            for (var j = 0; j < templist2.length; j++) {

                if (templist2[j] != "0") {
                    switch (j) {
                        case 0:
                            ss += "血量+" + Number(Number(templist2[j]) + BuZhengJson.data[0].list[index].FLv - 1) + "%<br/>";
                            break;
                        case 1:
                            ss += "攻击+" + Number(Number(templist2[j]) + BuZhengJson.data[0].list[index].FLv - 1) + "%<br/>";
                            break;
                        case 2:
                            ss += "防御+" + Number(Number(templist2[j]) + BuZhengJson.data[0].list[index].FLv - 1) + "%<br/>";
                            break;
                        case 3:
                            ss += "相克+" + Number(Number(templist2[j]) + BuZhengJson.data[0].list[index].FLv - 1) / 10 + "%<br/>";
                            break;
                        case 4:
                            ss += "暴击+" + Number(Number(templist2[j]) + BuZhengJson.data[0].list[index].FLv - 1) / 10 + "%<br/>";
                            break;
                    }
                }
            }
            str.push(ss.substring(0, ss.length - 5));
            str.push("</div>");
            top += 45;
        }

        str.push("<div class='ButtonBig' style='top:196px;left:72px;background:url(res/dialog/ButtonEmbattle.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.SubmitLineup();'></div>");
        str.push("<div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain10").appendChild(divnode);

        left = $("#wuhun" + String(index)).position().left;
        top = $("#wuhun" + String(index)).position().top;

        $("#GoodsClick").css({ "top": top - 1, "left": left - 1 });
    },

    /*武将上阵*/
    Battle: function (HeroIndex, HeroLocalIndex, localindex, forlocaindex) {
        //判断当前选择的英雄是否已经上场
        if (BuZhengClass.tempHeroList[HeroIndex].State2 != 0)
            return;

        //判断是否是替换之前的武将
        if (document.getElementById("HeroBody" + localindex) != null) {
            for (var i = 0; i < BuZhengClass.tempHeroList.length; i++) {
                if (BuZhengClass.tempHeroList[i].Id == BuZhengClass.templocation[forlocaindex].HeroID) {
                    BuZhengClass.tempHeroList[i].State2 = 0;
                    BuZhengClass.templocation[forlocaindex].HeroID = 0;
                    $("#HeroHP" + i).remove();
                    break;
                }
            }
        }
        //将武将形象放置到该阵中
        $("#Local" + localindex).remove();
        $("#HeroBody" + localindex).remove();

        var top = 17, left = 159, top1 = -14, left1 = 141;
        for (var j = 0; j < 9; j++) {
            if (j % 3 == 0) {
                if (j != 0) {
                    top = 17; left -= 56;
                    top1 = -14; left1 -= 56;
                }
            }
            else {
                top += 57; top1 += 57;
            }

            if (j == localindex)
                break;
        }

        var str = new Array();
        str.push("<div class='ToLeft' id='HeroBody" + localindex + "' style='background:url(");
        str.push("res/Fighting/" + GeneralsJson[HeroLocalIndex].Imgid + "/1.png) no-repeat;width:100px;height:90px;top:" + top1 + "px;left:" + left1 + "px;");
        str.push("'></div>");

        str.push("<div class='LocalShow' style='top:" + top + "px;left:" + left + "px;' id='Local" + localindex + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.ShowBattleHero(" + HeroIndex + "," + HeroLocalIndex + "," + localindex + "," + forlocaindex + ");'>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("LineupDialog").appendChild(divnode);
        //在临时数据中保存该位置的新武将ID
        BuZhengClass.templocation[forlocaindex].HeroID = BuZhengClass.tempHeroList[HeroIndex].Id;
        BuZhengClass.FotempList[localindex].HeroID = BuZhengClass.tempHeroList[HeroIndex].Id;
        BuZhengClass.tempHeroList[HeroIndex].State2 = 1;

        $("#HeroList").remove();
        BuZhengClass.isEdit = true;
    },

    /*出场武将信息及下阵*/
    ShowBattleHero: function (HeroIndex, HeroLcoalIndex, localIndex, forlocaindex) {
        $("#HeroList").remove();
        var str = new Array();
        str.push("<div id='HeroList'>");
        str.push("<div id='HeroDataMessageClose' style='left:108px;'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) $(\"#HeroList\").remove();'></a></div>");
        str.push("<div class='HeroDataBox'>");
        if (HeroIndex != -1) {
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

            var job = "";
            switch (HeroJson.data[0].HeroList[HeroIndex].Job) {
                case 1:
                    job = "战士";
                    break;
                case 2:
                    job = "射手";
                    break;
                case 3:
                    job = "谋士";
                    break;
            }

            str.push("<font style='color:" + namecolor + ";width:100%'>" + GeneralsJson[HeroLcoalIndex].Name + "</font>");
            str.push("<br />LV " + HeroJson.data[0].HeroList[HeroIndex].Hlv + "&nbsp;&nbsp;&nbsp;" + job);
            str.push("</div>");
            str.push("<div class='ButtonBig' style='top:50px;z-index:100;width:130px;height:35px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.DownFront(" + HeroIndex + "," + localIndex + "," + forlocaindex + ");'><div class='ButtonSmall' style='left:41px;top:2px;background:url(res/dialog/ButtonIdle1.png) no-repeat;z-index:100;'></div></div>");
        }
        else {
            str.push("<br/>请选择武将");
            str.push("</div>");
            str.push("<div class='ButtonSmall' style='top:52px;left:41px;background:url(res/dialog/ButtonIdle2.png) no-repeat;'></div>");
        }

        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain10").appendChild(divnode);
        BuZhengClass.HeroChangePage(1, localIndex, forlocaindex);
    },

    /*武将翻页*/
    HeroChangePage: function (pageindex, locaarryindex, forlocaindex) {
        var len = BuZhengClass.tempHeroList.length; //.data[0].HeroList.length;
        $("#HeroDiv").remove();
        var startindex = (pageindex - 1) * 6;
        var endindex = 6;
        var maxpage = 1;
        if (len > 6) {
            maxpage = parseInt(len / 6) + (len % 6 == 0 ? 0 : 1);
        }

        if (len <= 6)
            endindex = len;
        else if (pageindex <= len / 6) {
            endindex = startindex + 6;
        }
        else {
            endindex = startindex + len % 6;
        }


        var top = 92, left = 20;
        var str = new Array();
        for (var i = startindex; i < endindex; i++) {
            if (i % 2 == 0) {
                if (i != startindex) {
                    top += 49; left = 20;
                }
            }
            else {
                left += 51;
            }
            //获取该武将对应的本地数据
            var localindex = 0;
            for (; localindex < GeneralsJson.length; localindex++) {
                if (GeneralsJson[localindex].HeroId == BuZhengClass.tempHeroList[i].HeroId) {
                    break;
                }
            }
            str.push("<div id='HeroDiv'>");
            str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:" + top + "px;left:" + left + "px;background:url(res/HeroHead/" + BuZhengClass.tempHeroList[i].Qualification + ".png) no-repeat;'");
            str.push("  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.Battle(" + i + "," + localindex + "," + locaarryindex + "," + forlocaindex + ");'");
            var namecolor = '#00CCFF';
            switch (BuZhengClass.tempHeroList[i].Qualification) {
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
            str.push("<img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(BuZhengClass.tempHeroList[i].Hlv));
            switch (BuZhengClass.tempHeroList[i].State2) {
                case 1: //在阵型中
                    str.push("<div class='HeroState HasPlayed' id='HeroHP" + i + "'></div>");
                    break;
                case 2: //讨伐中
                    str.push("<div class='HeroState HasCrusade' id='HeroHP" + i + "'></div>");
                    break;
            }

            str.push("</div>");
        }

        /*填充空白*/
        if (pageindex == maxpage && BuZhengClass.tempHeroList.length % 6 != 0) {
            for (var i = BuZhengClass.tempHeroList.length % 6; i < 6; i++) {
                if (i % 2 == 0) {
                    if (i != 0) {
                        top += 49; left = 20;
                    }
                }
                else {
                    left += 51;
                }
                str.push("<div class='HeroHeadEmp' style='top:" + top + "px;left:" + left + "px;'></div>");
            }
        }

        str.push("<div style='top:246px;left:12px;'");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.HeroChangePage(" + String(pageindex - 1) + "," + locaarryindex + "," + forlocaindex + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div><div  style='top:246px;left:98px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.HeroChangePage(" + String(pageindex + 1) + "," + locaarryindex + "," + forlocaindex + ");'");
        }
        else {
            str.push(" class='ButtonRight'");
        }
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:247px;left:40px;width:55px;height:25px;text-align:center;'>" + pageindex + "/" + maxpage + "</div></div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("HeroList").appendChild(divnode);
    },

    /*士兵下阵*/
    DownFront: function (HeroIndex, LocalIndex, forlocaindex) {
        var count = 0;
        for (var i = 0; i < BuZhengClass.templocation.length; i++) {
            if (BuZhengClass.templocation[i].HeroID != 0)
                count++;
        }
        count -= 1;
        if (count <= 0) {
            ShowMessage("方阵中至少有一个英雄!");
            return;
        }

        //将武将形象从阵中移除
        $("#HeroBody" + LocalIndex).remove();
        BuZhengClass.templocation[forlocaindex].HeroID = 0;
        BuZhengClass.FotempList[LocalIndex].HeroID = 0
        BuZhengClass.tempHeroList[HeroIndex].State2 = 0;
        $("#HeroList").remove();

        //将武将形象放置到该阵中
        $("#Local" + LocalIndex).remove();

        var top = 17, left = 159;
        for (var j = 0; j < 9; j++) {
            if (j % 3 == 0) {
                if (j != 0) {
                    top = 17; left -= 56;
                }
            }
            else {
                top += 57;
            }

            if (j == LocalIndex)
                break;
        }

        var str = new Array();
        str.push("<div class='LocalShow' style='top:" + top + "px;left:" + left + "px;' id='Local" + LocalIndex + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) BuZhengClass.ShowBattleHero(-1,-1," + LocalIndex + "," + forlocaindex + ");'>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("LineupDialog").appendChild(divnode);
        BuZhengClass.isEdit = true;
    },

    //保存阵形
    SubmitLineup: function () {
        if (BuZhengClass.isEdit == false) {
            if (BuZhengJson.data[0].list[BuZhengClass.tempForIndex].FId == UserJson.FormationId) {
                showTextMess("您没有做任何更改!", 0);                
                return;
            }
        }
        var ForLocalEnabled = BuZhengJson.data[0].list[BuZhengClass.tempForIndex].LocalEnabled.split(",");
        var ss = "";
        for (var i = 0; i < ForLocalEnabled.length; i++) {
            if (ForLocalEnabled[i] != "-1") {
                if (document.getElementById("HeroBody" + i) != null)
                    ss += BuZhengClass.FotempList[i].HeroID;
                else
                    ss += "0";
                ss += ",";

            }
        }

        ss = ss.substring(0, ss.length - 1);
        window.GameMainClass.SaveFormationData(ss, Number(BuZhengJson.data[0].list[BuZhengClass.tempForIndex].FId), Number(BuZhengClass.tempForIndex));
    },

    CloseDialog: function () {
        if (BuZhengClass.isEdit == true) {
            ShowMessage("布阵信息已更改，是否保存？", function () {                
                BuZhengClass.SubmitLineup();
                $("#mask1").remove();
                $("#mask10").remove();
                $("#dialogMain10").remove();
                $("#message").remove();
            }, function () {                
                $("#mask1").remove();
                $("#mask10").remove();
                $("#dialogMain10").remove();
                $("#message").remove();
            }, null, "displayClose");
        }
        else {
            $("#mask10").remove();
            $("#dialogMain10").remove();
        }

    }

    /************************************************************************布阵结束*****************************************************/
}