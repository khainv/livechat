module.exports = function() {
    var v2='';
    var v3='';
    var c45;
    var t3;
    var c92;
    var c15;
    this.bodyhtml=function(){
        var bodyhtml = '<div id="toolsbar1" style="height: 264px;left: 181px;display:none;z-index: 999;bottom: 130px;"></div>' +
            '<div style="position: absolute; top: 0px; display: block;background-color:' + v2 + ';" id="header">' +
            '<div class="img1" style="top:5px;left:10px;position: absolute;">' +
            '<img id="topimg" border="0" src="' + v3 + '" style="height: 24px;width: 24px;	border-radius: 18px;display:' + (v3 != "" ? "" : "none") + ';">' +
            '</div>' +
            '<div id="headerBox" class="toptitle" style="left: ' + (v3 != "" ? "40" : "12") + 'px;right:97px;">' +
            '<p id="prompttop" style="word-break:break-all;white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;">&nbsp;' + c45 + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="centerMsg" style="position: relative; margin-right: 125px; margin-left: 170px; height: 100%;">' +
            '<div id="chatOutput" style="bottom: 129px;top: 36px;position: absolute;">' +
            '<div id="pmtdiv" style="display:none;">' +
            '<img src="images/a1.gif" vspace="3" align="left" style="margin-top:4px;">' +
            '<div id="pmtdiv1">' +
            '</div>' +
            '</div>' +
            '<div style="overflow: auto;position:relative;*" class="border1Content" id="chatContent">' +
            '<div id="msgArea"></div>' +
            '<div class="kongge_msg"></div>' +
            '  </div>' +
            ' </div>' +
            '  <div id="userOptiv">' +
            '<div class="border1Content">' +
            '<div style="background-color:#f1f1f1;"></div>' +
            '  <div style="background-color:#f1f1f1;">' +
            '<div id="toolsbar">' +
            '<div class="telephone" id="telephone" style="display:none;border-radius: 14px;height: 22px; right: 5px;top: 3px;background-color: ' + v2 + ";border: 1px solid " + v2 + ';">' +
            '<input type="text" id="tel" class="bd" value="' + t3 + '" defaultval="'+t3+'" onfocus="inputfocus(this,1);showContent(5);" onblur="inputblur(this,1);hiddenContent();" style="border-radius: 14px 0 0 14px;height: 22px;line-height: 22px;">' +
            '<input type="button" id="telbtn" class="btn" style="border-radius: 0 14px 14px 0;height: 22px;background: ' + v2 + ' none repeat scroll 0 0;" value="' + c19[10] + '" onclick="LY_check1($(\'tel\'))" onmouseover="filter0(this);"  onmouseout="filter1(this);">' +
            '</div>' +
            '<div unselectable="on" class="panelContain">' +
            '<div unselectable="on" style="display:' + (c92 ? "" : "none") + '" class="toolbutton0" title="' + c19[1] + '">' +
            '<div class="toolbutton" style="background-position:0px -50px;"  onmouseover="showC1(0, this)"  onmouseout="hiddenC1(0, this);" onclick="showContent(1)" title="' + c19[1] + '"></div>' +
            '</div>' +
            '<div unselectable="on" id="tbut2" style="display:' + (l1 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[2] + '">' +
            '<div class="toolbutton" style="background-position:-700px -50px" onmouseover="showC1(-700, this)"  onmouseout="hiddenC1(-700, this)" onclick="showContent(4)"  title="' + c19[2] + '"></div>' +
            '</div>' +
            ' <div unselectable="on" id="tbut3" style="display:' + (l2 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[3] + '">' +
            '<div class="toolbutton" style="background-position:-650px -50px" onmouseover="showC1(-650, this)"  onmouseout="hiddenC1(-650, this)"  title="' + c19[3] + '">' +
            '<a href="tencent://message/?uin=' + l2 + '&Site=&Menu=yes" style="width: 26px; height: 24px;display:block;" id="tbut3h"></a>' +
            '</div>' +
            '</div>' +
            '<div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[4] + '">' +
            '<div class="toolbutton" style="background-position:-100px -50px" onmouseover="showC1(-100, this)"  onmouseout="hiddenC1(-100, this);" onclick="showContent(2)" title="' + c19[4] + '"></div>' +
            '</div>' +
            '<div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[5] + '">' +
            '<div class="toolbutton" style="background-position:-250px -50px" onmouseover="showC1(-250, this)"  onmouseout="hiddenC1(-250, this);" onclick="showContent(3)" title="' + c19[5] + '"></div>' +
            '</div>' +
            '<div unselectable="on" style="display:' + (c69 ? "" : "none") + '" class="toolbutton0" title="' + c19[8] + '">' +
            '<div class="toolbutton" style="background-position:-300px -50px" onmouseover="showC1(-300, this)"  onmouseout="hiddenC1(-300, this);" onclick="Capture();" title="' + c19[8] + '"></div>' +
            '</div>  ' +
            '<div unselectable="on" style="display:' + ((c75 && Telurl!='') ? "" : "none") + '" class="toolbutton0" title="' + c19[10] + '">' +
            '<div class="toolbutton" style="background-position:-450px -50px" onmouseover="showC1(-450, this)"  onmouseout="hiddenC1(-450, this)" title="' + c19[10] + '">' +
            '<a href="'+Telurl+'" style="width: 26px; height: 24px;display:block;"></a>' +
            '</div>' +
            '</div> ' +
            '<div unselectable="on" style="display:' + (c114 ? "" : "none") + '" class="toolbutton0" title="' + c19[7] + '">' +
            '<div class="toolbutton" style="background-position:-50px -50px" onmouseover="showC1(-50, this)"  onmouseout="hiddenC1(-50, this)" onclick="pingjia();" title="' + c19[7] + '"></div>' +
            '</div>  ' +
            '<div unselectable="on" style="display:' + (c38 ? "" : "none") + '" class="toolbutton0" title="' + c19[21] + '">' +
            '<div class="toolbutton" style="background-position:-150px -50px" onmouseover="showC1(-150, this)"  onmouseout="hiddenC1(-150, this);" onclick="savechat()" title="' + c19[21] + '"></div>' +
            '</div> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="sendMsgDiv"> ' +
            '<div class="editor_border">' +
            '<div id="lreditor">' +
            '<iframe id="FreeTextBox1_editor" name="FreeTextBox1_editor" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none; " frameborder="0" hspace="0" height="61" width="100%" ' + if_src() + '></iframe>' +
            '</div>' +
            '</div>' +
            '<div id="promptbar">' +
            '<div style="overflow:hidden;height:22px;line-height:20px;width:100%;margin-top:13px;">	     ' +
            '<ul id="promptbottom">' +
            '<div style="display: block; width:270px;" id="swtlogo">'+c15+'</div>' +
            '</ul>	   ' +
            '</div>' +
            '</div>' +
            '<div unselectable="on" id="SendBar">' +
            '<div class="bd1">' +
            '<div  onmouseover="filter0(this);"  onmouseout="filter1(this);" unselectable="on" class="bt" onclick="showSendSel()" id="selSendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">^</div>' +
            '<div  onmouseover="filter0(this);"  onmouseout="filter1(this);" onclick="return User_Send(event);" unselectable="on" class="bt" id="SendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">' + c19[13] + '</div>' +
            '</div>' +
            '<div onclick="showSendSel()" class="nicEdit-ocSendMsgDiv" id="ocSendMsgDiv" unselectable="on" style="right: 0px; z-index: 100; top: -48px; border-right: 1px solid rgb(218, 218, 218);"> ' +
            '<div unselectable="on" class="oc_div_smt_in"> ' +
            '<table width="100%" cellspacing="0" cellpadding="0" border="0" onselectstart="return false">' +
            '<tbody>' +
            '<tr class="" onclick="send_c_click(this,0)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> ' +
            '<td width="19" style="background-color:#eeeeee;padding:0px 3px;" class="left">' +
            '<div class="cur"></div>' +
            '</td>' +
            '<td>&nbsp;' + c19[14] + '</td>' +
            '</tr>' +
            '<tr class="" onclick="send_c_click(this,1)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> ' +
            '<td style="background-color:#eeeeee;padding:0px 3px;" class="left">' +
            '<div></div>' +
            '</td>' +
            '<td>&nbsp;' + c19[15] + '</td>' +
            '</tr> ' +
            '</tbody>' +
            '</table>' +
            '  </div></div></div> </div></div></div></div>';
        return bodyhtml;
    }
}
