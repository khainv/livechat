var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var SchemaMessages= new Schema({
    mes_text:String,
    mes_file:String,
    use_ip:String,
    use_os:String,
    use_browser:String,
    use_channel:String,
    use_icon:String,
    use_type:String,
    use_domain:String,
    use_cid:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date}
});
module.exports=mongoose.model('k_messages',SchemaMessages);