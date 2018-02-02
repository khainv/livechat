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
var funs=require("./funs");
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
var port=define.k_port;
const k_domain=define.k_domain;
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
/*them doan nay de chay tren cac templates*/
session.ip='';
app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    /*lay ip*/
    if(session.ip==''){
        session.ip=funs.GetIp(req);
    }
    /*end lay ip*/
    next();
});
/*end*/
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
//mongoose.set("debug",true);
var timenow=new Date();
require("./models/k_messages");
var model_messages= mongoose.model("k_messages");
require("./models/k_sockets");
const model_sockets=mongoose.model("k_sockets");
require("./models/k_onlines");
const model_onlines=mongoose.model("k_onlines");
io.on("connection",function (socket){
    var address = socket.handshake;
    if(session.ip ==''){
        session.ip=funs.getExt(address.address,':') ;
    }
    //console.log('ip1: ' + address.address + ':' + address.port);
    //console.log('ket noi socket.io | '+socket.id);
    function InsertMes(data){
        var documents={};
        documents.adm_id=data.adm_id?data.adm_id:'';
        documents.use_id=data.use_id?data.use_id:'';
        documents.roo_id=data.roo_id?data.roo_id:'';
        documents.roo_type=data.roo_type?data.roo_type:'';
        documents.mes_text=funs.escapeHtml(data.mes_text);
        documents.use_cid=data.use_cid?data.use_cid:'';
        documents.mes_type=data.mes_type?data.mes_type:define.k_mes_type_txt;
        documents.adm_use=data.adm_use?data.adm_use:define.k_type_user;
        documents.use_icon=escape(data.use_icon);
        documents.mes_status='1';
        documents.created_at=timenow;
        documents.updated_at=timenow;
        model_messages.findOneAndUpdate(
            { "mes_text":documents.mes_text},{$set:documents},{upsert: true},function(err,doc) {
                if(err){
                    throw err;
                    funs.write_log('loi data: '+documents+' | cid:'+data.cid);
                }
            }
        );
        documents.mes=documents.mes_text;
        return documents;
    }
    let InsertUserOnline=function(data){
        return new Promise((resolve,reject)=>{
            var documents={};
            documents.soc_id=data.soc_id;
            documents.on_ip=data.on_ip?data.on_ip:'';
            documents.on_cid=data.on_cid;
            documents.on_name=data.on_name?data.on_name:'';
            documents.on_device=data.on_device?data.on_device:'';
            documents.on_type=data.on_type;
            documents.created_at=timenow;
            documents.updated_at=timenow;
            var _conditions={soc_id:documents.soc_id}
            model_onlines.findOneAndUpdate(
                _conditions,{$set:documents},{upsert: true},function(err,doc) {
                    if(err){
                        throw err;
                        funs.write_log('index/InsertUserOnline:loi data: '+documents+' | cid:'+data.cid);
                        return reject(new Error('co loi xay ra'));
                    }else{
                        resolve(doc)
                    }
                }
            );
        })

    }
    let GetUserOnlines=(con,sel)=>{
        if(sel){sel=sel;}else{sel={'on_cid':1, 'soc_id':1};}
        return new Promise((resolve,reject)=>{
            model_onlines.find(con,sel,function(err,data){
                if(err){
                    funs.write_log('index/GetUserOnlines:con:'+con);
                    return reject(new Error('index/GetUserOnlines | co loi xay ra'));
                }else{
                    resolve(data)
                }
            })
        })
    }
    let DelUserOnline=(con)=>{
        return new Promise((resolve,reject)=>{
            model_onlines.remove(con,function (err,data) {
                if(err){
                    funs.write_log('index/GetUserOnlines:con:'+con);
                    return reject(new Error('index/GetUserOnlines | co loi xay ra'));
                }else{
                    resolve(data)
                }
            })
        })
    }
    socket.on('ECliOnline',async function(data){
        var doc={};
        socket.cid=data.cid;
        socket.type_user=define.k_type_user;
        doc.soc_id=socket.id;
        doc.on_ip='';
        doc.on_cid=data.cid;
        doc.on_name='';
        doc.on_device=data.device;
        doc.on_type=define.k_type_user;
        await InsertUserOnline(doc);
        var use_token={ip:session.ip,cid:data.cid,browser_name:data.browser.name,browser_version:data.browser.version};
        use_token=JSON.stringify(use_token);
        use_token=funs.Base64Encode(use_token);
        use_token = use_token.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        socket.roo_id=use_token;
        socket.join(socket.roo_id);
        //get user online
        var con={on_cid:data.cid,on_type:define.k_type_user}
        var sel={'on_cid':1, 'soc_id':1};
        UserOnlines=await GetUserOnlines(con,sel);
        var RoomAdminCid=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        io.to(RoomAdminCid).emit('ECliOnlines',UserOnlines);
    })
    socket.on('ECliSendToAll',function(data){
        var doc_InsertMes={};
        doc_InsertMes.adm_id='';
        doc_InsertMes.use_id=data.use_id;
        doc_InsertMes.roo_id=socket.roo_id;
        doc_InsertMes.roo_type=data.roo_type;
        doc_InsertMes.mes_text=data.mes;
        doc_InsertMes.use_cid=data.cid;
        doc_InsertMes.mes_type='';
        doc_InsertMes.adm_use=define.k_type_user;
        doc_InsertMes.use_icon=data.icon;
        var documents=InsertMes(doc_InsertMes);
        var RoomAdminCid=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        //join de nhan tin nhan trong room
        socket.join(doc_InsertMes.roo_id);
        var dat={};
        dat.room=doc_InsertMes.roo_id;
        dat.socket_id=socket.id;
        dat.mes_text=doc_InsertMes.mes_text;
        socket.to(RoomAdminCid).emit('ESerSendToAll',dat);
        console.log('Cli send dau tien');
    })
    socket.on('ECliSendToRoom',function(data){
        var doc_InsertMes={};
        doc_InsertMes.adm_id='';
        doc_InsertMes.use_id=data.use_id;
        doc_InsertMes.roo_id=socket.roo_id;
        doc_InsertMes.roo_type=data.roo_type;
        doc_InsertMes.mes_text=data.mes;
        doc_InsertMes.use_cid=data.cid;
        doc_InsertMes.mes_type='';
        doc_InsertMes.adm_use=define.k_type_user;
        doc_InsertMes.use_icon=data.icon;
        var documents=InsertMes(doc_InsertMes);
        var NameRoom=socket.roo_id;
        socket.to(NameRoom).emit('ESerSendMesFromCli',documents);
        console.log('Cli send lan 2');
    })
    socket.on('disconnect',async function(){
        var id=socket.id;
        var cid=socket.cid;
        var RoomAdminCid=funs.ReNameRoom(cid,define.FixAdminRoom);
        var con={soc_id:id}
        DelUserOnline(con);
        var con={on_type:define.k_type_user,on_cid:cid}
        var UserOnlines=await GetUserOnlines(con);
        //update user onlines for all admins
        socket.to(RoomAdminCid).emit('ECliOnlines',UserOnlines);
        //thong bao co cho room biet co user off
        if(socket.room){
            var room_joined=socket.room;
            socket.to(room_joined).emit('ESerSendUseOffToRoom',{soc_id:id,room:room_joined})
        }
        funs.echo_log('disconnect : '+socket.id);
    });
    /*===========ADMIN================*/
    socket.on('EAdminOnline',async function(data){
        socket.cid=data.cid;
        socket.type_user=define.k_type_admin;
        var RoomAdminCid=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        socket.join(RoomAdminCid);
        //add to table k_onlines
        var docs={soc_id:socket.id,on_cid:data.cid,on_name:data.adm_name,on_type:define.k_type_admin}
        await InsertUserOnline(docs);
        var con={on_cid:socket.cid,on_type:define.k_type_user};
        var UserOnlines=await GetUserOnlines(con);
        io.to(RoomAdminCid).emit('ECliOnlines',UserOnlines);
    })
    socket.on('EAdmInsertMes',function(data){
        var doc_InsertMes={};
        doc_InsertMes.adm_id=data.adm_id;
        doc_InsertMes.use_id='';
        doc_InsertMes.roo_id=data.roo_id;
        doc_InsertMes.roo_type=data.roo_type;
        doc_InsertMes.mes_text=data.mes;
        doc_InsertMes.use_cid=data.cid;
        doc_InsertMes.mes_type='';
        doc_InsertMes.adm_use=define.k_type_admin;
        doc_InsertMes.use_icon=data.use_icon;
        var documents=InsertMes(doc_InsertMes);
        NameRoomCli=data.roo_id;
        socket.join(NameRoomCli);
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
//var rooms=require("./routers/frontend/rooms");
var kchat=require("./routers/kchat/kchat");
/*var ajax=require("./routers/frontend/ajax");*/
var admins=require("./routers/kadmin/admins");
var configs=require("./routers/kadmin/configs");
var customers=require("./routers/kadmin/customers");
var home=require("./routers/frontend/home");
//app.use('/',rooms);
app.use('/kchat',kchat);
app.use('/'+backend+'/admins',admins);
app.use('/'+backend+'/configs',configs);
app.use('/'+backend+'/customers',customers);
app.use('/',home);
/*app.use('/ajax',ajax);*/
