var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//whishlist
var SanphamchinhSchema = new Schema({

    tensanphamchinh: { type: String, require: true },
    Thoigian: { type: Date, default: Date.now() },

});

module.exports = mongoose.model('Sanphamchinh', SanphamchinhSchema);