const basic_data = require('../../test_data').basic;

module.exports = {
    version: 1,
    endpoints: [
        {
            method: 'GET',
            uri: ':id',
            description: 'Simple GET request with validation',
            validator: function (req) {
              req.assert('id', 'Invalid Id').notEmpty().isInt();
            },
            handler: function (req, callback) {
                callback(null, basic_data);
            }
        }
    ]
};