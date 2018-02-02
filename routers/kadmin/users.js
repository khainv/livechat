var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
app.use(bodyParser.urlencoded({extended:true}))
/*app.use(session({secret:'secret'}))*/
app.use(passport.initialize())
app.use(passport.session())
require("../../models/k_messages");
var model_messages=mongoose.model('k_messages');
app.use(bodyParser.json());
var define=require('../../define');
define=new define;
var funs=require('../../funs');
funs=new funs;
router.get('/login', function (req, res) {
    if(req.session.adm_name){
        return res.redirect('/'+define.backend+'/users/index');
    }
    res.render('./kadmin/users/login.ejs')
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/login',urlencodedParser, function (req, res) {
    if(req.body){
        var user=req.body.username;
        var pass=req.body.passsword;
        var cid=req.body.cid;
        if(user=='admin' && pass=='123' && cid=='cid_123'){
            req.session.adm_name=user;
            req.session.adm_pass=pass;
            req.session.adm_cid=cid;
            return res.redirect('/'+define.backend+'/users/index');
        }else{
            return res.redirect('/'+define.backend+'/users/login');
        }
    }
    return res.redirect('/'+define.backend+'/users/login');
});
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        // cannot access session here
    })
    return res.redirect('/'+define.backend+'/users/login');
})
router.get('/index', function (req, res) {
    res.render('./kadmin/users/index.ejs')
});
module.exports = router;