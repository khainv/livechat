var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var SchemaMessages= new Schema({
    adm_id:String,
    use_chat:{},
    roo_id:{},
    roo_type:String,
    mes_text:String,
    use_cid:String,
    mes_type:String,
    adm_use:String,
    use_icon:String,
    mes_status:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date}
});
module.exports=mongoose.model('k_messages',SchemaMessages);