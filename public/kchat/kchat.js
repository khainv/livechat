var K_sysDomain='http://localhost:8000';
var K_sysurl = K_sysDomain+'/kchat';
var K_sysimg=K_sysurl+'/imgs'
var K_cid='';
var K_sid='';
var K_lng='en';
var K_domain=K_getDomain();
var K_channel='1';
var _K_mfloat_toright=1;
var _K_mfloat_imgleft=0;
var K_timeshowchatbox=10000;
var K_Fshowchatbox='';
var K_cookieexpires=10;
var v2 = unescape("%235ba4ed");
var v3 = unescape("http://localhost:8000/kchat/imgs/v/ico_admin.gif");
var v4 = unescape("http://localhost:8000/kchat/imgs/v/ico_client.gif");
var c3 = unescape("%3cIMG style%3d%22MAX-WIDTH%3a 100%25%3b TEXT-ALIGN%3a center%22 src%3d%22http%3a%2f%2fphongkhamgiaiphong.com%2flinechat%2flinechat_banner_goc.jpg%22%3e %3cDIV style%3d%22COLOR%3a green%3b MARGIN-TOP%3a 5px%22%3e%3cFONT size%3d4 face%3d%22Times New Roman%22%3e%3c%2fFONT%3e%3c%2fDIV%3e%3cP%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Times New Roman%3b mso-spacerun%3a 'yes'%3b mso-fareast-font-family%3a %u5b8b%u4f53%3b mso-font-kerning%3a 1.0000pt%22%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%22%3e chao ban day la c%u1ee7a %3c%2fSPAN%3e%3cSPAN style%3d%22FONT-SIZE%3a 16px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23e53333%22%3e%3cSTRONG%3e KHAI NVIT %3c%2fSTRONG%3e%3c%2fSPAN%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%22%3e%2c can co van de gi can tu van!%3c%2fSPAN%3e%3c%2fSPAN%3e%3cSPAN style%3d%22FONT-SIZE%3a 12pt%3b FONT-FAMILY%3a %u5b8b%u4f53%3b mso-spacerun%3a 'yes'%3b mso-font-kerning%3a 1.0000pt%3b mso-ascii-font-family%3a 'Times New Roman'%3b mso-hansi-font-family%3a 'Times New Roman'%22%3e%3c%2fSPAN%3e%3c%2fP%3e%3cP class%3dMsoNormal style%3d%22TEXT-ALIGN%3a left%22%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23337fe5%22%3e%3c%2fSPAN%3e%26nbsp%3b%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23337fe5%22%3e%3c%2fP%3e%3cP class%3dMsoNormal style%3d%22TEXT-ALIGN%3a left%22%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23337fe5%22%3e%5b%3c%2fSPAN%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23337fe5%3b mso-spacerun%3a 'yes'%3b mso-fareast-font-family%3a %u5b8b%u4f53%3b mso-font-kerning%3a 1.0000pt%22%3e cuoc hoi theo hoan toan duoc bao mat !%3c%2fSPAN%3e%3cSPAN style%3d%22FONT-SIZE%3a 14px%3b FONT-FAMILY%3a Arial%3b COLOR%3a %23337fe5%22%3e%5d%3c%2fSPAN%3e%3c%2fP%3e%3c%2fSPAN%3e");
var c15 = '<div class="zi"><a href="http://' + unescape("namkhoa168.com:8000")+'" target="_blank" alt="' + unescape("khainv") + '"><img src="' + K_sysimg + 'chatm2imgs/logo1.png" style="margin-right:4px;">' + unescape("namkhoa168.com:8000") + '</a></div>';
var c50 = unescape("http%3a%2f%2fkhamnamkhoahanoi.vn%2f");
var K_Tick=new Date().getTime().toString()+parseInt(Math.random()*499999999+Math.random()*400000000+100000000).toString();
/*if (typeof K_Os === "undefined" || K_Os=='' || K_Os==null) {K_Os = K_GetInfoOs();}
if (typeof K_Browser === "undefined" || K_Browser=={}) {K_Browser=K_GetInfoBrowser();}*/
function K_getParams(script_name){
    var scripts = document.getElementsByTagName("script");
    for(var i=0; i<scripts.length; i++) {
        if(scripts[i].src.indexOf("/" + script_name) > -1) {
            var pa = scripts[i].src.split("?").pop().split("&");
            var p = {};
            for(var j=0; j<pa.length; j++) {
                var kv = pa[j].split("=");
                p[kv[0]] = kv[1];
            }
            return p;
        }
    }
    return {};
}
var params=K_getParams('kchat.js?cid');
if(params.cid.length <1 || K_domain==''){
    console.log('khong thoa main');
}else{
    K_cid=params.cid;
    var obj={'cid':K_cid,'domain':K_domain,'device':detectDevice(),'channel':K_channel};
    obj=JSON.stringify(obj);
    K_loadDoc(obj);
}
function K_loadDoc(data) {
    var xhttp=false;
    if(xhttp===false){
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try{
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) {
                alert(e);
            }
        }
    }
    if(xhttp && xhttp!==false){
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj=this.responseText;
                obj=JSON.parse(obj);
                if(obj.res_code=='K_1'){
                    K_Main(obj.device,obj.online);
                }
            }
        }
        var data=window.btoa(unescape(encodeURIComponent(data)));
        xhttp.open("GET", K_sysurl+"/onstart?data="+data, true);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        xhttp.send();
    }else{
        alert('khong tao duoc xhttp');
    }
}
function K_Main(device,onliner){

    if(device==0){
        onliner_start();
        $('#LRdiv2').append(html_boxchat1());
        $('#LRdiv3').append(html_closeBoxchat());
        if(onliner==1){

            K_iframeBoxchat(html_iframeBoxchat());
        }
    }
}

function K_setCookie(name,value,minutes){
    if (name.indexOf(K_cid)==-1){
        name='N'+K_cid+name;
    }
    var exp  = new Date();
    exp.setTime(exp.getTime() + minutes*60*1000);
    document.cookie = name + '='+ escape (value) + ';'+getRDomain()+'path=/;expires=' + exp.toGMTString();
}
function K_getCookie(name){
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}
function K_GetInfoOs(){
    var OsName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OsName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OsName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OsName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OsName="Linux";
    return OsName;
}
function K_GetInfoBrowser(){
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;
    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+4);
    }
// In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
// In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
    }
// In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    }
// In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
// In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
// In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
        (verOffset=nAgt.lastIndexOf('/')) )
    {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion,10);
    }
    var data={name:browserName,version:fullVersion,major:majorVersion,appname:navigator.appName,useragent:navigator.userAgent}
    return data;
}
function getRDomain(){
    var d;
    var a=location.hostname;
    var b='';
    var c=['.com','.co','.cn','.vn','.info','.net','.org','.me','.mobi','.us','.biz','.xxx','.ca','.co.jp','.com.cn','.net.cn','.org.cn','.gov.cn','.cq.cn','.ac.cn','.edu.cn','.mx','.tv','.ws','.ag','.com.ag','.net.ag','.org.ag','.am','.asia','.at','.be','.com.br','.net.br','.bz','.com.bz','.net.bz','.cc','.com.co','.net.co','.nom.co','.de','.es','.com.es','.nom.es','.org.es','.eu','.fm','.fr','.gs','.in','.co.in','.firm.in','.gen.in','.ind.in','.net.in','.org.in','.it','.jobs','.jp','.ms','.com.mx','.nl','.nu','.co.nz','.net.nz','.org.nz','.se','.tc','.tk','.tw','.com.tw','.com.hk','.idv.tw','.org.tw','.hk','.co.uk','.me.uk','.org.uk','.vg','.name'];
    return c=c.join('|').replace('.','\\.'),d=new RegExp('\\.?([^.]+('+c+'))$'),a.replace(d,function(a,c){b=c}),''!=b?'domain=.'+b+';':b;
}
function K_getDomain(){
    return location.hostname;
}
function detectDevice(){
    testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile','i');
    if (testExp.test(navigator.userAgent)){
        return 1;
    }else{
        return 0;
    }
}
/*K_GetObj K co dung*/
function K_GetObj(id, theDoc) {
    if (!theDoc) {
        theDoc = document;
    }
    if (theDoc.getElementById) {
        return theDoc.getElementById(id);
    } else if (document.all) {
        return theDoc.all(id);
    }
}
/*onliner_start K co dung*/
function onliner_start(){
    document.write('<div id=\"LRdiv2\" style=\"display:block;\"></div>');
    document.write('<div id=\"LRdiv3\" style=\"display:block;\"></div>');
}
function K_Move_LR() {
    _K_mfloat_toright = !_K_mfloat_toright;
    var K_o1 = K_GetObj('LRfloater2').style;
    if (_K_mfloat_toright == 1) {
        K_o1.left = '';
        K_o1.right = _K_mfloat_imgleft + 'px';
    } else {
        K_o1.right = '';
        K_o1.left = _K_mfloat_imgleft + 'px';
    }
}
function K_closemini(opt){
    if(opt==1){
        K_GetObj('LRfloater2').style.display='none';
        K_GetObj('LRfloater3').style.display='block';
    }else{
     if(K_timeshowchatbox > 0){
         setTimeout(K_showmini,K_timeshowchatbox);
     }
        K_GetObj('LRfloater2').style.display='none';
    }
}
function K_showmini(){
    $('#LRfloater2').css('display','block');
    if(K_GetObj('LRfloater3')){
        K_GetObj('LRfloater3').style.display='none';
    }
}
function if_src(){if(/rv:11.0;|SE 2.X MetaSr 1.0/.test(navigator.userAgent)) {return '';}return 'src=\"about:blank\"';}
function html_boxchat1(){
    var str='<div id="LRfloater2" style="z-index: 2147483647; bottom: 0px; position: fixed !important; right: 0px;">' +
        '<div style="width: 390px; height: 400px; display: block;" id="LRMINIWIN">' +
        '<div id="LRMINIWIN0" style="z-index: 2147483647; position: absolute; height: 30px; overflow: hidden; display: block;right:0">' +
        '<span style="float:left;clear:none; width:103px;height:20px; overflow:hidden; margin:0 5px;"></span>' +
        '<span style="CURSOR:pointer;float:right;clear:none; width:20px;height:20px; margin:6px 2px 0 0; overflow:hidden;" onclick="K_closemini(1);">' +
        '<img style="cursor:pointer;" src="'+K_sysimg+'/close.png" border="0">' +
        '</span>' +
        '<span style="CURSOR:pointer;float:right;overflow:hidden;width:20px;height:20px;clear:none;display:block;margin:6px 2px 0 0;" onclick="K_closemini();">' +
        '<img src="'+K_sysimg+'/da1.png" style="cursor:pointer;" border="0">' +
        '</span>' +
        '<span style="CURSOR:pointer;float:right;overflow:hidden;width:20px;height:20px;clear:none;display:block;margin:6px 2px 0 0;" onclick="openZoosUrl("bchatwin");lr_hidemini();">' +
        '<img src="'+K_sysimg+'/da.png" style="cursor:pointer;" border="0">' +
        '</span>' +
        '<span style="CURSOR:pointer;float:right;overflow:hidden;width:20px;height:20px;clear:none;display:block;margin:6px 2px 0 0;" onclick="K_Move_LR();">' +
        '<img src="'+K_sysimg+'/jiantou.png" style="cursor:pointer;" border="0">' +
        '</span>' +
        '</div>' +
        '<iframe id="LR_miniframe" name="LR_miniframe" width="100%" height="400px" frameborder="0" scrolling="No" allowtransparency="true" src="about:blank"></iframe>' +
        '</div>' +
    '</div>';
    return str;
}
function K_iframeBoxchat(str){
    var doc = document.getElementById('LR_miniframe').contentWindow.document;
    doc.open();
    doc.write(str);
    doc.close();
}
function html_iframeBoxchat(){
    var _body='<body onkeydown="return f3(event)" onload="init();" scroll="no"><base target="_blank"><script language="javascript">/*document.write(bodyhtml);f20(c3, 0);LastFunction();*/</script><div id="toolsbar1" style="height: 210px; left: 11px; display: none; z-index: 999; bottom: 130px; width: 360px;"></div><div style="position: absolute; top: 0px; display: block;background-color:#5ba4ed;" id="header"><div class="img1" style="top:5px;left:10px;position: absolute;"><img id="topimg" border="0" src="'+K_sysimg+'/v/ico_admin.gif" style="height: 24px;width: 24px;	border-radius: 18px;display:;"></div><div id="headerBox" class="toptitle" style="left: 40px;right:97px;"><p id="prompttop" style="word-break:break-all;white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;">&nbsp;Calling the operator,please wait...</p></div></div><div id="centerMsg" style="position: relative; margin-right: 0px; margin-left: 0px; height: 100%;"><div id="chatOutput" style="bottom: 129px;top: 36px;position: absolute;"><div id="pmtdiv" style="display:none;"><img src="'+K_sysimg+'/images/a1.gif" vspace="3" align="left" style="margin-top:4px;">' +
        '<div id="pmtdiv1"></div></div><div style="overflow: auto; position: relative; height: 427px;" class="border1Content" id="chatContent"><div id="msgArea"><div id="welcom1"><img style="MAX-WIDTH: 100%; TEXT-ALIGN: center" src="http://phongkhamgiaiphong.com/linechat/linechat_banner_goc.jpg"><div style="COLOR: green; MARGIN-TOP: 5px"><font size="4" face="Times New Roman"></font></div>' +
        '<p><span style="FONT-SIZE: 14px;"><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial"> chao ban day la của </span><span style="FONT-SIZE: 16px; FONT-FAMILY: Arial; COLOR: #e53333"><strong> KHAI NVIT </strong></span><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial">, can co van de gi can tu van!</span></span><span style="FONT-SIZE: 12pt;"></span></p><p class="MsoNormal" style="TEXT-ALIGN: left"><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial; COLOR: #337fe5"></span><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial; COLOR: #337fe5"></span></p><p class="MsoNormal" style="TEXT-ALIGN: left"><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial; COLOR: #337fe5">[</span><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial; COLOR: #337fe5;"> cuoc hoi theo hoan toan duoc bao mat !</span><span style="FONT-SIZE: 14px; FONT-FAMILY: Arial; COLOR: #337fe5">]</span></p></div></div><div class="kongge_msg"></div></div></div>' +
        '<div id="userOptiv"><div class="border1Content"><div style="background-color:#f1f1f1;"></div><div style="background-color:#f1f1f1;"><div id="toolsbar"><div class="telephone" id="telephone" style="display:none;border-radius: 14px;height: 22px; right: 5px;top: 3px;background-color: #5ba4ed;border: 1px solid #5ba4ed;"><input type="text" id="tel" class="bd" value="Please enter your mobile phone number" defaultval="Please enter your mobile phone number" onfocus="inputfocus(this,1);showContent(5);" onblur="inputblur(this,1);hiddenContent();" style="border-radius: 14px 0 0 14px;height: 22px;line-height: 22px;"><input type="button" id="telbtn" class="btn" style="border-radius: 0 14px 14px 0;height: 22px;background: #5ba4ed none repeat scroll 0 0;" value="mien phi cuoc goi" onclick="LY_check1($('+"'tel'"+'))" onmouseover="filter0(this);" onmouseout="filter1(this);"></div><div unselectable="on" class="panelContain"><div unselectable="on" style="display:block" class="toolbutton0" title="Face"><div class="toolbutton" style="background-position: 0px -50px;" onmouseover="showC1(0, this)" onmouseout="hiddenC1(0, this);" onclick="showContent(1)" title="Face"></div></div><div unselectable="on" id="tbut2" style="display:none" class="toolbutton0" title="quet ma 2 chieu"><div class="toolbutton" style="background-position:-700px -50px" onmouseover="showC1(-700, this)" onmouseout="hiddenC1(-700, this)" onclick="showContent(4)" title="quet ma 2 chieu"></div></div><div unselectable="on" id="tbut3" style="display:none" class="toolbutton0" title="tro chuyen qq"><div class="toolbutton" style="background-position:-650px -50px" onmouseover="showC1(-650, this)" onmouseout="hiddenC1(-650, this)" title="tro chuyen qq"><a href="tencent://message/?uin=&amp;Site=&amp;Menu=yes" style="width: 26px; height: 24px;display:block;" id="tbut3h"></a></div></div>' +
        '<div unselectable="on" style="display:block" class="toolbutton0" title="Send Image"><div class="toolbutton" style="background-position: -100px -50px;" onmouseover="showC1(-100, this)" onmouseout="hiddenC1(-100, this);" onclick="showContent(2)" title="Send Image"></div></div><div unselectable="on" style="display:block" class="toolbutton0" title="Send File"><div class="toolbutton" style="background-position: -250px -50px;" onmouseover="showC1(-250, this)" onmouseout="hiddenC1(-250, this);" onclick="showContent(3)" title="Send File"></div></div><div unselectable="on" style="display:none" class="toolbutton0" title=" Screen capture"><div class="toolbutton" style="background-position:-300px -50px" onmouseover="showC1(-300, this)" onmouseout="hiddenC1(-300, this);" onclick="Capture();" title=" Screen capture"></div></div><div unselectable="on" style="display:none" class="toolbutton0" title="mien phi cuoc goi"><div class="toolbutton" style="background-position:-450px -50px" onmouseover="showC1(-450, this)" onmouseout="hiddenC1(-450, this)" title="mien phi cuoc goi"><a href="" style="width: 26px; height: 24px;display:block;"></a></div></div><div unselectable="on" style="display:block" class="toolbutton0" title="Submit your comments for this chat"><div class="toolbutton" style="background-position: -50px -50px;" onmouseover="showC1(-50, this)" onmouseout="hiddenC1(-50, this)" onclick="pingjia();" title="Submit your comments for this chat"></div></div><div unselectable="on" style="display:block" class="toolbutton0" title="Save chat"><div class="toolbutton" style="background-position: -150px -50px;" onmouseover="showC1(-150, this)" onmouseout="hiddenC1(-150, this);" onclick="savechat()" title="Save chat"></div></div></div></div></div>' +
        '<div id="sendMsgDiv"><div class="editor_border"><div id="lreditor"><iframe id="FreeTextBox1_editor" name="FreeTextBox1_editor" style="BORDER-STYLE: none;" frameborder="0" hspace="0" height="61" width="100%" src="about:blank"></iframe></div></div><div id="promptbar"><div style="overflow:hidden;height:22px;line-height:20px;width:100%;margin-top:13px;"><ul id="promptbottom"><div style="display: block; width:270px;" id="swtlogo"><div class="zi"><a href="http://namkhoa168.com:8000" target="_blank" alt="khainv"><img src="'+K_sysimg+'/chatm2imgs/logo1.png" style="margin-right:4px;">namkhoa168.com:8000</a></div></div></ul></div></div>' +
        '<div unselectable="on" id="SendBar"><div class="bd1"><div onmouseover="filter0(this);" onmouseout="filter1(this);" unselectable="on" class="bt" onclick="showSendSel()" id="selSendBtn" style="background : #5ba4ed none repeat scroll 0 0;">^</div><div onmouseover="filter0(this);" onmouseout="filter1(this);" onclick="return User_Send(event);" unselectable="on" class="bt" id="SendBtn" style="background : #5ba4ed none repeat scroll 0 0;">Send</div></div><div onclick="showSendSel()" class="nicEdit-ocSendMsgDiv" id="ocSendMsgDiv" unselectable="on" style="right: 0px; z-index: 100; top: -48px; border-right: 1px solid rgb(218, 218, 218);"><div unselectable="on" class="oc_div_smt_in"><table width="100%" cellspacing="0" cellpadding="0" border="0" onselectstart="return false"><tbody><tr class="" onclick="send_c_click(this,0)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"><td width="19" style="background-color:#eeeeee;padding:0px 3px;" class="left"><div class="cur"></div></td><td>&nbsp;Enter</td></tr><tr class="" onclick="send_c_click(this,1)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"><td style="background-color:#eeeeee;padding:0px 3px;" class="left"><div></div></td><td>&nbsp;Ctrl+Enter</td></tr></tbody></table></div></div></div></div></div></div></div></body>';
    var str='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns:ks="" xmlns="http://www.w3.org/1999/xhtml">' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
        '<script language="javascript">' +
        '</script>' +
        '<script type="text/javascript" src="http://localhost:8000/kchat/../../socket.io/socket.io.js"></script>' +
        '<link href="'+K_sysurl+'/css/lrchatBW33.css" rel="stylesheet" type="text/css">' +
        '<script type="text/javascript" src="'+K_sysurl+'/js/Chat_en.js"></script>' +
        '<script type="text/javascript" src="'+K_sysurl+'/js/K_funs.js"></script>' +
        '<script type="text/javascript" src="'+K_sysurl+'/js/ChatBW3JS.js?cid='+K_cid+'"></script>' +
        '</head>' +_body
    '</html>';
    return str;
}
function html_closeBoxchat(){
    var str='<link href="'+K_sysurl+'/css/JS5.css" rel="stylesheet" type="text/css"><div id="LRdiv3" style="display: block;"><div id="LRfloater3" style="z-index: 2147483647; right: 0px; bottom: 0px; position: fixed !important;display: '+(!K_Fshowchatbox?'block':'none')+'"><div id="LRMINIBar" class="LR_Mini_ICON" style="display: block; right: 15px; bottom: 30px;" onclick="K_showmini();"><a class="LR-BTN" style="background-color: #5ba4ed;"><span class="LR-ICON LR-ICON-CHAT1" id="LR-BTN-ICON"></span><span id="LR-CIRCLE" style="display:none;background-color: #5ba4ed;"></span> </a><div id="LR-BUBBLE" style="display:none;width:400px;right: 0;margin-right:34px;cursor:pointer;bottom: 30px;"><span class="LR-ICON" id="LR-BUBBLE-CLOSE" onclick="return closebarhtml(event);"></span><div id="LR-BUBBLE-INSIDE"><div id="LR-BUBBLE-title"><img id="LR-BUBBLE-AVATAR" src=""><span id="LR-BUBBLE-NAME"></span></div><div id="LR-BUBBLE-MSG"></div></div></div></div></div></div>';
    return str;
}


