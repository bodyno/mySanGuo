

var WarHouseClass =
{
    templist: Array(),
    tempWHIndex: 0,

    ShowWHData: function (pageindex, goodsindex, bool) {
        goodsindex = goodsindex == null ? 0 : goodsindex;
        if (goodsindex == 0) {
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].gid == 0) {
                    goodsindex = i;
                    break;
                }
            }
        }
        var str = new Array();
        if (WarHouseClass.templist[pageindex - 1] == null) {
            WarHouseClass.templist.push(goodsindex);
        }
        else {
            if (bool)
                goodsindex = WarHouseClass.templist[pageindex - 1];
        }
        $("#WhBg").remove();
        str.push("<div id='WhBg'>");
        var i = WarHouseClass.templist[pageindex - 1];
        if (pageindex > UserJson.NumOpenedStorage) {
            str.push("<div id='warhouseLockPage' style='position:absolute;top:4px;left:4px;width:281px;height:198px;z-index:20;background:url(res/dialog/UI_Warehouse3.png) no-repeat;'>");
            str.push("<div class='DefaultFont_14 RedFont' style='width:281px;height:14px;line-height:14px;top:72px;text-align:center;'>");
            if (pageindex == 2)
                str.push("主公等级达到15级自动开启</div>");
            else if (pageindex == 3) {
                str.push("主公等级达到15级，并花费300萌币可开启</div>");
                if (UserJson.NumOpenedStorage == 2)
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpen.png) no-repeat;top:107px;left:113px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.OpenWarhouse();'></div>");
                else
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpens.png) no-repeat;top:107px;left:113px;'></div>");
            }
            else if (pageindex == 4) {
                str.push("VIP1级，花费400萌币可开启</div>");
                if (UserJson.NumOpenedStorage == 3)
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpen.png) no-repeat;top:107px;left:113px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.OpenWarhouse();'></div>");
                else
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpens.png) no-repeat;top:107px;left:113px;'></div>");
            }
            else {
                str.push("VIP4级，花费500萌币可开启</div>");
                if (UserJson.NumOpenedStorage == 4)
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpen.png) no-repeat;top:107px;left:113px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.OpenWarhouse();'></div>");
                else
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpens.png) no-repeat;top:107px;left:113px;'></div>");
            }
            str.push("</div>");
        }

        else {
            var top = 11, left = 9;
            var len = 0;

            for (; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].gid == 0) {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                            str.push("<div class='Skill' id='Goods" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowGoodsData(" + i + "," + m + ");' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                            if (WarhoushJson.data[0].GoodsList[i].iVal > 0 && WarhoushJson.data[0].GoodsList[i].Type > 4)
                                str.push("<div id='itemval" + i + "'>" + getNumSmall("X" + String(WarhoushJson.data[0].GoodsList[i].iVal), 1, 2) + "</div>");
                            if (WarhoushJson.data[0].GoodsList[i].RefineLv > 0 && WarhoushJson.data[0].GoodsList[i].Type <= 4)
                                str.push("<div class='Stars'></div>" + getNumSmall(WarhoushJson.data[0].GoodsList[i].RefineLv, 0, 15));
                            if (WarhoushJson.data[0].GoodsList[i].Type >= 20 && WarhoushJson.data[0].GoodsList[i].Type < 40)
                                str.push("<img style='position:absolute;z-index:11;width:31px;height:31px;left:9px;' src='res/dialog/USE.png' />");
                            str.push("</div>");
                            break;
                        }
                    }

                    if ((len + 1) % 6 == 0) {
                        top += 48;
                        left = 9;
                    }
                    else
                        left += 46;

                    len++;
                    if (len == 1) {
                        WarHouseClass.templist[pageindex - 1] = i;
                    }
                    if (len == 24) {
                        i += 1;
                        break;
                    }
                }

            }
            if (len > 0)
                str.push("<div id='GoodsSelect' style='top:10px;left:8px;'></div>");
        }


        str.push("<div");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowWHData(" + (pageindex - 1) + "," + i + ",true);'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div>");
        str.push("<div style='left:82px;'");
        if (pageindex < 5) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowWHData(" + (pageindex + 1) + "," + i + ",true);'");
        }
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/5</div>");

        var goodslen = 0;
        for (var j = 0; j < WarhoushJson.data[0].GoodsList.length; j++) {
            if (WarhoushJson.data[0].GoodsList[j].gid == 0)
                goodslen++;
        }
        str.push("<div class='PageNumber' style='top:212px;left:180px;font-size:15px;color:#F3F102;' id='itemcount'>" + goodslen + " / " + 24 * UserJson.NumOpenedStorage + "</div>");
        str.push("<div class='ButtonSmall' id='ButonUse' style='background:url(res/dialog/ButtonUse.png) no-repeat;top:201px;left:353px;display:none;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.UseItem();'></div>");
        str.push("<div class='ButtonSmall' id='salebtn' style='background:url(res/dialog/ButtonBuy.png) no-repeat;top:201px;left:353px;display:none;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.SaleGoods();'></div>");
        str.push("<div id='MyEData' style='position:absolute;top:6px;left:290px;width:110px;height:197px;z-index:20;padding-left:3px;padding-right:8px;padding-top:3px;'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
        if (WarhoushJson.data[0].GoodsList.length > 0) {
            if (pageindex <= UserJson.NumOpenedStorage) {
                var m = 0;
                for (; m < GoodsJson.length; m++) {
                    if (GoodsJson[m].ItemId == WarhoushJson.data[0].GoodsList[goodsindex].ItemId) {
                        break;
                    }
                }
                WarHouseClass.ShowGoodsData(goodsindex, m);
            }
        }
    },

    OpenWarhouse: function () {
        if (UserJson.Gold < 300) {
            ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
            return;
        }
        window.GameMainClass.sendRequestJson(1126, "", "OpenWarhouseResert");
    },

    //显示物品信息
    ShowGoodsData: function (itemindex, localindex) {
        var str = new Array();
        WarHouseClass.tempWHIndex = itemindex;

        var color = GoodsJson[localindex].NColor;
        var lv = WarhoushJson.data[0].GoodsList[itemindex].NLv;

        var namecolor = "white";
        var type = WarhoushJson.data[0].GoodsList[itemindex].Type;
        var type2 = "";
        var val = 0;
        var job = WarhoushJson.data[0].GoodsList[itemindex].Job;

        switch (job) {
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

        var price = 0;
        if (type < 5) {
            switch (color) {
                case 0:
                    for (var i = 1; i <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; i++) {
                        price += 101 * i;
                    }
                    break;
                case 1:
                    for (var i = 1; i <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; i++) {
                        price += 328 * i;
                    }
                    break;
                case 2:
                    for (var i = 1; i <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; i++) {
                        price += 610 * i;
                    }
                    break;
                case 3:
                    for (var i = 1; i <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; i++) {
                        price += 809 * i;
                    }
                    break;
                case 4:
                    for (var i = 1; i <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; i++) {
                        price += 2513 * i;
                    }
                    break;
            }
            price = Math.round(price * 0.6);
        }

        switch (type) {
            case 2:
                type = '头盔';
                type2 = "生命";
                val = WarhoushJson.data[0].GoodsList[itemindex].hpBonus;
                job = '全职业';
                break;
            case 3:
                type = '盔甲';
                type2 = "防御";
                val = WarhoushJson.data[0].GoodsList[itemindex].defBonus;
                job = '全职业';
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
        top = -18;
        str.push("<div class='DefaultFont' style='color:" + namecolor + ";font-size:14px;top:" + (top += 18) + "px;'>" + GoodsJson[localindex].IName + "</div>");
        if (WarhoushJson.data[0].GoodsList[itemindex].Type < 5)
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>强化: <font style='color:#FED26A'>" + WarhoushJson.data[0].GoodsList[itemindex].RefineLv + "</font></div>");
        str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>类型: <font style='color:#FED26A'>" + type + "</font></div>");
        if (WarhoushJson.data[0].GoodsList[itemindex].Type < 5 || WarhoushJson.data[0].GoodsList[itemindex].Type == 9)
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>等级: <font style='color:#FED26A'>" + lv + "</font></div>");

        if (job != '')
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>职业: <font style='color:#FED26A'>" + job + "</font></div>");

        if (type2 != "")
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>" + type2 + ": <font style='color:#FED26A'>" + val + (tempVal == 0 ? "" : "+" + tempVal) + "</font></div>");

        str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>售价: <font style='color:#FED26A'>" + (GoodsJson[localindex].Price + price) + "</font></div>");
        str.push("<div class='DefaultFont' style='font-size:12px;color:white;;top:" + (top += 18) + "px;'>说明: </div><br/>");
        str.push("<div class='DefaultFont' style='font-size:12px;top:" + (top += 18) + "px;'><font style='color:#FED26A'>" + GoodsJson[localindex].detail + "</font></div>");


        $("#MyEData").html(str.join(""));
        if (WarhoushJson.data[0].GoodsList[itemindex].Type >= 20 && WarhoushJson.data[0].GoodsList[itemindex].Type < 40) {
            $("#ButonUse").css("display", "");
            $("#salebtn").css("display", "none");
        }
        else {
            $("#ButonUse").css("display", "none");
            $("#salebtn").css("display", "");
        }

        //获取被点击物品的座标
        var left = $("#Goods" + itemindex).position().left;
        var top = $("#Goods" + itemindex).position().top;
        $("#GoodsSelect").css({ "top": top - 2, "left": left - 2 });
    },

    //出售物品
    SaleGoods: function () {
        if (isSubmit)
            return;
        var i = 0;
        for (; i < GoodsJson.length; i++) {
            if (GoodsJson[i].ItemId == WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].ItemId)
                break;
        }
        var price = 0;
        if (WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].Type < 5) {
            switch (GoodsJson[i].NColor) {
                case 0:
                    for (var j = 1; j <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; j++) {
                        price += 101 * j;
                    }
                    break;
                case 1:
                    for (var j = 1; j <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; j++) {
                        price += 328 * j;
                    }
                    break;
                case 2:
                    for (var j = 1; j <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; j++) {
                        price += 610 * j;
                    }
                    break;
                case 3:
                    for (var j = 1; j <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; j++) {
                        price += 809 * j;
                    }
                    break;
                case 4:
                    for (var j = 1; j <= WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].RefineLv; j++) {
                        price += 2513 * j;
                    }
                    break;
            }
            price = Math.round(price * 0.6);

        }

        var temp = "";
        if (WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].Type == 8) {
            switch (GoodsJson[i].NColor) {
                case 1:
                    temp = ",蓝宝石×" + WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal;
                    break;
                case 2:
                    temp = ",紫宝石×" + WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal;
                    break;
                case 3:
                    temp = ",红宝石×" + WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal; ;
                    break;
                case 4:
                    temp = ",黄宝石×" + WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal; ;
                    break;
            }
        }

        if (WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].Type < 5) {
            switch (GoodsJson[i].NColor) {
                case 1:
                    temp = ",蓝宝石×1";
                    break;
                case 2:
                    temp = ",紫宝石×1";
                    break;
                case 3:
                    temp = ",红宝石×1";
                    break;
                case 4:
                    temp = ",黄宝石×1";
                    break;
            }
        }

        ShowMessage("出售" + GoodsJson[i].IName + "×" + WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal + "<br />获得" + (WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].iVal * (GoodsJson[i].Price + price)) + "银币" + temp,
        function () {
            $("#other").html("");
            $("#mask1").remove();
            //SaleGoodsResert(WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].ItId, 1, "出售成功", 100);
            isSubmit = true;
            window.GameMainClass.sellItem(Number(WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].ItId));

        }, function () { $("#other").html(""); $("#mask1").remove(); });
    },

    //使用物品
    UseItem: function () {
        if (isSubmit)
            return;
        isSubmit = true;
        window.GameMainClass.userItem(Number(WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].ItId), Number(WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].Type));
        //UseItemResert(1, '青铜剑x1 藤木弓x1 白纸扇x1 虎纹头巾x1 粗布衣x1 抽奖铜币x2 大包行动x1 5级礼包x1', WarhoushJson.data[0].GoodsList[WarHouseClass.tempWHIndex].ItId, 0, 0, 0, '{"ItemId":1000,"refHP":0,"defBonus":0,"refAtk":0,"correId":0,"Type":1,"ItId":1805,"hpBonus":0,"iVal":1,"NLv":1,"Job":1,"refDef":0,"RefineLv":0,"quality":1,"gid":0,"atkBonus":9},{"ItemId":1100,"refHP":0,"defBonus":0,"refAtk":0,"correId":0,"Type":1,"ItId":1806,"hpBonus":0,"iVal":1,"NLv":1,"Job":2,"refDef":0,"RefineLv":0,"quality":1,"gid":0,"atkBonus":12},{"ItemId":1200,"refHP":0,"defBonus":0,"refAtk":0,"correId":0,"Type":1,"ItId":1807,"hpBonus":0,"iVal":1,"NLv":1,"Job":3,"refDef":0,"RefineLv":0,"quality":1,"gid":0,"atkBonus":15},{"ItemId":1300,"refHP":0,"defBonus":0,"refAtk":0,"correId":0,"Type":2,"ItId":1808,"hpBonus":20,"iVal":1,"NLv":1,"Job":0,"refDef":0,"RefineLv":0,"quality":1,"gid":0,"atkBonus":0},{"ItemId":1400,"refHP":0,"defBonus":5,"refAtk":0,"correId":0,"Type":3,"ItId":1809,"hpBonus":0,"iVal":1,"NLv":1,"Job":0,"refDef":0,"RefineLv":0,"quality":1,"gid":0,"atkBonus":0},{"ItemId":6622,"refHP":0,"defBonus":0,"refAtk":0,"correId":10,"Type":22,"ItId":1810,"hpBonus":0,"iVal":1,"NLv":0,"Job":0,"refDef":0,"RefineLv":0,"quality":0,"gid":0,"atkBonus":0},{"ItemId":6551,"refHP":0,"defBonus":0,"refAtk":0,"correId":1000,"Type":11,"ItId":1811,"hpBonus":0,"iVal":1,"NLv":0,"Job":0,"refDef":0,"RefineLv":0,"quality":0,"gid":0,"atkBonus":0},{"ItemId":6701,"refHP":0,"defBonus":0,"refAtk":0,"correId":1001,"Type":23,"ItId":1812,"hpBonus":0,"iVal":1,"NLv":5,"Job":0,"refDef":0,"RefineLv":0,"quality":0,"gid":0,"atkBonus":0}', "", '{"ItemId":"1001,1101,1201,1301,1401,6560,6622,6701","count":"1,1,1,1,1,2,1,1"}');
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        /********************************************************物品**************************/
        switch (obj) {
            case 1:
                $("#Goods").attr("class", "ListItemClick");
                $("#Goods").html("<div class='MuneFontClick'>物品</div>");

                $("#Temporary").attr("class", "ListItem");
                $("#Temporary").html("<div class='MuneFont'>临时</div>");

                WarHouseClass.ShowWHData(1, 0);
                break;
            /*******************************************临时******************************************************************/ 
            case 2:
                $("#Goods").attr("class", "ListItem");
                $("#Goods").html("<div class='MuneFont'>物品</div>");

                $("#Temporary").attr("class", "ListItemClick");
                $("#Temporary").html("<div class='MuneFontClick'>临时</div>");
                WarHouseClass.ShowLSData(1);
                break;
        }
    },

    /*************************************临时区********************************************/
    ShowLSData: function (pageindex) {
        var str = new Array();
        $("#WhBg").remove();
        str.push("<div id='WhBg' style='background:url(res/dialog/UI_WarehouseT.png);'>");

        var len = TemporaryJson.data[0].GoodsList.length;
        var tempindex = 0;
        var startindex = (pageindex - 1) * 24;
        var endindex = 24;
        var maxpage = 1;
        if (len > 24) {
            maxpage = parseInt(len / 24) + (len % 24 == 0 ? 0 : 1);
        }

        if (len <= 24)
            endindex = len;
        else if (pageindex <= len / 24) {
            endindex = startindex + 24;
        }
        else {
            endindex = startindex + len % 24;
        }

        var top = 11, left = 9;
        if (len > 0)
            str.push("<div id='GoodsSelect' style='top:10px;left:8px;'></div>");
        for (var i = startindex; i < endindex; i++) {
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == TemporaryJson.data[0].GoodsList[i].ItemId) {
                    str.push("<div class='Skill' id='Goods" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowLSGoodsData(" + i + "," + m + ");' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                    if (TemporaryJson.data[0].GoodsList[i].iVal > 0 && TemporaryJson.data[0].GoodsList[i].Type > 4)
                        str.push(getNumSmall("X" + String(TemporaryJson.data[0].GoodsList[i].iVal), 1, 2));
                    str.push("</div>");
                    break;
                }
            }
            if ((i + 1) % 6 == 0) {
                top += 48;
                left = 9;
            }
            else
                left += 46;
        }

        str.push("<div");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowLSData(" + (pageindex - 1) + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div>");
        str.push("<div style='left:82px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.ShowLSData(" + (pageindex + 1) + ");'");
        }
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");

        var goodslen = 0;
        for (var j = 0; j < TemporaryJson.data[0].GoodsList.length; j++) {
            if (TemporaryJson.data[0].GoodsList[j].gid == 0)
                goodslen++;
        }
        if (len > 0) {
            str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonAPickup1.png) no-repeat;top:201px;left:256px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) javascript:WarHouseClass.PackGoods(0);'></div>");
            str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonPickup1.png) no-repeat;top:201px;left:353px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) WarHouseClass.PackGoods(1);'></div>");
        }
        str.push("<div id='MyEData' style='position:absolute;top:6px;left:290px;width:110px;height:197px;z-index:20;padding-left:3px;padding-right:8px;padding-top:3px;'>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        if (pageindex <= UserJson.NumOpenedStorage) {
            for (var m = 0; m < GoodsJson.length; m++) {
                if (GoodsJson[m].ItemId == TemporaryJson.data[0].GoodsList[startindex].ItemId) {
                    WarHouseClass.ShowLSGoodsData(startindex, m);
                }
            }
        }
    },

    //显示临时物品信息
    ShowLSGoodsData: function (itemindex, localindex) {
        var str = new Array();
        WarHouseClass.tempPackIndex = itemindex;
        var color = GoodsJson[localindex].NColor;
        var lv = TemporaryJson.data[0].GoodsList[itemindex].NLv;

        var namecolor = "white";
        var type = TemporaryJson.data[0].GoodsList[itemindex].Type;
        var type2 = "";
        var val = 0;
        var job = TemporaryJson.data[0].GoodsList[itemindex].Job;

        switch (job) {
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

        switch (type) {
            case 2:
                type = '头盔';
                type2 = "生命";
                val = TemporaryJson.data[0].GoodsList[itemindex].defBonus;
                break;
            case 3:
                type = '盔甲';
                type2 = "防御";
                val = TemporaryJson.data[0].GoodsList[itemindex].defBonus;
                break;
            case 1:
                type = '武器';
                type2 = "攻击";
                val = TemporaryJson.data[0].GoodsList[itemindex].atkBonus;
                break;
            case 4:
                type = '宝物';
                type2 = "生命";
                val = TemporaryJson.data[0].GoodsList[itemindex].hpBonus;
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

        str.push("<div class='DefaultFont' style='color:" + namecolor + ";font-size:14px;'>" + GoodsJson[localindex].IName + "</div><br/>");
        if (TemporaryJson.data[0].GoodsList[itemindex].Type < 5)
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>精炼: <font style='color:#FED26A'>" + TemporaryJson.data[0].GoodsList[itemindex].RefineLv + "</font></div><br/>");
        str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>类型: <font style='color:#FED26A'>" + type + "</font></div><br/>");
        if (TemporaryJson.data[0].GoodsList[itemindex].Type < 5 || TemporaryJson.data[0].GoodsList[itemindex].Type == 9)
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>等级: <font style='color:#FED26A'>" + lv + "</font></div><br />");

        if (job != '')
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>职业: <font style='color:#FED26A'>" + job + "</font></div><br />");

        if (type2 != "")
            str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>" + type2 + ": <font style='color:#FED26A'>" + val + "</font></div><br/>");

        str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>售价: <font style='color:#FED26A'>" + parseInt(GoodsJson[localindex].Price) + "</font></div><br/>");
        str.push("<div class='DefaultFont' style='font-size:12px;color:white;'>获得时间: </div><br/>");
        str.push("<div class='DefaultFont' style='font-size:12px;'><font style='color:#FED26A'>" + TemporaryJson.data[0].GoodsList[itemindex].time + "</font></div>");

        str.push("</div>");
        $("#MyEData").html(str.join(""));

        //获取被点击英雄头像的座标
        var left = $("#Goods" + itemindex).position().left;
        var top = $("#Goods" + itemindex).position().top;
        $("#GoodsSelect").css({ "top": top - 2, "left": left - 2 });
    },

    tempPackIndex: 0,

    PackGoods: function (type) {
        var id = -1;
        if (type == 1) {
            id = TemporaryJson.data[0].GoodsList[WarHouseClass.tempPackIndex].ItId;
        }
        window.GameMainClass.pickUpItem(Number(id), Number(type));
    },

    GetItemCounts: function (itemid) {
        var num = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].ItemId == itemid) {
                num += WarhoushJson.data[0].GoodsList[i].iVal;
            }
        }
        return num;
    }
}