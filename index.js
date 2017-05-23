const util = require('util');
const expressValidator = require('express-validator');

const HTTP_VALIDATION_FAILED = 422;

const BrestValidator =
{
    name: 'validate',

    before_static_init: function(brest){
      brest.app.use(expressValidator());
    },

    init: function(brest, callback) {
      callback();
    },

    endpoint: {
        beforeHandler: function (endpoint, req, callback){
            let validatorFunc = false;
            const error = {body: {}, code: HTTP_VALIDATION_FAILED};

            const fields = endpoint.$fields;

            if (typeof fields.validator === 'function') validatorFunc = fields.validator;
            if (typeof fields.validate === 'function') validatorFunc = fields.validate;

            if (typeof validatorFunc !== 'function') return callback();
            else {
                const customErrors = validatorFunc(req); //Validator function may return custom errors
                if (customErrors === void 0) {
                    //if custom error is undefined we check for regular express validator errors
                    req.getValidationResult().then(res => {
                      if (!res.isEmpty()) {
                        error.body = res.array();
                        return callback(error);
                      }
                      return callback();
                    });
                } else {
                    error.body = customErrors;
                    callback(error);
                }
            }
        }
    }
};

module.exports = BrestValidator;