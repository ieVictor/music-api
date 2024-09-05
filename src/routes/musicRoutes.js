const { Router } = require('express');
const MusicController = require('../controllers/musicController');
const { authAdmin, authMiddleware } = require('../middlewares/auth');
const router = Router();

/**
 * @swagger
 * tags:
 *  name: Music
 *  description: Routes for music manipulation
 */

/**
 * @swagger
 * /music:
 *   get:
 *     summary: View all musics
 *     description: Returns information about all songs
 *     tags:
 *       - Music
 *     operationId: get_all_music
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MusicList"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */
router.get('/', MusicController.getAllMusics);

/**
 * @swagger
 * /music/user?id={userId}:
 *   parameters:
 *     - name: userId
 *       in: query
 *       required: true
 *       description: ID of the user
 *       schema:
 *         type: integer
 *   get:
 *     summary: View musics songs by user id
 *     description: Returns user musics information by id
 *     tags:
 *       - Music
 *     operationId: get_musics_by_user_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MusicList"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */
router.get('/user', MusicController.getUserMusics);

/**
 * @swagger
 * /music/{musicId}:
 *   parameters:
 *     - name: musicId
 *       in: path
 *       required: true
 *       description: ID of the music that will be displayed
 *       schema:
 *         type: integer
 *   get:
 *     summary: View music by id
 *     description: Returns music information by id
 *     tags:
 *       - Music
 *     operationId: get_music_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Music"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/:musicId', MusicController.getMusicById);

/**
 * @swagger
 * /music:
 *   post:
 *     summary: Create a new music
 *     description: Creates a new music based on the data provided in the request body.
 *     tags:
 *       - Music
 *     operationId: create_music
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MusicInsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Music"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.post('/', authMiddleware, MusicController.createMusic);

/**
 * @swagger
 * /music/{musicId}:
 *   parameters:
 *     - name: musicId
 *       in: path
 *       required: true
 *       description: Music ID to be updated
 *       schema:
 *         type: integer
 *   put:
 *     summary: Update song
 *     description: Updates the information of the desired song, as long as the user who is editing it is the same one who created it
 *     tags:
 *       - Music
 *     operationId: update_music
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MusicUpdate"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Music"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.put('/', authMiddleware, MusicController.updateMusic);


/**
 * @swagger
 * /music/{musicId}:
 *   parameters:
 *     - name: musicId
 *       in: path
 *       required: true
 *       description: ID of the music to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove music
 *     description: Deletes a music, as long as the user performing the deletion is the same one who created it
 *     tags:
 *       - Music
 *     operationId: delete_music
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteSuccess"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.delete('/', authMiddleware, MusicController.deleteMusic);

module.exports = router;
