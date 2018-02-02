const mongoose = require('mongoose');
const SchemaCustomers= new mongoose.Schema({
    cus_id:String,
    cus_cid:String,
    cus_name:String,
    cus_domains:String,
    cus_domains_number:String,
    cus_status:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now}
});
module.exports= mongoose.model('k_customers',SchemaCustomers);
