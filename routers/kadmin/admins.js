var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var socket_io=require("socket.io");
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
app.use(bodyParser.urlencoded({extended:true}))
/*app.use(session({secret:'secret'}))*/
app.use(passport.initialize())
app.use(passport.session())
require("../../models/k_admins");
var model_admins=mongoose.model('k_admins');
require("../../models/k_onlines");
var k_onlines=mongoose.model('k_onlines');
require("../../models/k_rooms");
var model_rooms=mongoose.model('k_rooms');
app.use(bodyParser.json());
const http=require("http");
var server=http.Server(app);
const io=socket_io(server);
//them io vao app
app.io = io;
var define=require('../../define');
define=new define;
var funs=require('../../funs');
funs=new funs;
router.get('/loginnhanh',function (req,res) {
    var acc=req.query.acc;
    var pass=req.query.pass;
    var cid=req.query.cid;
    /*req.session.adm_name=acc;
    req.session.adm_pass=pass;
    req.session.adm_cid=cid;
    return res.redirect('/'+define.backend+'/admins/chat');*/
    var conditions={adm_account:acc,adm_pass:pass,adm_cid:cid}

    model_admins.findOne(conditions,function(err,data){
        if(err){
            funs.write_log('/admins/login | '+err);
        }else{
            if(data!=null){
                req.session.adm_name=acc;
                req.session.adm_pass=pass;
                req.session.adm_cid=cid;
                req.session.adm_id=data._id;
                return res.redirect('/'+define.backend+'/admins/chat');
            }else{
                return res.redirect('/'+define.backend+'/admins/login');
            }
        }
    })
})
router.get('/',function (req,res) {
    if(req.session.adm_name){
        return res.redirect('/'+define.backend+'/admins/index');
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
})
router.get('/login', function (req, res) {
    if(req.session.adm_name){
        return res.redirect('/'+define.backend+'/admins/index');
    }
    res.render('./kadmin/admins/login.ejs');
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/login',urlencodedParser, function (req, res,next) {
    if(req.body){
        var user=req.body.adm_account;
        var pass=req.body.adm_pass;
        var cid=req.body.adm_cid;
        var conditions={adm_account:user,adm_pass:pass,adm_cid:cid}
        model_admins.findOne(conditions,function(err,data){
            if(err){
                funs.write_log('/admins/login | '+err);
            }else{
                if(data!=null){
                    req.session.adm_name=user;
                    req.session.adm_pass=pass;
                    req.session.adm_cid=cid;
                    req.session.adm_id=data._id;
                    return res.redirect('/'+define.backend+'/admins/chat');
                }else{
                    return res.redirect('/'+define.backend+'/admins/login');
                }
            }
        })
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
});
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        // cannot access session here
    })
    return res.redirect('/'+define.backend+'/admins/login');
});
router.get('/index', function (req, res) {
    if(req.session.adm_cid){
        var conditions={adm_cid:req.session.adm_cid};
        model_admins.find(conditions,function(err,data){
            if(err){
                console.log('bao loi');
            }else{
                /*console.log(data);*/
                res.render('./kadmin/admins/index.ejs',{datas:data});
            }
        })
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
});
router.get('/add',function(req,res){
    if(req.session.adm_cid){
        res.render('./kadmin/admins/add.ejs');
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
});
router.post('/add',urlencodedParser,function(req,res){
    if(req.session.adm_cid){
        var adm_name=req.body.adm_name;
        var adm_account=req.body.adm_account;
        var adm_pass=req.body.adm_pass;
        var adm_pass2=req.body.adm_pass2;
        var adm_group=req.body.adm_group;
        var adm_status=req.body.adm_status;
        var adm_cid=req.session.adm_cid;
        if(!adm_account){
            var mes='bạn chưa nhập Account';
        }
        if(adm_pass!=adm_pass2){
            var mes='Password không trùng nhau';
        }
        if(adm_cid=='undefined'){
            mes='Mời bạn đăng nhập lại';
        }
        var condition={adm_cid:adm_cid,adm_account:adm_account,adm_pass:adm_pass};
        var documents={adm_name:adm_name,adm_account:adm_account,adm_pass:adm_pass,adm_group:adm_group,adm_status:adm_status,adm_cid:adm_cid};
        console.log(condition);
        model_admins.findOneAndUpdate(condition,{$set:documents},{upsert: true},function(err,doc) {
            if(err){
                throw err;
                funs.write_log('admins/add | loi data: '+documents);
            }else{
            }
        })
        return res.redirect('/'+define.backend+'/admins/index')
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
});
router.get('/chat',function(req,res){
    if(req.session.adm_cid){
        req.app.io.emit('EAdminOnline',req.session.adm_cid);
        res.render('./'+define.backend+'/admins/chat.ejs');
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
})
module.exports = router;