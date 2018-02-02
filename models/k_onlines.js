const mongoose = require('mongoose');
/*use_channel:{1:clinet,2:admin}*/
const SchemaOnlines= new mongoose.Schema({
    soc_id:String,
    on_ip:String,
    on_cid:String,
    on_name:String,
    on_device:String,
    on_type:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now }
});
module.exports= mongoose.model('k_onlines',SchemaOnlines);

