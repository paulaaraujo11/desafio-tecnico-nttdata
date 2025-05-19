const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const auth = require('../middlewares/auth');

router.post('/', auth, playlistController.create);
router.get('/', auth, playlistController.list);
router.get('/:id', auth, playlistController.detail);
router.put('/:id', auth, playlistController.update);
router.delete('/:id', auth, playlistController.delete);
router.post('/:id/add-music', auth, playlistController.addMusic);
router.post('/:id/remove-music', auth, playlistController.removeMusic);

module.exports = router;