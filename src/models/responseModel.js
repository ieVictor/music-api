/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteSuccess:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Delete success message
 *           example: "Successfully deleted"
 *     BadRequest:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Invalid request. Some parameters may be missing or invalid.
 *           example: "Some parameters may be missing or invalid"
 *     Unauthorized:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Unauthorized. The JWT token was not provided or is invalid.
 *           example: "JWT token not provided or invalid"
 *     Forbidden:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Forbidden. The user does not have permission to access the requested resource.
 *           example: "You do not have permission to access the requested resource"
 *     NotFound:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: No data found. The requested resource does not exist
 *           example: "No data found"
 *     InternalServerError:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Internal error when handling data in the service
 *           example: "Internal Server Error"
 */