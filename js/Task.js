

var TaskClass =
{
    //每日任务
    TaskDay: function () {
        $("#TaskDayInfoDialog").remove();
        $("#TaskRight").remove();
        var str = new Array();
        var x = 6, y = 35, x1 = 89, y1 = 40, x2 = 113, y2 = 39;
        str.push("<div id='TaskDayInfoDialog'>");
        for (var i = 0; i < TaskDayJson.data[0].list.length; i++) {
            str.push("<div class='TaskBox' style='top:" + y + "px;left:" + x + "px;' ></div>");
            str.push("<div class='TaskNum' style='top:" + y1 + "px;left:" + x1 + "px;'>" + TaskDayJson.data[0].list[i].CompleteNum + "/" + TaskDayJson.data[0].list[i].PointNum + "</div>");
            if (TaskDayJson.data[0].list[i].CompleteNum == TaskDayJson.data[0].list[i].PointNum) {
                str.push("<div class='SelectedImg' style='top:" + y2 + "px;left:" + x2 + "px;'></div>");
            }

            if (i == 5) {
                y = 35;
                x = 68;
                x1 = 249;
                y1 = 40;
                x2 = 273;
                y2 = 39;
            }
            else {
                y += 32;
                y1 += 32;
                y2 += 32;
            }
        }

        str.push("</div>");
        str.push("<div id='TaskRight'>");
        str.push("<div style='position:absolute;top:22px;left:42px;'>" + getNum2(TaskDayJson.data[0].ActivePoint) + "</div>");

        x = 60; y = 33;
        y1 = 38, x1 = 3;
        var bool = false;
        var templist = TaskDayJson.data[0].RewardState.split(",");
        for (var i = 0; i < templist.length; i++) {
            str.push("<div class='TaskBox' id='tasklist" + i + "' style='top:" + y1 + "px;left:" + x1 + "px;width:52px;height:46px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaskClass.ShowDayTaskInfo(" + i + ");'></div>");
            str.push("<div class='Chest' style='top:" + y + "px;left:" + x + "px;background-position:-" + Number(templist[i]) * 46 + "px -" + i * 46 + "px;'");
            if (templist[i] == "1") {
                str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.openCase(" + Number(i + 1) + ");'");
                if (!bool) {
                    
                    $("#Task").html("<a href='javascript:void(0);' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) return EnterBuliding(6000);'><div class='PromptImage' style='top:2px;background:url(res/city/tishi.png) no-repeat;'></div></a>");
                    bool = true;
                }
            }
            str.push("></div>");
            y += 48;
            y1 += 48;
        }

        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain").appendChild(divnode);
    },

    ShowDayTaskInfo: function (TaskIndex) {
        $("body").stopTime("BubbleData2");
        $("#BubbleData2").remove();
        var str = new Array();

        str.push("<div id='BubbleData2' class='BubbleData' style='right:50px;'>");
        str.push("<div id='BubbleDataUp'></div>");
        str.push("<div id='BubbleDataCenter' >");
        str.push("<table width='93%'>");
        str.push("<tr><td>" + TaskDayJson.data[0].RewardInfo.split("|")[TaskIndex] + "</td></tr>");
        str.push("</table>");
        str.push("</div>");
        str.push("<div id='BubbleDataDown' ></div>");
        str.push("<div id='Arrow'></div>");
        str.push("</div>");

        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("tasklist" + TaskIndex).appendChild(divnode);
        //$("#tasklist" + TaskIndex).html($("#tasklist" + TaskIndex).html() + str.join(""));

        //获取被点击的座标
        var h = $("#BubbleData2").height();

        var top = 0;
        if (h > 46)
            top = 0 - (h - 46) / 2;
        else
            top = (46 - h) / 2;
        $("#BubbleData2").css({ "top": top + "px" });
        $("#Arrow").css({ "top": (h - 14) / 2 + "px" });
        
        var satime = 0;
        $("body").oneTime("3s", "BubbleData2", function () {

            $("body").stopTime("BubbleData2");
            var i = 100;
            $("body").everyTime("20ms", "BubbleData2", function () {
                if (i > 0) {
                    i--;
                    document.getElementById("BubbleData2").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
                    document.getElementById("BubbleData2").style.opacity = i / 100; //for FF
                }
                else {
                    $("body").stopTime("BubbleData2");
                    $("#BubbleData2").remove();
                }
            });
        });
    },

    //加载任务列表
    LoadMainTaskList: function (pageindex) {
        $("#SynthesisHeroSelect").remove();
        $("#TaskInfoDia").remove();
        var str = new Array();
        str.push("<div id='SynthesisHeroSelect'>");
        var len = MainTaskData.length;
        var tempindex = 0;
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
            //获取该任务对应的本地数据
            var localindex = 0;
            for (; localindex < MainTaskJson.length; localindex++) {
                if (MainTaskJson[localindex].TaskID == MainTaskData[i].TaskID) {
                    break;
                }
            }

            if (temp == -1) {
                temp = localindex;
            }
            str.push("<div id='task" + i + "' class='WuhunItem' style='top:" + top + "px;left:" + left + "px;padding:0px;'");
            str.push(" ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaskClass.ShowTaskInfo(" + i + "," + localindex + ");'>");

            str.push("<div style='position:absolute;background:url(res/TaskIcon/" + MainTaskJson[localindex].IconId + ".png) no-repeat;width:40px;height:38px;'></div>");
            str.push("<div class='DefaultFont RedFont' style='left:55px;width:30px;line-height:18px;font-size:15px;'>" + MainTaskJson[localindex].TaskName + "</div>");
            str.push("</div>");
            top += 48;
        }
        str.push("<div id='GoodsClick' style='top:10px;left:4px;' ></div>"); ////使第一个物品被点中

        str.push("<div class='PageNumber' style='top:210px;left:42px;'>" + pageindex + "/" + maxpage + "</div>");
        str.push("");
        if (pageindex != 1)
            str.push("<div class='ButtonLeft leftOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaskClass.LoadMainTaskList(" + (pageindex - 1) + ");'");
        else
            str.push("<div class='ButtonLeft'");
        str.push("></div><div style='left:82px;'");
        if (pageindex != maxpage)
            str.push(" class='ButtonRight rightOn' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) TaskClass.LoadMainTaskList(" + (pageindex + 1) + ");'");
        else
            str.push(" class='ButtonRight'");
        str.push(" ></div>");

        str.push("</div>");

        str.push("<div id='TaskInfoDia'>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");

        document.getElementById("dialogMain").appendChild(divnode);

        TaskClass.ShowTaskInfo(startindex, temp);
    },


    ShowTaskInfo: function (index, localindex) {
        var str = new Array();
        str.push("<div class='DetialBox' style='left:19px;top:20px;line-height:20px;width:271px;height:39px;color:#58221D;font-size:14px;'>" + MainTaskJson[localindex].TaskDetail + "</div>");
        str.push("<div class='DetialBox' style='left:19px;top:88px;line-height:16px;width:271px;height:18px;color:#58221D;font-size:14px;'>" + MainTaskJson[localindex].TargetDetial + "</div>");

        var left = $("#task" + String(index)).position().left;
        var top = $("#task" + String(index)).position().top;

        var rewardList = MainTaskData[index].Reward.split(",");
        var x = 0, y = 130;
        var lens = 0;
        for (var i = 0; i < rewardList.length; i++) {
            if (Number(MainTaskData[index].Count.split(",")[i]) != 0) {
                if (lens % 2 == 0) {
                    x = 10;
                    if (lens != 0)
                        y += 51;
                }
                else
                    x += 113;
                str.push("<div class='RewardBox' style='top:" + y + "px;left:" + x + "px;'>");
                if (Number(rewardList[i]) < 1000) {
                    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/" + rewardList[i] + ".png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;'>");
                    switch (Number(rewardList[i])) {
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
                    }
                    str.push("</div>");

                }
                else {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == Number(rewardList[i])) {
                            str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                            var name = GoodsJson[m].IName;
                            if (name.length > 4) {
                                name = name.substring(0, 4);
                            }
                            str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;'>" + name + "</div>");
                            break;
                        }
                    }
                }
                str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + MainTaskData[index].Count.split(",")[i] + "</div>");
                str.push("</div>");

                lens++;
            }
        }
        $("#TaskInfoDia").html(str.join(""));
        $("#GoodsClick").css({ "top": top - 1, "left": left - 1 });
    },

    //主线任务
    LoadMainLinTask: function (TaskIndex) {
        var str = new Array();

        var height = window.innerHeight;
        var width = window.innerWidth;
        DiaogColse1();
        var divnode = document.createElement("div");
        divnode.id = 'masktask';
        divnode.className = 'mask2 opacity2';
        document.getElementById("other").appendChild(divnode);

        divnode = document.createElement("div");
        divnode.className = 'dialogMain';
        divnode.id = "dialogMain1";
        document.getElementById("other").appendChild(divnode);

        $("#dialogMain1").css({ "left": (Systemdata.width - 352) / 2 + "px", "top": (height - 308) / 2 + "px", "width": 352, "height": 308, "background-image": "url(res/dialog/Task_bg.png)" });
        $("#dialogMain1").html("<div class='close' id='colsemain1' style='left:310px;' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) {$(\"#dialogMain1\").remove();$(\"#masktask\").remove();}'></div>");
        str.push("<div class='icon' style='background:url(res/dialog/Icon_Task.png) no-repeat;'></div>");
        var i = 0;
        for (; i < MainTaskJson.length; i++) {
            if (MainTaskJson[i].TaskID == MainTaskData[TaskIndex].TaskID)
                break;
        }
        str.push("<div id='Task" + TaskIndex + "' class='dialogTitle'>" + MainTaskJson[i].TaskName + "</div>");

        str.push("<div class='DetialBox' style='left:19px;top:77px;line-height:20px;width:312px;height:39px;color:#58221D;font-size:14px;'>" + MainTaskJson[i].TaskDetail + "</div>");
        str.push("<div class='DetialBox' style='left:19px;top:142px;line-height:16px;width:312px;height:18px;color:#58221D;font-size:14px;'>" + MainTaskJson[i].TargetDetial + "</div>");

        if (MainTaskData[TaskIndex].TaskState != 0) {
            str.push("<div class='SelectedImg' style='top:138px;left:302px;'></div>");
            str.push("<img style='width:127px;height:126px;left:180px;top:55px;position:absolute;z-index:20;' src='res/dialog/Task_Complete.png' />");
        }

        var rewardList = MainTaskData[TaskIndex].Reward.split(",");
        var x = 0, y = 184;
        var lens = 0;
        for (var i = 0; i < rewardList.length; i++) {
            if (Number(MainTaskData[TaskIndex].Count.split(",")[i]) != 0) {
                if (lens % 2 == 0) {
                    x = 20;
                    if (lens != 0)
                        y += 51;
                }
                else
                    x += 113;
                str.push("<div class='RewardBox' style='top:" + y + "px;left:" + x + "px;'>");
                if (Number(rewardList[i]) < 1000) {
                    str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/dialog/" + rewardList[i] + ".png) no-repeat;'></div>");
                    str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;'>");
                    switch (Number(rewardList[i])) {
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
                    }
                    str.push("</div>");

                }
                else {
                    for (var m = 0; m < GoodsJson.length; m++) {
                        if (GoodsJson[m].ItemId == Number(rewardList[i])) {
                            str.push("<div class='Skill' style='top:4px;left:5px;background:url(res/Goods/" + GoodsJson[m].ImgId + ".png) no-repeat;'></div>");
                            var name = GoodsJson[m].IName;
                            if (name.length > 4) {
                                name = name.substring(0, 4);
                            }
                            str.push("<div class='DefaultFont_14 RedFont' style='top:6px;left:47px;'>" + name + "</div>");
                            break;
                        }
                    }
                }
                str.push("<div class='DefaultFont_14 RedFont' style='top:27px;left:47px;'>×" + MainTaskData[TaskIndex].Count.split(",")[i] + "</div>");
                str.push("</div>");

                lens++;
            }
        }
        if (MainTaskData[TaskIndex].TaskState != 0)
            str.push("<div class='ButtonBig' ontouchmove='getmovingposx()' ontouchstart='getposx()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) window.GameMainClass.missionGetPrize(" + Number(MainTaskData[TaskIndex].TaskID) + ");' style='top:188px;left:246px;width:86px;height:90px;background:url(res/dialog/Task_But1.png) no-repeat;'></div>"); //领取奖励
        else
            str.push("<div class='ButtonBig' style='top:188px;left:246px;width:86px;height:90px;background:url(res/dialog/Task_But2.png) no-repeat;'></div>");
        str.push("</div>");
        var divnode = document.createElement("div");
        divnode.innerHTML = str.join("");
        document.getElementById("dialogMain1").appendChild(divnode);
    }
}