const mongoose = require('mongoose');
const SchemaSockets= new mongoose.Schema({
    soc_id:String,
    use_ip:String,
    use_cid:String,
    use_sid:String,
    use_domain:String,
    use_device:String,
    use_channel:String,
    use_group:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now}
});
module.exports= mongoose.model('k_sockets',SchemaSockets);