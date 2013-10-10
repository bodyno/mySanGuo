var NewGuideJson = [
   { "left": 0, "top": 80, "Function": "NewGuideClass.LoadNewGuide();EnterBuliding(5231);", "LeftType": 0, "detial": "点击可以查看当前需要完成的主线任务。", "arrowtype": 2 },
   { "left": 430, "top": 20, "Function": "NewGuideClass.LoadNewGuide();DiaogColse2();", "LeftType": 1, "detial": "在任务窗口可以看到任务的列表，点击可以查看任务的详细信息。点此关闭任务窗口。", "arrowtype": 3 },
   { "left": 330, "top": 261, "Function": "main(3000);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "包裹中存放着主公所有的物品，快点开看看都有哪些宝贝吧。", "arrowtype": 1 },
   { "left": 415, "top": 248, "Function": "WarHouseClass.UseItem();window.GameMainClass.nowNewGayState(1029);$(\".NewGuideDiv\").remove();DiaogColse2();", "LeftType": 1, "detial": "使用紫将包", "arrowtype": 1 }, //改为调用欧阳方法   
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1000);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 },
   { "left": 330, "top": 261, "Function": "main(3000);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "打开包裹。", "arrowtype": 1 },
   { "left": 415, "top": 248, "Function": "WarHouseClass.UseItem();window.GameMainClass.nowNewGayState(1082);DiaogColse2();$(\".NewGuideDiv\").remove();", "LeftType": 1, "detial": "使用新手礼包", "arrowtype": 1 }, //改为调用欧阳方法
   {"left": 217, "top": 235, "Function": "$(\"#DialogDiv2\").remove();NewGuideClass.UpdateNewGuideIndex();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "关闭获得物品提示窗口", "arrowtype": 1 }, //通知服务器新手进程更新
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1001);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 85, "top": 261, "Function": "main(9000);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入征战", "arrowtype": 2 },
   { "left": 65, "top": 100, "Function": "CampaignClass.showCompaignPoint(BattleJson[0].list[0].id ,0,0,0,0);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "点击征战点", "arrowtype": 2 },
   { "left": 335, "top": 237, "Function": "window.GameMainClass.startBattle(1,1000,1);window.GameMainClass.nowNewGayState(1071);DiaogColse2();$(\".NewGuideDiv\").remove();", "LeftType": 1, "detial": "开始征战", "arrowtype": 1 }, //通知客户端开始征战
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1002);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 250, "top": 205, "Function": "main(1001);NewGuideClass.LoadNewGuide();", "LeftType": 0, "detial": "打开酒馆", "arrowtype": 1 },
   { "left": 120, "top": 90, "Function": "EnterBuliding(1001);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "进入酒馆", "arrowtype": 4 },
   { "left": 400, "top": 205, "Function": "pubclass.Recruit(0,1);window.GameMainClass.nowNewGayState(1132);NewGuideClass.isWaiting = true;$(\".NewGuideDiv\").remove();DiaogColse2();", "LeftType": 1, "detial": "招募武将", "arrowtype": 1 }, //调用欧阳方法
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1003);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 185, "top": 261, "Function": "EnterBuliding(4000); NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入布阵", "arrowtype": 2 },
   { "left": 230, "top": 80, "Function": "BuZhengClass.ShowBattleHero(-1,0,0,1);if (HeroJson.data[0].HeroList[0].State2 == 0) { NewGuideClass.tempindex++; }NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "点击空阵位", "arrowtype": 1 },
   { "left": 410, "top": 120, "Function": "BuZhengClass.Battle(1,GetHeroLocalIndex(1),3,1);NewGuideClass.tempindex++;NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择上阵的武将", "arrowtype": 1 },
   { "left": 360, "top": 120, "Function": "BuZhengClass.Battle(0,GetHeroLocalIndex(0),3,1);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择上阵的武将", "arrowtype": 1 },
   { "left": 210, "top": 250, "Function": "BuZhengClass.SubmitLineup();window.GameMainClass.nowNewGayState(1009);$(\"#mask10\").remove();$(\"#dialogMain10\").remove();$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "保存阵形", "arrowtype": 1 }, 
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1004);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 235, "top": 261, "Function": "EnterBuliding(1003);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "点击训练", "arrowtype": 1 },
   { "left": 350, "top": 195, "Function": "SchoolClass.CheckSelect(2);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择训练时间", "arrowtype": 1 },
   { "left": 395, "top": 180, "Function": "window.GameMainClass.trainingGeneral(Number(HeroJson.data[0].HeroList[0].Id), 2, 0);window.GameMainClass.nowNewGayState(1020);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;DiaogColse2();", "LeftType": 1, "detial": "开始训练", "arrowtype": 1 }, //此处添加训练方法
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1005);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   {"left": 235, "top": 261, "Function": "EnterBuliding(1003);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "点击训练", "arrowtype": 1 },
   { "left": 395, "top": 81, "Function": "SchoolClass.UseBook();NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "点击经验按钮，进入使用经验书界面", "arrowtype": 3 },
   { "left": 160, "top": 100, "Function": "SchoolClass.UseBookSubmit(1,1);window.GameMainClass.nowNewGayState(1110);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;DiaogColse2();", "LeftType": 1, "detial": "使用经验书", "arrowtype": 4 }, //此处添加训练方法
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1006);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 },
   { "left": 85, "top": 261, "Function": "main(9000);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入征战", "arrowtype": 2 },
   { "left": 65, "top": 100, "Function": "CampaignClass.showCompaignPoint(BattleJson[0].list[0].id ,0,0,0,0);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "点击征战点", "arrowtype": 2 },
   { "left": 335, "top": 237, "Function": "window.GameMainClass.startBattle(1,1000,2);window.GameMainClass.nowNewGayState(1071);DiaogColse2();$(\".NewGuideDiv\").remove();", "LeftType": 1, "detial": "开始征战", "arrowtype": 1 }, //通知客户端开始征战
   {"left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1007);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 280, "top": 261, "Function": "EnterBuliding(1004);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入铁匠铺", "arrowtype": 1 },
   { "left": 430, "top": 130, "Function": "SmithyClass.CheckRightItem(2);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择仓库", "arrowtype": 1 },
   { "left": 255, "top": 70, "Function": "NewGuideClass.LoadNewGuide();SmithyClass.ClickE(NewGuideClass.GetFirstZBIt(),2,WarhoushJson.data[0].GoodsList[NewGuideClass.GetFirstZBIt()].ItId);", "LeftType": 1, "detial": "点击物品", "arrowtype": 1 },
   { "left": 115, "top": 260, "Function": "SmithyClass.BeginSmithy();window.GameMainClass.nowNewGayState(1040);DiaogColse2();$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "开始强化", "arrowtype": 2 },
   { "left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1008);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 135, "top": 261, "Function": "EnterBuliding(2000);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入武将页", "arrowtype": 2 },
   { "left": 5, "top": 110, "Function": "MyshowDialog.CheckItem(3);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "切换到装备", "arrowtype": 2 },
   { "left": 175, "top": 160, "Function": "NewGuideClass.LoadNewGuide();MyshowDialog.ShowEquipment(NewGuideClass.GetFirstZBItByJob(),GetItemIndex(NewGuideClass.GetFirstZBItByJob()),0,0,0);", "LeftType": 1, "detial": "选择装备", "arrowtype": 1 },
   { "left": 260, "top": 200, "Function": "window.GameMainClass.changeEquipment(WarhoushJson.data[0].GoodsList[NewGuideClass.GetFirstZBItByJob()].ItId,HeroJson.data[0].HeroList[0].Id, 1, 0);window.GameMainClass.nowNewGayState(1034);DiaogColse2();$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "装备武器", "arrowtype": 1 },
   { "left": 330, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1009);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   { "left": 390, "top": 210, "Function": "main(1002);NewGuideClass.LoadNewGuide();", "LeftType": 0, "detial": "升级军机处", "arrowtype": 1 },
   { "left": 210, "top": 90, "Function": "window.GameMainClass.upgradeBuilding(1002);window.GameMainClass.nowNewGayState(1023);NewGuideClass.isWaiting = true;$(\".NewGuideDiv\").remove();", "LeftType": 1, "detial": "升级军机处", "arrowtype": 4 },
   { "left": 390, "top": 210, "Function": "main(1002);NewGuideClass.LoadNewGuide();", "LeftType": 0, "detial": "打开军机处", "arrowtype": 1 },
   { "left": 120, "top": 90, "Function": "EnterBuliding(1002);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "进入军机处", "arrowtype": 4 },
   { "left": 400, "top": 250, "Function": "window.GameMainClass.formationUpgrade(1000);window.GameMainClass.nowNewGayState(1056);NewGuideClass.isWaiting = true;$(\".NewGuideDiv\").remove();DiaogColse2();", "LeftType": 1, "detial": "升级阵型", "arrowtype": 1 }, //调用欧阳方法
   {"left": 335, "top": 225, "Function": "window.GameMainClass.missionGetPrize(1010);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
   {"left": 235, "top": 261, "Function": "EnterBuliding(1003);NewGuideClass.LoadNewGuide();", "LeftType": 3, "detial": "进入训练", "arrowtype": 1 },
   { "left": 5, "top": 105, "Function": "SchoolClass.CheckItem(2);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "切换到培养", "arrowtype": 2 },
   { "left": 400, "top": 200, "Function": "SchoolClass.StarCulture(0,GetHeroLocalIndex(0),1,0);NewGuideClass.LoadNewGuide();", "LeftType": 1, "detial": "选择培养", "arrowtype": 1 },
   { "left": 205, "top": 230, "Function": "window.GameMainClass.raiseGeneral(Number(HeroJson.data[0].HeroList[0].Id), 0, 1, 1, 0,1);window.GameMainClass.nowNewGayState(1047);DiaogColse2();$(\".NewGuideDiv\").remove();NewGuideClass.isWaiting = true;", "LeftType": 1, "detial": "开始培养", "arrowtype": 1 }, //此处添加培养方法
   {"left": 330, "top": 225, "Function": "DiaogColse2();window.GameMainClass.missionGetPrize(1011);window.GameMainClass.nowNewGayState(1076);$(\".NewGuideDiv\").remove();NewGuideClass.isEnd = true;", "LeftType": 1, "detial": "领取任务奖励", "arrowtype": 1 }, ///////////////
];

   var NewGuideClass = {
       tempindex: 0,
       isWaiting: false,
       isEnd: false,
       NewGuideIndex: 0,
       LoadNewGuide: function () {
           $("#mask1").remove();
           $("#mask2").remove();
           //$(".NewGuideDiv").remove();
           $("#helodiv").remove();
           if (NewGuideClass.isWaiting) {
               NewGuideClass.UpdateNewGuideIndex();
               NewGuideClass.isWaiting = false;
           }

           if (UserJson.NewGuideIndex == 1000) {
               NewGuideClass.NewGuideIndex = 1000;
               NewGuideClass.End();
               return;
           }

           if (NewGuideClass.isEnd) {
               window.GameMainClass.sendRequestJson(1099, '{"Index":1000}', "");
               NewGuideClass.NewGuideIndex = 1000;
               NewGuideClass.End();
               return;
           }
           var str = new Array();
           var left = NewGuideJson[NewGuideClass.tempindex].left + (NewGuideJson[NewGuideClass.tempindex].LeftType == 0 ? 0 : ((Systemdata.width - 480) / 2));
           if (NewGuideJson[NewGuideClass.tempindex].LeftType == 3)
               left = NewGuideJson[NewGuideClass.tempindex].left + Systemdata.width - 480;
           var padding = "", padding2 = "";
           var val = 0;
           switch (NewGuideJson[NewGuideClass.tempindex].arrowtype) {
               case 1: //左上方
                   val = 315;
                   padding = "top:-10px;right:45px;";
                   padding2 = "top:-30px;right:165px;";
                   break;
               case 2: //右上方
                   val = 45;
                   padding = "top:-10px;left:40px;";
                   padding2 = "top:-20px;left:75px;";
                   break;
               case 3: //左下方
                   val = 225;
                   padding = "top:30px;right:45px;";
                   padding2 = "top:50px;right:155px;";
                   break;
               case 4: //右下方
                   val = 135;
                   padding = "top:30px;left:40px;";
                   padding2 = "top:50px;left:75px;";
                   break;
           }  
           str.push("<div id='mask1' class='mask3 opacity3'></div><div id='mask2' class='mask1 opacity1'></div><div style='position:absolute;width:" + Systemdata.width + "px;height:320px;top:0px;' id='helodiv'><div class='NewGuideDiv' style='left:" + left + "px;top:" + NewGuideJson[NewGuideClass.tempindex].top + "px;width:48px;height:48px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) " + NewGuideJson[NewGuideClass.tempindex].Function + "'><img src='res/city/Guide_Key.png' style='position:absolute;-moz-transform:rotate(" + val + "deg); -webkit-transform:rotate(" + val + "deg); -o-transform:rotate(" + val + "deg); transform:rotate(45deg);" + padding + "'  />");
           str.push("<div id='NewGuideMess' style='" + padding2 + ";width:48px;height:48px;'><div id='NewGuideMessUp'><div>" + String(NewGuideJson[NewGuideClass.tempindex].detial) + "</div></div><div id='NewGuideMessDown'></div></div></div></div>");
           if (document.getElementById("jumpbtn") == null)
               str.push("<img src='res/city/SkipBoot.png' id='jumpbtn' style='position:absolute;left:" + (Systemdata.width - 100) / 2 + "px;top:25px;z-index:15002;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {NewGuideClass.End();$(\"#jumpbtn\").remove();}' />");

           var divnode = document.createElement("div");
           divnode.innerHTML = str.join("");
           document.getElementById("other").appendChild(divnode);
           NewGuideClass.tempindex++;
       },

       NewBegin: function () {
           $("#mask1").remove();
           $("#mask2").remove();
           $(".NewGuideDiv").remove();
           var str = new Array();

           str.push("<div id='mask1' class='mask opacity'></div>");
           str.push("<div style='position:absolute;width:" + Systemdata.width + "px;height:320px;top:0px;' id='helodiv' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){$(\"#helodiv\").remove();NewGuideClass.LoadNewGuide();}'>");
           str.push("<div class='NewGuideDiv' style='width:331px;height:140px;background:url(res/city/Novice_bg.png) no-repeat;top:90px;left:" + (Systemdata.width - 331) / 2 + "px;'><div class='DetialBox' style=line-height:18px;width:220px;height:57px;color:#58221D;font-size:14px;left:100px;top:53px;'>感谢主公厚爱,臣妾誓死相随!适逢天下大乱,群雄并起,豪礼在手,美女相伴,何不大展宏图!&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#ff0000;font-size:12px;'>点击屏幕继续<font></div></div>");

           str.push("</div>");
           str.push("<img src='res/city/SkipBoot.png' id='jumpbtn' style='position:absolute;left:" + (Systemdata.width - 100) / 2 + "px;top:25px;z-index:15002;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5){NewGuideClass.End();$(\"#jumpbtn\").remove();}' />");

           var divnode = document.createElement("div");
           divnode.innerHTML = str.join("");
           document.getElementById("other").appendChild(divnode);
       },

       End: function () {
           $("#mask1").remove();
           $("#mask2").remove();
           $("#jumpbtn").remove();
           $("#helodiv").remove();
           $(".NewGuideDiv").remove();
           DiaogColse1();
           DiaogColse2();
           if (NewGuideClass.NewGuideIndex != 1000) {
               window.GameMainClass.sendRequestJson(1099, '{"Index":1000}', "");
               NewGuideClass.NewGuideIndex = 1000;
           }
           var str = new Array();
           str.push("<div id='mask1' class='mask opacity'></div>");
           str.push("<div style='z-index:15000;position:absolute;width:" + Systemdata.width + "px;height:320px;top:0px;' id='helodiv1' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) NewGuideClass.NewEnd();'>");
           str.push("<div class='NewGuideDiv' style='width:331px;height:140px;background:url(res/city/Novice_bg.png) no-repeat;top:90px;left:" + (Systemdata.width - 331) / 2 + "px;'><div class='DetialBox' style=line-height:18px;width:220px;height:57px;color:#58221D;font-size:14px;left:100px;top:53px;'>恭喜主公完成了新手指引,臣妾特献开服大礼!祝主公在乐闹三国的世界里英勇无前,勇往杀敌!&nbsp;<font style='color:#ff0000;font-size:12px;'>点击屏幕继续<font></div></div>");
           str.push("</div>");
           var divnode = document.createElement("div");
           divnode.innerHTML = str.join("");
           document.getElementById("other").appendChild(divnode);
       },

       NewEnd: function () {
           $("#helodiv1").remove();
           $("#mask1").remove();
           if (NewGuideClass.NewGuideIndex == 1000) {
               var str = new Array();
               str.push("<div id='mask11' class='mask opacity'></div><img id='imggift' src='res/kaifu/Opens_box.png' style='position:absolute;top:99px;z-index:10000;left:" + Math.round((Systemdata.width - 102) / 2) + "px;width:102px;height:89px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) NewGuideClass.EndClick();' />");
               var divnode = document.createElement("div");
               divnode.innerHTML = str.join("");
               document.getElementById("main").appendChild(divnode);
           }
       },

       EndClick: function () {
           $("#imggift").remove();
           $("#mask11").remove();
           NewGuideClass.NewGuideIndex = -1;
           UserJson.NewGuideIndex = -1;
           window.GameMainClass.sendRequestJson(1099, '{"Index":-1}', "");
           window.GameMainClass.openServierGift();
           WarhoushJson.data[0].isResert = 0;
       },

       //更新新手指引进程
       UpdateNewGuideIndex: function () {
           window.GameMainClass.sendRequestJson(1099, '{"Index":' + NewGuideClass.tempindex + '}', "");
       },

       GetFirstZBIt: function () {
           for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
               if (WarhoushJson.data[0].GoodsList[i].Type < 5 && WarhoushJson.data[0].GoodsList[i].gid == 0)
                   return i;
           }
       },

       GetFirstBookIt: function () {
           for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
               if (WarhoushJson.data[0].GoodsList[i].Type == 5 && WarhoushJson.data[0].GoodsList[i].Job == HeroJson.data[0].HeroList[0].Job)
                   return i;
           }
       },

       GetFirstZBItByJob: function () {
           for (var i = 0; i < WarhoushJson.data[0].GoodsList.length; i++) {
               if (WarhoushJson.data[0].GoodsList[i].Type < 5 && WarhoushJson.data[0].GoodsList[i].gid == 0 && WarhoushJson.data[0].GoodsList[i].Job == HeroJson.data[0].HeroList[0].Job)
                   return i;
           }
       },


       /*弹出获得奖励对话框*/
       ShowKaiFuDialog: function (goodsjson, itemjson) {
           if (document.getElementById("DialogDiv2") != null)
               $("#DialogDiv2").remove();

           if (WarhoushJson.data[0].isResert == 1 && goodsjson != "") {
               AddItemToWar(goodsjson);
           }

           var str = new Array();
           str.push("<div id='DialogDiv2' class='DialogDiv' style='left:" + (Systemdata.width - 450) / 2 + "px;'>");
           str.push("<div id='RewardTitle' style='background:url(res/kaifu/Opens_Mark.png) no-repeat;height:67px;top:2px;'></div>"); //
           str.push("<div id='YesBut'><a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#DialogDiv2\").remove();$(\"#other\").html(\"\");ShowBulletin();}'></a></div>");
           var tempjson = eval("([" + itemjson + "])");
           if (tempjson.length > 0) {
               var itemlist = tempjson[0].ItemId.split(",");
               str.push("<table style='width:350px;height:150px;position:relative;	z-index:11;left:47px;top:65px;'>");
               str.push("<tr valign='middle'><td align='center'>");
               for (var i = 0; i < itemlist.length; i++) {
                   if (i % 3 == 0 && i != 0) {
                       str.push("</td><tr valign='middle'><td align='center' style='width:350px;'>");
                   }

                   str.push("<div class='RewardBox' style='position:relative;float:left;'>");
                   if (Number(itemlist[i]) < 1000) {
                       str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/" + itemlist[i] + ".png) no-repeat;'></div>");
                       str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>");
                       switch (Number(itemlist[i])) {
                           case 100:
                               str.push("主公EXP");
                               break;
                           case 200:
                               str.push("银币");
                               break;
                           case 300:
                               str.push("军功");
                               break;
                           case 400:
                               str.push("声望");
                               break;
                           case 600:
                               str.push("萌币");
                               updateGold(2, 0 - Number(tempjson[0].count.split(",")[i]));
                               break;
                       }
                       str.push("</div>");

                   }
                   else {
                       for (var m = 0; m < GoodsJson.length; m++) {
                           if (GoodsJson[m].ItemId == Number(itemlist[i])) {
                               str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                               str.push("<div class='DefaultFont_14' style='top:6px;left:47px;color:#58211D;'>" + GoodsJson[m].IName + "</div>");
                               break;
                           }
                       }
                   }
                   str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + tempjson[0].count.split(",")[i] + "</div>");
                   str.push("</div><div style='position:relative;float:left;width:5px;height:2px;'></div>");
               }
               str.push("</td></tr></table>");
           }
           str.push("</div>");
           var divnode = document.createElement("div");
           divnode.innerHTML = str.join("");
           document.getElementById("other").appendChild(divnode);
       },

       PickHeroOk: function () {
           $("#message").remove(); $("#mask1").remove();
           CampaignClass.AutomaticCrusadeHero = 0;
           //通知服务器下阵该武将
           window.GameMainClass.sendRequestJson(1096, '{"Gid":' + HeroJson.data[0].HeroList[0].Id + '}', "UpdateHeroState2");
           $("#HeroHeadBox").css({ "background": "url(res/HeroHead/" + GeneralsJson[GetHeroLocalIndex(0)].Imgid + ".png) no-repeat" });
           var namecolor = '#00CCFF';
           switch (HeroJson.data[0].HeroList[0].Qualification) {
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
           $("#HeroHeadBox").html("<div class='HeroNameSmall' style='color:" + namecolor + ";'>" + GeneralsJson[GetHeroLocalIndex(0)].Name + "</div><img style='position:absolute;top:33px;'src='res/dialog/Lv_Txt.png' />" + getLvNum(HeroJson.data[0].HeroList[0].Hlv));
           $("#ChooseHeroDialog").remove();

           $("#mask4").remove();
       }
   }