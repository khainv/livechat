

var bodyhtml = '<div id="toolsbar1" style="height: 264px;left: 181px;display:none;z-index: 999;bottom: 168px;"></div>' +
    '<div style="position: absolute; top: 0px; display: block;background-color:' + v2 + ';" id="header">' +
    '<div id="headerBox" class="toptitle">' +
    '<div class="img1" style="top:8px;left:10px;">' +
    '<img id="topimg" border="0" src="' + v3 + '" style="height: 36px;width: 36px;	border-radius: 18px;display:' + (v3 != "" ? "" : "none") + ';">' +
    '</div><p id="prompttop" style="margin-left:' + (v3 != "" ? "50" : "10") + 'px;">&nbsp;' + c45 + '</p></div>' +
    '<div id="topclose" class="topclose" onclick="closeme(1);">' + c19[16] + '</div>' +
    '</div></div>' +
    '<div id="centerMsg" style="position: relative; margin-right: 125px; margin-left: 170px; height: 100%;">' +
    '<div id="chatOutput" style="bottom: 165px;top: 54px;position: absolute;">' +
    '<div id="pmtdiv" style="display:none;"><img src="images/a1.gif" vspace="3" align="left" style="margin-top:4px;">' +
    '<div id="pmtdiv1"></div></div>' +
    '<div style="position:relative;*" class="border1Content" id="chatContent"><div id="msgArea"></div><div class="kongge_msg"></div></div></div>' +
    '<div id="userOptiv"><div class="border1Content"><div style="background-color:#f1f1f1;"></div>  ' +
    '<div style="background-color:#f1f1f1;"><div id="toolsbar">' +
    '<div class="telephone" id="telephone" style="display:none;border-radius: 14px;height: 26px; right: 5px;top: 4px;background-color: ' + v2 + ";border: 1px solid " + v2 + ';">' +
    '<input type="text" id="tel" class="bd" value="' + t3 + '" defaultval="'+t3+'" onfocus="inputfocus(this,1);showContent(5);" onblur="inputblur(this,1);hiddenContent();" style="border-radius: 14px 0 0 14px;height: 26px;line-height: 26px;font-size: 14px;">' +
    '<input type="button" id="telbtn" class="btn" style="line-height: 22px;border-radius: 0 14px 14px 0;font-size: 14px;height: 26px;background: ' + v2 + ' none repeat scroll 0 0;" value="' + c19[10] + '" onclick="LY_check1($(\'tel\'))" onmouseover="filter0(this);"  onmouseout="filter1(this);"></div>' +
    '<div unselectable="on" class="panelContain">' +
    '<div unselectable="on" id="tbut0" class="toolbutton0" title="' + c19[0] + '">' +
    '<div class="toolbutton" style="background-position: -600px -50px;" onmouseover="showC1(-600, this)"  onmouseout="hiddenC1(-600, this);" onclick="showContent(0)" title="' + c19[0] + '"></div></div>' +
    '<div unselectable="on" style="display:' + (c92 ? "" : "none") + '" class="toolbutton0" title="' + c19[1] + '"><div class="toolbutton" style="background-position:0px -50px;"  onmouseover="showC1(0, this)"  onmouseout="hiddenC1(0, this);" onclick="showContent(1)" title="' + c19[1] + '"></div></div>' +
    '<div unselectable="on" id="tbut2" style="display:' + (l1 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[2] + '">' +
    '<div class="toolbutton" style="background-position:-700px -50px" onmouseover="showC1(-700, this)"  onmouseout="hiddenC1(-700, this)" onclick="showContent(4)"  title="' + c19[2] + '"></div></div> ' +
    '<div unselectable="on" id="tbut3" style="display:' + (l2 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[3] + '">' +
    '<div class="toolbutton" style="background-position:-650px -50px" onmouseover="showC1(-650, this)"  onmouseout="hiddenC1(-650, this)"  title="' + c19[3] + '"><a href="tencent://message/?uin=' + l2 + '&Site=&Menu=yes" style="width: 26px; height: 24px;display:block;" id="tbut3h"></a></div></div>' +
    '<div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[4] + '">' +
    '<div class="toolbutton" style="background-position:-100px -50px" onmouseover="showC1(-100, this)"  onmouseout="hiddenC1(-100, this);" onclick="showContent(2)" title="' + c19[4] + '"></div></div> ' +
    '<div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[5] + '">' +
    '<div class="toolbutton" style="background-position:-250px -50px" onmouseover="showC1(-250, this)"  onmouseout="hiddenC1(-250, this);" onclick="showContent(3)" title="' + c19[5] + '"></div></div> ' +
    '<div unselectable="on" style="display:' + (c69 ? "" : "none") + '" class="toolbutton0" title="' + c19[8] + '">' +
    '<div class="toolbutton" style="background-position:-300px -50px" onmouseover="showC1(-300, this)"  onmouseout="hiddenC1(-300, this);" onclick="Capture();" title="' + c19[8] + '"></div></div>  ' +
    '<div unselectable="on" style="display:' + (c38 ? "" : "none") + '" class="toolbutton0" title="' + c19[21] + '">' +
    '<div class="toolbutton" style="background-position:-150px -50px" onmouseover="showC1(-150, this)"  onmouseout="hiddenC1(-150, this);" onclick="savechat()" title="' + c19[21] + '"></div></div> ' +
    '<div unselectable="on" style="display:' + ((c75 && Telurl!='') ? "" : "none") + '" class="toolbutton0" title="' + c19[10] + '">' +
    '<div class="toolbutton" style="background-position:-450px -50px" onmouseover="showC1(-450, this)"  onmouseout="hiddenC1(-450, this)" title="' + c19[10] + '"><a href="'+Telurl+'" style="width: 26px; height: 24px;display:block;"></a></div></div> ' +
    '<div unselectable="on" style="display:' + (c91 ? "" : "none") + '" class="toolbutton0" title="' + c19[6] + '">' +
    '<div class="toolbutton" style="background-position:-500px -50px" onmouseover="showC1(-500, this)"  onmouseout="hiddenC1(-500, this)" title="' + c19[6] + '"><a onmousedown="liuyan();" style="width: 26px; height: 24px;display:block;"></a></div></div> ' +
    '<div unselectable="on" style="display:' + (c114 ? "" : "none") + '" class="toolbutton0" title="' + c19[7] + '">' +
    '<div class="toolbutton" style="background-position:-50px -50px" onmouseover="showC1(-50, this)"  onmouseout="hiddenC1(-50, this)" onclick="pingjia();" title="' + c19[7] + '"></div></div></div></div></div>' +
    '<div id="sendMsgDiv"> <div class="editor_border"><div id="lreditor"><iframe id="FreeTextBox1_editor" name="FreeTextBox1_editor" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none; " frameborder="0" hspace="0" height="91" width="100%" ' + if_src() + '></iframe></div></div>' +
    '<div id="promptbar"><div style="overflow:hidden;height:22px;line-height:20px;width:100%;margin-top:13px;"><ul id="promptbottom"><div style="display: block; width:270px;" id="swtlogo">'+c15+'</div></ul></div></div>' +
    '<div unselectable="on" id="SendBar"><div class="bd1"><div  onmouseover="filter0(this);"  onmouseout="filter1(this);" unselectable="on" class="bt" onclick="showSendSel()" id="selSendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">^</div>' +
    '<div  onmouseover="filter0(this);"  onmouseout="filter1(this);" onclick="return User_Send(event);" unselectable="on" class="bt" id="SendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">' + c19[13] + '</div></div>' +
    '<div onclick="showSendSel()" class="nicEdit-ocSendMsgDiv" id="ocSendMsgDiv" unselectable="on" style="right: 0px; z-index: 100; top: -48px; border-right: 1px solid rgb(218, 218, 218);"> <div unselectable="on" class="oc_div_smt_in"> ' +
    '<table width="100%" cellspacing="0" cellpadding="0" border="0" onselectstart="return false">' +
    '<tbody><tr class="" onclick="send_c_click(this,0)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> <td width="19" style="background-color:#eeeeee;padding:0px 3px;" class="left"><div class="cur"></div></td><td>&nbsp;' + c19[14] + '</td></tr>' +
    '<tr class="" onclick="send_c_click(this,1)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> <td style="background-color:#eeeeee;padding:0px 3px;" class="left"><div></div></td><td>&nbsp;' + c19[15] + '</td></tr> </tbody></table>' +
    '</div></div></div> </div></div></div></div>' +
    '<div id="leftDiv" style="position: absolute; width: 170px; height: 100%; left: 0px; top: 54px; background-color: rgb(255, 255, 255); overflow: hidden;display:' + (v0 ? "" : "none") + '"></div>' +
    '<div id="rightDiv" style="position: absolute; width: 125px; height: 100%; right: 0px; top:0px; background-color: rgb(255, 255, 255); overflow: hidden;display:' + (v1 ? "" : "none") + '">' +
    '<div style="height: 100%;margin-top:54px" id="rightDiv1"></div>' +
    '<div id="rightLogo" style="position: absolute; bottom: 0px; height: 130px; background-color: rgb(255, 255, 255); width: 100%;display:' + (v5 ? "" : "none") + '"></div></div>';

function init1() {
    var obj = $("FreeTextBox1_editor").contentWindow;
    var obj1 = navigator.appVersion.indexOf("MSIE 5.0") > -1 ? FreeTextBox1_editor.document : obj.document;
    obj1.open();
    obj1.write("<h" + 'tml name="FreeTextBox1_editor_html"><head><base target="_blank"><scr' + 'ipt language="javascript">try{if(window.HTMLElement){HTMLElement.prototype.__defineGetter__("outerText",function(){var r=this.ownerDocument.createRange();r.selectNodeContents(this);return r.toString();});}}catch(e){}function killErrors(){return true;}window.onerror = killErrors;</scr' + 'ipt><style type="text/css">body{word-break: break-all;margin: 0px; padding: 2px; border: 0px;height:76px;color:rgb(153, 153, 153);}p { margin-top:0px;margin-bottom:0px;}</style></head><body onkeydown="return parent.f11(event);"  onkeyup="return parent.f12(event)"  onmousedown="return parent.editclick(event);" onfocus="return parent.editfocus()" onblur="return parent.editblur()"></bo' + "dy>" + c13 + "</h" + "tml>");
    obj1.close();
    if (!/Opera|Firefox/.test(navigator.userAgent)) {
        obj1.body.contentEditable = true;
    }
    if (navigator.appVersion.indexOf("MSIE") == -1) {
        try {
            obj1.designMode = "On";
        } catch (e) {}
        obj1.addEventListener("paste", function(e) {
            if (e.clipboardData && e.clipboardData.items && e.clipboardData.items[0].type.indexOf("image") > -1) {
                var a = this,
                    file = e.clipboardData.items[0].getAsFile();
                var b = new FileReader();
                b.onload = function(e) {
                    obj1.execCommand("insertImage", false, this.result);
                };
                b.readAsDataURL(file);
            }
        });
    }
    var ooo = logolist.split("|");
    for (ww = 0; ww < ooo.length; ww++) {
        ooo[ww] = unescape(ooo[ww]);
    }
    if (v0) $("leftDiv").innerHTML = SetLogo(ooo[0], ooo[1], "left");
    if (v1) {
        $("rightDiv1").innerHTML = SetLogo(ooo[2], ooo[3], "right");
        $("rightLogo").innerHTML = SetLogo(ooo[4], ooo[5], "logo");
    }
}
function resizeChatWin() {
    $("chatContent").style.height = (geth() - 54 - parseInt($("chatOutput").style.bottom) - ($('pmtdiv').style.display == 'none' ? 0 : 25)) + "px";
    $("leftDiv").style.height = (geth() - 54) + "px";
    var left = v0 ? $("leftDiv") : null;
    var right = v1 ? $("rightDiv") : null;
    var center = $("centerMsg");
    if (!left) center.style.marginLeft = "0px";
    if (!right) center.style.marginRight = "0px";
    var bw = getw();
    if (bw < 480) {
        if (left && left.style.display != "none") {
            left.style.display = "none";
            center.style.marginLeft = "0px";
        }
        if (right && right.style.display != "none") {
            if (right) right.style.display = "none";
            center.style.marginRight = "0px";
        }
    } else if (bw >= 480 && bw < 770) {
        if (left && left.style.display != "none") {
            left.style.display = "none";
            center.style.marginLeft = "0px";
        }
        if (right && right.style.display == "none") {
            right.style.display = "";
            center.style.marginRight = "125px";
        }
    } else if (bw >= 770) {
        if (right && right.style.display == "none") {
            right.style.display = "";
            center.style.marginRight = "125px";
        }
        if (left && left.style.display == "none") {
            left.style.display = "";
            center.style.marginLeft = "170px";
        }
    }
    var _toolsbar1 = $("toolsbar1").style;
    if (_toolsbar1.left != "") _toolsbar1.left = (!left || left.style.display == "none" ? "11" : "181") + "px";
    if (_toolsbar1.right != "") _toolsbar1.right = (!right || right.style.display == "none" ? "11" : "136") + "px";
}