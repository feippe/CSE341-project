const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

const { movieValidationRules, validate } = require('../validator.js');

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovie);

router.post('/', movieValidationRules(), validate, moviesController.createMovie);
router.put('/:id', movieValidationRules(), validate, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;