const mongoose = require('mongoose');
const SchemaConfigs= new mongoose.Schema({
    con_id:String,
    con_cid:String,
    con_prompt:String,
    con_hi:String,
    con_boxchat_banner:String,
    con_status:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now}
});
module.exports= mongoose.model('k_configs',SchemaConfigs);
