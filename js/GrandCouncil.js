
//军机处
var GrandCouncilClass =
{
    LoadGrandCouncil: function () {
        $("#GrandCouncilMain").remove();
        $("#SynthesisHeroSelect").remove();
        $("#ZXDataDialog").remove();
        var str = new Array();
        str.push("<div id='GrandCouncilMain'>");

        var left = 5, temp = 0;
        for (var i = 0; i < 4; i++) {
            if (i < GrandCouncilJSon.data[0].list.length) {
                str.push("<div class='GrandCouncilArray' style='left:" + left + "px;'>");
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == GrandCouncilJSon.data[0].list[i].ItemId) {

                        var namecolor = "";
                        switch (GoodsJson[j].NColor) {
                            case 1:
                                namecolor = "#00CCFF"
                                break;
                            case 2:
                                namecolor = "#FF00FF";
                                break;
                            case 3:
                                namecolor = "#FF0000";
                                break;
                        }

                        var job = "";
                        switch (GoodsJson[j].Njob) {
                            case 1:
                                job = '战士';
                                break;
                            case 2:
                                job = '射手';
                                break;
                            case 3:
                                job = '谋士';
                                break;
                        }

                        str.push("<div class='TitleBox' style='color:" + namecolor + ";'>" + GoodsJson[j].IName + "</div>");
                        str.push("<div class='Skill' style='top:30px;left:30px;background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;'></div>");

                        str.push("<div class='TitleBox' style='font-size:12px;color:#5D2F19;top:74px;left:2px;'>" + job + "</div>");

                        str.push("<div class='DetialBox'>" + GoodsJson[j].detail + "</div>");

                        if (GrandCouncilJSon.data[0].list[i].State == 0) {
                            str.push("<div class='NeedGold' style='");
                            switch (GoodsJson[j].NColor) {
                                case 1:
                                    break;
                                case 2:
                                    str.push("background-position:0 -17px;");
                                    break;
                                case 3:
                                    str.push("background-position:0 -34px;");
                                    break;
                            }
                            str.push("'></div>");
                            str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.SubmitBuyBook(" + i + "," + j + ");' style='background:url(res/dialog/ButtonPurchase.png) no-repeat;top:149px;left:22px;'></div>");
                        }
                        else {
                            str.push("<div class='HasBuyed'></div>");

                        }
                        break;

                    }
                }
                str.push("</div>");
            }
            else {
                str.push("<div class='GrandCouncilArrayOff' style='top:" + top + "px;left:" + left + "px;'>");
                str.push("<div class='OpenNewDetail' style='background-position:0 -" + (i - 1) * 35 + "px;'></div>");
                if (temp == 0) {
                    str.push("<div class='ButtonSmall' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.SubmitOpenNew(" + i + ");' style='background:url(res/dialog/ButtonOpen.png) no-repeat;top:128px;left:24px;'></div>");
                    temp = 1;
                }
                else
                    str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonOpens.png) no-repeat;top:128px;left:24px;'></div>");
                str.push("</div>");
            }

            left += 101;
        }

        str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.RefBook();'  style='background:url(res/dialog/ButtonAcademy.png) no-repeat;top:207px;left:6px;'></div>");
        var ss = "";
        switch (GrandCouncilJSon.data[0].cnaResNum) {
            case 1:
                ss = "当日还可免费刷新<font style='color:#F6F204'> 1 </font>次";
                break;
            case 2:
                ss = "当日还可免费刷新<font style='color:#F6F204'> 2 </font>次";
                break;
            case 3:
                ss = "当日还可免费刷新<font style='color:#F6F204'> 3 </font>次";
                break;
            default:
                ss = "刷新书院需花费<font style='color:#F6F204'> 10 </font>萌币";
                break;
        }
        str.push("<div id='CanResDetail' style='left:115px;'>" + ss + "</div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);
    },

    SubmitBuyBook: function (index, goodsindex) {
        var needmoney = 0;
        switch (GoodsJson[goodsindex].NColor) {
            case 1:
                needmoney = 3000;
                break;
            case 2:
                needmoney = 6000;
                break;
            case 3:
                needmoney = 10000;
                break;
        }

        var str = new Array();
        if (UserJson.Silver < needmoney) {
            ShowMessage("银币不足，请先征收银币!");
            return;
        }
        else {
            window.GameMainClass.councilBuyBook(Number(index + 1));
        }
    },

    //开启书院位置
    SubmitOpenNew: function (index) {
        var needmoney = 0;
        switch (index) {
            case 1:
                needmoney = 1000;
                break;
            case 2:
                needmoney = 5000;
                break;
            case 3:
                needmoney = 10000;
                break;
        }

        var str = new Array();
        if (UserJson.Silver < needmoney) {
            showTextMess("银币不足，请先征收银币!", 0);
            return;
        }
        else {
            window.GameMainClass.councilBuyOpenloc();
        }
    },

    //刷新书院
    RefBook: function () {
        if (isSubmit)
            return;
        for (var i = 0; i < GrandCouncilJSon.data[0].list.length; i++) {
            for (var j = 0; j < GoodsJson.length; j++) {
                if (GoodsJson[j].ItemId == GrandCouncilJSon.data[0].list[i].ItemId) {
                    if (GoodsJson[j].NColor > 2 && GrandCouncilJSon.data[0].list[i].State == 0) {
                        ShowMessage("有优质书籍未购买，是否继续刷新？", function () {
                            $("#other").html(""); $("#mask1").remove();
                            if (GrandCouncilJSon.data[0].cnaResNum <= 0) {
                                if (UserJson.Gold < 10) {
                                    ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                                    return;
                                }
                            }
                            isSubmit = true;
                            window.GameMainClass.councilRefresh();
                        }, function () { $("#other").html(""); $("#mask1").remove(); });
                        return;
                    }
                }
            }
        }
        if (GrandCouncilJSon.data[0].cnaResNum <= 0) {
            if (UserJson.Gold < 10) {
                ShowMessage("萌币不足，是否立即充值？", function () { $("#other").html(""); $("#mask1").remove(); Recharge(); }, function () { $("#other").html(""); $("#mask1").remove(); });
                return;
            }
        }
        isSubmit = true;
        window.GameMainClass.councilRefresh();
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        switch (obj) {
            case 1: /********************************************************宝物**************************/
                $("#bowuitem").attr("class", "ListItemClick");
                $("#bowuitem").html("<div class='MuneFontClick'>宝物</div>");
                $("#zhangfa").attr("class", "ListItem");
                $("#zhangfa").html("<div class='MuneFont'>战法</div>");
                $("#zhengxing").attr("class", "ListItem");
                $("#zhengxing").html("<div class='MuneFont'>阵形</div>");
                $("#ZXDataDialog").css("background", "url(res/bowu/TreasureBg.png) no-repeat");
                GrandCouncilClass.LoadBaowu();
                break;
            /******************************************阵形******************************************************************/ 
            case 2:
                $("#zhangfa").attr("class", "ListItem");
                $("#zhangfa").html("<div class='MuneFont'>战法</div>");
                $("#zhengxing").attr("class", "ListItemClick");
                $("#zhengxing").html("<div class='MuneFontClick'>阵形</div>");
                $("#ZXDataDialog").css({ "background": "url(res/dialog/UI_Formation.png) no-repeat" });
                $("#bowuitem").attr("class", "ListItem");
                $("#bowuitem").html("<div class='MuneFont'>宝物</div>");
                $("#ZXDataDialog").css({ "left": "129px", "width": 298 });
                GrandCouncilClass.LoadZX(1);
                break;
            case 3:
                $("#zhangfa").attr("class", "ListItemClick");
                $("#zhangfa").html("<div class='MuneFontClick'>战法</div>");
                $("#zhengxing").attr("class", "ListItem");
                $("#zhengxing").html("<div class='MuneFont'>阵形</div>");
                $("#ZXDataDialog").css({ "background": "url(res/dialog/Tactics_Bg.png) no-repeat" });
                $("#bowuitem").attr("class", "ListItem");
                $("#bowuitem").html("<div class='MuneFont'>宝物</div>");
                $("#ZXDataDialog").css({ "left": "129px", "width": 298 });
                GrandCouncilClass.LoadZF(1);
                break;

        }
    },

    //加载宝物界面
    LoadBaowu: function () {
        $("#SynthesisHeroSelect").remove();
        $("#ZXDataDialog").html("");
        $("#ZXDataDialog").css({ "left": "16px", "width": 412 });
        var str = new Array();
        str.push('<div id="album8" style="width:345px;height:74px;top:11px;left:32px;" class="album"><div class="paging">');
        var left = 0, len = 0;
        var itemindex = -1;
        for (var i = 0; i < BaowuJson.data.blist.length; i++) {
            if (i % 4 == 0)
                str.push("<div class='page pagediv' style='width:345px;height:74px;'>");
            len++;
            for (itemindex = 0; itemindex < GoodsJson.length; itemindex++) {
                if (GoodsJson[itemindex].ItemId == BaowuJson.data.blist[i].id) {
                    break;
                }
            }
            str.push("<div class='VipBox' id='BwBox" + i + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.ShowBowuDetail(" + i + ");' style='background:url(res/bowu/bg/" + GoodsJson[itemindex].NColor + ".png) no-repeat;left:" + left + "px;height:74px;'>");
            str.push("<div class='VipBox' style='height:74px;background:url(res/bowu/icon/" + GoodsJson[itemindex].ImgId + ".png) no-repeat;'></div>");
            if (BaowuJson.data.blist[i].vip > 0) {
                str.push("<div class='VipLv' style='background-position:0 -" + (BaowuJson.data.blist[i].vip * 12) + "px;top:58px;left:16px;'></div>");
            }
            if (i == 0)
                str.push("<div id='BwSelect'></div>");
            str.push("</div>");
            left += 88;
            if (i == BaowuJson.data.blist.length - 1) {
                len = 0;
                str.push("</div>");
            }
            if (len == 4) {
                str.push("</div>");
                left = 0;
                len = 0;
            }
        }
        str.push("</div></div>");
        str.push("<div id='bowudetailbox' style='width:220px;height:90px;left:180px;top:95px;position:absolute;z-index:5;'></div>");
        str.push("<div class='DefaultFont_14 RedFont' style='top:199px;left:170px;' id='bwct'>" + expireTime1(BaowuJson.data.lefttime) + "后结束</div>");
        str.push("<div class='ButtonSmall' id='buyBtn' style='top:195px;left:345px;background:url(res/dialog/ButtonPurchase.png) no-repeat;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.BuySubmit();'></div>");
        str.push("<div id='buyHisbox' style='width:130px;height:130px;left:20px;top:95px;position:absolute;z-index:5;'></div>");
        $("#ZXDataDialog").html(str.join(""));

        $('#album8').iphoneSlide1({
            handler: ".paging",
            pageHandler: ".page",
            bounce: false
        });

        GrandCouncilClass.ShowBowuDetail(0);
        GrandCouncilClass.ShowBuyHis();
        GrandCouncilClass.LoadCooingTime();
    },

    LoadCooingTime: function () {
        if (baowucooling)
            return;
        baowucooling = true;
        $("body").everyTime("1s", "baowucooling", function () {
            if (BaowuJson.data.lefttime > 0) {
                BaowuJson.data.lefttime--;
                $("#bwct").html(expireTime1(BaowuJson.data.lefttime) + "后结束");
            }
            else {
                $("body").stopTime("baowucooling");
                $("#bwct").html("抢购已结束");
                baowucooling = false;
                $("#buyBtn").css("display", "none");
            }
        });
    },

    showBaowuIndex: 0,
    //购买提交
    BuySubmit: function () {
        //判断Vip等级够不够
        if (UserJson.vip < BaowuJson.data.blist[GrandCouncilClass.showBaowuIndex].vip) {
            showTextMess("VIP等级不够", 0);
            return;
        }
        if (UserJson.Gold < BaowuJson.data.blist[GrandCouncilClass.showBaowuIndex].price) {
            showTextMess("萌币不足", 0);
            return;
        }
        window.GameMainClass.sendRequestJson(1222, '{"id":' + BaowuJson.data.blist[GrandCouncilClass.showBaowuIndex].id + '}', 'GrandCouncilClass.BuyResult');
    },

    BuyResult: function (json) {
        var BackJson = JSON.parse(json);
        if (BackJson.resert == 1) {
            //减萌币
            updateGold(2, BackJson.gold);
            //将获得的物品添加到包裹中
            for (var i = 0; i < BaowuJson.data.blist.length; i++) {
                if (BaowuJson.data.blist[i].id == BackJson.Client[0].id) {
                    BaowuJson.data.blist[i].num -= 1;
                    if (GrandCouncilClass.showBaowuIndex == i) {
                        $("#bwnum").html(BaowuJson.data.blist[i].num);
                        if (BaowuJson.data.blist[i].num < 1) {
                            $("#buyBtn").css("display", "none");
                            var divnode = document.createElement("div");
                            divnode.innerHTML = "<div class='ButtonBig' style='width:85px;height:61px;background:url(res/bowu/TreasureBQ.png) no-repeat;top:10px;left:120px;'></div>"
                            document.getElementById("bowudetailbox").appendChild(divnode);
                        }
                    }
                    break;
                }
            }

            if (WarhoushJson.data[0].isResert == 1 && BackJson.GoodsJson != "") {
                AddItemToWarOther(BackJson.GoodsJson);
            }
            //将获得的物品添加临时包裹中去
            if (TemporaryJson.data[0].isResert == 1 && BackJson.tempsJson != "") {
                AddItemToTwarOther(BackJson.tempsJson);
            }
            BaowuJson.data.buyhis.unshift(BackJson.buyhis[0]);
            GrandCouncilClass.ShowBuyHis();
        }
        showTextMess(BackJson.info, BackJson.resert);
    },

    ShowBuyHis: function () {
        var str = new Array();
        var top = 2, itemindex = -1;
        for (var i = 0; i < BaowuJson.data.buyhis.length; i++) {
            str.push("<div class='DefaultFont RedFont' style='top:" + top + "px;font-size:12px;font-weight:300;'>" + BaowuJson.data.buyhis[i].nick + "</div>");
            top += 14;
            for (itemindex = 0; itemindex < GoodsJson.length; itemindex++) {
                if (GoodsJson[itemindex].ItemId == BaowuJson.data.buyhis[i].sid) {
                    break;
                }
            }
            var namecolor = "#00CCFF";
            switch (GoodsJson[itemindex].NColor) {
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
                    namecolor = "yellow";
                    break;
            }
            str.push("<div class='DefaultFont' style='top:" + top + "px;font-size:12px;font-weight:300;'>" + BaowuJson.data.buyhis[i].btime + "买走了<font style='color:" + namecolor + "';>" + GoodsJson[itemindex].IName + "</font></div>");
            top += 17;
            if (i == 3)
                break;
        }

        $("#buyHisbox").html(str.join(""));
    },

    ShowBowuDetail: function (index) {
        var str = new Array();
        var namecolor = "#00CCFF";
        GrandCouncilClass.showBaowuIndex = index;
        $("#buyBtn").css("display", "");
        var itemindex = -1;
        for (itemindex = 0; itemindex < GoodsJson.length; itemindex++) {
            if (GoodsJson[itemindex].ItemId == BaowuJson.data.blist[index].id) {
                break;
            }
        }
        switch (GoodsJson[itemindex].NColor) {
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
        str.push("<table style='position:absolute;font-size:14px;color:#7a3f38;line-height:16px;' width='100%'>");
        str.push("<tr><td colspan='2'><font style='color:" + namecolor + ";'>" + GoodsJson[itemindex].IName + "</font>" + (BaowuJson.data.blist[index].vip > 0 ? ("(V" + BaowuJson.data.blist[index].vip + "可购买)") : "") + "</td></tr>");
        var job = "";
        switch (GoodsJson[itemindex].Njob) {
            case 0:
                job = "全职业";
                break;
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
        str.push("<tr><td><font style='color:#990000;'>职业：</font>" + job + "</td><td><font style='color:#990000;'>数量：</td></td></tr>");
        str.push("<tr><td><font style='color:#990000;'>等级：</font>" + GoodsJson[itemindex].NLv + "</td><td>仅剩 <font style='color:#990000;' id='bwnum'>" + BaowuJson.data.blist[index].num + "</font> 个</td></td></tr>");
        str.push("<tr ><td><font style='color:#990000;'>生命：</font>" + GoodsJson[itemindex].hpBonus + "</td><td><font style='color:#990000;'>售价：<img src='res/dialog/Icon_MB.png' style='position:absolute;' width='16px' /><span style='padding-left:20px;'>" + BaowuJson.data.blist[index].price + "</span></font></td></td></tr>");
        str.push("</table>");

        if (BaowuJson.data.blist[index].num < 1) {
            str.push("<div class='ButtonBig' style='width:85px;height:61px;background:url(res/bowu/TreasureBQ.png) no-repeat;top:10px;left:120px;'></div>");
            $("#buyBtn").css("display", "none");
        }

        $("#bowudetailbox").html(str.join(""));
        $("#BwSelect").remove();
        var divnode = document.createElement("div");
        divnode.id = "BwSelect";
        document.getElementById("BwBox" + index).appendChild(divnode);
    },

    //加载战法列表
    LoadZF: function (pageindex) {
        var str = new Array();
        var len = TacticsJson.data.datalist.length;
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
            str.push("<div id='ZF" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;background:url(res/Array/" + TacticsJson.data.datalist[i].id + ".png) no-repeat;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LadZFData(" + i + ")'>");
            str.push("<div class='DefaultFont' style='top:3px;left:42px;color:#7a3f38;font-size:13px;'>" + TacticsJson.data.datalist[i].name + "</div><div class='DefaultFont RedFont' id='ForLv" + TacticsJson.data.datalist[i].id + "' style='font-size:13px;top:22px;left:42px;'>等级:" + TacticsJson.data.datalist[i].lv + "</div></div>");

            top += 48;
        }
        str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>"); ////使第一个物品被点中

        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LoadZF(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" ></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LoadZF(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");

        if (document.getElementById("SynthesisHeroSelect") == null) {
            var divnode = document.createElement("div");
            divnode.id = 'SynthesisHeroSelect';
            divnode.innerHTML = str.join("");

            document.getElementById("dialogMain").appendChild(divnode);
        }
        else
            $("#SynthesisHeroSelect").html(str.join(""));

        GrandCouncilClass.LadZFData(startindex);
    },

    LadZFData: function (index) {
        var str = new Array();
        str.push("<div id='FormationTitle'  style='background:url(res/dialog/Tactics_Txt.png) no-repeat 0 -" + (index * 23) + "px;width:95px;height:23px;'></div>");
        str.push("<div class='DefaultFont_14' style='top:45px;left:15px;width:270px;color:#7a3f38;'>" + TacticsJson.data.datalist[index].detail + "</div>");
        str.push("<div class='DefaultFont_14' style='top:118px;left:15px;width:270px;color:#7a3f38;'>战法等级不能超过主公等级，军团科技可提升战法等级的最大级别</div>");

        str.push("<div class='DefaultFont_14 RedFont' id='upcoin" + index + "' style='top:185px;left:35px;'>" + (TacticsJson.data.upcoin * (TacticsJson.data.datalist[index].lv + 1)) + "</div>");
        str.push("<div class='DefaultFont_14 RedFont' id='upjungong" + index + "' style='top:208px;left:35px;'>" + (TacticsJson.data.upjungong * (TacticsJson.data.datalist[index].lv + 1)) + "</div>");

        str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonLVUP1.png) no-repeat;top:199px;left:231px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.UpZF(" + index + ");'></div>");
        if (document.getElementById("ZXDataDialog") == null) {
            var divnode = document.createElement("div");
            divnode.id = 'ZXDataDialog';
            divnode.innerHTML = str.join("");
            document.getElementById("dialogMain").appendChild(divnode);
        }
        else
            $("#ZXDataDialog").html(str.join(""));

        var left = $("#ZF" + String(index)).position().left;
        var top = $("#ZF" + String(index)).position().top;
        $("#GoodsClick").css({ "top": top - 1, "left": left - 1 });
    },

    UpZF: function (index) {
        if (isSubmit)
            return;
        //判断银币是否足够
        if (UserJson.Silver < TacticsJson.data.upcoin * (TacticsJson.data.datalist[index].lv + 1)) {
            showTextMess("银币不足", 0);
            return;
        }
        //判断军功是否足够
        if (UserJson.MilitaryMerit < TacticsJson.data.upjungong * (TacticsJson.data.datalist[index].lv + 1)) {
            showTextMess("军功不足", 0);
            return;
        }
        isSubmit = true;
        window.GameMainClass.sendRequestJson(1162, '{"id":' + TacticsJson.data.datalist[index].id + '}', "UpZFResert");
    },

    //加载阵型
    LoadZX: function (pageindex) {
        var str = new Array();

        var len = FormationJson.data[0].list.length;
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
                if (FormationDicJson[localindex].FID == FormationJson.data[0].list[i].FId) {
                    break;
                }
            }

            if (temp == -1) {
                temp = localindex;
            }

            str.push("<div id='wuhun" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;background:url(res/Array/" + FormationDicJson[localindex].IconId + ".png) no-repeat;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LoadZXData(" + i + "," + localindex + ")'");

            str.push("><font>" + FormationDicJson[localindex].FName + "</font><br /><font id='ForState" + FormationJson.data[0].list[i].FId + "'>" + (FormationJson.data[0].list[i].FLv == 0 ? "未研发" : "已研发") + "</font>");
            str.push("</div>");

            top += 48;
        }

        str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>"); ////使第一个物品被点中

        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LoadZX(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push(" ></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) GrandCouncilClass.LoadZX(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");

        //str.push("</div>");

        if (document.getElementById("SynthesisHeroSelect") == null) {
            var divnode = document.createElement("div");
            divnode.id = 'SynthesisHeroSelect';
            divnode.innerHTML = str.join("");

            document.getElementById("dialogMain").appendChild(divnode);
        }
        else
            $("#SynthesisHeroSelect").html(str.join(""));

        GrandCouncilClass.LoadZXData(startindex, temp);
    },

    //阵型
    LoadZXData: function (index, localindex) {
        var str = new Array();
        //$("#ZXDataDialog").remove();

        var str = new Array();
        //str.push("<div id='ZXDataDialog'>");
        str.push("<div id='FormationTitle'  style='background-position:0 -" + (index * 25) + "px;'></div>");
        if (FormationJson.data[0].list[index].FLv != 0) {
            str.push("<img src='res/dialog/Lv_Txt.png' style='top:15px;left:100px;position:absolute;' /><div id='HeroLV' style='top:16px;left:105px;'>" + getLvNum(FormationJson.data[0].list[index].FLv, 0) + "</div>"); //等级
        }
        str.push("<div id='FormationDetialBox'>" + FormationDicJson[localindex].FDetial + "</div>");
        str.push("<div id='FormationImageSmall' style='background:url(res/Formation/" + FormationDicJson[localindex].ImageSmall + ".png) no-repeat;'></div>");
        str.push("<div id='ConditionImage' style='background-position:0 -" + (FormationJson.data[0].list[index].FLv == 0 ? 0 : 35) + "px;'></div>");


        if (FormationJson.data[0].list[index].FLv == 0) {
            str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonResearch.png) no-repeat;top:199px;left:231px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.formationDev(" + Number(FormationJson.data[0].list[index].FId) + ");'></div>"); //OpenFormationResert(1,\"研发成功！银币-2000\",2000,1001,2,1050,120,10);
            str.push("<div id='ConditionDataImage'>");
            str.push("<div class='ConditionDataFont' style='color:#FFFF00;'>LV " + FormationDicJson[localindex].NeedLv + "</div>");
            str.push("<div class='ConditionDataFont' style='color:#FFFF00;left:53px;width:58px;'>" + FormationDicJson[localindex].NeedSliver + "</div>");
            str.push("<div class='ConditionDataFont' style='color:#FFFF00;left:116px;width:54px;'>" + FormationDicJson[localindex].Achievement + "</div>");
            str.push("</div>");
        }
        else {
            if (FormationJson.data[0].list[index].FLv < FormationJson.data[0].list[index].maxLv) {
                str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonLVUP1.png) no-repeat;top:199px;left:231px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.formationUpgrade(" + Number(FormationJson.data[0].list[index].FId) + ");'></div>");
                str.push("<div id='ConditionDataImage'>");
                str.push("<div class='ConditionDataFont' style='color:#FFFF00;'>LV " + Number(FormationJson.data[0].list[index].FLv + 1) + "</div>");
                str.push("<div class='ConditionDataFont' style='color:#FFFF00;left:53px;width:58px;'>" + FormationJson.data[0].list[index].UpSliver + "</div>");
                str.push("<div class='ConditionDataFont' style='color:#FFFF00;left:116px;width:54px;'>" + FormationJson.data[0].list[index].UpAchievement + "</div>");
                str.push("</div>");
            }
            else {
                str.push("<div class='ButtonSmall' style='background:url(res/dialog/ButtonLVUP2.png) no-repeat;top:199px;left:231px;'></div>");
                str.push("<div id='ConditionDataImage'>");
                str.push("<div class='ConditionDataFont' >MAX</div>");
                str.push("<div class='ConditionDataFont' style='left:53px;width:58px;'>MAX</div>");
                str.push("<div class='ConditionDataFont' style='left:116px;width:54px;'>MAX</div>");
                str.push("</div>");
                str.push("<div id='MaxImage'></div>");
            }
        }

        var top = 90, left = 70;

        var templist = FormationDicJson[localindex].FLocation.split("|");
        for (var i = 0; i < 5; i++) {
            str.push("<div class='FormationRemarkBox' style='top:" + top + "px;left:" + left + "px;'>");
            var templist2 = templist[i].split(",");
            var ss = "";
            for (var j = 0; j < templist2.length; j++) {
                if (templist2[j] != "0") {
                    switch (j) {
                        case 0:
                            ss += "血量+" + Number(Number(templist2[j]) + (FormationJson.data[0].list[index].FLv > 0 ? (FormationJson.data[0].list[index].FLv - 1) : 0)) + "%,";
                            break;
                        case 1:
                            ss += "攻击+" + Number(Number(templist2[j]) + (FormationJson.data[0].list[index].FLv > 0 ? (FormationJson.data[0].list[index].FLv - 1) : 0)) + "%,";
                            break;
                        case 2:
                            ss += "防御+" + Number(Number(templist2[j]) + (FormationJson.data[0].list[index].FLv > 0 ? (FormationJson.data[0].list[index].FLv - 1) : 0)) + "%,";
                            break;
                        case 3:
                            ss += "相克+" + Number(Number(templist2[j]) + (FormationJson.data[0].list[index].FLv > 0 ? (FormationJson.data[0].list[index].FLv - 1) : 0)) / 10 + "%,";
                            break;
                        case 4:
                            ss += "暴击+" + Number(Number(templist2[j]) + (FormationJson.data[0].list[index].FLv > 0 ? (FormationJson.data[0].list[index].FLv - 1) : 0)) / 10 + "%,";
                            break;
                    }
                }
            }
            str.push(ss.substring(0, ss.length - 1));
            str.push("</div>");
            top += 20;
        }
        //str.push("</div>");
        if (document.getElementById("ZXDataDialog") == null) {
            var divnode = document.createElement("div");
            divnode.id = 'ZXDataDialog';
            divnode.innerHTML = str.join("");

            document.getElementById("dialogMain").appendChild(divnode);
        }
        else
            $("#ZXDataDialog").html(str.join(""));

        left = $("#wuhun" + String(index)).position().left;
        top = $("#wuhun" + String(index)).position().top;

        $("#GoodsClick").css({ "top": top - 1, "left": left - 1 });

    }
}


var BaowuJson = { "data": { "blist": [
        { "id": 2100, "vip": 0, "num": 10, "price": 9999 },
        { "id": 2101, "vip": 1, "num": 10, "price": 9999 },
        { "id": 2102, "vip": 1, "num": 0, "price": 9999 },
        { "id": 2103, "vip": 2, "num": 10, "price": 9999 },
        { "id": 2104, "vip": 2, "num": 10, "price": 9999 },
        { "id": 2105, "vip": 3, "num": 10, "price": 9999 },
        { "id": 2106, "vip": 3, "num": 10, "price": 9999 },
        { "id": 2107, "vip": 3, "num": 10, "price": 9999 },
        { "id": 2108, "vip": 4, "num": 10, "price": 9999 },
        { "id": 2109, "vip": 4, "num": 10, "price": 9999 },
        { "id": 2110, "vip": 5, "num": 10, "price": 9999 },
        { "id": 2111, "vip": 5, "num": 10, "price": 9999 }
    ], "lefttime": "10",
    "buyhis": [
        { "nick": "大咪咪", "btime": "3-1", "sid": 2100 },
        { "nick": "二咪咪", "btime": "3-1", "sid": 2106 },
        { "nick": "三咪咪", "btime": "3-1", "sid": 2104 },
        { "nick": "四咪咪", "btime": "3-1", "sid": 2111 }
    ], "isResert": 0
}
};