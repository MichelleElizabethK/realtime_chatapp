
 /**
 * @swagger
 * definitions:
 *   UserEdit:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - phone
 *       - city
 *       - state
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       phone:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 * 
 */


/**
 * @swagger
 * /api/user/getUser:
 *   get:
 *     tags:
 *       - User
 *     description: Get User Profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User information displayed
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 *       - JwtToken: []
 */
/**
 * @swagger
 * /api/user/getAllUsers:
 *   get:
 *     tags:
 *       - User
 *     description: Get All Users' Profile 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User information displayed
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 *       - JwtToken: []
 */
 /**
 * @swagger
 * /api/user/edit:
 *   put:
 *     tags:
 *       - User
 *     description: Edit User Profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserEdit'
 *     responses:
 *       200:
 *         description: Update Successful
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 *       - JwtToken: []
 */

/**
 * @swagger
 * /api/user/uploadImage:
 *   post:
 *     tags:
 *       - User
 *     description: Add/update new image for user profile
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: profileImage
 *         description: Profile image
 *         in: formData
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: Imaage updating
 *         schema:
 *           $ref: '#/definitions/GeneralResult'
 *     security:
 *       - ApiKey: []
 *       - JwtToken: []
 */