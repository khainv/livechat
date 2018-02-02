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
let port = process.env.PORT || define.k_port;
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
require("./models/k_onlines");
const model_onlines=mongoose.model("k_onlines");
require("./models/k_users");
const model_users=mongoose.model("k_users");
require("./models/k_rooms");
const model_rooms=mongoose.model("k_rooms");
var adm_cid='';
io.on("connection",async function (socket){
    var address = socket.handshake;
    if(session.ip ==''){
        session.ip=funs.getExt(address.address,':') ;
    }
    function InsertMes(data){
        var documents={};
        documents.adm_id=data.adm_id?data.adm_id:'';
        documents.use_chat=data.use_chat?data.use_chat:'';
        documents.roo_id=mongoose.Types.ObjectId(data.roo_id)?mongoose.Types.ObjectId(data.roo_id):'';
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
    let GetRoom=(con)=>{
        return new Promise((resolve,reject)=>{
            model_rooms.findOne(con,function(err,data){
                if(err){
                    funs.write_log('/index:getname | '+err);
                    return reject(new Error('co loi xay ra'));
                }else{
                    resolve(data);
                }
            })
        })
    }
    let GetMesOneOffRoom=(con)=>{
        return new Promise((resolve, reject) => {
            var sel={roo_name:1}
            model_rooms.find(con,sel,function(err,rooms){
                if(err){
                    funs.write_log('/index:getname | '+err);
                    return reject(new Error('co loi xay ra'));
                }else{
                    if(rooms!=null){
                        var i=-1;
                        rooms.forEach(function (dat) {
                            i++;
                            rooms[i].mes={};
                            var con={roo_id:dat._id};
                            model_messages.findOne(con,null,{sort: {'_id': -1}},function (err,data){
                                if(data!=null){
                                    console.log('abc:'+i);
                                    rooms[i].mes=data;
                                }
                            })
                            funs.write_log('index:GetRoomsChatByAdm:'+JSON.stringify(con));
                        })
                        resolve(rooms);
                    }
                }
            }).limit(10)
        })
    }
    let CreateRoom=(obj)=>{
        return new Promise((resolve,reject)=>{
            var documents={};
            documents.roo_name=obj.roo_name?obj.roo_name:'';
            documents.roo_members=[obj.use_id]
            documents.roo_token=obj.roo_token?obj.roo_token:'';
            documents.roo_type=obj.roo_type?obj.roo_type:'';
            documents.created_at=timenow;
            documents.updated_at=timenow;
            documents.roo_status=obj.roo_status?obj.roo_status:'1';
            model_rooms.findOneAndUpdate(
                { "roo_token":documents.roo_token},{$set:documents},{upsert: true},function(err,doc) {
                    if(err){
                        throw err;
                        funs.write_log('loi data: '+documents+' | cid:'+data.cid);
                        return reject(new Error('co loi xay ra'));
                    }else{
                        if(doc!=null){
                            documents.roo_name=doc.roo_name;
                            documents._id=doc._id;
                        }
                        resolve(documents)
                    }
                }
            );
        })
    }
    let InsertUserToRoom=(obj)=>{
        return new Promise((resolve, reject) => {
            var con={_id:obj.roo_id,roo_members:obj.use_id}
            model_rooms.findOne(con,function (err,data) {
                if(err){
                    console.log(err)
                    funs.write_log('index:InsertUseToRoom|err:'+err);
                    return reject(err);
                }else{
                    if(data==null){
                        var con={_id:obj.roo_id};
                        var roo_member=mongoose.Types.ObjectId(obj.use_id);
                        var update={roo_members:roo_member};
                        var rom=mongoose.model('k_rooms');
                        rom.update(con,{ $push: update},function (err,data) {
                            if(err){
                                console.log(err)
                                funs.write_log('index:InsertUserToRoom|err:'+err);
                            }
                        });
                    }
                }
            })
        })
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
    let InsertUser=function InsertMes(data){
        return new Promise((resolve,reject)=>{
            var documents={};
            documents.use_cid=data.use_cid;
            documents.use_name='';
            documents.use_token=data.token;
            documents.use_status='1';
            documents.created_at=timenow;
            documents.updated_at=timenow;
            model_users.findOneAndUpdate(
                { "use_token":documents.use_token},{$set:documents},{upsert: true},function(err,doc) {
                    if(err){
                        throw err;
                        funs.write_log('/kchat:InsertUsers | '+documents);
                        return reject(new Error('co loi xay ra'));
                    }else{
                        if(doc!=null){
                            documents.use_name=doc.use_name;
                            documents._id=doc._id;
                        }
                        resolve(documents)
                    }
                }
            );
        })
    }
    let GetUser=(con,sel)=>{
        if(sel){sel=sel;}else{sel={'use_name':1}}
        return new Promise((resolve,reject)=>{
            model_users.findOne(con,sel,function(err,data){
                if(err){
                    funs.write_log('index/GetUser:con:'+con);
                    return reject(new Error('index/GetUser | co loi xay ra'));
                }else{
                    resolve(data)
                }
            })
        })
    }
    socket.on('ECliOnline',async function(data){
        socket.cid=data.cid;
        socket.type_user=define.k_type_user;
        var use_token={ip:session.ip,cid:data.cid,browser_name:data.browser.name,browser_version:data.browser.version};
        use_token=JSON.stringify(use_token);
        use_token=funs.Base64Encode(use_token);
        use_token = use_token.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        socket.token=use_token;
        //get user
        var con={use_token:use_token};
        var user=await GetUser(con);
        if(user!=null){
            socket.use_id=user._id;
            socket.use_name=user.use_name;
        }else{
            //insert users
            var doc={};
            doc.use_cid=data.cid;
            doc.token=use_token;
            var user=await InsertUser(doc);
            socket.use_id=user._id;
            socket.use_name=user.use_name;
        }
        //add users online
        var doc={};
        doc.soc_id=socket.id;
        doc.on_ip=session.ip
        doc.on_cid=data.cid;
        doc.on_name=user.use_name;
        doc.on_device=data.device;
        doc.on_type=define.k_type_user;
        await InsertUserOnline(doc);
        var doc={use_id:user._id,token:user.token};
        socket.emit('ESerResCliOnline',doc);
        //get users online
        var con={on_cid:data.cid,on_type:define.k_type_user}
        var sel={'on_cid':1, 'soc_id':1};
        UserOnlines=await GetUserOnlines(con,sel);
        var RoomAdminCid=funs.ReNameRoom(data.cid,define.FixAdminRoom);
        io.to(RoomAdminCid).emit('ECliOnlines',UserOnlines);
    })
    socket.on('ECliSendToAll',async function(data){
        //creat room
        if(socket.roo_id==undefined){
            var con={roo_token:socket.token};
            var room=await GetRoom(con);
            if(room!=null){
            }else{
                var doc={};
                doc.roo_name=socket.id;
                doc.use_id=socket.use_id;
                doc.roo_token=socket.token;
                doc.roo_type=define.k_room_type_default;
                var room=await CreateRoom(doc);
            }
            socket.roo_id=room._id;
        }
        //add mes
        var doc_InsertMes={};
        doc_InsertMes.adm_id='';
        doc_InsertMes.use_chat={use_id:socket.use_id,use_name:socket.use_name};
        doc_InsertMes.roo_id=socket.roo_id;
        doc_InsertMes.roo_type=define.k_room_type_default;
        doc_InsertMes.mes_text=data.mes;
        doc_InsertMes.use_cid=socket.cid;
        doc_InsertMes.mes_type='';
        doc_InsertMes.adm_use=define.k_type_user;
        doc_InsertMes.use_icon=data.icon;
        var documents=await InsertMes(doc_InsertMes);
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
        doc_InsertMes.use_chat={use_id:socket.use_id,use_name:socket.use_name};
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
        adm_cid=data.cid;
        console.log('EAdminOnline');
        socket.adm_id=mongoose.Types.ObjectId(data.adm_id);
        socket.adm_name=data.adm_name;
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
        doc_InsertMes.adm_id=socket.adm_id;
        doc_InsertMes.use_chat={use_id:socket.adm_id,use_name:socket.adm_name};
        doc_InsertMes.roo_id=mongoose.Types.ObjectId(data.roo_id);
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
        socket.broadcast.to(NameRoom).emit('ESerSendCancelJoinRoom',{room:data.room})
    })
    socket.on('EAdmInsertToRoom',async function (data) {
        await InsertUserToRoom(data);
    })
    socket.on('GetRoomsChatByAdm',async function (data) {
        let getroomsbyadmin_id=(con)=>{
            return new Promise((resolve, reject) => {
                var sel={roo_name:1}
                model_rooms.find(con,sel,function(err,data){
                    if(err){
                        return reject(err);
                    }else{
                        resolve(data);
                    }
                }).limit(10);
            })
        }
        async function ForRoom(rooms){
            var a=rooms.map(function (val,key) {
                var con={roo_id:val._id};
                return model_messages.findOne(con,null,{sort: {'_id': -1}}).exec();
            })
            return Promise.all(a);
        }
        var con={roo_members:data}
        var rooms=await getroomsbyadmin_id(con);
        var rooms2=await ForRoom(rooms);
        socket.emit('ESerGetRoomsChatByAdm',{rooms:rooms,mes:rooms2})
    })
    /*=========ENDADMIN==============*/
});
/*DEMO upload file trong editor*/
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/upload',urlencodedParser, async function(req, res) {
    let RenameFile=(pathold,pathnew,new_img)=>{
        return new Promise((resolve,reject)=>{
            fs.rename(pathold, pathnew, function (err) {
                if (err){
                    console.log(err);
                    var str='index/upload:RenameFile|err:'+err;
                    funs.write_log(str);
                    return reject(err);
                }else{
                    resolve(new_img);
                }
            });
        })
    }
    let UploadFile=(upload,PathOption)=>{
        return new Promise((resolve,reject)=> {
            var form = new formidable.IncomingForm();
            form.uploadDir=PathOption.path_full;
            form.keepExtensions=true;
            form.maxFieldsSize=funs.allow_zise_img();
            form.parse(req,(err,fields,files)=>{
                if(err){
                    console.log(err);
                    var str='kchat/demoupfile:UploadFile|err:'+err;
                    funs.write_log(str);
                    return reject(new Error('co loi xay ra'))
                }else{
                    var oldpath = files.upload.path;
                    var newpath = PathOption.path_full+'/'+funs.rewrite_filename(files.upload.name);
                    var new_img = PathOption.path+'/'+funs.rewrite_filename(files.upload.name);
                    resolve({oldpath:oldpath,newpath:newpath,new_img:new_img});
                }
            })
        })
    }
    var domain='editor_'+adm_cid;
    var pathfile=funs.path_upload_today(domain);
    var new_img2=await UploadFile(req.body.upload,pathfile);
    var new_img=await RenameFile(new_img2.oldpath,new_img2.newpath,new_img2.new_img);
    var html = '';
    html += "<script type='text/javascript'>";
    html += " var funcNum = " + req.query.CKEditorFuncNum + ";";
    //html += " var url = \"/uploads/" + new_img + "\";";
    html += " var url = \""+new_img+"\";";
    html += " var message = \"Uploaded file successfully\";";
    html += "";
    html += " window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
    html += '</script>';
    res.send(html);
});
/*END DEMO*/
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
