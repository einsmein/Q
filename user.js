var mongoose = require('mongoose');

var userSchema = {
    //_id: { type: String, required: true }
    profile: {
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        picture: {
            type: String,
            required: true,
            match: /^http:\/\//
        }
    },
    data: {
        oauth: { type: String, required: true },
        cart: [{
            product: {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }]
    }
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
