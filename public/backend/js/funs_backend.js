var adm_cid='';
var adm_name=''
var adm_id='';
var roo_type='0';
function list_AdminOnlines(data){
    var li='';
    if(data!=null && data!=''){
        data.forEach(function(item){
            if(item.img==null){
                var img='/backend/assets/img/avatars/divyia.jpg';
            }
            var socid=item.soc_id;
            var room=item.room;
            li+='<li class="contact" onclick="divchat('+"'"+room+"'"+');"><div class="contact-avatar"><img src="'+img+'" /></div><div class="contact-info"><div class="contact-name">'+room+'</div><div class="contact-status"><div class="online"></div><div class="status">online</div></div><div class="last-chat-time">last week</div></div></li>';
        });
    }
    return li;
}
function GetObjById(id_element){
    return document.getElementById(id_element);
}
function StrUserMes(room,name,mes,img){
    if(!img){
        img='/backend/assets/img/avatars/divyia.jpg';
    }
    var str='<li class="MesChat" id="UserMes_'+room+'" onclick="divchat('+"'"+room+"'"+","+"'"+name+"'"+');"><a href="#"><img src="'+img+'" class="message-avatar" alt=""><div class="message"><span class="message-sender">'+name+'</span><span class="message-time">1 minutes ago</span><span class="message-body">'+mes+'</span></div></a></li>';
    return str;
}
function StrUserMes2(obj){
    if(!obj.img){
        var img='/backend/assets/img/avatars/divyia.jpg';
    }else{
        var img=obj.img;
    }
    var roo_id=obj.roo_id;
    if(!obj.roo_name){
         var roo_name=roo_id;
    }else{
        var roo_name=obj.roo_name;
    }
    if(!obj.use_name){
        var use_name=obj.use_id;
    }else{
        var use_name=obj.use_name;
    }
    if(!obj.txt_mes){
        var txt_mes='';
    }else{
        var txt_mes=obj.txt_mes;
    }
    var str='<li class="MesChat" id="UserMes_'+roo_id+'" onclick="divchat('+"'"+roo_id+"'"+","+"'"+use_name+"'"+');"><a href="#"><img src="'+img+'" class="message-avatar" alt=""><div class="message"><span class="message-sender">'+use_name+'</span><span class="message-time">1 minutes ago</span><span class="message-body">'+txt_mes+'</span></div></a></li>';
    return str;
}
function DelEleById(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
    return false;
}
function html_DivChat(roo_id,roo_name){
    function html(roo_id,mes) {
        var htm2='<div class="row divchat '+roo_id+'" id="WinChat'+roo_id+'">' +
            '<div class="col-lg-12 col-sm-12 col-xs-12" id="'+roo_id+'">' +
            '<div class="row">' +
            '<div class="col-lg-6 col-sm-6 col-xs-12">' +
            '<div class="widget">' +
            '<div class="widget-header bordered-bottom bordered-pink">' +
            '<span class="widget-caption" id="sock_id">'+roo_name+'</span>' +
            '</div>' +
            '<div class="widget-body"><div class="body_mes">'+mes+'</div> ' +
            '<div id="horizontal-form">' +
            '<form class="form-horizontal" role="form">' +
            '<div class="row">' +
            '<div class="col-sm-12" id="MesExits"></div>' +
            '</div>' +
            '<textarea class="form-control MesType" rows="3" placeholder="Content" id=""></textarea>' +
            '<div class="horizontal-space"></div>' +
            '<div>' +
            '<button type="button" class="btn btn-default" id="AdminSend" data-id="'+roo_id+'">Send</button>' +
            '</div>' +
            '</form>' +
            '</div></div></div></div></div></div></div>';
        return htm2;
    }
    function abc(){
        return new Promise((resolve,reject)=>{
            $.get("/kchat/getmesbyroomid?roo_id="+roo_id, function(data, status){
                if(status=='success' || status=='200'){
                    resolve(data)
                }else{
                    return reject();
                }
            });
        })
    }
    var a=abc();
    a.then((data)=>{
        var str='';
        data.forEach(function (dat) {
            if(dat.adm_use=='2'){
                str+='<p class="me">'+dat.mes_text+'</p>';
            }else{
                str+='<p>'+dat.mes_text+'</p>';
            }
        })
        var str_html=html(roo_id,str)
        document.getElementById('PageBody').innerHTML +=str_html;
    }).catch(()=>{console.log('funs_backend:abc|co loi')})
    socket.emit('EAdmInsertToRoom',{roo_id:roo_id,use_id:adm_id})
}
function divchat(roo_id,roo_name){
    var a=document.getElementsByClassName('divchat');
    for(var i = 0; i < a.length; i++){
        a[i].style.display= "none";
    }
    var class_socid = GetObjById('WinChat'+roo_id);
    if (class_socid !== null) {
        class_socid.style.display='block';
    }else{
        var html=html_DivChat(roo_id,roo_name);
        //document.getElementById('PageBody').innerHTML +=html;
    }
}
function mes_append_adm(data,me){
    var obj=GetObjById('WinChat'+data.roo_id);
    if(obj==null){
        var html=html_DivChat(data.roo_id);
        GetObjById('PageBody').innerHTML +=html;
    }
    var obj=GetObjById('WinChat'+data.roo_id);
    var _id='#WinChat'+data.roo_id+' .body_mes';
    var bodymes=$(_id);
    if(me){
        var rw_mes='<p class="me">'+data.mes+'</p>';
    }else{
        var rw_mes='<p>'+data.mes+'</p>';
    }
    $(bodymes).append(rw_mes);
}
$(document).on('click', '#AdminSend', function() {
    var _soc_id=$(this).attr('data-id');
    var a=$('.'+_soc_id+' .MesType');
    var mes=$('.'+_soc_id+' .MesType').val();
    if(mes.length>0){
        mes=mes.trim();
        mes=unescape(mes);
        var data={mes:mes,soc_id_cli:_soc_id,soc_id_admin:socket.id,cid:adm_cid,roo_id:_soc_id,roo_type:roo_type,adm_id:adm_id,use_icon:''}
        socket.emit('EAdmInsertMes',data);
        socket.emit('ESerHideJoinRoom',{cid:adm_cid,room:_soc_id})
        $('.MesType').val('');
        mes_append_adm(data,'1');
    }else{
        alert('Mời bạn nhập');
    }
})
