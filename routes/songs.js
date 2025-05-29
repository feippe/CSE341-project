const express = require('express');
const router = express.Router();

const songsController = require('../controllers/songs');

const { songValidationRules, validate } = require('../validator.js');

router.get('/', songsController.getSongs);
router.get('/:id', songsController.getSong);

router.post('/', songValidationRules(), validate, songsController.createSong);
router.put('/:id', songValidationRules(), validate, songsController.updateSong);
router.delete('/:id', songsController.deleteSong);

module.exports = router;