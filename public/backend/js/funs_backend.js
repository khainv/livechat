function list_AdminOnlines(data){
    var li='';
    data.forEach(function(item){
        if(item.img==null){
            var img='/backend/assets/img/avatars/divyia.jpg';
        }
        var socid=item.soc_id;
        var room=item.room;
        li+='<li class="contact" onclick="divchat('+"'"+room+"'"+');"><div class="contact-avatar"><img src="'+img+'" /></div><div class="contact-info"><div class="contact-name">'+room+'</div><div class="contact-status"><div class="online"></div><div class="status">online</div></div><div class="last-chat-time">last week</div></div></li>';
    });
    return li;
}
function GetObjById(id_element){
    return document.getElementById(id_element);
}
function StrUserMes(room,name,mes,img){
    if(!img){
        img='/backend/assets/img/avatars/divyia.jpg';
    }
    var str='<li class="MesChat" id="UserMes_'+room+'" onclick="divchat('+"'"+room+"'"+');"><a href="#"><img src="'+img+'" class="message-avatar" alt=""><div class="message"><span class="message-sender">'+name+'</span><span class="message-time">1 minutes ago</span><span class="message-body">'+mes+'</span></div></a></li>';
    return str;
}
function DelEleById(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
    return false;
}
function html_DivChat(room){
    var html='<div class="row divchat '+room+'" id="WinChat'+room+'">' +
        '<div class="col-lg-12 col-sm-12 col-xs-12" id="'+room+'">' +
        '<div class="row">' +
        '<div class="col-lg-6 col-sm-6 col-xs-12">' +
        '<div class="widget">' +
        '<div class="widget-header bordered-bottom bordered-pink">' +
        '<span class="widget-caption" id="sock_id">'+room+'</span>' +
        '</div>' +
        '<div class="widget-body"><div class="body_mes"></div> ' +
        '<div id="horizontal-form">' +
        '<form class="form-horizontal" role="form">' +
        '<div class="row">' +
        '<div class="col-sm-12" id="MesExits"></div>' +
        '</div>' +
        '<textarea class="form-control MesType" rows="3" placeholder="Content" id=""></textarea>' +
        '<div class="horizontal-space"></div>' +
        '<div>' +
        '<button type="button" class="btn btn-default" id="AdminSend" data-id="'+room+'">Send</button>' +
        '</div>' +
        '</form>' +
        '</div></div></div></div></div></div></div>';
    return html;
}
function divchat(soc_id){
    var a=document.getElementsByClassName('divchat');
    for(var i = 0; i < a.length; i++){
        a[i].style.display= "none";
    }
    var class_socid = GetObjById('WinChat'+soc_id);
    if (class_socid !== null) {
        class_socid.style.display='block';
    }else{
        var html=html_DivChat(soc_id);
        document.getElementById('PageBody').innerHTML +=html;
    }
}
function mes_append_adm(data,me){
    var obj=GetObjById('WinChat'+data.room);
    if(obj==null){
        var html=html_DivChat(data.room);
        GetObjById('PageBody').innerHTML +=html;
    }
    var obj=GetObjById('WinChat'+data.room);
    /*var bodymes=obj.getElementById('body_mes');*/
    var _id='#WinChat'+data.room+' .body_mes';
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
    var mes=$('.'+_soc_id+' .MesType').val();
    if(mes.length>0){
        mes=mes.trim();
        var data={mes:mes,soc_id:_soc_id,soc_id_admin:socket.id,cid:'cid_123',room:_soc_id}
        socket.emit('EAdmInsertMes',data);
        socket.emit('ESerHideJoinRoom',{cid:'cid_123',room:_soc_id})
        $('.MesType').val('');
        mes_append_adm(data,'1');
    }else{
        alert('Mời bạn nhập');
        console.log(_soc_id);
    }
})