
//铁匠铺
var SmithyClass =
{
    tempid: -1,
    //加载铁匠铺资源
    LoadSmithy: function () {
        $("#SynthesisDataDialog").remove();
        $("#SynthesisHeroSelect").remove();
        $("#SmithyDialog").remove();
        var str = new Array();
        str.push("<div id='SmithyDialog'>");
        str.push("<div id='SmithyDialogLeft'>");
        str.push("</div>");

        str.push("<div id='SmithyDialogRightE' class='SmithyDialogRight'></div>");
        str.push("<div id='SmithyDialogRightW' class='SmithyDialogRight' style='display:none'></div>");
        str.push("<div class='ButtonBig' id='btnSmithy' style='background:url(res/dialog/ButtonStrengthen2.png) no-repeat;top:255px;left:65px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.BeginSmithy();'></div>") //精炼按钮

        str.push("<div id='PageDivE' style='position:absolute;z-index:16;top:257px;left:247px;width:150px;'>");
        str.push("</div>");

        str.push("<div id='PageDivW' style='position:absolute;z-index:16;top:257px;left:247px;display:none;width:150px;'>");
        str.push("</div>");

        str.push("<div id='ItemE' class='ListItemRightClick'  style='top:64px;left:399px' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.CheckRightItem(1);'><div class='MuneFontRight'></div></div>"); //已装备选项卡
        str.push("<div id='ItemW' class='ListItemRight' style='top:120px;left:399px' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.CheckRightItem(2);'><div class='MuneFontRight' style='background-position:-14px 0;'></div></div>"); //包裹选项卡
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

        SmithyClass.LoadByHero(1);
        SmithyClass.LoadByWarHouse(1, 0);
    },

    BeginSmithy: function () {
        if (isSubmit)
            return;

        if (SmithyClass.tempid != -1) {
            isSubmit = true;
            window.GameMainClass.refineEquipment(Number(SmithyClass.tempid));
            //SmithyResert(1, '精炼成功，竹片甲 星级3,-129银币', SmithyClass.tempid, 3, 0, 21, 0);
        }
    },

    //切换选项卡
    CheckRightItem: function (index) {
        SmithyClass.tempid = -1;
        $("#ShowEDataBox").html("");
        $('#btnSmithy').css({ 'background': 'url(res/dialog/ButtonStrengthen2.png) no-repeat' });
        $('#btnSmithy').attr("ontouchend", "");
        $("#SkillSelectW").css("display", "none");
        $("#SkillSelectE").css("display", "none");
        switch (index) {
            case 1: //已装备
                $("#ItemE").attr("class", "ListItemRightClick");
                $("#ItemW").attr("class", "ListItemRight");
                $("#PageDivE").css("display", "");
                $("#PageDivW").css("display", "none");
                $("#SmithyDialogRightE").css("display", "");
                $("#SmithyDialogRightW").css("display", "none");
                break;
            case 2: //包裹                
                $("#ItemW").attr("class", "ListItemRightClick");
                $("#ItemE").attr("class", "ListItemRight");
                $("#PageDivE").css("display", "none");
                $("#PageDivW").css("display", "");
                $("#SmithyDialogRightE").css("display", "none");
                $("#SmithyDialogRightW").css("display", "");
                break;
        }
    },

    tempHeroData: { "List": [] },

    LoadByHero: function (pageindex) {
        if (SmithyClass.tempHeroData.List.length == 0) {
            for (var i = 0; i < HeroJson.data[0].HeroList.length; i++) {
                var nowEquipmentList = HeroJson.data[0].HeroList[i].Equipment.split(",");
                for (var j = 0; j < nowEquipmentList.length; j++) {
                    if (nowEquipmentList[j] != '0') {
                        SmithyClass.tempHeroData.List.push(HeroJson.data[0].HeroList[i]);
                        break;
                    }
                }
            }
        }

        var len = SmithyClass.tempHeroData.List.length;
        var startindex = (pageindex - 1) * 3;
        var endindex = 3;
        var maxpage = 1;
        if (len > 3) {
            maxpage = parseInt(len / 3) + (len % 3 == 0 ? 0 : 1);
        }

        if (len <= 3)
            endindex = len;
        else if (pageindex <= len / 3) {
            endindex = startindex + 3;
        }
        else {
            endindex = startindex + len % 3;
        }

        var str = new Array();
        var top = 20, left = 8; //tempindex = -1, tempid = -1;
        for (var i = startindex; i < endindex; i++) {
            for (var j = 0; j < GeneralsJson.length; j++) {
                if (SmithyClass.tempHeroData.List[i].HeroId == GeneralsJson[j].HeroId) {
                    var namecolor = '#00CCFF';
                    switch (GeneralsJson[j].Qualification) {
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
                    str.push("<div class='HeroNameSmallNobg' style='color:" + namecolor + ";top:" + (top - 12) + "px;left:" + left + "px;'>" + GeneralsJson[j].Name + "</div>");
                    str.push("<div id='SkillSelectE' class='SkillSelect' style='display:none'></div>");

                    /*当前装备*/
                    var nowEquipmentList = SmithyClass.tempHeroData.List[i].Equipment.split(",");
                    var y = 0;
                    for (var k = 0; k < nowEquipmentList.length; k++) {
                        for (var y = 0; y < WarhoushJson.data[0].GoodsList.length; y++) {
                            if (WarhoushJson.data[0].GoodsList[y].ItId == nowEquipmentList[k]) {
                                for (var m = 0; m < GoodsJson.length; m++) {
                                    if (WarhoushJson.data[0].GoodsList[y].ItemId == GoodsJson[m].ItemId) {
                                        //                                        if (tempid == -1) {
                                        //                                            tempindex = y;
                                        //                                            tempid = WarhoushJson.data[0].GoodsList[y].ItId
                                        //                                        }
                                        str.push("<div class='Skill' id='Goods" + WarhoushJson.data[0].GoodsList[y].ItId + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.ClickE(" + y + ",1," + WarhoushJson.data[0].GoodsList[y].ItId + ");' style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                                        if (WarhoushJson.data[0].GoodsList[y].RefineLv != 0)
                                            str.push("<div class='Stars'></div>" + getNumSmall(WarhoushJson.data[0].GoodsList[y].RefineLv, 0, 15));

                                        str.push("</div>");
                                        break;
                                    }
                                }

                                break;
                            }
                        }
                        left += 45;
                    }

                    break;
                }
            }

            top += 67;
            left = 8;
        }
        $("#SmithyDialogRightE").html(str.join(""));


        str = new Array();
        str.push("<div");
        if (pageindex > 1)
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadByHero(" + (pageindex - 1) + ");'");
        else
            str.push(" class='ButtonLeft'");

        str.push(" style='top:0px;left:0px;'></div><div style='left:90px;top:0px;'");
        if (pageindex < maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadByHero(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:2px;left:32px;width:52px;text-align:center;'>" + pageindex + "/" + maxpage + "</div>");

        $("#PageDivE").html(str.join(""));

        //SmithyClass.ClickE(tempindex, 1, tempid);
    },

    templist: Array(),

    LoadByWarHouse: function (pageindex, goodsindex) {
        goodsindex = goodsindex == null ? 0 : goodsindex;
        var len = 0;
        if (goodsindex == 0) {
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].gid == 0) {
                    goodsindex = i;
                    break;
                }
            }
        }

        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].gid == 0 && WarhoushJson.data[0].GoodsList[i].Type < 5) {
                len++;
            }
        }

        var maxpage = 1;
        if (len > 16) {
            maxpage = parseInt(len / 16) + (len % 16 == 0 ? 0 : 1);
        }

        var str = new Array();
        if (SmithyClass.templist[pageindex - 1] == null) {
            SmithyClass.templist.push(goodsindex);
        }

        var i = SmithyClass.templist[pageindex - 1];
        var top = 13, left = 8;
        var len = 0; //, tempindex = -1, tempid = -1;
        for (; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].gid == 0 && WarhoushJson.data[0].GoodsList[i].Type < 5) {
                for (var m = 0; m < GoodsJson.length; m++) {
                    if (GoodsJson[m].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                        str.push("<div class='Skill' id='Goods" + WarhoushJson.data[0].GoodsList[i].ItId + "' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.ClickE(" + i + ",2," + WarhoushJson.data[0].GoodsList[i].ItId + ");'  style='top:" + top + "px;left:" + left + "px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                        //                        if (tempid == -1) {
                        //                            tempid = WarhoushJson.data[0].GoodsList[i].ItId;
                        //                            tempindex = i;
                        //                        }
                        if (WarhoushJson.data[0].GoodsList[i].RefineLv != 0)
                            str.push("<div class='Stars'></div>" + getNumSmall(WarhoushJson.data[0].GoodsList[i].RefineLv, 0, 15));

                        str.push("</div>");
                        break;
                    }
                }

                if ((len + 1) % 4 == 0) {
                    top += 46;
                    left = 8;
                }
                else
                    left += 45;

                len++;
                if (len == 16) {
                    i += 1;
                    break;
                }
            }
        }
        str.push("<div id='SkillSelectW' class='SkillSelect' style='display:none'></div>");
        $("#SmithyDialogRightW").html(str.join(""));

        str = new Array();
        str.push("<div style='top:0;left:0px;'");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadByWarHouse(" + (pageindex - 1) + "," + i + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div>");
        str.push("<div style='top:0;left:90px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadByWarHouse(" + (pageindex + 1) + "," + i + ");'");
        }
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:2px;left:32px;width:52px;text-align:center;'>" + pageindex + "/" + maxpage + "</div>");
        $("#PageDivW").html(str.join(""));

        //SmithyClass.ClickE(tempindex, 2, tempid);
    },

    ///切换了不同的mnue
    CheckItem: function (obj) {
        /********************************************************精炼**************************/
        switch (obj) {
            case 1:
                $("#RListItem").attr("class", "ListItemClick");
                $("#RListItem").html("<div class='MuneFontClick'>强化</div>");

                $("#SListItem").attr("class", "ListItem");
                $("#SListItem").html("<div class='MuneFont'>合成</div>");

                SmithyClass.LoadSmithy();
                break;
            /*******************************************合成******************************************************************/ 
            case 2:
                $("#RListItem").attr("class", "ListItem");
                $("#RListItem").html("<div class='MuneFont'>强化</div>");

                $("#SListItem").attr("class", "ListItemClick");
                $("#SListItem").html("<div class='MuneFontClick'>合成</div>");
                SmithyClass.LoadSynthesisGoods();
                for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                    if (WarhoushJson.data[0].GoodsList[i].Type == 9) {
                        SmithyClass.LoadSynthesis(i);
                        break;
                    }

                    if (i == WarhoushJson.data[0].GoodsList.length - 1)
                        SmithyClass.LoadSynthesis(0);
                }
                break;
        }
    },

    //点击了某个装备后
    ClickE: function (goodsindex, type, id) {
        if (goodsindex == -1) {
            $('#btnSmithy').css({ 'background': 'url(res/dialog/ButtonStrengthen2.png) no-repeat' });
            $('#btnSmithy').attr("ontouchend", "");
            return;
        }
        //获取被点击物品的座标
        var left = $("#Goods" + id).position().left;
        var top = $("#Goods" + id).position().top;
        switch (type) {
            case 1:
                $("#SkillSelectW").css("display", "none");
                $("#SkillSelectE").css({ "top": top - 1, "left": left - 2, "display": "" });
                break;
            default:
                $("#SkillSelectE").css("display", "none");
                $("#SkillSelectW").css({ "top": top - 1, "left": left - 2, "display": "" });
                break;
        }

        SmithyClass.tempid = WarhoushJson.data[0].GoodsList[goodsindex].ItId;
        var str = new Array();
        var m = 0;
        var type2 = "";
        var jiacheng = 0;
        str.push("<div id='ShowEDataBox'>");
        for (; m < GoodsJson.length; m++) {
            if (GoodsJson[m].ItemId == WarhoushJson.data[0].GoodsList[goodsindex].ItemId) {
                str.push("<div class='Skill' style='top:43px;left:75px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'>");
                if (WarhoushJson.data[0].GoodsList[goodsindex].RefineLv > 0)
                    str.push("<div class='Stars'></div>" + (getNumSmall(WarhoushJson.data[0].GoodsList[goodsindex].RefineLv, 0, 15)));

                str.push("</div>");
                break;
            }
        }

        var xiabiao = 0;
        for (var i = 0; i < RefiningData.length; i++) {
            if (RefiningData[i].Qid == WarhoushJson.data[0].GoodsList[goodsindex].quality) {
                xiabiao = WarhoushJson.data[0].GoodsList[goodsindex].RefineLv; //parseInt(WarhoushJson.data[0].GoodsList[goodsindex].RefineLv / RefiningData[i].Qid) + (WarhoushJson.data[0].GoodsList[goodsindex].RefineLv % RefiningData[i].Qid == 0 ? 0 : 1) - 1;
                //var totalunm = 10 * WarhoushJson.data[0].GoodsList[goodsindex].quality;
                if (xiabiao < 0)
                    xiabiao = 0;
                switch (WarhoushJson.data[0].GoodsList[goodsindex].Type) {
                    case 2:
                        type2 = "生命";
                        jiacheng = Math.round(Number(RefiningData[i].Refine.split(',')[3]) + WarhoushJson.data[0].GoodsList[goodsindex].hpBonus / 2);
                        break;
                    case 3:
                        type2 = "防御";
                        jiacheng = Math.round(Number(RefiningData[i].Refine.split(',')[4]) + WarhoushJson.data[0].GoodsList[goodsindex].defBonus / 2);
                        break;
                    case 1:
                        type2 = "攻击";
                        jiacheng = Math.round(Number(RefiningData[i].Refine.split(',')[WarhoushJson.data[0].GoodsList[goodsindex].Job - 1]) + WarhoushJson.data[0].GoodsList[goodsindex].atkBonus / 2);
                        break;
                    case 4:
                        type2 = "生命";
                        jiacheng = Math.round(Number(RefiningData[i].Refine.split(',')[5]) + WarhoushJson.data[0].GoodsList[goodsindex].hpBonus / 2);
                        break;
                }
                for (var j = 0; j < GoodsJson.length; j++) {
                    if (GoodsJson[j].ItemId == WarhoushJson.data[0].GoodsList[goodsindex].ItemId) {
                        var namecolor = "";
                        switch (GoodsJson[j].NColor) {
                            case 1:
                                namecolor = "#00CCFF";
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
                            default:
                                namecolor = "white";
                                break;
                        }
                        str.push("<div class='GoodsTitle DefaultFont_14' style='color:" + namecolor + ";'>" + GoodsJson[j].IName + " LV" + WarhoushJson.data[0].GoodsList[goodsindex].RefineLv + "</div>");
                        break;
                    }
                }
                if (WarhoushJson.data[0].GoodsList[goodsindex].RefineLv < 10) {
                    str.push("<div class='DefaultFont_14' style='top:91px;left:75px;font-size:13px;color:white;'>" + RefiningData[i].Odds.split(',')[xiabiao] + "%</div>");
                    str.push("<div class='DefaultFont_14' style='top:111px;left:75px;font-size:13px;color:white;'>" + type2 + String(WarhoushJson.data[0].GoodsList[goodsindex].hpBonus + WarhoushJson.data[0].GoodsList[goodsindex].atkBonus + WarhoushJson.data[0].GoodsList[goodsindex].defBonus) + ((WarhoushJson.data[0].GoodsList[goodsindex].refAtk + WarhoushJson.data[0].GoodsList[goodsindex].refDef + WarhoushJson.data[0].GoodsList[goodsindex].refHP) == 0 ? "" : "+" + (WarhoushJson.data[0].GoodsList[goodsindex].refAtk + WarhoushJson.data[0].GoodsList[goodsindex].refDef + WarhoushJson.data[0].GoodsList[goodsindex].refHP)) + "</div>");
                    str.push("<div class='DefaultFont_14' style='top:131px;left:75px;font-size:13px;color:white;'>" + type2 + (WarhoushJson.data[0].GoodsList[goodsindex].hpBonus + WarhoushJson.data[0].GoodsList[goodsindex].atkBonus + WarhoushJson.data[0].GoodsList[goodsindex].defBonus) + "+" + jiacheng * (WarhoushJson.data[0].GoodsList[goodsindex].RefineLv + 1) + "</div>");
                    str.push("<div class='DefaultFont_14' style='top:151px;left:75px;font-size:13px;color:white;'>星级不变</div>");
                    str.push("<div class='DefaultFont_14' style='top:171px;left:75px;font-size:13px;color:white;'>" + (RefiningData[i].Coin * (WarhoushJson.data[0].GoodsList[goodsindex].RefineLv + 1)) + "</div>");
                    $('#btnSmithy').css({ 'background': 'url(res/dialog/ButtonStrengthen1.png) no-repeat' });
                    document.getElementById('btnSmithy').ontouchend = function () { javascript: SmithyClass.BeginSmithy(); }
                }
                else {
                    str.push("<div class='DefaultFont_14' style='top:91px;left:75px;font-size:13px;color:white;'>MAX</div>");
                    str.push("<div class='DefaultFont_14' style='top:111px;left:75px;font-size:13px;color:white;'>" + type2 + String(WarhoushJson.data[0].GoodsList[goodsindex].hpBonus + WarhoushJson.data[0].GoodsList[goodsindex].atkBonus + WarhoushJson.data[0].GoodsList[goodsindex].defBonus) + ((WarhoushJson.data[0].GoodsList[goodsindex].refAtk + WarhoushJson.data[0].GoodsList[goodsindex].refDef + WarhoushJson.data[0].GoodsList[goodsindex].refHP) == 0 ? "" : "+" + (WarhoushJson.data[0].GoodsList[goodsindex].refAtk + WarhoushJson.data[0].GoodsList[goodsindex].refDef + WarhoushJson.data[0].GoodsList[goodsindex].refHP)) + "</div>");
                    str.push("<div class='DefaultFont_14' style='top:131px;left:75px;font-size:13px;color:white;'>MAX</div>");
                    str.push("<div class='DefaultFont_14' style='top:151px;left:75px;font-size:13px;color:white;'>星级不变</div>");
                    str.push("<div class='DefaultFont_14' style='top:171px;left:75px;font-size:13px;color:white;'>MAX</div>");
                    $('#btnSmithy').css({ 'background': 'url(res/dialog/ButtonStrengthen2.png) no-repeat' });
                    $('#btnSmithy').attr("ontouchend", "");
                }
                break;
            }
        }
        str.push("</div>");
        $("#SmithyDialogLeft").html(str.join(""));
    },


    //合成
    LoadSynthesis: function (GoodsIndex) {
        //alert(GoodsIndex);
        var str = new Array();
        $("#SmithyDialog").remove();
        $("#SynthesisDataDialog").remove();

        var str = new Array();
        str.push("<div id='SynthesisDataDialog'>");

        var len = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 9)
                len++;
        }

        //获取被点击物品的座标
        if (len > 0) {
            var left = $("#wuhun" + String(GoodsIndex)).position().left;
            var top = $("#wuhun" + String(GoodsIndex)).position().top;

            $("#GoodsClick").css({ "top": top - 1, "left": left - 2 });

            var j = 0;
            for (; j < GoodsJson.length; j++) {
                if (GoodsJson[j].ItemId == WarhoushJson.data[0].GoodsList[GoodsIndex].ItemId)
                    break;
            }

            str.push("<div id='discount'>合成成功率<font style='color:#F6F204' id='discountVal'> 5%</font></div>");
            str.push("<div class='Skill' style='background:url(res/Goods/" + GoodsJson[j].ImgId + ".png) no-repeat;top:81px;left:58px;'></div>");

            var x = 0;
            for (; x < GoodsJson.length; x++) {
                if (GoodsJson[x].ItemId == WarhoushJson.data[0].GoodsList[GoodsIndex].correId)
                    break;
            }

            var job = "全职业";
            switch (GoodsJson[x].Njob) {
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

            var namecolor = "#00CCFF";

            switch (GoodsJson[x].NColor) {
                case 1:
                    namecolor = "#00CCFF";
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

            str.push("<div id='HeroName' style='color:" + namecolor + ";left:200px;top:12px;font-size:13px;'>" + GoodsJson[x].IName + "</div>"); //装备名称   
            str.push("<div class='DefaultFont' style='left:200px;top:37px;font-size:13px;'>" + job + "</div>"); //品质 
            str.push("<div class='DefaultFont' style='left:200px;top:62px;font-size:13px;'>武将" + GoodsJson[x].NLv + "级</div>"); //等级
            str.push("<div class='DefaultFont' style='left:200px;top:88px;font-size:13px;'>" + GoodsJson[x].hpBonus + "</div>"); //等级
            str.push("<div class='DefaultFont' style='left:200px;top:114px;font-size:13px;'>" + GoodsJson[x].atkBonus + "</div>"); //进攻
            str.push("<div class='DefaultFont' style='left:200px;top:140px;font-size:13px;'>" + GoodsJson[x].defBonus + "</div>"); //防守
            str.push("<div class='DefaultFont' style='top:185px;left:160px;font-size:12px;line-height:14px;'>" + GoodsJson[x].detail + "</div>"); //技能介绍、
            str.push("<div class='AddButtonLeft' id='MoveBut' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.SetWuHunCount(1," + GoodsIndex + ");' style='top:151px;left:16px;'></div>");
            if (WarhoushJson.data[0].GoodsList[GoodsIndex].iVal > 1)
                str.push("<div style='top:151px;left:109px;'  ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.SetWuHunCount(2," + GoodsIndex + ");'  id='AddBut' class='AddButtonRight AddrightOn'></div>");
            else
                str.push("<div style='top:151px;left:109px;' class='AddButtonRight'></div>");

            str.push("<div class='PageNumber' id='whcount' style='top:153px;left:72px;'>1</div>");

            str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonEquip1.png) no-repeat;top:207px;left:30px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.SynthesisSubmit(" + GoodsIndex + ");'></div>"); //合成武将令按钮

        }
        else
            str.push("<div class='ButtonBig' style='background:url(res/dialog/ButtonEquip2.png) no-repeat;top:207px;left:30px;'></div>");

        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);

    },


    /*加载合成页物品信息*/
    LoadSynthesisGoods: function () {
        $("#SynthesisHeroSelect").remove();
        var str = new Array();
        str.push("<div id='SynthesisHeroSelect'>");
        var len = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 9)
                len++;
        }
        if (len > 0) {
            var maxpage = 1;
            str.push("<div class='ButtonLeft'></div><div style='left:82px;'");
            if (len > 4) {
                str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.GoodsChangePage(" + String(2) + ");'");
                maxpage = parseInt(len / 4) + (len % 4 == 0 ? 0 : 1);
                len = 4;
            }
            else
                str.push(" class='ButtonRight'");
            str.push("></div>");
            str.push("<div class='PageNumber' style='top:210px;left:42px;'>1/" + maxpage + "</div>");
            var top = 11, left = 6, temp = 0;
            for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
                if (WarhoushJson.data[0].GoodsList[i].Type == 9) {
                    if (temp != 0) {
                        top += 48;
                    }

                    //获取该物品对应的本地数据
                    var localindex = 0;
                    for (; localindex < GoodsJson.length; localindex++) {
                        if (GoodsJson[localindex].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                            break;
                        }
                    }
                    var namecolor = "#00CCFF";
                    switch (GoodsJson[localindex].NColor) {
                        case 1:
                            namecolor = "#00CCFF";
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

                    str.push("<div class='WuhunItem' id='wuhun" + i + "' style='top:" + top + "px;left:" + left + "px;padding-left:5px;text-align:left;'");
                    str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadSynthesis(" + i + ");'");

                    str.push("><font style='color:" + namecolor + "'>" + GoodsJson[localindex].IName + "</font><br />数量：<font id='wuhunNum" + i + "'>" + WarhoushJson.data[0].GoodsList[i].iVal + "</font>");
                    str.push("</div>");

                    temp++;
                    if (temp == len)
                        break;

                }
            }

            //使第一个物品被点中
            str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>"); //
        }
        else {
            str.push("<div class='PageNumber' style='top:210px;left:45px;'>1/1</div>");
            str.push("<div class='ButtonLeft'></div><div style='left:82px;' class='ButtonRight'></div>");
        }

        str.push("</div>");


        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },




    /*物品翻页*/
    GoodsChangePage: function (pageindex) {
        var len = 0;
        var bool = false;
        var tempindex = 0;
        for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 9)
                len++;
            if (pageindex > 1) {
                if ((len == (pageindex - 1) * 4) && bool == false) {
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


        var top = 12, left = 6;
        var str = new Array();
        var temp = 0;
        for (var i = startindex; i < WarhoushJson.data[0].GoodsList.length; i++) {
            if (WarhoushJson.data[0].GoodsList[i].Type == 9) {
                if (temp != 0) {
                    top += 48;
                }
                else
                    tempindex = i;

                //获取该物品对应的本地数据
                var localindex = 0;
                for (; localindex < GoodsJson.length; localindex++) {
                    if (GoodsJson[localindex].ItemId == WarhoushJson.data[0].GoodsList[i].ItemId) {
                        break;
                    }

                }

                var namecolor = "#00CCFF";
                switch (GoodsJson[localindex].NColor) {
                    case 1:
                        namecolor = "#00CCFF";
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

                str.push("<div id='wuhun" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;padding-left:5px;text-align:left;'");
                str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.LoadSynthesis(" + i + ");'");

                str.push("><font style='color:" + namecolor + "'>" + GoodsJson[localindex].IName + "</font><br />数量：<font id='wuhunNum" + i + "'>" + WarhoushJson.data[0].GoodsList[i].iVal + "</font>");
                str.push("</div>");

                temp++;

                if (temp == 4)
                    break;

            }
        }

        //使第一个物品被点中
        str.push("<div id='GoodsClick' style='top:9px;left:4px;' ></div>");

        str.push("<div");
        if (pageindex != 1) {
            str.push(" class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.GoodsChangePage(" + String(pageindex - 1) + ");'");
        }
        else
            str.push(" class='ButtonLeft'");
        str.push("></div><div style='left:82px;'");
        if (pageindex < maxpage) {
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) SmithyClass.GoodsChangePage(" + String(pageindex + 1) + ");'");
        }
        else
            str.push(" class='ButtonRight'");
        str.push("></div>");
        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        $("#SynthesisHeroSelect").html(str.join(""));
        SmithyClass.LoadSynthesis(tempindex);
    },

    /*更改合成使用物品数量*/
    SetWuHunCount: function (type, goodsindex) {
        //获得当前使用武魂数量
        var nowcount = Number($("#whcount").html());
        switch (type) {
            case 1:
                //减少数量
                if (nowcount <= 1)
                    return;

                if (nowcount == 5) {
                    $("#AddBut").attr("class", "AddButtonRight AddrightOn");
                }

                if (nowcount <= 2) {
                    $("#MoveBut").attr("class", "AddButtonLeft");
                }
                else {
                    $("#MoveBut").attr("class", "AddButtonLeft AddleftOn");
                }
                nowcount -= 1;
                $("#whcount").html(nowcount);
                break;

            case 2:
                //增加数量
                if (nowcount >= 5)
                    return;

                if (nowcount >= WarhoushJson.data[0].GoodsList[goodsindex].iVal)
                    return;

                if (nowcount == 1) {
                    $("#MoveBut").attr("class", "AddButtonLeft AddleftOn");
                }
                nowcount += 1;
                if (nowcount >= 5) {
                    $("#AddBut").attr("class", "AddButtonRight");
                }
                else {
                    $("#AddBut").attr("class", "AddButtonRight AddrightOn");
                }

                $("#whcount").html(nowcount);
                break;
        }

        if (nowcount >= WarhoushJson.data[0].GoodsList[goodsindex].iVal) {
            $("#AddBut").attr("class", "AddButtonRight");
        }
        else
            if (nowcount < 5)
                $("#AddBut").attr("class", "AddButtonRight AddrightOn");
            else
                $("#AddBut").attr("class", "AddButtonRight");

        switch (nowcount) {
            case 1:
                $("#discountVal").html("5%");
                break;
            case 2:
                $("#discountVal").html("10%");
                break;
            case 3:
                $("#discountVal").html("30%");
                break;
            case 4:
                $("#discountVal").html("60%");
                break;
            case 5:
                $("#discountVal").html("100%");
                break;
        }
    },

    //合成提交
    SynthesisSubmit: function (goodsindex) {
        var nowcount = Number($("#whcount").html());
        if (nowcount > 5) {
            showTextMess("碎片数量不能多于5个!", 0);
            return;
        }

        if (nowcount > WarhoushJson.data[0].GoodsList[goodsindex].iVal) {
            showTextMess("碎片数量不能多于现有数量!", 0);
            return;
        }

        if (nowcount < 1) {
            showTextMess("碎片数量不能少于1个!", 0);
            return;
        }

        window.GameMainClass.sendRequestJson(1088, '{"ItemId":' + WarhoushJson.data[0].GoodsList[goodsindex].ItId + ',"IVal":' + nowcount + ',"Goodsindex":' + goodsindex + '}', "SynthesisGoodsResert");
        //SynthesisGoodsResert('{"Client":[{"ItemId":' + WarhoushJson.data[0].GoodsList[goodsindex].ItId + ',"IVal":' + nowcount + ',"Goodsindex":' + goodsindex + '}],"GoodsJson":[{"ItId":1247,"ItemId":1313,"Job":0,"NLv":45,"RefineLv":0,"Type":2,"atkBonus":0,"correId":0,"defBonus":0,"gid":0,"hpBonus":114,"iVal":1,"quality":4,"refAtk":0,"refDef":0,"refHP":0}],"info":"主公虎将盔已放入包裹中！消耗了5个碎片","resert":1,"tempsJson":[]}');
    }
}
