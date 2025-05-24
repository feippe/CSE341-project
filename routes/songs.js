const express = require('express');
const router = express.Router();

const songsController = require('../controllers/songs');

router.get('/', songsController.getSongs);
router.get('/:id', songsController.getSong);

router.post('/', songsController.createSong);
router.put('/:id', songsController.updateSong);
router.delete('/:id', songsController.deleteSong);

module.exports = router;