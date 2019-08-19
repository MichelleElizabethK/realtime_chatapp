/**
 * DB Configuration and Connection
 * @exports General/MongoDB
 */

const mongoose = require('mongoose');
// Mongo setup
const isSandbox = process.env.IS_SANDBOX;
const mongoURI = isSandbox ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI_PROD;

/**
 * MongoDB configuration and connection for application API
 */
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(mongo => {
    console.log(mongo.connection.host + '/' + mongo.connection.name);
  })
  .catch((console.log));

mongoose.connection
  .on('connected', function() {
    console.log('Mongoose default connection is open for APP');
  })
  .on('error', function(err) {
    console.log('Mongoose default connection error has occurred for APP ', err);
  })
  .on('disconnected', function() {
    console.log('Mongoose default connection is disconnected for APP');
  });

module.exports = mongoose;
