const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const songsController = require('../controllers/songs');

const { songValidationRules, validate } = require('../validator.js');

router.get('/', songsController.getSongs);
router.get('/:id', songsController.getSong);

router.post('/', ensureAuth, songValidationRules(), validate, songsController.createSong);
router.put('/:id', ensureAuth, songValidationRules(), validate, songsController.updateSong);
router.delete('/:id', ensureAuth, songsController.deleteSong);

module.exports = router;