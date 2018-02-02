const express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var socket_io=require("socket.io");
var funs=require("../../funs.js");
var funs =new funs;
var define=require("../../define.js");
define =new define;
require("../../models/k_messages");
const model_messages= mongoose.model("k_messages");
require("../../models/k_customers");
const model_customers= mongoose.model("k_customers");
require("../../models/k_onlines");
const model_onlines= mongoose.model("k_onlines");
require("../../models/k_users");
const model_users= mongoose.model("k_users");
require("../../models/k_configs");
const model_configs= mongoose.model("k_configs");
var timenow=new Date();
var crypto=require("crypto");
app.use(bodyParser.json());
const http=require("http");
var server=http.Server(app);
const io=socket_io(server);
//them io vao app
//app.io = io;
app.use(bodyParser.json());
var multer=require('multer');
var storage=multer.diskStorage({
    destination :function (req,file,cb) {
        var path_file=funs.path_upload_today('benhtri168.com');
        cb(null, path_file.path_full);
    },
    filename:function (req,file,cb) {
        var re_name=funs.rewrite_filename(file.originalname);
        cb(null,re_name);
    }
});
function FileAllowTypeImg(req,file,cb) {
    var ext=funs.getExt(file.originalname);
    var allow_type_image=funs.allow_type_image();
    if(allow_type_image.indexOf(ext) != -1){
        cb(null,true);
    }else{
        return cb(new Error('file không đúng định dạng'));
    }
}
function FileAllowType(req,file,cb) {
    var ext=funs.getExt(file.originalname);
    var allow_type_all=funs.allow_type_all();
    if(allow_type_all.indexOf(ext) != -1){
        cb(null,true);
    }else{
        funs.write_log('router/kchat | file khong dung dinh dang | ext:'+ext);
        return cb(new Error('file không đúng định dạng'));
    }
}
var upload  =multer({storage:storage,fileFilter:FileAllowTypeImg});
var uploadfile=multer({storage:storage,fileFilter:FileAllowType});
router.get('/onstart',async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    if(req.query.data){
        var str_obj=req.query.data;
        var str_obj=new Buffer(str_obj, 'base64').toString('ascii');
        var objs=JSON.parse(str_obj);
        let GetCustomerByCid=(_con)=>{
            return new Promise((resolve,reject)=> {
                model_customers.findOne(_con, function (err, data) {
                    if(err){
                        funs.write_log('router/kchat:GetCustomerByCid | '+err);
                        return reject(new Error('co loi xay ra'))
                    }
                    resolve(data)
                })
            })
        }
        let CheckAdminOnlineByCid=(_con)=>{
            return new Promise((resolve,reject)=>{
                model_onlines.findOne(_con,function(err,data){
                    if(err){
                        funs.write_log('router/kchat:CheckAdminOnlineByCid | '+err);
                        return reject(new Error('co loi xay ra'))
                    }
                    resolve(data)
                })
            })
        }
        let GetConfigsByCid=(_con)=>{
            return new Promise((resolve,reject)=>{
                model_configs.findOne(_con,function(err,data){
                    if(err){
                        funs.write_log('router/kchat:GetConfigsByCid | '+err);
                        return reject(new Error('co loi xay ra'))
                    }
                    resolve(data);
                })
            });
        };
        let InsertUsers=function InsertMes(data){
            return new Promise((resolve,reject)=>{
                var documents={};
                documents.use_cid=data.use_cid;
                if(data.use_name==null || data.use_name==undefined){
                    documents.use_name='';
                }else{
                    documents.use_name=data.use_name;
                }
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
        //kiem tra xem co ton tai cid nay khong
        var conditions={cus_cid:objs.cid}
        var Cus=await GetCustomerByCid(conditions);
        if(Cus != null){
            //tao token
            var ip = funs.GetIp(req);
            var arr_domains=Cus.cus_domains.split('|');
            //add user
            data={};
            data.use_cid=objs.cid;
            var use_token={ip:ip,cid:data.use_cid,browser_name:objs.browser.name,browser_version:objs.browser.version};
            use_token=JSON.stringify(use_token);
            use_token=funs.Base64Encode(use_token);
            use_token = use_token.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            data.token=use_token;
            var user=await InsertUsers(data);
            //kiem tra xem co nam trong danh sach domain dang ky khong
            if(arr_domains.indexOf(objs.domain) >-1){
                //kiem tra xem co admin nao online khong
                var conditions={on_cid:objs.cid,on_type:define.k_type_admin};
                var AdminOnline=await CheckAdminOnlineByCid(conditions);
                //get configs of customer
                var conditions={con_cid:objs.cid};
                var ConfigsOfCus= await GetConfigsByCid(conditions);
                var data={};
                if(ConfigsOfCus == null){
                    var str_obj={res_code:'K_0','err':'cus have not configs'};
                    res.send(str_obj);
                }else{
                    data.con_cid=ConfigsOfCus.con_cid;
                    data.con_prompt=ConfigsOfCus.con_prompt;
                    data.con_hi=ConfigsOfCus.con_hi;
                    data.con_boxchat_banner=ConfigsOfCus.con_boxchat_banner;
                    data.con_status=ConfigsOfCus.con_status;
                    data.use_id=user._id;
                    data.token=use_token;
                }
                if(AdminOnline !=null){
                    data.adm_name=AdminOnline.on_name;
                    if(objs.device==define.k_device_mobile){
                        var obj = {res_code:'K_1',device:define.k_device_mobile,online:1}
                    }else{
                        var obj = {res_code:'K_1',device:define.k_device_pc,online:1}
                    }
                    var rs=Object.assign(data, obj);
                    var str_obj=JSON.stringify(rs);
                    res.send(str_obj);
                }else{
                    var str_obj={res_code:'K_0',online:0,err:'not admin online'}
                    res.send(str_obj);
                }
            }else{
                var str_obj={res_code:'K_0','err':'not in list domains'};
                res.send(str_obj);
            }
        }else{
            var str_obj={res_code:'K_0','err':'not exits customer'};
            res.send(str_obj);
        }
    }
    else{
        var str_obj={res_code:'K_0','err':'not data send to server'}
        res.send(str_obj);
    }
})
router.post('/clientupimg',upload.single("File1"),function(req,res){
    if(res.status(204).end()==true){
        var a=req.body;
        var filenote=req.body.filenote;
        var cid=req.body.cid;
        var sid=req.body.sid;
        var domain=req.body.domain;
        var socket_id=req.body.socketid;
        var new_img2=req.file;
        var new_img='';
        if(new_img2.originalname){
            new_img=funs.rewrite_filename(new_img2.originalname);
            new_img=funs.path_upload_today('benhtri168.com').path+'/'+new_img;
            new_img=define.k_domain+new_img;
        }
        var documents={};
        documents.mes_text=funs.escapeHtml(filenote);
        documents.socket_id=socket_id;
        documents.socket_room=socket_id;
        documents.created_at=timenow;
        documents.updated_at=timenow;
        documents.mes_file=new_img;
        model_messages.create(documents, function (err, small) {
            if (err) {
                return handleError(err);
            }
        })
        new_img='<img src="'+new_img+'">';
        req.app.io.emit('up_img_true',new_img);
    }else{
        req.app.io.emit('up_img_failed');
    }
})
router.post('/clientupfile',uploadfile.single("File1"),function(req,res){
    if(res.status(204).end()==true){
        var a=req.body;
        var filenote=req.body.filenote;
        var cid=req.body.cid;
        var sid=req.body.sid;
        var domain=req.body.domain;
        var socket_id=req.body.socketid;
        var new_img2=req.file;
        var new_img='';
        if(new_img2.originalname){
            new_img=funs.rewrite_filename(new_img2.originalname);
            new_img=funs.path_upload_today('benhtri168.com').path+'/'+new_img;
            new_img=define.k_domain+new_img;
        }
        var documents={};
        documents.mes_text=funs.escapeHtml(filenote);
        documents.socket_id=socket_id;
        documents.socket_room=socket_id;
        documents.created_at=timenow;
        documents.updated_at=timenow;
        documents.mes_file=new_img;
        model_messages.create(documents, function (err, small) {
            if (err) {
                return handleError(err);
            }
        })
        var ext=funs.getExt(new_img);
        var allow_type_img=funs.allow_type_image();
        if(allow_type_img.indexOf(ext) != -1){
            new_img='<img src="'+new_img+'">';
        }else{
            new_img='<a href="'+new_img+'">'+new_img2.originalname+'</a>';
        }
        req.app.io.emit('up_img_true',new_img);
    }else{
        req.app.io.emit('up_img_failed');
    }
})
router.get('/', function (req, res) {
    /*io.on("connection",function (socket) {
        socket.on('C_get_html1',function(data){
            if(data.cid==1 && data.domain){}
        })
    })*/
});
router.get('/test',function(req,res){
    console.log('ban dang o kchat/test');
})
router.get('/chat',async function (req,res) {
    let GetCustomerByCid=(_con)=>{
        return new Promise((resolve,reject)=> {
            model_customers.findOne(_con, function (err, data) {
                if(err){
                    funs.write_log('router/kchat:GetCustomerByCid | '+err);
                    return reject(new Error('co loi xay ra'))
                }
                resolve(data)
            })
        })
    }
    let CheckAdminOnlineByCid=(_con)=>{
        return new Promise((resolve,reject)=>{
            model_onlines.findOne(_con,function(err,data){
                if(err){
                    funs.write_log('router/kchat:CheckAdminOnlineByCid | '+err);
                    return reject(new Error('co loi xay ra'))
                }
                resolve(data)
            })
        })
    }
    var cid=req.query.cid;
    var domain=req.query.domain;
    var conditions={cus_cid:cid}
    var Cus=await GetCustomerByCid(conditions);
    if(Cus != null){
        var arr_domains=Cus.cus_domains.split('|');
        //kiem tra xem co nam trong danh sach domain dang ky khong
        if(arr_domains.indexOf(domain) >-1){
            //kiem tra xem co admin nao online khong
            var conditions={use_cid:cid,use_type:define.k_type_admin};
            var Admin=await CheckAdminOnlineByCid(conditions);
            if(Admin != null){
                res.render('./kchat/kchat/chat.ejs');
            }else{
                res.send('khong co admin nao online');
            }
        }
    }else{
        res.send('thong tin khong dung');
    }
})
var formidable = require('formidable');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/demoupfile',urlencodedParser,async function (req,res) {
    let RenameFile=(pathold,pathnew,new_img)=>{
        return new Promise((resolve,reject)=>{
            fs.rename(pathold, pathnew, function (err) {
                if (err){
                    console.log(err);
                    var str='kchat/kchat.demoupfile:UploadFile|cid:'+cid+'|err:'+err;
                    funs.write_log(str);
                    return reject(err);
                }else{
                    resolve(new_img);
                }
            });
        })
    }
    let UploadFile=(File1,PathOption)=>{
        return new Promise((resolve,reject)=> {
            var form = new formidable.IncomingForm();
            form.uploadDir=PathOption.path_full;
            form.keepExtensions=true;
            form.maxFieldsSize=funs.allow_zise_img();
            form.parse(req,(err,fields,files)=>{
                if(err){
                    console.log(err);
                    var str='kchat/demoupfile:UploadFile|cid:'+cid+'|err:'+err;
                    funs.write_log(str);
                    return reject(new Error('co loi xay ra'))
                }else{
                    var oldpath = files.File1.path;
                    var newpath = PathOption.path_full+'/'+funs.rewrite_filename(files.File1.name);
                    var new_img = PathOption.path+'/'+funs.rewrite_filename(files.File1.name);
                    resolve({oldpath:oldpath,newpath:newpath,new_img:new_img});
                }
            })
        })
    }
    /*chay chinh*/
    if(res.status(204).end()==true){
        var filenote=req.body.filenote;
        var cid=req.body.cid;
        var domain=req.body.domain;
        var socket_id=req.body.socketid;
        var new_img='';
        var abc=funs.path_upload_today(domain);
        var new_img2=await UploadFile(req.body.File1,abc);
        new_img=await RenameFile(new_img2.oldpath,new_img2.newpath,new_img2.new_img)
        var documents={};
        documents.mes_text=funs.escapeHtml(filenote);
        documents.mes_file=new_img;
        documents.created_at=timenow;
        documents.updated_at=timenow;
        model_messages.create(documents, function (err, small) {
            if (err) {
                console.log(err);
                var str='kchat/kchat.demoupfile:insert to messages|cid:'+cid;
                funs.write_log(str);
                return handleError(err);
            }
        })
        var ext=funs.getExt(new_img);
        var allow_type_img=funs.allow_type_image();
        if(allow_type_img.indexOf(ext) != -1){
            new_img='<img src="'+new_img+'">';
        }else{
            new_img='<a href="'+new_img+'">'+new_img+'</a>';
        }
        req.app.io.emit('up_img_true',new_img);
    }else{
        req.app.io.emit('up_img_failed');
    }
})
router.get('/getmesbyroomid',function (req,res) {
    if(req.query.roo_id){
        var roo_id=req.query.roo_id;
        conditions={roo_id:roo_id}
        model_messages.find(conditions,function(err,data){
            if(err){
                res.send('co loi');
                funs.write
            }else{
                res.send(data);
            }
        })
    }else{
        res.send('co loi 2')
    }
})
module.exports = router;

