const mongoose = require('mongoose');
const SchemaUsers= new mongoose.Schema({
    use_id:String,
    use_cid:String,
    use_name:String,
    use_token:String,
    use_status:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date, default: Date.now}
});
module.exports= mongoose.model('k_users',SchemaUsers);

