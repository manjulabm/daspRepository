/**
 * Created by Nagaraj.ambig on 1/27/2017.
 */

var logger = require("../logging/logger"),
    loggingDataGenerator = require('../logging/logging-data-generator'),
    connections = require("../connections/db-connections"),
    //connections = require('../connect-db-from-local'),
    _ = require('lodash');

/**
 * This module is used to authenticate the session
 * @param event
 * @param callback
 */
exports.validateToken = function (event) {
    var eventObject = event,
        config = _.get(eventObject, "config", ''),
        isLoggingEnabled = _.get(config, "logenableflag", '0') === "1",
        headers = _.get(eventObject, "headers", {}),
        sessionKey = _.get(headers, "SessionKey", ''),
        deviceId = _.get(headers, "device", ''),
        salesRepId = _.get(headers, "salesrepid", ''),
        loggingData = {};

    if (isLoggingEnabled) {
        loggingData = loggingDataGenerator.generateInfoLogData({
            messageBody: {
                module: "affdex-record",
                salesRepId: salesRepId,
                sessionKey: sessionKey,
                deviceID: deviceId,
                description: "inside SalesRep authentication"
            }
        });
        logger.postData(event, loggingData);
    }

    return connections.getConnectionPoolForDaspAuthorization(config)
        .query('CALL ValidateSalesRepAuth("' + sessionKey + '","' + salesRepId + '","' + deviceId + '",@ValidationStatus_out); SELECT @ValidationStatus_out')
        .then(function (validationDetails) {
            if (isLoggingEnabled) {
                loggingData = loggingDataGenerator.generateInfoLogData({
                    messageBody: {
                        "module": "affdex-record",
                        "salesRepId": salesRepId,
                        "description": "fetched the authentication details"
                    }
                });
                logger.postData(event, loggingData);
            }

            return new Promise(function (resolve, reject) {
                if ((validationDetails[1][0])["@ValidationStatus_out"] === "1") {
                    resolve((validationDetails[1][0])["@ValidationStatus_out"]);
                }
                else {
                    reject({code: "ER_AUTHONTICATION_ERR"});
                }
            })

        })
        .catch(function (error) {
            if (isLoggingEnabled) {
                loggingData = loggingDataGenerator.generateErrorLogData({
                    messageBody: {
                        "description": "internal server error"
                    }
                });
                logger.postData(event, loggingData);
            }
            return Promise.reject(error);
            //return {"code": "intserverr"};
        });
};
