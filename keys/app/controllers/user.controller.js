module.exports = exports = {};
const generalHelper = require('../helpers/general.helper');
const userService = require('../services/user.service');
const userMessages = require('../messages/' + process.env.LANGUAGE + '/user.messages');

// Get Details of current User

exports.getUser = async function (req, res) {
    try {

        const emailId = req.authData.user.email;

        const displayUser = await userService.findUserByEmailId(emailId);

        displayUser.imageurl = process.env.IMG_URL + displayUser.image;
        generalHelper.handleSuccess(req, res, userMessages.displayDetails, displayUser);

    } catch (e) {
        generalHelper.handleError(req, res, e.stack);
    }
};

//Get list of all registered users
exports.getAllUsers = async function (req, res) {
    try {
        const displayUsers = await userService.findAllUsers();
        generalHelper.handleSuccess(req, res, userMessages.displayDetails, displayUsers);

    } catch (e) {
        generalHelper.handleError(req, res, e.stack);
    }
};

//Edit user details
exports.edit = async function (req, res) {
    try {
        const emailId = req.authData.user.email;

        const user = await userService.editUser(req.body, emailId);
        if (user) {
            generalHelper.handleSuccess(req, res, userMessages.userUpdated, user);
        }
    } catch (e) {
        generalHelper.handleError(req, res, e.stack);
    }
};

//Upload a profile image for the user
exports.uploadImage = async function (req, res) {
    try {
        if (!req.files[0])
            return generalHelper.handleError(req, res, 'Error Uploading Image', userMessages.imageUploadError);

        const emailId = req.authData.user.email;

        const user = await userService.uploadPic(req.files[0], emailId);
        if (user) {
            generalHelper.handleSuccess(req, res, userMessages.imageUploaded, user);
        }
    } catch (e) {
        generalHelper.handleError(req, res, e.stack);
    }
};
