var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var crypto=require("crypto");
require("../../models/tbl_users");
require("../../models/tbl_messages");

var model_users=mongoose.model("tbl_users");
var model_messages=mongoose.model('tbl_messages');
app.use(bodyParser.json());

router.get('/', function (req, res) {
    if(req.session.use_account){
        model_users.find({use_status:1},function (err,users) {
            var user={
                use_id:req.session.use_id,
                use_name:req.session.use_name,
                use_account:req.session.use_account
            };
            model_messages.find({gro_code:'home'},{use_name_from:1,mes_text:1}).sort( { _id: -1 } ).limit(10).skip(0).exec(function(err2,messages){
                res.render('frontend/home/index',{users:users,user:user,messages:messages});
            })
        })
    }else{
        return res.redirect('/users/login');
    }
});
module.exports = router;
