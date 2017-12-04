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
var funs=require('../../funs');
funs=new funs;
router.get('/login', function (req, res) {
    res.render('./kadmin/users/login.ejs')
});
router.post('/login', function (req, res) {
    console.log('khainv');
    passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/loginok'})
});
/*app.route('/login')
    .get((req,res)=>res.render('./kadmin/users/login.ejs'))
.post(passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/loginok'}))*/
app.get('/loginok',(req,res)=>res.send('ban da dang nhap thanh cong'));
passport.use(new LocalStrategy(
    (username,passsword,done)=>{
    if('abc'==username){
    console.log('test true');
    return done(null,userRecord)
}else{
    console.log('test lalse');
    return done(null, false)
}
}))
passport.serializeUser((user,done)=>{
    done(null,user)
})
router.get('/index', function (req, res) {
    res.render('./kadmin/users/index.ejs')
});
module.exports = router;
