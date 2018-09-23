var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//whishlist
var sanphamSchema = new Schema({
    ten: { type: String, require: true },
    nhasx: { type: Schema.Types.ObjectId, ref: 'nhasx' },
    hinhanh: { type: String, require: true },
    chitiet: { type: String, require: true },
    gia: { type: Number, require: true }
});
module.exports = mongoose.model('Sanpham', sanphamSchema);