module.exports = exports = {};

const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Encrypt Password 
 */
exports.encryptPassword = function(pwd) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hash(pwd, salt);
};
/**
 * Compare Password 
 */
exports.comparePassword = function(data, pwd) {
  return bcrypt.compare(data, pwd);
};
/**
 * New Password Creator
 */
exports.createPassword = function (length = 4) {
	try {
		let newPassword = "";
		const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		newPassword += upperCase.charAt(Math.floor(Math.random() * upperCase.length));

		for (let i = 0; i < length; i++) {
			newPassword += characters.charAt(Math.floor(Math.random() * upperCase.length));
		}

		return newPassword;
	} catch (e) {
		throw e;
	}
};