var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var Schemaroom= new Schema({
    roo_name:String,
    roo_token:String,
    roo_members:[],
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date},
    roo_status:String
});
mongoose.model('k_rooms',Schemaroom);