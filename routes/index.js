const router = require('express').Router();
const moviesController = require('./../src/controllers/movies');

router.get('/movies',moviesController.listar);
router.post('/movies', moviesController.crear);

module.exports = router;