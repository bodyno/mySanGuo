
var UserClass = {
    LoadVip: function () {
        var str = new Array();
        str.push('<div id="album9" style="width:345px;height:54px;top:11px;left:32px;" class="album"><div class="paging">');
        var left = 0, len = 0;
        for (var i = 0; i < VipJson.data.viplist.length; i++) {
            if (i % 4 == 0)
                str.push("<div class='pagediv' style='width:345px;height:54px;'>");
            len++;
            str.push("<div class='VipBox' id='VipBox" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) UserClass.ShowVipDetail(" + i + ");' style='background-position:-" + 78 * i + "px 0;left:" + left + "px;'><div class='DefaultFont_14' style='color:white;width:78px;text-align:center;top:37px;'>" + VipJson.data.viplist[i].money + "元</div>");
            if (i == 0)
                str.push("<div id='VipSelect'></div>");
            str.push("</div>");
            left += 88;
            if (i == VipJson.data.viplist.length - 1) {
                len = 0;
                str.push("<div class='VipBox' style='background-position:-" + (78 * VipJson.data.viplist.length) + "px 0;left:" + left + "px;'></div>");
                str.push("</div>");
            }
            if (len == 4) {
                str.push("</div>");
                if (i == VipJson.data.viplist.length - 1) {
                    str.push("<div class='page pagediv' style='width:345px;height:54px;'><div class='VipBox' style='background-position:-" + (78 * VipJson.data.viplist.length) + "px 0;left:" + left + "px;'></div></div>");
                }
                left = 0;
                len = 0;
            }
        }
        str.push("</div></div>");
        str.push("<div id='vipdetailbox' style='position:absolute;width:341px;height:100px;top:72px;left:35px;'></div>");
        str.push("<div class='DefaultFont RedFont' style='top:192px;left:15px;font-size:13px;'><font style='color:#7a3f38'>主公当前的VIP等级</font> VIP" + UserJson.vip + "</div>");
        if (UserJson.vip < VipJson.data.viplist[VipJson.data.viplist.length - 1].viplv)
            str.push("<div class='DefaultFont RedFont' style='top:210px;left:15px;font-size:13px;'><font style='color:#7a3f38'>再充值</font> " + VipJson.data.upmoney + " <font  style='color:#7a3f38'>元升级为</font> VIP" + (UserJson.vip + 1) + "</div>");
        else
            str.push("<div class='DefaultFont RedFont' style='top:210px;left:15px;font-size:13px;'>VIP" + (UserJson.vip + 1) + " <font style='color:#7a3f38'>即将开放</font></div>");

        if (VipJson.data.giftstatus == 0 && UserJson.vip > 0)
            str.push("<div class='ButtonBig' id='vipreceivebtn' style='left:239px;top:192px;background:url(res/Vip/ButVip1.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) UserClass.ReceiveVipGift();'></div>");
        else
            str.push("<div class='ButtonBig' style='left:239px;top:192px;background:url(res/Vip/ButVip2.png) no-repeat;'></div>");

        str.push("<div class='ButtonSmall' style='left:342px;top:192px;background:url(res/dialog/ButtonRecharge.png) no-repeat;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");
        var divnode = document.createElement("div");
        divnode.id = "VipDia";
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        $('#album9').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".pagediv",
            bounce: false
        });
        UserClass.ShowVipDetail(0);
    },

    ShowVipDetail: function (index) {
        var str = new Array();
        str.push("<div class='DefaultFont_14 RedFont'>VIP" + VipJson.data.viplist[index].viplv + "特权</div>");
        str.push("<table style='position:absolute;top:16px;font-size:13px;color:#7a3f38;line-height:16px;' width='100%'><tr><td colspan='2'>" + VipJson.data.viplist[index].detail.split("|")[0] + "</td></tr>");
        var templist = VipJson.data.viplist[index].detail.split("|");
        for (var i = 1; i < templist.length; i++) {
            if (i % 2 != 0)
                str.push("<tr>");
            str.push("<td>" + templist[i] + "</td>");
            if (i % 2 == 0)
                str.push("</tr>");
        }
        if (templist.length % 2 == 0)
            str.push("<td></td></tr>");
        str.push("</table>");

        $("#vipdetailbox").html(str.join(""));
        $("#VipSelect").remove();
        var divnode = document.createElement("div");
        divnode.id = "VipSelect";
        document.getElementById("VipBox" + index).appendChild(divnode);
    },

    ReceiveVipGift: function () {
        if (UserJson.vip > 0 && VipJson.data.giftstatus == 0)
            window.GameMainClass.sendRequestJson(1164, "", "ReceiveVipGiftResert");
    }
}