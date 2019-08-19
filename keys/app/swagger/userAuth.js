/**
 * @swagger
 * definitions:
 *   UserLogin:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 * 
 */

  /**
 * @swagger
 * definitions:
 *   UserRegister:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - userName
 *       - email
 *       - password
 *       - phone
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       userName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone:
 *         type: string
 * 
 */

 /**
 * @swagger
 * /api/user/auth/register:
 *   post:
 *     tags:
 *       - UserAuth
 *     description: User Register
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserRegister'
 *     responses:
 *       200:
 *         description: Register Successful
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 */

 /**
 * @swagger
 * /api/user/auth/login:
 *   post:
 *     tags:
 *       - UserAuth
 *     description: User Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: Login Successful
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 */