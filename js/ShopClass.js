
var ShopClass = {
    ShowItemId: 0,
    LoadHot: function (pageindex) {
        var str = new Array();
        var len = 0;
        var bool = false;
        var tempindex = 0;
        for (var i = 0; i < ShopJson.data[0].list.length; i++) {
            if (ShopJson.data[0].list[i].Hot && ShopJson.data[0].list[i].SellType == 1)
                len++;
            if (pageindex > 1) {
                if ((len == (pageindex - 1) * 6) && bool == false) {
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
        var startindex = tempindex + 1;
        var maxpage = 1;
        if (len > 6) {
            maxpage = parseInt(len / 6) + (len % 6 == 0 ? 0 : 1);
        }

        var top = 6, left = 6;
        var temp = -1, temp1 = 0;
        for (var i = startindex; i < ShopJson.data[0].list.length; i++) {
            if (ShopJson.data[0].list[i].Hot && ShopJson.data[0].list[i].SellType == 1) {
                if (temp == -1)
                    temp = i;

                str.push("<div class='ShopItemBox' style='top:" + top + "px;left:" + left + "px;'");
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == ShopJson.data[0].list[i].pID) {
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.ShowShopItem(" + i + "," + j + ");' ><div class='Skill' style='top:7px;left:7px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'><div class='HotIcon'></div></div>");
                        str.push("<div class='PriceType' style='top:7px;'></div><div class='DefaultFont_14 GoldFont' style='top:9px;left:70px;width:50px;text-align:center;'>" + ShopJson.data[0].list[i].Price + "</div>");    
                        str.push("<div class='PriceType' style='top:28px;background-position:0 -18px;'></div><div class='DefaultFont_14 GoldFont' style='top:30px;left:70px;width:50px;text-align:center;'>" + parseInt(ShopJson.data[0].list[i].Price * ShopJson.data[0].discount / 100) + "</div>");
                        str.push("<div class='DefaultFont_14 RedFont' style='top:54px;left:5px;width:120px;text-align:center;'>" + GoodsJson[j].IName + "×" + ShopJson.data[0].list[i].Val + "</div>");
                        break;
                    }
                }

                str.push("</div>");
                temp1++;
                if (temp1 % 3 == 0) {
                    left = 6;
                    top += 100;
                }
                else
                    left += 135;
            }

            if (temp1 == 6)
                break;
        }

        str.push("<div class='PageNumber' style='top:211px;left:182px;text-align:center;width:50px;height:20px;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadHot(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" style='top:209px;left:145px;'></div><div style='left:241px;top:209px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadHot(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push(" ></div>");
        if (UserJson.vip > 0)
            str.push("<img style='position:absolute;z-index:1;top:210px;left:-5px;' src='res/dialog/VipOK.png' />");
        else
            str.push("<div class='ButtonSmall' style='top:210px;left:-5px;width:150px;height:28px;background:url(res/dialog/VipON.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) EnterBuliding(1800);'></div>");
        str.push("<div class='ButtonSmall' style='top:207px;left:350px;background:url(res/dialog/ButtonRecharge.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");
        str.push("</div>");

        $("#ShopBg").html(str.join(""));
    },

    LoadShop: function (pageindex) {
        var str = new Array();
        var len = 0;
        var bool = false;
        var tempindex = 0;
        for (var i = 0; i < ShopJson.data[0].list.length; i++) {
            if (ShopJson.data[0].list[i].SellType == 1)
                len++;
            if (pageindex > 1) {
                if ((len == (pageindex - 1) * 6) && bool == false) {
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
        var startindex = tempindex + 1;
        var maxpage = 1;
        if (len > 6) {
            maxpage = parseInt(len / 6) + (len % 6 == 0 ? 0 : 1);
        }

        var top = 6, left = 6;
        var temp = -1, temp1 = 0;
        for (var i = startindex; i < ShopJson.data[0].list.length; i++) {
            if (ShopJson.data[0].list[i].SellType == 1) {
                if (temp == -1)
                    temp = i;

                str.push("<div class='ShopItemBox' style='top:" + top + "px;left:" + left + "px;'");
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == ShopJson.data[0].list[i].pID) {
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.ShowShopItem(" + i + "," + j + ");' ><div class='Skill' style='top:7px;left:7px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'>");
                        if (ShopJson.data[0].list[i].Hot)
                            str.push("<div class='HotIcon'></div>");
                        str.push("</div>");
                        str.push("<div class='PriceType' style='top:7px;'></div><div class='DefaultFont_14 GoldFont' style='top:9px;left:70px;width:50px;text-align:center;'>" + ShopJson.data[0].list[i].Price + "</div>");
                        str.push("<div class='PriceType' style='top:28px;background-position:0 -18px;'></div><div class='DefaultFont_14 GoldFont' style='top:30px;left:70px;width:50px;text-align:center;'>" + parseInt(ShopJson.data[0].list[i].Price * ShopJson.data[0].discount / 100) + "</div>");

                        str.push("<div class='DefaultFont_14 RedFont' style='top:54px;left:5px;width:120px;text-align:center;'>" + GoodsJson[j].IName + "×" + ShopJson.data[0].list[i].Val + "</div>");
                        break;
                    }
                }

                str.push("</div>");
                temp1++;
                if (temp1 % 3 == 0) {
                    left = 6;
                    top += 100;
                }
                else
                    left += 135;

                if (temp1 == 6)
                    break;
            }
        }

        str.push("<div class='PageNumber' style='top:211px;left:182px;text-align:center;width:50px;height:20px;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadShop(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" style='top:209px;left:145px;'></div><div style='left:241px;top:209px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadShop(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push(" ></div>");
        if (UserJson.vip > 0)
            str.push("<img style='position:absolute;z-index:1;top:210px;left:-5px;' src='res/dialog/VipOK.png' />");
        else
            str.push("<div class='ButtonSmall' style='top:210px;left:-5px;width:150px;height:28px;background:url(res/dialog/VipON.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) EnterBuliding(1800);'></div>");
        str.push("<div class='ButtonSmall' style='top:207px;left:350px;background:url(res/dialog/ButtonRecharge.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");
        str.push("</div>");

        $("#ShopBg").html(str.join(""));
    },

    LoadOne: function () {
        var str = new Array();
        for (var i = 0; i < ShopJson.data[0].list.length; i++) {
            if (ShopJson.data[0].list[i].pID == ShopClass.ShowItemId) {
                str.push("<div class='ShopItemBox' style='top:6px;left:6px;'");
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == ShopJson.data[0].list[i].pID) {
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.ShowShopItem(" + i + "," + j + ");' ><div class='Skill' style='top:7px;left:7px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'>");
                        if (ShopJson.data[0].list[i].Hot)
                            str.push("<div class='HotIcon'></div>");
                        str.push("</div>");
                        str.push("<div class='PriceType' style='top:7px;'></div><div class='DefaultFont_14 GoldFont' style='top:9px;left:70px;width:50px;text-align:center;'>" + ShopJson.data[0].list[i].Price + "</div>");
                        str.push("<div class='PriceType' style='top:28px;background-position:0 -18px;'></div><div class='DefaultFont_14 GoldFont' style='top:30px;left:70px;width:50px;text-align:center;'>" + parseInt(ShopJson.data[0].list[i].Price * ShopJson.data[0].discount / 100) + "</div>");

                        str.push("<div class='DefaultFont_14 RedFont' style='top:54px;left:5px;width:120px;text-align:center;'>" + GoodsJson[j].IName + "×" + ShopJson.data[0].list[i].Val + "</div>");
                        break;
                    }
                }
                str.push("</div>");
                break;
            }
        }
        str.push("<div class='PageNumber' style='top:211px;left:182px;text-align:center;width:50px;height:20px;'>1/1</div>");
        str.push("<div class='ButtonLeft' style='top:209px;left:145px;'></div><div style='left:241px;top:209px;' class='ButtonRight'></div>");
        str.push("<div class='ButtonSmall' style='top:207px;left:350px;background:url(res/dialog/ButtonRecharge.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");
        if (UserJson.vip > 0)
            str.push("<img style='position:absolute;z-index:1;top:210px;left:-5px;' src='res/dialog/VipOK.png' />");
        else
            str.push("<div class='ButtonSmall' style='top:210px;left:-5px;width:150px;height:28px;background:url(res/dialog/VipON.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) EnterBuliding(1800);'></div>");
        $("#ShopBg").html(str.join(""));
    },

    LoadDuihuan: function (pageindex) {
        var str = new Array();
        var len = 0;
        var bool = false;
        var tempindex = 0;
        for (var i = 0; i < ShopJson.data[0].list.length; i++) {
            if ((ShopJson.data[0].list[i].SellType > 10 && ShopJson.data[0].list[i].SellType < 15) || ShopJson.data[0].list[i].SellType == 20)
                len++;
            if (pageindex > 1) {
                if ((len == (pageindex - 1) * 6) && bool == false) {
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
        var startindex = tempindex + 1;
        var maxpage = 1;
        if (len > 6) {
            maxpage = parseInt(len / 6) + (len % 6 == 0 ? 0 : 1);
        }

        var top = 6, left = 6;
        var temp = -1, temp1 = 0;
        for (var i = startindex; i < ShopJson.data[0].list.length; i++) {
            if ((ShopJson.data[0].list[i].SellType > 10 && ShopJson.data[0].list[i].SellType < 15) || ShopJson.data[0].list[i].SellType == 20) {
                if (temp == -1)
                    temp = i;

                str.push("<div class='ShopItemBox' style='top:" + top + "px;left:" + left + "px;background:url(res/dialog/Shop_Expbg.png) no-repeat;'");
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == ShopJson.data[0].list[i].pID) {
                        str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.ShowDuihuanItem(" + i + "," + j + ");' ><div class='Skill' style='top:7px;left:7px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'></div>");
                        if (ShopJson.data[0].list[i].SellType == 20)
                            str.push("<div class='PriceType' style='top:7px;background-position:0 -36px;'></div>");
                        else
                            str.push("<div class='PriceType' style='top:4px;left:48px;background:url(res/dialog/Gem" + (ShopJson.data[0].list[i].SellType % 10) + ".png) no-repeat;width:25px;height:25px;'></div>");
                        str.push("<div class='DefaultFont_14 GoldFont' style='top:9px;left:70px;width:50px;text-align:center;'>" + ShopJson.data[0].list[i].Price + "</div>");
                        str.push("<div class='DefaultFont_14 RedFont' style='top:54px;left:5px;width:120px;text-align:center;'>" + GoodsJson[j].IName + "×" + ShopJson.data[0].list[i].Val + "</div>");
                        break;
                    }
                }

                str.push("</div>");
                temp1++;
                if (temp1 % 3 == 0) {
                    left = 6;
                    top += 100;
                }
                else
                    left += 135;


                if (temp1 == 6)
                    break;
            }
        }

        str.push("<div class='PageNumber' style='top:211px;left:182px;text-align:center;width:50px;height:20px;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadDuihuan(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" style='top:209px;left:145px;'></div><div style='left:241px;top:209px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.LoadDuihuan(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push(" ></div>");
        str.push("<div class='ButtonSmall' style='top:207px;left:350px;background:url(res/dialog/ButtonRecharge.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) Recharge();'></div>");
        str.push("</div>");
        str.push("<div class='PriceType' style='top:219px;background-position:0 -36px;left:5px;'></div>");
        str.push("<div class='DefaultFont RedFont' style='top:220px;left:25px;font-size:13px;'>好人卡：<font id='goodcardnum'>" + ShopClass.goodcardnum + "</font></div>");
        $("#ShopBg").html(str.join(""));
    },

    goodcardnum: 0,

    SetGoodcardnum: function (json) {
        var BackJson = JSON.parse(json);
        ShopClass.goodcardnum = BackJson.goodcardnum;
        $("#goodcardnum").html(BackJson.goodcardnum);
    },

    //显示物品兑换的信息 
    ShowDuihuanItem: function (shopitemindex, localindex) {
        $("#ShopBuyDialog").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='ShopBuyDialog'>");
        str.push("<div class='close' style='left:240px;top:0px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#ShopBuyDialog\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div style='background:url(res/dialog/Shop_bgTxt.png) no-repeat 0 -28px;position:absolute;width:91px;height:28px;left:113px;top:5px;'></div>");
        str.push("<div class='Skill' style='top:50px;left:32px;background:url(res/Goods/" + GoodsJson[localindex].ImgId + ".png) no-repeat;'></div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:50px;left:78px;'>" + GoodsJson[localindex].IName + "×" + ShopJson.data[0].list[shopitemindex].Val + "</div>");
        str.push("<div class='DefaultFont_14' style='top:68px;left:78px;color:white;width:175px;height:30px;overflow:hidden;'>" + GoodsJson[localindex].detail + "</div>");
        str.push("<div class='AddButtonLeft' id='MoveBut' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.SetItemCount(1);' style='top:112px;left:114px;'></div><div style='top:112px;left:200px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.SetItemCount(2);'  id='AddBut' class='AddButtonRight AddrightOn'></div>");
        str.push("<div class='PageNumber' id='itemcount' style='top:114px;left:146px;text-align:center;width:50px;height:20px;'>1</div>");

        if (ShopJson.data[0].list[shopitemindex].SellType == 20)
            str.push("<div class='PriceType' style='top:156px;left:65px;background-position:0 -36px;'></div>");
        else
            str.push("<div class='PriceType' style='top:153px;left:60px;background:url(res/dialog/Gem" + (ShopJson.data[0].list[shopitemindex].SellType % 10) + ".png) no-repeat;width:25px;height:25px;'></div>");
        str.push("<div class='DefaultFont_14 GoldFont'  id='priceOne' style='top:158px;left:82px;width:50px;text-align:center;'>" + ShopJson.data[0].list[shopitemindex].Price + "</div>");

        if (ShopJson.data[0].list[shopitemindex].SellType == 20)
            str.push("<div class='PriceType' style='top:156px;left:179px;background-position:0 -36px;'></div>");
        else
            str.push("<div class='PriceType' style='top:153px;left:174px;background:url(res/dialog/Gem" + (ShopJson.data[0].list[shopitemindex].SellType % 10) + ".png) no-repeat;width:25px;height:25px;'></div>");
        str.push("<div class='DefaultFont_14 GoldFont' id='priceAll' style='top:158px;left:195px;width:50px;text-align:center;'>" + ShopJson.data[0].list[shopitemindex].Price + "</div>");

        str.push("<div class='ButtonSmall' style='top:190px;left:114px;background:url(res/BattleMap/BntAon4.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.BuyItem(" + shopitemindex + ");'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    //切换选项卡
    CheckItem: function (obj) {
        switch (obj) {
            case 1:
                $("#HotItem").attr("class", "ListItemClick");
                $("#AllItem").attr("class", "ListItem");
                $("#OneItem").attr("class", "ListItem");
                $("#DuihuanItem").attr("class", "ListItem");

                $("#HotItem").html("<div class='MuneFontClick'>热销</div>");
                $("#AllItem").html("<div class='MuneFont'>全部</div>");
                $("#OneItem").html("<div class='MuneFont'>筛选</div>");
                $("#DuihuanItem").html("<div class='MuneFont'>兑换</div>");
                ShopClass.LoadHot(1);
                break;

            case 2:
                $("#HotItem").attr("class", "ListItem");
                $("#AllItem").attr("class", "ListItemClick");
                $("#OneItem").attr("class", "ListItem");
                $("#DuihuanItem").attr("class", "ListItem");
                $("#HotItem").html("<div class='MuneFont'>热销</div>");
                $("#AllItem").html("<div class='MuneFontClick'>全部</div>");
                $("#OneItem").html("<div class='MuneFont'>筛选</div>");
                $("#DuihuanItem").html("<div class='MuneFont'>兑换</div>");
                ShopClass.LoadShop(1);
                break;
            case 3:
                $("#HotItem").attr("class", "ListItem");
                $("#AllItem").attr("class", "ListItem");
                $("#OneItem").attr("class", "ListItemClick");
                $("#DuihuanItem").attr("class", "ListItem");
                $("#HotItem").html("<div class='MuneFont'>热销</div>");
                $("#AllItem").html("<div class='MuneFont'>全部</div>");
                $("#OneItem").html("<div class='MuneFontClick'>筛选</div>");
                $("#DuihuanItem").html("<div class='MuneFont'>兑换</div>");
                ShopClass.LoadOne();
                break;
            case 4:
                $("#HotItem").attr("class", "ListItem");
                $("#AllItem").attr("class", "ListItem");
                $("#OneItem").attr("class", "ListItem");
                $("#DuihuanItem").attr("class", "ListItemClick");
                $("#HotItem").html("<div class='MuneFont'>热销</div>");
                $("#AllItem").html("<div class='MuneFont'>全部</div>");
                $("#OneItem").html("<div class='MuneFont'>筛选</div>");
                $("#DuihuanItem").html("<div class='MuneFontClick'>兑换</div>");
                window.GameMainClass.sendRequestJson(1236, '', "ShopClass.SetGoodcardnum");
                ShopClass.LoadDuihuan(1);
                break;
        }
    },

    //显示物品购买的信息
    ShowShopItem: function (shopitemindex, localindex) {
        $("#ShopBuyDialog").remove();
        $("#mask2").remove();
        var str = new Array();
        str.push("<div id='mask2' class='mask2 opacity2'></div>");
        str.push("<div id='ShopBuyDialog'>");
        str.push("<div class='close' style='left:240px;top:0px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){ $(\"#ShopBuyDialog\").remove();$(\"#mask2\").remove();}'></div>");
        str.push("<div style='background:url(res/dialog/Shop_bgTxt.png) no-repeat;position:absolute;width:91px;height:28px;left:113px;top:5px;'></div>");
        str.push("<div class='Skill' style='top:50px;left:32px;background:url(res/Goods/" + GoodsJson[localindex].ImgId + ".png) no-repeat;'></div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:50px;left:78px;'>" + GoodsJson[localindex].IName + "×" + ShopJson.data[0].list[shopitemindex].Val + "</div>");
        str.push("<div class='DefaultFont_14' style='top:68px;left:78px;color:white;width:175px;height:30px;overflow:hidden;'>" + GoodsJson[localindex].detail + "</div>");
        str.push("<div class='AddButtonLeft' id='MoveBut' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.SetItemCount(1);' style='top:112px;left:114px;'></div><div style='top:112px;left:200px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.SetItemCount(2);'  id='AddBut' class='AddButtonRight AddrightOn'></div>");
        str.push("<div class='PageNumber' id='itemcount' style='top:114px;left:146px;text-align:center;width:50px;height:20px;'>1</div>");
        str.push("<div class='PriceType' style='top:156px;left:65px;'></div><div class='DefaultFont_14 GoldFont'  id='priceOne' style='top:158px;left:82px;width:50px;text-align:center;'>" + parseInt(ShopJson.data[0].list[shopitemindex].Price * (UserJson.vip == 0 ? 1 : (ShopJson.data[0].discount / 100))) + "</div>");
        str.push("<div class='PriceType' style='top:156px;left:179px;'></div><div class='DefaultFont_14 GoldFont' id='priceAll' style='top:158px;left:195px;width:50px;text-align:center;'>" + parseInt(ShopJson.data[0].list[shopitemindex].Price * (UserJson.vip == 0 ? 1 : (ShopJson.data[0].discount / 100))) + "</div>");

        str.push("<div class='ButtonSmall' style='top:190px;left:114px;background:url(res/BattleMap/BntAon4.png) no-repeat;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ShopClass.BuyItem(" + shopitemindex + ");'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    /*更改合成使用物品数量*/
    SetItemCount: function (type) {
        //获得当前使用武魂数量
        var nowcount = Number($("#itemcount").html());
        switch (type) {
            case 1:
                //减少数量
                if (nowcount <= 1)
                    return;

                if (nowcount == 99) {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight AddrightOn");
                }

                if (nowcount <= 2) {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft");
                }
                else {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft AddleftOn");
                }
                nowcount -= 1;
                break;

            case 2:
                //增加数量
                if (nowcount >= 99)
                    return;

                if (nowcount == 1) {
                    $("#MoveBut").removeClass();
                    $("#MoveBut").addClass("AddButtonLeft AddleftOn");
                }

                if (nowcount >= 98) {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight");
                }
                else {
                    $("#AddBut").removeClass();
                    $("#AddBut").addClass("AddButtonRight AddrightOn");
                }

                nowcount += 1;
                break;
        }
        $("#itemcount").html(nowcount);
        $("#priceAll").html(Number($("#priceOne").html()) * nowcount);

    },

    //购买物品
    BuyItem: function (ItemIndex) {
        var nowcount = Number($("#itemcount").html());
        var userse = Number($("#priceAll").html());

        if (ShopJson.data[0].list[ItemIndex].SellType == 1) {
            if (userse > UserJson.Gold) {
                ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }
        if (ShopJson.data[0].list[ItemIndex].SellType > 10 && ShopJson.data[0].list[ItemIndex].SellType < 15) {
            switch (ShopJson.data[0].list[ItemIndex].SellType) {
                case 11:
                    if (userse > PubJsonNew.data[0].GemBlue) {
                        ShowMessage("宝石数量不足");
                        return;
                    }
                    break;
                case 12:
                    if (userse > PubJsonNew.data[0].GemPurple) {
                        ShowMessage("宝石数量不足");
                        return;
                    }
                    break;
                case 13:
                    if (userse > PubJsonNew.data[0].GemRed) {
                        ShowMessage("宝石数量不足");
                        return;
                    }
                    break;
                case 14:
                    if (userse > PubJsonNew.data[0].GemYellow) {
                        ShowMessage("宝石数量不足");
                        return;
                    }
                    break;
            }
        }
        window.GameMainClass.sendRequestJson(1087, '{"pId":' + ShopJson.data[0].list[ItemIndex].pID + ',"Val":' + nowcount + '}', "BuyResert");
    }
}