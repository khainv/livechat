var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var Schemaroom= new Schema({
    use_id_from:String,
    use_name_from:String,
    use_account_from:String,
    use_id_to:String,
    use_name_to:String,
    use_account_to:String,
    mes_code:String,
    mes_text:String,
    mes_file:String,
    mes_status:String,
    gro_id:String,
    gro_code:String,
    gro_name:String,
    created_at:{ type : Date, default: Date.now },
    updated_at:{ type : Date}
});
mongoose.model('tbl_rooms',Schemaroom);