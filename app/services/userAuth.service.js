module.exports = exports = {};
const UserModel = require('../../models/user.model');

exports.findUserByEmailId = async function (emailId) {
    try {
        const query = {
            email: emailId,
        };
        const projection = {
            _id: true,
            email:true
        };
        return UserModel.findOne(query, projection).lean();
    }
    catch (e) {
        throw e;
    }

};

exports.findUserByUserName = async function (username) {
    try {
        const query = {
            userName: username,
        };
        const projection = {
            _id: true,
            session: true,
            userId: true,
        };
        return UserModel.findOne(query, projection).lean();
    }
    catch (e) {
        throw e;
    }

};

exports.createUser =  async function (data) {
    try{
        const User = new UserModel(data);
        return User.save();
    }catch (e) {
        throw e;
    }
    
};

exports.findActiveMobileUserByEmailId = async function (emailId, extraFields = {}) {
    try {
        const query = {
            email: emailId,
            userStatus: 1,
            isDeleted: false
        };
        const projectionFields = {
            _id: false,
            session: true,
            userId: true,
            name: true,
            phone: true,
            email: true,
            online: true
        };

        const projection = { ...projectionFields, ...extraFields };
        return UserModel.findOne(query, projection).lean()
    }
    catch (e) {
        throw e;
    }
};

exports.updateUserSession = async function (user, data) {
    try {
        const query = {
            _id: user._id
        };
        const projection = {
            new: true,
            fields: "_id session name phone email"
        };
        const updateData = {
            'sessions.0.refreshToken': user.refreshToken
        };
        const updateQuery = {
            $set: updateData,
            $currentDate: { 'sessions.0.createdAt': true }
        };
        return await UserModel.findOneAndUpdate(query, updateQuery, projection).lean();
    }
    catch (e) {
        throw e;
    }
};

exports.setOnline = async function (user) {
    try {
        const query = {email: user.email};
        const update = {
            $set: {
                online: !user.online
            }
        };
        const projection = {
            _id: false,
            name: true,
            userId: true,
            online: true
        };
        return UserModel.findOneAndUpdate(query, update, projection).lean();
    }
    catch (e) {
        throw e;
    }

};