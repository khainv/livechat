function GetHieght() {
    var sclh = document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight != null ? window.innerHeight : document.body != null ? document.body.clientHeight : 0;
    return sclh;
}
function GetWidth() {
    var sclh = document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth != null ? window.innerWidth : document.body != null ? document.body.clientWidth : 0;
    return sclh;
}
function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function SetCookie(name,value,minutes){
    if (name.indexOf(K_cid)==-1){
        name='N'+K_cid+name;
    }
    var exp  = new Date();
    exp.setTime(exp.getTime() + minutes*60*1000);
    document.cookie = name + '='+ escape (value) + ';'+'http://'+GetDomain()+'path=/;expires=' + exp.toGMTString();
}
function GetCookie(name){
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
function DelCookie (name,path,domain) {
    if (GetCookie(name)) {
        document.cookie = name + "=" +
            ((path == null) ? "" : "; path=" + path) +
            ((domain == null) ? "" : "; domain=" + domain) +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
function GetTimeNowStr() {
    var d = new Date();
    var rs= d.getTime();
    return rs
}
function GetDomain(){
    return location.hostname;
}
function GetInfoOs(){
    var OsName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OsName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OsName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OsName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OsName="Linux";
    return OsName;
}
function GetInfoBrowser(){
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
function GetParamsUri(script_name){
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
function DetectDevice(){
    testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile','i');
    if (testExp.test(navigator.userAgent)){
        return 'mobile';
    }else{
        return 'pc';
    }
}
