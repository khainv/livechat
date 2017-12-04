var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var multer=require('multer');
var funs=require("../../funs.js");
require("../../models/tbl_messages");
var model_messages=mongoose.model('tbl_messages');
app.use(bodyParser.json());
funs=new funs;
var timenow=new Date();
var room_name='';
/*body-parser*/
var urlencodedParser=bodyParser.urlencoded({extended:true});
/*upload file*/
var storage=multer.diskStorage({
    destination :function (req,file,cb) {
        var path_file=funs.path_upload_today();
        cb(null, path_file.path_full);
    },
    filename:function (req,file,cb) {
        var re_name=funs.rewrite_filename(file.originalname);
        cb(null,re_name);
    }
});
function FileAllowType(req,file,cb) {
    var ext=funs.getExt(file.originalname);
    var allow_type_all=funs.allow_type_all();
    if(allow_type_all.indexOf(ext) != -1){
        cb(null,true);
    }else{
        return cb(new Error('file không đúng định dạng'));
    }
}
var upload  =multer({storage:storage,fileFilter:FileAllowType});
/*end upload*/
router.post('/share-file-to-room',upload.single("upfile"),function(req,res){
    var file2=req.file;
    var room_name=req.body.room_name;
    var file_name='';
    if(file2.originalname){
        file_name=funs.rewrite_filename(file2.originalname);
        file_name=funs.path_upload_today().path+'/'+file_name;
    }
    var ext=funs.getExt(file_name);
    if(funs.allow_type_image().indexOf(ext)!= -1){
        var file_type='image';
        var file_txt='<img src="'+file_name+'" style="max-width:100%">'

    }else{
        var file_type='file';
        var file_txt='<a href="'+file_name+'" target="_blank">download</a>';
    }
    var obj={
        use_id:req.session.use_id,
        fil_name:file_name,
        fil_type:file_type,
        roo_name:room_name,
        created_at:timenow,
        updated_at:timenow,
        new_status:1};
    model_files(obj).save(function(err,doc){
        if(err){
            funs.write_log('ajax/share-file-to-room | not inset to tbl_files | obj: '+obj);
            res.send('err');
        }else{
            var _id=new mongoose.mongo.ObjectID();
            var obj={
                use_id_from:req.session.use_id,
                use_name_from:req.session.use_name,
                use_account_from:req.session.use_account,
                use_id_to:'',
                use_name_to:'',
                use_account_to:'',
                mes_text:file_txt,
                mes_file:'',
                mes_status:'1',
                gro_id:'',
                gro_code:room_name,
                gro_name:room_name,
                created_at:timenow,
                updated_at:timenow
            };
            model_messages(obj).save(function(err,doc){
                if(err){
                    funs.write_log('ajax/share-file-to-room | not inset to tbl_messages | obj: '+obj);
                    res.send('err');
                }else{
                    var obj={file_name:file_name,file_type:file_type,use_name:req.session.use_name}
                    res.send(obj);
                }
            })
        }
    });
})
module.exports = router;
