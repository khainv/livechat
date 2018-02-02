/*socket.emit('EAdminOnline','cid_123');*/
socket.on('ECliOnlines',function(data){
    if(data!=null && data!=''){
        var str=list_AdminOnlines(data);
        var clientonlines=data.length;
        $('#ClientOnlines').html(str);
        $('#ClientOnlinesCount').html(clientonlines);
    }
});
socket.on('ESerSendToAll',function(data){
    //dem va show mes
    var coumes=GetObjById('CountMes').textContent;
    /*process tin nhan den*/
    var _UserMes='UserMes_'+data.room;
    if(GetObjById(_UserMes)){
        DelEleById(_UserMes);
    }else{
        var coumes=parseInt(coumes)+1;
        GetObjById('CountMes').innerHTML =coumes;
    }
    var str=StrUserMes(data.room,data.socket_id,data.mes_text,'');
    //update count when user send mes
    $('#UserMes').prepend(str);
})
socket.on('ESerSendMesFromCli',function(data){
    var coumes=GetObjById('CountMes').textContent;
    /*process tin nhan den*/
    var _UserMes='UserMes_'+data.room;
    if(GetObjById(_UserMes)){
        DelEleById(_UserMes);
    }else{
        var coumes=parseInt(coumes)+1;
        GetObjById('CountMes').innerHTML =coumes;
    }
    var str=StrUserMes(data.room,data.socket_id,data.mes_text,'');
    //update count when user send mes
    $('#UserMes').prepend(str);
    //open windows chat
    mes_append_adm(data);
})
socket.on('ESerSendMesToRoom',function(data){
    mes_append_adm(data);
})
socket.on('ESerSendUseOffToRoom',function(data){
    data={mes:'User chat offline',room:data.room}
    mes_append_adm(data);
})
socket.on('ESerSendCancelJoinRoom',function(data){
    var coumes=GetObjById('CountMes').textContent;
    var _UserMes='UserMes_'+data.room;
    if(GetObjById(_UserMes)){
        DelEleById(_UserMes);
        var coumes=parseInt(coumes)-1;
        GetObjById('CountMes').innerHTML =coumes;
    }
})
socket.on('ESerGetRoomsChatByAdm',function (data) {
    if(data.rooms!=null){
        var strhtml='';
        data.rooms.forEach(function (val,key) {
            var txt='';var user='';var use_id='';
            if(data.mes[key]!=null){
                txt=data.mes[key].mes_text;
                use_id=data.mes[key].use_chat.use_id;
                user=data.mes[key].use_chat.use_name;
            }
            var obj={roo_id:val._id,roo_name:val.roo_name,use_name:user,use_id:use_id,txt_mes:txt}
            strhtml+=StrUserMes2(obj);
        })
        $('#RoomsChated').append(strhtml);
    }
})
