var K_sysDomain='http://localhost:4000';
if (/Chrome|Firefox|rv:11\.0/.test(navigator.userAgent)) c13 = c19[18];
/*khainv addhttp add domain*/
function addhttp(a) {
    if (a.indexOf("://") == -1){
        a = LR_imgurl + a;
    }
    return a;
}
if (!savechat(1)){
    c38 = 0;
}
if (navigator.appVersion.indexOf("MSIE") == -1) {
    c69 = 0;
}
/*bien da dung*/
var K_lng='en';
var K_channel='1';
var K_sid='';
const socket = io(K_sysDomain);
var K_sysurl = K_sysDomain+'/kchat';
var K_sysimg=K_sysurl+'/imgs'
var K_domain=GetDomain();
var K_color2=unescape("%235ba4ed");
var c72 = unescape("Excellent - Rất tốt|Nice - Tốt|Normal - B%u00ecnh th%u01b0%u1eddng%7cPoor - T%u1ed3i%7cVery bad - C%u1ef1c t%u1ed3i");
var K_ico_admin=unescape(K_sysimg+"/v/ico_admin.gif");
var K_ico_user=unescape(K_sysimg+"/v/ico_client.gif");
var K_device=DetectDevice();
var cid='';
var c93 = 0;
var c44 = 0;
var K_chated=0;
var K_TimeNowStr=GetTimeNowStr();
var K_token='';
var K_use_id='';
/*biet da dung*/
var isFocus = false;
var shortcut = "Enter";
var fontobj = new Object();
fontobj.isbold = false;
fontobj.isitalic = false;
fontobj.isunderline = false;
fontobj.fontsize = 14;
var MaxID = 1;
var wordscheckstring = "|";
var timerID = null;
var newtext = "";
var newtext1 = "";
var sendingtext = "";
var presendtext = "";
var sendedtemptext = "";
var sending = 0;
var autoanswer0_time = 0;
var autoanswer1_time = 0;
var autoanswer2_time = 0;
var autoanswer3_time = 0;
var chatendcheck = 1;
var Intervalid = null;
var owordscount = 0;
var v10=0;
if (typeof K_cid == "undefined" || K_cid==''){
    var params=GetParamsUri('ChatBW3JS.js?cid');
    if(params.cid.length <1 || K_domain==''){
    }else{
        K_cid=params.cid;
    }
}
var K_cookieexpires=10;
if (typeof K_Os === "undefined" || K_Os=='' || K_Os==null) {K_Os = GetInfoOs();}
if (typeof K_Browser === "undefined" || K_Browser=={}) {K_Browser=GetInfoBrowser();}
if (typeof  GetCookie('K_cookieinfo')=== "undefined" || GetCookie('K_cookieinfo')=='' || GetCookie('K_cookieinfo')==null ) {
    SetCookie('K_cookieinfo','|'+ K_Os +'|'+K_Browser.name+'_'+K_Browser.version,K_cookieexpires);
}
if (typeof  GetCookie('K_room')=== "undefined" || GetCookie('K_room')=='' || GetCookie('K_room')==null ) {
    SetCookie('K_room',K_TimeNowStr+'_'+K_cid,K_cookieexpires);
}
if (typeof  GetCookie('K_room_type')=== "undefined" || GetCookie('K_room_type')=='' || GetCookie('K_room_type')==null ) {
    SetCookie('K_room_type','0',K_cookieexpires);
}
/*start online*/
K_room=GetCookie('K_room');
K_room_type=GetCookie('K_room_type');
var data={};
data.cid=K_cid;
data.sid=K_sid;
data.domain=K_domain;
data.device=K_device;
data.channel=K_channel;
data.group=GetCookie('K_cookieinfo');
data.browser=K_Browser;
socket.emit('ECliOnline',data);
//show input nhap sdt
function showtel(a){
    var obj=$("telephone").style;
    if(a){
        obj.display='none';return;
    }
    /*if (c75 && Telurl=='') obj.display = "block";*/
}
var rgstarted=0;
//f8('start')
function RGStart() {
    if(rgstarted){
        return;
    }
    rgstarted=1;
    if (typeof PostCall0 != "undefined"){
        PostCall0 = setInterval("PostCall1();", 1e4);
    }
    f8("start");
}
//check and show messages, show admin chat
function LastFunction() {
    setTimeout("resizeChatWin();", 500);
    if (typeof get_tag_and_mes() == "undefined") {
        setTimeout("LastFunction();", 50);
        return;
    }
    showtel();
}
function LY_end(a,b){
    if(a==0)
    {
        mes_append(b?n3:c6[17], 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    $('tel').value=t3;
}
function offbtn(){
    return '';
}
//call mes_append,f21
function robot(){
    mes_append(c10, 3, c85 + "&nbsp;" + GetNowTime(), true);
    f21(c6[0]);
}
function Trim(a){
    return a.replace(/(^\s*)|(\s*$)/g, '');
}
//check sdt
function isTel(a){
    if(lng!='cn' && lng!='big5')return true;
    var isPhone = /^0([0-9]{2,3}-|[1-9]{2,3})?[0-9]{7,8}$/;
    var isMob=/^((\+?86)|(\(\+86\)))?(1[34578][0123456789][0-9]{8})$/;
    return (isMob.test(a) || isPhone.test(a));
}
function LY_check1(obj){
    var tel=Trim(obj.value);if(tel==t3){return;}
    if(!isTel(tel))
    {
        return;
    }
    GuestTel='|'+encodeURIComponent(tel);
    var bb='tel='+escape(tel);
    if($('ccode1'))bb+='&ccode='+escape(Trim($('ccode1').value));
    bb+='&id='+escape(LR_websiteid)+'&sid='+escape(LR_sid)+'&cid='+escape(LR_cid)+'&lng='+escape(lng)+'&p='+escape(c50)+'&e='+escape(LR_ex)+'&un='+escape(LR_un)+'&ud='+escape(LR_ud);
    LR_hcloopJS(LR_sysurl+'lr/sendnote160711.aspx',bb);
}

function updateIMg1(){$('telephone').style.display='none';}
function inputfocus(obj,a){
    if(obj.value==getAttributeValue(obj,'defaultval'))obj.value = "";
    obj.style.color='black';
    if(!a)obj.style.border = "2px solid #82C6ED";
}
function inputblur(obj,a){
    if(obj.value=='')
    {
        obj.value = getAttributeValue(obj,'defaultval');
        obj.style.color='rgb(153, 153, 153)';
    }
    if(!a)obj.style.border = "1px solid #D5D5D5";
    if($('LY_pmt'))$('LY_pmt').innerHTML=c6[1];
    if($('tel_P'))$('tel_P').innerHTML=c6[13];
}
function hiddenC1(wy, sobj) {
    sobj.style.backgroundPosition = wy + "px -50px";
}

function showC1(wy, sobj) {
    sobj.style.backgroundPosition = wy + "px -100px";
}
function getAttributeValue(o, a) {
    if (!o.attributes) {
        return null
    }
    var b = o.attributes;
    for (var i = 0; i < b.length; i++) {
        if (a.toLowerCase() == b[i].name.toLowerCase()) {
            return b[i].value;
        }
    }
    return null;
}
var if_list = new Array();
/*showContent K_ co dung*/
function showContent(i) {
    var tar = $("toolsbar1");
    tar.style.display = "block";
    tar.style.right = "";
    tar.style.left = "11px";
    resizeChatWin();
    /*i==1 show icon smiles*/
    if (i == 1) {
        tar.style.height = "210px";
        tar.style.width = "360px";
        if (if_list[i] == null) {
            if_list[i] = document.createElement("div");
            with(if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = '<iframe id="Smile2_cn" style="border-style: none;height: 100%;width:100%" frameborder="0" hspace="0" scrolling="no" src="'+K_sysurl+'/Smile2_cn.html"></iframe>';
        } else {
            if (if_list[i].style.display != "none") {
                hiddenContent();
                return;
            }
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    if (i == 5) {
        tar.style.left = "";
        tar.style.right = "136px";
        resizeChatWin();
        tar.style.height = t0 + "px";
        tar.style.width = t1 + "px";
        if (if_list[i] == null) {
            if_list[i] = document.createElement("div");
            with(if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = t2;
        } else {
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    if (i == 4) {
        if ($("weixin_img") == null) {
            tar.style.height = "210px";
            tar.style.width = "300px";
        } else {
            tar.style.height = $("weixin_img").height + 35 + "px";
            tar.style.width = $("weixin_img").width + 20 + "px";
        }
        if (if_list[i] == null) {
            if_list[i] = document.createElement("DIV");
            with(if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = '<center><img id="weixin_img" src="' + l1 + '" border="0" onload="$(\'toolsbar1\').style.height=(this.height+35)+\'px\';$(\'toolsbar1\').style.width=(this.width+20)+\'px\';" style="margin: 10px 10px 3px 10px;"><br><INPUT type="button" value="' + c40 + '" ID="Button3" NAME="Button2" onclick="hiddenContent();" style="cursor: pointer;"></center>';
        } else {
            if (if_list[i].style.display != "none") {
                hiddenContent();
                return;
            }
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    /*i==2 send img || 1==3 send file*/
    if (i == 2 || i == 3) {
        wordscheckstring='1';
        if (wordscheckstring == null || wordscheckstring=='|') {
            hiddenContent();
            return;
        }
        if (uploading) {
            alert(c19[17]);
            hiddenContent();
            return;
        }
        tar.style.height = "90px";
        tar.style.width = "350px";
        //neu form != null
        if (if_list[i] != null && if_list[i].style.display != "none") {
            hiddenContent();
            return;
        }
        for (n = 2; n < 4; n++) {
            if (if_list[n] != null) {
                tar.removeChild(if_list[n]);
                if_list[n] = null;
            }
        }
        if_list[i] = document.createElement("div");
        with(if_list[i].style) {
            width = "100%";
            height = "100%";
            overflow = "hidden";
        }
        tar.appendChild(if_list[i]);
        if(i==2){
            /*var _action='' +K_sysurl + '/clientupimg';*/
            var _action='' +K_sysurl + '/demoupfile';
        }else{
            /*var _action='' +K_sysurl + '/clientupfile';*/
            var _action='' +K_sysurl + '/demoupfile';
        }

        if_list[i].innerHTML = '<iframe id="uploadFrame" name="uploadFrame" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none;  BORDER-BOTTOM-STYLE: none; HEIGHT: 100%;width:100%" scrolling="no" frameborder="0" hspace="0" '+if_src()+'></iframe>';
        var up = '<table cellspacing=1 cellpadding=0 width=100% border=0 id="Table1"><form action="' +_action + '" method="post" enctype="multipart/form-data" name="Form1" id="Form1" target="_self"><tr><td style="WIDTH: 60px;" noWrap>' + c27 + ":</td><td>" + c37 + '</td><td style="width:10px;"><input type="button" value="' + c40 + '" id="Button2" name="Button2" onclick="parent.hiddenContent();"></td></tr><tr><td noWrap>' + c41 + ':</td><td colspan=2><input type="hidden" name="cid" id="cid" value="'+K_cid+'"><input type="hidden" name="sid" id="sid" value="'+K_sid+'"><input type="hidden" name="domain" id="domain" value="'+K_domain+'"><input type="hidden" name="socketid" id="socketid" value="'+socket.id+'"><INPUT type="file" ID="File1" NAME="File1" style="width:100%;"></td></tr><tr><td noWrap>' + c42 + ':</td><td><INPUT type="text" ID="filenote" NAME="filenote" style="WIDTH: 100%;"></td><td><INPUT type="submit" value="' + c43 + '" ID="Button1" NAME="Button1" onclick="return parent.f29();"></td></tr></form></table>';
        var obj = uploadFrame.document;
        obj.open();
        obj.write('<html><head><style>*{font-size:9pt;}</style></head><body style="background-color: #fff;" scroll=no>' + up + "</body></html>");
        obj.close();
        hiddenContent(i);
    }
}
var uploading = false;//flag upload images
function f29() {
    var obj = uploadFrame.document.getElementById("File1");
    var v = obj.value;
    if (v == "") {
        alert(c18);
        obj.focus();
        return false;
    }
    obj = uploadFrame.document.getElementById("filenote");
    var v1 = obj.value;
    if (v1 == "") {
        obj.value = v.substring(v.lastIndexOf("\\") + 1);
    }
    hiddenContent();
    uploading = true;
    return true;
}
function hiddenContent(ii) {
    for (i = 0; i < if_list.length; i++) {
        if (if_list[i] != null) if_list[i].style.display = i != ii ? "none" : "block";
    }
    if (typeof ii == "undefined") {
        $("toolsbar1").style.display = "none";
    }
}

function SetFont1(fontobj1) {
    var obj = FreeTextBox1_editor.document;
    if (!fontobj1) return;
    fontobj = fontobj1;
    f22();
    f7();
}
/*SelSmile1 K co dung*/
function SelSmile1(smilesrc) {
    if (smilesrc) {
        if (get_tag_and_mes() == c13){
            f19("", false);
        }
        var ele = document.createElement("img");
        ele.src=smilesrc;
        ele.border=0;
        var obj=FreeTextBox1_editor.document.body;
        var targetEl=obj.lastChild;
        var parentEl = targetEl!=null?targetEl.parentNode:null;
        if(parentEl==null){
            obj.appendChild(ele);
        }
        else if(parentEl.lastChild == targetEl){
            parentEl.appendChild(ele);
        }else{
            parentEl.insertBefore(ele,targetEl.nextSibling);
        }
        f7();
    }
}
function f7() {
    var obj = $("input1");
    if (obj == null) obj = $("ccode");
    if (obj != null) {
        try {
            obj.focus();
            return;
        } catch (e) {}
    }
    window.setTimeout(function() {
        FreeTextBox1_editor.focus();
    },0);
}
//khainv f19 them text vao iframe messages
function f19(text, add) {
    var obj=FreeTextBox1_editor.document.body;
    if (add) {
        obj.innerHTML += text;
    } else {
        if (!obj) {
            return;
        }
        if(text==c13){
            obj.style.color='rgb(153, 153, 153)';
        }
        else{
            obj.style.color='black';
        }
        obj.innerHTML = text;
    }
}
function ConvertFontsize(size) {
    return "10pt";
}
//setup css for FreeTextBox1_editor
function f22() {
    var obj = FreeTextBox1_editor.document.body.style;
    obj.fontFamily = fontobj.fontname;
    obj.fontWeight = fontobj.isbold ? "bold" : "normal";
    obj.fontStyle = fontobj.isitalic ? "italic" : "normal";
    obj.fontSize = ConvertFontsize(fontobj.fontsize);
    obj.textDecoration = fontobj.isunderline ? "underline" : "none";
}
function showSendSel() {
    var o = $("ocSendMsgDiv");
    o.style.display = o.style.display == "block" ? "none" : "block";
}
var shortcutstring = "";
function send_c_click(o, t) {
    var es = o.getElementsByTagName("div");
    if (es && es[0]) es[0].className = "cur";
    var shortcut1 = "";
    if (t == 0) {
        o.nextSibling.getElementsByTagName("div")[0].className = "";
        shortcut1 = "Enter";
    } else {
        o.previousSibling.getElementsByTagName("div")[0].className = "";
        shortcut1 = "Ctrl + Enter";
    }
    if (shortcut == shortcut1) return;
    shortcut = shortcut1;
    shortcutstring = c21 + ":" + shortcut;
    f10(shortcutstring);
    f7();
}

function send_c_over(o) {
    o.className = "over";
    o.childNodes[0].className = "";
}

function send_c_out(o) {
    o.className = "";
    o.childNodes[0].className = "left";
}
//reset cac flag ve cac gia tri ban dau va show message
function closeme(end) {
    if (c8 == null) return;
    if (end == 1) {
        if (pj == "" && c82) {
            pingjia(2);
            return;
        } else {
            if (!confirm(n0)) {
                return;
            }
        }
        f13();
    } else if (end == 2) {
        if (!confirm(n0)) {
            return;
        }
        f13();
    }
    //reset flag ve gia tri ban dau
    wordscheckstring = null;
    if (Intervalid != null) {
        clearInterval(Intervalid);
        Intervalid = null;
    }
    if (timerID != null) {
        clearTimeout(timerID);
        timerID = null;
    }
    if (timerID_answermore != null) {
        clearTimeout(timerID_answermore);
        timerID_answermore = null;
    }
    $("msgArea").innerHTML = $("msgArea").innerHTML.replace(/onclick/g, "ronclick");
    f21(c0);
    if (c8 != null) {
        mes_append(c8, 1, "", true);
        c8 = null;
        mes_append('<input type="button" onmouseout="filter1(this);" onmouseover="filter0(this);" value="' + n2 + '" style="background: ' + v2 + ' none repeat scroll 0 0;margin-left: 20px;" class="btn1" onclick="window.location.reload();">'+offbtn(), 1, "", true);
    }
    resize();
}
//reset content khung chat
function editclick(e) {
    if (get_tag_and_mes() == c13) {
        f19("", false);
    }
}
function editfocus() {
    isFocus = true;
}
function editblur() {
    isFocus = false;
    var c = "a" + get_tag_and_mes() + "b";
    if (get_tag_and_mes() == "" && add_div_for_mes().toLowerCase().indexOf("img") < 0) {
        f19(c13, false);
    }
}
//show messages
//f20()=>mes_append()
function mes_append(html, type11, oname11, add) {
    //send messages to domain other
    if(type11>1){
        newmsg(html);
    }
    //rewrite html before show
    html = html_mes_opt(html.mes, type11, oname11);
    if (!isFocus) {
        window.focus();
    }
    if (add) {
        $("msgArea").innerHTML += html;
    } else {
        $("msgArea").innerHTML = html;
    }
    $("chatContent").scrollTop = 999999;
    setTimeout(' $("chatContent").scrollTop = 999999;', 700);
}
function mes_append_adm(html, type11, oname11) {
    //rewrite html before show
    html = html_mes_opt(html, type11, oname11);
    if (!isFocus) {
        window.focus();
    }
    $("msgArea").innerHTML += html;
    $("chatContent").scrollTop = 999999;
    setTimeout(' $("chatContent").scrollTop = 999999;', 700);
}
var s_tpc=0;var currentimg;
//remove "modalDiv_"+id
function closeimgdiv(id){
    LR_m_f(LR_m_d, true, false, false);
    document.body.removeChild($("modalDiv_"+id));
}
function imgclick(n,w,h){
    var id='tp'+n;currentimg=id;
    LR_m_d = LR_m_e(true, false, true);
    if(w+36>GetWidth())w=GetWidth()-54;
    if(h+52>GetHieght())h=GetHieght()-52;
    AddmodalDiv(id,'<center><img src="' + $(id).src + '" onload="this.width='+w+';this.height='+h+';"></center><a id="mbCloseLink" href="javascript:void(0)" onclick="closeimgdiv(\'' + id + '\');return false;"></a>',w+34,h+32);
}
//add images to obj
function f20_2_img1(obj) {
    if (obj.width <= 300) {
        return;
    }
    s_tpc++;
    var t = document.createElement("DIV");
    var href='<a href="javascript:void(0)" onClick="imgclick('+s_tpc+','+obj.width+','+obj.height+');return false;">'+c19[20] + '</a><br>';
    if (obj.parentNode.href) {
        href+='<a href="' + obj.parentElement.href + '" target="_blank">';
    }else{
        href+='<a href="javascript:void(0)" onClick="imgclick('+s_tpc+','+obj.width+','+obj.height+');return false;">';
    }
    obj.parentElement.replaceChild(t, obj);
    t.innerHTML = href+'<img id="tp'+s_tpc+'" src="' + obj.src + '" width="300"></a>';
}
//check send images khong an toan va show image
//f20_2_img(strhtml)=>replace_html_img(strhtml)
function replace_html_img(strhtml) {
    var arr, ptn, s, arr1, t;
    ptn = /<a.*?><img((?!onload=|width|>).)*>|<img((?!onload=|width|>).)*>/gi;
    arr = strhtml.match(ptn);
    if (arr != null) {
        for (i = 0; i < arr.length; i++) {
            s = arr[i];
            t = s.replace(/<img /gi, '<img onload="f20_2_img1(this);" ');
            strhtml = strhtml.replace(s, t);
        }
    }
    return strhtml;
}
//show mes theo muc
//f20_1(content, pclass, ona)=>html_mes_opt(content, pclass, ona)
function html_mes_opt(content, pclass, ona) {
    if (content.replace(/[\s\u3000]*/g, "") == "") return "";
    var str = "";
    if (pclass == 0) {
        str += '<div id="welcom1">'+content+'</div>';
    } else if (pclass == 1) {
        str = '<div class="other_msg">' + content + "</div>";
    } else if (pclass == 3) {
        str = '<div class="msg-box">';
        str += '<div class="msg-agent">';
        if (K_ico_admin != "") str += '<div class="agent-avatar"><img src="' + K_ico_admin + '" style="width:24px;"></div>';
        str += '<div class="arrow_box_left" style="margin-left:' + (K_ico_admin != "" ? "10" : "20") + 'px;">   ' + (ona ? '<div class="text1">' + ona + "</div>" : "") + '<div class="text">';
        str += replace_html_img(content);
        str += "</div></div>";
        str += "</div>";
        str += "</div>";
    } else {
        str = '<div class="msg-box">';
        str += '<div class="msg-client">';
        if (K_ico_user != ""){
            str += '<div class="client-avatar"><img src="' + K_ico_user + '" style="width:24px;"></div>';
        }
        str += '<div class="arrow_box" style="margin-right:' + (K_ico_user != "" ? "20" : "20") + 'px;">';
        str += '<div class="text">';
        str += replace_html_img(content);
        str += "</div>";
        str += "</div>";
        str += "</div>";
        str += "</div>";
    }
    return str;
}

function f20_11(html, type11, oname11) {
    if (type11 == 1) {
        html = '<div class="other_msg">' + html + "</div>";
    } else if (type11 == 2) {
        html = ' <div class="msg_cus"><div class="msg"><div class="after k_s_ol_pngFix"></div><span  style="font-size:14px;">' + html + "</span></div></div>";
    } else if (type11 == 3) {
        html = ' <div class="msg_cs"><div class="img1"></div><div class="msg"><div class="before k_s_ol_pngFix"></div>' + (oname11 ? '<div style="margin-top: -4px;color:#9a9a9a;">' + oname11 + "</div>" : "") + '<div style="margin-top: 3px;font-size:14px;">' + html + "</div></div></div>";
    } else if (type11 == 0) {
        html = '  <div class="welcom1">' + html + "</div>";
    }
    return html;
}
//khainv tra ve src trong
function if_src() {
    if (/rv:11.0;|SE 2.X MetaSr 1.0/.test(navigator.userAgent)) {
        return "";
    }
    return 'src="about:blank"';
}
/*khainv f21(show title cua nguoi dang chat)*/
function f21(html) {
    if (!isFocus) {
        window.focus();
    }
    $("prompttop").innerHTML = "&nbsp;" + html;
    floatleft(html.length <= 35);
}
var Interval1 = null;
/*khainv */
function floatleft(a) {
    var b, c, d;
    return a && null != Interval1 ? (clearInterval(Interval1), Interval1 = null, void 0) : (b = $("prompttop"),
        c = b.parentNode, b.parentNode.style.overflow = "hidden", b.style.textOverflow = "",
        b.style.overflow = "visible", d = 1, Interval1 = setInterval(function() {
        var a, e, f;
        return 3 > d && d > 0 ? (d++, void 0) : (a = b.scrollWidth, e = b.parentNode.clientWidth,
            f = c.scrollLeft, f = f ? f : 0, a > e + f ? (c.scrollLeft = f + 15, d = 0) : (c.scrollLeft = 0,
            d++), void 0);
    }, 700), void 0);
}
var serverkind = 0;
var serverkindname = "";
function testclick(n, s) {
    serverkind = n;
    serverkindname = unescape(s.replace("+", " "));
    if ($("servicekindlist") != null) $("servicekindlist").innerHTML = "<P>&nbsp;</p>";
    f21(c2.replace("%s1%", serverkindname));
}

function showChatpre() {
    LR_m_d = LR_m_e(true, false, true);
    AddmodalDiv("Chatpreobj", chatpre_show_content, 450);
    f7();
}

function closechat() {
    _BeforeWinExit = 1;
    window.location = "closeandcheckinvite.aspx?id=" + LR_siteid + "&sid=" + LR_sid + "&lng=" + lng + "&d=" + new Date().getTime();
}
//if n<10 add 0 vao truoc
function f2(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n.toString();
    }
}
//return H:m:s
function GetNowTime() {
    var d = new Date();
    return f2(d.getHours()) + ":" + f2(d.getMinutes()) + ":" + f2(d.getSeconds());
}
//check if(start or check)
function f14() {
    if (isstarted == 0) {
        f8("start");
        return;
    }
    if (serverkindname != "") {
        newtext += ",ACT_SERVERKIND|" + serverkind + "|" + encodeURIComponent(serverkindname);
        serverkindname = "";
    }
    if (GuestTel != "") {
        newtext += ",ACT_TEL|" + GuestTel;
        GuestTel = "";
    }
    if (pj != "" && pj != "1") {
        newtext += ",ACT_PJ|" + pj;
        pj = "1";
    }
    if (typeof reservecontent != "undefined" && reservecontent != "" && reservecontent != "1") {
        newtext += ",ACT_YY|" + reservecontent;
        reservecontent = "1";
    }
    f8("check");
}
var LRppid = "";
function showTime() {
    obj = $("pmtdiv");
    if (obj.style.display == "none") {
        obj.style.display = "";
        resize();
        c113 = unescape(c113.replace(/\\+/g, "%20"));
    }
    $("pmtdiv1").innerHTML = c113.replace("%s%", c112.toString());
    if (c112 == 0) {
        if (Intervalid != null) {
            clearInterval(Intervalid);
            Intervalid = null;
        }
        f8("end1");
    }
    c112--;
}
var timerID_answermore = null;
var chated_own=0;
//dxl
function autoanswermore() {
    if (c118 == "" || wordscheckstring == null) {
        if (timerID_answermore != null) {
            clearTimeout(timerID_answermore);
            timerID_answermore = null;
        }
        return;
    }
    if(c130==1){
        if(LR_getCookie('chated') == '1'){
            if(chated_own==0)return;
        }
        else{
            LR_SetCookie('chated', '1', 60);
            chated_own=1;
        }
    }
    if (autoanswer0_time == 0) {
        timerID_answermore = setTimeout("autoanswermore()", 1e3);
        return;
    }
    var ntime = new Date().getTime();
    var n = c118.indexOf(",");
    if (n > 0) {
        var s = c118.substring(0, n);
        var wtime = ntime - autoanswer0_time;
        var wtime1 = parseInt(s) * 1e3;
        if (wtime >= wtime1) {
            c118 = c118.substring(n + 1, c118.length);
            n = c118.indexOf("|");
            var tt = c118.substring(0, n).replace(/\+/g, "%20");
            c118 = c118.substring(n + 1, c118.length);
            addnewtext(",ACT_AR|" + tt);
            tt = decodeURIComponent(tt);
            mes_append(tt, 3, '', true);
        }
    }
    timerID_answermore = setTimeout("autoanswermore()", 1e3);
}
//them _text0 vao newtext1
function addnewtext(_text0) {
    if (newtext1.indexOf(_text0) == -1){
        newtext1 += _text0;
    }
}
//auto send messages mau
function autoanswer() {
    //neu doi tu van qua lau
    if (parseInt(c93) > 0 && parseInt(autoanswer0_time) > 0 && new Date().getTime() - parseInt(autoanswer0_time) > parseInt(c93) * 1e3) {
        c93 = 0;
        var tt = c94;
        addnewtext(",ACT_AR|" + escape(tt));
        mes_append(tt, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    //5 phut khong thay client tl, tu dong gui thong bao
    if (parseInt(c95) > 0 && parseInt(autoanswer1_time) > 0 && new Date().getTime() - parseInt(autoanswer1_time) > parseInt(c95) * 1e3 * 60) {
        autoanswer1_time = 0;
        var tt = c96;
        addnewtext(",ACT_AR|" + escape(tt));
        mes_append(tt, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    //15 phut khong thay client tl, tu dong gui thong bao
    if (parseInt(c97) > 0 && parseInt(autoanswer2_time) > 0 && new Date().getTime() - parseInt(autoanswer2_time) > parseInt(c97) * 1e3 * 60) {
        autoanswer2_time = 0;
        var tt = c98;
        addnewtext(",ACT_AR|" + escape(tt));
        mes_append(tt, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    //client cho lau, he thong se gui thong bao
    if (parseInt(c99) > 0 && parseInt(autoanswer3_time) > 0 && new Date().getTime() - parseInt(autoanswer3_time) > parseInt(c99) * 1e3) {
        autoanswer3_time = 0;
        var tt = c100;
        addnewtext(",ACT_AR|" + escape(tt));
        mes_append(tt, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
}
var lurl = "";
var isstarted = 0;
function start2(o) {
    autoanswer0_time = new Date().getTime();
    LRppid = o[5];
    if (o[0] != "1") timerID_answermore = setTimeout("autoanswermore()", 1e3);
}
//dxl
function getReady(returnvalue) {
    sending = 0;
    var isstart = 0;
    if (returnvalue == "r") {
        if (sendingtext != ""){
            sendingtext = "";
        }
        if (wordscheckstring != null) {
            clearTimeout(timerID);
            timerID = null;
            timerID = setTimeout("f14()", 2e3);
        }
        autoanswer();
        return;
    }
    if (returnvalue == "" || returnvalue == null || returnvalue.indexOf("err") == 0) {
        if (wordscheckstring != null) {
            clearTimeout(timerID);
            timerID = null;
            timerID = setTimeout("f14()", 2e3);
        }
        autoanswer();
        return;
    }
    isstarted = 1;
    var rr = returnvalue.split(",");
    for (w = 0; w < rr.length; w++) {
        if (rr[w] == "") {
            continue;
        }
        if (rr[w] == "noinput") {
            f10(shortcutstring == "" ? c15 : shortcutstring);
            continue;
        }
        var o = rr[w].split("|");
        if (o.length > 1 && o[0] == "inputting") {
            f10(c86.replace("{0}", unescape(o[1].replace(/\+/g, "%20"))));
            continue;
        }
        if (o.length > 1 && o[0] == "upload") {
            if (o[1] == "ReceivingData") {
                continue;
            }
            uploading = false;
            return;
        }
        if (o.length != 6) continue;
        if (sendingtext != "") sendingtext = "";
        o[1] = o[1].replace(/\+/g, "%20");
        o[5] = o[5].replace(/\+/g, "%20");
        o[1] = html_replace_elements(unescape(o[1]));
        o[4] = o[4].replace(/\+/g, "%20");
        o[4] = unescape(o[4]);
        o[5] = unescape(o[5]);
        if (o[0] == "-1") {
            if (timerID != null) {
                clearTimeout(timerID);
                timerID = null;
            }
            getReady("r");
            _BeforeWinExit = 1;
            f21(o[1]);

            return;
        }
        if (o[3] != "") {
            if (o[4].indexOf("start") != 0) {
                if (wordscheckstring != null && wordscheckstring.indexOf("|" + o[3] + "|") != -1) {
                    continue;
                }
                wordscheckstring += o[3] + "|";
                MaxID = o[3];
            }
            switch (o[2]) {
                case "1":
                    if (o[1].toString().indexOf("%name%") > -1) {
                        o[1] = o[1].toString().replace("%name%", "<b>" + o[5] + "</b>");
                    }
                    f21(o[1]);
                    break;

                case "17":
                    uploading = false;
                    mes_append(o[1], 2, "", true);
                    break;

                case "16":
                    uploading = false;
                    o[1] = o[1].toString().replace("%c%", "<b>" + c23 + "</b>");
                    mes_append(o[1], 1, "", true);
                    break;

                case "18":
                    o[1] = o[1].toString().replace("%c%", "<b>" + c23 + "</b>");
                    mes_append(o[1], 2, "", true);
                    break;

                case "43":
                    pingjia();
                    break;

                case "37":
                    var ooo = o[1].split("|");
                    for (ww = 0; ww < ooo.length; ww++) {
                        ooo[ww] = ooo[ww].replace(/\+/g, "%20");
                        ooo[ww] = unescape(ooo[ww]);
                    }
                    if (ooo.length < 6) break;
                    if (ooo[0].length > 0) title0 = window.document.title = ooo[0];
                    if (ooo[1].length > 0 && $("rightDiv1")) $("rightDiv1").innerHTML = SetLogo(ooo[1], ooo[2], "right");
                    if (ooo[3].length > 0) {
                        l1 = ooo[3];
                        $("tbut2").style.display = "";
                    }
                    if (ooo[4].length > 0) {
                        l2 = ooo[4];
                        $("tbut3h").href='tencent://message/?uin=' + l2 + '&Site=&Menu=yes';
                        $("tbut3").style.display = "";
                    }
                    if (ooo[5].length > 0) {
                        v3 = ooo[5];
                        if($("topimg"))$("topimg").src = v3;
                    }
                    break;

                case "46":
                    LR_oname0530 = o[5];
                    YuYue();
                    break;

                case "50":
                    IFrameOpen(o[1]);
                    break;

                case "-3":
                    c93 = -1;
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    o[5]=o[5].replace("HTTP/1.1 100 Continue", "");
                    if(o[5]==c85)o[1]=o[1]+RB1();
                    mes_append(o[1], 3, o[5] + "&nbsp; " + o[0], true);
                    play();
                    break;
                case "-2":
                    mes_append(o[1], 2, "", true);
                    break;
                case "3":
                    if (o[5] == "") break;
                    if (chatendcheck && c112 > 0) {
                        chatendcheck = 0;
                        Intervalid = window.setInterval("showTime()", 1e3);
                    }
                    c93 = -1;
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    o[5]=o[5].replace("HTTP/1.1 100 Continue", "");
                    if(o[5]==c85)o[1]=o[1]+RB1();
                    mes_append(o[1], 3, o[5] + "&nbsp;" + GetNowTime(), true);
                    owordscount++;
                    play();
                    break;

                case "20":
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    mes_append(o[1], 0, "", true);
                    break;

                case "4":
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    var oooo = o[1].split("|");
                    if (oooo.length == 2) {
                        if (oooo[0] != "") {
                            alert(unescape(oooo[0].replace(/\\+/g, "%20")));
                        }
                        f8("end");

                        lurl = unescape(oooo[1]);
                        if (lurl.substring(0, 9) == "transfer:") {
                            lurl = lurl.substring(9, lurl.length);
                        } else {
                            lurl = "custom_url.aspx?url=" + unescape(oooo[1]);
                        }
                        setTimeout("window.location=lurl;", 1500);
                    } else if (oooo.length == 1) {
                        window.open(o[1], o[3], "");
                    }
                    break;

                case "22":

                    window.location = o[1];
                    break;

                default:
                    break;
            }
        }
        switch (o[4]) {
            case "start":
                start2(o);
                isstart = 1;
                break;

            case "start1":
                c93 = 0;
                start2(o);
                isstart = 1;
                break;

            case "restart":
                f8("start");
                return;

            case "end":
                closeme();
                return;

            case "print":
                f21(o[1]);
                break;

            case "direct":
                alert(o[1]);
                f21(o[1]);
                closeme();
                return;

            case "exit":
                closeme();
                return;
        }
    }
    if (sendingtext != "") {
        sendingtext = "";
    }
    if (wordscheckstring != null) {
        clearTimeout(timerID);
        timerID = null;
        timerID = setTimeout("f14()", !isstart ? 2e3 : 1);
    }
    autoanswer();
}

var GuestTel = "";

function Freecall() {
    if (wordscheckstring == null) return;
    OpenDialog("freecall_" + lng + ".aspx", 348, 230);
}

function Freecall1(guestname, tel) {
    GuestTel = encodeURIComponent(guestname) + "|" + encodeURIComponent(tel);
}
//do du lieu vao div #swtlogo
/*f10 K co dung*/
function f10(text) {
    if (text == "") {
        $("swtlogo").innerHTML = c15;
        return;
    }
    if (c44) {
        text = '<img src="../imgs/secure.gif"  alt="SSL 128 bit"> ' + text;
    }
    if ($("swtlogo").innerHTML != text){
        $("swtlogo").innerHTML = text;
    }
}
var clearhtml = false;
function AddLine() {
    var doc = frames["FreeTextBox1_editor"].document,
        sel = doc.selection,
        rng;
    if (sel) {
        rng = sel.createRange();
        rng.pasteHTML("<br>");
        rng.move("character ", 1);
        rng.select();
        rng.collapse(true);
    } else {
        sel = doc.getSelection();
        rng = sel.getRangeAt(0);
        var br = doc.createElement("br");
        var nrng = doc.createRange();
        w = doc.createTextNode("​");
        rng.insertNode(w);
        rng.insertNode(br);
        nrng.selectNode(w);
        sel.removeAllRanges();
        sel.addRange(nrng);
        sel.collapse(w, 1);
    }
}
function excludeE(strhtml) {
    var arr, ptn, s, t;
    ptn = /<.*?onresize.*?>/gi;
    arr = strhtml.match(ptn);
    if (arr == null) return strhtml;
    for (i = 0; i < arr.length; i++) {
        s = arr[i];
        t = s.replace(/onresize/gi, "onresize" + i);
        strhtml = strhtml.replace(s, t);
    }
    return strhtml;
}
//add mes to div
//f18()=>add_div_for_mes()
function add_div_for_mes() {
    var obj = FreeTextBox1_editor.document.body;
    //return obj ? '<div style="' + obj.style.cssText.replace(/color: black;/i,'') + '">' + excludeE(obj.innerHTML) + "</div>" : "";
    return obj ? excludeE(obj.innerHTML) : "";
}
//get content of body iframe
/*f18_out K co dung*/
//f18_out()=>get_tag_and_mes()
function get_tag_and_mes() {
    var obj = FreeTextBox1_editor.document.body;
    return obj ? obj.outerText : "";
}
var c74 = 0;
//xuly message and send messsages
function User_Send(e) {
    var tempouttext = Trim(get_tag_and_mes().replace(/\\n/g, ""));
    var temphtml = html_replace_elements(add_div_for_mes());
    //text rong
    if ((tempouttext == c13 || tempouttext == "") && temphtml.toLowerCase().indexOf("img") == -1) {
        f10(c4);
        f7();
        return false;
    }
    var ml = 8e3;
    var imgStr = temphtml.replace(/<\s?img.+?src=[\""]data:image\/png;base64,[^>]*>/gi, "");
    //nhap qua ky tu cho phep
    if (escape(imgStr).length > ml) {
        f10(c120.replace("{0}", imgStr.length.toString()));
        return false;
    }
    if((wordscheckstring == null ) && c85==null){
        var txt=temphtml.replace(/<br>/g, '\r\n');
        f19(txt, false);
        f19("", false);
        return;
    }
    if (wordscheckstring == null) return false;
    f19("", false);
    f7();
    if (newtext != "") {
        newtext += "," + encodeURIComponent(temphtml);
    } else {
        presendtext += "," + encodeURIComponent(temphtml);
    }
    if (MaxID != 0){
        var obj={mes:temphtml}
        mes_append(obj, 2, "", true);
    }
    if (c93 == -1){
        autoanswer3_time = new Date().getTime();
    }
    clearTimeout(timerID_answermore);
    timerID_answermore = null;
    return true;
}
//hide #modalDiv_Pingjiaobj
function HidePingjiaobj(end) {
    LR_m_f(LR_m_d, true, false, false);
    var div = $("modalDiv_Pingjiaobj");
    div.style.display = "none";
    if (end == 2) closeme(2);
}
var pj = "";//danh gia
//create iframe danh gia
function pingjia(end) {
    if (wordscheckstring == null) return;
    var div = $("modalDiv_Pingjiaobj");
    if (div != null && div.style.display != "none"){
        return;
    }
    //createElement(iframe)
    LR_m_d = LR_m_e(true, false, false);
    if (div == null) {
        var mainhtm = '<table id="Table_pingjia" cellSpacing="8" cellPadding="0" align="center" border="0"><tr><td height="25"><b>' + n1 + "</b></td></tr><tr><td >" + c77 + "</td></tr><tr><td>";
        var pj_rr = c72.split("|");
        for (w = 0; w < pj_rr.length; w++) {
            if (pj_rr[w] == "") {
                continue;
            }
            mainhtm += '<input type="radio" id="pj' + w.toString() + '" name="pj"   value="' + pj_rr[w] + '" ' + (w == 0 ? "checked" : "") + " />" + pj_rr[w] + " ";
        }
        mainhtm += '</td></tr><tr><td height="25" valign="bottom">' + c78 + '</td></tr><tr><td><TEXTAREA rows="8" cols="42"  name="note"  id="note"  style="BORDER-RIGHT: navy 1px solid; BORDER-TOP: navy 1px solid; FONT-SIZE: 10pt; BORDER-LEFT: navy 1px solid; WIDTH: 100%; BORDER-BOTTOM: navy 1px solid; BORDER-LEFT: navy 1px solid; HEIGHT: 75px"></TEXTAREA></td></tr><tr><td height="5"></td></tr><tr><td align="center" id="td_19"><input type="button" class="btn1" style="background-color: ' + K_color2 + ';" value="' + c79 + '" onclick="pingjia1(' + end + ');" onmouseover="filter0(this);"  onmouseout="filter1(this);"> <input type="button" class="btn1" style="background-color: ' + K_color2 + ';margin-left:20px;" value="' + c80 + '" onclick="HidePingjiaobj(' + end + ');" onmouseover="filter0(this);"  onmouseout="filter1(this);">	</td></tr></table>';
    }
    AddmodalDiv("Pingjiaobj", mainhtm);
    $("note").focus();
}
//send danh gia
function pingjia1(end) {
    var note = $("note").value;
    var pj0 = "";
    var pj_rr = c72.split("|");
    for (w = 0; w < pj_rr.length; w++) {
        if (pj_rr[w] == "") {
            continue;
        }
        if ($("pj" + w.toString()).checked) {
            pj0 += $("pj" + w.toString()).value;
        }
    }
    mes_append(c119, 1, "", true);
    pj = encodeURIComponent(pj0) + "|" + encodeURIComponent(note);
    HidePingjiaobj();
    if (end == 2) closeme(2);
}
var CaptureCount = 0;
function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}
function export_raw(htm) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([htm]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = "chat.html";
    fake_click(save_link);
}
//save chat
function savechat(test) {
    var htm;
    if (!test) {
        htm = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><base target="_blank"><script type="text/javascript" src="' + LR_imgurl + 'ChatBW2JS1.aspx"></script><link href="' + LR_imgurl + 'lrchatBW.css" rel="stylesheet" type="text/css" /><body style="overflow:auto;">' + $("msgArea").outerHTML + '<div style="height:20px"></div></body>';
    }
    if (/Chrome|Firefox/.test(navigator.userAgent)) {
        if (!test) export_raw(htm);
    } else if (isIe()) {
        if (!test) saveie(htm);
    } else {
        return false;
    }
    return true;
}
function saveie(htm) {
    var d = document.createElement("DIV");
    with(d.style) {
        width = "0";
        height = "0";
        display = "none";
    }
    document.body.appendChild(d);
    d.innerHTML = '<iframe id="saFrame" name="saFrame" '+if_src()+'></iframe>';
    var obj = saFrame.document;
    obj.open();
    obj.write(htm);
    obj.close();
    obj.execCommand("SaveAs", false, "chat.html");
    document.body.removeChild(d);
}
//bat dieu kien roi PostCall
function f8(acttype) {
    var poststr;
    //if thoa man dk thi PostCall
    if (acttype == 'check') {
        if (sending) {
            return;
        }
        sending = 1;
        if (sendingtext == '') {
            var temptext = newtext.length > 200 ? '' : ',ACT_TEMP|' + (isFocus ? '1' : '0') + '|' + encodeURIComponent(Trim(get_tag_and_mes().replace(c13, '')).substring(0, 100));
            if (parseInt(c109) > 0 && parseInt(autoanswer0_time) > 0 && (new Date().getTime() - parseInt(autoanswer0_time)) > parseInt(c109) * 1000) {
                c109 = 0;
                temptext += ',ACT_r0';
            }
            if (parseInt(c110) > 0 && parseInt(autoanswer3_time) > 0 && (new Date().getTime() - parseInt(autoanswer3_time)) > parseInt(c110) * 1000) {
                autoanswer3_time = 0;
                temptext += ',ACT_r1';
            }
            if (sendedtemptext != temptext) {
                newtext += temptext;
                sendedtemptext = temptext;
            }
            poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&maxid=' + MaxID + '&_text=' + escape((newtext + newtext1 + presendtext).replace(/\\+/g, '%2b')) + '&lng=' + lng;
            sendingtext = newtext + presendtext;
            newtext = newtext1 = presendtext = '';
        } else {
            poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&maxid=' + MaxID + '&_text=' + escape(sendingtext.replace(/\\+/g, '%2b')) + '&lng=' + lng;
        }
        if (LRppid != '') poststr += '&pp=' + LRppid;
        PostCall(LR_sysurl + 'LR/CdCheck.aspx?sid1='+LR_sid, poststr);
    } else if (acttype == 'start') {
        poststr = 'websiteid=' + LR_websiteid + '&p=' + escape(c50)+ '&sid=' + LR_sid + '&cid=' + LR_cid + '&ex=' + LR_ex + '&lng=' + lng + '&un=' + LR_un + '&ud=' + LR_ud ;
        PostCall(LR_sysurl + 'LR/CdStart1.aspx?sid1='+LR_sid, poststr + '&d=' + new Date().getTime());
    } else if (acttype == 'end') {
        poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&lng=' + lng;
        if (pj != '' && pj != '1') poststr += '&pj=' + pj;
        if (typeof(reservecontent) != 'undefined' && reservecontent != '' && reservecontent != '1') poststr += '&yuyue=' + reservecontent;
        PostCall(LR_sysurl + 'LR/CdEnd.aspx?sid1='+LR_sid, poststr);
    } else if (acttype == 'end1') {
        poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&lng=' + lng + '&k=1';
        PostCall(LR_sysurl + 'LR/CdEnd.aspx?sid1='+LR_sid, poststr);
    }
}
function isIe() {
    return ( !! window.ActiveXObject || "ActiveXObject" in window) ? true : false;
}
if (!isIe()) {
    document.write('<audio id="sound1" preload="auto" src="'+K_sysurl+'/sounds/sound.wav"></audio>');
} else {
    document.write('<bgsound id="sound" loop="1"  />');
}
function play() {
    if (!isIe()) {
        $("sound1").play();
    } else {
        $("sound").src = K_sysurl+"/sounds/sound.wav";
    }
}
window.$ = function(id) {
    return document.getElementById(id);
};
function LR_GetObj(id){
    return document.getElementById(id);
};
function filter0(sobj) {
    sobj.style.backgroundColor = "#45c01a";
}
//set backgroundColor
function filter1(sobj) {
    sobj.style.backgroundColor = K_color2;
}
//resize LR_m_d
function resize() {
    resizeChatWin();
    AddmodalDiv("Pingjiaobj", 1);
    AddmodalDiv(currentimg, 1);
    if (LR_m_d != null) {
        with(LR_m_d.style) {
            width = '100%';
            height = '100%';
        }
    }
    var myElem = document.getElementById('chatContent');
    if (myElem !== null){
        myElem.scrollTop = 999999;
    };
}
window.onresize = resize();
//createElement('DIV') #modalDiv_+_id
function AddmodalDiv(_id, _html, _width, _height, _left, _top) {
    var div = $("modalDiv_" + _id);
    if (_html != 1) {
        if (div == null) {
            div = document.createElement("DIV");
            div.id = "modalDiv_" + _id;
            with(div.style) {
                zIndex = 999999;
                width = (!_width ? 380 : _width) + "px";
                if (_height) height = (!_height ? 240 : _height) + "px";
                position = "absolute";
                display = "none";
                border = "none";
                margin = padding = 0;
                document.body.insertBefore(div, document.body.firstChild);
                div.innerHTML = _html.indexOf('<div')==0?_html:'<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td width="17" height="16" style="background:url(img_circle/a-1.gif)"></td><td style="background:url(img_circle/c-1.gif);background-repeat: repeat-x;"></td><td width="17" style="background:url(img_circle/a-2.gif)"></td></tr><tr><td style="background:url(img_circle/a-5.gif);background-repeat: repeat-y;"></td><td style="background-color:#ffffff;" valign="top" align="center">' + _html + '</td><td style="background:url(img_circle/a-6.gif);background-repeat: repeat-y;"></td></tr><tr><td width="17" height="16" style="background:url(img_circle/a-3.gif)"></td><td style="background:url(img_circle/c-3.gif);background-repeat: repeat-x;"></td><td width="17" style="background:url(img_circle/a-4.gif)"></td></tr></table>';
            }
        }
        div.style.display = "";
    }
    if (div != null) {
        div.style.left = (!_left ? (getw() - div.clientWidth) / 2 : _left) + "px";
        div.style.top = (!_top ? (geth() - div.clientHeight) / 2 : _top) + "px";
    }
}
//set logo
function SetLogo(logosrc1, logolink1, kind) {
    var sysurl = LR_imgurl.replace("/lr/", "/");
    if (logosrc1 == "") {
        return "";
    }
    logosrc1 = logosrc1.toLowerCase();
    if (logosrc1.indexOf("http") != 0) logosrc1 = sysurl + logosrc1;
    else {
        logosrc1 = c44 ? logosrc1.replace("http://", "https://") : logosrc1.replace("https://", "http://");
    }
    var w = kind == "left" ? "170" : "125";
    var h = kind == "logo" ? "130" : "125";
    if (logosrc1.lastIndexOf(".gif") == logosrc1.length - 4 || logosrc1.lastIndexOf(".jpg") == logosrc1.length - 4 || logosrc1.lastIndexOf(".png") == logosrc1.length - 4) {
        logosrc1 = '<img src="' + logosrc1 + '" border="0" ' + (kind == "logo" ? 'width="' + w + '"  height="' + h + '"' : ' onload="if(this.width>' + w + ")this.width=" + w + ';"') + ">";
        if (logolink1 != "") {
            return '<a href="' + logolink1 + '" target="_blank">' + logosrc1 + "</a>";
        }
    }
    if (logosrc1.lastIndexOf(".swf") == logosrc1.length - 4) {
        return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + (c44 ? "https:" : "http:") + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,42,0" id="f1" width="125" height="300"  VIEWASTEXT><param name="movie" value="' + logosrc1 + '"> <param name="bgcolor" value="#FFFFFF"><param name="quality" value="high"> <param name="allowscriptaccess" value="never"> <embed type="application/x-shockwave-flash" pluginspage="' + (c44 ? "https:" : "http:") + '//www.macromedia.com/go/getflashplayer" width="125" height="300"  name="f1" src="' + logosrc1 + '" bgcolor="#FFFFFF" quality="high" swLiveConnect="true" allowScriptAccess="never" ></embed></object>';
    }
    if (logosrc1.lastIndexOf(".js") != logosrc1.length - 3) {
        return '<iframe frameborder="0" scrolling="no" id="advfm" style="border-top-style: none; border-right-style: none; border-left-style: none; border-bottom-style: none" src="' + logosrc1 + '" height="100%" width="' + w + '"></iframe>';
    }
    return "";
}
function RB1(a){
    return '<hr style="border-top: 1px solid #d5d5d5;margin-top:5px;margin-bottom:5px;"><span style="color: #8a8a8a;line-height: 19px;font-size:12px;">'+c19[24]+' '+((a && c36)?'<font style="cursor:pointer;color:#000;text-decoration: underline; " onclick="RGStart()">'+c19[25]+'</font>':'')+'</span>';
}
//reload lai trang
function RB(txt) {
    if(txt=='reload'){
        window.location.reload();
        return;
    }
    mes_append(txt+RB1(1), 3, c85 + "&nbsp;" + GetNowTime(), true);
}
function hideme() {
    var cmd={};
    cmd.a='hide';
    window.parent.postMessage(cmd, '*');
}
/*K co dung*/
function newmsg(data) {
    var dat={};
    dat.use_id=K_use_id;
    dat.mes=data.mes;
    dat.icon=K_ico_user;
    dat.cid=K_cid;
    dat.token=K_token;
    dat.id=socket.id;
    dat.roo_type=K_room_type;
    if(K_chated==0){
        socket.emit('ECliSendToAll',dat);
    }else{
        socket.emit('ECliSendToRoom',dat);
    }
}
/*SOCKET*/
socket.on('up_img_true',function(data){
    uploading=false;
    mes_append(data,3,'',1);
})
socket.on('up_img_failed',function(){
    alert('Upload file failed');
})
socket.on('ESerSendMesToRoom',function(data){
    K_chated=1;
    mes_append_adm(data.mes,3,'Admin');
    play();
})
socket.on('ESerResCliOnline',function (data) {
    K_use_id=data.user_id;
    K_token=data.token;
    play();
})
/*END SOCKET*/
var timerID_title; var step_title = 0; function flash_title() { if(isFocus){flash_title1();return;}clearTimeout(timerID_title); step_title++; switch (step_title) { case 4: document.title = title1; step_title = 0; break; case 1: document.title = '*' + title1; break; case 2: document.title = '**' + title1; break; case 3: document.title = '***' + title1; break; } timerID_title = setTimeout('flash_title()', 200); } function flash_title1() {if(timerID_title!=null){clearTimeout(timerID_title); timerID_title=null;document.title = title0;} }
var LR_m_d=null;
function LR_m_e(p1,p2,p3){
    if(LR_m_d!=null)return null;
    var div=document.createElement('DIV');
    div.id='LR_m_h_'+new Date().getTime();
    with(div.style){
        zIndex=8998;
        top='0px';
        left='0px';
        width='100%';
        height='100%';
        border='none';
        margin=padding=0;
        position='absolute';
        backgroundColor='#000';
        opacity='0.2';
        filter='alpha(opacity=20)';
        duration=1000;
    }
    document.body.insertBefore(div,document.body.firstChild);
    if(!p3)LR_m_a('SELECT');
    if(!p2)LR_m_a('OBJECT');
    if(!p1)LR_m_a('IFRAME');
    LR_m_c(div);
    return div;
}
//resize width and hieght for obj
function LR_m_c(obj){
    obj.style.width='100%';
    obj.style.height='100%';
    var bodyCW=0,bodyCH=0;
    if(document.documentElement&&document.documentElement.clientWidth){
        bodyCW=document.documentElement.clientWidth;
    }else if(window.innerWidth){
        bodyCW=window.innerWidth;
    }else if(document.body){
        bodyCW=document.body.clientWidth;
    }
    if(window.innerHeight){
        bodyCH=window.innerHeight;
    }else if(document.documentElement&&document.documentElement.clientHeight){
        bodyCH=document.documentElement.clientHeight;
    } else if(document.body){
        bodyCH=document.body.clientHeight;
    }
    setTimeout(function(){
        bodyCW=Math.max(document.body.scrollWidth,bodyCW);
        bodyCH=Math.max(document.body.scrollHeight,bodyCH);
        obj.style.width=bodyCW+'px';
        obj.style.height=bodyCH+'px';
    },1);
}
//set style.visibility AND removeAttribute('LR_m_g')
function LR_m_b(TagName){
    var   s=document.getElementsByTagName(TagName);
    for(var i=0,n=s.length;i<n;i++){
        if(s[i].id=='LR_Flash'){
            continue;
        }
        s[i].style.visibility=s[i].getAttribute('LR_m_g');
        s[i].removeAttribute('LR_m_g');
    }
};
//LR_m_a set style.visibility='hidden';
function LR_m_a(TagName){
    var   s=document.getElementsByTagName(TagName);
    for(var i=0,n=s.length;i<n;i++){
        if(s[i].id=='LR_Flash'){
            continue;
        }
        s[i].setAttribute('LR_m_g',s[i].style.visibility,0);
        s[i].style.visibility='hidden';
    }
};
//remove obj And set style.visibility AND removeAttribute('LR_m_g')
function LR_m_f(obj,p1,p2,p3){
    if(LR_m_d==null)return;
    try{
        if(obj){
            document.body.removeChild(obj);
            LR_m_d=null;
            if(!p3)LR_m_b('SELECT');
            if(!p2)LR_m_b('OBJECT');
            if(!p1)LR_m_b('IFRAME');
        }}catch(e){}
};
//del 1 kytu
function f3(e){
    if(e && (e.keyCode==8 || (e.altKey && e.keyCode==37))){
        var tg=(e.target || e.srcElement);
        if(tg.type=='text' || tg.type=='textarea'){
            e.returnValue=true;
            return;
        }
        if (window.event) {
            e.cancelBubble=true;
        } else{
            e.preventDefault();
        }
        e.returnValue=false;
    }
}
var clearhtml=false;
//xuong dong
function AddLine() {
    var doc = frames["FreeTextBox1_editor"].document, sel = doc.selection, rng;
    if (sel) {
        rng = sel.createRange();
        rng.pasteHTML('<br>');
        rng.move("character", 1);
        rng.select();
        rng.collapse(true);
    }
    else {
        sel = doc.getSelection();
        rng = sel.getRangeAt(0);
        var br = doc.createElement('br');
        var nrng = doc.createRange();
        w = doc.createTextNode('\u200B');
        rng.insertNode(w);
        rng.insertNode(br);
        nrng.selectNode(w);
        sel.removeAllRanges();
        sel.addRange(nrng);
        sel.collapse(w, 1);
    }
}
//xu ly va gui tin nhan
function f11(evt){
    if(get_tag_and_mes()==c13){
        f19('',false);
    }
    evt = evt || window.event;
    var keyCode=evt.keyCode;
    var ctrlKey=evt.ctrlKey;//ctrl pressed return true
    var altKey=evt.altKey;//alt pressed return true
    if(altKey && evt.keyCode==37){
        evt.cancelBubble = true;
        evt.returnValue=false;
        return;
    }
    //ctrl+enter (xuong dong)
    if ((keyCode == 13) && shortcut=='Enter' && ctrlKey){
        AddLine();
        return false;
    }
    //gui mes bang enter
    if ((keyCode == 13) && shortcut=='Enter'){
        clearhtml=User_Send();
        return false;
    }
    if (ctrlKey && (keyCode == 13) && shortcut=='Ctrl + Enter'){
        clearhtml=User_Send();
        return false;
    }
    if (altKey && (keyCode == 83) && shortcut=='ALT + S'){
        clearhtml=User_Send();
        return false;
    }
    return true;
}
//call f22() and set clearhtml=false
function f12(evt){
    if(clearhtml){
        f19('',false);
        f22();
        clearhtml=false;
        return false;
    }
}
function f13(){
    f8('end')
}
function convertIMG(str) { var arr, arr1, re, s; re = /{img:.*?}/g; arr = str.match(re); if (arr == null) return str; for (i = 0; i < arr.length; i++) { arr1 = arr[i].match(re); if (arr1 == null) return str; if (arr1.length == 1) { s = arr1[0].substring(arr1[0].indexOf(':') + 1, arr1[0].indexOf('}')); str = str.replace(arr1, '<img src=' + s + ' border=0>'); } } return str; }
function convertToHtml(str) {return convertIMG(str.replace(/ /g, '&nbsp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;')); }
//khainv f15 replace content
//f15(html)=>html_replace_elements(html);
function  html_replace_elements(  html  )  {
    html  =  html.replace(/<\/?SPAN[^>]*>/gi,  ""  );
    html  =  html.replace(/<(\w[^>]*)  class=([^    |>]*)([^>]*)/gi,  "<$1$3")  ;
    html  =  html.replace(/<(\w[^>]*)  lang=([^    |>]*)([^>]*)/gi,  "<$1$3")  ;
    html  =  html.replace(/<\\?\?xml[^>]*>/gi,  "")  ;
    html  =  html.replace(/<\/?\w+:[^>]*>/gi,  "")  ;
    html  =  html.replace(/ /,  "  "  );
    html  =  html.replace(/<iframe/gi,  '<xiframe');
    /*if(c39){
        var  re  =  new  RegExp("(<P)([^>]*>.*?)(<\/P>)","gi")  ;
        html  =  html.replace(  re,  "<div$2</div>"  )  ;
    }*/
    var  re  =  new  RegExp("(<P)([^>]*>.*?)(<\/P>)","gi")  ;
    html  =  html.replace(  re,  "<div$2</div>"  )  ;
    html  =  html.replace(/<script.*<\/script>/gi,  "")  ;
    return html;
}
/*init K co su dung*/
function init() {
    window.ondragover = function(e) {
        e.preventDefault();
        return false;
    };
    window.ondrop = function(e) {
        e.preventDefault();
        return false;
    };
    init1();
    window.focus();
    resize();
}
/*init1 K co su dung*/
function init1() {
    var obj = $("FreeTextBox1_editor").contentWindow;
    var obj1 = navigator.appVersion.indexOf("MSIE 5.0") > -1 ? FreeTextBox1_editor.document : obj.document;
    obj1.open();
    obj1.write("<h" + 'tml name="FreeTextBox1_editor_html"><head><base target="_blank"><scr' + 'ipt language="javascript">try{if(window.HTMLElement){HTMLElement.prototype.__defineGetter__("outerText",function(){var r=this.ownerDocument.createRange();r.selectNodeContents(this);return r.toString();});}}catch(e){}function killErrors(){return true;}window.onerror = killErrors;</scr' + 'ipt><style type="text/css">body{word-break: break-all;margin: 0px; padding: 2px; border: 0px;height:56px;color:rgb(153, 153, 153);}p { margin-top:0px;margin-bottom:0px;}</style></head><body onkeydown="return parent.f11(event);"  onkeyup="return parent.f12(event)"  onmousedown="return parent.editclick(event);" onfocus="return parent.editfocus()" onblur="return parent.editblur()"></bo' + "dy>" + c13 + "</h" + "tml>");
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
}
/*resizeChatWin K co dung*/
function resizeChatWin() {
    try{
        $("chatContent").style.height = (GetHieght() - 36 - 129 - ($('pmtdiv').style.display == 'none' ? 0 : 25)) + "px";
        var center = $("centerMsg");
        center.style.marginLeft = "0px";
        center.style.marginRight = "0px";
        var bw = GetWidth();
        var _toolsbar1 = $("toolsbar1").style;
        if (_toolsbar1.left != "") _toolsbar1.left = "11px";
        if (_toolsbar1.right != "") _toolsbar1.right = "11px";
    }
    catch(e){}
}
/*khainv code them*/
function receiveMessage(event){
    var datas=event.data;
    if(datas.action=='smile1'){
        SelSmile1(datas.src);
    }
}
addEventListener("message", receiveMessage, false);


