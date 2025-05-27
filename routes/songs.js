const express = require('express');
const router = express.Router();

const songsController = require('../controllers/songs');

const { songValidationRules, movieValidationRules, validate } = require('../validator.js');

router.get('/', songsController.getSongs);
router.get('/:id', songsController.getSong);

router.post('/', songValidationRules(), validate, songsController.createSong);
router.put('/:id', songValidationRules(), validate, songsController.updateSong);
router.delete('/:id', songValidationRules(), validate, songsController.deleteSong);

module.exports = router;