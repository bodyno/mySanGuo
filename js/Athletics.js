//决战天下
var AthleticsClass =
{
    LoadAthletics: function () {
        $("#AthleticsBg").remove();
        var str = new Array();
        str.push("<div id='AthleticsBg'>");
        str.push("<div class='DefaultFont RedFont' id='AthleticsRefreshTime' style='top:25px;left:110px;z-index:1;'></div>");
        str.push("<div class='DefaultFont RedFont' style='top:25px;left:385px'>" + AthleticsJson.data[0].RefreshNum + "/3</div>");
        var gifttop = 171, giftleft = 53, heady = 170, headx = 132;
        for (var i = 0; i < 3; i++) {
            switch (Number(AthleticsJson.data[0].BoxState.split(",")[i])) {
                case 0:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) AthleticsClass.ShowGiftInfo(" + i + ");' class='GiftBox' id='giftbox" + i + "' style='top:" + gifttop + "px;left:" + giftleft + "px;background-position:0 -" + i * 54 + "px;'>");
                    str.push("</div>");
                    break;
                case 1:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.arenaOpenBox(" + Number(i + 1) + ");' class='GiftBox' id='giftbox" + i + "' style='top:" + gifttop + "px;left:" + giftleft + "px;background-position:-54px -" + i * 54 + "px;'></div>");
                    break;
                case 2:
                    str.push("<div ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) AthleticsClass.ShowGiftInfo(" + i + ");' class='GiftBox' id='giftbox" + i + "' style='top:" + gifttop + "px;left:" + giftleft + "px;background-position:0 -" + i * 54 + "px;'>");
                    str.push("<div style='width:72px;height:30px;left:-9px;top:12px;position:absolute;z-index:1;background:url(res/dialog/Athletics_Receive.png) no-repeat;'></div>");
                    str.push("</div>");
                    break;
            }
            gifttop -= 62;
            var userlist = AthleticsJson.data[0].list[i].UserID.split(",");
            for (var j = 0; j < userlist.length; j++) {
                str.push("<div id='UserHand" + AthleticsJson.data[0].list[i].UserID.split(",")[j] + "' class='UserHandBg' style='top:" + heady + "px;left:" + headx + "px;'");
                if (AthleticsJson.data[0].list[i].CompleteState.split(",")[j] == "0")
                    str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) AthleticsClass.ShowAthleticsDialog(" + i + "," + j + ");'");
                str.push(">");
                str.push("<div class='UserHandBgSmall'></div>");
                str.push("<img style='width:40px;height:40px;left:8px;top:8px;position:absolute;z-index:1;' src='res/city/UserImg/" + AthleticsJson.data[0].list[i].HeadIcon.split(",")[j] + ".png' />");
                str.push("<div class='UserHandQg'><div class='UserNameBox'>" + AthleticsJson.data[0].list[i].UserName.split(",")[j] + "</div><div class='UserLVBox'>LV " + AthleticsJson.data[0].list[i].UserLV.split(",")[j] + "</div></div>");
                if (AthleticsJson.data[0].list[i].CompleteState.split(",")[j] == "1") {
                    str.push("<img style='width:56px;height:56px;position:absolute;z-index:10;' src='res/dialog/Athletics_Beat.png' />");
                }
                if (AthleticsJson.data[0].list[i].CompleteState.split(",")[j] == "-1") {
                    str.push("<img style='width:56px;height:56px;position:absolute;z-index:10;' src='res/dialog/Athletics_Beat2.png' />");
                }
                str.push("</div>");
                headx += 60;
            }

            heady -= 62;
            headx = 132;
        }
        if (AthleticsJson.data[0].RefreshNum > 0) {
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) AthleticsClass.RefreshAthletics();' style='top:131px;left:382px;background:url(res/dialog/ButRefreshs1.png) no-repeat;'></div>");
            str.push("<div class='DefaultFont_14 RedFont' id='needCoin' style='top:113px;left:388px;'>" + (3 - AthleticsJson.data[0].RefreshNum + 1) * 10 + "萌币</div>");
        }
        else
            str.push("<div class='ButtonSmall' style='top:131px;left:382px;background:url(res/dialog/ButRefreshs2.png) no-repeat;'></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);

        if (AthleticsJson.data[0].RefreshTime > 0 && IsAthleticsRefreshTim == false) {
            RefreshTime();
        }
    },

    RefreshAthletics: function (index) {
        if (AthleticsJson.data[0].RefreshNum < 1)
            return;
        if (document.getElementById("message") != null)
            $("#message").remove();

        if (UserJson.Gold < ((3 - AthleticsJson.data[0].RefreshNum + 1) * 10)) {
            ShowMessage("萌币不足，是否充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
        }
        else {
            for (var i = 0; i < 3; i++) {
                if (Number(AthleticsJson.data[0].BoxState.split(",")[i]) == 1) {
                    ShowMessage("有可领取的奖励，是否继续刷新？", function () { $("#other").html(""); $("#mask1").remove(); window.GameMainClass.arenaRefresh(0); }, function () { $("#other").html(""); $("#mask1").remove(); });
                    return;
                }
            }
            window.GameMainClass.arenaRefresh(0);
        }
    },

    ShowGiftInfo: function (GiftIndex) {
        $("body").stopTime("BubbleData");
        $("#BubbleData1").remove();
        var str = new Array();

        str.push("<div id='BubbleData1' class='BubbleData' style='left:50px;'>");
        str.push("<div id='BubbleDataUp'></div>");
        str.push("<div id='BubbleDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td>" + AthleticsJson.data[0].RewardInfo.split(",")[GiftIndex] + "</td></tr>");
        str.push("</table>");
        str.push("</div>");
        str.push("<div id='BubbleDataDown' ></div>");
        str.push("<div id='Arrow' class='ToLeft' style='left:-8px;'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("giftbox" + GiftIndex).appendChild(divnode);


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

    ShowAthleticsDialog: function (i, j) {
        var str = new Array();
        $("#AthleticsDialog").remove();

        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='AthleticsDialog'>");
        //关闭按钮
        str.push("<div class='close' style='left:290px;top:0px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#AthleticsDialog\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<image style='position:absolute;z-index:20;top:-14px;left:79px;width:173px;height:44px;' src='res/dialog/AtPVP_Txt.png'/>");

        str.push("<div class='UserHandBgSmall' style='top:70px;left:49px;'></div>");
        str.push("<img style='width:40px;height:40px;left:57px;top:78px;position:absolute;z-index:1;' src='res/city/UserImg/" + UserJson.UserHand + ".png' />");
        str.push("<div class='DefaultFont_14 RedFont' style='text-align:center;width:76px;heigth:18px;top:131px;left:39px;'>" + UserJson.UName + "</div>");

        str.push("<div class='UserHandBgSmall' style='top:70px;left:224px;'></div>");
        str.push("<img style='width:40px;height:40px;left:232px;top:78px;position:absolute;z-index:1;' src='res/city/UserImg/" + AthleticsJson.data[0].list[i].HeadIcon.split(",")[j] + ".png' />");
        str.push("<div class='DefaultFont_14 RedFont' style='text-align:center;width:76px;heigth:18px;top:131px;left:214px;'>" + AthleticsJson.data[0].list[i].UserName.split(",")[j] + "</div>");

        //决战按钮
        str.push("<div class='ButtonOther' style='top:161px;left:120px;background:url(res/dialog/AtPVP_But.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.arenaFight(" + Number(AthleticsJson.data[0].list[i].UserID.split(",")[j]) + ");' ></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("AthleticsBg").appendChild(divnode);
    },

    //战斗结果
    FightingBack: function (resert, userid, seliver, jugong, totalnum) {
        $("#AthleticsDialog").remove();
        var bool = false;
        for (var i = 0; i < 3; i++) {
            var userlist = AthleticsJson.data[0].list[i].UserID.split(",");
            for (var j = 0; j < userlist.length; j++) {
                if (userlist[j] == userid) {
                    bool = true;
                    var completestatelist = AthleticsJson.data[0].list[i].CompleteState.split(",");
                    if (resert == 1)
                        completestatelist[j] = "1";
                    else
                        completestatelist[j] = "-1";
                    var newss = "";
                    for (var k = 0; k < completestatelist.length; k++) {
                        newss += completestatelist[k];
                        if (k != completestatelist.length - 1)
                            newss += ",";
                    }
                    AthleticsJson.data[0].list[i].CompleteState = newss;
                    newss = "";
                    var commplete = totalnum / 4;
                    if (commplete > 0) {
                        var state = AthleticsJson.data[0].BoxState.split(",");
                        for (var x = 0; x < state.length; x++) {
                            if (x == commplete - 1)
                                state[x] = "1";
                            newss += state[x];
                            if (x != state.length - 1)
                                newss += ",";
                        }
                        AthleticsJson.data[0].BoxState = newss;
                    }
                    break;
                }
            }

            if (bool)
                break;
        }
        if (document.getElementById("AthleticsBg") != null)
            AthleticsClass.LoadAthletics();
        updateGold(4, 0 - jugong);
        updateGold(1, 0 - seliver);
        MessageJson.data[0].isResert = 0;
    }
}