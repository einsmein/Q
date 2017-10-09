var mongoose = require('mongoose');

var userSchema = require('./user');
var productSchema = require('./product');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var User = mongoose.model('User', userSchema);
    var Product = mongoolse.model('Product', productSchema);

	wagner.factory('User', function() {
		return User;
	});
    wagner.factory('Product', function() {
        return Product;
    });

	return {
		User: User,
        Product: Product
	};
};


