/**
 * Swagger Configuration
 * @exports Swagger config
 */

const swaggerJSDoc = require('swagger-jsdoc');
/**
 * Swagger Configuration For Mobile 
 */
const swaggerMobileSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Mobile API Documentation',
      version: '1.0.0',
      description: 'Api Documentation',
    },
    host: process.env.HOST + ':' + process.env.APP_PORT,
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  apis: ['./app/swagger/*.js'],
});

module.exports = {swaggerMobileSpec};