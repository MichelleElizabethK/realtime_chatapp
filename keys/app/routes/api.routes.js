const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/profile picture');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpeg');
    }
});
var upload = multer({ storage: storage });

process.setMaxListeners(Infinity);

// Middleware
const middleware = require('../middlewares/api.middleware');
router.use(middleware.authentication);


// UserAuth Routes
router.use('/user/auth', function (req, res, next) {
    const userAuthController = require('../controllers/userAuth.controller');
    router.route('/user/auth/register').post(userAuthController.register); // Register for super admin
    router.route('/user/auth/login').post(userAuthController.login);
    router.route('/user/auth/notOnline').put(userAuthController.notOnline);
    next();
});

//User Routes
router.use('/user', function (req, res, next) {
    const userController = require('../controllers/user.controller');
    router.route('/user/getUser').get(userController.getUser); // Get user profile
    router.route('/user/getAllUsers').get(userController.getAllUsers); // Get all users
    router.route('/user/edit').put(userController.edit); // Edit user profile
    router.route('/user/uploadImage').post(upload.any(), userController.uploadImage); // Upload profile picture
    next();
});

module.exports = router;