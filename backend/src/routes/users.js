const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.put('/', auth, userController.update);
router.delete('/', auth, userController.delete);

module.exports = router;