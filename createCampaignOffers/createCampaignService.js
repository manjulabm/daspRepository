var controller = require("./controllers/controller.js"),
    logger = require("./logging/logger.js"),
    loggingDataGenerator = require('./logging/logging-data-generator.js'),
    authTokenValidator = require("./authentication/auth-token-validator.js"),
    _ = require('lodash'),
    fs = require('fs');


exports.proximityCampaign = function (req, context) {
   
    function getErrorStatusObject(err) {
        var eCodes = JSON.parse(fs.readFileSync("./logging/application-error-status.json", 'utf8'));
        return _.get(eCodes, "errorCodes." + err.code, _.get(eCodes, "errorCodes.DEFAULT", ""));
    }


 controller.categorywiseproductcontroller(req, function (err, connection, data) {
                if (err) {
                    context.succeed(getErrorStatusObject(err));
                    connection.release();
                }
                else {
               
                    context.succeed(data);
                    connection.release();
                }
            });



};