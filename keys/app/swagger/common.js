/**
 * @swagger
 * tags:
 *   - name: UserAuth
 *     description: Web services of users authentication
 * securityDefinitions:
 *   ApiKey:
 *     type: apiKey
 *     in: header
 *     name: API-KEY
 *   JwtToken:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 * definitions:
 *   ApiResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 */

 /**
 * @swagger
 * definitions:
 *   GeneralResult:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       errorCode:
 *         type: integer
 *         format: int32
 *       data:
 *         type: object
 *       info:
 *         type: object
 */