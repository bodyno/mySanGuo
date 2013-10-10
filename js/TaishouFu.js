
//太守府
var TaishouFuCalss = {
    LoadTaishouFu: function () {
        $("#TaishouFuBg").remove();
        var str = new Array();
        str.push("<div id='TaishouFuBg'>");
        str.push("<div class='DefaultFont_14 RedFont' id='ZhengshouNum' style='top:12px;left:91px;'>" + TaishouFuJson.data[0].TodayNumLave + "/" + TaishouFuJson.data[0].TodayNumTotal + "</div>"); //征收次数

        if (TaishouFuJson.data[0].TodayNumLave <= 0) {
            str.push("<div id='ZhengShouTime' class='DefaultFont_14 GreenRed' style='top:36px;left:91px;'>今日征收完毕</div>");
            if (isZhengShouTime == true)
                $("body").stopTime("zhengshoutime");
        }
        else {
            if (TaishouFuJson.data[0].LevyTime <= 0)
                str.push("<div id='ZhengShouTime' class='DefaultFont_14 GreenFont' style='top:36px;left:91px;'>当前可征收</div>"); //征收时间
            else {
                str.push("<div id='ZhengShouTime' class='DefaultFont_14 GreenRed' style='top:36px;left:91px;'></div>");
                str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaishouFuCalss.ImmediatelyComplete();' id='EndZhengshouTimeBtn' style='top:32px;left:162px;width:52px;height:28px;background:url(res/dialog/ClearTime.png) no-repeat;'></div>");
            }
        }
        //使用征收令次数        
        str.push("<div class='DefaultFont_14 RedFont' style='top:12px;left:288px;'>" + TaishouFuJson.data[0].ZSLNum + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:59px;left:91px;'>" + TaishouFuJson.data[0].Seilver + "</div>"); //征收银币
        str.push("<div class='DefaultFont_14 RedFont'  id='QiangZhengNum' style='top:83px;left:91px;'>" + TaishouFuJson.data[0].QiangZhengNumLave + "/" + TaishouFuJson.data[0].QiangZhengNumTotal + "</div>"); //强征次数
        str.push("<div class='DefaultFont_14 WhiteFont' id='ActionBox' style='top:116px;left:76px;'>" + UserJson.ActionPs + "/" + UserJson.zActionPs + "</div>"); //行动点
        str.push("<div class='DefaultFont_14 RedFont' id='ActionBackBox' style='top:116px;left:125px;'>(" + UserJson.ActionPointReLave + "/30)</div>"); //行动点回复次数
        str.push("<div id='HudeTime' class='DefaultFont_14 RedFont' style='top:136px;left:93px;'></div>");
        str.push("<div class='DefaultFont_14 WhiteFont' style='top:174px;left:76px;'>" + UserJson.MilitaryMerit + "</div>"); //军功数
        str.push("<div class='DefaultFont_14 WhiteFont' style='top:118px;left:275px;'>" + UserJson.Silver + "</div>"); //银币数
        str.push("<div class='DefaultFont_14 WhiteFont' style='top:175px;left:275px;'>" + UserJson.Gold + "</div>"); //萌币数

        //征收按钮
        if (TaishouFuJson.data[0].TodayNumLave > 0) {
            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaishouFuCalss.ZhengShouRequest();' id='ButtonZhengShou' style='top:15px;left:373px;background:url(res/dialog/ButtonCollection1.png) no-repeat;'></div>");
        }
        else {
            str.push("<div class='ButtonSmall' id='ButtonZhengShouEnabled' style='top:15px;left:373px;background:url(res/dialog/ButtonCollection2.png) no-repeat;'></div>");
        }
        //强征按钮
        if (TaishouFuJson.data[0].QiangZhengNumLave > 0) {
            str.push("<div class='ButtonSmall' id='QiangZhengBtn' style='top:73px;left:373px;background:url(res/dialog/ButtonQColl1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaishouFuCalss.QiangZhengSubMit();'></div>");
            str.push("<div class='DefaultFont_14 RedFont'  id='QiangZhengDetial' style='top:57px;left:373px;text-align:center;width:56px;'>" + 2 * (TaishouFuJson.data[0].QiangZhengNumTotal - TaishouFuJson.data[0].QiangZhengNumLave + 1) + "萌币</div>"); //萌币数
        }
        else
            str.push("<div class='ButtonSmall' id='QiangZhengBtn' style='top:73px;left:373px;background:url(res/dialog/ButtonQColl2.png) no-repeat;'></div>");
        //充值按钮
        str.push("<div class='ButtonSmall' style='top:195px;left:373px;background:url(res/dialog/ButtonRecharge.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        if (TaishouFuJson.data[0].LevyTime > 0 && isZhengShouTime == false && TaishouFuJson.data[0].TodayNumLave > 0)
            ZhengShou();
        GetActionJudgment();
    },

    //立即完成判断
    ImmediatelyComplete: function () {
        if (TaishouFuJson.data[0].LevyTime <= 0) {
            showTextMess("征收时间CD已结束", 1);
            return;
        }
        if (document.getElementById("message") == null)
            $("#message").remove();
        var needmoney = parseInt(TaishouFuJson.data[0].LevyTime / (12 * 60)) + (TaishouFuJson.data[0].LevyTime % (12 * 60) == 0 ? 0 : 1);
        needmoney = needmoney == 0 ? 1 : needmoney;
        ShowMessage("立即完成一共需要" + needmoney + "萌币，是否立即完成？", function () {
            $("#other").html(""); $("#mask1").remove();
            if (UserJson.Gold < needmoney) {
                ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
            window.GameMainClass.mansionClear();
        }, function () { $("#other").html(""); $("#mask1").remove(); }, null);
    },

    QiangZhengSubMit: function () {
        var needgold = 2 * (TaishouFuJson.data[0].QiangZhengNumTotal - TaishouFuJson.data[0].QiangZhengNumLave + 1);
        if (UserJson.Gold < needgold) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        window.GameMainClass.mansionForce();
    },

    //征收
    ZhengShouRequest: function () {
        if (TaishouFuJson.data[0].LevyTime + 300 > 900) {
            showTextMess("征收时间CD中", 0);
            return;
        }
        //ZhengShouResert(1, '扣除征收令一个! 征收成功 银币+8260', 10, 8260, 0)
        window.GameMainClass.mansionLevy();
    }
}