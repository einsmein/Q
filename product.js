var mongoose = require('mongoose');

var productSchema = {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;
