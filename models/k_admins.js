const mongoose = require('mongoose');
const SchemaAdmins= new mongoose.Schema({
    adm_id:String,
    adm_cid:String,
    adm_name:String,
    adm_account:String,
    adm_pass:String,
    adm_status:String,
    adm_group:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now}
});
module.exports= mongoose.model('k_admins',SchemaAdmins);

