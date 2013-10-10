
//校场
var SchoolClass = {
    CheckHeroIndex: 0,
    tempLocalIndex: 0,
    tempHeroIndex: 0,
    SelectIndex: 0,
    needGold: 0,
    exval: 0,
    CultureNum: 1,
    /*加载校场页面*/
    loadSchool: function () {
        $("#Training").remove();
        var HeroIndex = SchoolClass.tempHeroIndex;
        var i = SchoolClass.tempLocalIndex;
        $("#CultureDialog").remove();
        var str = new Array();
        str.push("<div id='Training' >");
        if (HeroIndex < HeroJson.data[0].HeroList.length) {
            str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;'></div>");
            str.push("<div id='job'");

            switch (HeroJson.data[0].HeroList[HeroIndex].Job) {
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
            str.push("<div id='HeroName' style='color:" + namecolor + ";'>" + GeneralsJson[i].Name + "</div>"); //武将名称
            str.push("<div id='HeroLV'>" + getLvNum(HeroJson.data[0].HeroList[HeroIndex].Hlv, 0) + "</div>"); //等级
            str.push("<div id='Experience' style='width:" + (HeroJson.data[0].HeroList[HeroIndex].Experience / HeroJson.data[0].HeroList[HeroIndex].NextE) * 95 + "px;'>"); //经验值进度条
            str.push("<div id='ExperienceVal'>" + HeroJson.data[0].HeroList[HeroIndex].Experience + "/" + HeroJson.data[0].HeroList[HeroIndex].NextE + "</div></div>"); //经验值数字
            str.push("<div class='HeroLVBig' style='left:152px;top:69px;color:#CA2800;z-index:1;width:100px;' id='expireTime" + HeroIndex + "' ></div>");


            var left = 193, top = 106;
            for (var x = 0; x < 4; x++) {
                str.push("<div class='SelectedItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckSelect(" + x + ");' style='top:" + top + "px;left:" + left + "px;' id='select" + x + "'>");
                if (x == SchoolClass.SelectIndex)
                    str.push("<div class='SelectedImg' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckSelect(" + x + ");'></div>");
                top += 23;
                str.push("</div>");
            }
            top = 105;
            left = 82;
            for (var i = 0; i < 3; i++) {
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:" + left + "px;line-height:20px;width:50px;font-size:12px;'>" + (SchoolClass.needGold * (i == 0 ? 1 : i * 4)) + "</div>");
                left += 75;
                str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:" + left + "px;line-height:20px;width:38px;font-size:12px;'>" + (SchoolClass.exval * (i == 0 ? 1 : i * 4)) + "</div>");
                top += 23;
                left = 82;
            }

            var lvlist = schoolJson.data[0].lvlist.split(",");
            for (var i = 0; i < usercityjson.length; i++) {
                if (usercityjson[i].id == 1003) {
                    for (var j = 0; j < lvlist.length; j++) {
                        if (Number(lvlist[j]) == usercityjson[i].LV) {
                            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:" + left + "px;line-height:20px;width:50px;font-size:12px;'>" + schoolJson.data[0].MExp.split(",")[j] + "</div>");
                            left += 75;
                            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;left:" + left + "px;line-height:20px;width:38px;font-size:12px;'>" + schoolJson.data[0].MNum.split(",")[j] + "</div>");
                            break;
                        }
                    }
                    break;
                }
            }

            str.push("<div class='ButtonSmall' style='top:33px;left:227px;background:url(res/dialog/ButtonAddEXP.png) no-repeat;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.UseBook();'></div>");
            str.push("<div class='ButtonSmall' style='top:133px;left:227px;");
            if (HeroJson.data[0].HeroList[HeroIndex].State1 != 1) {
                //开始训练按钮
                str.push("background:url(res/dialog/ButtonTime.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.BeginTrain();'></div>");
            }
            else {
                //立即完成
                str.push("background:url(res/dialog/ButtonComplete.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.ImmediatelyComplete();'></div>");
            }
            //当前武将位的信息
            var count = 0;
            for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
                if (schoolJson.data[0].schooldata[j].state == 1)
                    count++;
            }
            str.push("<div class='DefaultFont_14' id='SchLoaState' style='top:212px;left:125px;line-height:20px;color:white;'>" + count + "/" + schoolJson.data[0].schooldata.length + "</div>");

            //开启新位置按钮
            if (schoolJson.data[0].Gold == -1)
                str.push("<div class='ButtonBig' style='top:207px;left:205px;background:url(res/dialog/ButtonAdd2.png) no-repeat;' ></div>");
            else
                str.push("<div class='ButtonBig' id='AddNewPosBtn' style='top:207px;left:205px;background:url(res/dialog/ButtonAdd1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.OpenNewPos();'></div>");
        }
        str.push("</div>");


        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        for (var j = 0; j < schoolJson.data[0].schooldata.length; j++) {
            if (schoolJson.data[0].schooldata[j].state == 1) {
                for (var m = 0; m < HeroJson.data[0].HeroList.length; m++) {
                    if (schoolJson.data[0].schooldata[j].HeroId == HeroJson.data[0].HeroList[m].Id) {
                        setstate(j, schoolJson.data[0].schooldata[j].time, 1, m);
                        break;
                    }
                }
            }
        }
    },

    //使用经验书窗口
    UseBook: function () {
        $("#UserBookDg").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='UserBookDg' style='background:url(res/dialog/xTips_Bg1.png) no-repeat;width:398px;left:208px;left:20px;'>");
        str.push("<div class='close' style='left:358px;top:2px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div id='UseBookBg'>");
        //6550--6552
        var x = 30, num = 0, itemid = 6550;
        for (var i = 0; i < 5; i++) {
            num = 0;
            //获取数量
            for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
                if (WarhoushJson.data[0].GoodsList[j].ItemId == itemid)
                    num += WarhoushJson.data[0].GoodsList[j].iVal;
            }
            str.push("<div class='Skill' id='Goods" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.UseBookSubmit(" + i + "," + num + ");' style='top:45px;left:" + x + "px;background:url(res/Goods/" + itemid + ".png) no-repeat;'>");

            str.push("<div id='itemval" + i + "'>" + getNumSmall("X" + String(num), 1, 2) + "</div>");
            str.push("</div>");

            itemid++;
            x += 69;
        }
        str.push("<div class='ButtonSmall' style='top:149px;left:160px;background:url(res/dialog/ButClose.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("</div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //使用技能书提交
    UseBookSubmit: function (index, num) {
        if (num < 1) {
            showTextMess("经验书不足!", 0);
            return;
        }
        var item = 6550;
        switch (index) {
            case 0:
                break;
            case 1:
                item = 6551;
                break;
            case 2:
                item = 6552;
                break;
            case 3:
                item = 6553;
                break;
            case 4:
                item = 6554;
                break;
        }
        window.GameMainClass.sendRequestJson(1110, '{"gSID":' + HeroJson.data[0].HeroList[SchoolClass.tempHeroIndex].Id + ',"itemid":' + item + '}', "UseJyBookCallBack");
    },

    //开启新训练位
    OpenNewPos: function () {
        if (schoolJson.data[0].Gold == -1)
            return;
        $("#UserBookDg").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='UserBookDg'>");
        str.push("<div class='close' style='left:235px;top:2px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div id='UseBookBg' style='background:url(res/dialog/OpenPosition_Bg.png) no-repeat;'>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:40px;left:78px;text-align:center;width:48px;height:15px;'>" + schoolJson.data[0].Gold + "</div>");
        str.push("<div class='ButtonSmall' style='top:150px;left:48px;background:url(res/dialog/ButOK.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.OpenNew();'></div>");
        str.push("<div class='ButtonSmall' style='top:150px;left:150px;background:url(res/dialog/ButClose.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#UserBookDg\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("</div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //点击小头像事件
    HeroHandClick: function (HeroIndex, LocaIndex) {
        SchoolClass.tempHeroIndex = HeroIndex;
        SchoolClass.tempLocalIndex = LocaIndex;
        //获取被点击英雄头像的座标
        var left = $("#HeroHead" + String(HeroIndex)).position().left;
        var top = $("#HeroHead" + String(HeroIndex)).position().top;
        $("#HeroHeadClick").css({ "top": top - 2, "left": left - 2 });
        //获取被点击头像的位置
        if (document.getElementById("Training") != null) {
            SchoolClass.loadSchool();
        }
        else {
            SchoolClass.LoadCulture();
        }
    },

    /*切换了选项*/
    CheckSelect: function (index) {
        $(".SelectedImg").remove();
        $("#select" + index).html("<div class='SelectedImg'></div>");
        SchoolClass.SelectIndex = index;
    },

    /*点击了开始训练后*/
    BeginTrain: function () {
        if (HeroJson.data[0].HeroList[SchoolClass.tempHeroIndex].State1 != 0) {
            showTextMess("当前武将不在空闲状态，不能进行训练！");
            return;
        }

        var money = SchoolClass.needGold;
        if (SchoolClass.SelectIndex == 3) {
            for (var i = 0; i < usercityjson.length; i++) {
                if (usercityjson[i].id == 1003) {
                    var lvlist = schoolJson.data[0].lvlist.split(",");
                    for (var j = 0; j < lvlist.length; j++) {
                        if (Number(lvlist[j]) == usercityjson[i].LV) {
                            money = schoolJson.data[0].MNum.split(",")[j];
                            break;
                        }
                    }
                }
            }

            if (money > UserJson.Gold) {
                ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }
        else {
            if (SchoolClass.SelectIndex != 0) {
                money = money * SchoolClass.SelectIndex * 4;
            }
            if (money > UserJson.Silver) {
                showTextMess("银币不足，请先征收银币!", 0);
                return;
            }
        }

        //TrainingResert(HeroIndex, 1, 'aaaa', (SchoolClass.CheckHeroIndex++) + 1, 3333, 500, HeroJson.data[0].HeroList[HeroIndex].Id, '{ "Pt2": 1002, "Qualification": 2, "Pt1": 1011, "Defend": 13, "Hp": 65, "Hlv": 11, "SkillList": "1002,1011,1021,9004,1004,1014,1024,9007,1007,1034", "Job": 2, "HeroId": 2003, "Experience": 0, "SkillLocation": "1,1,1,1,1,0,0,0", "State1": 1,"State2": 0, "NextE": 1210, "Hert": 0, "QualificationVal": 17, "Attack": 38, "ST2": 0, "ST1": 0, "Id": 3 }');
        window.GameMainClass.trainingGeneral(Number(HeroJson.data[0].HeroList[SchoolClass.tempHeroIndex].Id), Number(SchoolClass.SelectIndex), Number(SchoolClass.tempHeroIndex));
    },


    //立即完成判断
    ImmediatelyComplete: function () {
        var index = 0;
        for (var i = 0; i < schoolJson.data[0].schooldata.length; i++) {
            if (schoolJson.data[0].schooldata[i].HeroId == HeroJson.data[0].HeroList[SchoolClass.tempHeroIndex].Id) {
                index = i;
                break;
            }
        }
        var needmoney = parseInt(schoolJson.data[0].schooldata[index].time / (12 * 60)) + (schoolJson.data[0].schooldata[index].time % (12 * 60) == 0 ? 0 : 1);
        needmoney = needmoney == 0 ? 1 : needmoney;
        ShowMessage("立即完成一共需要" + needmoney + "萌币，是否立即完成？", function () { $("#other").html(""); $("#mask1").remove(); SchoolClass.ImmediatelyCompleteSever(index, needmoney); }, function () { $("#other").html(""); $("#mask1").remove(); });
        //SchoolClass.ImmediatelyCompleteSever(index, needmoney);
    },

    //立即完成发送请求
    ImmediatelyCompleteSever: function (index, money) {
        if (UserJson.Gold < money) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        window.GameMainClass.trainingStop(Number(index + 1), 2);
        //TraingOverResert(1, "OK", index + 1, 0);
    },

    //开启新位置
    OpenNew: function () {
        if (UserJson.Gold < schoolJson.data[0].Gold) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        window.GameMainClass.trainingOpen();
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        var x = 0;
        for (; x < GeneralsJson.length; x++) {
            if (GeneralsJson[x].HeroId == HeroJson.data[0].HeroList[0].HeroId) {
                break;
            }
        }
        /********************************************************训练**************************/
        switch (obj) {
            case 1:
                $(".HeroState").css("display", "");
                $("#TrainingItem").attr("class", "ListItemClick");
                $("#TrainingItem").html("<div class='MuneFontClick'>训练</div>");

                $("#CultureItem").attr("class", "ListItem");
                $("#CultureItem").html("<div class='MuneFont'>培养</div>");
                SchoolClass.loadSchool();
                break;
            /*******************************************培养******************************************************************/ 
            case 2:
                //获取当前布阵数据
                $(".HeroState").css("display", "none");
                $("#TrainingItem").attr("class", "ListItem");
                $("#TrainingItem").html("<div class='MuneFont'>训练</div>");

                $("#CultureItem").attr("class", "ListItemClick");
                $("#CultureItem").html("<div class='MuneFontClick'>培养</div>");
                SchoolClass.LoadCulture();
                break;
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
        endindex = startindex + 8


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
            //获取该武将对应的本地数据
            var localindex = 0;
            for (; localindex < GeneralsJson.length; localindex++) {
                if (GeneralsJson[localindex].HeroId == HeroJson.data[0].HeroList[i].HeroId) {
                    break;
                }
            }

            str.push("<div class='HeroHead' id='HeroHead" + i + "' style='top:" + top + "px;left:" + left + "px;background:url(res/HeroHead/" + HeroJson.data[0].HeroList[i].Qualification + ".png) no-repeat;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.HeroHandClick(" + Number(i) + "," + Number(localindex) + ");'");
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

        //使第一个头像被点中
        if (startindex < HeroJson.data[0].HeroList.length)
            str.push("<div id='HeroHeadClick' style='top:2px;left:6px;' ></div>");

        str.push("<div");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.HeroChangePage(" + String(pageindex - 1) + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div><div  style='left:82px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.HeroChangePage(" + String(pageindex + 1) + ");'");
        }
        else
            str.push(" class='ButtonRight'");
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
        SchoolClass.tempHeroIndex = startindex;
        SchoolClass.tempLocalIndex = x;
        if (document.getElementById("Training") != null) {
            SchoolClass.loadSchool();
        }
        else {
            SchoolClass.LoadCulture();
        }
    },

    //加载培养
    LoadCulture: function () {
        var index = SchoolClass.tempHeroIndex;
        var i = SchoolClass.tempLocalIndex;
        $("#Training").remove();
        $("#CultureDialog").remove();
        var str = new Array();
        str.push("<div id='CultureDialog'>");
        if (index < HeroJson.data[0].HeroList.length) {
            str.push("<div id='HeroBody' class='ToLeft' style='background:url(res/Fighting/" + GeneralsJson[i].Imgid + "/1.png) no-repeat;'></div>");
            str.push("<div id='job'");
            switch (HeroJson.data[0].HeroList[index].Job) {
                case 1:
                    str.push("></div>");
                    //克制类型
                    str.push("<div id='Restraint' style='top:32px;' ></div>");
                    break;
                case 2:
                    str.push(" style='background-position:0 -23px;'></div>");
                    str.push("<div id='Restraint'style='background-position:0 -15px;top:32px;'></div>");
                    break;
                case 3:
                    str.push(" style='background-position:0 -46px;'></div>");
                    str.push("<div id='Restraint' style='background-position:0 -30px;top:32px;'></div>");
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

            var templist = HeroJson.data[0].HeroList[index].Equipment.split(",");

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

            var zslist = HeroJson.data[0].HeroList[index].stars.split(",");
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
            str.push("<div id='Qualification' class='Qualification' style='left:133px;top:54px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:70px;'>" + HeroJson.data[0].HeroList[index].QualificationVal + "</div></div>"); //资质
            str.push("<div id='hp' class='Qualification' style='left:30px;top:110px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + hpval + "</div></div>"); //生命值
            str.push("<div id='Attack' class='Qualification' style='left:30px;top:155px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + atkval + "</div></div>"); //进攻
            str.push("<div id='Defend' class='Qualification' style='left:30px;top:197px;'><div class='DefaultFont_14 RedFont' style='line-height:20px;width:90px;'>" + defval + "</div></div>"); //防守

            //str.push("<div class='DefaultFont2' style='color:#825333;left:130px;top:81px;'>需要资质丹</div>");

            var j = 0;
            for (; j < CultureJson.data[0].list.length; j++) {
                if (CultureJson.data[0].list[j].Gid == HeroJson.data[0].HeroList[index].Id) {
                    break;
                }
            }

            str.push("<div class='DefaultFont2' id='lvnum1' style='color:#825333;left:128px;top:112px;'>培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[j].LaveNum.split(",")[0] + " / " + CultureJson.data[0].list[j].TotalNum + " </font>次</div>");
            str.push("<div class='DefaultFont2' id='lvnum2' style='color:#825333;left:128px;top:154px;'>培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[j].LaveNum.split(",")[1] + " / " + CultureJson.data[0].list[j].TotalNum + " </font>次</div>");
            str.push("<div class='DefaultFont2' id='lvnum3' style='color:#825333;left:128px;top:199px;'>培养<font style='color:#FFFF00'> " + CultureJson.data[0].list[j].LaveNum.split(",")[2] + " / " + CultureJson.data[0].list[j].TotalNum + " </font>次</div>");
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.StarCulture(" + index + "," + i + "," + j + ");' style='top:148px;left:227px;background:url(res/dialog/ButtonTraining1.png) no-repeat;'></div>");
        }
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //培养属性
    StarCulture: function (HeroIndex, localIndex, CultureIndex) {
        $("#cultureInfoDialog").remove();
        $("#mask2").remove();

        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='cultureInfoDialog'>");
        //关闭按钮
        str.push("<div class='close' style='left:313px;top:0px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#cultureInfoDialog\").remove();$(\"#mask2\").remove();}'></div>");
        var top = 38, left = 17;
        for (var i = 0; i < 3; i++) {
            str.push("<div id='listitem" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckTranType(" + HeroIndex + "," + localIndex + "," + i + "," + CultureIndex + ");' class='train_Mnume' style='top:" + top + "px;left:" + left + "px;'><div class='train_MuneFont' id='font" + i + "' style='background-position:0 -" + (i * 24) + "px;'></div></div>");
            top += 42;
        }
        str.push("<div class='cultureTypeDia' id='cultureTypeDia'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        SchoolClass.CheckTranType(HeroIndex, localIndex, 0, CultureIndex);
    },

    CheckTranType: function (HeroIndex, localIndex, type, CultureIndex) {
        if ($("#listitem" + type).attr("class") == "train_MnumeClick")
            return;
        $(".train_MnumeClick").attr("class", "train_Mnume");
        $("#listitem" + type).attr("class", "train_MnumeClick");
        $(".train_MuneFontClick").attr("class", "train_MuneFont");
        $("#font" + type).attr("class", "train_MuneFontClick");

        var str = new Array();
        str.push("<div class='DefaultFont_14 RedFont' style='left:85px;top:35px;'>" + CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[type] + " / " + CultureJson.data[0].list[CultureIndex].TotalNum + "</div>");
        var temp = 0;
        switch (type) {
            case 0:
                temp = HeroJson.data[0].HeroList[HeroIndex].Hp;
                break;
            case 1:
                temp = HeroJson.data[0].HeroList[HeroIndex].Attack;
                break;
            case 2:
                temp = HeroJson.data[0].HeroList[HeroIndex].Defend;
                break;
        }

        var temp2 = 0, seliver = 0, pyd = 0;
        if (SchoolClass.CultureNum == 1) {
            temp2 = (temp + Number(CultureDicJson.data[0].list[0].AdditionData.split("|")[HeroJson.data[0].HeroList[HeroIndex].Job - 1].split("-")[type].split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]))
            seliver = Number(CultureDicJson.data[0].list[0].Silver.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]) * (Number(CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[type]) + 1);
            pyd = CultureDicJson.data[0].list[0].StrengthenFu.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)];
        }
        else {
            var j = Number(CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[type]) + 1;
            for (var i = 0; i < 10; i++, j++) {
                temp2 += Number(CultureDicJson.data[0].list[0].AdditionData.split("|")[HeroJson.data[0].HeroList[HeroIndex].Job - 1].split("-")[type].split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]);
                seliver += Number(CultureDicJson.data[0].list[0].Silver.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]) * j;

            }
            temp2 += temp;
            pyd = CultureDicJson.data[0].list[0].StrengthenFu.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)] * 10;
        }
        str.push("<div class='DefaultFont_14 RedFont' style='left:15px;top:93px;width:89px;height:25px;text-align:center;line-height:25px;'>" + temp + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='target' style='left:155px;top:93px;width:89px;height:25px;text-align:center;line-height:25px;'>" + temp2 + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='seliver' style='top:182px;left:23px;width:89px;height:25px;text-align:center;line-height:25px;'>" + seliver + "</div>");
        str.push("<div class='SelectedItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckCulture(" + 1 + "," + HeroIndex + "," + type + "," + CultureIndex + ");' style='top:137px;left:98px;width:40px;height:40px;' id='CultureSelect1'>");
        if (SchoolClass.CultureNum == 1)
            str.push("<div class='SelectedImg' style='top:6px;'></div>");
        str.push("</div>");
        str.push("<div class='SelectedItem' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.CheckCulture(" + 10 + "," + HeroIndex + "," + type + "," + CultureIndex + ");' style='top:137px;left:181px;width:40px;height:40px;' id='CultureSelect2'>");
        if (SchoolClass.CultureNum == 10)
            str.push("<div class='SelectedImg'  style='top:6px;'></div>");
        str.push("</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='pyd' style='top:182px;left:143px;width:89px;height:25px;text-align:center;line-height:25px;'>" + pyd + "</div>");

        str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.SubmitCulture(" + HeroIndex + ",1," + type + "," + CultureIndex + ");' style='left:24px;top:210px;background:url(res/dialog/ButtonTra1.png) no-repeat;height:35px;'></div>");
        str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SchoolClass.SubmitCulture(" + HeroIndex + ",2," + type + "," + CultureIndex + ");' style='left:145px;top:210px;background:url(res/dialog/ButtonTra2.png) no-repeat;height:35px;'></div>");


        $("#cultureTypeDia").html(str.join(""));
    },

    //选择培养次数
    CheckCulture: function (num, HeroIndex, type, CultureIndex) {
        if (num == SchoolClass.CultureNum)
            return;
        SchoolClass.CultureNum = num;
        var temp2 = 0, seliver = 0, pyd = 0;
        switch (type) {
            case 0:
                temp = HeroJson.data[0].HeroList[HeroIndex].Hp;
                break;
            case 1:
                temp = HeroJson.data[0].HeroList[HeroIndex].Attack;
                break;
            case 2:
                temp = HeroJson.data[0].HeroList[HeroIndex].Defend;
                break;
        }

        var temp2 = 0;
        switch (num) {
            case 1:
                $("#CultureSelect1").html("<div class='SelectedImg' style='top:6px;'></div>");
                $("#CultureSelect2").html("");
                temp2 = (temp + Number(CultureDicJson.data[0].list[0].AdditionData.split("|")[HeroJson.data[0].HeroList[HeroIndex].Job - 1].split("-")[type].split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]))
                seliver = Number(CultureDicJson.data[0].list[0].Silver.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]) * (Number(CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[type]) + 1);
                pyd = CultureDicJson.data[0].list[0].StrengthenFu.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)];
                break;
            case 10:
                $("#CultureSelect1").html("");
                $("#CultureSelect2").html("<div class='SelectedImg' style='top:6px;'></div>");
                var j = Number(CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[type]) + 1;
                for (var i = 0; i < 10; i++, j++) {
                    temp2 += Number(CultureDicJson.data[0].list[0].AdditionData.split("|")[HeroJson.data[0].HeroList[HeroIndex].Job - 1].split("-")[type].split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]);
                    seliver += Number(CultureDicJson.data[0].list[0].Silver.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)]) * j;

                }
                temp2 += temp;
                pyd = CultureDicJson.data[0].list[0].StrengthenFu.split(",")[(HeroJson.data[0].HeroList[HeroIndex].Qualification - 1) < 0 ? 0 : (HeroJson.data[0].HeroList[HeroIndex].Qualification - 1)] * 10;
                break;
        }
        $("#target").html(temp2);
        $("#seliver").html(seliver);
        $("#pyd").html(pyd);
    },

    //HeroIndex:武将序列   ctype:培养类型1为普通，2为高级  etype要培养的属性类型hp,atk,def
    SubmitCulture: function (HeroIndex, ctype, etype, CultureIndex) {
        //判断培养次数是否满足
        if (CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[etype] >= CultureJson.data[0].list[CultureIndex].TotalNum) {
            showTextMess("培养次数已满", 0);
            return;
        }

        if ((Number(CultureJson.data[0].list[CultureIndex].LaveNum.split(",")[etype]) + SchoolClass.CultureNum) > CultureJson.data[0].list[CultureIndex].TotalNum) {
            showTextMess("培养次数不足", 0);
            return;
        }

        if (ctype == 2) {
            if (Number(CultureDicJson.data[0].list[0].StrengthenFu.split(",")[HeroJson.data[0].HeroList[HeroIndex].Qualification - 1]) > WarHouseClass.GetItemCounts(6520)) {
                ShowMessage("培养符不足，是否去商城购买?", function () { $("#other").html(""); $("#mask1").remove(); ShopClass.ShowItemId = 6520; EnterBuliding(8500); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }

        if (isSubmit)
            return;

        etype += 1;
        isSubmit = true;
        window.GameMainClass.raiseGeneral(Number(HeroJson.data[0].HeroList[HeroIndex].Id), Number(HeroIndex), Number(ctype), Number(etype), Number(CultureIndex), Number(SchoolClass.CultureNum));
    }
};