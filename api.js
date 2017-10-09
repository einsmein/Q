var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
	var api = express.Router();

	api.get('/', function(req, res) {
		res.send('home, welcome!');
	});

	api.get('/user/:id', wagner.invoke(function(User) {
		return function(req, res) {
			//res.send('User id: ' + req.params.id);
			User.findOne({ _id: req.params.id }, function(error, user) {
                if (error) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({ error: error.toString() });
                }
                if (!user) {
                    return res
                        .status(status.NOT_FOUND)
                        .json({ error: 'Not found' });
                }
                res.json({ user: user });
            });
        };
    }));


    api.get('/myaccount', function (req, res) {
        if (!req.user) {
            return res.
                status(status.UNAUTHORIZED).
                json({ error: 'Not logged in' });
        }
        res.json({ user: req.user });
    });

    api.get('/myaccount/cart', //wagner.invoke(function(User) {
        //return function(req, res) {
        function(req, res) {
            try {
                var cart = req.body.data.cart;
            } catch(e) {
                return res.
                    status(status.BAD_REQUEST).
                    json({ error: 'No cart specified.' });
            }

            req.user.data.cart = cart;
            req.user.save(function(error, user) {
                if (error) {
                    return res.
                        status(status.INTERNAL_SERVER_ERROR).
                        json({ error: error.toString() });
                }
                return res.json({ user: user });
            });
        });
 
    return api;
};
