///usr/lib/node_modules/pm2(thu muc cai dat npm)
//io.sockets.emit(server tra result ve cho tat ca moi nguoi)
//socket.emit(server tra result ve cho chinh nguoi gui)
//socket.broadcast.emit(server tra result ve cho tat ca moi nguoi ngoai tru nguoi gui len server)
//socket.adapter.rooms(show danh sach rooms dang co)
//Object.keys(io.sockets.sockets).forEach(function(id) {}) (get all id of sockets)
//mongod.exe --config G:\MongoStore\config.txt
const http=require("http");
var express=require("express");
const mongoose=require('mongoose');
mongoose.Promise = require('bluebird');
var session=require("express-session");
var socket_io=require("socket.io");
var url = require('url') ;
var funs=require("./funs.js");
funs =new funs;
var define=require("./define.js");
define=new define;
var backend=define.backend;
var funs_html=require("./funs_html.js");
funs_html =new funs_html;
var app=express();
app.use(express.static("public"));
app.use('uploads', express.static('uploads'));
//app.use('/', express.static('public/frontend'));
app.set("view engine","ejs");
app.set("views","./views");
/*khoi tao cac const*/
const port=8000;
const k_domain='http://localhost:8000';
//tao server
var server=http.Server(app);
var io=socket_io(server);
server.listen(port);
/*session*/
app.use(session({
    secret : "secret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 3000000}
}));
//them io vao app de chay tren cac router
var router = express.Router()
// middleware that is specific to this router
app.io = io;
var options_db = {
    db: { native_parser: true },
    server: { poolSize: 5 }
}
//use native promises
mongoose.Promise=global.Promise;
mongoose.connect(define.db_uri, options_db, function(error) {
    if(error){
        console.log('loi ket noi');
    }else{
        /*console.log('ket noi thanh cong');*/
    }
});
const ListCids=['khai','khainv','khainvit','cid_123'];
var RoomsCid=[];
var RoomsAdmins=[];
ListCids.forEach(function(item){
    RoomsCid[item]=[];
    RoomsAdmins[item]=[];
})
//mongoose.set("debug",true);
var timenow=new Date();
require("./models/k_messages");
var model_messages= mongoose.model("k_messages");
require("./models/k_sockets");
const model_sockets=mongoose.model("k_sockets");
io.on("connection",function (socket){
    //console.log('ket noi socket.io | '+socket.id);
    function InsertMes(data){
        var documents={};
        documents.mes_text=funs.escapeHtml(data.mes);
        documents.socket_id=data.id;
        documents.socket_room=data.id;
        documents.use_ip=data.ip;
        documents.use_os=data.os;
        documents.use_browser=data.browser;
        documents.use_channel=data.channel;
        documents.use_icon=escape(data.icon);
        documents.use_type=data.use_type;
        documents.use_domain=escape(data.domain);
        documents.use_cid=data.cid;
        documents.created_at=timenow;
        documents.updated_at=timenow;
        documents.room=data.room;
        model_messages.findOneAndUpdate(
            { "mes_text":documents.mes_text},{$set:documents},{upsert: true},function(err,doc) {
                if(err){
                    throw err;
                    funs.write_log('loi data: '+documents+' | cid:'+data.cid);
                }else{
                    //console.log("da them new");
                }
            }
        );
        //console.log('insert:socket_id:'+socket.id+ ' | text:'+documents.mes_text);
        documents.mes=documents.mes_text;
        return documents;
    }
    socket.on('ECliOnline',function(data){
        var client={soc_id:socket.id,room:data.room};
        socket.join(data.room);
        if(Array.isArray(RoomsCid[data.cid])){
            RoomsCid[data.cid].push(client)
            var NameRoom=funs.ReNameRoom(data.cid,define.FixAdminRoom);
            io.to(NameRoom).emit('ECliOnlines',RoomsCid[data.cid]);
        }else{
            funs.write_log('not exits this cid : '+data.cid)
        }
        var documents={};
        socket.cid=data.cid;
        socket.room=data.room;
        documents.soc_id=socket.id;
        documents.use_ip='';
        documents.use_cid=data.cid;
        documents.use_sid=data.sid;
        documents.use_domain=data.domain;
        documents.use_device=data.device;
        documents.use_channel=data.channel;
        documents.use_group=data.group+'|'+socket.id;
        documents.created_at=timenow;
        documents.updated_at=timenow;
        var _condition={ "soc_id":data.id};
        var _update=documents;
        var _option={upsert: true};
        if(1==1){
            model_sockets.create(documents, function (err, small) {
                if (err) {
                    return handleError(err);
                }
            })
        }
    })
    socket.on('ECliSendToAll',function(data){
        data.use_type='0';
        var documents=InsertMes(data);
        var NameRoom=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        socket.join(data.room);
        //socket.broadcast.to(data.room).emit('ESerSendMes',{mes:data.mes,admin:socket.id});
        socket.to(NameRoom).emit('ESerSendToAll',documents);
        console.log('Cli send dau tien');
    })
    socket.on('ECliSendToRoom',function(data){
        data.use_type='0';
        var documents=InsertMes(data);
        var NameRoom=data.room;
        socket.to(NameRoom).emit('ESerSendMesFromCli',documents);
        console.log('Cli send lan 2');
    })
    socket.on('disconnect',function(){
        var id=socket.id;
        var cid=socket.cid;
        var NameRoom=funs.ReNameRoom(cid,define.FixAdminRoom);
        var rom=funs.RemoveObjectInArray(RoomsCid[cid],id,'soc_id');
        RoomsCid[cid]=rom;
        console.log(rom);
        socket.to(NameRoom).emit('ECliOnlines',rom);
        if(socket.room){
            var room_joined=socket.room;
            socket.to(room_joined).emit('ESerSendUseOffToRoom',{soc_id:socket.id,room:room_joined})
        }
        model_sockets.remove({soc_id: id}, function(err, result) {
            if (err) {
                var str='index/disconnect | id : '+id;
                funs.write_log(str);
            }else{
                //console.log('xoa thanh cong'+id);
            }
        });
        funs.echo_log('disconnect : '+socket.id);
    });
    /*===========ADMIN================*/
    socket.on('EAdminOnline',function(data){
        var NameRoom=funs.ReNameRoom(data,define.FixAdminRoom);
        socket.join(NameRoom);
        var admin={soc_id:socket.id};
        RoomsAdmins[data].push(admin);
        io.to(NameRoom).emit('ECliOnlines',RoomsCid[data]);
    })
    socket.on('EAdmInsertMes',function(data){
        data.use_type='1';
        var documents=InsertMes(data);
        /*io.in(NameRoom).clients((err, clients) => {
            console.log(clients);
            })*/
        NameRoomCli=data.room;
        socket.join(NameRoomCli);
        /*io.in(NameRoomCli).clients(function(err,clients){
            console.log(clients);
        })*/
        socket.to(NameRoomCli).emit('ESerSendMesToRoom',documents);
        console.log('server gui tin nhan cua admin:'+socket.id);
    })
    socket.on('ESerHideJoinRoom',function(data){
        var NameRoom=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        console.log(NameRoom);
        socket.broadcast.to(NameRoom).emit('ESerSendCancelJoinRoom',{room:data.room})
    })
    /*=========ENDADMIN==============*/
});
/*tao namespace*/
/*routers*/
var rooms=require("./routers/frontend/rooms");
var kchat=require("./routers/kchat/kchat");
/*var ajax=require("./routers/frontend/ajax");*/
var users=require("./routers/kadmin/users");
app.use('/',rooms);
app.use('/kchat',kchat);
app.use('/'+backend+'/users',users);
/*app.use('/ajax',ajax);*/
