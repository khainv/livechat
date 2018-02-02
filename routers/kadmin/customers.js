var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended:true}))
require("../../models/k_customers");
var model_customers=mongoose.model('k_customers');
app.use(bodyParser.json());
var define=require('../../define');
define=new define;
var funs=require('../../funs');
funs=new funs;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/index', function (req, res) {
    if(req.session.adm_cid){
        var cid=req.session.adm_cid;
        var conditions={cus_cid:cid};
        model_customers.find(conditions,function(err,data){
            if(err){
                console.log('bao loi');
            }else{
                res.render('./kadmin/customers/index.ejs',{datas:data});
            }
        })
    }else{
        return res.redirect('/'+define.backend+'/admins/login');
    }
});
router.get('/add', function (req, res) {
    var cid=req.session.adm_cid;
    var conditions={con_cid:cid};
    res.render('./kadmin/customers/add.ejs');
});
router.post('/add',urlencodedParser,function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var cus_cid=req.body.cus_cid;
    var cus_name =req.body.cus_name;
    var cus_domains =req.body.cus_domains;
    var cus_domains_number =req.body.cus_domains_number;
    var cus_status ='1';
    var conditions={cus_cid:cus_cid};
    var doc={cus_name:cus_name,cus_domains:cus_domains,cus_domains_number:cus_domains_number,cus_status:cus_status};
    model_customers.findOneAndUpdate(conditions,doc,{upsert: true},function(err,data){
        console.log(data);
    });
    return res.redirect('/kadmin/customers/index')
})
module.exports = router;
