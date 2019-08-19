module.exports = exports = {};
const userAuthValidation = require('../validations/userAuth.validation');
const generalHelper = require('../helpers/general.helper');
const userAuthService = require('../services/userAuth.service');
//const userService = require('../services/user.service');
const authMessages = require('../messages/' + process.env.LANGUAGE + '/auth.messages');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcryptUtil = require('../../util/bcrypt.util');

//Register a new user
exports.register = async function (req, res) {
    try {
        const error = userAuthValidation.registerValidation(req.body);
        if (error)
            return generalHelper.handleError(req, res, error, error);
        const userExists = await userAuthService.findUserByEmailId(req.body.email);
        if (userExists != null)
            return generalHelper.handleError(req, res, 'User Already Exists', authMessages.userExists);

        userName = await userAuthService.findUserByUserName(req.body.userName);
        if (userExists != null)
            return generalHelper.handleError(req, res, 'Username Taken', authMessages.userNameTaken);

        req.body.password = await bcryptUtil.encryptPassword(req.body.password);
        const user = await userAuthService.createUser(req.body);

        generalHelper.handleSuccess(req, res, authMessages.userRegistered, user);

    } catch (error) {

    }
}

exports.login = async function (req, res) {
    try {
        const error = await userAuthValidation.loginValidation(req.body);
        if (error)
            return generalHelper.handleError(req, res, error, error);

        const user = await userAuthService.findActiveMobileUserByEmailId(req.body.email, { password: true });
        if (user == null)
            return generalHelper.handleError(req, res, 'No mobile user found', authMessages.mobileUserNotExists);

        if (! await bcryptUtil.comparePassword(req.body.password, user.password))
            return generalHelper.handleError(req, res, 'Invalid Password', authMessages.invalidPassword);

        delete user.password;
        const privateKey = fs.readFileSync(path.resolve(__dirname, "../../keys/jwtPrivate.key"));
        const jWtToken = jwt.sign({ user: user }, privateKey, { algorithm: 'RS256', expiresIn: '2d' }); // expiresIn 60, "2 days", "10h", "7d"
        const refreshToken = jwt.sign({ user: user }, privateKey, { algorithm: 'RS256', expiresIn: '10d' });
        user.accessToken = jWtToken;
        user.refreshToken = refreshToken;

        await userAuthService.updateUserSession(user, req.body);
        await userAuthService.setOnline(user, req.body.email);

        generalHelper.handleSuccess(req, res, authMessages.successLogin, user);
    } catch (error) {
        generalHelper.handleError(req, res, e.stack);
    }
}

exports.notOnline = async function (req, res) {
    try {
        const emailId = req.authData.user.email;
        const user = await userAuthService.findUserByEmailId(emailId);
        console.log(user);
        const displayUser = await userAuthService.setOnline(user);
        generalHelper.handleSuccess(req, res, authMessages.displayDetails, displayUser);

    } catch (e) {
        generalHelper.handleError(req, res, e.stack);
    }
};