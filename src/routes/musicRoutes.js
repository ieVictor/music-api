const { Router } = require('express');
const MusicController = require('../controllers/musicController');
const router = Router();

router.get('/', MusicController.getAllMusics);
router.get('/:userId', MusicController.getMusics);
router.get('/:musicId', MusicController.getMusicById);

router.post('/', MusicController.createMusic);
router.put('/:musicId', MusicController.updateMusic);
router.delete('/:musicId', MusicController.deleteMusic);

module.exports = router;
