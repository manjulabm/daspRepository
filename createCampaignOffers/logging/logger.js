var request = require('request'),
    _ = require('lodash'),
    logTemplate = require("./log-template.json"),
    templaterObject = require('json-templater/object'),
    sequence = 1;

/**
 * Generate the logs and post to the  log-server
 */
module.exports.postData = function (req, rawLogData) {
    var composedLogData = composeLogData(rawLogData);
    console.log(composedLogData);
    if (!_.isEmpty(composedLogData)) {
        var options = {
            url: _.get(req, "config.loggingURL", ''),
            method: "POST",
            body: composedLogData,
            json: true
        };
        request(options, function (error, response) {
            if (_.isError(error)) {
                console.error("error while posting the log response::::" + error);
            }
            else {
                console.log("posted response::::" + JSON.stringify(response));
            }
        });
    }

    else {
        console.error("no log data available::::");
    }

    /**
     * compose the log-data
     * @param rawLogData
     * @returns {null}
     */
    function composeLogData(rawLogData) {
        var rawLogDataObject = rawLogData;
        if (!_.isEmpty(rawLogDataObject)) {
            var logDataObject = templaterObject(logTemplate,
                {
                    "sequence": sequence++,
                    "logType": _.get(rawLogDataObject, 'logData.logType', ''),
                    "messageType": _.get(rawLogDataObject, 'logData.messageType', ''),
                    "messageBody": _.get(rawLogDataObject, 'messageBody', ''),
                    "dateTime": _.get(rawLogDataObject, 'logData.dateTime', ''),
                    "stage": _.get(rawLogDataObject, 'logData.stage', ''),
                });

            return JSON.stringify(logDataObject);
        }
        else
            return null;
    }
};

