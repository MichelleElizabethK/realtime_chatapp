module.exports = exports = {};
const generalMessages = require('../messages/'+process.env.LANGUAGE+'/general.messages');

//Function to handle error responses from the web service
exports.handleError = function (req, res, reason, message, code = 1, httpStatuscode = 200) {
	try {
		const response = {
			"message": message,
			"errorCode": code
		};
		res.status(httpStatuscode).json(response);
		// if (process.env.ERROR_LOG == 'yes') { //logging
		// 	this.wsLogger(req, response, [reason, message], 'wsError');
		// }
		if (process.env.ERROR_LOG_IN_CONSOLE == 'yes') { //show error in the console
			console.log(message);
			console.log(reason);
		}
		return false;
	} catch (e) {
		console.log(e);
	}
};


// Fuction to handle success responses from web service
exports.handleSuccess = function (req, res, message, result, additionalData) {
	try {
		const response = {
			"message": message,
			"errorCode": 0,
			"data": result,
			"info": {}
		};
		for (const dataKey in additionalData) {
			response.info[dataKey] = additionalData[dataKey];
		}
		res.status(200).json(response);
		// if (process.env.SUCCESS_LOG == 'yes') { //logging
		// 	this.wsLogger(req, response, [message], 'wsSuccess');
		// }
	} catch (e) {
		this.handleError(req, res, e.stack, generalMessages.technicalError);
	}
};