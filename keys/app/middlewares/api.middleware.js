/**
 * Authentication in the Middleware
 * @exports Api/Middleware
 */
const generalHelper = require('../helpers/general.helper');
const generalMessages = require("../messages/" + process.env.LANGUAGE + "/general.messages");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

/**
 * Middleware Authentication (api auth and session auth)
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Object} next - Next Object
 */
exports.authentication = function (req, res, next) {
	try {

		//Session checking exclusion apis
		const excludeList = ["/user/auth/login", "/user/auth/token", "/user/auth/forgot","/user/auth/register"];

		if (process.env.RESTAPIKEY != req.headers["api-key"])
			return generalHelper.handleError(req, res, "API Auth Failed", generalMessages.invalidApiKey, 1001);
		if (excludeList.includes(req.url) || excludeList.includes(require("url").parse(req.url).pathname)) {
			next();
		} else {
			if (typeof req.headers["authorization"] === 'undefined')
				return generalHelper.handleError(req, res, "UnAuthorized User", generalMessages.jwtTokenMissing, 1001);
			const publicKey = fs.readFileSync(path.resolve(__dirname, "../../keys/jwtPublic.key"));
			jwt.verify(req.headers["authorization"], publicKey, function (err, authData) {
				if (err) {
					if (err.name == "TokenExpiredError")
						return generalHelper.handleError(req, res, "Token Exipred", generalMessages.tokenExpired, 2000);
					else
						return generalHelper.handleError(req, res, "Invalid Token", generalMessages.invalidToken, 2001);
				}
				else {
					req.authData = authData;
					next()
				}
			});
		}
	} catch (e) {
		generalHelper.handleError(req, res, e.stack, generalMessages.technicalError);
	}
}; 