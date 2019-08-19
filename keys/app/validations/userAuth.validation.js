module.exports = exports = {};
const authMessages = require('../messages/' + process.env.LANGUAGE + '/auth.messages');

//Register Validation
exports.registerValidation = function (data) {
    try {
        if (!data.firstName)
            return authMessages.firstNameRequired;
        if (!data.lastName)
            return authMessages.lastNameRequired;
        if (!data.userName)
            return authMessages.userNameRequired;
        if (!data.email)
            return authMessages.emailRequired;
        if (!data.password)
            return authMessages.passwordRequired;
        if (!data.phone)
            return authMessages.phoneRequired;
    } catch (e) {
        throw e;
    }
}

//Login Validation
exports.loginValidation = function (data) {
    try {
        if (!data.email)
            return authMessages.emailRequired;
        if (!data.password)
            return authMessages.passwordRequired;
    } catch (e) {
        throw e;
    }
}