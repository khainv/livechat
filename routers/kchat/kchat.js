const express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var socket_io=require("socket.io");
var funs=require("../../funs.js");
funs =new funs;
var define=require("../../define.js");
define =new define;
require("../../models/k_messages");
const model_messages= mongoose.model("k_messages");

var timenow=new Date();
var crypto=require("crypto");
/*require("../../models/tbl_messages");*/
app.use(bodyParser.json());
/*var model_messages=mongoose.model('tbl_messages');*/
function getCid(){
    var Arr={"cid":'cid_123',domains:['benhtri168.com']};
    return Arr;
}
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
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});*/
router.get('/onstart',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    if(req.query.data){
        var str_obj=req.query.data;
        var str_obj=new Buffer(str_obj, 'base64').toString('ascii');
        var obj=JSON.parse(str_obj);
        if(obj.cid=='cid_123' && obj.domain=='phongkhamgiaiphong.com'){
            if(obj.device=='1'){
                var obj = {res_code:'K_1',device:1,online:1}
                var str_obj=JSON.stringify(obj);
                res.send(str_obj);
            }else{
                var obj={res_code:'K_1',device:0,online:1}
                var str_obj=JSON.stringify(obj);
                res.send(str_obj);
            }
        }else{
            var obj={res_code:'K_0'}
            res.send(str_obj);
        }
    }
    else{
        var obj={res_code:'K_0'}
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
module.exports = router;

