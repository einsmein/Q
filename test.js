var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';
var PRODUCT_ID = '000000000001';
var USER_ID = '100000000001';
describe('User API', function() {
    var server;
    var User;

    before(function () {
        var app = express();

        // Bootstrap server
        models = require('./models')(wagner);
        app.use(require('./api')(wagner));
        app.use(function(req, res, next) {
            User.findOne({}, function(error, user) {
                assert.ifError(error);
                req.user = user;
                next();
            });
        });

        server = app.listen(3000);

        // Make User model available in tests
        User = models.User;
        Product = models.Product;
    });

    after(function() {
        // Shut the server down when tests are done
        server.close();
    });

    beforeEach(function(done) {
        // Make sure categories are empty before each test
        User.remove({}, function(error) {
            assert.ifError(error);
            Product.remove({}, function(error) {
                assert.iferror(error);
                done();
            });
        });
    });

    beforeEach(function(done) {
        var products = [
            {
                _id: PRODUCT_ID,
                name: 'first box',
                price: 20,
                poster: USER_ID
            }
        ]

        var users = [{
            profile: {
                username: 'minduser'
                picture: 'http://pbs.twimg.com/profile_images/Wwmwuh2t.png'
            },
            data: {
                oauth: 'invalid',
                cart: []
            }
        }];

        User.create(users, function(error) {
            assert.ifError(error);
            Product.create(products, function(error) {
                assert.ifError(error);
                done();
            });
        });
    });

    it('can load a user by id', function(done) {
        // Create a singer user
        User.create({ profile.username: 'mind' }, function(error) {
            assert.ifError(error);
            var url = URL_ROOT + '/user/mind';
            // Make an HTTP request to localhost:3000/user/mind
            superagent.get(url, function(error, res) {
                assert.ifError(error);
                var result;
                // And make sure we got { _id: 'mind' } back
                assert.doesNotThrow(function() {
                    result = JSON.parse(res.text);
                });
                assert.ok(result.user);
                assert.equal(result.user.profile.username, 'mind');
                done();
            });
        });
    });

    /*
    it('can post user's product', function(done) {
        var url = URL_ROOT + '/myaccount';
        superagent.put(url).
            send({
                data: {
                    cart: [{ product: PRODUCT_ID, pric
    */
});
