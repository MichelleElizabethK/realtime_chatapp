module.exports = exports = {};
const UserModel = require('../../models/user.model');

exports.findUserByEmailId = async function (emailId) {
    try {
        const query = {
            email: emailId,
        };
        const projection = {
            _id: true,
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            phone: true,
            city: true,
            state: true,
            image: true,
            online: true
        }
        return UserModel.findOne(query, projection).lean();
    }
    catch (e) {
        throw e;
    }

};


exports.findAllUsers = async function () {
    try {
        const query = {};
        const projection = {
            _id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            city: true,
            state: true,
            image: true,
            online: true
        }
        return UserModel.find(query, projection).lean();
    }
    catch (e) {
        throw e;
    }

};

exports.editUser = async function (user, emailId) {
    try {
        const query = {
            email: emailId
        };
        const update = {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                city: user.city,
                state: user.state
            }
        };
        const project = {
            new: true,
            fields: 'userId email firstName lastName phone city state',
        };
        return await UserModel.findOneAndUpdate(query, update, project).lean();
    } catch (e) {
        throw e;
    }

};


exports.uploadPic = async function (user, emailId) {
    try {
        const query = {
            email: emailId
        };
        const update = {
            $set: {
                image: user.filename
            }
        };
        const project = {
            new: true,
            fields: 'userId email firstName lastName phone city state image',
        };
        return await UserModel.findOneAndUpdate(query, update, project).lean();
    } catch (e) {
        throw e;
    }
};
