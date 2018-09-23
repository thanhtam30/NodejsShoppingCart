var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var dondathangSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    giohang: { type: Object, required: true },
    Hoten: { type: String, required: true },
    sodienthoai: { type: Number, required: true },
    diachi: { type: String, required: true }
});
module.exports = Mongoose.model('Dondathang', dondathangSchema)