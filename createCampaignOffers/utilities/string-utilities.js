/**
 * Created by Nagaraj on 11/7/2016.
 */

_ = require('lodash');

/**
 * first removes the special characters from the input string and then trims the leading and trailing spaces
 * note: it removes all the special characters(i.e not characters and numbers) and replace it with the space/s
 * @param rawString
 * @returns {*}
 */
exports.removeSpecialCharacters = function (rawString) {
    if (!_.isEmpty(rawString)) {
        return _.trim(_.replace(rawString, /[^a-zA-Z0-9 ]/g, ''));
    }
    else {
        return rawString;
    }
};