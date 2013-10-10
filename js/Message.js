
//消息
var MessageClass = {
    //加载消息列表
    LoadMessage: function (pageindex, type) {
        $("#MessageBg").remove();
        var str = new Array();
        var len = 0;
        var startindex = 0;
        if (type == 1) {
            len = MessageJson.data[0].list.length;
            $("#Message_All").attr("class", "ListItemClick");
            $("#Message_All").html("<div class='MuneFontClick'>全部</div>");

            $("#Message_Fighting").attr("class", "ListItem");
            $("#Message_Fighting").html("<div class='MuneFont'>战报</div>");

            $("#Message_System").attr("class", "ListItem");
            $("#Message_System").html("<div class='MuneFont'>系统</div>");

            startindex = (pageindex - 1) * 4;
        }
        else if (type == 3) {
            for (var i = 0; i < MessageJson.data[0].list.length; i++) {
                if (MessageJson.data[0].list[i].MessageType == 3) {
                    len++;
                    if (pageindex > 1) {
                        if (len == (pageindex - 1) * 4) {
                            startindex = i + 1;
                        }
                    }
                    else {
                        if (len == 1 && startindex == -1) {
                            startindex = i;
                        }
                    }
                }
            }


            $("#Message_All").attr("class", "ListItem");
            $("#Message_All").html("<div class='MuneFont'>全部</div>");

            $("#Message_Fighting").attr("class", "ListItemClick");
            $("#Message_Fighting").html("<div class='MuneFontClick'>战报</div>");

            $("#Message_System").attr("class", "ListItem");
            $("#Message_System").html("<div class='MuneFont'>系统</div>");
        }
        else if (type == 2) {
            for (var i = 0; i < MessageJson.data[0].list.length; i++) {
                if (MessageJson.data[0].list[i].MessageType < 3) {
                    len++;
                    if (pageindex > 1) {
                        if ((len == (pageindex - 1) * 4)) {
                            startindex = i + 1;
                        }
                    }
                    else {
                        if (len == 1 && startindex == -1) {
                            startindex = i;
                        }
                    }
                }
            }

            $("#Message_All").attr("class", "ListItem");
            $("#Message_All").html("<div class='MuneFont'>全部</div>");

            $("#Message_Fighting").attr("class", "ListItem");
            $("#Message_Fighting").html("<div class='MuneFont'>战报</div>");

            $("#Message_System").attr("class", "ListItemClick");
            $("#Message_System").html("<div class='MuneFontClick'>系统</div>");
        }
        var maxpage = 1;
        if (len > 4) {
            maxpage = parseInt(len / 4) + (len % 4 == 0 ? 0 : 1);
        }

        str.push("<div id='MessageBg'>");
        /*var MessageJson = {
        "data": [
        { "isResert": 1, "list": [
        { "MessageID": 1, "MessageType": 3, "UserHand": 1, "MessageTime": "1小时前", "Message": "主公亲率百万大军，爆了<font style='color:#990000'>欧阳</font>的菊花!酣战三百回合，大获合胜！" },*/
        var handy = 8;
        var temp = 0;
        switch (type) {
            case 1:
                for (var i = startindex; i < MessageJson.data[0].list.length; i++) {
                    str.push("<div class='UserHandBgSmall' style='top:" + (handy - 8) + "px;left:9px;'></div>");
                    str.push("<img style='width:40px;height:40px;left:17px;top:" + handy + "px;position:absolute;z-index:1;' src='" + (MessageJson.data[0].list[i].UserHand == 0 ? ("res/dialog/New" + (MessageJson.data[0].list[i].MessageType == 1 ? "101" : "100")) : ("res/city/UserImg/" + MessageJson.data[0].list[i].UserHand)) + ".png' />");

                    str.push("<div class='MessageType' style='top:" + (handy + 1) + "px;left:71px;background-position:0 -" + (MessageJson.data[0].list[i].MessageType < 3 ? 0 : (MessageJson.data[0].list[i].MessageType - 2) * 18) + "px;'></div>");
                    str.push("<div class='DefaultFont BlackFont' style='top:" + (handy + 22) + "px;font-size:12px;left:58px;width:60px;text-align:center;'>" + MessageJson.data[0].list[i].MessageTime + "</div>");

                    str.push("<div class='DetialBox' style='left:115px;top:" + (handy - 4) + "px;line-height:20px;width:234px;height:46px;color:#58221D;font-size:12px;	vertical-align:middle;font-weight:300;line-height:14px;'><table style='width:100%'><tr valign='middle'><td align='left' style='height:46px;'>" + MessageJson.data[0].list[i].Message + "</td></tr></table></div>");

                    if (MessageJson.data[0].list[i].MessageType == 2) {
                        if (MessageJson.data[0].list[i].Receive == 0)
                            str.push("<div class='ButtonSmall' id='MessButn" + i + "' style='top:" + (handy + 6) + "px;left:350px;background:url(res/dialog/ButtonNew.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.msgGetReword(" + Number(MessageJson.data[0].list[i].MessageID) + ");'></div>");
                        else
                            str.push("<div class='HasBuyed' style='top:" + (handy - 4) + "px;width:63px;height:48px;left:340px;background:url(res/dialog/NeLabel_Rv.png) no-repeat;'></div>");
                    }
                    handy += 50;

                    temp++;
                    if (temp == 4)
                        break;
                }
                break;
            case 2:
                for (var i = startindex; i < MessageJson.data[0].list.length; i++) {
                    if (MessageJson.data[0].list[i].MessageType < 3) {
                        str.push("<div class='UserHandBgSmall' style='top:" + (handy - 8) + "px;left:9px;'></div>");
                        str.push("<img style='width:40px;height:40px;left:17px;top:" + handy + "px;position:absolute;z-index:1;' src='" + (MessageJson.data[0].list[i].UserHand == 0 ? ("res/dialog/New" + (MessageJson.data[0].list[i].MessageType == 1 ? "101" : "100")) : ("res/city/UserImg/" + MessageJson.data[0].list[i].UserHand)) + ".png' />");

                        str.push("<div class='MessageType' style='top:" + (handy + 1) + "px;left:71px;background-position:0 -" + (MessageJson.data[0].list[i].MessageType < 3 ? 0 : (MessageJson.data[0].list[i].MessageType - 2) * 18) + "px;'></div>");
                        str.push("<div class='DefaultFont BlackFont' style='top:" + (handy + 22) + "px;font-size:12px;left:58px;width:60px;text-align:center;'>" + MessageJson.data[0].list[i].MessageTime + "</div>");

                        str.push("<div class='DetialBox' style='left:115px;top:" + (handy - 4) + "px;line-height:20px;width:234px;height:46px;color:#58221D;font-size:12px;	vertical-align:middle;font-weight:300;line-height:14px;'><table style='width:100%'><tr valign='middle'><td align='left' style='height:46px;'>" + MessageJson.data[0].list[i].Message + "</td></tr></table></div>");

                        if (MessageJson.data[0].list[i].MessageType == 2) {
                            if (MessageJson.data[0].list[i].Receive == 0)
                                str.push("<div class='ButtonSmall'  id='MessButn" + i + "' style='top:" + (handy + 6) + "px;left:350px;background:url(res/dialog/ButtonNew.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.msgGetReword(" + Number(MessageJson.data[0].list[i].MessageID) + ");'></div>");
                            else
                                str.push("<div class='HasBuyed' style='top:" + (handy - 4) + "px;width:63px;height:48px;left:340px;background:url(res/dialog/NeLabel_Rv.png) no-repeat;'></div>");
                        }
                        handy += 50;

                        temp++;
                        if (temp == 4)
                            break;
                    }
                }
                break;
            case 3:
                for (var i = startindex; i < MessageJson.data[0].list.length; i++) {
                    if (MessageJson.data[0].list[i].MessageType == 3) {
                        str.push("<div class='UserHandBgSmall' style='top:" + (handy - 8) + "px;left:9px;'></div>");
                        str.push("<img style='width:40px;height:40px;left:17px;top:" + handy + "px;position:absolute;z-index:1;' src='" + (MessageJson.data[0].list[i].UserHand == 0 ? ("res/dialog/New" + (MessageJson.data[0].list[i].MessageType == 1 ? "101" : "100")) : ("res/city/UserImg/" + MessageJson.data[0].list[i].UserHand)) + ".png' />");

                        str.push("<div class='MessageType' style='top:" + (handy + 1) + "px;left:71px;background-position:0 -" + (MessageJson.data[0].list[i].MessageType < 3 ? 0 : (MessageJson.data[0].list[i].MessageType - 2) * 18) + "px;'></div>");
                        str.push("<div class='DefaultFont BlackFont' style='top:" + (handy + 22) + "px;font-size:12px;left:58px;width:60px;text-align:center;'>" + MessageJson.data[0].list[i].MessageTime + "</div>");

                        str.push("<div class='DetialBox' style='left:115px;top:" + (handy - 4) + "px;line-height:20px;width:234px;height:46px;color:#58221D;font-size:12px;	vertical-align:middle;font-weight:300;line-height:14px;'><table style='width:100%'><tr valign='middle'><td align='left' style='height:46px;'>" + MessageJson.data[0].list[i].Message + "</td></tr></table></div>");

                        handy += 50;

                        temp++;
                        if (temp == 4)
                            break;
                    }
                }
                break;
        }

        str.push("<div style='top:209px;left:146px;'");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MessageClass.LoadMessage(" + String(pageindex - 1) + "," + type + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div><div style='top:209px;left:238px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) MessageClass.LoadMessage(" + String(pageindex + 1) + "," + type + ");'");
        }
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:209px;left:179px;width:61px;line-height:27px;text-align:center;'>" + pageindex + "/" + maxpage + "</div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);
    }
}