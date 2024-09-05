const router = require('express').Router();
const InstallController = require('../controllers/installController');

/**
 * @swagger
 * tags:
 *   name: Install
 *   description: Routes for database installation and setup
 */

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Install the database and seed data
 *     description: Initializes the database, creates user and music tables, and inserts sample data.
 *     tags:
 *       - Install
 *     operationId: install_database
 *     responses:
 *       200:
 *         description: Database installed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                   example: "Database installed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       description: List of users created
 *                       items:
 *                         $ref: "#/components/schemas/User"
 *                     musics:
 *                       type: array
 *                       description: List of musics created
 *                       items:
 *                         $ref: "#/components/schemas/Music"
 *       500:
 *         description: Database installation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Database installation failed: error details"
 */

router.get('/', InstallController.install);

module.exports = router;
