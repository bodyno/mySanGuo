

var FirstKillClass =
{
    LoadDialg: function (pageindex) {
        var str = new Array();
        $("#KillFirstDialog").remove();
        str.push("<div id='KillFirstDialog'>");
        str.push("<div class='DefaultFont' style='color:white;top:-22px;left:181px;font-size:12px;'>在征战地图挑战副本,首杀全奖,次杀半奖</div>");
        str.push('<div id="album7"  style="width:392px;height:215px;top:11px;left:29px;" class="album"><div class="paging">');
        var left = 0;
        var len = 0;
        for (var i = 0; i < FirstKillJson.data.BossList.length; i++) {
            if (i % 3 == 0) {
                str.push("<div class='page pagediv' style='width:392px;height:215px;'>");
            }
            len++;
            str.push("<div class='BossBg' style='left:" + left + "px;'><div class='BoosHead' ");
            if (FirstKillJson.data.BossList[i].isKill == 1) {
                str.push("style='background-position: -128px -" + (i * 100) + "px;'><img src='res/city/FK_killed.png' /></div>");
                str.push("<div class='DefaultFont_14 GoldFont' style='width:128px;top:104px;text-align:center;'>" + FirstKillJson.data.BossList[i].KillUserName + "<font style='color:white;'>首杀</font></div>");
                if (FirstKillJson.data.BossList[i].isComplete)
                    str.push("<div class='DefaultFont_14 GoldFont' style='width:128px;top:124px;text-align:center;'><font style='color:white;'>我第</font>" + FirstKillJson.data.BossList[i].KillNo + "<font style='color:white;'>个击杀</font></div>");
                else
                    str.push("<div class='DefaultFont_14' style='width:128px;top:124px;color:white;text-align:center;'>我尚未击杀</div>");

            }
            else {
                str.push("style='background-position: 0 -" + (i * 100) + "px;'></div>");
                str.push("<div class='DefaultFont_14 GoldFont' style='width:128px;top:112px;text-align:center;'><img src='res/city/FirstKill_No.png' /></div>");
            }

            str.push("<div class='DefaultFont_14 WhiteFont' style='width:128px;top:169px;text-align:left;padding-left:18px;'>萌币×" + FirstKillJson.data.BossList[i].M + "</div>");
            str.push("<div class='DefaultFont_14 WhiteFont' style='width:128px;top:189px;text-align:left;padding-left:18px;'>银币×" + FirstKillJson.data.BossList[i].Silver + "</div>");
            if (FirstKillJson.data.BossList[i].isComplete == true && FirstKillJson.data.BossList[i].isReceive == false) {
                str.push("<div class='ButtonOther' id='rewardbtn" + i + "' style='width:80px;height:44px;background:url(res/city/FirstKill_Ok.png) no-repeat;top:26px;left:24px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) FirstKillClass.RewardSubmit(" + i + ");'></div>");
            }
            left += 132;
            str.push("</div>");
            if (i == FirstKillJson.data.BossList.length - 1) {
                len = 0;
                str.push("<div class='BossBg' style='left:" + left + "px;background:url(res/city/FirstKill_NoBg.png) no-repeat;'></div>");
                str.push("</div>");
            }
            if (len == 3) {
                str.push("</div>");
                if (i == FirstKillJson.data.BossList.length - 1) {
                    str.push("<div class='page pagediv' style='width:392px;height:215px;'><div class='BossBg' style='left:0px;background:url(res/city/FirstKill_NoBg.png) no-repeat;'></div></div>");
                }
                left = 0;
                len = 0;
            }
        }

        str.push("</div></div></div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        $('#album7').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".page",
            bounce: false
        });
    },

    RewardSubmit: function (index) {
        window.GameMainClass.sendRequestJson(1119, '{"FuBenID":' + FirstKillJson.data.BossList[index].FubenID + '}', "FirstKillReward");
    }
}