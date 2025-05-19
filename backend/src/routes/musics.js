const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const auth = require('../middlewares/auth');

router.post('/', auth, musicController.create);
router.get('/', auth, musicController.list);
router.put('/:id', auth, musicController.update);
router.delete('/:id', auth, musicController.delete);

module.exports = router;