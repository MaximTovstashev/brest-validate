var expressValidator = require('express-validator');

var BrestValidator =
{
    init: function(brest, callback){
        brest.getApp().use(expressValidator());
        callback();
    },
    method: {
        beforeHandler: function (method, req, callback){
            var validatorFunc = false;
            var error = {body: {}, code: method.getErrorCodes().VALIDATION_FAILED};

            var methodFields = method.getFields();

            if (typeof(methodFields.validator)=='function') validatorFunc = methodFields.validator;
            if (typeof(methodFields.validate)=='function') validatorFunc = methodFields.validate;
            if (!validatorFunc) callback();
            else {
                var customErrors = validatorFunc(req); //Validator function may return custom errors
                if (customErrors === void 0) {
                    //if custom error is undefined we check for regular express validator errors
                    var expressErrors = req.validationErrors();
                    if (expressErrors) {
                        error.body = expressErrors;
                        callback(error);
                    } else {
                        callback();
                    }
                } else {
                    error.body = customErrors;
                    callback(error);
                }
            }
        }
    }
};

module.exports = BrestValidator;