/**
 * Created by Nagaraj on 11/9/2016.
 */

var validate = require('validator');

exports.validateEmail = function (email) {
    if (validate.isEmail(email)) {
        return (validate.normalizeEmail(email, {all_lowercase: true}));
    }
    else {
        console.error("email is empty:::");
        return email;
    }

};