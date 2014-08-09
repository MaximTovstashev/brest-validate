var BrestValidator =
{
    method: {
        beforeHandler: function (method, req, callback){
            var validatorFunc = false;
            if (typeof(method.description.validator)=='function') validatorFunc = method.description.validator;
            if (typeof(method.description.validate)=='function') validatorFunc = method.description.validate;
            if (!validatorFunc) callback();
            else {
                var err = validatorFunc(req);
                if (err === void 0) {
                    callback(null, req);
                } else {
                    method.send(res, err, {code: method.getErrorCodes().VALIDATION_FAILED});
                    callback(err);
                }
            }
        }
    }
};

module.exports = BrestValidator;
