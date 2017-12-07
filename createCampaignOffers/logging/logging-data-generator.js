/**
 * Created by Nagaraj on 11/7/2016.
 */

var _ = require('lodash'),
    objectAssign = require('object-assign');

/**
 * generate the log data
 * @param logDataObject
 * @returns {{logData: {logType, messageType: string, dateTime: Date, stage}, messageBody: {dateTime: Date, logType}}}
 */
function generateLogData(logDataObject) {
    var dateTime = new Date(),
        logDataObj = logDataObject,
        data = {
            "logData": {
                "logType": _.get(logDataObj, "commonData.logType", ""),
                "messageType": "*",
                "dateTime": dateTime,
                "stage": _.get(logDataObj, "logData.stage", "")
            },
            "messageBody": {
                "dateTime": dateTime,
                "logType": _.get(logDataObj, "commonData.logType", "")
            }
        };
    if (!_.isEmpty(_.get(logDataObj, 'logData', ''))) {
        data.logData = objectAssign(data.logData, logDataObj.logData);
    }
    if (!_.isEmpty(_.get(logDataObj, 'messageBody', ''))) {
        data.messageBody = objectAssign(data.messageBody, logDataObj.messageBody);
    }
    return data;

}

/**
 * generate the error log data
 * @param errorLogData
 * @returns {{commonData: {logType: string}, logData: {stage: string}}}
 */
exports.generateErrorLogData = function (errorLogData) {
    var errorLog = errorLogData,
        errorLogObject = {
            commonData: {
                logType: "error"
            }, logData: {
                stage: "end"
            }
        };
    if (!_.isEmpty(_.get(errorLog, 'logData', ''))) {
        errorLogObject.logData = objectAssign(errorLogObject.logData, errorLog.logData);
    }
    if (!_.isEmpty(_.get(errorLog, 'messageBody', ''))) {
        errorLogObject.messageBody = objectAssign({}, errorLog.messageBody);
    }
    if (!_.isEmpty(_.get(errorLog, 'commonData', ''))) {
        errorLogObject.commonData = objectAssign(errorLogObject.commonData, errorLog.commonData);
    }

    return errorLogObject;
};

/**
 * generate the info log
 * @param infoLogData
 * @returns {{logData: {logType, messageType: string, dateTime: Date, stage}, messageBody: {dateTime: Date, logType}}}
 */
exports.generateInfoLogData = function (infoLogData) {
    var infoLog = infoLogData,
        infoLogObject = {
            commonData: {
                logType: "info"
            }, logData: {
                stage: "start"
            }
        };

    if (!_.isEmpty(_.get(infoLog, 'logData', ''))) {
        infoLogObject.logData = objectAssign(infoLogObject.logData, infoLog.logData);
    }
    if (!_.isEmpty(_.get(infoLog, 'messageBody', ''))) {
        infoLogObject.messageBody = objectAssign({}, infoLog.messageBody);
    }
    if (!_.isEmpty(_.get(infoLog, 'commonData', ''))) {
        infoLogObject.commonData = objectAssign(infoLogObject.commonData, infoLog.commonData);
    }

    return generateLogData(infoLogObject);
};
