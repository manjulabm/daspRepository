/**
 * Created by Nagaraj.ambig on 1/27/2017.
 */

var templaterObject = require('json-templater/object'),
    responseTemplater = require('./response-template.json'),
    _ = require('lodash');

/**
 * Compose the final response-data
 * @param req
 * @param resultSetFromDb
 */
module.exports = function (req,responsemsg) {
   // var hasValidResponse = resultSetFromDb && resultSetFromDb["affectedRows"] >=1,
        finalResponse = templaterObject(responseTemplater, {
            status: req ? "1" : "0",
            msg: req ? 'Success' : "failure",
            datetime: new Date(),
            response: req ? responsemsg : "technical/functional error: " + responsemsg
        });
    return finalResponse;
};