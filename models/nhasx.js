var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//whishlist
var nhasxSchema = new Schema({
    sanpham: { type: Schema.Types.ObjectId, ref: 'sanpham' },
    tennhasx: { type: String, require: true }
});

module.exports = mongoose.model('Nhasx', nhasxSchema);