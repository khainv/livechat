var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var app=express();
var mongoose=require('mongoose');
var session = require('express-session');
var funs=require("../../funs.js");
require("../../models/tbl_rooms");
var model_rooms=mongoose.model('tbl_rooms');
app.use(bodyParser.json());
funs=new funs;
router.get('/', function (req, res) {
});
router.get('/rooms',function(req,res){
    res.render('frontend/rooms');
});
router.get('/rooms/duyet', function (req, res) {
    var room_id=req.query.roo_id;
    var use_id=req.session.use_id;
    var w_obj={roo_id:room_id,roo_admin:use_id};
    //match 2 conlect tion nhung chua duoc
    model_rooms_tam.aggregate([
        { $match : w_obj },
        {
            $lookup:{
                from: "tbl_users",
                localField: "use_id",
                foreignField: "_id",
                as: "info_user"
            }
        }
    ],function(err,data){
        if(err){
            throw err;
        }else{
            res.render('frontend/rooms/duyet',{room_tam:data});
        }
    })
});
router.get('/rooms/dyes',function(req,res){
    var roo_id=funs.escapeHtml(req.query.roo_id);
    var use_id=funs.escapeHtml(req.query.use_id);
    var roo_admin=funs.escapeHtml(req.session.use_id);
    var w_obj={roo_id:roo_id,roo_admin:roo_admin,use_id:use_id};
    model_rooms_tam.findOne(w_obj,function(err,data_tam){
        if(err){
            throw  err;
            res.redirect('/rooms/duyet');
        }else{
            if(data_tam!=null){
                //check in conlection tbl_rooms
                var w_obj={roo_admin:roo_admin,_id:roo_id,roo_members:use_id}
                model_rooms.findOne(w_obj,function(err, data){
                    if(err){
                        throw  err;
                        res.redirect('/rooms/duyet');
                    }else{
                        if(data==null){
                            model_rooms.update({_id:roo_id},{$push:{"roo_members":use_id}},function(err,rs){
                                if(err){
                                    throw err;
                                    res.redirect('/rooms/duyet');
                                }else{
                                    model_rooms_tam.deleteOne({_id:data_tam._id},function(err,rs){
                                        if(err){
                                            throw err;
                                        }
                                        res.redirect('/rooms/duyet');
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})
router.get('/rooms/dno',function(req,res){
    var roo_id=funs.escapeHtml(req.query.roo_id);
    var use_id=funs.escapeHtml(req.query.use_id);
    var roo_admin=funs.escapeHtml(req.session.use_id);
    var w_obj={roo_id:roo_id,roo_admin:roo_admin,use_id:use_id};
    model_rooms_tam.deleteOne(w_obj,function(err,rs){
        if(err){
            throw err;
        }
        res.redirect('/rooms/duyet');
    })
})
module.exports = router;
