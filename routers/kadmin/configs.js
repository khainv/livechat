var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended:true}))
require("../../models/k_configs");
var model_configs=mongoose.model('k_configs');
app.use(bodyParser.json());
var funs=require('../../funs');
funs=new funs;
var define=require('../../define');
define=new define;
router.get('/index', function (req, res) {
    if(!req.session.adm_cid){
        return res.redirect('/'+define.backend+'/admins/login');
    }
    var cid=req.session.adm_cid;
    var conditions={con_cid:cid};
    model_configs.findOne(conditions,function(err,data){
        if(err){
            res.render('./kadmin/configs/index.ejs');
        }else{
            res.render('./kadmin/configs/index.ejs',{data:data});
        }
    })
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/index',urlencodedParser,function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var con_cid=req.session.adm_cid
    var con_prompt=req.body.con_prompt;
    var con_hi=req.body.con_hi;
    var con_status =req.body.con_status;
    var con_boxchat_banner =req.body.con_boxchat_banner;
    var conditions={con_cid:con_cid};
    var doc={con_prompt:con_prompt,con_hi:con_hi,con_boxchat_banner:con_boxchat_banner,con_status:con_status};
    model_configs.findOneAndUpdate(conditions,doc,{new: true},function(err,data){
        console.log(data);
    });
    return res.redirect('/kadmin/configs/index')
})
router.get('/add', function (req, res) {
    res.render('./kadmin/configs/add.ejs');
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/add',urlencodedParser,function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var con_cid=req.session.adm_cid
    var con_prompt=req.body.con_prompt;
    var con_hi=req.body.con_hi;
    var con_status =req.body.con_status;
    var con_boxchat_banner =req.body.con_boxchat_banner;
    var conditions={con_cid:con_cid};
    var doc={con_prompt:con_prompt,con_hi:con_hi,con_boxchat_banner:con_boxchat_banner,con_status:con_status};
    console.log(doc);
    model_configs.findOneAndUpdate(conditions,{$set:doc},{upsert: true},function(err,data){
        //console.log(data);
    });
    return res.redirect('/kadmin/configs/index')
})
module.exports = router;
